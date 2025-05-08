package com.main.backend.authentication.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.main.backend.authentication.dtos.UserDto;
import com.main.backend.authentication.models.User;
import com.main.backend.authentication.repositories.UserRepo;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private TokenService tokenService;

    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {

        return userRepo.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public UserDto getUserDtoFromCookies(HttpServletRequest request) {

        String username = "";
        for (Cookie cookie : request.getCookies()) {
            if (cookie.getName().equals("jwt")) {
                String token = cookie.getValue();
                username = tokenService.extractUserName(token);
                break;
            }
        }
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        UserDto userDto = user.getDto();

        return userDto;
    }

    public UserDto saveUser(User user) {
        User savedUser = userRepo.save(user);
        return savedUser.getDto();
    }
}
