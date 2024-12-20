import axios from 'axios';

const GITHUB_FILE_PATH = process.env.GITHUB_FILE_PATH;

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, prime } = req.body;

        if (!name || !prime) {
            return res.status(400).json({ error: 'Name and Prime are required' });
        }

        try {
            // GitHub에서 JSON 데이터 가져오기
            const response = await axios.get(GITHUB_FILE_PATH);
            const users = response.data;

            // 중복 사용자 확인
            if (users.some(user => user.prime === prime || user.name === name)) {
                return res.status(409).json({ error: 'User or Prime already exists' });
            }

            // 새 사용자 추가
            const updatedUsers = [...users, { name, prime }];

            // GitHub API를 통해 업데이트하는 로직 필요 (현재는 업데이트 로직 없음)
            res.status(201).json({
                message: 'User saved successfully (This is a read-only simulation)',
                updatedUsers,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch or update users' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
