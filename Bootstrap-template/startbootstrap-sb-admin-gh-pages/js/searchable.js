// Dark Mode Toggle
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('bg-dark');
    document.body.classList.toggle('text-light');
});

// Fuzzy Search
const searchInput = document.getElementById('searchInput');
const mainContent = document.getElementById('mainContent');
const originalContent = mainContent.innerHTML;
const clearSearchBtn = document.getElementById('clearSearch');

function fuzzyMatch(text, query) {
    text = text.toLowerCase();
    query = query.toLowerCase();
    if (text.includes(query)) return true;
    if (query.length <= 2) return false;

    for (let i = 0; i < query.length; i++) {
        const modifiedQuery = query.slice(0, i) + query.slice(i + 1);
        if (text.includes(modifiedQuery)) return true;
    }
    return false;
}

function highlightFuzzy(query) {
    if (!query) {
        mainContent.innerHTML = originalContent;
        return;
    }

    let newContent = originalContent;

    newContent = newContent.replace(/<pre><code>[\s\S]*?<\/code><\/pre>|<[^>]+>|([^<]+)/g, (match, textOnly) => {
        if (!textOnly) return match;
        return textOnly.replace(/\w+/g, (word) => {
            if (fuzzyMatch(word, query)) {
                return `<mark>${word}</mark>`;
            }
            return word;
        });
    });

    mainContent.innerHTML = newContent;
}

function scrollToFirstFuzzyMatch(query) {
    if (!query) return;
    const marks = mainContent.querySelectorAll('mark');
    if (marks.length > 0) {
        marks[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    highlightFuzzy(query);
});

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const query = searchInput.value.trim();
        scrollToFirstFuzzyMatch(query);
    }
});

clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    highlightFuzzy('');
});
