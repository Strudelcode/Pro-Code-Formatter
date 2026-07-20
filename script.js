const editor = document.getElementById('editor');
const formatSelect = document.getElementById('formatSelect');

// Load file & Drag & Drop
function loadFile(event) {
    const file = event.target.files[0] || (event.dataTransfer && event.dataTransfer.files[0]);
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => editor.value = e.target.result;
    reader.readAsText(file);
}

editor.addEventListener('dragover', (e) => { e.preventDefault(); editor.style.borderColor = "#ff00cc"; });
editor.addEventListener('dragleave', () => { editor.style.borderColor = "rgba(255, 255, 255, 0.2)"; });
editor.addEventListener('drop', (e) => { e.preventDefault(); loadFile(e); });

// Format using Prettier
async function formatCode() {
    try {
        const formatted = await prettier.format(editor.value, {
            parser: formatSelect.value,
            plugins: prettierPlugins
        });
        editor.value = formatted;
    } catch (e) { alert("Formatting failed: Please check your syntax."); }
}

// Download & Copy
function downloadCode() {
    const blob = new Blob([editor.value], {type: 'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'formatted_code.txt';
    a.click();
}

function copyToClipboard() {
    navigator.clipboard.writeText(editor.value);
    alert("Copied to clipboard!");
}