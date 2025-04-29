package com.main.backend.videoHandle.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "little_videos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Video {
    @Id
    private String id;
    private String originalFilename;
    private String m3u8Url;
    private String storagePath;
    private long uploadTime;
}
