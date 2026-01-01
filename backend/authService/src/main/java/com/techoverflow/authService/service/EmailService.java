package com.techoverflow.authService.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;


    public void sendMail(String recepient,String body, String subject) {
        try {
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setText(body);
            simpleMailMessage.setSubject(subject);
            simpleMailMessage.setTo(recepient);
            javaMailSender.send(simpleMailMessage);
            log.info("mail sent to: {}" , recepient);
        } catch (Exception e) {
            log.info("cannot send mail");
            log.error("Failed to send mail. Error: {}", e.getMessage());
        }
    }

}
