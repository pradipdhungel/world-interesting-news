const state = {
  articles: [],
  countries: [],
  categories: [],
  languages: [],
  sourceLogos: {},
  breakingStories: [],
  breakingIndex: 0,
  breakingTimer: null,
  liveRefreshTimer: null,
  fifaTimer: null,
  fifaCaptains: {},
  fifaTeamPayload: null,
  fifaScorePayload: null,
  calendarDate: new Date(),
  shorts: [],
  shortIndex: 0,
  shortPlaying: true,
  shortTimer: null,
  shortStartedAt: 0,
  shortAutoOpened: false,
  userCountry: "",
  query: "",
  returningStories: [],
  returningLastVisitedAt: "",
  returningDismissed: false,
  briefingRadarItems: [],
  briefingRadarLoading: false,
  briefingRadarRequestId: 0,
  gameArticles: [],
  gameIndex: 0,
  gameScore: 0,
  gameAnswered: false
};

const countrySelect = document.querySelector("#country-select");
const countryPicker = document.querySelector("#country-picker");
const countryButton = document.querySelector("#country-button");
const countryButtonFlag = document.querySelector("#country-button-flag");
const countryButtonName = document.querySelector("#country-button-name");
const countryMenu = document.querySelector("#country-menu");
const countrySearch = document.querySelector("#country-search");
const countryOptions = document.querySelector("#country-options");
const categorySelect = document.querySelector("#category-select");
const categoryPicker = document.querySelector("#category-picker");
const categoryButton = document.querySelector("#category-button");
const categoryButtonIcon = document.querySelector("#category-button-icon");
const categoryButtonName = document.querySelector("#category-button-name");
const categoryMenu = document.querySelector("#category-menu");
const categoryOptions = document.querySelector("#category-options");
const languageSelect = document.querySelector("#language-select");
const sortSelect = document.querySelector("#sort-select");
const sortPicker = document.querySelector("#sort-picker");
const sortButton = document.querySelector("#sort-button");
const sortButtonIcon = document.querySelector("#sort-button-icon");
const sortButtonName = document.querySelector("#sort-button-name");
const sortMenu = document.querySelector("#sort-menu");
const sortOptions = document.querySelector("#sort-options");
const sourceSelect = document.querySelector("#source-select");
const sourcePicker = document.querySelector("#source-picker");
const sourceButton = document.querySelector("#source-button");
const sourceButtonIcon = document.querySelector("#source-button-icon");
const sourceButtonName = document.querySelector("#source-button-name");
const sourceMenu = document.querySelector("#source-menu");
const sourceOptions = document.querySelector("#source-options");
const refreshButton = document.querySelector("#refresh-button");
const resetButton = document.querySelector("#reset-button");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const grid = document.querySelector("#news-grid");
const template = document.querySelector("#article-template");
const errorPanel = document.querySelector("#error-panel");
const continueReadingSection = document.querySelector("#continue-reading");
const continueReadingGrid = document.querySelector("#continue-grid");
const continueReadingKicker = document.querySelector("#continue-kicker");
const continueReadingTitle = document.querySelector("#continue-title");
const continueReadingSummary = document.querySelector("#continue-summary");
const continueReadingClear = document.querySelector("#continue-clear");
const savedBriefingsKicker = document.querySelector("#saved-briefings-kicker");
const savedBriefingsTitle = document.querySelector("#saved-briefings-title");
const savedBriefingsSummary = document.querySelector("#saved-briefings-summary");
const savedBriefingsGrid = document.querySelector("#saved-briefings-grid");
const briefingRadar = document.querySelector("#briefing-radar");
const briefingRadarSummary = document.querySelector("#briefing-radar-summary");
const briefingRadarGrid = document.querySelector("#briefing-radar-grid");
const shareBriefingButton = document.querySelector("#share-briefing");
const saveBriefingButton = document.querySelector("#save-briefing");
const returningFeedSection = document.querySelector("#returning-feed");
const returningKicker = document.querySelector("#returning-kicker");
const returningTitle = document.querySelector("#returning-title");
const returningSummary = document.querySelector("#returning-summary");
const returningMeta = document.querySelector("#returning-meta");
const returningFeedGrid = document.querySelector("#returning-feed-grid");
const returningDismiss = document.querySelector("#returning-dismiss");
const calendarTitle = document.querySelector("#calendar-title");
const calendarSummary = document.querySelector("#calendar-summary");
const calendarStatus = document.querySelector("#calendar-status");
const calendarGrid = document.querySelector("#calendar-grid");
const calendarRefresh = document.querySelector("#calendar-refresh");
const myNewsSection = document.querySelector("#my-news");
const myNewsSummary = document.querySelector("#my-news-summary");
const myNewsPreferences = document.querySelector("#my-news-preferences");
const myNewsDigest = document.querySelector("#my-news-digest");
const myNewsDigestGrid = document.querySelector("#my-news-digest-grid");
const myNewsGrid = document.querySelector("#my-news-grid");
const followCountryButton = document.querySelector("#follow-country");
const followCategoryButton = document.querySelector("#follow-category");
const savedStoriesSection = document.querySelector("#saved-stories");
const savedStoriesGrid = document.querySelector("#saved-grid");
const savedStoriesSummary = document.querySelector("#saved-summary");
const savedStoriesClear = document.querySelector("#saved-clear");
const fifaTitle = document.querySelector("#fifa-title");
const fifaSummary = document.querySelector("#fifa-summary");
const fifaStatus = document.querySelector("#fifa-status");
const fifaMatchPulse = document.querySelector("#fifa-match-pulse");
const fifaScoreGrid = document.querySelector("#fifa-score-grid");
const fifaChartMeta = document.querySelector("#fifa-chart-meta");
const fifaTeamChart = document.querySelector("#fifa-team-chart");
const fifaRefresh = document.querySelector("#fifa-refresh");
const fifaSource = document.querySelector("#fifa-source");
const pageTitle = document.querySelector("#page-title");
const feedLabel = document.querySelector("#feed-label");
const updatedLabel = document.querySelector("#updated-label");
const smartBriefing = document.querySelector("#smart-briefing");
const smartBriefingSummary = document.querySelector("#smart-briefing-summary");
const smartBriefingGrid = document.querySelector("#smart-briefing-grid");
const smartBriefingCta = document.querySelector("#smart-briefing-cta");
const coverageWatch = document.querySelector("#coverage-watch");
const coverageWatchSummary = document.querySelector("#coverage-watch-summary");
const coverageWatchGrid = document.querySelector("#coverage-watch-grid");
const coverageWatchCta = document.querySelector("#coverage-watch-cta");
const newsTimeline = document.querySelector("#news-timeline");
const newsTimelineSummary = document.querySelector("#news-timeline-summary");
const newsTimelineList = document.querySelector("#news-timeline-list");
const newsGame = document.querySelector("#news-game");
const newsGameBoard = document.querySelector("#news-game-board");
const gameScore = document.querySelector("#game-score");
const breakingTicker = document.querySelector("#breaking-ticker");
const breakingCount = document.querySelector("#breaking-count");
const breakingTime = document.querySelector("#breaking-time");
const breakingPrev = document.querySelector("#breaking-prev");
const breakingNext = document.querySelector("#breaking-next");
const featuredStory = document.querySelector("#featured-story");
const secondaryStories = document.querySelector("#secondary-stories");
const trendingList = document.querySelector("#trending-list");
const categorySections = document.querySelector("#category-sections");
const headerNav = document.querySelector("#header-nav");
const mobileNav = document.querySelector("#mobile-nav");
const menuToggle = document.querySelector("#menu-toggle");
const mobilePanel = document.querySelector("#mobile-panel");
const themeToggle = document.querySelector("#theme-toggle");
const shortsNavButton = document.querySelector("#shorts-nav-button");
const mobileShortsButton = document.querySelector("#mobile-shorts-button");
const shortsSection = document.querySelector("#shorts-section");
const shortMedia = document.querySelector("#short-media");
const shortCategory = document.querySelector("#short-category");
const shortTitle = document.querySelector("#short-title");
const shortSummary = document.querySelector("#short-summary");
const shortSource = document.querySelector("#short-source");
const shortTime = document.querySelector("#short-time");
const shortLink = document.querySelector("#short-link");
const shortShare = document.querySelector("#short-share");
const shortProgressBar = document.querySelector("#short-progress-bar");
const shortPrev = document.querySelector("#short-prev");
const shortPlay = document.querySelector("#short-play");
const shortNext = document.querySelector("#short-next");
const shortClose = document.querySelector("#short-close");
const aiModal = document.querySelector("#ai-modal");
const aiContent = document.querySelector("#ai-content");
const aiTitle = document.querySelector("#ai-title");
const aiClose = document.querySelector("#ai-close");
const toast = document.querySelector("#toast");
const MY_NEWS_KEY = "worldNewsPreferences";
const SAVED_BRIEFINGS_KEY = "worldNewsSavedBriefings";
const MAX_SAVED_BRIEFINGS = 6;
const SAVED_STORIES_KEY = "worldNewsSavedStories";
const MAX_SAVED_STORIES = 12;
const RECENT_STORIES_KEY = "worldNewsRecentStories";
const MAX_RECENT_STORIES = 6;
const BRIEFING_SNAPSHOTS_KEY = "worldNewsBriefingSnapshots";
const MAX_BRIEFING_SNAPSHOTS = 12;

const translations = {
  en: {
    subtitle: "Stories by country, category, and source",
    searchPlaceholder: "Search world news",
    search: "Search",
    country: "Country",
    category: "Category",
    language: "Language",
    sort: "Sort",
    source: "Source",
    allSources: "All sources",
    refresh: "Refresh",
    reset: "Reset",
    sourceCta: "Read from source",
    continueKicker: "Continue",
    continueTitle: "Pick up where you left off",
    continueSummary: "Stories you opened recently stay here so you can come back faster.",
    continueEmpty: "Open a story and it will show up here for your next visit.",
    clearHistory: "Clear history",
    noStories: "No stories found for these filters.",
    loading: "Loading latest stories...",
    feedUnavailable: "Feed unavailable",
    liveError: "Live news could not be loaded",
    sourcedStories: "sourced stories",
    updated: "Updated",
    heading: "{category} news in {country}{query}",
    query: " matching \"{query}\"",
    categories: {
      top: "Top Stories",
      world: "World",
      business: "Business",
      technology: "Technology",
      sports: "Sports",
      entertainment: "Entertainment",
      science: "Science",
      health: "Health"
    },
    sorts: {
      interesting: "Most interesting",
      newest: "Newest",
      source: "Source name"
    },
    time: { recent: "Recent", min: "min ago", hr: "hr ago" }
  },
  hi: {
    subtitle: "देश, श्रेणी और स्रोत के अनुसार खबरें",
    searchPlaceholder: "दुनिया की खबरें खोजें",
    search: "खोजें",
    country: "देश",
    category: "श्रेणी",
    language: "भाषा",
    sort: "क्रम",
    source: "स्रोत",
    allSources: "सभी स्रोत",
    refresh: "ताज़ा करें",
    reset: "रीसेट",
    sourceCta: "स्रोत से पढ़ें",
    continueKicker: "जारी रखें",
    continueTitle: "यहीं से फिर शुरू करें",
    continueSummary: "जो खबरें आपने खोली हैं वे अगली बार जल्दी लौटने के लिए यहां रहेंगी।",
    continueEmpty: "कोई खबर खोलें, वह आपकी अगली विजिट के लिए यहां दिखाई देगी।",
    clearHistory: "इतिहास साफ करें",
    noStories: "इन फ़िल्टरों के लिए कोई खबर नहीं मिली।",
    loading: "नई खबरें लोड हो रही हैं...",
    feedUnavailable: "फ़ीड उपलब्ध नहीं है",
    liveError: "लाइव खबरें लोड नहीं हो सकीं",
    sourcedStories: "स्रोत वाली खबरें",
    updated: "अपडेट",
    heading: "{country} में {category} खबरें{query}",
    query: " \"{query}\" से मिलती हुई",
    categories: { top: "मुख्य खबरें", world: "दुनिया", business: "व्यापार", technology: "टेक्नोलॉजी", sports: "खेल", entertainment: "मनोरंजन", science: "विज्ञान", health: "स्वास्थ्य" },
    sorts: { interesting: "सबसे रोचक", newest: "सबसे नई", source: "स्रोत नाम" },
    time: { recent: "हाल ही में", min: "मिनट पहले", hr: "घंटे पहले" }
  },
  ne: {
    subtitle: "देश, वर्ग र स्रोत अनुसार समाचार",
    searchPlaceholder: "विश्व समाचार खोज्नुहोस्",
    search: "खोज्नुहोस्",
    country: "देश",
    category: "वर्ग",
    language: "भाषा",
    sort: "क्रम",
    source: "स्रोत",
    allSources: "सबै स्रोत",
    refresh: "ताजा गर्नुहोस्",
    reset: "रिसेट",
    sourceCta: "स्रोतबाट पढ्नुहोस्",
    continueKicker: "जारी राख्नुहोस्",
    continueTitle: "तपाईंले छोडेको ठाउँबाट सुरु गर्नुहोस्",
    continueSummary: "तपाईंले हालै खोलेका समाचारहरू फेरि फर्कन सजिलो बनाउन यहाँ रहनेछन्।",
    continueEmpty: "एउटा समाचार खोल्नुहोस्, अर्को पटक यहीँ देखिनेछ।",
    clearHistory: "इतिहास हटाउनुहोस्",
    noStories: "यी फिल्टरका लागि समाचार भेटिएन।",
    loading: "नयाँ समाचार लोड हुँदैछ...",
    feedUnavailable: "फिड उपलब्ध छैन",
    liveError: "लाइभ समाचार लोड हुन सकेन",
    sourcedStories: "स्रोत भएका समाचार",
    updated: "अपडेट",
    heading: "{country} मा {category} समाचार{query}",
    query: " \"{query}\" सँग मिल्ने",
    categories: { top: "मुख्य समाचार", world: "विश्व", business: "व्यापार", technology: "प्रविधि", sports: "खेलकुद", entertainment: "मनोरञ्जन", science: "विज्ञान", health: "स्वास्थ्य" },
    sorts: { interesting: "सबैभन्दा रोचक", newest: "नयाँ", source: "स्रोत नाम" },
    time: { recent: "भर्खरै", min: "मिनेट अघि", hr: "घण्टा अघि" }
  },
  es: {
    subtitle: "Noticias por pais, categoria y fuente",
    searchPlaceholder: "Buscar noticias del mundo",
    search: "Buscar",
    country: "Pais",
    category: "Categoria",
    language: "Idioma",
    sort: "Orden",
    source: "Fuente",
    allSources: "Todas las fuentes",
    refresh: "Actualizar",
    reset: "Restablecer",
    sourceCta: "Leer en la fuente",
    continueKicker: "Continuar",
    continueTitle: "Retoma donde lo dejaste",
    continueSummary: "Las historias que abriste recientemente se guardan aqui para volver mas rapido.",
    continueEmpty: "Abre una historia y aparecera aqui en tu proxima visita.",
    clearHistory: "Borrar historial",
    noStories: "No se encontraron noticias para estos filtros.",
    loading: "Cargando noticias recientes...",
    feedUnavailable: "Fuente no disponible",
    liveError: "No se pudieron cargar las noticias",
    sourcedStories: "noticias con fuente",
    updated: "Actualizado",
    heading: "Noticias de {category} en {country}{query}",
    query: " que coinciden con \"{query}\"",
    categories: { top: "Principales", world: "Mundo", business: "Negocios", technology: "Tecnologia", sports: "Deportes", entertainment: "Entretenimiento", science: "Ciencia", health: "Salud" },
    sorts: { interesting: "Mas interesantes", newest: "Mas recientes", source: "Nombre de fuente" },
    time: { recent: "Reciente", min: "min atras", hr: "h atras" }
  },
  fr: {
    subtitle: "Actualites par pays, categorie et source",
    searchPlaceholder: "Rechercher des actualites mondiales",
    search: "Rechercher",
    country: "Pays",
    category: "Categorie",
    language: "Langue",
    sort: "Tri",
    source: "Source",
    allSources: "Toutes les sources",
    refresh: "Actualiser",
    reset: "Reinitialiser",
    sourceCta: "Lire la source",
    continueKicker: "Reprendre",
    continueTitle: "Reprenez la ou vous vous etiez arrete",
    continueSummary: "Les articles ouverts recemment restent ici pour vous aider a revenir plus vite.",
    continueEmpty: "Ouvrez un article et il apparaitra ici lors de votre prochaine visite.",
    clearHistory: "Effacer l'historique",
    noStories: "Aucun article trouve pour ces filtres.",
    loading: "Chargement des dernieres nouvelles...",
    feedUnavailable: "Flux indisponible",
    liveError: "Impossible de charger les actualites",
    sourcedStories: "articles sources",
    updated: "Mis a jour",
    heading: "Actualites {category} en {country}{query}",
    query: " correspondant a \"{query}\"",
    categories: { top: "A la une", world: "Monde", business: "Economie", technology: "Technologie", sports: "Sports", entertainment: "Divertissement", science: "Science", health: "Sante" },
    sorts: { interesting: "Plus interessantes", newest: "Plus recentes", source: "Nom de la source" },
    time: { recent: "Recent", min: "min", hr: "h" }
  }
};

["ar", "de", "ja", "pt", "zh"].forEach((code) => {
  translations[code] = translations.en;
});

const categoryLabels = {
  top: "Top Stories",
  world: "World",
  business: "Business",
  technology: "Technology",
  sports: "Sports",
  entertainment: "Entertainment",
  science: "Science",
  health: "Health"
};

