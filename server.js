const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || process.argv[2] || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");
const SITE_NAME = "World Interesting News";
const SITE_DESCRIPTION = "Source-first global news discovery with country, category, language, and publisher filters.";
const SITE_AUTHOR = "World Interesting News Editorial Team";
const SITE_LOGO_PATH = "/logo.svg";
const STATS_FILE = path.join(__dirname, "visit-stats.json");
let latestArticles = [];
let visitStats = loadVisitStats();
let fifaScoreCache = { updatedAt: 0, payload: null };
let fifaTeamCache = { updatedAt: 0, payload: null };
let countryCalendarCache = {};
const FIFA_SCOREBOARD_URL = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard";
const FIFA_STANDINGS_URL = "https://site.web.api.espn.com/apis/v2/sports/soccer/fifa.world/standings?region=us&lang=en&contentorigin=espn";
const HOLIDAY_API_BASE = "https://date.nager.at/api/v3/PublicHolidays";

const publicConfig = {
  googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID || "",
  googleTagManagerId: process.env.GOOGLE_TAG_MANAGER_ID || "",
  googleSearchConsoleVerification: process.env.GOOGLE_SEARCH_CONSOLE_VERIFICATION || "",
  microsoftClarityId: process.env.MICROSOFT_CLARITY_ID || "",
  googleAdsenseClient: process.env.GOOGLE_ADSENSE_CLIENT || "",
  adSlots: {
    homeTop: process.env.AD_SLOT_HOME_TOP || "",
    feedInline: process.env.AD_SLOT_FEED_INLINE || "",
    sidebar: process.env.AD_SLOT_SIDEBAR || "",
    articleInline: process.env.AD_SLOT_ARTICLE_INLINE || "",
    articleSidebar: process.env.AD_SLOT_ARTICLE_SIDEBAR || "",
    footer: process.env.AD_SLOT_FOOTER || ""
  }
};

function loadVisitStats() {
  try {
    const raw = fs.readFileSync(STATS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return {
      totalVisits: Number(parsed.totalVisits) || 0,
      countries: parsed.countries && typeof parsed.countries === "object" ? parsed.countries : {},
      updatedAt: parsed.updatedAt || new Date().toISOString()
    };
  } catch {
    return { totalVisits: 0, countries: {}, updatedAt: new Date().toISOString() };
  }
}

function saveVisitStats() {
  fs.writeFile(STATS_FILE, JSON.stringify(visitStats, null, 2), () => {});
}

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
const countryCodes = [
  "AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR", "AM",
  "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ",
  "BM", "BT", "BO", "BQ", "BA", "BW", "BV", "BR", "IO", "BN", "BG", "BF",
  "BI", "CV", "KH", "CM", "CA", "KY", "CF", "TD", "CL", "CN", "CX", "CC",
  "CO", "KM", "CG", "CD", "CK", "CR", "CI", "HR", "CU", "CW", "CY", "CZ",
  "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "SZ", "ET",
  "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA", "GM", "GE", "DE",
  "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GG", "GN", "GW", "GY",
  "HT", "HM", "VA", "HN", "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE",
  "IM", "IL", "IT", "JM", "JP", "JE", "JO", "KZ", "KE", "KI", "KP", "KR",
  "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO",
  "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT", "MX",
  "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP",
  "NL", "NC", "NZ", "NI", "NE", "NG", "NU", "NF", "MK", "MP", "NO", "OM",
  "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR",
  "QA", "RE", "RO", "RU", "RW", "BL", "SH", "KN", "LC", "MF", "PM", "VC",
  "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SX", "SK", "SI",
  "SB", "SO", "ZA", "GS", "SS", "ES", "LK", "SD", "SR", "SJ", "SE", "CH",
  "SY", "TW", "TJ", "TZ", "TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR",
  "TM", "TC", "TV", "UG", "UA", "AE", "GB", "US", "UM", "UY", "UZ", "VU",
  "VE", "VN", "VG", "VI", "WF", "EH", "YE", "ZM", "ZW", "XK"
];
const countryOverrides = {
  cd: "Democratic Republic of the Congo",
  cg: "Republic of the Congo",
  cz: "Czech Republic",
  gb: "United Kingdom",
  ps: "Palestine",
  tw: "Taiwan",
  us: "United States"
};

const countries = Object.fromEntries(
  countryCodes
    .map((code) => {
      const id = code.toLowerCase();
      const name = countryOverrides[id] || regionNames.of(code);
      return [id, {
        name,
        hl: `en-${code}`,
        gl: code,
        ceid: `${code}:en`,
        flagCode: id,
        defaultQuery: name
      }];
    })
    .sort(([, a], [, b]) => a.name.localeCompare(b.name))
);

function countryCodeFromTimezone() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  const exactMatches = {
    "Asia/Kathmandu": "np",
    "Asia/Katmandu": "np",
    "Asia/Kolkata": "in",
    "Asia/Calcutta": "in",
    "Europe/London": "gb"
  };

  if (exactMatches[timezone]) return exactMatches[timezone];
  if (timezone.startsWith("America/")) return "us";
  if (timezone.startsWith("Canada/")) return "ca";
  if (timezone.startsWith("Australia/")) return "au";
  return "";
}

countries.world = {
  name: "World",
  hl: "en-US",
  gl: "US",
  ceid: "US:en",
  flagCode: "world",
  defaultQuery: "world news"
};

