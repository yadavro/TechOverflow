package com.techoverflow.authService.service;

import com.techoverflow.authService.model.User;
import com.techoverflow.authService.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        log.info("email  inside customuser: {}", email);
        User user = userRepository.findById(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found"));
        if (user != null) {
            return org.springframework.security.core.userdetails.User.builder().username(user.getEmail())
                    .password(user.getPassword())
                    .roles("PUBLIC")
                    .build();
        }
        return null;
    }
}