const categoryPalettes = {
  top: ["#0f766e", "#b45309", "#18212f"],
  world: ["#1d4ed8", "#0f766e", "#334155"],
  business: ["#155e75", "#a16207", "#1f2937"],
  technology: ["#4f46e5", "#0891b2", "#111827"],
  sports: ["#15803d", "#ca8a04", "#1f2937"],
  entertainment: ["#be185d", "#7c3aed", "#1f2937"],
  science: ["#0369a1", "#16a34a", "#172554"],
  health: ["#047857", "#dc2626", "#1f2937"]
};

const categoryIcons = {
  top: "★",
  world: "◎",
  business: "$",
  technology: "⌁",
  sports: "●",
  entertainment: "♪",
  science: "⚗",
  health: "+"
};

const sortIcons = {
  interesting: "◆",
  newest: "↧",
  source: "A"
};

const stopWords = new Set([
  "about", "after", "again", "against", "amid", "and", "are", "from", "into",
  "new", "news", "over", "says", "the", "this", "that", "their", "with", "will"
]);

function formatDate(value) {
  const text = currentText();
  if (!value) return text.time.recent;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return text.time.recent;

  const diff = Date.now() - date.getTime();
  const minutes = Math.max(1, Math.round(diff / 60000));
  if (minutes < 60) return `${minutes} ${text.time.min}`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} ${text.time.hr}`;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function normalizeCategory(category) {
  return currentText().categories[category] || categoryLabels[category] || category.replace(/-/g, " ");
}

function readingTime(article) {
  const words = `${article.title || ""} ${article.summary || ""}`.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(2, Math.ceil(words / 85))} min read`;
}

function articleLink(article) {
  const slug = window.NewsSeo ? NewsSeo.slugify(article.title) : article.id;
  return `/article.html?id=${encodeURIComponent(article.id)}&slug=${encodeURIComponent(slug)}`;
}

function absoluteArticleUrl(article) {
  return new URL(articleLink(article), window.location.origin).toString();
}

let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.hidden = true;
  }, 2400);
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {}
  }

  const input = document.createElement("textarea");
  input.value = text;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.left = "-9999px";
  document.body.appendChild(input);
  input.select();
  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }
  input.remove();
  return copied;
}

async function shareArticle(article) {
  if (!article) return;
  const shareData = {
    title: article.title,
    text: article.summary || "Read this story on World Interesting News",
    url: absoluteArticleUrl(article)
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }
  } catch (error) {
    if (error.name === "AbortError") return;
  }

  if (await copyText(shareData.url)) {
    showToast("Story link copied");
  } else {
    showToast("Copy this link: " + shareData.url);
  }
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function closeAiModal() {
  if (!aiModal) return;
  aiModal.hidden = true;
}

function renderAiInsight(insight) {
  aiTitle.textContent = insight.headline || "AI insight";
  aiContent.innerHTML = `
    <section>
      <h3>Quick take</h3>
      <p>${escapeHtml(insight.quickTake || "No AI insight is available for this story yet.")}</p>
    </section>
    <section>
      <h3>Why it matters</h3>
      <p>${escapeHtml(insight.whyItMatters || "")}</p>
    </section>
    <section>
      <h3>What to watch</h3>
      <ul>${(insight.whatToWatch || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </section>
    <section>
      <h3>Questions to ask</h3>
      <ul>${(insight.questions || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </section>
    <p class="ai-note">${escapeHtml(insight.sourceNote || "")}</p>
  `;
}

async function openAiInsight(article) {
  if (!aiModal || !aiContent || !aiTitle) return;
  aiModal.hidden = false;
  aiTitle.textContent = "AI insight";
  aiContent.innerHTML = '<div class="ai-loading">Generating insight...</div>';

  try {
    const response = await fetch("/api/ai-insight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ article })
    });
    const insight = await response.json();
    if (!response.ok) throw new Error(insight.error || "AI insight failed");
    renderAiInsight(insight);
  } catch (error) {
    aiContent.innerHTML = `<div class="ai-error">AI insight is unavailable right now. ${error.message}</div>`;
  }
}

function setTheme(theme) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem("worldNewsTheme", nextTheme);
  if (themeToggle) {
    themeToggle.textContent = nextTheme === "dark" ? "Light" : "Dark";
    themeToggle.setAttribute("aria-label", `Switch to ${nextTheme === "dark" ? "light" : "dark"} mode`);
  }
}

function initTheme() {
  const stored = localStorage.getItem("worldNewsTheme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(stored || (prefersDark ? "dark" : "light"));
}

function selectCategory(categoryId) {
  categorySelect.value = categoryId;
  syncCategoryPicker();
  closeMobileMenu();
  updateUrlState();
  loadNews();
}

function updateUrlState() {
  const nextUrl = briefingUrl();
  window.history.replaceState({}, "", nextUrl);
}

function renderCategoryNavigation() {
  const categories = state.categories.length ? state.categories : Object.keys(categoryLabels);
  const renderLink = (category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "nav-link";
    button.textContent = normalizeCategory(category);
    button.setAttribute("aria-pressed", String(categorySelect.value === category));
    button.addEventListener("click", () => selectCategory(category));
    return button;
  };

  [headerNav, mobileNav].forEach((nav) => {
    if (!nav) return;
    nav.innerHTML = "";
    categories.forEach((category) => nav.appendChild(renderLink(category)));
  });
}

function closeMobileMenu() {
  if (!mobilePanel || !menuToggle) return;
  mobilePanel.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
}

function stopShortTimer() {
  if (state.shortTimer) {
    clearInterval(state.shortTimer);
    state.shortTimer = null;
  }
}

function shortsClosedThisSession() {
  try {
    return sessionStorage.getItem("worldNewsShortsClosed") === "true";
  } catch {
    return false;
  }
}

function markShortsClosed() {
  try {
    sessionStorage.setItem("worldNewsShortsClosed", "true");
  } catch {}
}

function startShortTimer() {
  stopShortTimer();
  if (!state.shortPlaying || !state.shorts.length) return;
  state.shortStartedAt = Date.now();
  if (shortProgressBar) shortProgressBar.style.width = "0%";
  state.shortTimer = setInterval(() => {
    const progress = Math.min(1, (Date.now() - state.shortStartedAt) / 7000);
    if (shortProgressBar) shortProgressBar.style.width = `${progress * 100}%`;
    if (progress >= 1) {
      nextShort();
    }
  }, 80);
}

function renderCurrentShort() {
  const article = state.shorts[state.shortIndex];
  if (!article || !shortsSection) return;

  shortCategory.textContent = normalizeCategory(article.category);
  shortTitle.textContent = article.title;
  shortSummary.textContent = article.summary || "Open the full story for details and source context.";
  shortSource.textContent = article.source?.name || "Unknown source";
  shortTime.textContent = formatDate(article.publishedAt);
  shortLink.href = articleLink(article);
  if (shortShare) {
    shortShare.onclick = () => shareArticle(article);
    shortShare.setAttribute("aria-label", `Share: ${article.title}`);
  }
  shortMedia.innerHTML = "";
  shortMedia.style.backgroundImage = article.image ? `url("${article.image}")` : generatedImageBackground(article);
  shortMedia.setAttribute("role", "img");
  shortMedia.setAttribute("aria-label", `${article.title} short video image`);
  if (shortPlay) {
    shortPlay.querySelector("span").textContent = state.shortPlaying ? "Pause" : "Play";
    shortPlay.querySelector("small").textContent = "Auto";
    shortPlay.setAttribute("aria-label", state.shortPlaying ? "Pause short" : "Play short");
  }
  startShortTimer();
}

async function fetchShortArticlesForCountry(country) {
  if (!country || country === "world") return [];
  const params = new URLSearchParams({
    country,
    category: categorySelect.value || "top",
    limit: "12",
    language: languageSelect.value || "en"
  });

  try {
    const response = await fetch(`/api/news?${params.toString()}`);
    const payload = await response.json();
    if (!response.ok || !Array.isArray(payload.articles)) return [];
    return sortArticles(payload.articles).slice(0, 12);
  } catch {
    return [];
  }
}

async function prepareShorts(preferUserCountry = false) {
  const shouldUseLocalShorts = preferUserCountry && countrySelect.value === "world" && state.userCountry;
  const localArticles = shouldUseLocalShorts ? await fetchShortArticlesForCountry(state.userCountry) : [];
  state.shorts = localArticles.length ? localArticles : sortArticles(sourceFilteredArticles()).slice(0, 12);
  if (state.shortIndex >= state.shorts.length) state.shortIndex = 0;
}

async function openShorts(options = {}) {
  if (!shortsSection) return;
  const { auto = false, preferUserCountry = false } = options;
  await prepareShorts(preferUserCountry);
  if (!state.shorts.length) return;
  shortsSection.hidden = false;
  closeMobileMenu();
  renderCurrentShort();
  if (auto) state.shortAutoOpened = true;
  requestAnimationFrame(() => {
    const headerHeight = document.querySelector(".topbar")?.offsetHeight || 0;
    const top = shortsSection.getBoundingClientRect().top + window.scrollY - headerHeight - 18;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  });
}

function closeShorts() {
  if (!shortsSection) return;
  shortsSection.hidden = true;
  stopShortTimer();
  markShortsClosed();
}

function nextShort() {
  if (!state.shorts.length) return;
  state.shortIndex = (state.shortIndex + 1) % state.shorts.length;
  renderCurrentShort();
}

function previousShort() {
  if (!state.shorts.length) return;
  state.shortIndex = (state.shortIndex - 1 + state.shorts.length) % state.shorts.length;
  renderCurrentShort();
}

function toggleShortPlayback() {
  state.shortPlaying = !state.shortPlaying;
  if (shortPlay) {
    shortPlay.querySelector("span").textContent = state.shortPlaying ? "Pause" : "Play";
    shortPlay.querySelector("small").textContent = "Auto";
    shortPlay.setAttribute("aria-label", state.shortPlaying ? "Pause short" : "Play short");
  }
  if (state.shortPlaying) {
    startShortTimer();
  } else {
    stopShortTimer();
  }
}

function currentText() {
  return translations[languageSelect?.value] || translations.en;
}

function briefingText(key) {
  const fallback = {
    savedBriefingsKicker: "Briefings",
    savedBriefingsTitle: "Save this briefing for next time",
    savedBriefingsSummary: "Keep a country, topic, language, and search combination ready for one-tap return visits.",
    shareBriefing: "Share this briefing",
    saveBriefing: "Save current briefing",
    savedBriefingsEmpty: "No saved briefings yet. Save this setup to reopen it with one tap next time.",
    openBriefing: "Open briefing",
    shareSavedBriefing: "Share link",
    removeBriefing: "Remove",
    briefingSaved: "Briefing saved",
    briefingRemoved: "Briefing removed",
    briefingAlreadySaved: "This briefing is already saved",
    briefingLinkCopied: "Briefing link copied",
    briefingShareFallback: "Copy this briefing link: ",
    activeBriefing: "Active",
    briefingBadge: "Briefing",
    searchBriefing: "Search",
    radarTitle: "Which saved briefings changed",
    radarLoading: "Checking your saved briefings for fresh stories.",
    radarEmpty: "Save a few briefings and this radar will show where the news moved first.",
    radarCaughtUp: "All saved briefings are caught up right now.",
    radarUpdated: "{count} saved briefings have fresh coverage waiting.",
    radarReady: "Saved briefings are ready to reopen with one tap.",
    radarError: "Some saved briefings could not be checked right now.",
    radarNewStoriesOne: "1 new story",
    radarNewStoriesMany: "{count} new stories",
    radarNoChanges: "Caught up",
    radarNeverChecked: "Not checked yet",
    radarVisited: "Last visit {time}",
    radarOpen: "Catch up",
    radarOpenFirst: "Open first check",
    radarRefresh: "Updated {time}"
  };
  const text = currentText();
  return text[key] || fallback[key] || "";
}

function returningText(key) {
  const fallback = {
    kicker: "Since your last visit",
    title: "Catch up on new stories",
    intro: "Fresh reporting for this briefing since you last checked in.",
    summary: "No new stories since your last visit. You are caught up on this briefing.",
    countOne: "1 new story since {time}",
    countMany: "{count} new stories since {time}",
    firstVisit: "When you come back to the same briefing, new stories will appear here first.",
    hide: "Hide this update",
    fresh: "New",
    seen: "Last visit",
    allCaughtUp: "You are caught up"
  };
  return fallback[key] || "";
}

function myNewsText(key) {
  const fallback = {
    intro: "Follow the country and topic you are browsing to build a faster personal feed.",
    summaryMatches: "{count} stories match your saved interests. Open a digest card or tap a chip to adjust it.",
    summaryWaiting: "Your interests are saved. Matching stories will appear here as the feed refreshes.",
    emptyStart: "Start by choosing a country or topic above, then My News will collect matching stories here.",
    emptyWaiting: "No matching stories in this feed yet. Try Refresh or follow another topic.",
    digestLead: "Lead story",
    digestOpen: "Open digest",
    digestShare: "Share digest",
    digestNoStories: "No live stories in this feed yet",
    digestCountOne: "1 story in this feed",
    digestCountMany: "{count} stories in this feed",
    digestCountry: "Country follow",
    digestTopic: "Topic follow",
    digestFallbackMeta: "Open this digest to check the latest stories."
  };
  return fallback[key] || "";
}

function readSavedBriefings() {
  try {
    const items = JSON.parse(localStorage.getItem(SAVED_BRIEFINGS_KEY) || "[]");
    return Array.isArray(items) ? items.filter((item) => item && item.id) : [];
  } catch {
    return [];
  }
}

function writeSavedBriefings(items) {
  try {
    localStorage.setItem(SAVED_BRIEFINGS_KEY, JSON.stringify(items.slice(0, MAX_SAVED_BRIEFINGS)));
  } catch {}
}

function currentBriefingDraft() {
  return {
    country: countrySelect.value || "world",
    category: categorySelect.value || "top",
    language: languageSelect.value || "en",
    sort: sortSelect.value || "interesting",
    source: sourceSelect.value || "all",
    query: state.query || ""
  };
}

function briefingSnapshotDraft() {
  return {
    country: countrySelect.value || "world",
    category: categorySelect.value || "top",
    language: languageSelect.value || "en",
    query: state.query || ""
  };
}

function briefingSnapshotDraftFromBriefing(briefing = {}) {
  return {
    country: briefing.country || "world",
    category: briefing.category || "top",
    language: briefing.language || "en",
    query: briefing.query || ""
  };
}

function briefingSnapshotKey(briefing = briefingSnapshotDraft()) {
  return [briefing.country || "world", briefing.category || "top", briefing.language || "en", (briefing.query || "").trim().toLowerCase()].join("|");
}

function readBriefingSnapshots() {
  try {
    const items = JSON.parse(localStorage.getItem(BRIEFING_SNAPSHOTS_KEY) || "{}");
    return items && typeof items === "object" ? items : {};
  } catch {
    return {};
  }
}

function writeBriefingSnapshots(items) {
  try {
    const trimmedEntries = Object.entries(items)
      .sort(([, left], [, right]) => new Date(right?.visitedAt || 0) - new Date(left?.visitedAt || 0))
      .slice(0, MAX_BRIEFING_SNAPSHOTS);
    localStorage.setItem(BRIEFING_SNAPSHOTS_KEY, JSON.stringify(Object.fromEntries(trimmedEntries)));
  } catch {}
}

function articleSnapshotKey(article) {
  return article.url || `${article.source?.name || "source"}|${article.title || "story"}`;
}

function compareWithLastBriefingVisit(articles) {
  const snapshots = readBriefingSnapshots();
  const snapshot = snapshots[briefingSnapshotKey()];
  state.returningLastVisitedAt = snapshot?.visitedAt || "";
  state.returningDismissed = false;

  if (!snapshot?.articleKeys?.length) {
    state.returningStories = [];
    return;
  }

  const seen = new Set(snapshot.articleKeys);
  state.returningStories = articles
    .filter((article) => !seen.has(articleSnapshotKey(article)))
    .slice(0, 6);
}

function saveBriefingSnapshot(articles) {
  const snapshots = readBriefingSnapshots();
  snapshots[briefingSnapshotKey()] = {
    visitedAt: new Date().toISOString(),
    articleKeys: articles.slice(0, 24).map(articleSnapshotKey)
  };
  writeBriefingSnapshots(snapshots);
}

function sameBriefing(a, b) {
  return a.country === b.country
    && a.category === b.category
    && a.language === b.language
    && a.sort === b.sort
    && (a.source || "all") === (b.source || "all")
    && (a.query || "") === (b.query || "");
}

function languageNameById(languageId) {
  return state.languages.find((language) => language.id === languageId)?.name || languageId || "English";
}

function briefingLabel(briefing) {
  const country = countryNameById(briefing.country || "world");
  const category = normalizeCategory(briefing.category || "top");
  const query = String(briefing.query || "").trim();
  return query ? `${country} ${category}: ${query}` : `${country} ${category}`;
}

function filterArticlesForBriefing(articles, briefing) {
  const sourceName = briefing.source || "all";
  if (sourceName === "all") return [...articles];
  return articles.filter((article) => article.source?.name === sourceName);
}

function sortArticlesByValue(articles, sort = "interesting") {
  const sorted = [...articles];

  if (sort === "newest") {
    sorted.sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0));
  } else if (sort === "source") {
    sorted.sort((a, b) => (a.source?.name || "").localeCompare(b.source?.name || ""));
  } else {
    sorted.sort((a, b) => (b.interestScore || 0) - (a.interestScore || 0));
  }

  return sorted;
}

function articlesForBriefing(articles, briefing) {
  return sortArticlesByValue(filterArticlesForBriefing(articles, briefing), briefing.sort || "interesting");
}

