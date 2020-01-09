package com.examanagerii.exam;

import com.examanagerii.result.Exercise;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "exam")
public class Exam {

    @Id
    private String id;
    private String name;
    private String description;
    private List<Exercise> exercises = new ArrayList<>();
    private List<Double> ratings = new ArrayList<>(15);
    private String userId;
    private double reachable;

    public Exam() {
    }

    public Exam(String name, List<Exercise> exercises) {
        this.name = name;
        this.exercises = exercises;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUserId() {
        return userId;
    }

    public List<Double> getRatings() {
        return ratings;
    }

    public void setRatings(List<Double> rating) {
        this.ratings = rating;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getReachable() {
        return reachable;
    }

    public void setReachable(double reachable) {
        this.reachable = reachable;
    }

    public List<Exercise> getExercises() {
        return exercises;
    }

    public void setExercises(List<Exercise> exercises) {
        this.exercises = exercises;
        this.reachable = exercises.stream()
                .map(Exercise::getReachable)
                .reduce(0.0, Double::sum);
    }
}
