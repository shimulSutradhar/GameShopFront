import React, { useState } from 'react';

interface TextDataProps {
    keyName: string;
    value: string | number;
    id: string;
    setGames: React.Dispatch<React.SetStateAction<any[]>>;
}

const TextData: React.FC<TextDataProps> = ({ keyName, value, id, setGames }) => {
    const [newValue, setNewValue] = useState<string | number>(value);
    const handleChange = (newValue: string | number) => {
        setGames((prev) =>
            prev.map((game) => {
                console.log('game._id.$oid', game._id.$oid, id)
                if (game._id.$oid === id) {
                    return { ...game, [keyName]: newValue };
                }
                return game;
            })
        );
    };

    const updateValue = async () => {
        try {
            const response = await fetch('/api/updateGame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    keyName,
                    value: newValue,
                    _id: 'some-id', // Replace 'some-id' with the actual ID
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

    return (
        <input
            type={typeof value === 'string' ? "text" : "number"}
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
                    console.log('Enter key pressed')
                    handleChange(newValue)
                    event.target.blur()
                }
            }}
            onBlur={() => {
                setNewValue(value)
            }}
        />
    );
};

export default TextData;