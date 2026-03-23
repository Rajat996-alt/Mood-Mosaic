package com.ABC.journalApp.dto;

public class StreakResponse {

    private int currentStreak;

    public StreakResponse(int currentStreak) {
        this.currentStreak = currentStreak;
    }

    public int getCurrentStreak() {
        return currentStreak;
    }
}
