package com.sudokumaster.controller;

import com.sudokumaster.model.UserEntity;
import com.sudokumaster.repository.UserRepository;
import com.sudokumaster.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String identifier = request.get("email");
        if (identifier == null || identifier.isBlank()) {
            identifier = request.get("username");
        }
        String password = request.get("password");

        if (identifier == null || identifier.isBlank() || password == null || password.isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Username/Email and Password are required."));
        }

        final String searchKey = identifier.trim();
        UserEntity user = userRepository.findByEmail(searchKey)
                .orElseGet(() -> userRepository.findByUsername(searchKey).orElse(null));

        // 1. Check if user exists
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "User account not found. Please register first."));
        }

        // 2. Strict Password Validation via BCrypt
        if (!passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid credentials. Incorrect password."));
        }

        // 3. Authentication Successful -> Generate JWT Token
        String token = jwtUtils.generateJwtToken(user.getEmail());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", user);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String username = request.get("username");
        String password = request.get("password");

        if (username == null || username.isBlank() || password == null || password.isBlank()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Username and password are required."));
        }

        String cleanUsername = username.trim();
        String cleanEmail = (email != null && !email.isBlank()) ? email.trim() : cleanUsername + "@gmail.com";

        // Check if user already exists
        if (userRepository.existsByUsername(cleanUsername)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Username '" + cleanUsername + "' is already registered. Please login."));
        }

        if (userRepository.existsByEmail(cleanEmail)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Email '" + cleanEmail + "' is already registered. Please login."));
        }

        // Save new user with BCrypt hashed password
        UserEntity user = UserEntity.builder()
                .email(cleanEmail)
                .username(cleanUsername)
                .password(passwordEncoder.encode(password))
                .avatarUrl("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80")
                .country("IN")
                .bio("Sudoku speedsolver.")
                .xp(100)
                .level(1)
                .build();

        userRepository.save(user);

        String token = jwtUtils.generateJwtToken(user.getEmail());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", user);
        return ResponseEntity.ok(response);
    }
}
