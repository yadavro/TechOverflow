package com.techoverflow.authService.controller;

import com.techoverflow.authService.model.*;
import com.techoverflow.authService.service.AuthService;
import com.techoverflow.authService.util.JwtUtil;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
@Slf4j
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<LoginResponse>refresh(@RequestBody RefreshRequest refreshRequest){
        RefreshToken stored=authService.validateRefreshToken(refreshRequest.getRefreshToken());
        String newAccessToken=jwtUtil.generateToken(stored.getEmail(), "PUBLIC");

        return ResponseEntity.ok(
                new LoginResponse(newAccessToken, refreshRequest.getRefreshToken())
        );
    }

    @PostMapping("/signup")
    public ResponseEntity<?>signup(@Valid @RequestBody RegisterRequest registerRequest){
        log.info("Inside signup");
        User newUser= authService.signup(registerRequest);
        log.info("newUser: {}",newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    @PostMapping ("/changePassword")
    public ResponseEntity<?>changePassword(@AuthenticationPrincipal UserDetails userDetails,
                                           @Valid @RequestBody ChangePasswordRequest changePasswordRequest){
            log.info("username:" +userDetails.getUsername());
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Unauthorized");
        }
            authService.changePassword(userDetails.getUsername(),changePasswordRequest);
            return ResponseEntity.noContent().build();
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Void> forgotPassword(@Valid
            @RequestBody ForgotPasswordRequest request) {
        authService.forgotPassword(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody LogoutRequest request) {

        authService.logout(request.refreshToken());
        return ResponseEntity.noContent().build();
    }



}
