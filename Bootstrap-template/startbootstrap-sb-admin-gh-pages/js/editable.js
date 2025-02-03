// Fetch saved content and load it into the editable div
fetch('/get-content')
    .then(response => response.json())
    .then(data => {
        document.getElementById('editable').innerHTML = data.content;
    })
    .catch(err => console.error('Error loading content:', err));

// Save content when the button is clicked
document.getElementById('save').addEventListener('click', () => {
    const content = document.getElementById('editable').innerHTML;

    fetch('/save-content', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
    })
        .then(response => {
            if (response.ok) {
                alert('Content saved successfully!');
            } else {
                alert('Error saving content');
            }
        })
        .catch(err => console.error('Error saving content:', err));
});