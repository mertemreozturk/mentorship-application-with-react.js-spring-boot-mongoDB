package com.example.obssinternship.controller;

import com.example.obssinternship.model.Topic;
import com.example.obssinternship.repository.MentorRepository;
import com.example.obssinternship.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/topic")
public class TopicController {

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private MentorRepository mentorRepository;

    @PreAuthorize("hasRole('ROLE_MANAGERS')")
    @PostMapping("/addTopic")
    public ResponseEntity<?> addTopic(@RequestBody Topic topic){
        topicRepository.save(topic);
        return ResponseEntity.ok("okey");
    }

    @GetMapping("/getAllTopics")
    public ResponseEntity<List<String>> getAllTopics(){
        List<String> topics = new ArrayList<>();
        for(Topic t:topicRepository.findAll()){
            topics.add(t.getDescription());
        }
        return ResponseEntity.ok(topics);
    }

    @PostMapping("/getSubtopics")
    public ResponseEntity<List<String>> getSubtopics(@RequestBody Topic topic){
        return ResponseEntity.ok(topicRepository.findByDescription(topic.getDescription()).getSubtopics());
    }

    //@PreAuthorize("#authentication.principal.roles == 'ROLE_MANAGERS'")
    @PreAuthorize("hasRole('ROLE_MANAGERS')")
    @PostMapping("/deleteTopic")
    public ResponseEntity<?> deleteTopic(@RequestBody Topic topic){
        Topic t = topicRepository.findByDescription(topic.getDescription());
        topicRepository.delete(t);
        return ResponseEntity.ok("Deleted");
    }
}
