const API_BASE = "https://primeu.vercel.app/api";

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");

    // 등록
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;

        try {
            // 소수 생성 API 호출
            const primeResponse = await fetch(`${API_BASE}/generatePrime`);
            const primeData = await primeResponse.json();
            const prime = primeData.prime;

            // 사용자 저장 API 호출
            const saveResponse = await fetch(`${API_BASE}/saveUser`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, prime }),
            });

            const saveData = await saveResponse.json();
            if (saveResponse.status === 201) {
                alert(`Your Prime Number is: ${prime}`);
            } else {
                alert(`Error: ${saveData.error}`);
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
        }
    });

    // 로그인
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const prime = document.getElementById("primeNumber").value;

        try {
            const response = await fetch(`${API_BASE}/getUser?prime=${prime}`);
            const data = await response.json();

            if (response.status === 200) {
                alert(`Welcome, ${data.user.name}`);
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
        }
    });
});
