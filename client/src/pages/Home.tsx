import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">Employee Management System</h2>
            <Link 
                to="/login" 
                className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded transition duration-200"
            >
                Login
            </Link>
        </div>
    );
};

export default Home;
