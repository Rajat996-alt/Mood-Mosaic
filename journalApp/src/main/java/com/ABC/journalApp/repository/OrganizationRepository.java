package com.ABC.journalApp.repository;

import com.ABC.journalApp.entity.Organization;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface OrganizationRepository extends MongoRepository<Organization, String> {

    Optional<Organization> findByInviteCode(String inviteCode);

}