import fs from 'fs';
import path from 'path';

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

export default function handler(req, res) {
    if (req.method === 'GET') {
        const { prime } = req.query;

        if (!prime) {
            return res.status(400).json({ error: 'Prime number is required' });
        }

        const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
        const user = users.find(user => user.prime === parseInt(prime, 10));

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ user });
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
