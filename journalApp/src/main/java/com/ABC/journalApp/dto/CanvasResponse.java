package com.ABC.journalApp.dto;

import java.time.LocalDateTime;
import java.util.Map;

public class CanvasResponse {

    private String id;
    private int canvasNumber;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private boolean completed;
    private Map<String, String> regionColors;
    private int totalRegions;
    private int filledRegions;
    private String reflectionLine;
    private String latestMood;

    public CanvasResponse(String id,
                          int canvasNumber,
                          LocalDateTime startDate,
                          LocalDateTime endDate,
                          boolean completed,
                          Map<String, String> regionColors,
                          int totalRegions,
                          int filledRegions,
                          String reflectionLine,
                          String latestMood) {

        this.id = id;
        this.canvasNumber = canvasNumber;
        this.startDate = startDate;
        this.endDate = endDate;
        this.completed = completed;
        this.regionColors = regionColors;
        this.totalRegions = totalRegions;
        this.filledRegions = filledRegions;
        this.reflectionLine = reflectionLine;
        this.latestMood = latestMood;
    }

    public String getId() { return id; }
    public int getCanvasNumber() { return canvasNumber; }
    public LocalDateTime getStartDate() { return startDate; }
    public LocalDateTime getEndDate() { return endDate; }
    public boolean isCompleted() { return completed; }
    public Map<String, String> getRegionColors() { return regionColors; }
    public int getTotalRegions() { return totalRegions; }
    public int getFilledRegions() { return filledRegions; }
    public String getReflectionLine() { return reflectionLine; }
    public String getLatestMood() { return latestMood; }
}