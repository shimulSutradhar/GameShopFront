"use client"
import React, { useEffect, useState } from 'react';

interface TextDataProps {
    keyName: string;
    index: number;
    id: string;
    games: any
    setGames: React.Dispatch<React.SetStateAction<any[]>>;
}

const TextData: React.FC<TextDataProps> = ({ keyName, index, id, games, setGames }) => {
    const [newValue, setNewValue] = useState<string | number>(games[index][keyName]);

    const updateValue = async () => {
        try {
            const response = await fetch('/api/updateGame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    key: keyName,
                    value: newValue,
                    _id: id,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = (newValue: string | number) => {
        const updatedGames = games.map((game:any) => {
            if (game._id.$oid === id) {
                return { ...game, [keyName]: newValue };
            }
            return game;
        });

        updateValue();
        setGames(updatedGames)
    };

    useEffect(() => {
		setNewValue(games[index][keyName]);
	}, [games[index][keyName]]);

    return (
        <input
            type={typeof games[index][keyName] === 'string' ? "text" : "number"}
            value={newValue}
            onChange={(event: any) => setNewValue(event.target.value)}
            style={{
                width: "100%",
                padding: "5px",
                marginRight: "10px",
            }}
            className="draggable"
            onKeyDown={(event: any) => {
                if (event.key === 'Enter') {
                    console.log("ENTER PRESSED")
                    handleChange(newValue)
                    event.target.blur()
                }
            }}
            onBlur={(event:any) => {
                setNewValue(games[index][keyName])
            }}
        />
    );
};

export default TextData;