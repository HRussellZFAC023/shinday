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
    // Prefer explicit rarity from metadata (same source used by dex)
    const meta =
      typeof window.getMikuMeta === "function" ? window.getMikuMeta(url) : null;

    if (meta && Number.isFinite(meta.rarity)) return meta.rarity; // 1..6

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
          JSON.parse(localStorage.getItem("Wish.newIds") || "[]")
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
    if (res) res.querySelectorAll(".Wish-new").forEach((el) => el.remove());
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
      "position:fixed;inset:0;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;z-index:10002;"
    );
    const panel = document.createElement("div");
    panel.setAttribute(
      "style",
      "background:#fff;border:3px solid var(--border);border-radius:14px;box-shadow:var(--shadow);padding:16px;max-width:520px;text-align:center"
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
    rotation.hidden = true;
    results.hidden = false;
    const previewPool = (window.MIKU_IMAGES || []).filter(
      (u) => !/PixieBel \(bonus\)\.gif$/i.test(u)
    );
    const previewImg = previewPool[0] || cards[0]?.url || "";
    results.innerHTML = cards
      .map(
        (c, i) => `
        <div class="Wish-card slot-machine rarity-${
          c.rarity
        }" data-index="${i}">
          <div class="Wish-stars">${stars(c.rarity)}</div>
          <div class="slot-reel">
            <img class="reel-image" src="${previewImg}" alt="Miku"/>
          </div>
          <div class="slot-sparkles"></div>
        </div>`
      )
      .join("");
    SFX.play("Wish.roll");
    cards.forEach((c, cardIndex) => {
      const cardEl = results.querySelector(
        `.Wish-card[data-index="${cardIndex}"]`
      );
      if (!cardEl) return;
      const reelImg = cardEl.querySelector(".reel-image");
      const sparkles = cardEl.querySelector(".slot-sparkles");
      const createSparkle = () => {
        if (!sparkles) return;
        const s = document.createElement("div");
        s.className = "sparkle";
        s.style.left = Math.random() * 100 + "%";
        s.style.top = Math.random() * 100 + "%";
        s.textContent = ["✨", "⭐", "💫", "🌟"][Math.floor(Math.random() * 4)];
        sparkles.appendChild(s);
        setTimeout(() => s.remove(), 800);
      };
      const pool = previewPool.length ? previewPool : window.MIKU_IMAGES || [];
      const spinInterval = setInterval(() => {
        if (reelImg && pool.length) {
          const randomImg = pool[Math.floor(Math.random() * pool.length)];
          reelImg.src = randomImg;
          reelImg.style.transform = `scale(${
            0.9 + Math.random() * 0.2
          }) rotate(${-5 + Math.random() * 10}deg)`;
          if (Math.random() < 0.7) createSparkle();
        }
      }, 150);
      setTimeout(() => {
        clearInterval(spinInterval);
        const isNew = addToCollection(c);
        const newBadge = isNew ? '<div class="Wish-new">NEW!</div>' : "";
        cardEl.classList.remove("slot-machine");
        cardEl.classList.add("revealing");
        cardEl.innerHTML = `
          <div class="Wish-stars">${stars(c.rarity)}</div>
          ${newBadge}
          <img src="${c.url}" alt="Miku card" class="reveal-image"/>
        `;
        for (let i = 0; i < 6; i++) setTimeout(() => createSparkle(), i * 100);
        if (cardIndex === 0) SFX.play("Wish.reveal");
        SFX.play("Wish.pop");
        if (c.rarity >= 4) SFX.play("Wish.high");
        if (c.rarity >= 5) {
          // Legendary flourish: rainbow glow + screen flash + thanks
          try {
            SFX.play("extra.thanks");
          } catch {}
          try {
            cardEl.style.animation = "legendaryGlow 2s ease-in-out infinite";
          } catch {}
          const flash = document.createElement("div");
          flash.setAttribute(
            "style",
            "position:fixed;inset:0;background:rgba(255,255,255,.75);pointer-events:none;z-index:10000;opacity:0;transition:opacity .25s"
          );
          document.body.appendChild(flash);
          requestAnimationFrame(() => (flash.style.opacity = "1"));
          setTimeout(() => {
            flash.style.opacity = "0";
            setTimeout(() => flash.remove(), 300);
          }, 120);
        }
      }, 2000 + cardIndex * 300);
    });
    setTimeout(() => {
      results.animate(
        [{ transform: "scale(0.98)" }, { transform: "scale(1)" }],
        {
          duration: 220,
          easing: "ease-out",
        }
      );
      renderDex();
      const maxR = Math.max(...cards.map((x) => x.rarity || 1));
      if (!isFinite(maxR) || maxR <= 2) SFX.play("Wish.fail");

      // Check if PixieBel was pulled in this set of cards
      const pulledPixieBel = cards.some((card) => card.url === PIXIE_URL);

      // After results settle, handle PixieBel scenarios
      try {
        if (pulledPixieBel && !pixieUnlocked()) {
          // PixieBel was pulled by luck - trigger ceremony
          setTimeout(() => awardPixieBel(false), 250);
        } else if (!pixieUnlocked() && hasAllBaseCollected()) {
          // All base cards collected - award PixieBel
          awardPixieBel();
        }
      } catch {}
    }, 2000 + cards.length * 300 + 500);
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
          const pool =
            pickRare && rares.length ? rares : commons.length ? commons : list;
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
    if (dexBtn)
      dexBtn.textContent =
        window.SITE_CONTENT?.games?.WishOpenDex || "Open MikuDex";
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
        e.dexBtn.textContent =
          window.SITE_CONTENT?.games?.WishCloseDex || "Close MikuDex";
      } else {
        clearNewSet();
        removeNewBadges();
        e.dexBtn.textContent =
          window.SITE_CONTENT?.games?.WishOpenDex || "Open MikuDex";
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
