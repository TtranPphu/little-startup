package com.main.backend.video.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VideoDeleteResponseDto {
    private String id;
    private String message;
}
