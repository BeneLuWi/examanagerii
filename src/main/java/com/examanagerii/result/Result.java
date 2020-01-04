package com.examanagerii.result;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Document(collection = "result")
public class Result {

    @Id
    private String id;
    private String studentId;
    private String examId;

    private String date;
    private String groupId;

    private List<Exercise> exercises;

    public Result() {
        this.exercises = new ArrayList<>();
    }

    public Grade getGrade(List<Double> ratings) {
        double sumReached = exercises
                .stream()
                .map(Exercise::getReached)
                .reduce(0.0, Double::sum);
        double sumReachable = exercises
                .stream()
                .map(Exercise::getReachable)
                .reduce(0.0, Double::sum);

        double percentageReached = sumReached / sumReachable;

        return new Grade((int) Math.round(percentageReached * 15.0));
    };

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getExamId() {
        return examId;
    }

    public void setExamId(String examId) {
        this.examId = examId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public List<Exercise> getExercises() {
        return exercises;
    }

    public void setExercises(List<Exercise> exercises) {
        this.exercises = exercises;
    }
}
