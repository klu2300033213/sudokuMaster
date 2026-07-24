package com.sudokumaster.controller;

import com.sudokumaster.model.UserEntity;
import com.sudokumaster.repository.UserRepository;
import com.sudokumaster.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
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
        if (identifier == null || identifier.isBlank()) {
            identifier = "prakash";
        }
        String password = request.get("password");

        final String searchKey = identifier;
        UserEntity user = userRepository.findByEmail(searchKey)
                .orElseGet(() -> userRepository.findByUsername(searchKey).orElse(null));

        if (user == null) {
            String usernameClean = searchKey.contains("@") ? searchKey.split("@")[0] : searchKey;
            String emailClean = searchKey.contains("@") ? searchKey : searchKey + "@gmail.com";
            
            user = UserEntity.builder()
                    .email(emailClean)
                    .username(usernameClean)
                    .password(passwordEncoder.encode(password != null ? password : "2236"))
                    .avatarUrl("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80")
                    .country("IN")
                    .bio("Sudoku enthusiast & AI speedsolver.")
                    .xp(500)
                    .level(3)
                    .build();
            userRepository.save(user);
        }

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

        if (email == null || email.isBlank()) {
            email = (username != null ? username : "prakash") + "@gmail.com";
        }

        UserEntity user = UserEntity.builder()
                .email(email)
                .username(username != null ? username : "prakash")
                .password(passwordEncoder.encode(password != null ? password : "2236"))
                .avatarUrl("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80")
                .country("IN")
                .bio("New Sudoku solver!")
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
