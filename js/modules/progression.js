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
      fn(s);
    });
  }
  function onChange(cb) {
    if (typeof cb === "function") {
      listeners.add(cb);
    }
    return () => listeners.delete(cb);
  }

  function setLevel(n) {
    localStorage.setItem(LS_LEVEL, String(Math.max(1, n | 0)));

    emit();
  }
  function setXp(n) {
    localStorage.setItem(LS_XP, String(Math.max(0, n | 0)));

    emit();
  }
  function syncHud() {
    const { level, into, need } = getProgress();
    const bar = document.getElementById("hudLevelProgress");
    const txt = document.getElementById("hudLevelText");
    const pct = Math.min(100, Math.floor((into / need) * 100));
    if (bar) bar.style.width = pct + "%";
    if (txt) {
      const bonus = Math.max(0, (level - 1) * 10);
      txt.textContent = bonus
        ? `Level ${level} • +${bonus}% rewards`
        : `Level ${level}`;
    }
  }

  function addXp(delta) {
    const mult =
      typeof window !== "undefined" && window.__xpPotionUntil > Date.now()
        ? 2
        : 1;
    const oldLvl = getLevel();
    let xp = getXp() + (delta | 0) * mult;
    let lvl = getLevel();
    const prev = lvl;
    while (xp >= lvl * XP_PER_LEVEL) lvl++;

    localStorage.setItem(LS_XP, String(xp));
    localStorage.setItem(LS_LEVEL, String(lvl));

    const bar = document.getElementById("hudLevelProgress");
    const txt = document.getElementById("hudLevelText");
    const pct = Math.min(
      100,
      Math.floor(((xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100),
    );
    if (bar) bar.style.width = pct + "%";
    if (txt) {
      const bonus = Math.max(0, (lvl - 1) * 10);
      txt.textContent = bonus
        ? `Level ${lvl} • +${bonus}% rewards`
        : `Level ${lvl}`;
    }

    if (lvl > prev) {
      if (window.SFX) window.SFX.play("hearts.milestone");
      if (window.Hearts?.loveToast)
        window.Hearts.loveToast(`レベルアップ！Level ${lvl} ✨`);
      if (window.Hearts?.add) window.Hearts.add(15);
      else if (window.Hearts?.addHearts) window.Hearts.addHearts(15);
    }

    emit();
    return { level: lvl, xp };
  }

  function initHud() {
    const { level, pct } = getProgress();
    const bar = document.getElementById("hudLevelProgress");
    const txt = document.getElementById("hudLevelText");
    if (bar) bar.style.width = pct + "%";
    if (txt) {
      const bonus = Math.max(0, (level - 1) * 10);
      txt.textContent = bonus
        ? `Level ${level} • +${bonus}% rewards`
        : `Level ${level}`;
    }
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

  window.addEventListener("DOMContentLoaded", initHud);
})();
