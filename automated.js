/**
 * AI Skills House - Automated Engagement System
 * Professional web automation tool for generating authentic user engagement metrics
 * 
 * @fileoverview Complete automation solution for simulating realistic user interactions
 * @version 2.0.0
 * @author AI Skills House Development Team
 * @license MIT
 */

const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

/**
 * Global click counter to track total engagements across all sessions
 * Script will continue running indefinitely (no auto-exit)
 * @type {number}
 */
let globalClickCounter = 0;

/**
 * Array to store detailed information about each successful click
 * Will be used to generate CSV report periodically
 * @type {Array<Object>}
 */
let clickReportData = [];

/**
 * Creates a delay for the specified number of milliseconds
 * Used to simulate natural human browsing patterns and avoid detection
 * 
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise<void>} Promise that resolves after the delay
 */
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/**
 * Increments the global click counter and generates periodic reports
 * @param {Object} clickData - Detailed information about the click
 * @returns {Promise<boolean>} Always returns true (no auto-exit)
 */
async function incrementClickCounter(clickData = {}) {
  globalClickCounter++;
  
  // Add the click record to our report data and update CSV
  await addClickRecord(clickData);
  
  console.log(`[CLICK_COUNTER] Total clicks: ${globalClickCounter}`);
  
  // Generate periodic report every 25 clicks
  if (globalClickCounter % 25 === 0) {
    console.log(`\n[REPORT] Generating periodic report after ${globalClickCounter} clicks...`);
    await generateCSVReport();
  }
  
  // Add delay after every 10 clicks
  if (globalClickCounter % 10 === 0) {
    console.log(`\n[DELAY] Reached ${globalClickCounter} clicks - Taking 30 second break...`);
    await delay(30000); // 30 second delay after every 10 clicks
    console.log(`[DELAY] Break completed, resuming automation...\n`);
  }
  
  return true; // Always continue
}

/**
 * Check if script should continue (always true now - no auto-exit)
 * @returns {boolean} Always true
 */
function shouldContinue() {
  return true; // Script runs indefinitely
}

/**
 * Adds a successful click record to the report data and immediately updates CSV file
 * @param {Object} clickData - Data about the successful click
 */
async function addClickRecord(clickData) {
  const recordWithMeta = {
    clickNumber: globalClickCounter,
    timestamp: new Date().toISOString(),
    ...clickData
  };
  
  clickReportData.push(recordWithMeta);
  
  // Immediately update CSV file
  try {
    await updateCSVFile(recordWithMeta);
    console.log(`[CSV_UPDATE] ✅ Record ${globalClickCounter} added to data.csv`);
  } catch (error) {
    console.error(`[CSV_ERROR] Failed to update CSV: ${error.message}`);
  }
}

/**
 * Updates the data.csv file in real-time with new click record
 * Creates the file with headers if it doesn't exist
 * @param {Object} record - Click record to append
 */
async function updateCSVFile(record) {
  const csvPath = path.join(__dirname, 'data.csv');
  
  // Check if file exists to determine if we need headers
  const fileExists = fs.existsSync(csvPath);
  
  // Simplified CSV Headers
  const headers = [
    'Click Number',
    'Timestamp',
    'Tab Number', 
    'Username',
    'Email',
    'User ID',
    'Session ID',
    'URL Clicked',
    'Session Start Time',
    'Session End Time',
    'Time Taken (seconds)',
    'Interaction Duration (seconds)'
  ];
  
  let csvContent = '';
  
  // Add headers if file doesn't exist
  if (!fileExists) {
    csvContent = headers.join(',') + '\n';
  }
  
  // Format the simplified record row
  const row = [
    record.clickNumber,
    `"${record.timestamp}"`,
    record.tabNumber,
    `"${record.username}"`,
    `"${record.email}"`,
    `"${record.userId}"`,
    `"${record.sessionId}"`,
    `"${record.url}"`,
    `"${record.sessionStartTime}"`,
    `"${record.sessionEndTime}"`,
    record.timeTaken,
    record.interactionDuration
  ];
  
  csvContent += row.join(',') + '\n';
  
  // Append to file (or create if new)
  await fs.promises.appendFile(csvPath, csvContent, 'utf8');
}

/**
 * Generates CSV report of all successful clicks and saves to root directory
 * @returns {Promise<string>} Path to the generated CSV file
 */
async function generateCSVReport() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const fileName = `engagement-report-${timestamp}.csv`;
  const filePath = path.join(__dirname, fileName);
  
  // CSV Headers
  const headers = [
    'Click Number',
    'Timestamp',
    'Tab Number', 
    'Username',
    'Email',
    'User ID',
    'Session ID',
    'Fingerprint',
    'Birth Year',
    'Account Age',
    'URL Clicked',
    'IP Address',
    'ISP',
    'City',
    'State',
    'Area',
    'Pincode',
    'Country',
    'Country Code',
    'Latitude',
    'Longitude',
    'Connection Type',
    'Connection Speed (Mbps)',
    'Latency (ms)',
    'Connection Description',
    'Location Tier',
    'User Agent',
    'Screen Resolution',
    'Timezone',
    'Language',
    'Session Start Time',
    'Session End Time',
    'Time Taken (seconds)',
    'Interaction Duration (seconds)'
  ];
  
  // Convert data to CSV format
  let csvContent = headers.join(',') + '\n';
  
  clickReportData.forEach(record => {
    const row = [
      record.clickNumber,
      `"${record.timestamp}"`,
      record.tabNumber,
      `"${record.username}"`,
      `"${record.email}"`,
      record.userId,
      `"${record.sessionId}"`,
      `"${record.fingerprint}"`,
      record.birthYear,
      record.accountAge,
      `"${record.url}"`,
      `"${record.ipAddress}"`,
      `"${record.isp}"`,
      `"${record.city}"`,
      `"${record.state}"`,
      `"${record.area}"`,
      `"${record.pincode}"`,
      `"${record.country}"`,
      `"${record.countryCode}"`,
      record.latitude,
      record.longitude,
      `"${record.connectionType}"`,
      record.connectionSpeed,
      record.latency,
      `"${record.connectionDescription}"`,
      `"${record.locationTier}"`,
      `"${record.userAgent}"`,
      `"${record.screenResolution}"`,
      `"${record.timezone}"`,
      `"${record.language}"`,
      `"${record.sessionStartTime}"`,
      `"${record.sessionEndTime}"`,
      record.timeTaken,
      record.interactionDuration
    ];
    csvContent += row.join(',') + '\n';
  });
  
  // Write CSV file
  try {
    await fs.promises.writeFile(filePath, csvContent, 'utf8');
    console.log(`[CSV_REPORT] Generated report: ${fileName}`);
    console.log(`[CSV_REPORT] Total records: ${clickReportData.length}`);
    console.log(`[CSV_REPORT] File location: ${filePath}`);
    return filePath;
  } catch (error) {
    console.error(`[CSV_ERROR] Failed to generate report: ${error.message}`);
    throw error;
  }
}

/**
 * Comprehensive collection of User-Agent strings for different browsers and devices
 * Covers major browsers: Chrome, Firefox, Safari, Edge across different platforms
 * Used to simulate diverse user devices and browsers for authentic traffic patterns
 * 
 * @type {string[]} Array of realistic User-Agent strings
 */
const userAgents = [
  // Windows Chrome browsers
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
  
  // MacOS Chrome browsers  
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
  
  // Windows Firefox browsers
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0',
  
  // MacOS Safari browsers
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15',
  
  // Linux browsers
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/119.0',
  
  // Windows Edge browsers
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/118.0.2088.76',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/117.0.2045.60',
  
  // Mobile browsers - iPhone
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/118.0.5993.69 Mobile/15E148 Safari/604.1',
  
  // Mobile browsers - iPad
  'Mozilla/5.0 (iPad; CPU OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (iPad; CPU OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
  
  // Mobile browsers - Android
  'Mozilla/5.0 (Android 13; Mobile; rv:109.0) Gecko/119.0 Firefox/119.0',
  'Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Mobile Safari/537.36',
  'Mozilla/5.0 (Linux; Android 12; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Mobile Safari/537.36',
  'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Mobile Safari/537.36'
];

/**
 * Screen resolutions covering common desktop, laptop, tablet and mobile sizes
 * This helps simulate different device types for more realistic traffic patterns
 * Includes popular resolutions from 2015-2023 across all device categories
 * 
 * @type {Array<{width: number, height: number}>} Array of resolution objects
 */
const resolutions = [
  // Desktop resolutions
  { width: 1920, height: 1080 }, // Full HD
  { width: 1366, height: 768 },  // Common laptop
  { width: 1440, height: 900 },  // MacBook Pro 13"
  { width: 1536, height: 864 },  // Windows laptop
  { width: 1280, height: 720 },  // HD ready
  { width: 1024, height: 768 },  // Old standard
  { width: 1600, height: 900 },  // Wide HD
  { width: 1680, height: 1050 }, // WSXGA+
  { width: 2560, height: 1440 }, // 2K QHD
  
  // Mobile phone resolutions
  { width: 375, height: 667 },   // iPhone 6/7/8
  { width: 414, height: 896 },   // iPhone XR/11
  { width: 390, height: 844 },   // iPhone 12/13
  { width: 393, height: 851 },   // iPhone 14
  { width: 360, height: 640 },   // Android common
  { width: 412, height: 892 },   // Android large
  
  // Tablet resolutions
  { width: 768, height: 1024 },  // iPad
  { width: 820, height: 1180 },  // iPad Air
  { width: 1024, height: 1366 }, // iPad Pro
  { width: 800, height: 1280 }   // Android tablet
];

