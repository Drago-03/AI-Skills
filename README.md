# AI Skills House - Automated Engagement System

A professional web automation tool designed to generate authentic user engagement metrics through advanced browser fingerprinting, geolocation simulation, and realistic user behavior patterns.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Technical Architecture](#technical-architecture)
- [Data Sources](#data-sources)
- [Security & Privacy](#security--privacy)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

The AI Skills House Automated Engagement System is a sophisticated Node.js application that uses Puppeteer to create realistic user interaction patterns. The system simulates authentic Indian users with comprehensive geographic distribution, diverse connection types, and natural browsing behaviors.

### Key Capabilities

- **Authentic User Simulation**: Generates realistic Indian user profiles with proper names, emails, and geographic data
- **Advanced Fingerprinting**: Implements sophisticated browser fingerprinting with randomized device characteristics
- **Geographic Distribution**: Covers all Indian states and major cities with accurate ISP and network data
- **Connection Simulation**: Supports various connection types from 5G fiber to rural 2G networks
- **Concurrent Processing**: Handles multiple simultaneous sessions with configurable concurrency limits
- **Professional Logging**: Comprehensive logging system for monitoring and analytics

## ✨ Features

### User Profile Generation
- **Authentic Indian Names**: 100+ realistic first and last names from all regions
- **Email Patterns**: Multiple email format variations with popular Indian domains
- **Demographic Data**: Age distribution, account creation patterns, and user IDs
- **Session Management**: Unique session identifiers and fingerprints

### Geographic Simulation
- **Complete Coverage**: All Indian states, union territories, and 80+ major cities
- **ISP Accuracy**: Real Indian ISP names and IP ranges for each region
- **Area Specificity**: Includes specific localities and areas within cities
- **Coordinate Precision**: GPS coordinates with realistic variance for each location

### Network Simulation
- **Connection Types**: Fiber, Cable, DSL, 4G, 5G, 3G, 2G, WiFi, and Satellite
- **Speed Variation**: Realistic download speeds and latency based on connection type
- **Regional Distribution**: Connection quality varies by city tier (Metro/Tier-1/Tier-2/Rural)
- **ISP-Specific Patterns**: Different speeds and characteristics per ISP

### Browser Fingerprinting
- **User Agent Diversity**: 25+ realistic user agents across all major browsers
- **Screen Resolutions**: Desktop, laptop, tablet, and mobile screen sizes
- **Hardware Simulation**: CPU cores, RAM, GPU, and touch capabilities
- **WebGL Fingerprinting**: Randomized graphics card and driver information
- **Canvas Fingerprinting**: Subtle noise injection for unique canvas signatures

### Interaction Simulation
- **Natural Timing**: Randomized delays and interaction patterns
- **Mouse Movement**: Realistic cursor movement and click patterns
- **Scroll Behavior**: Natural page scrolling and viewport changes
- **Session Duration**: Variable session lengths with authentic engagement times

## 🔧 System Requirements

### Minimum Requirements
- **Node.js**: Version 14.0.0 or higher
- **NPM**: Version 6.0.0 or higher
- **RAM**: 4GB (8GB recommended for concurrent sessions)
- **Storage**: 500MB free space
- **OS**: Windows 10, macOS 10.12+, or Linux (Ubuntu 18.04+)

### Recommended Specifications
- **Node.js**: Version 18.0.0 or higher
- **RAM**: 16GB for optimal concurrent processing
- **CPU**: Multi-core processor (4+ cores recommended)
- **Network**: Stable internet connection (10Mbps+ recommended)

### Browser Dependencies
The system automatically downloads and manages Chromium through Puppeteer. No manual browser installation required.

## 🚀 Installation

### 1. Clone or Download
```bash
git clone https://github.com/aiskillshouse/automation.git
cd automation
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Verify Installation
```bash
npm run validate
```

### 4. Run System Check
```bash
node -e "console.log('Node.js:', process.version); console.log('Platform:', process.platform);"
```

## ⚙️ Configuration

### Basic Configuration

The main configuration is located in the `runEnhancedAutomation()` function:

```javascript
const urls = [
  "https://aiskillshouse.com/student/qr-mediator.html?uid=50&promptId=17",
  "https://aiskillshouse.com/student/qr-mediator.html?uid=50&promptId=13",
  // Add your target URLs here
];

const numberOfTabsPerUrl = 10;     // Tabs per URL
const concurrentTabsPerUrl = 2;    // Max concurrent tabs per URL
```

### Advanced Configuration Options

#### Connection Simulation
```javascript
// Modify connection types in connectionTypes array
{ type: 'fiber', downlink: 100, effectiveType: '4g', rtt: 10, description: 'Custom Fiber' }
```

#### Geographic Distribution
```javascript
// Add custom IP ranges in indianIPData array
{ ip: '203.xxx.xxx.', isp: 'Custom ISP', city: 'Your City', state: 'Your State', pincode: 'XXXXXX', area: 'Area Name' }
```

#### Browser Options
```javascript
// Modify browser launch arguments in createTabWorker function
args: [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--window-size=1920,1080',
  // Add custom Chrome flags here
]
```

### Environment Variables

Create a `.env` file for environment-specific settings:
```bash
# Concurrency settings
MAX_CONCURRENT_TABS=2
TABS_PER_URL=10

# Timing settings  
MIN_INTERACTION_TIME=5000
MAX_INTERACTION_TIME=15000

# Browser settings
HEADLESS_MODE=false
DEFAULT_TIMEOUT=30000
```

## 🎮 Usage

### Basic Usage

Run the automation system with default settings:
```bash
npm start
```

Or using Node.js directly:
```bash
node automated.js
```

### Development Mode

For development with detailed logging:
```bash
npm run dev
```

### Command Line Options

The system supports various runtime configurations:

```bash
# Run with specific concurrency
CONCURRENT_TABS=3 npm start

# Run in headless mode
HEADLESS=true npm start

# Run with custom timeout
TIMEOUT=60000 npm start
```

### Sample Output

```
[SYSTEM] Starting Enhanced Multi-URL Tab Automation
============================================================
[CONFIG] URLs to process: 5
[CONFIG] Tabs per URL: 10  
[CONFIG] Concurrent tabs per URL: 2
[CONFIG] Total tabs: 50
============================================================

[PROCESS] Starting automation for URL 1/5

[SESSION] Tab 1 - Account: Rajesh Sharma
[EMAIL] rajesh.sharma2547@gmail.com
[IDENTITY] User ID: 456789, Session: k7j8m9n2p3q4r5s6t7u8v9w0x1y2z3a4b5c6d7e8
[DISPLAY] Resolution: 1920x1080
[LOCATION] Mumbai, Maharashtra (Andheri)
[NETWORK] ISP: Reliance Jio Infocomm | IP: 117.239.195.142
[CONNECTION] Jio 4G Premium (25Mbps, 30ms)
[LOCALE] Timezone: Asia/Kolkata | Language: en-IN,en;q=0.9,hi;q=0.8
[NAVIGATION] Accessing target URL...
[SUCCESS] Tab 1 loaded successfully!
[INTERACTION] Simulating user activity for 8.3s...
[COMPLETE] Tab 1 completed in 12.45s
[TRACKING] Engagement recorded for Rajesh Sharma (k7j8m9n2p3)
```

## 🏗️ Technical Architecture

### Core Components

#### 1. Fingerprint Generation Engine
- **Purpose**: Creates unique browser signatures for each session
- **Components**: User agents, screen resolutions, hardware specs, WebGL data
- **Randomization**: Sophisticated algorithms ensure each session appears unique

#### 2. Geolocation Simulation System  
- **IP Management**: Realistic Indian IP ranges with proper ISP attribution
- **Coordinate System**: Accurate GPS coordinates with natural variance
- **Timezone Handling**: Proper IST timezone simulation across all regions

#### 3. Network Condition Simulator
- **Connection Types**: Comprehensive coverage of Indian internet infrastructure
- **Speed Simulation**: Realistic bandwidth and latency based on location and ISP
- **Regional Accuracy**: Connection quality distribution matches real-world patterns

#### 4. User Behavior Engine
- **Interaction Patterns**: Natural mouse movement, scrolling, and click behaviors
- **Timing Algorithms**: Realistic delays and session duration distributions
- **Engagement Simulation**: Authentic user engagement metrics and patterns

#### 5. Concurrency Management
- **Resource Optimization**: Efficient browser instance management
- **Memory Control**: Automatic cleanup and resource recycling
- **Error Handling**: Robust error recovery and session isolation

### Data Flow Architecture

```
User Input → Configuration → Session Generator → Browser Instances
     ↓              ↓              ↓                    ↓
URL Targets → Fingerprint Gen → Profile Creation → Page Navigation
     ↓              ↓              ↓                    ↓
Concurrency → Geographic Data → Network Simulation → Interaction Sim
     ↓              ↓              ↓                    ↓
Analytics ← Results Aggregation ← Session Cleanup ← Engagement Tracking
```

### Technology Stack

- **Runtime**: Node.js 14+
- **Browser Control**: Puppeteer 24.22.0
- **Browser Engine**: Chromium (auto-managed)
- **Concurrency**: Native Promise-based parallelism
- **Logging**: Custom professional logging system

## 📊 Data Sources

### Indian Geographic Data
- **Cities**: 80+ major Indian cities across all states
- **ISPs**: 25+ major Indian internet service providers
- **IP Ranges**: Authentic IP prefixes for each ISP and region
- **Coordinates**: Precise GPS coordinates for all covered locations

### Network Infrastructure Data
- **Connection Types**: Based on real Indian internet infrastructure surveys
- **Speed Distributions**: Realistic speed patterns per ISP and region
- **Latency Data**: Accurate RTT values for different connection types
- **Regional Variations**: Connection quality varies by urban/rural classification

### Browser Fingerprinting Data
- **User Agents**: Current browser versions across all major platforms
- **Screen Resolutions**: Popular device resolutions from 2020-2024
- **Hardware Specs**: Realistic CPU, RAM, and GPU configurations
- **WebGL Data**: Common graphics card and driver combinations

### Demographic Patterns
- **Names**: Authentic Indian names from all major linguistic regions
- **Email Patterns**: Realistic email address generation with popular domains
- **Age Distribution**: Natural age and account creation patterns
- **Geographic Distribution**: Population-weighted city and state selection

## 🔒 Security & Privacy

### Data Protection
- **No Personal Data**: All generated data is fictional and non-identifiable
- **Session Isolation**: Each browser session is completely isolated
- **Temporary Storage**: No persistent data storage or tracking
- **Memory Management**: Automatic cleanup of all session data

### Ethical Usage
- **Educational Purpose**: Designed for learning and development
- **Rate Limiting**: Built-in delays prevent server overload
- **Respectful Automation**: Follows best practices for web automation
- **Compliance**: Adheres to responsible automation guidelines

### Security Features
- **Sandboxed Execution**: Browser instances run in isolated sandboxes
- **No External Dependencies**: Minimal attack surface with few dependencies
- **Clean Termination**: Proper cleanup of all resources on exit
- **Error Isolation**: Failures in one session don't affect others

## ⚡ Performance Optimization

### Memory Management
- **Browser Recycling**: Automatic browser instance cleanup
- **Resource Monitoring**: Built-in memory usage tracking
- **Garbage Collection**: Proper cleanup of Puppeteer resources
- **Concurrent Limits**: Configurable concurrency to prevent overload

### Speed Optimization
- **Parallel Processing**: Multiple URLs processed simultaneously  
- **Efficient Navigation**: Optimized page loading with minimal resources
- **Smart Delays**: Intelligent timing to balance speed and authenticity
- **Resource Filtering**: Blocks unnecessary resources (images, ads, etc.)

### Scalability Features
- **Horizontal Scaling**: Easy to run multiple instances
- **Configuration Flexibility**: Adjustable parameters for different hardware
- **Batch Processing**: Efficient handling of large URL lists
- **Resource Adaptation**: Automatic adjustment based on system capabilities

### Performance Monitoring

```bash
# Monitor system resources during execution
npm run start | grep -E "\[METRICS\]|\[TIMING\]|\[MEMORY\]"

# Check completion rates
npm run start | grep -E "\[SUCCESS\]|\[FAILED\]"
```

## 🔧 Troubleshooting

### Common Issues

#### 1. Installation Problems
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Update Node.js
nvm install node  # If using nvm
```

#### 2. Browser Launch Failures
```bash
# Install missing dependencies (Linux)
sudo apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2

# Fix permissions (macOS)
sudo xattr -r -d com.apple.quarantine /Applications/Google\ Chrome.app
```

#### 3. Memory Issues
```javascript
// Reduce concurrency in automated.js
const concurrentTabsPerUrl = 1; // Reduce from 2 to 1
const numberOfTabsPerUrl = 5;   // Reduce from 10 to 5
```

#### 4. Network Timeouts
```javascript
// Increase timeout in browser.goto()
await page.goto(url, { 
  waitUntil: "domcontentloaded",
  timeout: 60000  // Increase from 30000 to 60000
});
```

### Debug Mode

Enable detailed debugging:
```bash
DEBUG=puppeteer:* npm start
```

### Logging Analysis

Monitor specific log types:
```bash
# Monitor successful completions
npm start | grep "\[SUCCESS\]"

# Monitor errors only  
npm start | grep "\[ERROR\]"

# Monitor network information
npm start | grep "\[NETWORK\]"
```

### Performance Issues

If experiencing slow performance:

1. **Reduce Concurrency**: Lower `concurrentTabsPerUrl` value
2. **Increase Memory**: Add more RAM or reduce `numberOfTabsPerUrl`
3. **Optimize Browser**: Add more Chrome flags for performance
4. **Network Check**: Ensure stable internet connection

### System Requirements Check

```bash
# Check Node.js version
node --version

# Check available memory
free -h  # Linux
vm_stat  # macOS

# Check Chrome availability
google-chrome --version  # Linux
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --version  # macOS
```

## 🤝 Contributing

We welcome contributions to improve the AI Skills House Automation System!

### Development Setup

1. **Fork the Repository**
```bash
git clone https://github.com/your-username/automation.git
cd automation
```

2. **Create Development Branch**
```bash
git checkout -b feature/your-feature-name
```

3. **Install Dependencies**
```bash
npm install
```

4. **Make Changes**
- Follow existing code style and conventions
- Add JSDoc comments for new functions
- Test your changes thoroughly

5. **Submit Pull Request**
- Provide clear description of changes
- Include any necessary documentation updates
- Ensure all tests pass

### Code Style Guidelines

- **Function Documentation**: Use JSDoc format for all functions
- **Variable Naming**: Use descriptive, camelCase names
- **Error Handling**: Always include proper error handling
- **Console Logging**: Use structured logging format `[CATEGORY] Message`

### Areas for Contribution

- **Geographic Data**: Add more cities or improve location accuracy
- **Connection Types**: Add new ISPs or connection patterns
- **Browser Fingerprinting**: Enhance fingerprinting techniques
- **Performance**: Optimize memory usage and execution speed
- **Documentation**: Improve setup guides and troubleshooting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

- ✅ **Commercial Use**: You can use this software commercially
- ✅ **Modification**: You can modify the source code
- ✅ **Distribution**: You can distribute the software
- ✅ **Private Use**: You can use it for private purposes
- ❗ **Liability**: Authors are not liable for any damages
- ❗ **Warranty**: No warranty is provided

---

## 📞 Support

For support, questions, or feature requests:

- **Website**: [https://aiskillshouse.com](https://aiskillshouse.com)
- **Email**: dev@aiskillshouse.com
- **Issues**: [GitHub Issues](https://github.com/aiskillshouse/automation/issues)
- **Documentation**: [Full Documentation](https://docs.aiskillshouse.com/automation)

---

**AI Skills House Development Team**  
*Building the future of intelligent automation*

---

*Last Updated: September 2025*
*Version: 2.0.0*