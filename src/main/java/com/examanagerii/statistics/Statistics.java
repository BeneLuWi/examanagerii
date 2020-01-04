package com.examanagerii.statistics;

import com.examanagerii.exam.Exam;
import com.examanagerii.group.Group;
import com.examanagerii.result.Result;

import java.util.ArrayList;
import java.util.List;

public class Statistics {

    private double avgTotal;
    private double avgMale;
    private double avgFemale;
    private int studentsTotal;
    private int studentsMale;
    private int studentsFemale;

    private Exam exam;
    private Group group;
    private List<Result> results;
    private List<ExerciseStatistics> exerciseStatistics;


    public Statistics(Exam exam, Group group, List<Result> results) {
        this.exam = exam;
        this.group = group;
        this.results = results;
        this.exerciseStatistics = new ArrayList<>();
    }












    /**
     *
     *
     *
     *
     *
     */

    public double getAvgTotal() {
        return avgTotal;
    }

    public void setAvgTotal(double avgTotal) {
        this.avgTotal = avgTotal;
    }

    public double getAvgMale() {
        return avgMale;
    }

    public void setAvgMale(double avgMale) {
        this.avgMale = avgMale;
    }

    public double getAvgFemale() {
        return avgFemale;
    }

    public void setAvgFemale(double avgFemale) {
        this.avgFemale = avgFemale;
    }

    public int getStudentsTotal() {
        return studentsTotal;
    }

    public void setStudentsTotal(int studentsTotal) {
        this.studentsTotal = studentsTotal;
    }

    public int getStudentsMale() {
        return studentsMale;
    }

    public void setStudentsMale(int studentsMale) {
        this.studentsMale = studentsMale;
    }

    public int getStudentsFemale() {
        return studentsFemale;
    }

    public void setStudentsFemale(int studentsFemale) {
        this.studentsFemale = studentsFemale;
    }

    public Exam getExam() {
        return exam;
    }

    public void setExam(Exam exam) {
        this.exam = exam;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public List<Result> getResults() {
        return results;
    }

    public void setResults(List<Result> results) {
        this.results = results;
    }

    public List<ExerciseStatistics> getExerciseStatistics() {
        return exerciseStatistics;
    }

    public void setExerciseStatistics(List<ExerciseStatistics> exerciseStatistics) {
        this.exerciseStatistics = exerciseStatistics;
    }
}
