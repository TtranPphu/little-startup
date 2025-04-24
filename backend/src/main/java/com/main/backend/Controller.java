package com.main.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class Controller {

    @GetMapping("/")
    public String hello() {
        return "Hello, Spring Boot is working!";
    }

    @GetMapping("/hello")
    public String helloApi() {
        return "Hello from API!";
    }
}
