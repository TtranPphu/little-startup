package com.main.backend.video.controllers;

import com.main.backend.video.dtos.VideoResponseDto;
import com.main.backend.video.services.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/videos")
@RequiredArgsConstructor
public class VideoController {

    private final VideoService videoService;

    @PostMapping("/v1/upload")
    public ResponseEntity<VideoResponseDto> uploadVideo(@RequestParam("file") MultipartFile file) throws Exception {
        VideoResponseDto response = videoService.uploadVideo(file);
        return ResponseEntity.ok(response);
    }
}
