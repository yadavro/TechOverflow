package com.techoverflow.authService.service;

import com.techoverflow.authService.model.EmailEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.annotation.RetryableTopic;
import org.springframework.retry.annotation.Backoff;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class EmailConsumer {
    private final EmailService emailService;

    public EmailConsumer(EmailService emailService) {
        this.emailService = emailService;
    }

    @RetryableTopic(
            attempts = "5",
            backoff = @Backoff(
                    delay = 2000,     // 2 sec
                    multiplier = 2   // exponential
            ),
            dltTopicSuffix = "-dlt",
            autoCreateTopics = "true"
    )
    @KafkaListener(topics = "email-send")
    public void consume(EmailEvent event) {
        log.info("Sending email to {}", event.email());
        emailService.sendEmail(event);
    }

}
