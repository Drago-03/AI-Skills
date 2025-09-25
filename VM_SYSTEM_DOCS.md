# Virtual Machine System Documentation

## Overview
This system implements virtual machine rotation every 5 clicks to simulate different systems and prevent detection. Each virtual machine has a complete identity including MAC address, hardware specifications, and system details.

## How It Works

### VM Rotation Cycle
- **Rotation Frequency**: Every 5 clicks
- **VM Counter**: Tracks clicks within current VM (0-4)
- **VM ID**: Increments with each rotation
- **Identity Change**: Complete system identity changes at rotation

### System Identity Components

#### MAC Address
- **Vendor Prefixes**: VMware, VirtualBox, QEMU, Hyper-V, Parallels
- **Format**: XX:XX:XX:XX:XX:XX
- **Example**: `00:50:56:94:27:3e` (VMware)

#### Hardware Profile
- **CPU**: Intel Core i5/i7 or AMD Ryzen series
- **RAM**: 8GB, 16GB, 32GB, or 64GB DDR4
- **GPU**: NVIDIA GeForce, AMD Radeon, or Intel integrated
- **Storage**: 256GB-2TB SSD/HDD/NVMe
- **Motherboard**: ASUS, MSI, Gigabyte, ASRock brands

#### System Information
- **OS**: Windows 10/11 Pro/Home/Enterprise
- **Computer Name**: PC-XXXXXXXX format
- **Architecture**: x64 or x86
- **Processor ID**: 16-character hex string
- **Chrome Version**: Recent stable versions

#### BIOS Information
- **Manufacturer**: American Megatrends, Phoenix, Insyde
- **Version**: Realistic version numbers
- **Release Date**: Recent dates with variation

## Logging System

### Comprehensive JSON Log
**File**: `comprehensive-automation-log.json`

**Structure**:
```json
{
  "timestamp": "ISO date",
  "clickDetails": {
    "clickNumber": 1,
    "vmId": 1,
    "vmClickNumber": 1,
    "url": "target URL"
  },
  "systemIdentity": {
    "vmId": "VM-12345678-ABCD",
    "macAddress": "00:50:56:94:27:3e",
    "operatingSystem": "Windows 11 Pro",
    "computerName": "PC-ABCD1234"
  },
  "hardwareProfile": {
    "cpu": "Intel Core i7-10700K",
    "ram": "16GB DDR4",
    "gpu": "NVIDIA GeForce RTX 3070"
  },
  "adminInfo": {
    "tokenId": "token_12345_abcd",
    "adminId": "admin_1234"
  }
}
```

### Enhanced CSV Log
**File**: `data.csv`

**Additional Columns**:
- VM ID
- VM Click Number
- MAC Address
- Operating System
- CPU, RAM, GPU
- Chrome Version
- Network Adapter
- Computer Name
- Token ID
- Admin ID

## Console Output
The system provides detailed console logging showing:
- VM rotation notifications
- Current VM status and countdown
- Hardware profile information
- System identity details
- Fingerprint configuration

## Benefits
1. **Detection Avoidance**: Different system identities prevent tracking
2. **Connection Issues**: Varied MAC addresses solve "check internet connection" problems
3. **Realistic Simulation**: Hardware-consistent fingerprints appear authentic
4. **Complete Logging**: All system details captured for analysis
5. **Automated Rotation**: No manual intervention required

## Usage
The system runs automatically with the existing automation script. VM rotation happens transparently every 5 clicks, with full logging of all system changes and activities.