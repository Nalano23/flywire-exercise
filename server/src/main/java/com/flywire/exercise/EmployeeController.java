package com.flywire.exercise;

import com.flywire.exercise.dto.EmployeeCreationDTO;
import com.flywire.exercise.dto.EmployeeDirectHiresDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.text.ParseException;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;
    private final SimpleDateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");

    // GET: Return employees with "active" property set to true
    @GetMapping("/active")
    public ResponseEntity<List<Employee>> getActiveEmployees() {
        List<Employee> activeEmployees = employeeService.getActiveEmployees();
        return new ResponseEntity<>(activeEmployees, HttpStatus.OK);
    }

    // GET: Return employees and the names of their direct hires
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDirectHiresDTO> getEmployeeAndDirectHires(@PathVariable int id) {
        EmployeeDirectHiresDTO employee = employeeService.getEmployeeWithHires(id);
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    // GET: Return employees within a specified date range
    @GetMapping("/hired")
    public ResponseEntity<List<Employee>> getEmployeesHiredInRange(@RequestParam String startDate, @RequestParam String endDate) {
        try {
            Date start = dateFormat.parse(startDate);
            Date end = dateFormat.parse(endDate);
            List<Employee> employeesInRange = employeeService.getEmployeesHiredInRange(start, end);
            return new ResponseEntity<>(employeesInRange, HttpStatus.OK);
        } catch (ParseException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // POST: Create new employee
    @PostMapping()
    public ResponseEntity<String> createEmployee(@RequestBody EmployeeCreationDTO employee) {
        try {
            boolean created = employeeService.createEmployee(employee);
            return (created)
                    ? new ResponseEntity<>("Successfully added employee", HttpStatus.CREATED)
                    : new ResponseEntity<>("Failed adding employee (ID already exists)", HttpStatus.CONFLICT);
        } catch (IOException e) {
            return new ResponseEntity<>("Error adding employee", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // DELETE: Set employee "active" flag to false
    @DeleteMapping("/deactivate/{id}")
    public ResponseEntity<String> deactivateEmployee(@PathVariable int id) {
        try {
            boolean deactivated = employeeService.deactivateEmployee(id);
            return (deactivated)
                    ? new ResponseEntity<>("Successfully deactivated employee", HttpStatus.OK)
                    : new ResponseEntity<>("Employee does not exist", HttpStatus.NOT_FOUND);
        } catch (IOException e) {
            return new ResponseEntity<>("Error deactivating employee", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
