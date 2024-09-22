
package com.flywire.exercise;

import com.flywire.exercise.dto.EmployeeCreationDTO;
import com.flywire.exercise.dto.EmployeeDirectHiresDTO;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeeService {
    private List<Employee> employees;
    private ObjectMapper om = new ObjectMapper();
    private String dataPath = "src/main/resources/json/data.json";

    // Initialize "database" with json file
    @PostConstruct
    public void init() {
        try {
            employees = om.readValue(
                    new File(dataPath),
                    new TypeReference<List<Employee>>() {}
            );
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Returns a list of all active employees in alphabetical order of last name.
    public List<Employee> getActiveEmployees() {
        return employees.stream().filter(Employee::isActive)
                .sorted(Comparator.comparing(e -> splitLastName(e.getName())))
                .collect(Collectors.toList());
    }
    private String splitLastName(String fullName) {
        String[] split = fullName.split(" ");
        return split[split.length - 1];
    }

    // Returns employee details with specified id, as well as the names of their direct hires.
    public EmployeeDirectHiresDTO getEmployeeWithHires(int id) {
        Employee selectedEmployee = this.getEmployeeById(id);
        if (selectedEmployee == null) {
            return null;
        }
        List<String> directHireNames = selectedEmployee.getDirectReports().stream()
                .map(rid -> getEmployeeName(rid))
                .filter(name -> name != null)
                .collect(Collectors.toList());
        return new EmployeeDirectHiresDTO(selectedEmployee, directHireNames);
    }
    // Helper function for getEmployeeWithHires(int id)
    private String getEmployeeName(int id) {
        return employees.stream()
                .filter(e -> e.getId() == id)
                .map(Employee::getName)
                .findFirst()
                .orElse(null);
    }
    // Helper function for getEmployeeWithHires(int id)
    private Employee getEmployeeById(int id) {
        return employees.stream()
                .filter(e -> e.getId() == id)
                .findFirst()
                .orElse(null);
    }

    // Return list of employees hired in specified range.
    // Sort by descending order of date hired.
    public List<Employee> getEmployeesHiredInRange(Date start, Date end) {
        return employees.stream()
                .filter(e -> e.getHireDate().after(start) && e.getHireDate().before(end))
                .sorted((e1, e2) -> e2.getHireDate().compareTo(e1.getHireDate()))
                .collect(Collectors.toList());
    }

    // Create new Employee
    public boolean createEmployee(EmployeeCreationDTO e) throws IOException {
        Employee newEmployee = new Employee();
        newEmployee.setId(e.getId());
        newEmployee.setName(e.getName());
        newEmployee.setPosition(e.getPosition());
        newEmployee.setDirectReports(e.getDirectReports());
        newEmployee.setActive(true);
        newEmployee.setHireDate(new Date());

        for (Employee emp: employees) {
            if (emp.getId() == e.getId()) {
                return false;
            }
        }
        // Update employees state
        employees.add(newEmployee);
        // Update manager state if id is present
        if (e.getManagerId() != null) {
            for (Employee manager : employees) {
                if (manager.getId() == e.getManagerId()) {
                    manager.getDirectReports().add(newEmployee.getId());
                    break;
                }
            }
        }
        om.writeValue(new File(dataPath), employees);
        return true;
    }

    // Deactivate employee by setting Employee "active" property to false
    public boolean deactivateEmployee(int id) throws IOException {
        Optional<Employee> employeeOpt = employees.stream()
                .filter(e -> e.getId() == id)
                .findFirst();

        if (employeeOpt.isPresent()) {
            employeeOpt.get().setActive(false);
            om.writeValue(new File(dataPath), employees);
            return true;
        }
        return false;
    }


}
