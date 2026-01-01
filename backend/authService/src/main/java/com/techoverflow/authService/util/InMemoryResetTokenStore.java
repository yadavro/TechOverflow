package com.techoverflow.authService.util;

import com.techoverflow.authService.model.ResetTokenData;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class InMemoryResetTokenStore{
    private final Map<String, ResetTokenData> store = new ConcurrentHashMap<>();

    public void save(String token, String email, Duration ttl) {
        store.put(token,
                new ResetTokenData(email, LocalDateTime.now().plus(ttl))
        );
    }

    public Optional<String> getEmail(String token) {
        ResetTokenData data = store.get(token);

        if (data == null || data.expiry().isBefore(LocalDateTime.now())) {
            store.remove(token);
            return Optional.empty();
        }
        return Optional.of(data.email());
    }

    public void delete(String token) {
        store.remove(token);
    }
}
