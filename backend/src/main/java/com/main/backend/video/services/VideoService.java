package com.main.backend.video.services;

import com.main.backend.video.dtos.VideoAddResponseDto;
import com.main.backend.video.dtos.VideoDeleteResponseDto;
import com.main.backend.video.models.Video;
import com.main.backend.video.repositories.VideoRepo;
import com.main.backend.video.utils.FFmpegConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final VideoRepo videoRepo;

    public VideoAddResponseDto addVideo(MultipartFile file) throws IOException, InterruptedException {
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

        return VideoAddResponseDto.builder()
                .id(saved.getId())
                .m3u8Url(saved.getM3u8Url())
                .build();
    }

    public VideoDeleteResponseDto deleteVideoById(String id) throws IOException, InterruptedException {
        Optional<Video> optionalVideo = videoRepo.findById(id);
        if (optionalVideo.isEmpty()) {
            throw new IllegalArgumentException("Not found Video with ID: " + id);
        }

        Video video = optionalVideo.get();

        File storageDir = new File(video.getStoragePath());
        if (storageDir.exists()) {
            deleteFolderRecursively(storageDir);
        }
        videoRepo.delete(video);

        return VideoDeleteResponseDto.builder()
                .id(id)
                .message("Video has deleted successfully!")
                .build();
    }

    private void deleteFolderRecursively(File folder) {
        File[] files = folder.listFiles();
        if (files != null) {
            for (File f : files) {
                if (f.isDirectory()) {
                    deleteFolderRecursively(f);
                } else {
                    f.delete();
                }
            }
        }
        folder.delete();
    }
}
