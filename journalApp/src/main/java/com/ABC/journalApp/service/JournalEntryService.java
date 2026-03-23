package com.ABC.journalApp.service;

import com.ABC.journalApp.dto.*;
import com.ABC.journalApp.entity.CanvasProgress;
import com.ABC.journalApp.entity.JournalEntry;
import com.ABC.journalApp.entity.User;
import com.ABC.journalApp.repository.JournalEntryRepository;
import com.ABC.journalApp.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.Comparator;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JournalEntryService {

    private final JournalEntryRepository journalEntryRepository;
    private final CanvasService canvasService;
    private final UserRepository userRepository;
    private final RestTemplate restTemplate;

    public JournalEntryService(JournalEntryRepository journalEntryRepository,
                               UserRepository userRepository,
                               CanvasService canvasService,
                               RestTemplate restTemplate) {
        this.journalEntryRepository = journalEntryRepository;
        this.userRepository = userRepository;
        this.canvasService = canvasService;
        this.restTemplate = restTemplate;
    }

    public JournalEntryResponse createEntry(JournalEntryRequest request) {

        JournalEntry entry = new JournalEntry();

        String currentUserId = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal()
                .toString();

        User user = userRepository.findById(currentUserId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        entry.setUserId(currentUserId);
        entry.setOrganizationId(user.getOrganizationId());

        entry.setTitle(request.getTitle());
        entry.setContent(request.getContent());

        entry.setStatus("DRAFT");
        entry.setPredictedMood(null);
        entry.setMoodConfidence(null);

        JournalEntry saved = journalEntryRepository.save(entry);

        return mapToResponse(saved);
    }

    public JournalEntryResponse submitJournal(String id, String currentUserId) {

        JournalEntry entry = journalEntryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Journal not found"));

        if (!entry.getUserId().equals(currentUserId)) {
            throw new RuntimeException("Access denied");
        }

        if ("COMPLETED".equals(entry.getStatus())) {
            return mapToResponse(entry);
        }

        try {

            String aiUrl = "http://127.0.0.1:8001/predict";

            Map<String, String> requestBody = new HashMap<>();
            requestBody.put("text", entry.getContent());

            ResponseEntity<Map> response =
                    restTemplate.postForEntity(aiUrl, requestBody, Map.class);

            Map<String, Object> aiResult = response.getBody();

            if (aiResult != null) {

                String mood = (String) aiResult.get("predictedMood");

                Object confObj = aiResult.get("confidence");
                Double confidence = confObj instanceof Number
                        ? ((Number) confObj).doubleValue()
                        : 0.0;

                entry.setPredictedMood(mood != null ? mood : "Neutral");
                entry.setMoodConfidence(confidence);
            }

        } catch (Exception e) {
            entry.setPredictedMood("Neutral");
            entry.setMoodConfidence(0.0);
        }

        entry.setStatus("COMPLETED");

        JournalEntry saved = journalEntryRepository.save(entry);

        if (saved.getPredictedMood() != null) {
            canvasService.updateLatestMood(currentUserId, saved.getPredictedMood());
        }

        return mapToResponse(saved);
    }

    public List<JournalEntryResponse> getAll() {
        return journalEntryRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public Optional<JournalEntryResponse> getById(String id, String currentUserId) {

        Optional<JournalEntry> optional = journalEntryRepository.findById(id);

        if (optional.isEmpty()) {
            return Optional.empty();
        }

        JournalEntry entry = optional.get();

        if (!entry.getUserId().equals(currentUserId)) {
            throw new RuntimeException("Access denied");
        }

        return Optional.of(mapToResponse(entry));
    }

    public Optional<JournalEntryResponse> updateEntry(
            String id,
            JournalEntryRequest request,
            String currentUserId) {

        Optional<JournalEntry> optional = journalEntryRepository.findById(id);

        if (optional.isEmpty()) {
            return Optional.empty();
        }

        JournalEntry entry = optional.get();

        if (!entry.getUserId().equals(currentUserId)) {
            throw new RuntimeException("Access denied");
        }

        if (entry.isLocked()) {
            throw new IllegalStateException("Locked journal cannot be updated.");
        }

        entry.setTitle(request.getTitle());
        entry.setContent(request.getContent());

        JournalEntry updated = journalEntryRepository.save(entry);

        return Optional.of(mapToResponse(updated));
    }

    public void deleteById(String id, String currentUserId) {

        Optional<JournalEntry> optional = journalEntryRepository.findById(id);

        if (optional.isEmpty()) {
            return;
        }

        JournalEntry entry = optional.get();

        if (!entry.getUserId().equals(currentUserId)) {
            throw new RuntimeException("Access denied");
        }

        if (entry.isLocked()) {
            throw new IllegalStateException("Locked journal cannot be deleted.");
        }

        journalEntryRepository.deleteById(id);
    }

    private JournalEntryResponse mapToResponse(JournalEntry entry) {
        return new JournalEntryResponse(
                entry.getId(),
                entry.getTitle(),
                entry.getContent(),
                entry.getPredictedMood(),
                entry.getMoodConfidence(),
                entry.isLocked(),
                entry.getCreatedAt()
        );
    }

    public Optional<JournalEntryResponse> toggleLock(String id, String currentUserId) {

        Optional<JournalEntry> optional = journalEntryRepository.findById(id);

        if (optional.isEmpty()) {
            return Optional.empty();
        }

        JournalEntry entry = optional.get();

        if (!entry.getUserId().equals(currentUserId)) {
            throw new RuntimeException("Access denied");
        }

        entry.setLocked(!entry.isLocked());

        JournalEntry updated = journalEntryRepository.save(entry);

        return Optional.of(mapToResponse(updated));
    }

    public List<JournalEntryResponse> getByUserId(String userId) {

        return journalEntryRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<JournalEntryResponse> getByUserIdAndMood(String userId, String mood) {

        return journalEntryRepository
                .findByUserIdAndPredictedMood(userId, mood)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public MoodSummaryResponse getMoodSummary(String userId) {

        long happy = journalEntryRepository
                .countByUserIdAndStatusAndPredictedMood(userId, "COMPLETED", "Happy");

        long sad = journalEntryRepository
                .countByUserIdAndStatusAndPredictedMood(userId, "COMPLETED", "Sad");

        long angry = journalEntryRepository
                .countByUserIdAndStatusAndPredictedMood(userId, "COMPLETED", "Angry");

        long anxious = journalEntryRepository
                .countByUserIdAndStatusAndPredictedMood(userId, "COMPLETED", "Anxious");

        long calm = journalEntryRepository
                .countByUserIdAndStatusAndPredictedMood(userId, "COMPLETED", "Calm");

        long neutral = journalEntryRepository
                .countByUserIdAndStatusAndPredictedMood(userId, "COMPLETED", "Neutral");

        return new MoodSummaryResponse(
                happy,
                sad,
                angry,
                anxious,
                calm,
                neutral
        );
    }

    public StreakResponse calculateStreak(String userId) {

        List<JournalEntry> entries =
                journalEntryRepository
                        .findByUserIdAndStatusOrderByCreatedAtDesc(userId, "COMPLETED");

        if (entries.isEmpty()) {
            return new StreakResponse(0);
        }

        int streak = 0;
        LocalDate checkDate = LocalDate.now();

        for (JournalEntry entry : entries) {

            LocalDate entryDate = entry.getCreatedAt().toLocalDate();

            if (entryDate.equals(checkDate)) {
                streak++;
                checkDate = checkDate.minusDays(1);
            } else if (entryDate.isBefore(checkDate)) {
                break;
            }
        }

        return new StreakResponse(streak);
    }

    public MoodTransitionResponse calculateMoodTransitions(String userId) {

        List<JournalEntry> entries =
                journalEntryRepository
                        .findByUserIdAndStatusOrderByCreatedAtDesc(userId, "COMPLETED");

        entries.sort(Comparator.comparing(JournalEntry::getCreatedAt));

        Map<String, Long> transitions = new HashMap<>();

        for (int i = 1; i < entries.size(); i++) {

            String prevMood = entries.get(i - 1).getPredictedMood();
            String currentMood = entries.get(i).getPredictedMood();

            if (prevMood != null && currentMood != null) {

                String key = prevMood + " -> " + currentMood;

                transitions.put(key,
                        transitions.getOrDefault(key, 0L) + 1);
            }
        }

        return new MoodTransitionResponse(transitions);
    }

    public WeeklySummaryResponse getWeeklySummary(String userId) {

        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);

        List<JournalEntry> recentEntries =
                journalEntryRepository
                        .findByUserIdAndStatusAndCreatedAtAfter(
                                userId,
                                "COMPLETED",
                                sevenDaysAgo
                        );

        Map<String, Long> moodDistribution = new HashMap<>();

        for (JournalEntry entry : recentEntries) {

            String mood = entry.getPredictedMood();

            if (mood != null) {
                moodDistribution.put(
                        mood,
                        moodDistribution.getOrDefault(mood, 0L) + 1
                );
            }
        }

        return new WeeklySummaryResponse(recentEntries.size(), moodDistribution);
    }

    public List<JournalEntryResponse> getByDateRange(
            String userId,
            LocalDateTime start,
            LocalDateTime end) {

        return journalEntryRepository
                .findByUserIdAndCreatedAtBetween(userId, start, end)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public MonthlySummaryResponse getMonthlySummary(String userId) {

        YearMonth currentMonth = YearMonth.now();

        LocalDateTime startOfMonth =
                currentMonth.atDay(1).atStartOfDay();

        LocalDateTime endOfMonth =
                currentMonth.atEndOfMonth().atTime(23, 59, 59);

        List<JournalEntry> monthlyEntries =
                journalEntryRepository
                        .findByUserIdAndStatusAndCreatedAtBetween(
                                userId,
                                "COMPLETED",
                                startOfMonth,
                                endOfMonth
                        );

        Map<String, Long> moodDistribution = new HashMap<>();

        for (JournalEntry entry : monthlyEntries) {

            String mood = entry.getPredictedMood();

            if (mood != null) {
                moodDistribution.put(
                        mood,
                        moodDistribution.getOrDefault(mood, 0L) + 1
                );
            }
        }

        return new MonthlySummaryResponse(
                monthlyEntries.size(),
                moodDistribution
        );
    }

    public JournalEntryResponse getLatestJournal(String userId) {

        JournalEntry latest = journalEntryRepository
                .findTopByUserIdOrderByCreatedAtDesc(userId)
                .orElseThrow(() -> new RuntimeException("No journal found for user"));

        return mapToResponse(latest);
    }
}