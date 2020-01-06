package com.examanagerii.statistics;

import com.examanagerii.exam.Exam;
import com.examanagerii.group.Group;
import com.examanagerii.result.Result;
import com.examanagerii.student.Student;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Statistics {

    private double avgTotal;
    private double avgMale;
    private double avgFemale;
    private double difficulty;
    private double deviation;
    private double selectivity;
    private int studentsTotal;
    private int studentsMale;
    private int studentsFemale;

    private Exam exam;
    private Group group;
    private List<ExerciseStatistics> exerciseStatistics;
    private List<StudentResult> studentResults;

    public Statistics(Exam exam, List<Result> results, List<Student> students) {
        this.exam = exam;
        results.forEach(result -> result.calcGrade(exam.getRatings()));
        this.studentResults = results
                .stream()
                .map(result ->
                        new StudentResult(
                                students.stream()
                                        .filter(student -> student.getId().equals(result.getStudentId()))
                                        .findAny()
                                        .orElse(null),
                                result)
                ).collect(Collectors.toList());

        this.exerciseStatistics = new ArrayList<>();

        calcStudents();

    }

    private void calcStudents() {
        this.studentsMale = (int) studentResults
                .stream()
                .filter(s -> s.getStudent().getGender().equals("MALE"))
                .count();

        this.studentsFemale = (int) studentResults
                .stream()
                .filter(s -> s.getStudent().getGender().equals("FEMALE"))
                .count();

        this.studentsTotal = studentResults.size();
    }

    private void calcAverage() {

    }

    private void calcSelectivity() {

    }

    private void calcDeviation() {

    }

    private void calcDifficulty() {

    }


    public double getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(double difficulty) {
        this.difficulty = difficulty;
    }

    public double getDeviation() {
        return deviation;
    }

    public void setDeviation(double deviation) {
        this.deviation = deviation;
    }

    public double getSelectivity() {
        return selectivity;
    }

    public void setSelectivity(double selectivity) {
        this.selectivity = selectivity;
    }
    public List<StudentResult> getStudentResults() {
        return studentResults;
    }

    public void setStudentResults(List<StudentResult> studentResults) {
        this.studentResults = studentResults;
    }

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


    public List<ExerciseStatistics> getExerciseStatistics() {
        return exerciseStatistics;
    }

    public void setExerciseStatistics(List<ExerciseStatistics> exerciseStatistics) {
        this.exerciseStatistics = exerciseStatistics;
    }
}
