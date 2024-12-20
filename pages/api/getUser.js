import axios from 'axios';

const GITHUB_FILE_PATH = process.env.GITHUB_FILE_PATH;

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { prime } = req.query;

        if (!prime) {
            return res.status(400).json({ error: 'Prime number is required' });
        }

        try {
            // GitHub에서 JSON 데이터 가져오기
            const response = await axios.get(GITHUB_FILE_PATH);
            const users = response.data;

            // 사용자 검색
            const user = users.find(user => user.prime === parseInt(prime, 10));

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json({ user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
