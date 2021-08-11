package com.example.obssinternship.controller;

import com.example.obssinternship.model.Period;
import com.example.obssinternship.model.Phase;
import com.example.obssinternship.payload.request.PeriodRequest;
import com.example.obssinternship.repository.PeriodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/period")
public class PeriodController {

    @Autowired
    private PeriodRepository periodRepository;

    @PostMapping("/addPeriod")
    public ResponseEntity<?> addPeriod(@RequestBody Period period){
        period.setIsBegin("Başlamadı");
        period.setStartDate(Calendar.getInstance().getTime());
        return ResponseEntity.ok(periodRepository.save(period));
    }

    @PostMapping("getPeriod")
    public ResponseEntity<?> getPeriod(@RequestBody Period period){
        return ResponseEntity.ok(periodRepository.findByMentorIdAndMenteeId(period.getMentorId(),
                period.getMenteeId()));
    }

    @PutMapping("/createPhases")
    public ResponseEntity<?> createPhases(@RequestBody PeriodRequest periodRequest){
        Period period = periodRepository.findByMentorIdAndMenteeId(periodRequest.getMentorId(),
                periodRequest.getMenteeId());
        period.setPhases(periodRequest.getPhase());
        periodRepository.save(period);
        return ResponseEntity.ok(period);
    }

    @PostMapping("/getAllPhases")
    public ResponseEntity<?> getAllPhases(@RequestBody Period period){
        return ResponseEntity.ok( periodRepository.findByMentorIdAndMenteeId(period.getMentorId(),
                period.getMenteeId()).getPhases());
    }

    /*@PutMapping("triggerPhases")
    public ResponseEntity<?> triggerPhase(@RequestBody Period period){
        Period period1 =
        return ResponseEntity.ok();
    }*/

}