const topics = {
  top: "",
  world: "WORLD",
  business: "BUSINESS",
  technology: "TECHNOLOGY",
  sports: "SPORTS",
  entertainment: "ENTERTAINMENT",
  science: "SCIENCE",
  health: "HEALTH"
};

const categorySearchTerms = {
  top: "",
  world: "world",
  business: "business",
  technology: "technology",
  sports: "sports",
  entertainment: "entertainment",
  science: "science",
  health: "health"
};

const localizedCategorySearchTerms = {
  ne: {
    top: "",
    world: "विश्व",
    business: "अर्थ व्यापार",
    technology: "प्रविधि",
    sports: "खेलकुद",
    entertainment: "मनोरञ्जन",
    science: "विज्ञान",
    health: "स्वास्थ्य"
  },
  hi: {
    top: "",
    world: "दुनिया",
    business: "व्यापार",
    technology: "तकनीक",
    sports: "खेल",
    entertainment: "मनोरंजन",
    science: "विज्ञान",
    health: "स्वास्थ्य"
  }
};

const localizedCountrySearchTerms = {
  ne: {
    np: "नेपाल समाचार",
    world: "विश्व समाचार"
  },
  hi: {
    in: "भारत समाचार",
    np: "नेपाल समाचार",
    world: "दुनिया समाचार"
  }
};

const languages = {
  en: { name: "English", locale: "en-US", gl: "US", ceid: "en", query: "world news" },
  hi: { name: "Hindi", locale: "hi-IN", gl: "IN", ceid: "hi", query: "दुनिया समाचार" },
  ne: { name: "Nepali", locale: "ne-NP", gl: "NP", ceid: "ne", query: "विश्व समाचार" },
  es: { name: "Spanish", locale: "es-419", gl: "US", ceid: "es-419", query: "noticias mundiales" },
  fr: { name: "French", locale: "fr-FR", gl: "FR", ceid: "fr", query: "actualites mondiales" },
  ar: { name: "Arabic", locale: "ar", gl: "AE", ceid: "ar", query: "اخبار العالم" },
  de: { name: "German", locale: "de-DE", gl: "DE", ceid: "de", query: "weltnachrichten" },
  ja: { name: "Japanese", locale: "ja-JP", gl: "JP", ceid: "ja", query: "世界 ニュース" },
  pt: { name: "Portuguese", locale: "pt-BR", gl: "BR", ceid: "pt", query: "noticias do mundo" },
  zh: { name: "Chinese", locale: "zh-CN", gl: "CN", ceid: "zh-Hans", query: "世界 新闻" }
};

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg"
};

const cache = new Map();
const translationCache = new Map();
const imageCache = new Map();

const directFeeds = {
  "world:ne": [
    { name: "BBC Nepali", url: "https://feeds.bbci.co.uk/nepali/rss.xml", sourceUrl: "https://www.bbc.com/nepali" }
  ],
  "np:ne": [
    { name: "OnlineKhabar", url: "https://www.onlinekhabar.com/feed", sourceUrl: "https://www.onlinekhabar.com" },
    { name: "Ratopati", url: "https://www.ratopati.com/feed", sourceUrl: "https://www.ratopati.com" },
    { name: "News of Nepal", url: "https://newsofnepal.com/feed", sourceUrl: "https://newsofnepal.com" }
  ]
};

function buildSearchPhrase(countryKey, country, categoryKey, query, languageKey = "en") {
  const categoryTerm = localizedCategorySearchTerms[languageKey]?.[categoryKey] || categorySearchTerms[categoryKey] || "";
  const countryTerm = localizedCountrySearchTerms[languageKey]?.[countryKey] || country.defaultQuery || country.name;
  const searchParts = query ? [query, countryTerm] : [countryTerm, categoryTerm];
  return searchParts.filter(Boolean).join(" ");
}

function buildSearchUrl(params, phrase) {
  const nextParams = new URLSearchParams(params);
  nextParams.set("q", phrase);
  return `https://news.google.com/rss/search?${nextParams.toString()}`;
}

function newsParamsFor(country, language) {
  return new URLSearchParams({
    hl: language.locale,
    gl: country.gl,
    ceid: `${country.gl}:${language.ceid}`
  });
}

function buildFeedUrls(countryKey, categoryKey, query, languageKey = "en") {
  const country = countries[countryKey] || countries.us;
  const language = languages[languageKey] || languages.en;
  const params = newsParamsFor(country, language);

  if (countryKey === "world") {
    const languageParams = new URLSearchParams({
      hl: language.locale,
      gl: language.gl,
      ceid: `${language.gl}:${language.ceid}`
    });
    const categoryTerm = localizedCategorySearchTerms[languageKey]?.[categoryKey] || categorySearchTerms[categoryKey] || "";
    const phrase = query || [language.query, categoryTerm].filter(Boolean).join(" ");
    return [buildSearchUrl(languageParams, phrase)];
  }

  if (country.defaultQuery) {
    const phrase = buildSearchPhrase(countryKey, country, categoryKey, query, languageKey);
    const fallbackParams = new URLSearchParams({
      hl: language.locale,
      gl: language.gl,
      ceid: `${language.gl}:${language.ceid}`
    });
    return [
      buildSearchUrl(params, phrase),
      buildSearchUrl(fallbackParams, phrase)
    ];
  }

  if (query) {
    params.set("q", query);
    return [`https://news.google.com/rss/search?${params.toString()}`];
  }

  const topic = topics[categoryKey] || topics.top;
  if (!topic) {
    return [`https://news.google.com/rss?${params.toString()}`];
  }

  return [`https://news.google.com/rss/headlines/section/topic/${topic}?${params.toString()}`];
}

