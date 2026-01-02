package com.techoverflow.authService.model;

import java.io.Serializable;

public record EmailEvent(String email,
                         String subject,
                         String body
) implements Serializable {}

