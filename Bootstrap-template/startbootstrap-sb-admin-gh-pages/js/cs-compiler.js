document.addEventListener('DOMContentLoaded', function() {
    const runBtn = document.getElementById('run-btn');
    const clearBtn = document.getElementById('clear-btn');
    const codeInput = document.getElementById('cs-input');
    const outputElement = document.getElementById('output');

    // JDoodle API credentials (in production, these should be on the server-side)
    const JD_CONFIG = {
        clientId: "349209f0fee7f36c833651ac492781f0",
        clientSecret: "bba68b199b90065fd1ff1f6323223e591a8c99bc7dff062a2ba5e4c523c389da",
        language: "csharp",
        versionIndex: "3"
    };

    // Wrap user code in a proper C# program structure
    function wrapCode(userCode) {
        return `using System;

class Program {
    static void Main() {
${userCode
            .split('\n')
            .map(line => '        ' + line)
            .join('\n')}
    }
}`;
    }

    runBtn.addEventListener('click', async function() {
        const userCode = codeInput.value.trim();

        if (!userCode) {
            showOutput("Please enter some C# code to execute", true);
            return;
        }

        setRunningState(true);
        showOutput("Compiling and running...", false);

        try {
            const response = await fetch('https://api.jdoodle.com/v1/execute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    clientId: JD_CONFIG.clientId,
                    clientSecret: JD_CONFIG.clientSecret,
                    script: wrapCode(userCode),
                    language: JD_CONFIG.language,
                    versionIndex: JD_CONFIG.versionIndex
                })
            });

            const result = await response.json();

            if (!response.ok) {
                showOutput(result.error || "API request failed", true);
            } else if (result.error) {
                showOutput(result.error, true);
            } else if (!result.isExecutionSuccess) {
                showOutput(result.output || "Execution failed", true);
            } else {
                showOutput(result.output || "Program executed successfully (no output)", false);
            }
        } catch (err) {
            showOutput("Network error: " + err.message, true);
        } finally {
            setRunningState(false);
        }
    });

    clearBtn.addEventListener('click', function() {
        codeInput.value = '';
        showOutput('', false);
    });

    // Helper functions
    function showOutput(message, isError) {
        outputElement.textContent = message;
        outputElement.classList.toggle('error', isError);
    }

    function setRunningState(isRunning) {
        runBtn.disabled = isRunning;
        runBtn.innerHTML = isRunning
            ? '<i class="fas fa-spinner fa-spin"></i> Running...'
            : '<i class="fas fa-play"></i> Run';
    }

    // Auto-resize textarea to fit content
    function adjustTextarea() {
        codeInput.style.height = 'auto';
        codeInput.style.height = codeInput.scrollHeight + 'px';
    }
    codeInput.addEventListener('input', adjustTextarea);
    adjustTextarea();
});