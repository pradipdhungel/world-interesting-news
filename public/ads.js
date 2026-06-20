(function () {
  const slotLabels = {
    homeTop: "Top story sponsor",
    feedInline: "Latest news sponsor",
    sidebar: "Sidebar sponsor",
    articleInline: "Article sponsor",
    articleSidebar: "Reader sponsor",
    footer: "Footer sponsor"
  };

  function loadAdsense(client) {
    if (!client || document.querySelector("script[data-adsense-loader]")) return;
    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.dataset.adsenseLoader = "true";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
    document.head.appendChild(script);
  }

  function placeholder(slot) {
    return `
      <span>Advertisement</span>
      <strong>${slotLabels[slot] || "Sponsor placement"}</strong>
      <p>Reserved space for approved advertising partners.</p>
    `;
  }

  function renderSlot(element, config) {
    const slot = element.dataset.adSlot || "sponsor";
    const client = config.googleAdsenseClient || "";
    const adSlotId = config.adSlots?.[slot] || "";

    element.setAttribute("aria-label", "Advertisement");
    element.dataset.adStatus = client && adSlotId ? "live" : "placeholder";

    if (!client || !adSlotId) {
      element.innerHTML = placeholder(slot);
      return;
    }

    element.innerHTML = `
      <span>Advertisement</span>
      <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="${client}"
        data-ad-slot="${adSlotId}"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
    `;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }

  function initAds(config = {}) {
    window.WorldNewsAdConfig = config;
    loadAdsense(config.googleAdsenseClient);
    document.querySelectorAll("[data-ad-slot]").forEach((element) => renderSlot(element, config));
  }

  window.WorldNewsAds = { initAds };
})();
