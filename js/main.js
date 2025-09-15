// 🎀 MIKU ORCHESTRATOR! 🎀
// All functionality has been distributed to themed modules. This is pure orchestration.

// ========== SITE INITIALIZATION ORCHESTRATOR ==========
// Language preference bootstrap (runs before content.js renders splash)
(() => {
  try {
    const params = new URLSearchParams((location && location.search) || "");
    const urlLang = (params.get('lang') || '').toLowerCase();
    const saved = localStorage.getItem('site.lang');
    const nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    const map = (code) => {
      if (!code) return 'en';
      if (code.startsWith('ja')) return 'ja';
      if (code.startsWith('es')) return 'es';
      if (code.startsWith('de')) return 'de';
      if (code.startsWith('fr')) return 'fr';
      if (code.startsWith('zh')) return 'zh';
      return 'en';
    };
    const preferred = (urlLang && map(urlLang)) || saved || map(nav);
    window.PREFERRED_LANG = preferred;
    try { document.documentElement.setAttribute('lang', preferred); } catch(_) {}
  } catch (_) {}
})();
console.log("🎵 Initializing Miku systems...");

// Visitor counter (prefers Neocities API via GitHub Pages proxy; falls back gracefully)
async function initVisitorCounter() {
  const el = document.getElementById("visitorCount");
  if (!el) return;

  const FALLBACK_KEY = "pixelbelle-visitors";
  const SITE_NAME = "babybelle"; // used for image fallback badge
  const PROXY_TIMEOUT = 9000;

  async function setLocalFallback() {
    const c = (parseInt(localStorage.getItem(FALLBACK_KEY) || "0", 10) || 0) + 1;
    localStorage.setItem(FALLBACK_KEY, String(c));
    el.textContent = String(c);
  }

  function setImageBadgeFallback() {
    try {
      const tpl = window.SITE_CONTENT?.status?.visitorBadgeTemplate;
      if (!tpl) return false;
      let wrap = el.closest(".visitor-counter");
      if (!wrap) return false;
      // Ensure wrapper is an anchor so the entire box is clickable
      if (wrap.tagName.toLowerCase() !== "a") {
        const a = document.createElement("a");
        a.className = wrap.className || "visitor-counter";
        a.setAttribute("data-visitor-counter", "");
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener");
        // preserve position in DOM
        wrap.parentNode.replaceChild(a, wrap);
        a.appendChild(wrap);
        wrap = a;
      }

      // Clear the textual counter label when showing an image badge fallback
      const existingLabel = wrap.querySelector(".counter-label");
      if (existingLabel) existingLabel.textContent = "";

      const img = document.createElement("img");
      img.alt = "visitor count";
      img.className = "visitor-badge";
      img.referrerPolicy = "strict-origin-when-cross-origin";
      img.src = tpl.replace("{site}", SITE_NAME);

      // Replace inner content with image (and keep label element if needed for layout)
      wrap.innerHTML = "";
      wrap.appendChild(img);

      // If SITE_CONTENT provides a stats URL, use it for the anchor href
      const statsUrl =
        (window.SITE_CONTENT && window.SITE_CONTENT.status && window.SITE_CONTENT.status.statsUrl) ||
        `https://neocities.org/site/${SITE_NAME}`;
      try {
        wrap.setAttribute("href", statsUrl);
      } catch (_) {}
      return true;
    } catch (_) {
      return false;
    }
  }

  async function fetchViaProxy() {
    const proxyBridge = window.CspProxy;
    const proxyUrl = window.SITE_CONTENT?.proxy?.pageUrl;
    if (!proxyBridge || !proxyUrl) throw new Error("proxy unavailable");
    await proxyBridge.ensure(proxyUrl);
    const res = await proxyBridge.request(
      "fetchNeocitiesInfo",
      { sitename: SITE_NAME },
      PROXY_TIMEOUT
    );
    const count = res && (res.views ?? res.hits);
    if (count == null) throw new Error("missing count");
    return count;
  }

  async function fetchViaAllOrigins() {
    const neocitiesInfo = "https://neocities.org/api/info?sitename=" + encodeURIComponent(SITE_NAME);
    const url = "https://api.allorigins.win/raw?url=" + encodeURIComponent(neocitiesInfo);
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("bad status");
    let data;
    const ct = (res.headers.get("content-type") || "").toLowerCase();
    if (ct.includes("application/json")) data = await res.json();
    else {
      const txt = await res.text();
      data = JSON.parse(txt);
    }
    const v = (data && data.info && (data.info.views ?? data.info.hits)) || null;
    if (v == null) throw new Error("missing count");
    return v;
  }

  try {
    const viaProxy = await fetchViaProxy();
    el.textContent = String(viaProxy);
    return;
  } catch (proxyError) {
    console.warn("[Visitor Counter] Proxy fetch failed", proxyError);
  }

  try {
    const viaApi = await fetchViaAllOrigins();
    el.textContent = String(viaApi);
    return;
  } catch (apiError) {
    console.warn("[Visitor Counter] Direct fetch fallback failed", apiError);
  }

  // Prefer an image badge fallback if configured; otherwise use local counter
  if (!setImageBadgeFallback()) await setLocalFallback();
}

function scheduleVisitorCounter() {
  const run = () => {
    initVisitorCounter().catch((err) => {
      console.error("[Visitor Counter] Initialization failed", err);
    });
  };
  if (document.readyState === "complete" || document.readyState === "interactive") {
    run();
  } else {
    document.addEventListener(
      "DOMContentLoaded",
      run,
      { once: true }
    );
  }
}

scheduleVisitorCounter();

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
    try {
      const C = window.SITE_CONTENT || {};
      const siteName = (C.site && (C.site.title || C.splash?.title)) || "the garden";
      const msg = (C.alerts && C.alerts.welcome) || `Welcome to ${siteName}! ✨`;
      window.Hearts.loveToast(msg, "miku");
    } catch (_) {
      window.Hearts.loveToast("Welcome! ✨", "miku");
    }
  }
};
