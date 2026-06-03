const visitTotal = document.querySelector("#visit-total");
const visitCountries = document.querySelector("#visit-countries");

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

function renderVisitStats(stats) {
  if (!visitTotal || !visitCountries || !stats) return;
  const totalVisits = Number(stats.totalVisits || 0);
  visitTotal.textContent = `${totalVisits.toLocaleString()} ${totalVisits === 1 ? "visit" : "visits"} counted`;

  if (!stats.topCountries?.length) {
    visitCountries.textContent = "Country insights will appear as people visit the site.";
    return;
  }

  const countriesText = stats.topCountries
    .map((item) => `${item.name || "World"} ${Number(item.count || 0).toLocaleString()}`)
    .join(" · ");
  visitCountries.textContent = `Top countries: ${countriesText}`;
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