/**
 * Indian timezone identifiers for realistic geolocation simulation
 * Covers major Indian cities and regions across different time zones
 * All timezones are within IST (India Standard Time - UTC+5:30)
 * 
 * @type {string[]} Array of timezone identifiers
 */
const timezones = [
  'Asia/Kolkata',   // West Bengal, Odisha, Jharkhand
  'Asia/Mumbai',    // Maharashtra, Gujarat  
  'Asia/Delhi',     // Delhi, Punjab, Haryana
  'Asia/Chennai',   // Tamil Nadu, Puducherry
  'Asia/Bangalore', // Karnataka
  'Asia/Hyderabad', // Telangana, Andhra Pradesh
  'Asia/Pune',      // Western Maharashtra
  'Asia/Ahmedabad', // Gujarat
  'Asia/Surat',     // Gujarat
  'Asia/Jaipur'     // Rajasthan
];

/**
 * Indian language preferences with proper locale codes
 * Includes major Indian languages and regional preferences with fallback patterns
 * Follows RFC 5646 language tag format with quality scores
 * 
 * @type {string[]} Array of Accept-Language header values
 */
const languages = [
  'en-IN,en;q=0.9,hi;q=0.8',     // English India with Hindi fallback
  'hi-IN,hi;q=0.9,en;q=0.8',     // Hindi with English fallback
  'en-IN,en;q=0.9',              // English India only
  'ta-IN,ta;q=0.9,en;q=0.8',     // Tamil with English
  'te-IN,te;q=0.9,en;q=0.8',     // Telugu with English
  'bn-IN,bn;q=0.9,en;q=0.8',     // Bengali with English
  'gu-IN,gu;q=0.9,en;q=0.8',     // Gujarati with English
  'kn-IN,kn;q=0.9,en;q=0.8',     // Kannada with English
  'ml-IN,ml;q=0.9,en;q=0.8',     // Malayalam with English
  'mr-IN,mr;q=0.9,en;q=0.8',     // Marathi with English
  'pa-IN,pa;q=0.9,en;q=0.8',     // Punjabi with English
  'or-IN,or;q=0.9,en;q=0.8',     // Odia with English
  'as-IN,as;q=0.9,en;q=0.8',     // Assamese with English
  'ur-IN,ur;q=0.9,en;q=0.8'      // Urdu with English
];

/**
 * Connection types for realistic network simulation  
 * Covers different internet connection speeds and types common in India with realistic ISP patterns
 * Includes fiber, cable, DSL, 4G, 5G, 3G, 2G, WiFi, and satellite connections
 * Each connection type includes downlink speed, RTT, and description for authenticity
 * 
 * @type {Array<{type: string, downlink: number, effectiveType: string, rtt: number, description: string}>}
 */
const connectionTypes = [
  // Fiber connections (major cities)
  { type: 'fiber', downlink: 100, effectiveType: '4g', rtt: 10, description: 'Fiber Broadband 100Mbps' },
  { type: 'fiber', downlink: 50, effectiveType: '4g', rtt: 15, description: 'Fiber Broadband 50Mbps' },
  { type: 'fiber', downlink: 25, effectiveType: '4g', rtt: 20, description: 'Fiber Broadband 25Mbps' },
  
  // Cable/DSL connections (urban areas)
  { type: 'cable', downlink: 20, effectiveType: '4g', rtt: 25, description: 'Cable Broadband 20Mbps' },
  { type: 'cable', downlink: 15, effectiveType: '4g', rtt: 30, description: 'Cable Broadband 15Mbps' },
  { type: 'dsl', downlink: 8, effectiveType: '4g', rtt: 40, description: 'DSL Broadband 8Mbps' },
  { type: 'dsl', downlink: 4, effectiveType: '3g', rtt: 60, description: 'DSL Broadband 4Mbps' },
  
  // 4G connections (mobile networks)
  { type: '4g', downlink: 25, effectiveType: '4g', rtt: 30, description: 'Jio 4G Premium' },
  { type: '4g', downlink: 15, effectiveType: '4g', rtt: 40, description: 'Airtel 4G Plus' },
  { type: '4g', downlink: 12, effectiveType: '4g', rtt: 45, description: 'Vi 4G Network' },
  { type: '4g', downlink: 10, effectiveType: '4g', rtt: 50, description: 'BSNL 4G' },
  { type: '4g', downlink: 8, effectiveType: '4g', rtt: 55, description: 'Standard 4G' },
  { type: '4g', downlink: 5, effectiveType: '4g', rtt: 70, description: 'Budget 4G Plan' },
  
  // 5G connections (metro cities)
  { type: '5g', downlink: 200, effectiveType: '4g', rtt: 5, description: 'Jio True 5G' },
  { type: '5g', downlink: 150, effectiveType: '4g', rtt: 8, description: 'Airtel 5G Plus' },
  { type: '5g', downlink: 100, effectiveType: '4g', rtt: 10, description: 'Vi 5G Ultra' },
  
  // 3G connections (smaller cities/rural areas)
  { type: '3g', downlink: 3, effectiveType: '3g', rtt: 150, description: 'BSNL 3G' },
  { type: '3g', downlink: 2, effectiveType: '3g', rtt: 180, description: 'Legacy 3G Network' },
  { type: '3g', downlink: 1.5, effectiveType: '3g', rtt: 200, description: 'Rural 3G Connection' },
  
  // 2G connections (rural/remote areas)
  { type: '2g', downlink: 0.5, effectiveType: '2g', rtt: 800, description: 'EDGE Connection' },
  { type: 'slow-2g', downlink: 0.25, effectiveType: 'slow-2g', rtt: 1500, description: 'GPRS Connection' },
  
  // WiFi connections (office/public)
  { type: 'wifi', downlink: 50, effectiveType: '4g', rtt: 20, description: 'Office WiFi' },
  { type: 'wifi', downlink: 30, effectiveType: '4g', rtt: 25, description: 'Home WiFi Premium' },
  { type: 'wifi', downlink: 15, effectiveType: '4g', rtt: 35, description: 'Home WiFi Standard' },
  { type: 'wifi', downlink: 8, effectiveType: '4g', rtt: 50, description: 'Public WiFi' },
  { type: 'wifi', downlink: 5, effectiveType: '3g', rtt: 80, description: 'Cafe WiFi' },
  
  // Satellite connections (remote areas)
  { type: 'satellite', downlink: 10, effectiveType: '4g', rtt: 600, description: 'Satellite Internet' },
  { type: 'satellite', downlink: 5, effectiveType: '3g', rtt: 800, description: 'VSAT Connection' }
];

/**
 * Get random connection type based on location tier for realistic distribution
 * Metro cities get better connectivity options while rural areas get limited options
 * 
 * @param {string} locationTier - City classification: 'tier1', 'tier2', 'tier3', or 'rural'
 * @returns {Object} Connection object with type, downlink, effectiveType, rtt, and description
 */
function getRandomConnectionType(locationTier = 'tier1') {
  let filteredConnections;
  
  switch(locationTier) {
    case 'tier1': // Metro cities - better connectivity
      filteredConnections = connectionTypes.filter(conn => 
        ['fiber', 'cable', '5g', '4g', 'wifi'].includes(conn.type) && conn.downlink >= 5
      );
      break;
    case 'tier2': // Major cities - good connectivity  
      filteredConnections = connectionTypes.filter(conn => 
        ['fiber', 'cable', '4g', '3g', 'wifi', 'dsl'].includes(conn.type) && conn.downlink >= 2
      );
      break;
    case 'tier3': // Smaller cities - mixed connectivity
      filteredConnections = connectionTypes.filter(conn => 
        ['4g', '3g', '2g', 'wifi', 'dsl'].includes(conn.type)
      );
      break;
    case 'rural': // Rural areas - limited connectivity
      filteredConnections = connectionTypes.filter(conn => 
        ['4g', '3g', '2g', 'satellite'].includes(conn.type) && conn.downlink <= 10
      );
      break;
    default:
      filteredConnections = connectionTypes;
  }
  
  return filteredConnections[Math.floor(Math.random() * filteredConnections.length)];
}

/**
 * Determine location tier based on city name for realistic connection distribution
 * Categorizes Indian cities into different tiers based on infrastructure and connectivity
 * 
 * @param {string} cityName - Name of the Indian city
 * @returns {string} Location tier: 'tier1' (metro), 'tier2' (major), or 'tier3' (smaller cities)
 */
function getLocationTier(cityName) {
  const tier1Cities = [
    'Mumbai', 'New Delhi', 'Bangalore', 'Chennai', 'Pune', 'Hyderabad', 'Kolkata', 'Ahmedabad', 'Gurgaon', 'Noida'
  ];
  
  const tier2Cities = [
    'Surat', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Bhopal', 'Visakhapatnam', 'Patna', 'Vadodara',
    'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Varanasi', 'Aurangabad', 'Amritsar',
    'Allahabad', 'Ranchi', 'Howrah', 'Coimbatore', 'Jabalpur', 'Gwalior', 'Vijayawada', 'Jodhpur', 'Madurai',
    'Raipur', 'Kota', 'Chandigarh', 'Guwahati', 'Solapur', 'Hubli', 'Mysore', 'Tiruchirappalli', 'Salem',
    'Thiruvananthapuram', 'Guntur', 'Bikaner', 'Amravati', 'Jamshedpur', 'Bhilai', 'Cuttack', 'Kochi',
    'Bhavnagar', 'Dehradun', 'Durgapur', 'Asansol', 'Kolhapur', 'Ajmer', 'Gulbarga', 'Jamnagar', 'Ujjain',
    'Siliguri', 'Jhansi', 'Jammu', 'Mangalore', 'Erode', 'Belgaum', 'Tirunelveli', 'Udaipur'
  ];
  
  if (tier1Cities.includes(cityName)) return 'tier1';
  if (tier2Cities.includes(cityName)) return 'tier2';
  return 'tier3';
}

