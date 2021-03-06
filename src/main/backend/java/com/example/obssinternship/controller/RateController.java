package com.example.obssinternship.controller;

import com.example.obssinternship.model.Rate;
import com.example.obssinternship.repository.RateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/rate")
public class RateController {

    @Autowired
    private RateRepository rateRepository;

    @PostMapping("/createRate")
    public ResponseEntity<?> createRate(@RequestBody Rate rate) {
        System.out.println(rate.getMemberId()+"-"+rate.getName());
        rate.setDate(Calendar.getInstance().getTime());
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

    @PostMapping("/rates")
    public ResponseEntity<?> rates(@RequestBody Rate rate){
        List<String> ids = new ArrayList<>();
        for(Rate rate1: rateRepository.findByMemberId(rate.getMemberId())){
            ids.add(rate1.getPhaseId());
        }
        return ResponseEntity.ok(ids);
    }

}
