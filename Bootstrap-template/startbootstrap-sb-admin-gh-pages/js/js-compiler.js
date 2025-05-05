// Redirect console.log to the output field
(function () {
    const output = document.getElementById("output");
    const originalConsoleLog = console.log;

    console.log = function (...args) {
        const message = args.join(" ");
        output.textContent += message + "\n";
        originalConsoleLog.apply(console, args); // Optionally log to the actual console
    };
})();

document.getElementById("run-btn").addEventListener("click", () => {
    const input = document.getElementById("js-input").value;
    const output = document.getElementById("output");
    output.textContent = ""; // Clear output before each run

    try {
        const result = eval(input);
        if (result !== undefined) {
            output.textContent += result + "\n";
        }
    } catch (error) {
        output.textContent = `Error: ${error.message}`;
        output.classList.add("error");
    }
});

document.getElementById("clear-btn").addEventListener("click", () => {
    document.getElementById("js-input").value = "";
    document.getElementById("output").textContent = "";
});
//IDE-Tweaks

// Auto-closing pairs for your editor
;(function() {
    const editor = document.getElementById('js-input');
    const pairs = {
        '(': ')',
        '[': ']',
        '{': '}',
        '"': '"',
        "'": "'",
        '`': '`'
    };

    editor.addEventListener('keydown', function(e) {
        const open = e.key;
        if (pairs[open]) {
            e.preventDefault();
            const { selectionStart: start, selectionEnd: end, value } = this;
            const close = pairs[open];
            // insert opener + closer
            this.value = value.slice(0, start) + open + close + value.slice(end);
            // move cursor between them
            this.setSelectionRange(start + 1, start + 1);
        }
        // optional: skip over closing if already there
        else if (Object.values(pairs).includes(open)) {
            const { selectionStart: pos, value } = this;
            if (value[pos] === open) {
                e.preventDefault();
                this.setSelectionRange(pos + 1, pos + 1);
            }
        }
    });
})();