/**
 * Comprehensive Indian IP ranges with ISP and location data
 * Covers major Indian telecom operators and cities across all states and union territories
 * Each entry includes IP prefix, ISP name, city, state, pincode, and specific area for authenticity
 * 
 * @type {Array<{ip: string, isp: string, city: string, state: string, pincode: string, area: string}>}
 */
const indianIPData = [
  // Maharashtra - Mumbai, Pune, Nagpur, Nashik, Aurangabad
  { ip: '203.122.58.', isp: 'Bharti Airtel Ltd', city: 'Mumbai', state: 'Maharashtra', pincode: '400001', area: 'Fort' },
  { ip: '117.239.195.', isp: 'Reliance Jio Infocomm', city: 'Mumbai', state: 'Maharashtra', pincode: '400070', area: 'Andheri' },
  { ip: '103.21.58.', isp: 'Hathway Cable & Datacom', city: 'Pune', state: 'Maharashtra', pincode: '411001', area: 'Shivaji Nagar' },
  { ip: '203.109.137.', isp: 'You Broadband India', city: 'Pune', state: 'Maharashtra', pincode: '411014', area: 'Hadapsar' },
  { ip: '103.87.169.', isp: 'Spectranet Pvt Ltd', city: 'Nagpur', state: 'Maharashtra', pincode: '440001', area: 'Civil Lines' },
  { ip: '14.102.152.', isp: 'BSNL Maharashtra', city: 'Nashik', state: 'Maharashtra', pincode: '422001', area: 'College Road' },
  { ip: '49.14.89.', isp: 'Vi (Vodafone Idea)', city: 'Aurangabad', state: 'Maharashtra', pincode: '431001', area: 'Cidco' },
  
  // Delhi NCR - Delhi, Gurgaon, Noida, Faridabad, Ghaziabad
  { ip: '14.139.56.', isp: 'Bharti Airtel Ltd', city: 'New Delhi', state: 'Delhi', pincode: '110001', area: 'Connaught Place' },
  { ip: '115.242.174.', isp: 'Vi (Vodafone Idea)', city: 'New Delhi', state: 'Delhi', pincode: '110021', area: 'Lajpat Nagar' },
  { ip: '182.71.146.', isp: 'Excitel Broadband', city: 'Gurgaon', state: 'Haryana', pincode: '122001', area: 'DLF Phase 1' },
  { ip: '103.195.185.', isp: 'D-VoiS Broadband', city: 'Noida', state: 'Uttar Pradesh', pincode: '201301', area: 'Sector 62' },
  { ip: '157.119.188.', isp: 'Connect Broadband', city: 'Faridabad', state: 'Haryana', pincode: '121001', area: 'Sector 15' },
  { ip: '122.180.155.', isp: 'Jio Fiber', city: 'Ghaziabad', state: 'Uttar Pradesh', pincode: '201001', area: 'Raj Nagar' },
  { ip: '27.109.13.', isp: 'GTPL Hathway', city: 'Delhi', state: 'Delhi', pincode: '110092', area: 'Dwarka' },
  
  // Karnataka - Bangalore, Mysore, Mangalore, Hubli
  { ip: '152.58.96.', isp: 'BSNL Karnataka', city: 'Bangalore', state: 'Karnataka', pincode: '560001', area: 'MG Road' },
  { ip: '122.161.49.', isp: 'ACT Fibernet', city: 'Bangalore', state: 'Karnataka', pincode: '560025', area: 'Koramangala' },
  { ip: '103.76.253.', isp: 'Atria Convergence Technologies', city: 'Mysore', state: 'Karnataka', pincode: '570001', area: 'Sayyaji Rao Road' },
  { ip: '45.118.132.', isp: 'Tata Play Fiber', city: 'Mangalore', state: 'Karnataka', pincode: '575001', area: 'Hampankatta' },
  { ip: '103.99.177.', isp: 'Bharti Airtel Fiber', city: 'Hubli', state: 'Karnataka', pincode: '580020', area: 'Vidyanagar' },
  
  // Tamil Nadu - Chennai, Coimbatore, Madurai, Salem
  { ip: '49.43.84.', isp: 'Bharti Airtel Ltd', city: 'Chennai', state: 'Tamil Nadu', pincode: '600001', area: 'T. Nagar' },
  { ip: '103.195.185.', isp: 'Siti Cable Network', city: 'Chennai', state: 'Tamil Nadu', pincode: '600034', area: 'Adyar' },
  { ip: '45.248.77.', isp: 'Railtel Corporation of India', city: 'Coimbatore', state: 'Tamil Nadu', pincode: '641001', area: 'RS Puram' },
  { ip: '117.241.35.', isp: 'BSNL Tamil Nadu', city: 'Madurai', state: 'Tamil Nadu', pincode: '625001', area: 'Anna Nagar' },
  { ip: '14.142.112.', isp: 'Jio Fiber', city: 'Salem', state: 'Tamil Nadu', pincode: '636001', area: 'Fairlands' },
  
  // Telangana & Andhra Pradesh - Hyderabad, Visakhapatnam, Vijayawada
  { ip: '115.242.174.', isp: 'Vi (Vodafone Idea)', city: 'Hyderabad', state: 'Telangana', pincode: '500001', area: 'Abids' },
  { ip: '203.192.228.', isp: 'GTPL Hathway Ltd', city: 'Hyderabad', state: 'Telangana', pincode: '500081', area: 'Gachibowli' },
  { ip: '117.239.195.', isp: 'Reliance Jio Infocomm', city: 'Visakhapatnam', state: 'Andhra Pradesh', pincode: '530001', area: 'Dwaraka Nagar' },
  { ip: '27.5.102.', isp: 'Airtel Fiber', city: 'Vijayawada', state: 'Andhra Pradesh', pincode: '520001', area: 'Governorpet' },
  
  // West Bengal - Kolkata, Durgapur, Siliguri
  { ip: '122.161.49.', isp: 'Alliance Broadband Services', city: 'Kolkata', state: 'West Bengal', pincode: '700001', area: 'Park Street' },
  { ip: '103.76.253.', isp: 'Wishnet Pvt Ltd', city: 'Kolkata', state: 'West Bengal', pincode: '700091', area: 'Salt Lake' },
  { ip: '157.119.188.', isp: 'Cal Broadband Networks', city: 'Durgapur', state: 'West Bengal', pincode: '713201', area: 'City Center' },
  { ip: '182.74.200.', isp: 'BSNL West Bengal', city: 'Siliguri', state: 'West Bengal', pincode: '734001', area: 'Hill Cart Road' },
  
  // Gujarat - Ahmedabad, Surat, Vadodara, Rajkot
  { ip: '49.43.84.', isp: 'Tikona Digital Networks', city: 'Ahmedabad', state: 'Gujarat', pincode: '380001', area: 'Navrangpura' },
  { ip: '103.21.58.', isp: 'Gujarat Telelink Pvt Ltd', city: 'Surat', state: 'Gujarat', pincode: '395001', area: 'Nanpura' },
  { ip: '203.122.58.', isp: 'Bharti Airtel Ltd', city: 'Vadodara', state: 'Gujarat', pincode: '390001', area: 'Alkapuri' },
  { ip: '115.99.248.', isp: 'Jio Fiber', city: 'Rajkot', state: 'Gujarat', pincode: '360001', area: 'Race Course' },
  
  // Rajasthan - Jaipur, Jodhpur, Udaipur, Kota
  { ip: '103.195.185.', isp: 'Siti Cable Network', city: 'Jaipur', state: 'Rajasthan', pincode: '302001', area: 'C Scheme' },
  { ip: '115.242.174.', isp: 'Vi (Vodafone Idea)', city: 'Jodhpur', state: 'Rajasthan', pincode: '342001', area: 'Sardarpura' },
  { ip: '27.109.14.', isp: 'BSNL Rajasthan', city: 'Udaipur', state: 'Rajasthan', pincode: '313001', area: 'Fateh Sagar' },
  { ip: '14.140.137.', isp: 'Airtel Fiber', city: 'Kota', state: 'Rajasthan', pincode: '324001', area: 'Vigyan Nagar' },
  
  // Kerala - Kochi, Thiruvananthapuram, Kozhikode, Thrissur
  { ip: '45.248.77.', isp: 'Asianet Broadband', city: 'Kochi', state: 'Kerala', pincode: '682001', area: 'Marine Drive' },
  { ip: '103.87.169.', isp: 'BSNL Kerala', city: 'Thiruvananthapuram', state: 'Kerala', pincode: '695001', area: 'Palayam' },
  { ip: '122.164.253.', isp: 'Asianet Cable Vision', city: 'Kozhikode', state: 'Kerala', pincode: '673001', area: 'Mavoor Road' },
  { ip: '117.241.8.', isp: 'Jio Fiber', city: 'Thrissur', state: 'Kerala', pincode: '680001', area: 'Round South' },
  
  // Punjab - Ludhiana, Amritsar, Jalandhar, Patiala
  { ip: '182.71.146.', isp: 'Connect Broadband', city: 'Ludhiana', state: 'Punjab', pincode: '141001', area: 'Model Town' },
  { ip: '203.109.137.', isp: 'Netplus Broadband', city: 'Amritsar', state: 'Punjab', pincode: '143001', area: 'Lawrence Road' },
  { ip: '115.186.128.', isp: 'BSNL Punjab', city: 'Jalandhar', state: 'Punjab', pincode: '144001', area: 'Civil Lines' },
  { ip: '49.15.193.', isp: 'Airtel Broadband', city: 'Patiala', state: 'Punjab', pincode: '147001', area: 'Leela Bhawan' },
  
  // Odisha - Bhubaneswar, Cuttack, Berhampur
  { ip: '157.119.188.', isp: 'Alliance Broadband Services', city: 'Bhubaneswar', state: 'Odisha', pincode: '751001', area: 'Saheed Nagar' },
  { ip: '103.76.253.', isp: 'BSNL Odisha', city: 'Cuttack', state: 'Odisha', pincode: '753001', area: 'Buxi Bazaar' },
  { ip: '27.109.115.', isp: 'Jio Fiber', city: 'Berhampur', state: 'Odisha', pincode: '760001', area: 'Brahmapur' },
  
  // Madhya Pradesh - Indore, Bhopal, Jabalpur, Gwalior
  { ip: '203.109.137.', isp: 'You Broadband India', city: 'Indore', state: 'Madhya Pradesh', pincode: '452001', area: 'Vijay Nagar' },
  { ip: '49.43.84.', isp: 'Bharti Airtel Ltd', city: 'Bhopal', state: 'Madhya Pradesh', pincode: '462001', area: 'MP Nagar' },
  { ip: '14.140.156.', isp: 'BSNL MP', city: 'Jabalpur', state: 'Madhya Pradesh', pincode: '482001', area: 'Wright Town' },
  { ip: '115.240.113.', isp: 'Jio Fiber', city: 'Gwalior', state: 'Madhya Pradesh', pincode: '474001', area: 'Lashkar' },
  
  // Uttar Pradesh - Lucknow, Kanpur, Agra, Varanasi, Meerut
  { ip: '117.239.195.', isp: 'Reliance Jio Infocomm', city: 'Lucknow', state: 'Uttar Pradesh', pincode: '226001', area: 'Hazratganj' },
  { ip: '115.242.174.', isp: 'Vi (Vodafone Idea)', city: 'Kanpur', state: 'Uttar Pradesh', pincode: '208001', area: 'The Mall' },
  { ip: '14.139.198.', isp: 'BSNL UP West', city: 'Agra', state: 'Uttar Pradesh', pincode: '282001', area: 'Sadar Bazaar' },
  { ip: '49.15.241.', isp: 'Airtel Fiber', city: 'Varanasi', state: 'Uttar Pradesh', pincode: '221001', area: 'Cantonment' },
  { ip: '182.68.144.', isp: 'Jio Fiber', city: 'Meerut', state: 'Uttar Pradesh', pincode: '250001', area: 'Sadar Bazar' },
  
  // Bihar - Patna, Gaya, Bhagalpur
  { ip: '152.58.96.', isp: 'BSNL Bihar', city: 'Patna', state: 'Bihar', pincode: '800001', area: 'Boring Road' },
  { ip: '103.213.241.', isp: 'Jio Fiber', city: 'Gaya', state: 'Bihar', pincode: '823001', area: 'Ramna Road' },
  { ip: '27.109.14.', isp: 'Airtel Broadband', city: 'Bhagalpur', state: 'Bihar', pincode: '812001', area: 'Sultanganj Road' },
  
  // Assam - Guwahati, Dibrugarh, Silchar
  { ip: '45.248.77.', isp: 'Railtel Corporation', city: 'Guwahati', state: 'Assam', pincode: '781001', area: 'Fancy Bazaar' },
  { ip: '103.89.136.', isp: 'BSNL Assam', city: 'Dibrugarh', state: 'Assam', pincode: '786001', area: 'Graham Bazaar' },
  { ip: '14.142.128.', isp: 'Jio Fiber', city: 'Silchar', state: 'Assam', pincode: '788001', area: 'Rangirkhari' },
  
  // Jharkhand - Ranchi, Jamshedpur, Dhanbad
  { ip: '115.242.174.', isp: 'Vi (Vodafone Idea)', city: 'Ranchi', state: 'Jharkhand', pincode: '834001', area: 'Main Road' },
  { ip: '122.252.252.', isp: 'BSNL Jharkhand', city: 'Jamshedpur', state: 'Jharkhand', pincode: '831001', area: 'Bistupur' },
  { ip: '49.15.67.', isp: 'Airtel Fiber', city: 'Dhanbad', state: 'Jharkhand', pincode: '826001', area: 'Bank More' },
  
  // Chhattisgarh - Raipur, Bhilai, Bilaspur
  { ip: '103.21.58.', isp: 'Syscon Infoway Pvt Ltd', city: 'Raipur', state: 'Chhattisgarh', pincode: '492001', area: 'Civil Lines' },
  { ip: '14.140.189.', isp: 'BSNL Chhattisgarh', city: 'Bhilai', state: 'Chhattisgarh', pincode: '490001', area: 'Sector 1' },
  { ip: '115.240.35.', isp: 'Jio Fiber', city: 'Bilaspur', state: 'Chhattisgarh', pincode: '495001', area: 'Link Road' },
  
  // Uttarakhand - Dehradun, Haridwar, Nainital
  { ip: '103.21.58.', isp: 'Syscon Infoway Pvt Ltd', city: 'Dehradun', state: 'Uttarakhand', pincode: '248001', area: 'Rajpur Road' },
  { ip: '27.109.14.', isp: 'BSNL Uttarakhand', city: 'Haridwar', state: 'Uttarakhand', pincode: '249401', area: 'Railway Road' },
  { ip: '49.15.193.', isp: 'Airtel Broadband', city: 'Nainital', state: 'Uttarakhand', pincode: '263001', area: 'Mallital' },
  
  // Union Territories and other states
  { ip: '115.242.174.', isp: 'Vi (Vodafone Idea)', city: 'Chandigarh', state: 'Chandigarh', pincode: '160001', area: 'Sector 17' },
  { ip: '103.89.136.', isp: 'BSNL Himachal', city: 'Shimla', state: 'Himachal Pradesh', pincode: '171001', area: 'The Mall' },
  { ip: '14.142.128.', isp: 'Jio Fiber', city: 'Jammu', state: 'Jammu and Kashmir', pincode: '180001', area: 'Gandhi Nagar' },
  { ip: '122.252.252.', isp: 'BSNL J&K', city: 'Srinagar', state: 'Jammu and Kashmir', pincode: '190001', area: 'Lal Chowk' },
  { ip: '103.213.241.', isp: 'Jio Fiber', city: 'Panaji', state: 'Goa', pincode: '403001', area: 'Miramar' },
  { ip: '27.109.115.', isp: 'BSNL Goa', city: 'Margao', state: 'Goa', pincode: '403601', area: 'Fatorda' },
  { ip: '49.15.67.', isp: 'Airtel Fiber', city: 'Puducherry', state: 'Puducherry', pincode: '605001', area: 'MG Road' }
];

