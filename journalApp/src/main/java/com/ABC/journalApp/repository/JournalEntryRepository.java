package com.ABC.journalApp.repository;

import com.ABC.journalApp.entity.JournalEntry;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface JournalEntryRepository extends MongoRepository<JournalEntry, String> {

    List<JournalEntry> findByUserId(String userId);

    List<JournalEntry> findByUserIdAndPredictedMood(String userId, String predictedMood);

    long countByUserIdAndPredictedMood(String userId, String predictedMood);

    List<JournalEntry> findByUserIdOrderByCreatedAtDesc(String userId);

    List<JournalEntry> findByUserIdAndCreatedAtAfter(String userId, java.time.LocalDateTime date);

    List<JournalEntry> findByUserIdAndCreatedAtBetween(
            String userId,
            java.time.LocalDateTime start,
            java.time.LocalDateTime end
    );

    Optional<JournalEntry> findTopByUserIdOrderByCreatedAtDesc(String userId);

    long countByUserIdIn(List<String> userIds);

    List<JournalEntry> findByUserIdIn(List<String> userIds);

    List<JournalEntry> findByUserIdAndStatus(String userId, String status);

    List<JournalEntry> findByUserIdAndStatusOrderByCreatedAtDesc(String userId, String status);

    List<JournalEntry> findByUserIdAndStatusAndCreatedAtAfter(
            String userId,
            String status,
            LocalDateTime date
    );

    List<JournalEntry> findByUserIdAndStatusAndCreatedAtBetween(
            String userId,
            String status,
            LocalDateTime start,
            LocalDateTime end
    );

    long countByUserIdAndStatusAndPredictedMood(
            String userId,
            String status,
            String predictedMood
    );

    void deleteByUserId(String userId);
    void deleteByOrganizationId(String organizationId);
}
