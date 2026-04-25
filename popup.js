// TimeLens Popup Script
// Handles UI updates and user interactions
// formating 
// Format milliseconds to readable time
function formatTime(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  // handel time 
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return `${seconds}s`;
  }
}

// Get motivational message based on total time
function getMotivationalMessage(totalMs) {
  const hours = totalMs / (1000 * 60 * 60);
  
  if (hours < 1) {
    return "🌟 Great start to the day!";
  } else if (hours < 2) {
    return "💪 Staying focused!";
  } else if (hours < 4) {
    return "⏰ Time flies when you're productive";
  } else if (hours < 6) {
    return "🔥 You've been quite active today";
  } else {
    return "😅 Maybe time for a break?";
  }
}

// Load and display data
async function loadData() {
  const { timeData } = await chrome.storage.local.get('timeData');
  
  if (!timeData || Object.keys(timeData).length === 0) {
    document.getElementById('topSites').innerHTML = `
      <div class="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor" opacity="0.3"/>
        </svg>
        <p>Start browsing to see your stats</p>
      </div>
    `;
    document.getElementById('totalTime').textContent = '0h 0m';
    document.getElementById('motivationalMsg').textContent = '🌟 Ready to track your time!';
    return;
  }

  // Sort sites by time
  const sortedSites = Object.entries(timeData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  // Calculate total time
  const totalTime = Object.values(timeData).reduce((sum, time) => sum + time, 0);
  const maxTime = sortedSites[0] ? sortedSites[0][1] : 1;
  
  // Update total time
  document.getElementById('totalTime').textContent = formatTime(totalTime);
  document.getElementById('motivationalMsg').textContent = getMotivationalMessage(totalTime);
  
  // Display top sites
  const topSitesContainer = document.getElementById('topSites');
  topSitesContainer.innerHTML = '';
  
  sortedSites.forEach(([domain, time], index) => {
    const percentage = (time / maxTime) * 100;
    
    const siteItem = document.createElement('div');
    siteItem.className = 'site-item';
    siteItem.style.animationDelay = `${index * 0.05}s`;
    
    siteItem.innerHTML = `
      <div class="site-rank">${index + 1}</div>
      <div class="site-info">
        <div class="site-domain">${domain}</div>
        <div class="site-bar">
          <div class="site-bar-fill" style="width: ${percentage}%"></div>
        </div>
      </div>
      <div class="site-time">${formatTime(time)}</div>
    `;
    
    topSitesContainer.appendChild(siteItem);
  });
  
  // Update last update time
  document.getElementById('lastUpdate').textContent = 'just now';
}

// Load settings
async function loadSettings() {
  const { settings } = await chrome.storage.local.get('settings');
  
  if (settings) {
    document.getElementById('focusModeToggle').checked = settings.focusMode || false;
  }
}

// Save settings
async function saveSettings() {
  const focusMode = document.getElementById('focusModeToggle').checked;
  const { settings } = await chrome.storage.local.get('settings');
  
  settings.focusMode = focusMode;
  
  await chrome.runtime.sendMessage({
    action: 'updateSettings',
    settings: settings
  });
}

// Reset data
async function resetData() {
  if (confirm('Are you sure you want to reset today\'s data? This cannot be undone.')) {
    await chrome.runtime.sendMessage({ action: 'resetData' });
    await loadData();
  }
}

// Show settings modal
function showSettingsModal() {
  document.getElementById('settingsModal').style.display = 'block';
  loadLimits();
}

// Hide settings modal
function hideSettingsModal() {
  document.getElementById('settingsModal').style.display = 'none';
}

// Load time limits
async function loadLimits() {
  const { settings, timeData } = await chrome.storage.local.get(['settings', 'timeData']);
  const limitsContainer = document.getElementById('limitsContainer');
  limitsContainer.innerHTML = '';
  
  // Get all domains from timeData
  const domains = timeData ? Object.keys(timeData).sort() : [];
  
  // Show existing limits
  if (settings && settings.timeLimits) {
    Object.entries(settings.timeLimits).forEach(([domain, minutes]) => {
      addLimitItem(domain, minutes);
    });
  }
  
  // If no limits, show add button hint
  if (limitsContainer.children.length === 0) {
    limitsContainer.innerHTML = '<p style="color: #666; font-size: 13px; text-align: center; padding: 20px;">No limits set. Click "Add Limit" to create one.</p>';
  }
}

// Add limit item to UI
function addLimitItem(domain = '', minutes = 60) {
  const limitsContainer = document.getElementById('limitsContainer');
  
  // Remove empty state message
  if (limitsContainer.querySelector('p')) {
    limitsContainer.innerHTML = '';
  }
  
  const limitItem = document.createElement('div');
  limitItem.className = 'limit-item';
  
  limitItem.innerHTML = `
    <input type="text" placeholder="example.com" value="${domain}" class="limit-domain">
    <input type="number" placeholder="Minutes" value="${minutes}" min="1" class="limit-minutes">
    <button class="remove-limit">×</button>
  `;
  
  limitItem.querySelector('.remove-limit').addEventListener('click', () => {
    limitItem.remove();
    if (limitsContainer.children.length === 0) {
      limitsContainer.innerHTML = '<p style="color: #666; font-size: 13px; text-align: center; padding: 20px;">No limits set. Click "Add Limit" to create one.</p>';
    }
  });
  
  limitsContainer.appendChild(limitItem);
}

// Save time limits
async function saveLimits() {
  const { settings } = await chrome.storage.local.get('settings');
  const limitItems = document.querySelectorAll('.limit-item');
  
  const timeLimits = {};
  
  limitItems.forEach(item => {
    const domain = item.querySelector('.limit-domain').value.trim();
    const minutes = parseInt(item.querySelector('.limit-minutes').value);
    
    if (domain && minutes > 0) {
      timeLimits[domain] = minutes;
    }
  });
  
  settings.timeLimits = timeLimits;
  
  await chrome.runtime.sendMessage({
    action: 'updateSettings',
    settings: settings
  });
  
  hideSettingsModal();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  loadSettings();
  
  // Refresh data every 5 seconds
  setInterval(loadData, 5000);
});

document.getElementById('focusModeToggle').addEventListener('change', saveSettings);
document.getElementById('resetBtn').addEventListener('click', resetData);
document.getElementById('settingsBtn').addEventListener('click', showSettingsModal);
document.getElementById('manageLimitsBtn').addEventListener('click', showSettingsModal);
document.getElementById('closeModal').addEventListener('click', hideSettingsModal);
document.getElementById('addLimitBtn').addEventListener('click', () => addLimitItem());
document.getElementById('saveLimitsBtn').addEventListener('click', saveLimits);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  const modal = document.getElementById('settingsModal');
  if (e.target === modal) {
    hideSettingsModal();
  }
});
