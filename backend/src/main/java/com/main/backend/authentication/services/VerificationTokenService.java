package com.main.backend.authentication.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.main.backend.authentication.models.User;
import com.main.backend.authentication.models.VerificationToken;
import com.main.backend.authentication.repositories.VerificationTokenRepo;

@Service
public class VerificationTokenService {

    @Autowired
    private VerificationTokenRepo verificationTokenRepo;

    public void createVerificationToken(User user, String token) {
        VerificationToken myToken = new VerificationToken(null, token, user, null);
        verificationTokenRepo.save(myToken);
    }

    public VerificationToken getVerificationToken(String token) {
        return verificationTokenRepo.findByToken(token);
    }
}
