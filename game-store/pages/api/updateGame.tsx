import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const gameData = req.body;
        const url = `http://127.0.0.1:8000/update_product/${gameData._id}`;
        console.log('gameData:', gameData.key, gameData.value, gameData._id);
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    key: gameData.key,
                    value: gameData.value
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to insert data into another API');
            }

            const result = await response.json();
            console.log('Success:', url, gameData);
            res.status(200).json({ message: 'Data inserted successfully'});
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({ message: errorMessage });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}