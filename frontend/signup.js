const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

// Event listener for sign-up button click
signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active"); // Activate sign-up panel transition
});

// Event listener for sign-in button click
signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active"); // Activate sign-in panel transition
});
