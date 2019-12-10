package com.examanagerii.result;

public class Exercise {
    private String name;
    private double points;
    private double rating;

    public Exercise() {
    }

    public Exercise(String name, double points, double rating) {
        this.name = name;
        this.points = points;
        this.rating = rating;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
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