function directFeedList(countryKey, languageKey) {
  return directFeeds[`${countryKey}:${languageKey}`] || [];
}

function dedupeArticles(articles) {
  const seen = new Set();
  return articles.filter((article) => {
    const key = article.url || article.title;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

async function fetchGoogleArticles(feedUrls, countryKey, categoryKey, limit) {
  let feedResponse;
  let lastError;

  for (const feedUrl of feedUrls) {
    try {
      feedResponse = await fetch(feedUrl, {
        headers: { "User-Agent": "WorldInterestingNews/1.0" }
      });

      if (feedResponse.ok) {
        break;
      }
      lastError = new Error(`Feed returned ${feedResponse.status}`);
    } catch (error) {
      lastError = error;
    }
  }

  if (!feedResponse || !feedResponse.ok) {
    throw lastError || new Error("Feed request failed");
  }

  const xml = await feedResponse.text();
  return parseRss(xml, countryKey, categoryKey).slice(0, limit);
}

function shouldTranslateText(value, languageKey) {
  if (!value || languageKey === "en") return false;
  if (["ne", "hi", "ar", "ja", "zh"].includes(languageKey)) {
    return /[A-Za-z]{3,}/.test(value);
  }
  return true;
}

async function translateText(value, languageKey) {
  if (!shouldTranslateText(value, languageKey)) return value;

  const cacheKey = `${languageKey}:${value}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  const params = new URLSearchParams({
    client: "gtx",
    sl: "auto",
    tl: languageKey,
    dt: "t",
    q: value
  });

  try {
    const response = await fetch(`https://translate.googleapis.com/translate_a/single?${params.toString()}`, {
      headers: { "User-Agent": "WorldInterestingNews/1.0" }
    });
    if (!response.ok) return value;

    const payload = await response.json();
    const translated = Array.isArray(payload?.[0])
      ? payload[0].map((part) => part?.[0] || "").join("")
      : value;

    const clean = translated.trim() || value;
    translationCache.set(cacheKey, clean);
    return clean;
  } catch {
    return value;
  }
}

async function translateArticles(articles, languageKey) {
  if (languageKey === "en") return articles;

  return Promise.all(articles.map(async (article) => {
    const [title, summary] = await Promise.all([
      translateText(article.title, languageKey),
      translateText(article.summary, languageKey)
    ]);

    return {
      ...article,
      originalTitle: article.title,
      title,
      summary
    };
  }));
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...securityHeaders()
  });
  response.end(JSON.stringify(payload));
}

function securityHeaders() {
  return {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "SAMEORIGIN",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "Cross-Origin-Opener-Policy": "same-origin-allow-popups"
  };
}

function publicBaseUrl(request) {
  const forwardedProto = request.headers["x-forwarded-proto"];
  const protocol = forwardedProto || (request.socket.encrypted ? "https" : "http");
  return `${protocol}://${request.headers.host}`;
}

