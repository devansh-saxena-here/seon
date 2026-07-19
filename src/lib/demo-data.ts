export const buildings = [
  { id: "a", name: "Building A — HQ", usage: 245, devices: 42, rooms: 12, status: "Optimal" },
  { id: "b", name: "Building B — R&D", usage: 198, devices: 36, rooms: 9, status: "Optimal" },
  { id: "c", name: "Building C — Ops", usage: 276, devices: 51, rooms: 15, status: "High Load" },
];

export const rooms = [
  { id: 1, name: "Conference Room 3F", building: "Building A", devices: 6, usage: 32.4, status: "Active" },
  { id: 2, name: "R&D Lab", building: "Building B", devices: 14, usage: 68.1, status: "Active" },
  { id: 3, name: "Executive Office", building: "Building A", devices: 4, usage: 12.9, status: "Idle" },
  { id: 4, name: "Reception", building: "Building A", devices: 3, usage: 4.2, status: "Active" },
  { id: 5, name: "Library", building: "Building C", devices: 8, usage: 18.7, status: "Active" },
  { id: 6, name: "Server Room", building: "Building B", devices: 12, usage: 92.3, status: "Critical" },
];

export const devices = [
  { id: 1, name: "AC Unit 01", type: "AC", room: "Conference Room 3F", usage: 14.2, on: true },
  { id: 2, name: "Ceiling Lights", type: "Lights", room: "Conference Room 3F", usage: 3.1, on: true },
  { id: 3, name: "Projector", type: "Projector", room: "Conference Room 3F", usage: 1.4, on: false },
  { id: 4, name: "Server Rack A", type: "Computer", room: "Server Room", usage: 42.6, on: true },
  { id: 5, name: "Workstation 12", type: "Computer", room: "R&D Lab", usage: 2.8, on: true },
  { id: 6, name: "Office Printer", type: "Printer", room: "Executive Office", usage: 0.6, on: false },
  { id: 7, name: "Ceiling Fan", type: "Fan", room: "Reception", usage: 0.4, on: true },
  { id: 8, name: "AC Unit 07", type: "AC", room: "R&D Lab", usage: 16.9, on: true },
];

export const weeklyUsage = [
  { day: "Mon", kwh: 612, target: 700 },
  { day: "Tue", kwh: 588, target: 700 },
  { day: "Wed", kwh: 704, target: 700 },
  { day: "Thu", kwh: 649, target: 700 },
  { day: "Fri", kwh: 731, target: 700 },
  { day: "Sat", kwh: 402, target: 500 },
  { day: "Sun", kwh: 318, target: 500 },
];

export const hourlyToday = Array.from({ length: 24 }, (_, h) => ({
  hour: `${h.toString().padStart(2, "0")}:00`,
  kwh: Math.round(30 + Math.sin((h - 6) / 24 * Math.PI * 2) * 22 + ((h * 37) % 8)),
}));

export const monthlyUsage = [
  { m: "Jan", kwh: 18420, co2: 8.6 },
  { m: "Feb", kwh: 17210, co2: 8.0 },
  { m: "Mar", kwh: 19110, co2: 8.9 },
  { m: "Apr", kwh: 20340, co2: 9.5 },
  { m: "May", kwh: 21980, co2: 10.3 },
  { m: "Jun", kwh: 23120, co2: 10.8 },
  { m: "Jul", kwh: 24500, co2: 11.4 },
  { m: "Aug", kwh: 23860, co2: 11.1 },
  { m: "Sep", kwh: 20940, co2: 9.7 },
  { m: "Oct", kwh: 19430, co2: 9.1 },
  { m: "Nov", kwh: 18120, co2: 8.4 },
  { m: "Dec", kwh: 17640, co2: 8.2 },
];

export const distribution = [
  { name: "HVAC", value: 42 },
  { name: "Lighting", value: 18 },
  { name: "Computing", value: 24 },
  { name: "Appliances", value: 10 },
  { name: "Other", value: 6 },
];

export const alerts = [
  { id: 1, level: "high", title: "Peak consumption detected", desc: "Building C exceeded 95% of daily quota at 14:20.", time: "2m ago" },
  { id: 2, level: "medium", title: "AC running after office hours", desc: "R&D Lab AC Unit 07 active past 21:00 for 3 nights.", time: "1h ago" },
  { id: 3, level: "low", title: "Lights left ON", desc: "Reception lighting active in unoccupied period.", time: "3h ago" },
  { id: 4, level: "medium", title: "High usage spike", desc: "Server Room load 18% above baseline.", time: "6h ago" },
];

export const aiSuggestions = [
  { title: "Shift HVAC pre-cooling to off-peak", impact: "~ 8.2% saving", tag: "HVAC" },
  { title: "Auto-dim corridor lights after 20:00", impact: "~ 3.1% saving", tag: "Lighting" },
  { title: "Consolidate idle workstations", impact: "~ 2.4% saving", tag: "Computing" },
  { title: "Schedule server backup at 03:00", impact: "~ 1.6% saving", tag: "Computing" },
];

export const activity = [
  { id: 1, title: "Monthly ESG report generated", time: "Today, 09:12", tag: "Report" },
  { id: 2, title: "AI optimization plan accepted", time: "Yesterday, 17:44", tag: "AI" },
  { id: 3, title: "Building C threshold updated to 300 kWh", time: "Mon, 11:20", tag: "Config" },
  { id: 4, title: "3 devices auto-scheduled to standby", time: "Sun, 22:05", tag: "Automation" },
];

export const esg = {
  environmental: 82,
  energy: 76,
  social: 71,
  governance: 88,
  carbonSaved: 12.4, // tons CO2 / year
  improvement: 14,   // % vs last month
  trees: 512,
};

export const reports = [
  { id: "r-2026-11", title: "November 2026 — Monthly Report", period: "Monthly", date: "2026-11-30", size: "2.3 MB" },
  { id: "r-2026-w46", title: "Week 46 — Weekly Summary", period: "Weekly", date: "2026-11-15", size: "1.1 MB" },
  { id: "r-2026-q3", title: "Q3 2026 — Sustainability Report", period: "Quarterly", date: "2026-09-30", size: "4.8 MB" },
  { id: "r-2025", title: "Annual Energy Review 2025", period: "Annual", date: "2025-12-31", size: "8.2 MB" },
];
