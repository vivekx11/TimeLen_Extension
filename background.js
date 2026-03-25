// TimeLens Background Service Worker
// Tracks active tab usage and manages time data
// backend jo responce karta hai sub chez ko
let currentTab = null;
let startTime = null;
let isIdle = false;
let focusModeActive = false;
let blockedSites = [];

// Initialize extension
chrome.runtime.onInstalled.addListener(() => {
  console.log('TimeLens installed');
  initializeStorage();
  setupDailyReset();
});

// Initialize storage with default values
async function initializeStorage() {
  const data = await chrome.storage.local.get(['timeData', 'settings', 'lastReset']);
  
  if (!data.timeData) {
    await chrome.storage.local.set({ timeData: {} });
  }
  
  if (!data.settings) {
    await chrome.storage.local.set({
      settings: {
        focusMode: false,
        blockedSites: [],
        timeLimits: {}
      }
    });
  }
  
  if (!data.lastReset) {
    await chrome.storage.local.set({ lastReset: new Date().toDateString() });
  }
  
  // Check if we need to reset data
  checkDailyReset();
}

// Setup daily reset alarm
function setupDailyReset() {
  chrome.alarms.create('dailyReset', {
    when: getNextMidnight(),
    periodInMinutes: 1440 // 24 hours
  });
}

// Get next midnight timestamp
function getNextMidnight() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow.getTime();
}

// Check and perform daily reset if needed
async function checkDailyReset() {
  const { lastReset } = await chrome.storage.local.get('lastReset');
  const today = new Date().toDateString();
  
  if (lastReset !== today) {
    await resetDailyData();
  }
}

// Reset daily data
async function resetDailyData() {
  await chrome.storage.local.set({
    timeData: {},
    lastReset: new Date().toDateString()
  });
  console.log('Daily data reset');
}

// Listen for alarm (daily reset)
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'dailyReset') {
    resetDailyData();
  }
});

// Extract domain from URL
function getDomain(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch (e) {
    return null;
  }
}

// Save time for current tab
async function saveCurrentTabTime() {
  if (!currentTab || !startTime || isIdle) return;
  
  const domain = getDomain(currentTab.url);
  if (!domain || domain === 'newtab' || domain.startsWith('chrome://')) return;
  
  const timeSpent = Date.now() - startTime;
  const { timeData } = await chrome.storage.local.get('timeData');
  
  if (!timeData[domain]) {
    timeData[domain] = 0;
  }
  
  timeData[domain] += timeSpent;
  await chrome.storage.local.set({ timeData });
  
  // Check focus mode limits
  await checkFocusMode(domain, timeData[domain]);
}

// Check focus mode and block if needed
async function checkFocusMode(domain, timeSpent) {
  const { settings } = await chrome.storage.local.get('settings');
  
  if (!settings.focusMode) return;
  
  const timeLimitMs = (settings.timeLimits[domain] || 0) * 60 * 1000;
  
  if (timeLimitMs > 0 && timeSpent >= timeLimitMs) {
    // Block the site
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tabs[0] && getDomain(tabs[0].url) === domain) {
      chrome.tabs.update(tabs[0].id, {
        url: chrome.runtime.getURL('blocked.html') + '?site=' + domain
      });
    }
  }
}

// Start tracking new tab
async function startTracking(tab) {
  if (!tab || !tab.url) return;
  
  await saveCurrentTabTime();
  
  currentTab = tab;
  startTime = Date.now();
}

// Tab activated (switched to)
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  await startTracking(tab);
});

// Tab updated (URL changed)
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    await startTracking(tab);
  }
});

// Window focus changed
chrome.windows.onFocusChanged.addListener(async (windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    // Browser lost focus
    await saveCurrentTabTime();
    currentTab = null;
    startTime = null;
  } else {
    // Browser gained focus
    const tabs = await chrome.tabs.query({ active: true, windowId: windowId });
    if (tabs[0]) {
      await startTracking(tabs[0]);
    }
  }
});

// Idle state detection
chrome.idle.setDetectionInterval(60); // 60 seconds

chrome.idle.onStateChanged.addListener(async (state) => {
  if (state === 'idle' || state === 'locked') {
    await saveCurrentTabTime();
    isIdle = true;
    startTime = null;
  } else if (state === 'active') {
    isIdle = false;
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tabs[0]) {
      await startTracking(tabs[0]);
    }
  }
});

// Periodic save (every 10 seconds)
setInterval(async () => {
  if (currentTab && startTime && !isIdle) {
    const domain = getDomain(currentTab.url);
    if (domain && domain !== 'newtab' && !domain.startsWith('chrome://')) {
      const timeSpent = Date.now() - startTime;
      const { timeData } = await chrome.storage.local.get('timeData');
      
      if (!timeData[domain]) {
        timeData[domain] = 0;
      }
      
      timeData[domain] += timeSpent;
      await chrome.storage.local.set({ timeData });
      startTime = Date.now(); // Reset start time
    }
  }
}, 10000);

// Message listener for popup communication
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'resetData') {
    resetDailyData().then(() => sendResponse({ success: true }));
    return true;
  }
  
  if (request.action === 'updateSettings') {
    chrome.storage.local.set({ settings: request.settings }).then(() => {
      sendResponse({ success: true });
    });
    return true;
  }
});
