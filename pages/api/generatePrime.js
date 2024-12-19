export default function handler(req, res) {
    if (req.method === 'GET') {
        const start = parseInt(req.query.start || '2', 10);
        let num = start;

        // 소수 찾기 함수
        function isPrime(n) {
            if (n < 2) return false;
            for (let i = 2; i * i <= n; i++) {
                if (n % i === 0) return false;
            }
            return true;
        }

        while (!isPrime(num)) {
            num++;
        }

        res.status(200).json({ prime: num });
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
