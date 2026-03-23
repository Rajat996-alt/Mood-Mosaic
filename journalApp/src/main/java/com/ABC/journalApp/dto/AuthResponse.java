package com.ABC.journalApp.dto;

public class AuthResponse {

    private String token;
    private String role;
    private String organizationId;
    private String inviteCode;

    public AuthResponse() {}

    public AuthResponse(String token,
                        String role,
                        String organizationId,
                        String inviteCode) {

        this.token = token;
        this.role = role;
        this.organizationId = organizationId;
        this.inviteCode = inviteCode;
    }

    public String getToken() {
        return token;
    }

    public String getRole() {
        return role;
    }

    public String getOrganizationId() {
        return organizationId;
    }

    public String getInviteCode() {
        return inviteCode;
    }
}