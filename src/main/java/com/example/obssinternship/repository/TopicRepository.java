package com.example.obssinternship.repository;

import com.example.obssinternship.model.Topic;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TopicRepository extends MongoRepository<Topic, String> {
}
