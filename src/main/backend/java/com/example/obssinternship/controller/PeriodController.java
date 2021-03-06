package com.example.obssinternship.controller;

import com.example.obssinternship.model.Period;
import com.example.obssinternship.model.Phase;
import com.example.obssinternship.payload.request.PeriodRequest;
import com.example.obssinternship.repository.PeriodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Date;

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

    @PostMapping("/getPeriod")
    public ResponseEntity<?> getPeriod(@RequestBody Period period){
        return ResponseEntity.ok(periodRepository.findByMentorIdAndMenteeId(period.getMentorId(),
                period.getMenteeId()));
    }

    @PostMapping("/getPeriodName")
    public String getPeriodName(@RequestBody Period period){
        return periodRepository.findByMentorIdAndMenteeId(period.getMentorId(), period.getMenteeId()).getIsBegin();
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

    @PutMapping("/triggerPhase")
    public ResponseEntity<?> triggerPhase(@RequestBody Period period){
        Period period1 = periodRepository.findByMentorIdAndMenteeId(period.getMentorId(), period.getMenteeId());

        boolean flag = true;
        for(Phase phase: period1.getPhases()){
            System.out.println(phase.getPhaseName()+"--"+phase.getIsCompleted());
            if ( phase.getIsCompleted() != null && phase.getIsCompleted().equals("Devam Ediyor")){
                phase.setIsCompleted("Faz Tamamlandı");
            }

            if ( phase.getIsCompleted() == null){
                phase.setStartDate(Calendar.getInstance().getTime());
                phase.setIsCompleted("Devam Ediyor");
                period1.setIsBegin(phase.getPhaseName());
                flag = false;
                break;
            }
        }

        if(flag){
            period1.setIsBegin("Tamamlandı");
        }

        periodRepository.save(period1);
        return ResponseEntity.ok(period1);
    }

    @PostMapping("/controlPhase")
    public boolean controlPhase(@RequestBody PeriodRequest periodRequest){
        Period period1 = periodRepository.findByMentorIdAndMenteeId(periodRequest.getMentorId(), periodRequest.getMenteeId());

        for(Phase phase: period1.getPhases()){
            if ( phase.getIsCompleted().equals("Devam Ediyor") && phase.getId().equals(periodRequest.getPhaseId())){
                Date currentDate = Calendar.getInstance().getTime();
                return currentDate.compareTo(phase.getEndDate()) > 0;
            }
        }
        return false;
    }

}
