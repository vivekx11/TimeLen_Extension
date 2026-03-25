# TimeLens Installation Guide

## Quick Start (5 minutes)

### Step 1: Download the Extension
- Download or clone this repository to your computer
- Extract the ZIP file if downloaded

### Step 2: Open Chrome Extensions
1. Open Google Chrome
2. Type `chrome://extensions/` in the address bar
3. Press Enter

### Step 3: Enable Developer Mode
- Look for the "Developer mode" toggle in the top-right corner
- Click to enable it

### Step 4: Load the Extension
1. Click "Load unpacked" button (top-left)
2. Navigate to the TimeLens folder
3. Select the folder and click "Select Folder"

### Step 5: Verify Installation
- You should see the TimeLens card appear
- The extension icon will show in your toolbar
- Click the icon to open the dashboard

## First Time Setup

### 1. Start Tracking
- Simply browse the web normally
- TimeLens automatically tracks your active tab
- Switch tabs to see tracking in action

### 2. View Your Stats
- Click the TimeLens icon in toolbar
- See your total time and top websites
- Stats update every 5 seconds

### 3. Enable Focus Mode (Optional)
1. Open TimeLens popup
2. Toggle "Focus Mode" on
3. Click "Manage Limits"
4. Add websites you want to limit:
   - Enter domain (e.g., "youtube.com")
   - Set time limit in minutes
   - Click "Save"

## Troubleshooting

### Extension Not Loading
**Problem**: Error when loading unpacked extension

**Solutions**:
- Make sure all files are in the same folder
- Check that manifest.json exists
- Verify icons folder contains all 3 PNG files
- Try reloading: Extensions page → TimeLens → Reload icon

### Icons Missing
**Problem**: Extension loads but no icon appears

**Solutions**:
```bash
# Regenerate icons
pip install pillow
python generate_icons.py
```

Or create icons manually:
- Create 16x16, 48x48, and 128x128 PNG files
- Save as icon16.png, icon48.png, icon128.png
- Place in icons/ folder

### Tracking Not Working
**Problem**: Time not being recorded

**Solutions**:
1. Check extension is enabled (chrome://extensions/)
2. Click service worker link to check for errors
3. Reload the extension
4. Close and reopen Chrome

### Data Not Saving
**Problem**: Stats reset unexpectedly

**Solutions**:
- Check Chrome storage permissions
- Verify chrome.storage.local is available
- Look for errors in service worker console

### Focus Mode Not Blocking
**Problem**: Sites not blocked when limit reached

**Solutions**:
1. Verify Focus Mode is toggled ON
2. Check time limits are set correctly
3. Ensure domain matches exactly (no www.)
4. Reload extension and try again

## Uninstallation

### Remove Extension
1. Go to `chrome://extensions/`
2. Find TimeLens
3. Click "Remove"
4. Confirm removal

### Clear Data
Extension data is automatically removed when uninstalled. To manually clear:
1. Open DevTools (F12)
2. Application → Storage → Local Storage
3. Find chrome-extension://[extension-id]
4. Right-click → Clear

## Advanced Configuration

### Change Idle Timeout
Edit `background.js` line 67:
```javascript
chrome.idle.setDetectionInterval(60); // Change 60 to desired seconds
```

### Modify Save Interval
Edit `background.js` line 155:
```javascript
}, 10000); // Change 10000 to desired milliseconds
```

### Customize Reset Time
Edit `background.js` `getNextMidnight()` function to change reset schedule.

## Browser Compatibility

### Supported Browsers
✅ Chrome 88+
✅ Edge 88+ (Chromium)
✅ Brave
✅ Opera

### Not Supported
❌ Firefox (uses different manifest)
❌ Safari (different extension system)
❌ Old Chrome versions (<88)

## Getting Help

### Check Logs
1. **Background script logs**:
   - chrome://extensions/
   - TimeLens → "service worker"
   - View console for errors

2. **Popup logs**:
   - Right-click extension icon
   - Click "Inspect"
   - Check console tab

### Common Error Messages

**"Service worker registration failed"**
- Reload extension
- Check manifest.json syntax
- Verify background.js exists

**"Storage quota exceeded"**
- Reset today's data
- Clear old data
- Check storage usage

**"Tabs permission denied"**
- Reinstall extension
- Check manifest.json permissions

## Performance Tips

### Optimize Tracking
- Extension uses minimal resources
- ~1-2MB memory usage
- Negligible CPU impact
- Data saved efficiently

### Reduce Storage
- Reset data regularly
- Don't track chrome:// pages
- Limit to important domains

## Security & Privacy

### What Data is Collected
- Website domains (e.g., "youtube.com")
- Time spent (in milliseconds)
- Focus mode settings
- Time limits

### What is NOT Collected
- Full URLs or page titles
- Personal information
- Browsing history details
- Form data or passwords

### Where Data is Stored
- Locally on your device only
- chrome.storage.local API
- Never sent to external servers
- Cleared on uninstall

## Updates

### Manual Updates
1. Download new version
2. Delete old folder
3. Load new unpacked extension
4. Data persists automatically

### Future Auto-Updates
When published to Chrome Web Store, updates will be automatic.

---

Need more help? Check README.md or create an issue on GitHub.