function xmlEscape(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function htmlEscape(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function slugify(value) {
  return String(value || "story")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "story";
}

function normalizeCountryCode(value) {
  const code = String(value || "").trim().toLowerCase();
  if (/^[a-z]{2}$/.test(code) && countries[code]) return code;
  return "world";
}

function publicVisitStats() {
  const topCountries = Object.entries(visitStats.countries)
    .map(([code, count]) => ({
      code,
      name: countries[code]?.name || "World",
      count
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalVisits: visitStats.totalVisits,
    topCountries,
    updatedAt: visitStats.updatedAt,
    privacy: "Counts are aggregate only. We do not display individual visitor identity."
  };
}

async function handleVisit(request, response) {
  if (request.method === "GET") {
    sendJson(response, 200, publicVisitStats());
    return;
  }

  if (request.method !== "POST") {
    sendJson(response, 405, { error: "Use GET or POST for visit stats." });
    return;
  }

  try {
    const body = await readJsonBody(request);
    const country = normalizeCountryCode(body.country);
    visitStats.totalVisits += 1;
    visitStats.countries[country] = (visitStats.countries[country] || 0) + 1;
    visitStats.updatedAt = new Date().toISOString();
    saveVisitStats();
    sendJson(response, 200, publicVisitStats());
  } catch (error) {
    sendJson(response, 400, { error: error.message });
  }
}

function normalizeFifaEvent(event) {
  const competition = event.competitions?.[0] || {};
  const status = competition.status || event.status || {};
  const statusType = status.type || {};
  const competitors = competition.competitors || [];
  const home = competitors.find((team) => team.homeAway === "home") || competitors[0] || {};
  const away = competitors.find((team) => team.homeAway === "away") || competitors[1] || {};
  const broadcasts = competition.broadcasts?.flatMap((broadcast) => broadcast.names || []) || [];
  const link = event.links?.find((item) => item.rel?.includes("summary"))?.href || event.links?.[0]?.href || "";

  const teamShape = (team) => ({
    name: team.team?.displayName || team.team?.shortDisplayName || "TBD",
    shortName: team.team?.shortDisplayName || team.team?.abbreviation || team.team?.displayName || "TBD",
    abbreviation: team.team?.abbreviation || "",
    logo: team.team?.logo || "",
    score: Number(team.score || 0),
    winner: Boolean(team.winner)
  });

  return {
    id: event.id,
    name: event.name,
    shortName: event.shortName,
    date: event.date,
    status: statusType.state || "pre",
    statusLabel: statusType.shortDetail || statusType.detail || statusType.description || "Scheduled",
    clock: status.displayClock || "",
    stage: competition.altGameNote || event.season?.slug || "",
    completed: Boolean(statusType.completed),
    live: statusType.state === "in",
    venue: competition.venue?.fullName || competition.venue?.displayName || event.venue?.displayName || "",
    broadcasts: [...new Set(broadcasts)].slice(0, 3),
    home: teamShape(home),
    away: teamShape(away),
    link
  };
}

function normalizeFifaCalendar(leagues = []) {
  return leagues
    .flatMap((league) => league.calendar || [])
    .flatMap((calendar) => calendar.entries || [])
    .map((entry) => ({
      label: entry.label || "",
      detail: entry.detail || "",
      value: entry.value || "",
      startDate: entry.startDate || "",
      endDate: entry.endDate || ""
    }))
    .filter((entry) => entry.label);
}

function statValue(stats, names, fallback = 0) {
  const match = (stats || []).find((stat) => names.includes(stat.name) || names.includes(stat.type));
  if (!match) return fallback;
  if (match.displayValue !== undefined && match.displayValue !== "") return match.displayValue;
  return match.value !== undefined ? match.value : fallback;
}

function statNumber(stats, names, fallback = 0) {
  const value = statValue(stats, names, fallback);
  const number = Number(String(value).replace(/^\+/, ""));
  return Number.isFinite(number) ? number : fallback;
}

function normalizeFifaStanding(entry, groupName) {
  const team = entry.team || {};
  const stats = entry.stats || [];
  const logo = team.logos?.find((item) => item.rel?.includes("default"))?.href || team.logos?.[0]?.href || "";
  const link = team.links?.find((item) => item.rel?.includes("team"))?.href || team.links?.[0]?.href || "";

  return {
    id: team.id || team.uid || `${groupName}-${team.abbreviation || team.displayName}`,
    group: groupName,
    rank: statNumber(stats, ["rank"], 0),
    name: team.displayName || team.shortDisplayName || team.name || "TBD",
    shortName: team.shortDisplayName || team.name || team.displayName || "TBD",
    abbreviation: team.abbreviation || "",
    logo,
    link,
    played: statNumber(stats, ["gamesPlayed", "gamesplayed"], 0),
    wins: statNumber(stats, ["wins"], 0),
    draws: statNumber(stats, ["ties"], 0),
    losses: statNumber(stats, ["losses"], 0),
    goalsFor: statNumber(stats, ["pointsFor", "pointsfor"], 0),
    goalsAgainst: statNumber(stats, ["pointsAgainst", "pointsagainst"], 0),
    goalDifference: statValue(stats, ["pointDifferential", "pointdifferential"], 0),
    points: statNumber(stats, ["points"], 0),
    record: statValue(stats, ["overall", "total"], ""),
    note: entry.note?.description || ""
  };
}

async function handleFifaScores(request, response) {
  if (request.method !== "GET") {
    sendJson(response, 405, { error: "Use GET for FIFA scores." });
    return;
  }

  const now = Date.now();
  if (fifaScoreCache.payload && now - fifaScoreCache.updatedAt < 45000) {
    sendJson(response, 200, { ...fifaScoreCache.payload, cached: true });
    return;
  }

  try {
    const scoreResponse = await fetch(FIFA_SCOREBOARD_URL, {
      headers: { "User-Agent": `${SITE_NAME}/1.0` }
    });
    if (!scoreResponse.ok) throw new Error(`Scoreboard responded ${scoreResponse.status}`);
    const scoreboard = await scoreResponse.json();
    const league = scoreboard.leagues?.[0] || {};
    const matches = (scoreboard.events || []).map(normalizeFifaEvent);
    const payload = {
      league: league.season?.displayName || league.name || "FIFA World Cup",
      stageName: league.season?.type?.name || "",
      calendar: normalizeFifaCalendar(scoreboard.leagues || []),
      date: scoreboard.day?.date || new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString(),
      source: "ESPN",
      sourceUrl: "https://www.espn.com/soccer/scoreboard/_/league/fifa.world",
      matches
    };
    fifaScoreCache = { updatedAt: now, payload };
    sendJson(response, 200, payload);
  } catch (error) {
    if (fifaScoreCache.payload) {
      sendJson(response, 200, {
        ...fifaScoreCache.payload,
        cached: true,
        warning: "Showing recent cached scores because live scores are temporarily unavailable."
      });
      return;
    }
    sendJson(response, 502, {
      error: "FIFA scores unavailable",
      detail: error.message,
      matches: [],
      updatedAt: new Date().toISOString()
    });
  }
}

async function handleFifaTeams(request, response) {
  if (request.method !== "GET") {
    sendJson(response, 405, { error: "Use GET for FIFA teams." });
    return;
  }

  const now = Date.now();
  if (fifaTeamCache.payload && now - fifaTeamCache.updatedAt < 10 * 60 * 1000) {
    sendJson(response, 200, { ...fifaTeamCache.payload, cached: true });
    return;
  }

  try {
    const standingsResponse = await fetch(FIFA_STANDINGS_URL, {
      headers: { "User-Agent": `${SITE_NAME}/1.0` }
    });
    if (!standingsResponse.ok) throw new Error(`Standings responded ${standingsResponse.status}`);
    const standings = await standingsResponse.json();
    const groups = (standings.children || [])
      .map((child) => {
        const teams = (child.standings?.entries || [])
          .map((entry) => normalizeFifaStanding(entry, child.name || child.abbreviation || "Group"))
          .sort((a, b) => (a.rank || 99) - (b.rank || 99));
        return {
          id: child.id || child.uid || child.name,
          name: child.name || child.abbreviation || "Group",
          teams
        };
      })
      .filter((group) => group.teams.length);

    const payload = {
      league: standings.name || "FIFA World Cup",
      updatedAt: new Date().toISOString(),
      source: "ESPN",
      sourceUrl: "https://www.espn.com/soccer/standings/_/league/fifa.world",
      totalTeams: groups.reduce((count, group) => count + group.teams.length, 0),
      groups
    };
    fifaTeamCache = { updatedAt: now, payload };
    sendJson(response, 200, payload);
  } catch (error) {
    if (fifaTeamCache.payload) {
      sendJson(response, 200, {
        ...fifaTeamCache.payload,
        cached: true,
        warning: "Showing recent cached teams because live standings are temporarily unavailable."
      });
      return;
    }
    sendJson(response, 502, {
      error: "FIFA team chart unavailable",
      detail: error.message,
      groups: [],
      updatedAt: new Date().toISOString()
    });
  }
}

function calendarDateShape(countryCode) {
  const now = new Date();
  const localIsoDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const locale = countryCode && countryCode !== "world" ? `en-${countryCode.toUpperCase()}` : "en";
  let localDate = now.toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  try {
    localDate = new Intl.DateTimeFormat(locale, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(now);
  } catch {}

  return {
    isoDate: localIsoDate,
    localDate,
    year: now.getFullYear()
  };
}

function normalizeHoliday(item) {
  return {
    date: item.date,
    localName: item.localName || item.name || "Holiday",
    name: item.name || item.localName || "Holiday",
    global: Boolean(item.global),
    types: Array.isArray(item.types) ? item.types : []
  };
}

async function handleCountryCalendar(request, response, url) {
  if (request.method !== "GET") {
    sendJson(response, 405, { error: "Use GET for country calendar." });
    return;
  }

  const country = String(url.searchParams.get("country") || "world").toLowerCase();
  const dateInfo = calendarDateShape(country);

  if (country === "world") {
    sendJson(response, 200, {
      country: "World",
      countryCode: "world",
      ...dateInfo,
      holidays: [],
      source: "Country-specific public holidays appear after selecting a country.",
      updatedAt: new Date().toISOString()
    });
    return;
  }

  const countryInfo = countries[country];
  if (!countryInfo) {
    sendJson(response, 404, { error: "Unknown country", holidays: [], ...dateInfo });
    return;
  }

  const apiCountry = String(countryInfo.flagCode || country).toUpperCase();
  const cacheKey = `${dateInfo.year}-${apiCountry}`;
  const now = Date.now();
  if (countryCalendarCache[cacheKey] && now - countryCalendarCache[cacheKey].updatedAt < 12 * 60 * 60 * 1000) {
    sendJson(response, 200, { ...countryCalendarCache[cacheKey].payload, cached: true });
    return;
  }

  try {
    const holidayResponse = await fetch(`${HOLIDAY_API_BASE}/${dateInfo.year}/${apiCountry}`, {
      headers: { "User-Agent": `${SITE_NAME}/1.0` }
    });
    if (!holidayResponse.ok) throw new Error(`Holiday calendar responded ${holidayResponse.status}`);
    const allHolidays = (await holidayResponse.json())
      .map(normalizeHoliday)
      .sort((a, b) => a.date.localeCompare(b.date));
    const holidays = allHolidays
      .filter((holiday) => holiday.date >= dateInfo.isoDate)
      .slice(0, 8);
    const payload = {
      country: countryInfo.name,
      countryCode: countryInfo.flagCode,
      ...dateInfo,
      holidays,
      allHolidays,
      source: "Nager.Date public holiday data",
      updatedAt: new Date().toISOString()
    };
    countryCalendarCache[cacheKey] = { updatedAt: now, payload };
    sendJson(response, 200, payload);
  } catch (error) {
    sendJson(response, 200, {
      country: countryInfo.name,
      countryCode: countryInfo.flagCode,
      ...dateInfo,
      holidays: [],
      warning: error.message,
      source: "Holiday data unavailable for this country right now.",
      updatedAt: new Date().toISOString()
    });
  }
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 120000) {
        reject(new Error("Request body is too large."));
        request.destroy();
      }
    });
    request.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON body."));
      }
    });
    request.on("error", reject);
  });
}

