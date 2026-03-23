package com.ABC.journalApp.service;

import com.ABC.journalApp.entity.CanvasProgress;
import com.ABC.journalApp.repository.CanvasProgressRepository;
import com.ABC.journalApp.dto.CanvasResponse;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class CanvasService {

    private final CanvasProgressRepository canvasRepository;

    private static final int DEFAULT_TOTAL_REGIONS = 25;
    private static final int UNLOCK_PER_JOURNAL = 3;

    public CanvasService(CanvasProgressRepository canvasRepository) {
        this.canvasRepository = canvasRepository;
    }

    public CanvasProgress getOrCreateActiveCanvas(String userId) {

        Optional<CanvasProgress> existing =
                canvasRepository.findByUserIdAndCompletedFalse(userId);

        if (existing.isPresent()) {

            CanvasProgress canvas = existing.get();

            if (canvas.getRegionColors() == null) {
                canvas.setRegionColors(new HashMap<>());
            }

            return canvas;
        }

        int nextCanvasNumber = getNextCanvasNumber(userId);

        CanvasProgress newCanvas =
                new CanvasProgress(userId, nextCanvasNumber, DEFAULT_TOTAL_REGIONS);

        newCanvas.setRegionColors(new HashMap<>());

        return canvasRepository.save(newCanvas);
    }

    public void updateLatestMood(String userId, String mood) {

        CanvasProgress canvas = getOrCreateActiveCanvas(userId);

        canvas.setLatestMood(mood);

        canvasRepository.save(canvas);
    }

    public CanvasProgress saveCanvas(CanvasProgress canvas) {

        CanvasProgress existing = canvasRepository.findById(canvas.getId())
                .orElseThrow(() -> new RuntimeException("Canvas not found"));

        if (existing.isCompleted()) {
            throw new RuntimeException("Completed canvas cannot be modified");
        }

        Map<String, String> regionColors =
                canvas.getRegionColors() == null
                        ? new HashMap<>()
                        : canvas.getRegionColors();

        existing.setRegionColors(regionColors);
        existing.setFilledRegions(regionColors.size());

        if (!existing.isCompleted()
                && existing.getFilledRegions() >= existing.getTotalRegions()) {

            existing.setCompleted(true);
            existing.setEndDate(LocalDateTime.now());
            existing.setReflectionLine(generateReflectionLine());
        }

        return canvasRepository.save(existing);
    }

    public List<CanvasProgress> getCanvasGallery(String userId) {
        return canvasRepository.findByUserIdOrderByCanvasNumberDesc(userId);
    }

    private int getNextCanvasNumber(String userId) {

        List<CanvasProgress> canvases =
                canvasRepository.findByUserIdOrderByCanvasNumberDesc(userId);

        if (canvases.isEmpty()) {
            return 1;
        }

        return canvases.get(0).getCanvasNumber() + 1;
    }

    private String generateReflectionLine() {

        String[] lines = {
                "Through shifting emotions and evolving days, this canvas reflects resilience in color.",
                "From light to shadow and back again, your journey has painted strength and growth.",
                "Every shade tells a story — together they form something beautifully whole.",
                "Moments changed, moods evolved, yet the art remained beautifully yours.",
                "Even through emotional tides, you created something vibrant and meaningful."
        };

        return lines[new Random().nextInt(lines.length)];
    }

    public CanvasResponse mapToResponse(CanvasProgress canvas) {

        return new CanvasResponse(
                canvas.getId(),
                canvas.getCanvasNumber(),
                canvas.getStartDate(),
                canvas.getEndDate(),
                canvas.isCompleted(),
                canvas.getRegionColors(),
                canvas.getTotalRegions(),
                canvas.getFilledRegions(),
                canvas.getReflectionLine(),
                canvas.getLatestMood()
        );
    }
    public CanvasProgress getCanvasById(String canvasId) {

        return canvasRepository.findById(canvasId)
                .orElseThrow(() -> new RuntimeException("Canvas not found"));

    }
}