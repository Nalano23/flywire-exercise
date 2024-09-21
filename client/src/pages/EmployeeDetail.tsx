import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Employee } from '../models/Employee';

const EmployeeDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [reports, setReports] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchEmployee();
    }, [id]);

    const fetchEmployee = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/employees/${id}`);
            setEmployee(response.data.selectedEmployee);
            const directReports = Array.isArray(response.data.directHires) ? response.data.directHires : [];
            setReports(directReports);
        } catch (err) {
            setError('Failed to fetch employee details');
        } finally {
            setLoading(false);
        }
    };

    const handleDeactivate = async () => {
        if (employee === null) return;
        try {
            const response = await axios.delete(`http://localhost:8080/employees/deactivate/${employee.id}`);
            alert(response.data); 
            fetchEmployee();
        } catch (error) {
            console.error('Error deleting employee:', error);
            alert('Failed to delete employee');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="p-6 bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Employee Details</h1>
            {employee ? (
            <div>
                <p><strong>ID:</strong> {employee.id}</p>
                <p><strong>Name:</strong> {employee.name}</p>
                <p><strong>Position:</strong> {employee.position}</p>
                <p><strong>Hire Date:</strong> {employee.hireDate}</p>
                <p><strong>Active:</strong> {employee.active ? 'Active' : 'Inactive'}</p>
                <p><strong>Direct Reports:</strong> {reports.length > 0 ? reports.join(', ') : 'None'}</p>
                <button onClick={handleDeactivate} className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600">
                    Deactivate
                </button>
            </div>
                ) : (
                    <p>No employee found.</p>
                )}
        </div>
    );
};

export default EmployeeDetail;
