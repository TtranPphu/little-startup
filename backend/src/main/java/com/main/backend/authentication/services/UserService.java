package com.main.backend.authentication.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.main.backend.authentication.models.User;
import com.main.backend.authentication.repositories.UserRepo;

@Service
public class UserService {
    
    @Autowired
    private UserRepo userRepo;

    public void register(User user) {
        userRepo.save(user);
    }

}
