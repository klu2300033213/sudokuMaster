package com.sudokumaster.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "game_sessions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GameSessionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String difficulty; // EASY, MEDIUM, HARD, EXPERT, EVIL

    private String mode; // TEACHER, HINT, CHALLENGE

    @Column(length = 500)
    private String initialBoardJson;

    @Column(length = 500)
    private String currentBoardJson;

    @Column(length = 500)
    private String solutionBoardJson;

    private Integer mistakesCount = 0;

    private Integer hintsUsedCount = 0;

    private Integer timeSeconds = 0;

    private String status; // IN_PROGRESS, COMPLETED, ABANDONED

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt = LocalDateTime.now();
}
