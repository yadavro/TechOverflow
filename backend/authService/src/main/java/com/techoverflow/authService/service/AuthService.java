package com.techoverflow.authService.service;

import com.techoverflow.authService.model.*;
import com.techoverflow.authService.repository.UserRepository;
import com.techoverflow.authService.util.InMemoryResetTokenStore;
import com.techoverflow.authService.util.JwtUtil;
import com.techoverflow.authService.service.RedisService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.Duration;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Service
public class AuthService {

    @Value("${jwt.refresh-expiration}")
    private long refreshExpiration;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RedisService redisService;

    @Autowired
    private  EmailProducer emailProducer;

    private final InMemoryResetTokenStore tokenStore;
    private final EmailService emailService;

    private Map<String, RefreshToken> refreshStore = new HashMap<>();

    public AuthService(InMemoryResetTokenStore tokenStore, EmailService emailService) {
        this.tokenStore = tokenStore;
        this.emailService=emailService;
    }


    public LoginResponse login(LoginRequest request) {
         User user=userRepository.findById(request.getEmail())
                 .orElseThrow(()-> new IllegalArgumentException("Invalid Credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        String accessToken = jwtUtil.generateToken(
                request.getEmail(), "PUBLIC");

        String refreshTokenValue = jwtUtil.generateRefreshToken();

        RefreshToken refeshToken = new RefreshToken(
                request.getEmail(),
                refreshTokenValue,
                Instant.now().plusSeconds(refreshExpiration));

        refreshStore.put(refreshTokenValue,refeshToken);
        redisService.set(refreshTokenValue,refeshToken);

        return new LoginResponse(accessToken,refreshTokenValue);
    }

    public RefreshToken validateRefreshToken(String token){
//        RefreshToken refreshToken=refreshStore.get(token);
        RefreshToken refreshToken=redisService.get(token,RefreshToken.class);
        log.info("Refresh Token: "+refreshToken);
        if(refreshToken==null){
            throw new RuntimeException("Invalid refresh token");
        }

        if (refreshToken.getExpiryDate().isBefore(Instant.now())) {
            refreshStore.remove(token);
            throw new RuntimeException("Refresh token expired");
        }

        return refreshToken;
    }

    public User signup( RegisterRequest request){
        if(userRepository.existsByEmail(request.email())){
            throw new IllegalArgumentException("Email already registered");
        }

        User user = new User();
        user.setEmail(request.email());
        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        user.setPassword(passwordEncoder.encode(request.password()));
        User savedUser = userRepository.save(user);

        emailProducer.sendEmailEvent(
                new EmailEvent(
                        request.email(),
                        "Welcome to TechOverflow",
                        "Thanks for signing up!"
                )
        );

        return savedUser;
    }

    public void changePassword(String email, ChangePasswordRequest request) {
        log.info("email: "+email);
        User user = userRepository.findById(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        if (!passwordEncoder.matches(request.currentPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }
        user.setPassword(passwordEncoder.encode(request.newPassword()));

        userRepository.save(user);
    }

    public void forgotPassword(ForgotPasswordRequest request) {
        User user = userRepository.findById(request.email())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        String resetToken = UUID.randomUUID().toString();
        tokenStore.save(resetToken, user.getEmail(), Duration.ofMinutes(15));

        emailProducer.sendEmailEvent(
                new EmailEvent(
                        user.getEmail(),
                        "Reset app-password",
                        "Refresh-token:"+resetToken
                )
        );
    }

    public void resetPassword(ResetPasswordRequest request) {

        String email = tokenStore.getEmail(request.token())
                .orElseThrow(() -> new IllegalArgumentException("Invalid or expired token"));

        User user = userRepository.findById(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        user.setPassword(passwordEncoder.encode(request.newPassword()));
        userRepository.save(user);

        tokenStore.delete(request.token());
    }

    public void logout(String refreshToken) {

        RefreshToken removed = refreshStore.remove(refreshToken);
        redisService.deleteKey(refreshToken);

        if (removed == null) {
            throw new IllegalArgumentException("Invalid refresh token");
        }
    }


}
