function updateCharacterCount() {
    let responses = document.querySelectorAll('div[data-message-author-role="assistant"]');
    let totalCharacters = 0;

    responses.forEach(response => {
        totalCharacters += response.innerText.trim().length;
    });

    console.log("Detected Character Count:", totalCharacters);

    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
        chrome.storage.local.set({ charCount: totalCharacters }, () => {
            if (chrome.runtime.lastError) {
                console.error("Error storing character count:", chrome.runtime.lastError);
            } else {
                console.log("Character count successfully stored:", totalCharacters);
            }
        });
    } else {
        console.error("chrome.storage is not available in content.js");
    }
}

// Observe ChatGPT responses
const observer = new MutationObserver(updateCharacterCount);
observer.observe(document.body, { childList: true, subtree: true });

// Initial count update
updateCharacterCount();
