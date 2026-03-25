# TimeLens - Website Time Tracker Chrome Extension

A beautiful, lightweight Chrome extension that tracks your website usage time with insights and focus mode capabilities.

## Features

### Core Tracking
- **Real-time tracking** of active tab usage
- **Automatic detection** of tab switches and window focus changes
- **Idle detection** - pauses tracking when you're away (60s threshold)
- **Domain-based tracking** - groups time by website domain
- **Automatic daily reset** at midnight

### Dashboard
- **Today's total time** displayed prominently
- **Top 5 websites** with visual progress bars
- **Motivational messages** based on usage patterns
- **Real-time updates** every 5 seconds
- **Clean dark mode UI** with smooth animations

### Focus Mode
- **Time limits** - set daily limits for specific websites
- **Automatic blocking** - redirects to block page when limit reached
- **Custom limits** - configure different limits for each site
- **Easy management** - add/remove limits through intuitive UI

### Data Management
- **Persistent storage** using chrome.storage.local
- **Manual reset** option for clearing today's data
- **Efficient tracking** - minimal performance impact
- **Privacy-focused** - all data stored locally

## Installation

### From Source (Developer Mode)

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the TimeLens folder
6. The extension icon will appear in your toolbar

### Icons
Icons are automatically generated using the included Python script. If you need to regenerate them:

```bash
pip install pillow
python generate_icons.py
```

## Usage

### Basic Tracking
1. Click the TimeLens icon in your toolbar
2. Start browsing - tracking begins automatically
3. View your stats in the popup dashboard

### Setting Time Limits
1. Open the TimeLens popup
2. Toggle "Focus Mode" on
3. Click "Manage Limits"
4. Add websites and time limits (in minutes)
5. Click "Save"

When you exceed a limit, you'll be redirected to a block page.

### Resetting Data
Click "Reset Today's Data" in the popup to clear all tracking for the current day.

## File Structure

```
TimeLens/
├── manifest.json          # Extension configuration (Manifest V3)
├── background.js          # Service worker for tracking logic
├── popup.html            # Dashboard UI structure
├── popup.css             # Dashboard styling (dark mode)
├── popup.js              # Dashboard functionality
├── blocked.html          # Block page for focus mode
├── generate_icons.py     # Icon generation script
├── icons/
│   ├── icon16.png       # Toolbar icon
│   ├── icon48.png       # Extension management icon
│   └── icon128.png      # Chrome Web Store icon
└── README.md            # This file
```

## Technical Details

### Permissions
- `tabs` - Access tab information for tracking
- `storage` - Store time data locally
- `idle` - Detect when user is away
- `alarms` - Schedule daily resets

### Architecture
- **Manifest V3** - Uses modern service worker architecture
- **Event-driven** - Responds to tab/window events efficiently
- **Periodic saves** - Data saved every 10 seconds to prevent loss
- **Idle detection** - 60-second threshold for idle state

### Data Storage
```javascript
{
  timeData: {
    "youtube.com": 3600000,  // milliseconds
    "github.com": 1800000,
    // ...
  },
  settings: {
    focusMode: true,
    timeLimits: {
      "youtube.com": 120,  // minutes
      // ...
    }
  },
  lastReset: "Sun Mar 22 2026"
}
```

## Improvements & Unique Features

### Current Unique Features
1. **Motivational messages** - Dynamic feedback based on usage
2. **Visual progress bars** - Easy-to-understand time comparison
3. **Smooth animations** - Modern, polished UI experience
4. **Focus mode integration** - Not just tracking, but helping productivity
5. **Automatic daily reset** - No manual intervention needed

### Suggested Improvements

#### Short-term Enhancements
1. **Export data** - Download usage reports as CSV/JSON
2. **Weekly/monthly views** - Historical data visualization
3. **Categories** - Group sites (Social, Work, Entertainment)
4. **Productivity score** - Calculate based on site categories
5. **Break reminders** - Notify after extended usage

#### Medium-term Features
1. **Charts & graphs** - Visual trends over time
2. **Goals system** - Set and track productivity goals
3. **Whitelist mode** - Only allow specific sites during focus
4. **Schedule focus mode** - Auto-enable during work hours
5. **Sync across devices** - Use chrome.storage.sync

#### Advanced Features
1. **AI insights** - Pattern recognition and suggestions
2. **Pomodoro integration** - Built-in timer with tracking
3. **Team features** - Compare stats with friends (opt-in)
4. **Browser history analysis** - Deeper insights
5. **Mobile companion** - Track phone usage too

### Competitive Advantages
- **Cleaner UI** than RescueTime
- **More privacy** than WakaTime (local storage only)
- **Better UX** than StayFocusd (modern design)
- **Lighter weight** than Toggl Track
- **Free & open source** - no subscriptions

## Privacy

TimeLens respects your privacy:
- All data stored locally on your device
- No data sent to external servers
- No analytics or tracking
- No account required
- Open source code for transparency

## Browser Compatibility

- Chrome 88+ (Manifest V3 support)
- Edge 88+ (Chromium-based)
- Brave (Chromium-based)
- Opera (Chromium-based)

## Development

### Testing
1. Make changes to source files
2. Go to `chrome://extensions/`
3. Click reload icon on TimeLens card
4. Test functionality in popup and background

### Debugging
- **Background script**: chrome://extensions/ → TimeLens → "service worker"
- **Popup**: Right-click popup → "Inspect"
- **Storage**: DevTools → Application → Storage → Local Storage

## Contributing

Contributions welcome! Areas for improvement:
- Additional chart types
- Better idle detection
- Performance optimizations
- UI/UX enhancements
- Bug fixes

## License

MIT License - feel free to modify and distribute

## Support

For issues or questions:
1. Check existing issues
2. Create new issue with details
3. Include Chrome version and error logs

---

Built with ❤️ for productivity enthusiasts
