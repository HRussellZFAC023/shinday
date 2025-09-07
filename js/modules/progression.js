// Progression module: level, XP, and song unlock helpers
(function () {
  const LS_LEVEL = "study.level";
  const LS_XP = "study.xp";
  const XP_PER_LEVEL = 100;

  const listeners = new Set();

  function getLevel() {
    const v = parseInt(localStorage.getItem(LS_LEVEL) || "1", 10);
    return Number.isFinite(v) ? Math.max(1, v) : 1;
  }
  function getXp() {
    const v = parseInt(localStorage.getItem(LS_XP) || "0", 10);
    return Number.isFinite(v) ? Math.max(0, v) : 0;
  }
  function getProgress() {
    const level = getLevel();
    const xp = getXp();
    const into = xp % XP_PER_LEVEL;
    const need = XP_PER_LEVEL;
    const pct = Math.min(100, Math.floor((into / need) * 100));
    return { level, xp, into, need, pct };
  }
  function emit() {
    const s = getProgress();
    listeners.forEach((fn) => {
      try {
        fn(s);
      } catch (_) {}
    });
  }
  function onChange(cb) {
    if (typeof cb === "function") {
      listeners.add(cb);
    }
    return () => listeners.delete(cb);
  }

  function setLevel(n) {
    try {
      localStorage.setItem(LS_LEVEL, String(Math.max(1, n | 0)));
    } catch (_) {}
    emit();
  }
  function setXp(n) {
    try {
      localStorage.setItem(LS_XP, String(Math.max(0, n | 0)));
    } catch (_) {}
    emit();
  }
  function addXp(delta) {
    let xp = getXp() + (delta | 0);
    let lvl = getLevel();
    while (xp >= lvl * XP_PER_LEVEL) lvl++;
    try {
      localStorage.setItem(LS_XP, String(xp));
    } catch (_) {}
    try {
      localStorage.setItem(LS_LEVEL, String(lvl));
    } catch (_) {}
    // HUD update (if present)
    try {
      const bar = document.getElementById("hudLevelProgress");
      const txt = document.getElementById("hudLevelText");
      const pct = Math.min(
        100,
        Math.floor(((xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100),
      );
      if (bar) bar.style.width = pct + "%";
      if (txt) txt.textContent = `Level ${lvl} • ${pct}%`;
    } catch (_) {}
    emit();
    return { level: lvl, xp };
  }

  // Provide API (with camelCase alias)
  window.Progression = {
    XP_PER_LEVEL,
    getLevel,
    getXp,
    getProgress,
    setLevel,
    setXp,
    addXp,
    onChange,
  };
  window.Progression.addXP = addXp; // alias
})();
