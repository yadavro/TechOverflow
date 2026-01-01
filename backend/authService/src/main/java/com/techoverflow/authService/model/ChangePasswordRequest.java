package com.techoverflow.authService.model;

public record ChangePasswordRequest(String currentPassword,
                                    String newPassword) {
}
