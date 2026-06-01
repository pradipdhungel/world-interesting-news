(function () {
  if (!window.NewsSeo) return;
  const title = document.querySelector("h1")?.textContent || "World Interesting News";
  const description = document.querySelector('meta[name="description"]')?.content || NewsSeo.site.description;
  NewsSeo.setPageMeta({
    title: `${title} | World Interesting News`,
    description,
    canonical: window.location.pathname
  });
  NewsSeo.setJsonLd("organization", NewsSeo.organizationJsonLd());
  NewsSeo.setJsonLd("website", NewsSeo.websiteJsonLd());
  NewsSeo.setJsonLd("breadcrumb", NewsSeo.breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: title, url: window.location.pathname }
  ]));
})();
