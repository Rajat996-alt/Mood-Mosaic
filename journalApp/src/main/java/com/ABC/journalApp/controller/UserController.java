package com.ABC.journalApp.controller;

import com.ABC.journalApp.entity.Role;
import com.ABC.journalApp.entity.User;
import com.ABC.journalApp.repository.JournalEntryRepository;
import com.ABC.journalApp.repository.OrganizationRepository;
import com.ABC.journalApp.repository.UserRepository;
import com.ABC.journalApp.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;
    private final JournalEntryRepository journalRepository;
    private final OrganizationRepository organizationRepository;

    public UserController(UserRepository userRepository,
                          JournalEntryRepository journalRepository,
                          OrganizationRepository organizationRepository) {
        this.userRepository = userRepository;
        this.journalRepository = journalRepository;
        this.organizationRepository = organizationRepository;
    }

    @DeleteMapping("/me")
    public ResponseEntity<ApiResponse<String>> deleteAccount() {

        String userId = (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() == Role.ADMIN) {

            String orgId = user.getOrganizationId();

            userRepository.deleteByOrganizationId(orgId);
            journalRepository.deleteByOrganizationId(orgId);
            organizationRepository.deleteById(orgId);

        } else {

            journalRepository.deleteByUserId(userId);
            userRepository.deleteById(userId);
        }

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Account deleted successfully",
                        null
                )
        );
    }
}