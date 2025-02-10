/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
// Scripts

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

// Theme toggle logic
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Check local storage for saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    body.setAttribute("data-theme", savedTheme);
    themeToggle.textContent =
        savedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
    updateThemeToggleStyles(savedTheme); // Apply styles based on the saved theme
} else {
    // Default to light mode if no saved theme
    updateThemeToggleStyles("light");
}

// Update button styles dynamically based on the theme
function updateThemeToggleStyles(theme) {
    if (theme === "dark") {
        themeToggle.style.color = "var(--bs-light)";
        themeToggle.style.backgroundColor = "var(--bs-dark)";
        themeToggle.style.border = "1px solid var(--bs-light)";
    } else {
        themeToggle.style.color = "var(--bs-dark)";
        themeToggle.style.backgroundColor = "var(--bs-light)";
        themeToggle.style.border = "1px solid var(--bs-dark)";
    }
}

themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    themeToggle.textContent =
        newTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";

    updateThemeToggleStyles(newTheme); // Update button styles when the theme is toggled
});
document.querySelectorAll('.tl-item').forEach(item => {
    const video = item.querySelector('.tl-video');

    item.addEventListener('mouseenter', () => {
        if (video) {
            video.play();
        }
    });

    item.addEventListener('mouseleave', () => {
        if (video) {
            video.pause();
            video.currentTime = 0; // Reset video when hover ends
        }
    });
});
document.querySelectorAll('.tl-item').forEach(item => {
    const video = item.querySelector('.tl-video');

    // Ensure video starts paused
    if (video) {
        video.pause();
    }

    item.addEventListener('mouseenter', () => {
        if (video) {
            video.play(); // Play video on hover
        }
    });

    item.addEventListener('mouseleave', () => {
        if (video) {
            video.pause(); // Pause video when not hovered
            video.currentTime = 0; // Reset video so it starts from the beginning next time
        }
    });
});


    document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const cards = document.querySelectorAll(".card");
    const sections = document.querySelectorAll("section");

    searchInput.addEventListener("keyup", function () {
    const searchText = searchInput.value.toLowerCase().trim();

    cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    if (text.includes(searchText)) {
    card.style.display = "block"; // Show matching elements
} else {
    card.style.display = "none"; // Hide non-matching elements
}
});
});
        sections.addEventListener("keyup", function () {
            const searchText = sections.value.toLowerCase().trim();

            cards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(searchText)) {
                    card.style.display = "block"; // Show matching elements
                } else {
                    card.style.display = "none"; // Hide non-matching elements
                }
            });
        });
});






