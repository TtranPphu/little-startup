package com.main.backend.authentication.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.main.backend.authentication.models.User;
import com.main.backend.authentication.models.VerificationToken;

public interface VerificationTokenRepo extends MongoRepository<VerificationToken, String> {
    
    VerificationToken findByToken(String token);

    VerificationToken findByUser(User user);

}
