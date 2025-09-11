// 🎀 MIKU ORCHESTRATOR! 🎀
// All functionality has been distributed to themed modules. This is pure orchestration.

// ========== SITE INITIALIZATION ORCHESTRATOR ==========
console.log("🎵 Initializing Miku systems...");

// Visitor counter (Neocities-aware)
// Priority: Use Neocities API "hits" when hosted on *.neocities.org.
// Fallback: localStorage per-browser counter when API isn't reachable.
(function () {
  const el = document.getElementById("visitorCount");
  if (!el) return;

  // Fallback local counter helper
  const localBump = () => {
    try {
      const k = "pixelbelle-visitors";
      const c = (parseInt(localStorage.getItem(k) || "0", 10) || 0) + 1;
      localStorage.setItem(k, String(c));
      el.textContent = String(c);
    } catch (_) {
      // last-resort: show 1
      el.textContent = "1";
    }
  };

  // Only attempt Neocities integration if hosted on *.neocities.org
  const host = (location && location.hostname) || "";
  const isNeo = /\.neocities\.org$/i.test(host);
  const siteName = (function () {
    try {
      if (isNeo) return host.split(".")[0];
    } catch (_) {}
    return "babybelle"; // safe default for this site
  })();

  if (!isNeo) {
    // Not on Neocities – use local counter so development/other hosts still work
    localBump();
    return;
  }

  // Many Neocities sites use a strict CSP (connect-src 'self') which blocks
  // any cross-origin fetch, including via proxies. To avoid console errors and
  // still show something meaningful, prefer an image-based badge (served as an
  // <img>, not XHR). This does not use connect-src and typically works under
  // strict CSPs. If it fails, we fall back to a local counter.
  try {
    const badgeSrc = (window.SITE_CONTENT && window.SITE_CONTENT.status && window.SITE_CONTENT.status.visitorBadgeTemplate)
      ? window.SITE_CONTENT.status.visitorBadgeTemplate.replace("{site}", siteName)
      : `https://visitor-badge.laobi.icu/badge?page_id=${siteName}.neocities.org&left_text=friends:`;
    const img = new Image();
    img.alt = "Visitors";
    img.decoding = "async";
    img.referrerPolicy = "no-referrer";
    img.src = badgeSrc;
    img.style.verticalAlign = "middle";
    img.onload = () => {
      // Replace the numeric span with the badge
      el.textContent = "";
      el.appendChild(img);
      // Hide the static label to avoid duplicate text (badge already includes it)
      const wrapper = el.closest('.visitor-counter');
      const label = wrapper ? wrapper.querySelector('.counter-label') : null;
      if (label) label.style.display = 'none';
    };
    img.onerror = () => {
      // Could not load cross-origin image; fall back to local counter
      localBump();
    };
  } catch (_) {
    localBump();
  }
})();

// Initialize games if available
// window.Games.initialize();

// Initialize jukebox if available
// Restore hooks

console.log("✨ Miku systems online!");

// Show welcome notification

window.initSite = function () {
  console.log("🎀 Miku Orchestrator loaded!");
  window.MikuUI.initializeContent();
  window.AudioMod.initBgm();
  window.Radio.init();
  window.ShimejiFunctions.init();
  window.Hearts.initHearts();
  window.shop && window.shop.initShop();
  window.socials && window.socials.initSocials();
  window.Jukebox.initialize();
  window.navi.initNavigation();
  // greet on first visit only
  const visited = localStorage.getItem("pixelbelle-visited");
  if (!visited) {
    localStorage.setItem("pixelbelle-visited", "1");
    window.Hearts.loveToast("Welcome to Baby Belle's Pixel Garden! ✨", "miku");
  }
};
