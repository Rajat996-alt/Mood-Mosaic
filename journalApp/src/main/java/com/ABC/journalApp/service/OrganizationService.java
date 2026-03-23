package com.ABC.journalApp.service;

import com.ABC.journalApp.dto.OrganizationAnalyticsResponse;
import com.ABC.journalApp.entity.JournalEntry;
import com.ABC.journalApp.entity.Organization;
import com.ABC.journalApp.entity.User;
import com.ABC.journalApp.repository.JournalEntryRepository;
import com.ABC.journalApp.repository.OrganizationRepository;
import com.ABC.journalApp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrganizationService {

    private final UserRepository userRepository;
    private final JournalEntryRepository journalEntryRepository;
    private final OrganizationRepository organizationRepository;

    public OrganizationService(
            UserRepository userRepository,
            JournalEntryRepository journalEntryRepository,
            OrganizationRepository organizationRepository
    ) {
        this.userRepository = userRepository;
        this.journalEntryRepository = journalEntryRepository;
        this.organizationRepository = organizationRepository;
    }

    public OrganizationAnalyticsResponse getOrganizationAnalytics(
            String organizationId
    ) {

        List<User> users =
                userRepository.findByOrganizationId(organizationId);

        int totalUsers = users.size();

        long totalCompletedJournals = 0;

        Map<String, Long> moodDistribution = new HashMap<>();

        for (User user : users) {

            List<JournalEntry> journals =
                    journalEntryRepository
                            .findByUserIdAndStatus(user.getId(), "COMPLETED");

            totalCompletedJournals += journals.size();

            for (JournalEntry entry : journals) {

                String mood = entry.getPredictedMood();

                if (mood != null) {
                    moodDistribution.put(
                            mood,
                            moodDistribution.getOrDefault(mood, 0L) + 1
                    );
                }
            }
        }

        return new OrganizationAnalyticsResponse(
                totalUsers,
                totalCompletedJournals,
                moodDistribution
        );
    }

    public void createOrganization(String name) {

        Organization organization = new Organization();
        organization.setName(name);

        organizationRepository.save(organization);
    }

    public void assignUserToOrganization(String userId, String organizationId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setOrganizationId(organizationId);

        userRepository.save(user);
    }

    public List<User> getUsersInOrganization(String organizationId) {

        return userRepository.findByOrganizationId(organizationId);
    }
}