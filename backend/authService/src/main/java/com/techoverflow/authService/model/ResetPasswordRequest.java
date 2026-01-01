package com.techoverflow.authService.model;

public record ResetPasswordRequest(
        String token,
        String newPassword
) {
}
