"use client"
import React, { createContext, useState, ReactNode } from 'react';

interface MyContextProps {
    id: string;
    setId: (id: string) => void;
}

export const MyContext = createContext<MyContextProps | undefined>(undefined);

interface MyProviderProps {
    children: ReactNode;
}

export const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
    const [id, setId] = useState<string>('');

    return (
        <MyContext.Provider value={{ id, setId }}>
            {children}
        </MyContext.Provider>
    );
};