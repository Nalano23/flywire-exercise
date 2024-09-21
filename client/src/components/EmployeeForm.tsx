import React, { useState } from 'react';
import axios from 'axios';

const EmployeeForm: React.FC = () => {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [managerId, setManagerId] = useState<number | null>(null);
    const [reports, setReports] = useState<string>('');
    const [id, setId] = useState<number | ''>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const directReports = reports.split(',')
                .map(id => id.trim())
                .filter(id => id !== '')
                .map(Number) 
                .filter(num => !isNaN(num));

            const response = await axios.post('http://localhost:8080/employees', {
                name,
                position,
                managerId,
                directReports,
                id: id ? Number(id) : undefined,
            });

            alert('Employee created successfully');

            // Reset form after submission
            setName('');
            setPosition('');
            setManagerId(null);
            setReports('');
            setId('');
            window.location.reload();
        } catch (error) {
            console.error('Error creating employee:', error);
            alert('Failed to create employee');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReports(e.target.value); 
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded bg-white shadow-md">
            <h2 className="text-lg font-bold mb-2">Create New Employee</h2>
            <div className="mb-4">
                <label className="block mb-1">Employee ID:</label>
                <input
                    type="number"
                    value={id || ''}
                    onChange={(e) => setId(e.target.value ? Number(e.target.value) : '')}
                    className="border rounded p-2 w-full"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border rounded p-2 w-full"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Position:</label>
                <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="border rounded p-2 w-full"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Manager ID (optional):</label>
                <input
                    type="number"
                    value={managerId || ''}
                    onChange={(e) => setManagerId(e.target.value ? Number(e.target.value) : null)}
                    className="border rounded p-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Direct Reports (comma-separated IDs):</label>
                <input
                    type="text"
                    value={reports}
                    onChange={handleChange}
                    className="border rounded p-2 w-full"
                    placeholder="Enter IDs separated by commas"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Create Employee
            </button>
        </form>
    );
};

export default EmployeeForm;
