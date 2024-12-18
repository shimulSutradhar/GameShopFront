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
                setGames(data.products);
                console.log(data.products);
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
            <div className='bg-gradient-to-r from-emerald-400 to-sky-500 h-[400px] flex content-center items-center'>
                <div className='w-[50%] flex items-center p-10'>
                    <h1 className='text-8xl'>Game Zone</h1>
                </div>
                <div className='w-[50%] flex justify-center content-center'>
                    <Image src={ps5} alt="PS5" width={300} height={300} />
                </div>
            </div>

            <div className='bg-slate-100 py-10'>
                <div className='text-center text-3xl mb-10'>Games</div>
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