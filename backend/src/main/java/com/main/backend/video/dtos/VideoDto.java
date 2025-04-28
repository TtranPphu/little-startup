package com.main.backend.video.dtos;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class VideoDto {
    private MultipartFile file;
}
