import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (username !== 'admin' || password !== 'password') {
            setError("Incorrect username or password.")
        }
        navigate('/employees');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            {error && (<div className="text-red-500">{error}</div>)}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">Username:</label>
                    <input
                        type="text"
                        value={username === '' ? 'admin' : username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">Password:</label>
                    <input
                        type="password"
                        value={password === '' ? 'password' : password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        required
                        className="border border-gray-300 rounded p-2 w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
