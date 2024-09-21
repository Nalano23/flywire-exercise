import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Employee } from '../models/Employee';
import { Link } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm';

interface Props {}

const Employees = (props: Props) => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    
    const fetchEmployeesHiredInRange = async () => {
        try {
            const formattedStartDate = new Date(startDate).toLocaleDateString('en-US');
            const formattedEndDate = new Date(endDate).toLocaleDateString('en-US');
            const response = await axios.get<Employee[]>(`http://localhost:8080/employees/hired?startDate=${formattedStartDate}&endDate=${formattedEndDate}`);
            setEmployees(response.data);
        } catch (err) {
            setError('Failed to fetch employees');
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchEmployeesHiredInRange();
    };

    useEffect(() => {
        const fetchActiveEmployees = async () => {
            try {
                const response = await axios.get<Employee[]>('http://localhost:8080/employees/active');
                setEmployees(response.data);
            } catch (err) {
                setError('Failed to fetch employees');
            }
        }
        fetchActiveEmployees();
    }, []);

    if (error) return <div className="text-red-500">{error}</div>

    return (
        <div className="p-6 bg-white-100">
            <h1 className="text-3xl font-bold mb-4">Search Employees by Hire Date</h1>
            <form onSubmit={handleSearch} className="mb-4 flex space-x-2">
                <input required
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border rounded p-2"
                />
                <input required
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border rounded p-2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Search</button>
            </form>
            <table className="min-w-full bg-white rounded shadow">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Position</th>
                        <th className="py-2 px-4 border-b">Hire Date</th>
                        <th className="py-2 px-4 border-b">Active</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td className="py-2 px-4 border-b">
                                <Link to={`/employees/${employee.id}`} className="text-blue-500 hover:underline">
                                    {employee.id}
                                </Link>
                            </td>
                            <td className="py-2 px-4 border-b">{employee.name}</td>
                            <td className="py-2 px-4 border-b">{employee.position}</td>
                            <td className="py-2 px-4 border-b">{employee.hireDate}</td>
                            <td className="py-2 px-4 border-b">{employee.active ? "Active" : "Inactive"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <EmployeeForm />
        </div>
        
    );
}

export default Employees