package com.example.obssinternship.payload.request;

import com.example.obssinternship.model.Phase;

import java.util.List;

public class PeriodRequest {
    private String phaseId;
    private String mentorId;
    private String menteeId;
    private List<Phase> phase;

    public String getPhaseId() {
        return phaseId;
    }

    public void setPhaseId(String phaseId) {
        this.phaseId = phaseId;
    }

    public String getMentorId() {
        return mentorId;
    }

    public void setMentorId(String mentorId) {
        this.mentorId = mentorId;
    }

    public String getMenteeId() {
        return menteeId;
    }

    public void setMenteeId(String menteeId) {
        this.menteeId = menteeId;
    }

    public List<Phase> getPhase() {
        return phase;
    }

    public void setPhase(List<Phase> phase) {
        this.phase = phase;
    }
}
