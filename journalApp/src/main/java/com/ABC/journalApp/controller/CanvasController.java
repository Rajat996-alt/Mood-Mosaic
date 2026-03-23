package com.ABC.journalApp.controller;

import com.ABC.journalApp.dto.CanvasResponse;
import com.ABC.journalApp.entity.CanvasProgress;
import com.ABC.journalApp.response.ApiResponse;
import com.ABC.journalApp.service.CanvasService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/canvas")
public class CanvasController {

    private final CanvasService canvasService;

    public CanvasController(CanvasService canvasService) {
        this.canvasService = canvasService;
    }

    private String getCurrentUserId() {
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal()
                .toString();
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<CanvasResponse>> getActiveCanvas() {

        String userId = getCurrentUserId();

        CanvasResponse canvas =
                canvasService.mapToResponse(
                        canvasService.getOrCreateActiveCanvas(userId)
                );

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Active canvas fetched", canvas)
        );
    }

    @GetMapping("/me/gallery")
    public ResponseEntity<ApiResponse<List<CanvasResponse>>> getGallery() {

        String userId = getCurrentUserId();

        List<CanvasResponse> canvases =
                canvasService.getCanvasGallery(userId)
                        .stream()
                        .map(canvasService::mapToResponse)
                        .toList();

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Canvas gallery fetched", canvases)
        );
    }
    @GetMapping("/{canvasId}")
    public ResponseEntity<CanvasProgress> getCanvasById(@PathVariable String canvasId) {
        return ResponseEntity.ok(canvasService.getCanvasById(canvasId));
    }

    @PostMapping("/me")
    public ResponseEntity<ApiResponse<CanvasResponse>> saveCanvas(
            @RequestBody CanvasProgress canvas) {

        String userId = getCurrentUserId();
        canvas.setUserId(userId);

        CanvasResponse updated =
                canvasService.mapToResponse(
                        canvasService.saveCanvas(canvas)
                );

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Canvas saved successfully", updated)
        );
    }
}