package com.ABC.journalApp.repository;

import com.ABC.journalApp.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    List<User> findByOrganizationId(String organizationId);

    void deleteByOrganizationId(String organizationId);
}