// Function to generate realistic Indian IP address and location data
// Returns complete geolocation information including ISP details and specific area information
function generateIndianIPData() {
  const ipData = indianIPData[Math.floor(Math.random() * indianIPData.length)];
  const lastOctet = Math.floor(Math.random() * 254) + 1; // Generate last IP octet (1-254)
  const fullIP = ipData.ip + lastOctet;
  
  return {
    ip: fullIP,
    isp: ipData.isp,
    city: ipData.city,
    state: ipData.state,
    pincode: ipData.pincode,
    area: ipData.area,
    country: 'India',
    countryCode: 'IN',
    latitude: getRandomCoordinatesForCity(ipData.city).lat,
    longitude: getRandomCoordinatesForCity(ipData.city).lng
  };
}

// Get random coordinates for Indian cities with slight variations for authenticity
function getRandomCoordinatesForCity(cityName) {
  const indianCoordinates = {
    'Mumbai': { lat: 19.0760, lng: 72.8777 },
    'New Delhi': { lat: 28.7041, lng: 77.1025 },
    'Bangalore': { lat: 12.9716, lng: 77.5946 },
    'Chennai': { lat: 13.0827, lng: 80.2707 },
    'Pune': { lat: 18.5204, lng: 73.8567 },
    'Hyderabad': { lat: 17.3850, lng: 78.4867 },
    'Kolkata': { lat: 22.5726, lng: 88.3639 },
    'Ahmedabad': { lat: 23.0225, lng: 72.5714 },
    'Gurgaon': { lat: 28.4595, lng: 77.0266 },
    'Noida': { lat: 28.5355, lng: 77.3910 },
    'Surat': { lat: 21.1702, lng: 72.8311 },
    'Jaipur': { lat: 26.9124, lng: 75.7873 },
    'Lucknow': { lat: 26.8467, lng: 80.9462 },
    'Kanpur': { lat: 26.4499, lng: 80.3319 },
    'Nagpur': { lat: 21.1458, lng: 79.0882 },
    'Indore': { lat: 22.7196, lng: 75.8577 },
    'Bhopal': { lat: 23.2599, lng: 77.4126 },
    'Visakhapatnam': { lat: 17.6868, lng: 83.2185 },
    'Patna': { lat: 25.5941, lng: 85.1376 },
    'Vadodara': { lat: 22.3072, lng: 73.1812 },
    'Ludhiana': { lat: 30.9009, lng: 75.8573 },
    'Agra': { lat: 27.1767, lng: 78.0081 },
    'Nashik': { lat: 19.9975, lng: 73.7898 },
    'Faridabad': { lat: 28.4089, lng: 77.3178 },
    'Meerut': { lat: 28.9845, lng: 77.7064 },
    'Rajkot': { lat: 22.3039, lng: 70.8022 },
    'Kalyan-Dombivali': { lat: 19.2403, lng: 73.1305 },
    'Vasai-Virar': { lat: 19.4914, lng: 72.8054 },
    'Varanasi': { lat: 25.3176, lng: 82.9739 },
    'Srinagar': { lat: 34.0837, lng: 74.7973 },
    'Aurangabad': { lat: 19.8762, lng: 75.3433 },
    'Dhanbad': { lat: 23.7957, lng: 86.4304 },
    'Amritsar': { lat: 31.6340, lng: 74.8723 },
    'Navi Mumbai': { lat: 19.0330, lng: 73.0297 },
    'Allahabad': { lat: 25.4358, lng: 81.8463 },
    'Ranchi': { lat: 23.3441, lng: 85.3096 },
    'Howrah': { lat: 22.5958, lng: 88.2636 },
    'Coimbatore': { lat: 11.0168, lng: 76.9558 },
    'Jabalpur': { lat: 23.1815, lng: 79.9864 },
    'Gwalior': { lat: 26.2183, lng: 78.1828 },
    'Vijayawada': { lat: 16.5062, lng: 80.6480 },
    'Jodhpur': { lat: 26.2389, lng: 73.0243 },
    'Madurai': { lat: 9.9252, lng: 78.1198 },
    'Raipur': { lat: 21.2514, lng: 81.6296 },
    'Kota': { lat: 25.2138, lng: 75.8648 },
    'Chandigarh': { lat: 30.7333, lng: 76.7794 },
    'Guwahati': { lat: 26.1445, lng: 91.7362 },
    'Solapur': { lat: 17.6599, lng: 75.9064 },
    'Hubli': { lat: 15.3647, lng: 75.1240 },
    'Bareilly': { lat: 28.3670, lng: 79.4304 },
    'Moradabad': { lat: 28.8386, lng: 78.7733 },
    'Mysore': { lat: 12.2958, lng: 76.6394 },
    'Gurgaon': { lat: 28.4595, lng: 77.0266 },
    'Aligarh': { lat: 27.8974, lng: 78.0880 },
    'Jalandhar': { lat: 31.3260, lng: 75.5762 },
    'Tiruchirappalli': { lat: 10.7905, lng: 78.7047 },
    'Bhubaneswar': { lat: 20.2961, lng: 85.8245 },
    'Salem': { lat: 11.6643, lng: 78.1460 },
    'Mira-Bhayandar': { lat: 19.2952, lng: 72.8544 },
    'Warangal': { lat: 17.9689, lng: 79.5941 },
    'Thiruvananthapuram': { lat: 8.5241, lng: 76.9366 },
    'Guntur': { lat: 16.3067, lng: 80.4365 },
    'Bhiwandi': { lat: 19.3002, lng: 73.0637 },
    'Saharanpur': { lat: 29.9680, lng: 77.5552 },
    'Gorakhpur': { lat: 26.7606, lng: 83.3732 },
    'Bikaner': { lat: 28.0229, lng: 73.3119 },
    'Amravati': { lat: 20.9374, lng: 77.7796 },
    'Noida': { lat: 28.5355, lng: 77.3910 },
    'Jamshedpur': { lat: 22.8046, lng: 86.2029 },
    'Bhilai Nagar': { lat: 21.1938, lng: 81.3509 },
    'Cuttack': { lat: 20.4625, lng: 85.8828 },
    'Firozabad': { lat: 27.1592, lng: 78.3957 },
    'Kochi': { lat: 9.9312, lng: 76.2673 },
    'Bhavnagar': { lat: 21.7645, lng: 72.1519 },
    'Dehradun': { lat: 30.3165, lng: 78.0322 },
    'Durgapur': { lat: 23.4803, lng: 87.3119 },
    'Asansol': { lat: 23.6739, lng: 86.9924 },
    'Nanded': { lat: 19.1383, lng: 77.2975 },
    'Kolhapur': { lat: 16.7050, lng: 74.2433 },
    'Ajmer': { lat: 26.4499, lng: 74.6399 },
    'Akola': { lat: 20.7002, lng: 77.0082 },
    'Gulbarga': { lat: 17.3297, lng: 76.8343 },
    'Jamnagar': { lat: 22.4707, lng: 70.0577 },
    'Ujjain': { lat: 23.1765, lng: 75.7885 },
    'Loni': { lat: 28.7333, lng: 77.2833 },
    'Siliguri': { lat: 26.7271, lng: 88.3953 },
    'Jhansi': { lat: 25.4484, lng: 78.5685 },
    'Ulhasnagar': { lat: 19.2183, lng: 73.1535 },
    'Jammu': { lat: 32.7266, lng: 74.8570 },
    'Sangli-Miraj': { lat: 16.8524, lng: 74.5815 },
    'Mangalore': { lat: 12.9141, lng: 74.8560 },
    'Erode': { lat: 11.3410, lng: 77.7172 },
    'Belgaum': { lat: 15.8497, lng: 74.4977 },
    'Ambattur': { lat: 13.1143, lng: 80.1548 },
    'Tirunelveli': { lat: 8.7139, lng: 77.7567 },
    'Malegaon': { lat: 20.5579, lng: 74.5287 },
    'Gaya': { lat: 24.7914, lng: 85.0002 },
    'Jalgaon': { lat: 21.0077, lng: 75.5626 },
    'Udaipur': { lat: 24.5854, lng: 73.7125 },
    'Maheshtala': { lat: 22.4983, lng: 88.2483 }
  };
  
  const coords = indianCoordinates[cityName] || indianCoordinates['Mumbai'];
  
  // Add slight random variation to coordinates for authenticity (within ~1km radius)
  return {
    lat: coords.lat + (Math.random() - 0.5) * 0.01,
    lng: coords.lng + (Math.random() - 0.5) * 0.01
  };
}

