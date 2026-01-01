package com.techoverflow.authService.util;

import java.time.Duration;
import java.util.Optional;

public interface ResetTokenStore {
    void save(String token, String email, Duration ttl);
    Optional<String> getEmail(String token);
    void delete(String token);
}
