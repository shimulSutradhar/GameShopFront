"use client"
import React, { useState } from 'react';
import AdminNavigation from './adminNavigation';
import Games from './Games';

const AdminPanel: React.FC = () => {
    const [whichPage, setWhichPage] = useState<string>('games');
    return (
        <div>
            <AdminNavigation 
                whichPage={whichPage}
                setWhichPage={setWhichPage}
            />

            <div className='mt-[100px]'></div> 
            <Games />
        </div>
    );
};

export default AdminPanel;