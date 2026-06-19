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
  shorts: [],
  shortIndex: 0,
  shortPlaying: true,
  shortTimer: null,
  shortStartedAt: 0,
  shortAutoOpened: false,
  userCountry: "",
  query: ""
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
const saveBriefingButton = document.querySelector("#save-briefing");
const myNewsSection = document.querySelector("#my-news");
const myNewsSummary = document.querySelector("#my-news-summary");
const myNewsPreferences = document.querySelector("#my-news-preferences");
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
const fifaScoreGrid = document.querySelector("#fifa-score-grid");
const fifaRefresh = document.querySelector("#fifa-refresh");
const fifaSource = document.querySelector("#fifa-source");
const pageTitle = document.querySelector("#page-title");
const feedLabel = document.querySelector("#feed-label");
const updatedLabel = document.querySelector("#updated-label");
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
  const params = new URLSearchParams();
  if (countrySelect.value && countrySelect.value !== "world") params.set("country", countrySelect.value);
  if (categorySelect.value && categorySelect.value !== "top") params.set("category", categorySelect.value);
  if (state.query) params.set("q", state.query);
  const nextUrl = params.toString() ? `/?${params.toString()}` : "/";
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
  myNewsGrid.innerHTML = "";
  [...preferences.countries.map((value) => ["countries", value]), ...preferences.categories.map((value) => ["categories", value])]
    .forEach(([type, value]) => myNewsPreferences.appendChild(renderPreferenceChip(type, value)));

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
        ? `${matches.length} stories match your saved interests. Tap a chip to remove it.`
        : "Your interests are saved. Matching stories will appear as the feed refreshes."
      : "Follow the country and topic you are browsing to build a faster personal feed.";
  }

  if (!hasPreferences) {
    myNewsGrid.innerHTML = `<div class="my-news-empty">Start by choosing a country or topic above, then My News will collect matching stories here.</div>`;
    return;
  }

  if (!matches.length) {
    myNewsGrid.innerHTML = `<div class="my-news-empty">No matching stories in this feed yet. Try Refresh or follow another topic.</div>`;
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

function renderTeam(team, side) {
  return `
    <div class="fifa-team ${side}">
      <img src="${team.logo || "/favicon.svg"}" alt="" loading="lazy">
      <span>${team.shortName || team.name}</span>
      <strong>${Number(team.score || 0)}</strong>
    </div>
  `;
}

function renderFifaScores(payload) {
  if (!fifaScoreGrid || !fifaStatus) return;
  fifaScoreGrid.innerHTML = "";
  const matches = payload.matches || [];
  const liveCount = matches.filter((match) => match.live).length;

  if (fifaTitle) fifaTitle.textContent = payload.league || "FIFA World Cup scores";
  if (fifaSummary) {
    fifaSummary.textContent = liveCount
      ? `${liveCount} match${liveCount === 1 ? " is" : "es are"} live now. Scores refresh automatically.`
      : "Live, upcoming, and final FIFA matches refresh automatically.";
  }
  fifaStatus.textContent = `Updated ${new Date(payload.updatedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}${payload.cached ? " · cached" : ""}`;
  if (fifaSource && payload.sourceUrl) fifaSource.href = payload.sourceUrl;

  if (!matches.length) {
    fifaScoreGrid.innerHTML = `<div class="fifa-empty">No FIFA matches are listed right now. Check back soon for the next fixture.</div>`;
    return;
  }

  matches.slice(0, 6).forEach((match) => {
    const card = document.createElement("article");
    card.className = `fifa-card ${matchStatusClass(match)}`;
    card.innerHTML = `
      <div class="fifa-card-top">
        <span>${match.live ? "Live" : match.completed ? "Final" : "Fixture"}</span>
        <time datetime="${match.date}">${matchTimeLabel(match)}</time>
      </div>
      ${renderTeam(match.home, "home")}
      ${renderTeam(match.away, "away")}
      <div class="fifa-card-bottom">
        <span>${match.venue || "Venue TBA"}</span>
        <span>${match.broadcasts?.join(", ") || match.statusLabel || ""}</span>
      </div>
    `;
    fifaScoreGrid.appendChild(card);
  });
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

function startFifaScoreRefresh() {
  if (state.fifaTimer) clearInterval(state.fifaTimer);
  state.fifaTimer = setInterval(() => {
    if (document.visibilityState === "visible") loadFifaScores();
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
  const selected = sourceSelect.value || "all";
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
  renderMyNews();
  renderSavedStories();
  renderContinueReading();

  if (!articles.length) {
    if (featuredStory) featuredStory.innerHTML = "";
    if (secondaryStories) secondaryStories.innerHTML = "";
    if (trendingList) trendingList.innerHTML = "";
    if (categorySections) categorySections.innerHTML = "";
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
    updateSourceOptions();
    updateHeading(payload);
    renderArticles();
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
  const requestedQuery = params.get("q") || "";
  if (requestedCountry && Array.from(countrySelect.options).some((option) => option.value === requestedCountry)) {
    countrySelect.value = requestedCountry;
  }
  if (requestedCategory && meta.categories.includes(requestedCategory)) {
    categorySelect.value = requestedCategory;
  }
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
  loadNews();
});
sortSelect.addEventListener("change", () => {
  syncSortPicker();
  renderArticles();
});
sourceSelect.addEventListener("change", () => {
  syncSourcePicker();
  renderArticles();
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
continueReadingClear?.addEventListener("click", () => {
  writeRecentStories([]);
  renderContinueReading();
  showToast(currentText().clearHistory);
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
  loadFifaScores().then(startFifaScoreRefresh)
]));
