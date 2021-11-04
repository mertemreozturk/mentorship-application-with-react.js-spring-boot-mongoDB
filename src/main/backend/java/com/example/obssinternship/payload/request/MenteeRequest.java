package com.example.obssinternship.payload.request;

import java.util.List;

public class MenteeRequest {
    private String username;
    private String topic;
    private List<String> SubTopic;
    private String mentorId;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public List<String> getSubTopic() {
        return SubTopic;
    }

    public void setSubTopic(List<String> subTopic) {
        SubTopic = subTopic;
    }

    public String getMentorId() {
        return mentorId;
    }

    public void setMentorId(String mentorId) {
        this.mentorId = mentorId;
    }
}
