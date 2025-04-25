package com.main.backend.authentication.controllers;

import java.time.Duration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.main.backend.authentication.dtos.AuthenticationRequest;
import com.main.backend.authentication.dtos.AuthenticationResponse;
import com.main.backend.authentication.dtos.UserDto;
import com.main.backend.authentication.services.AuthenticationService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authService;

    @GetMapping("/v1/test")
    public String test() {
        return "Hello from the authentication controller!";
    }

    @Operation(summary = "Register a new user")
    @PostMapping("/v1/register")
    public UserDto register(
            @RequestBody AuthenticationRequest auth,
            HttpServletRequest request) throws Exception {
        String role = request.getHeader("role");
        return authService.register(role, auth.getUsername(), auth.getPassword(), auth.getEmail());
    }

    @Operation(summary = "Login a user")
    @PostMapping("/v1/login")
    public ResponseEntity<UserDto> login(
            @RequestBody AuthenticationRequest auth,
            HttpServletRequest request,
            HttpServletResponse response) {

        try {
            String role = request.getHeader("role");

            AuthenticationResponse authResponse = authService.login(role, auth.getUsername(), auth.getPassword());

            String token = authResponse.getJwt();
            authResponse.setJwt(null); // Clear the JWT from the response body

            ResponseCookie cookie = ResponseCookie.from("jwt", token)
                    .httpOnly(true) // Prevent JavaScript access
                    .secure(true) // Use Secure flag (Only works on HTTPS)
                    .path("/") // Available for all paths
                    .maxAge(Duration.ofDays(1))
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

            return ResponseEntity.ok(authResponse.getUser());
        } catch (Exception e) {
            // Log the error
            System.err.println("Login error: " + e.getMessage());
            return ResponseEntity.status(401).body(null);
        }
    }

    @Operation(summary = "Logout a user")
    @PostMapping("/v1/logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {

        // Create an expired cookie to remove the JWT
        Cookie cookie = new Cookie("jwt", "");
        cookie.setHttpOnly(true);
        cookie.setSecure(true); // Ensure Secure flag is set in production (HTTPS)
        cookie.setPath("/");
        cookie.setMaxAge(0); // Expire immediately

        response.addCookie(cookie);

        return ResponseEntity.ok("Logout success");
    }
}
