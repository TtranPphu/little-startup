package com.main.backend.authentication.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.main.backend.authentication.models.User;
import com.main.backend.authentication.models.VerificationToken;
import com.main.backend.authentication.repositories.UserRepo;
import com.main.backend.authentication.repositories.VerificationTokenRepo;

@Service
public class VerificationTokenService {

    @Autowired
    private VerificationTokenRepo verificationTokenRepo;

    @Autowired
    private UserRepo userRepo;

    public void createVerificationToken(User user, String token) {
        VerificationToken myToken = new VerificationToken(token, user, 15);
        verificationTokenRepo.save(myToken);
    }

    public VerificationToken getVerificationToken(String token) {
        return verificationTokenRepo.findByToken(token);
    }

    public boolean verifyToken(String token) {
        
        VerificationToken verificationToken = getVerificationToken(token);
        if (verificationToken == null) {
            return false;
        }
        if (verificationToken.getExpiryDate().before(new java.util.Date())) {
            return false;
        }
        User user = verificationToken.getUser();
        user.setEnable(true);
        userRepo.save(user);
        verificationTokenRepo.delete(verificationToken);
        
        return true;
    }
}
