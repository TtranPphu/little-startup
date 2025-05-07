package com.main.backend.videoHandle.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.main.backend.videoHandle.models.Video;

@Repository
public interface VideoRepo extends MongoRepository<Video, String> {
}
