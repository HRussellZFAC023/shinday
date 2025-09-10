// Miku Wish (gacha) system restored with animations and MikuDex
(function () {
  function els() {
    return {
      tokens: document.getElementById("WishTokens"),
      pull1: document.getElementById("WishPull1"),
      pull10: document.getElementById("WishPull10"),
      daily: document.getElementById("WishDaily"),
      convert: document.getElementById("WishConvert"),
      rotation: document.getElementById("WishRotation"),
      results: document.getElementById("WishResults"),
      dexBtn: document.getElementById("WishCollectionBtn"),
      dex: document.getElementById("mikuDex"),
    };
  }
  function poolReady() {
    return Array.isArray(window.MIKU_IMAGES) && window.MIKU_IMAGES.length > 0;
  }
  const LS = {
    tokens: "Wish.tokens",
    lastDaily: "Wish.lastDaily",
    coll: "Wish.collection",
    pityCount: "Wish.pityCount", // tracks pulls since last missing miku
  };
  function getTokens() {
    return parseInt(localStorage.getItem(LS.tokens) || "3", 10);
  }
  function setTokens(n) {
    localStorage.setItem(LS.tokens, String(Math.max(0, n)));
  }
  function getColl() {
    return JSON.parse(localStorage.getItem(LS.coll) || "{}");
  }
  function setColl(c) {
    localStorage.setItem(LS.coll, JSON.stringify(c));
  }
  function updateTokens() {
    const e = els().tokens;
    if (e) e.textContent = String(getTokens());
  }
  function canDaily() {
    const last = parseInt(localStorage.getItem(LS.lastDaily) || "0", 10) || 0;
    const d = Date.now() - last;
    return d > 1000 * 60 * 60 * 20;
  }
  function takeDaily() {
    localStorage.setItem(LS.lastDaily, String(Date.now()));
    addTokens(1);
  }
  function addTokens(n) {
    setTokens(getTokens() + n);
    updateTokens();
    SFX.play("extra.coin");
  }
  function spendTokens(n) {
    const cur = getTokens();
    if (cur < n) return false;
    setTokens(cur - n);
    updateTokens();
    return true;
  }
  function hashCode(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) {
      h = (h << 5) - h + s.charCodeAt(i);
      h |= 0;
    }
    return h >>> 0;
  }
  function rarityFor(url) {
    const r = hashCode(url) % 100;
    if (r < 12) return 1;
    if (r < 30) return 2;
    if (r < 60) return 3;
    if (r < 85) return 4;
    return 5;
  }
  function stars(n) {
    return "★".repeat(n);
  }
  function addToCollection(card) {
    const coll = getColl();
    const entry = coll[card.url] || { count: 0 };
    entry.count += 1;
    const isNew = !coll[card.url];
    if (isNew) {
      entry.new = 1;
      // Also add to NEW set for persistent tracking
      try {
        const newSet = new Set(
          JSON.parse(localStorage.getItem("Wish.newIds") || "[]"),
        );
        newSet.add(card.url);
        localStorage.setItem("Wish.newIds", JSON.stringify(Array.from(newSet)));
      } catch {}
    }
    coll[card.url] = entry;
    setColl(coll);
    return isNew;
  }
  function renderDex() {
    const { dex } = els();
    if (!dex || !poolReady()) return;
    if (window.MikuDex) window.MikuDex.renderInto(dex);
  }

  function clearNewSet() {
    try {
      localStorage.setItem("Wish.newIds", "[]");
    } catch {}
  }

  function removeNewBadges() {
    const res = document.getElementById("WishResults");
    if (res)
      res.querySelectorAll(".Wish-new").forEach((el) => el.remove());
  }

  // ====== PixieBel ★6 Unlock Ceremony ======
  const PIXIE_URL = "./assets/pixel-miku/101 - PixieBel (bonus).gif";
  function pixieUnlocked() {
    return localStorage.getItem("pixiebelUnlocked") === "1";
  }
  function setPixieUnlocked() {
    localStorage.setItem("pixiebelUnlocked", "1");
  }
  function hasAllBaseCollected() {
    const coll = getColl();
    const base = window.MIKU_IMAGES || [];
    // exclude Pixie from base if present accidentally
    const baseOnly = base.filter((u) => !/PixieBel \(bonus\)\.gif$/i.test(u));
    let owned = 0;
    baseOnly.forEach((u) => {
      if (coll[u]) owned++;
    });
    return owned >= baseOnly.length && baseOnly.length > 0;
  }
  function awardPixieBel(skipCeremony = false) {
    const coll = getColl();
    if (!coll[PIXIE_URL])
      coll[PIXIE_URL] = { count: 1, rarity: 6, new: true, multiplier: 6 };
    setColl(coll);
    setPixieUnlocked();
    
    // Skip ceremony if PixieBel was pulled normally (ceremony happens in card reveal)
    if (skipCeremony) return;
    
    // Ceremony overlay
    const ov = document.createElement("div");
    ov.setAttribute(
      "style",
      "position:fixed;inset:0;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;z-index:10002;",
    );
    const panel = document.createElement("div");
    panel.setAttribute(
      "style",
      "background:#fff;border:3px solid var(--border);border-radius:14px;box-shadow:var(--shadow);padding:16px;max-width:520px;text-align:center",
    );
    panel.innerHTML = `
      <div style="font-size:18px;font-weight:900;margin-bottom:8px">Legendary Unlocked!</div>
      <div style="font-size:14px;color:#596286;margin-bottom:10px">You discovered <strong>PixieBel</strong> ★6 • a secret companion joins your garden.</div>
      <img src="${PIXIE_URL}" alt="PixieBel" style="width:160px;height:auto;image-rendering:pixelated;border:2px solid var(--border);border-radius:10px" />
      <div style="margin-top:12px"><button class="pixel-btn" id="pixieClose">Celebrate ✨</button></div>
    `;
    ov.appendChild(panel);
    document.body.appendChild(ov);
    const close = () => ov.remove();
    panel.querySelector("#pixieClose").addEventListener("click", () => {
      try {
        window.SFX?.play?.("ui.select");
      } catch {}
      window.Hearts?.loveToast?.("PixieBel joins the celebration! ✨");
      window.refreshFloatingMikus?.();
      close();
    });
    // SFX and subtle rainbow effect
    try {
      SFX.play("extra.thanks");
    } catch {}
  }
  function showResults(cards) {
    const { results, rotation } = els();
    if (!results || !rotation) return;
    // Hide preview and results container initially
    rotation.hidden = true;
    results.hidden = true;
    // Determine container for cards (supports claw machine grid)
    const container = results.querySelector(".cm-results-container");
    // Build card HTML simultaneously (no slot spin)
    const cardHTMLs = [];
    let maxRarity = 1;
    let pulledPixie = false;
    cards.forEach((card) => {
      // Update collection and check if new
      const isNew = addToCollection(card);
      if (card.url === PIXIE_URL) pulledPixie = true;
      if (card.rarity && card.rarity > maxRarity) maxRarity = card.rarity;
      const newBadge = isNew ? '<div class="Wish-new">NEW!</div>' : "";
      cardHTMLs.push(`
        <div class="Wish-card revealing rarity-${card.rarity}">
          <div class="Wish-stars">${stars(card.rarity)}</div>
          ${newBadge}
          <img src="${card.url}" alt="Miku card" class="reveal-image"/>
        </div>
      `);
    });
    // Insert into container or results
    if (container) {
      container.innerHTML = cardHTMLs.join("");
    } else {
      results.innerHTML = cardHTMLs.join("");
    }
    // Play reveal sound once
    try {
      SFX.play("Wish.reveal");
    } catch {}
    // Play legendary thanks if a ★5 card is present
    if (maxRarity >= 5) {
      try {
        SFX.play("extra.thanks");
      } catch {}
    }

    // Determine highlight strategy: single or multi
    let highlightDuration = 1800;
    try {
      if (cards.length > 1 && typeof window.clawMachineHighlightMultiple === 'function') {
        // Multi highlight: show each card in rapid succession
        window.clawMachineHighlightMultiple(cards);
        // Compute total duration for multi highlight (approx. 520ms per card + base pop time)
        highlightDuration = cards.length * 520 + 1800;
      } else if (typeof window.clawMachineHighlightCard === 'function') {
        // Single highlight
        window.clawMachineHighlightCard(cards);
      }
    } catch {}

    // Hide the results until the highlight sequence finishes for a cleaner reveal
    if (results) {
      results.hidden = true;
    }

    // Schedule showing the results grid after the highlight
    setTimeout(() => {
      if (results) {
        results.hidden = false;
        results.style.opacity = "1";
      }
      // Refresh MikuDex when results become visible
      renderDex();
      // Handle PixieBel scenarios (legendary bonus)
      try {
        if (pulledPixie && !pixieUnlocked()) {
          // PixieBel obtained by luck
          setTimeout(() => awardPixieBel(false), 250);
        } else if (!pixieUnlocked() && hasAllBaseCollected()) {
          // Unlock PixieBel after completing base collection
          awardPixieBel();
        }
      } catch {}
    }, highlightDuration);
  }
  function getPityCount() {
    return parseInt(localStorage.getItem(LS.pityCount) || "0", 10);
  }
  function setPityCount(n) {
    localStorage.setItem(LS.pityCount, String(Math.max(0, n)));
  }
  function incrementPity() {
    setPityCount(getPityCount() + 1);
  }
  function resetPity() {
    setPityCount(0);
  }
  function getMissingMikus() {
    const coll = getColl();
    const all = window.MIKU_IMAGES || [];
    return all.filter((url) => !coll[url]);
  }
  function pickRandom(n = 1, guaranteeMissing = false) {
    const out = [];
    const list = window.MIKU_IMAGES || [];
    const missing = getMissingMikus();

    // Apply rare-drop bias if a singer is set (toward 4★+ images)
    const rareBias = (function () {
      try {
        return typeof window.getSingerRareDropBonus === "function"
          ? getSingerRareDropBonus()
          : 0;
      } catch (_) {
        return 0;
      }
    })();

    for (let i = 0; i < n; i++) {
      let url;

      // For x10 pulls, guarantee at least one missing miku if pity >= 10
      const shouldGuarantee =
        guaranteeMissing &&
        missing.length > 0 &&
        i === Math.floor(Math.random() * n); // random position to avoid pattern

      if (shouldGuarantee) {
        url = missing[Math.floor(Math.random() * missing.length)];
        resetPity(); // reset pity counter when we get a missing miku
      } else {
        // Weighted pick with rare bias
        if (list.length) {
          // Split pool by rarity
          const commons = [];
          const rares = [];
          for (const u of list) {
            const r = rarityFor(u);
            (r >= 4 ? rares : commons).push(u);
          }
          const baseCommonW = commons.length;
          const baseRareW = rares.length;
          const rw = Math.max(0, Math.round(baseRareW * (1 + rareBias)));
          const cw = Math.max(0, baseCommonW);
          const totalW = rw + cw || 1;
          const pickRare = Math.random() * totalW < rw;
          const pool = pickRare && rares.length ? rares : commons.length ? commons : list;
          url = pool[Math.floor(Math.random() * pool.length)];
        } else {
          url = list[Math.floor(Math.random() * list.length)];
        }
        const coll = getColl();
        if (!coll[url]) {
          resetPity(); // also reset if we naturally get a missing miku
        }
      }

      out.push({ url, rarity: rarityFor(url) });
    }
    return out;
  }
  function startRoll(n) {
    if (!poolReady()) return;
    if (!spendTokens(n)) {
      SFX.play("ui.unavailable");
      return;
    }

    // Check pity system
    const pityCount = getPityCount();
    const shouldGuarantee = pityCount >= 10 && n === 10; // only apply to x10 pulls

    const cards = pickRandom(n, shouldGuarantee);

    // Increment pity for each pull (will be reset in pickRandom if missing miku obtained)
    for (let i = 0; i < n; i++) {
      incrementPity();
    }

    showResults(cards);
  }
  function resetUI() {
    const { results, rotation, dex, dexBtn } = els();
    if (results) {
      results.hidden = true;
      removeNewBadges();
      results.innerHTML = "";
    }
    if (rotation) rotation.hidden = false;
    if (dex) {
      const wasOpen = !dex.classList.contains("hidden");
      dex.classList.add("hidden");
      if (wasOpen) clearNewSet();
    }
    if (dexBtn) dexBtn.textContent = "Open MikuDex";

    // Clear any leftover render or card reveal in the claw machine when resetting UI
    try {
      if (typeof window.clawMachineResetHighlight === 'function') {
        window.clawMachineResetHighlight();
      }
    } catch {}
  }
  function wire() {
    const e = els();
    if (!Object.values(e).every(Boolean)) return;
    updateTokens();
    e.pull1.onclick = () => startRoll(1);
    e.pull10.onclick = () => startRoll(10);
    e.convert.onclick = () => {
      const h = parseInt(localStorage.getItem("pixelbelle-hearts") || "0", 10);
      if (h >= 100) {
        localStorage.setItem("pixelbelle-hearts", String(h - 100));
        addTokens(1);
        window.Hearts.updateCounters && window.Hearts.updateCounters();
      } else {
        SFX.play("ui.unavailable");
      }
    };
    e.daily.onclick = () => {
      if (canDaily()) {
        takeDaily();
      } else {
        SFX.play("ui.unavailable");
      }
    };
    e.dexBtn.onclick = () => {
      e.dex.classList.toggle("hidden");
      if (!e.dex.classList.contains("hidden")) {
        renderDex();
        e.dex.classList.add("dex-open");
        setTimeout(() => e.dex.classList.remove("dex-open"), 500);
        e.dexBtn.textContent = "Close MikuDex";
      } else {
        clearNewSet();
        removeNewBadges();
        e.dexBtn.textContent = "Open MikuDex";
      }
      SFX.play("ui.change");
      if (Math.random() < 0.3) SFX.play("extra.fx1");
    };
    const reel = e.rotation && e.rotation.querySelector(".preview-image");
    if (reel) {
      const tick = () => {
        if (!poolReady()) return;
        const [card] = pickRandom(1);
        reel.src = card.url;
      };
      setInterval(tick, 1200);
    }
    resetUI();
  }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", wire);
  else wire();
  window.__resetWish = resetUI;
  window.Wish = { renderDex };
})();