async function fetchArticlesForBriefing(briefing) {
  if (sameBriefing(briefing, currentBriefingDraft()) && state.articles.length) {
    return {
      articles: articlesForBriefing(state.articles, briefing),
      updatedAt: state.updatedAt || new Date().toISOString()
    };
  }

  const params = new URLSearchParams({
    country: briefing.country || "world",
    category: briefing.category || "top",
    language: briefing.language || "en",
    limit: "30"
  });
  if (briefing.query) params.set("q", briefing.query);

  const response = await fetch(`/api/news?${params.toString()}`);
  const payload = await response.json();
  if (!response.ok || !Array.isArray(payload.articles)) {
    throw new Error(payload.detail || payload.error || "Briefing radar failed");
  }

  return {
    articles: articlesForBriefing(payload.articles, briefing),
    updatedAt: payload.updatedAt || new Date().toISOString()
  };
}

function briefingRadarStatusText(item) {
  if (item.error) return briefingText("radarError");
  if (!item.lastVisitedAt) return briefingText("radarNeverChecked");
  return briefingText("radarVisited").replace("{time}", formatDate(item.lastVisitedAt));
}

function briefingRadarCountText(item) {
  if (item.error) return briefingText("radarError");
  if (!item.lastVisitedAt) return briefingText("radarNeverChecked");
  if (!item.newCount) return briefingText("radarNoChanges");
  return item.newCount === 1
    ? briefingText("radarNewStoriesOne")
    : briefingText("radarNewStoriesMany").replace("{count}", String(item.newCount));
}

function briefingRadarActionText(item) {
  return item.lastVisitedAt ? briefingText("radarOpen") : briefingText("radarOpenFirst");
}

function compareBriefingRadarItems(left, right) {
  if ((right.newCount || 0) !== (left.newCount || 0)) return (right.newCount || 0) - (left.newCount || 0);
  if (Boolean(right.error) !== Boolean(left.error)) return Number(Boolean(left.error)) - Number(Boolean(right.error));
  return new Date(right.updatedAt || 0) - new Date(left.updatedAt || 0);
}

function renderBriefingRadar() {
  if (!briefingRadar || !briefingRadarGrid || !briefingRadarSummary) return;
  const briefings = readSavedBriefings();
  briefingRadarGrid.innerHTML = "";

  if (!briefings.length) {
    briefingRadar.hidden = true;
    return;
  }

  briefingRadar.hidden = false;
  const items = state.briefingRadarItems || [];
  if (state.briefingRadarLoading && !items.length) {
    briefingRadarSummary.textContent = briefingText("radarLoading");
    briefingRadarGrid.innerHTML = `<div class="briefing-radar-empty">${briefingText("radarLoading")}</div>`;
    return;
  }

  const refreshed = items.filter((item) => !item.error);
  const changedCount = refreshed.filter((item) => item.newCount > 0).length;
  const hasError = items.some((item) => item.error);

  if (!items.length) {
    briefingRadarSummary.textContent = briefingText("radarEmpty");
    briefingRadarGrid.innerHTML = `<div class="briefing-radar-empty">${briefingText("radarEmpty")}</div>`;
    return;
  }

  if (hasError) {
    briefingRadarSummary.textContent = briefingText("radarError");
  } else if (changedCount > 0) {
    briefingRadarSummary.textContent = briefingText("radarUpdated").replace("{count}", String(changedCount));
  } else if (refreshed.some((item) => !item.lastVisitedAt)) {
    briefingRadarSummary.textContent = briefingText("radarReady");
  } else {
    briefingRadarSummary.textContent = briefingText("radarCaughtUp");
  }

  items.forEach((item) => {
    const card = document.createElement("article");
    const lead = item.leadStory;
    const leadMeta = lead
      ? `${lead.source?.name || "Source"} · ${formatDate(lead.publishedAt)}`
      : briefingText("radarRefresh").replace("{time}", formatDate(item.updatedAt));
    card.className = `briefing-radar-card${item.newCount > 0 ? " has-fresh" : ""}${item.error ? " has-error" : ""}`;
    card.innerHTML = `
      <div class="briefing-radar-top">
        <span class="briefing-radar-badge">${escapeHtml(briefingRadarCountText(item))}</span>
        <small>${escapeHtml(briefingRadarStatusText(item))}</small>
      </div>
      <strong>${escapeHtml(briefingLabel(item.briefing))}</strong>
      <p>${escapeHtml(briefingMeta(item.briefing))}</p>
      <div class="briefing-radar-story">
        <span>${item.newCount > 0 ? "Lead update" : "Top story"}</span>
        <strong>${escapeHtml(lead?.title || "Open this briefing to see the latest source-backed stories.")}</strong>
        <small>${escapeHtml(leadMeta)}</small>
      </div>
      <div class="briefing-radar-actions">
        <button type="button" class="briefing-radar-open">${escapeHtml(briefingRadarActionText(item))}</button>
        <button type="button" class="briefing-radar-share">${escapeHtml(briefingText("shareSavedBriefing"))}</button>
      </div>
    `;
    card.querySelector(".briefing-radar-open").addEventListener("click", () => applySavedBriefing(item.briefing));
    card.querySelector(".briefing-radar-share").addEventListener("click", () => shareBriefing(item.briefing));
    briefingRadarGrid.appendChild(card);
  });
}

async function loadBriefingRadar() {
  if (!briefingRadar || !briefingRadarGrid) return;
  const briefings = readSavedBriefings().slice(0, 4);
  state.briefingRadarRequestId += 1;
  const requestId = state.briefingRadarRequestId;

  if (!briefings.length) {
    state.briefingRadarItems = [];
    state.briefingRadarLoading = false;
    renderBriefingRadar();
    return;
  }

  state.briefingRadarLoading = true;
  renderBriefingRadar();
  const snapshots = readBriefingSnapshots();

  const items = await Promise.all(briefings.map(async (briefing) => {
    const snapshot = snapshots[briefingSnapshotKey(briefingSnapshotDraftFromBriefing(briefing))];
    try {
      const payload = await fetchArticlesForBriefing(briefing);
      const seen = new Set(snapshot?.articleKeys || []);
      const freshStories = snapshot?.articleKeys?.length
        ? payload.articles.filter((article) => !seen.has(articleSnapshotKey(article)))
        : [];
      return {
        briefing,
        newCount: freshStories.slice(0, 6).length,
        leadStory: freshStories[0] || payload.articles[0] || null,
        lastVisitedAt: snapshot?.visitedAt || "",
        updatedAt: payload.updatedAt
      };
    } catch {
      return {
        briefing,
        newCount: 0,
        leadStory: null,
        lastVisitedAt: snapshot?.visitedAt || "",
        updatedAt: "",
        error: true
      };
    }
  }));

  if (requestId !== state.briefingRadarRequestId) return;
  state.briefingRadarItems = items.sort(compareBriefingRadarItems);
  state.briefingRadarLoading = false;
  renderBriefingRadar();
}

function briefingMeta(briefing) {
  const sortName = currentText().sorts?.[briefing.sort] || briefing.sort || currentText().sorts?.interesting || "Most interesting";
  const bits = [languageNameById(briefing.language || "en"), sortName];
  if (briefing.source && briefing.source !== "all") bits.push(briefing.source);
  if (briefing.query) bits.push(`${briefingText("searchBriefing")}: ${briefing.query}`);
  return bits.join(" | ");
}

function briefingUrl(briefing = currentBriefingDraft()) {
  const params = new URLSearchParams();
  if (briefing.country && briefing.country !== "world") params.set("country", briefing.country);
  if (briefing.category && briefing.category !== "top") params.set("category", briefing.category);
  if (briefing.language && briefing.language !== "en") params.set("language", briefing.language);
  if (briefing.sort && briefing.sort !== "interesting") params.set("sort", briefing.sort);
  if (briefing.source && briefing.source !== "all") params.set("source", briefing.source);
  if (briefing.query) params.set("q", briefing.query);
  const path = params.toString() ? `/?${params.toString()}` : "/";
  return new URL(path, window.location.origin).toString();
}

async function shareBriefing(briefing = currentBriefingDraft()) {
  const label = briefingLabel(briefing);
  const url = briefingUrl(briefing);
  const shareData = {
    title: `${label} | World Interesting News`,
    text: `Open this World Interesting News briefing: ${label}`,
    url
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }
  } catch (error) {
    if (error.name === "AbortError") return;
  }

  if (await copyText(url)) {
    showToast(briefingText("briefingLinkCopied"));
  } else {
    showToast(briefingText("briefingShareFallback") + url);
  }
}

function applySavedBriefing(briefing) {
  if (!briefing) return;
  state.query = briefing.query || "";
  searchInput.value = state.query;
  languageSelect.value = briefing.language || "en";
  sortSelect.value = briefing.sort || "interesting";
  sourceSelect.value = "all";
  state.requestedSource = briefing.source || "all";
  if (state.countries.some((country) => country.id === briefing.country)) {
    countrySelect.value = briefing.country;
  }
  if (state.categories.includes(briefing.category)) {
    categorySelect.value = briefing.category;
  }
  applyTranslations();
  updateCountryButton();
  syncCategoryPicker();
  syncSortPicker();
  updateUrlState();
  loadNews();
}

function removeSavedBriefing(briefingId) {
  writeSavedBriefings(readSavedBriefings().filter((briefing) => briefing.id !== briefingId));
  renderSavedBriefings();
  loadBriefingRadar();
  showToast(briefingText("briefingRemoved"));
}

function saveCurrentBriefing() {
  const draft = currentBriefingDraft();
  const briefings = readSavedBriefings();

  if (briefings.some((briefing) => sameBriefing(briefing, draft))) {
    showToast(briefingText("briefingAlreadySaved"));
    return;
  }

  writeSavedBriefings([{
    id: `briefing-${Date.now()}`,
    ...draft,
    createdAt: new Date().toISOString()
  }, ...briefings]);
  renderSavedBriefings();
  loadBriefingRadar();
  showToast(briefingText("briefingSaved"));
}

function renderSavedBriefings() {
  if (!savedBriefingsGrid) return;
  const briefings = readSavedBriefings();
  const current = currentBriefingDraft();
  savedBriefingsGrid.innerHTML = "";

  if (!briefings.length) {
    savedBriefingsGrid.innerHTML = `<div class="saved-briefing-empty">${briefingText("savedBriefingsEmpty")}</div>`;
    return;
  }

  briefings.forEach((briefing) => {
    const card = document.createElement("article");
    const active = sameBriefing(briefing, current);
    card.className = `saved-briefing-card${active ? " is-active" : ""}`;
    card.innerHTML = `
      <div class="saved-briefing-top">
        <span>${active ? briefingText("activeBriefing") : briefingText("briefingBadge")}</span>
        <strong>${escapeHtml(briefingLabel(briefing))}</strong>
      </div>
      <p>${escapeHtml(briefingMeta(briefing))}</p>
      <div class="saved-briefing-actions">
        <button type="button" class="saved-briefing-open">${briefingText("openBriefing")}</button>
        <button type="button" class="saved-briefing-share">${briefingText("shareSavedBriefing")}</button>
        <button type="button" class="saved-briefing-remove">${briefingText("removeBriefing")}</button>
      </div>
    `;
    card.querySelector(".saved-briefing-open").addEventListener("click", () => applySavedBriefing(briefing));
    card.querySelector(".saved-briefing-share").addEventListener("click", () => shareBriefing(briefing));
    card.querySelector(".saved-briefing-remove").addEventListener("click", () => removeSavedBriefing(briefing.id));
    savedBriefingsGrid.appendChild(card);
  });
}

function renderReturningFeed() {
  if (!returningFeedSection || !returningFeedGrid || !returningMeta) return;

  const hasPreviousVisit = Boolean(state.returningLastVisitedAt);
  const hasStories = state.returningStories.length > 0;
  const shouldShow = hasPreviousVisit && !state.returningDismissed;

  returningFeedSection.hidden = !shouldShow;
  returningFeedGrid.innerHTML = "";
  returningMeta.innerHTML = "";

  if (!shouldShow) return;

  if (returningKicker) returningKicker.textContent = returningText("kicker");
  if (returningTitle) returningTitle.textContent = hasStories ? returningText("title") : returningText("allCaughtUp");
  if (returningSummary) {
    returningSummary.textContent = hasStories ? returningText("intro") : returningText("summary");
  }
  if (returningDismiss) returningDismiss.textContent = returningText("hide");

  const lastSeen = formatDate(state.returningLastVisitedAt);
  const countText = state.returningStories.length === 1
    ? returningText("countOne").replace("{time}", lastSeen)
    : returningText("countMany").replace("{count}", String(state.returningStories.length)).replace("{time}", lastSeen);
  returningMeta.innerHTML = `
    <span class="returning-count">${hasStories ? countText : returningText("allCaughtUp")}</span>
    <span class="returning-visit">${hasStories ? briefingLabel(currentBriefingDraft()) : `Last visit ${lastSeen}`}</span>
  `;

  if (!hasStories) {
    returningFeedGrid.innerHTML = `<div class="saved-briefing-empty">${returningText("summary")}</div>`;
    return;
  }

  state.returningStories.forEach((article) => {
    const card = document.createElement("article");
    card.className = "returning-story-card";
    card.innerHTML = `
      <div class="returning-story-top">
        <span>${returningText("fresh")}</span>
        <strong>${escapeHtml(article.title)}</strong>
      </div>
      <p>${escapeHtml(article.summary || "Open the original report for more details and context.")}</p>
      <div class="returning-story-meta">
        <small>${escapeHtml(article.source?.name || "Unknown source")}</small>
        <small>${escapeHtml(formatDate(article.publishedAt))}</small>
      </div>
      <a class="saved-briefing-open" href="${articleLink(article)}">Read update</a>
    `;
    returningFeedGrid.appendChild(card);
  });
}

function readMyNewsPreferences() {
  try {
    const preferences = JSON.parse(localStorage.getItem(MY_NEWS_KEY) || "{}");
    return {
      countries: Array.isArray(preferences.countries) ? preferences.countries : [],
      categories: Array.isArray(preferences.categories) ? preferences.categories : []
    };
  } catch {
    return { countries: [], categories: [] };
  }
}

function writeMyNewsPreferences(preferences) {
  try {
    localStorage.setItem(MY_NEWS_KEY, JSON.stringify({
      countries: [...new Set(preferences.countries || [])].slice(0, 8),
      categories: [...new Set(preferences.categories || [])].slice(0, 8)
    }));
  } catch {}
}

function toggleMyNewsPreference(type, value) {
  if (!value || value === "world") return;
  const preferences = readMyNewsPreferences();
  const list = preferences[type] || [];
  preferences[type] = list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
  writeMyNewsPreferences(preferences);
  renderMyNews();
}

function countryNameById(countryId) {
  return state.countries.find((country) => country.id === countryId)?.name || countryId;
}

function articleMatchesMyNews(article, preferences) {
  const articleCountry = String(article.countryCode || "").toLowerCase();
  return preferences.countries.includes(articleCountry) || preferences.categories.includes(article.category);
}

function interestMatchesArticle(article, type, value) {
  if (type === "countries") {
    return String(article.countryCode || "").toLowerCase() === String(value || "").toLowerCase();
  }
  return article.category === value;
}

function interestBriefing(type, value) {
  return {
    country: type === "countries" ? value : "world",
    category: type === "categories" ? value : "top",
    language: languageSelect.value || "en",
    sort: "interesting",
    source: "all",
    query: ""
  };
}

function interestLabel(type, value) {
  return type === "countries" ? countryNameById(value) : normalizeCategory(value);
}

function interestDigestItems(preferences) {
  const interests = [
    ...preferences.countries.map((value) => ({ type: "countries", value })),
    ...preferences.categories.map((value) => ({ type: "categories", value }))
  ];

  return interests
    .map((interest) => {
      const items = sortArticles(state.articles.filter((article) => interestMatchesArticle(article, interest.type, interest.value))).slice(0, 3);
      return {
        ...interest,
        label: interestLabel(interest.type, interest.value),
        kind: interest.type === "countries" ? myNewsText("digestCountry") : myNewsText("digestTopic"),
        briefing: interestBriefing(interest.type, interest.value),
        items
      };
    })
    .sort((a, b) => {
      const itemGap = b.items.length - a.items.length;
      if (itemGap) return itemGap;
      return a.label.localeCompare(b.label);
    });
}

function renderMyNewsDigest(preferences) {
  if (!myNewsDigest || !myNewsDigestGrid) return;
  const hasPreferences = preferences.countries.length || preferences.categories.length;
  myNewsDigest.hidden = !hasPreferences;
  myNewsDigestGrid.innerHTML = "";

  if (!hasPreferences) return;

  interestDigestItems(preferences).forEach((interest) => {
    const lead = interest.items[0];
    const countLabel = interest.items.length === 1
      ? myNewsText("digestCountOne")
      : interest.items.length > 1
        ? myNewsText("digestCountMany").replace("{count}", String(interest.items.length))
        : myNewsText("digestNoStories");

    const card = document.createElement("article");
    card.className = "my-news-digest-card";
    card.innerHTML = `
      <div class="my-news-digest-top">
        <span>${escapeHtml(interest.kind)}</span>
        <small>${escapeHtml(countLabel)}</small>
      </div>
      <strong>${escapeHtml(interest.label)}</strong>
      <div class="my-news-digest-story">
        <span>${escapeHtml(myNewsText("digestLead"))}</span>
        <strong>${escapeHtml(lead?.title || myNewsText("digestNoStories"))}</strong>
        <small>${escapeHtml(lead ? `${lead.source?.name || "Source"} Â· ${formatDate(lead.publishedAt)}` : myNewsText("digestFallbackMeta"))}</small>
      </div>
      <div class="my-news-digest-actions">
        <button type="button" class="my-news-digest-open">${escapeHtml(myNewsText("digestOpen"))}</button>
        <button type="button" class="my-news-digest-share">${escapeHtml(myNewsText("digestShare"))}</button>
      </div>
    `;
    card.querySelector(".my-news-digest-open").addEventListener("click", () => applySavedBriefing(interest.briefing));
    card.querySelector(".my-news-digest-share").addEventListener("click", () => shareBriefing(interest.briefing));
    myNewsDigestGrid.appendChild(card);
  });
}

