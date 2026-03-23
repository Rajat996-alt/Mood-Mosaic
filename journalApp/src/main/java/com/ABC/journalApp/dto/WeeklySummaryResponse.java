package com.ABC.journalApp.dto;

import java.util.Map;

public class WeeklySummaryResponse {

    private long totalEntries;
    private Map<String, Long> moodDistribution;

    public WeeklySummaryResponse(long totalEntries, Map<String, Long> moodDistribution) {
        this.totalEntries = totalEntries;
        this.moodDistribution = moodDistribution;
    }

    public long getTotalEntries() {
        return totalEntries;
    }

    public Map<String, Long> getMoodDistribution() {
        return moodDistribution;
    }
}