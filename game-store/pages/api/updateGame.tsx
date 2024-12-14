import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const gameData = req.body;

        try {
            const response = await fetch('https://another-api-endpoint.com/games', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(gameData),
            });

            if (!response.ok) {
                throw new Error('Failed to insert data into another API');
            }

            const result = await response.json();
            res.status(200).json({ message: 'Data inserted successfully', data: result });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            res.status(500).json({ message: errorMessage });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}