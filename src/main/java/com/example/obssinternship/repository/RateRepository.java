package com.example.obssinternship.repository;

import com.example.obssinternship.model.Rate;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RateRepository extends MongoRepository<Rate, String> {

    List<Rate> findByPhaseId(String phaseId);
}