function renderPreferenceChip(type, value) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "my-news-chip";
  button.textContent = type === "countries" ? countryNameById(value) : normalizeCategory(value);
  button.setAttribute("aria-label", `Remove ${button.textContent} from My News`);
  button.addEventListener("click", () => toggleMyNewsPreference(type, value));
  return button;
}

function renderMyNews() {
  if (!myNewsSection || !myNewsPreferences || !myNewsGrid) return;
  const preferences = readMyNewsPreferences();
  const hasPreferences = preferences.countries.length || preferences.categories.length;
  const matches = hasPreferences
    ? sortArticles(state.articles.filter((article) => articleMatchesMyNews(article, preferences))).slice(0, 6)
    : [];

  myNewsPreferences.innerHTML = "";
  if (myNewsDigestGrid) myNewsDigestGrid.innerHTML = "";
  myNewsGrid.innerHTML = "";
  [...preferences.countries.map((value) => ["countries", value]), ...preferences.categories.map((value) => ["categories", value])]
    .forEach(([type, value]) => myNewsPreferences.appendChild(renderPreferenceChip(type, value)));
  renderMyNewsDigest(preferences);

  const country = currentCountry();
  if (followCountryButton) {
    const countryId = country?.id || "world";
    const followed = preferences.countries.includes(countryId);
    followCountryButton.textContent = followed ? `Following ${country.name}` : countryId === "world" ? "Choose a country to follow" : `Follow ${country.name}`;
    followCountryButton.disabled = countryId === "world";
  }
  if (followCategoryButton) {
    const category = categorySelect.value || "top";
    const followed = preferences.categories.includes(category);
    followCategoryButton.textContent = followed ? `Following ${normalizeCategory(category)}` : `Follow ${normalizeCategory(category)}`;
  }

  if (myNewsSummary) {
    myNewsSummary.textContent = hasPreferences
      ? matches.length
        ? myNewsText("summaryMatches").replace("{count}", String(matches.length))
        : myNewsText("summaryWaiting")
      : myNewsText("intro");
  }

  if (!hasPreferences) {
    if (myNewsDigest) myNewsDigest.hidden = true;
    myNewsGrid.innerHTML = `<div class="my-news-empty">${myNewsText("emptyStart")}</div>`;
    return;
  }

  if (!matches.length) {
    myNewsGrid.innerHTML = `<div class="my-news-empty">${myNewsText("emptyWaiting")}</div>`;
    return;
  }

  matches.forEach((article) => {
    myNewsGrid.appendChild(createArticleCard(article, "my-news-card"));
  });
}

function savedArticleShape(article) {
  return {
    id: article.id,
    title: article.title,
    summary: article.summary,
    url: article.url,
    image: article.image,
    category: article.category,
    country: article.country,
    countryCode: article.countryCode,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt || article.publishedAt,
    interestScore: article.interestScore || 0,
    source: article.source,
    savedAt: new Date().toISOString()
  };
}

function readSavedStories() {
  try {
    const stories = JSON.parse(localStorage.getItem(SAVED_STORIES_KEY) || "[]");
    return Array.isArray(stories) ? stories.filter((story) => story && story.id && story.title) : [];
  } catch {
    return [];
  }
}

function writeSavedStories(stories) {
  try {
    localStorage.setItem(SAVED_STORIES_KEY, JSON.stringify(stories.slice(0, MAX_SAVED_STORIES)));
  } catch {}
}

function isArticleSaved(article) {
  return readSavedStories().some((story) => story.id === article.id);
}

function toggleSavedStory(article) {
  const saved = readSavedStories();
  const exists = saved.some((story) => story.id === article.id);
  const next = exists
    ? saved.filter((story) => story.id !== article.id)
    : [savedArticleShape(article), ...saved].slice(0, MAX_SAVED_STORIES);
  writeSavedStories(next);
  renderSavedStories();
  renderArticles();
  showToast(exists ? "Removed from saved stories" : "Saved for later");
}

function renderSavedStories() {
  if (!savedStoriesSection || !savedStoriesGrid) return;
  const stories = readSavedStories();
  savedStoriesGrid.innerHTML = "";
  savedStoriesSection.hidden = stories.length === 0;
  if (savedStoriesSummary) {
    savedStoriesSummary.textContent = stories.length
      ? `${stories.length} saved stor${stories.length === 1 ? "y" : "ies"} ready when you come back.`
      : "Stories you save will stay here for quick reading later.";
  }
  stories.forEach((story) => {
    savedStoriesGrid.appendChild(createArticleCard(story, "saved-card"));
  });
}

function readRecentStories() {
  try {
    const items = JSON.parse(localStorage.getItem(RECENT_STORIES_KEY) || "[]");
    return Array.isArray(items) ? items.filter((item) => item && item.id && item.title) : [];
  } catch {
    return [];
  }
}

function writeRecentStories(items) {
  try {
    localStorage.setItem(RECENT_STORIES_KEY, JSON.stringify(items.slice(0, MAX_RECENT_STORIES)));
  } catch {}
}

function renderContinueReading() {
  if (!continueReadingSection || !continueReadingGrid) return;
  const stories = readRecentStories();
  continueReadingGrid.innerHTML = "";
  continueReadingSection.hidden = stories.length === 0;
  if (continueReadingSummary) {
    continueReadingSummary.textContent = stories.length ? currentText().continueSummary : currentText().continueEmpty;
  }
  if (!stories.length) return;

  stories.forEach((story) => {
    continueReadingGrid.appendChild(createArticleCard(story, "continue-card"));
  });
}

function matchTimeLabel(match) {
  if (match.live) return match.clock || "Live";
  if (match.completed) return "Final";
  const date = new Date(match.date);
  if (Number.isNaN(date.getTime())) return match.statusLabel || "Scheduled";
  return date.toLocaleString([], { weekday: "short", hour: "numeric", minute: "2-digit" });
}

function matchStatusClass(match) {
  if (match.live) return "is-live";
  if (match.completed) return "is-final";
  return "is-upcoming";
}

function matchStageLabel(match) {
  const stage = `${match.stage || ""} ${match.name || ""}`.toLowerCase();
  if (stage.includes("3rd") || stage.includes("third")) return "3rd-place match";
  if (stage.includes("final")) return "Final";
  if (stage.includes("semi")) return "Semifinal";
  if (match.live) return "Live";
  if (match.completed) return "Final";
  return "Fixture";
}

function isFifaFinalStage(payload = state.fifaScorePayload) {
  const stageText = `${payload?.stageName || ""} ${(payload?.matches || []).map((match) => `${match.stage || ""} ${match.name || ""}`).join(" ")}`.toLowerCase();
  const calendarText = (payload?.calendar || [])
    .filter((entry) => isFinalWeekendEntry(entry))
    .map((entry) => `${entry.label} ${entry.detail}`)
    .join(" ")
    .toLowerCase();
  return /3rd-place|third-place|final/.test(stageText) || Boolean(calendarText);
}

function isFinalWeekendEntry(entry) {
  const label = String(entry?.label || "").toLowerCase();
  return label === "final" || label.includes("3rd-place") || label.includes("third-place");
}

function finalWeekendEntries(payload = state.fifaScorePayload) {
  const entries = (payload?.calendar || [])
    .filter((entry) => isFinalWeekendEntry(entry))
    .map((entry) => ({
      label: entry.label,
      detail: entry.detail || finalDateLabel(entry.startDate),
      date: entry.startDate
    }));
  if (entries.length) return entries;
  return [
    { label: "3rd-Place Match", detail: "Jul 18", date: "" },
    { label: "Final", detail: "Jul 19", date: "" }
  ];
}

