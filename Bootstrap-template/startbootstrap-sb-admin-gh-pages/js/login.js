document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const emailInput = document.getElementById("inputEmail").value;
        const passwordInput = document.getElementById("inputPassword").value;

        // Fetch users data from db.json
        fetch("../DB/db.json")
            .then(response => response.json())
            .then(data => {
                const users = data.users;
                let userFound = false;

                // Check if the entered credentials match any user in the db
                users.forEach(user => {
                    if (user.email === emailInput && user.password === passwordInput) {
                        userFound = true;
                        // Success: Redirect to index.html
                        window.location.href = "index.html";
                    }
                });

                if (!userFound) {
                    // Failure: Show error message
                    alert("Invalid email or password. Please try again.");
                }
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                alert("There was an issue with the login. Please try again later.");
            });
    });
});
