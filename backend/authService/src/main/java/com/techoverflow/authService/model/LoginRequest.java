package com.techoverflow.authService.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank(message = "userName is required")
    @Email(message = "Invalid email format")
    private String email;
    @NotBlank (message = "password is required")
    private String password;
}
