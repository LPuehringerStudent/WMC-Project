document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const firstName = document.getElementById("inputFirstName");
    const lastName = document.getElementById("inputLastName");
    const email = document.getElementById("inputEmail");
    const password = document.getElementById("inputPassword");
    const passwordConfirm = document.getElementById("inputPasswordConfirm");

    form.addEventListener("submit", function (event) {
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

        // Prevent form submission if validation fails
        if (!isValid) {
            event.preventDefault();
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
