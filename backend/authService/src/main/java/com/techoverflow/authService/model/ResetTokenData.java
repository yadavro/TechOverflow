package com.techoverflow.authService.model;

import java.time.LocalDateTime;

public record ResetTokenData(String email,
                             LocalDateTime expiry) {
}