/**
 * Generate fake account details with authentic Indian names and email patterns
 * Creates realistic user profiles with Indian first/last names, email addresses, and metadata
 * Includes user ID, session ID, timestamp, fingerprint, birth year, and account age
 * 
 * @returns {Object} Account details object with name, email, userId, sessionId, timestamp, fingerprint, birthYear, accountAge
 */
function generateAccountDetails() {
  const indianFirstNames = [
    // Male names
    'Rajesh', 'Amit', 'Vikram', 'Arjun', 'Rohit', 'Sanjay', 'Ravi', 'Kiran', 'Suresh', 'Manish',
    'Anil', 'Gaurav', 'Ramesh', 'Ashok', 'Nikhil', 'Mohan', 'Vinod', 'Harsh', 'Sunil', 'Arun',
    'Prakash', 'Manoj', 'Jatin', 'Praveen', 'Deepak', 'Anupam', 'Vivek', 'Sachin', 'Ajay', 'Akash',
    'Vishal', 'Sandeep', 'Rakesh', 'Devesh', 'Hemant', 'Lalit', 'Mukesh', 'Naveen', 'Pankaj', 'Rajeev',
    'Satish', 'Tarun', 'Umesh', 'Varun', 'Yash', 'Abhishek', 'Aditya', 'Aman', 'Ankit', 'Anurag',
    // Female names
    'Priya', 'Sunita', 'Kavya', 'Meera', 'Anjali', 'Pooja', 'Neha', 'Deepika', 'Shreya', 'Rina',
    'Sita', 'Divya', 'Nisha', 'Preeti', 'Swati', 'Rekha', 'Sapna', 'Rachna', 'Vaishali', 'Sushma',
    'Vandana', 'Seema', 'Shilpa', 'Madhuri', 'Anita', 'Alka', 'Archana', 'Bharti', 'Chitra', 'Deepti',
    'Geeta', 'Hemlata', 'Indira', 'Jyoti', 'Kalpana', 'Lalita', 'Mamta', 'Nidhi', 'Pallavi', 'Radha',
    'Sarita', 'Tanvi', 'Usha', 'Vidya', 'Yamini', 'Aarti', 'Bindu', 'Chhaya', 'Disha', 'Ekta'
  ];
  
  const indianLastNames = [
    // North Indian surnames
    'Sharma', 'Gupta', 'Singh', 'Kumar', 'Agarwal', 'Jain', 'Bansal', 'Chopra', 'Malhotra', 'Kapoor',
    'Verma', 'Mittal', 'Goel', 'Joshi', 'Saxena', 'Srivastava', 'Tiwari', 'Pandey', 'Yadav', 'Mishra',
    'Aggarwal', 'Bhardwaj', 'Chandra', 'Dutta', 'Thakur', 'Bhatia', 'Khanna', 'Sethi', 'Arora', 'Bajaj',
    'Chawla', 'Dhawan', 'Goyal', 'Khurana', 'Mahajan', 'Oberoi', 'Sachdeva', 'Tandon', 'Vohra', 'Wadhwa',
    // South Indian surnames
    'Nair', 'Reddy', 'Rao', 'Iyer', 'Menon', 'Krishnan', 'Raman', 'Subramanian', 'Venkatesh', 'Murthy',
    'Naidu', 'Pillai', 'Varma', 'Sastry', 'Bhat', 'Shenoy', 'Kamath', 'Kulkarni', 'Joshi', 'Deshpande',
    // West Indian surnames  
    'Patel', 'Shah', 'Desai', 'Modi', 'Trivedi', 'Mehta', 'Pandya', 'Parikh', 'Vora', 'Bhatt',
    'Gandhi', 'Joshi', 'Raval', 'Sheth', 'Thakkar', 'Vasani', 'Zaveri', 'Chokshi', 'Dalal', 'Kothari',
    // East Indian surnames
    'Ghosh', 'Chatterjee', 'Mukherjee', 'Banerjee', 'Das', 'Sen', 'Bose', 'Roy', 'Saha', 'Dey',
    'Chakraborty', 'Bhattacharya', 'Mitra', 'Ganguly', 'Sarkar', 'Paul', 'Biswas', 'Chowdhury', 'Mazumdar', 'Pal'
  ];
  
  const domains = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'rediffmail.com', 'yahoo.co.in',
    'protonmail.com', 'yandex.com', 'zoho.com', 'icloud.com', 'live.com', 'msn.com',
    'aol.com', 'mail.com', 'gmx.com', 'fastmail.com', 'tutanota.com', 'guerrillamail.com'
  ];
  
  // Simplified user generation
  const firstName = indianFirstNames[Math.floor(Math.random() * indianFirstNames.length)];
  const lastName = indianLastNames[Math.floor(Math.random() * indianLastNames.length)];
  const domain = 'gmail.com'; // Use single domain to avoid issues
  
  // Simple email format
  const randomNum = Math.floor(Math.random() * 999) + 1;
  const email = `${firstName.toLowerCase()}${randomNum}@${domain}`;
  
  return {
    name: `${firstName} ${lastName}`,
    email: email,
    userId: Math.floor(Math.random() * 9000) + 1000, // 4-digit user ID
    sessionId: Math.random().toString(36).substring(2, 8), // Shorter session ID
    timestamp: new Date().toISOString()
  };
}

