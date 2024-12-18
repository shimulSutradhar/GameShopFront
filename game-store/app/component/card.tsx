"use client";
import Link from 'next/link';
import React from 'react';

interface CardProps {
    gameData: any;
}

const Card: React.FC<CardProps> = ({ gameData }) => {
    return (
        <div className="p-4 bg-white w-[100%]">
            <div className='flex justify-center mb-4 h-[250px]'>
                <img src={gameData.image} width={200} alt={gameData.title} className="card-image" />
            </div>
            <div className='flex h-[50px] mb-4'>
                <Link
                    className="hover:text-blue active:text-blue hover:underline active:underline"
                    href={`/games/${gameData._id.$oid}}`}
                >
                    <h2 className="card-title">{gameData.name}</h2>
                </Link>
            </div>
            <div className='flex'>
                <div className='w-[50px] mr-2'>Price:</div>
                <h2 className="card-title">{gameData.price}</h2>
            </div>
        </div>
    );
};

export default Card;