"use client"

import React, { useState } from 'react';

interface AdminNavigationProps {
    whichPage: string;
    setWhichPage: React.Dispatch<React.SetStateAction<string>>;
}

const AdminNavigation: React.FC<AdminNavigationProps> = ({ whichPage, setWhichPage }) => {
    return (
        <nav className="fixed top-0 1170:w-[1170px] 704:w-[704px] w-[360px] bg-gray-800 p-2 z-50">
            <div className="flex justify-center items-center">
                <button 
                    className={`mx-2 px-4 py-2 text-white ${whichPage === 'games' ? 'bg-gray-700' : 'bg-gray-600'} rounded`}
                    onClick={() => setWhichPage('games')}
                >
                    Games
                </button>
                <button 
                    className={`mx-2 px-4 py-2 text-white ${whichPage === 'order' ? 'bg-gray-700' : 'bg-gray-600'} rounded`}
                    onClick={() => setWhichPage('order')}
                >
                    Order
                </button>
            </div>
        </nav>
    );
};


export default AdminNavigation;