function finalDateLabel(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

function confirmedWorldCupFinalMatch() {
  return {
    id: "fifa-2026-final-confirmed",
    name: "Spain v Argentina",
    shortName: "ESP v ARG",
    date: "2026-07-19T19:00:00Z",
    status: "pre",
    statusLabel: "Final",
    clock: "",
    stage: "FIFA World Cup Final",
    completed: false,
    live: false,
    venue: "New York New Jersey Stadium",
    broadcasts: [],
    home: {
      name: "Spain",
      shortName: "Spain",
      abbreviation: "ESP",
      logo: "https://a.espncdn.com/i/teamlogos/countries/500/esp.png",
      score: 0,
      winner: false
    },
    away: {
      name: "Argentina",
      shortName: "Argentina",
      abbreviation: "ARG",
      logo: "https://a.espncdn.com/i/teamlogos/countries/500/arg.png",
      score: 0,
      winner: false
    },
    link: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/final-live-watch-teams-tickets"
  };
}

function renderTeam(team, side) {
  return `
    <div class="fifa-team ${side}">
      <img src="${team.logo || "/favicon.svg"}" alt="" loading="lazy">
      <span>${escapeHtml(team.shortName || team.name)}</span>
      <strong>${Number(team.score || 0)}</strong>
    </div>
  `;
}

function fifaScoreNumber(team) {
  return Number(team?.score || 0);
}

function fifaPulseMatch(matches) {
  return matches.find((match) => match.live)
    || matches.find((match) => !match.completed)
    || matches.find((match) => match.completed)
    || null;
}

function fifaExcitementLevel(match) {
  if (!match) return 0;
  const homeScore = fifaScoreNumber(match.home);
  const awayScore = fifaScoreNumber(match.away);
  const totalGoals = homeScore + awayScore;
  const closeGame = Math.abs(homeScore - awayScore) <= 1;
  const lateClock = /8[0-9]|9[0-9]|ET|stoppage|pen/i.test(`${match.clock || ""} ${match.statusLabel || ""}`);
  let level = totalGoals * 16;
  if (match.live) level += 42;
  if (closeGame) level += 18;
  if (lateClock) level += 16;
  if (!match.live && !match.completed) level = 38;
  if (match.completed) level = Math.max(42, Math.min(88, level));
  return Math.max(22, Math.min(100, level));
}

function fifaMomentumShare(match) {
  const homeScore = fifaScoreNumber(match.home);
  const awayScore = fifaScoreNumber(match.away);
  if (homeScore === awayScore) return 50;
  return homeScore > awayScore ? 63 : 37;
}

function fifaPulseLabel(match) {
  if (match.live) return "Live Stadium Pulse";
  if (match.completed) return "Final Whistle";
  const stageLabel = matchStageLabel(match);
  if (/final|3rd-place/i.test(stageLabel)) return "Final Weekend Spotlight";
  return "Next Match Spotlight";
}

function fifaPulseStatus(match) {
  if (match.live) return match.clock || match.statusLabel || "Live now";
  if (match.completed) return "Final";
  return matchTimeLabel(match);
}

function renderFifaPulseTeam(team, side) {
  return `
    <div class="fifa-pulse-team ${side}">
      <img src="${team.logo || "/favicon.svg"}" alt="" loading="lazy">
      <span>${escapeHtml(team.shortName || team.name)}</span>
      <strong>${fifaScoreNumber(team)}</strong>
    </div>
  `;
}

function renderFifaMatchPulse(matches) {
  if (!fifaMatchPulse) return;
  const match = fifaPulseMatch(matches);
  if (!match) {
    fifaMatchPulse.hidden = true;
    fifaMatchPulse.innerHTML = "";
    return;
  }

  const excitement = fifaExcitementLevel(match);
  const homeShare = fifaMomentumShare(match);
  const awayShare = 100 - homeShare;
  const sourceLink = match.link || fifaSource?.href || "https://www.espn.com/soccer/scoreboard/_/league/fifa.world";
  const broadcast = match.broadcasts?.join(", ") || match.statusLabel || "Match feed";
  const pulseClass = match.live ? "is-live" : match.completed ? "is-final" : "is-upcoming";

  fifaMatchPulse.hidden = false;
  fifaMatchPulse.className = `fifa-match-pulse ${pulseClass}`;
  fifaMatchPulse.innerHTML = `
    <div class="fifa-pulse-main">
      <div class="fifa-pulse-copy">
        <span class="fifa-pulse-kicker">
          ${match.live ? `<i aria-hidden="true"></i>` : ""}
          ${fifaPulseLabel(match)}
        </span>
        <h3>${escapeHtml(match.shortName || match.name || "FIFA match")}</h3>
        <p>${escapeHtml(match.venue || "Venue TBA")} · ${escapeHtml(broadcast)}</p>
      </div>
      <div class="fifa-pulse-scoreboard" aria-label="${escapeHtml(match.shortName || match.name || "FIFA score")}">
        ${renderFifaPulseTeam(match.home, "home")}
        <div class="fifa-pulse-clock">
          <span>${escapeHtml(fifaPulseStatus(match))}</span>
          <small>${match.live ? "Live" : match.completed ? "Result" : "Kickoff"}</small>
        </div>
        ${renderFifaPulseTeam(match.away, "away")}
      </div>
    </div>
    <div class="fifa-pulse-details">
      <div class="fifa-pulse-meter">
        <div>
          <span>Match heat</span>
          <strong>${excitement}%</strong>
        </div>
        <b aria-hidden="true"><i style="width:${excitement}%"></i></b>
      </div>
      <div class="fifa-pulse-momentum" aria-label="Score momentum">
        <span>${escapeHtml(match.home.shortName || match.home.name)}</span>
        <b aria-hidden="true">
          <i class="home" style="width:${homeShare}%"></i>
          <i class="away" style="width:${awayShare}%"></i>
        </b>
        <span>${escapeHtml(match.away.shortName || match.away.name)}</span>
      </div>
      <a class="fifa-pulse-link" href="${escapeHtml(sourceLink)}" target="_blank" rel="noopener noreferrer">Match details</a>
    </div>
  `;
}

function captainForTeam(team) {
  if (!team) return null;
  const captains = state.fifaCaptains || {};
  return captains[team.abbreviation] || captains[team.name] || captains[team.shortName] || null;
}

function generatedCaptainName(team) {
  return `${team.shortName || team.name || "Team"} Captain`;
}

function teamJerseyColors(team) {
  const palettes = {
    ARG: ["#75aadb", "#ffffff", "#f6c544"],
    AUS: ["#0a6b44", "#ffcd00", "#ffffff"],
    BRA: ["#f7dd2d", "#129447", "#174ea6"],
    CAN: ["#d80621", "#ffffff", "#111827"],
    ENG: ["#ffffff", "#c8102e", "#172554"],
    FRA: ["#1d3f8f", "#ffffff", "#d0182d"],
    GER: ["#ffffff", "#111827", "#d4af37"],
    HAI: ["#0f4caa", "#d21034", "#ffffff"],
    JPN: ["#174ea6", "#ffffff", "#e6002d"],
    MAR: ["#c1272d", "#006233", "#ffffff"],
    MEX: ["#006847", "#ce1126", "#ffffff"],
    SCO: ["#005eb8", "#ffffff", "#111827"],
    TUR: ["#e30a17", "#ffffff", "#111827"],
    USA: ["#1f3c88", "#c8102e", "#ffffff"]
  };
  return palettes[team.abbreviation] || ["#1d4ed8", "#ef4444", "#ffffff"];
}

function renderGeneratedJersey(team, captainName) {
  const abbreviation = escapeHtml(team.abbreviation || (team.shortName || team.name || "FC").slice(0, 3).toUpperCase());
  const [primary, secondary, trim] = teamJerseyColors(team);
  const label = escapeHtml(`Generated ${captainName} jersey`);
  return `
    <svg class="fifa-captain-jersey" viewBox="0 0 92 92" role="img" aria-label="${label}" focusable="false">
      <defs>
        <linearGradient id="jersey-main-${abbreviation}" x1="10%" x2="92%" y1="6%" y2="92%">
          <stop offset="0%" stop-color="${trim}" stop-opacity="0.92"></stop>
          <stop offset="22%" stop-color="${primary}"></stop>
          <stop offset="100%" stop-color="${secondary}"></stop>
        </linearGradient>
        <linearGradient id="jersey-shine-${abbreviation}" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.42"></stop>
          <stop offset="38%" stop-color="#ffffff" stop-opacity="0.08"></stop>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.18"></stop>
        </linearGradient>
        <filter id="jersey-shadow-${abbreviation}" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="8" stdDeviation="7" flood-color="#020617" flood-opacity="0.32"></feDropShadow>
        </filter>
      </defs>
      <path filter="url(#jersey-shadow-${abbreviation})" d="M29 10h34l10 7 12 8-10 22-10-5v36c0 4-3 7-7 7H34c-4 0-7-3-7-7V42l-10 5L7 25l12-8 10-7Z" fill="url(#jersey-main-${abbreviation})"></path>
      <path d="M31 10c3 9 8 14 15 14s12-5 15-14" fill="none" stroke="${trim}" stroke-width="6" stroke-linecap="round"></path>
      <path d="M28 15l-9 7 8 15M64 15l9 7-8 15" fill="none" stroke="${trim}" stroke-opacity="0.72" stroke-width="3" stroke-linecap="round"></path>
      <path d="M34 28c6 4 18 4 24 0M35 47h22M36 61h20" fill="none" stroke="#ffffff" stroke-opacity="0.16" stroke-width="3" stroke-linecap="round"></path>
      <path d="M27 18c8 7 14 17 17 31 2 12 1 23-3 34H34c-4 0-7-3-7-7V42l-10 5L7 25l12-8 10-7-2 8Z" fill="url(#jersey-shine-${abbreviation})" opacity="0.82"></path>
      <rect x="55" y="37" width="24" height="15" rx="7.5" fill="${trim}" stroke="#ffffff" stroke-opacity="0.7"></rect>
      <text x="67" y="48" text-anchor="middle" fill="${secondary}" font-size="11" font-weight="900" font-family="Arial, sans-serif">C</text>
      <circle cx="46" cy="47" r="15" fill="#ffffff" opacity="0.18"></circle>
      <text x="46" y="51" text-anchor="middle" fill="#ffffff" font-size="15" font-weight="900" font-family="Arial, sans-serif">${abbreviation}</text>
    </svg>
  `;
}

function renderCaptainCard(team) {
  const captain = captainForTeam(team);
  const hasPhoto = captain?.image;
  const captainName = captain?.name || generatedCaptainName(team);
  const image = captain?.image || "";
  const alt = hasPhoto ? `${captain.name} captain of ${team.name}` : "";

  return `
    <div class="fifa-captain-card${hasPhoto ? "" : " is-fallback"}">
      ${hasPhoto
        ? `<img src="${image}" alt="${escapeHtml(alt)}" loading="lazy">`
        : renderGeneratedJersey(team, captainName)}
      <span>
        <small>${escapeHtml(team.shortName || team.name)}</small>
        <strong>${escapeHtml(captainName)}</strong>
      </span>
    </div>
  `;
}

function renderCaptainSpotlight(match) {
  if (!match.live) return "";
  return `
    <div class="fifa-captains" aria-label="Live match captain spotlight">
      <div class="fifa-captains-title">
        <span>Captain spotlight</span>
        <small>Live match</small>
      </div>
      <div class="fifa-captain-grid">
        ${renderCaptainCard(match.home)}
        ${renderCaptainCard(match.away)}
      </div>
    </div>
  `;
}

function renderFifaScores(payload) {
  if (!fifaScoreGrid || !fifaStatus) return;
  fifaScoreGrid.innerHTML = "";
  state.fifaScorePayload = payload;
  const matches = payload.matches || [];
  const liveCount = matches.filter((match) => match.live).length;
  const finalStage = isFifaFinalStage(payload);

  if (fifaTitle) fifaTitle.textContent = finalStage ? "World Cup Final Weekend" : payload.league || "FIFA World Cup scores";
  if (fifaSummary) {
    fifaSummary.textContent = finalStage
      ? "Only the final-stage games remain. Follow the 3rd-place match and the championship final with live refresh."
      : liveCount
        ? `${liveCount} match${liveCount === 1 ? " is" : "es are"} live now. Scores refresh automatically.`
        : "Live, upcoming, and final FIFA matches refresh automatically.";
  }
  fifaStatus.textContent = fifaUpdatedLabel(payload);
  if (fifaSource && payload.sourceUrl) fifaSource.href = payload.sourceUrl;
  renderFifaMatchPulse(matches);
  if (state.fifaTeamPayload) renderFifaTeams(state.fifaTeamPayload);

  if (!matches.length) {
    fifaScoreGrid.innerHTML = `<div class="fifa-empty">No FIFA matches are listed right now. Check back soon for the next fixture.</div>`;
    return;
  }

  matches.slice(0, 6).forEach((match) => {
    const card = document.createElement("article");
    card.className = `fifa-card ${matchStatusClass(match)}`;
    card.innerHTML = `
      <div class="fifa-card-top">
        <span>${escapeHtml(matchStageLabel(match))}</span>
        <time datetime="${match.date}">${matchTimeLabel(match)}</time>
      </div>
      ${renderTeam(match.home, "home")}
      ${renderTeam(match.away, "away")}
      ${renderCaptainSpotlight(match)}
      <div class="fifa-card-bottom">
        <span>${match.venue || "Venue TBA"}</span>
        <span>${match.broadcasts?.join(", ") || match.statusLabel || ""}</span>
      </div>
    `;
    fifaScoreGrid.appendChild(card);
  });
}

async function loadFifaCaptains() {
  try {
    const response = await fetch("/data/fifa-captains.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Captain data unavailable");
    const captains = await response.json();
    state.fifaCaptains = captains && typeof captains === "object" ? captains : {};
  } catch {
    state.fifaCaptains = {};
  }
}

function fifaUpdatedLabel(payload) {
  const time = new Date(payload.updatedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  return `Updated ${time}${payload.cached ? " | cached" : ""}`;
}

function renderFifaTeamRow(team, maxPoints) {
  const pointsPercent = maxPoints > 0 ? Math.max(8, Math.round((team.points / maxPoints) * 100)) : 8;
  return `
    <tr>
      <td class="fifa-rank" data-label="Rank">${team.rank || "-"}</td>
      <td class="fifa-country-cell">
        <img src="${team.logo || "/favicon.svg"}" alt="" loading="lazy">
        <span>
          <strong>${escapeHtml(team.shortName || team.name)}</strong>
          <small>${escapeHtml(team.abbreviation || team.name || "")}</small>
        </span>
      </td>
      <td data-label="Played">${team.played}</td>
      <td data-label="Wins">${team.wins}</td>
      <td data-label="Draws">${team.draws}</td>
      <td data-label="Losses">${team.losses}</td>
      <td data-label="Goal diff">${escapeHtml(String(team.goalDifference))}</td>
      <td class="fifa-points" data-label="Points">
        <strong>${team.points}</strong>
        <span aria-hidden="true"><i style="width:${pointsPercent}%"></i></span>
      </td>
    </tr>
  `;
}

function renderWallGroup(group) {
  return `
    <section class="wall-group">
      <div class="wall-group-title">
        <strong>${escapeHtml(group.name)}</strong>
        <span>Table</span>
      </div>
      ${group.teams.map((team) => {
        return `
          <div class="wall-team">
            <b>${team.rank || "-"}</b>
            <img src="${team.logo || "/favicon.svg"}" alt="" loading="lazy">
            <span>
              <strong>${escapeHtml(team.abbreviation || team.shortName || team.name)}</strong>
              <small>${team.wins}-${team.draws}-${team.losses} · GD ${escapeHtml(String(team.goalDifference))}</small>
            </span>
            <em>${team.points}</em>
          </div>
        `;
      }).join("")}
    </section>
  `;
}

function renderWallSlot(label) {
  return `
    <div class="wall-slot">
      <span>${escapeHtml(label)}</span>
      <strong>TBD</strong>
    </div>
  `;
}

function matchForFinalEntry(entry, matches) {
  const label = (entry.label || "").toLowerCase();
  const match = matches.find((match) => {
    const text = `${match.stage || ""} ${match.name || ""} ${match.shortName || ""}`.toLowerCase();
    if (label.includes("3rd") || label.includes("third")) return text.includes("3rd") || text.includes("third");
    if (label.includes("final")) return text.includes("final") && !text.includes("semi") && !text.includes("3rd");
    return false;
  });
  if (match) return match;
  if (label === "final") return confirmedWorldCupFinalMatch();
  return null;
}

function renderFinalWeekendPanel(payload = state.fifaScorePayload) {
  const matches = payload?.matches || [];
  const entries = finalWeekendEntries(payload);
  return `
    <div class="wall-final-weekend" aria-label="World Cup final weekend games">
      <div class="wall-final-weekend-title">
        <span>Final games only</span>
        <strong>Final Weekend</strong>
      </div>
      <div class="wall-final-games">
        ${entries.map((entry) => {
          const match = matchForFinalEntry(entry, matches);
          if (!match) {
            return `
              <article class="wall-final-game is-pending">
                <span>${escapeHtml(entry.label)}</span>
                <strong>Teams pending</strong>
                <small>${escapeHtml(entry.detail || "Schedule TBA")}</small>
              </article>
            `;
          }
          return `
            <article class="wall-final-game ${matchStatusClass(match)}">
              <span>${escapeHtml(matchStageLabel(match))}</span>
              <div class="wall-final-teams">
                <img src="${match.home.logo || "/favicon.svg"}" alt="" loading="lazy">
                <strong>${escapeHtml(match.home.shortName || match.home.name)}</strong>
                <b>${fifaScoreNumber(match.home)}</b>
                <em>vs</em>
                <b>${fifaScoreNumber(match.away)}</b>
                <strong>${escapeHtml(match.away.shortName || match.away.name)}</strong>
                <img src="${match.away.logo || "/favicon.svg"}" alt="" loading="lazy">
              </div>
              <small>${escapeHtml(matchTimeLabel(match))} · ${escapeHtml(match.venue || "Venue TBA")}</small>
            </article>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function ensureFifaFinalWeekendStyles() {
  if (document.querySelector("#fifa-final-weekend-styles")) return;
  const style = document.createElement("style");
  style.id = "fifa-final-weekend-styles";
  style.textContent = `
    .wall-final-weekend{display:grid;gap:12px;padding:14px;border:1px solid rgba(255,255,255,.28);border-radius:18px;background:rgba(15,23,42,.86);color:#fff;box-shadow:0 18px 38px rgba(15,23,42,.28)}
    .wall-final-weekend-title{display:flex;align-items:baseline;justify-content:space-between;gap:12px}
    .wall-final-weekend-title span{color:#fecaca;font-size:11px;font-weight:950;text-transform:uppercase}
    .wall-final-weekend-title strong{font-family:Georgia,"Times New Roman",serif;font-size:28px;line-height:1}
    .wall-final-games{display:grid;gap:10px}
    .wall-final-game{display:grid;gap:9px;padding:12px;border:1px solid rgba(255,255,255,.18);border-radius:14px;background:rgba(255,255,255,.1)}
    .wall-final-game.is-upcoming{border-color:rgba(250,204,21,.46);background:linear-gradient(135deg,rgba(250,204,21,.14),rgba(255,255,255,.08))}
    .wall-final-game.is-live{border-color:rgba(248,113,113,.68);box-shadow:0 0 0 1px rgba(248,113,113,.2)}
    .wall-final-game.is-pending{border-style:dashed;color:rgba(255,255,255,.72)}
    .wall-final-game>span{color:#fef08a;font-size:11px;font-weight:950;text-transform:uppercase}
    .wall-final-game>strong{font-size:20px}
    .wall-final-game small{color:rgba(255,255,255,.68);font-size:11px;font-weight:850}
    .wall-final-teams{display:grid;grid-template-columns:28px minmax(0,1fr) auto 26px auto minmax(0,1fr) 28px;gap:8px;align-items:center}
    .wall-final-teams img{width:28px;height:28px;border-radius:50%;object-fit:contain;background:#fff;padding:2px}
    .wall-final-teams strong{overflow:hidden;font-size:13px;text-overflow:ellipsis;white-space:nowrap}
    .wall-final-teams b{font-size:20px}
    .wall-final-teams em{display:grid;width:26px;height:26px;place-items:center;border-radius:50%;background:rgba(255,255,255,.12);color:rgba(255,255,255,.72);font-size:10px;font-style:normal;font-weight:950;text-transform:uppercase}
    .wall-center.is-final-weekend{align-content:center}
    .wall-center.is-final-weekend .wall-final-weekend{min-height:280px;align-content:center}
  `;
  document.head.appendChild(style);
}

function renderBracketColumn(title, labels) {
  return `
    <div class="wall-round">
      <h5>${title}</h5>
      ${labels.map((label) => `
        <div class="wall-match">
          ${renderWallSlot(label[0])}
          ${renderWallSlot(label[1])}
        </div>
      `).join("")}
    </div>
  `;
}

function renderFifaWallChart(groups) {
  const leftGroups = groups.slice(0, Math.ceil(groups.length / 2));
  const rightGroups = groups.slice(Math.ceil(groups.length / 2));
  const finalStage = isFifaFinalStage();
  if (finalStage) ensureFifaFinalWeekendStyles();
  fifaTeamChart.className = `fifa-wall-chart${finalStage ? " is-final-only" : ""}`;
  const wallCenter = finalStage
    ? `
      <div class="wall-center is-final-weekend">
        ${renderFinalWeekendPanel()}
        <div class="wall-trophy">
          <span>Road to</span>
          <strong>Champion</strong>
          <small>Final-stage games</small>
        </div>
      </div>
    `
    : `
      <div class="wall-center">
        <div class="wall-trophy">
          <span>Road to</span>
          <strong>Final</strong>
          <small>Official qualifiers pending</small>
        </div>
        <div class="wall-bracket">
          ${renderBracketColumn("Round of 32", [["A1", "B2"], ["C1", "D2"], ["E1", "F2"], ["G1", "H2"]])}
          ${renderBracketColumn("Round of 16", [["R32 winner", "R32 winner"], ["R32 winner", "R32 winner"]])}
          <div class="wall-final-path">
            <div class="wall-stage">Quarter-finals</div>
            <div class="wall-stage">Semi-finals</div>
            <div class="wall-final-box">
              <span>Final</span>
              <strong>Champion TBD</strong>
            </div>
            <div class="wall-stage">Third place</div>
          </div>
          ${renderBracketColumn("Round of 16", [["R32 winner", "R32 winner"], ["R32 winner", "R32 winner"]])}
          ${renderBracketColumn("Round of 32", [["I1", "J2"], ["K1", "L2"], ["Best 3rd", "Group winner"], ["Best 3rd", "Group winner"]])}
        </div>
      </div>
    `;
  fifaTeamChart.innerHTML = `
    <div class="wall-poster-head">
      <div>
        <span>FIFA World Cup</span>
        <strong>${finalStage ? "Final Weekend Wall Chart" : "Interactive Wall Chart"}</strong>
        <small>${finalStage ? "Only the remaining final-stage matches are shown with live refresh." : "Group tables are live. Knockout bracket stays pending until official qualifiers are confirmed."}</small>
      </div>
      <em>${finalStage ? "2 final-stage matches" : `${groups.length} groups · ${groups.reduce((sum, group) => sum + (group.teams?.length || 0), 0)} teams`}</em>
    </div>
    ${finalStage ? "" : `<div class="wall-side wall-left">${leftGroups.map(renderWallGroup).join("")}</div>`}
    ${wallCenter}
    ${finalStage ? "" : `<div class="wall-side wall-right">${rightGroups.map(renderWallGroup).join("")}</div>`}
  `;
}

function renderFifaTeams(payload) {
  if (!fifaTeamChart || !fifaChartMeta) return;
  const groups = payload.groups || [];
  fifaTeamChart.innerHTML = "";
  state.fifaTeamPayload = payload;
  const finalStage = isFifaFinalStage();
  fifaChartMeta.textContent = groups.length
    ? `${finalStage ? "Final weekend" : `${payload.totalTeams || 0} country teams`} | ${fifaUpdatedLabel(payload)}`
    : "No World Cup chart data is available right now.";

  if (!groups.length) {
    fifaTeamChart.innerHTML = `<div class="fifa-empty">World Cup team chart is unavailable right now. Check back soon.</div>`;
    return;
  }

  renderFifaWallChart(groups);
}

function holidayDateLabel(value) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value || "Date TBA";
  return date.toLocaleDateString([], { month: "short", day: "numeric", weekday: "short" });
}

function calendarMonthLabel(date, payload) {
  const gregorian = date.toLocaleDateString([], { month: "long", year: "numeric" });
  if (payload.countryCode === "np") {
    return `${gregorian} | Nepal calendar`;
  }
  return gregorian;
}

function calendarHolidayMap(payload) {
  const map = new Map();
  (payload.allHolidays || payload.holidays || []).forEach((holiday) => {
    if (!map.has(holiday.date)) map.set(holiday.date, []);
    map.get(holiday.date).push(holiday);
  });
  return map;
}

function sameCalendarDay(a, b) {
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();
}

function isoLocalDate(date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function renderMonthGrid(payload) {
  const viewDate = state.calendarDate;
  const first = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const start = new Date(first);
  start.setDate(first.getDate() - first.getDay());
  const today = new Date(`${payload.isoDate || isoLocalDate(new Date())}T00:00:00`);
  const holidayMap = calendarHolidayMap(payload);
  const days = [];

  for (let index = 0; index < 42; index += 1) {
    const day = new Date(start);
    day.setDate(start.getDate() + index);
    const iso = isoLocalDate(day);
    const events = holidayMap.get(iso) || [];
    days.push(`
      <article class="month-day${day.getMonth() !== viewDate.getMonth() ? " is-muted" : ""}${sameCalendarDay(day, today) ? " is-today" : ""}${events.length ? " has-event" : ""}">
        <span>${day.toLocaleDateString([], { weekday: "short" })}</span>
        <strong>${day.getDate()}</strong>
        ${events.slice(0, 2).map((event) => `<small>${escapeHtml(event.localName || event.name)}</small>`).join("")}
      </article>
    `);
  }

  return `
    <div class="month-weekdays">
      ${["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => `<span>${day}</span>`).join("")}
    </div>
    <div class="month-grid">${days.join("")}</div>
  `;
}

function renderHolidayAgenda(payload) {
  const holidays = payload.holidays || [];
  if (!holidays.length) {
    return `
      <div class="calendar-side-empty">
        <strong>${payload.countryCode === "world" ? "Select a country" : "No holiday data"}</strong>
        <p>${escapeHtml(payload.warning || "Upcoming holidays will appear here when available.")}</p>
      </div>
    `;
  }

  return holidays.slice(0, 6).map((holiday) => `
    <article class="agenda-item">
      <time datetime="${holiday.date}">${escapeHtml(holidayDateLabel(holiday.date))}</time>
      <strong>${escapeHtml(holiday.localName || holiday.name)}</strong>
      <small>${escapeHtml(holiday.name || holiday.localName)}</small>
    </article>
  `).join("");
}

function renderCalendarTopics(payload) {
  const country = payload.country || "World";
  return `
    <article class="calendar-note-card">
      <span>Following</span>
      <strong>${escapeHtml(country)}</strong>
      <p>This calendar follows the country selected in the news filter.</p>
    </article>
    <article class="calendar-note-card">
      <span>Local date</span>
      <strong>${escapeHtml(payload.localDate || payload.isoDate || "Today")}</strong>
      <p>Dates are shown in a local-friendly format for the selected country.</p>
    </article>
    <article class="calendar-note-card">
      <span>Tip</span>
      <strong>Plan news around holidays</strong>
      <p>Holiday periods can explain local business, school, sports, and traffic patterns.</p>
    </article>
  `;
}

function renderCountryCalendar(payload) {
  if (!calendarTitle || !calendarSummary || !calendarStatus || !calendarGrid) return;
  const holidays = payload.holidays || [];
  if (!state.calendarDate || Number.isNaN(state.calendarDate.getTime())) {
    state.calendarDate = new Date(`${payload.isoDate || isoLocalDate(new Date())}T00:00:00`);
  }
  calendarTitle.textContent = payload.countryCode === "world"
    ? "World calendar"
    : `${payload.country} calendar`;
  calendarSummary.textContent = payload.countryCode === "world"
    ? "Choose a country to follow its local public holidays and calendar rhythm."
    : `Today in ${payload.country}: ${payload.localDate}`;
  calendarStatus.textContent = payload.warning
    ? `Calendar note: ${payload.source}`
    : `${holidays.length ? holidays.length : "No"} upcoming holidays | ${payload.source || "Local calendar"}`;

  calendarGrid.innerHTML = `
    <aside class="calendar-side calendar-agenda">
      <div class="calendar-panel-title">
        <span>Upcoming holidays</span>
      </div>
      ${renderHolidayAgenda(payload)}
    </aside>
    <section class="calendar-main">
      <div class="calendar-toolbar">
        <button type="button" class="calendar-nav" data-calendar-action="today">Today</button>
        <button type="button" class="calendar-nav" data-calendar-action="prev" aria-label="Previous month">‹</button>
        <strong>${escapeHtml(calendarMonthLabel(state.calendarDate, payload))}</strong>
        <button type="button" class="calendar-nav" data-calendar-action="next" aria-label="Next month">›</button>
      </div>
      ${renderMonthGrid(payload)}
    </section>
    <aside class="calendar-side calendar-notes">
      <div class="calendar-panel-title">
        <span>Country notes</span>
      </div>
      ${renderCalendarTopics(payload)}
    </aside>
  `;

  calendarGrid.querySelectorAll("[data-calendar-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.calendarAction;
      if (action === "today") {
        state.calendarDate = new Date(`${payload.isoDate || isoLocalDate(new Date())}T00:00:00`);
      } else if (action === "prev") {
        state.calendarDate = new Date(state.calendarDate.getFullYear(), state.calendarDate.getMonth() - 1, 1);
      } else if (action === "next") {
        state.calendarDate = new Date(state.calendarDate.getFullYear(), state.calendarDate.getMonth() + 1, 1);
      }
      renderCountryCalendar(payload);
    });
  });
}

