package com.example.obssinternship;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class ObssinternshipApplication {

    public static void main(String[] args) {
        SpringApplication.run(ObssinternshipApplication.class, args);
    }

}
