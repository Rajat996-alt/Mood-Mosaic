package com.ABC.journalApp.controller;

import com.ABC.journalApp.dto.*;
import com.ABC.journalApp.response.ApiResponse;
import com.ABC.journalApp.service.JournalEntryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final JournalEntryService journalEntryService;

    public AnalyticsController(JournalEntryService journalEntryService) {
        this.journalEntryService = journalEntryService;
    }

    @GetMapping("/me/mood-summary")
    public ResponseEntity<ApiResponse<MoodSummaryResponse>> getMoodSummary() {

        String userId = getCurrentUserId();

        MoodSummaryResponse summary =
                journalEntryService.getMoodSummary(userId);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Mood summary fetched successfully", summary)
        );
    }

    @GetMapping("/me/streak")
    public ResponseEntity<ApiResponse<StreakResponse>> getStreak() {

        String userId = getCurrentUserId();

        StreakResponse streak =
                journalEntryService.calculateStreak(userId);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Streak calculated successfully", streak)
        );
    }

    @GetMapping("/me/mood-transitions")
    public ResponseEntity<ApiResponse<MoodTransitionResponse>> getMoodTransitions() {

        String userId = getCurrentUserId();

        MoodTransitionResponse response =
                journalEntryService.calculateMoodTransitions(userId);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Mood transitions calculated", response)
        );
    }

    @GetMapping("/me/weekly-summary")
    public ResponseEntity<ApiResponse<WeeklySummaryResponse>> getWeeklySummary() {

        String userId = getCurrentUserId();

        WeeklySummaryResponse summary =
                journalEntryService.getWeeklySummary(userId);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Weekly summary calculated", summary)
        );
    }

    @GetMapping("/me/monthly-summary")
    public ResponseEntity<ApiResponse<MonthlySummaryResponse>> getMonthlySummary() {

        String userId = getCurrentUserId();

        MonthlySummaryResponse summary =
                journalEntryService.getMonthlySummary(userId);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Monthly summary calculated", summary)
        );
    }

    private String getCurrentUserId() {
        return (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
    }
}