async function loadCountryCalendar() {
  if (!calendarGrid || !calendarStatus) return;
  const country = countrySelect.value || "world";
  calendarStatus.textContent = "Refreshing country calendar...";
  try {
    const response = await fetch(`/api/country-calendar?country=${encodeURIComponent(country)}`);
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "Calendar unavailable");
    renderCountryCalendar(payload);
  } catch (error) {
    calendarStatus.textContent = `Country calendar unavailable: ${error.message}`;
    calendarGrid.innerHTML = `
      <article class="calendar-card calendar-empty">
        <span>Calendar</span>
        <strong>Try again soon</strong>
        <small>We could not load local calendar data right now.</small>
      </article>
    `;
  }
}

async function loadFifaScores() {
  if (!fifaScoreGrid || !fifaStatus) return;
  fifaStatus.textContent = "Refreshing FIFA scores...";
  try {
    const response = await fetch("/api/fifa-scores");
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.detail || payload.error || "Scores unavailable");
    renderFifaScores(payload);
  } catch (error) {
    fifaStatus.textContent = `FIFA scores unavailable: ${error.message}`;
    fifaScoreGrid.innerHTML = `<div class="fifa-empty">We could not load live scores right now. Try again in a moment.</div>`;
  }
}

async function loadFifaTeams() {
  if (!fifaTeamChart || !fifaChartMeta) return;
  fifaChartMeta.textContent = "Refreshing World Cup country chart...";
  try {
    const response = await fetch("/api/fifa-teams");
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.detail || payload.error || "Team chart unavailable");
    renderFifaTeams(payload);
  } catch (error) {
    fifaChartMeta.textContent = `FIFA team chart unavailable: ${error.message}`;
    fifaTeamChart.innerHTML = `<div class="fifa-empty">We could not load the World Cup country chart right now. Try again in a moment.</div>`;
  }
}

function startFifaScoreRefresh() {
  if (state.fifaTimer) clearInterval(state.fifaTimer);
  state.fifaTimer = setInterval(() => {
    if (document.visibilityState === "visible") {
      loadFifaScores();
      loadFifaTeams();
    }
  }, 60000);
}

function applyTranslations() {
  const text = currentText();
  const canonical = state.query ? "/" : window.location.pathname;
  if (window.NewsSeo) {
    NewsSeo.setPageMeta({
      title: `${text.categories[categorySelect.value] || "World"} News in ${currentCountry()?.name || "World"} | World Interesting News`,
      description: "Follow trusted global headlines by country, category, language, and source with original short briefs and clear source attribution.",
      canonical,
      robots: state.query ? "noindex, follow" : "index, follow, max-image-preview:large"
    });
    NewsSeo.setJsonLd("organization", NewsSeo.organizationJsonLd());
    NewsSeo.setJsonLd("website", NewsSeo.websiteJsonLd());
    NewsSeo.setJsonLd("breadcrumb", NewsSeo.breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: text.categories[categorySelect.value] || "Top Stories", url: "/" }
    ]));
  }
  document.querySelector(".brand small").textContent = text.subtitle;
  searchInput.placeholder = text.searchPlaceholder;
  searchForm.querySelector("button").textContent = text.search;
  document.querySelector('label[for="country-button"]').textContent = text.country;
  document.querySelector('label[for="category-button"]').textContent = text.category;
  document.querySelector('label[for="language-select"]').textContent = text.language;
  document.querySelector('label[for="sort-button"]').textContent = text.sort;
  document.querySelector('label[for="source-button"]').textContent = text.source;
  if (continueReadingKicker) continueReadingKicker.textContent = text.continueKicker;
  if (continueReadingTitle) continueReadingTitle.textContent = text.continueTitle;
  if (continueReadingSummary) continueReadingSummary.textContent = text.continueSummary;
  if (continueReadingClear) continueReadingClear.textContent = text.clearHistory;
  if (savedBriefingsKicker) savedBriefingsKicker.textContent = briefingText("savedBriefingsKicker");
  if (savedBriefingsTitle) savedBriefingsTitle.textContent = briefingText("savedBriefingsTitle");
  if (savedBriefingsSummary) savedBriefingsSummary.textContent = briefingText("savedBriefingsSummary");
  if (briefingRadar) {
    const radarTitle = briefingRadar.querySelector("h3");
    if (radarTitle) radarTitle.textContent = briefingText("radarTitle");
  }
  if (shareBriefingButton) shareBriefingButton.textContent = briefingText("shareBriefing");
  if (saveBriefingButton) saveBriefingButton.textContent = briefingText("saveBriefing");
  refreshButton.textContent = text.refresh;
  resetButton.textContent = text.reset;
  if (sourceSelect.options[0]) {
    sourceSelect.options[0].textContent = text.allSources;
  }

  Array.from(categorySelect.options).forEach((option) => {
    option.textContent = text.categories[option.value] || option.textContent;
  });
  Array.from(sortSelect.options).forEach((option) => {
    option.textContent = text.sorts[option.value] || option.textContent;
  });
  syncCategoryPicker();
  syncSortPicker();
  syncSourcePicker();
  renderCategoryNavigation();
  renderSavedBriefings();
  renderBriefingRadar();

  if (!state.articles.length) {
    updatedLabel.textContent = text.loading;
  } else {
    renderArticles();
    updateHeading({
      updatedAt: state.updatedAt,
      country: state.countryName,
      category: categorySelect.value,
      query: state.query,
      articles: state.articles
    });
  }
}

function browserCountryCode() {
  const timezoneCountry = countryCodeFromTimezone();
  if (timezoneCountry) return timezoneCountry;

  const locales = [navigator.language, ...(navigator.languages || [])].filter(Boolean);
  for (const locale of locales) {
    const match = locale.match(/[-_]([A-Z]{2})\b/i);
    if (match) return match[1].toLowerCase();
  }
  return "";
}

function countryCodeFromTimezone() {
  if (!globalThis.Intl || !Intl.DateTimeFormat) return "";
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

function countryMarker(countryCode) {
  const code = String(countryCode || "").toLowerCase();
  if (code === "world") return String.fromCodePoint(127760);
  if (!/^[a-z]{2}$/.test(code)) return "";
  return code
    .toUpperCase()
    .split("")
    .map((letter) => String.fromCodePoint(127397 + letter.charCodeAt(0)))
    .join("");
}

function countryOptionLabel(country) {
  return country.name;
}

function orderCountriesForUser(countries, fallbackCountry) {
  const userCountry = fallbackCountry || browserCountryCode();
  const world = countries.find((country) => country.id === "world");
  const local = countries.find((country) => country.id === userCountry);
  const rest = countries.filter((country) => country.id !== "world" && country.id !== userCountry);
  return [world, local, ...rest].filter(Boolean);
}

function extractKeywords(article) {
  const words = `${article.title} ${article.category}`
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 3 && !stopWords.has(word));

  return [...new Set(words)].slice(0, 3);
}

function flagImageMarkup(article, className) {
  const code = String(article.countryCode || "").toLowerCase();
  if (code === "world") {
    return `<span class="${className} globe-symbol" aria-label="World">${countryMarker("world")}</span>`;
  }
  if (!/^[a-z]{2}$/.test(code)) return "";
  return `<img class="${className}" src="https://flagcdn.com/w80/${code}.png" alt="${article.country} flag" loading="lazy">`;
}

function countryFlagMarkup(country, className) {
  const code = String(country.countryCode || country.id || "").toLowerCase();
  if (code === "world") {
    return `<span class="${className} globe-symbol" aria-label="World">
      <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <circle cx="32" cy="32" r="28"></circle>
        <path d="M12 31.5h40M32 4c8 7 12 16 12 28s-4 21-12 28M32 4c-8 7-12 16-12 28s4 21 12 28"></path>
        <path d="M17 16c7 4 23 4 30 0M17 48c7-4 23-4 30 0"></path>
      </svg>
    </span>`;
  }
  if (!/^[a-z]{2}$/.test(code)) return "";
  return `<img class="${className}" src="https://flagcdn.com/w80/${code}.png" alt="${country.name} flag" loading="lazy">`;
}

function iconMarkup(value, type) {
  if (type === "category") {
    return `<span class="option-symbol category-symbol">${categoryIcons[value] || "•"}</span>`;
  }
  if (type === "sort") {
    return `<span class="option-symbol sort-symbol">${sortIcons[value] || "•"}</span>`;
  }
  return sourceLogoMarkup(value);
}

function hostnameFromUrl(value) {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function sourceLogoMarkup(sourceName) {
  const name = String(sourceName || "");
  const initial = name === "all" ? "A" : (name.slice(0, 1).toUpperCase() || "A");
  const host = state.sourceLogos[name];

  if (!host) {
    return `<span class="option-symbol source-symbol">${initial}</span>`;
  }

  const favicon = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=64`;
  return `<span class="source-logo-wrap">
    <img class="source-logo-img" src="${favicon}" alt="" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false">
    <span class="source-logo-fallback" hidden>${initial}</span>
  </span>`;
}

function setPickerMenu(menu, button, open) {
  menu.hidden = !open;
  button.setAttribute("aria-expanded", String(open));
}

function closeIconMenus(except) {
  [
    [categoryMenu, categoryButton],
    [sortMenu, sortButton],
    [sourceMenu, sourceButton]
  ].forEach(([menu, button]) => {
    if (menu !== except) setPickerMenu(menu, button, false);
  });
}

function updatePickerButton(select, iconTarget, nameTarget, type) {
  const selected = select.options[select.selectedIndex];
  if (!selected) return;
  iconTarget.innerHTML = iconMarkup(selected.value, type);
  nameTarget.textContent = selected.textContent;
}

function renderIconOptions(select, container, type, onSelect) {
  container.innerHTML = "";
  Array.from(select.options).forEach((selectOption) => {
    const option = document.createElement("button");
    option.type = "button";
    option.className = "icon-option";
    option.setAttribute("role", "option");
    option.setAttribute("aria-selected", String(selectOption.value === select.value));
    const icon = document.createElement("span");
    icon.className = "option-icon";
    icon.innerHTML = iconMarkup(selectOption.value, type);
    const name = document.createElement("span");
    name.textContent = selectOption.textContent;
    option.append(icon, name);
    option.addEventListener("click", () => onSelect(selectOption.value));
    container.appendChild(option);
  });
}

function syncCategoryPicker() {
  updatePickerButton(categorySelect, categoryButtonIcon, categoryButtonName, "category");
  renderIconOptions(categorySelect, categoryOptions, "category", (value) => {
    categorySelect.value = value;
    syncCategoryPicker();
    setPickerMenu(categoryMenu, categoryButton, false);
    loadNews();
  });
}

function syncSortPicker() {
  updatePickerButton(sortSelect, sortButtonIcon, sortButtonName, "sort");
  renderIconOptions(sortSelect, sortOptions, "sort", (value) => {
    sortSelect.value = value;
    syncSortPicker();
    setPickerMenu(sortMenu, sortButton, false);
    renderArticles();
  });
}

function syncSourcePicker() {
  updatePickerButton(sourceSelect, sourceButtonIcon, sourceButtonName, "source");
  renderIconOptions(sourceSelect, sourceOptions, "source", (value) => {
    sourceSelect.value = value;
    syncSourcePicker();
    setPickerMenu(sourceMenu, sourceButton, false);
    renderArticles();
  });
}

function currentCountry() {
  return state.countries.find((country) => country.id === countrySelect.value) || state.countries[0];
}

function updateCountryButton() {
  const country = currentCountry();
  if (!country) return;
  countryButtonFlag.innerHTML = countryFlagMarkup(country, "country-picker-flag");
  countryButtonName.textContent = country.name;
}

function setCountryMenu(open) {
  countryMenu.hidden = !open;
  countryButton.setAttribute("aria-expanded", String(open));
  if (open) {
    countrySearch.value = "";
    renderCountryOptions();
    countrySearch.focus();
  }
}

function selectCountry(countryId, shouldLoad = true) {
  countrySelect.value = countryId;
  updateCountryButton();
  setCountryMenu(false);
  if (shouldLoad) {
    updateUrlState();
    loadNews();
  }
}

function renderCountryOptions() {
  const query = countrySearch.value.trim().toLowerCase();
  countryOptions.innerHTML = "";

  state.countries
    .filter((country) => !query || country.name.toLowerCase().includes(query))
    .slice(0, 80)
    .forEach((country) => {
      const option = document.createElement("button");
      option.type = "button";
      option.className = "country-option";
      option.setAttribute("role", "option");
      option.setAttribute("aria-selected", String(country.id === countrySelect.value));
      option.innerHTML = `
        <span class="country-option-flag">${countryFlagMarkup(country, "country-picker-flag")}</span>
        <span>${country.name}</span>
      `;
      option.addEventListener("click", () => selectCountry(country.id));
      countryOptions.appendChild(option);
    });
}

function generatedImageLabel(article) {
  const keywords = extractKeywords(article);
  return keywords.length ? keywords.join(" / ") : normalizeCategory(article.category);
}

function cleanCoverageTitle(value) {
  return String(value || "")
    .replace(/\s+-\s+[^-]+$/, "")
    .replace(/\s+\|\s+.+$/, "")
    .trim();
}

function titleSignal(article) {
  return cleanCoverageTitle(article?.title)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function storySignalTokens(article) {
  const words = `${titleSignal(article)} ${article?.summary || ""} ${article?.category || ""} ${article?.country || ""}`
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 3 && !stopWords.has(word));
  return [...new Set(words)].slice(0, 10);
}

function sharedTokenCount(first, second) {
  let count = 0;
  first.forEach((token) => {
    if (second.has(token)) count += 1;
  });
  return count;
}

function coverageClusters(articles) {
  const clusters = [];
  const candidates = sortArticles(articles).slice(0, 18);

  candidates.forEach((article) => {
    const tokenSet = new Set(storySignalTokens(article));
    if (!tokenSet.size) return;

    let bestCluster = null;
    let bestScore = 0;

    clusters.forEach((cluster) => {
      const shared = sharedTokenCount(tokenSet, cluster.tokens);
      const sameCategory = article.category === cluster.category;
      const sameCountry = article.countryCode === cluster.countryCode;
      const score = (shared * 3) + (sameCategory ? 2 : 0) + (sameCountry ? 1 : 0);
      const qualifies = shared >= 2 || (shared >= 1 && sameCategory && cluster.items.length < 3);
      if (qualifies && score > bestScore) {
        bestCluster = cluster;
        bestScore = score;
      }
    });

    if (bestCluster) {
      bestCluster.items.push(article);
      tokenSet.forEach((token) => bestCluster.tokens.add(token));
      return;
    }

    clusters.push({
      lead: article,
      items: [article],
      tokens: tokenSet,
      category: article.category,
      countryCode: article.countryCode
    });
  });

  return clusters
    .map((cluster) => {
      const sources = [...new Set(cluster.items.map((item) => item.source?.name).filter(Boolean))];
      return {
        ...cluster,
        sources,
        countries: [...new Set(cluster.items.map((item) => item.country).filter(Boolean))],
        keywords: [...cluster.tokens].slice(0, 4)
      };
    })
    .filter((cluster) => cluster.items.length >= 2 && cluster.sources.length >= 2)
    .sort((a, b) => {
      const sourceGap = b.sources.length - a.sources.length;
      if (sourceGap) return sourceGap;
      const itemGap = b.items.length - a.items.length;
      if (itemGap) return itemGap;
      return (b.lead?.interestScore || 0) - (a.lead?.interestScore || 0);
    })
    .slice(0, 3);
}

function generatedImageBackground(article) {
  const [primary, secondary, deep] = categoryPalettes[article.category] || categoryPalettes.top;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 420">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${primary}"/>
          <stop offset="58%" stop-color="${secondary}"/>
          <stop offset="100%" stop-color="${deep}"/>
        </linearGradient>
        <radialGradient id="light" cx="28%" cy="24%" r="70%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.52"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="900" height="420" fill="url(#bg)"/>
      <rect width="900" height="420" fill="url(#light)"/>
      <path d="M48 316 C176 238 268 370 396 272 C532 168 632 252 852 132" fill="none" stroke="#fff" stroke-opacity="0.28" stroke-width="28"/>
      <circle cx="760" cy="76" r="72" fill="#fff" opacity="0.16"/>
      <circle cx="112" cy="104" r="46" fill="#fff" opacity="0.14"/>
    </svg>
  `;
  return `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}")`;
}

function renderGeneratedImage(media, article) {
  media.style.backgroundImage = generatedImageBackground(article);
  media.classList.add("has-image", "generated-image");
  media.innerHTML = `
    <div class="generated-image-content">
      <span class="generated-flag">${flagImageMarkup(article, "generated-flag-img")}</span>
      <span class="generated-category">${normalizeCategory(article.category)}</span>
      <strong>${generatedImageLabel(article)}</strong>
    </div>
  `;
}

function setLoading() {
  grid.innerHTML = "";
  errorPanel.hidden = true;
  updatedLabel.textContent = currentText().loading;
  if (breakingTicker) breakingTicker.textContent = currentText().loading;
  if (featuredStory) featuredStory.innerHTML = "";
  if (secondaryStories) secondaryStories.innerHTML = "";
  if (trendingList) trendingList.innerHTML = "";
  if (categorySections) categorySections.innerHTML = "";
  if (smartBriefingGrid) smartBriefingGrid.innerHTML = "";
  if (smartBriefing) smartBriefing.hidden = true;
  if (coverageWatchGrid) coverageWatchGrid.innerHTML = "";
  if (coverageWatch) coverageWatch.hidden = true;
  if (newsTimelineList) newsTimelineList.innerHTML = "";
  if (newsTimeline) newsTimeline.hidden = true;
  if (newsGameBoard) newsGameBoard.innerHTML = "";
  if (newsGame) newsGame.hidden = true;
  for (let index = 0; index < 9; index += 1) {
    const skeleton = document.createElement("div");
    skeleton.className = "skeleton-card";
    grid.appendChild(skeleton);
  }
}

function sortArticles(articles) {
  const sort = sortSelect.value;
  const sorted = [...articles];

  if (sort === "newest") {
    sorted.sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0));
  } else if (sort === "source") {
    sorted.sort((a, b) => a.source.name.localeCompare(b.source.name));
  } else {
    sorted.sort((a, b) => b.interestScore - a.interestScore);
  }

  return sorted;
}

