package com.example.obssinternship.controller;


import com.example.obssinternship.model.Mentor;
import com.example.obssinternship.model.User;
import com.example.obssinternship.repository.MentorRepository;
import com.example.obssinternship.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.core.query.TextQuery;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/mentor")
public class MentorController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MentorRepository mentorRepository;

    @Autowired
    private MongoTemplate mongoTemplate;


    @PostMapping("/addMentor")
    public ResponseEntity<Mentor> addApply(@RequestBody Mentor mentor){
        User user = userRepository.findByUsername(mentor.getUsername()).get(0);
        mentor.setUserId(user.getId());
        mentor.setEmail(user.getEmail());
        return ResponseEntity.ok(mentorRepository.save(mentor));
    }

    @GetMapping("/allApplies")
    public ResponseEntity<List<Mentor>> getAllApplies(){
        return ResponseEntity.ok(mentorRepository.findByIsAccepted(false));
    }

    @PutMapping("/accept/{id}")
    public ResponseEntity<Mentor> accept(@PathVariable String id){
        Mentor mentor = mentorRepository.findById(id).get();
        mentor.setAccepted(true);
        return ResponseEntity.ok(mentorRepository.save(mentor));
    }

    @DeleteMapping("/reject/{id}")
    public ResponseEntity<?> reject(@PathVariable String id){
        Mentor mentor = mentorRepository.findById(id).get();
        mentorRepository.delete(mentor);
        return ResponseEntity.ok("deleted");
    }

    @GetMapping("/searchMentor/{textQuery}")
    public ResponseEntity<?> searchMentor(@PathVariable String textQuery){
        /*TextCriteria criteria = TextCriteria
                .forDefaultLanguage()
                .matching(searchPhrase);

        TextQuery query = TextQuery.queryText(criteria);

        List<Mentor> mentors = mongoTemplate.find(query, Mentor.class);*/

        /*TextQuery query = TextQuery.queryText(new TextCriteria().matchingAny(textQuery)).sortByScore();
        List<Mentor> result = mongoTemplate.find(query, Mentor.class, "mentor");*/
        return ResponseEntity.ok(mentorRepository.findMentorByRegexpAbout(textQuery));
    }
}
