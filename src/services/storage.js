import { INITIAL_ENDPOINTS, INITIAL_ALERTS } from '../data/mockData';

const KEYS = {
  ENDPOINTS: 'edr_sim_endpoints',
  ALERTS: 'edr_sim_alerts',
  INCIDENTS: 'edr_sim_incidents',
  RULES: 'edr_sim_rules',
  SETTINGS: 'edr_sim_settings',
};

const get = (key, initial) => {
  const item = localStorage.getItem(key);
  try {
    return item ? JSON.parse(item) : initial;
  } catch (e) {
    return initial;
  }
};

const set = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const StorageService = {
  getEndpoints: () => get(KEYS.ENDPOINTS, INITIAL_ENDPOINTS),
  setEndpoints: (endpoints) => set(KEYS.ENDPOINTS, endpoints),
  
  getAlerts: () => get(KEYS.ALERTS, INITIAL_ALERTS),
  setAlerts: (alerts) => set(KEYS.ALERTS, alerts),

  getIncidents: () => get(KEYS.INCIDENTS, []),
  setIncidents: (incidents) => set(KEYS.INCIDENTS, incidents),

  getRules: () => get(KEYS.RULES, [
    { id: 'rule-01', name: 'PowerShell Download Cradle', technique: 'T1059.001', severity: 'critical', fpRate: 0.12, status: 'active' },
    { id: 'rule-02', name: 'Mimikatz Detection', technique: 'T1003', severity: 'critical', fpRate: 0.02, status: 'active' },
    { id: 'rule-03', name: 'RDP Brute Force', technique: 'T1110', severity: 'high', fpRate: 0.08, status: 'active' },
    { id: 'rule-04', name: 'Suspicious Log Clearing', technique: 'T1070.004', severity: 'medium', fpRate: 0.15, status: 'active' },
    { id: 'rule-05', name: 'Network Sniffing Behavior', technique: 'T1040', severity: 'medium', fpRate: 0.25, status: 'active' },
  ]),
  setRules: (rules) => set(KEYS.RULES, rules),

  getSettings: () => get(KEYS.SETTINGS, {
    siemEnabled: true,
    soarEnabled: false,
    autoContainment: false,
    theme: 'dark'
  }),
  setSettings: (settings) => set(KEYS.SETTINGS, settings),
};