function sourceFilteredArticles() {
  if (!sourceSelect.value || sourceSelect.value === "all") return state.articles;
  return state.articles.filter((article) => article.source.name === sourceSelect.value);
}

function updateSourceOptions() {
  const selected = state.requestedSource || sourceSelect.value || "all";
  const sources = [...new Set(state.articles.map((article) => article.source.name).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b));
  state.sourceLogos = {
    all: "news.google.com"
  };
  state.articles.forEach((article) => {
    const sourceName = article.source?.name;
    if (!sourceName || state.sourceLogos[sourceName]) return;
    const host = hostnameFromUrl(article.source?.url || article.url);
    if (host) state.sourceLogos[sourceName] = host;
  });

  sourceSelect.innerHTML = "";
  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = currentText().allSources;
  sourceSelect.appendChild(allOption);

  sources.forEach((sourceName) => {
    const option = document.createElement("option");
    option.value = sourceName;
    option.textContent = sourceName;
    sourceSelect.appendChild(option);
  });

  sourceSelect.value = sources.includes(selected) ? selected : "all";
  state.requestedSource = sourceSelect.value;
  syncSourcePicker();
}

function createArticleCard(article, variant = "") {
  const node = template.content.cloneNode(true);
  const card = node.querySelector(".article-card");
  const media = node.querySelector(".article-media");
  const badge = node.querySelector(".category-badge");
  const source = node.querySelector(".source");
  const published = node.querySelector(".published");
  const title = node.querySelector("h2");
  const summary = node.querySelector("p");
  const reading = node.querySelector(".reading-time");
  const aiButton = node.querySelector(".ai-button");
  const saveButton = node.querySelector(".save-button");
  const shareButton = node.querySelector(".share-button");
  const link = node.querySelector("a");

  if (variant) card.classList.add(variant);

  if (article.image) {
    media.style.backgroundImage = `url("${article.image}")`;
    media.classList.add("has-image");
    media.setAttribute("role", "img");
    media.setAttribute("aria-label", `${article.title} image`);
    media.innerHTML = `<span class="image-flag">${flagImageMarkup(article, "image-flag-img")}</span>`;
  } else {
    renderGeneratedImage(media, article);
  }

  badge.textContent = normalizeCategory(article.category);
  source.textContent = article.source?.name || "Unknown source";
  published.textContent = formatDate(article.publishedAt);
  title.textContent = article.title;
  summary.textContent = article.summary || "Open the original report for more details and context.";
  reading.textContent = readingTime(article);
  aiButton.addEventListener("click", () => openAiInsight(article));
  if (saveButton) {
    const saved = isArticleSaved(article);
    saveButton.textContent = saved ? "Saved" : "Save";
    saveButton.setAttribute("aria-pressed", String(saved));
    saveButton.setAttribute("aria-label", `${saved ? "Remove saved story" : "Save for later"}: ${article.title}`);
    saveButton.addEventListener("click", () => toggleSavedStory(article));
  }
  shareButton.addEventListener("click", () => shareArticle(article));
  shareButton.setAttribute("aria-label", `Share: ${article.title}`);
  link.href = articleLink(article);
  link.target = "";
  link.rel = "";
  link.textContent = currentText().sourceCta;
  link.setAttribute("aria-label", `${currentText().sourceCta}: ${article.title}`);
  card.style.setProperty("--score", Math.min(1, article.interestScore / 8));
  return node;
}

function createCompactStory(article, index) {
  const link = document.createElement("a");
  link.className = "compact-story";
  link.href = articleLink(article);
  link.innerHTML = `
    <span>${String(index).padStart(2, "0")}</span>
    <strong>${article.title}</strong>
    <small>${article.source?.name || "Unknown source"} · ${formatDate(article.publishedAt)}</small>
  `;
  return link;
}

function countBy(items, getter) {
  return items.reduce((map, item) => {
    const key = getter(item);
    if (!key) return map;
    map.set(key, (map.get(key) || 0) + 1);
    return map;
  }, new Map());
}

function topEntries(map, limit = 4) {
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit);
}

function keywordList(articles) {
  const stopWords = new Set([
    "about", "after", "again", "against", "from", "have", "into", "more", "news", "over", "said",
    "that", "their", "this", "with", "world", "will", "your", "amid", "live", "latest"
  ]);
  const words = new Map();
  articles.slice(0, 14).forEach((article) => {
    `${article.title || ""} ${article.summary || ""}`.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 3 && !stopWords.has(word))
      .forEach((word) => words.set(word, (words.get(word) || 0) + 1));
  });
  return topEntries(words, 5).map(([word]) => word);
}

function freshnessLabel(articles) {
  const newest = articles
    .map((article) => new Date(article.publishedAt || 0).getTime())
    .filter(Boolean)
    .sort((a, b) => b - a)[0];
  if (!newest) return "Freshness unknown";
  const minutes = Math.max(1, Math.round((Date.now() - newest) / 60000));
  if (minutes < 60) return `Updated ${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  return `Updated ${hours} hr ago`;
}

function renderSmartBriefing(articles) {
  if (!smartBriefing || !smartBriefingGrid) return;
  smartBriefingGrid.innerHTML = "";

  if (!articles.length) {
    smartBriefing.hidden = true;
    return;
  }

  smartBriefing.hidden = false;
  const lead = articles[0];
  const categories = topEntries(countBy(articles, (article) => normalizeCategory(article.category)), 3);
  const sources = topEntries(countBy(articles, (article) => article.source?.name), 4);
  const keywords = keywordList(articles);
  const country = countrySelect.value === "world"
    ? "World"
    : countrySelect.options[countrySelect.selectedIndex]?.text || "Selected country";
  const category = normalizeCategory(categorySelect.value || "top");

  if (smartBriefingSummary) {
    smartBriefingSummary.textContent = `${articles.length} sourced stories in ${country} · ${category} · ${freshnessLabel(articles)}`;
  }
  if (smartBriefingCta) smartBriefingCta.href = articleLink(lead);

  smartBriefingGrid.innerHTML = `
    <a class="smart-lead" href="${escapeHtml(articleLink(lead))}">
      <span class="smart-lead-media">
        ${lead.image
          ? `<img src="${escapeHtml(lead.image)}" alt="" loading="lazy">`
          : `<span class="smart-generated">${flagImageMarkup(lead, "generated-flag-img")}<strong>${escapeHtml(generatedImageLabel(lead))}</strong></span>`}
      </span>
      <span class="smart-lead-copy">
        <small>${escapeHtml(normalizeCategory(lead.category))} · ${escapeHtml(lead.source?.name || "Source")}</small>
        <strong>${escapeHtml(lead.title)}</strong>
        <em>${escapeHtml(lead.summary || "Open the full report for more context.")}</em>
      </span>
    </a>
    <div class="smart-stack">
      <article class="smart-panel">
        <span>Top signals</span>
        <div class="smart-metric-row">
          <strong>${articles.length}</strong>
          <small>Sourced stories</small>
        </div>
        <div class="smart-metric-row">
          <strong>${sources.length}</strong>
          <small>Active sources</small>
        </div>
        <div class="smart-metric-row">
          <strong>${categories.length}</strong>
          <small>Hot sections</small>
        </div>
      </article>
      <article class="smart-panel">
        <span>Trending topics</span>
        <div class="smart-tags">
          ${(keywords.length ? keywords : categories.map(([name]) => name)).map((word) => `<a href="/?q=${encodeURIComponent(word)}">${escapeHtml(word)}</a>`).join("")}
        </div>
      </article>
    </div>
    <div class="smart-list">
      <div class="smart-list-title">
        <span>Fast read</span>
        <strong>5 stories to open now</strong>
      </div>
      ${articles.slice(1, 6).map((article, index) => `
        <a href="${escapeHtml(articleLink(article))}">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <strong>${escapeHtml(article.title)}</strong>
          <small>${escapeHtml(article.source?.name || "Source")} · ${formatDate(article.publishedAt)}</small>
        </a>
      `).join("")}
    </div>
  `;
}

function renderCoverageWatch(articles) {
  if (!coverageWatch || !coverageWatchGrid) return;
  coverageWatchGrid.innerHTML = "";

  const clusters = coverageClusters(articles);
  if (!clusters.length) {
    coverageWatch.hidden = true;
    return;
  }

  coverageWatch.hidden = false;
  const totalSources = [...new Set(clusters.flatMap((cluster) => cluster.sources))].length;
  if (coverageWatchSummary) {
    coverageWatchSummary.textContent = `${clusters.length} topics have multi-publisher coverage across ${totalSources} sources in this briefing.`;
  }
  if (coverageWatchCta) coverageWatchCta.href = articleLink(clusters[0].lead);

  coverageWatchGrid.innerHTML = clusters.map((cluster) => {
    const clusterMeta = [
      normalizeCategory(cluster.lead.category),
      cluster.countries.length > 1 ? `${cluster.countries.length} regions` : (cluster.countries[0] || "World"),
      freshnessLabel(cluster.items)
    ].join(" Â· ");
    const sourceLabel = `${cluster.sources.length} source${cluster.sources.length === 1 ? "" : "s"}`;
    const storyLabel = `${cluster.items.length} stor${cluster.items.length === 1 ? "y" : "ies"}`;
    return `
      <article class="coverage-card">
        <div class="coverage-card-top">
          <span class="coverage-strength">${escapeHtml(sourceLabel)}</span>
          <small>${escapeHtml(storyLabel)}</small>
        </div>
        <a class="coverage-lead" href="${escapeHtml(articleLink(cluster.lead))}">
          <strong>${escapeHtml(cluster.lead.title)}</strong>
          <p>${escapeHtml(cluster.lead.summary || "Open the lead story to compare the reporting angle and original publisher context.")}</p>
        </a>
        <div class="coverage-keywords">
          ${cluster.keywords.map((keyword) => `<a href="/?q=${encodeURIComponent(keyword)}">${escapeHtml(keyword)}</a>`).join("")}
        </div>
        <div class="coverage-meta">${escapeHtml(clusterMeta)}</div>
        <div class="coverage-sources">
          ${cluster.sources.slice(0, 4).map((sourceName) => `<span>${escapeHtml(sourceName)}</span>`).join("")}
        </div>
        <div class="coverage-links">
          ${cluster.items.slice(0, 3).map((item) => `
            <a href="${escapeHtml(articleLink(item))}">
              <strong>${escapeHtml(item.source?.name || "Source")}</strong>
              <span>${escapeHtml(cleanCoverageTitle(item.title).slice(0, 88) || item.title)}</span>
            </a>
          `).join("")}
        </div>
      </article>
    `;
  }).join("");
}

function timelineBucket(article) {
  const published = new Date(article.publishedAt || 0);
  if (Number.isNaN(published.getTime())) return "Recently";
  const minutes = Math.max(0, Math.round((Date.now() - published.getTime()) / 60000));
  if (minutes < 60) return "Last hour";
  if (minutes < 360) return "Last 6 hours";
  if (minutes < 1440) return "Today";
  return published.toLocaleDateString([], { month: "short", day: "numeric" });
}

function timelineMeta(article) {
  const category = normalizeCategory(article.category);
  const source = article.source?.name || "Source";
  return `${category} · ${source} · ${formatDate(article.publishedAt)}`;
}

function renderNewsTimeline(articles) {
  if (!newsTimeline || !newsTimelineList) return;
  newsTimelineList.innerHTML = "";

  const newest = [...articles]
    .sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0))
    .slice(0, 12);

  if (!newest.length) {
    newsTimeline.hidden = true;
    return;
  }

  newsTimeline.hidden = false;
  if (newsTimelineSummary) {
    const sourceCount = new Set(newest.map((article) => article.source?.name).filter(Boolean)).size;
    newsTimelineSummary.textContent = `${newest.length} latest updates from ${sourceCount || "multiple"} sources, ordered newest first.`;
  }

  const groups = new Map();
  newest.forEach((article) => {
    const bucket = timelineBucket(article);
    if (!groups.has(bucket)) groups.set(bucket, []);
    groups.get(bucket).push(article);
  });

  newsTimelineList.innerHTML = Array.from(groups.entries()).map(([bucket, items]) => `
    <section class="timeline-group">
      <div class="timeline-time">
        <span>${escapeHtml(bucket)}</span>
      </div>
      <div class="timeline-items">
        ${items.map((article) => `
          <a class="timeline-item" href="${escapeHtml(articleLink(article))}">
            <span class="timeline-dot" aria-hidden="true"></span>
            <strong>${escapeHtml(article.title)}</strong>
            <small>${escapeHtml(timelineMeta(article))}</small>
          </a>
        `).join("")}
      </div>
    </section>
  `).join("");
}

function gameArticlePool(articles) {
  return articles
    .filter((article) => article?.title && article?.category && article?.source?.name)
    .slice(0, 18);
}

function gameQuestionType(article) {
  const key = `${article.id || article.title}-${state.gameIndex}`;
  return key.length % 2 === 0 ? "category" : "source";
}

function gameOptions(articles, article, type) {
  const correct = type === "category" ? normalizeCategory(article.category) : article.source.name;
  const values = articles
    .map((item) => type === "category" ? normalizeCategory(item.category) : item.source?.name)
    .filter((value) => value && value !== correct);
  const unique = [...new Set(values)].slice(0, 8);
  const options = [correct, ...unique.slice(0, 3)];
  while (options.length < 4) {
    options.push(type === "category" ? `News ${options.length}` : `Source ${options.length}`);
  }
  return options
    .slice(0, 4)
    .sort((a, b) => (a.length + state.gameIndex) % 3 - (b.length + state.gameIndex) % 3);
}

function renderNewsGame(articles) {
  if (!newsGame || !newsGameBoard) return;
  const pool = gameArticlePool(articles);

  if (pool.length < 4) {
    newsGame.hidden = true;
    return;
  }

  newsGame.hidden = false;
  state.gameArticles = pool;
  if (state.gameIndex >= pool.length) state.gameIndex = 0;
  const article = pool[state.gameIndex];
  const type = gameQuestionType(article);
  const correct = type === "category" ? normalizeCategory(article.category) : article.source.name;
  const options = gameOptions(pool, article, type);
  const prompt = type === "category" ? "Which category is this headline from?" : "Which source published this story?";

  if (gameScore) gameScore.textContent = String(state.gameScore);
  newsGameBoard.innerHTML = `
    <article class="game-card ${state.gameAnswered ? "is-answered" : ""}">
      <div class="game-progress">
        <span>Question ${state.gameIndex + 1}/${pool.length}</span>
        <span>${state.gameAnswered ? "Answered" : "Pick one"}</span>
      </div>
      <p class="game-prompt">${escapeHtml(prompt)}</p>
      <h3>${escapeHtml(article.title)}</h3>
      <div class="game-options">
        ${options.map((option) => {
          const isCorrect = option === correct;
          const buttonClass = state.gameAnswered ? (isCorrect ? "is-correct" : "is-muted") : "";
          return `<button class="${buttonClass}" type="button" data-game-answer="${escapeHtml(option)}"${state.gameAnswered ? " disabled" : ""}>${escapeHtml(option)}</button>`;
        }).join("")}
      </div>
      <div class="game-result" aria-live="polite">
        ${state.gameAnswered
          ? `<strong>Correct answer: ${escapeHtml(correct)}</strong><a href="${escapeHtml(articleLink(article))}">Read this story</a>`
          : `<span>Answer to unlock the story link.</span>`}
      </div>
      <div class="game-actions">
        <button type="button" id="game-next">${state.gameAnswered ? "Next headline" : "Skip"}</button>
        <button type="button" id="game-reset">Reset score</button>
      </div>
    </article>
  `;
}

function answerNewsGame(answer) {
  if (!state.gameArticles.length || state.gameAnswered) return;
  const article = state.gameArticles[state.gameIndex];
  const type = gameQuestionType(article);
  const correct = type === "category" ? normalizeCategory(article.category) : article.source.name;
  if (answer === correct) state.gameScore += 1;
  state.gameAnswered = true;
  renderNewsGame(state.gameArticles);
}

function nextNewsGameQuestion(resetScore = false) {
  if (!state.gameArticles.length) return;
  if (resetScore) state.gameScore = 0;
  state.gameAnswered = false;
  state.gameIndex = resetScore ? 0 : (state.gameIndex + 1) % state.gameArticles.length;
  renderNewsGame(state.gameArticles);
}

function stopBreakingTimer() {
  if (state.breakingTimer) {
    clearInterval(state.breakingTimer);
    state.breakingTimer = null;
  }
}

function updateBreakingStory() {
  if (!breakingTicker || !breakingTime) return;
  const story = state.breakingStories[state.breakingIndex];

  if (!story) {
    breakingTicker.textContent = currentText().loading;
    breakingTicker.href = "/";
    if (breakingCount) breakingCount.textContent = "Live";
    breakingTime.textContent = "Live";
    return;
  }

  breakingTicker.textContent = `${story.title} - ${story.source?.name || "Source"}`;
  breakingTicker.href = articleLink(story);
  breakingTicker.setAttribute("aria-label", `Read breaking story: ${story.title}`);
  if (breakingCount) breakingCount.textContent = `${state.breakingIndex + 1}/${state.breakingStories.length}`;
  breakingTime.textContent = formatDate(story.publishedAt);
}

function nextBreakingStory() {
  if (!state.breakingStories.length) return;
  state.breakingIndex = (state.breakingIndex + 1) % state.breakingStories.length;
  updateBreakingStory();
}

function previousBreakingStory() {
  if (!state.breakingStories.length) return;
  state.breakingIndex = (state.breakingIndex - 1 + state.breakingStories.length) % state.breakingStories.length;
  updateBreakingStory();
}

function startBreakingRotation() {
  stopBreakingTimer();
  if (state.breakingStories.length < 2) return;
  state.breakingTimer = setInterval(nextBreakingStory, 5500);
}

function renderBreakingNews(articles) {
  state.breakingStories = sortArticles(articles).slice(0, 10);
  if (state.breakingIndex >= state.breakingStories.length) state.breakingIndex = 0;
  updateBreakingStory();
  startBreakingRotation();
}

function renderLeadStories(articles) {
  if (!featuredStory || !secondaryStories) return;
  featuredStory.innerHTML = "";
  secondaryStories.innerHTML = "";

  if (!articles.length) return;

  featuredStory.appendChild(createArticleCard(articles[0], "featured-card"));
  articles.slice(1, 4).forEach((article) => {
    secondaryStories.appendChild(createArticleCard(article, "secondary-card"));
  });
}

function renderTrending(articles) {
  if (!trendingList) return;
  trendingList.innerHTML = "";
  articles.slice(0, 8).forEach((article, index) => {
    trendingList.appendChild(createCompactStory(article, index + 1));
  });
}

function renderCategorySections(articles) {
  if (!categorySections) return;
  categorySections.innerHTML = "";
  const groups = new Map();

  articles.forEach((article) => {
    if (!groups.has(article.category)) groups.set(article.category, []);
    groups.get(article.category).push(article);
  });

  Array.from(groups.entries()).slice(0, 4).forEach(([category, items]) => {
    const section = document.createElement("section");
    section.className = "category-block";
    section.innerHTML = `
      <div class="section-heading">
        <span>${normalizeCategory(category)}</span>
        <h2>${normalizeCategory(category)} brief</h2>
      </div>
      <div class="category-story-list"></div>
    `;
    const list = section.querySelector(".category-story-list");
    items.slice(0, 3).forEach((article, index) => {
      list.appendChild(createCompactStory(article, index + 1));
    });
    categorySections.appendChild(section);
  });
}

function renderArticles() {
  grid.innerHTML = "";
  const articles = sortArticles(sourceFilteredArticles());
  localStorage.setItem("worldNewsArticles", JSON.stringify(state.articles));
  localStorage.setItem("worldNewsVisibleArticles", JSON.stringify(articles));
  feedLabel.textContent = `${articles.length} ${currentText().sourcedStories}`;
  renderCategoryNavigation();
  renderBreakingNews(articles);
  renderSmartBriefing(articles);
  renderCoverageWatch(articles);
  renderNewsTimeline(articles);
  renderNewsGame(articles);
  renderSavedBriefings();
  renderBriefingRadar();
  renderReturningFeed();
  renderMyNews();
  renderSavedStories();
  renderContinueReading();

  if (!articles.length) {
    if (featuredStory) featuredStory.innerHTML = "";
    if (secondaryStories) secondaryStories.innerHTML = "";
    if (trendingList) trendingList.innerHTML = "";
    if (categorySections) categorySections.innerHTML = "";
    if (smartBriefing) smartBriefing.hidden = true;
    if (coverageWatch) coverageWatch.hidden = true;
    if (newsTimeline) newsTimeline.hidden = true;
    if (newsGame) newsGame.hidden = true;
    grid.innerHTML = `<div class="empty-state">${currentText().noStories}</div>`;
    return;
  }

  renderLeadStories(articles);
  renderTrending(articles);
  renderCategorySections(articles);
  state.shorts = articles.slice(0, 12);
  if (state.shortIndex >= state.shorts.length) state.shortIndex = 0;
  if (shortsSection && !shortsSection.hidden) renderCurrentShort();

  articles.slice(4).forEach((article) => {
    grid.appendChild(createArticleCard(article));
  });
}

function updateHeading(payload) {
  const text = currentText();
  const country = payload.country || countrySelect.options[countrySelect.selectedIndex]?.text || "selected country";
  const category = normalizeCategory(payload.category || categorySelect.value);
  const queryText = payload.query ? text.query.replace("{query}", payload.query) : "";

  pageTitle.textContent = text.heading
    .replace("{category}", category)
    .replace("{country}", country)
    .replace("{query}", queryText);
  feedLabel.textContent = `${payload.articles.length} ${text.sourcedStories}`;
  updatedLabel.textContent = `${text.updated} ${new Date(payload.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  if (window.NewsSeo) {
    const querySuffix = payload.query ? ` matching ${payload.query}` : "";
    NewsSeo.setPageMeta({
      title: `${category} News in ${country}${querySuffix} | World Interesting News`,
      description: `Latest ${category.toLowerCase()} headlines in ${country}${querySuffix}, with source attribution, related stories, AI insight, and links to original publishers.`,
      canonical: payload.query ? "/" : window.location.pathname,
      robots: payload.query ? "noindex, follow" : "index, follow, max-image-preview:large"
    });
  }
}

async function loadNews() {
  setLoading();
  const params = new URLSearchParams({
    country: countrySelect.value || "us",
    category: categorySelect.value || "top",
    limit: "30"
  });

  if (state.query) {
    params.set("q", state.query);
  }

  params.set("language", languageSelect.value || "en");

  try {
    const response = await fetch(`/api/news?${params.toString()}`);
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.detail || payload.error || "News feed failed");
    }

    state.articles = payload.articles;
    state.updatedAt = payload.updatedAt;
    state.countryName = payload.country;
    compareWithLastBriefingVisit(payload.articles);
    updateSourceOptions();
    updateHeading(payload);
    renderArticles();
    saveBriefingSnapshot(payload.articles);
    loadBriefingRadar();
    if (!state.shortAutoOpened && !shortsClosedThisSession()) {
      openShorts({ auto: true, preferUserCountry: true });
    }
  } catch (error) {
    renderContinueReading();
    grid.innerHTML = "";
    errorPanel.hidden = false;
    errorPanel.textContent = `${currentText().liveError}: ${error.message}`;
    updatedLabel.textContent = currentText().feedUnavailable;
  }
}