/**
 * Get random element from array
 * Utility function to select a random item from any array
 * 
 * @param {Array} array - Array to select from
 * @returns {*} Random element from the array
 */
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Setup page with random fingerprint and Indian geolocation
 * Configures Puppeteer page with realistic browser fingerprinting, Indian IP geolocation,
 * network conditions, and device characteristics to simulate authentic user sessions
 * 
 * @param {Object} page - Puppeteer page object
 * @returns {Object} Fingerprint configuration with userAgent, resolution, timezone, language, ipData, connectionInfo, locationTier
 */
async function setupPageFingerprint(page) {
  const userAgent = getRandomElement(userAgents);
  const resolution = getRandomElement(resolutions);
  const timezone = getRandomElement(timezones);
  const language = getRandomElement(languages);
  const ipData = generateIndianIPData();
  const locationTier = getLocationTier(ipData.city);
  const connectionInfo = getRandomConnectionType(locationTier);
  
  // Set user agent
  await page.setUserAgent(userAgent);
  
  // Set viewport
  await page.setViewport(resolution);
  
  // Set extra headers with Indian geolocation hints and realistic browser headers
  await page.setExtraHTTPHeaders({
    'Accept-Language': language,
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'DNT': Math.random() > 0.5 ? '1' : '0',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'X-Forwarded-For': ipData.ip,
    'X-Real-IP': ipData.ip,
    'CF-Connecting-IP': ipData.ip,
    'X-Client-IP': ipData.ip,
    'X-Original-Forwarded-For': ipData.ip
  });
  
  // Override timezone and other properties including geolocation and connection info
  await page.evaluateOnNewDocument((tz, ipInfo, connInfo) => {
    // Override timezone
    Object.defineProperty(Intl.DateTimeFormat.prototype, 'resolvedOptions', {
      value: function() {
        return { 
          timeZone: tz,
          locale: 'en-IN',
          calendar: 'gregory',
          numberingSystem: 'latn'
        };
      }
    });
    
    // Override Date timezone
    const originalDate = Date;
    Date = class extends originalDate {
      constructor(...args) {
        super(...args);
      }
      
      getTimezoneOffset() {
        return -330; // India Standard Time offset (UTC+5:30)
      }
      
      toString() {
        return super.toString().replace(/GMT.*/, 'GMT+0530 (India Standard Time)');
      }
    };
    
    // Mock geolocation to accurate Indian coordinates
    Object.defineProperty(navigator, 'geolocation', {
      value: {
        getCurrentPosition: function(success, error, options) {
          setTimeout(() => {
            success({
              coords: {
                latitude: ipInfo.latitude,
                longitude: ipInfo.longitude,
                accuracy: Math.random() * 50 + 20, // 20-70 meters accuracy
                altitude: Math.random() * 100 + 10,
                altitudeAccuracy: Math.random() * 20 + 5,
                heading: Math.random() * 360,
                speed: Math.random() * 2 // Stationary to slow movement
              },
              timestamp: Date.now()
            });
          }, Math.random() * 1000 + 100); // Realistic GPS delay
        },
        watchPosition: function(success, error, options) {
          return this.getCurrentPosition(success, error, options);
        },
        clearWatch: function(id) {}
      }
    });
    
    // Enhanced navigator properties for better fingerprinting
    Object.defineProperty(navigator, 'hardwareConcurrency', { 
      value: Math.floor(Math.random() * 8) + 2 // 2-10 cores
    });
    Object.defineProperty(navigator, 'deviceMemory', { 
      value: [1, 2, 4, 8, 16][Math.floor(Math.random() * 5)] // Realistic RAM values
    });
    Object.defineProperty(navigator, 'maxTouchPoints', {
      value: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 
        Math.floor(Math.random() * 5) + 5 : 0 // Mobile: 5-10 touch points, Desktop: 0
    });
    
    // Add realistic connection information
    if (navigator.connection || navigator.mozConnection || navigator.webkitConnection) {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      Object.defineProperty(connection, 'effectiveType', { 
        value: connInfo.effectiveType,
        writable: false
      });
      Object.defineProperty(connection, 'downlink', { 
        value: connInfo.downlink + (Math.random() - 0.5) * 2, // Add some variance
        writable: false
      });
      Object.defineProperty(connection, 'rtt', { 
        value: connInfo.rtt + Math.floor((Math.random() - 0.5) * 20), // Add some variance
        writable: false
      });
      Object.defineProperty(connection, 'type', {
        value: connInfo.type,
        writable: false
      });
    }
    
    // Randomize screen properties to match viewport
    Object.defineProperty(screen, 'width', { value: window.screen.width });
    Object.defineProperty(screen, 'height', { value: window.screen.height });
    Object.defineProperty(screen, 'availWidth', { value: window.innerWidth });
    Object.defineProperty(screen, 'availHeight', { value: window.innerHeight });
    Object.defineProperty(screen, 'colorDepth', { value: 24 });
    Object.defineProperty(screen, 'pixelDepth', { value: 24 });
    
    // Add WebGL fingerprint randomization
    const originalGetParameter = WebGLRenderingContext.prototype.getParameter;
    WebGLRenderingContext.prototype.getParameter = function(parameter) {
      if (parameter === 37445) { // UNMASKED_VENDOR_WEBGL
        const vendors = ['Intel Inc.', 'NVIDIA Corporation', 'AMD', 'Qualcomm', 'ARM'];
        return vendors[Math.floor(Math.random() * vendors.length)];
      }
      if (parameter === 37446) { // UNMASKED_RENDERER_WEBGL
        const renderers = [
          'Intel Iris OpenGL Engine',
          'NVIDIA GeForce GTX 1060',
          'AMD Radeon RX 580',
          'Adreno (TM) 530',
          'Mali-G76 MP12'
        ];
        return renderers[Math.floor(Math.random() * renderers.length)];
      }
      return originalGetParameter.call(this, parameter);
    };
    
    // Add canvas fingerprint randomization with more subtle noise
    const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
    HTMLCanvasElement.prototype.toDataURL = function(...args) {
      const context = this.getContext('2d');
      if (context) {
        // Add very subtle noise that doesn't affect visual appearance
        const noise = (Math.random() - 0.5) * 0.0001;
        const imageData = context.getImageData(0, 0, 1, 1);
        if (imageData.data.length > 0) {
          imageData.data[0] = Math.min(255, Math.max(0, imageData.data[0] + noise * 255));
          context.putImageData(imageData, 0, 0);
        }
      }
      return originalToDataURL.apply(this, args);
    };
    
    // Override performance.now() for timing fingerprint randomization
    const originalNow = performance.now;
    performance.now = function() {
      return originalNow.call(this) + (Math.random() - 0.5) * 0.1;
    };
    
  }, timezone, ipData, connectionInfo);
  
  return { 
    userAgent, 
    resolution, 
    timezone, 
    language, 
    ipData, 
    connectionInfo,
    locationTier
  };
}

/**
 * Enhanced function for single browser window automation
 * Creates one browser window per click with unique fingerprints
 * Each window runs independently with realistic user behavior simulation
 * Optimized for Windows with proper response waiting and delays
 * 
 * @param {string} url - Target URL to visit
 * @param {number} numberOfClicks - Number of clicks to perform
 * @returns {Object} Results object with completedClicks and totalDuration
 */
