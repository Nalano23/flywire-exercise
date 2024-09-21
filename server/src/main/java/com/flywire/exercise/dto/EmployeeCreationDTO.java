package com.flywire.exercise.dto;

import java.util.List;

public class EmployeeCreationDTO {
    private int id;
    private String name;
    private String position;
    private List<Integer> directReports;
    private Integer managerId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public List<Integer> getDirectReports() {
        return directReports;
    }

    public void setDirectReports(List<Integer> directReports) {
        this.directReports = directReports;
    }

    public Integer getManagerId() {
        return managerId;
    }

    public void setManagerId(Integer managerId) {
        this.managerId = managerId;
    }
}
