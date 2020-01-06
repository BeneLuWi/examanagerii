package com.examanagerii.statistics;

import com.examanagerii.result.Result;
import com.examanagerii.student.Student;

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
}
