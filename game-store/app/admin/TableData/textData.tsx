import React, { useState } from 'react';

interface TextDataProps {
    keyName: string;
    value: string | number;
    setGames: React.Dispatch<React.SetStateAction<any[]>>;
}

const TextData: React.FC<TextDataProps> = ({ keyName, value, setGames }) => {
    const [newValue, setNewValue] = useState<string | number>(value);

    const handleChange = (newValue: string | number) => {
        setGames((prev) =>
            prev.map((game) => {
                if (game.name === keyName) {
                    return { ...game, name: newValue };
                }
                return game;
            })
        );
    };
    return (
        <input
            type={typeof value === 'string' ? "text" : "number"}
            value={value}
            onChange={(event: any) => setNewValue(event.target.value)}
            style={{
                width: "100%",
                padding: "5px",
                // border: "1px solid #ccc",
                marginRight: "10px",
            }}
            className="draggable"
            onKeyDown={(event: any) => {
                if (event.key === 'Enter') {
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