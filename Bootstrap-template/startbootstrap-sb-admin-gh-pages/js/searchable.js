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

    // Exact match fast path
    if (text.includes(query)) return true;

    // Always calculate Levenshtein distance
    const distance = levenshteinDistance(text, query);

    // Allow up to 2 errors
    return distance <= 2;
}

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
    //comment
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
