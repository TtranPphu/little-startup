package com.main.backend.common.dtos;

import java.time.Instant;
import lombok.Getter;

@Getter
public class ErrorResponse {
    private int status;
    private String message;
    private String timestamp;
    private String path;

    public ErrorResponse(int status, String message, String path) {
        this.status = status;
        this.message = message;
        this.timestamp = Instant.now().toString();
        this.path = path;
    }
}
