package com.ABC.journalApp.dto;

import java.util.Map;

public class MonthlySummaryResponse {

    private long totalEntries;
    private Map<String, Long> moodDistribution;

    public MonthlySummaryResponse(long totalEntries, Map<String, Long> moodDistribution) {
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