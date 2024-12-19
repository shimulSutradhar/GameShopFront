"use client";

import { useRouter, useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MyContext } from '@/context/MyContext';

const GamePage = () => {
    const { id, setId } = useContext(MyContext);
    const router = useRouter();
    const { slug } = useParams() as { slug: string };
    const sanitizedSlug = slug.split('%')[0];
    const [gameData, setGameData] = useState<any>({});
    const [keyFeatures, setKeyFeatures] = useState<any[]>([]);


    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch('/api/gamesList');
                const data = await response.json();
                const game = data.products.find((game: any) => game._id.$oid === sanitizedSlug);
                if (game) {
                    setGameData(game);
                    console.log(game);
                    setKeyFeatures(
                        game.key_features.split('#').map((feature: string) => feature.trim())
                    );
                    console.log(game.key_features.split('#').map((feature: string) => feature.trim()))
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
        <div className='py-8'>
            <h1 className='px-4 text-center text-4xl mb-4'>{gameData.name}</h1>

            <div className='px-4 h-[400px] flex content-center items-center'>
                <div className='w-[50%] flex justify-center content-center'>
                    <Image src={gameData.image} alt="PS5" width={300} height={300} />
                </div>
                <div className='w-[50%] flex items-center'>
                    <div>
                        <h2 className='text-xl mb-2'>Key Features</h2>
                        <ul>
                            {keyFeatures.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>

                        <div className='flex mt-2'>
                            <h2><b>Brand: </b></h2>
                            <p>{gameData.brand_name}</p>
                        </div>

                        <div className='flex mt-2'>
                            <h2><b>Price: </b></h2>
                            <p>{gameData.price}</p>
                        </div>
                        {id === '' ?
                            <Link
                                href={"/login"}
                            >
                                <button className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'>
                                    Buy Now
                                </button>
                            </Link>
                            :
                            <button className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'>
                                Buy Now
                            </button>
                        }

                    </div>
                </div>
            </div>
            <div className='px-4'>
                <h2 className='text-2xl my-4'>Description</h2>
                <p>{gameData.description}</p>
            </div>
        </div>
    );
};

export default GamePage;