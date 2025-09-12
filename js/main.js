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

// Visitor counter (prefers Neocities API via AllOrigins; falls back gracefully)
(async function () {
  const el = document.getElementById("visitorCount");
  if (!el) return;

  const FALLBACK_KEY = "pixelbelle-visitors";
  const SITE_NAME = "babybelle"; // used for image fallback badge

  async function setLocalFallback() {
    const c = (parseInt(localStorage.getItem(FALLBACK_KEY) || "0", 10) || 0) + 1;
    localStorage.setItem(FALLBACK_KEY, String(c));
    el.textContent = String(c);
  }

  function setImageBadgeFallback() {
    try {
      const tpl = window.SITE_CONTENT?.status?.visitorBadgeTemplate;
      if (!tpl) return false;
      const wrap = el.closest(".visitor-counter");
      if (!wrap) return false;
      const label = document.createElement("span");
      label.className = "counter-label";
      const icon = window.MikuCore?.mikuIcon
        ? window.MikuCore.mikuIcon(window.SITE_CONTENT?.status?.visitorIcon || "", "")
        : "";
      label.innerHTML = `${icon}${(window.SITE_CONTENT?.status?.visitorsLabel) || "friends:"}`;
      const img = document.createElement("img");
      img.alt = "visitor count";
      img.className = "visitor-badge";
      img.referrerPolicy = "no-referrer";
      img.src = tpl.replace("{site}", SITE_NAME);
      wrap.innerHTML = "";
      wrap.appendChild(label);
      wrap.appendChild(img);
      return true;
    } catch (_) {
      return false;
    }
  }

  try {
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
    if (v != null) {
      el.textContent = String(v);
      return;
    }
    throw new Error("missing count");
  } catch (err) {
    // Likely blocked by CSP on Neocities free, or network error
    // Try iframe proxy if configured
    try {
      if (window.CspProxy && window.SITE_CONTENT?.proxy?.pageUrl) {
        await window.CspProxy.ensure(window.SITE_CONTENT.proxy.pageUrl);
        const res = await window.CspProxy.request("fetchNeocitiesInfo", { sitename: SITE_NAME }, 9000);
        const v = res && (res.views ?? res.hits);
        if (v != null) {
          el.textContent = String(v);
          return;
        }
      }
    } catch (_) {}

    // Prefer an image badge fallback if configured; otherwise use local counter
    if (!setImageBadgeFallback()) await setLocalFallback();
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
