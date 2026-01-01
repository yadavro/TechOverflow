package com.techoverflow.authService.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.Table;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @NotBlank(message = "Email is required")
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank(message = "firstName is required")
    @Column(nullable = false)
    private String firstName;

    @NotBlank(message = "lastName is required")
    @Column(nullable = false)
    private String lastName;

    @NotBlank(message = "password is required")
    @Column(nullable = false)
    private String password;
}
