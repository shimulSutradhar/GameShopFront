"use client";

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const GamePage = () => {
    const router = useRouter();
    const { slug } = useParams() as { slug: string };
    const sanitizedSlug = slug.split('%')[0];
    const [gameData, setGameData] = useState<any>({});


    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch('/api/gamesList');
                const data = await response.json();
                const game = data.products.find((game: any) => game._id.$oid === sanitizedSlug);
                if (game) {
                    console.log('Game found: ', game);
                    setGameData(game);
                } else {
                    console.log('Game not found');
                }
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            } catch (err) {
                console.log('Failed to fetch games');
            }
        };
        fetchGames();
    }, [sanitizedSlug]);

    return (
        <div>
            <h1>{sanitizedSlug}</h1>
            <p>gameData.description</p>
            {/* Render other game details here */}
        </div>
    );
};

export default GamePage;