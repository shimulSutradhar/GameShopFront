import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const response = await fetch('http://127.0.0.1:8000/get_product');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            res.status(200).json(data);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            res.status(500).json({ message: 'Failed to fetch data', error: errorMessage });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}