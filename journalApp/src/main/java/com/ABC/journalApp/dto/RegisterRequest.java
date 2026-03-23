package com.ABC.journalApp.dto;

import jakarta.validation.constraints.NotBlank;

public class RegisterRequest {

    @NotBlank
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    private String role; // USER or ADMIN

    // Only for ADMIN
    private String organizationName;

    // Only for USER joining org
    private String inviteCode;

    public String getEmail() { return email; }

    public String getPassword() { return password; }

    public String getRole() { return role; }

    public String getOrganizationName() { return organizationName; }

    public String getInviteCode() { return inviteCode; }

    public void setEmail(String email) { this.email = email; }

    public void setPassword(String password) { this.password = password; }

    public void setRole(String role) { this.role = role; }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public void setInviteCode(String inviteCode) {
        this.inviteCode = inviteCode;
    }
}