package com.example.obssinternship.repository;

import com.example.obssinternship.model.Mentor;
import org.springframework.data.convert.WritingConverter;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

@WritingConverter
public interface MentorRepository extends MongoRepository<Mentor, String> {

    List<Mentor> findByIsAccepted(Boolean isAccepted);

    List<Mentor> findByUsername(String username);

    @Query("{ 'about' : { $regex: ?0 } }")
    List<Mentor> findMentorByRegexpAbout(String about);

    List<Mentor> findByTopicAndSubtopicsContainsAndIsAccepted(String topic, List<String> subtopics, boolean isAccepted);

}
