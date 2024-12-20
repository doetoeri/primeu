const API_BASE = "https://your-vercel-deployment-url/api";

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");

    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;

        const response = await fetch(`${API_BASE}/generatePrime`);
        const data = await response.json();
        const prime = data.prime;

        await fetch(`${API_BASE}/saveUser`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, prime }),
        });

        alert(`Your Prime Number is: ${prime}`);
    });

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const prime = document.getElementById("primeNumber").value;

        const response = await fetch(`${API_BASE}/getUser?prime=${prime}`);
        const data = await response.json();

        alert(`Welcome, ${data.user.name}`);
    });
});

