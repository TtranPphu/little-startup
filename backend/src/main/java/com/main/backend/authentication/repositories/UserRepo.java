package com.main.backend.authentication.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.main.backend.authentication.models.User;

@Repository
public interface UserRepo extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
}
