package com.techoverflow.authService.model;

public record LogoutRequest(
        String refreshToken
) {}