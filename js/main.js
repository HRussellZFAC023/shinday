/* Main JavaScript for PixelBelle's Garden */
document.addEventListener("DOMContentLoaded", () => {
  const C = window.SITE_CONTENT || {};

  // ====== MIKU ICON HELPER ======
  function mikuIcon(iconName, alt = "", className = "miku-icon") {
    const icons = C.images?.mikuIcons || {};
    if (icons[iconName]) {
      return `<img src="${icons[iconName]}" alt="${alt}" class="${className}" style="width: 24px; height: 24px; display: inline-block; vertical-align: middle; margin: 0 2px;">`;
    }
    return `<span class="emoji-fallback">${alt}</span>`; // fallback if icon not found
  }

  // Make mikuIcon globally available
  window.mikuIcon = mikuIcon;

  // ====== DATA CONFIGURATION ======
  const SOCIALS = (C.socials && C.socials.items) || [];
  const FRIENDS = (C.friends && C.friends.items) || [];
  const PLAYLIST_SONGS = (C.music && C.music.songs) || [];
  const LOVE_TOASTS = (C.love && C.love.toasts) || ["ありがとう！💖"];
  const LOVE_MILESTONES = (C.love && C.love.milestones) || [];
  const MIKU_IMAGES = [];
  // Expose a promise that resolves when we've finished probing available Miku images
  let resolveMiku;
  window.MIKU_IMAGES_READY = new Promise((res) => (resolveMiku = res));

  (async function loadImages() {
    // Try actual folder name from assets: "Pixel Hatsune Miku by Cutebunni (68581)"
    const roots = [
      "./assets/Pixel Hatsune Miku by Cutebunni (68581)/Hatsune Miku @illufinch ",
      "./assets/pixel-miku/Hatsune Miku @illufinch ",
    ];
    let foundAny = false;
    // Include user-specified extra Miku images (singing assets)
    if (Array.isArray(C.images?.extraMikus)) {
      for (const url of C.images.extraMikus) {
        if (typeof url === "string" && url) MIKU_IMAGES.push(url);
      }
    }
    for (const root of roots) {
      let i = 1;
      while (true) {
        const indexStr = i.toString().padStart(2, "0");
        const path = `${root}${indexStr}.png`;
        const img = new Image();
        img.src = path;
        try {
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          });
          MIKU_IMAGES.push(path);
          foundAny = true;
          i++;
        } catch (e) {
          break; // stop this root
        }
      }
      if (foundAny) break; // use the first root that works
    }
    // Resolve readiness and notify listeners
    if (typeof resolveMiku === "function") resolveMiku(MIKU_IMAGES.slice());
    document.dispatchEvent(
      new CustomEvent("miku-images-ready", {
        detail: { images: MIKU_IMAGES.slice() },
      })
    );
  })();

  // ====== SITE INITIALIZATION ======
  let currentSection = "home";
  let heartCount = parseInt(localStorage.getItem("pixelbelle-hearts")) || 0;
  let gameHeartCount =
    parseInt(localStorage.getItem("pixelbelle-game-hearts")) || 0;
  let visitorCount =
    parseInt(localStorage.getItem("pixelbelle-visitors")) ||
    Math.floor(Math.random() * 1000) + 100;
  let lastMilestone =
    parseInt(localStorage.getItem("pixelbelle-last-milestone")) || 0;

  // Increment visitor count
  visitorCount++;
  localStorage.setItem("pixelbelle-visitors", visitorCount);

  // ====== SPLASH SCREEN ======
  function initSplash() {
    const splash = document.getElementById("splash");
    const enterBtn = document.getElementById("enterSite");
    const mainSite = document.getElementById("mainSite");
    let isEntering = false;

    enterBtn.addEventListener("click", () => {
      if (isEntering) return;
      isEntering = true;
      splash.style.animation = "fadeOut 0.8s ease-out forwards";
      setTimeout(() => {
        splash.style.display = "none";
        mainSite.classList.remove("hidden");
        initSite();
        isEntering = false;
      }, 800);
    });

    // Auto-enter after 5 seconds
    setTimeout(() => {
      if (!splash.style.display || splash.style.display !== "none") {
        enterBtn.click();
      }
    }, 5000);
  }

  // ====== GACHA (upgraded random Miku) ======
  function initMikuGacha() {
    const poolReady = () =>
      Array.isArray(MIKU_IMAGES) && MIKU_IMAGES.length > 0;

    // Elements
    const tokensEl = document.getElementById("gachaTokens");
    const pull1Btn = document.getElementById("gachaPull1");
    const pull10Btn = document.getElementById("gachaPull10");
    const dailyBtn = document.getElementById("gachaDaily");
    const convertBtn = document.getElementById("gachaConvert");
    const resultsEl = document.getElementById("gachaResults");
    const dexBtn = document.getElementById("gachaCollectionBtn");
    const dexEl = document.getElementById("mikuDex");
    if (
      !tokensEl ||
      !pull1Btn ||
      !pull10Btn ||
      !dailyBtn ||
      !resultsEl ||
      !dexBtn ||
      !dexEl
    )
      return;

    const LS_TOKENS = "gacha.tokens";
    const LS_DAILY = "gacha.lastDaily";
    const LS_COLL = "gacha.collection";

    let tokens = parseInt(localStorage.getItem(LS_TOKENS) || "3", 10);
    let collection = {};
    try {
      collection = JSON.parse(localStorage.getItem(LS_COLL) || "{}");
    } catch (e) {
      collection = {};
    }

    function updateTokens(n = tokens) {
      tokens = n;
      localStorage.setItem(LS_TOKENS, String(tokens));
      tokensEl.textContent = String(tokens);
    }
    updateTokens(tokens);

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
      if (r < 55) return 1;
      if (r < 85) return 2;
      if (r < 95) return 3;
      if (r < 99) return 4;
      return 5;
    }
    function stars(n) {
      return "★".repeat(n);
    }

    function ensurePool(cb) {
      if (poolReady()) {
        cb();
        return;
      }
      let tries = 0;
      const t = setInterval(() => {
        if (poolReady() || tries++ > 60) {
          clearInterval(t);
          cb();
        }
      }, 150);
    }

    function addToCollection(card) {
      const id = card.id;
      const prev = collection[id] || { count: 0, rarity: card.rarity };
      prev.count += 1;
      prev.rarity = card.rarity;
      collection[id] = prev;
      localStorage.setItem(LS_COLL, JSON.stringify(collection));
      return prev.count === 1;
    }

    function pickRandom() {
      const url = MIKU_IMAGES[Math.floor(Math.random() * MIKU_IMAGES.length)];
      return { id: url, url, rarity: rarityFor(url) };
    }

    function guaranteeAtLeast(minRarity, pack) {
      if (pack.some((c) => c.rarity >= minRarity)) return pack;
      let card;
      let guard = 0;
      do {
        card = pickRandom();
        guard++;
      } while (card.rarity < minRarity && guard < 1000);
      pack[pack.length - 1] = card;
      return pack;
    }

    function renderResults(cards) {
      resultsEl.innerHTML = cards
        .map((c) => {
          const isNew = addToCollection(c);
          const newBadge = isNew ? '<div class="gacha-new">NEW!</div>' : "";
          return `
          <div class="gacha-card rarity-${c.rarity}">
            <div class="gacha-stars">${stars(c.rarity)}</div>
            ${newBadge}
            <img src="${c.url}" alt="Miku card" />
          </div>
        `;
        })
        .join("");
      resultsEl.animate(
        [{ transform: "scale(0.98)" }, { transform: "scale(1)" }],
        { duration: 200, easing: "ease-out" }
      );
      renderDex();
    }

    function renderDex() {
      const tiles = MIKU_IMAGES.map((url) => {
        const entry = collection[url];
        const owned = !!entry;
        const r = rarityFor(url);
        const ownClass = owned ? "owned rarity-" + r : "";
        const count = owned
          ? `<span class=\"dex-count\">x${entry.count}</span>`
          : "";
        return `
          <div class="dex-card ${ownClass}">
            <div class="dex-stars">${stars(r)}</div>
            ${count}
            <img src="${url}" alt="Miku dex" />
          </div>
        `;
      }).join("");
      dexEl.innerHTML = `<div class="dex-grid">${tiles}</div>`;
    }

    function pull(n) {
      if (!poolReady()) {
        loveToast("画像の読み込み中…");
        return;
      }
      if (tokens < n) {
        loveToast("チケットが足りないよ！");
        return;
      }
      updateTokens(tokens - n);
      const cards = Array.from({ length: n }, () => pickRandom());
      if (n >= 10) guaranteeAtLeast(3, cards);
      renderResults(cards);
    }

    pull1Btn.addEventListener("click", () => ensurePool(() => pull(1)));
    pull10Btn.addEventListener("click", () => ensurePool(() => pull(10)));
    dailyBtn.addEventListener("click", () => {
      const last = localStorage.getItem(LS_DAILY);
      const today = new Date().toDateString();
      if (last === today) {
        loveToast("今日はもう受け取ったよ！");
        return;
      }
      localStorage.setItem(LS_DAILY, today);
      updateTokens(tokens + 1);
      loveToast("デイリーチケット＋1！");
    });
    convertBtn.addEventListener("click", () => {
      const convertCost = 100;
      if (heartCount < convertCost) {
        loveToast(`💖が足りないよ！(${convertCost}必要)`);
        return;
      }
      heartCount -= convertCost;
      localStorage.setItem("pixelbelle-hearts", heartCount);
      updateCounters();
      updateTokens(tokens + 1);
      loveToast("💖→チケット +1");
    });
    dexBtn.addEventListener("click", () => {
      dexEl.classList.toggle("hidden");
      renderDex();
      dexBtn.textContent = dexEl.classList.contains("hidden")
        ? "Open MikuDex"
        : "Close MikuDex";
    });

    ensurePool(() => renderDex());
  }
  // ====== MAIN SITE INITIALIZATION ======
  function initSite() {
    applyContent();
    initNavigation();
    initStatusBar();
    initRadio();
    initSocials();
    initJpGames();
    initGames();
    initShrine();
    initFriends();
    initCursorEffects();
    initPeriodicUpdates();
    initFloatingHearts();
    updateCounters();
    loadSavedData();

    console.log("PixelBelle's Garden initialized! 🌸");
  }

  // ====== JP GAMES (Project Diva style) ======
  function initJpGames() {
    const host = (C.jpGames && C.jpGames.api) || {};
    const container = document.getElementById("jpGames");
    if (!container) return;

    // Remove section heading; build Start Menu layout + hidden game cards
    const studyHeading = document.querySelector("#study h2");
    if (studyHeading) studyHeading.style.display = "none";

    container.innerHTML = `
      <div class="study-card" id="levelCard">
        <div class="progress-bar"><div class="progress" style="width: 0%"></div></div>
        <p id="levelText"></p>
      </div>
      <div class="study-card" id="wodCard">
        <div class="word-of-day">
          <span class="japanese"></span>
          <span class="romaji"></span>
          <span class="meaning"></span>
        </div>
        <div class="social-embed" style="margin-top:10px; border-radius:12px; overflow:hidden; height: 600px;">
          <iframe id="wodIframe" src="${
            C.study && C.study.wordOfDay && C.study.wordOfDay.externalIframe
              ? C.study.wordOfDay.externalIframe
              : "https://kanjiday.com/kanji/"
          }" style="border:0;width:100%;height:100%" loading="lazy" referrerpolicy="no-referrer"></iframe>
        </div>
      </div>
      <div class="study-card" id="startCard" style="position:relative;min-height:240px;display:flex;align-items:center;justify-content:center;overflow:hidden;">
        <div id="jpMikus" class="floating-mikus" style="position:absolute;right:10px;top:10px;pointer-events:none"></div>
        <div id="pressStart" class="press-start">PRESS START</div>
        <div id="startMenu" class="start-menu hidden">
          <div class="menu-grid">
            <button id="startVocab" class="pixel-btn menu-tile">📝 Vocab Quiz</button>
            <button id="startKanji" class="pixel-btn menu-tile">漢字 Kanji Quiz</button>
            <button id="startKotoba" class="pixel-btn menu-tile">🤖 Miku Meets Kotoba</button>
          </div>
        </div>
      </div>
      <div class="study-card" id="vocabCard" style="display:none">
        <div id="vocabMeta" style="display:flex;gap:10px;align-items:center;color:#596286;font-size:12px;margin-bottom:4px">
          <button id="vocabModeBtn" class="pixel-btn" style="padding:4px 10px;border-radius:999px;font-size:12px">Mode</button>
          <div>Streak: <span id="vocabStreak">0</span> (Best: <span id="vocabBestStreak">0</span>)</div>
          <div id="vocabTimerWrap" style="display:none">⏱️ <span id="vocabTimer">15</span>s • Best: <span id="vocabBestTime">—</span></div>
        </div>
        <div id="vocabQuestion">Pick a mode to start…</div>
        <div id="vocabChoices" style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:8px"></div>
        <div id="vocabFeedback" style="min-height:22px;margin-top:6px;color:#596286"></div>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px"><div style="font-weight:800">Score: <span id="vocabScore">0</span></div><button id="vocabBack" class="pixel-btn">⟵ Menu</button></div>
        <div id="vocabOverlay" class="mode-overlay">
          <div class="mode-panel">
            <div class="mode-title">Vocab Mode</div>
            <div class="mode-options">
              <button class="pixel-btn mode-option" data-mode="jp-en">JP → EN</button>
              <button class="pixel-btn mode-option" data-mode="en-jp">EN → JP</button>
            </div>
            <div class="mode-toggles">
              <button id="vocabTimedToggle" class="pixel-btn mode-toggle" data-on="0">Timed: OFF</button>
            </div>
            <button id="vocabStart" class="pixel-btn mode-start">Start</button>
          </div>
        </div>
      </div>
      <div class="study-card" id="kanjiCard" style="display:none">
        <div id="kanjiMeta" style="display:flex;gap:10px;align-items:center;color:#596286;font-size:12px;margin-bottom:4px">
          <button id="kanjiModeBtn" class="pixel-btn" style="padding:4px 10px;border-radius:999px;font-size:12px">Mode</button>
          <div>Streak: <span id="kanjiStreak">0</span> (Best: <span id="kanjiBestStreak">0</span>)</div>
          <div id="kanjiTimerWrap" style="display:none">⏱️ <span id="kanjiTimer">15</span>s • Best: <span id="kanjiBestTime">—</span></div>
        </div>
        <div id="kanjiQuestion">Pick a mode to start…</div>
        <div id="kanjiChoices" style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:8px"></div>
        <div id="kanjiFeedback" style="min-height:22px;margin-top:6px;color:#596286"></div>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px"><div style="font-weight:800">Score: <span id="kanjiScore">0</span></div><button id="kanjiBack" class="pixel-btn">⟵ Menu</button></div>
        <div id="kanjiOverlay" class="mode-overlay">
          <div class="mode-panel">
            <div class="mode-title">Kanji Mode</div>
            <div class="mode-options">
              <button class="pixel-btn mode-option" data-mode="meaning">Meaning → Kanji</button>
              <button class="pixel-btn mode-option" data-mode="reading">Kanji → Reading</button>
            </div>
            <div class="mode-toggles">
              <button id="kanjiTimedToggle" class="pixel-btn mode-toggle" data-on="0">Timed: OFF</button>
            </div>
            <button id="kanjiStart" class="pixel-btn mode-start">Start</button>
          </div>
        </div>
      </div>
      <div class="study-card" id="kotobaCard" style="display:none">
        <div id="kotobaChat" style="display:flex;flex-direction:column;gap:8px;min-height:90px"></div>
        <div id="kotobaChoices" style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:8px"></div>
        <div style="display:flex;gap:8px;align-items:center;justify-content:space-between;margin-top:8px">
          <button id="kotobaStart" class="pixel-btn">Start</button>
          <div style="font-weight:800">Score: <span id="kotobaScore">0</span></div>
          <button id="kotobaBack" class="pixel-btn">⟵ Menu</button>
        </div>
      </div>
    `;

    // Populate static study info & WOD from API
    try {
      const lc = document.getElementById("levelCard");
      if (lc && C.study) {
        const p = lc.querySelector("#levelText");
        if (p && C.study.levelText) p.textContent = C.study.levelText;
      }
      const wc = document.getElementById("wodCard");
      if (wc) {
        const jp = wc.querySelector(".japanese");
        const ro = wc.querySelector(".romaji");
        const me = wc.querySelector(".meaning");
        (async function loadWod() {
          try {
            const page = Math.floor(Math.random() * 50) + 1;
            const j = await (async () => {
              try {
                const r = await fetch(
                  `https://jisho.org/api/v1/search/words?keyword=%23common&page=${page}`,
                  { cache: "no-store" }
                );
                if (r.ok) return r.json();
              } catch (_) {}
              const rr = await fetch(
                `https://api.allorigins.win/raw?url=${encodeURIComponent(
                  `https://jisho.org/api/v1/search/words?keyword=%23common&page=${page}`
                )}`
              );
              if (rr.ok) return rr.json();
              throw new Error("fail");
            })();
            const arr = Array.isArray(j?.data) ? j.data : [];
            if (arr.length) {
              const pick = arr[Math.floor(Math.random() * arr.length)];
              const word =
                (pick.japanese &&
                  (pick.japanese[0].word || pick.japanese[0].reading)) ||
                "";
              const reading = (pick.japanese && pick.japanese[0].reading) || "";
              const meaning =
                (pick.senses && pick.senses[0]?.english_definitions?.[0]) || "";
              if (jp) jp.textContent = word || "";
              if (ro) ro.textContent = reading || "";
              if (me) me.textContent = meaning || "";
            }
          } catch (_) {
            /* ignore */
          }
        })();
      }
    } catch (_) {}

    // Start menu interactions
    function spawnJpMikus() {
      const wrap = document.getElementById("jpMikus");
      if (!wrap) return;
      wrap.innerHTML = "";
      const ready = Array.isArray(MIKU_IMAGES) && MIKU_IMAGES.length > 0;
      const build = () => {
        const n = Math.min(6, MIKU_IMAGES.length);
        const used = new Set();
        for (let i = 0; i < n; i++) {
          let idx;
          do {
            idx = Math.floor(Math.random() * MIKU_IMAGES.length);
          } while (used.has(idx));
          used.add(idx);
          const img = document.createElement("img");
          img.src = MIKU_IMAGES[idx];
          img.className = "float-miku";
          img.alt = "Miku";
          img.style.width = "48px";
          wrap.appendChild(img);
        }
      };
      if (ready) build();
      else
        document.addEventListener("miku-images-ready", build, { once: true });
    }

    const startCard = document.getElementById("startCard");
    const pressStart = document.getElementById("pressStart");
    const startMenu = document.getElementById("startMenu");
    const vocabCard = document.getElementById("vocabCard");
    const kanjiCard = document.getElementById("kanjiCard");
    const kotobaCard = document.getElementById("kotobaCard");
    const vocabBack = () => document.getElementById("vocabBack");
    const kanjiBack = () => document.getElementById("kanjiBack");
    const kotobaBack = () => document.getElementById("kotobaBack");

    function showMenu() {
      startCard.style.display = "flex";
      startMenu.classList.remove("hidden");
      vocabCard.style.display = "none";
      kanjiCard.style.display = "none";
      kotobaCard.style.display = "none";
      spawnJpMikus();
    }
    function showGame(which) {
      startCard.style.display = "none";
      vocabCard.style.display = which === "vocab" ? "block" : "none";
      kanjiCard.style.display = which === "kanji" ? "block" : "none";
      kotobaCard.style.display = which === "kotoba" ? "block" : "none";
    }
    if (pressStart) {
      pressStart.addEventListener("click", () => {
        pressStart.style.display = "none";
        startMenu.classList.remove("hidden");
        spawnJpMikus();
      });
    }
    const startVocab = document.getElementById("startVocab");
    const startKanji = document.getElementById("startKanji");
    const startKotoba = document.getElementById("startKotoba");
    if (startVocab)
      startVocab.addEventListener("click", () => showGame("vocab"));
    if (startKanji)
      startKanji.addEventListener("click", () => showGame("kanji"));
    if (startKotoba)
      startKotoba.addEventListener("click", () => showGame("kotoba"));
    if (vocabBack()) vocabBack().addEventListener("click", showMenu);
    if (kanjiBack()) kanjiBack().addEventListener("click", showMenu);
    if (kotobaBack()) kotobaBack().addEventListener("click", showMenu);

    // XP/Level + Song HUD state (Project Diva-style)
    let level = parseInt(localStorage.getItem("study.level") || "1", 10);
    let xp = parseInt(localStorage.getItem("study.xp") || "0", 10);
    const XP_PER_LEVEL = 100;
    const levelCard = document.getElementById("levelCard");
    const levelBar = levelCard ? levelCard.querySelector(".progress") : null;
    const levelTextP = levelCard ? levelCard.querySelector("p") : null;
    const HUD = {
      combo: 0,
      maxCombo: 0,
      voltage: 0,
      lives: parseInt(localStorage.getItem("jp.lives") || "3", 10),
      maxLives: 5,
      score: 0,
      notes: 0,
      counts: { COOL: 0, GREAT: 0, FINE: 0, SAD: 0, MISS: 0 },
      start: null,
      game: null,
    };
    function clamp(n, min, max) {
      return Math.max(min, Math.min(max, n));
    }
    function updateLevelUi() {
      const pct = Math.max(
        0,
        Math.min(100, Math.floor(((xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100))
      );
      if (levelBar) levelBar.style.width = pct + "%";
      if (levelTextP) levelTextP.textContent = `Level ${level} • ${pct}%`;
    }
    function addXP(amount) {
      xp += amount;
      let leveled = false;
      while (xp >= level * XP_PER_LEVEL) {
        level++;
        leveled = true;
      }
      if (leveled) {
        loveToast("レベルアップ！Level " + level + " ✨");
        try {
          addHearts(1);
        } catch (_) {}
      }
      localStorage.setItem("study.level", String(level));
      localStorage.setItem("study.xp", String(xp));
      updateLevelUi();
    }
    updateLevelUi();

    // HUD widget init
    (function initHudWidget() {
      const hearts = document.getElementById("hudHearts");
      const lives = document.getElementById("hudLives");
      const maxLives = document.getElementById("hudMaxLives");
      const selGame = document.getElementById("hudGame");
      const selMode = document.getElementById("hudMode");
      const timedBtn = document.getElementById("hudTimed");
      const startBtn = document.getElementById("hudStart");
      const endBtn = document.getElementById("hudEnd");
      const sync = () => {
        if (hearts) hearts.textContent = String(heartCount);
        if (lives) lives.textContent = String(HUD.lives);
        if (maxLives) maxLives.textContent = String(HUD.maxLives);
      };
      sync();
      // Expose updater
      window.__updateHudHearts = sync;
      if (timedBtn) {
        timedBtn.addEventListener("click", () => {
          const on = timedBtn.getAttribute("data-on") !== "1";
          timedBtn.setAttribute("data-on", on ? "1" : "0");
          timedBtn.textContent = on ? "Timed: ON" : "Timed: OFF";
          localStorage.setItem("jp.widget.timed", on ? "1" : "0");
        });
        const saved = localStorage.getItem("jp.widget.timed") === "1";
        timedBtn.setAttribute("data-on", saved ? "1" : "0");
        timedBtn.textContent = saved ? "Timed: ON" : "Timed: OFF";
      }
      if (startBtn) {
        startBtn.addEventListener("click", () => {
          const g = selGame ? selGame.value : "vocab";
          const m = selMode ? selMode.value : "jp-en";
          startSong(g, m, timedBtn && timedBtn.getAttribute("data-on") === "1");
        });
      }
      if (endBtn) {
        endBtn.addEventListener("click", () => {
          endSong("Manual Stop");
        });
      }
    })();

    function startSong(game, mode, timed) {
      HUD.combo = 0;
      HUD.maxCombo = 0;
      HUD.voltage = 0;
      HUD.score = 0;
      HUD.notes = 0;
      HUD.counts = { COOL: 0, GREAT: 0, FINE: 0, SAD: 0, MISS: 0 };
      HUD.start = Date.now();
      HUD.game = game;
      HUD.lives = Math.max(3, HUD.lives);
      HUD.lives = clamp(HUD.lives, 3, HUD.maxLives);
      renderLives("vocabCard");
      renderLives("kanjiCard");
      // Route to selected game and set mode/timed
      showGame(game);
      if (game === "vocab") {
        localStorage.setItem(
          "vocab.direction",
          mode === "en-jp" ? "en-jp" : "jp-en"
        );
        localStorage.setItem("vocab.timed", timed ? "1" : "0");
        document.dispatchEvent(
          new CustomEvent("vocab-start", { detail: { direction: mode, timed } })
        );
      } else if (game === "kanji") {
        localStorage.setItem(
          "kanji.mode",
          mode === "reading" ? "reading" : "meaning"
        );
        localStorage.setItem("kanji.timed", timed ? "1" : "0");
        document.dispatchEvent(
          new CustomEvent("kanji-start", { detail: { mode, timed } })
        );
      } else if (game === "kotoba") {
        const start = document.getElementById("kotobaStart");
        if (start) {
          start.click();
        }
      }
    }
    function gradeFromStats() {
      const acc =
        (HUD.counts.COOL + HUD.counts.GREAT + HUD.counts.FINE) /
        (HUD.notes || 1);
      if (acc >= 0.95) return "S";
      if (acc >= 0.9) return "A";
      if (acc >= 0.8) return "B";
      if (acc >= 0.7) return "C";
      return "D";
    }
    function endSong(reason) {
      // Show results overlay
      const ov = ensureResultOverlay();
      const dur = HUD.start
        ? Math.max(1, Math.round((Date.now() - HUD.start) / 1000))
        : 0;
      ov.querySelector("#resReason").textContent = reason || "Song Clear";
      ov.querySelector("#resScore").textContent = String(HUD.score);
      ov.querySelector("#resMaxCombo").textContent = String(HUD.maxCombo);
      ov.querySelector("#resTime").textContent = `${dur}s`;
      ov.querySelector("#resCool").textContent = String(HUD.counts.COOL);
      ov.querySelector("#resGreat").textContent = String(HUD.counts.GREAT);
      ov.querySelector("#resFine").textContent = String(HUD.counts.FINE);
      ov.querySelector("#resSad").textContent = String(
        HUD.counts.SAD + HUD.counts.MISS
      );
      ov.querySelector("#resRank").textContent = gradeFromStats();
      ov.style.display = "flex";
    }
    function ensureResultOverlay() {
      let ov = document.getElementById("resultOverlay");
      if (ov) return ov;
      ov = document.createElement("div");
      ov.id = "resultOverlay";
      ov.className = "result-overlay";
      ov.innerHTML = `
        <div class="result-panel">
          <div class="result-rings">
            <div class="ring" style="width:120px;height:120px;left:calc(50% - 60px);top:-20px"></div>
            <div class="ring" style="width:160px;height:160px;left:calc(50% - 80px);top:-40px"></div>
            <div class="ring" style="width:200px;height:200px;left:calc(50% - 100px);top:-60px"></div>
          </div>
          <h2>Song Result</h2>
          <p id="resReason">Song Clear</p>
          <p>Score: <strong id="resScore">0</strong> • Max Combo: <strong id="resMaxCombo">0</strong> • Time: <strong id="resTime">0s</strong></p>
          <p>COOL <strong id="resCool">0</strong> • GREAT <strong id="resGreat">0</strong> • FINE <strong id="resFine">0</strong> • SAD/MISS <strong id="resSad">0</strong></p>
          <h3>Rank: <span id="resRank">C</span></h3>
          <div style="margin-top:10px"><button class="pixel-btn" id="resClose">Close</button></div>
        </div>`;
      document.body.appendChild(ov);
      ov.querySelector("#resClose").addEventListener(
        "click",
        () => (ov.style.display = "none")
      );
      return ov;
    }

    // HUD overlay inside game cards
    function attachDivaHud(cardId) {
      const card = document.getElementById(cardId);
      if (!card) return;
      if (card.querySelector(".diva-hud")) return;
      const wrap = document.createElement("div");
      wrap.className = "diva-hud";
      wrap.innerHTML = `
        <div class="diva-voltage"><div class="fill" id="${cardId}-voltage"></div></div>
        <div class="diva-judge" id="${cardId}-judge"></div>
        <div class="diva-lives" id="${cardId}-lives"></div>
      `;
      card.insertBefore(wrap, card.firstChild);
      renderLives(cardId);
      updateVoltage(cardId);
    }
    function renderLives(cardId) {
      const el = document.getElementById(`${cardId}-lives`);
      if (!el) return;
      el.innerHTML = "";
      for (let i = 0; i < HUD.maxLives; i++) {
        const d = document.createElement("div");
        d.className = "life" + (i < HUD.lives ? "" : " off");
        el.appendChild(d);
      }
      const wLives = document.getElementById("hudLives");
      if (wLives) wLives.textContent = String(HUD.lives);
    }
    function updateVoltage(cardId) {
      const el = document.getElementById(`${cardId}-voltage`);
      if (!el) return;
      el.style.width = `${clamp(HUD.voltage, 0, 100)}%`;
    }
    function flashJudge(cardId, label) {
      const el = document.getElementById(`${cardId}-judge`);
      if (!el) return;
      el.className = `diva-judge judge-${label}`;
      el.textContent = label;
    }
    function party(cardId) {
      const host = document.getElementById(cardId);
      if (!host) return;
      host.classList.add("party");
      for (let i = 0; i < 6; i++) {
        const s = document.createElement("div");
        s.className = Math.random() < 0.5 ? "stick" : "leek";
        s.style.left = Math.random() * 90 + 5 + "%";
        s.style.top = "0px";
        host.appendChild(s);
        setTimeout(() => s.remove(), 1000);
      }
    }
    function gainLife(cardId) {
      if (HUD.lives < HUD.maxLives) {
        HUD.lives++;
        localStorage.setItem("jp.lives", String(HUD.lives));
        renderLives(cardId);
      }
    }
    function loseLife(cardId) {
      if (HUD.lives > 0) {
        HUD.lives--;
        localStorage.setItem("jp.lives", String(HUD.lives));
        renderLives(cardId);
        if (HUD.lives === 0) endSong("Out of Lives");
      }
    }
    function addVoltage(amount, cardId) {
      HUD.voltage = clamp(HUD.voltage + amount, 0, 100);
      updateVoltage(cardId);
    }
    function addCombo(cardId) {
      HUD.combo++;
      HUD.maxCombo = Math.max(HUD.maxCombo, HUD.combo);
      if (HUD.combo > 0 && HUD.combo % 10 === 0) gainLife(cardId);
    }
    function resetCombo() {
      HUD.combo = 0;
    }

    // In-memory caches and session state (online-only)
    const vocabCache = { pages: [], enDefs: new Set(), jpSurfaces: new Set() };
    const kanjiCache = { gradeLists: new Map(), details: new Map() };
    const recentVocab = [];
    const recentKanji = [];
    const RECENT_LIMIT = 10;

    function pushRecent(list, val) {
      list.push(val);
      while (list.length > RECENT_LIMIT) list.shift();
    }

    async function fetchJsonWithProxy(url) {
      try {
        const r = await fetch(url, { cache: "no-store" });
        if (r.ok) return await r.json();
      } catch (_) {}
      try {
        const prox = `https://api.allorigins.win/raw?url=${encodeURIComponent(
          url
        )}`;
        const r2 = await fetch(prox, { cache: "no-store" });
        if (r2.ok) return await r2.json();
      } catch (_) {}
      throw new Error("Network error");
    }

    async function primeVocabPage(page) {
      const url = `https://jisho.org/api/v1/search/words?keyword=%23common&page=${page}`;
      const j = await fetchJsonWithProxy(url);
      const arr = Array.isArray(j?.data) ? j.data : [];
      if (!arr.length) return [];
      vocabCache.pages.push(arr);
      for (const e of arr) {
        const jp =
          (e.japanese && (e.japanese[0].word || e.japanese[0].reading)) || "";
        const reading = (e.japanese && e.japanese[0].reading) || "";
        const en = (e.senses && e.senses[0]?.english_definitions?.[0]) || "";
        if (en) vocabCache.enDefs.add(en.trim());
        if (jp) vocabCache.jpSurfaces.add(jp.trim());
        else if (reading) vocabCache.jpSurfaces.add(reading.trim());
      }
      if (vocabCache.pages.length > 6) vocabCache.pages.shift();
      if (vocabCache.enDefs.size > 200) {
        const nd = new Set();
        for (const p of vocabCache.pages) {
          for (const e of p) {
            const en =
              (e.senses && e.senses[0]?.english_definitions?.[0]) || "";
            if (en) nd.add(en.trim());
          }
        }
        vocabCache.enDefs = nd;
      }
      if (vocabCache.jpSurfaces.size > 200) {
        const ns = new Set();
        for (const p of vocabCache.pages) {
          for (const e of p) {
            const jp =
              (e.japanese && (e.japanese[0].word || e.japanese[0].reading)) ||
              "";
            const rd = (e.japanese && e.japanese[0].reading) || "";
            if (jp) ns.add(jp.trim());
            else if (rd) ns.add(rd.trim());
          }
        }
        vocabCache.jpSurfaces = ns;
      }
      return arr;
    }

    function rnd(n) {
      return Math.floor(Math.random() * n);
    }
    function pickN(setLike, n, avoid = new Set()) {
      const arr = Array.isArray(setLike)
        ? setLike.slice()
        : Array.from(setLike);
      const out = [];
      const used = new Set(avoid);
      while (out.length < n && arr.length) {
        const i = rnd(arr.length);
        const v = arr.splice(i, 1)[0];
        if (!used.has(v)) {
          used.add(v);
          out.push(v);
        }
      }
      return out;
    }

    async function getVocabQuestion(direction) {
      if (vocabCache.pages.length === 0) await primeVocabPage(rnd(50) + 1);
      if (vocabCache.enDefs.size < 12 || vocabCache.jpSurfaces.size < 12)
        await primeVocabPage(rnd(50) + 1);
      const page = vocabCache.pages[rnd(vocabCache.pages.length)];
      if (!page || !page.length) throw new Error("No vocab data");
      for (let guard = 0; guard < 12; guard++) {
        const pick = page[rnd(page.length)];
        const jp =
          (pick.japanese &&
            (pick.japanese[0].word || pick.japanese[0].reading)) ||
          "";
        const reading = (pick.japanese && pick.japanese[0].reading) || "";
        const enList =
          (pick.senses && pick.senses[0]?.english_definitions) || [];
        const en = enList[0];
        if (!jp || !en) continue;
        if (recentVocab.includes(jp)) continue;
        if (direction === "jp-en") {
          const correct = en.trim();
          const decoys = Array.from(
            new Set(pickN(vocabCache.enDefs, 6, new Set([correct])))
          )
            .filter((x) => x !== correct)
            .slice(0, 3);
          if (decoys.length < 3) {
            await primeVocabPage(rnd(50) + 1);
            continue;
          }
          pushRecent(recentVocab, jp);
          return {
            promptHtml: `<div style=\"font-size:22px;font-weight:900\">${jp}</div><div style=\"opacity:.8\">${
              reading || ""
            }</div>`,
            correct,
            options: shuffle([correct, ...decoys]),
          };
        } else {
          const surface = (jp || reading).trim();
          const correct = surface;
          const decoys = Array.from(
            new Set(pickN(vocabCache.jpSurfaces, 6, new Set([correct])))
          )
            .filter((x) => x !== correct)
            .slice(0, 3);
          if (decoys.length < 3) {
            await primeVocabPage(rnd(50) + 1);
            continue;
          }
          pushRecent(recentVocab, jp);
          return {
            promptHtml: `<div style=\"font-size:16px;opacity:.8\">Meaning:</div><div style=\"font-size:22px;font-weight:900\">${en}</div>`,
            correct,
            options: shuffle([correct, ...decoys]),
          };
        }
      }
      throw new Error("Could not build vocab question");
    }

    async function getGradeList(grade) {
      if (kanjiCache.gradeLists.has(grade))
        return kanjiCache.gradeLists.get(grade);
      const list = await fetchJsonWithProxy(
        `https://kanjiapi.dev/v1/kanji/grade-${grade}`
      );
      if (!Array.isArray(list) || !list.length)
        throw new Error("No kanji list");
      kanjiCache.gradeLists.set(grade, list);
      if (kanjiCache.gradeLists.size > 4) {
        const firstKey = kanjiCache.gradeLists.keys().next().value;
        kanjiCache.gradeLists.delete(firstKey);
      }
      return list;
    }
    async function getKanjiDetail(ch) {
      if (kanjiCache.details.has(ch)) return kanjiCache.details.get(ch);
      const d = await fetchJsonWithProxy(
        `https://kanjiapi.dev/v1/kanji/${encodeURIComponent(ch)}`
      );
      kanjiCache.details.set(ch, d);
      if (kanjiCache.details.size > 60) {
        const it = kanjiCache.details.keys();
        kanjiCache.details.delete(it.next().value);
      }
      return d;
    }

    async function getKanjiQuestion(mode) {
      const grade = rnd(6) + 1;
      const list = await getGradeList(grade);
      for (let guard = 0; guard < 12; guard++) {
        const k = list[rnd(list.length)];
        if (recentKanji.includes(k)) continue;
        const d = await getKanjiDetail(k);
        const meaning = d?.meanings?.[0];
        if (!meaning) continue;
        if (mode === "meaning") {
          const correct = k;
          const pool = list.filter((x) => x !== k);
          const decoys = pickN(pool, 6, new Set([correct])).slice(0, 3);
          if (decoys.length < 3) continue;
          pushRecent(recentKanji, k);
          return {
            promptHtml: `<div style=\"opacity:.8\">Meaning:</div><div style=\"font-size:22px;font-weight:900\">${meaning}</div>`,
            correct,
            options: shuffle([correct, ...decoys]),
          };
        } else {
          const readings = [...(d.kun_readings || []), ...(d.on_readings || [])]
            .map(String)
            .filter(Boolean);
          if (!readings.length) continue;
          const correct = readings[rnd(readings.length)];
          const decoyReadings = new Set();
          let tries = 0;
          while (decoyReadings.size < 3 && tries++ < 20) {
            const dk = list[rnd(list.length)];
            if (dk === k) continue;
            const dd = await getKanjiDetail(dk);
            const rs = [...(dd.kun_readings || []), ...(dd.on_readings || [])];
            if (rs.length) {
              const rpick = rs[rnd(rs.length)];
              if (rpick && rpick !== correct) decoyReadings.add(rpick);
            }
          }
          if (decoyReadings.size < 3) continue;
          pushRecent(recentKanji, k);
          return {
            promptHtml: `<div style=\"font-size:22px;font-weight:900\">${k}</div>`,
            correct,
            options: shuffle([
              correct,
              ...Array.from(decoyReadings).slice(0, 3),
            ]),
          };
        }
      }
      throw new Error("Could not build kanji question");
    }

    // Tiny SFX (aligned with memory game)
    let sfxCtx = null;
    function sfxGet() {
      if (!sfxCtx) {
        try {
          sfxCtx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (_) {}
      }
      return sfxCtx;
    }
    function sfxBeep(freq = 800, dur = 0.06, type = "triangle", gain = 0.05) {
      const ctx = sfxGet();
      if (!ctx) return;
      const t0 = ctx.currentTime;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type;
      o.frequency.setValueAtTime(freq, t0);
      g.gain.setValueAtTime(gain, t0);
      o.connect(g).connect(ctx.destination);
      o.start();
      o.stop(t0 + dur);
    }
    function sfxOk() {
      sfxBeep(600, 0.07, "sine", 0.05);
      setTimeout(() => sfxBeep(900, 0.07, "sine", 0.05), 60);
    }
    function sfxBad() {
      sfxBeep(220, 0.08, "sawtooth", 0.045);
    }
    function sfxTime() {
      [320, 260, 200].forEach((f, i) =>
        setTimeout(() => sfxBeep(f, 0.05, "triangle", 0.05), i * 90)
      );
    }

    // Utilities
    function shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    // Vocab Quiz (online-only Jisho)
    (function vocabQuiz() {
      const qEl = document.getElementById("vocabQuestion");
      const cEl = document.getElementById("vocabChoices");
      const fb = document.getElementById("vocabFeedback");
      const scoreEl = document.getElementById("vocabScore");
      const timerWrap = document.getElementById("vocabTimerWrap");
      const timerEl = document.getElementById("vocabTimer");
      const streakEl = document.getElementById("vocabStreak");
      const bestStreakEl = document.getElementById("vocabBestStreak");
      const bestTimeEl = document.getElementById("vocabBestTime");
      const overlay = document.getElementById("vocabOverlay");
      const modeBtn = document.getElementById("vocabModeBtn");
      const startBtn = document.getElementById("vocabStart");
      const timedTgl = document.getElementById("vocabTimedToggle");
      const optionBtns = overlay.querySelectorAll(".mode-option");
      let score = 0,
        lock = false;
      let direction = localStorage.getItem("vocab.direction") || "jp-en";
      let timed = localStorage.getItem("vocab.timed") === "1";
      let streak = 0;
      let bestStreak = parseInt(
        localStorage.getItem("vocab.bestStreak") || "0",
        10
      );
      let bestTime =
        parseInt(localStorage.getItem("vocab.bestTime") || "0", 10) || null;
      let countdown = 15,
        tId = null,
        startAt = 0;

      // Mode overlay (hidden until used)
      let chosenMode = direction;
      overlay.style.display = "none";
      optionBtns.forEach((b) => {
        b.addEventListener("click", () => {
          chosenMode = b.getAttribute("data-mode");
          optionBtns.forEach((x) => x.classList.remove("active"));
          b.classList.add("active");
        });
      });
      if (timed)
        timedTgl.setAttribute("data-on", "1"),
          (timedTgl.textContent = "Timed: ON");
      timedTgl.addEventListener("click", () => {
        timed = timedTgl.getAttribute("data-on") !== "1";
        timedTgl.setAttribute("data-on", timed ? "1" : "0");
        timedTgl.textContent = timed ? "Timed: ON" : "Timed: OFF";
      });
      startBtn.addEventListener("click", () => {
        direction = chosenMode || "jp-en";
        localStorage.setItem("vocab.direction", direction);
        localStorage.setItem("vocab.timed", timed ? "1" : "0");
        timerWrap.style.display = timed ? "inline-flex" : "none";
        overlay.style.display = "none";
        load();
      });
      document.addEventListener("vocab-start", (ev) => {
        const d = ev.detail || {};
        direction = d.direction === "en-jp" ? "en-jp" : "jp-en";
        timed = !!d.timed;
        localStorage.setItem("vocab.direction", direction);
        localStorage.setItem("vocab.timed", timed ? "1" : "0");
        timerWrap.style.display = timed ? "inline-flex" : "none";
        overlay.style.display = "none";
        load();
      });
      modeBtn.addEventListener("click", () => {
        overlay.style.display = "flex";
      });
      timerWrap.style.display = timed ? "inline-flex" : "none";
      bestStreakEl.textContent = String(bestStreak);
      bestTimeEl.textContent = bestTime
        ? `${(bestTime / 1000).toFixed(1)}s`
        : "—";
      attachDivaHud("vocabCard");

      async function load() {
        lock = false;
        fb.textContent = "";
        cEl.innerHTML = "";
        qEl.textContent = "Loading…";
        HUD.notes++;
        try {
          const q = await getVocabQuestion(direction);
          const correct = q.correct;
          qEl.innerHTML = q.promptHtml;
          if (timed) {
            countdown = 15;
            timerEl.textContent = String(countdown);
            startAt = Date.now();
            if (tId) clearInterval(tId);
            tId = setInterval(() => {
              countdown--;
              timerEl.textContent = String(Math.max(0, countdown));
              if (countdown <= 0) {
                clearInterval(tId);
                tId = null;
                lock = true;
                fb.textContent = `⏰ Time! Correct: ${correct}`;
                fb.style.color = "#c00";
                sfxTime();
                streak = 0;
                streakEl.textContent = String(streak);
                HUD.counts.MISS++;
                flashJudge("vocabCard", "MISS");
                addVoltage(-5, "vocabCard");
                loseLife("vocabCard");
                setTimeout(load, 1000);
              }
            }, 1000);
          }
          q.options.forEach((opt) => {
            const b = document.createElement("button");
            b.className = "pixel-btn";
            b.textContent = opt;
            b.style.padding = "8px";
            b.addEventListener("click", () => {
              if (lock) return;
              lock = true;
              if (tId) {
                clearInterval(tId);
                tId = null;
              }
              if (opt === correct) {
                fb.textContent = "✅ Correct!";
                fb.style.color = "#2b2b44";
                score++;
                scoreEl.textContent = String(score);
                addHearts(1);
                sfxOk();
                // streaks/xp
                streak++;
                streakEl.textContent = String(streak);
                if (streak > 1) loveToast(`コンボ x${streak}!`);
                const gain = 12 + Math.min(15, (streak - 1) * 2);
                addXP(gain);
                if (streak > 0 && streak % 5 === 0) addHearts(1);
                const dt = Date.now() - startAt;
                let judge = "FINE",
                  v = 2,
                  sc = 50;
                if (dt <= 600) {
                  judge = "COOL";
                  v = 4;
                  sc = 100;
                  HUD.counts.COOL++;
                  party("vocabCard");
                } else if (dt <= 1400) {
                  judge = "GREAT";
                  v = 3;
                  sc = 70;
                  HUD.counts.GREAT++;
                } else {
                  HUD.counts.FINE++;
                }
                flashJudge("vocabCard", judge);
                addVoltage(v, "vocabCard");
                addCombo("vocabCard");
                HUD.score += sc;
              } else {
                fb.textContent = `❌ ${correct}`;
                fb.style.color = "#c00";
                sfxBad();
                streak = 0;
                streakEl.textContent = String(streak);
                HUD.counts.SAD++;
                flashJudge("vocabCard", "SAD");
                addVoltage(-5, "vocabCard");
                resetCombo();
                loseLife("vocabCard");
              }
              if (timed) {
                const elapsed = Date.now() - startAt;
                if (!bestTime || elapsed < bestTime) {
                  bestTime = elapsed;
                  localStorage.setItem("vocab.bestTime", String(bestTime));
                  bestTimeEl.textContent = `${(bestTime / 1000).toFixed(1)}s`;
                }
              }
              setTimeout(load, 900);
            });
            cEl.appendChild(b);
          });
        } catch (e) {
          friendlyError(cEl, load);
          qEl.textContent = "";
        }
      }
      // Start flow waits for overlay
    })();

    // Kanji Quiz (online-only KanjiAPI)
    (function kanjiQuiz() {
      const qEl = document.getElementById("kanjiQuestion");
      const cEl = document.getElementById("kanjiChoices");
      const fb = document.getElementById("kanjiFeedback");
      const scoreEl = document.getElementById("kanjiScore");
      const timerWrap = document.getElementById("kanjiTimerWrap");
      const timerEl = document.getElementById("kanjiTimer");
      const streakEl = document.getElementById("kanjiStreak");
      const bestStreakEl = document.getElementById("kanjiBestStreak");
      const bestTimeEl = document.getElementById("kanjiBestTime");
      const overlay = document.getElementById("kanjiOverlay");
      const modeBtn = document.getElementById("kanjiModeBtn");
      const startBtn = document.getElementById("kanjiStart");
      const timedTgl = document.getElementById("kanjiTimedToggle");
      const optionBtns = overlay.querySelectorAll(".mode-option");
      let score = 0,
        lock = false;
      let mode = localStorage.getItem("kanji.mode") || "meaning";
      let timed = localStorage.getItem("kanji.timed") === "1";
      let streak = 0;
      let bestStreak = parseInt(
        localStorage.getItem("kanji.bestStreak") || "0",
        10
      );
      let bestTime =
        parseInt(localStorage.getItem("kanji.bestTime") || "0", 10) || null;
      let countdown = 15,
        tId = null,
        startAt = 0;

      // Mode overlay (hidden until used)
      let chosenMode = mode;
      overlay.style.display = "none";
      optionBtns.forEach((b) => {
        b.addEventListener("click", () => {
          chosenMode = b.getAttribute("data-mode");
          optionBtns.forEach((x) => x.classList.remove("active"));
          b.classList.add("active");
        });
      });
      if (timed)
        timedTgl.setAttribute("data-on", "1"),
          (timedTgl.textContent = "Timed: ON");
      timedTgl.addEventListener("click", () => {
        timed = timedTgl.getAttribute("data-on") !== "1";
        timedTgl.setAttribute("data-on", timed ? "1" : "0");
        timedTgl.textContent = timed ? "Timed: ON" : "Timed: OFF";
      });
      startBtn.addEventListener("click", () => {
        mode = chosenMode || "meaning";
        localStorage.setItem("kanji.mode", mode);
        localStorage.setItem("kanji.timed", timed ? "1" : "0");
        timerWrap.style.display = timed ? "inline-flex" : "none";
        overlay.style.display = "none";
        load();
      });
      document.addEventListener("kanji-start", (ev) => {
        const d = ev.detail || {};
        mode = d.mode === "reading" ? "reading" : "meaning";
        timed = !!d.timed;
        localStorage.setItem("kanji.mode", mode);
        localStorage.setItem("kanji.timed", timed ? "1" : "0");
        timerWrap.style.display = timed ? "inline-flex" : "none";
        overlay.style.display = "none";
        load();
      });
      modeBtn.addEventListener("click", () => {
        overlay.style.display = "flex";
      });
      timerWrap.style.display = timed ? "inline-flex" : "none";
      bestStreakEl.textContent = String(bestStreak);
      bestTimeEl.textContent = bestTime
        ? `${(bestTime / 1000).toFixed(1)}s`
        : "—";
      attachDivaHud("kanjiCard");

      async function load() {
        lock = false;
        fb.textContent = "";
        cEl.innerHTML = "";
        qEl.textContent = "Loading…";
        HUD.notes++;
        try {
          const q = await getKanjiQuestion(mode);
          const correct = q.correct;
          qEl.innerHTML = q.promptHtml;
          if (timed) {
            countdown = 15;
            timerEl.textContent = String(countdown);
            startAt = Date.now();
            if (tId) clearInterval(tId);
            tId = setInterval(() => {
              countdown--;
              timerEl.textContent = String(Math.max(0, countdown));
              if (countdown <= 0) {
                clearInterval(tId);
                tId = null;
                lock = true;
                fb.textContent = `⏰ Time! Correct: ${correct}`;
                fb.style.color = "#c00";
                sfxTime();
                streak = 0;
                streakEl.textContent = String(streak);
                HUD.counts.MISS++;
                flashJudge("kanjiCard", "MISS");
                addVoltage(-5, "kanjiCard");
                loseLife("kanjiCard");
                setTimeout(load, 1000);
              }
            }, 1000);
          }
          q.options.forEach((opt) => {
            const b = document.createElement("button");
            b.className = "pixel-btn";
            b.textContent = opt;
            b.style.padding = "8px";
            b.addEventListener("click", () => {
              if (lock) return;
              lock = true;
              if (tId) {
                clearInterval(tId);
                tId = null;
              }
              if (opt === correct) {
                fb.textContent = "✅ 正解!";
                fb.style.color = "#2b2b44";
                score++;
                scoreEl.textContent = String(score);
                addHearts(1);
                sfxOk();
                streak++;
                streakEl.textContent = String(streak);
                if (streak > 1) loveToast(`コンボ x${streak}!`);
                if (streak > bestStreak) {
                  bestStreak = streak;
                  localStorage.setItem("kanji.bestStreak", String(bestStreak));
                  bestStreakEl.textContent = String(bestStreak);
                }
                const gain = mode === "reading" ? 16 : 12;
                addXP(gain + Math.min(15, (streak - 1) * 2));
                if (timed) {
                  const elapsed = Date.now() - startAt;
                  if (!bestTime || elapsed < bestTime) {
                    bestTime = elapsed;
                    localStorage.setItem("kanji.bestTime", String(bestTime));
                    bestTimeEl.textContent = `${(bestTime / 1000).toFixed(1)}s`;
                  }
                }
                if (streak > 0 && streak % 5 === 0) addHearts(1);
                const dt = Date.now() - startAt;
                let judge = "FINE",
                  v = 2,
                  sc = 60;
                if (dt <= 700) {
                  judge = "COOL";
                  v = 5;
                  sc = 120;
                  HUD.counts.COOL++;
                  party("kanjiCard");
                } else if (dt <= 1600) {
                  judge = "GREAT";
                  v = 3;
                  sc = 80;
                  HUD.counts.GREAT++;
                } else {
                  HUD.counts.FINE++;
                }
                flashJudge("kanjiCard", judge);
                addVoltage(v, "kanjiCard");
                addCombo("kanjiCard");
                HUD.score += sc;
              } else {
                fb.textContent = `❌ ${correct}`;
                fb.style.color = "#c00";
                sfxBad();
                streak = 0;
                streakEl.textContent = String(streak);
                HUD.counts.SAD++;
                flashJudge("kanjiCard", "SAD");
                addVoltage(-5, "kanjiCard");
                resetCombo();
                loseLife("kanjiCard");
              }
              setTimeout(load, 900);
            });
            cEl.appendChild(b);
          });
        } catch (e) {
          friendlyError(cEl, load);
          qEl.textContent = "";
        }
      }
      // Start flow waits for overlay
    })();

    // Miku Meets Kotoba (chat-styled vocab multiple choice)
    (function mikuKotoba() {
      const chat = document.getElementById("kotobaChat");
      const cEl = document.getElementById("kotobaChoices");
      const start = document.getElementById("kotobaStart");
      const scoreEl = document.getElementById("kotobaScore");
      if (!chat || !cEl || !start || !scoreEl) return;
      let score = 0,
        lock = false;

      function say(text, from = "miku") {
        const b = document.createElement("div");
        b.style.cssText = `padding:8px 12px; border-radius:12px; max-width:88%; box-shadow: var(--shadow);`;
        if (from === "miku") {
          b.style.background = "linear-gradient(45deg, #BDE3FF, #CFF6E6)";
          b.style.alignSelf = "flex-start";
          b.textContent = "ミク: " + text;
        } else {
          b.style.background = "linear-gradient(45deg, #FFD1EC, #E6D1FF)";
          b.style.alignSelf = "flex-end";
          b.textContent = "あなた: " + text;
        }
        chat.appendChild(b);
        chat.scrollTop = chat.scrollHeight;
      }

      async function round() {
        lock = false;
        cEl.innerHTML = "";
        try {
          const q = await getVocabQuestion("jp-en");
          const correct = q.correct;
          chat.innerHTML = "";
          say(
            `「${q.promptHtml.replace(/<[^>]+>/g, "")}」って、どういう意味？`
          );
          q.options.forEach((opt) => {
            const b = document.createElement("button");
            b.className = "pixel-btn";
            b.textContent = opt;
            b.style.padding = "8px";
            b.addEventListener("click", () => {
              if (lock) return;
              lock = true;
              if (opt === correct) {
                say("正解だよ！");
                sfxOk();
                score++;
                scoreEl.textContent = String(score);
                addXP(10);
              } else {
                say(`残念！正解は「${correct}」`);
                sfxBad();
              }
              setTimeout(round, 900);
            });
            cEl.appendChild(b);
          });
        } catch (_) {
          cEl.innerHTML =
            '<div style="opacity:.8">⚠️ Could not load. Try again.</div>';
        }
      }
      start.addEventListener("click", () => {
        start.disabled = true;
        round();
      });
    })();
  }

  // ====== APPLY CONTENT (copy from SITE_CONTENT) ======
  function applyContent() {
    try {
      if (C.site?.htmlTitle) document.title = C.site.htmlTitle;
      if (C.site?.title) {
        const t = document.getElementById("siteTitle");
        if (t) t.textContent = C.site.title;
      }
      if (C.site?.subtitle) {
        const s = document.getElementById("siteSub");
        if (s) s.textContent = C.site.subtitle;
      }

      // Meta and icons
      if (C.images?.ogImage) {
        const og = document.getElementById("metaOgImage");
        if (og) og.setAttribute("content", C.images.ogImage);
      }
      if (C.images?.favicon) {
        const fav = document.getElementById("faviconLink");
        if (fav) fav.setAttribute("href", C.images.favicon);
      }

      // Header background image (override)
      if (C.images?.headerBg) {
        const header = document.getElementById("header");
        if (header)
          header.style.backgroundImage = `linear-gradient(135deg, rgba(189,227,255,.9), rgba(255,209,236,.9)), url('${C.images.headerBg}')`;
      }

      // Splash/hero/shrine images
      const splashImg = document.getElementById("splashMiku");
      if (splashImg)
        splashImg.src =
          C.images?.splashMiku ||
          "./assets/miku_hatsune_5_by_makiilu_d4uklnz-fullview.png";
      const heroMiku = document.getElementById("heroMiku");
      if (heroMiku)
        heroMiku.src =
          C.images?.heroMiku ||
          "./assets/hatsune_miku_render_by_jimmyisaac_d68ibgy-pre.png";
      const shrineMiku = document.getElementById("shrineMiku");
      if (shrineMiku)
        shrineMiku.src =
          C.images?.shrineMiku ||
          "./assets/miku_hatsune_5_by_makiilu_d4uklnz-fullview.png";

      // Pet iframe
      const pet = document.getElementById("petIframe");
      if (pet && C.embeds?.petIframeSrc) pet.src = C.embeds.petIframeSrc;

      // Stats badges
      if (Array.isArray(C.images?.statsBadges)) {
        const b1 = document.getElementById("statBadge1");
        const b2 = document.getElementById("statBadge2");
        if (b1 && C.images.statsBadges[0]) b1.src = C.images.statsBadges[0];
        if (b2 && C.images.statsBadges[1]) b2.src = C.images.statsBadges[1];
      }

      // Web badges (right sidebar)
      if (Array.isArray(C.images?.webBadges)) {
        const wrap = document.getElementById("webBadges");
        if (wrap) {
          wrap.innerHTML = C.images.webBadges
            .map((badge) => {
              if (typeof badge === "object" && badge.src) {
                // Special badge object (like our own badge)
                const link = badge.link || "#";
                const style = badge.style || "";
                const classes = badge.isOurBadge
                  ? "badge our-own-badge"
                  : "badge";
                return `<a href="${link}" target="_blank" rel="noopener"><img src="${
                  badge.src
                }" class="${classes}" alt="${
                  badge.alt || "badge"
                }" style="${style}"/></a>`;
              } else {
                // Simple URL string
                return `<img src="${badge}" class="badge" alt="badge"/>`;
              }
            })
            .join("");
        }
      }

      // Splash copy
      const splashTitle = document.querySelector("#splash .glitch");
      if (splashTitle && C.splash?.title) {
        splashTitle.textContent = C.splash.title;
        splashTitle.setAttribute("data-text", C.splash.title);
      }
      const splashSub = document.querySelector("#splash .typing-text");
      if (splashSub && C.splash?.subtitle)
        splashSub.textContent = C.splash.subtitle;
      const splashBtn = document.getElementById("enterSite");
      if (splashBtn && C.splash?.button)
        splashBtn.textContent = C.splash.button;

      // Nav labels (keep anchors, replace text)
      const navLinks = Array.from(
        document.querySelectorAll("#navbar a[data-section]")
      );
      if (Array.isArray(C.nav) && C.nav.length === navLinks.length) {
        C.nav.forEach((n, i) => {
          const a = navLinks[i];
          if (a && n) {
            const icon = n.mikuIcon
              ? mikuIcon(n.mikuIcon, n.emoji || "")
              : n.emoji || "";
            // displayIcon variable was introduced in socials only; use local icon here
            a.innerHTML = `${icon} ${n.label}`;
          }
        });
      }

      // Status now-playing placeholder if empty
      const nowPlaying = document.getElementById("nowPlaying");
      if (
        nowPlaying &&
        !localStorage.getItem("pixelbelle-now-playing") &&
        C.status?.nowPlayingPlaceholder
      ) {
        nowPlaying.textContent = C.status.nowPlayingPlaceholder;
      }
      // Status labels
      const onlineStatus = document.getElementById("onlineStatus");
      if (onlineStatus && C.status?.onlineLabel) {
        const statusIcon = C.status.statusIcon ? mikuIcon(C.status.statusIcon, "") : "";
        onlineStatus.innerHTML = `${statusIcon}${C.status.onlineLabel}`;
      }
      const heartCountLbl = document.querySelector(".status-item:nth-child(3)");
      if (heartCountLbl && C.status?.heartsLabel) {
        const span = heartCountLbl.querySelector("span");
        if (span) {
          const heartIcon = C.status.heartIcon
            ? mikuIcon(C.status.heartIcon, "💖")
            : "💖";
          span.previousSibling &&
            (span.previousSibling.innerHTML = ` ${heartIcon} ${C.status.heartsLabel} `);
        }
      }

      // Home hero + cards
      if (C.home) {
        const h2 = document.querySelector("#home .hero-text h2");
        if (h2 && C.home.heroTitle) h2.textContent = C.home.heroTitle;
        const p = document.querySelector("#home .hero-text p");
        if (p && Array.isArray(C.home.heroParagraphs)) {
          p.innerHTML = C.home.heroParagraphs
            .map((line, idx, arr) => {
              // Add love letter icon to the final line
              if (idx === arr.length - 1) {
                const ll = mikuIcon('loveLetter', '💌');
                return `${line} ${ll}`;
              }
              return line;
            })
            .join(" <br />");
        }
        const heartBtn = document.getElementById("heartBtn");
        if (heartBtn && C.home.heartButton) {
          const heartIcon = C.home.heartButtonIcon
            ? mikuIcon(C.home.heartButtonIcon, "💖")
            : "💖";
          heartBtn.innerHTML = `${heartIcon} ${C.home.heartButton}`;
        }

        // Rebuild the grid with unified presentation system
        const grid = document.querySelector("#home .content-grid");
        if (grid) {
          // Check if we have the new presentation slides
          if (C.home.presentationSlides && C.home.presentationSlides.length > 0) {
            const presentationIcon = C.home.presentationIcon ? mikuIcon(C.home.presentationIcon, "✨") : "✨";
            const presentationTitle = C.home.presentationTitle || "Getting to Know Baby Belle";
            
            // Build unified presentation
            const slidesHtml = C.home.presentationSlides.map((slide, index) => {
              const titleIcon = slide.titleIcon ? mikuIcon(slide.titleIcon, "") : "";
              const decorativeIconsHtml = slide.decorativeIcons
                ? slide.decorativeIcons.map(iconName => mikuIcon(iconName, "")).join("")
                : "";
              
              return `
                <div class="presentation-slide ${index === 0 ? 'active' : ''}" 
                     data-slide="${index}" 
                     data-theme="${slide.theme || 'default'}">
                  <div class="slide-header">
                    <h3>${titleIcon}${slide.title}</h3>
                    <div class="slide-decorations">${decorativeIconsHtml}</div>
                  </div>
                  <div class="slide-content">
                    ${slide.content.map(line => line ? `<p>${line}</p>` : '<br>').join('')}
                  </div>
                  <div class="slide-number">${index + 1} / ${C.home.presentationSlides.length}</div>
                </div>
              `;
            }).join("");
            
            grid.innerHTML = `
              <div class="belle-presentation">
                <div class="presentation-header">
                  <h2>${presentationIcon}${presentationTitle}</h2>
                  <div class="presentation-controls">
                    <button class="presentation-btn prev-slide" data-direction="prev">
                      ${mikuIcon('wallHide', '◀')} Previous
                    </button>
                    <div class="slide-indicator">
                      <span class="current-slide">1</span> / ${C.home.presentationSlides.length}
                    </div>
                    <button class="presentation-btn next-slide" data-direction="next">
                      Next ${mikuIcon('cheering', '▶')}
                    </button>
                  </div>
                  <div class="presentation-progress">
                    <div class="progress-bar">
                      <div class="progress-fill" style="width: ${100/C.home.presentationSlides.length}%"></div>
                    </div>
                  </div>
                </div>
                <div class="presentation-content">
                  ${slidesHtml}
                </div>
                <div class="floating-decorations"></div>
              </div>
            `;
            
            // Initialize the enhanced presentation system
            initBellePresentation();
          } else {
            // Fallback to old system
            const likes = (C.home.likes || [])
              .map((li) => `<li>${li}</li>`)
              .join("");
            const dislikes = (C.home.dislikes || [])
              .map((li) => `<li>${li}</li>`)
              .join("");
            const dreams = (C.home.dreams || [])
              .map((li, idx) => {
                const dreamIcon = C.home.dreamItemIcons?.[idx]
                  ? mikuIcon(C.home.dreamItemIcons[idx], "")
                  : "";
                return `<li>${dreamIcon}${li}</li>`;
              })
              .join("");
            
            // Build paginated about content
            const aboutPages = C.home.aboutPages || [C.home.aboutParagraphs || []];
            const aboutPageHtml = aboutPages.map((page, index) => 
              `<div class="card-page ${index === 0 ? 'active' : ''}" data-page="${index}">
                ${page.map((txt) => `<p>${txt}</p>`).join("")}
              </div>`
            ).join("");

            // Build paginated dislikes content
            const dislikesPages = C.home.dislikesPages || [C.home.dislikes || []];
            const dislikesPageHtml = dislikesPages.map((page, index) =>
              `<div class="card-page ${index === 0 ? 'active' : ''}" data-page="${index}">
                <ul>${page.map((item) => `<li>${item}</li>`).join("")}</ul>
              </div>`
            ).join("");

            // Build paginated dreams content
            const dreamsPages = C.home.dreamsPages || [C.home.dreams || []];
            const dreamsPageHtml = dreamsPages.map((page, index) =>
              `<div class="card-page ${index === 0 ? 'active' : ''}" data-page="${index}">
                <ul>${page.map((item, idx) => {
                  const dreamIcon = C.home.dreamItemIcons?.[idx] ? mikuIcon(C.home.dreamItemIcons[idx], "") : "";
                  return `<li>${dreamIcon}${item}</li>`;
                }).join("")}</ul>
              </div>`
            ).join("");

            const pieces = [];
            const aboutTitleIcon = C.home.aboutIcon
              ? mikuIcon(C.home.aboutIcon, "")
              : "";
            const aboutTitle = `${aboutTitleIcon}${
              C.home.aboutTitle || "About Me"
            }`;
            
            // About card with pagination
            pieces.push(`
              <div class="card paginated-card" data-card="about">
                <div class="card-header">
                  <h3>${aboutTitle}</h3>
                  ${aboutPages.length > 1 ? `
                    <div class="card-nav">
                      <button class="card-nav-btn prev-btn" data-direction="prev">${mikuIcon('wallHide', '←')}</button>
                      <span class="page-indicator">1/${aboutPages.length}</span>
                      <button class="card-nav-btn next-btn" data-direction="next">${mikuIcon('cheering', '→')}</button>
                    </div>
                  ` : ''}
                </div>
                <div class="card-content">
                  ${aboutPageHtml}
                </div>
              </div>
            `);
            
            // Likes card with icon
            if (likes) {
              const likesIcon = C.home.likesIcon ? mikuIcon(C.home.likesIcon, "") : "";
              pieces.push(`
                <div class="card">
                  <h3>${likesIcon}${C.home.likesTitle || "Likes"}</h3>
                  <ul>${likes}</ul>
                </div>
              `);
            }
            
            // Dislikes card with pagination
            if (C.home.dislikesPages && C.home.dislikesPages.length > 0) {
              const dislikesIcon = C.home.dislikesIcon ? mikuIcon(C.home.dislikesIcon, "") : "";
              pieces.push(`
                <div class="card paginated-card" data-card="dislikes">
                  <div class="card-header">
                    <h3>${dislikesIcon}${C.home.dislikesTitle || "Dislikes"}</h3>
                    ${dislikesPages.length > 1 ? `
                      <div class="card-nav">
                        <button class="card-nav-btn prev-btn" data-direction="prev">${mikuIcon('wallHide', '←')}</button>
                        <span class="page-indicator">1/${dislikesPages.length}</span>
                        <button class="card-nav-btn next-btn" data-direction="next">${mikuIcon('innocent', '→')}</button>
                      </div>
                    ` : ''}
                  </div>
                  <div class="card-content">
                    ${dislikesPageHtml}
                  </div>
                </div>
              `);
            } else if (dislikes) {
              const dislikesIcon = C.home.dislikesIcon ? mikuIcon(C.home.dislikesIcon, "") : "";
              pieces.push(`
                <div class="card">
                  <h3>${dislikesIcon}${C.home.dislikesTitle || "Dislikes"}</h3>
                  <ul>${dislikes}</ul>
                </div>
              `);
            }
            
            // Dreams card with pagination
            if (C.home.dreamsPages && C.home.dreamsPages.length > 0) {
              const dreamsTitleIcon = C.home.dreamsIcon ? mikuIcon(C.home.dreamsIcon, "") : "";
              const dreamsTitle = `${dreamsTitleIcon}${C.home.dreamsTitle || "Dreams"}`;
              pieces.push(`
                <div class="card paginated-card" data-card="dreams">
                  <div class="card-header">
                    <h3>${dreamsTitle}</h3>
                    ${dreamsPages.length > 1 ? `
                      <div class="card-nav">
                        <button class="card-nav-btn prev-btn" data-direction="prev">${mikuIcon('wallHide', '←')}</button>
                        <span class="page-indicator">1/${dreamsPages.length}</span>
                        <button class="card-nav-btn next-btn" data-direction="next">${mikuIcon('starUwu', '→')}</button>
                      </div>
                    ` : ''}
                  </div>
                  <div class="card-content">
                    ${dreamsPageHtml}
                  </div>
                </div>
              `);
            } else if (dreams) {
              const dreamsTitleIcon = C.home.dreamsIcon ? mikuIcon(C.home.dreamsIcon, "") : "";
              const dreamsTitle = `${dreamsTitleIcon}${C.home.dreamsTitle || "Dreams"}`;
              pieces.push(`
                <div class="card">
                  <h3>${dreamsTitle}</h3>
                  <ul>${dreams}</ul>
                </div>
              `);
            }

            grid.innerHTML = pieces.join("");
            
            // Initialize card pagination
            initCardPagination();
          }
        }
      }

      // Socials section title
      if (C.socials?.title) {
        const h2 = document.querySelector("#socials h2");
        const titleIcon = C.socials.titleIcon
          ? mikuIcon(C.socials.titleIcon, "🔗")
          : "🔗";
        if (h2) h2.innerHTML = `${titleIcon} ${C.socials.title}`;
      }

      // Quick Links in left sidebar
      if (C.quickLinks) {
        const h3 = document.getElementById("quickLinksTitle");
        const ul = document.getElementById("quickLinksList");
        if (h3 && C.quickLinks.title) h3.textContent = C.quickLinks.title;
        if (ul && Array.isArray(C.quickLinks.items)) {
          ul.innerHTML = C.quickLinks.items
            .map(
              (i) =>
                `<li><a href="${i.url}" target="_blank" rel="noopener" ${
                  i.cls ? `class="${i.cls}"` : ""
                }>${i.label}</a></li>`
            )
            .join("");
        }
      }

      // Study copy
      if (C.study) {
        const h2 = document.querySelector("#study h2");
        const studyIcon = C.study.titleIcon ? mikuIcon(C.study.titleIcon, "🎌") : "🎌";
        if (h2) h2.innerHTML = `${studyIcon} ${C.study.title}`;
        const levelCard = document.getElementById("levelCard");
        if (levelCard) {
          const h3 = levelCard.querySelector("h3");
          const progress = levelCard.querySelector(".progress");
          const p = levelCard.querySelector("p");
          if (h3 && C.study.levelTitle) {
            const levelIcon = C.study.levelIcon ? mikuIcon(C.study.levelIcon, "🌸") : "🌸";
            h3.innerHTML = `${levelIcon} ${C.study.levelTitle}`;
          }
          if (progress && Number.isFinite(C.study.progressPercent))
            progress.style.width = `${C.study.progressPercent}%`;
          if (p && C.study.levelText) p.textContent = C.study.levelText;
        }
        const wodCard = document.getElementById("wodCard");
        if (wodCard && C.study.wordOfDay) {
          const jp = wodCard.querySelector(".japanese");
          const romaji = wodCard.querySelector(".romaji");
          const meaning = wodCard.querySelector(".meaning");
          if (jp) jp.textContent = C.study.wordOfDay.japanese || "";
          if (romaji) romaji.textContent = C.study.wordOfDay.romaji || "";
          if (meaning) meaning.textContent = C.study.wordOfDay.meaning || "";
        }
        const goalsCard = document.getElementById("goalsCard");
        if (goalsCard) {
          const h3 = goalsCard.querySelector("h3");
          const ul = goalsCard.querySelector("ul");
          if (h3 && C.study.goalsTitle) {
            const goalsIcon = C.study.goalsIcon ? mikuIcon(C.study.goalsIcon, "") : "";
            h3.innerHTML = `${goalsIcon}${C.study.goalsTitle}`;
          }
          if (ul && Array.isArray(C.study.goals))
            ul.innerHTML = C.study.goals.map((g, idx) => {
              const goalIcon = C.study.goalItemIcons?.[idx] ? mikuIcon(C.study.goalItemIcons[idx], "") : "";
              return `<li>${goalIcon}${g}</li>`;
            }).join("");
        }
      }

      // Games titles/buttons
      if (C.games) {
        const h2 = document.querySelector("#games h2");
        if (h2) h2.textContent = C.games.title;
        const cards = document.querySelectorAll("#games .game-widget");
        const mem = cards[0],
          heart = cards[1],
          gacha = cards[2];
        if (mem) {
          const h3 = mem.querySelector("h3");
          if (h3 && C.games.memoryTitle) {
            const memoryIcon = C.games.memoryIcon
              ? mikuIcon(C.games.memoryIcon, "🧩")
              : "🧩";
            h3.innerHTML = `${memoryIcon} ${C.games.memoryTitle}`;
          }
          const reset = document.getElementById("resetMemory");
          if (reset && C.games.memoryReset)
            reset.textContent = C.games.memoryReset;
        }
        if (heart) {
          const h3 = heart.querySelector("h3");
          if (h3 && C.games.heartsTitle) {
            const heartsIcon = C.games.heartsIcon
              ? mikuIcon(C.games.heartsIcon, "💖")
              : "💖";
            h3.innerHTML = `${heartsIcon} ${C.games.heartsTitle}`;
          }
          const zone = document.getElementById("heartZone");
          if (zone && C.games.heartsZone) {
            const zoneIcon = C.games.heartsZoneIcon
              ? mikuIcon(C.games.heartsZoneIcon, "💖")
              : "💖";
            zone.innerHTML = `Click to collect hearts! ${zoneIcon}`;
          }
          const btn = document.getElementById("resetHearts");
          if (btn && C.games.heartsReset) btn.textContent = C.games.heartsReset;
        }
        if (gacha) {
          const h3 = gacha.querySelector("h3");
          if (h3 && C.games.gachaTitle) {
            const gachaIcon = C.games.gachaIcon
              ? mikuIcon(C.games.gachaIcon, "🎰")
              : "🎰";
            h3.innerHTML = `${gachaIcon} ${C.games.gachaTitle}`;
          }
          const dexBtn = document.getElementById("gachaCollectionBtn");
          if (dexBtn && C.games.gachaOpenDex)
            dexBtn.textContent = C.games.gachaOpenDex;
        }
      }

      // Shrine copy
      if (C.shrine) {
        const h2 = document.querySelector("#shrine h2");
        if (h2) {
          const titleIcon = C.shrine.titleIcon
            ? mikuIcon(C.shrine.titleIcon, "⛩️")
            : "⛩️";
          h2.innerHTML = `${titleIcon} ${C.shrine.title}`;
        }
        const aboutTitle = document.querySelector("#shrine .shrine-info h3");
        if (aboutTitle && C.shrine.aboutTitle) {
          const aboutIcon = C.shrine.aboutIcon
            ? mikuIcon(C.shrine.aboutIcon, "💙")
            : "💙";
          aboutTitle.innerHTML = `${aboutIcon} ${C.shrine.aboutTitle}`;
        }
        const aboutP = document.querySelector("#shrine .shrine-info p");
        if (aboutP && C.shrine.aboutText)
          aboutP.textContent = C.shrine.aboutText;
        const listTitle = document.querySelectorAll(
          "#shrine .shrine-info h3"
        )[1];
        if (listTitle && C.shrine.favoriteSongsTitle)
          listTitle.textContent = C.shrine.favoriteSongsTitle;
        const ul = document.querySelector("#shrine .song-list");
        if (ul && Array.isArray(C.shrine.favoriteSongs))
          ul.innerHTML = C.shrine.favoriteSongs
            .map((s) => `<li>${s}</li>`)
            .join("");
        const galTitle = document.querySelector("#shrine .gallery h3");
        if (galTitle && C.shrine.galleryTitle)
          galTitle.textContent = C.shrine.galleryTitle;
      }

      // Friends title (by widget containing #friendsList)
      if (C.friends?.title) {
        const friendsListEl = document.getElementById("friendsList");
        if (friendsListEl) {
          const widget = friendsListEl.closest(".widget");
          const h3 = widget ? widget.querySelector("h3") : null;
          const friendsIcon = C.friends.titleIcon ? mikuIcon(C.friends.titleIcon, "👥") : "👥";
          if (h3) h3.innerHTML = `${friendsIcon} ${C.friends.title}`;
        }
      }

      // Sidebar widget titles (programmatically by element anchors)
      if (C.sidebarTitles) {
        const left = C.sidebarTitles.left || {};
        const right = C.sidebarTitles.right || {};

        // Radio heading
        const radioWidget = document.querySelector('.radio-widget');
        if (radioWidget && C.radio?.title) {
          const w = radioWidget.closest('.widget');
          const h = w ? w.querySelector('h3') : null;
          const radioIcon = C.radio.titleIcon ? mikuIcon(C.radio.titleIcon, "📻") : "📻";
          if (h) h.innerHTML = `${radioIcon} ${C.radio.title}`;
        }

        // Pet heading
        const petIframe = document.getElementById("petIframe");
        if (petIframe && left.pet) {
          const w = petIframe.closest(".widget");
          const h = w ? w.querySelector("h3") : null;
          const petIcon = left.petIcon ? mikuIcon(left.petIcon, "🐾") : "🐾";
          if (h) h.innerHTML = `${petIcon} ${left.pet}`;
        }

        // Friends heading handled above

        // Stats heading
        const statBadge1 = document.getElementById("statBadge1");
        if (statBadge1 && left.stats) {
          const w = statBadge1.closest(".widget");
          const h = w ? w.querySelector("h3") : null;
          const statsIcon = left.statsIcon ? mikuIcon(left.statsIcon, "🌸") : "🌸";
          if (h) h.innerHTML = `${statsIcon} ${left.stats}`;
          
          // Also update visitor counter label with icon
          const visitorLabel = w ? w.querySelector(".counter-label") : null;
          if (visitorLabel && C.status?.visitorIcon) {
            const visitorIcon = mikuIcon(C.status.visitorIcon, "");
            visitorLabel.innerHTML = `${visitorIcon}Visitors:`;
          }
        }

        // Quick Links title (now on right)
        const quickLinksTitle = document.getElementById("quickLinksTitle");
        if (quickLinksTitle && right.quickLinks) {
          const quickLinksIcon = right.quickLinksIcon ? mikuIcon(right.quickLinksIcon, "🌟") : "🌟";
          quickLinksTitle.innerHTML = `${quickLinksIcon} ${right.quickLinks}`;
        }

        // Badges title
        const webBadges = document.getElementById("webBadges");
        if (webBadges && right.badges) {
          const w = webBadges.closest(".widget");
          const h = w ? w.querySelector("h3") : null;
          const badgesIcon = right.badgesIcon ? mikuIcon(right.badgesIcon, "💫") : "💫";
          if (h) h.innerHTML = `${badgesIcon} ${right.badges}`;
        }

        // Vibe title
        const vibeMeter = document.querySelector("#rightSidebar .vibe-meter");
        if (vibeMeter && right.vibe) {
          const w = vibeMeter.closest(".widget");
          const h = w ? w.querySelector("h3") : null;
          const vibeIcon = right.vibeIcon ? mikuIcon(right.vibeIcon, "📊") : "📊";
          if (h) h.innerHTML = `${vibeIcon} ${right.vibe}`;
        }
      }

      // Footer
      if (C.footer?.text) {
        const p = document.querySelector("#footer p");
        if (p) p.textContent = C.footer.text;
      }
    } catch (e) {
      console.warn("applyContent failed", e);
    }
  }

  // ====== NAVIGATION ======
  function initNavigation() {
    const navLinks = document.querySelectorAll("#navbar a[data-section]");
    const sections = document.querySelectorAll(".content-section");

    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetSection = link.getAttribute("data-section");
        showSection(targetSection);
      });
    });

    function showSection(sectionId) {
      // Hide all sections
      sections.forEach((section) => {
        section.classList.remove("active");
      });

      // Show target section
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.classList.add("active");
        currentSection = sectionId;
      }

      // Update nav links
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("data-section") === sectionId) {
          link.classList.add("active");
        }
      });

      // Add entrance animation
      if (targetSection)
        targetSection.style.animation = "fadeInUp 0.5s ease-out";
    }
    function spawnFloatingMikus() {
      const container = document.getElementById("floatingMikusContainer");
      if (!container) return;
      container.innerHTML = "";
      const available = MIKU_IMAGES.length;
      if (!available) return;
      const spawnAmount = 15;
      const numMikus = Math.min(
        Math.floor(Math.random() * spawnAmount + 1),
        available
      );
      const selected = new Set();
      for (let i = 0; i < numMikus; i++) {
        let index;
        do {
          index = Math.floor(Math.random() * available);
        } while (selected.has(index));
        selected.add(index);
        const img = document.createElement("img");
        img.src = MIKU_IMAGES[index];
        img.className = "float-miku";
        img.alt = "Pixel Miku";
        container.appendChild(img);
      }
    }

    if (MIKU_IMAGES.length) spawnFloatingMikus();
    else
      document.addEventListener("miku-images-ready", spawnFloatingMikus, {
        once: true,
      });
  }

  // ====== STATUS BAR ======
  function initStatusBar() {
    const nowPlaying = document.getElementById("nowPlaying");
    const heartCountEl = document.getElementById("heartCount");
    const visitorCountEl = document.getElementById("visitorCount");
    const moodInput = document.getElementById("moodInput");
    const saveMoodBtn = document.getElementById("saveMood");
    const moodDisplay = document.getElementById("moodDisplay");

    // Update counters
    heartCountEl.textContent = heartCount;
    visitorCountEl.textContent = visitorCount.toLocaleString();

    // Now playing auto-save
    if (nowPlaying) {
      nowPlaying.addEventListener("input", () => {
        localStorage.setItem("pixelbelle-now-playing", nowPlaying.textContent);
      });
    }

    // Mood system
    if (saveMoodBtn)
      saveMoodBtn.addEventListener("click", () => {
        const mood = moodInput.value.trim();
        if (mood) {
          moodDisplay.textContent = `💭 ${mood}`;
          localStorage.setItem("pixelbelle-mood", mood);
          moodInput.value = "";

          // Add sparkle effect
          createSparkleEffect(saveMoodBtn);
        }
      });

    if (moodInput)
      moodInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          saveMoodBtn.click();
        }
      });
  }

  // ====== SOCIALS SECTION ======
  function initSocials() {
    const socialsGrid = document.getElementById("socialsGrid");
    if (!socialsGrid) return;

    function ytVideoIdFromUrl(u) {
      try {
        const url = new URL(u);
        if (url.hostname === "youtu.be") return url.pathname.slice(1);
        const v = url.searchParams.get("v");
        return v || null;
      } catch {
        return null;
      }
    }

    function ytHandleFromUrl(u) {
      try {
        const url = new URL(u);
        const m = url.pathname.match(/@([A-Za-z0-9_\-\.]+)/);
        return m ? m[1] : null;
      } catch {
        return null;
      }
    }

    const SPOTIFY_PROFILE =
      "https://open.spotify.com/user/31hkk7assbfbsaqjfybnyfmuakqq";

    function renderEmbed(s) {
      const { label, url, icon, color, mikuIcon: mikuIconName } = s;
      const displayIcon = mikuIconName ? mikuIcon(mikuIconName, icon) : icon;
      let domain = "";
      try {
        domain = new URL(url).hostname.replace("www.", "");
      } catch {}

      // Blocklist some sites that should not be embedded (e.g., jigsawplanet)
      if (domain.includes("jigsawplanet.com")) {
        return `
          <div class="social-item" style="--accent:${color}">
            <div class="social-title"><span class="icon">${displayIcon}</span> ${label}</div>
            <div class="social-embed">
              <a class="pixel-btn" href="${url}" target="_blank" rel="noopener">Open Puzzle in new tab</a>
            </div>
          </div>
        `;
      }

      // YouTube video/channel fallback

      if (domain.includes("youtube.com") || domain === "youtu.be") {
        // Force a specific default video if not explicitly given
        const forced = "YTinkSv10Qs"; // requested video ID
        const vid = ytVideoIdFromUrl(url) || forced;
        if (vid) {
          return `
            <div class="social-item" style="--accent:${color}">
              <div class="social-title"><span class="icon">${displayIcon}</span> ${label}</div>
              <div class="social-embed" style="aspect-ratio:16/9">
                <iframe style="width:100%;height:100%;border:0;border-radius:12px" src="https://www.youtube.com/embed/${vid}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>
              </div>
            </div>
          `;
        }
        const handle = ytHandleFromUrl(url);
        if (handle) {
          return `
            <div class="social-item" style="--accent:${color}">
              <div class="social-title"><span class="icon">${displayIcon}</span> ${label}</div>
              <div class="social-embed" style="aspect-ratio:16/9">
                <iframe style="width:100%;height:100%;border:0;border-radius:12px" src="https://www.youtube.com/embed?listType=user_uploads&list=${handle}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>
              </div>
            </div>
          `;
        }
        return `
          <div class="social-item" style="--accent:${color}">
            <div class="social-title"><span class="icon">${displayIcon}</span> ${label}</div>
            <div class="social-embed"><a class="pixel-btn" href="${url}" target="_blank" rel="noopener">Open YouTube</a></div>
          </div>
        `;
      }

      // Spotify playlist
      if (domain.includes("open.spotify.com") && /\/playlist\//.test(url)) {
        const id = url.split("/playlist/")[1]?.split("?")[0];
        if (id) {
          return `
            <div class="social-item" style="--accent:${color}">
              <div class="social-title"><span class="icon">${displayIcon}</span> ${label}</div>
              <div class="social-embed">
                <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/${id}" width="100%" height="352" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
              </div>
            </div>
          `;
        }
      }

      // Discord invite (render a faux invite card using local assets)
      if (domain.includes("discord.gg") || domain.includes("discord.com")) {
        const banner = "./assets/discordServerBanner.png";
        const logo = "./assets/discordServerLogo.png";
        return `
          <div class="social-item" style="--accent:${color}">
            <div class="social-title"><span class="icon">${displayIcon}</span> ${label}</div>
            <div class="social-embed" style="border-radius:12px; overflow:hidden;">
              <div style="background:#2b2d31;color:#fff;border-radius:12px;display:flex;flex-direction:column;gap:0;overflow:hidden;border:2px solid var(--border)">
                <div style="position:relative;height:140px;background:#202225">
                  <img src="${banner}" alt="Discord banner" style="width:100%;height:100%;object-fit:cover;display:block;filter:saturate(1.05)" />
                  <img src="${logo}" alt="Server logo" style="position:absolute;left:16px;bottom:-28px;width:64px;height:64px;border-radius:12px;border:4px solid #2b2d31;background:#2b2d31" />
                </div>
                <div style="padding:40px 16px 16px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px">
                  <div>
                    <div style="font-weight:900;font-size:1.05rem;line-height:1.2">Join Baby Belle's Server</div>
                    <div style="color:#b5bac1;font-size:.9rem;margin-top:2px">Community • 69 Members</div>
                  </div>
                  <a href="${url}" target="_blank" rel="noopener" class="pixel-btn" style="background:#5865F2;color:#fff;font-weight:900;border:2px solid #4752C4;border-radius:10px;padding:10px 14px;white-space:nowrap">Join</a>
                </div>
              </div>
            </div>
          </div>
        `;
      }

      // Twitch (if provided in SOCIALS)
      if (domain.includes("twitch.tv")) {
        const ch = (() => {
          try {
            const u = new URL(url);
            const parts = u.pathname.split("/").filter(Boolean);
            return parts[0] || "";
          } catch {
            return "";
          }
        })();
        const parent = location.hostname || "localhost";
        return `
          <div class="social-item" style="--accent:${color}">
            <div class="social-title"><span class="icon">${displayIcon}</span> ${label}</div>
            <div class="social-embed" style="aspect-ratio:16/9">
              <iframe src="https://player.twitch.tv/?channel=${ch}&parent=${parent}&muted=true" allowfullscreen style="border:0;width:100%;height:100%;border-radius:12px"></iframe>
            </div>
          </div>
        `;
      }

      // Spring/Teespring store (simple iframe embed)
      if (
        domain.includes("creator-spring.com") ||
        domain.includes("teespring.com")
      ) {
        return `
          <div class="social-item" style="--accent:${color}">
            <div class="social-title"><span class="icon">${displayIcon}</span> ${label}</div>
            <div class="social-embed" style="height:420px">
              <iframe src="${url}" style="border:0;width:100%;height:100%;border-radius:12px" loading="lazy" referrerpolicy="no-referrer"></iframe>
            </div>
          </div>
        `;
      }

      // Fallback: iframe
      return `
        <div class="social-item" style="--accent:${color}">
          <div class="social-title"><span class="icon">${displayIcon}</span> ${label}</div>
          <div class="social-embed">
            <iframe src="${url}" style="border:0;width:100%;height:400px;border-radius:12px" loading="lazy" referrerpolicy="no-referrer"></iframe>
          </div>
        </div>
      `;
    }

    socialsGrid.innerHTML = SOCIALS.map(renderEmbed).join("");
  }

  // ====== RADIO SECTION ======
  function initRadio() {
    const playBtn = document.getElementById("playRadio");
    const pauseBtn = document.getElementById("pauseRadio");
    const radioStatus = document.getElementById("radioStatus");
    const radioDisplayStatus = document.getElementById("radioDisplayStatus");
    const onlineStatus = document.getElementById("onlineStatus");
    const statusDot = document.getElementById("statusDot");

    let isPlaying = false;

    // Stream source (Vocaloid Radio)
    const STREAM_URL = "https://vocaloid.radioca.st/stream";
    const audio = new Audio();
    audio.src = STREAM_URL;
    audio.preload = "none";
    audio.crossOrigin = "anonymous";
    audio.volume = 0.85;

    // Initialize labels
    if (onlineStatus)
      onlineStatus.textContent = C.status?.radioOffLabel || "Radio Off";
    if (radioStatus)
      radioStatus.textContent = C.radio?.defaultStatus || "Kawaii FM 📻";
    if (radioDisplayStatus)
      radioDisplayStatus.textContent = C.radio?.defaultStatus || "Kawaii FM 📻";
    if (statusDot) statusDot.style.color = "#ffbf00"; // amber on load

    // Radio controls
    playBtn.addEventListener("click", () => {
      isPlaying = true;
      const status = C.radio?.playingStatus || "Now Playing";
      radioStatus.textContent = status;
      if (radioDisplayStatus) radioDisplayStatus.textContent = status;
      if (onlineStatus) onlineStatus.textContent = "Playing";
      audio.play().catch(() => {});
      startEqualizer();
      if (statusDot) statusDot.style.color = "#00ff00"; // green when playing
    });

    pauseBtn.addEventListener("click", () => {
      isPlaying = false;
      audio.pause();
      const status = C.radio?.stoppedStatus || "Radio Stopped";
      radioStatus.textContent = status;
      if (radioDisplayStatus) radioDisplayStatus.textContent = status;
      if (onlineStatus)
        onlineStatus.textContent = C.status?.radioOffLabel || "Radio Off";
      stopEqualizer();
      if (statusDot) statusDot.style.color = "#ff4d4d"; // red when stopped
    });

    audio.addEventListener("error", () => {
      radioStatus.textContent = "⚠️ Stream error";
      if (radioDisplayStatus)
        radioDisplayStatus.textContent = "⚠️ Stream error";
      if (statusDot) statusDot.style.color = "#ff4d4d";
    });

    audio.addEventListener("playing", () => {
      const status = C.radio?.playingStatus || "Now Playing";
      radioStatus.textContent = status;
      if (radioDisplayStatus) radioDisplayStatus.textContent = status;
    });

    function startEqualizer() {
      const bars = document.querySelectorAll(".eq-bars .bar");
      bars.forEach((bar) => {
        bar.style.animationPlayState = "running";
      });
    }

    function stopEqualizer() {
      const bars = document.querySelectorAll(".eq-bars .bar");
      bars.forEach((bar) => {
        bar.style.animationPlayState = "paused";
      });
    }
  }

  // ====== GAMES SECTION ======
  function initGames() {
    initMemoryGame();
    initHeartCollector();
    initMikuGacha();
  }

  function initMemoryGame() {
    const memoryGrid = document.getElementById("memoryGame");
    const resetBtn = document.getElementById("resetMemory");
    if (!memoryGrid || !resetBtn) return;

    // Game state
    let firstCard = null;
    let secondCard = null;
    let boardLocked = false;
    let matchedPairs = 0;
    let moves = 0;
    let totalPairs = 8; // default grid 4x4
    let difficulty = localStorage.getItem("memory.difficulty") || "4x4";

    // Timer state
    let startTime = 0;
    let timerId = null;
    let timerRunning = false;

    // Stats UI (injected once)
    let statsEl = document.getElementById("memoryStats");
    if (!statsEl) {
      statsEl = document.createElement("div");
      statsEl.id = "memoryStats";
      statsEl.className = "memory-stats";
      statsEl.innerHTML = `
        <div class="memory-controls" style="margin-bottom:6px; display:flex; gap:8px; justify-content:center; align-items:center;">
          <label for="memoryDifficulty" style="font-weight:700">Difficulty:</label>
          <select id="memoryDifficulty" class="pixel-btn" style="padding:6px 10px; border-radius:8px; border:2px solid var(--border); background:#fff;">
            <option value="4x4">4×4</option>
            <option value="6x6">6×6</option>
          </select>
        </div>
        Moves: <span id="memoryMoves">0</span> • Pairs: <span id="memoryPairs">0</span>/<span id="memoryTotal">${totalPairs}</span> • Time: <span id="memoryTime">0.0s</span> • Best: <span id="memoryBest">—</span>
      `;
      memoryGrid.parentElement.insertBefore(statsEl, memoryGrid);
    }
    const movesEl = () => document.getElementById("memoryMoves");
    const pairsEl = () => document.getElementById("memoryPairs");
    const totalEl = () => document.getElementById("memoryTotal");
    const timeEl = () => document.getElementById("memoryTime");
    const bestEl = () => document.getElementById("memoryBest");

    // Difficulty control
    const diffSel = document.getElementById("memoryDifficulty");
    if (diffSel) {
      diffSel.value = difficulty;
      diffSel.addEventListener("change", () => {
        difficulty = diffSel.value;
        localStorage.setItem("memory.difficulty", difficulty);
        totalPairs = difficulty === "6x6" ? 18 : 8;
        memoryGrid.style.gridTemplateColumns = `repeat(${
          difficulty === "6x6" ? 6 : 4
        }, 1fr)`;
        renderBest();
        startNewGame();
      });
      // Apply initial grid width
      totalPairs = difficulty === "6x6" ? 18 : 8;
      memoryGrid.style.gridTemplateColumns = `repeat(${
        difficulty === "6x6" ? 6 : 4
      }, 1fr)`;
    }

    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    function buildCard({ id, type, value }, index) {
      const urlSafeId = String(id).replace(/"/g, "&quot;");
      const backInner =
        type === "image"
          ? `<img src="${value}" alt="Miku ${index}" />`
          : `<span class="symbol">${value}</span>`;
      return `
        <div class="memory-card" data-id="${urlSafeId}" data-type="${type}" data-index="${index}">
          <div class="card-face card-front">?</div>
          <div class="card-face card-back">${backInner}</div>
        </div>
      `;
    }

    function setupHandlers() {
      memoryGrid.querySelectorAll(".memory-card").forEach((card) => {
        card.addEventListener("click", () => onCardClick(card));
      });
    }

    function onCardClick(card) {
      if (boardLocked) return;
      if (
        card.classList.contains("flipped") ||
        card.classList.contains("matched")
      )
        return;

      card.classList.add("flipped");
      playFlip();

      // Start timer on first action
      if (!timerRunning) startTimer();

      if (!firstCard) {
        firstCard = card;
        return;
      }

      if (card === firstCard) return; // ignore double-click on same

      secondCard = card;
      boardLocked = true;
      moves++;
      if (movesEl()) movesEl().textContent = String(moves);

      checkForMatch();
    }

    function checkForMatch() {
      const isMatch = firstCard.dataset.id === secondCard.dataset.id;
      if (isMatch) {
        lockMatched();
      } else {
        unflipUnmatched();
      }
    }

    function lockMatched() {
      [firstCard, secondCard].forEach((c) => {
        c.classList.add("matched");
        c.style.pointerEvents = "none";
      });
      matchedPairs++;
      if (pairsEl()) pairsEl().textContent = String(matchedPairs);
      playMatch();
      resetTurn();

      if (matchedPairs === totalPairs) {
        setTimeout(() => {
          stopTimer(true);
          alert("🎉 Congratulations! You found all pairs! 💖");
          addHearts(5);
          playWin();
        }, 300);
      }
    }

    function unflipUnmatched() {
      setTimeout(() => {
        [firstCard, secondCard].forEach((c) => c.classList.remove("flipped"));
        resetTurn();
      }, 700);
    }

    function resetTurn() {
      [firstCard, secondCard] = [null, null];
      boardLocked = false;
    }

    function createDeckFromImages(images) {
      const uniques = images.slice(0, totalPairs);
      const deck = uniques.map((url, i) => ({
        id: url,
        type: "image",
        value: url,
      }));
      return shuffle([...deck, ...deck]);
    }

    function createDeckFromSymbols() {
      const symbols = [
        "🎵",
        "🌸",
        "💖",
        "⭐",
        "🎀",
        "🌟",
        "💙",
        "🎶",
        "🫧",
        "🍓",
        "🍰",
        "🧁",
        "🍬",
        "🍭",
        "🪽",
        "🌈",
        "🧸",
        "🐰",
        "🐱",
        "🦄",
        "🐥",
        "🐟",
        "🍉",
        "🍒",
        "🍑",
        "🍋",
        "🌻",
        "🌼",
        "🌙",
        "☁️",
        "✨",
        "🎮",
        "📀",
        "📸",
        "🎧",
        "💎",
        "🪩",
        "🎹",
        "🎤",
        "🖌️",
        "🧩",
        "🎲",
        "🪄",
        "💌",
      ];
      if (totalPairs > symbols.length) totalPairs = symbols.length;
      const base = symbols
        .slice(0, totalPairs)
        .map((s) => ({ id: s, type: "symbol", value: s }));
      return shuffle([...base, ...base]);
    }

    function renderDeck(deck) {
      matchedPairs = 0;
      moves = 0;
      firstCard = null;
      secondCard = null;
      boardLocked = false;
      if (totalEl()) totalEl().textContent = String(totalPairs);
      if (movesEl()) movesEl().textContent = "0";
      if (pairsEl()) pairsEl().textContent = "0";
      resetTimer();

      memoryGrid.innerHTML = deck.map((c, idx) => buildCard(c, idx)).join("");
      setupHandlers();
    }

    async function startNewGame() {
      const ensureImages = async () => {
        let imgs = (Array.isArray(MIKU_IMAGES) ? MIKU_IMAGES : []).filter(
          Boolean
        );
        if (imgs.length < totalPairs && window.MIKU_IMAGES_READY) {
          try {
            const ready = await window.MIKU_IMAGES_READY;
            if (Array.isArray(ready)) imgs = ready.filter(Boolean);
          } catch (e) {}
        }
        return imgs;
      };

      const imgs = await ensureImages();
      if (imgs && imgs.length >= totalPairs) {
        renderDeck(createDeckFromImages(shuffle(imgs)));
      } else {
        renderDeck(createDeckFromSymbols());
      }
    }

    resetBtn.addEventListener("click", () => {
      startNewGame();
    });

    // First render
    startNewGame();

    // ------- Timer helpers -------
    function resetTimer() {
      stopTimer(false);
      if (timeEl()) timeEl().textContent = "0.0s";
    }
    function startTimer() {
      startTime = performance.now();
      timerRunning = true;
      timerId = setInterval(() => {
        const elapsed = performance.now() - startTime;
        if (timeEl()) timeEl().textContent = formatTime(elapsed);
      }, 100);
    }
    function stopTimer(finalize) {
      if (timerId) clearInterval(timerId);
      timerId = null;
      if (timerRunning && finalize) {
        const elapsed = performance.now() - startTime;
        if (timeEl()) timeEl().textContent = formatTime(elapsed);
        updateBest(elapsed);
      }
      timerRunning = false;
    }
    function formatTime(ms) {
      const s = ms / 1000;
      return `${s.toFixed(1)}s`;
    }
    function bestKey() {
      return difficulty === "6x6" ? "memory.best.6x6" : "memory.best.4x4";
    }
    function updateBest(ms) {
      const key = bestKey();
      const prev = parseFloat(localStorage.getItem(key) || "");
      if (!isFinite(prev) || ms < prev) {
        localStorage.setItem(key, String(ms));
      }
      renderBest();
    }
    function renderBest() {
      const key = bestKey();
      const prev = parseFloat(localStorage.getItem(key) || "");
      if (bestEl())
        bestEl().textContent = isFinite(prev) ? formatTime(prev) : "—";
    }
    renderBest();

    // ------- Sound helpers -------
    let audioCtx = null;
    function getCtx() {
      if (!audioCtx) {
        try {
          audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {}
      }
      return audioCtx;
    }
    function beep(freq = 800, duration = 0.06, type = "triangle", gain = 0.05) {
      const ctx = getCtx();
      if (!ctx) return;
      const t0 = ctx.currentTime;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type;
      o.frequency.setValueAtTime(freq, t0);
      g.gain.setValueAtTime(gain, t0);
      o.connect(g).connect(ctx.destination);
      o.start();
      o.stop(t0 + duration);
    }
    function playFlip() {
      beep(900, 0.05, "triangle", 0.035);
    }
    function playMatch() {
      beep(600, 0.07, "sine", 0.05);
      setTimeout(() => beep(900, 0.07, "sine", 0.05), 60);
    }
    function playWin() {
      const notes = [660, 880, 990, 1320];
      notes.forEach((f, i) =>
        setTimeout(() => beep(f, 0.07, "sine", 0.06), i * 90)
      );
    }
  }

  function initHeartCollector() {
  const heartZone = document.getElementById("heartZone");
  const gameHeartCountEl = document.getElementById("gameHeartCount");
  // reset button may be removed from the UI; handle gracefully
  const resetHeartsBtn = document.getElementById("resetHearts");
  if (!heartZone || !gameHeartCountEl) return;

  gameHeartCountEl.textContent = gameHeartCount;

  heartZone.addEventListener("click", (e) => {
      gameHeartCount++;
      gameHeartCountEl.textContent = gameHeartCount;
      localStorage.setItem("pixelbelle-game-hearts", gameHeartCount);

      // Create floating heart animation
      createFloatingHeart(e.clientX, e.clientY);

      // Add to main heart counter occasionally
      if (gameHeartCount % 10 === 0) {
        addHearts(1);
      }
    });

  // Attach reset only if the button still exists (kept for dev/testing)
  if (resetHeartsBtn) {
    resetHeartsBtn.addEventListener("click", () => {
      gameHeartCount = 0;
      gameHeartCountEl.textContent = gameHeartCount;
      localStorage.setItem("pixelbelle-game-hearts", gameHeartCount);
    });
  }
  }

  function initRandomMiku() {
    const randomMikuImg = document.getElementById("randomMikuImg");
    const changeMikuBtn = document.getElementById("changeMiku");

    changeMikuBtn.addEventListener("click", () => {
      const randomImage =
        MIKU_IMAGES[Math.floor(Math.random() * MIKU_IMAGES.length)];
      randomMikuImg.src = randomImage;

      // Add bounce effect
      randomMikuImg.style.animation = "bounce 0.6s ease-out";
      setTimeout(() => {
        randomMikuImg.style.animation = "";
      }, 600);
    });
  }

  // ====== SHRINE SECTION ======
  function initShrine() {
    const mikuGallery = document.getElementById("mikuGallery");
    if (!mikuGallery) return;

    function renderGallery() {
      mikuGallery.innerHTML = MIKU_IMAGES.map(
        (img, index) => `
        <img src="${img}" alt="Miku ${
          index + 1
        }" class="gallery-image" onclick="openImageModal('${img}')">
      `
      ).join("");
    }

    if (MIKU_IMAGES.length) renderGallery();
    else
      document.addEventListener("miku-images-ready", renderGallery, {
        once: true,
      });
  }

  function openImageModal(imageSrc) {
    const modal = document.createElement("div");
    modal.className = "image-modal";
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.8); display: flex; align-items: center;
      justify-content: center; z-index: 10000; cursor: pointer;
    `;

    const img = document.createElement("img");
    img.src = imageSrc;
    img.style.cssText = `
      max-width: 90%; max-height: 90%; border-radius: 10px;
      box-shadow: 0 0 30px rgba(255,255,255,0.3);
    `;

    modal.appendChild(img);
    document.body.appendChild(modal);

    modal.addEventListener("click", () => {
      document.body.removeChild(modal);
    });
  }

  // ====== FRIENDS SECTION ======
  function initFriends() {
    const friendsList = document.getElementById("friendsList");

    friendsList.innerHTML = FRIENDS.map(
      (friend) => {
        const icon = friend.mikuIcon ? mikuIcon(friend.mikuIcon, friend.emoji) : friend.emoji;
        return `
          <a href="${friend.url}" class="friend-button" target="_blank">
            ${icon} ${friend.name}
          </a>
        `;
      }
    ).join("");
  }

  // ====== CURSOR EFFECTS ======
  function initCursorEffects() {
    const cursorTrail = document.getElementById("cursorTrail");
    let lastTrailTime = 0;

    document.addEventListener("mousemove", (e) => {
      const now = Date.now();
      if (now - lastTrailTime > 100) {
        // Throttle trail creation
        createCursorTrail(e.clientX, e.clientY);
        lastTrailTime = now;
      }
    });

    function createCursorTrail(x, y) {
      const heart = document.createElement("div");
      heart.className = "heart-trail";
      heart.textContent = "💖";
      heart.style.left = x + "px";
      heart.style.top = y + "px";

      cursorTrail.appendChild(heart);

      setTimeout(() => {
        if (heart.parentNode) {
          heart.parentNode.removeChild(heart);
        }
      }, 2000);
    }
  }

  // ====== CARD PAGINATION SYSTEM ======
  function initCardPagination() {
    const paginatedCards = document.querySelectorAll('.paginated-card');
    
    paginatedCards.forEach(card => {
      const cardType = card.dataset.card;
      const pages = card.querySelectorAll('.card-page');
      const prevBtn = card.querySelector('.prev-btn');
      const nextBtn = card.querySelector('.next-btn');
      const indicator = card.querySelector('.page-indicator');
      
      if (pages.length <= 1) return; // No pagination needed
      
      let currentPage = 0;
      
      function updateCard() {
        pages.forEach((page, index) => {
          page.classList.toggle('active', index === currentPage);
        });
        
        if (indicator) {
          indicator.textContent = `${currentPage + 1}/${pages.length}`;
        }
        
        // Add sparkle effect when changing pages
        createSparkleEffect(card);
      }
      
      function nextPage() {
        currentPage = (currentPage + 1) % pages.length;
        updateCard();
        
        // Play a cute sound
        try {
          const ctx = new (window.AudioContext || window.webkitAudioContext)();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.frequency.setValueAtTime(800, ctx.currentTime);
          gain.gain.setValueAtTime(0.1, ctx.currentTime);
          osc.connect(gain).connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.1);
        } catch (e) {
          // Silent fail for audio
        }
      }
      
      function prevPage() {
        currentPage = (currentPage - 1 + pages.length) % pages.length;
        updateCard();
        
        // Play a cute sound
        try {
          const ctx = new (window.AudioContext || window.webkitAudioContext)();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.frequency.setValueAtTime(600, ctx.currentTime);
          gain.gain.setValueAtTime(0.1, ctx.currentTime);
          osc.connect(gain).connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.1);
        } catch (e) {
          // Silent fail for audio
        }
      }
      
      if (nextBtn) nextBtn.addEventListener('click', nextPage);
      if (prevBtn) prevBtn.addEventListener('click', prevPage);
      
      // Auto-advance every 10 seconds for about cards
      if (cardType === 'about') {
        setInterval(() => {
          nextPage();
        }, 10000);
      }
    });
  }

  // ====== UTILITY FUNCTIONS ======
  function addHearts(amount) {
    heartCount += amount;
    localStorage.setItem("pixelbelle-hearts", heartCount);
    updateCounters();
    try {
      if (typeof window.__updateHudHearts === "function")
        window.__updateHudHearts();
    } catch (_) {}

    // Milestone banner: show a special toast when we've hit a NEW milestone step
    if (Array.isArray(LOVE_MILESTONES) && LOVE_MILESTONES.length > 0) {
      // Find the highest milestone we've reached
      const reachedMilestones = LOVE_MILESTONES.filter(
        (m) => heartCount >= m.step
      );
      if (reachedMilestones.length > 0) {
        const highestMilestone = reachedMilestones.reduce((max, m) =>
          m.step > max.step ? m : max
        );

        // Only show if this is a new milestone
        if (highestMilestone.step > lastMilestone) {
          lastMilestone = highestMilestone.step;
          localStorage.setItem("pixelbelle-last-milestone", lastMilestone);

          // Create milestone message with Miku icon
          const milestoneIcon = highestMilestone.icon
            ? mikuIcon(highestMilestone.icon, "✨")
            : "✨";
          const milestoneMsg = `${milestoneIcon} ${highestMilestone.msg}`;
          loveToast(milestoneMsg);

          console.info(
            `New milestone reached: ${highestMilestone.step} -> ${highestMilestone.msg}`
          );

          // Make shimejis say love toasts too
          shimejiBroadcastLove();
        }
      }
    }

    // Core celebration
    const counterEl = document.getElementById("heartCount");
    createSparkleEffect(counterEl);

    burstHeartsAndStars(Math.min(8, 2 + amount * 2));
    shimejiCelebrate(amount);
  }

  // Show a small floating toast message
  function loveToast(text) {
    const randomIndex = Math.floor(Math.random() * LOVE_TOASTS.length);
    const toastText = LOVE_TOASTS[randomIndex];
    const toastIcons = C.love?.toastIcons || [];
    const iconName = toastIcons[randomIndex];
    const icon = iconName ? mikuIcon(iconName, "💖") : "💖";

    const msg = `${text} ${toastText} ${icon}`;
    const toast = document.createElement("div");
    toast.innerHTML = msg;
    toast.style.cssText = `
      position: fixed; left: 50%; top: 14%; transform: translateX(-50%);
      background: rgba(255,255,255,0.9); border: 2px solid var(--border);
      border-radius: 12px; padding: 8px 14px; font-weight: 800; color: var(--ink);
      box-shadow: var(--shadow); z-index: 9999; animation: fadeToast 1.8s ease-out forwards;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  // Burst hearts and stars from random spots
  function burstHeartsAndStars(n = 8) {
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
    for (let i = 0; i < n; i++) {
      const x = Math.random() * vw * 0.9 + vw * 0.05;
      const y = Math.random() * vh * 0.6 + vh * 0.2;
      const which =
        Math.random() < 0.6 ? "💖" : Math.random() < 0.5 ? "✨" : "⭐";
      const el = document.createElement("div");
      el.textContent = which;
      el.style.cssText = `
        position: fixed; left: ${x}px; top: ${y}px; font-size: ${
        which === "💖" ? "22px" : "18px"
      };
        pointer-events: none; z-index: 9998; animation: heartFloat 2.2s ease-out forwards;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2300);
    }
  }

  // Nudge shimejis to celebrate and sometimes spawn variants
  function shimejiCelebrate(amount) {
    const s = window.shimejiFunctions;
    if (!s) return;
    if (heartCount % 5 === 0) s.triggerMassJump();
    else s.triggerMassHappy();
    if (heartCount % 25 === 0 && s.triggerMassDance) s.triggerMassDance();
  }

  // Make shimejis say love messages
  function shimejiBroadcastLove() {
    const s = window.shimejiFunctions;
    if (!s || !s.makeAllSpeak) return;

    try {
      const loveMessage =
        LOVE_TOASTS[Math.floor(Math.random() * LOVE_TOASTS.length)];
      s.makeAllSpeak(loveMessage, 3000); // Show for 3 seconds
    } catch (e) {
      console.warn("Failed to make shimejis speak:", e);
    }
  }

  function createFloatingHeart(x, y) {
    const heart = document.createElement("div");
    heart.textContent = "💖";
    heart.style.cssText = `
      position: fixed; left: ${x}px; top: ${y}px; font-size: 1.5rem;
      pointer-events: none; z-index: 9999; animation: heartFloat 2s ease-out forwards;
    `;

    document.body.appendChild(heart);

    setTimeout(() => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart);
      }
    }, 2000);
  }

  function createSparkleEffect(element) {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const sparkle = document.createElement("div");
        sparkle.textContent = "✨";
        sparkle.style.cssText = `
          position: absolute; font-size: 1rem; pointer-events: none;
          left: ${Math.random() * 50 - 25}px; top: ${Math.random() * 50 - 25}px;
          animation: sparkle 1s ease-out forwards;
        `;

        element.style.position = "relative";
        element.appendChild(sparkle);

        setTimeout(() => {
          if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
          }
        }, 1000);
      }, i * 100);
    }
  }

  function updateCounters() {
    const heartCountEl = document.getElementById("heartCount");
    if (heartCountEl) {
      heartCountEl.textContent = heartCount;
    }
  }

  function loadSavedData() {
    // Load saved mood
    const savedMood = localStorage.getItem("pixelbelle-mood");
    if (savedMood) {
      const moodDisplayEl = document.getElementById("moodDisplay");
      if (moodDisplayEl) moodDisplayEl.textContent = `💭 ${savedMood}`;
    }

    // Load saved now playing
    const savedNowPlaying = localStorage.getItem("pixelbelle-now-playing");
    if (savedNowPlaying) {
      const nowPlayingEl = document.getElementById("nowPlaying");
      if (nowPlayingEl) nowPlayingEl.textContent = savedNowPlaying;
    }
  }

  // ====== PERIODIC UPDATES ======
  function initPeriodicUpdates() {
    // Heart button functionality
    const heartBtn = document.getElementById("heartBtn");
    if (heartBtn) {
      heartBtn.addEventListener("click", () => {
        addHearts(1);
        createFloatingHeart(
          heartBtn.getBoundingClientRect().left + heartBtn.offsetWidth / 2,
          heartBtn.getBoundingClientRect().top
        );
        // Also sparkle at the button
        createSparkleEffect(heartBtn);
      });
    }

    // Random updates every 30 seconds
    setInterval(() => {
      const updates = (C.love && C.love.periodicUpdates) || [];

      const randomUpdate = updates[Math.floor(Math.random() * updates.length)];

      // Update the updates list occasionally
      if (Math.random() < 0.3) {
        const updatesList = document.getElementById("updates");
        if (updatesList) {
          const li = document.createElement("li");
          li.textContent = randomUpdate;
          updatesList.insertBefore(li, updatesList.firstChild);

          // Keep only last 3 updates
          while (updatesList.children.length > 3) {
            updatesList.removeChild(updatesList.lastChild);
          }
        }
      }
    }, 30000);

    // Vibe meter animation
    setInterval(() => {
      const vibeFill = document.querySelector(".vibe-fill");
      if (vibeFill) {
        const randomVibe = Math.floor(Math.random() * 20) + 80; // 80-100%
        vibeFill.style.width = randomVibe + "%";
        vibeFill.parentNode.nextElementSibling.textContent = `${randomVibe}% Kawaii Energy! ✨`;
      }
    }, 5000);
  }

  // Add sparkle animation keyframes
  const sparkleStyles = document.createElement("style");
  sparkleStyles.textContent = `
    @keyframes sparkle {
      0% { opacity: 1; transform: scale(0) rotate(0deg); }
      50% { opacity: 1; transform: scale(1) rotate(180deg); }
      100% { opacity: 0; transform: scale(0) rotate(360deg); }
    }
    @keyframes heartPop {
      0% { opacity: 0; transform: translateY(0) scale(0.8); }
      20% { opacity: 1; }
      100% { opacity: 0; transform: translateY(-60px) scale(1.2); }
    }
  `;
  document.head.appendChild(sparkleStyles);

  // Initialize splash screen
  initSplash();

  // Expose love toasts globally for shimejis
  window.LOVE_TOASTS = LOVE_TOASTS;

  // Global functions for console interaction
  // ====== FLOATING HEARTS SYSTEM ======
  function initFloatingHearts() {
    const hearts = ["💖", "💙", "💚", "💛", "💜", "🤍", "🖤"];
    const container = document.querySelector(".floating-hearts");

    if (!container) return;

    // Clear existing hearts
    container.innerHTML = "";

    // Inject styles for heart particles and swallow
    const style = document.createElement("style");
    style.textContent = `
      .heart-particle { position: fixed; bottom: -24px; font-size: 22px; pointer-events:none; z-index: 2; animation: heartRise 8s linear forwards; }
      @keyframes heartRise {
        0%   { transform: translateX(0) translateY(0); opacity: .8; }
        50%  { transform: translateX(var(--drift, 0)) translateY(-50vh); opacity: .9; }
        100% { transform: translateX(calc(var(--drift, 0) * 2)) translateY(-110vh); opacity: 0; }
      }
      .heart-eaten { animation: heartEaten .4s ease-out forwards !important; }
      @keyframes heartEaten { from { transform: scale(1); opacity:1 } to { transform: scale(0); opacity:0 } }
      .swallow { position: fixed; bottom: 8vh; left: -120px; width: 80px; height:auto; image-rendering: pixelated; z-index: 3; pointer-events:none; }
    `;
    document.head.appendChild(style);

    function createHeart() {
      const heart = document.createElement("div");
      heart.className = "heart-particle";
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

      // Random starting position
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.setProperty("--drift", (Math.random() - 0.5) * 200 + "px");

      container.appendChild(heart);

      // Remove after animation
      setTimeout(() => {
        if (heart.parentNode) {
          heart.parentNode.removeChild(heart);
        }
      }, 8000);
    }

    // Create hearts periodically
    setInterval(createHeart, 2000);

    // Create initial hearts
    for (let i = 0; i < 5; i++) {
      setTimeout(createHeart, i * 400);
    }

    // Initialize heart collector sync and swallow
    syncHeartCollector();
    initSwallow();
  }

  // ====== BELLE'S ENHANCED PRESENTATION SYSTEM ======
  function initBellePresentation() {
    let currentSlide = 0;
    let isAutoPlaying = false;
    let autoPlayInterval = null;
    
    const slides = document.querySelectorAll('.presentation-slide');
    const totalSlides = slides.length;
    
    if (totalSlides === 0) return;
    
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const currentSlideIndicator = document.querySelector('.current-slide');
    const progressFill = document.querySelector('.progress-fill');
    const floatingDecorations = document.querySelector('.floating-decorations');
    
    // Kawaii sounds for interactions
    const playKawaiiSound = (type = 'click') => {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        switch(type) {
          case 'next':
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
            break;
          case 'prev':
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime); // E5
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime + 0.1); // C5
            break;
          case 'auto':
            oscillator.frequency.setValueAtTime(698.46, audioContext.currentTime); // F5
            break;
          default:
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        }
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.2);
      } catch (e) {
        // Fallback: no sound
      }
    };
    
    // Create floating sparkles and icons
    const createFloatingElements = () => {
      if (!floatingDecorations) return;
      
      const decorativeIcons = ['sparkle', 'love', 'innocent', 'cheering', 'starUwu'];
      
      for (let i = 0; i < 8; i++) {
        const element = document.createElement('div');
        element.className = 'floating-decoration';
        
        const iconName = decorativeIcons[Math.floor(Math.random() * decorativeIcons.length)];
        element.innerHTML = mikuIcon(iconName, '✨');
        
        element.style.left = `${Math.random() * 100}%`;
        element.style.animationDelay = `${Math.random() * 5}s`;
        element.style.animationDuration = `${3 + Math.random() * 4}s`;
        
        floatingDecorations.appendChild(element);
      }
    };
    
    // Update slide display
    const updateSlide = (newSlide, playSound = true) => {
      if (newSlide < 0 || newSlide >= totalSlides) return;
      
      // Hide current slide
      slides[currentSlide].classList.remove('active');
      
      // Show new slide
      currentSlide = newSlide;
      slides[currentSlide].classList.add('active');
      
      // Update indicators
      if (currentSlideIndicator) {
        currentSlideIndicator.textContent = currentSlide + 1;
      }
      
      // Update progress bar
      if (progressFill) {
        const progress = ((currentSlide + 1) / totalSlides) * 100;
        progressFill.style.width = `${progress}%`;
      }
      
      // Add sparkle effect to current slide
      const currentSlideEl = slides[currentSlide];
      currentSlideEl.classList.add('slide-sparkle');
      setTimeout(() => {
        currentSlideEl.classList.remove('slide-sparkle');
      }, 1000);
      
      // Play kawaii sound
      if (playSound) {
        playKawaiiSound('next');
      }
      
      // Update button states
      if (prevBtn) prevBtn.disabled = (currentSlide === 0);
      if (nextBtn) nextBtn.disabled = (currentSlide === totalSlides - 1);
    };
    
    // Navigation event handlers
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
          // Stop auto on manual navigation
          if (isAutoPlaying) { stopAutoPlay(); isAutoPlaying = false; }
          updateSlide(currentSlide - 1);
          playKawaiiSound('prev');
        }
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
          // Stop auto on manual navigation
          if (isAutoPlaying) { stopAutoPlay(); isAutoPlaying = false; }
          updateSlide(currentSlide + 1);
          playKawaiiSound('next');
        }
      });
    }
    
    // Auto-play functionality
    const startAutoPlay = () => {
      if (autoPlayInterval) clearInterval(autoPlayInterval);
      
      autoPlayInterval = setInterval(() => {
        if (currentSlide < totalSlides - 1) {
          updateSlide(currentSlide + 1, false);
        } else {
          // Loop back to beginning
          updateSlide(0, false);
        }
      }, 4000); // 4 seconds per slide
    };
    
    const stopAutoPlay = () => {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
      }
    };
    
  // Removed auto/shuffle/restart UI per design; auto starts on load and stops on manual nav
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (document.querySelector('.belle-presentation:hover') || 
          document.activeElement.closest('.belle-presentation')) {
        switch(e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            if (currentSlide > 0) {
              updateSlide(currentSlide - 1);
              playKawaiiSound('prev');
            }
            break;
          case 'ArrowRight':
            e.preventDefault();
            if (currentSlide < totalSlides - 1) {
              updateSlide(currentSlide + 1);
              playKawaiiSound('next');
            }
            break;
          // Space no-op (auto UI removed)
          case 'Home':
            e.preventDefault();
            updateSlide(0);
            break;
          case 'End':
            e.preventDefault();
            updateSlide(totalSlides - 1);
            break;
        }
      }
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    const presentationEl = document.querySelector('.belle-presentation');
    if (presentationEl) {
      presentationEl.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      });
      
      presentationEl.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
          if (diff > 0 && currentSlide < totalSlides - 1) {
            // Swiped left - next slide
            updateSlide(currentSlide + 1);
          } else if (diff < 0 && currentSlide > 0) {
            // Swiped right - previous slide
            updateSlide(currentSlide - 1);
          }
        }
      });
    }
    
    // Initialize
    createFloatingElements();
    updateSlide(0, false);
    
    // Auto-start presentation after 1.5 seconds
    setTimeout(() => {
      if (!isAutoPlaying) {
        isAutoPlaying = true;
        startAutoPlay();
        playKawaiiSound('auto');
      }
    }, 1500);
  }

  // ====== SYNC HEART COLLECTOR WITH FLOATING HEARTS ======
  function syncHeartCollector() {
    const heartZone = document.getElementById("heartZone");

    if (!heartZone) return;

    // Add event listener for floating heart interaction
    heartZone.addEventListener("click", (e) => {
      // Find nearby floating hearts and "eat" them
      const floatingHearts = document.querySelectorAll(".heart-particle");
      const clickX = e.clientX;
      const clickY = e.clientY;

      let heartsEaten = 0;

      floatingHearts.forEach((heart) => {
        const rect = heart.getBoundingClientRect();
        const heartX = rect.left + rect.width / 2;
        const heartY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
          Math.pow(clickX - heartX, 2) + Math.pow(clickY - heartY, 2)
        );

        if (distance < 100) {
          // Within 100px
          heart.classList.add("heart-eaten");
          heartsEaten++;
        }
      });

      // Add bonus hearts for eating floating hearts
      if (heartsEaten > 0) {
        addHearts(heartsEaten);
      }
    });
  }

  // Swallow mascot that "eats" hearts as they float by
  function initSwallow() {
    const swallowSrc = (C.images && C.images.swallowGif) || null;
    if (!swallowSrc) return; // no asset configured

    const img = document.createElement("img");
    img.className = "swallow";

    // preload to avoid broken image flashes
    const preload = new Image();
    preload.onload = () => {
      img.src = swallowSrc;
      document.body.appendChild(img);
      start();
    };
    preload.onerror = () => {
      /* skip if missing */
    };
    preload.src = swallowSrc;

    function start() {
      let x = -120;
      let y =
        window.innerHeight * 0.12 + Math.random() * window.innerHeight * 0.4;
      let vx = 1.2; // px per frame (approx)

      function step() {
        x += vx;
        if (x > window.innerWidth + 120) {
          // reset and randomize altitude
          x = -120;
          y = window.innerHeight * (0.12 + Math.random() * 0.5);
        }
        img.style.transform = `translate(${x}px, ${y}px)`;

        // Eat nearby hearts
        const hearts = document.querySelectorAll(".heart-particle");
        hearts.forEach((h) => {
          const r1 = img.getBoundingClientRect();
          const r2 = h.getBoundingClientRect();
          const overlap = !(
            r2.right < r1.left + 10 ||
            r2.left > r1.right - 10 ||
            r2.bottom < r1.top + 10 ||
            r2.top > r1.bottom - 10
          );
          if (overlap) {
            h.classList.add("heart-eaten");
            setTimeout(() => h.remove(), 350);
          }
        });

        requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
  }

  window.pixelBelleGarden = {
    addHearts: addHearts,
    showSection: (section) => {
      const link = document.querySelector(`[data-section="${section}"]`);
      if (link) link.click();
    },
    getStats: () => ({
      hearts: heartCount,
      gameHearts: gameHeartCount,
      visitors: visitorCount,
      currentSection: currentSection,
    }),
    spawnShimeji: () => {
      if (window.shimejiFunctions) {
        return window.shimejiFunctions.spawnMiku();
      }
    },
    clearShimeji: () => {
      if (window.shimejiFunctions) {
        window.shimejiFunctions.removeAll();
      }
    },
  };

  console.log("🌸 Welcome to PixelBelle's Garden! 🌸");
  console.log(
    "Try: pixelBelleGarden.addHearts(10) or pixelBelleGarden.spawnShimeji()"
  );
});
