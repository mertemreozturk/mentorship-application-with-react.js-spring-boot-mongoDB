package com.example.obssinternship.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "phase")
public class Phase {
    @Id
    private String id;
    private String phaseName;
    private Date startDate;
    private Date endDate;
    private String isCompleted;
    /*private String mentorComment;
    private String menteeComment;
    private double mentorRate;
    private double menteeRate;*/

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPhaseName() {
        return phaseName;
    }

    public void setPhaseName(String phaseName) {
        this.phaseName = phaseName;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getIsCompleted() {
        return isCompleted;
    }

    public void setIsCompleted(String isCompleted) {
        this.isCompleted = isCompleted;
    }

/*public String getMentorComment() {
        return mentorComment;
    }

    public void setMentorComment(String mentorComment) {
        this.mentorComment = mentorComment;
    }

    public String getMenteeComment() {
        return menteeComment;
    }

    public void setMenteeComment(String menteeComment) {
        this.menteeComment = menteeComment;
    }

    public double getMentorRate() {
        return mentorRate;
    }

    public void setMentorRate(double mentorRate) {
        this.mentorRate = mentorRate;
    }

    public double getMenteeRate() {
        return menteeRate;
    }

    public void setMenteeRate(double menteeRate) {
        this.menteeRate = menteeRate;
    }*/
}
