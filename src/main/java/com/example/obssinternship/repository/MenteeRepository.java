package com.example.obssinternship.repository;

import com.example.obssinternship.model.Mentee;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MenteeRepository extends MongoRepository<Mentee, String> {

    Mentee findByUserIdAndTopic(String userId, String topic);
}
