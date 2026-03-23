package com.ABC.journalApp.controller;

import com.ABC.journalApp.entity.Organization;
import com.ABC.journalApp.entity.User;
import com.ABC.journalApp.repository.OrganizationRepository;
import com.ABC.journalApp.repository.UserRepository;
import com.ABC.journalApp.response.ApiResponse;
import com.ABC.journalApp.service.OrganizationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final OrganizationService organizationService;
    private final UserRepository userRepository;
    private final OrganizationRepository organizationRepository;

    public AdminController(
            OrganizationService organizationService,
            UserRepository userRepository,
            OrganizationRepository organizationRepository
    ) {
        this.organizationService = organizationService;
        this.userRepository = userRepository;
        this.organizationRepository = organizationRepository;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/organization")
    public ResponseEntity<ApiResponse<Object>> getOrganizationDetails() {

        String userId = (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        User admin = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Organization org = organizationRepository
                .findById(admin.getOrganizationId())
                .orElseThrow(() -> new RuntimeException("Organization not found"));

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Organization fetched",
                        org
                )
        );
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/organization/analytics")
    public ResponseEntity<ApiResponse<?>> getOrgAnalytics() {

        String userId = (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        User admin = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String organizationId = admin.getOrganizationId();

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Organization analytics fetched",
                        organizationService.getOrganizationAnalytics(organizationId)
                )
        );
    }
}