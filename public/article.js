const params = new URLSearchParams(window.location.search);
const articleId = params.get("id");
const articles = JSON.parse(localStorage.getItem("worldNewsArticles") || "[]");
const article = articles.find((item) => item.id === articleId);

const media = document.querySelector("#reader-media");
const source = document.querySelector("#reader-source");
const date = document.querySelector("#reader-date");
const title = document.querySelector("#reader-title");
const summary = document.querySelector("#reader-summary");
const keyPoints = document.querySelector("#reader-key-points");
const why = document.querySelector("#reader-why");
const context = document.querySelector("#reader-context");
const sourceLink = document.querySelector("#reader-source-link");
const relatedList = document.querySelector("#related-list");
const readerTime = document.querySelector("#reader-time");
const copyLink = document.querySelector("#copy-link");
const shareX = document.querySelector("#share-x");
const themeToggle = document.querySelector("#theme-toggle");

function formatDate(value) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Recent";
  return parsed.toLocaleString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function readingTime(article) {
  const words = `${article.title || ""} ${article.summary || ""}`.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(2, Math.ceil(words / 85))} min read`;
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

function renderMissing() {
  title.textContent = "Story not found";
  summary.textContent = "Please return to the news list and open the story again.";
  keyPoints.innerHTML = "<li>The story data is no longer available in this browser session.</li>";
  why.textContent = "Open the news list again to reload the latest stories.";
  context.textContent = "Story previews are stored locally after the news feed loads.";
  relatedList.innerHTML = "";
  source.textContent = "World Interesting News";
  date.textContent = "";
  sourceLink.href = "/";
  sourceLink.textContent = "Back to news";
  if (readerTime) readerTime.textContent = "";
}

function cleanTitle(value) {
  return String(value || "")
    .replace(/\s+-\s+[^-]+$/, "")
    .replace(/\s+\|\s+.+$/, "")
    .trim();
}

function sentenceList(value) {
  return String(value || "")
    .split(/(?<=[.!?।])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function buildBrief(article) {
  const sentences = sentenceList(article.summary);
  if (sentences.length >= 2) return sentences.slice(0, 2).join(" ");
  if (sentences.length === 1 && sentences[0] !== article.title) return sentences[0];
  return `${cleanTitle(article.title)} is a developing story reported by ${article.source?.name || "the source"}. This brief highlights the available facts and points readers to the original report for full details.`;
}

function buildKeyPoints(article) {
  const baseTitle = cleanTitle(article.title);
  const sourceName = article.source?.name || "the original publisher";
  const points = [
    baseTitle,
    `The story was reported by ${sourceName}.`,
    article.publishedAt ? `It was published or updated around ${formatDate(article.publishedAt)}.` : "The story is part of the latest news feed."
  ];

  const extra = sentenceList(article.summary)
    .filter((sentence) => sentence.length > 40 && sentence !== article.title)
    .slice(0, 2);

  return [...points, ...extra].slice(0, 5);
}

function buildWhyItMatters(article) {
  const category = article.category || "news";
  const country = article.country || "the selected region";
  return `This story matters because it is connected to ${category} developments affecting ${country}. Tracking it can help readers understand what changed, who may be affected, and what could happen next.`;
}

function buildContext(article) {
  const sourceName = article.source?.name || "the original publisher";
  return `World Interesting News is showing an original short brief, not a copied full article. For the complete reporting, details, quotes, and updates, continue to ${sourceName} using the source link below.`;
}

function relatedStories(article) {
  return articles
    .filter((item) => item.id !== article.id)
    .map((item) => {
      let score = 0;
      if (item.source?.name === article.source?.name) score += 3;
      if (item.category === article.category) score += 2;
      if (item.country === article.country) score += 1;
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ item }) => item);
}

function renderRelated(article) {
  relatedList.innerHTML = "";
  const related = relatedStories(article);

  if (!related.length) {
    relatedList.innerHTML = '<p class="related-empty">No related stories in the current feed.</p>';
    return;
  }

  related.forEach((item) => {
    const link = document.createElement("a");
    link.className = "related-card";
    link.href = `/article.html?id=${encodeURIComponent(item.id)}`;
    link.innerHTML = `
      <span>${item.source?.name || "Unknown source"}</span>
      <strong>${item.title}</strong>
    `;
    relatedList.appendChild(link);
  });
}

function renderArticle() {
  document.title = `${article.title} | World Interesting News`;
  source.textContent = article.source?.name || "Unknown source";
  date.textContent = formatDate(article.publishedAt);
  if (readerTime) readerTime.textContent = readingTime(article);
  title.textContent = article.title;
  summary.textContent = buildBrief(article);
  keyPoints.innerHTML = "";
  buildKeyPoints(article).forEach((point) => {
    const item = document.createElement("li");
    item.textContent = point;
    keyPoints.appendChild(item);
  });
  why.textContent = buildWhyItMatters(article);
  context.textContent = buildContext(article);
  sourceLink.href = article.url;
  if (shareX) {
    shareX.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`;
  }
  renderRelated(article);

  if (article.image) {
    media.style.backgroundImage = `url("${article.image}")`;
    media.classList.add("has-reader-image");
  } else {
    media.classList.add("reader-generated");
    media.innerHTML = `<span>${article.country || "World"}</span>`;
  }
}

copyLink?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    copyLink.textContent = "Copied";
  } catch {
    copyLink.textContent = "Copy failed";
  }
  setTimeout(() => {
    copyLink.textContent = "Copy link";
  }, 1800);
});

themeToggle?.addEventListener("click", () => {
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

initTheme();

if (article) {
  renderArticle();
} else {
  renderMissing();
}
