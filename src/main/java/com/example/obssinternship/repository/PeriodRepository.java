package com.example.obssinternship.repository;

import com.example.obssinternship.model.Period;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PeriodRepository extends MongoRepository<Period, String> {

    Period findByMentorIdAndMenteeId(String mentorId, String menteeId);
}
