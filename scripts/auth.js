// scripts/auth.js

document.addEventListener('DOMContentLoaded', () => {
    // Login Form Elements
    const loginForm = document.getElementById('loginForm');
    const loginEmailInput = document.getElementById('loginEmail');
    const loginPasswordInput = document.getElementById('loginPassword');
    const loginEmailError = document.getElementById('loginEmailError');
    const loginPasswordError = document.getElementById('loginPasswordError');
    const toggleLoginPasswordButton = document.getElementById('toggleLoginPassword');

    // Signup Form Elements
    const signupForm = document.getElementById('signupForm');
    const signupNameInput = document.getElementById('signupName');
    const signupEmailInput = document.getElementById('signupEmail');
    const signupPasswordInput = document.getElementById('signupPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const signupNameError = document.getElementById('signupNameError');
    const signupEmailError = document.getElementById('signupEmailError');
    const signupPasswordError = document.getElementById('signupPasswordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const toggleSignupPasswordButton = document.getElementById('toggleSignupPassword');
    const toggleConfirmPasswordButton = document.getElementById('toggleConfirmPassword');
    const passwordStrengthDiv = document.getElementById('passwordStrength');

    // --- Helper Functions ---

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isStrongPassword(password) {
        return password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password);
    }

    function updatePasswordStrength(password) {
        if (password.length === 0) {
            passwordStrengthDiv.textContent = '';
            return;
        }
        if (isStrongPassword(password)) {
            passwordStrengthDiv.textContent = 'Strong password';
            passwordStrengthDiv.style.color = 'green';
        } else if (password.length >= 6) {
            passwordStrengthDiv.textContent = 'Medium password';
            passwordStrengthDiv.style.color = 'orange';
        } else {
            passwordStrengthDiv.textContent = 'Weak password';
            passwordStrengthDiv.style.color = 'red';
        }
    }

    function togglePasswordVisibility(input, button) {
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        button.textContent = type === 'password' ? 'Show' : 'Hide';
    }

    // --- Login Form Validation ---

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            let isValid = true;

            if (!isValidEmail(loginEmailInput.value.trim())) {
                loginEmailError.textContent = 'Please enter a valid email address.';
                isValid = false;
            } else {
                loginEmailError.textContent = '';
            }

            if (loginPasswordInput.value.trim() === '') {
                loginPasswordError.textContent = 'Password is required.';
                isValid = false;
            } else {
                loginPasswordError.textContent = '';
            }

            if (!isValid) {
                e.preventDefault(); // Prevent form submission if validation fails
            }
            // In Subtask 2, you will handle Firebase login here
        });

        if (toggleLoginPasswordButton && loginPasswordInput) {
            toggleLoginPasswordButton.addEventListener('click', () => {
                togglePasswordVisibility(loginPasswordInput, toggleLoginPasswordButton);
            });
        }
    }

    // --- Signup Form Validation ---

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            let isValid = true;

            if (signupNameInput.value.trim() === '') {
                signupNameError.textContent = 'Full name is required.';
                isValid = false;
            } else {
                signupNameError.textContent = '';
            }

            if (!isValidEmail(signupEmailInput.value.trim())) {
                signupEmailError.textContent = 'Please enter a valid email address.';
                isValid = false;
            } else {
                signupEmailError.textContent = '';
            }

            if (!isStrongPassword(signupPasswordInput.value)) {
                signupPasswordError.textContent = 'Password must be at least 8 characters and include uppercase, lowercase, and a number.';
                isValid = false;
            } else {
                signupPasswordError.textContent = '';
            }

            if (confirmPasswordInput.value !== signupPasswordInput.value) {
                confirmPasswordError.textContent = 'Passwords do not match.';
                isValid = false;
            } else {
                confirmPasswordError.textContent = '';
            }

            if (!isValid) {
                e.preventDefault(); // Prevent form submission if validation fails
            }
            // In Subtask 2, you will handle Firebase signup here
        });

        if (toggleSignupPasswordButton && signupPasswordInput) {
            toggleSignupPasswordButton.addEventListener('click', () => {
                togglePasswordVisibility(signupPasswordInput, toggleSignupPasswordButton);
            });
        }

        if (toggleConfirmPasswordButton && confirmPasswordInput) {
            toggleConfirmPasswordButton.addEventListener('click', () => {
                togglePasswordVisibility(confirmPasswordInput, toggleConfirmPasswordButton);
            });
        }

        if (signupPasswordInput && passwordStrengthDiv) {
            signupPasswordInput.addEventListener('input', () => {
                updatePasswordStrength(signupPasswordInput.value);
            });
        }
    }
});