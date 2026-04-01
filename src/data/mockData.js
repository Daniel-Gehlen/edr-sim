export const MITRE_TECHNIQUES = {
  'T1059.001': { name: 'PowerShell', tactic: 'Execution', description: 'Execution of malicious PowerShell commands.' },
  'T1566.001': { name: 'Phishing: Spearphishing Attachment', tactic: 'Initial Access', description: 'Malicious attachments sent via email.' },
  'T1040': { name: 'Network Sniffing', tactic: 'Discovery', description: 'Monitoring network traffic to retrieve information.' },
  'T1057': { name: 'Process Discovery', tactic: 'Discovery', description: 'Listing running processes to find targets.' },
  'T1070.004': { name: 'File Deletion', tactic: 'Defense Evasion', description: 'Deleting logs or files to hide activity.' },
  'T1486': { name: 'Data Encrypted for Impact', tactic: 'Impact', description: 'Ransomware encrypting user data.' },
  'T1134': { name: 'Access Token Manipulation', tactic: 'Privilege Escalation', description: 'Modifying security tokens to gain higher access.' },
  'T1003': { name: 'OS Credential Dumping', tactic: 'Credential Access', description: 'Dumping LSASS or shadow copy for credentials.' },
  'T1543.003': { name: 'Windows Service', tactic: 'Persistence', description: 'Creating or modifying system services.' },
};

export const INITIAL_ENDPOINTS = [
  { id: 'ep-01', hostname: 'DESKTOP-FIN-01', ip: '192.168.1.15', os: 'Windows 10', status: 'online', agentVersion: '8.2.1', lastCheckIn: new Date().toISOString(), protectionStatus: 'Active', health: 'Healthy' },
  { id: 'ep-02', hostname: 'SRV-WEB-PROD', ip: '10.0.0.45', os: 'Ubuntu 22.04', status: 'online', agentVersion: '8.1.5', lastCheckIn: new Date().toISOString(), protectionStatus: 'Active', health: 'Healthy' },
  { id: 'ep-03', hostname: 'WKST-DEV-JOAO', ip: '192.168.1.102', os: 'macOS Ventura', status: 'offline', agentVersion: '7.9.0', lastCheckIn: new Date(Date.now() - 3600000 * 2).toISOString(), protectionStatus: 'Disabled', health: 'At Risk' },
  { id: 'ep-04', hostname: 'DESKTOP-EXEC-02', ip: '192.168.1.22', os: 'Windows 11', status: 'online', agentVersion: '8.2.1', lastCheckIn: new Date().toISOString(), protectionStatus: 'Active', health: 'Healthy' },
  { id: 'ep-05', hostname: 'SRV-DB-SQL', ip: '10.0.0.12', os: 'Windows Server 2022', status: 'problem', agentVersion: '8.0.0', lastCheckIn: new Date().toISOString(), protectionStatus: 'Active', health: 'Warning' },
  // ... more added in a loop later or defined here
];

// Helper to generate more endpoints
for (let i = 6; i <= 25; i++) {
  INITIAL_ENDPOINTS.push({
    id: `ep-${i.toString().padStart(2, '0')}`,
    hostname: `NODE-${i > 15 ? 'SRV' : 'PC'}-${i}`,
    ip: `192.168.1.${100 + i}`,
    os: i % 3 === 0 ? 'Ubuntu 20.04' : i % 5 === 0 ? 'macOS Monterey' : 'Windows 10',
    status: Math.random() > 0.1 ? 'online' : 'offline',
    agentVersion: i % 10 === 0 ? '8.0.0' : '8.2.1',
    lastCheckIn: new Date().toISOString(),
    protectionStatus: Math.random() > 0.05 ? 'Active' : 'Disabled',
    health: Math.random() > 0.1 ? 'Healthy' : 'At Risk'
  });
}

export const INITIAL_ALERTS = [
  { id: 'al-01', endpointId: 'ep-01', severity: 'critical', techniqueId: 'T1486', status: 'new', timestamp: new Date().toISOString(), description: 'Ransomware behavior detected: large scale file encryption attempt.' },
  { id: 'al-02', endpointId: 'ep-02', severity: 'high', techniqueId: 'T1059.001', status: 'investigating', timestamp: new Date(Date.now() - 1800000).toISOString(), description: 'Suspicious PowerShell commands executed by web-server user.' },
  { id: 'al-03', endpointId: 'ep-05', severity: 'medium', techniqueId: 'T1040', status: 'new', timestamp: new Date(Date.now() - 3600000).toISOString(), description: 'Network sniffing tool detected (tcpdump) on database server.' },
  { id: 'al-04', endpointId: 'ep-04', severity: 'low', techniqueId: 'T1566.001', status: 'closed', timestamp: new Date(Date.now() - 86400000).toISOString(), description: 'Phishing attachment blocked by NGAV.' },
];

// Helper to generate 50+ alerts
const techniques = Object.keys(MITRE_TECHNIQUES);
const severities = ['critical', 'high', 'medium', 'low'];
const statuses = ['new', 'investigating', 'contained', 'closed'];

for (let i = 5; i <= 60; i++) {
  const severity = severities[Math.floor(Math.random() ** 2 * severities.length)]; // Skew towards lower severity
  INITIAL_ALERTS.push({
    id: `al-${i.toString().padStart(2, '0')}`,
    endpointId: `ep-${Math.floor(Math.random() * 25) + 1}`.replace('ep-', 'ep-').padStart(5, '0').replace('00', '0'), // Fix padding
    severity: severity,
    techniqueId: techniques[Math.floor(Math.random() * techniques.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    timestamp: new Date(Date.now() - Math.random() * 172800000).toISOString(), // Last 48h
    description: `Automated detection of suspicious activity on matching pattern #${i}.`
  });
}

// Ensure endpoint IDs match correctly in helper
INITIAL_ALERTS.forEach(a => {
    if (!INITIAL_ENDPOINTS.find(e => e.id === a.endpointId)) {
        a.endpointId = 'ep-01'; // Fallback
    }
});
