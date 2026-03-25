# TimeLens Testing Guide

## Quick Test Checklist

### Installation Test
- [ ] Extension loads without errors
- [ ] Icon appears in toolbar
- [ ] Popup opens when clicked
- [ ] No console errors in service worker

### Basic Tracking Test
1. [ ] Open a website (e.g., youtube.com)
2. [ ] Wait 10 seconds
3. [ ] Open TimeLens popup
4. [ ] Verify site appears in top websites
5. [ ] Verify time is being tracked

### Tab Switching Test
1. [ ] Open multiple tabs
2. [ ] Switch between tabs every 5 seconds
3. [ ] Open popup
4. [ ] Verify each site shows time
5. [ ] Verify times are different

### Idle Detection Test
1. [ ] Open a website
2. [ ] Leave computer idle for 2 minutes
3. [ ] Return and check popup
4. [ ] Verify time didn't increase during idle

### Focus Mode Test
1. [ ] Toggle Focus Mode ON
2. [ ] Click "Manage Limits"
3. [ ] Add limit: youtube.com, 1 minute
4. [ ] Click Save
5. [ ] Browse youtube.com for 1+ minute
6. [ ] Verify redirect to blocked page

### Data Reset Test
1. [ ] Accumulate some tracking data
2. [ ] Click "Reset Today's Data"
3. [ ] Confirm the action
4. [ ] Verify all data is cleared
5. [ ] Verify popup shows empty state

### UI/UX Test
- [ ] All buttons are clickable
- [ ] Animations work smoothly
- [ ] Modal opens and closes
- [ ] Toggle switch works
- [ ] Progress bars display correctly
- [ ] Text is readable
- [ ] No layout issues

## Detailed Test Scenarios

### Scenario 1: First-Time User
**Goal**: Verify new user experience

1. Install extension
2. Open popup immediately
3. **Expected**: Empty state with welcome message
4. Browse 3 different websites for 30 seconds each
5. Open popup
6. **Expected**: All 3 sites listed with ~30s each

### Scenario 2: Heavy User
**Goal**: Test with lots of data

1. Browse 10+ different websites
2. Spend varying amounts of time on each
3. Open popup
4. **Expected**: Top 5 sites shown, sorted by time
5. **Expected**: Total time is sum of all sites

### Scenario 3: Focus Mode Power User
**Goal**: Test focus mode thoroughly

1. Enable Focus Mode
2. Add limits for 3 sites:
   - youtube.com: 5 minutes
   - twitter.com: 10 minutes
   - reddit.com: 15 minutes
3. Browse each site
4. **Expected**: Blocked when limit reached
5. Disable Focus Mode
6. **Expected**: Can access sites again

### Scenario 4: Daily Reset
**Goal**: Verify automatic reset

1. Accumulate data throughout the day
2. Note the data before midnight
3. Wait until after midnight (or change system time)
4. Open popup
5. **Expected**: Data is reset to zero

### Scenario 5: Window Management
**Goal**: Test multi-window behavior

1. Open 2 Chrome windows
2. Browse different sites in each
3. Switch between windows
4. **Expected**: Only active window is tracked
5. Minimize all windows
6. **Expected**: Tracking pauses

## Performance Tests

### Memory Usage
1. Open Chrome Task Manager (Shift+Esc)
2. Find TimeLens extension
3. **Expected**: <5MB memory usage
4. Browse for 1 hour
5. **Expected**: Memory doesn't grow significantly

### CPU Usage
1. Open Chrome Task Manager
2. Monitor TimeLens CPU usage
3. **Expected**: 0% when idle
4. **Expected**: <1% when tracking

### Storage Usage
1. Open DevTools → Application → Storage
2. Check Local Storage size
3. **Expected**: <1MB for typical daily use
4. Browse 50+ sites
5. **Expected**: Still <2MB

## Edge Cases

### Test 1: Rapid Tab Switching
- Switch tabs every second for 1 minute
- **Expected**: No crashes, accurate tracking

### Test 2: Chrome Restart
- Accumulate data
- Close Chrome completely
- Reopen Chrome
- **Expected**: Data persists

### Test 3: Extension Reload
- Accumulate data
- Reload extension (chrome://extensions/)
- **Expected**: Data persists

### Test 4: Invalid Domains
- Visit chrome:// pages
- Visit file:// URLs
- **Expected**: Not tracked, no errors

### Test 5: Very Long Sessions
- Leave tab open for 8+ hours
- **Expected**: Accurate time tracking
- **Expected**: No performance issues

## Browser Compatibility

### Chrome
- [ ] Version 88+
- [ ] Windows
- [ ] macOS
- [ ] Linux

### Edge
- [ ] Version 88+
- [ ] Windows
- [ ] macOS

### Brave
- [ ] Latest version
- [ ] All platforms

### Opera
- [ ] Latest version
- [ ] All platforms

## Automated Testing (Future)

### Unit Tests
```javascript
// Example test structure
describe('formatTime', () => {
  it('formats milliseconds correctly', () => {
    expect(formatTime(3600000)).toBe('1h 0m');
  });
});
```

### Integration Tests
```javascript
// Example test structure
describe('Tracking', () => {
  it('tracks active tab time', async () => {
    // Test implementation
  });
});
```

## Bug Report Template

When reporting bugs, include:

```
**Bug Description**
Clear description of the issue

**Steps to Reproduce**
1. Step one
2. Step two
3. Step three

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- Browser: Chrome 120
- OS: Windows 11
- Extension Version: 1.0.0

**Screenshots**
Attach if applicable

**Console Errors**
Paste any error messages
```

## Test Results Log

### Test Session: [Date]
**Tester**: [Name]
**Version**: 1.0.0
**Browser**: Chrome 120
**OS**: Windows 11

| Test | Status | Notes |
|------|--------|-------|
| Installation | ✅ Pass | No issues |
| Basic Tracking | ✅ Pass | Works perfectly |
| Tab Switching | ✅ Pass | Accurate |
| Idle Detection | ⚠️ Warning | 60s delay |
| Focus Mode | ✅ Pass | Blocks correctly |
| Data Reset | ✅ Pass | Clears all data |
| UI/UX | ✅ Pass | Smooth animations |

**Overall**: ✅ All tests passed

**Issues Found**: None

**Recommendations**: None

---

## Continuous Testing

### Daily Checks
- Extension loads without errors
- Basic tracking works
- No console errors

### Weekly Checks
- All features functional
- Performance acceptable
- No memory leaks

### Before Release
- Complete all test scenarios
- Test on all supported browsers
- Verify documentation accuracy
- Check for security issues

---

## Testing Tools

### Chrome DevTools
- Console: Check for errors
- Network: Verify no external calls
- Application: Inspect storage
- Performance: Profile CPU/memory

### Chrome Extensions Page
- Service worker console
- Error logs
- Storage inspection

### Manual Testing
- Real-world usage
- Different browsing patterns
- Various websites
- Extended sessions

---

**Happy Testing! 🧪**
