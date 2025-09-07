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
    if (isNew) entry.new = 1;
    coll[card.url] = entry;
    setColl(coll);
    return isNew;
  }
  function renderDex() {
    const { dex } = els();
    if (!dex || !poolReady()) return;
    const coll = getColl();
    const urls = window.MIKU_IMAGES || [];
    const ownedCount = Object.keys(coll).length;
    dex.innerHTML = `
      <div class="dex-pokedex">
        <div class="dex-header">MikuDex • Owned: ${ownedCount} / ${urls.length}</div>
        <div class="dex-grid">
          ${urls
            .map((u) => {
              const entry = coll[u];
              const owned = !!entry;
              const newBadge = entry?.new ? '<div class="Wish-new">NEW!</div>' : '';
              const cls = owned ? 'dex-card owned' : 'dex-card locked';
              return `<div class="${cls}" tabindex="0"><img src="${u}" alt="miku"/>${newBadge}</div>`;
            })
            .join("")}
        </div>
      </div>`;
    let cleared = false;
    for (const k of Object.keys(coll)) {
      if (coll[k].new) {
        delete coll[k].new;
        cleared = true;
      }
    }
    if (cleared) setColl(coll);
  }
  function showResults(cards) {
    const { results, rotation } = els();
    if (!results || !rotation) return;
    rotation.hidden = true;
    results.hidden = false;
    const previewPool = (window.MIKU_IMAGES || []).filter(
      (u) => !/PixieBel \(bonus\)\.gif$/i.test(u),
    );
    const previewImg = previewPool[0] || cards[0]?.url || "";
    results.innerHTML = cards
      .map(
        (c, i) => `
        <div class="Wish-card slot-machine rarity-${c.rarity}" data-index="${i}">
          <div class="Wish-stars">${stars(c.rarity)}</div>
          <div class="slot-reel">
            <img class="reel-image" src="${previewImg}" alt="Miku"/>
          </div>
          <div class="slot-sparkles"></div>
        </div>`,
      )
      .join("");
    SFX.play("Wish.roll");
    cards.forEach((c, cardIndex) => {
      const cardEl = results.querySelector(`.Wish-card[data-index="${cardIndex}"]`);
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
          reelImg.style.transform = `scale(${0.9 + Math.random() * 0.2}) rotate(${-5 + Math.random() * 10}deg)`;
          if (Math.random() < 0.7) createSparkle();
        }
      }, 150);
      setTimeout(() => {
        clearInterval(spinInterval);
        const isNew = addToCollection(c);
        const newBadge = isNew ? '<div class="Wish-new">NEW!</div>' : '';
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
      }, 2000 + cardIndex * 300);
    });
    setTimeout(() => {
      results.animate([{ transform: "scale(0.98)" }, { transform: "scale(1)" }], {
        duration: 220,
        easing: "ease-out",
      });
      renderDex();
      const maxR = Math.max(...cards.map((x) => x.rarity || 1));
      if (!isFinite(maxR) || maxR <= 2) SFX.play("Wish.fail");
    }, 2000 + cards.length * 300 + 500);
  }
  function pickRandom(n = 1) {
    const out = [];
    const list = window.MIKU_IMAGES || [];
    for (let i = 0; i < n; i++) {
      const url = list[Math.floor(Math.random() * list.length)];
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
    const cards = pickRandom(n);
    showResults(cards);
  }
  function resetUI() {
    const { results, rotation, dex, dexBtn } = els();
    if (results) results.hidden = true;
    if (rotation) rotation.hidden = false;
    if (dex) dex.classList.add("hidden");
    if (dexBtn) dexBtn.textContent = "Open MikuDex";
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
        window.hearts.updateCounters && window.hearts.updateCounters();
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
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", wire);
  else wire();
  window.__resetWish = resetUI;
  window.Wish = { renderDex };
})();