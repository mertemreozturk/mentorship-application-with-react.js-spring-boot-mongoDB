package com.example.obssinternship.controller;

import com.example.obssinternship.model.Rate;
import com.example.obssinternship.repository.RateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/rate")
public class RateController {

    @Autowired
    private RateRepository rateRepository;

    @PostMapping("/createRate")
    public ResponseEntity<?> createRate(@RequestBody Rate rate){
        return ResponseEntity.ok(rateRepository.save(rate));
    }

    @GetMapping("/getRates/{id}")
    public ResponseEntity<?> getRates(@PathVariable String id){
        return ResponseEntity.ok(rateRepository.findByPhaseId(id));
    }

    @PostMapping("/doesExist")
    public boolean doesExist(@RequestBody Rate rate){
        return rateRepository.findByPhaseIdAndAndMemberId(rate.getPhaseId(), rate.getMemberId()) == null;
    }

}
