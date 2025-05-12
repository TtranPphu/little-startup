package com.main.backend.authentication.services;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.main.backend.authentication.dtos.AuthenticationResponse;
import com.main.backend.authentication.models.Role;
import com.main.backend.authentication.models.User;
import com.main.backend.authentication.repositories.RoleRepo;
import com.main.backend.authentication.repositories.UserRepo;

@Service
@Transactional
public class AuthenticationService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private RoleRepo roleRepo;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private TokenService tokenService;

    public User register(String role, String username, String password, String email) throws Exception {
        try {
            Role userRole = roleRepo.findByAuthority(role.toUpperCase()).get();
            Set<Role> roles = new HashSet<>();
            roles.add(userRole);

            User newUser = userRepo.save(
                    new User(null, username, encoder.encode(password), email, false, roles));
            return newUser;
        } catch (Exception e) {
            throw new Exception("User already exists");
        }
    }

    public AuthenticationResponse login(String role, String username, String password) throws Exception {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password));

        String token = tokenService.generateJwt(auth);

        User user = userRepo.findByUsername(username).orElse(new User());

        if (!user.getAuthorities().contains(roleRepo.findByAuthority(role.toUpperCase()).get())) {
            throw new Exception("User does not have the required role");
        }

        // Should not pass token in because we are using Http-Only Cookies for JWT
        return new AuthenticationResponse(user.getDto(), token);
    }
}
