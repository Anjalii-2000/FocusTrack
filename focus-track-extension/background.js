let activeSite = null;
let startTime = null;

// Track active tab change
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  if (activeSite && startTime) {
    saveTime(activeSite, Date.now() - startTime);
  }

  try {
    const tab = await chrome.tabs.get(activeInfo.tabId);

    // SAFETY CHECK
    if (!tab.url || !tab.url.startsWith("http")) {
      activeSite = null;
      startTime = null;
      return;
    }

    activeSite = new URL(tab.url).hostname;
    startTime = Date.now();
  } catch (error) {
    console.error("Invalid tab URL", error);
  }
});

// Save time locally
function saveTime(site, timeSpent) {
  // Save locally
  chrome.storage.local.get([site], (result) => {
    const totalTime = (result[site] || 0) + timeSpent;
    chrome.storage.local.set({ [site]: totalTime });
  });

  // Save to backend (MongoDB)
  fetch("http://localhost:5000/api/log", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId: "currentUser",
      site: site,
      timeSpent: timeSpent
    })
  }).catch(err => console.error("API error:", err));
}

// Block distracting websites
const blockedSites = ["facebook.com", "instagram.com", "youtube.com"];

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {

    // SAFETY CHECK
    if (!tab.url || !tab.url.startsWith("http")) return;

    const site = new URL(tab.url).hostname;

    if (blockedSites.includes(site)) {
      chrome.tabs.update(tabId, { url: "chrome://newtab" });
    }
  }
});