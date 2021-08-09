package com.example.obssinternship.controller;

import com.example.obssinternship.model.Mentee;
import com.example.obssinternship.model.Mentor;
import com.example.obssinternship.model.User;
import com.example.obssinternship.repository.MenteeRepository;
import com.example.obssinternship.repository.MentorRepository;
import com.example.obssinternship.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/mentee")
public class MenteeController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MenteeRepository menteeRepository;

    @Autowired
    private MentorRepository mentorRepository;


    @PostMapping("/addMentee")
    public ResponseEntity<?> addMentee(@RequestBody Mentee mentee){
        User user = userRepository.findByUsername(mentee.getUsername());
        if ( menteeRepository.findByUserIdAndTopic(user.getId(), mentee.getTopic()) != null){
            return ResponseEntity.ok("Bu kullanıcı zaten bir mentor ile çalışıyor");
        }else if ( (mentorRepository.findById(mentee.getMentorId()).get().getMentees() != null ) &&
                (mentorRepository.findById(mentee.getMentorId()).get().getMentees().size() ==2) ){
            return ResponseEntity.ok("Mentor bu konu için zaten iki mentee ile çalışıyor");
        }

        Mentor mentor = mentorRepository.findById(mentee.getMentorId()).get();

        mentee.setUserId(user.getId());
        mentee.setEmail(user.getEmail());
        mentee.setMentorName(mentor.getUsername());
        mentee.setMentorMail(mentor.getEmail());
        mentee.setMentorId(mentor.getId());
        menteeRepository.save(mentee);

        if(mentor.getMentees() != null){
            List<Mentee> menteeList = mentor.getMentees();
            menteeList.add(mentee);
            mentor.setMentees(menteeList);
        }else{
            List<Mentee> mentees = new ArrayList<>();
            mentees.add(mentee);
            mentor.setMentees(mentees);
        }

        mentorRepository.save(mentor);

        return ResponseEntity.ok(mentee);
    }
}
