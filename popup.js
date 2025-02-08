function updatePopup() {
    chrome.storage.local.get(
        ["charCount", "energyUsed", "carbonEmitted", "waterUsed", "cumulativeCharCount", "birdsKilled"], 
        function (data) {
            document.getElementById("charCount").textContent = data.charCount || 0;
            document.getElementById("energyUsed").textContent = data.energyUsed || "0 Wh";
            document.getElementById("carbonEmitted").textContent = data.carbonEmitted || "0 g";
            document.getElementById("waterUsed").textContent = data.waterUsed || "0 L";
            document.getElementById("cumulativeCharCount").textContent = data.cumulativeCharCount || 0;
            document.getElementById("birdsKilled").textContent = data.birdsKilled || 0;
        }
    );
}

// Update on popup open
document.addEventListener("DOMContentLoaded", updatePopup);

// Listen for storage updates
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local") {
        if (changes.charCount) document.getElementById("charCount").textContent = changes.charCount.newValue;
        if (changes.energyUsed) document.getElementById("energyUsed").textContent = changes.energyUsed.newValue;
        if (changes.carbonEmitted) document.getElementById("carbonEmitted").textContent = changes.carbonEmitted.newValue;
        if (changes.waterUsed) document.getElementById("waterUsed").textContent = changes.waterUsed.newValue;
        if (changes.cumulativeCharCount) document.getElementById("cumulativeCharCount").textContent = changes.cumulativeCharCount.newValue;
        if (changes.birdsKilled) document.getElementById("birdsKilled").textContent = changes.birdsKilled.newValue;
    }
});