document.getElementById('runCode').addEventListener('click', () => {
    const codeInput = document.getElementById('codeInput').value;
    const outputElement = document.getElementById('output');

    try {
        // Clear previous output
        outputElement.textContent = '';

        // Execute the code
        const result = new Function(codeInput)();
        outputElement.textContent = `Output:\n${result}`;
    } catch (error) {
        outputElement.textContent = `Error:\n${error.message}`;
    }
});
