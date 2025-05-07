package com.main.backend.videoHandle.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VideoAddResponseDto {
    private String id;
    private String m3u8Url;
}
