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

    chrome.storage.local.get(["cumulativeCharCount", "birdsKilled"], (data) => {
        let cumulativeCharCount = (data.cumulativeCharCount || 0) + totalCharacters;
        let newBirdsKilled = Math.floor(cumulativeCharCount / 10);

        chrome.storage.local.set(
            { 
                charCount: totalCharacters, 
                energyUsed, 
                carbonEmitted, 
                waterUsed, 
                cumulativeCharCount,
                birdsKilled: newBirdsKilled
            },
            () => {
                if (chrome.runtime.lastError) {
                    console.error("Error storing values:", chrome.runtime.lastError);
                } else {
                    console.log("Stored Data:", { 
                        totalCharacters, 
                        energyUsed, 
                        carbonEmitted, 
                        waterUsed, 
                        cumulativeCharCount, 
                        birdsKilled: newBirdsKilled 
                    });
                }
            }
        );
    });
}

// Observe ChatGPT responses
const observer = new MutationObserver(updateCharacterCount);
observer.observe(document.body, { childList: true, subtree: true });

// Initial count update
updateCharacterCount();