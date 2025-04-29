package com.main.backend.videoHandle.utils;

import java.io.File;

public class FFmpegConverter {

    public static void convertMp4ToHls(File mp4File, File outputDir) throws Exception {
        try {
            if (!outputDir.exists()) {
                outputDir.mkdirs();
            }

            String outputPath = new File(outputDir, "index.m3u8").getAbsolutePath();
            ProcessBuilder builder = new ProcessBuilder(
                    "ffmpeg", "-i", mp4File.getAbsolutePath(),
                    "-codec:", "copy",
                    "-start_number", "0",
                    "-hls_time", "5",
                    "-hls_list_size", "0",
                    "-f", "hls",
                    outputPath);

            builder.redirectErrorStream(true);
            Process process = builder.start();
            int exitCode = process.waitFor();
            if (exitCode != 0) {
                throw new Exception("FFmpeg failed with exit code " + exitCode);
            }
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }

    }
}