function decodeEntities(value) {
  return String(value || "")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)));
}

function stripHtml(value) {
  return decodeEntities(value).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function splitSentences(value) {
  return String(value || "")
    .split(/(?<=[.!?।])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function cleanArticleTitle(value) {
  return String(value || "")
    .replace(/\s+-\s+[^-]+$/, "")
    .replace(/\s+\|\s+.+$/, "")
    .trim();
}

function buildAiInsight(article) {
  const title = cleanArticleTitle(article.title || "This story");
  const sourceName = article.source?.name || "the original publisher";
  const category = article.category || "news";
  const country = article.country || "the selected region";
  const summarySentences = splitSentences(article.summary);
  const firstSummary = summarySentences.find((sentence) => sentence.length > 24) || "";

  return {
    label: "AI insight",
    headline: title,
    quickTake: firstSummary
      ? `${firstSummary} The main thing to watch is how this development changes the next steps for people following ${category} news in ${country}.`
      : `${title} is a developing ${category} story connected to ${country}. The useful next step is to compare the source report with later updates from trusted publishers.`,
    whyItMatters: `This matters because ${category} stories can affect decisions, public attention, markets, policy, or everyday life depending on the region and people involved.`,
    whatToWatch: [
      "Whether other trusted sources confirm or expand the report.",
      "Who is directly affected and what changes next.",
      `New updates from ${sourceName} or official sources.`
    ],
    questions: [
      "What facts are confirmed right now?",
      "What is still unclear or developing?",
      "What changed compared with earlier reports?"
    ],
    sourceNote: `Generated from available article metadata and source attribution. Read the full story at ${sourceName} for complete reporting.`
  };
}

async function handleAiInsight(request, response) {
  if (request.method !== "POST") {
    sendJson(response, 405, { error: "Use POST for AI insight." });
    return;
  }

  try {
    const body = await readJsonBody(request);
    const article = body.article || {};
    if (!article.title) {
      sendJson(response, 400, { error: "Article title is required." });
      return;
    }
    sendJson(response, 200, buildAiInsight(article));
  } catch (error) {
    sendJson(response, 400, { error: error.message });
  }
}

function getTag(block, tag) {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeEntities(match[1]).trim() : "";
}

function getSource(block) {
  const match = block.match(/<source\s+url="([^"]*)"[^>]*>([\s\S]*?)<\/source>/i);
  if (!match) {
    return { name: "Unknown source", url: "" };
  }
  return {
    name: decodeEntities(match[2]).trim() || "Unknown source",
    url: decodeEntities(match[1]).trim()
  };
}

function getImageFromDescription(description) {
  const match = description.match(/<img[^>]+src="([^"]+)"/i);
  return match ? decodeEntities(match[1]) : "";
}

function getImageFromRssBlock(block, description) {
  const candidates = [
    /<media:content[^>]+url="([^"]+)"/i,
    /<media:thumbnail[^>]+url="([^"]+)"/i,
    /<enclosure[^>]+url="([^"]+)"[^>]+type="image\/[^"]+"/i,
    /<image[^>]*>\s*<url>([\s\S]*?)<\/url>\s*<\/image>/i
  ];

  for (const pattern of candidates) {
    const match = block.match(pattern);
    const image = match?.[1] ? decodeEntities(match[1]).trim() : "";
    if (isUsableNewsImage(image)) return image;
  }

  const descriptionImage = getImageFromDescription(description);
  return isUsableNewsImage(descriptionImage) ? descriptionImage : "";
}

