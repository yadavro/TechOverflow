package com.techoverflow.authService.model;

import lombok.Data;

@Data
public class RefreshRequest {
    private String refreshToken;
}
