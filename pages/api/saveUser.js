import axios from 'axios';

const GITHUB_API_URL = "https://api.github.com";
const REPO_OWNER = "doetoeri"; // GitHub 사용자명
const REPO_NAME = "primeu"; // 리포지토리 이름
const FILE_PATH = "data/users.json"; // 업데이트할 파일 경로
const BRANCH = "main"; // 업데이트할 브랜치
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Vercel 환경 변수에 저장된 GitHub Personal Access Token

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, prime } = req.body;

        if (!name || !prime) {
            return res.status(400).json({ error: 'Name and Prime are required' });
        }

        try {
            // GitHub에서 현재 파일 내용 가져오기
            const { data: fileData } = await axios.get(
                `${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
                {
                    headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
                }
            );

            const users = JSON.parse(Buffer.from(fileData.content, 'base64').toString('utf-8'));

            // 중복 사용자 확인
            if (users.some(user => user.prime === prime || user.name === name)) {
                return res.status(409).json({ error: 'User or Prime already exists' });
            }

            // 새 사용자 추가
            const updatedUsers = [...users, { name, prime }];
            const updatedContent = Buffer.from(JSON.stringify(updatedUsers, null, 2)).toString('base64');

            // GitHub에 파일 업데이트 요청
            await axios.put(
                `${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
                {
                    message: `Add user: ${name}`,
                    content: updatedContent,
                    sha: fileData.sha, // 현재 파일의 SHA 값 필요
                    branch: BRANCH,
                },
                {
                    headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
                }
            );

            res.status(201).json({ message: 'User saved successfully', updatedUsers });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to update GitHub file' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
ㅍ
