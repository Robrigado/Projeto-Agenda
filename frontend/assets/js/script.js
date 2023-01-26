const loginButton = document.querySelector('.login-button');
const loginForm = document.querySelector('.login-form');
const registerButton = document.querySelector('.register-button');
const registerForm = document.querySelector('.register-form');

loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.target.parentElement.parentElement.style.display = 'none';
    registerForm.style.display = 'block';
});

registerButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.target.parentElement.parentElement.style.display = 'none';
    loginForm.style.display = 'block';
});


