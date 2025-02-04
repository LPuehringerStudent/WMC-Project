function searchRedirect() {
    let query = document.getElementById("searchQuery").value.trim();
    if (query) {
        window.location.href = "search.html?q=" + encodeURIComponent(query);
    }
    return false; // Prevent default form submission
}
