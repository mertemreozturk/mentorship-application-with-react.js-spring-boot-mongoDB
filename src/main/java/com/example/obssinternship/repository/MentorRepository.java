package com.example.obssinternship.repository;

import com.example.obssinternship.model.Mentor;
import org.springframework.data.convert.WritingConverter;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

@WritingConverter
public interface MentorRepository extends MongoRepository<Mentor, String> {

    List<Mentor> findByIsAccepted(Boolean isAccepted);




}
