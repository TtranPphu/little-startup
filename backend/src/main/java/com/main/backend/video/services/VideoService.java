package com.main.backend.video.services;

import com.main.backend.video.dtos.VideoResponseDto;
import com.main.backend.video.models.Video;
import com.main.backend.video.repositories.VideoRepo;
import com.main.backend.video.utils.FFmpegConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final VideoRepo videoRepo;

    public VideoResponseDto uploadVideo(MultipartFile file) throws IOException, InterruptedException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Uploaded file is empty!");
        }

        String basePath = System.getProperty("user.dir") + "/data/videos";
        String originalFilename = file.getOriginalFilename();

        if (originalFilename == null) {
            throw new IllegalArgumentException("file's name can't not be empty!");
        }

        String filenameWithoutExt = originalFilename.replaceFirst("[.][^.]+$", "");
        String sanitizedFilename = filenameWithoutExt.trim().replaceAll("\\s+", "-");
        String uploadId = sanitizedFilename;

        File uploadDir = new File(basePath, uploadId);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        File uploadedFile = new File(uploadDir, file.getOriginalFilename());
        file.transferTo(uploadedFile);

        File hlsOutputDir = new File(uploadDir, "hls");
        if (!hlsOutputDir.exists()) {
            hlsOutputDir.mkdirs();
        }
        FFmpegConverter.convertMp4ToHls(uploadedFile, hlsOutputDir);

        if (uploadedFile.exists()) {
            boolean deleted = uploadedFile.delete();
            if (!deleted) {
                throw new IllegalArgumentException("Cant not delete origin file: " + uploadedFile.getAbsolutePath());
            }
        }

        String m3u8Url = "/data/videos/" + uploadId + "/hls/index.m3u8";

        Video video = Video.builder()
                .originalFilename(file.getOriginalFilename())
                .m3u8Url(m3u8Url)
                .storagePath(uploadDir.getAbsolutePath())
                .uploadTime(System.currentTimeMillis())
                .build();

        Video saved = videoRepo.save(video);

        return VideoResponseDto.builder()
                .id(saved.getId())
                .m3u8Url(saved.getM3u8Url())
                .build();
    }
}
