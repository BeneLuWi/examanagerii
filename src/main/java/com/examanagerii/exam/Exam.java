package com.examanagerii.exam;

import com.examanagerii.result.Exercise;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "exam")
public class Exam {

    @Id
    private String id;
    private String name;
    private String groupId;
    private List<Exercise> exercises;

    public Exam() {
    }

    public Exam(String name, String groupId, List<Exercise> exercises) {
        this.name = name;
        this.groupId = groupId;
        this.exercises = exercises;
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
