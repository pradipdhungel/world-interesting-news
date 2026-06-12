const params = new URLSearchParams(window.location.search);
const articleId = params.get("id");
const articles = JSON.parse(localStorage.getItem("worldNewsArticles") || "[]");
const article = articles.find((item) => item.id === articleId);

const media = document.querySelector("#reader-media");
const source = document.querySelector("#reader-source");
const date = document.querySelector("#reader-date");
const updated = document.querySelector("#reader-updated");
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
const readerAiButton = document.querySelector("#reader-ai-button");
const readerAiPanel = document.querySelector("#reader-ai-panel");
const readerAiContent = document.querySelector("#reader-ai-content");
const breadcrumbCurrent = document.querySelector("#breadcrumb-current");
const tagList = document.querySelector("#tag-list");
const prevArticle = document.querySelector("#prev-article");
const nextArticle = document.querySelector("#next-article");
const RECENT_STORIES_KEY = "worldNewsRecentStories";
const MAX_RECENT_STORIES = 6;

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

function articleLink(item) {
  const slug = window.NewsSeo ? NewsSeo.slugify(item.title) : item.id;
  return `/article.html?id=${encodeURIComponent(item.id)}&slug=${encodeURIComponent(slug)}`;
}

function keywordsForArticle(article) {
  if (window.NewsSeo) return NewsSeo.keywordsFor(article);
  return [article.category, article.country, article.source?.name].filter(Boolean);
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderAiInsight(insight) {
  readerAiContent.innerHTML = `
    <section>
      <h3>Quick take</h3>
      <p>${escapeHtml(insight.quickTake)}</p>
    </section>
    <section>
      <h3>Why it matters</h3>
      <p>${escapeHtml(insight.whyItMatters)}</p>
    </section>
    <section>
      <h3>What to watch</h3>
      <ul>${(insight.whatToWatch || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </section>
    <section>
      <h3>Questions to ask</h3>
      <ul>${(insight.questions || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </section>
    <p class="ai-note">${escapeHtml(insight.sourceNote)}</p>
  `;
}

async function loadAiInsight() {
  if (!article || !readerAiPanel || !readerAiContent) return;
  readerAiPanel.hidden = false;
  readerAiContent.innerHTML = '<div class="ai-loading">Generating insight...</div>';

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
    readerAiContent.innerHTML = `<div class="ai-error">AI insight is unavailable right now. ${escapeHtml(error.message)}</div>`;
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

function renderMissing() {
  title.textContent = "Story not found";
  summary.textContent = "Please return to the news list and open the story again.";
  keyPoints.innerHTML = "<li>The story data is no longer available in this browser session.</li>";
  why.textContent = "Open the news list again to reload the latest stories.";
  context.textContent = "Story previews are stored locally after the news feed loads.";
  relatedList.innerHTML = "";
  source.textContent = "World Interesting News";
  date.textContent = "";
  if (updated) updated.textContent = "";
  sourceLink.href = "/";
  sourceLink.textContent = "Back to news";
  if (readerTime) readerTime.textContent = "";
  if (window.NewsSeo) {
    NewsSeo.setPageMeta({
      title: "Story not found | World Interesting News",
      description: "This story is no longer available in the current browser session.",
      canonical: "/article.html",
      robots: "noindex, follow"
    });
  }
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

function storeRecentArticle(article) {
  try {
    const existing = JSON.parse(localStorage.getItem(RECENT_STORIES_KEY) || "[]");
    const recent = Array.isArray(existing) ? existing : [];
    const item = {
      id: article.id,
      title: article.title,
      summary: article.summary,
      url: article.url,
      image: article.image,
      category: article.category,
      country: article.country,
      publishedAt: article.publishedAt,
      updatedAt: article.updatedAt || article.publishedAt,
      interestScore: article.interestScore || 0,
      source: article.source,
      viewedAt: new Date().toISOString()
    };
    const next = [item, ...recent.filter((entry) => entry?.id !== article.id)].slice(0, MAX_RECENT_STORIES);
    localStorage.setItem(RECENT_STORIES_KEY, JSON.stringify(next));
  } catch {}
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
    link.href = articleLink(item);
    link.innerHTML = `
      <span>${item.source?.name || "Unknown source"}</span>
      <strong>${item.title}</strong>
    `;
    relatedList.appendChild(link);
  });
}

function renderTags(article) {
  if (!tagList) return;
  tagList.innerHTML = "";
  keywordsForArticle(article).slice(0, 8).forEach((keyword) => {
    const tag = document.createElement("a");
    tag.href = `/?q=${encodeURIComponent(keyword)}`;
    tag.textContent = keyword;
    tagList.appendChild(tag);
  });
}

function renderArticleNavigation(article) {
  const index = articles.findIndex((item) => item.id === article.id);
  const previous = articles[index - 1];
  const next = articles[index + 1];

  if (prevArticle) {
    prevArticle.href = previous ? articleLink(previous) : "/";
    prevArticle.textContent = previous ? `Previous: ${previous.title}` : "Back to latest news";
  }
  if (nextArticle) {
    nextArticle.href = next ? articleLink(next) : "/";
    nextArticle.textContent = next ? `Next: ${next.title}` : "More latest news";
  }
}

function updateSeo(article) {
  if (!window.NewsSeo) return;
  const canonical = articleLink(article);
  const description = buildBrief(article);
  NewsSeo.setPageMeta({
    title: `${article.title} | World Interesting News`,
    description,
    canonical,
    image: article.image || "/logo.svg",
    type: "article",
    author: "World Interesting News Editorial Team"
  });
  NewsSeo.setJsonLd("organization", NewsSeo.organizationJsonLd());
  NewsSeo.setJsonLd("website", NewsSeo.websiteJsonLd());
  NewsSeo.setJsonLd("breadcrumb", NewsSeo.breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: article.category || "News", url: `/?category=${encodeURIComponent(article.category || "top")}` },
    { name: cleanTitle(article.title), url: canonical }
  ]));
  NewsSeo.setJsonLd("article", NewsSeo.articleJsonLd(article));
  NewsSeo.setJsonLd("article-generic", {
    ...NewsSeo.articleJsonLd(article),
    "@type": "Article"
  });
  NewsSeo.setJsonLd("author", {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "World Interesting News Editorial Team",
    url: NewsSeo.absoluteUrl("/authors/editorial-team.html")
  });
}

function renderArticle() {
  document.title = `${article.title} | World Interesting News`;
  storeRecentArticle(article);
  source.textContent = article.source?.name || "Unknown source";
  date.textContent = formatDate(article.publishedAt);
  if (updated) updated.textContent = `Updated ${formatDate(article.updatedAt || article.publishedAt)}`;
  if (readerTime) readerTime.textContent = readingTime(article);
  if (breadcrumbCurrent) breadcrumbCurrent.textContent = article.category || "Story";
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
  renderTags(article);
  renderArticleNavigation(article);
  updateSeo(article);

  if (article.image) {
    media.style.backgroundImage = `url("${article.image}")`;
    media.classList.add("has-reader-image");
    media.setAttribute("role", "img");
    media.setAttribute("aria-label", `${article.title} featured image`);
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

readerAiButton?.addEventListener("click", loadAiInsight);

themeToggle?.addEventListener("click", () => {
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

initTheme();

if (article) {
  renderArticle();
} else {
  renderMissing();
}
