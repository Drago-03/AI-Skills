#!/usr/bin/env node

/**
 * VM System Demonstration Script
 * Shows how the virtual machine system generates different identities every 5 clicks
 */

// Import the VM generation functions (simplified for demo)
function generateMacAddress() {
  const vendorPrefixes = [
    '00:50:56', // VMware
    '08:00:27', // VirtualBox
    '52:54:00', // QEMU
    '00:15:5d', // Hyper-V
    '00:1c:42'  // Parallels
  ];
  
  const prefix = vendorPrefixes[Math.floor(Math.random() * vendorPrefixes.length)];
  const suffix = Array.from({length: 3}, () => 
    Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
  ).join(':');
  
  return `${prefix}:${suffix}`.toLowerCase();
}

function generateHardwareProfile() {
  const cpuBrands = ['Intel', 'AMD'];
  const intelCpus = ['Intel Core i7-10700K', 'Intel Core i5-9600K', 'Intel Core i7-8700K'];
  const amdCpus = ['AMD Ryzen 7 3700X', 'AMD Ryzen 5 3600', 'AMD Ryzen 9 3900X'];
  
  const cpuBrand = cpuBrands[Math.floor(Math.random() * cpuBrands.length)];
  const cpu = cpuBrand === 'Intel' ? 
    intelCpus[Math.floor(Math.random() * intelCpus.length)] :
    amdCpus[Math.floor(Math.random() * amdCpus.length)];
    
  const ramSizes = [8, 16, 32, 64];
  const ram = ramSizes[Math.floor(Math.random() * ramSizes.length)];
  
  const gpus = ['NVIDIA GeForce RTX 3070', 'AMD Radeon RX 580', 'Intel UHD Graphics 630'];
  const gpu = gpus[Math.floor(Math.random() * gpus.length)];
  
  return { cpu, ram: `${ram}GB DDR4`, gpu };
}

function generateSystemProfile() {
  const osList = ['Windows 10 Pro', 'Windows 11 Pro', 'Windows 10 Home'];
  const os = osList[Math.floor(Math.random() * osList.length)];
  const computerName = `PC-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
  
  return { os, computerName };
}

// Simulate VM system behavior
console.log('🖥️  Virtual Machine System Demonstration');
console.log('=========================================\n');

let vmClickCounter = 0;
let currentVmId = 1;

for (let click = 1; click <= 12; click++) {
  vmClickCounter++;
  
  // Check for VM rotation (every 5 clicks)
  if (vmClickCounter > 5) {
    currentVmId++;
    vmClickCounter = 1;
    console.log(`\n🔄 VM ROTATION! Switching to Virtual Machine ${currentVmId}\n`);
  }
  
  // Generate new identity at start of VM cycle
  if (vmClickCounter === 1) {
    const macAddress = generateMacAddress();
    const hardware = generateHardwareProfile();
    const system = generateSystemProfile();
    
    console.log(`┌─ Virtual Machine ${currentVmId} Identity:`);
    console.log(`├─ MAC Address: ${macAddress}`);
    console.log(`├─ OS: ${system.os}`);
    console.log(`├─ Computer: ${system.computerName}`);
    console.log(`├─ CPU: ${hardware.cpu}`);
    console.log(`├─ RAM: ${hardware.ram}`);
    console.log(`└─ GPU: ${hardware.gpu}\n`);
  }
  
  console.log(`Click ${click}: VM ${currentVmId} (${vmClickCounter}/5) - Same identity maintained`);
}

console.log('\n📊 Summary:');
console.log(`- Total clicks simulated: 12`);
console.log(`- VM rotations: 2 (after clicks 5 and 10)`);
console.log(`- Different system identities: 3`);
console.log(`- Each VM maintains consistent identity for 5 clicks`);
console.log(`- MAC address and hardware profile changes at each rotation`);

console.log('\n✅ VM System Demonstration Complete!');
console.log('This is how the real system prevents detection by rotating virtual machine identities.');