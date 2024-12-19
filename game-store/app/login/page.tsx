"use client";
import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '@/context/MyContext';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [validUser, setValidUser] = useState(true);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch('/api/users');
                const data = await response.json();
                console.log("Checkign user data: ", data);
                setUsers(data);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            } catch (err) {
                console.log('Failed to fetch games');
            }
        };
        fetchGames();
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const user: any = users.find((user: any) => user.email === email && user.password === password);
        if (user) {
            localStorage.setItem('userId', user._id.$oid);

            window.location.href = '/';
        } else {
            setValidUser(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-xs">
                <h2 className="text-2xl mb-4 text-center">Login</h2>
                {validUser ? null : <p className="text-red-500 text-center">Invalid email or password</p>}
                <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Log In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default LoginPage;


