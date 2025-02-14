function updatePopup() {
    chrome.storage.local.get([
        "energyUsed",
        "carbonEmitted",
        "waterUsed",
        "hospitalMachineMinutes",
        "familyWaterDays",
        "treeLifespanDays",
        "cumulativeEnergy",
        "cumulativeCarbon",
        "cumulativeWater"
    ], function (data) {
        document.getElementById("energyUsed").textContent = data.energyUsed || "0";
        document.getElementById("carbonEmitted").textContent = data.carbonEmitted || "0";
        document.getElementById("waterUsed").textContent = data.waterUsed || "0";

        document.getElementById("hospitalMinutes").textContent = data.hospitalMachineMinutes || "0";
        document.getElementById("familyWaterDays").textContent = data.familyWaterDays || "0";
        document.getElementById("treeLifespanDays").textContent = data.treeLifespanDays || "0";

        document.getElementById("cumulativeEnergy").textContent = data.cumulativeEnergy || "0";
        document.getElementById("cumulativeCarbon").textContent = data.cumulativeCarbon || "0";
        document.getElementById("cumulativeWater").textContent = data.cumulativeWater || "0";
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
        if (changes.energyUsed) document.getElementById("energyUsed").textContent = changes.energyUsed.newValue;
        if (changes.carbonEmitted) document.getElementById("carbonEmitted").textContent = changes.carbonEmitted.newValue;
        if (changes.waterUsed) document.getElementById("waterUsed").textContent = changes.waterUsed.newValue;

        if (changes.hospitalMachineMinutes) document.getElementById("hospitalMinutes").textContent = changes.hospitalMachineMinutes.newValue;
        if (changes.familyWaterDays) document.getElementById("familyWaterDays").textContent = changes.familyWaterDays.newValue;
        if (changes.treeLifespanDays) document.getElementById("treeLifespanDays").textContent = changes.treeLifespanDays.newValue;

        if (changes.cumulativeEnergy) document.getElementById("cumulativeEnergy").textContent = changes.cumulativeEnergy.newValue;
        if (changes.cumulativeCarbon) document.getElementById("cumulativeCarbon").textContent = changes.cumulativeCarbon.newValue;
        if (changes.cumulativeWater) document.getElementById("cumulativeWater").textContent = changes.cumulativeWater.newValue;
    }
});