async function loadMeta() {
  const response = await fetch("/api/meta");
  const meta = await response.json();
  state.countries = orderCountriesForUser(meta.countries, meta.defaultCountry);
  state.categories = meta.categories;
  state.languages = meta.languages;
  state.userCountry = browserCountryCode() || meta.defaultCountry || "";
  if (window.NewsSeo) {
    NewsSeo.injectAnalytics(meta.publicConfig || {});
  }
  if (window.WorldNewsAds) {
    WorldNewsAds.initAds(meta.publicConfig || {});
  }

  countrySelect.innerHTML = "";
  state.countries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country.id;
    option.textContent = countryOptionLabel(country);
    countrySelect.appendChild(option);
  });

  categorySelect.innerHTML = meta.categories
    .map((category) => `<option value="${category}">${normalizeCategory(category)}</option>`)
    .join("");

  languageSelect.innerHTML = meta.languages
    .map((language) => `<option value="${language.id}">${language.name}</option>`)
    .join("");

  countrySelect.value = "world";
  categorySelect.value = "top";
  languageSelect.value = "en";
  const params = new URLSearchParams(window.location.search);
  const requestedCountry = params.get("country");
  const requestedCategory = params.get("category");
  const requestedLanguage = params.get("language");
  const requestedSort = params.get("sort");
  const requestedSource = params.get("source");
  const requestedQuery = params.get("q") || "";
  if (requestedCountry && Array.from(countrySelect.options).some((option) => option.value === requestedCountry)) {
    countrySelect.value = requestedCountry;
  }
  if (requestedCategory && meta.categories.includes(requestedCategory)) {
    categorySelect.value = requestedCategory;
  }
  if (requestedLanguage && meta.languages.some((language) => language.id === requestedLanguage)) {
    languageSelect.value = requestedLanguage;
  }
  if (requestedSort && Array.from(sortSelect.options).some((option) => option.value === requestedSort)) {
    sortSelect.value = requestedSort;
  }
  state.requestedSource = requestedSource || "all";
  if (requestedQuery) {
    state.query = requestedQuery;
    searchInput.value = requestedQuery;
  }
  applyTranslations();
  updateCountryButton();
  syncCategoryPicker();
  syncSortPicker();
  syncSourcePicker();
  renderCategoryNavigation();
  renderCountryOptions();
}

countrySelect.addEventListener("change", () => {
  updateCountryButton();
  renderMyNews();
  state.calendarDate = new Date();
  loadCountryCalendar();
  updateUrlState();
  loadNews();
});
countryPicker.addEventListener("click", (event) => event.stopPropagation());
countryButton.addEventListener("click", () => setCountryMenu(countryMenu.hidden));
countrySearch.addEventListener("input", renderCountryOptions);
menuToggle?.addEventListener("click", () => {
  const open = mobilePanel.hidden;
  mobilePanel.hidden = !open;
  menuToggle.setAttribute("aria-expanded", String(open));
});
themeToggle?.addEventListener("click", () => {
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});
shortsNavButton?.addEventListener("click", openShorts);
mobileShortsButton?.addEventListener("click", openShorts);
shortPrev?.addEventListener("click", previousShort);
shortNext?.addEventListener("click", nextShort);
shortPlay?.addEventListener("click", toggleShortPlayback);
shortClose?.addEventListener("click", closeShorts);
aiClose?.addEventListener("click", closeAiModal);
aiModal?.addEventListener("click", (event) => {
  if (event.target === aiModal) closeAiModal();
});
document.addEventListener("click", (event) => {
  if (!countryPicker.contains(event.target)) {
    setCountryMenu(false);
  }
  if (!categoryPicker.contains(event.target) && !sortPicker.contains(event.target) && !sourcePicker.contains(event.target)) {
    closeIconMenus();
  }
  if (mobilePanel && menuToggle && !mobilePanel.contains(event.target) && !menuToggle.contains(event.target)) {
    closeMobileMenu();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setCountryMenu(false);
    closeIconMenus();
    closeMobileMenu();
    closeAiModal();
    closeShorts();
  }
});
categoryPicker.addEventListener("click", (event) => event.stopPropagation());
sortPicker.addEventListener("click", (event) => event.stopPropagation());
sourcePicker.addEventListener("click", (event) => event.stopPropagation());
categoryButton.addEventListener("click", () => {
  closeIconMenus(categoryMenu);
  syncCategoryPicker();
  setPickerMenu(categoryMenu, categoryButton, categoryMenu.hidden);
});
sortButton.addEventListener("click", () => {
  closeIconMenus(sortMenu);
  syncSortPicker();
  setPickerMenu(sortMenu, sortButton, sortMenu.hidden);
});
sourceButton.addEventListener("click", () => {
  closeIconMenus(sourceMenu);
  syncSourcePicker();
  setPickerMenu(sourceMenu, sourceButton, sourceMenu.hidden);
});
categorySelect.addEventListener("change", () => {
  syncCategoryPicker();
  renderCategoryNavigation();
  renderMyNews();
  updateUrlState();
  loadNews();
});
languageSelect.addEventListener("change", () => {
  applyTranslations();
  updateUrlState();
  loadNews();
});
sortSelect.addEventListener("change", () => {
  syncSortPicker();
  updateUrlState();
  renderArticles();
});
sourceSelect.addEventListener("change", () => {
  state.requestedSource = sourceSelect.value || "all";
  updateUrlState();
  syncSourcePicker();
  renderArticles();
});
newsGameBoard?.addEventListener("click", (event) => {
  const answerButton = event.target.closest("[data-game-answer]");
  if (answerButton) {
    answerNewsGame(answerButton.dataset.gameAnswer || "");
    return;
  }
  if (event.target.closest("#game-next")) {
    nextNewsGameQuestion(false);
    return;
  }
  if (event.target.closest("#game-reset")) {
    nextNewsGameQuestion(true);
  }
});
refreshButton.addEventListener("click", loadNews);
followCountryButton?.addEventListener("click", () => {
  const country = currentCountry();
  if (country?.id && country.id !== "world") toggleMyNewsPreference("countries", country.id);
});
followCategoryButton?.addEventListener("click", () => {
  toggleMyNewsPreference("categories", categorySelect.value || "top");
});
savedStoriesClear?.addEventListener("click", () => {
  writeSavedStories([]);
  renderSavedStories();
  renderArticles();
  showToast("Saved stories cleared");
});
fifaRefresh?.addEventListener("click", loadFifaScores);
fifaRefresh?.addEventListener("click", loadFifaTeams);
calendarRefresh?.addEventListener("click", loadCountryCalendar);
continueReadingClear?.addEventListener("click", () => {
  writeRecentStories([]);
  renderContinueReading();
  showToast(currentText().clearHistory);
});
saveBriefingButton?.addEventListener("click", saveCurrentBriefing);
shareBriefingButton?.addEventListener("click", () => shareBriefing());
returningDismiss?.addEventListener("click", () => {
  state.returningDismissed = true;
  renderReturningFeed();
});
breakingPrev?.addEventListener("click", () => {
  previousBreakingStory();
  startBreakingRotation();
});
breakingNext?.addEventListener("click", () => {
  nextBreakingStory();
  startBreakingRotation();
});
resetButton.addEventListener("click", () => {
  state.query = "";
  searchInput.value = "";
  categorySelect.value = "top";
  sourceSelect.value = "all";
  languageSelect.value = "en";
  applyTranslations();
  updateUrlState();
  selectCountry("world");
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.query = searchInput.value.trim();
  updateUrlState();
  loadNews();
});

document.querySelector(".newsletter-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = event.currentTarget.querySelector("input");
  input.value = "";
  input.placeholder = "Thanks for signing up";
});

initTheme();
renderSavedBriefings();
renderBriefingRadar();
renderMyNews();
renderSavedStories();
renderContinueReading();

function startLiveNewsRefresh() {
  if (state.liveRefreshTimer) clearInterval(state.liveRefreshTimer);
  state.liveRefreshTimer = setInterval(() => {
    if (document.visibilityState === "visible") loadNews();
  }, 180000);
}

loadMeta().then(() => Promise.all([
  loadNews().then(startLiveNewsRefresh),
  loadCountryCalendar(),
  loadFifaCaptains().then(() => Promise.all([loadFifaScores(), loadFifaTeams()])).then(startFifaScoreRefresh)
]));