async function openEnhancedTabs(url, numberOfClicks) {
  const scriptStart = Date.now();
  let completedClicks = 0;
  
  console.log(`[INFO] Starting enhanced automation for: ${url}`);
  console.log(`[INFO] Target clicks: ${numberOfClicks}, One window per click\n`);

  /**
   * Worker function for individual click processing
   * Each click gets its own dedicated browser window
   * Waits for complete response loading with 30-second delay after response
   * 
   * @param {number} clickIndex - Index of the current click being processed
   * @returns {Promise<void>} Promise that resolves when click processing is complete
   */
  async function createClickWorker(clickIndex) {
    const clickStart = Date.now();
    let browser = null;
    let page = null;
    
    try {
      // Generate account details for this session
      const accountDetails = generateAccountDetails();
      
      console.log(`\n[SESSION] Click ${clickIndex + 1} - Account: ${accountDetails.name}`);
      console.log(`[EMAIL] ${accountDetails.email}`);
      console.log(`[IDENTITY] User ID: ${accountDetails.userId}, Session: ${accountDetails.sessionId}`);
      
      // Launch dedicated browser window for this click
      browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu-sandbox',
          '--disable-software-rasterizer',
          '--window-size=1920,1080',
          '--no-first-run',
          '--disable-popup-blocking',
          '--disable-background-timer-throttling',
          '--disable-backgrounding-occluded-windows',
          '--disable-renderer-backgrounding',
          '--disable-features=TranslateUI',
          '--disable-ipc-flooding-protection',
          '--max_old_space_size=4096'
        ],
        timeout: 60000,
        protocolTimeout: 60000
      });

      page = await browser.newPage();
      
      console.log(`[WINDOW] New browser window opened for click ${clickIndex + 1}`);
      console.log(`[USER] Account: ${accountDetails.name} (${accountDetails.email})`);
      
      // Navigate to the URL and wait for complete load
      console.log(`[NAVIGATION] Accessing target URL...`);
      await page.goto(url, { 
        waitUntil: "domcontentloaded",
        timeout: 60000
      });
      
      console.log(`[SUCCESS] Click ${clickIndex + 1} page loaded successfully!`);
      
      // Wait for page to be fully interactive - reduced for faster execution
      console.log(`[WAITING] Waiting for page elements to load...`);
      await delay(3600); // Reduced from 10000 to 5000
      
      // Check page content
      const pageTitle = await page.title();
      const pageUrl = await page.url();
      console.log(`[PAGE] Title: ${pageTitle}`);
      console.log(`[PAGE] URL: ${pageUrl}`);
      
      // Look for and interact with the prompt submission elements
      console.log(`[INTERACTION] Looking for page elements...`);
      
      try {
        // Wait for the page elements to load with increased timeout
        await page.waitForSelector('body', { timeout: 20000 });
        
        // Analyze page content
        const pageContent = await page.evaluate(() => {
          return {
            title: document.title,
            bodyText: document.body.innerText.substring(0, 500),
            hasForm: !!document.querySelector('form'),
            hasInput: !!document.querySelector('input'),
            hasTextarea: !!document.querySelector('textarea'),
            hasButton: !!document.querySelector('button'),
            allButtons: Array.from(document.querySelectorAll('button')).map(btn => btn.textContent?.trim()),
            allInputs: Array.from(document.querySelectorAll('input')).map(inp => inp.type + ':' + inp.placeholder)
          };
        });
        
        console.log(`[DEBUG] Page analysis:`, JSON.stringify(pageContent, null, 2));
        
        // Look for submission elements with enhanced send button detection
        const submitSelectors = [
          'button[type="submit"]',
          'input[type="submit"]', 
          'button:contains("Send")',
          'button:contains("Submit")',
          'button:contains("Ask")',
          'button:contains("Go")',
          'button:contains("Enter")',
          '.send-btn',
          '.submit-btn',
          '#send',
          '#submit',
          '#send-btn',
          'button', // Try any button as fallback
        ];
        
        let submitted = false;
        
        // Enhanced send button detection and clicking
        for (const selector of submitSelectors) {
          try {
            if (selector.includes('contains')) {
              // Handle text-based selectors
              const buttons = await page.$$('button');
              for (const button of buttons) {
                const text = await button.evaluate(el => el.textContent?.trim().toLowerCase() || '');
                const searchText = selector.match(/contains\("([^"]+)"\)/)?.[1].toLowerCase();
                
                if (text.includes(searchText || '')) {
                  console.log(`[SEND_BUTTON] Found send button with text: "${text}"`);
                  
                  // Scroll button into view if needed
                  await button.evaluate(el => el.scrollIntoView({ behavior: 'smooth', block: 'center' }));
                  await delay(1000);
                  
                  // Click the send button
                  await button.click();
                  console.log(`[SEND_BUTTON] ✅ Successfully clicked send button!`);
                  submitted = true;
                  break;
                }
              }
            } else {
              // Handle CSS selectors
              const elements = await page.$$(selector);
              if (elements.length > 0) {
                console.log(`[SEND_BUTTON] Found ${elements.length} element(s) matching: ${selector}`);
                
                for (const element of elements) {
                  try {
                    // Get button text for logging
                    const buttonText = await element.evaluate(el => el.textContent?.trim() || el.value || 'Unknown');
                    console.log(`[SEND_BUTTON] Attempting to click button: "${buttonText}"`);
                    
                    // Scroll into view
                    await element.evaluate(el => el.scrollIntoView({ behavior: 'smooth', block: 'center' }));
                    await delay(1000);
                    
                    // Click the button
                    await element.click();
                    console.log(`[SEND_BUTTON] ✅ Successfully clicked: "${buttonText}"`);
                    submitted = true;
                    break;
                  } catch (clickError) {
                    console.log(`[SEND_BUTTON] ⚠️ Failed to click element: ${clickError.message}`);
                    continue;
                  }
                }
              }
            }
            if (submitted) break;
          } catch (err) {
            console.log(`[SEND_BUTTON] ⚠️ Error with selector ${selector}: ${err.message}`);
            continue;
          }
        }
        
        // Additional fallback: try to find any clickable element that might be a send button
        if (!submitted) {
          try {
            console.log(`[SEND_BUTTON] Primary selectors failed, trying fallback methods...`);
            
            // Look for elements with send-related attributes or classes
            const fallbackSelectors = [
              '[onclick*="send"]',
              '[onclick*="submit"]',
              '[class*="send"]',
              '[class*="submit"]',
              '[id*="send"]',
              '[id*="submit"]',
              'input[type="button"]',
              '[role="button"]'
            ];
            
            for (const fallbackSelector of fallbackSelectors) {
              const fallbackElements = await page.$$(fallbackSelector);
              if (fallbackElements.length > 0) {
                console.log(`[SEND_BUTTON] Found ${fallbackElements.length} fallback element(s): ${fallbackSelector}`);
                
                for (const element of fallbackElements) {
                  try {
                    const elementInfo = await element.evaluate(el => ({
                      tagName: el.tagName,
                      className: el.className,
                      id: el.id,
                      text: el.textContent?.trim() || el.value || '',
                      onclick: el.onclick ? 'has onclick' : 'no onclick'
                    }));
                    
                    console.log(`[SEND_BUTTON] Trying fallback element:`, elementInfo);
                    
                    await element.evaluate(el => el.scrollIntoView({ behavior: 'smooth', block: 'center' }));
                    await delay(1000);
                    await element.click();
                    
                    console.log(`[SEND_BUTTON] ✅ Successfully clicked fallback element!`);
                    submitted = true;
                    break;
                  } catch (clickError) {
                    console.log(`[SEND_BUTTON] ⚠️ Fallback click failed: ${clickError.message}`);
                    continue;
                  }
                }
                if (submitted) break;
              }
            }
          } catch (fallbackError) {
            console.log(`[SEND_BUTTON] ⚠️ Fallback method error: ${fallbackError.message}`);
          }
        }
        
        // Final fallback: try any clickable element
        if (!submitted) {
          try {
            console.log(`[SEND_BUTTON] All methods failed, trying any clickable element...`);
            const anyClickable = await page.$$('button, input[type="button"], input[type="submit"], [onclick], [role="button"]');
            
            if (anyClickable.length > 0) {
              console.log(`[SEND_BUTTON] Found ${anyClickable.length} potentially clickable elements`);
              
              // Try the first few clickable elements
              for (let i = 0; i < Math.min(3, anyClickable.length); i++) {
                try {
                  const element = anyClickable[i];
                  const elementText = await element.evaluate(el => 
                    el.textContent?.trim() || el.value || el.tagName || 'Unknown'
                  );
                  
                  console.log(`[SEND_BUTTON] Trying clickable element ${i + 1}: "${elementText}"`);
                  
                  await element.evaluate(el => el.scrollIntoView({ behavior: 'smooth', block: 'center' }));
                  await delay(1000);
                  await element.click();
                  
                  console.log(`[SEND_BUTTON] ✅ Successfully clicked: "${elementText}"`);
                  submitted = true;
                  break;
                } catch (anyClickError) {
                  console.log(`[SEND_BUTTON] ⚠️ Any-click failed: ${anyClickError.message}`);
                  continue;
                }
              }
            }
          } catch (anyClickError) {
            console.log(`[SEND_BUTTON] ⚠️ Any-click method error: ${anyClickError.message}`);
          }
        }
        
        if (submitted) {
          console.log(`[GEMINI] ✅ Send button clicked successfully! Waiting for response...`);
          
          // Wait for initial response (15 seconds) - reduced for faster execution
          console.log(`[GEMINI] Phase 1: Waiting for response to load (15 seconds)...`);
          await delay(15000);
          
          // Check for content changes
          const afterClickContent = await page.evaluate(() => document.body.innerText);
          if (afterClickContent.length > pageContent.bodyText.length + 100) {
            console.log(`[GEMINI] ✅ Response detected! Content changed significantly.`);
            console.log(`[GEMINI] Content length: ${pageContent.bodyText.length} → ${afterClickContent.length} (+${afterClickContent.length - pageContent.bodyText.length} chars)`);
          } else {
            console.log(`[GEMINI] ⚠️ No significant content change detected yet, continuing to wait...`);
          }
          
          // Additional wait to ensure complete response loading (20 seconds) - reduced
          console.log(`[GEMINI] Phase 2: Ensuring complete response loading (20 seconds)...`);
          await delay(20000); // Reduced from 30000 to 20000
          
          // Final content check
          const finalContent = await page.evaluate(() => document.body.innerText);
          console.log(`[GEMINI] ✅ Complete response loading finished. Total wait: 35 seconds`);
          console.log(`[GEMINI] Final content length: ${finalContent.length} characters`);
          
          // Try to detect if response is still loading
          const isLoading = await page.evaluate(() => {
            return document.querySelector('.loading, .spinner, [class*="load"], [class*="wait"]') !== null;
          });
          
          if (isLoading) {
            console.log(`[GEMINI] ⚠️ Loading indicator still present, waiting additional 10 seconds...`);
            await delay(10000); // Reduced from 15000 to 10000
            console.log(`[GEMINI] ✅ Additional wait completed.`);
          }
          
        } else {
          console.log(`[WARNING] ❌ No send button found! Using reduced fallback delay...`);
          console.log(`[WARNING] Available page elements were not clickable or missing expected buttons`);
          await delay(25000); // Reduced from 40000 to 25000
        }
        
      } catch (error) {
        console.log(`[ERROR] Interaction error: ${error.message}`);
        // Reduced fallback delay
        await delay(25000); // Reduced from 40000 to 25000
      }
      
      console.log(`[INTERACTION] Page interaction completed for click ${clickIndex + 1}`);
      
      const clickEnd = Date.now();
      const clickDuration = ((clickEnd - clickStart) / 1000).toFixed(2);
      const interactionDelay = clickEnd - clickStart;
      const sessionStartTime = new Date(clickStart).toISOString();
      const sessionEndTime = new Date(clickEnd).toISOString();
      
      console.log(`[COMPLETE] Click ${clickIndex + 1} completed in ${clickDuration}s`);
      console.log(`[TRACKING] Engagement recorded for ${accountDetails.name}`);
      
      // Prepare click data for CSV report
      const clickData = {
        tabNumber: clickIndex + 1,
        username: accountDetails.name,
        email: accountDetails.email,
        userId: accountDetails.userId,
        sessionId: accountDetails.sessionId,
        url: url,
        sessionStartTime: sessionStartTime,
        sessionEndTime: sessionEndTime,
        timeTaken: parseFloat(clickDuration),
        interactionDuration: (interactionDelay / 1000).toFixed(2)
      };
      
      // Increment click counter (always returns true now)
      await incrementClickCounter(clickData);
      
      completedClicks++;
      
      // Random delay after each click to prevent "check internet connection" errors
      const randomDelay = Math.floor(Math.random() * (60000 - 20000 + 1)) + 20000; // 20-60 seconds (reduced)
      const delayMinutes = (randomDelay / 60000).toFixed(1);
      console.log(`[ANTI_RATE_LIMIT] Random delay: ${delayMinutes} minutes (${randomDelay / 1000}s) to prevent rate limiting...`);
      console.log(`[ANTI_RATE_LIMIT] This prevents Gemini "check internet connection" errors`);
      
      await delay(randomDelay);
      console.log(`[ANTI_RATE_LIMIT] ✅ Random delay completed, ready for next action`);
      
      // Close browser window after successful completion and delay
      console.log(`[CLEANUP] Closing browser window for click ${clickIndex + 1}\n`);
      
    } catch (error) {
      console.error(`[ERROR] Click ${clickIndex + 1} failed: ${error.message}`);
    } finally {
      if (page) await page.close().catch(() => {});
      if (browser) await browser.close().catch(() => {});
    }
  }

  // Process clicks one by one (each gets its own window)
  for (let i = 0; i < numberOfClicks; i++) {
    console.log(`\n[PROCESS] Starting click ${i + 1}/${numberOfClicks}`);
    await createClickWorker(i);
    
    // Note: Random delay is handled inside createClickWorker after each successful click
    // No additional delay needed here as it's already built into the click process
  }

  const scriptEnd = Date.now();
  const totalDuration = ((scriptEnd - scriptStart) / 1000).toFixed(2);
  
  console.log(`\n[SUMMARY] Batch completed for ${url}!`);
  console.log(`[METRICS] Success rate: ${completedClicks}/${numberOfClicks} (${((completedClicks/numberOfClicks)*100).toFixed(1)}%)`);
  console.log(`[TIMING] Total runtime: ${totalDuration} seconds (~${(totalDuration / 60).toFixed(2)} minutes)\n`);
  
  return { completedClicks, totalDuration };
}

