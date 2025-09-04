/* Main JavaScript for PixelBelle's Garden */
document.addEventListener("DOMContentLoaded", () => {
  const C = window.SITE_CONTENT || {};
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
    document.dispatchEvent(new CustomEvent("miku-images-ready", { detail: { images: MIKU_IMAGES.slice() } }));
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
  if (splashImg) splashImg.src = (C.images?.splashMiku) || "./assets/miku_hatsune_5_by_makiilu_d4uklnz-fullview.png";
      const heroMiku = document.getElementById("heroMiku");
      if (heroMiku) heroMiku.src = (C.images?.heroMiku) || "./assets/hatsune_miku_render_by_jimmyisaac_d68ibgy-pre.png";
      const shrineMiku = document.getElementById("shrineMiku");
      if (shrineMiku) shrineMiku.src = (C.images?.shrineMiku) || "./assets/miku_hatsune_5_by_makiilu_d4uklnz-fullview.png";

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
        if (wrap)
          wrap.innerHTML = C.images.webBadges
            .map((u) => `<img src="${u}" class="badge" alt="badge"/>`)
            .join("");
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
          if (a && n) a.innerHTML = `${n.emoji || ""} ${n.label}`;
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
      if (onlineStatus && C.status?.onlineLabel)
        onlineStatus.textContent = C.status.onlineLabel;
      const heartCountLbl = document.querySelector(".status-item:nth-child(3)");
      if (heartCountLbl && C.status?.heartsLabel) {
        const span = heartCountLbl.querySelector("span");
        if (span)
          span.previousSibling &&
            (span.previousSibling.textContent = ` ${C.status.heartsLabel} `);
      }

      // Home hero + cards
      if (C.home) {
        const h2 = document.querySelector("#home .hero-text h2");
        if (h2 && C.home.heroTitle) h2.textContent = C.home.heroTitle;
        const p = document.querySelector("#home .hero-text p");
        if (p && Array.isArray(C.home.heroParagraphs)) {
          p.innerHTML = C.home.heroParagraphs.map((line) => line).join(" <br />");
        }
        const heartBtn = document.getElementById("heartBtn");
        if (heartBtn && C.home.heartButton) heartBtn.textContent = C.home.heartButton;

        // Rebuild the grid with smaller logical containers
        const grid = document.querySelector("#home .content-grid");
        if (grid) {
          const likes = (C.home.likes || []).map((li) => `<li>${li}</li>`).join("");
          const dislikes = (C.home.dislikes || []).map((li) => `<li>${li}</li>`).join("");
          const dreams = (C.home.dreams || []).map((li) => `<li>${li}</li>`).join("");
          const aboutPs = (C.home.aboutParagraphs || []).map((txt) => `<p>${txt}</p>`).join("");
          const updates = (C.home.updates || []).map((u) => `<li>${u}</li>`).join("");

          const pieces = [];
          pieces.push(`
            <div class="card">
              <h3>${C.home.aboutTitle || "About Me"}</h3>
              ${aboutPs}
            </div>
          `);
          if (likes) pieces.push(`
            <div class="card">
              <h3>${C.home.likesTitle || "Likes"}</h3>
              <ul>${likes}</ul>
            </div>
          `);
          if (dislikes) pieces.push(`
            <div class="card">
              <h3>${C.home.dislikesTitle || "Dislikes"}</h3>
              <ul>${dislikes}</ul>
            </div>
          `);
          if (dreams) pieces.push(`
            <div class="card">
              <h3>${C.home.dreamsTitle || "Dreams"}</h3>
              <ul>${dreams}</ul>
            </div>
          `);
          pieces.push(`
            <div class="card">
              <h3>${C.home.updatesTitle || "What's New"}</h3>
              <ul id="updates">${updates}</ul>
            </div>
          `);

          grid.innerHTML = pieces.join("");
        }
      }

      // Socials section title
      if (C.socials?.title) {
        const h2 = document.querySelector("#socials h2");
        if (h2) h2.textContent = C.socials.title;
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
                `<li><a href="${i.url}" target="_blank" rel="noopener" ${i.cls ? `class="${i.cls}"` : ''}>${i.label}</a></li>`
            )
            .join("");
        }
      }

      // Study copy
      if (C.study) {
        const h2 = document.querySelector("#study h2");
        if (h2) h2.textContent = C.study.title;
        const levelCard = document.querySelector(
          "#study .study-card:nth-child(1)"
        );
        if (levelCard) {
          const h3 = levelCard.querySelector("h3");
          const progress = levelCard.querySelector(".progress");
          const p = levelCard.querySelector("p");
          if (h3 && C.study.levelTitle) h3.textContent = C.study.levelTitle;
          if (progress && Number.isFinite(C.study.progressPercent))
            progress.style.width = `${C.study.progressPercent}%`;
          if (p && C.study.levelText) p.textContent = C.study.levelText;
        }
        const wodCard = document.querySelector(
          "#study .study-card:nth-child(2)"
        );
        if (wodCard && C.study.wordOfDay) {
          const jp = wodCard.querySelector(".japanese");
          const romaji = wodCard.querySelector(".romaji");
          const meaning = wodCard.querySelector(".meaning");
          if (jp) jp.textContent = C.study.wordOfDay.japanese || "";
          if (romaji) romaji.textContent = C.study.wordOfDay.romaji || "";
          if (meaning) meaning.textContent = C.study.wordOfDay.meaning || "";
        }
        const goalsCard = document.querySelector(
          "#study .study-card:nth-child(3)"
        );
        if (goalsCard) {
          const h3 = goalsCard.querySelector("h3");
          const ul = goalsCard.querySelector("ul");
          if (h3 && C.study.goalsTitle) h3.textContent = C.study.goalsTitle;
          if (ul && Array.isArray(C.study.goals))
            ul.innerHTML = C.study.goals.map((g) => `<li>${g}</li>`).join("");
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
          if (h3 && C.games.memoryTitle) h3.textContent = C.games.memoryTitle;
          const reset = document.getElementById("resetMemory");
          if (reset && C.games.memoryReset)
            reset.textContent = C.games.memoryReset;
        }
        if (heart) {
          const h3 = heart.querySelector("h3");
          if (h3 && C.games.heartsTitle) h3.textContent = C.games.heartsTitle;
          const zone = document.getElementById("heartZone");
          if (zone && C.games.heartsZone) zone.textContent = C.games.heartsZone;
          const btn = document.getElementById("resetHearts");
          if (btn && C.games.heartsReset) btn.textContent = C.games.heartsReset;
        }
        if (gacha) {
          const h3 = gacha.querySelector("h3");
          if (h3 && C.games.gachaTitle) h3.textContent = C.games.gachaTitle;
          const dexBtn = document.getElementById("gachaCollectionBtn");
          if (dexBtn && C.games.gachaOpenDex)
            dexBtn.textContent = C.games.gachaOpenDex;
        }
      }

      // Shrine copy
      if (C.shrine) {
        const h2 = document.querySelector("#shrine h2");
        if (h2) h2.textContent = C.shrine.title;
        const aboutTitle = document.querySelector("#shrine .shrine-info h3");
        if (aboutTitle && C.shrine.aboutTitle)
          aboutTitle.textContent = C.shrine.aboutTitle;
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

      // Friends title
      if (C.friends?.title) {
        const h3 = document.querySelector("#rightSidebar .widget h3");
        if (h3) h3.textContent = C.friends.title;
      }

      // Sidebar widget titles
      if (C.sidebarTitles) {
        const left = C.sidebarTitles.left || {};
        const right = C.sidebarTitles.right || {};
        const leftWidgets = document.querySelectorAll(
          "#leftSidebar .widget h3"
        );
        if (leftWidgets[0] && left.mood) leftWidgets[0].textContent = left.mood;
        if (leftWidgets[1] && left.quickLinks)
          leftWidgets[1].textContent = left.quickLinks; // may be overridden by quickLinks.title
        if (leftWidgets[3] && left.stats)
          leftWidgets[3].textContent = left.stats; // depending on iframe block presence

        const rightWidgets = document.querySelectorAll(
          "#rightSidebar .widget h3"
        );
        if (rightWidgets[0] && (C.friends?.title || right.friends))
          rightWidgets[0].textContent = C.friends?.title || right.friends;
        if (rightWidgets[1] && right.badges)
          rightWidgets[1].textContent = right.badges;
        if (rightWidgets[2] && right.vibe)
          rightWidgets[2].textContent = right.vibe;
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
    else document.addEventListener("miku-images-ready", spawnFloatingMikus, { once: true });
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
  if (saveMoodBtn) saveMoodBtn.addEventListener("click", () => {
      const mood = moodInput.value.trim();
      if (mood) {
        moodDisplay.textContent = `💭 ${mood}`;
        localStorage.setItem("pixelbelle-mood", mood);
        moodInput.value = "";

        // Add sparkle effect
        createSparkleEffect(saveMoodBtn);
      }
    });

  if (moodInput) moodInput.addEventListener("keypress", (e) => {
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
      const { label, url, icon, color } = s;
      let domain = "";
      try {
        domain = new URL(url).hostname.replace("www.", "");
      } catch {}

      // Blocklist some sites that should not be embedded (e.g., jigsawplanet)
      if (domain.includes("jigsawplanet.com")) {
        return `
          <div class="social-item" style="--accent:${color}">
            <div class="social-title"><span class="icon">${icon}</span> ${label}</div>
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
              <div class="social-title"><span class="icon">${icon}</span> ${label}</div>
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
              <div class="social-title"><span class="icon">${icon}</span> ${label}</div>
              <div class="social-embed" style="aspect-ratio:16/9">
                <iframe style="width:100%;height:100%;border:0;border-radius:12px" src="https://www.youtube.com/embed?listType=user_uploads&list=${handle}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>
              </div>
            </div>
          `;
        }
        return `
          <div class="social-item" style="--accent:${color}">
            <div class="social-title"><span class="icon">${icon}</span> ${label}</div>
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
              <div class="social-title"><span class="icon">${icon}</span> ${label}</div>
              <div class="social-embed">
                <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/${id}" width="100%" height="352" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
              </div>
            </div>
          `;
        }
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
            <div class="social-title"><span class="icon">${icon}</span> ${label}</div>
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
            <div class="social-title"><span class="icon">${icon}</span> ${label}</div>
            <div class="social-embed" style="height:420px">
              <iframe src="${url}" style="border:0;width:100%;height:100%;border-radius:12px" loading="lazy" referrerpolicy="no-referrer"></iframe>
            </div>
          </div>
        `;
      }

      // Fallback: iframe
      return `
        <div class="social-item" style="--accent:${color}">
          <div class="social-title"><span class="icon">${icon}</span> ${label}</div>
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

  let isPlaying = false;

    // Stream source (Vocaloid Radio)
    const STREAM_URL = "https://vocaloid.radioca.st/stream";
    const audio = new Audio();
    audio.src = STREAM_URL;
    audio.preload = "none";
    audio.crossOrigin = "anonymous";
    audio.volume = 0.85;

  // Initialize labels
  if (onlineStatus) onlineStatus.textContent = C.status?.radioOffLabel || "Radio Off";
  if (radioStatus) radioStatus.textContent = C.radio?.defaultStatus || "Kawaii FM 📻";
  if (radioDisplayStatus) radioDisplayStatus.textContent = C.radio?.defaultStatus || "Kawaii FM 📻";

  // Radio controls
    playBtn.addEventListener("click", () => {
      isPlaying = true;
      const status = C.radio?.playingStatus || "Now Playing";
      radioStatus.textContent = status;
      if (radioDisplayStatus) radioDisplayStatus.textContent = status;
      if (onlineStatus) onlineStatus.textContent = "Playing";
      audio.play().catch(()=>{});
      startEqualizer();
    });

    pauseBtn.addEventListener("click", () => {
      isPlaying = false;
      audio.pause();
      const status = C.radio?.stoppedStatus || "Radio Stopped";
      radioStatus.textContent = status;
      if (radioDisplayStatus) radioDisplayStatus.textContent = status;
      if (onlineStatus) onlineStatus.textContent = C.status?.radioOffLabel || "Radio Off";
      stopEqualizer();
    });

    audio.addEventListener("error", ()=>{
      radioStatus.textContent = "⚠️ Stream error";
      if (radioDisplayStatus) radioDisplayStatus.textContent = "⚠️ Stream error";
    });
    
    audio.addEventListener("playing", ()=>{
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
  const resetHeartsBtn = document.getElementById("resetHearts");
  if (!heartZone || !gameHeartCountEl || !resetHeartsBtn) return;

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
    if (!mikuGallery) return;

    function renderGallery() {
      mikuGallery.innerHTML = MIKU_IMAGES.map(
        (img, index) => `
        <img src="${img}" alt="Miku ${index + 1}" class="gallery-image" onclick="openImageModal('${img}')">
      `
      ).join("");
    }

    if (MIKU_IMAGES.length) renderGallery();
    else document.addEventListener("miku-images-ready", renderGallery, { once: true });
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
    const hearts = ['💖', '💙', '💚', '💛', '💜', '🤍', '🖤'];
    const container = document.querySelector('.floating-hearts');
    
    if (!container) return;

    // Clear existing hearts
    container.innerHTML = '';

    // Inject styles for heart particles and swallow
    const style = document.createElement('style');
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
      const heart = document.createElement('div');
      heart.className = 'heart-particle';
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      
      // Random starting position
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.setProperty('--drift', (Math.random() - 0.5) * 200 + 'px');
      
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

  // ====== SYNC HEART COLLECTOR WITH FLOATING HEARTS ======
  function syncHeartCollector() {
    const heartZone = document.getElementById("heartZone");
    
    if (!heartZone) return;

    // Add event listener for floating heart interaction
    heartZone.addEventListener("click", (e) => {
      // Find nearby floating hearts and "eat" them
      const floatingHearts = document.querySelectorAll('.heart-particle');
      const clickX = e.clientX;
      const clickY = e.clientY;
      
      let heartsEaten = 0;
      
      floatingHearts.forEach(heart => {
        const rect = heart.getBoundingClientRect();
        const heartX = rect.left + rect.width / 2;
        const heartY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(clickX - heartX, 2) + Math.pow(clickY - heartY, 2)
        );
        
        if (distance < 100) { // Within 100px
          heart.classList.add('heart-eaten');
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

    const img = document.createElement('img');
    img.className = 'swallow';

    // preload to avoid broken image flashes
    const preload = new Image();
    preload.onload = () => {
      img.src = swallowSrc;
      document.body.appendChild(img);
      start();
    };
    preload.onerror = () => { /* skip if missing */ };
    preload.src = swallowSrc;

    function start() {
      let x = -120;
      let y = window.innerHeight * 0.12 + Math.random() * window.innerHeight * 0.4;
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
        const hearts = document.querySelectorAll('.heart-particle');
        hearts.forEach(h => {
          const r1 = img.getBoundingClientRect();
          const r2 = h.getBoundingClientRect();
          const overlap = !(r2.right < r1.left + 10 || r2.left > r1.right - 10 || r2.bottom < r1.top + 10 || r2.top > r1.bottom - 10);
          if (overlap) {
            h.classList.add('heart-eaten');
            setTimeout(()=> h.remove(), 350);
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
