package com.ABC.journalApp.entity;

import jakarta.validation.constraints.DecimalMax;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Document(collection = "canvas_progress")
public class CanvasProgress {

    @Id
    private String id;

    private String userId;

    private int canvasNumber;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private boolean completed;

    private Map<String, String> regionColors = new HashMap<>();

    private String latestMood;

    private int totalRegions;

    private int filledRegions;

    private String reflectionLine;

    public CanvasProgress() {}

    public CanvasProgress(String userId, int canvasNumber, int totalRegions) {
        this.userId = userId;
        this.canvasNumber = canvasNumber;
        this.totalRegions = totalRegions;
        this.startDate = LocalDateTime.now();
        this.completed = false;
        this.filledRegions = 0;
    }

    public String getId() { return id; }

    public String getUserId() { return userId; }

    public int getCanvasNumber() { return canvasNumber; }

    public LocalDateTime getStartDate() { return startDate; }

    public LocalDateTime getEndDate() { return endDate; }

    public boolean isCompleted() { return completed; }

    public Map<String, String> getRegionColors() { return regionColors; }

    public int getTotalRegions() { return totalRegions; }

    public int getFilledRegions() { return filledRegions; }

    public String getReflectionLine() { return reflectionLine; }

    public void setId(String id) { this.id = id; }

    public void setUserId(String userId) { this.userId = userId; }

    public void setCanvasNumber(int canvasNumber) { this.canvasNumber = canvasNumber; }

    public void setStartDate(LocalDateTime startDate) { this.startDate = startDate; }

    public void setEndDate(LocalDateTime endDate) { this.endDate = endDate; }

    public void setCompleted(boolean completed) { this.completed = completed; }

    public void setRegionColors(Map<String, String> regionColors) { this.regionColors = regionColors; }

    public void setTotalRegions(int totalRegions) { this.totalRegions = totalRegions; }

    public void setFilledRegions(int filledRegions) { this.filledRegions = filledRegions; }

    public void setReflectionLine(String reflectionLine) { this.reflectionLine = reflectionLine; }

    public String getLatestMood() { return latestMood; }

    public void setLatestMood(String latestMood) { this.latestMood = latestMood; }
}