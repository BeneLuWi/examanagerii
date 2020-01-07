package com.examanagerii.statistics;

import com.examanagerii.result.Exercise;
import com.examanagerii.result.Result;
import com.examanagerii.student.Student;

import java.util.Optional;

public class StudentResult {

    private Student student;
    private Result result;

    public StudentResult(Student student, Result result) {
        this.student = student;
        this.result = result;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Result getResult() {
        return result;
    }

    public void setResult(Result result) {
        this.result = result;
    }

    public Optional<Exercise> findExerciseById(String id) {
        return this.result.getExercises()
                .stream()
                .filter(exercise -> exercise.getId().equals(id))
                .findAny();
    }

}
