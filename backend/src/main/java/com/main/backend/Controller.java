package com.main.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api")
public class Controller {

    @Operation(summary = "Try saying hello to the backend")
    @GetMapping("/hello")
    public String helloApi() {
        return "Hello from API!";
    }
}