"use client"

import React, { useEffect, useState } from 'react';
import TableRow from './TableRow';

const Games: React.FC = () => {
    const [games, setGames] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
                setError('Failed to fetch games');
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }


    // useEffect(() => {
    //     console.log("CHECKING NEW UPDATE: ", games)
    // }, [games])

    return (
        <div className='mt-[60px]'>
            <h1>Games List</h1>
            
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border border-black p-2">Name</th>
                        <th className="border border-black p-2">Price</th>
                        <th className="border border-black p-2">Image</th>
                        <th className="border border-black p-2">Category</th>
                        <th className="border border-black p-2">Key Features</th>
                        <th className="border border-black p-2">Brand Name</th>
                        <th className="border border-black p-2">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map((game, index) => (
                        <TableRow key={index} data={game} index={index} games={games} setGames={setGames}/>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Games;