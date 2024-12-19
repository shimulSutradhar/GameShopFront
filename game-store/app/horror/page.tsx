"use client";
import React, { use, useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import ps5 from './../../public/games/ps5.jpeg';
import Card from '../component/card';

// import { MyContext } from '@/context/MyContext';
// const {id, setId} = useContext(MyContext);

const HomePage: React.FC = () => {
    const [games, setGames] = useState<any[]>([]);
    
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch('/api/gamesList');
                const data = await response.json();
                setGames(data.products.filter((user: any) => user.catagory === 'Horror'));
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            } catch (err) {
                console.log('Failed to fetch games');
            }
        };
        fetchGames();
    }, []);

    

    return (
        <div>
            <div className='bg-slate-100 py-10'>
                <div className='text-center text-3xl mb-10'>Horror</div>
                <div className='grid grid-cols-3 gap-10 p-[55px]'>
                    {games.map((game, index) => (
                        <Card key={index} gameData={game}/>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default HomePage;