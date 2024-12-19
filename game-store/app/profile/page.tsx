"use client";
import React, { useEffect, useState } from 'react';

const UserProfile: React.FC = () => {
    const [userName, setUserName] = useState<string>('');
    const [userId, setUserId] = useState<string>('');

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) setUserId(storedUserId);

        const fetchGames = async () => {
            try {
                const response = await fetch('/api/users');
                const data = await response.json();
                const user: any = data.find((user: any) => user._id.$oid === storedUserId);
                console.log("Checkign user data: ", user);
                setUserName(user.name)
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            } catch (err) {
                console.log('Failed to fetch User');
            }
        };
        fetchGames();
    }, []);

    return (
        <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h1 className="text-2xl font-bold">User Profile</h1>
            <p className="text-lg">Name: {userName}</p>
            <p className="text-lg">User ID: {userId}</p>
        </div>
    );
};

export default UserProfile;