function updateCharacterCount() {
    let responses = document.querySelectorAll('div[data-message-author-role="assistant"]');
    let totalCharacters = 0;

    responses.forEach(response => {
        totalCharacters += response.innerText.trim().length;
    });

    console.log("Detected Character Count:", totalCharacters);

    // Environmental impact calculations
    let energyUsed = (totalCharacters * 0.036).toFixed(4); // Wh
    let carbonEmitted = (totalCharacters * 0.053).toFixed(4); // g
    let waterUsed = (totalCharacters * 0.00625).toFixed(4); // L

    let hospitalMachineMinutes = (energyUsed / 5).toFixed(2);
    let familyWaterDays = (waterUsed / 10).toFixed(2);
    let treeLifespanDays = (carbonEmitted / 60).toFixed(2);

    // Retrieve total stored character count from all sessions
    chrome.storage.local.get("totalCharCount", (data) => {
        let totalCharCount = data.totalCharCount || 0;
        totalCharCount += totalCharacters;

        chrome.storage.local.set(
            {
                charCount: totalCharacters,
                totalCharCount,
                energyUsed,
                carbonEmitted,
                waterUsed,
                hospitalMachineMinutes,
                familyWaterDays,
                treeLifespanDays
            },
            () => {
                if (chrome.runtime.lastError) {
                    console.error("Error storing values:", chrome.runtime.lastError);
                } else {
                    console.log("Stored Data:", {
                        totalCharacters,
                        totalCharCount,
                        energyUsed,
                        carbonEmitted,
                        waterUsed,
                        hospitalMachineMinutes,
                        familyWaterDays,
                        treeLifespanDays
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
