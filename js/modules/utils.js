// 🌸 MIKU CORE SYSTEM - EVERYTHING YOU NEED! 🌸
window.MikuCore = (function () {
  // ========== DOM UTILITIES ==========
  const $ = (id) => document.getElementById(id);
  const byId = $;

  // ========== KAWAII ICON SYSTEM ==========
  function mikuIcon(iconName, alt = "", className = "miku-icon") {
    if (!iconName) return "";
    const C = window.SITE_CONTENT || {};
    // 1) Prefer explicit mapping from SITE_CONTENT when provided
    const mapped = C.images?.mikuIcons?.[iconName];
    // 2) Built-in mapping to assets/icons with filename quirks handled
    const ICON_BASE = "./assets/icons";
    const map = {
      "star uwu": "star uwu.png",
      "jumping with music notes": "jumping with music notes.png",
      "jumping with stars": "jumping with stars.png",
      vibing: "vibing.png",
      cheering: "cheering.png",
      "love letter": "love letter.png",
      "ok hands": "ok hands.png",
      "thumbs up": "Thumbs Up!.png",
      "pow!": "pow!.png",
      love: "LOVE.png",
      "ok sign": "ok sign.png",
      stage: "stage.png",
      admiring: "Admiring.png",
      ahaha: "ahaha.png",
      chuuu: "chuuu.png",
      innocent: "innocent.png",
      "wall hide": "wall hide.png",
    };
    const key = String(iconName).trim().toLowerCase();
    const filename = map[key] || `${iconName}.png`;
    const encoded = `${ICON_BASE}/${encodeURI(filename)}`;
    const src = mapped || encoded;

    return (
      `<img src="${src}" alt="${alt}" class="${className}" ` +
      `style="width:24px;height:24px;display:inline-block;vertical-align:middle;margin:0 4px" />`
    );
  }

  // ========== SETTINGS SYSTEM ==========
  const SETTING_KEYS = {
    reduceMotion: "settings.reduceMotion",
    vfx: "settings.vfx",
    swallower: "settings.swallowerRate",
    typing: "settings.typingAids",
  };

  function getStorageItem(key, defaultValue = "") {
    const value = localStorage.getItem(key);
    return value === null ? defaultValue : value;
  }

  function setStorageItem(key, value) {
    localStorage.setItem(key, value);
  }

  function isReducedMotion() {
    const setting = getStorageItem(SETTING_KEYS.reduceMotion, "");
    if (setting === "1") return true;
    if (setting === "0") return false;

    // Check system preference
    return (
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches || false
    );
  }

  function isVfxEnabled() {
    return getStorageItem(SETTING_KEYS.vfx, "1") !== "0";
  }

  function getSwallowerRate() {
    const value = getStorageItem(SETTING_KEYS.swallower, "normal");
    switch (value) {
      case "off":
        return 0;
      case "low":
        return 0.5;
      case "high":
        return 1.5;
      default:
        return 1;
    }
  }

  function isTypingAidsEnabled() {
    return getStorageItem(SETTING_KEYS.typing, "0") === "1";
  }

  // ========== ERROR HANDLING - NO MORE TRY BLOCKS! ==========
  function createErrorDisplay(
    container,
    message = "Something went wrong!",
    retryFn = null,
  ) {
    if (!container) return;

    const errorHtml = `
      <div class="miku-error" style="
        display:flex;align-items:center;justify-content:center;gap:8px;
        padding:12px;background:#ffebee;border:2px solid #ffcdd2;
        border-radius:8px;color:#c62828;font-weight:600;
      ">
        <span>⚠️ ${message}</span>
        ${retryFn ? '<button class="pixel-btn" id="errorRetryBtn">Try Again</button>' : ""}
      </div>
    `;

    container.innerHTML = errorHtml;

    if (retryFn) {
      const retryBtn = container.querySelector("#errorRetryBtn");
      if (retryBtn) retryBtn.addEventListener("click", retryFn);
    }
  }

  // ========== NETWORK UTILITIES ==========
  async function fetchWithTimeout(url, options = {}) {
    const { timeout = 8000, ...fetchOptions } = options;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response;
  }

  // ========== TELEMETRY - KAWAII ANALYTICS ==========
  function logMikuEvent(eventName, value = 1) {
    if (getStorageItem("telemetry.enabled", "0") !== "1") return;

    const key = `telemetry.${eventName}`;
    const currentCount = parseInt(getStorageItem(key, "0"), 10) || 0;
    setStorageItem(key, String(currentCount + value));
    setStorageItem(`${key}.timestamp`, String(Date.now()));
  }

  // ========== TIMER MANAGEMENT ==========
  const activeTimers = {
    intervals: new Set(),
    timeouts: new Set(),
  };

  function setTrackedInterval(callback, delay) {
    const id = setInterval(callback, delay);
    activeTimers.intervals.add(id);
    return id;
  }

  function setTrackedTimeout(callback, delay) {
    const id = setTimeout(callback, delay);
    activeTimers.timeouts.add(id);
    return id;
  }

  function clearAllTimers() {
    activeTimers.intervals.forEach(clearInterval);
    activeTimers.timeouts.forEach(clearTimeout);
    activeTimers.intervals.clear();
    activeTimers.timeouts.clear();
  }

  // ========== GLOBAL ASSIGNMENTS FOR COMPATIBILITY ==========
  window.$ = $;
  window.byId = byId;
  window.mikuIcon = mikuIcon;
  window.friendlyError = createErrorDisplay;
  window.fetchWithTimeout = fetchWithTimeout;
  window.logEvent = logMikuEvent;
  window.setIntervalTracked = setTrackedInterval;
  window.setTimeoutTracked = setTrackedTimeout;
  window.GLOBAL_TIMERS = { clearAll: clearAllTimers };

  // Settings compatibility
  window.Settings = {
    isReducedMotion,
    isVfxEnabled,
    swallowerRate: getSwallowerRate,
    isTypingAids: isTypingAidsEnabled,
    get: getStorageItem,
    set: setStorageItem,
    KEYS: SETTING_KEYS,
  };
  window.isReducedMotion = isReducedMotion;

  // Cleanup on page unload
  window.addEventListener("beforeunload", clearAllTimers);

  // Public API
  return {
    $,
    byId,
    mikuIcon,
    settings: {
      isReducedMotion,
      isVfxEnabled,
      getSwallowerRate,
      isTypingAidsEnabled,
      get: getStorageItem,
      set: setStorageItem,
      KEYS: SETTING_KEYS,
    },
    error: { createDisplay: createErrorDisplay },
    network: { fetchWithTimeout },
    telemetry: { log: logMikuEvent },
    timers: {
      setInterval: setTrackedInterval,
      setTimeout: setTrackedTimeout,
      clearAll: clearAllTimers,
    },
  };
})();
