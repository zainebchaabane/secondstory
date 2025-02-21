document.querySelector('#signupForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the page from refreshing

    const name = document.querySelector('#signup-name').value;
    const email = document.querySelector('#signup-email').value;
    const password = document.querySelector('#signup-password').value;

    try {
        const response = await fetch('http://localhost:5000/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: name, email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert('Signup successful! You can now log in.');
            // Redirect the user to the login page
            window.location.href = '/login.html';
        } else {
            alert(`Sign-up failed: ${data.message}`);
        }
    } catch (error) {
        console.error('Sign-up error:', error);
        alert('An error occurred while signing up. Please try again.');
    }
});
