// Dark Mode Toggle
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('bg-dark');
    document.body.classList.toggle('text-light');
});

// Search Elements
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearch');
const mainContent = document.getElementById('mainContent');
const originalContent = mainContent.innerHTML;

// Levenshtein Distance for fuzzy match
function levenshteinDistance(a, b) {
    const dp = Array.from({ length: b.length + 1 }, () => new Array(a.length + 1).fill(0));

    for (let i = 0; i <= b.length; i++) dp[i][0] = i;
    for (let j = 0; j <= a.length; j++) dp[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b[i - 1] === a[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],    // deletion
                    dp[i][j - 1],    // insertion
                    dp[i - 1][j - 1] // substitution
                );
            }
        }
    }
    return dp[b.length][a.length];
}

function fuzzyMatch(text, query) {
    text = text.toLowerCase();
    query = query.toLowerCase();

    if (text.includes(query)) return true;

    return levenshteinDistance(text, query) <= 2;
}

function highlightFuzzy(query) {
    if (!query) {
        mainContent.innerHTML = originalContent;
        return;
    }

    let newContent = originalContent;

    newContent = newContent.replace(/(<[^>]+>)|([^<]+)/g, (match, tag, textOnly) => {
        if (tag) return tag;

        return textOnly.replace(/\w+/g, (word) => {
            return fuzzyMatch(word, query)
                ? `<mark>${word}</mark>`
                : word;
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

// Input Listener
searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    highlightFuzzy(query);
});

// Enter key triggers scroll to match
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        scrollToFirstFuzzyMatch(searchInput.value.trim());
    }
});

// Clear search
if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        highlightFuzzy('');
    });
}
