# Changelog

All notable changes to TimeLens will be documented in this file.

## [1.0.0] - 2026-03-22

### Initial Release

#### Added
- Real-time website tracking with domain-based grouping
- Automatic tab and window focus detection
- Idle state detection (60-second threshold)
- Daily automatic reset at midnight
- Beautiful dark mode dashboard UI
- Top 5 websites display with visual progress bars
- Total time tracking with motivational messages
- Focus Mode with customizable time limits
- Website blocking when limits are reached
- Time limit management interface
- Manual data reset functionality
- Smooth animations and transitions
- Responsive popup design (380px width)
- Persistent local storage
- Service worker architecture (Manifest V3)
- Periodic data saving (10-second intervals)
- Chrome idle API integration
- Chrome alarms API for daily reset

#### Technical Features
- Manifest V3 compliance
- Event-driven architecture
- Efficient memory usage
- No external dependencies
- Privacy-focused (local storage only)
- Clean, commented code
- Production-ready implementation

#### UI/UX
- Modern gradient design
- Animated logo and elements
- Hover effects and transitions
- Empty state handling
- Modal dialogs for settings
- Icon-based navigation
- Responsive layout
- Accessible color contrast

#### Documentation
- Comprehensive README
- Installation guide
- Troubleshooting section
- Privacy policy
- Development guidelines
- Contributing guidelines

---

## Planned Features

### [1.1.0] - Upcoming
- Export data as CSV/JSON
- Weekly statistics view
- Custom date range selection
- Improved motivational messages
- Keyboard shortcuts
- Settings page (options.html)

### [1.2.0] - Future
- Charts and graphs
- Category system (Work, Social, Entertainment)
- Productivity score calculation
- Break reminders
- Custom themes (light mode option)

### [2.0.0] - Long-term
- Historical data (30-day retention)
- Sync across devices (chrome.storage.sync)
- Goals and achievements system
- Pomodoro timer integration
- Advanced analytics
- Browser history analysis

---

## Version History

### Version Numbering
- **Major (X.0.0)**: Breaking changes, major features
- **Minor (1.X.0)**: New features, backwards compatible
- **Patch (1.0.X)**: Bug fixes, minor improvements

### Release Schedule
- Patch releases: As needed for bugs
- Minor releases: Monthly
- Major releases: Quarterly

---

## Migration Guide

### From 0.x to 1.0
Not applicable - initial release

### Future Migrations
Migration guides will be provided for breaking changes.

---

## Known Issues

### Current Limitations
- No historical data beyond current day
- No export functionality yet
- No sync between devices
- Chrome/Edge only (no Firefox support)
- Requires Manifest V3 support (Chrome 88+)

### Planned Fixes
All limitations listed above are planned for future releases.

---

## Deprecation Notices

None currently.

---

## Security Updates

### [1.0.0]
- Initial security review completed
- No external API calls
- Local storage only
- No sensitive data collection
- Minimal permissions requested

---

## Performance Improvements

### [1.0.0]
- Optimized tracking algorithm
- Efficient storage usage
- Minimal CPU impact
- 10-second save intervals
- Idle detection to pause tracking

---

## Breaking Changes

None in current version.

---

## Contributors

- Initial development: TimeLens Team
- Icon design: Auto-generated
- Testing: Community feedback welcome

---

## Feedback

Have suggestions or found a bug? 
- Create an issue on GitHub
- Include version number
- Provide detailed description
- Attach screenshots if applicable

---

**Note**: This changelog follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format and adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
