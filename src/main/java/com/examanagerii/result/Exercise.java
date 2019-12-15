package com.examanagerii.result;

public class Exercise {
    private String name;
    private double reached;
    private double reachable;
    private String id;

    public Exercise() {
    }

    public Exercise(String name, double reached, double reachable) {
        this.name = name;
        this.reached = reached;
        this.reachable = reachable;
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

    public double getReached() {
        return reached;
    }

    public void setReached(double reached) {
        this.reached = reached;
    }

    public double getReachable() {
        return reachable;
    }

    public void setReachable(double reachable) {
        this.reachable = reachable;
    }
}