function absoluteUrl(value, baseUrl) {
  if (!value) return "";
  try {
    return new URL(decodeEntities(value), baseUrl).toString();
  } catch {
    return "";
  }
}

function isUsableNewsImage(value) {
  if (!value) return false;
  const lowered = value.toLowerCase();
  return ![
    "logo",
    "favicon",
    "apple-touch-icon",
    "sprite",
    "placeholder",
    "default-image",
    "og-fox-news",
    "blank."
  ].some((token) => lowered.includes(token));
}

function getMetaImageFromHtml(html, pageUrl) {
  const patterns = [
    /<meta[^>]+property=["']og:image:secure_url["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["'][^>]*>/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["'][^>]*>/i
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    const image = absoluteUrl(match?.[1], pageUrl);
    if (isUsableNewsImage(image)) return image;
  }

  return "";
}

async function fetchArticleImage(articleUrl) {
  if (!articleUrl) return "";
  if (imageCache.has(articleUrl)) return imageCache.get(articleUrl);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3500);

  try {
    const response = await fetch(articleUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 WorldInterestingNews/1.0",
        "Accept": "text/html,application/xhtml+xml"
      },
      redirect: "follow",
      signal: controller.signal
    });
    if (!response.ok) return "";

    const html = await response.text();
    const image = getMetaImageFromHtml(html.slice(0, 240000), response.url || articleUrl);
    const usableImage = isUsableNewsImage(image) ? image : "";
    imageCache.set(articleUrl, usableImage);
    return usableImage;
  } catch {
    imageCache.set(articleUrl, "");
    return "";
  } finally {
    clearTimeout(timeout);
  }
}

async function enrichArticleImages(articles) {
  const enriched = [...articles];
  const missing = enriched
    .map((article, index) => ({ article, index }))
    .filter(({ article }) => !article.image)
    .slice(0, 12);

  await Promise.allSettled(missing.map(async ({ article, index }) => {
    const image = await fetchArticleImage(article.url) || await fetchArticleImage(article.source?.url);
    if (image) {
      enriched[index] = { ...article, image, imageSource: "article-meta" };
    }
  }));

  return enriched;
}

