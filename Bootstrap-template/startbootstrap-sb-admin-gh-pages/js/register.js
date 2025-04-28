document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const firstName = document.getElementById("inputFirstName");
    const lastName = document.getElementById("inputLastName");
    const email = document.getElementById("inputEmail");
    const password = document.getElementById("inputPassword");
    const passwordConfirm = document.getElementById("inputPasswordConfirm");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        let isValid = true;

        // Clear previous errors
        clearErrors();

        // Validate First Name
        if (firstName.value.trim() === "") {
            showError(firstName, "First name is required.");
            isValid = false;
        }

        // Validate Last Name
        if (lastName.value.trim() === "") {
            showError(lastName, "Last name is required.");
            isValid = false;
        }

        // Validate Email
        if (!validateEmail(email.value)) {
            showError(email, "Please enter a valid email address.");
            isValid = false;
        }

        // Validate Password
        if (password.value.length < 6) {
            showError(password, "Password must be at least 6 characters long.");
            isValid = false;
        }

        // Validate Password Confirmation
        if (password.value !== passwordConfirm.value) {
            showError(passwordConfirm, "Passwords do not match.");
            isValid = false;
        }

        if (isValid) {
            try {
                const response = await fetch('http://localhost:3000/users', {   // <-- CHANGED
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstName: firstName.value.trim(),
                        lastName: lastName.value.trim(),
                        email: email.value.trim(),
                        password: password.value
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to register user');
                }

                alert('Registration successful!');
                window.location.href = "login.html";
            } catch (error) {
                showError(email, error.message || "Failed to create account. Please try again.");
                console.error("Registration error:", error);
            }
        }
    });

    // Helper Functions
    function showError(input, message) {
        const formGroup = input.parentElement;
        const error = document.createElement("div");
        error.className = "text-danger small mt-1";
        error.textContent = message;
        formGroup.appendChild(error);
    }

    function clearErrors() {
        const errors = document.querySelectorAll(".text-danger");
        errors.forEach((error) => error.remove());
    }

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }
});
