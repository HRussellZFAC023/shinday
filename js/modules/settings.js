// Settings utilities (early load)
(function () {
  if (window.Settings) return;
  const KEYS = {
    reduceMotion: "settings.reduceMotion",
    vfx: "settings.vfx",
    swallower: "settings.swallowerRate",
    typing: "settings.typingAids",
  };
  const lsGet = (k, d = "") => {
    try {
      const v = localStorage.getItem(k);
      return v == null ? d : v;
    } catch (_) {
      return d;
    }
  };
  const lsSet = (k, v) => {
    try {
      localStorage.setItem(k, v);
    } catch (_) {}
  };
  function isReducedMotion() {
    try {
      const pref = lsGet(KEYS.reduceMotion, "");
      if (pref === "1") return true;
      if (pref === "0") return false;
    } catch (_) {}
    try {
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    } catch (_) {
      return false;
    }
  }
  function isVfxEnabled() {
    return lsGet(KEYS.vfx, "1") !== "0";
  }
  function swallowerRate() {
    const v = lsGet(KEYS.swallower, "normal");
    if (v === "off") return 0;
    if (v === "low") return 0.5;
    if (v === "high") return 1.5;
    return 1;
  }
  function isTypingAids() {
    return lsGet(KEYS.typing, "0") === "1";
  }
  window.Settings = {
    isReducedMotion,
    isVfxEnabled,
    swallowerRate,
    isTypingAids,
    get: lsGet,
    set: lsSet,
    KEYS,
  };
  // Back-compat global to avoid ReferenceError in older code paths
  if (!window.isReducedMotion) window.isReducedMotion = isReducedMotion;
})();
