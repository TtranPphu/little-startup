package com.main.backend.videoHandle.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.main.backend.videoHandle.dtos.VideoAddResponseDto;
import com.main.backend.videoHandle.dtos.VideoDeleteResponseDto;
import com.main.backend.videoHandle.services.VideoService;

@RestController
@RequestMapping("/api/videos")
@RequiredArgsConstructor
public class VideoHandleController {

    private final VideoService videoService;

    @PostMapping("/v1/upload")
    public ResponseEntity<VideoAddResponseDto> addVideo(@RequestParam("file") MultipartFile file) throws Exception {
        VideoAddResponseDto response = videoService.addVideo(file);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/v1/delete/{id}")
    public ResponseEntity<VideoDeleteResponseDto> deleteVideoById(@PathVariable String id) throws Exception {
        VideoDeleteResponseDto response = videoService.deleteVideoById(id);
        return ResponseEntity.ok(response);
    }

}
