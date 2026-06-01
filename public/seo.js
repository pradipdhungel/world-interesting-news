(function () {
  const site = {
    name: "World Interesting News",
    description: "Source-first global news discovery with country, category, language, and publisher filters.",
    author: "World Interesting News Editorial Team",
    logo: "/logo.svg",
    defaultImage: "/logo.svg"
  };

  function absoluteUrl(path) {
    try {
      return new URL(path || "/", window.location.origin).toString();
    } catch {
      return window.location.origin + "/";
    }
  }

  function upsertMeta(selector, createAttrs, valueAttr, value) {
    let element = document.head.querySelector(selector);
    if (!element) {
      element = document.createElement("meta");
      Object.entries(createAttrs).forEach(([key, attrValue]) => element.setAttribute(key, attrValue));
      document.head.appendChild(element);
    }
    element.setAttribute(valueAttr, value);
  }

  function upsertLink(rel, href, extra = {}) {
    let element = document.head.querySelector(`link[rel="${rel}"]`);
    if (!element) {
      element = document.createElement("link");
      element.setAttribute("rel", rel);
      document.head.appendChild(element);
    }
    element.setAttribute("href", href);
    Object.entries(extra).forEach(([key, value]) => element.setAttribute(key, value));
  }

  function setJsonLd(id, data) {
    let element = document.head.querySelector(`script[data-jsonld="${id}"]`);
    if (!element) {
      element = document.createElement("script");
      element.type = "application/ld+json";
      element.dataset.jsonld = id;
      document.head.appendChild(element);
    }
    element.textContent = JSON.stringify(data);
  }

  function slugify(value) {
    return String(value || "story")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "story";
  }

  function readingTime(article) {
    const words = `${article?.title || ""} ${article?.summary || ""}`.trim().split(/\s+/).filter(Boolean).length;
    return `${Math.max(2, Math.ceil(words / 85))} min read`;
  }

  function keywordsFor(article) {
    return [
      article?.category,
      article?.country,
      article?.source?.name,
      ...(String(article?.title || "").split(/\s+/).filter((word) => word.length > 4).slice(0, 6))
    ].filter(Boolean);
  }

  function setPageMeta(options) {
    const title = options.title || site.name;
    const description = options.description || site.description;
    const canonical = absoluteUrl(options.canonical || window.location.pathname);
    const image = absoluteUrl(options.image || site.defaultImage);
    const robots = options.robots || "index, follow, max-image-preview:large";

    document.title = title;
    upsertMeta('meta[name="description"]', { name: "description" }, "content", description);
    upsertMeta('meta[name="robots"]', { name: "robots" }, "content", robots);
    upsertMeta('meta[name="author"]', { name: "author" }, "content", options.author || site.author);
    upsertMeta('meta[property="og:title"]', { property: "og:title" }, "content", title);
    upsertMeta('meta[property="og:description"]', { property: "og:description" }, "content", description);
    upsertMeta('meta[property="og:url"]', { property: "og:url" }, "content", canonical);
    upsertMeta('meta[property="og:image"]', { property: "og:image" }, "content", image);
    upsertMeta('meta[property="og:type"]', { property: "og:type" }, "content", options.type || "website");
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card" }, "content", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title" }, "content", title);
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description" }, "content", description);
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image" }, "content", image);
    upsertLink("canonical", canonical);
  }

  function organizationJsonLd() {
    return {
      "@context": "https://schema.org",
      "@type": "NewsMediaOrganization",
      name: site.name,
      url: absoluteUrl("/"),
      logo: absoluteUrl(site.logo),
      sameAs: []
    };
  }

  function websiteJsonLd() {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: site.name,
      url: absoluteUrl("/"),
      potentialAction: {
        "@type": "SearchAction",
        target: `${absoluteUrl("/")}?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };
  }

  function breadcrumbJsonLd(items) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: absoluteUrl(item.url)
      }))
    };
  }

  function articleJsonLd(article) {
    const description = article.summary || site.description;
    const image = absoluteUrl(article.image || site.defaultImage);
    const canonical = absoluteUrl(`/article.html?id=${encodeURIComponent(article.id)}&slug=${slugify(article.title)}`);
    return {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonical
      },
      headline: article.title,
      description,
      image: [image],
      datePublished: article.publishedAt || new Date().toISOString(),
      dateModified: article.updatedAt || article.publishedAt || new Date().toISOString(),
      author: {
        "@type": "Person",
        name: site.author,
        url: absoluteUrl("/authors/editorial-team.html")
      },
      publisher: {
        "@type": "NewsMediaOrganization",
        name: site.name,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl(site.logo)
        }
      },
      articleSection: article.category || "news",
      keywords: keywordsFor(article).join(", "),
      isAccessibleForFree: true
    };
  }

  function injectAnalytics(config = {}) {
    if (config.googleSearchConsoleVerification) {
      upsertMeta(
        'meta[name="google-site-verification"]',
        { name: "google-site-verification" },
        "content",
        config.googleSearchConsoleVerification
      );
    }

    if (config.googleAnalyticsId && !document.querySelector("script[data-ga-loader]")) {
      const loader = document.createElement("script");
      loader.async = true;
      loader.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.googleAnalyticsId)}`;
      loader.dataset.gaLoader = "true";
      document.head.appendChild(loader);
      const inline = document.createElement("script");
      inline.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${config.googleAnalyticsId}');`;
      document.head.appendChild(inline);
    }

    if (config.googleTagManagerId && !document.querySelector("script[data-gtm-loader]")) {
      const inline = document.createElement("script");
      inline.dataset.gtmLoader = "true";
      inline.textContent = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${config.googleTagManagerId}');`;
      document.head.appendChild(inline);
    }

    if (config.microsoftClarityId && !document.querySelector("script[data-clarity-loader]")) {
      const inline = document.createElement("script");
      inline.dataset.clarityLoader = "true";
      inline.textContent = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,'clarity','script','${config.microsoftClarityId}');`;
      document.head.appendChild(inline);
    }
  }

  window.NewsSeo = {
    site,
    absoluteUrl,
    setJsonLd,
    setPageMeta,
    organizationJsonLd,
    websiteJsonLd,
    breadcrumbJsonLd,
    articleJsonLd,
    injectAnalytics,
    slugify,
    readingTime,
    keywordsFor
  };
})();
