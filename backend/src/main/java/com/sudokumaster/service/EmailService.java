package com.sudokumaster.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${spring.mail.username:bhanuprakash.gandham12@gmail.com}")
    private String recipientEmail;

    public boolean sendSupportEmail(String senderName, String senderEmail, String category, String messageContent) {
        try {
            if (mailSender == null) {
                System.err.println("[SMTP Error] JavaMailSender bean is NULL. Check spring-boot-starter-mail dependency.");
                return false;
            }

            System.out.println("[SMTP Log] Attempting to send email from " + recipientEmail + " to " + recipientEmail + " via Gmail SMTP...");

            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(recipientEmail);
            mailMessage.setTo(recipientEmail);
            mailMessage.setSubject("Sudoku Master AI Feedback [" + category + "] from " + senderName);
            mailMessage.setReplyTo(senderEmail);
            mailMessage.setText(
                "Sudoku Master AI - Feedback / Support Request Received:\n\n" +
                "Name: " + senderName + "\n" +
                "Email: " + senderEmail + "\n" +
                "Category: " + category + "\n\n" +
                "Message:\n" + messageContent + "\n\n" +
                "Sent via Sudoku Master AI Support Form"
            );

            mailSender.send(mailMessage);
            System.out.println("[SMTP Success] Email sent successfully to " + recipientEmail);
            return true;
        } catch (Exception e) {
            System.err.println("[SMTP Exception] Failed to send support email: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }
}
