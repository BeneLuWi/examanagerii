package com.examanagerii.student;

import com.opencsv.bean.CsvBindByPosition;

public class StudentCSV {

    @CsvBindByPosition(position = 0)
    private String Nachname;
    @CsvBindByPosition(position = 1)
    private String Vorname;
    @CsvBindByPosition(position = 2)
    private String Geschlecht;






}