function scoreArticle(article) {
  const text = `${article.title} ${article.summary}`.toLowerCase();
  const impactWords = ["breaking", "first", "major", "record", "new", "global", "warning", "launch", "wins", "deal"];
  const score = impactWords.reduce((total, word) => total + (text.includes(word) ? 1 : 0), 0);
  return score + Math.max(0, 4 - article.ageHours / 12);
}

function parseRss(xml, countryKey, categoryKey, fallbackSource) {
  const itemBlocks = xml.match(/<item>[\s\S]*?<\/item>/gi) || [];
  const now = Date.now();

  return itemBlocks.map((block, index) => {
    const description = getTag(block, "description");
    const publishedAt = getTag(block, "pubDate");
    const source = getSource(block);
    const articleSource = source.name === "Unknown source" && fallbackSource ? fallbackSource : source;
    const ageHours = publishedAt ? Math.max(0, (now - new Date(publishedAt).getTime()) / 3600000) : 999;
    const article = {
      id: `${countryKey}-${categoryKey}-${index}-${Buffer.from(getTag(block, "title")).toString("base64").slice(0, 18)}`,
      title: stripHtml(getTag(block, "title")),
      summary: stripHtml(description),
      url: getTag(block, "link"),
      source: articleSource,
      publishedAt,
      image: getImageFromRssBlock(block, description),
      country: countries[countryKey]?.name || countries.us.name,
      countryCode: countries[countryKey]?.flagCode || countries.us.flagCode,
      category: categoryKey,
      ageHours
    };
    article.interestScore = scoreArticle(article);
    return article;
  }).filter((article) => article.title && article.url)
    .sort((a, b) => b.interestScore - a.interestScore);
}

