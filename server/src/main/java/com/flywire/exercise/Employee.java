package com.flywire.exercise;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;
import java.util.List;

public class Employee {
    private int id;
    private boolean active;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy")
    private Date hireDate;

    private String name;
    private String position;
    private List<Integer> directReports;

    // Getters
    public int getId() {
        return id;
    }

    public List<Integer> getDirectReports() {
        return directReports;
    }

    public boolean isActive() {
        return active;
    }

    public Date getHireDate() {
        return hireDate;
    }

    public String getName() {
        return name;
    }

    public String getPosition() {
        return position;
    }

    // Setters
    public void setId(int id) {
        this.id = id;
    }

    public void setDirectReports(List<Integer> directReports) {
        this.directReports = directReports;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public void setHireDate(Date hireDate) {
        this.hireDate = hireDate;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPosition(String position) {
        this.position = position;
    }
}
