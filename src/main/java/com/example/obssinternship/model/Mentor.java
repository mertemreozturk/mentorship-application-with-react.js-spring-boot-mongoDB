package com.example.obssinternship.model;

import org.springframework.data.mongodb.core.index.TextIndexDefinition;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "mentor")
public class Mentor extends Mentorship{
    private List<Mentee> mentees;
    private boolean isAccepted;
    private int howManyPhases;
    @TextIndexed
    private String about;

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

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }
}
