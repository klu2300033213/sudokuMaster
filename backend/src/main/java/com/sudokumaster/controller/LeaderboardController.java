package com.sudokumaster.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/leaderboard")
@CrossOrigin(origins = "*")
public class LeaderboardController {

    @GetMapping
    public ResponseEntity<?> getLeaderboard(@RequestParam(defaultValue = "WEEKLY") String timeframe) {
        List<Map<String, Object>> entries = new ArrayList<>();

        Map<String, Object> u1 = new HashMap<>();
        u1.put("rank", 1);
        Map<String, String> user1 = new HashMap<>();
        user1.put("username", "QuantumSolver");
        user1.put("avatarUrl", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80");
        user1.put("country", "US");
        u1.put("user", user1);
        u1.put("score", 18450);
        u1.put("winCount", 142);
        u1.put("bestTimeSeconds", 118);
        u1.put("difficulty", "EVIL");
        entries.add(u1);

        Map<String, Object> u2 = new HashMap<>();
        u2.put("rank", 2);
        Map<String, String> user2 = new HashMap<>();
        user2.put("username", "LogicQueen_JP");
        user2.put("avatarUrl", "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80");
        user2.put("country", "JP");
        u2.put("user", user2);
        u2.put("score", 16200);
        u2.put("winCount", 128);
        u2.put("bestTimeSeconds", 135);
        u2.put("difficulty", "EVIL");
        entries.add(u2);

        return ResponseEntity.ok(entries);
    }
}
