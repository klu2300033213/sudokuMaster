package com.sudokumaster.controller;

import com.sudokumaster.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/support")
@CrossOrigin(origins = "*")
public class SupportController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<?> sendSupportMessage(@RequestBody Map<String, String> request) {
        String name = request.getOrDefault("name", "Anonymous");
        String email = request.getOrDefault("email", "noreply@example.com");
        String category = request.getOrDefault("category", "General Feedback");
        String message = request.getOrDefault("message", "");

        if (message.trim().isEmpty()) {
            Map<String, Object> errorResp = new HashMap<>();
            errorResp.put("status", "ERROR");
            errorResp.put("message", "Message content cannot be empty.");
            return ResponseEntity.badRequest().body(errorResp);
        }

        boolean sent = emailService.sendSupportEmail(name, email, category, message);

        Map<String, Object> response = new HashMap<>();
        if (sent) {
            response.put("status", "SUCCESS");
            response.put("message", "Thank you for your feedback! Your message has been sent to Gandham Bhanu Prakash via SMTP.");
            return ResponseEntity.ok(response);
        } else {
            response.put("status", "ERROR");
            response.put("message", "SMTP transmission failed. Please verify your Gmail App Password and network connection.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
