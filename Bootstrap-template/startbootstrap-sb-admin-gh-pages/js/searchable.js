// Dark Mode Toggle
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('bg-dark');
    document.body.classList.toggle('text-light');
});

const searchInput = document.getElementById('searchInput');
const mainContent = document.getElementById('mainContent');
const originalContent = mainContent.innerHTML;

// Escape regex characters
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightFullWordsContaining(query) {
    if (!query) {
        mainContent.innerHTML = originalContent;
        return;
    }

    const wordRegex = new RegExp(`\\b\\w*${escapeRegExp(query)}\\w*\\b`, 'gi');
    let newContent = originalContent;

    newContent = newContent.replace(/<pre><code>[\s\S]*?<\/code><\/pre>|<[^>]+>|([^<]+)/g, (match, textOnly) => {
        if (!textOnly) return match;
        return textOnly.replace(wordRegex, (word) => {
            return `<mark>${word}</mark>`;
        });
    });

    mainContent.innerHTML = newContent;
}

function scrollToFirstMatch(query) {
    if (!query) return;
    const marks = mainContent.querySelectorAll('mark');
    for (const mark of marks) {
        if (mark.textContent.toLowerCase() === query.toLowerCase()) {
            mark.scrollIntoView({ behavior: 'smooth', block: 'center' });
            break;
        }
    }
}

searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    highlightFullWordsContaining(query);
});

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); // prevent form submit behavior
        const query = searchInput.value.trim();
        scrollToFirstMatch(query);
    }
});

// Clear the search input when the "X" button is clicked
const clearSearchBtn = document.getElementById('clearSearch');
clearSearchBtn.addEventListener('click', () => {
    searchInput.value = ''; // Clear the input field
    highlightFullWordsContaining(''); // Clear the highlighted words
});
