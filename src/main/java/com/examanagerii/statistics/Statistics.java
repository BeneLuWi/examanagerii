package com.examanagerii.statistics;

import com.examanagerii.exam.Exam;
import com.examanagerii.group.Group;
import com.examanagerii.result.Exercise;
import com.examanagerii.result.Result;
import com.examanagerii.student.Student;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.math3.stat.descriptive.moment.StandardDeviation;

import java.text.NumberFormat;
import java.util.*;
import java.util.stream.Collectors;

public class Statistics {

    private double totalReachable;

    private double avgTotal;
    private double avgMale;
    private double avgFemale;

    private double maxReachedTotal;
    private double maxReachedMale;
    private double maxReachedFemale;

    private double avgGradeTotal;
    private double avgGradeMale;
    private double avgGradeFemale;

    private double difficulty;
    private double deviation;

    private int studentsTotal;
    private int studentsMale;
    private int studentsFemale;

    private Exam exam;
    private Group group;
    private List<ExerciseStatistics> exerciseStatistics;
    private List<StudentResult> studentResults;

    private List<StudentResult> maleStudentsList;
    private List<StudentResult> femaleStudentsList;

    private double[] distribution;

    public List<String[]> toArray() {

        List<String[]> statisticList = new ArrayList<>();

        Locale fmtLocale = Locale.getDefault(Locale.Category.FORMAT);
        NumberFormat formatter = NumberFormat.getInstance(fmtLocale);
        NumberFormat formatter2 = NumberFormat.getInstance(fmtLocale);
        formatter.setMaximumFractionDigits(1);
        formatter2.setMaximumFractionDigits(2);



        // Average Total Reached Points
        String[] avgTotalStart = {"Durchschnittliche Punktzahl", formatter.format(avgTotal)};
        statisticList.add(ArrayUtils.addAll(
                avgTotalStart,
                exerciseStatistics.stream().map(ex -> formatter.format(ex.getAvgTotal())).toArray(String[]::new)
        ));

        String[] avgFemaleStart = {"Durchschnittliche Punktzahl w", formatter.format(avgFemale)};
        statisticList.add(ArrayUtils.addAll(
                avgFemaleStart,
                exerciseStatistics.stream().map(ex -> formatter.format(ex.getAvgFemale())).toArray(String[]::new)
        ));

        String[] avgMaleStart = {"Durchschnittliche Punktzahl m", formatter.format(avgMale)};
        statisticList.add(ArrayUtils.addAll(
                avgMaleStart,
                exerciseStatistics.stream().map(ex -> formatter.format(ex.getAvgMale())).toArray(String[]::new)
        ));


        // Difficulty
        String[] difficultyStart = {"Schwierigkeit", formatter.format(difficulty)};
        statisticList.add(ArrayUtils.addAll(
                difficultyStart,
                exerciseStatistics.stream().map(ex -> formatter.format(ex.getDifficulty())).toArray(String[]::new)
        ));

        // Correlation
        String[] correlationStart = {"Trennschärfe", ""};
        statisticList.add(ArrayUtils.addAll(
                correlationStart,
                exerciseStatistics.stream().map(ex -> formatter2.format(ex.getCorrelation())).toArray(String[]::new)
        ));

        // Deviation
        String[] deviationStart = {"Standardabweichung", formatter.format(deviation)};
        statisticList.add(ArrayUtils.addAll(
                deviationStart,
                exerciseStatistics.stream().map(ex -> formatter2.format(ex.getDeviation())).toArray(String[]::new)
        ));

        return statisticList;
    }



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
                                result))
                .collect(Collectors.toList());


        this.maleStudentsList = this.studentResults
                .stream()
                .filter(studentResult -> studentResult.getStudent().getGender().equals("MALE"))
                .collect(Collectors.toList());
        this.femaleStudentsList = this.studentResults
                .stream()
                .filter(studentResult -> studentResult.getStudent().getGender().equals("FEMALE"))
                .collect(Collectors.toList());


        this.exerciseStatistics = this.exam.getExercises()
                .stream()
                .map(exercise -> new ExerciseStatistics(exercise, studentResults, femaleStudentsList, maleStudentsList))
                .collect(Collectors.toList());


        StandardDeviation sd = new StandardDeviation();
        this.deviation = round(sd.evaluate(
                studentResults
                        .stream()
                        .map(studentResult -> studentResult.getResult().getTotalReached())
                        .mapToDouble(Double::doubleValue)
                        .toArray()
        ),true);



        this.maxReachedTotal = this.studentResults
                .stream()
                .map(studentResult -> studentResult.getResult().getTotalReached())
                .max(Double::compare).orElse(0.0);

        this.maxReachedFemale = this.femaleStudentsList
                .stream()
                .map(studentResult -> studentResult.getResult().getTotalReached())
                .max(Double::compare).orElse(0.0);

        this.maxReachedMale = this.maleStudentsList
                .stream()
                .map(studentResult -> studentResult.getResult().getTotalReached())
                .max(Double::compare).orElse(0.0);

        calcStudents();
        calcAverageGrade();
        calcAveragePoints();
        calcDistribution();
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

    public static double round(double n, boolean twoDecimals) {
        if (!twoDecimals) {
            return Math.round(n);
        } else {
            return Math.round(n * 100.0) / 100.0;
        }
    }

    private void calcAveragePoints() {
         double total = this.studentResults
                 .stream()
                 .map(studentResult -> studentResult.getResult().getTotalReached())
                 .reduce(0.0, Double::sum);

        double femaleTotal = this.femaleStudentsList
                .stream()
                .map(studentResult -> studentResult.getResult().getTotalReached())
                .reduce(0.0, Double::sum);

        double maleTotal = this.maleStudentsList
                .stream()
                .map(studentResult -> studentResult.getResult().getTotalReached())
                .reduce(0.0, Double::sum);

        this.avgTotal = round(total / (double) studentsTotal, false);
        this.avgFemale = round(femaleTotal / (double) studentsFemale, false);
        this.avgMale =  round(maleTotal / (double) studentsMale, false);

        this.totalReachable = this.exam.getExercises()
                .stream()
                .map(Exercise::getReachable)
                .reduce(0.0, Double::sum);

        this.difficulty = Statistics.round((total / (studentResults.size() * totalReachable)) * 100, false);

    }

    private void calcDistribution() {
        this.distribution = new double[6];
        double total = 0.0;
        for (StudentResult s : this.studentResults) {
            int index = (int) Math.round(s.getResult().getGrade().getAsGrade());
            distribution[index == 0 ? 0 : index - 1]++;
            total++;
        }

        double finalTotal = total;
        this.distribution = Arrays.stream(this.distribution)
                .map(dist -> Statistics.round(dist/ finalTotal, true))
                .toArray();

    }

    private void calcAverageGrade() {
        double total = this.studentResults
                .stream()
                .map(studentResult -> studentResult.getResult().getGrade().getAsMss())
                .reduce(0, Integer::sum);

        double femaleTotal = this.femaleStudentsList
                .stream()
                .map(studentResult -> studentResult.getResult().getGrade().getAsMss())
                .reduce(0, Integer::sum);

        double maleTotal = this.maleStudentsList
                .stream()
                .map(studentResult -> studentResult.getResult().getGrade().getAsMss())
                .reduce(0, Integer::sum);

        this.avgGradeTotal = round(total / (double) studentsTotal, false) ;
        this.avgGradeFemale = round(femaleTotal / (double) studentsFemale, false);
        this.avgGradeMale = round(maleTotal / (double) studentsMale, false);
    }

    public double[] getDistribution() {
        return distribution;
    }

    public void setDistribution(double[] distribution) {
        this.distribution = distribution;
    }

    public double getTotalReachable() {
        return totalReachable;
    }

    public void setTotalReachable(double totalReachable) {
        this.totalReachable = totalReachable;
    }

    public double getAvgGradeTotal() {
        return avgGradeTotal;
    }

    public void setAvgGradeTotal(double avgGradeTotal) {
        this.avgGradeTotal = avgGradeTotal;
    }

    public double getAvgGradeMale() {
        return avgGradeMale;
    }

    public void setAvgGradeMale(double avgGradeMale) {
        this.avgGradeMale = avgGradeMale;
    }

    public double getAvgGradeFemale() {
        return avgGradeFemale;
    }

    public void setAvgGradeFemale(double avgGradeFemale) {
        this.avgGradeFemale = avgGradeFemale;
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

    public double getMaxReachedTotal() {
        return maxReachedTotal;
    }

    public void setMaxReachedTotal(double maxReachedTotal) {
        this.maxReachedTotal = maxReachedTotal;
    }

    public double getMaxReachedMale() {
        return maxReachedMale;
    }

    public void setMaxReachedMale(double maxReachedMale) {
        this.maxReachedMale = maxReachedMale;
    }

    public double getMaxReachedFemale() {
        return maxReachedFemale;
    }

    public void setMaxReachedFemale(double maxReachedFemale) {
        this.maxReachedFemale = maxReachedFemale;
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