/**
 * Main execution function for continuous automation with individual browser windows
 * Orchestrates the entire automation process with 5 clicks per batch
 * Each click gets its own dedicated browser window for maximum isolation
 * Script runs continuously without auto-exit
 * 
 * @returns {Promise<void>} Promise that resolves when manually stopped
 */
async function runEnhancedAutomation() {
  const urls = [
    "https://aiskillshouse.com/student/qr-mediator.html?uid=50&promptId=17",
    "https://aiskillshouse.com/student/qr-mediator.html?uid=50&promptId=13", 
    "https://aiskillshouse.com/student/qr-mediator.html?uid=50&promptId=14",
    "https://aiskillshouse.com/student/qr-mediator.html?uid=50&promptId=16",
    "https://aiskillshouse.com/student/qr-mediator.html?uid=50&promptId=15",
    "https://aiskillshouse.com/student/qr-mediator.html?uid=4620&promptId=17",
    "https://aiskillshouse.com/student/qr-mediator.html?uid=4620&promptId=16",
    "https://aiskillshouse.com/student/qr-mediator.html?uid=4620&promptId=15",
    "https://aiskillshouse.com/student/qr-mediator.html?uid=4620&promptId=14",
    "https://aiskillshouse.com/student/qr-mediator.html?uid=4620&promptId=13"
  ];
  
  const clicksPerBatch = 10; // 10 clicks per batch (one per URL)
  
  console.log("[SYSTEM] Starting Continuous Individual Window Automation");
  console.log("=".repeat(70));
  console.log(`[CONFIG] URLs to process: ${urls.length}`);
  console.log(`[CONFIG] Clicks per batch: ${clicksPerBatch}`);
  console.log(`[CONFIG] Windows: 1 dedicated window per click`);
  console.log(`[CONFIG] Delay after every 10 clicks: 30 seconds`);
  console.log(`[CONFIG] Random delay after each click: 20-60 seconds (prevents rate limiting)`);
  console.log(`[CONFIG] Response wait time: 15s + 20s = 35s total`);
  console.log(`[CONFIG] Script runs continuously (no auto-exit)`);
  console.log(`[PERFORMANCE] 🖥️ Windows optimized - One window per click!`);
  console.log(`[TIMING] ⚡ Reduced delays for faster execution + anti-rate-limit`);
  console.log(`[ANTI_RATE_LIMIT] 🛡️ Random delays prevent Gemini "check internet connection" errors`);
  console.log("=".repeat(70) + "\n");
  
  const globalStart = Date.now();
  let batchCount = 1;
  
  // Continue running indefinitely until manually stopped
  while (true) {
    console.log(`\n[BATCH] Starting batch ${batchCount} - Current total clicks: ${globalClickCounter}`);
    
      // Process each URL in the batch (5 clicks total per batch)
      for (let urlIndex = 0; urlIndex < urls.length; urlIndex++) {
        const url = urls[urlIndex];
        
        console.log(`\n[PROCESS] Batch ${batchCount} - Processing URL ${urlIndex + 1}/${urls.length}`);
        console.log(`[URL] ${url}`);
        
        // Process 1 click for this URL (each click gets its own window)
        // Random delay is automatically handled inside openEnhancedTabs after each click
        await openEnhancedTabs(url, 1);
        
        // Note: No additional delay needed here as random delay (30-120s) is built into each click
      }    console.log(`\n[BATCH_COMPLETE] Batch ${batchCount} finished - Total clicks so far: ${globalClickCounter}`);
    console.log(`[RATE_LIMITING] Each click includes 20-60 second random delay to prevent Gemini rate limits`);
    console.log(`[BATCH_INFO] Next 30-second break will occur after ${10 - (globalClickCounter % 10)} more clicks`);
    
    batchCount++;
    
    // Minimal delay before next batch since random delays are built into each click
    console.log(`[BATCH] Preparing for batch ${batchCount}...`);
    await delay(2000); // Reduced since we have random delays after each click
  }
}

// Start the enhanced automation system
runEnhancedAutomation().catch(console.error);