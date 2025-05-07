package com.main.backend.videoHandle.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VideoDeleteResponseDto {
    private String id;
    private String message;
}
