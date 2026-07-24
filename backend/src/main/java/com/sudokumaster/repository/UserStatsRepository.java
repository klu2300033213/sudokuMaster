package com.sudokumaster.repository;

import com.sudokumaster.model.UserStatsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserStatsRepository extends JpaRepository<UserStatsEntity, Long> {
}
