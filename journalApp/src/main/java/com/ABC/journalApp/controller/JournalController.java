package com.ABC.journalApp.controller;

import com.ABC.journalApp.dto.*;
import com.ABC.journalApp.response.ApiResponse;
import com.ABC.journalApp.service.JournalEntryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/journals")
public class JournalController {

    private final JournalEntryService journalEntryService;

    public JournalController(JournalEntryService journalEntryService) {
        this.journalEntryService = journalEntryService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<JournalEntryResponse>> createEntry(
            @Valid @RequestBody JournalEntryRequest request) {

        JournalEntryResponse response =
                journalEntryService.createEntry(request);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Journal created successfully", response)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<JournalEntryResponse>> getById(
            @PathVariable String id) {

        return journalEntryService.getById(id, getCurrentUserId())
                .map(entry -> ResponseEntity.ok(
                        new ApiResponse<>(true, "Journal fetched successfully", entry)
                ))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<JournalEntryResponse>> updateEntry(
            @PathVariable String id,
            @Valid @RequestBody JournalEntryRequest request) {

        return journalEntryService.updateEntry(id, request, getCurrentUserId())
                .map(updated -> ResponseEntity.ok(
                        new ApiResponse<>(true, "Journal updated successfully", updated)
                ))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteById(@PathVariable String id) {

        journalEntryService.deleteById(id, getCurrentUserId());

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Journal deleted successfully", null)
        );
    }

    @PatchMapping("/{id}/lock")
    public ResponseEntity<ApiResponse<JournalEntryResponse>> toggleLock(
            @PathVariable String id) {

        return journalEntryService.toggleLock(id, getCurrentUserId())
                .map(updated -> ResponseEntity.ok(
                        new ApiResponse<>(true, "Journal lock status updated", updated)
                ))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<List<JournalEntryResponse>>> getMyJournals() {

        List<JournalEntryResponse> entries =
                journalEntryService.getByUserId(getCurrentUserId());

        return ResponseEntity.ok(
                new ApiResponse<>(true, "User journals fetched successfully", entries)
        );
    }

    @GetMapping("/me/mood/{mood}")
    public ResponseEntity<ApiResponse<List<JournalEntryResponse>>> getMyJournalsByMood(
            @PathVariable String mood) {

        List<JournalEntryResponse> entries =
                journalEntryService.getByUserIdAndMood(getCurrentUserId(), mood);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "User journals filtered by mood", entries)
        );
    }

    @GetMapping("/me/filter")
    public ResponseEntity<ApiResponse<List<JournalEntryResponse>>> filterByDateRange(
            @RequestParam String start,
            @RequestParam String end) {

        LocalDateTime startDate = LocalDateTime.parse(start);
        LocalDateTime endDate = LocalDateTime.parse(end);

        List<JournalEntryResponse> entries =
                journalEntryService.getByDateRange(
                        getCurrentUserId(), startDate, endDate);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Filtered by date range", entries)
        );
    }

    @GetMapping("/me/latest")
    public ResponseEntity<ApiResponse<JournalEntryResponse>> getLatestJournal() {

        JournalEntryResponse latest =
                journalEntryService.getLatestJournal(getCurrentUserId());

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Latest journal fetched", latest)
        );
    }

    private String getCurrentUserId() {
        return (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
    }

    @PatchMapping("/{id}/submit")
    public ResponseEntity<ApiResponse<JournalEntryResponse>> submitJournal(
            @PathVariable String id) {

        JournalEntryResponse response =
                journalEntryService.submitJournal(id, getCurrentUserId());

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Journal submitted successfully", response)
        );
    }
}