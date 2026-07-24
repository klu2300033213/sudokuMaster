package com.sudokumaster.repository;

import com.sudokumaster.model.GameSessionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GameSessionRepository extends JpaRepository<GameSessionEntity, Long> {
    List<GameSessionEntity> findByUserIdOrderByUpdatedAtDesc(Long userId);
}
