document.querySelector('#loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the page from refreshing

    const email = document.querySelector('#logemail').value;
    const password = document.querySelector('#logpass').value;

    try {
        const response = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert('Login successful!');
            // Redirect the user after login
            window.location.href = '/index.html';
        } else {
            alert(`Login failed: ${data.message}`);
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred while logging in. Please try again.');
    }
});
