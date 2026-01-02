package com.techoverflow.authService.service;

import com.techoverflow.authService.model.EmailEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailDltConsumer {
    @KafkaListener(topics = "email-send-dlt")
    public void handleDlt(EmailEvent event) {
        log.error("Email permanently failed for {}", event.email());
    }
}