async function handleNews(request, response, url) {
  const country = (url.searchParams.get("country") || "us").toLowerCase();
  const category = (url.searchParams.get("category") || "top").toLowerCase();
  const language = (url.searchParams.get("language") || "en").toLowerCase();
  const query = (url.searchParams.get("q") || "").trim();
  const limit = Math.min(Number(url.searchParams.get("limit")) || 24, 48);
  const cacheKey = `${country}:${category}:${language}:${query}:${limit}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.createdAt < 5 * 60 * 1000) {
    sendJson(response, 200, { ...cached.payload, cached: true });
    return;
  }

  try {
    const nativeFeeds = !query ? directFeedList(country, language) : [];
    let articles = [];

    if (nativeFeeds.length) {
      const feedResults = await Promise.allSettled(nativeFeeds.map(async (feed) => {
        const feedResponse = await fetch(feed.url, {
          headers: { "User-Agent": "WorldInterestingNews/1.0" }
        });
        if (!feedResponse.ok) {
          throw new Error(`${feed.name} returned ${feedResponse.status}`);
        }
        const xml = await feedResponse.text();
        return parseRss(xml, country, category, { name: feed.name, url: feed.sourceUrl });
      }));

      articles = dedupeArticles(feedResults
        .filter((result) => result.status === "fulfilled")
        .flatMap((result) => result.value))
        .sort((a, b) => b.interestScore - a.interestScore)
        .slice(0, limit);
    }

    if (!articles.length) {
      const feedUrls = buildFeedUrls(country, category, query, language);
      articles = await fetchGoogleArticles(feedUrls, country, category, limit);
    }

    if (!articles.length && country === "world" && category === "top") {
      const fallbackUrls = buildFeedUrls(country, "world", query, language);
      articles = await fetchGoogleArticles(fallbackUrls, country, "world", limit);
    }

    articles = await enrichArticleImages(articles);
    articles = await translateArticles(articles, language);

    const payload = {
      updatedAt: new Date().toISOString(),
      country: countries[country]?.name || countries.us.name,
      category,
      language,
      query,
      articles
    };

    latestArticles = articles.slice(0, 48);
    cache.set(cacheKey, { createdAt: Date.now(), payload });
    sendJson(response, 200, payload);
  } catch (error) {
    sendJson(response, 502, {
      error: "Unable to load the live news feed right now.",
      detail: error.message
    });
  }
}

function sitemapUrl(loc, lastmod, changefreq, priority) {
  return `  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${xmlEscape(lastmod)}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function handleRobots(request, response) {
  const baseUrl = publicBaseUrl(request);
  response.writeHead(200, {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "public, max-age=3600",
    ...securityHeaders()
  });
  response.end([
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/",
    "Disallow: /admin",
    "Disallow: /auth",
    `Sitemap: ${baseUrl}/sitemap.xml`
  ].join("\n"));
}

function handleSitemap(request, response) {
  const baseUrl = publicBaseUrl(request);
  const now = new Date().toISOString();
  const urls = [
    sitemapUrl(`${baseUrl}/`, now, "hourly", "1.0"),
    sitemapUrl(`${baseUrl}/about.html`, now, "monthly", "0.7"),
    sitemapUrl(`${baseUrl}/contact.html`, now, "monthly", "0.7"),
    sitemapUrl(`${baseUrl}/editorial-policy.html`, now, "monthly", "0.6"),
    sitemapUrl(`${baseUrl}/corrections-policy.html`, now, "monthly", "0.6"),
    sitemapUrl(`${baseUrl}/privacy.html`, now, "yearly", "0.4"),
    sitemapUrl(`${baseUrl}/terms.html`, now, "yearly", "0.4"),
    sitemapUrl(`${baseUrl}/advertise.html`, now, "monthly", "0.4"),
    sitemapUrl(`${baseUrl}/authors/editorial-team.html`, now, "monthly", "0.6"),
    ...Object.keys(topics).map((category) => sitemapUrl(`${baseUrl}/?category=${category}`, now, "hourly", "0.7")),
    ...latestArticles.map((article) => {
      const articleUrl = `${baseUrl}/article.html?id=${encodeURIComponent(article.id)}&slug=${slugify(article.title)}`;
      return sitemapUrl(articleUrl, new Date(article.publishedAt || Date.now()).toISOString(), "daily", "0.8");
    })
  ];

  response.writeHead(200, {
    "Content-Type": "application/xml; charset=utf-8",
    "Cache-Control": "public, max-age=900",
    ...securityHeaders()
  });
  response.end(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`);
}

function handleRss(request, response) {
  const baseUrl = publicBaseUrl(request);
  const now = new Date().toUTCString();
  const items = latestArticles.slice(0, 30).map((article) => {
    const link = `${baseUrl}/article.html?id=${encodeURIComponent(article.id)}&slug=${slugify(article.title)}`;
    return `<item>
      <title>${xmlEscape(article.title)}</title>
      <description>${xmlEscape(article.summary || SITE_DESCRIPTION)}</description>
      <link>${xmlEscape(link)}</link>
      <guid isPermaLink="false">${xmlEscape(article.id)}</guid>
      <pubDate>${xmlEscape(new Date(article.publishedAt || Date.now()).toUTCString())}</pubDate>
      <author>${xmlEscape(SITE_AUTHOR)}</author>
      <category>${xmlEscape(article.category || "news")}</category>
      <source url="${xmlEscape(article.source?.url || baseUrl)}">${xmlEscape(article.source?.name || SITE_NAME)}</source>
    </item>`;
  }).join("\n");

  response.writeHead(200, {
    "Content-Type": "application/rss+xml; charset=utf-8",
    "Cache-Control": "public, max-age=900",
    ...securityHeaders()
  });
  response.end(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${xmlEscape(SITE_NAME)}</title>
    <description>${xmlEscape(SITE_DESCRIPTION)}</description>
    <link>${xmlEscape(baseUrl)}</link>
    <language>en-us</language>
    <lastBuildDate>${xmlEscape(now)}</lastBuildDate>
    ${items}
  </channel>
</rss>`);
}

function handleNotFound(request, response) {
  const baseUrl = publicBaseUrl(request);
  response.writeHead(404, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store",
    ...securityHeaders()
  });
  response.end(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, follow">
  <title>Page not found | ${htmlEscape(SITE_NAME)}</title>
  <link rel="canonical" href="${htmlEscape(baseUrl)}/404.html">
  <link rel="stylesheet" href="/styles.css?v=briefing-return-1">
</head>
<body>
  <main class="static-page">
    <p class="section-kicker">404</p>
    <h1>Page not found</h1>
    <p>The page you requested is not available. Return to the latest global news feed.</p>
    <a class="source-button" href="/">Back to homepage</a>
  </main>
</body>
</html>`);
}

function serveStatic(request, response, url) {
  const requestedPath = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  const filePath = path.normalize(path.join(PUBLIC_DIR, requestedPath));

  if (!filePath.startsWith(PUBLIC_DIR)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      handleNotFound(request, response);
      return;
    }

    response.writeHead(200, {
      "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream",
      "Cache-Control": "public, max-age=60",
      ...securityHeaders()
    });
    response.end(content);
  });
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (url.pathname === "/robots.txt") {
    handleRobots(request, response);
    return;
  }

  if (url.pathname === "/sitemap.xml") {
    handleSitemap(request, response);
    return;
  }

  if (url.pathname === "/rss.xml") {
    handleRss(request, response);
    return;
  }

  if (url.pathname === "/api/news") {
    handleNews(request, response, url);
    return;
  }

  if (url.pathname === "/api/ai-insight") {
    handleAiInsight(request, response);
    return;
  }

  if (url.pathname === "/api/visit") {
    handleVisit(request, response);
    return;
  }

  if (url.pathname === "/api/fifa-scores") {
    handleFifaScores(request, response);
    return;
  }

  if (url.pathname === "/api/fifa-teams") {
    handleFifaTeams(request, response);
    return;
  }

  if (url.pathname === "/api/country-calendar") {
    handleCountryCalendar(request, response, url);
    return;
  }

  if (url.pathname === "/api/meta") {
    sendJson(response, 200, {
      countries: [
        { id: "world", name: "World", countryCode: "world" },
        ...Object.entries(countries)
          .filter(([id]) => id !== "world")
          .map(([id, country]) => ({ id, name: country.name, countryCode: country.flagCode }))
      ],
      defaultCountry: countryCodeFromTimezone(),
      categories: Object.keys(topics),
      languages: Object.entries(languages).map(([id, language]) => ({ id, name: language.name })),
      publicConfig
    });
    return;
  }

  serveStatic(request, response, url);
});

server.listen(PORT, () => {
  console.log(`World Interesting News is running at http://localhost:${PORT}`);
});
