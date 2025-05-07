package com.main.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

    @GetMapping("/")
    public String hello() {
        return "Hello, Spring Boot is working!";
    }

    @GetMapping("/api/hello")
    public String helloApi() {
        return "Hello from API!";
    }
}
