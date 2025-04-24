package com.main.backend.authentication.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.main.backend.authentication.models.Role;

@Repository
public interface RoleRepo extends MongoRepository<Role, Integer> {
    Optional<Role> findByAuthority(String authority);

    boolean existsByAuthority(String authority);
}
