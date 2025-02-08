function updateCharacterCount() {
    let responses = document.querySelectorAll('div[data-message-author-role="assistant"]');
    let totalCharacters = 0;

    responses.forEach(response => {
        totalCharacters += response.innerText.trim().length;
    });

    console.log("Detected Character Count:", totalCharacters);

    let energyUsed = (totalCharacters * 0.036).toFixed(4) + " Wh";
    let carbonEmitted = (totalCharacters * 0.053).toFixed(4) + " g";
    let waterUsed = (totalCharacters * 0.00625).toFixed(4) + " L";

    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
        chrome.storage.local.set(
            { charCount: totalCharacters, energyUsed, carbonEmitted, waterUsed },
            () => {
                if (chrome.runtime.lastError) {
                    console.error("Error storing values:", chrome.runtime.lastError);
                } else {
                    console.log("Stored Data:", { totalCharacters, energyUsed, carbonEmitted, waterUsed });
                }
            }
        );
    } else {
        console.error("chrome.storage is not available in content.js");
    }
}

// Observe ChatGPT responses
const observer = new MutationObserver(updateCharacterCount);
observer.observe(document.body, { childList: true, subtree: true });

// Initial count update
updateCharacterCount();
