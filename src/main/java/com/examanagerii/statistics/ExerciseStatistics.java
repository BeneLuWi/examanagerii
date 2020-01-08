package com.examanagerii.statistics;

import com.examanagerii.result.Exercise;
import org.apache.commons.math3.stat.correlation.PearsonsCorrelation;
import org.apache.commons.math3.stat.descriptive.moment.StandardDeviation;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

public class ExerciseStatistics {

    private String name;
    private String id;
    private double reachable;
    private double difficulty;
    private double correlation;
    private double deviation;

    private double maxReachedTotal;
    private double maxReachedMale;
    private double maxReachedFemale;

    private double avgTotal;
    private double avgMale;
    private double avgFemale;

    private List<Double> maleReached;
    private List<Double> femaleReached;
    private List<Double> totalReached;

    public ExerciseStatistics() {
    }

    public ExerciseStatistics(
            Exercise exercise,
            List<StudentResult> studentResults,
            List<StudentResult> femaleStudentResults,
            List<StudentResult> maleStudentResults) {

        this.id = exercise.getId();
        this.name = exercise.getName();
        this.reachable = exercise.getReachable();
        initReachedLists(studentResults, femaleStudentResults, maleStudentResults);


        double total = totalReached
                .stream()
                .reduce(0.0, Double::sum);

        double femaleTotal = femaleReached
                .stream()
                .reduce(0.0, Double::sum);

        double maleTotal = maleReached
                .stream()
                .reduce(0.0, Double::sum);
        this.avgTotal = Math.round(total / studentResults.size());
        this.avgFemale = Math.round(femaleTotal / femaleStudentResults.size());
        this.avgMale = Math.round(maleTotal / maleStudentResults.size());


        this.maxReachedTotal = totalReached.stream().max(Double::compare).orElse(0.0);
        this.maxReachedFemale = femaleReached.stream().max(Double::compare).orElse(0.0);
        this.maxReachedMale = maleReached.stream().max(Double::compare).orElse(0.0);

        StandardDeviation sd = new StandardDeviation();
        this.deviation = Statistics.round(sd.evaluate(totalReached.stream().mapToDouble(Double::doubleValue).toArray()), true);

        double[] x = totalReached.stream().mapToDouble(Double::doubleValue).toArray();
        double[] y = studentResults
                .stream()
                .map(studentResult -> studentResult.getResult().getTotalReached())
                .mapToDouble(Double::doubleValue)
                .toArray();

        for (int i = 0; i < y.length; i++) {
            y[i] -= x[i];
        }

        if (studentResults.size() < 2) {
            this.correlation = 0;
        } else {
            this.correlation = Statistics.round(new PearsonsCorrelation().correlation(x, y), true);
        }

        this.difficulty = Statistics.round((total / (studentResults.size() * reachable)) * 100, false);

    }

    private void initReachedLists(
            List<StudentResult> studentResults,
            List<StudentResult> femaleStudentResults,
            List<StudentResult> maleStudentResults) {
        this.totalReached = studentResults
                .stream()
                .map(studentResult ->
                        studentResult
                                .findExerciseById(this.id)
                                .orElseThrow(() -> new NoSuchElementException(this.id))
                                .getReached())
                .collect(Collectors.toList());

        this.maleReached = maleStudentResults
                .stream()
                .map(studentResult ->
                        studentResult
                                .findExerciseById(this.id)
                                .orElseThrow(() -> new NoSuchElementException(this.id))
                                .getReached())
                .collect(Collectors.toList());

        this.femaleReached = femaleStudentResults
                .stream()
                .map(studentResult ->
                        studentResult
                                .findExerciseById(this.id)
                                .orElseThrow(() -> new NoSuchElementException(this.id))
                                .getReached())
                .collect(Collectors.toList());
    }

    public double getCorrelation() {
        return correlation;
    }

    public void setCorrelation(double correlation) {
        this.correlation = correlation;
    }

    public double getDeviation() {
        return deviation;
    }

    public void setDeviation(double deviation) {
        this.deviation = deviation;
    }

    public double getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(double difficulty) {
        this.difficulty = difficulty;
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

    public String getName() {
        return name;
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

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public double getReachable() {
        return reachable;
    }

    public void setReachable(double reachable) {
        this.reachable = reachable;
    }
}
