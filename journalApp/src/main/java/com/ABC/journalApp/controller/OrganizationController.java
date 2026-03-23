package com.ABC.journalApp.controller;

import com.ABC.journalApp.dto.OrganizationAnalyticsResponse;
import com.ABC.journalApp.entity.Organization;
import com.ABC.journalApp.entity.User;
import com.ABC.journalApp.response.ApiResponse;
import com.ABC.journalApp.service.OrganizationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/org")
public class OrganizationController {

    private final OrganizationService organizationService;

    public OrganizationController(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<String>> createOrganization(
            @RequestParam String name) {

        organizationService.createOrganization(name);

        return ResponseEntity.ok(
                new ApiResponse<>(true,
                        "Organization created successfully",
                        null)
        );
    }

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<User>>> getUsers() {

        String adminId = getCurrentUserId();

        List<User> users =
                organizationService.getUsersInOrganization(adminId);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Users fetched", users)
        );
    }

    @PostMapping("/assign/{userId}")
    public ResponseEntity<ApiResponse<String>> assignUser(
            @PathVariable String userId) {

        String adminId = getCurrentUserId();

        organizationService.assignUserToOrganization(adminId, userId);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "User assigned", null)
        );
    }

    private String getCurrentUserId() {
        return (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
    }

    @GetMapping("/analytics/summary")
    public ResponseEntity<ApiResponse<OrganizationAnalyticsResponse>> getOrgAnalytics() {

        String adminId = getCurrentUserId();

        OrganizationAnalyticsResponse response =
                organizationService.getOrganizationAnalytics(adminId);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Organization analytics fetched", response)
        );
    }
}