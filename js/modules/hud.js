// Lightweight Diva HUD + Session helpers for games
(function () {
  // Global HUD state
  const HUD = (window.HUD = window.HUD || {
    lives: 5,
    maxLives: 5,
    score: 0,
    voltage: 0,
    combo: 0,
    counts: { COOL: 0, GREAT: 0, FINE: 0, SAD: 0 },
    notes: 0,
  });

  // Sync lives to widget
  function syncLives() {
    const l = document.getElementById("hudLives");
    const m = document.getElementById("hudMaxLives");
    if (l) l.textContent = String(HUD.lives);
    if (m) m.textContent = String(HUD.maxLives);
  }
  syncLives();

  // No longer injects a separate diva-hud; judge-echo lives in main-hud
  function attachDivaHud(cardId) { /* deprecated */ }

  // Quick pulse effect on a card
  function pulse(card) {
    if (!card) return;
    card.style.transition = "box-shadow .15s ease, transform .15s ease";
    const pre = card.style.boxShadow;
    card.style.boxShadow = "0 0 0 3px rgba(165,148,249,.65) inset";
    card.style.transform = "translateY(-1px)";
    setTimeout(() => {
      card.style.boxShadow = pre || "";
      card.style.transform = "";
    }, 160);
  }

  function flashJudge(cardId, label) {
    cardId = cardId || 'languageDojoModule';
    const card = document.getElementById(cardId);
    const el = card && card.querySelector(".judge-echo");
    if (el) {
      el.textContent = label;
      el.style.opacity = "1";
      el.style.transform = "translateY(0) scale(1)";
      setTimeout(() => {
        el.style.opacity = ".0";
        el.style.transform = "translateY(-6px) scale(.96)";
      }, 350);
    }
    pulse(card);
    // Play judgment SFX if available
    const sfxMap = {
      COOL: "result.perfect",
      GREAT: "result.great",
      FINE: "result.standard",
      SAD: "result.cheap",
      MISS: "result.miss",
    };
    const id = sfxMap[label];
    if (id && window.SFX?.play) {
      window.SFX.play(id);
    }
  }

  function addVoltage(amount, cardId) {
    HUD.voltage = Math.max(0, HUD.voltage + (amount || 0));
    const card = document.getElementById(cardId);
    if (card) {
      const g = Math.max(0, Math.min(255, 80 + HUD.voltage));
      card.style.outline = `2px solid rgba(165,148,249,${Math.min(0.5, 0.1 + HUD.voltage / 80)})`;
      setTimeout(() => (card.style.outline = ""), 240);
    }
  }

  function addCombo(cardId) {
    HUD.combo++;
    // small visual hint via judge echo growth
    const card = document.getElementById(cardId);
    const el = card && card.querySelector(".judge-echo");
    if (el) el.textContent = `COMBO ${HUD.combo}`;
  }
  function resetCombo() {
    HUD.combo = 0;
  }

  function loseLife(cardId) {
    if (HUD.lives <= 0) return;
    HUD.lives--;
    syncLives();
    flashJudge(cardId, "MISS");
    if (HUD.lives <= 0) {
      // session fail
      window.Session && Session.finish && Session.finish({ reason: "lives" });
    }
  }

  // Rewards/pluses
  function awardHearts(n) {
    if (window.Hearts?.add) window.Hearts.add(n);
    else if (window.hearts?.addHearts) window.hearts.addHearts(n);
  }
  function addXP(n) {
    if (window.Progression?.addXp) window.Progression.addXp(n);
    else if (window.Progression?.addXP) window.Progression.addXP(n);
  }

  // Difficulty & rhythm params used by games
  function getJpDifficulty() {
    const el = document.getElementById("hudDifficulty");
    const v = el ? parseInt(el.value || "3", 10) : 3;
    return isNaN(v) ? 3 : v;
  }
  function diffParams() {
    const d = getJpDifficulty();
    // Lower base time at higher difficulty; higher scoring mult
    const baseTime = Math.max(6, 18 - d * 1.2);
    const mult = 1 + (d - 3) * 0.1;
    return { baseTime: Math.round(baseTime), mult };
  }
  function getRhythmMult() {
    // If beatpad/keyboard active, give a slight bonus
    return window.createFallingBeatsSystem ? 1.05 : 1;
  }

  // Singer-based global effects
  function hasSinger() {
    try {
      const u = (localStorage.getItem("singer.current") || "").trim();
      return !!u;
    } catch (_) {
      return false;
    }
  }
  function getSingerScoreMult() {
    return hasSinger() ? 1.4 : 1;
  }
  function getSingerShieldMult() {
    return hasSinger() ? 1.4 : 1;
  }
  function getSingerRareDropBonus() {
    return hasSinger() ? 0.05 : 0;
  }

  // A tiny party effect using CSS class .party if present
  function party(cardId) {
    const card = document.getElementById(cardId);
    if (!card) return;
    card.classList.add("party");
    setTimeout(() => card.classList.remove("party"), 800);
  }

  // Simple 3-minute session controller and results overlay
  const Session = (window.Session =
    window.Session ||
    (function () {
      let tId = null;
      let endsAt = 0;
      let startedAt = 0;
      function renderTimer() {
        const remain = Math.max(0, Math.floor((endsAt - Date.now()) / 1000));
        const el = document.getElementById("hudLevelText");
        if (el) {
          const min = Math.floor(remain / 60);
          const sec = String(remain % 60).padStart(2, "0");
          el.textContent = `Session ${min}:${sec}`;
        }
        if (remain <= 0) finish({ reason: "time" });
      }
      function start(opts) {
        // Reset HUD counters at session start
        HUD.score = 0;
        HUD.voltage = 0;
        HUD.combo = 0;
        HUD.counts = { COOL: 0, GREAT: 0, FINE: 0, SAD: 0 };
        HUD.notes = 0;
        HUD.lives = 5;
        HUD.maxLives = 5;
        syncLives();
        startedAt = Date.now();
        const dur = (opts && opts.seconds) || 180; // 3 minutes
        endsAt = Date.now() + dur * 1000;
        if (tId) clearInterval(tId);
        tId = setInterval(renderTimer, 1000);
        renderTimer();
      }
      function calcRank() {
        const total =
          HUD.counts.COOL + HUD.counts.GREAT + HUD.counts.FINE + HUD.counts.SAD;
        const good = HUD.counts.COOL + HUD.counts.GREAT;
        const acc = total ? good / total : 0;
        if (acc >= 0.95) return "S";
        if (acc >= 0.85) return "A";
        if (acc >= 0.7) return "B";
        if (acc >= 0.5) return "C";
        return "D";
      }
      function rewardFor(rank) {
        switch (rank) {
          case "S":
            return 10000;
          case "A":
            return 2500;
          case "B":
            return 800;
          case "C":
            return 300;
          case "D":
          default:
            return 100;
        }
      }
      function finish({ reason } = {}) {
        if (tId) clearInterval(tId);
        tId = null;
        const rank = calcRank();
        // Score-based hearts formula (consistent with Dojo modal):
        // base 1000 + floor(score/500) + level*100
        const level = (window.Progression?.getProgress?.().level) || 1;
        const base = 1000;
        const scoreBonus = Math.floor((window.HUD?.score || 0) / 500);
        const levelBonus = level * 100;
        const hearts = base + scoreBonus + levelBonus;
        awardHearts(hearts);
        // Show a lightweight toast instead of a blocking overlay
        try {
          const msg = `Session complete — Rank ${rank}. +${hearts.toLocaleString()} hearts!`;
          if (window.hearts?.lovetoast) window.hearts.lovetoast(msg);
          else {
            const t = document.createElement('div');
            t.style.cssText = 'position:fixed;left:50%;top:20px;transform:translateX(-50%);background:#fff;border:2px solid var(--border);border-radius:10px;padding:10px 14px;box-shadow:var(--shadow);z-index:99999;color:#2b2b44;font-weight:700';
            t.textContent = msg;
            document.body.appendChild(t);
            setTimeout(() => t.remove(), 2200);
          }
        } catch (_) {}
      }
      return { start, finish };
    })());

  // Auto-start a session when games start
  document.addEventListener("vocab-start", () => Session.start());
  document.addEventListener("kanji-start", () => Session.start());
  document.addEventListener("kotoba-start", () => Session.start());
  document.addEventListener("miku-chat-start", () => Session.start());

  // Expose globals expected by other modules
  window.attachDivaHud = attachDivaHud;
  window.flashJudge = flashJudge;
  window.addVoltage = addVoltage;
  window.addCombo = addCombo;
  window.resetCombo = resetCombo;
  window.loseLife = loseLife;
  window.awardHearts = awardHearts;
  window.addXP = addXP;
  window.getJpDifficulty = getJpDifficulty;
  window.diffParams = diffParams;
  window.getRhythmMult = getRhythmMult;
  window.getSingerScoreMult = getSingerScoreMult;
  window.getSingerShieldMult = getSingerShieldMult;
  window.getSingerRareDropBonus = getSingerRareDropBonus;
  window.party = party;
})();
