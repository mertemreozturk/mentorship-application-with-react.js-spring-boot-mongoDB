package com.example.obssinternship.controller;

import com.example.obssinternship.model.Topic;
import com.example.obssinternship.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/topic")
public class TopicController {

    @Autowired
    private TopicRepository topicRepository;

    @PostMapping("/addTopic")
    public ResponseEntity<?> addTopic(@RequestBody Topic topic){
        topicRepository.save(topic);
        return ResponseEntity.ok("okey");
    }

    @GetMapping("getAllTopics")
    public ResponseEntity<List<Topic>> getAllTopics(){
        return ResponseEntity.ok(topicRepository.findAll());
    }
}
