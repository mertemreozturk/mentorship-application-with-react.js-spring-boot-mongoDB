package com.example.obssinternship.repository;

import com.example.obssinternship.model.Phase;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PhaseRepository extends MongoRepository<Phase, String> {

    //List<Phase> findByMenteeIdAndMentorId(String menteeId, String mentorId);
}
