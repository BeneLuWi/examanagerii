package com.examanagerii.result;

public class Grade {
    private String asWord;
    private double asGrade;
    private int asMss;

    public Grade(int asMss) {
        this.asMss = asMss;
        switch (asMss) {
            case 0:
                asWord = "ungenügend";
                asGrade = 6;
                break;
            case 1:
                asWord = "mangelhaft -";
                asGrade = 5.3;
                break;
            case 2:
                asWord = "mangelhaft";
                asGrade = 5.0;
                break;
            case 3:
                asWord = "mangelhaft +";
                asGrade = 4.7;
                break;
            case 4:
                asWord = "ausreichend -";
                asGrade = 4.3;
                break;
            case 5:
                asWord = "ausreichend";
                asGrade = 4.0;
                break;
            case 6:
                asWord = "ausreichend +";
                asGrade = 3.7;
                break;
            case 7:
                asWord = "befriedigend -";
                asGrade = 3.3;
                break;
            case 8:
                asWord = "befriedigend";
                asGrade = 3.0;
                break;
            case 9:
                asWord = "befriedigend +";
                asGrade = 2.7;
                break;
            case 10:
                asWord = "gut -";
                asGrade = 2.3;
                break;
            case 11:
                asWord = "gut";
                asGrade = 2.0;
                break;
            case 12:
                asWord = "gut +";
                asGrade = 1.7;
                break;
            case 13:
                asWord = "sehr gut -";
                asGrade = 1.3;
                break;
            case 14:
                asWord = "sehr gut";
                asGrade = 1;
                break;
            default:
                asGrade = 0.7;
                asWord = "sehr gut +";
        }
    }




    public String getAsWord() {
        return asWord;
    }

    public void setAsWord(String asWord) {
        this.asWord = asWord;
    }

    public double getAsGrade() {
        return asGrade;
    }

    public void setAsGrade(double asGrade) {
        this.asGrade = asGrade;
    }

    public int getAsMss() {
        return asMss;
    }

    public void setAsMss(int asMss) {
        this.asMss = asMss;
    }
}
