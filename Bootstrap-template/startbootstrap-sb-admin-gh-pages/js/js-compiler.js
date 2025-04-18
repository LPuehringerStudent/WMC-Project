document.getElementById("run-btn").addEventListener("click", () => {
    const input = document.getElementById("js-input").value;
    const output = document.getElementById("output");

    try {
        const result = eval(input);
        output.textContent = result === undefined ? "Code executed successfully." : result;
        output.classList.remove("error");
    } catch (error) {
        output.textContent = `Error: ${error.message}`;
        output.classList.add("error");
    }
});

document.getElementById("clear-btn").addEventListener("click", () => {
    document.getElementById("js-input").value = "";
    document.getElementById("output").textContent = "";
});
