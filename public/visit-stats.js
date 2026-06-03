const visitTotal = document.querySelector("#visit-total");
const visitCountries = document.querySelector("#visit-countries");
const visitorStats = document.querySelector("#visitor-stats");
const chartColors = ["#ef4444", "#0f766e", "#2563eb", "#f59e0b", "#7c3aed"];

const visitTimezoneCountries = {
  "America/New_York": "us",
  "America/Detroit": "us",
  "America/Chicago": "us",
  "America/Indiana/Indianapolis": "us",
  "America/Denver": "us",
  "America/Los_Angeles": "us",
  "America/Phoenix": "us",
  "America/Anchorage": "us",
  "Pacific/Honolulu": "us",
  "Asia/Kathmandu": "np",
  "Asia/Kolkata": "in",
  "Europe/London": "gb",
  "Europe/Paris": "fr",
  "Europe/Berlin": "de",
  "Asia/Tokyo": "jp",
  "Asia/Shanghai": "cn",
  "Australia/Sydney": "au"
};

function browserVisitCountryCode() {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (visitTimezoneCountries[timezone]) return visitTimezoneCountries[timezone];
  } catch {}

  const locale = navigator.languages?.[0] || navigator.language || "";
  const match = locale.match(/-([A-Z]{2})$/i);
  return match ? match[1].toLowerCase() : "world";
}

function visitAlreadyCounted() {
  try {
    return sessionStorage.getItem("worldNewsVisitCounted") === "true";
  } catch {
    return false;
  }
}

function markVisitCounted() {
  try {
    sessionStorage.setItem("worldNewsVisitCounted", "true");
  } catch {}
}

function ensureVisitChart() {
  if (!visitorStats) return null;
  let chart = visitorStats.querySelector(".visitor-chart");
  if (chart) return chart;

  chart = document.createElement("div");
  chart.className = "visitor-chart";
  chart.setAttribute("aria-label", "Visitor country chart");
  chart.innerHTML = `
    <div class="visitor-pie" aria-hidden="true">
      <span class="visitor-pie-total">0</span>
      <span>visits</span>
    </div>
    <div class="visitor-legend"></div>
  `;
  visitorStats.insertBefore(chart, visitorStats.querySelector("small"));
  return chart;
}

function renderVisitChart(stats, totalVisits) {
  const chart = ensureVisitChart();
  if (!chart) return;

  const pie = chart.querySelector(".visitor-pie");
  const pieTotal = chart.querySelector(".visitor-pie-total");
  const legend = chart.querySelector(".visitor-legend");
  const countries = stats.topCountries || [];

  pieTotal.textContent = totalVisits.toLocaleString();
  legend.replaceChildren();

  if (!countries.length || totalVisits <= 0) {
    pie.style.background = "conic-gradient(#cbd5e1 0deg 360deg)";
    const empty = document.createElement("span");
    empty.className = "visitor-legend-empty";
    empty.textContent = "Waiting for more visitor data";
    legend.append(empty);
    return;
  }

  let start = 0;
  const segments = countries.map((item, index) => {
    const count = Number(item.count || 0);
    const end = start + (count / totalVisits) * 360;
    const color = chartColors[index % chartColors.length];
    const segment = `${color} ${start.toFixed(2)}deg ${end.toFixed(2)}deg`;
    start = end;
    return segment;
  });

  if (start < 360) {
    segments.push(`#dbe4ea ${start.toFixed(2)}deg 360deg`);
  }
  pie.style.background = `conic-gradient(${segments.join(", ")})`;

  countries.forEach((item, index) => {
    const count = Number(item.count || 0);
    const percent = totalVisits > 0 ? Math.round((count / totalVisits) * 100) : 0;
    const row = document.createElement("div");
    row.className = "visitor-legend-item";

    const swatch = document.createElement("span");
    swatch.className = "visitor-swatch";
    swatch.style.backgroundColor = chartColors[index % chartColors.length];

    const label = document.createElement("span");
    label.textContent = item.name || "World";

    const value = document.createElement("strong");
    value.textContent = `${percent}%`;

    row.append(swatch, label, value);
    legend.append(row);
  });
}

function renderVisitStats(stats) {
  if (!visitTotal || !visitCountries || !stats) return;
  const totalVisits = Number(stats.totalVisits || 0);
  visitTotal.textContent = `${totalVisits.toLocaleString()} ${totalVisits === 1 ? "visit" : "visits"} counted`;

  if (!stats.topCountries?.length) {
    visitCountries.textContent = "Country insights will appear as people visit the site.";
    renderVisitChart(stats, totalVisits);
    return;
  }

  const countriesText = stats.topCountries
    .map((item) => `${item.name || "World"} ${Number(item.count || 0).toLocaleString()}`)
    .join(" | ");
  visitCountries.textContent = `Top countries: ${countriesText}`;
  renderVisitChart(stats, totalVisits);
}

async function updateVisitStats() {
  if (!visitTotal || !visitCountries) return;
  const alreadyCounted = visitAlreadyCounted();
  const method = alreadyCounted ? "GET" : "POST";

  try {
    const response = await fetch("/api/visit", {
      method,
      headers: method === "POST" ? { "Content-Type": "application/json" } : undefined,
      body: method === "POST" ? JSON.stringify({ country: browserVisitCountryCode() }) : undefined
    });
    const stats = await response.json();
    if (!response.ok) throw new Error(stats.error || "Visit stats failed");
    markVisitCounted();
    renderVisitStats(stats);
  } catch {
    visitTotal.textContent = "Visit insights unavailable";
    visitCountries.textContent = "We could not load aggregate visitor stats right now.";
  }
}

updateVisitStats();
