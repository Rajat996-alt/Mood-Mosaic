package com.ABC.journalApp.service;

import com.ABC.journalApp.dto.AuthRequest;
import com.ABC.journalApp.dto.AuthResponse;
import com.ABC.journalApp.dto.RegisterRequest;
import com.ABC.journalApp.entity.Organization;
import com.ABC.journalApp.entity.Role;
import com.ABC.journalApp.entity.User;
import com.ABC.journalApp.repository.OrganizationRepository;
import com.ABC.journalApp.repository.UserRepository;
import com.ABC.journalApp.config.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final OrganizationRepository organizationRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
                       OrganizationRepository organizationRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {

        this.userRepository = userRepository;
        this.organizationRepository = organizationRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        Role role;

        try {
            role = Role.valueOf(request.getRole().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid role");
        }

        user.setRole(role);

        String inviteCodeToReturn = null;

        if (role == Role.ADMIN) {

            if (request.getOrganizationName() == null ||
                    request.getOrganizationName().isBlank()) {

                throw new RuntimeException("Organization name required for ADMIN");
            }

            String inviteCode = generateInviteCode(request.getOrganizationName());

            Organization organization =
                    new Organization(request.getOrganizationName(), inviteCode);

            Organization savedOrg = organizationRepository.save(organization);

            user.setOrganizationId(savedOrg.getId());

            inviteCodeToReturn = inviteCode;
        }
        if (role == Role.USER) {

            if (request.getInviteCode() != null &&
                    !request.getInviteCode().isBlank()) {

                Organization organization = organizationRepository
                        .findByInviteCode(request.getInviteCode())
                        .orElseThrow(() ->
                                new RuntimeException("Invalid invite code"));

                user.setOrganizationId(organization.getId());
            }
        }

        User savedUser = userRepository.save(user);

        String token = jwtUtil.generateToken(
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getRole().name()
        );

        return new AuthResponse(
                token,
                savedUser.getRole().name(),
                savedUser.getOrganizationId(),
                inviteCodeToReturn
        );
    }

    public AuthResponse login(AuthRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(
                user.getId(),
                user.getEmail(),
                user.getRole().name()
        );

        return new AuthResponse(
                token,
                user.getRole().name(),
                user.getOrganizationId(),
                null
        );
    }

    private String generateInviteCode(String orgName) {

        String cleaned = orgName.replaceAll("\\s+", "").toUpperCase();

        String prefix = cleaned.substring(0, Math.min(3, cleaned.length()));

        int random = new java.util.Random().nextInt(9000) + 1000;

        return prefix + random;
    }
}