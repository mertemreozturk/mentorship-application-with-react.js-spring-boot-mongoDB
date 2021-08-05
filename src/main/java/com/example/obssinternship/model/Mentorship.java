package com.example.obssinternship.model;

import org.springframework.data.annotation.Id;

import java.util.List;

public class Mentorship {
    @Id
    protected String id;
    protected String userId;
    protected String username;
    protected String email;
    protected String topic;
    protected List<String> SubTopic;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

}
