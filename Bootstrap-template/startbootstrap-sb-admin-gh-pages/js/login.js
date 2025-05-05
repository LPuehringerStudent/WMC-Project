document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("#loginForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        // Get user inputs from form
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;

        // Retrieve users from localStorage (or you could fetch them from a backend DB)
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Validate user login
        const user = users.find(u => u.email === email);

        if (!user) {
            // Email not found in the database
            alert("Email not registered.");
            return;
        }

        if (user.password !== password) {
            // Incorrect password
            alert("Incorrect password.");
            return;
        }

        // Successful login
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        // Redirect to the dashboard or homepage
        window.location.href = "dashboard.html";
    });
});
