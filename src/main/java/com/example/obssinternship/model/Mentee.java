package com.example.obssinternship.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "mentee")
public class Mentee extends Mentorship {
    private String mentorId;
    private String mentorName;
    private String mentorMail;

    public String getMentorId() {
        return mentorId;
    }

    public void setMentorId(String mentorId) {
        this.mentorId = mentorId;
    }

    public String getMentorName() {
        return mentorName;
    }

    public void setMentorName(String mentorName) {
        this.mentorName = mentorName;
    }

    public String getMentorMail() {
        return mentorMail;
    }

    public void setMentorMail(String mentorMail) {
        this.mentorMail = mentorMail;
    }
}
