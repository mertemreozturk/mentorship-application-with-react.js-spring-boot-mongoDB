package com.example.obssinternship.controller;

import com.example.obssinternship.model.Mentee;
import com.example.obssinternship.model.Mentor;
import com.example.obssinternship.model.Phase;
import com.example.obssinternship.repository.MenteeRepository;
import com.example.obssinternship.repository.MentorRepository;
import com.example.obssinternship.repository.PhaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/phase")
public class PhaseController {

    @Autowired
    private PhaseRepository phaseRepository;

    @Autowired
    private MentorRepository mentorRepository;

    @Autowired
    private MenteeRepository menteeRepository;

    @PostMapping("/addPhase")
    public ResponseEntity<?> addPhase(@RequestBody Phase phase){
        Mentor mentor = mentorRepository.findById(phase.getMentorId()).get();

        if(mentor.getHowManyPhases() == phaseRepository.
                findByMenteeIdAndMentorId(phase.getMenteeId(), phase.getMentorId()).size()){
            return ResponseEntity.ok("Bütün fazlar tamamlandı");
        }

        phaseRepository.save(phase);

        /*List<Phase> phaseListForMentor = mentor.getPhases();
        phaseListForMentor.add(phase);
        mentor.setPhases(phaseListForMentor);
        mentorRepository.save(mentor);

        Mentee mentee = menteeRepository.findById(phase.getMenteeId()).get();
        List<Phase> phaseListForMentee = mentee.getPhases();
        phaseListForMentee.add(phase);
        mentee.setPhases(phaseListForMentee);
        menteeRepository.save(mentee);*/

        return ResponseEntity.ok(phase);
    }
}
