package com.sudokumaster.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "*")
public class GameController {

    @GetMapping("/generate")
    public ResponseEntity<?> generatePuzzle(
            @RequestParam(defaultValue = "MEDIUM") String difficulty,
            @RequestParam(defaultValue = "TEACHER") String mode) {
        
        Map<String, Object> response = new HashMap<>();
        response.put("difficulty", difficulty);
        response.put("mode", mode);
        response.put("status", "SUCCESS");
        return ResponseEntity.ok(response);
    }
}
