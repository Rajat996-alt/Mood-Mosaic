package com.ABC.journalApp.dto;

import java.time.LocalDateTime;

public class JournalEntryResponse {

    private String id;
    private String title;
    private String content;
    private String predictedMood;
    private Double moodConfidence;
    private boolean locked;
    private LocalDateTime createdAt;

    public JournalEntryResponse() {}

    public JournalEntryResponse(String id,
                                String title,
                                String content,
                                String predictedMood,
                                Double moodConfidence,
                                boolean locked,
                                LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.predictedMood = predictedMood;
        this.moodConfidence = moodConfidence;
        this.locked = locked;
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public String getPredictedMood() {
        return predictedMood;
    }

    public Double getMoodConfidence() {
        return moodConfidence;
    }

    public boolean isLocked() {
        return locked;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
