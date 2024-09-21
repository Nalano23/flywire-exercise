import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex space-x-4">
                <li>
                    <Link to="/" className="text-white hover:bg-gray-700 p-2 rounded">Home</Link>
                </li>
                <li>
                    <Link to="/login" className="text-white hover:bg-gray-700 p-2 rounded">Login</Link>
                </li>
                <li>
                    <Link to="/employees" className="text-white hover:bg-gray-700 p-2 rounded">Employees</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
