package com.ABC.journalApp.repository;

import com.ABC.journalApp.entity.CanvasProgress;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface CanvasProgressRepository extends MongoRepository<CanvasProgress, String> {

    Optional<CanvasProgress> findByUserIdAndCompletedFalse(String userId);

    List<CanvasProgress> findByUserIdOrderByCanvasNumberDesc(String userId);
}