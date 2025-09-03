/* Main JavaScript for PixelBelle's Garden */
document.addEventListener("DOMContentLoaded", () => {
  // ====== DATA CONFIGURATION ======
  const SOCIALS = [
    {
      label: "YouTube Channel",
      url: "https://www.youtube.com/@babyelle-e",
      icon: "📺",
      color: "#ff0000",
    },
    {
      label: "Spotify Profile",
      url: "https://open.spotify.com/user/31hkk7assbfbsaqjfybnyfmuakqq",
      icon: "🎵",
      color: "#1db954",
    },
    {
      label: "Merch Store",
      url: "https://shinun-merch.creator-spring.com/",
      icon: "🛍️",
      color: "#ff6b35",
    },
    {
      label: "Linktree Hub",
      url: "https://linktr.ee/babbybean",
      icon: "🌲",
      color: "#39e09b",
    },
    { label: "Discord Server", url: "https://discord.gg/jB7mbHwK", icon: "💬", color: "#5865f2" },
    {
      label: "Instagram",
      url: "https://www.instagram.com/b4by.p13n/",
      icon: "📷",
      color: "#e4405f",
    },
  ];

  const FRIENDS = [
    { name: "Cinnamoroll Club", url: "#", emoji: "🐶" },
    { name: "Cozy Gaming Pals", url: "#", emoji: "🎮" },
    { name: "Kawaii Creators", url: "#", emoji: "🌸" },
    { name: "Vocaloid Fans", url: "#", emoji: "🎤" },
    { name: "Study Buddies", url: "#", emoji: "📚" },
    { name: "Art Friends", url: "#", emoji: "🎨" },
  ];

  const PLAYLIST_SONGS = [
    { title: "World is Mine", artist: "Hatsune Miku (ryo)", mood: "✨" },
    { title: "Senbonzakura", artist: "Hatsune Miku (Kurousa-P)", mood: "🌸" },
    { title: "Tell Your World", artist: "Hatsune Miku (kz)", mood: "🌍" },
    { title: "Love is War", artist: "Hatsune Miku (ryo)", mood: "💖" },
    { title: "Rolling Girl", artist: "Hatsune Miku (wowaka)", mood: "🌀" },
    { title: "Magical Mirai", artist: "Hatsune Miku", mood: "✨" },
  ];

  // Love feedback messages (JP + cute vibes)
  const LOVE_TOASTS = [
    "ありがとう！💖",
    "大好き〜！(だいすき) 💙",
    "うれしい！✨",
    "かわいいね〜 🎀",
    "キラキラ！🌟",
    "心がぽかぽか〜 💗",
    "ラブ注入！💘",
    "ぎゅっ！(Hug) 🤗",
    "最高！🫶",
    "えらい！👏",
    "今日もがんばったね！💪",
    "幸せいっぱい〜 🍓",
    "にこにこ☺️",
    "とても素敵！💎",
  ];
  const LOVE_MILESTONES = [
    { step: 5, msg: "５ハート達成！すごい〜！🌸" },
    { step: 10, msg: "１０ハート！ありがと〜！🎉" },
    { step: 20, msg: "２０ハート！最強の推し！⭐" },
    { step: 30, msg: "３０ハート！心から感謝！💖" },
    { step: 50, msg: "５０ハート！愛が溢れてる〜！✨" },
  ];
  const MIKU_IMAGES = [];

  (async function loadImages() {
    let i = 1;
    while (true) {
      const path = `./assets/pixel-miku/Hatsune Miku @illufinch ${i
        .toString()
        .padStart(2, "0")}.png`;
      const img = new Image();
      img.src = path;
      try {
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        MIKU_IMAGES.push(path);
        i++;
      } catch (e) {
        break;
      }
    }
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
    initNavigation();
    initStatusBar();
    initSocials();
    initMusic();
    initGames();
    initShrine();
    initFriends();
    initCursorEffects();
    initPeriodicUpdates();
    updateCounters();
    loadSavedData();

    console.log("PixelBelle's Garden initialized! 🌸");
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
      targetSection.style.animation = "fadeInUp 0.5s ease-out";
    }
    const container = document.getElementById("floatingMikusContainer");
    const available = MIKU_IMAGES.length;
    const spawnAmount = 15;

    const numMikus = Math.min(
      Math.floor(Math.random() * spawnAmount + 1),
      available
    );
    console.log(`Spawning ${numMikus} Miku(s)`);

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
    nowPlaying.addEventListener("input", () => {
      localStorage.setItem("pixelbelle-now-playing", nowPlaying.textContent);
    });

    // Mood system
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

    moodInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        saveMoodBtn.click();
      }
    });
  }

  // ====== SOCIALS SECTION ======
  function initSocials() {
    const socialsGrid = document.getElementById("socialsGrid");

    socialsGrid.innerHTML = SOCIALS.map(
      (social) => `
      <div class="social-card embedded-player" style="border-left: 4px solid ${social.color}">
        <div class="social-icon">${social.icon}</div>
        <h4>${social.label}</h4>
        <div class="player-controls">
          <div class="play-button" style="background-color: ${social.color}">▶</div>
          <div class="player-info">
            <div class="track-title">Click to visit</div>
            <div class="artist-name">${social.label}</div>
          </div>
        </div>
        <a href="${social.url}" target="_blank" class="pixel-btn player-btn" style="background-color: ${social.color}">Open</a>
      </div>
    `
    ).join("");
  }

  // ====== MUSIC SECTION ======
  function initMusic() {
    const playBtn = document.getElementById("playRadio");
    const pauseBtn = document.getElementById("pauseRadio");
    const nextBtn = document.getElementById("nextSong");
    const radioStatus = document.getElementById("radioStatus");
    const playlist = document.getElementById("playlist");

    let currentSongIndex = 0;
    let isPlaying = false;

    // Populate playlist
    playlist.innerHTML = PLAYLIST_SONGS.map(
      (song, index) => `
      <div class="playlist-item ${
        index === 0 ? "current" : ""
      }" data-index="${index}">
        <span class="song-mood">${song.mood}</span>
        <div class="song-info">
          <div class="song-title">${song.title}</div>
          <div class="song-artist">${song.artist}</div>
        </div>
      </div>
    `
    ).join("");

    // Radio controls
    playBtn.addEventListener("click", () => {
      isPlaying = true;
      radioStatus.textContent = `🎵 ${PLAYLIST_SONGS[currentSongIndex].title}`;
      startEqualizer();
      updatePlaylistDisplay();
    });

    pauseBtn.addEventListener("click", () => {
      isPlaying = false;
      radioStatus.textContent = "Kawaii FM 📻 (Paused)";
      stopEqualizer();
    });

    nextBtn.addEventListener("click", () => {
      currentSongIndex = (currentSongIndex + 1) % PLAYLIST_SONGS.length;
      if (isPlaying) {
        radioStatus.textContent = `🎵 ${PLAYLIST_SONGS[currentSongIndex].title}`;
      }
      updatePlaylistDisplay();
    });

    function updatePlaylistDisplay() {
      const items = playlist.querySelectorAll(".playlist-item");
      items.forEach((item, index) => {
        item.classList.toggle("current", index === currentSongIndex);
      });
    }

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
    const resetHeartsBtn = document.getElementById("resetHearts");

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

    resetHeartsBtn.addEventListener("click", () => {
      gameHeartCount = 0;
      gameHeartCountEl.textContent = gameHeartCount;
      localStorage.setItem("pixelbelle-game-hearts", gameHeartCount);
    });
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

    mikuGallery.innerHTML = MIKU_IMAGES.map(
      (img, index) => `
      <img src="${img}" alt="Miku ${
        index + 1
      }" class="gallery-image" onclick="openImageModal('${img}')">
    `
    ).join("");
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
      (friend) => `
      <a href="${friend.url}" class="friend-button" target="_blank">
        ${friend.emoji} ${friend.name}
      </a>
    `
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

  // ====== UTILITY FUNCTIONS ======
  function addHearts(amount) {
    heartCount += amount;
    localStorage.setItem("pixelbelle-hearts", heartCount);
    updateCounters();

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
          loveToast(highestMilestone.msg);
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
    const msg = `${text} ${
      LOVE_TOASTS[Math.floor(Math.random() * LOVE_TOASTS.length)]
    }`;
    const toast = document.createElement("div");
    toast.textContent = msg;
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
    try {
      if (heartCount % 5 === 0) s.triggerMassJump();
      else s.triggerMassHappy();

      if (heartCount % 10 === 0) {
        // Randomly pick variant to spawn
        const r = Math.random();
        if (r < 0.25 && s.spawnMikuAlt) s.spawnMikuAlt();
        else if (r < 0.5 && s.spawnMikuSketch) s.spawnMikuSketch();
        else if (r < 0.75 && s.spawnMikuChibi) s.spawnClassic();
        else s.spawnMiku && s.spawnMiku();
      }
      if (heartCount % 25 === 0 && s.triggerMassDance) s.triggerMassDance();
    } catch (e) {
      // ignore
    }
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
      document.getElementById("moodDisplay").textContent = `💭 ${savedMood}`;
    }

    // Load saved now playing
    const savedNowPlaying = localStorage.getItem("pixelbelle-now-playing");
    if (savedNowPlaying) {
      document.getElementById("nowPlaying").textContent = savedNowPlaying;
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
      });
    }

    // Random updates every 30 seconds
    setInterval(() => {
      const updates = [
        "New kawaii energy detected! ✨",
        "Miku companions are vibing! 🎵",
        "Hearts are flowing! 💖",
        "Pastel dreams activated! 🌸",
        "Cozy mode: ON! 🥰",
      ];

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
  `;
  document.head.appendChild(sparkleStyles);

  // Initialize splash screen
  initSplash();

  // Expose love toasts globally for shimejis
  window.LOVE_TOASTS = LOVE_TOASTS;

  // Global functions for console interaction
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
