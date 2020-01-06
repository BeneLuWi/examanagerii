package com.examanagerii.statistics;

public class ExerciseStatistics {

    private String name;
    private String id;
    private double reachable;
    private double difficulty;
    private double selectivity;
    private double maxReachedTotal;
    private double maxReachedMale;
    private double maxReachedFemale;


    public ExerciseStatistics() {
    }

    public double getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(double difficulty) {
        this.difficulty = difficulty;
    }

    public double getSelectivity() {
        return selectivity;
    }

    public void setSelectivity(double selectivity) {
        this.selectivity = selectivity;
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
}
