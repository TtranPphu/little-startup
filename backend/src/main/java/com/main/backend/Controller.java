package com.main.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.main.backend.authentication.models.User;
import com.main.backend.authentication.services.UserService;

@RestController
@RequestMapping("/api")
public class Controller {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public String hello() {
        return "Hello, Spring Boot is working!";
    }

    @GetMapping("/hello")
    public String helloApi() {
        return "Hello from API!";
    }

    @PostMapping("/users/register")
    public ResponseEntity<String> register(@RequestBody User user) {

        userService.register(user);

        return ResponseEntity.ok("User registered successfully!");
    }
}
