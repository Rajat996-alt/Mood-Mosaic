package com.ABC.journalApp.controller;

import com.ABC.journalApp.dto.*;
import com.ABC.journalApp.response.ApiResponse;
import com.ABC.journalApp.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(
            @RequestBody RegisterRequest request) {

        AuthResponse response = authService.register(request);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "User registered successfully",
                        response
                )
        );
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @RequestBody AuthRequest request) {

        AuthResponse response = authService.login(request);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Login successful",
                        response
                )
        );
    }
}