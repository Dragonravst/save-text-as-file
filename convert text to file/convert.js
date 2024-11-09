const textarea = document.querySelector("textarea"),
fileNameInput = document.querySelector(".file-name input"),
selectMenu = document.querySelector(".save-as select"),
saveBtn = document.querySelector(".save-btn"),
textFormatSelect = document.getElementById("textFormat"),
wordCountDisplay = document.querySelector(".word-count"),
resetBtn = document.querySelector(".reset-btn"),
darkModeToggle = document.getElementById("darkModeToggle");

selectMenu.addEventListener("change", () => {
    const selectedFormat = selectMenu.options[selectMenu.selectedIndex].text;
    saveBtn.innerText = `Save As ${selectedFormat.split(" ")[0]} File`;
});

saveBtn.addEventListener("click", () => {
    let fileName = fileNameInput.value.trim();
    const selectedFormat = selectMenu.options[selectMenu.selectedIndex].text.split(" ")[1].slice(1, -1);
    if (!fileName.endsWith(selectedFormat)) {
        fileName += selectedFormat;
    }
    const blob = new Blob([textarea.value], { type: selectMenu.value });
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = fileName;
    link.href = fileUrl;
    link.click();
});

textarea.addEventListener("input", () => {
    const wordCount = textarea.value.trim().split(/\s+/).filter(word => word).length;
    wordCountDisplay.textContent = `Word count: ${wordCount}`;
});

textFormatSelect.addEventListener("change", (e) => {
    const format = e.target.value;
    if (format === "uppercase") {
        textarea.value = textarea.value.toUpperCase();
    } else if (format === "lowercase") {
        textarea.value = textarea.value.toLowerCase();
    } else if (format === "capitalize") {
        textarea.value = textarea.value.replace(/\b\w/g, char => char.toUpperCase());
    }
});

resetBtn.addEventListener("click", () => {
    textarea.value = "";
    fileNameInput.value = "";
    selectMenu.selectedIndex = 0;
    saveBtn.innerText = "Save As Text File";
    wordCountDisplay.textContent = "Word count: 0";
});

darkModeToggle.addEventListener("change", (e) => {
    document.body.classList.toggle("dark-mode", e.target.checked);
});
