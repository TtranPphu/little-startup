package com.main.backend.configurations;

import java.io.IOException;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtCookieFilter extends OncePerRequestFilter {

    @Override
    @SuppressWarnings("null")
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        // Skip JWT processing for authentication endpoints
        String path = request.getRequestURI();
        if (path.startsWith("/auth/") || path.startsWith("/h2-console")) {
            filterChain.doFilter(request, response);
            return;
        }

        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (cookie.getName().equals("jwt")) {
                    String token = cookie.getValue();

                    // Take the JWT and add it to Authorization Header (so Spring Security can
                    // process it)
                    HttpServletRequestWrapper requestWrapper = new HttpServletRequestWrapper(request) {
                        @Override
                        public String getHeader(String name) {
                            if (name.equalsIgnoreCase("Authorization")) {
                                return "Bearer " + token;
                            }
                            return super.getHeader(name);
                        }
                    };

                    filterChain.doFilter(requestWrapper, response);
                    return;
                }
            }
        }
        filterChain.doFilter(request, response);
    }
}
