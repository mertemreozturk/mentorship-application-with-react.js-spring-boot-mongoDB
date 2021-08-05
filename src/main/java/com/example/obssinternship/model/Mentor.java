package com.example.obssinternship.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "mentor")
public class Mentor extends Mentorship{
    private List<Mentee> mentees;
    private boolean isAccepted;
    private int howManyPhases;


    public List<Mentee> getMentees() {
        return mentees;
    }

    public void setMentees(List<Mentee> mentees) {
        this.mentees = mentees;
    }

    public boolean isAccepted() {
        return isAccepted;
    }

    public void setAccepted(boolean accepted) {
        isAccepted = accepted;
    }

    public int getHowManyPhases() {
        return howManyPhases;
    }

    public void setHowManyPhases(int howManyPhases) {
        this.howManyPhases = howManyPhases;
    }
}
