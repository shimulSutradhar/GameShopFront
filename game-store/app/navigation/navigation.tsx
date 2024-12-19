"use client";
import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { MyContext } from '@/context/MyContext';

const Navigation = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setIsLoggedIn(true);
        }
    }, [localStorage.getItem('userId')]);

    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
            <div className="text-white">
                <h1 className="text-2xl font-bold">GameZone</h1>
                <ul className="flex space-x-4 mt-2">
                    <li><Link href="/" className="hover:text-gray-400">Home</Link></li>
                    <li><Link href="/action" className="hover:text-gray-400">Action</Link></li>
                    <li><Link href="/adventure" className="hover:text-gray-400">Adventure</Link></li>
                    <li><Link href="/horror" className="hover:text-gray-400">Horror</Link></li>
                </ul>
            </div>
            <div className="text-white">
                {isLoggedIn ? (
                    <Link href="/profile" className="hover:text-gray-400">Profile</Link>
                ) : (
                    <div className="space-x-4">
                        <Link href="/login" className="hover:text-gray-400">Log In</Link>
                        <Link href="/signin" className="hover:text-gray-400">Sign In</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;
