function updatePopup() {
    chrome.storage.local.get([
        "charCount",
        "totalCharCount",
        "energyUsed",
        "carbonEmitted",
        "waterUsed",
        "hospitalMachineMinutes",
        "familyWaterDays",
        "treeLifespanDays"
    ], function (data) {
        document.getElementById("charCount").textContent = data.charCount || 0;
        document.getElementById("totalCharCount").textContent = data.totalCharCount || 0;
        document.getElementById("energyUsed").textContent = data.energyUsed || "0";
        document.getElementById("carbonEmitted").textContent = data.carbonEmitted || "0";
        document.getElementById("waterUsed").textContent = data.waterUsed || "0";

        document.getElementById("hospitalMinutes").textContent = data.hospitalMachineMinutes || "0";
        document.getElementById("familyWaterDays").textContent = data.familyWaterDays || "0";
        document.getElementById("treeLifespanDays").textContent = data.treeLifespanDays || "0";
    });
}

// Toggle Details Visibility
function toggleDetails() {
    let details = document.getElementById("details");
    let toggleButton = document.querySelector(".toggle-btn");

    if (details.style.display === "none") {
        details.style.display = "block";
        toggleButton.textContent = "Hide details";
    } else {
        details.style.display = "none";
        toggleButton.textContent = "See details";
    }
}

// Update the popup when opened
document.addEventListener("DOMContentLoaded", () => {
    updatePopup();

    let toggleButton = document.querySelector(".toggle-btn");
    let details = document.getElementById("details");

    // Set initial text
    toggleButton.textContent = "See details";

    // Add event listener for toggling details
    toggleButton.addEventListener("click", () => {
        if (details.style.display === "none") {
            details.style.display = "block";
            toggleButton.textContent = "Hide details";
        } else {
            details.style.display = "none";
            toggleButton.textContent = "See details";
        }
    });
});

// Listen for storage updates
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local") {
        if (changes.charCount) document.getElementById("charCount").textContent = changes.charCount.newValue;
        if (changes.totalCharCount) document.getElementById("totalCharCount").textContent = changes.totalCharCount.newValue;
        if (changes.energyUsed) document.getElementById("energyUsed").textContent = changes.energyUsed.newValue;
        if (changes.carbonEmitted) document.getElementById("carbonEmitted").textContent = changes.carbonEmitted.newValue;
        if (changes.waterUsed) document.getElementById("waterUsed").textContent = changes.waterUsed.newValue;

        if (changes.hospitalMachineMinutes) document.getElementById("hospitalMinutes").textContent = changes.hospitalMachineMinutes.newValue;
        if (changes.familyWaterDays) document.getElementById("familyWaterDays").textContent = changes.familyWaterDays.newValue;
        if (changes.treeLifespanDays) document.getElementById("treeLifespanDays").textContent = changes.treeLifespanDays.newValue;
    }
});
