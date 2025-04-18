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
