package com.examanagerii.result;

public class Exercise {
    private String name;
    private double points;

    public Exercise() {
    }

    public Exercise(String name, double points) {
        this.name = name;
        this.points = points;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPoints() {
        return points;
    }

    public void setPoints(double points) {
        this.points = points;
    }
}
