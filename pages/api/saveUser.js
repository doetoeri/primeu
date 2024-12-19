import fs from 'fs';
import path from 'path';

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { name, prime } = req.body;

        if (!name || !prime) {
            return res.status(400).json({ error: 'Name and Prime are required' });
        }

        const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
        if (users.some(user => user.prime === prime || user.name === name)) {
            return res.status(409).json({ error: 'User or Prime already exists' });
        }

        users.push({ name, prime });
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

        res.status(201).json({ message: 'User saved successfully' });
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
