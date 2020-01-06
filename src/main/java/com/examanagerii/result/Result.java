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

    private double totalReached;

    private Grade grade;

    public Result() {
        this.exercises = new ArrayList<>();
    }


    public void updateExercises(List<Exercise> exercises) {
        exercises.forEach(exercise -> {
            Exercise currentEx = this.exercises.stream().filter(exOld -> exOld.getId().equals(exercise.getId()))
                    .findAny().orElse(null);

            if (currentEx == null) {
                this.exercises.add(exercise);
            } else {
                currentEx.setReachable(exercise.getReachable());
                currentEx.setName(exercise.getName());
            }
        });

        this.exercises
                .removeIf(exercise ->
                            exercises
                                .stream()
                                .noneMatch(exOld -> exOld.getId().equals(exercise.getId())));

    }

    public Grade getGrade(List<Double> ratings) {
        double sumReachable = exercises
                .stream()
                .map(Exercise::getReachable)
                .reduce(0.0, Double::sum);

        double percentageReached = totalReached / sumReachable;

        return new Grade((int) Math.round(percentageReached * 15.0));
    }

    public void calcGrade(List<Double> ratings) {
        double sumReachable = exercises
                .stream()
                .map(Exercise::getReachable)
                .reduce(0.0, Double::sum);

        double percentageReached = totalReached / sumReachable;

        this.grade = new Grade((int) Math.round(percentageReached * 15.0));
    }

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

    public double getTotalReached() {
        return totalReached;
    }

    public Grade getGrade() {
        return grade;
    }

    public void setGrade(Grade grade) {
        this.grade = grade;
    }

    public void setTotalReached(double totalReached) {
        this.totalReached = totalReached;
    }

    public List<Exercise> getExercises() {
        return exercises;
    }

    public void setExercises(List<Exercise> exercises) {
        this.exercises = exercises;
        this.totalReached = exercises
                .stream()
                .map(Exercise::getReached)
                .reduce(0.0, Double::sum);

    }
}
