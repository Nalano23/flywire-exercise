package com.flywire.exercise.dto;

import com.flywire.exercise.Employee;

import java.util.List;

public class EmployeeDirectHiresDTO {
    public Employee selectedEmployee;
    public List<String> directHires;

    public EmployeeDirectHiresDTO(Employee employee, List<String> directHires) {
        this.selectedEmployee = employee;
        this.directHires = directHires;
    }
}
