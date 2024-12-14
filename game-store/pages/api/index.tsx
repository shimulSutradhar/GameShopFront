import type { NextApiRequest, NextApiResponse } from 'next';

type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await fetch('http://127.0.0.1:8000/get_product');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: any[] = await response.json();
        res.status(200).json(data);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ message: 'Failed to fetch data', error: errorMessage });
    }
}