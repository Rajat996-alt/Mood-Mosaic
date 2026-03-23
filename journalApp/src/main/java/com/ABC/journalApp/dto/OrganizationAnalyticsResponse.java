package com.ABC.journalApp.dto;

import java.util.Map;

public class OrganizationAnalyticsResponse {

    private int totalUsers;
    private long totalJournals;
    private Map<String, Long> moodDistribution;

    public OrganizationAnalyticsResponse(int totalUsers,
                                         long totalJournals,
                                         Map<String, Long> moodDistribution) {
        this.totalUsers = totalUsers;
        this.totalJournals = totalJournals;
        this.moodDistribution = moodDistribution;
    }

    public int getTotalUsers() {
        return totalUsers;
    }

    public long getTotalJournals() {
        return totalJournals;
    }

    public Map<String, Long> getMoodDistribution() {
        return moodDistribution;
    }
}