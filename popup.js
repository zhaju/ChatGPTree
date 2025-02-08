function updatePopup() {
    chrome.storage.local.get("charCount", function (data) {
        console.log("Popup received count:", data.charCount); // Debugging
        document.getElementById("charCount").textContent = data.charCount || 0;
    });
}

// Refresh the count when the popup opens
document.addEventListener("DOMContentLoaded", updatePopup);

// Listen for storage changes and update dynamically
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes.charCount) {
        console.log("Popup updated with new count:", changes.charCount.newValue);
        document.getElementById("charCount").textContent = changes.charCount.newValue;
    }
});
