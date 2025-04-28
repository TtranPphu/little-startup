package com.main.backend.video.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VideoResponseDto {
    private String id;
    private String m3u8Url;
}
