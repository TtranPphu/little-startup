package com.main.backend.video.repositories;

import com.main.backend.video.models.Video;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoRepo extends MongoRepository<Video, String> {
}
