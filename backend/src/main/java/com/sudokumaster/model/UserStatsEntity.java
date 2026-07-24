package com.sudokumaster.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_stats")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserStatsEntity {

    @Id
    private Long userId;

    private Integer gamesPlayed = 0;

    private Integer gamesWon = 0;

    private Double winRate = 0.0;

    private Integer totalTimeSeconds = 0;

    private Integer fastestTimeSeconds = 0;

    private Integer hintsUsedCount = 0;

    private Integer totalMistakes = 0;

    private Integer currentStreak = 0;

    private Integer bestStreak = 0;
}
