package com.ABC.journalApp.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "organizations")
public class Organization {

    @Id
    private String id;

    private String name;

    private String inviteCode;

    public Organization() {}

    public Organization(String name, String inviteCode) {
        this.name = name;
        this.inviteCode = inviteCode;
    }

    public String getId() { return id; }

    public String getName() { return name; }

    public String getInviteCode() { return inviteCode; }

    public void setName(String name) { this.name = name; }

    public void setInviteCode(String inviteCode) { this.inviteCode = inviteCode; }
}