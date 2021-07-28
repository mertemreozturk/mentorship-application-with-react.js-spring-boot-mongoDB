package com.example.obssinternship.repository;

import com.example.obssinternship.model.Person;

import java.util.List;
public interface PersonRepo {
    public List<Person> getAllPersons();
    public List<String> getAllPersonNames();
    public Person getPersonNamesByUid(String userId);
}
