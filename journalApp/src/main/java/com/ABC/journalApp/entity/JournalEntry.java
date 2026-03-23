package com.ABC.journalApp.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "journals")
public class JournalEntry {

    @Id
    private String id;

    private String userId;
    private String organizationId;

    private String title;
    private String content;

    private String predictedMood;
    private Double moodConfidence;

    private boolean locked;

    private String status; // DRAFT or COMPLETED

    private LocalDateTime createdAt = LocalDateTime.now();

    // ===== Getters & Setters =====

    public String getId() { return id; }

    public String getUserId() { return userId; }

    public void setUserId(String userId) { this.userId = userId; }

    public String getOrganizationId() { return organizationId; }

    public void setOrganizationId(String organizationId) {
        this.organizationId = organizationId;
    }

    public String getTitle() { return title; }

    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }

    public void setContent(String content) { this.content = content; }

    public String getPredictedMood() { return predictedMood; }

    public void setPredictedMood(String predictedMood) {
        this.predictedMood = predictedMood;
    }

    public Double getMoodConfidence() { return moodConfidence; }

    public void setMoodConfidence(Double moodConfidence) {
        this.moodConfidence = moodConfidence;
    }

    public boolean isLocked() { return locked; }

    public void setLocked(boolean locked) { this.locked = locked; }

    public String getStatus() { return status; }

    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
}