/* Main JavaScript for PixelBelle's Garden */
console.log("🌸 Main.js starting execution...");
// Fail-safe splash bootstrap: ensures Enter/click transitions even if later code fails
(function failsafeSplashBootstrap(){
  try {
    const wire = () => {
      try {
        const splash = document.getElementById('splash');
        const btn = document.getElementById('enterSite');
        const main = document.getElementById('mainSite');
        if (!splash || !btn || !main) return;
        if (splash.dataset.wired === '1') return; // idempotent
        splash.dataset.wired = '1';
        const enter = () => {
          if (window.__entered) return;
          window.__entered = true;
          try { btn.disabled = true; } catch(_) {}
          try { splash.style.animation = 'none'; } catch(_) {}
          try { splash.style.display = 'none'; } catch(_) {}
          try { main.classList.remove('hidden'); } catch(_) {}
          // Try to start the site if available
          try {
            if (typeof initSite === 'function') initSite();
            else if (typeof window.initSite === 'function') window.initSite();
          } catch(_) {}
        };
        btn.addEventListener('click', enter, { once: true });
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.keyCode === 13) enter();
        }, { capture: true });
      } catch(_) {}
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wire);
    else wire();
  } catch(_) {}
})();
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

  // Lightweight DOM helpers
  const $ = (id) => document.getElementById(id);
  const byId = $;

  // ====== SFX AUDIO ENGINE (asset-based) ======
  // Loads and plays high-quality SFX from assets/SFX. Minimal, lazy-loaded, and shared.
  (function initSfxEngine() {
    try { if (window.SFX) return; } catch(_){}
    const BASE = "./assets/SFX";
    const p = (sub) => `${BASE}/${sub}`;
    const MAP = {
      // UI and navigation
      "ui.move": [
        p("menu sounds/menu cursor move.wav"),
        p(
          "menu sounds/menu cursor move (except this time there's three of them and it's slightly louder).wav"
        ),
        p("menu sounds/se_sy_00.wav"),
      ],
      "ui.select": [p("menu sounds/menu option select.wav")],
      "ui.back": [
        p("menu sounds/pop-up close.wav"),
        p("menu sounds/menu change.wav"),
      ],
      "ui.change": [
        p("menu sounds/module change 1.wav"),
        p("menu sounds/module change 2.wav"),
      ],
      "ui.unavailable": [p("menu sounds/unavailable.wav")],
      "ui.teleport": [p("menu sounds/song selection teleport.wav")],
      "ui.scoreTally": [p("menu sounds/score tally.wav")],
      "ui.se_sy_24": [p("menu sounds/se_sy_24.wav")],

      // Hearts and love
      "hearts.click": [
        p("other sounds/click.wav"),
        p("other sounds/se_sy_09.wav"),
      ],
      "hearts.add": [
        p("other sounds/se_sy_15.wav"),
        p("other sounds/se_sy_18.wav"),
        p("menu sounds/score tally.wav"),
      ],
      "hearts.milestone": [
        p("misc other voice clips/(miku) yay.wav"),
        p("other sounds/clap.wav"),
      ],

      // Gacha
      "gacha.roll": [p("menu sounds/song selection teleport.wav")],
      "gacha.reveal": [
        p("menu sounds/module change 1.wav"),
        p("menu sounds/module change 2.wav"),
      ],
      "gacha.pop": [
        // use varied percussion set for reveal pops
        p("button sounds+percussion/1.wav"),
        p("button sounds+percussion/2.wav"),
        p("button sounds+percussion/3.wav"),
        p("button sounds+percussion/4.wav"),
        p("button sounds+percussion/5.wav"),
        p("button sounds+percussion/6.wav"),
        p("button sounds+percussion/7.wav"),
        p("button sounds+percussion/8.wav"),
        p("button sounds+percussion/9.wav"),
        p("button sounds+percussion/10.wav"),
        p("button sounds+percussion/11.wav"),
        p("button sounds+percussion/12.wav"),
        p("button sounds+percussion/13.wav"),
        p("button sounds+percussion/14.wav"),
        p("button sounds+percussion/15.wav"),
        p("button sounds+percussion/16.wav"),
        p("button sounds+percussion/17.wav"),
        p("button sounds+percussion/18.wav"),
        p("button sounds+percussion/19.wav"),
        p("button sounds+percussion/20.wav"),
        p("button sounds+percussion/21.wav"),
        p("button sounds+percussion/22.wav"),
        p("button sounds+percussion/23.wav"),
        p("button sounds+percussion/24.wav"),
        p("button sounds+percussion/25.wav"),
        p("button sounds+percussion/26.wav"),
        p("button sounds+percussion/27.wav"),
        p("button sounds+percussion/28.wav"),
        p("button sounds+percussion/29.wav"),
        p("button sounds+percussion/30.wav"),
        p("button sounds+percussion/31.wav"),
        p("button sounds+percussion/32.wav"),
        p("button sounds+percussion/33.wav"),
        p("button sounds+percussion/34.wav"),
        p("button sounds+percussion/35.wav"),
      ],
      "gacha.high": [
        p("menu sounds/result (clear).wav"),
        p("result voice clips/miku/perfect.wav"),
      ],
      "gacha.mid": [p("result voice clips/miku/great.wav")],
      "gacha.low": [
        p("menu sounds/result (not clear).wav"),
        p("result voice clips/miku/standard.wav"),
      ],
      "gacha.fail": [p("result voice clips/miku/missXtake.wav")],

      // Memory game
      "memory.flip": [p("menu sounds/menu cursor move.wav")],
      "memory.match": [p("menu sounds/menu option select.wav")],
      "memory.win": [p("menu sounds/result (clear).wav")],
      "memory.miss": [p("menu sounds/unavailable.wav")],
      "memory.tick": [
        p("other sounds/sonar beeps 1.wav"),
        p("other sounds/sonar beeps 2.wav"),
      ],

      // JP games
      "quiz.ok": [
        p("menu sounds/menu option select.wav"),
        p("misc other voice clips/(miku) yay.wav"),
      ],
      "quiz.bad": [
        p("menu sounds/unavailable.wav"),
        p("misc other voice clips/(miku) sad.wav"),
      ],
      "quiz.tick": [
        p("other sounds/sonar beeps 1.wav"),
        p("other sounds/sonar beeps 2.wav"),
      ],
      "quiz.timeup": [p("other sounds/se_ev_20.wav")],
      "result.perfect": [
        p("result voice clips/miku/perfect.wav"),
        p("result voice clips/len/perfect.wav"),
        p("result voice clips/rin/perfect.wav"),
      ],
      "result.great": [
        p("result voice clips/miku/great.wav"),
        p("result voice clips/len/great.wav"),
        p("result voice clips/rin/great.wav"),
      ],
      "result.standard": [
        p("result voice clips/miku/standard.wav"),
        p("result voice clips/len/standard.wav"),
        p("result voice clips/rin/standard.wav"),
      ],
      "result.cheap": [
        p("result voice clips/miku/cheap.wav"),
        p("result voice clips/len/cheap.wav"),
        p("result voice clips/rin/cheap.wav"),
      ],
      "result.miss": [
        p("result voice clips/miku/missXtake.wav"),
        p("result voice clips/len/missXtake.wav"),
        p("result voice clips/rin/missXtake.wav"),
      ],

      // Fun/extra
      "extra.camera": [p("other sounds/camera.wav")],
      "extra.clap": [p("other sounds/clap.wav")],
      "extra.kick": [p("other sounds/kick.wav")],
      "extra.coin": [p("other sounds/mr_0100000.wav")],
      "extra.fx1": [p("other sounds/se_ev_01.wav")],
      "extra.fx2": [p("other sounds/se_ev_17.wav")],
      "extra.sona": [p("misc other voice clips/(miku) sona.wav")],
      "extra.yo": [
        p("misc other voice clips/(miku) yo.wav"),
        p("misc other voice clips/(rin) yo.wav"),
      ],
      "extra.wan": [p("misc other voice clips/(rin) wan.wav")],
      "extra.thanks": [
        p("misc other voice clips/(miku) thank you for playing!.wav"),
      ],
      "sega.tag": [
        p("sega voice clips/sega (solo).wav"),
        p("sega voice clips/sega (chorus).wav"),
        p("sega voice clips/sega (shout).wav"),
      ],

      // Footsteps pool (available for future shimeji hooks)
      "foot.step": [
        p("footstep sounds/se_ev_05_01.wav"),
        p("footstep sounds/se_ev_05_02.wav"),
        p("footstep sounds/se_ev_06_01.wav"),
        p("footstep sounds/se_ev_06_02.wav"),
        p("footstep sounds/se_ev_07_01.wav"),
        p("footstep sounds/se_ev_07_02.wav"),
        p("footstep sounds/se_ev_08_01.wav"),
        p("footstep sounds/se_ev_08_02.wav"),
        p("footstep sounds/se_ev_14.wav"),
      ],

      // Swallow mascot cues
      "swallow.swoop": [
        p("other sounds/se_ev_17.wav"),
        p("menu sounds/song selection teleport.wav"),
      ],
      "swallow.chomp": [
        p("other sounds/se_sy_09.wav"),
        p("other sounds/click.wav"),
      ],
    };

    const ctxState = { ctx: null, master: null, enabled: true, volume: 0.6 };
    const buffers = new Map(); // path -> Promise<AudioBuffer>
    const lastPlayAt = Object.create(null); // key -> timestamp
    const minInterval = {
      "foot.step": 260, // calmer cadence to avoid overplaying footsteps
      "ui.move": 60,
      "swallow.swoop": 900,
      "swallow.chomp": 180,
    };

    function ensureCtx() {
      if (!ctxState.ctx) {
        try {
          ctxState.ctx = new (window.AudioContext ||
            window.webkitAudioContext)();
          ctxState.master = ctxState.ctx.createGain();
          ctxState.master.gain.value = ctxState.volume;
          ctxState.master.connect(ctxState.ctx.destination);
          // unlock on first gesture
          const unlock = () => {
            if (!ctxState.ctx) return;
            if (ctxState.ctx.state === "suspended") ctxState.ctx.resume();
            window.removeEventListener("pointerdown", unlock);
          };
          window.addEventListener("pointerdown", unlock);
        } catch (e) {
          // no audio
        }
      }
      return ctxState.ctx;
    }
    function loadBuffer(path) {
      if (buffers.has(path)) return buffers.get(path);
      const ctx = ensureCtx();
      if (!ctx) return Promise.resolve(null);
      const prom = fetch(path)
        .then((r) => r.arrayBuffer())
        .then(
          (ab) => new Promise((res, rej) => ctx.decodeAudioData(ab, res, rej))
        )
        .catch(() => null);
      buffers.set(path, prom);
      return prom;
    }
    async function playPath(
      path,
      { volume = 1, rate = 1, detune = 0, pan = 0 } = {}
    ) {
      if (!ctxState.enabled) return;
      const ctx = ensureCtx();
      if (!ctx) return;
      const buf = await loadBuffer(path);
      if (!buf) return;
      const src = ctx.createBufferSource();
      const g = ctx.createGain();
      const p = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      src.buffer = buf;
      if (src.detune) src.detune.value = detune;
      src.playbackRate.value = rate;
      g.gain.value = volume;
      if (p) {
        p.pan.value = pan;
        src.connect(g).connect(p).connect(ctxState.master);
      } else {
        src.connect(g).connect(ctxState.master);
      }
      try {
        src.start();
      } catch (_) {}
    }
    function pick(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
    async function playKey(key, opts = {}) {
      const arr = MAP[key];
      if (!arr || arr.length === 0) return;
      // simple global throttle per key
      const now = performance.now();
      const gap = minInterval[key] || 0;
      if (gap && lastPlayAt[key] && now - lastPlayAt[key] < gap) return;
      lastPlayAt[key] = now;
      const path = pick(arr);
      return playPath(path, opts);
    }
    function setEnabled(on) {
      ctxState.enabled = !!on;
      localStorage.setItem(
        "pixelbelle-sfx-enabled",
        ctxState.enabled ? "1" : "0"
      );
    }
    function setVolume(v) {
      ctxState.volume = Math.min(1, Math.max(0, v));
      if (ctxState.master) ctxState.master.gain.value = ctxState.volume;
      localStorage.setItem("pixelbelle-sfx-volume", String(ctxState.volume));
    }
    // restore prefs
    try {
      const en = localStorage.getItem("pixelbelle-sfx-enabled");
      if (en != null) ctxState.enabled = en === "1";
      const vol = parseFloat(
        localStorage.getItem("pixelbelle-sfx-volume") || ""
      );
      if (isFinite(vol)) ctxState.volume = vol;
    } catch (_) {}

    // Preload first source for keys gradually to avoid decode hitches
    function preloadFirst(keys = [], { perTick = 2, delay = 150 } = {}) {
      const paths = [];
      const seen = new Set();
      keys.forEach((k) => {
        const arr = MAP[k];
        if (arr && arr.length) {
          const p0 = arr[0];
          if (!seen.has(p0)) {
            seen.add(p0);
            paths.push(p0);
          }
        }
      });
      let i = 0;
      function step() {
        const end = Math.min(paths.length, i + perTick);
        for (; i < end; i++) loadBuffer(paths[i]);
        if (i < paths.length) {
          if (window.requestIdleCallback)
            requestIdleCallback(() => setTimeout(step, delay));
          else setTimeout(step, delay);
        }
      }
      step();
    }
    window.SFX = {
      play: playKey,
      playPath,
      setEnabled,
      setVolume,
      ensureCtx,
      MAP,
      preloadFirst,
    };
  })();

  // ====== MEMORY AND PERFORMANCE OPTIMIZATION ======
  // Global timer tracking for cleanup
  const GLOBAL_TIMERS = {
    intervals: new Set(),
    timeouts: new Set(),

    addInterval(id) {
      this.intervals.add(id);
      return id;
    },
    addTimeout(id) {
      this.timeouts.add(id);
      return id;
    },

    clearAll() {
      this.intervals.forEach((id) => clearInterval(id));
      this.timeouts.forEach((id) => clearTimeout(id));
      this.intervals.clear();
      this.timeouts.clear();
    },
  };
  // Also expose globally to avoid scope issues when referenced outside
  try {
    window.GLOBAL_TIMERS = GLOBAL_TIMERS;
  } catch (_) {}

  // Enhanced timer functions with tracking
  window.setIntervalTracked = (fn, delay) =>
    GLOBAL_TIMERS.addInterval(setInterval(fn, delay));
  window.setTimeoutTracked = (fn, delay) =>
    GLOBAL_TIMERS.addTimeout(setTimeout(fn, delay));

  // Cleanup on page unload
  window.addEventListener("beforeunload", () => GLOBAL_TIMERS.clearAll());

  // (Removed duplicate byId; using the lightweight `$`/`byId` declared above)

  // ====== OPTIMIZED IMAGE LOADING ======
  const MIKU_IMAGES = [];
  const MIKU_META = Object.create(null);
  try { window.MIKU_META = MIKU_META; } catch (_) {}
  let resolveMiku;
  window.MIKU_IMAGES_READY = new Promise((res) => (resolveMiku = res));
  try {
    window.SITE_READY = window.MIKU_IMAGES_READY.then(() => true);
  } catch (_) {}

  // Load metadata + images from JSON manifest instead of guessing filenames
  (function loadImages() {
    const manifest = "./assets/pixel-miku/mikus.json";

    if (Array.isArray(C.images?.extraMikus)) {
      MIKU_IMAGES.push(
        ...C.images.extraMikus.filter((url) => typeof url === "string" && url)
      );
    }

    fetch(manifest)
      .then((r) => r.json())
      .then((list) => {
        list.forEach((m) => {
          const url = `./assets/pixel-miku/${m.filename}`;
          MIKU_IMAGES.push(url);
          MIKU_META[url] = m;
        });
      })
      .catch(() => {})
      .finally(() => {
        if (typeof resolveMiku === "function") resolveMiku(MIKU_IMAGES.slice());
        try {
          window.SITE_READY = (window.MIKU_IMAGES_READY || Promise.resolve()).then(
            () => new Promise((res) => setTimeout(res, 150))
          );
        } catch (_) {}
        document.dispatchEvent(
          new CustomEvent("miku-images-ready", {
            detail: { images: MIKU_IMAGES.slice() },
          })
        );
      });
  })();

  // ====== MIKU CLASSIFIER (color-based heuristic) ======
  // Classifies each Miku image into a likely type (e.g., Sakura, Snow, BRS)
  // and assigns a rarity override. Results are cached in window.MIKU_META.
  function rgbToHsv(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;
    const d = max - min;
    s = max === 0 ? 0 : d / max;
    if (max === min) {
      h = 0; // achromatic
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: h * 360, s, v };
  }

  function analyzeImageUrl(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        try {
          const size = 24;
          const canvas = document.createElement("canvas");
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext("2d", { willReadFrequently: true });
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(img, 0, 0, size, size);
          const data = ctx.getImageData(0, 0, size, size).data;
          let total = 0,
            black = 0,
            white = 0,
            red = 0,
            orange = 0,
            yellow = 0,
            green = 0,
            cyan = 0,
            blue = 0,
            purple = 0,
            magenta = 0,
            brightSum = 0,
            pinkLike = 0;
          for (let i = 0; i < data.length; i += 4) {
            const a = data[i + 3];
            if (a < 10) continue; // skip transparent
            const r = data[i], g = data[i + 1], b = data[i + 2];
            const { h, s, v } = rgbToHsv(r, g, b);
            total++;
            brightSum += v;
            if (v < 0.18) { black++; continue; }
            if (s < 0.12 && v > 0.85) { white++; continue; }
            // Hue buckets
            if (h < 12 || h >= 348) red++;
            else if (h < 45) orange++;
            else if (h < 75) yellow++;
            else if (h < 165) green++;
            else if (h < 195) cyan++;
            else if (h < 255) blue++;
            else if (h < 285) purple++;
            else if (h < 348) magenta++;
            // Pinkness heuristic: bright + moderately saturated red/magenta
            if (v > 0.6 && s > 0.25 && (h < 20 || (h > 300 && h < 350))) {
              pinkLike++;
            }
          }
          const inv = Math.max(1, total);
          const ratios = {
            black: black / inv,
            white: white / inv,
            red: red / inv,
            orange: orange / inv,
            yellow: yellow / inv,
            green: green / inv,
            cyan: cyan / inv,
            blue: blue / inv,
            purple: purple / inv,
            magenta: magenta / inv,
            pink: pinkLike / inv,
            brightness: brightSum / inv,
          };
          resolve(ratios);
        } catch (e) {
          resolve(null);
        }
      };
      img.onerror = () => resolve(null);
      img.src = url;
    });
  }

  function decideType(r) {
    // Default
    let type = "Hatsune Miku";
    let rarity = null;
    let description = "The beloved virtual singer in her classic look.";

    // Strong signatures first
    if (r.black > 0.5 && r.blue > r.red && r.blue > 0.15) {
      type = "Black Rock Shooter Miku";
      rarity = 5;
      description = "Dark, edgy silhouette with blue energy—an homage to BRS.";
    } else if (r.white > 0.4 && (r.blue + r.cyan) > (r.red + r.green)) {
      type = "Snow Miku";
      rarity = r.white > 0.55 ? 5 : 4;
      description = "Wintery whites and blues—limited seasonal Snow Miku.";
    } else if (r.pink > 0.25) {
      type = r.pink > 0.4 ? "Sakura Miku (Blossom)" : "Sakura Miku";
      rarity = r.pink > 0.4 ? 5 : 4;
      description = "Spring cherry-blossom palette in soft pinks.";
    } else if (r.red > 0.22 && r.green > 0.22) {
      type = "Christmas Miku";
      rarity = 4;
      description = "Festive red and green holiday style.";
    } else if (r.orange > 0.2 && (r.black > 0.2 || r.purple > 0.18)) {
      type = "Halloween Miku";
      rarity = 4;
      description = "Spooky oranges and purples—trick or treat!";
    } else if ((r.cyan + r.green) > 0.35 && r.black > 0.15 && r.black < 0.45) {
      type = "Racing Miku";
      rarity = 4;
      description = "Sporty accents with vivid teal and dark trims.";
    } else if (r.purple > 0.22 && r.cyan > 0.22) {
      type = "Magical Mirai Miku";
      rarity = 4;
      description = "Showcase concert style with bold accent colors.";
    } else if (r.blue > 0.3 && r.white > 0.3) {
      type = "School Miku";
      rarity = 3;
      description = "Uniform-inspired blues and whites for a scholastic vibe.";
    } else if (r.yellow > 0.25 && r.brightness > 0.6) {
      type = "Summer Miku";
      rarity = 3;
      description = "Bright, sunny palette perfect for summer.";
    } else {
      // Classic weighting by teal-ish hair prominence
      const hairTeal = r.cyan + r.green * 0.5;
      rarity = hairTeal > 0.25 ? 3 : 2;
      type = "Hatsune Miku";
      description = "The original look—timeless teal twintails!";
    }
    return { type, rarity, description };
  }

  let __classifyQueue = [];
  let __classifyInflight = 0;
  const __CLASSIFY_CONCURRENCY = 2;
  function __pumpClassify() {
    while (__classifyInflight < __CLASSIFY_CONCURRENCY && __classifyQueue.length) {
      const { url, resolve } = __classifyQueue.shift();
      __classifyInflight++;
      if (/pixiebel\.gif$/i.test(url)) {
        // Respect JSON-provided metadata entirely; don't override curated fields
        const base = MIKU_META[url] || {};
        const meta = { ...base, final: true };
        MIKU_META[url] = meta;
        __classifyInflight--;
        resolve(meta);
        continue;
      }
      analyzeImageUrl(url)
        .then((ratios) => {
          // Classifier provides lightweight type hints; do not override JSON name/rarity/description if present
          const base = MIKU_META[url] || {};
          const hint = ratios ? { ...decideType(ratios), ratios } : { type: "Hatsune Miku", description: "" };
          const merged = {
            ...hint,
            ...base, // JSON wins for id, name, alt_names, rarity, description, song, links
            // Keep classifier type/ratios as auxiliary fields
            type: base.type || hint.type,
            ratios: hint.ratios || base.ratios,
            final: true,
          };
          MIKU_META[url] = merged;
          resolve(merged);
        })
        .catch(() => {
          const base = MIKU_META[url] || {};
          const merged = { type: base.type || "Hatsune Miku", rarity: base.rarity ?? null, description: base.description || "", ...base, final: true };
          MIKU_META[url] = merged;
          resolve(merged);
        })
        .finally(() => {
          __classifyInflight--;
          __pumpClassify();
        });
    }
  }

  function classifyUrl(url) {
    if (MIKU_META[url] && MIKU_META[url].final) return Promise.resolve(MIKU_META[url]);
    return new Promise((resolve) => {
      __classifyQueue.push({ url, resolve });
      __pumpClassify();
    });
  }

  function classifyAllMikus(max = 60) {
    const list = (Array.isArray(MIKU_IMAGES) ? MIKU_IMAGES : []).slice(0, max);
    list.forEach((u) => classifyUrl(u));
  }

  try {
    window.getMikuMeta = function (url, allowLazy = true) {
      const meta = MIKU_META[url];
      if (meta) return meta;
      if (allowLazy) classifyUrl(url);
      return MIKU_META[url] || null;
    };
  } catch (_) {}

  // Start classification once images are ready
  try {
    window.MIKU_CLASSIFY_READY = window.MIKU_IMAGES_READY.then(() => classifyAllMikus());
  } catch (_) {}

  // ====== DATA CONFIGURATION ======
  const SOCIALS = (C.socials && C.socials.items) || [];
  const FRIENDS = (C.friends && C.friends.items) || [];
  const PLAYLIST_SONGS = (C.music && C.music.songs) || [];
  const LOVE_TOASTS = (C.love && C.love.toasts) || ["ありがとう！💖"];
  const LOVE_MILESTONES = (C.love && C.love.milestones) || [];

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

  // ====== OPTIMIZED SPLASH SCREEN ======
  function initSplash() {
    console.log("initSplash called!");
    const splash = byId("splash");
    const enterBtn = byId("enterSite");
    const mainSite = byId("mainSite");
    let isEntering = false;

    if (!splash || !enterBtn || !mainSite) {
      console.log("Missing elements:", { splash: !!splash, enterBtn: !!enterBtn, mainSite: !!mainSite });
      return;
    }
    console.log("All splash elements found, setting up event listeners");

    // Start preloading critical assets while splash is showing
    (function preloadSplashAssets() {
      try {
        const imgs = [];
        const seen = new Set();
        const pushImg = (url) => {
          if (!url || seen.has(url)) return;
          seen.add(url);
          imgs.push(url);
        };

        // Preload hero/shrine/header/images from content
        pushImg(C?.images?.heroMiku);
        pushImg(C?.images?.shrineMiku);
        pushImg(C?.images?.headerBg);
        pushImg(C?.images?.ogImage);
        pushImg(C?.images?.favicon);

        // Preload the nav/status icon sprites actually used
        const iconMap = C?.images?.mikuIcons || {};
        const iconKeys = new Set();
        try {
          (Array.isArray(C?.nav) ? C.nav : []).forEach((n) => {
            if (n?.mikuIcon) iconKeys.add(n.mikuIcon);
          });
          if (C?.status?.heartIcon) iconKeys.add(C.status.heartIcon);
          if (C?.status?.visitorIcon) iconKeys.add(C.status.visitorIcon);
          if (C?.status?.statusIcon) iconKeys.add(C.status.statusIcon);
          if (C?.sidebarTitles?.left?.petIcon)
            iconKeys.add(C.sidebarTitles.left.petIcon);
          if (C?.sidebarTitles?.left?.friendsIcon)
            iconKeys.add(C.sidebarTitles.left.friendsIcon);
          if (C?.sidebarTitles?.left?.statsIcon)
            iconKeys.add(C.sidebarTitles.left.statsIcon);
          if (C?.sidebarTitles?.right?.quickLinksIcon)
            iconKeys.add(C.sidebarTitles.right.quickLinksIcon);
          if (C?.sidebarTitles?.right?.badgesIcon)
            iconKeys.add(C.sidebarTitles.right.badgesIcon);
          if (C?.sidebarTitles?.right?.vibeIcon)
            iconKeys.add(C.sidebarTitles.right.vibeIcon);
        } catch (_) {}
        iconKeys.forEach((k) => pushImg(iconMap[k]));

        // Kick off actual image preloads
        imgs.forEach((src) => {
          try {
            const i = new Image();
            i.decoding = "async";
            i.loading = "eager";
            i.src = src;
          } catch (_) {}
        });

        // Pet iframe can start loading in the background (hidden)
        try {
          const pet = document.getElementById("petIframe");
          if (pet && !pet.src && C?.embeds?.petIframeSrc)
            pet.src = C.embeds.petIframeSrc;
        } catch (_) {}

        // Prewarm SFX decode for a tiny set of keys
        try {
          if (window.SFX?.preloadFirst) {
            const keys = [
              "ui.move",
              "hearts.click",
              "gacha.roll",
              "gacha.pop",
              "foot.step",
            ];
            // small trickle to avoid main thread spikes during splash
            window.SFX.preloadFirst(keys, { perTick: 1, delay: 200 });
          }
        } catch (_) {}

        // Hint the browser to preload bgm audio bytes
        try {
          if (!document.getElementById("preload-bgm")) {
            const l = document.createElement("link");
            l.id = "preload-bgm";
            l.rel = "preload";
            l.as = "audio";
            l.href = "./assets/bgm.ogg";
            document.head.appendChild(l);
          }
        } catch (_) {}
      } catch (_) {}
    })();

    const handleEnter = () => {
      console.log("handleEnter called!");
      if (isEntering) return;
      isEntering = true;
      // Best-effort cleanup to avoid duplicate triggers
      try { document.removeEventListener("keydown", handleKeyPress); } catch(_) {}
      try { enterBtn.removeEventListener("click", handleEnter); } catch(_) {}
      try { if (window._splashTimeout) { clearTimeout(window._splashTimeout); } } catch(_) {}
      try { enterBtn.disabled = true; } catch(_) {}
      try {
        SFX.play("ui.teleport");
      } catch (_) {}
      splash.style.animation = "fadeOut 0.8s ease-out forwards";
      setTimeout(() => {
        splash.style.display = "none";
        mainSite.classList.remove("hidden");
        initSite();
        isEntering = false;
      }, 800);
    };

  enterBtn.addEventListener("click", handleEnter, { once: true });
    console.log("Click event listener added to enter button");
    
    // Also listen for Enter key press
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' || e.keyCode === 13) {
        console.log("Enter key pressed!");
        handleEnter();
      }
    };
  document.addEventListener("keydown", handleKeyPress, { capture: true });
  console.log("Keydown event listener added for Enter key (persistent)");

    // Auto-enter with cleanup
    const autoEnterTimeout = setTimeout(() => {
      if (splash.style.display !== "none") {
        handleEnter();
      }
    }, 5000);

    // Store timeout for potential cleanup
    window._splashTimeout = autoEnterTimeout;
  }

  // ====== ANI CURSORS (animated Windows .ani files) ======
  async function initAniCursors() {
    try {
      // Skip under constrained conditions for performance
      const smallScreen = Math.min(window.innerWidth, window.innerHeight) < 500;
      const prefersReduce =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const saveData = navigator.connection && navigator.connection.saveData;
      if (smallScreen || prefersReduce || saveData) return;
      // Map logical roles to filenames from assets/ani file-animation WxS
      const roleToFile = {
        normal: "Normal.ani",
        link: "Link.ani",
        text: "Text.ani",
        help: "Help.ani",
        busy: "Busy.ani",
        working: "Working.ani",
        precision: "Precision.ani",
        move: "Move.ani",
        person: "Person.ani",
        unavailable: "Unavailable.ani",
        vertical: "Vertical.ani",
        horizontal: "Horizontal.ani",
        diagonal1: "Diagonal1.ani",
        diagonal2: "Diagonal2.ani",
        handwriting: "Handwriting.ani",
        pin: "Pin.ani",
        alternate: "Alternate.ani",
      };

      // Defer heavy import and application until idle
      const boot = async () => {
        const mod = await import("https://cdn.skypack.dev/ani-cursor");
        const style = document.createElement("style");
        style.id = "ani-cursor-styles";
        document.head.appendChild(style);

        // Helper to fetch a file and build CSS for a selector
        const base = encodeURI("./assets/ani file-animation WxS/");
        const aniCssCache = new Map();
        const aniApplied = new Set(); // `${selector}::${fileName}`
        async function getAniCss(selector, fileName) {
          const key = `${selector}::${fileName}`;
          if (aniCssCache.has(key)) return aniCssCache.get(key);
          try {
            const res = await fetch(`${base}${encodeURIComponent(fileName)}`);
            const buf = await res.arrayBuffer();
            const convert =
              mod.convertAniBinaryToCSS ||
              (mod.default && mod.default.convertAniBinaryToCSS);
            if (!convert) throw new Error("ani-cursor convert not available");
            const css = convert(selector, new Uint8Array(buf));
            aniCssCache.set(key, css);
            return css;
          } catch (_) {
            return "";
          }
        }
        async function applyAni(selector, fileName) {
          const appliedKey = `${selector}::${fileName}`;
          if (aniApplied.has(appliedKey)) return;
          try {
            const css = await getAniCss(selector, fileName);
            if (css) {
              style.appendChild(document.createTextNode(css));
              aniApplied.add(appliedKey);
            }
          } catch (_) {
            // Ignore if not supported
          }
        }

        // Apply minimal set first; defer the rest to idle
        await Promise.all([
          applyAni("html, body", roleToFile.normal),
          applyAni(
            "a, button, .pixel-btn, .heart-btn, .radio-btn, .enter-btn, .quick-links a",
            roleToFile.link
          ),
          applyAni(
            'input, textarea, [contenteditable="true"], .editable',
            roleToFile.text
          ),
          applyAni(
            ".memory-card, .gacha-card, .dex-card, .memory-grid, canvas, svg",
            roleToFile.precision
          ),
        ]);
        const applyLater = () =>
          Promise.all([
            applyAni(
              ".hero-miku, .splash-miku, .float-miku, .shrine-image, #shrineMiku, #heroMiku, #splashMiku, .avatar, .friend-avatar",
              roleToFile.person
            ),
            applyAni(
              ".help, [title], .widget h3, .status-item, .hud-line",
              roleToFile.help
            ),
            applyAni(
              '[draggable="true"], .draggable, .movable, .gacha-card.matched',
              roleToFile.move
            ),
            applyAni(
              'button:disabled, .pixel-btn:disabled, [aria-disabled="true"], .disabled, .unavailable',
              roleToFile.unavailable
            ),
            applyAni(
              ".badge, .pin, .pinned, .candle, .blink, #statusDot",
              roleToFile.pin
            ),
          ]).catch(() => {});
        if (window.requestIdleCallback) requestIdleCallback(() => applyLater());
        else setTimeout(applyLater, 1500);

        // Expose cursor control API
        window.setBusyCursor = (on) => {
          const id = "ani-busy-toggle";
          let busyStyle = document.getElementById(id);
          if (on) {
            if (!busyStyle) {
              busyStyle = document.createElement("style");
              busyStyle.id = id;
              document.head.appendChild(busyStyle);
            }
            busyStyle.textContent = `html, body, * { cursor: auto !important; }`;
            applyAni("html, body, *", roleToFile.busy);
          } else if (busyStyle) {
            busyStyle.remove();
          }
        };

        window.setWorkingCursor = (on) => {
          const id = "ani-working-toggle";
          let w = document.getElementById(id);
          if (on) {
            if (!w) {
              w = document.createElement("style");
              w.id = id;
              document.head.appendChild(w);
            }
            w.textContent = `html, body, * { cursor: auto !important; }`;
            applyAni("html, body, *", roleToFile.working);
          } else if (w) {
            w.remove();
          }
        };

        // Dynamic cursor switching for different contexts
        window.setGameCursor = (mode) => {
          const id = "ani-game-cursor";
          let gameStyle = document.getElementById(id);
          if (mode && roleToFile[mode]) {
            if (!gameStyle) {
              gameStyle = document.createElement("style");
              gameStyle.id = id;
              document.head.appendChild(gameStyle);
            }
            gameStyle.textContent = `.memory-card, .gacha-card, .heart-zone { cursor: auto !important; }`;
            applyAni(
              ".memory-card, .gacha-card, .heart-zone",
              roleToFile[mode]
            );
          } else if (gameStyle) {
            gameStyle.remove();
          }
        };
      };

      if (window.requestIdleCallback) requestIdleCallback(() => boot());
      else setTimeout(() => boot(), 1500);
    } catch (_) {
      // If anything fails (e.g., no module), do nothing; site still works.
    }
  }

  // ====== OPTIMIZED GACHA SYSTEM ======
  function initMikuGacha() {
    const poolReady = () =>
      Array.isArray(MIKU_IMAGES) && MIKU_IMAGES.length > 0;

    // Cached DOM elements
    const elements = {
      tokens: byId("gachaTokens"),
      pull1: byId("gachaPull1"),
      pull10: byId("gachaPull10"),
      daily: byId("gachaDaily"),
      convert: byId("gachaConvert"),
      results: byId("gachaResults"),
      dexBtn: byId("gachaCollectionBtn"),
      dex: byId("mikuDex"),
    };

    // Early return if elements missing
    if (!Object.values(elements).every((el) => el)) return;

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
      elements.tokens.textContent = String(tokens);
    }
    updateTokens(tokens);

    // Improve Daily Ticket UX: disable/label when claimed, show time until next
    function msUntilMidnight() {
      const now = new Date();
      const next = new Date(now);
      next.setHours(24, 0, 0, 0);
      return Math.max(0, next - now);
    }
    function fmtHhMm(ms) {
      const m = Math.ceil(ms / 60000);
      const hh = Math.floor(m / 60);
      const mm = m % 60;
      return (hh > 0 ? `${hh}h ` : "") + `${mm}m`;
    }
    function updateDailyBtn() {
      const btn = elements.daily;
      if (!btn) return;
      const last = localStorage.getItem(LS_DAILY);
      const today = new Date().toDateString();
      if (last === today) {
        btn.disabled = true;
        const left = msUntilMidnight();
        btn.textContent = `Claimed ✓ (${fmtHhMm(left)})`;
      } else {
        btn.disabled = false;
        btn.textContent = C.games?.gachaDailyLabel || "Daily Ticket";
      }
    }
    // Update label every minute so countdown stays fresh
    updateDailyBtn();
    try {
      if (window.setIntervalTracked) setIntervalTracked(updateDailyBtn, 60000);
      else setInterval(updateDailyBtn, 60000);
    } catch (_) {}

    function hashCode(s) {
      let h = 0;
      for (let i = 0; i < s.length; i++) {
        h = (h << 5) - h + s.charCodeAt(i);
        h |= 0;
      }
      return h >>> 0;
    }
    function rarityFor(url) {
      try {
        if (typeof window.getMikuMeta === "function") {
          const meta = window.getMikuMeta(url, true);
          if (meta && typeof meta.rarity === "number") return meta.rarity;
        }
      } catch (_) {}
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
      try {
        const meta = typeof window.getMikuMeta === "function" ? window.getMikuMeta(card.url, true) : null;
        if (meta && meta.song) prev.song = meta.song;
        if (meta && meta.multiplier) prev.multiplier = meta.multiplier;
      } catch (_) {}
      if (!prev.multiplier) prev.multiplier = card.rarity;
      collection[id] = prev;
      localStorage.setItem(LS_COLL, JSON.stringify(collection));
      try {
        // If this card grants a song, hint to the player that Jukebox updated
        if (prev.song) {
          loveToast("New song unlocked in Jukebox! 🎶");
          if (window.Jukebox && typeof Jukebox.attachHudSelect === 'function') {
            // Refresh HUD label with current selection
            setTimeout(()=>{ try{ Jukebox.attachHudSelect(); }catch(_){ } }, 200);
          }
        }
      } catch(_){}
      return prev.count === 1;
    }

    function pickRandom() {
      // Weight by rarity with slight bias toward higher rarity cards
      const weights = { 1: 10, 2: 15, 3: 30, 4: 25, 5: 19, 6: 1 };
      const buckets = {};
      for (const url of MIKU_IMAGES) {
        const r = rarityFor(url);
        (buckets[r] ||= []).push(url);
      }
      let total = 0;
      for (const k of Object.keys(weights)) {
        const num = Number(k);
        if (buckets[num] && buckets[num].length) total += weights[num];
      }
      let r = Math.random() * total;
      let pickedR = 1;
      for (const k of Object.keys(weights).map(Number)) {
        const w = buckets[k] && buckets[k].length ? weights[k] : 0;
        if (r < w) {
          pickedR = k;
          break;
        }
        r -= w;
      }
      const pool = buckets[pickedR] && buckets[pickedR].length ? buckets[pickedR] : MIKU_IMAGES;
      const url = pool[Math.floor(Math.random() * pool.length)];
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
      // initially render placeholders for a staged reveal
      elements.results.innerHTML = cards
        .map((c, i) => {
          return `
          <div class="gacha-card placeholder rarity-${
            c.rarity
          }" data-index="${i}">
            <div class="gacha-stars">${stars(c.rarity)}</div>
            <div class="gacha-placeholder">?</div>
          </div>
        `;
        })
        .join("");

      // play roll SFX
      try {
        SFX.play("gacha.roll");
      } catch (e) {}

      // stagger reveal with pop sounds; reveal image and NEW badge
      cards.forEach((c, i) => {
        setTimeout(() => {
          const cardEl = elements.results.querySelector(
            `.gacha-card[data-index="${i}"]`
          );
          if (!cardEl) return;
          const isNew = addToCollection(c);
          const newBadge = isNew ? '<div class="gacha-new">NEW!</div>' : "";
          cardEl.classList.remove("placeholder");
          cardEl.innerHTML = `\n            <div class="gacha-stars">${stars(
            c.rarity
          )}</div>\n            ${newBadge}\n            <img src="${
            c.url
          }" alt="Miku card" loading="lazy" />\n          `;
          // reveal and pop SFX
          try {
            if (i === 0) SFX.play("gacha.reveal");
          } catch (e) {}
          // pop SFX and reveal change
          try {
            SFX.play("gacha.pop");
          } catch (e) {}
          // special fanfare for high rarity
          if (c.rarity >= 4) {
            try {
              SFX.play("gacha.high");
            } catch (e) {}
            // lightweight glow using transform + brightness (avoid box-shadow anim)
            cardEl.animate(
              [
                { transform: "scale(1)", filter: "brightness(1.0)" },
                { transform: "scale(1.03)", filter: "brightness(1.12)" },
              ],
              { duration: 500, easing: "ease-out" }
            );
          }
        }, 180 * i + 200);
      });

      // small pop when all revealed
      setTimeout(() => {
        elements.results.animate(
          [{ transform: "scale(0.98)" }, { transform: "scale(1)" }],
          { duration: 220, easing: "ease-out" }
        );
        renderDex();
        // If pull was super weak (no ★★★ or higher), play fail sting
        try {
          const maxR = Math.max.apply(
            null,
            cards.map((x) => x.rarity || 1)
          );
          if (!isFinite(maxR) || maxR <= 2) SFX.play("gacha.fail");
        } catch (_) {}
      }, 200 + cards.length * 180);
    }

  function renderDex() {
      const LS_FILTER = "gacha.dexFilter";
      let filters = { scope: "all", rarity: "all", search: "" };
      try {
        const f = JSON.parse(localStorage.getItem(LS_FILTER) || "{}");
        if (f && typeof f === "object") filters = { ...filters, ...f };
      } catch (_) {}

      const applySearch = (url) => {
        if (!filters.search) return true;
        const q = filters.search.toLowerCase();
        try {
          const meta = typeof window.getMikuMeta === "function" ? window.getMikuMeta(url, true) : null;
          if (meta) {
            if ((meta.name || "").toLowerCase().includes(q)) return true;
            if (Array.isArray(meta.alt_names) && meta.alt_names.some((n) => (n || "").toLowerCase().includes(q))) return true;
          }
        } catch (_) {}
        const base = (url.split("/").pop() || url).toLowerCase();
        return base.includes(q);
      };
      const minR = filters.rarity === "all" ? 0 : parseInt(filters.rarity, 10);
      const pool = MIKU_IMAGES.filter((url) => {
        const own = !!collection[url];
        if (filters.scope === "owned" && !own) return false;
        const r = rarityFor(url);
        if (minR && r < minR) return false;
        if (!applySearch(url)) return false;
        return true;
      });

      const tiles = pool
        .map((url) => {
          const entry = collection[url];
          const owned = !!entry;
          const r = rarityFor(url);
          const meta = typeof window.getMikuMeta === "function" ? window.getMikuMeta(url, true) : null;
          const name = meta ? meta.name || "Miku" : "Miku";
          const ownClass = owned ? `owned rarity-${r}` : "locked";
          const count = owned
            ? `<span class=\"dex-count\">x${entry.count}</span>`
            : `<span class=\"dex-locked\">?</span>`;
          const vid = (meta && meta.song && (meta.song.match(/(?:v=|be\/)\b([a-zA-Z0-9_-]{11})/)||[])[1]) || '';
          const links = Array.isArray(meta?.links) ? meta.links.slice(0,2) : [];
          const linkHtml = links.map((l,i)=>`<a href=\"${l}\" target=\"_blank\" rel=\"noopener\" class=\"dex-link\">Link ${i+1}</a>`).join('');
          return `
          <div class=\"dex-card ${ownClass}\" data-url=\"${url}\" tabindex=\"0\">
            <div class=\"dex-stars\">${stars(r)}</div>
            ${count}
            <img src=\"${url}\" alt=\"${name}\" loading=\"lazy\" />
            <div class=\"dex-name\">${name}</div>
            <div class=\"dex-details\" hidden>
              <div class=\"dex-title\">${name}</div>
              <div class=\"dex-rarity\">${'★'.repeat(r)}</div>
              ${meta?.description ? `<div class=\"dex-desc\">${meta.description}</div>` : ''}
              ${vid ? `<div class=\"dex-video\"><iframe src=\"https://www.youtube.com/embed/${vid}\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen loading=\"lazy\"></iframe></div>`:''}
              ${linkHtml?`<div class=\"dex-links\">${linkHtml}</div>`:''}
            </div>
          </div>`;
        })
        .join("");

      const ownedCount = Object.keys(collection).length;
      const showing = pool.length;
      elements.dex.innerHTML = `
        <div class=\"dex-pokedex\">
          <div class=\"dex-header\">MikuDex • Owned: ${ownedCount} / ${MIKU_IMAGES.length}</div>
          <div class=\"dex-controls\">
            <label for="dexScope">Scope</label>
            <select id="dexScope">
              <option value="all" ${
                filters.scope === "all" ? "selected" : ""
              }>All</option>
              <option value="owned" ${
                filters.scope === "owned" ? "selected" : ""
              }>Owned</option>
            </select>
            <label for="dexRarity">Rarity</label>
            <select id="dexRarity">
              <option value="all" ${
                filters.rarity === "all" ? "selected" : ""
              }>All</option>
              <option value="5" ${
                filters.rarity === "5" ? "selected" : ""
              }>★★★★★+</option>
              <option value="4" ${
                filters.rarity === "4" ? "selected" : ""
              }>★★★★+</option>
              <option value="3" ${
                filters.rarity === "3" ? "selected" : ""
              }>★★★+</option>
              <option value="2" ${
                filters.rarity === "2" ? "selected" : ""
              }>★★+</option>
              <option value="1" ${
                filters.rarity === "1" ? "selected" : ""
              }>★+</option>
            </select>
            <label for="dexSearch">Search</label>
            <input id="dexSearch" type="search" placeholder="name..." value="${(
              filters.search || ""
            ).replaceAll('"', "&quot;")}" />
            <div class="spacer"></div>
            <div style="font-weight:800;color:#596286">Showing: ${showing}</div>
          </div>
          <div class=\"dex-grid\">${tiles}</div>
        </div>`;

      // Bind control events
      const scopeSel = elements.dex.querySelector("#dexScope");
      const raritySel = elements.dex.querySelector("#dexRarity");
      const searchInp = elements.dex.querySelector("#dexSearch");
      const save = () =>
        localStorage.setItem(LS_FILTER, JSON.stringify(filters));
      if (scopeSel)
        scopeSel.addEventListener("change", () => {
          filters.scope = scopeSel.value;
          save();
          renderDex();
        });
      if (raritySel)
        raritySel.addEventListener("change", () => {
          filters.rarity = raritySel.value;
          save();
          renderDex();
        });
      if (searchInp)
        searchInp.addEventListener("input", () => {
          filters.search = searchInp.value || "";
          save();
          setTimeout(renderDex, 0);
        });

      // Card click to open modal or inline details
      elements.dex.querySelectorAll('.dex-card').forEach((card)=>{
        card.addEventListener('click',()=>{
          const url = card.getAttribute('data-url');
          if (url) { openImageModal(url); return; }
        });
        card.addEventListener('keydown',(e)=>{
          if (e.key==='Enter' || e.key===' ') {
            e.preventDefault();
            const url = card.getAttribute('data-url');
            if (url) openImageModal(url);
          }
        });
      });
    }

    function pull(n) {
      if (!poolReady()) {
        loveToast("画像の読み込み中…");
        return;
      }
      if (tokens < n) {
        loveToast("チケットが足りないよ！");
        try {
          SFX.play("gacha.fail");
        } catch (_) {}
        return;
      }
      try {
        window.setBusyCursor && window.setBusyCursor(true);
      } catch (_) {}
      updateTokens(tokens - n);
      const cards = Array.from({ length: n }, () => pickRandom());
      if (n >= 10) guaranteeAtLeast(3, cards);
      renderResults(cards);
      // remove busy cursor after reveals finish
      setTimeout(() => {
        try {
          window.setBusyCursor && window.setBusyCursor(false);
        } catch (_) {}
      }, 300 + n * 200);
    }

    elements.pull1.addEventListener("click", () => ensurePool(() => pull(1)));
    elements.pull10.addEventListener("click", () => ensurePool(() => pull(10)));
    elements.daily.addEventListener("click", () => {
      const last = localStorage.getItem(LS_DAILY);
      const today = new Date().toDateString();
      if (last === today) {
        loveToast("今日はもう受け取ったよ！");
        try {
          SFX.play("ui.unavailable");
        } catch (_) {}
        return;
      }
      localStorage.setItem(LS_DAILY, today);
      updateTokens(tokens + 1);
      loveToast("デイリーチケット＋1！");
      try {
        SFX.play("ui.select");
      } catch (_) {}
      updateDailyBtn();
    });
    elements.convert.addEventListener("click", () => {
      const convertCost = 100;
      if (heartCount < convertCost) {
        loveToast(`💖が足りないよ！(${convertCost}必要)`);
        try {
          SFX.play("ui.unavailable");
        } catch (_) {}
        return;
      }
      heartCount -= convertCost;
      localStorage.setItem("pixelbelle-hearts", heartCount);
      updateCounters();
      updateTokens(tokens + 1);
      loveToast("💖→チケット +1");
      try {
        SFX.play("ui.scoreTally");
        SFX.play("extra.kick", { volume: 0.4 });
      } catch (_) {}
    });
    elements.dexBtn.addEventListener("click", () => {
      elements.dex.classList.toggle("hidden");
      renderDex();
      elements.dexBtn.textContent = elements.dex.classList.contains("hidden")
        ? "Open MikuDex"
        : "Close MikuDex";
      if (!elements.dex.classList.contains("hidden")) {
        elements.dex.classList.add("dex-open");
        setTimeout(
          () => elements.dex && elements.dex.classList.remove("dex-open"),
          500
        );
      }
      try {
        SFX.play("ui.change");
        if (Math.random() < 0.3) SFX.play("extra.fx1");
      } catch (_) {}
    });

    ensurePool(() => renderDex());
  }
  // ====== MAIN SITE INITIALIZATION ======
  function initSite() {
    applyContent();
    initNavigation();
    initStatusBar();
    // Start BGM first; radio will override if user plays it
    try {
      if (window.AudioMod) { AudioMod.initBgm(); AudioMod.initRadio(); }
      else { initBgm && initBgm(); initRadio && initRadio(); }
    } catch (_) {}
    initSocials();
    initJpGames();
    initGames();
    initShrine();
    initFriends();
    initCursorEffects();
    initPeriodicUpdates();
    initFloatingHearts();
    initPassiveHearts();
    updateCounters();
    loadSavedData();
    initAniCursors();
    initEnhancedCursors();
    try {
      applySinger();
    } catch (_) {}
    console.log("PixelBelle's Garden initialized! 🌸");
    // Global ESC for overlays: image modal and song select
    document.addEventListener('keydown',(e)=>{
      if (e.key === 'Escape') {
        try { const m = document.getElementById('imageModal'); if (m && m.classList.contains('open')) m.classList.remove('open'); } catch(_){}
        try { const ov = document.getElementById('songSelectOverlay'); if (ov) ov.remove(); } catch(_){ }
      }
    });
    // Preload a minimal set of critical SFX buffers in the background
    try {
      if (window.SFX && typeof window.SFX.preloadFirst === "function") {
        const keys = [
          "ui.move",
          "hearts.click",
          "gacha.roll",
          "gacha.pop",
          "foot.step",
        ];
        if (window.requestIdleCallback)
          requestIdleCallback(() =>
            window.SFX.preloadFirst(keys, { perTick: 1, delay: 300 })
          );
        else
          setTimeout(
            () => window.SFX.preloadFirst(keys, { perTick: 1, delay: 300 }),
            2000
          );
      }
    } catch (_) {}
  }

  // ====== BGM (Autoplay on load, stops when radio starts) ======
  function initBgm() {
    try {
      // Preference: set localStorage 'pixelbelle-auto-music' = '0' to disable
      const AUTO_KEY = "pixelbelle-auto-music";
      const autoPref = localStorage.getItem(AUTO_KEY);
      const autoOn = autoPref == null ? true : autoPref === "1";
      if (!autoOn) return;

      // If already initialized in this session, skip
      if (window.__bgmAudio) return;

      const bgm = new Audio("./assets/bgm.ogg");
      bgm.loop = true;
      bgm.preload = "auto";
      bgm.volume = 0.35;
      window.__bgmAudio = bgm;
      window.__bgmKilled = false; // set to true once radio starts or bgm is permanently stopped

      function tryPlay() {
        if (window.__bgmKilled) return;
        bgm.play().catch(() => {
          // Autoplay may be blocked; wait for first gesture
        });
      }

      // Attempt immediately after site enter
      tryPlay();

      // Fallback: resume on first user interaction if blocked
      const resumeOnInteract = () => {
        if (window.__bgmKilled) {
          cleanupResume();
          return;
        }
        if (bgm.paused) {
          bgm.play().catch(() => {});
        }
        cleanupResume();
      };
      function cleanupResume() {
        document.removeEventListener("click", resumeOnInteract);
        document.removeEventListener("keydown", resumeOnInteract);
        document.removeEventListener("touchstart", resumeOnInteract);
      }
      document.addEventListener("click", resumeOnInteract, { passive: true });
      document.addEventListener("keydown", resumeOnInteract, { passive: true });
      document.addEventListener("touchstart", resumeOnInteract, {
        passive: true,
      });

      // Expose a stopper for radio to call
      window.__stopBgm = (permanent = true) => {
        try {
          bgm.pause();
        } catch (_) {}
        try {
          bgm.currentTime = 0;
        } catch (_) {}
        if (permanent) window.__bgmKilled = true;
      };
    } catch (_) {}
  }

  // ====== ENHANCED CURSOR INTERACTIONS ======
  function initEnhancedCursors() {
    // Optimized memory game cursor switching with delegation
    let lastHoverTime = 0;
    document.addEventListener(
      "mouseover",
      (e) => {
        const now = Date.now();
        if (now - lastHoverTime > 50) {
          // Throttle hover events
          if (e.target.classList.contains("memory-card")) {
            try {
              window.setGameCursor && window.setGameCursor("precision");
            } catch (_) {}
          }
          lastHoverTime = now;
        }
      },
      { passive: true }
    );

    // Note: removed global fetch override (was toggling working cursor on every fetch)
    // to avoid recursion with ANI loader and excessive style churn.

    // Optimized dynamic cursor with passive listeners and delegation
    let lastClickTime = 0;
    document.addEventListener(
      "click",
      (e) => {
        const now = Date.now();
        if (now - lastClickTime > 50) {
          // Throttle clicks
          const target = e.target;

          // Heart zone gets special cursor
          if (target.id === "heartZone") {
            try {
              window.setGameCursor && window.setGameCursor("alternate");
            } catch (_) {}
            setTimeout(() => {
              try {
                window.setGameCursor && window.setGameCursor(null);
              } catch (_) {}
            }, 300);
          }

          // Memory cards get precision
          if (target.classList.contains("memory-card")) {
            try {
              window.setGameCursor && window.setGameCursor("precision");
            } catch (_) {}
            setTimeout(() => {
              try {
                window.setGameCursor && window.setGameCursor(null);
              } catch (_) {}
            }, 500);
          }
          lastClickTime = now;
        }
      },
      { passive: true }
    );
  }

  // ====== JP GAMES (Project Diva style) ======
  function initJpGames() {
    const host = (C.jpGames && C.jpGames.api) || {};
    const container = document.getElementById("jpGames");
    if (!container) return;

    // Remove section heading; build Start Menu layout + hidden game cards
    const studyHeading = document.querySelector("#study h2");
    if (studyHeading) studyHeading.style.display = "none";

  container.innerHTML = /*html*/ `
      <div class="study-card" id="startCard" style="position:relative;min-height:260px;display:flex;align-items:center;justify-content:center;overflow:hidden;">
        <div id="jpMikus" class="floating-mikus" style="position:absolute;right:10px;top:10px;pointer-events:none"></div>
        <div id="startMenu" class="start-menu">
          <div class="menu-grid" id="jpMenuGrid" tabindex="0" aria-label="Game Select">
            <button id="startVocab" class="pixel-btn menu-tile" data-idx="0" data-label="📝 Vocabulary Pop!">📝 Vocabulary Pop!</button>
            <button id="startKanji" class="pixel-btn menu-tile" data-idx="1" data-label="漢字 Master!">漢字 Master!</button>
            <button id="startKotoba" class="pixel-btn menu-tile" data-idx="2" data-label="💬 Miku × chat">💬 Miku × chat</button>
            <button id="openSongSelect" class="pixel-btn menu-tile" data-idx="3" data-label="🎶 Song Select">🎶 Song Select</button>
          </div>
          <div id="unlockProgress" style="margin-top:10px">
            <div style="font-weight:800;color:#596286;margin-bottom:4px">Song Unlocks</div>
            <div style="background:#eee;border:2px solid var(--border);border-radius:10px;height:12px;overflow:hidden;position:relative">
              <div id="unlockFill" style="height:100%;background:linear-gradient(90deg,#6bc3ff,#a594f9);width:0%"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="study-card" id="vocabCard" style="display:none">
        <div id="vocabMeta" style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;color:#596286;font-size:12px;margin-bottom:6px">
          <div class="mode-options">
            <button class="pixel-btn mode-option" data-mode="jp-en">JP → EN</button>
            <button class="pixel-btn mode-option" data-mode="en-jp">EN → JP</button>
          </div>
          <button id="vocabTimedToggle" class="pixel-btn mode-toggle" data-on="0" style="display:none">Timed: OFF</button>
          <div style="margin-left:auto">Streak: <span id="vocabStreak">0</span> (Best: <span id="vocabBestStreak">0</span>)</div>
          <div id="vocabTimerWrap" style="display:none">⏱️ <span id="vocabTimer">15</span>s • Best: <span id="vocabBestTime">-</span></div>
        </div>
        <div id="vocabQuestion">Pick a mode to start…</div>
        <div id="vocabChoices" class="rhythm-grid" style="display:grid;grid-template-columns:repeat(2,1fr);grid-template-rows:repeat(2,1fr);gap:12px;margin-top:12px;min-height:200px;"></div>
        <div id="vocabFeedback" style="min-height:22px;margin-top:6px;color:#596286"></div>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px"><div style="font-weight:800">Score: <span id="vocabScore">0</span></div><button id="vocabBack" class="pixel-btn">⟵ Menu</button></div>
      </div>
      <div class="study-card" id="kanjiCard" style="display:none">
        <div id="kanjiMeta" style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;color:#596286;font-size:12px;margin-bottom:6px">
          <div class="mode-options">
            <button class="pixel-btn mode-option" data-mode="meaning">Meaning → Kanji</button>
            <button class="pixel-btn mode-option" data-mode="reading">Kanji → Reading</button>
          </div>
          <button id="kanjiTimedToggle" class="pixel-btn mode-toggle" data-on="0" style="display:none">Timed: OFF</button>
          <div style="margin-left:auto">Streak: <span id="kanjiStreak">0</span> (Best: <span id="kanjiBestStreak">0</span>)</div>
          <div id="kanjiTimerWrap" style="display:none">⏱️ <span id="kanjiTimer">15</span>s • Best: <span id="kanjiBestTime">-</span></div>
        </div>
        <div id="kanjiQuestion">Pick a mode to start…</div>
        <div id="kanjiChoices" class="rhythm-grid" style="display:grid;grid-template-columns:repeat(2,1fr);grid-template-rows:repeat(2,1fr);gap:12px;margin-top:12px;min-height:200px;"></div>
        <div id="kanjiFeedback" style="min-height:22px;margin-top:6px;color:#596286"></div>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px"><div style="font-weight:800">Score: <span id="kanjiScore">0</span></div><button id="kanjiBack" class="pixel-btn">⟵ Menu</button></div>
      </div>
      <div class="study-card" id="kotobaCard" style="display:none">
        <div id="kotobaChat" style="display:flex;flex-direction:column;gap:8px;min-height:90px"></div>
        <div id="kotobaChoices" class="rhythm-grid" style="display:grid;grid-template-columns:repeat(2,1fr);grid-template-rows:repeat(2,1fr);gap:12px;margin-top:12px;min-height:200px;"></div>
        <div style="display:flex;gap:8px;align-items:center;justify-content:space-between;margin-top:8px">
          <button id="kotobaStart" class="pixel-btn">Start</button>
          <div style="font-weight:800">Score: <span id="kotobaScore">0</span></div>
          <button id="kotobaBack" class="pixel-btn">⟵ Menu</button>
        </div>
      </div>
      <div class="study-card">
       <div class="word-of-day">
          <span class="japanese"></span>
          <span class="romaji"></span>
          <span class="meaning"></span>
          <button class="pixel-btn" id="nextWod" style="margin-top:8px">Next Word</button>
        </div>
      </div>

      <div class="study-card" id="wodCard">
        <div class="social-embed" style="margin-top:10px; border-radius:12px; overflow:hidden; height: 600px;">
          <iframe id="wodIframe" src="${
            C.study && C.study.wordOfDay && C.study.wordOfDay.externalIframe
              ? C.study.wordOfDay.externalIframe
              : "https://kanjiday.com/kanji/"
          }" style="border:0;width:100%;height:100%" loading="lazy" referrerpolicy="no-referrer"></iframe>
        </div>
      </div>
    `;

  // Mount modular game logic onto newly created DOM cards
  try { window.Games && Games.vocab && typeof Games.vocab.mount === 'function' && Games.vocab.mount(); } catch(_){}
  try { window.Games && Games.kanji && typeof Games.kanji.mount === 'function' && Games.kanji.mount(); } catch(_){}
  try { window.Games && Games.kotoba && typeof Games.kotoba.mount === 'function' && Games.kotoba.mount(); } catch(_){}

    // Pre-start settings overlay (centralizes difficulty, timer, metronome, BPM, and game mode)
    (function ensureSettingsOverlay() {
      let ov = document.getElementById("jpSettingsOverlay");
      if (!ov) {
        ov = document.createElement("div");
        ov.id = "jpSettingsOverlay";
        ov.style.cssText =
          "position:fixed;inset:0;background:rgba(0,0,0,.35);display:none;align-items:center;justify-content:center;z-index:9999;";
        ov.innerHTML = /*html*/ `
          <div class="settings-panel" style="background:#fff;border:3px solid var(--border);border-radius:12px;box-shadow:var(--shadow);max-width:640px;width:92%;padding:14px 16px;position:relative;">
            <h3 style="margin:0 0 8px 0">Game Settings</h3>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">
              <div>
                <label style="font-weight:700;display:block;margin-bottom:4px">Game</label>
                <div style="display:flex;gap:6px;flex-wrap:wrap">
                  <button class="pixel-btn" data-game="vocab" id="setGameVocab">Vocab</button>
                  <button class="pixel-btn" data-game="kanji" id="setGameKanji">Kanji</button>
                  <button class="pixel-btn" data-game="kotoba" id="setGameKotoba">Kotoba</button>
                </div>
              </div>
              <div style="margin-left:auto">
                <button class="pixel-btn" id="closeSettings">✕</button>
              </div>
            </div>
            <div style="display:grid;grid-template-columns:1fr;gap:10px">
              <div id="diffRow">
                <label style="font-weight:700">Difficulty: <span id="setDiffLabel">3</span></label>
                <input id="setDifficulty" type="range" min="1" max="9" step="1" value="3" style="width:100%" />
                <div id="kanjiDiffNote" style="font-size:12px;color:#596286;margin-top:4px">Kanji Grade: <span id="kanjiGradeLabel">-</span></div>
              </div>
              <div id="vocabRow">
                <label style="font-weight:700">Vocab Direction</label>
                <div style="display:flex;gap:8px;flex-wrap:wrap">
                  <label><input type="radio" name="vdir" value="jp-en" checked /> JP → EN</label>
                  <label><input type="radio" name="vdir" value="en-jp" /> EN → JP</label>
                </div>
              </div>
              <div id="kanjiRow" style="display:none">
                <label style="font-weight:700">Kanji Mode</label>
                <div style="display:flex;gap:8px;flex-wrap:wrap">
                  <label><input type="radio" name="kmode" value="meaning" checked /> Meaning → Kanji</label>
                  <label><input type="radio" name="kmode" value="reading" /> Kanji → Reading</label>
                </div>
              </div>
              <div id="rhythmRow" style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
                <button class="pixel-btn" id="setRhythmBtn" data-on="1">Rhythm Effects: ON</button>
                <button class="pixel-btn" id="setRingsBtn" data-on="1">Stage Rings: ON</button>
                <button class="pixel-btn" id="setTimedBtn" data-on="0">Timed: OFF</button>
              </div>
            </div>
            <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:10px">
              <button class="pixel-btn" id="cancelSettings">Cancel</button>
              <button class="pixel-btn" id="startGameBtn">Start ▶</button>
            </div>
          </div>
        `;
        document.body.appendChild(ov);

        // Wiring
        const setGameButtons = [
          ov.querySelector('#setGameVocab'),
          ov.querySelector('#setGameKanji'),
          ov.querySelector('#setGameKotoba'),
        ];
        const diffInput = ov.querySelector('#setDifficulty');
        const diffLabel = ov.querySelector('#setDiffLabel');
        const kgLabel = ov.querySelector('#kanjiGradeLabel');
        const vocabRow = ov.querySelector('#vocabRow');
        const kanjiRow = ov.querySelector('#kanjiRow');
  const timedBtn = ov.querySelector('#setTimedBtn');
  const rhythmBtn = ov.querySelector('#setRhythmBtn');
  const ringsBtn = ov.querySelector('#setRingsBtn');

        function gradeFromDiff(v) {
          // Map 1-9 difficulty to school grades 1-6
          const map = { 1: 1, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 6, 9: 6 };
          return map[String(v)] || 3;
        }
        function updateKanjiGradeLabel() {
          const v = parseInt(diffInput.value || '3', 10);
          const g = gradeFromDiff(v);
          kgLabel.textContent = String(g);
        }
        function selectGame(id) {
          ov.setAttribute('data-game', id);
          setGameButtons.forEach((b) => {
            if (!b) return;
            const on = b.getAttribute('data-game') === id;
            b.classList.toggle('active', on);
          });
          vocabRow.style.display = id === 'vocab' ? 'block' : 'none';
          kanjiRow.style.display = id === 'kanji' ? 'block' : 'none';
        }
        setGameButtons.forEach((b) => b && b.addEventListener('click', () => selectGame(b.getAttribute('data-game'))));

        // Init values from LS
        const savedDiff = (typeof window.getJpDifficulty === 'function' ? window.getJpDifficulty() : 3) || 3;
        diffInput.value = String(savedDiff);
        diffLabel.textContent = String(savedDiff);
        updateKanjiGradeLabel();
        diffInput.addEventListener('input', () => {
          diffLabel.textContent = diffInput.value;
          updateKanjiGradeLabel();
        });
        // Vocab dir
        const vdir = localStorage.getItem('vocab.direction') || 'jp-en';
        const vdirEls = ov.querySelectorAll('input[name="vdir"]');
        vdirEls.forEach((r) => (r.checked = r.value === vdir));
        // Kanji mode
        const kmode = localStorage.getItem('kanji.mode') || 'meaning';
        const kmodeEls = ov.querySelectorAll('input[name="kmode"]');
        kmodeEls.forEach((r) => (r.checked = r.value === kmode));
        // Rhythm toggles (no BPM UI in this design)
        const savedRhythm = localStorage.getItem('rhythm.met') === '1';
        const savedRings = localStorage.getItem('rhythm.rings') !== '0'; // default ON
        const savedAssist = localStorage.getItem('assist.on') === '1';
        const savedNoFail = localStorage.getItem('nofail.on') === '1';
        if (rhythmBtn) {
          rhythmBtn.setAttribute('data-on', savedRhythm ? '1' : '0');
          rhythmBtn.textContent = `Rhythm Effects: ${savedRhythm ? 'ON' : 'OFF'}`;
          rhythmBtn.addEventListener('click', () => {
            const on = rhythmBtn.getAttribute('data-on') !== '1';
            rhythmBtn.setAttribute('data-on', on ? '1' : '0');
            rhythmBtn.textContent = `Rhythm Effects: ${on ? 'ON' : 'OFF'}`;
          });
        }
        if (ringsBtn) {
          ringsBtn.setAttribute('data-on', savedRings ? '1' : '0');
          ringsBtn.textContent = `Stage Rings: ${savedRings ? 'ON' : 'OFF'}`;
          ringsBtn.addEventListener('click', () => {
            const on = ringsBtn.getAttribute('data-on') !== '1';
            ringsBtn.setAttribute('data-on', on ? '1' : '0');
            ringsBtn.textContent = `Stage Rings: ${on ? 'ON' : 'OFF'}`;
          });
        }
        // Apply globals immediately so effects align with saved state
        window.__rhythmMet = !!savedRhythm;
        window.__rhythmRings = !!savedRings;
        window.__assistMode = !!savedAssist;
        window.__noFail = !!savedNoFail;
        // Create Assist/No-Fail toggles if missing
        const assistBtn = document.getElementById('setAssistBtn');
        if (assistBtn) {
          assistBtn.setAttribute('data-on', savedAssist ? '1' : '0');
          assistBtn.textContent = `Assist: ${savedAssist ? 'ON' : 'OFF'}`;
          assistBtn.onclick = () => {
            const on = assistBtn.getAttribute('data-on') !== '1';
            assistBtn.setAttribute('data-on', on ? '1' : '0');
            assistBtn.textContent = `Assist: ${on ? 'ON' : 'OFF'}`;
          };
        }
        const nofailBtn = document.getElementById('setNoFailBtn');
        if (nofailBtn) {
          nofailBtn.setAttribute('data-on', savedNoFail ? '1' : '0');
          nofailBtn.textContent = `No‑Fail: ${savedNoFail ? 'ON' : 'OFF'}`;
          nofailBtn.onclick = () => {
            const on = nofailBtn.getAttribute('data-on') !== '1';
            nofailBtn.setAttribute('data-on', on ? '1' : '0');
            nofailBtn.textContent = `No‑Fail: ${on ? 'ON' : 'OFF'}`;
          };
        }
        // Timed uses per-game key; we'll update when opening
        function openWith(game) {
          selectGame(game);
          const key = game === 'kanji' ? 'kanji.timed' : game === 'vocab' ? 'vocab.timed' : 'kotoba.timed';
          const tSaved = localStorage.getItem(key) === '1';
          timedBtn.setAttribute('data-on', tSaved ? '1' : '0');
          timedBtn.textContent = `Timed: ${tSaved ? 'ON' : 'OFF'}`;
          timedBtn.onclick = () => {
            const on = timedBtn.getAttribute('data-on') !== '1';
            timedBtn.setAttribute('data-on', on ? '1' : '0');
            timedBtn.textContent = `Timed: ${on ? 'ON' : 'OFF'}`;
          };
          ov.style.display = 'flex';
        }
        ov.__openWith = openWith;
        ov.querySelector('#closeSettings').addEventListener('click', () => (ov.style.display = 'none'));
        ov.querySelector('#cancelSettings').addEventListener('click', () => (ov.style.display = 'none'));
        ov.addEventListener('click', (e) => {
          if (e.target === ov) ov.style.display = 'none';
        });
        ov.querySelector('#startGameBtn').addEventListener('click', async () => {
          const game = ov.getAttribute('data-game') || 'vocab';
          const timed = ov.querySelector('#setTimedBtn').getAttribute('data-on') === '1';
          // Persist difficulty + rhythm
          const dval = parseInt(diffInput.value || '3', 10);
          try { localStorage.setItem('jp.difficulty', String(dval)); } catch (_) {}
          try { applyDiff(dval); } catch (_) {}
          // Rhythm globals (no BPM setter in UI)
          const rhythmOn = rhythmBtn ? rhythmBtn.getAttribute('data-on') === '1' : true;
          const ringsOn = ringsBtn ? ringsBtn.getAttribute('data-on') === '1' : true;
          window.__rhythmMet = !!rhythmOn; try { localStorage.setItem('rhythm.met', rhythmOn ? '1' : '0'); } catch(_) {}
          window.__rhythmRings = !!ringsOn; try { localStorage.setItem('rhythm.rings', ringsOn ? '1' : '0'); } catch(_) {}
          const assistBtn = document.getElementById('setAssistBtn');
          const nofailBtn = document.getElementById('setNoFailBtn');
          const assistOn = assistBtn ? assistBtn.getAttribute('data-on') === '1' : false;
          const nofailOn = nofailBtn ? nofailBtn.getAttribute('data-on') === '1' : false;
          window.__assistMode = assistOn; try { localStorage.setItem('assist.on', assistOn ? '1' : '0'); } catch(_) {}
          window.__noFail = nofailOn; try { localStorage.setItem('nofail.on', nofailOn ? '1' : '0'); } catch(_) {}
          // Gate start until site ready
          const startBtn = ov.querySelector('#startGameBtn');
          if (startBtn) {
            startBtn.disabled = true;
            const prev = startBtn.textContent;
            startBtn.textContent = 'Loading…';
            try { await (window.SITE_READY || Promise.resolve()); } catch(_) {}
            startBtn.textContent = prev;
            startBtn.disabled = false;
          } else {
            try { await (window.SITE_READY || Promise.resolve()); } catch(_) {}
          }
          // Per-game options
          if (game === 'vocab') {
            const dir = Array.from(vdirEls).find((r) => r.checked)?.value || 'jp-en';
            localStorage.setItem('vocab.direction', dir);
            localStorage.setItem('vocab.timed', timed ? '1' : '0');
            ov.style.display = 'none';
            startSong('vocab', dir, timed);
          } else if (game === 'kanji') {
            const mode = Array.from(kmodeEls).find((r) => r.checked)?.value || 'meaning';
            localStorage.setItem('kanji.mode', mode);
            localStorage.setItem('kanji.timed', timed ? '1' : '0');
            ov.style.display = 'none';
            startSong('kanji', mode, timed);
          } else {
            localStorage.setItem('kotoba.timed', timed ? '1' : '0');
            ov.style.display = 'none';
            startSong('kotoba');
          }
        });
      }
    })();

    // Populate static study info & WOD from API
    try {
      // Word-of-day fields live in a separate card with class .word-of-day
      const wod = document.querySelector(".word-of-day");
      if (wod) {
        const jp = wod.querySelector(".japanese");
        const ro = wod.querySelector(".romaji");
        const me = wod.querySelector(".meaning");
        const nextBtn = wod.querySelector("#nextWod");
        
        const loadWod = async () => {
          try {
            // Show loading state
            if (nextBtn) {
              nextBtn.textContent = "Loading...";
              nextBtn.disabled = true;
              nextBtn.style.opacity = "0.6";
            }
            
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
          } finally {
            // Restore button state
            if (nextBtn) {
              nextBtn.textContent = "Next Word";
              nextBtn.disabled = false;
              nextBtn.style.opacity = "1";
            }
          }
        };
        
        loadWod(); // Initial load
        if (nextBtn) {
          nextBtn.addEventListener('click', () => {
            try { SFX.play("ui.select"); } catch (_) {}
            loadWod();
          });
        }
      }
    } catch (_) {}

    const startCard = document.getElementById("startCard");
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
      try {
        SFX.play("ui.select");
      } catch (_) {}
    }
    function ensureStageVisuals(which) {
      const cardId = which + "Card";
      const card = document.getElementById(cardId);
      if (!card) return;
      // Set jacket or root.png as background on the game card
      try {
        let jacket = (window.Jukebox && Jukebox.songs && (function(){ try{ const curId = localStorage.getItem('jukebox.song'); const s = Jukebox.songs.find(x=>x.id===curId); return s && s.jacket; }catch(_){ return null; } })()) || './assets/root.png';
        card.style.backgroundImage = `url('${jacket}')`;
        card.style.backgroundSize = "cover";
        card.style.backgroundPosition = "center";
        card.style.backgroundRepeat = "no-repeat";
      } catch (_) {}
      // Soft stage floor to keep visuals cute but unobtrusive
      let floor = card.querySelector('.stage-floor');
      if (!floor) {
        floor = document.createElement('div');
        floor.className = 'stage-floor';
        floor.style.cssText = 'position:absolute;left:0;right:0;bottom:0;height:60px;background:linear-gradient(0deg, rgba(255,255,255,0.9), rgba(255,255,255,0));pointer-events:none;z-index:1;';
        card.style.position = card.style.position || 'relative';
        card.appendChild(floor);
      }
      // Ensure idol.png is on stage (bottom-left, out of the way)
      let idol = card.querySelector('.stage-idol');
      if (!idol) {
        idol = document.createElement('img');
        idol.className = 'stage-idol';
        idol.src = './assets/idol.png';
        idol.alt = 'Miku';
        idol.style.cssText = `
          position: absolute;
          left: 10px;
          bottom: 8px;
          width: 92px;
          height: auto;
          image-rendering: pixelated;
          pointer-events: none;
          z-index: 2;
          animation: idolBreathe 3s ease-in-out infinite;
          filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.25));
          transform-origin: bottom center;
        `;
        card.style.position = card.style.position || 'relative';
        card.appendChild(idol);
      }
      
      // Add stage lighting effects and theme
      let lighting = card.querySelector('.stage-lighting');
      if (!lighting) {
        lighting = document.createElement('div');
        lighting.className = 'stage-lighting';
        const theme = (function(){ try{ const curId=localStorage.getItem('jukebox.song'); const s=(Jukebox&&Jukebox.songs||[]).find(x=>x.id===curId); return (s&&s.theme)||'#a594f9'; }catch(_){ return '#a594f9'; } })();
        lighting.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(ellipse at center bottom,
            ${'rgba(255,255,255,0.12)'} 0%,
            ${'rgba(255,255,255,0.08)'} 20%,
            ${theme}22 40%,
            transparent 70%);
          pointer-events: none;
          z-index: 1;
          animation: stageLighting 4s ease-in-out infinite alternate;
        `;
        card.appendChild(lighting);
      }
    }
    function showGame(which) {
      startCard.style.display = "none";
      vocabCard.style.display = which === "vocab" ? "block" : "none";
      kanjiCard.style.display = which === "kanji" ? "block" : "none";
      kotobaCard.style.display = which === "kotoba" ? "block" : "none";
      setGameTheme(which);
      ensureStageVisuals(which);
      // No auto-start here; flow is driven by Settings overlay
    }
    // DS/PlayStation-style keyboard navigation on the game grid
    (function initMenuNav() {
      const grid = document.getElementById("jpMenuGrid");
      if (!grid) return;
      const tiles = Array.from(grid.querySelectorAll(".menu-tile"));
      // Apply cover art from SITE_CONTENT.images.menuCovers
      try {
        const covers = (C.images && C.images.menuCovers) || {};
        // Ensure URLs resolve correctly when used inside CSS variables (which resolve relative to the stylesheet)
        const toAbs = (p) => {
          try {
            if (!p) return p;
            // If already absolute (http/https/data), return as-is
            if (/^(?:https?:|data:)/i.test(p)) return p;
            // Normalize leading "./" to "/" and build an absolute URL against the site origin
            const norm = p.replace(/^\.\//, "/");
            return new URL(norm, window.location.origin).href;
          } catch (_) {
            return p;
          }
        };
        const map = {
          startVocab: toAbs(covers.vocab),
          startKanji: toAbs(covers.kanji),
          startKotoba: toAbs(covers.kotoba),
        };
        tiles.forEach((t) => {
          const id = t.id;
          if (map[id]) {
            t.classList.add("has-cover");
            t.style.setProperty("--tile-cover", `url('${map[id]}')`);
            t.style.minHeight = "140px";
            t.style.display = "grid";
            t.style.placeContent = "center";
            t.style.textAlign = "center";
            const badge = document.createElement("span");
            badge.className = "corner-badge";
            badge.textContent =
              id === "startKanji" ? "漢" : id === "startKotoba" ? "💬" : "Pop";
            t.appendChild(badge);
          }
        });
      } catch (_) {}
      let focus = 0;
      const setFocus = (i) => {
        focus = (i + tiles.length) % tiles.length;
        tiles.forEach((t, idx) => {
          if (idx === focus) t.classList.add("active");
          else t.classList.remove("active");
        });
        try {
          SFX.play("ui.move");
        } catch (_) {}
      };
      setFocus(parseInt(localStorage.getItem("jp.menu.focus") || "0", 10) || 0);
      grid.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === "d") {
          setFocus(focus + 1);
          e.preventDefault();
        } else if (e.key === "ArrowLeft" || e.key === "a") {
          setFocus(focus - 1);
          e.preventDefault();
        } else if (e.key === "ArrowDown" || e.key === "s") {
          setFocus(focus + 2);
          e.preventDefault();
        } else if (e.key === "ArrowUp" || e.key === "w") {
          setFocus(focus - 2);
          e.preventDefault();
        } else if (e.key === "Enter" || e.key === " ") {
          tiles[focus]?.click();
          e.preventDefault();
        }
      });
      tiles.forEach((t, idx) =>
        t.addEventListener("focus", () => setFocus(idx))
      );
      window.addEventListener("beforeunload", () =>
        localStorage.setItem("jp.menu.focus", String(focus))
      );
    })();
    const startVocab = document.getElementById("startVocab");
    const startKanji = document.getElementById("startKanji");
    const startKotoba = document.getElementById("startKotoba");
    if (startVocab)
      startVocab.addEventListener("click", () => {
        try { SFX.play("ui.select"); } catch (_) {}
        const ov = document.getElementById("jpSettingsOverlay");
        if (ov && ov.__openWith) ov.__openWith("vocab");
      });
    if (startKanji)
      startKanji.addEventListener("click", () => {
        try { SFX.play("ui.select"); } catch (_) {}
        const ov = document.getElementById("jpSettingsOverlay");
        if (ov && ov.__openWith) ov.__openWith("kanji");
      });
    if (startKotoba)
      startKotoba.addEventListener("click", () => {
        try { SFX.play("ui.select"); } catch (_) {}
        const ov = document.getElementById("jpSettingsOverlay");
        if (ov && ov.__openWith) ov.__openWith("kotoba");
      });
    const openSongSelectBtn = document.getElementById('openSongSelect');
    if (openSongSelectBtn) openSongSelectBtn.addEventListener('click', ()=>{ try{ Jukebox.openSongSelect(); }catch(_){ alert('Song Select unavailable'); } });
    // Unlock progress bar
    try {
      const maxReq = (Jukebox.songs||[]).reduce((m,s)=>Math.max(m,s.req||1),1);
      const lvl = (Progression && Progression.getLevel && Progression.getLevel()) || parseInt(localStorage.getItem('study.level')||'1',10)||1;
      const pct = Math.min(100, Math.round((lvl/maxReq)*100));
      const fill = document.getElementById('unlockFill'); if (fill) fill.style.width = pct+'%';
    } catch(_) {}
    if (vocabBack()) vocabBack().addEventListener("click", showMenu);
    if (kanjiBack()) kanjiBack().addEventListener("click", showMenu);
    if (kotobaBack()) kotobaBack().addEventListener("click", showMenu);

    // XP/Level + Song HUD state (Project Diva-style)
    let level = parseInt(localStorage.getItem("study.level") || "1", 10);
    let xp = parseInt(localStorage.getItem("study.xp") || "0", 10);
    const XP_PER_LEVEL = 100;
    // Level UI now lives in Diva HUD
    const levelBar = document.getElementById("hudLevelProgress");
    const levelTextP = document.getElementById("hudLevelText");
    const HUD = {
      combo: 0,
      maxCombo: 0,
      voltage: 0,
      lives: parseInt(localStorage.getItem("jp.lives") || "5", 10),
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
      if (levelTextP)
        levelTextP.textContent = /*html*/ `Level ${level} • ${pct}%`;
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
          SFX.play("ui.scoreTally");
          SFX.play("extra.clap");
        } catch (_) {}
        try {
          addHearts(1);
        } catch (_) {}
      }
      localStorage.setItem("study.level", String(level));
      localStorage.setItem("study.xp", String(xp));
      updateLevelUi();
      try { if (window.Achievements) Achievements.check(); } catch(_) {}
    }
    updateLevelUi();

    // Difficulty control (1-9) affects game behavior. Persist to LS.
    const DIFF_LS = "jp.difficulty";
    const diffInput = document.getElementById("hudDifficulty");
    const diffLabel = document.getElementById("hudDifficultyLabel");
    let JP_DIFFICULTY = parseInt(localStorage.getItem(DIFF_LS) || "3", 10);
    if (!Number.isFinite(JP_DIFFICULTY)) JP_DIFFICULTY = 3;
    function applyDiff(v) {
      JP_DIFFICULTY = Math.min(9, Math.max(1, v | 0));
      if (diffInput) diffInput.value = String(JP_DIFFICULTY);
      if (diffLabel) diffLabel.textContent = String(JP_DIFFICULTY);
      localStorage.setItem(DIFF_LS, String(JP_DIFFICULTY));
    }
    if (diffInput) {
      const saved = JP_DIFFICULTY;
      applyDiff(saved);
      diffInput.addEventListener("input", () =>
        applyDiff(parseInt(diffInput.value || "3", 10))
      );
    } else {
      applyDiff(JP_DIFFICULTY);
    }
    window.getJpDifficulty = () => JP_DIFFICULTY;
    // Utility: difficulty parameters
    function diffParams() {
      const d = JP_DIFFICULTY;
      // options: 4 at easy, 5 at mid, 6 at hard
      const options = d >= 7 ? 6 : d >= 4 ? 5 : 4;
      // base time: 18 down to 10
      const baseTime = Math.max(10, 20 - d);
      // xp/score multiplier
      const mult = 1 + (d - 3) * 0.15; // 1x at 3, ~2x at 9
      return { options, baseTime, mult };
    }

    // HUD widget init
    (function initHudWidget() {
      const lives = document.getElementById("hudLives");
      const maxLives = document.getElementById("hudMaxLives");
  const selGame = document.getElementById("hudGame");
  const selMode = document.getElementById("hudMode");
  const timedBtn = null; // moved to settings overlay
  const singerImg = null; // singer image removed from HUD
  const bpmInput = null; // moved to settings overlay
  const bpmLabel = null; // moved to settings overlay
  const metBtn = null; // moved to settings overlay
      const sync = () => {
        // Hearts display removed from HUD
        if (lives) lives.textContent = String(HUD.lives);
        if (maxLives) maxLives.textContent = String(HUD.maxLives);
      };
      sync();
      // Expose updater (hearts removed)
      window.__updateHudHearts = sync;
  // Rhythm and timed controls moved into Settings overlay
  // HUD singer image removed
    })();
    try { if (window.Jukebox && typeof window.Jukebox.attachHudSelect === 'function') window.Jukebox.attachHudSelect(); } catch(_) {}

    function startSong(game, mode, timed) {
      try { SFX.play('sega.tag'); } catch (_) {}
      HUD.combo = 0;
      HUD.maxCombo = 0;
      HUD.voltage = 0;
      HUD.score = 0;
      HUD.notes = 0;
      HUD.counts = { COOL: 0, GREAT: 0, FINE: 0, SAD: 0, MISS: 0 };
      HUD.start = Date.now();
      HUD.game = game;
      HUD.gameOver = false;
      HUD.maxLives = 5; // ensure known cap
      // Keep current lives; do not auto-reset to max
      try { localStorage.setItem('jp.lives', String(HUD.lives)); } catch (_) {}
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
        document.dispatchEvent(new CustomEvent("kotoba-start", { detail: { timed: localStorage.getItem('kotoba.timed')==='1' } }));
      }
    }
    try { window.__startSong = startSong; } catch(_){}
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
  HUD.gameOver = true;
      // Show results overlay
      const ov = ensureResultOverlay();
      const dur = HUD.start
        ? Math.max(1, Math.round((Date.now() - HUD.start) / 1000))
        : 0;
      ov.querySelector("#resReason").textContent = reason || "Song Clear";
      ov.querySelector("#resScore").textContent = String(HUD.score);
      ov.querySelector("#resMaxCombo").textContent = String(HUD.maxCombo);
      ov.querySelector("#resTime").textContent = /*html*/ `${dur}s`;
      ov.querySelector("#resCool").textContent = String(HUD.counts.COOL);
      ov.querySelector("#resGreat").textContent = String(HUD.counts.GREAT);
      ov.querySelector("#resFine").textContent = String(HUD.counts.FINE);
      ov.querySelector("#resSad").textContent = String(
        HUD.counts.SAD + HUD.counts.MISS
      );
      const rank = gradeFromStats();
      ov.querySelector("#resRank").textContent = rank;
      // Tint result with current song theme
      try {
        const curId = localStorage.getItem('jukebox.song');
        const s = (window.Jukebox && Jukebox.songs || []).find(x=>x.id===curId);
        if (s && s.theme) {
          const panelEl = ov.querySelector('.result-panel');
          if (panelEl) panelEl.style.borderColor = s.theme;
        }
      } catch(_) {}
      // Show preset thresholds
      try {
        const preset = (window.Jukebox && Jukebox.getPreset && Jukebox.getPreset()) || { key:'normal' };
        const table = {
          easy:    { clear: 500,  great: 900,  perfect: 1300 },
          normal:  { clear: 700,  great: 1100, perfect: 1600 },
          hard:    { clear: 900,  great: 1400, perfect: 2000 },
          extreme: { clear: 1200, great: 1800, perfect: 2400 },
        };
        let th = table[preset.key] || table.normal;
        try {
          // Mode-based multipliers (kanji slightly stricter than vocab)
          const g = (typeof HUD!=='undefined' && HUD.game) ? HUD.game : (localStorage.getItem('preferred.game')||'vocab');
          const mult = g === 'kanji' ? 1.15 : 1.0;
          th = { clear: Math.round(th.clear*mult), great: Math.round(th.great*mult), perfect: Math.round(th.perfect*mult) };
        } catch(_) {}
        const tEl = ov.querySelector('#resThresholds');
        if (tEl) tEl.textContent = `Stage Clear: ${th.clear} • Great: ${th.great} • Perfect: ${th.perfect}`;
      } catch(_) {}
      const panel = ov.querySelector(".result-panel");
      if (panel) {
        panel.classList.remove("win", "gamer");
        if (rank === "S" || rank === "A") panel.classList.add("win");
        else if (rank === "B") panel.classList.add("gamer");
        // Apply theme accent from current song
        try {
          const s = (window.Jukebox && Jukebox.songs && (function(){ const id = localStorage.getItem('jukebox.song'); return (Jukebox.songs||[]).find(x=>x.id===id); })()) || null;
          if (s && s.theme) {
            panel.style.borderColor = s.theme;
            panel.style.boxShadow = `0 10px 30px ${s.theme}33`;
          }
        } catch(_) {}
      }
      // Result voice line based on performance
      try {
        if (rank === "S") SFX.play("result.perfect");
        else if (rank === "A") SFX.play("result.great");
        else if (rank === "B") SFX.play("result.standard");
        else if (rank === "C") SFX.play("result.cheap");
        else SFX.play("result.miss");
      } catch (_) {}
      ov.style.display = "flex";
    }
    function ensureResultOverlay() {
      let ov = document.getElementById("resultOverlay");
      if (ov) return ov;
      ov = document.createElement("div");
      ov.id = "resultOverlay";
      ov.className = "result-overlay";
      ov.innerHTML = /*html*/ `
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
          <div id="resThresholds" style="font-size:12px;color:#596286;margin-top:6px"></div>
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
      wrap.innerHTML = /*html*/ `
        <div class="diva-voltage"><div class="fill" id="${cardId}-voltage"></div></div>
        <div class="diva-judge" id="${cardId}-judge"></div>
        <div class="diva-lives" id="${cardId}-lives"></div>
        <img class="singer-badge" id="${cardId}-singer" alt="Singer" style="width:28px;height:28px;object-fit:cover;border-radius:50%;border:2px solid var(--border);background:#fff" />
      `;
      card.insertBefore(wrap, card.firstChild);
      renderLives(cardId);
      updateVoltage(cardId);
      // set singer avatar
      try {
        applySingerTo(`#${cardId}-singer`);
      } catch (_) {}
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
      el.style.width = /*html*/ `${clamp(HUD.voltage, 0, 100)}%`;
    }
    function flashJudge(cardId, label) {
      const el = document.getElementById(`${cardId}-judge`);
      if (!el) return;
      el.className = /*html*/ `diva-judge judge-${label}`;
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
      if (window.__noFail) { renderLives(cardId); return; }
      if (HUD.lives > 0) {
        HUD.lives--;
        localStorage.setItem("jp.lives", String(HUD.lives));
        renderLives(cardId);
        if (HUD.lives === 0) {
          try { SFX.play('result.miss'); } catch (_) {}
          endSong("Out of Lives");
        }
      }
    }
    function addVoltage(amount, cardId) {
      HUD.voltage = clamp(HUD.voltage + amount, 0, 100);
      updateVoltage(cardId);
    }
    function addCombo(cardId) {
      HUD.combo++;
      HUD.maxCombo = Math.max(HUD.maxCombo, HUD.combo);
      if (HUD.combo > 0 && HUD.combo % 10 === 0) {
        gainLife(cardId);
        showVoltageBurst(cardId);
      }
    }
    function resetCombo() {
      HUD.combo = 0;
    }

  function showVoltageBurst(cardId) {
      const card = document.getElementById(cardId);
      if (!card || card.querySelector(".voltage-burst")) return;
      const b = document.createElement("div");
      b.className = "voltage-burst";
      b.style.cssText =
        "position:absolute;right:10px;top:10px;background:#fff;border:3px solid var(--border);border-radius:12px;padding:10px;font-weight:900;box-shadow:var(--shadow);z-index:5;cursor:pointer";
      b.innerHTML = "Voltage Burst! Tap for bonus 💖";
      card.style.position = "relative";
      card.appendChild(b);
      const grant = () => {
        awardHearts(3);
        try {
          SFX.play("ui.scoreTally");
        } catch (_) {}
        b.remove();
      };
      b.addEventListener("click", grant);
      setTimeout(() => {
        if (b && b.parentNode) b.parentNode.removeChild(b);
      }, 5000);
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
        const prox = /*html*/ `https://api.allorigins.win/raw?url=${encodeURIComponent(
          url
        )}`;
        const r2 = await fetch(prox, { cache: "no-store" });
        if (r2.ok) return await r2.json();
      } catch (_) {}
      throw new Error("Network error");
    }

    async function primeVocabPage(page) {
      const url = /*html*/ `https://jisho.org/api/v1/search/words?keyword=%23common&page=${page}`;
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
      // Force a 4-grid beatpad layout (3 decoys + 1 correct)
      const preset = (window.Jukebox && Jukebox.getPreset && Jukebox.getPreset()) || { options: 4 };
      const decoyCount = Math.max(1, (preset.options || 4) - 1);
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
            new Set(
              pickN(vocabCache.enDefs, decoyCount * 2, new Set([correct]))
            )
          )
            .filter((x) => x !== correct)
            .slice(0, decoyCount);
          if (decoys.length < decoyCount) {
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
            new Set(
              pickN(vocabCache.jpSurfaces, decoyCount * 2, new Set([correct]))
            )
          )
            .filter((x) => x !== correct)
            .slice(0, decoyCount);
          if (decoys.length < decoyCount) {
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
      // Force a 4-grid beatpad layout (3 decoys + 1 correct)
      const presetK = (window.Jukebox && Jukebox.getPreset && Jukebox.getPreset()) || { options: 4 };
      const decoyCount = Math.max(1, (presetK.options || 4) - 1);
      // Map difficulty (1-9) to school grade (1-6)
      const d = (typeof window.getJpDifficulty === 'function' ? window.getJpDifficulty() : 3) || 3;
      const gradeMap = { 1:1, 2:1, 3:2, 4:3, 5:4, 6:5, 7:6, 8:6, 9:6 };
      const grade = gradeMap[String(d)] || 3;
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
          const decoys = pickN(pool, decoyCount * 2, new Set([correct])).slice(
            0,
            decoyCount
          );
          if (decoys.length < decoyCount) continue;
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
          while (decoyReadings.size < decoyCount && tries++ < 40) {
            const dk = list[rnd(list.length)];
            if (dk === k) continue;
            const dd = await getKanjiDetail(dk);
            const rs = [...(dd.kun_readings || []), ...(dd.on_readings || [])];
            if (rs.length) {
              const rpick = rs[rnd(rs.length)];
              if (rpick && rpick !== correct) decoyReadings.add(rpick);
            }
          }
          if (decoyReadings.size < decoyCount) continue;
          pushRecent(recentKanji, k);
          return {
            promptHtml: `<div style=\"font-size:22px;font-weight:900\">${k}</div>`,
            correct,
            options: shuffle([
              correct,
              ...Array.from(decoyReadings).slice(0, decoyCount),
            ]),
          };
        }
      }
      throw new Error("Could not build kanji question");
    }

    // SFX wrappers using asset library
    function sfxOk() {
      try {
        SFX.play("quiz.ok");
      } catch (_) {}
    }
    function sfxBad() {
      try {
        SFX.play("quiz.bad");
      } catch (_) {}
    }
    function sfxTime() {
      try {
        SFX.play("quiz.tick");
      } catch (_) {}
    }
    function sfxHeartClick() {
      try {
        SFX.play("hearts.click");
      } catch (_) {}
    }
    function sfxHeartAdd(amount = 1) {
      try {
        SFX.play("hearts.add");
      } catch (_) {}
    }
    function sfxRoll() {
      try {
        SFX.play("gacha.roll");
      } catch (_) {}
    }
    function sfxPop() {
      try {
        SFX.play("gacha.pop");
      } catch (_) {}
    }
    function sfxFanfare(rarity = 4) {
      try {
        if (rarity >= 5) SFX.play("gacha.high");
        else if (rarity >= 4) SFX.play("gacha.mid");
        else SFX.play("gacha.low");
      } catch (_) {}
    }

    // Utilities
    function shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    // Enhanced ultimate beatpad system integrated directly into quiz options

  // Vocab Quiz (online-only Jisho)
  (function vocabQuiz() { if (true) {
      const qEl = document.getElementById("vocabQuestion");
      const cEl = document.getElementById("vocabChoices");
      const fb = document.getElementById("vocabFeedback");
      const scoreEl = document.getElementById("vocabScore");
      const timerWrap = document.getElementById("vocabTimerWrap");
      const timerEl = document.getElementById("vocabTimer");
      const streakEl = document.getElementById("vocabStreak");
      const bestStreakEl = document.getElementById("vocabBestStreak");
      const bestTimeEl = document.getElementById("vocabBestTime");
      // Removed Start button: auto-start when a mode is selected
      const timedTgl = document.getElementById("vocabTimedToggle");
      const optionBtns = document.querySelectorAll("#vocabMeta .mode-option");
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

      // Inline mode controls
      let chosenMode = direction;
      function beginVocab() {
        direction = chosenMode || "jp-en";
        localStorage.setItem("vocab.direction", direction);
        localStorage.setItem("vocab.timed", timed ? "1" : "0");
        timerWrap.style.display = timed ? "inline-flex" : "none";
        load();
      }
      optionBtns.forEach((b) => {
        b.addEventListener("click", () => {
          chosenMode = b.getAttribute("data-mode");
          optionBtns.forEach((x) => x.classList.remove("active"));
          b.classList.add("active");
          // Auto-start on first mode selection
          try {
            SFX.play("ui.select");
          } catch (_) {}
          beginVocab();
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
      // Expose a stop hook for navigation cleanup
      window.__vocabStop = () => {
        try {
          if (tId) clearInterval(tId);
        } catch (_) {}
        tId = null;
      };
      document.addEventListener("vocab-start", (ev) => {
        const d = ev.detail || {};
        direction = d.direction === "en-jp" ? "en-jp" : "jp-en";
        timed = !!d.timed;
        localStorage.setItem("vocab.direction", direction);
        localStorage.setItem("vocab.timed", timed ? "1" : "0");
        timerWrap.style.display = timed ? "inline-flex" : "none";
        load();
      });
      timerWrap.style.display = timed ? "inline-flex" : "none";
      bestStreakEl.textContent = String(bestStreak);
      bestTimeEl.textContent = bestTime
        ? `${(bestTime / 1000).toFixed(1)}s`
        : "-";
      attachDivaHud("vocabCard");
      // Integrated PS-style is now part of the answer buttons (no separate overlay)
      
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
          // Apply per-song preset
          const PRESET = (window.Jukebox && Jukebox.getPreset && Jukebox.getPreset()) || { baseTime: 15, options: 4 };
          // If options != 4, adjust grid layout
          try {
            const cols = PRESET.options >= 6 ? 3 : 2;
            cEl.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
            cEl.style.gridTemplateRows = `repeat(${Math.ceil(PRESET.options/cols)}, 1fr)`;
          } catch(_) {}

          if (timed) {
            const { baseTime } = diffParams();
            countdown = PRESET.baseTime || baseTime;
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
                fb.textContent = /*html*/ `⏰ Time! Correct: ${correct}`;
                fb.style.color = "#c00";
                try {
                  SFX.play("quiz.timeup");
                } catch (_) {}
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
          // Trim or extend options according to preset
          const opts = q.options.slice(0, PRESET.options || 4);
          q.options = opts;
          opts.forEach((opt, idx) => {
            const { btn } = createUltimateBeatpadButton(opt, idx, (text, element, style) => {
              if (lock) return;
              lock = true;
              if (tId) {
                clearInterval(tId);
                tId = null;
              }
              
              const isCorrect = text === correct;
              
              if (isCorrect) {
                createRingEffect(element, true);
                if (style.isPerfect) {
                  createPerfectHitEffect(element, style.color);
                  fb.textContent = "✨ PERFECT! ✨";
                  // Bonus rewards for perfect timing
                  awardHearts(2);
                  addXP(Math.round(gain * 1.5));
                } else {
                  fb.textContent = "✅ Correct!";
                  awardHearts(1);
                  addXP(Math.round(gain));
                }
                fb.style.color = "#2b2b44";
                score++;
                scoreEl.textContent = String(score);
                sfxOk();
                
                // Enhanced streak system
                streak++;
                streakEl.textContent = String(streak);
                if (streak > 1) loveToast(`コンボ x${streak}!`);
                
                // Combo milestone effects
                createComboMilestoneEffect(cEl, streak);
                
                const { mult } = diffParams();
                const gain = (12 + Math.min(15, (streak - 1) * 2)) * mult * getRhythmMult();
                
                if (streak > 0 && streak % 5 === 0) awardHearts(1);
                const dt = Date.now() - startAt;
                let judge = "FINE", v = 2, sc = 50;
                
                if (style.isPerfect || dt <= 600) {
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
                {
                  const sm = (typeof window.getSingerScoreMult==='function'? getSingerScoreMult():1);
                  HUD.score += Math.round(sc * mult * getRhythmMult() * sm);
                }
              } else {
                createRingEffect(element, false);
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
              if (!HUD.gameOver) setTimeout(load, 900);
            });
            
            cEl.appendChild(btn);
          });
          
          // Initialize falling beats system for this question
          createFallingBeatsSystem(cEl);
          setupUltimateBeatpadKeyboard(cEl, (text, element, style) => {
            // Find the button with this text and trigger it
            const targetBtn = Array.from(cEl.querySelectorAll('.beatpad-btn'))
              .find(b => b.textContent === text);
            if (targetBtn) targetBtn.click();
          });
        } catch (e) {
          friendlyError(cEl, load);
          qEl.textContent = "";
        }
      }
      // Start flow waits for overlay
    }})();

  // Kanji Quiz (online-only KanjiAPI)
  (function kanjiQuiz() { if (true) {
      const qEl = document.getElementById("kanjiQuestion");
      const cEl = document.getElementById("kanjiChoices");
      const fb = document.getElementById("kanjiFeedback");
      const scoreEl = document.getElementById("kanjiScore");
      const timerWrap = document.getElementById("kanjiTimerWrap");
      const timerEl = document.getElementById("kanjiTimer");
      const streakEl = document.getElementById("kanjiStreak");
      const bestStreakEl = document.getElementById("kanjiBestStreak");
      const bestTimeEl = document.getElementById("kanjiBestTime");
      // Removed Start button: auto-start when a mode is selected
      const timedTgl = document.getElementById("kanjiTimedToggle");
      const optionBtns = document.querySelectorAll("#kanjiMeta .mode-option");
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

      // Inline mode controls
      let chosenMode = mode;
      function beginKanji() {
        mode = chosenMode || "meaning";
        localStorage.setItem("kanji.mode", mode);
        localStorage.setItem("kanji.timed", timed ? "1" : "0");
        timerWrap.style.display = timed ? "inline-flex" : "none";
        load();
      }
      optionBtns.forEach((b) => {
        b.addEventListener("click", () => {
          chosenMode = b.getAttribute("data-mode");
          optionBtns.forEach((x) => x.classList.remove("active"));
          b.classList.add("active");
          // Auto-start on first mode selection
          try {
            SFX.play("ui.select");
          } catch (_) {}
          beginKanji();
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
      // Expose a stop hook for navigation cleanup
      window.__kanjiStop = () => {
        try {
          if (tId) clearInterval(tId);
        } catch (_) {}
        tId = null;
      };
      document.addEventListener("kanji-start", (ev) => {
        const d = ev.detail || {};
        mode = d.mode === "reading" ? "reading" : "meaning";
        timed = !!d.timed;
        localStorage.setItem("kanji.mode", mode);
        localStorage.setItem("kanji.timed", timed ? "1" : "0");
        timerWrap.style.display = timed ? "inline-flex" : "none";
        load();
      });
      timerWrap.style.display = timed ? "inline-flex" : "none";
      bestStreakEl.textContent = String(bestStreak);
      bestTimeEl.textContent = bestTime
        ? `${(bestTime / 1000).toFixed(1)}s`
        : "-";
      attachDivaHud("kanjiCard");
      // Integrated PS-style is now part of the answer buttons (no separate overlay)

      // Integrated PS-style is now part of the answer buttons (no separate overlay)

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
          const PRESET2 = (window.Jukebox && Jukebox.getPreset && Jukebox.getPreset()) || { baseTime: 15, options: 4 };
          try {
            const cols2 = PRESET2.options >= 6 ? 3 : 2;
            cEl.style.gridTemplateColumns = `repeat(${cols2}, 1fr)`;
            cEl.style.gridTemplateRows = `repeat(${Math.ceil(PRESET2.options/cols2)}, 1fr)`;
          } catch(_) {}
          if (timed) {
            const { baseTime } = diffParams();
            countdown = PRESET2.baseTime || baseTime;
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
                fb.textContent = /*html*/ `⏰ Time! Correct: ${correct}`;
                fb.style.color = "#c00";
                try {
                  SFX.play("quiz.timeup");
                } catch (_) {}
                streak = 0;
                streakEl.textContent = String(streak);
                HUD.counts.MISS++;
                flashJudge("kanjiCard", "MISS");
                addVoltage(-5, "kanjiCard");
                loseLife("kanjiCard");
                if (!HUD.gameOver) setTimeout(load, 1000);
              }
            }, 1000);
          }
          const opts2 = q.options.slice(0, PRESET2.options || 4);
          opts2.forEach((opt, idx) => {
            const { btn } = createUltimateBeatpadButton(opt, idx, (text, element, style) => {
              if (lock) return;
              lock = true;
              if (tId) {
                clearInterval(tId);
                tId = null;
              }
              
              const isCorrect = text === correct;
              
              if (isCorrect) {
                createRingEffect(element, true);
                if (style.isPerfect) {
                  createPerfectHitEffect(element, style.color);
                  fb.textContent = "✨ PERFECT! 正解! ✨";
                  awardHearts(2);
                } else {
                  fb.textContent = "✅ 正解!";
                  awardHearts(1);
                }
                fb.style.color = "#2b2b44";
                score++;
                scoreEl.textContent = String(score);
                sfxOk();
                
                streak++;
                streakEl.textContent = String(streak);
                if (streak > 1) loveToast(`コンボ x${streak}!`);
                if (streak > bestStreak) {
                  bestStreak = streak;
                  localStorage.setItem("kanji.bestStreak", String(bestStreak));
                  bestStreakEl.textContent = String(bestStreak);
                }
                
                // Combo milestone effects
                createComboMilestoneEffect(cEl, streak);
                
                const { mult } = diffParams();
                const gainBase = mode === "reading" ? 16 : 12;
                const gain = (gainBase + Math.min(15, (streak - 1) * 2)) * mult * getRhythmMult();
                const finalGain = style.isPerfect ? Math.round(gain * 1.5) : Math.round(gain);
                addXP(finalGain);
                
                if (timed) {
                  const elapsed = Date.now() - startAt;
                  if (!bestTime || elapsed < bestTime) {
                    bestTime = elapsed;
                    localStorage.setItem("kanji.bestTime", String(bestTime));
                    bestTimeEl.textContent = `${(bestTime / 1000).toFixed(1)}s`;
                  }
                }
                
                if (streak > 0 && streak % 5 === 0) awardHearts(1);
                const dt = Date.now() - startAt;
                let judge = "FINE", v = 2, sc = 60;
                
                if (style.isPerfect || dt <= 700) {
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
                const { mult: km } = diffParams();
                {
                  const sm = (typeof window.getSingerScoreMult==='function'? getSingerScoreMult():1);
                  HUD.score += Math.round(sc * km * getRhythmMult() * sm);
                }
              } else {
                createRingEffect(element, false);
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
              if (!HUD.gameOver) setTimeout(load, 900);
            });
            
            cEl.appendChild(btn);
          });
          
          // Initialize falling beats system
          createFallingBeatsSystem(cEl);
          setupUltimateBeatpadKeyboard(cEl, (text, element, style) => {
            const targetBtn = Array.from(cEl.querySelectorAll('.beatpad-btn'))
              .find(b => b.textContent === text);
            if (targetBtn) targetBtn.click();
          });
        } catch (e) {
          friendlyError(cEl, load);
          qEl.textContent = "";
        }
      }
      // Start flow waits for overlay
    }})();

    // Miku Meets Kotoba (chat-styled vocab multiple choice)
  (function mikuKotoba() { if (true) {
      const chat = document.getElementById("kotobaChat");
      const cEl = document.getElementById("kotobaChoices");
      const start = document.getElementById("kotobaStart");
      const scoreEl = document.getElementById("kotobaScore");
      if (!chat || !cEl || !start || !scoreEl) return;
      let score = 0,
        lock = false;

      function say(text, from = "miku") {
        const b = document.createElement("div");
        b.style.cssText = /*html*/ `padding:8px 12px; border-radius:12px; max-width:88%; box-shadow: var(--shadow);`;
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
          const PRESET3 = (window.Jukebox && Jukebox.getPreset && Jukebox.getPreset()) || { options: 4 };
          const use = q.options.slice(0, PRESET3.options || 4);
          use.forEach((opt, idx) => {
            const { btn } = createUltimateBeatpadButton(opt, idx, (text, element, style) => {
              if (lock) return;
              lock = true;
              
              const isCorrect = text === correct;
              
              if (isCorrect) {
                createRingEffect(element, true);
                if (style.isPerfect) {
                  createPerfectHitEffect(element, style.color);
                  say("✨ PERFECT! 正解だよ! ✨");
                  addXP(15); // Bonus XP for perfect
                } else {
                  say("正解だよ！");
                  addXP(10);
                }
                sfxOk();
                score++;
                scoreEl.textContent = String(score);
                
                // Create celebration effect
                createComboMilestoneEffect(cEl, score);
              } else {
                createRingEffect(element, false);
                say(`残念！正解は「${correct}」`);
                sfxBad();
              }
              setTimeout(round, 900);
            });
            
            cEl.appendChild(btn);
          });
          
          // Initialize falling beats system
          createFallingBeatsSystem(cEl);
          setupUltimateBeatpadKeyboard(cEl, (text, element, style) => {
            const targetBtn = Array.from(cEl.querySelectorAll('.beatpad-btn'))
              .find(b => b.textContent === text);
            if (targetBtn) targetBtn.click();
          });
        } catch (_) {
          // Offline fallback
          const fallback = {
            promptHtml:
              '<div style="font-size:22px;font-weight:900">こんにちは</div>',
            correct: "hello",
            options: shuffle(["hello", "goodbye", "thank you", "please"]),
          };
          const q = fallback;
          const correct = q.correct;
          chat.innerHTML = "";
          say(`「こんにちは」って、どういう意味？`);
          q.options.forEach((opt, idx) => {
            const { btn } = createUltimateBeatpadButton(opt, idx, (text, element, style) => {
              if (lock) return;
              lock = true;
              
              const isCorrect = text === correct;
              
              if (isCorrect) {
                createRingEffect(element, true);
                if (style.isPerfect) {
                  createPerfectHitEffect(element, style.color);
                  say("✨ PERFECT! 正解だよ! ✨");
                  addXP(9); // Bonus XP for perfect
                } else {
                  say("正解だよ！");
                  addXP(6);
                }
                sfxOk();
                score++;
                scoreEl.textContent = String(score);
                
                // Create celebration effect
                createComboMilestoneEffect(cEl, score);
              } else {
                createRingEffect(element, false);
                say(`残念！正解は「${correct}」`);
                sfxBad();
              }
              setTimeout(round, 900);
            });
            
            cEl.appendChild(btn);
          });
          
          // Initialize falling beats system
          createFallingBeatsSystem(cEl);
          setupUltimateBeatpadKeyboard(cEl, (text, element, style) => {
            const targetBtn = Array.from(cEl.querySelectorAll('.beatpad-btn'))
              .find(b => b.textContent === text);
            if (targetBtn) targetBtn.click();
          });
        }
      }
      start.addEventListener("click", () => {
        start.style.display = 'none';
        round();
      });
    }} )();
  }

  function showSpotlightSweep(cardId) {
    const card = document.getElementById(cardId);
    if (!card) return;
    const sweep = document.createElement('div');
    sweep.style.cssText = 'position:absolute;inset:0;background:linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%);transform:translateX(-120%);filter:blur(2px);pointer-events:none;z-index:6';
    card.style.position = 'relative';
    card.appendChild(sweep);
    sweep.animate([{ transform:'translateX(-120%)' }, { transform:'translateX(120%)' }], { duration: 800, easing: 'ease-out' });
    setTimeout(()=> sweep.remove(), 850);
  }

  function showConfetti(cardId, count = 24) {
    const card = document.getElementById(cardId);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      const colors = ['#6bc3ff','#a594f9','#ffb300','#00c853','#ff69b4'];
      const c = colors[i % colors.length];
      p.style.cssText = `position:fixed;left:${rect.left + rect.width/2}px;top:${rect.top + 10}px;width:6px;height:10px;background:${c};transform:rotate(${Math.random()*180}deg);border-radius:2px;z-index:9999`;
      document.body.appendChild(p);
      const dx = (Math.random() - 0.5) * rect.width;
      const dy = rect.height * (0.7 + Math.random() * 0.4);
      p.animate([{ transform:`translate(0,0) rotate(0deg)` , opacity:1 }, { transform:`translate(${dx}px, ${dy}px) rotate(${180+Math.random()*180}deg)`, opacity:0 }], { duration: 900 + Math.random()*400, easing:'ease-out' });
      setTimeout(()=> p.remove(), 1400);
    }
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
          header.style.backgroundImage = /*html*/ `linear-gradient(135deg, rgba(189,227,255,.9), rgba(255,209,236,.9)), url('${C.images.headerBg}')`;
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
            a.innerHTML = /*html*/ `${icon} ${n.label}`;
          }
        });
      }

      // (Removed old nowPlaying placeholder: using radioStatus/radioDisplayStatus instead)
      // Status labels
      const onlineStatus = document.getElementById("onlineStatus");
      if (onlineStatus && C.status?.onlineLabel) {
        const statusIcon = C.status.statusIcon
          ? mikuIcon(C.status.statusIcon, "")
          : "";
        onlineStatus.innerHTML = /*html*/ `${statusIcon}${C.status.onlineLabel}`;
      }
      const heartCountLbl = document.querySelector(".status-item:nth-child(3)");
      if (heartCountLbl && C.status?.heartsLabel) {
        const span = heartCountLbl.querySelector("span");
        if (span) {
          const heartIcon = C.status.heartIcon
            ? mikuIcon(C.status.heartIcon, "💖")
            : "💖";
          span.previousSibling &&
            (span.previousSibling.innerHTML = /*html*/ ` ${heartIcon} ${C.status.heartsLabel} `);
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
                const ll = mikuIcon("loveLetter", "💌");
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
          heartBtn.innerHTML = /*html*/ `${heartIcon} ${C.home.heartButton}`;
        }

        // Rebuild the grid with unified presentation system
        const grid = document.querySelector("#home .content-grid");
        if (grid) {
          // Check if we have the new presentation slides
          if (
            C.home.presentationSlides &&
            C.home.presentationSlides.length > 0
          ) {
            const presentationIcon = C.home.presentationIcon
              ? mikuIcon(C.home.presentationIcon, "✨")
              : "✨";
            const presentationTitle =
              C.home.presentationTitle || "Getting to Know Baby Belle";

            // Build unified presentation
            const slidesHtml = C.home.presentationSlides
              .map((slide, index) => {
                const titleIcon = slide.titleIcon
                  ? mikuIcon(slide.titleIcon, "")
                  : "";
                const decorativeIconsHtml = slide.decorativeIcons
                  ? slide.decorativeIcons
                      .map((iconName) => mikuIcon(iconName, ""))
                      .join("")
                  : "";

                return `
                <div class="presentation-slide ${index === 0 ? "active" : ""}" 
                     data-slide="${index}" 
                     data-theme="${slide.theme || "default"}">
                  <div class="slide-header">
                    <h3>${titleIcon}${slide.title}</h3>
                    <div class="slide-decorations">${decorativeIconsHtml}</div>
                  </div>
                  <div class="slide-content">
                    ${slide.content
                      .map((line) => (line ? `<p>${line}</p>` : "<br>"))
                      .join("")}
                  </div>
                  <div class="slide-number">${index + 1} / ${
                  C.home.presentationSlides.length
                }</div>
                </div>
              `;
              })
              .join("");

            grid.innerHTML = /*html*/ `
              <div class="belle-presentation">
                <div class="presentation-header">
                  <h2>${presentationIcon}${presentationTitle}</h2>
                  <div class="presentation-controls">
                    <button class="presentation-btn prev-slide" data-direction="prev">
                      ${mikuIcon("wallHide", "◀")} Previous
                    </button>
                    <div class="slide-indicator">
                      <span class="current-slide">1</span> / ${
                        C.home.presentationSlides.length
                      }
                    </div>
                    <button class="presentation-btn next-slide" data-direction="next">
                      Next ${mikuIcon("cheering", "▶")}
                    </button>
                  </div>
                  <div class="presentation-progress">
                    <div class="progress-bar">
                      <div class="progress-fill" style="width: ${
                        100 / C.home.presentationSlides.length
                      }%"></div>
                    </div>
                  </div>
                </div>
                <div class="presentation-content">
                  ${slidesHtml}
                </div>
                <div class="floating-decorations"></div>
              </div>
            `;

            // Initialize the enhanced presentation system (guard if unavailable)
            if (typeof initBellePresentation === "function") {
              initBellePresentation();
            }
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
            const aboutPages = C.home.aboutPages || [
              C.home.aboutParagraphs || [],
            ];
            const aboutPageHtml = aboutPages
              .map(
                (page, index) =>
                  `<div class="card-page ${
                    index === 0 ? "active" : ""
                  }" data-page="${index}">
                ${page.map((txt) => `<p>${txt}</p>`).join("")}
              </div>`
              )
              .join("");

            // Build paginated dislikes content
            const dislikesPages = C.home.dislikesPages || [
              C.home.dislikes || [],
            ];
            const dislikesPageHtml = dislikesPages
              .map(
                (page, index) =>
                  `<div class="card-page ${
                    index === 0 ? "active" : ""
                  }" data-page="${index}">
                <ul>${page.map((item) => `<li>${item}</li>`).join("")}</ul>
              </div>`
              )
              .join("");

            // Build paginated dreams content
            const dreamsPages = C.home.dreamsPages || [C.home.dreams || []];
            const dreamsPageHtml = dreamsPages
              .map(
                (page, index) =>
                  `<div class="card-page ${
                    index === 0 ? "active" : ""
                  }" data-page="${index}">
                <ul>${page
                  .map((item, idx) => {
                    const dreamIcon = C.home.dreamItemIcons?.[idx]
                      ? mikuIcon(C.home.dreamItemIcons[idx], "")
                      : "";
                    return `<li>${dreamIcon}${item}</li>`;
                  })
                  .join("")}</ul>
              </div>`
              )
              .join("");

            const pieces = [];
            const aboutTitleIcon = C.home.aboutIcon
              ? mikuIcon(C.home.aboutIcon, "")
              : "";
            const aboutTitle = /*html*/ `${aboutTitleIcon}${
              C.home.aboutTitle || "About Me"
            }`;

            // About card with pagination
            pieces.push(`
              <div class="card paginated-card" data-card="about">
                <div class="card-header">
                  <h3>${aboutTitle}</h3>
                  ${
                    aboutPages.length > 1
                      ? `
                    <div class="card-nav">
                      <button class="card-nav-btn prev-btn" data-direction="prev">${mikuIcon(
                        "wallHide",
                        "←"
                      )}</button>
                      <span class="page-indicator">1/${aboutPages.length}</span>
                      <button class="card-nav-btn next-btn" data-direction="next">${mikuIcon(
                        "cheering",
                        "→"
                      )}</button>
                    </div>
                  `
                      : ""
                  }
                </div>
                <div class="card-content">
                  ${aboutPageHtml}
                </div>
              </div>
            `);

            // Likes card with icon
            if (likes) {
              const likesIcon = C.home.likesIcon
                ? mikuIcon(C.home.likesIcon, "")
                : "";
              pieces.push(`
                <div class="card">
                  <h3>${likesIcon}${C.home.likesTitle || "Likes"}</h3>
                  <ul>${likes}</ul>
                </div>
              `);
            }

            // Dislikes card with pagination
            if (C.home.dislikesPages && C.home.dislikesPages.length > 0) {
              const dislikesIcon = C.home.dislikesIcon
                ? mikuIcon(C.home.dislikesIcon, "")
                : "";
              pieces.push(`
                <div class="card paginated-card" data-card="dislikes">
                  <div class="card-header">
                    <h3>${dislikesIcon}${
                C.home.dislikesTitle || "Dislikes"
              }</h3>
                    ${
                      dislikesPages.length > 1
                        ? `
                      <div class="card-nav">
                        <button class="card-nav-btn prev-btn" data-direction="prev">${mikuIcon(
                          "wallHide",
                          "←"
                        )}</button>
                        <span class="page-indicator">1/${
                          dislikesPages.length
                        }</span>
                        <button class="card-nav-btn next-btn" data-direction="next">${mikuIcon(
                          "innocent",
                          "→"
                        )}</button>
                      </div>
                    `
                        : ""
                    }
                  </div>
                  <div class="card-content">
                    ${dislikesPageHtml}
                  </div>
                </div>
              `);
            } else if (dislikes) {
              const dislikesIcon = C.home.dislikesIcon
                ? mikuIcon(C.home.dislikesIcon, "")
                : "";
              pieces.push(`
                <div class="card">
                  <h3>${dislikesIcon}${C.home.dislikesTitle || "Dislikes"}</h3>
                  <ul>${dislikes}</ul>
                </div>
              `);
            }

            // Dreams card with pagination
            if (C.home.dreamsPages && C.home.dreamsPages.length > 0) {
              const dreamsTitleIcon = C.home.dreamsIcon
                ? mikuIcon(C.home.dreamsIcon, "")
                : "";
              const dreamsTitle = /*html*/ `${dreamsTitleIcon}${
                C.home.dreamsTitle || "Dreams"
              }`;
              pieces.push(`
                <div class="card paginated-card" data-card="dreams">
                  <div class="card-header">
                    <h3>${dreamsTitle}</h3>
                    ${
                      dreamsPages.length > 1
                        ? `
                      <div class="card-nav">
                        <button class="card-nav-btn prev-btn" data-direction="prev">${mikuIcon(
                          "wallHide",
                          "←"
                        )}</button>
                        <span class="page-indicator">1/${
                          dreamsPages.length
                        }</span>
                        <button class="card-nav-btn next-btn" data-direction="next">${mikuIcon(
                          "starUwu",
                          "→"
                        )}</button>
                      </div>
                    `
                        : ""
                    }
                  </div>
                  <div class="card-content">
                    ${dreamsPageHtml}
                  </div>
                </div>
              `);
            } else if (dreams) {
              const dreamsTitleIcon = C.home.dreamsIcon
                ? mikuIcon(C.home.dreamsIcon, "")
                : "";
              const dreamsTitle = /*html*/ `${dreamsTitleIcon}${
                C.home.dreamsTitle || "Dreams"
              }`;
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
        if (h2) h2.innerHTML = /*html*/ `${titleIcon} ${C.socials.title}`;
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
      } else {
        // Fallback if content not ready yet: render a basic set from defaults later
        setTimeout(()=>{ try { if (window.SITE_CONTENT && window.SITE_CONTENT.quickLinks) applyContent(); } catch(_){} }, 100);
      }

      // Study copy
      if (C.study) {
        const h2 = document.querySelector("#study h2");
        const studyIcon = C.study.titleIcon
          ? mikuIcon(C.study.titleIcon, "🎌")
          : "🎌";
        if (h2) h2.innerHTML = /*html*/ `${studyIcon} ${C.study.title}`;
        // Update HUD Level text/progress if provided by content
        const hudProg = document.getElementById("hudLevelProgress");
        const hudText = document.getElementById("hudLevelText");
        if (hudProg && Number.isFinite(C.study.progressPercent))
          hudProg.style.width = /*html*/ `${C.study.progressPercent}%`;
        if (hudText && C.study.levelText)
          hudText.textContent = C.study.levelText;
        const wodCard = document.getElementById("wodCard");
        const wodInline = document.querySelector(".word-of-day");
        if (C.study.wordOfDay) {
          const setWod = (root) => {
            if (!root) return;
            const jp = root.querySelector(".japanese");
            const romaji = root.querySelector(".romaji");
            const meaning = root.querySelector(".meaning");
            if (jp) jp.textContent = C.study.wordOfDay.japanese || "";
            if (romaji) romaji.textContent = C.study.wordOfDay.romaji || "";
            if (meaning) meaning.textContent = C.study.wordOfDay.meaning || "";
          };
          setWod(wodCard);
          setWod(wodInline);
        }
        const goalsCard = document.getElementById("goalsCard");
        if (goalsCard) {
          const h3 = goalsCard.querySelector("h3");
          const ul = goalsCard.querySelector("ul");
          if (h3 && C.study.goalsTitle) {
            const goalsIcon = C.study.goalsIcon
              ? mikuIcon(C.study.goalsIcon, "")
              : "";
            h3.innerHTML = /*html*/ `${goalsIcon}${C.study.goalsTitle}`;
          }
          if (ul && Array.isArray(C.study.goals))
            ul.innerHTML = C.study.goals
              .map((g, idx) => {
                const goalIcon = C.study.goalItemIcons?.[idx]
                  ? mikuIcon(C.study.goalItemIcons[idx], "")
                  : "";
                return `<li>${goalIcon}${g}</li>`;
              })
              .join("");
        }
      }

      // Games titles/buttons
      if (C.games) {
        const h2 = document.querySelector("#games h2");
        if (h2) h2.textContent = C.games.title;
        const cards = document.querySelectorAll("#games .game-widget");
        const mem = cards[0],
          heart = cards[1];
        if (mem) {
          const h3 = mem.querySelector("h3");
          if (h3 && C.games.memoryTitle) {
            const memoryIcon = C.games.memoryIcon
              ? mikuIcon(C.games.memoryIcon, "🧩")
              : "🧩";
            h3.innerHTML = /*html*/ `${memoryIcon} ${C.games.memoryTitle}`;
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
            h3.innerHTML = /*html*/ `${heartsIcon} ${C.games.heartsTitle}`;
          }
          const zone = document.getElementById("heartZone");
          if (zone && C.games.heartsZone) {
            const zoneIcon = C.games.heartsZoneIcon
              ? mikuIcon(C.games.heartsZoneIcon, "💖")
              : "💖";
            zone.innerHTML = /*html*/ `Click to collect hearts! ${zoneIcon}`;
          }
          const btn = document.getElementById("resetHearts");
          if (btn && C.games.heartsReset) btn.textContent = C.games.heartsReset;
        }
        const gachaSection = document.getElementById("gacha");
        if (gachaSection) {
          const gachaHeader = gachaSection.querySelector("h2");
          if (gachaHeader && C.games.gachaTitle) {
            const gachaIcon = C.games.gachaIcon
              ? mikuIcon(C.games.gachaIcon, "🎰")
              : "🎰";
            gachaHeader.innerHTML = /*html*/ `${gachaIcon} ${C.games.gachaTitle}`;
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
          h2.innerHTML = /*html*/ `${titleIcon} ${C.shrine.title}`;
        }
        const aboutTitle = document.querySelector("#shrine .shrine-info h3");
        if (aboutTitle && C.shrine.aboutTitle) {
          const aboutIcon = C.shrine.aboutIcon
            ? mikuIcon(C.shrine.aboutIcon, "💙")
            : "💙";
          aboutTitle.innerHTML = /*html*/ `${aboutIcon} ${C.shrine.aboutTitle}`;
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
        if (ul) {
          // Build a structured favorites list from config
          const maxN = Number.isFinite(C.shrine.favoriteSongsMax)
            ? C.shrine.favoriteSongsMax
            : 999;
          const rich = Array.isArray(C.shrine.favoriteSongsData)
            ? C.shrine.favoriteSongsData
            : [];
          const simple = Array.isArray(C.shrine.favoriteSongs)
            ? C.shrine.favoriteSongs
            : [];

          const items = [];
          if (rich.length) {
            for (const r of rich) {
              if (!r || !r.title) continue;
              items.push({
                title: r.title,
                artist: r.artist || "",
                videoId: r.youtubeId || "",
                search:
                  r.search ||
                  `${r.title} ${r.artist || "Hatsune Miku"} official`,
              });
              if (items.length >= maxN) break;
            }
          } else if (simple.length) {
            for (const s of simple) {
              if (typeof s !== "string") continue;
              const parts = s.split(" - ");
              const title = parts[0] || s;
              const artist = parts[1] || "Hatsune Miku";
              items.push({
                title,
                artist,
                videoId: "",
                search: `${title} ${artist} official`,
              });
              if (items.length >= maxN) break;
            }
          }

          ul.innerHTML = items
            .map((it) => {
              const label = it.artist ? `${it.title} - ${it.artist}` : it.title;
              const data = [
                `data-title="${label.replace(/"/g, "&quot;")}"`,
                it.videoId ? `data-video-id="${it.videoId}"` : "",
                it.search
                  ? `data-search="${it.search.replace(/"/g, "&quot;")}"`
                  : "",
              ]
                .filter(Boolean)
                .join(" ");
              return `<li class="favorite-song" ${data} style="cursor:pointer">${label}</li>`;
            })
            .join("");
        }
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
          const friendsIcon = C.friends.titleIcon
            ? mikuIcon(C.friends.titleIcon, "👥")
            : "👥";
          if (h3) h3.innerHTML = /*html*/ `${friendsIcon} ${C.friends.title}`;
        }
      }

      // Sidebar widget titles (programmatically by element anchors)
      if (C.sidebarTitles) {
        const left = C.sidebarTitles.left || {};
        const right = C.sidebarTitles.right || {};

        // Radio heading
        const radioWidget = document.querySelector(".radio-widget");
        if (radioWidget && C.radio?.title) {
          const w = radioWidget.closest(".widget");
          const h = w ? w.querySelector("h3") : null;
          const radioIcon = C.radio.titleIcon
            ? mikuIcon(C.radio.titleIcon, "📻")
            : "📻";
          if (h) h.innerHTML = /*html*/ `${radioIcon} ${C.radio.title}`;
        }

        // Pet heading
        const petIframe = document.getElementById("petIframe");
        if (petIframe && left.pet) {
          const w = petIframe.closest(".widget");
          const h = w ? w.querySelector("h3") : null;
          const petIcon = left.petIcon ? mikuIcon(left.petIcon, "🐾") : "🐾";
          if (h) h.innerHTML = /*html*/ `${petIcon} ${left.pet}`;
        }

        // Friends heading handled above

        // Stats heading
        const statBadge1 = document.getElementById("statBadge1");
        if (statBadge1 && left.stats) {
          const w = statBadge1.closest(".widget");
          const h = w ? w.querySelector("h3") : null;
          const statsIcon = left.statsIcon
            ? mikuIcon(left.statsIcon, "🌸")
            : "🌸";
          if (h) h.innerHTML = /*html*/ `${statsIcon} ${left.stats}`;

          // Also update visitor counter label with icon
          const visitorLabel = w ? w.querySelector(".counter-label") : null;
          if (visitorLabel && C.status?.visitorIcon) {
            const visitorIcon = mikuIcon(C.status.visitorIcon, "");
            visitorLabel.innerHTML = /*html*/ `${visitorIcon}Visitors:`;
          }
        }

        // Quick Links title (now on right)
        const quickLinksTitle = document.getElementById("quickLinksTitle");
        if (quickLinksTitle && right.quickLinks) {
          const quickLinksIcon = right.quickLinksIcon
            ? mikuIcon(right.quickLinksIcon, "🌟")
            : "🌟";
          quickLinksTitle.innerHTML = /*html*/ `${quickLinksIcon} ${right.quickLinks}`;
        }

        // Badges title
        const webBadges = document.getElementById("webBadges");
        if (webBadges && right.badges) {
          const w = webBadges.closest(".widget");
          const h = w ? w.querySelector("h3") : null;
          const badgesIcon = right.badgesIcon
            ? mikuIcon(right.badgesIcon, "💫")
            : "💫";
          if (h) h.innerHTML = /*html*/ `${badgesIcon} ${right.badges}`;
        }

        // Vibe title
        const vibeMeter = document.querySelector("#rightSidebar .vibe-meter");
        if (vibeMeter && right.vibe) {
          const w = vibeMeter.closest(".widget");
          const h = w ? w.querySelector("h3") : null;
          const vibeIcon = right.vibeIcon
            ? mikuIcon(right.vibeIcon, "📊")
            : "📊";
          if (h) h.innerHTML = /*html*/ `${vibeIcon} ${right.vibe}`;
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
      const prevSection = currentSection;
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

      // UI change SFX
      try {
        SFX.play("ui.change");
        if (Math.random() < 0.15) SFX.play("extra.fx2");
      } catch (_) {}

      // Pause/resume presentation autoplay and fix layout when showing Home
      try {
        if (sectionId === "home") {
          window._presentationControl &&
            window._presentationControl.onShow &&
            window._presentationControl.onShow();
        } else {
          window._presentationControl &&
            window._presentationControl.onHide &&
            window._presentationControl.onHide();
        }
      } catch (_) {}

      // End any active games when navigating away from their section
      try {
        if (prevSection === "games") {
          window.__memoryStop && window.__memoryStop();
        }
        if (prevSection === "study") {
          window.__vocabStop && window.__vocabStop();
          window.__kanjiStop && window.__kanjiStop();
        }
      } catch (_) {}
    }
    function spawnFloatingMikus() {
      const container = document.getElementById("floatingMikusContainer");
      if (!container) return;
      container.innerHTML = "";
      // Choose the currently active singer if set, otherwise a reasonable fallback
      const singer = (() => { try { return localStorage.getItem('singer.current') || ""; } catch(_) { return ""; } })();
      let src = singer;
      if (!src) {
        // Prefer a pixel Miku if available, else any image
        const pixelOnly = (Array.isArray(MIKU_IMAGES) ? MIKU_IMAGES : []).filter((u) => /\/assets\/pixel-miku\//i.test(u));
        if (pixelOnly.length) src = pixelOnly[0];
        else if (Array.isArray(MIKU_IMAGES) && MIKU_IMAGES.length) src = MIKU_IMAGES[0];
        else return;
      }
      const img = document.createElement("img");
      img.src = src;
      img.className = "float-miku";
      img.alt = "Miku";
      // Ensure animation is explicitly set (in case global styles override)
      img.style.animationName = "float";
      img.style.animationTimingFunction = "ease-in-out";
      img.style.animationIterationCount = "infinite";
      img.style.marginTop = "-6px";
      img.style.animationDelay = (Math.random() * 1.2).toFixed(2) + "s";
      img.style.animationDuration = (3.8 + Math.random() * 1.6).toFixed(2) + "s";
      container.appendChild(img);
    }

    if (MIKU_IMAGES.length) {
      spawnFloatingMikus();
    } else {
      document.addEventListener("miku-images-ready", spawnFloatingMikus, {
        once: true,
      });
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
          moodDisplay.textContent = /*html*/ `💭 ${mood}`;
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

    // Expose radio controls for external pause (e.g., when playing YouTube)
    try {
      window.__radioAudio = audio;
      window.__pauseRadio = () => {
        try {
          audio.pause();
        } catch (_) {}
        const status = C.radio?.stoppedStatus || "Radio Stopped";
        if (radioStatus) radioStatus.textContent = status;
        if (radioDisplayStatus) radioDisplayStatus.textContent = status;
        if (onlineStatus)
          onlineStatus.textContent = C.status?.radioOffLabel || "Radio Off";
        stopEqualizer();
        if (statusDot) statusDot.style.color = "#ff4d4d";
      };
    } catch (_) {}

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
      // Stop any background music permanently once radio starts
      try {
        if (window.__stopBgm) window.__stopBgm(true);
      } catch (_) {}
      audio.play().catch(() => {});
      startEqualizer();
      if (statusDot) statusDot.style.color = "#00ff00"; // green when playing
    });

    pauseBtn.addEventListener("click", () => {
      isPlaying = false;
      if (typeof window.__pauseRadio === "function") window.__pauseRadio();
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
      statsEl.innerHTML = /*html*/ `
        <div class="memory-controls" style="margin-bottom:6px; display:flex; gap:8px; justify-content:center; align-items:center;">
          <label for="memoryDifficulty" style="font-weight:700">Difficulty:</label>
          <select id="memoryDifficulty" class="pixel-btn" style="padding:6px 10px; border-radius:8px; border:2px solid var(--border); background:#fff;">
            <option value="4x4">4×4</option>
            <option value="6x6">6×6</option>
          </select>
        </div>
        Moves: <span id="memoryMoves">0</span> • Pairs: <span id="memoryPairs">0</span>/<span id="memoryTotal">${totalPairs}</span> • Time: <span id="memoryTime">0.0s</span> • Best: <span id="memoryBest">-</span>
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
        memoryGrid.style.gridTemplateColumns = /*html*/ `repeat(${
          difficulty === "6x6" ? 6 : 4
        }, 1fr)`;
        renderBest();
        startNewGame();
      });
      // Apply initial grid width
      totalPairs = difficulty === "6x6" ? 18 : 8;
      memoryGrid.style.gridTemplateColumns = /*html*/ `repeat(${
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
          ? `<img src="${value}" alt="Miku ${index}" loading="lazy" />`
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
          // Replace board with win image instead of alert
          try {
            const imgPath =
              (C &&
                C.images &&
                C.images.menuCovers &&
                C.images.menuCovers.kanji) ||
              "./assets/win.jpg";
            memoryGrid.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;width:100%"><img src="${imgPath}" alt="You Win!" style="max-width:100%;height:auto;border-radius:10px;box-shadow:0 6px 18px rgba(43,43,68,0.15)"/></div>`;
          } catch (_) {}
          addHearts(5);
          playWin();
          setTimeout(() => {
            try {
              SFX.play("extra.thanks");
            } catch (_) {}
          }, 900);
        }, 300);
      }
    }

    function unflipUnmatched() {
      setTimeout(() => {
        [firstCard, secondCard].forEach((c) => c.classList.remove("flipped"));
        resetTurn();
      }, 700);
      try {
        SFX.play("memory.miss");
      } catch (_) {}
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
      // subtle tick while timing (every ~5s)
      try {
        if (window.__memoryTickId) {
          clearInterval(window.__memoryTickId);
          window.__memoryTickId = null;
        }
      } catch (_) {}
      try {
        window.__memoryTickId = setInterval(() => {
          try {
            SFX.play("memory.tick", { volume: 0.35 });
          } catch (_) {}
        }, 5000);
      } catch (_) {}
    }
    function stopTimer(finalize) {
      if (timerId) clearInterval(timerId);
      timerId = null;
      try {
        if (window.__memoryTickId) clearInterval(window.__memoryTickId);
      } catch (_) {}
      try {
        window.__memoryTickId = null;
      } catch (_) {}
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
        bestEl().textContent = isFinite(prev) ? formatTime(prev) : "-";
    }

    // Expose stop hook for navigation cleanup
    window.__memoryStop = () => {
      try {
        stopTimer(false);
      } catch (_) {}
    };
    renderBest();

    // ------- Sound helpers (asset SFX) -------
    function playFlip() {
      try {
        SFX.play("memory.flip");
      } catch (_) {}
    }
    function playMatch() {
      try {
        SFX.play("memory.match");
      } catch (_) {}
    }
    function playWin() {
      try {
        SFX.play("memory.win");
      } catch (_) {}
    }
  }

  function initHeartCollector() {
    const heartZone = document.getElementById("heartZone");
    const gameHeartCountEl = document.getElementById("gameHeartCount");
    // reset button may be removed from the UI; handle gracefully
    const resetHeartsBtn = document.getElementById("resetHearts");
    // Optional cute controls
    let decoyBtn = document.getElementById("spawnDecoy");
    let shieldBtn = document.getElementById("activateShield");
    if (!heartZone || !gameHeartCountEl) return;

    // Always mirror global hearts
    const syncCollector = () => {
      gameHeartCountEl.textContent = String(heartCount);
    };
    syncCollector();

    heartZone.addEventListener("click", (e) => {
      try {
        SFX.play("hearts.click");
      } catch (_) {}
      // Always link clicks to global hearts
      addHearts(1);
      // Keep collector in sync with global count
      syncCollector();
      // brief ward aura
      heartZone.classList.add("warded");
      setTimeout(() => heartZone.classList.remove("warded"), 900);

      // Create floating heart animation
      createFloatingHeart(e.clientX, e.clientY);
    });

    // Attach reset only if the button still exists (kept for dev/testing)
    if (resetHeartsBtn) {
      resetHeartsBtn.addEventListener("click", () => {
        // Reset disabled for global; simply sync to current total
        syncCollector();
      });
    }

    // Support decoy and shield controls if present
    if (decoyBtn) {
      decoyBtn.addEventListener("click", () => {
        spawnDecoyTreats(1 + Math.floor(Math.random() * 3));
      });
    }
    if (shieldBtn) {
      shieldBtn.addEventListener("click", () => {
        activateHeartShield(3000);
      });
    }
  }
  // Decoy treats distract the swallow from hearts
  function spawnDecoyTreats(n = 2) {
    const body = document.body;
    const vw = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    for (let i = 0; i < n; i++) {
      const d = document.createElement("div");
      d.className = "decoy-treat";
      d.textContent = Math.random() < 0.5 ? "🍪" : "🍭";
      d.style.left = Math.random() * vw + "px";
      body.appendChild(d);
      setTimeout(() => d.remove(), 6000);
    }
    // brief SFX
    try {
      SFX.play("extra.yo");
    } catch (_) {}
  }

  // Temporary shield prevents swallow from eating hearts
  let __heartShieldUntil = 0;
  function activateHeartShield(ms = 3000) {
    __heartShieldUntil = Date.now() + ms;
    const zone = document.getElementById("heartZone");
    if (zone) {
      zone.classList.add("warded");
      setTimeout(() => zone.classList.remove("warded"), ms);
    }
    try {
      SFX.play("extra.fx1");
    } catch (_) {}
  }

  function initRandomMiku() {
    const randomMikuImg = document.getElementById("randomMikuImg");
    const changeMikuBtn = document.getElementById("changeMiku");

    changeMikuBtn.addEventListener("click", () => {
      const randomImage =
        MIKU_IMAGES[Math.floor(Math.random() * MIKU_IMAGES.length)];
      randomMikuImg.src = randomImage;

      // Add bounce effect
      try {
        SFX.play("ui.change");
      } catch (_) {}
      randomMikuImg.style.animation = "bounce 0.6s ease-out";
      setTimeout(() => {
        randomMikuImg.style.animation = "";
      }, 600);
    });
  }

  // ====== SHRINE SECTION ======
  function initShrine() {
    const mikuGallery = document.getElementById("mikuGallery");
    const songList = document.querySelector("#shrine .song-list");
    if (!mikuGallery && !songList) return;

    function renderGallery() {
      // Only include pixel-art sources
  const pixelOnly = MIKU_IMAGES.filter((u) => /\/assets\/pixel-miku\//i.test(u) || /Pixel Hatsune Miku by Cutebunni/i.test(u));

  // Always include PixieBel surprise slot (hidden '?' until won)
  const pixieUrl = "./assets/pixel-miku/101 - PixieBel (bonus).gif";
      const coll = collectionMap();
      const pixieOwned = !!coll[pixieUrl];

      const galleryItems = pixelOnly.slice();
      if (galleryItems.indexOf(pixieUrl) === -1) galleryItems.push(pixieUrl);

      mikuGallery.innerHTML = galleryItems
        .map((img, index) => {
          const isPixieSlot = /PixieBel \(bonus\)\.gif$/i.test(img);
          const coverClass = isPixieSlot && !pixieOwned ? "mystery-cover" : "";
          const coverText = isPixieSlot && !pixieOwned ? '<div class="mystery-text">?</div>' : "";
          const r =
            typeof rarityFor === "function"
              ? rarityFor(img)
              : typeof rarityForGlobal === "function"
              ? rarityForGlobal(img)
              : 1;
          const rClass = `rarity-${r}`;
          const clickable = !(isPixieSlot && !pixieOwned);
          const onClick = clickable ? `onclick=\"openImageModal('${img}')\"` : '';
          return `
          <div class="gallery-item ${coverClass} ${rClass}">
            <img data-src="${img}" alt="Miku ${index + 1}" class="gallery-image lazy" loading="lazy" decoding="async" ${onClick}>
            <div class="rarity-ring"></div>
            ${coverText}
          </div>
        `;
        })
        .join("");

      const lazyImgs = mikuGallery.querySelectorAll("img.lazy");
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const el = entry.target;
                el.src = el.getAttribute("data-src");
                el.classList.remove("lazy");
                io.unobserve(el);
              }
            });
          },
          { rootMargin: "200px 0px" }
        );
        lazyImgs.forEach((img) => io.observe(img));
      } else {
        lazyImgs.forEach((el) => {
          el.src = el.getAttribute("data-src");
          el.classList.remove("lazy");
        });
      }
    }

    if (mikuGallery) {
      if (MIKU_IMAGES.length) renderGallery();
      else
        document.addEventListener("miku-images-ready", renderGallery, {
          once: true,
        });
    }

    // Lightweight Miku mini-player for favorites (YouTube)
    if (songList) {
      const playFavorite = (title, videoId, search) => {
        // Stop any site audio
        try {
          if (window.__stopBgm) window.__stopBgm(true);
        } catch (_) {}
        try {
          if (window.__pauseRadio) window.__pauseRadio();
        } catch (_) {}
        try {
          if (window.SFX) SFX.play("ui.select");
        } catch (_) {}

        // Ensure a player exists
        ensureMikuPlayer();
        // Load the video/search into the iframe
        const iframe = document.getElementById("mikuPlayerIframe");
        if (!iframe) return;
        const safeVid = (videoId || '').trim();
        const query = (search || title || '').toString();
        const base = safeVid
          ? `https://www.youtube.com/embed/${encodeURIComponent(safeVid)}`
          : `https://www.youtube.com/embed`;
        const qs = safeVid
          ? `autoplay=1&rel=0&playsinline=1&modestbranding=1&color=white`
          : `listType=search&list=${encodeURIComponent(
              query
            )}&autoplay=1&rel=0&playsinline=1&modestbranding=1&color=white`;
        const origin = (() => {
          try {
            return `&origin=${encodeURIComponent(location.origin)}`;
          } catch {
            return "";
          }
        })();
  const url = `${base}?${qs}${origin}`;
  // If no videoId and embed search is blocked, optionally fall back later; for now set src
  iframe.src = url;
        const now = document.getElementById("mikuPlayerNow");
        if (now) now.textContent = title || "Now Playing";
        const wrap = document.getElementById("mikuPlayer");
        if (wrap) wrap.style.display = "block";
      };

      const ensureMikuPlayer = () => {
        if (document.getElementById("mikuPlayer")) return;
        const wrap = document.createElement("div");
        wrap.id = "mikuPlayer";
        wrap.style.cssText = [
          "position:fixed",
          "right:16px",
          "bottom:16px",
          "width:360px",
          "z-index:9999",
          "background:rgba(255,255,255,0.96)",
          "backdrop-filter:saturate(1.2) blur(6px)",
          "border:2px solid var(--border)",
          "border-radius:14px",
          "box-shadow:0 10px 30px rgba(43,43,68,0.25)",
        ].join(";");

        wrap.innerHTML = `
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px 6px 10px;border-bottom:1px solid var(--border);border-top-left-radius:12px;border-top-right-radius:12px;background:linear-gradient(90deg, rgba(189,227,255,0.4), rgba(255,255,255,0.4))">
            <div style="display:flex;align-items:center;gap:8px;font-weight:900">
              ${mikuIcon("jumpingMusic", "🎵", "miku-icon")}
              <span id="mikuPlayerNow">Now Playing</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px">
              <button id="mikuPlayerLove" title="send love" class="pixel-btn" style="padding:4px 8px;line-height:1">💖</button>
              <button id="mikuPlayerClose" title="close" class="pixel-btn" style="padding:4px 8px;line-height:1">✖</button>
            </div>
          </div>
          <div style="width:100%;aspect-ratio:16/9;border-bottom-left-radius:12px;border-bottom-right-radius:12px;overflow:hidden;background:#000">
            <iframe id="mikuPlayerIframe" style="width:100%;height:100%;border:0;display:block" src="about:blank" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
          </div>`;
        document.body.appendChild(wrap);

        const stop = () => {
          const iframe = document.getElementById("mikuPlayerIframe");
          if (iframe) iframe.src = "about:blank";
          const wrap = document.getElementById("mikuPlayer");
          if (wrap) wrap.style.display = "none";
          try {
            if (window.SFX) SFX.play("ui.back");
          } catch (_) {}
        };
  const closeBtn = document.getElementById("mikuPlayerClose");
        if (closeBtn) closeBtn.addEventListener("click", stop);
  document.addEventListener('keydown', function escClose(e){ if(e.key==='Escape'){ stop(); document.removeEventListener('keydown', escClose);} });
        const loveBtn = document.getElementById("mikuPlayerLove");
        if (loveBtn)
          loveBtn.addEventListener("click", () => {
            try {
              addHearts(1);
            } catch (_) {}
          });
        window.__closeMikuPlayer = stop;
      };

  songList.addEventListener("click", (e) => {
        const li = e.target && e.target.closest("li.favorite-song");
        if (!li) return;
        const label =
          li.getAttribute("data-title") || li.textContent || "Now Playing";
        const vid = li.getAttribute("data-video-id") || "";
        const search = li.getAttribute("data-search") || label;
        playFavorite(label, vid, search);
      });

      // Backfill data attributes for static list items if not present
      songList.querySelectorAll('li').forEach((li)=>{
        if (!li.classList.contains('favorite-song')) li.classList.add('favorite-song');
        if (!li.getAttribute('data-title')) li.setAttribute('data-title', li.textContent.trim());
      });
    }
  }

  // Removed: openImageModal is now handled by the new enhanced version below

  // ====== FRIENDS SECTION ======
  function initFriends() {
    const friendsList = document.getElementById("friendsList");

    friendsList.innerHTML = FRIENDS.map((friend) => {
      const icon = friend.mikuIcon
        ? mikuIcon(friend.mikuIcon, friend.emoji)
        : friend.emoji;
      return `
          <a href="${friend.url}" class="friend-button" target="_blank">
            ${icon} ${friend.name}
          </a>
        `;
    }).join("");
  }

  // ====== CURSOR EFFECTS ======
  function initCursorEffects() {
    const cursorTrail = document.getElementById("cursorTrail");
    let lastTrailTime = 0;
    let rafId = null;

    // Optimized mousemove with RAF throttling for better performance
    document.addEventListener(
      "mousemove",
      (e) => {
        const now = Date.now();
        if (now - lastTrailTime > 160 && !rafId) {
          rafId = requestAnimationFrame(() => {
            createCursorTrail(e.clientX, e.clientY);
            lastTrailTime = now;
            rafId = null;
          });
        }
      },
      { passive: true }
    );

    function createCursorTrail(x, y) {
      // Performance optimization: reuse elements from a pool
      if (!window._heartPool) window._heartPool = [];

      let heart = window._heartPool.pop();
      if (!heart) {
        heart = document.createElement("div");
        heart.className = "heart-trail";
        heart.textContent = "💖";
      }

      // Reset position efficiently
      heart.style.cssText = `left: ${x}px; top: ${y}px; opacity: 1; transform: translateZ(0);`;

      cursorTrail.appendChild(heart);

      // Optimized cleanup with object pooling
      setTimeoutTracked(() => {
        if (heart.parentNode) {
          heart.parentNode.removeChild(heart);
          // Return to pool instead of destroying
          if (window._heartPool.length < 20) {
            window._heartPool.push(heart);
          }
        }
      }, 2000);
    }
  }

  // ====== CARD PAGINATION SYSTEM ======
  function initCardPagination() {
    const paginatedCards = document.querySelectorAll(".paginated-card");

    paginatedCards.forEach((card) => {
      const cardType = card.dataset.card;
      const pages = card.querySelectorAll(".card-page");
      const prevBtn = card.querySelector(".prev-btn");
      const nextBtn = card.querySelector(".next-btn");
      const indicator = card.querySelector(".page-indicator");

      if (pages.length <= 1) return; // No pagination needed

      let currentPage = 0;

      function updateCard() {
        pages.forEach((page, index) => {
          page.classList.toggle("active", index === currentPage);
        });

        if (indicator) {
          indicator.textContent = /*html*/ `${currentPage + 1}/${pages.length}`;
        }

        // Add sparkle effect when changing pages
        createSparkleEffect(card);
      }

      function nextPage() {
        currentPage = (currentPage + 1) % pages.length;
        updateCard();

        // Play a cute sound
        try {
          SFX.play("ui.move");
        } catch (_) {}
      }

      function prevPage() {
        currentPage = (currentPage - 1 + pages.length) % pages.length;
        updateCard();

        // Play a cute sound
        try {
          SFX.play("ui.move");
        } catch (_) {}
      }

      if (nextBtn) nextBtn.addEventListener("click", nextPage);
      if (prevBtn) prevBtn.addEventListener("click", prevPage);

      // Auto-advance every 10 seconds for about cards (with memory cleanup)
      if (cardType === "about") {
        setIntervalTracked(() => {
          nextPage();
        }, 10000);
      }
    });
  }

  // ====== UTILITY FUNCTIONS ======
  // Hearts economy: scaled award helper by difficulty and level
  function awardHearts(base) {
    let amt = base;
    const d =
      typeof window.getJpDifficulty === "function"
        ? window.getJpDifficulty()
        : 3;

    // More generous rewards for harder difficulties
    if (d >= 8) amt = Math.floor(base * 2.5); // Expert: 2.5x
    else if (d >= 6) amt = Math.floor(base * 2); // Hard: 2x
    else if (d >= 4) amt = Math.floor(base * 1.5); // Medium: 1.5x
    else amt = base; // Easy: 1x

    // Bonus chance for extra heart on medium+
    if (d >= 4 && Math.random() < 0.3) amt += 1;

    // Apply level multiplier to final amount
    const playerLevel = parseInt(localStorage.getItem("study.level") || "1", 10);
    amt = Math.floor(amt * Math.max(1, playerLevel * 0.1)); // 10% bonus per level

    addHearts(amt);
    return amt;
  }

  // Passive hearts gain system based on player level
  function initPassiveHearts() {
    const PASSIVE_INTERVAL = 30000; // 30 seconds
    
    function givePassiveHearts() {
      const playerLevel = parseInt(localStorage.getItem("study.level") || "1", 10);
      const heartsToGive = Math.max(1, Math.floor(playerLevel / 2)); // 1 heart per 2 levels
      
      try {
        addHearts(heartsToGive);
        console.log(`Passive hearts: +${heartsToGive} (Level ${playerLevel})`);
      } catch(e) {
        console.error('Passive hearts error:', e);
      }
    }
    
    // Start passive hearts timer
    if (window.setIntervalTracked) {
      setIntervalTracked(givePassiveHearts, PASSIVE_INTERVAL);
    } else {
      setInterval(givePassiveHearts, PASSIVE_INTERVAL);
    }
  }

  // Expose minimal API (consolidated below near global export)

  // Singer system
  function collectionMap() {
    try {
      return JSON.parse(localStorage.getItem("gacha.collection") || "{}");
    } catch (_) {
      return {};
    }
  }
  function singerGet() {
    return localStorage.getItem("singer.current") || "";
  }
  function singerSet(url) {
    const coll = collectionMap();
    if (!coll[url]) {
      loveToast("Win this singer in Gacha first!");
      try {
        SFX.play("ui.unavailable");
      } catch (_) {}
      return false;
    }
    localStorage.setItem("singer.current", url);
    applySinger();
    loveToast("Singer set! 🎤");
    try {
      SFX.play("ui.select");
    } catch (_) {}
    return true;
  }
  function applySingerTo(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    const url = singerGet();
    if (url) {
      el.src = url;
      return;
    }
    // Fallback image when no singer selected yet
    try {
      // Prefer a known hero/shrine image from content
      const fallback =
        (C.images && (C.images.heroMiku || C.images.shrineMiku)) ||
        (Array.isArray(window.MIKU_IMAGES) && window.MIKU_IMAGES.length
          ? window.MIKU_IMAGES[0]
          : null);
      if (fallback) {
        el.src = fallback;
        return;
      }
    } catch (_) {}
    el.removeAttribute("src");
  }
  function applySinger() {
    // update card badges if present
    document.querySelectorAll(".singer-badge").forEach((_) => {
      applySingerTo("#" + _.id);
    });
    applySingerTheme();
  }
  function applySingerTheme() {
    try {
      const url = singerGet();
      const r = url
        ? typeof rarityFor === "function"
          ? rarityFor(url)
          : rarityForGlobal(url)
        : 0;
      const color =
        r >= 5
          ? "#ffb300"
          : r >= 4
          ? "#a594f9"
          : r >= 3
          ? "#6bc3ff"
          : "#8fd3a8";
      const prog = document.getElementById("hudLevelProgress");
      if (prog)
        prog.style.background = `linear-gradient(45deg, ${color}, #ffffff)`;
  // HUD singer image removed
    } catch (_) {}
  }
  window.setSinger = singerSet;
  window.getSinger = singerGet;
  function getSingerScoreMult(){
    try{
      const url = singerGet();
      if (!url) return 1;
      const coll = collectionMap();
      const entry = coll[url];
      let m = 1;
      if (entry && entry.multiplier) m = entry.multiplier;
      else {
        // fallback to rarity-based multiplier
        m = typeof rarityFor === 'function' ? rarityFor(url) : rarityForGlobal(url);
      }
      // Convert integer rarity/multiplier into a gentle bonus: 1.00 .. 1.40
      const bonus = Math.max(0, (m - 1)) * 0.1; // +10% per step above 1
      return 1 + Math.min(0.4, bonus);
    }catch(_){ return 1; }
  }
  try { window.getSingerScoreMult = getSingerScoreMult; } catch(_) {}

  // Image modal with card info and singer selection
  function ensureImageModal() {
    let m = document.getElementById("imageModal");
    if (m) return m;
    m = document.createElement("div");
    m.id = "imageModal";
    m.className = "image-modal";
    m.innerHTML = `
      <div class="image-panel">
        <div class="top">
          <img id="imageModalImg" alt="Preview" />
          <div class="meta">
            <h3 id="imageModalTitle">Hatsune Miku</h3>
            <div id="imageModalRarity">★</div>
            <div id="imageModalOwned"></div>
            <div id="imageModalInfo" style="font-size:14px;color:var(--ink-soft);margin-top:8px;"></div>
            <div id="imageModalSong" style="margin-top:8px;"></div>
          </div>
        </div>
        <div class="actions">
          <button class="pixel-btn" id="imageModalSetSinger">Set as Singer</button>
          <button class="pixel-btn" id="imageModalOpenDex">Open MikuDex</button>
          <button class="pixel-btn" id="imageModalClose">Close</button>
        </div>
      </div>`;
    document.body.appendChild(m);
    m.addEventListener("click", (e) => {
      if (e.target === m) m.classList.remove("open");
    });
    // Allow ESC to close
    document.addEventListener('keydown', (ev)=>{
      if (ev.key === 'Escape' && m.classList.contains('open')) m.classList.remove('open');
    });
    m.querySelector("#imageModalClose").addEventListener("click", () =>
      m.classList.remove("open")
    );
    m.querySelector("#imageModalOpenDex").addEventListener("click", () => {
      // open Games -> Gacha -> Dex
      try {
        document.querySelector('[data-section="games"]').click();
      } catch (_) {}
      const btn = document.getElementById("gachaCollectionBtn");
      if (btn) btn.click();
    });
    return m;
  }

  // Enhanced openImageModal with character identification
  function guessName(url) {
    try {
      if (typeof window.getMikuMeta === "function") {
        const meta = window.getMikuMeta(url, true);
        if (meta && meta.name) return meta.name;
      }
    } catch (_) {}
    return "Hatsune Miku";
  }

  function getCharacterInfo(url) {
    try {
      if (typeof window.getMikuMeta === "function") {
        const meta = window.getMikuMeta(url, true);
        if (meta && meta.description) return meta.description;
      }
    } catch (_) {}
    return "The beloved virtual singer who brings music and joy to everyone! 🎤";
  }
  function hashCode(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) {
      h = (h << 5) - h + s.charCodeAt(i);
      h |= 0;
    }
    return h >>> 0;
  }
  function rarityForGlobal(url) {
    try {
      if (typeof window.getMikuMeta === "function") {
        const meta = window.getMikuMeta(url, true);
        if (meta && typeof meta.rarity === "number") return meta.rarity;
      }
    } catch (_) {}
    const r = hashCode(url) % 100;
    // Match local rarityFor fallback distribution
    return r < 12 ? 1 : r < 30 ? 2 : r < 60 ? 3 : r < 85 ? 4 : 5;
  }
  window.openImageModal = function (url) {
    const m = ensureImageModal();
    const img = m.querySelector("#imageModalImg");
    const title = m.querySelector("#imageModalTitle");
    const rar = m.querySelector("#imageModalRarity");
    const owned = m.querySelector("#imageModalOwned");
    const info = m.querySelector("#imageModalInfo");
    const songDiv = m.querySelector("#imageModalSong");
    const setBtn = m.querySelector("#imageModalSetSinger");

    const meta = typeof window.getMikuMeta === "function" ? window.getMikuMeta(url, true) : null;
    img.src = url;
    title.textContent = meta?.name || guessName(url);
    info.textContent = meta?.description || getCharacterInfo(url);

    if (songDiv) {
      if (meta && meta.song) {
        const match = meta.song.match(/(?:v=|be\/)([a-zA-Z0-9_-]{11})/);
        const vid = match ? match[1] : "";
        songDiv.innerHTML = vid
          ? `<iframe style="width:100%;aspect-ratio:16/9;border:0;border-radius:8px" src="https://www.youtube.com/embed/${vid}" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
          : "";
      } else {
        songDiv.innerHTML = "";
      }
    }

    const r = typeof rarityFor === "function" ? rarityFor(url) : rarityForGlobal(url);
    rar.textContent = "Rarity: " + "★".repeat(r);

    const coll = collectionMap();
    const entry = coll[url];
    if (entry) {
      owned.textContent = `Owned: x${entry.count}`;
      setBtn.disabled = false;
      setBtn.textContent = "Set as Singer";
    } else {
      owned.textContent = "Owned: —";
      setBtn.disabled = true;
      setBtn.textContent = "Win in Gacha";
    }
    setBtn.onclick = () => singerSet(url);
    try {
      SFX.play("extra.camera");
    } catch (_) {}
    m.classList.add("open");
  };

  function setGameTheme(game) {
    try {
      const theme = (C.music && C.music.themes && C.music.themes[game]) || null;
      if (theme && theme.accent) {
        const prog = document.getElementById("hudLevelProgress");
        if (prog)
          prog.style.background = `linear-gradient(45deg, ${theme.accent}, #ffffff)`;
        const singer = document.getElementById("hudSingerImg");
        if (singer) singer.style.borderColor = theme.accent;
      } else {
        applySingerTheme();
      }
      if (theme && theme.src && window.__bgmAudio && !window.__bgmKilled) {
        const a = window.__bgmAudio;
        const wasPlaying = !a.paused;
        a.pause();
        a.src = theme.src;
        a.load();
        if (wasPlaying) {
          a.play().catch(() => {});
        }
      }
    } catch (_) {}
  }
  function addHearts(amount) {
    heartCount += amount;
    localStorage.setItem("pixelbelle-hearts", heartCount);
    updateCounters();
    try {
      if (typeof window.__updateHudHearts === "function")
        window.__updateHudHearts();
    } catch (_) {}

    // Play a pleasant chime for adding hearts
    try {
      SFX.play("hearts.add");
      if (amount >= 5) SFX.play("extra.coin");
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
          const milestoneMsg = /*html*/ `${milestoneIcon} ${highestMilestone.msg}`;
          loveToast(milestoneMsg);
          try {
            SFX.play("hearts.milestone");
          } catch (_) {}

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

  // Revolutionary Beatpad System - PlayStation controller style
  function createBeatpadButton(text, index, onAnswer) {
    const beatpadStyles = [
      { color: "#00AA00", symbol: "▲", key: "q", label: "Triangle" },
      { color: "#0066CC", symbol: "✕", key: "e", label: "X" },  
      { color: "#CC0066", symbol: "●", key: "z", label: "Circle" },
      { color: "#FFAA00", symbol: "■", key: "c", label: "Square" }
    ];
    
    const style = beatpadStyles[index] || beatpadStyles[0];
    const btn = document.createElement("button");
    btn.className = "pixel-btn beatpad-btn";
    btn.textContent = text;
    btn.setAttribute("data-beatpad-pos", index);
    btn.setAttribute("data-beatpad-key", style.key);
    
    btn.style.cssText = `
      position: relative;
      padding: 16px;
      min-height: 80px;
      border: 3px solid ${style.color};
      background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7));
      color: var(--ink);
      font-weight: 800;
      transition: all 0.2s ease;
      backdrop-filter: blur(4px);
      overflow: hidden;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    `;
    
    // Add symbol overlay
    const symbol = document.createElement("div");
    symbol.textContent = style.symbol;
    symbol.style.cssText = `
      position: absolute;
      top: 6px;
      right: 10px;
      font-size: 20px;
      color: ${style.color};
      font-weight: 900;
      opacity: 0.8;
    `;
    btn.appendChild(symbol);
    
    // Add keyboard hint
    const hint = document.createElement("div");
    hint.textContent = style.key.toUpperCase();
    hint.style.cssText = `
      position: absolute;
      bottom: 6px;
      left: 10px;
      font-size: 11px;
      color: ${style.color};
      font-weight: 700;
      opacity: 0.7;
      padding: 2px 4px;
      background: rgba(255,255,255,0.8);
      border-radius: 4px;
    `;
    btn.appendChild(hint);
    
    btn.addEventListener("click", () => onAnswer(text, btn, style));
    
    return { btn, style };
  }

  // ====== ULTIMATE PROJECT DIVA BEATPAD SYSTEM ======
  
  // PlayStation button mapping and colors
  const PS_BUTTONS = [
    { symbol: '△', key: 'Q', color: '#00ff88', name: 'triangle' },
    { symbol: '○', key: 'E', color: '#ff0080', name: 'circle' },
    { symbol: '□', key: 'Z', color: '#ffaa00', name: 'square' },
    { symbol: '×', key: 'C', color: '#0088ff', name: 'cross' }
  ];

  // Create enhanced beatpad button that merges with quiz options
  function createUltimateBeatpadButton(text, index, onAnswer) {
    const psBtn = PS_BUTTONS[index % 4];
    const btn = document.createElement('button');
    
    btn.className = 'pixel-btn beatpad-btn';
    btn.textContent = text;
    btn.setAttribute('data-ps', psBtn.name);
    btn.setAttribute('data-symbol', psBtn.symbol);
    btn.setAttribute('data-key', psBtn.key);
    btn.setAttribute('data-beatpad-key', psBtn.key.toLowerCase());
    btn.style.color = psBtn.color;
    
    // Enhanced click handler with timing and effects
    btn.addEventListener('click', () => {
      if (btn.disabled) return;
      
      // Perfect timing detection
      const now = performance.now();
      const timingSinceNote = now - (btn.dataset.lastBeatTime || 0);
      let coolWindow = 150;
      try { const p = (window.Jukebox && Jukebox.getPreset && Jukebox.getPreset()); if (p && p.judge && p.judge.cool) coolWindow = p.judge.cool; } catch(_){}
      const isPerfectTiming = timingSinceNote < coolWindow;
      
      if (isPerfectTiming) {
        btn.style.animation = 'perfectTiming 0.4s ease';
        createPerfectHitEffect(btn, psBtn.color);
      }
      
      // Call original answer handler
      onAnswer(text, btn, { ...psBtn, isPerfect: isPerfectTiming });
      
      // Visual feedback
      btn.style.animation = 'divaHitPulse 0.3s ease';
      setTimeout(() => btn.style.animation = '', 300);
    });
    
    return { btn, style: psBtn };
  }

  // Enhanced keyboard handler for ultimate beatpad
  function setupUltimateBeatpadKeyboard(container, onAnswer) {
    const handleKeyPress = (e) => {
      const key = e.key.toLowerCase();
      const btn = container.querySelector(`[data-beatpad-key="${key}"]`);
      if (btn && !btn.disabled) {
        // Add timing for keyboard presses too
        const now = performance.now();
        btn.dataset.lastKeyTime = now;
        
        // Enhanced visual feedback for keyboard
        btn.style.transform = "scale(0.95) translateY(-2px)";
        btn.style.filter = "brightness(1.2)";
        
        setTimeout(() => {
          btn.style.transform = "";
          btn.style.filter = "";
        }, 150);
        
        btn.click();
        e.preventDefault();
      }
    };
    
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }

  // Create perfect hit effect with particles and glow
  function createPerfectHitEffect(element, color) {
    try {
      // Create glow burst
      const glowBurst = document.createElement('div');
      glowBurst.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, ${color}40, transparent);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        pointer-events: none;
        z-index: 15;
      `;
      
      element.style.position = element.style.position || 'relative';
      element.appendChild(glowBurst);
      
      glowBurst.animate([
        { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
        { transform: 'translate(-50%, -50%) scale(2)', opacity: 0 }
      ], { duration: 500, easing: 'ease-out' });
      
      setTimeout(() => glowBurst.remove(), 500);
      
      // Play perfect sound effect
      try {
        SFX.play("result.perfect");
      } catch (_) {}
    } catch(e) {
      console.log("Perfect hit effect error:", e);
    }
  }

  // Falling beats system synchronized with rhythm
  function createFallingBeatsSystem(container) {
    if (!container || container.querySelector('.beats-layer')) return;
    
    const beatsLayer = document.createElement('div');
    beatsLayer.className = 'beats-layer';
    beatsLayer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 5;
      overflow: hidden;
    `;
    
    container.style.position = container.style.position || 'relative';
    container.appendChild(beatsLayer);
    
    // Spawn falling beats at rhythm intervals
    let beatInterval = null;
    
    function spawnBeat(targetIndex = Math.floor(Math.random() * 4)) {
      const psBtn = PS_BUTTONS[targetIndex];
      const beat = document.createElement('div');
      beat.className = `beat-note ${psBtn.name}`;
      
      // Position above the target button
      const targetBtn = container.querySelector(`[data-ps="${psBtn.name}"]`);
      if (targetBtn) {
        const rect = targetBtn.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const leftPos = rect.left - containerRect.left + rect.width / 2 - 8;
        
        beat.style.left = leftPos + 'px';
        beat.style.top = '-20px';
        
        // Store timing for perfect hit detection
        const fallTime = performance.now();
        let travel = 800;
        try { const p = (window.Jukebox && Jukebox.getPreset && Jukebox.getPreset()); if (p && p.travelMs) travel = p.travelMs; } catch(_){}
        targetBtn.dataset.lastBeatTime = fallTime + travel; // fall time by preset
        
        beatsLayer.appendChild(beat);
        
        // Animate fall
        beat.animate([
          { transform: 'translateY(-20px) scale(0.8)', opacity: 0.8 },
          { transform: 'translateY(120px) scale(1)', opacity: 1 }
        ], { duration: (function(){ try{ const p = (window.Jukebox && Jukebox.getPreset && Jukebox.getPreset()); return (p && p.travelMs) ? p.travelMs : 800; }catch(_){ return 800; } })(), easing: 'ease-in' });
        
        setTimeout(() => beat.remove(), (function(){ try{ const p=(window.Jukebox&&Jukebox.getPreset&&Jukebox.getPreset()); return (p&&p.travelMs)?p.travelMs:800; }catch(_){ return 800; } })());
      }
    }
    
    function startBeats() {
      if (beatInterval) return;
      
      const bpm = parseInt(localStorage.getItem('rhythm.bpm') || '120', 10);
      const interval = (60000 / bpm) * 0.75; // Slightly faster than BPM for challenge
      
      beatInterval = setInterval(() => {
        if (window.__rhythmMet && !document.hidden) {
          spawnBeat();
        }
      }, interval);
    }
    
    function stopBeats() {
      if (beatInterval) {
        clearInterval(beatInterval);
        beatInterval = null;
      }
    }
    
    // Auto-start when rhythm is enabled
    if (window.__rhythmMet) {
      setTimeout(startBeats, 1000);
    }
    
    // Clean up on navigation
    container.__stopBeats = stopBeats;
    
    return { startBeats, stopBeats, spawnBeat };
  }

  // Combo milestone effects
  function createComboMilestoneEffect(container, combo) {
    const milestones = [5, 10, 25, 50, 100];
    if (!milestones.includes(combo)) return;
    
    // Spotlight sweep
    const spotlight = document.createElement('div');
    spotlight.className = 'spotlight-sweep';
    container.style.position = container.style.position || 'relative';
    container.appendChild(spotlight);
    setTimeout(() => spotlight.remove(), 2000);
    
    // Confetti burst
    createConfettiBurst(container, combo);
    
    // Epic sound effect
    try {
      if (combo >= 100) SFX.play("extra.legendary");
      else if (combo >= 50) SFX.play("extra.epic");
      else if (combo >= 25) SFX.play("extra.amazing");
      else SFX.play("extra.excellent");
    } catch (_) {}
    
    // Miku celebration
    mikuSpeakToast(`🌟 ${combo} COMBO! すごいよ! 🌟`);
  }

  // ====== MIKU JUKEBOX & MUSIC SYNC SYSTEM ======
  
  // Ultimate Project Diva music experience
  function initMikuJukebox() {
    // Create background music layer that syncs with gameplay
    const musicTracks = [
      { name: "Senbonzakura", bpm: 154, energy: "high" },
      { name: "World is Mine", bpm: 150, energy: "medium" },
      { name: "Tell Your World", bpm: 128, energy: "calm" },
      { name: "Rolling Girl", bpm: 135, energy: "medium" },
      { name: "Decorator", bpm: 165, energy: "high" }
    ];
    
    let currentTrack = null;
    let musicSync = null;
    
    function startMusicSync(track) {
      if (musicSync) clearInterval(musicSync);
      
      const beatInterval = 60000 / track.bpm;
      
      // Sync visual effects to music beats
      musicSync = setInterval(() => {
        if (window.__rhythmMet && !document.hidden) {
          // Subtle stage lighting pulse
          const stages = document.querySelectorAll('.stage-lighting');
          stages.forEach(stage => {
            stage.style.animation = 'none';
            setTimeout(() => {
              stage.style.animation = 'stageLighting 0.8s ease';
            }, 10);
          });
          
          // Idol breathing sync
          const idols = document.querySelectorAll('.stage-idol');
          idols.forEach(idol => {
            idol.style.animationDuration = (beatInterval * 4) + 'ms';
          });
        }
      }, beatInterval);
    }
    
    // Auto-select track based on game intensity
    function selectTrackForMood(score, combo) {
      let energy = "calm";
      if (combo > 20 || score > 50) energy = "high";
      else if (combo > 10 || score > 25) energy = "medium";
      
      const suitableTracks = musicTracks.filter(t => t.energy === energy);
      return suitableTracks[Math.floor(Math.random() * suitableTracks.length)];
    }
    
    // Enhanced confetti system with PlayStation colors
  function createConfettiBurst(container, intensity = 10) {
    const shapes = [
      { name: 'triangle', symbol: '△', color: '#00ff88' },
      { name: 'circle', symbol: '○', color: '#ff0080' },
      { name: 'cross', symbol: '×', color: '#0088ff' },
      { name: 'square', symbol: '□', color: '#ffaa00' }
    ];
    
    for (let i = 0; i < intensity; i++) {
      setTimeout(() => {
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const particle = document.createElement('div');
        particle.className = `confetti-particle ${shape.name}`;
        particle.textContent = shape.symbol;
        particle.style.cssText = `
          position: absolute;
          left: ${Math.random() * 100}%;
          top: -10px;
          font-size: 14px;
          font-weight: 900;
          color: ${shape.color};
          text-shadow: 0 0 8px ${shape.color};
          animation: confettiFall ${1.5 + Math.random()}s ease-out forwards;
          animation-delay: ${Math.random() * 500}ms;
          pointer-events: none;
          z-index: 12;
        `;
        
        container.appendChild(particle);
        setTimeout(() => particle.remove(), 2500);
      }, i * 30);
    }
  }

  // Perfect timing celebration effect
  function createPerfectCelebration(element) {
    // Create rainbow burst
    const burst = document.createElement('div');
    burst.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: 150px;
      height: 150px;
      background: conic-gradient(from 0deg, #00ff88, #ff0080, #0088ff, #ffaa00, #00ff88);
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0);
      pointer-events: none;
      z-index: 20;
      opacity: 0.8;
    `;
    
    element.style.position = element.style.position || 'relative';
    element.appendChild(burst);
    
    burst.animate([
      { transform: 'translate(-50%, -50%) scale(0) rotate(0deg)', opacity: 0.8 },
      { transform: 'translate(-50%, -50%) scale(1.5) rotate(180deg)', opacity: 0.6 },
      { transform: 'translate(-50%, -50%) scale(2) rotate(360deg)', opacity: 0 }
    ], { duration: 800, easing: 'ease-out' });
    
    setTimeout(() => burst.remove(), 800);
    
    // Perfect sound effect
    try {
      SFX.play("result.perfect");
    } catch (_) {}
  }

  // ====== MIKU JUKEBOX & MUSIC SYNC SYSTEM ======
  
  // Ultimate Project Diva music experience
  function initMikuJukebox() {
    // Create background music layer that syncs with gameplay
    const musicTracks = [
      { name: "Senbonzakura", bpm: 154, energy: "high" },
      { name: "World is Mine", bpm: 150, energy: "medium" },
      { name: "Tell Your World", bpm: 128, energy: "calm" },
      { name: "Rolling Girl", bpm: 135, energy: "medium" },
      { name: "Decorator", bpm: 165, energy: "high" }
    ];
    
    let currentTrack = null;
    let musicSync = null;
    
    function startMusicSync(track) {
      if (musicSync) clearInterval(musicSync);
      
      const beatInterval = 60000 / track.bpm;
      
      // Sync visual effects to music beats
      musicSync = setInterval(() => {
        if (window.__rhythmMet && !document.hidden) {
          // Subtle stage lighting pulse
          const stages = document.querySelectorAll('.stage-lighting');
          stages.forEach(stage => {
            stage.style.animation = 'none';
            setTimeout(() => {
              stage.style.animation = 'stageLighting 0.8s ease';
            }, 10);
          });
          
          // Idol breathing sync
          const idols = document.querySelectorAll('.stage-idol');
          idols.forEach(idol => {
            idol.style.animationDuration = (beatInterval * 4) + 'ms';
          });
        }
      }, beatInterval);
    }
    
    // Auto-select track based on game intensity
    function selectTrackForMood(score, combo) {
      let energy = "calm";
      if (combo > 20 || score > 50) energy = "high";
      else if (combo > 10 || score > 25) energy = "medium";
      
      const suitableTracks = musicTracks.filter(t => t.energy === energy);
      return suitableTracks[Math.floor(Math.random() * suitableTracks.length)];
    }
    
    window.mikuJukebox = {
      startMusicSync,
      selectTrackForMood,
      setTrack: (trackName) => {
        currentTrack = musicTracks.find(t => t.name === trackName) || musicTracks[0];
        startMusicSync(currentTrack);
      },
      stop: () => {
        if (musicSync) clearInterval(musicSync);
        musicSync = null;
      }
    };
  }

  // Enhanced confetti system with PlayStation colors
  function createConfettiBurst(container, intensity = 10) {
    const shapes = [
      { name: 'triangle', symbol: '△', color: '#00ff88' },
      { name: 'circle', symbol: '○', color: '#ff0080' },
      { name: 'cross', symbol: '×', color: '#0088ff' },
      { name: 'square', symbol: '□', color: '#ffaa00' }
    ];
    
    for (let i = 0; i < intensity; i++) {
      setTimeout(() => {
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const particle = document.createElement('div');
        particle.className = `confetti-particle ${shape.name}`;
        particle.textContent = shape.symbol;
        particle.style.cssText = `
          position: absolute;
          left: ${Math.random() * 100}%;
          top: -10px;
          font-size: 14px;
          font-weight: 900;
          color: ${shape.color};
          text-shadow: 0 0 8px ${shape.color};
          animation: confettiFall ${1.5 + Math.random()}s ease-out forwards;
          animation-delay: ${Math.random() * 500}ms;
          pointer-events: none;
          z-index: 12;
        `;
        
        container.appendChild(particle);
        setTimeout(() => particle.remove(), 2500);
      }, i * 30);
    }
  }

  // Perfect timing celebration effect
  function createPerfectCelebration(element) {
    // Create rainbow burst
    const burst = document.createElement('div');
    burst.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: 150px;
      height: 150px;
      background: conic-gradient(from 0deg, #00ff88, #ff0080, #0088ff, #ffaa00, #00ff88);
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0);
      pointer-events: none;
      z-index: 20;
      opacity: 0.8;
    `;
    
    element.style.position = element.style.position || 'relative';
    element.appendChild(burst);
    
    burst.animate([
      { transform: 'translate(-50%, -50%) scale(0) rotate(0deg)', opacity: 0.8 },
      { transform: 'translate(-50%, -50%) scale(1.5) rotate(180deg)', opacity: 0.6 },
      { transform: 'translate(-50%, -50%) scale(2) rotate(360deg)', opacity: 0 }
    ], { duration: 800, easing: 'ease-out' });
    
    setTimeout(() => burst.remove(), 800);
    
    // Perfect sound effect
    try {
      SFX.play("result.perfect");
    } catch (_) {}
  }

  // Initialize jukebox
  initMikuJukebox();

  // ====== PROJECT DIVA QUALITIES THAT MAKE IT AMAZING ======
  /*
  What makes Project Diva special:
  1. Perfect timing rewards with spectacular visual feedback
  2. Colorful, bouncy PlayStation button system (Triangle, Circle, Cross, Square)
  3. Falling notes that sync with music beats
  4. Combo system that builds excitement
  5. Multiple difficulty levels that feel fair yet challenging
  6. Cute character animations and reactions
  7. Satisfying sound effects for hits and misses
  8. Visual effects that celebrate achievements
  9. Smooth, responsive controls
  10. Music that drives the entire experience
  
  Enhanced for Japanese learning:
  - Each correct answer feels like hitting a perfect note
  - Vocabulary/Kanji become the "song lyrics" to learn
  - Progressive difficulty like unlocking harder songs
  - Combo system rewards consecutive correct answers
  - Perfect timing bonuses for quick responses
  - Miku's encouraging reactions and celebrations
  - Visual vocabulary reinforcement through beautiful effects
  */

  // Enhanced ring effect with PlayStation colors
  function createRingEffect(element, isCorrect = true) {
    try {
      if (window.__rhythmRings === false) return;
      
      const rings = isCorrect ? 4 : 2;
      const colors = isCorrect 
        ? ["#00ff88", "#ff0080", "#0088ff", "#ffaa00"] // PS colors
        : ["#ff6666", "#ff9999"];
      
      for (let i = 0; i < rings; i++) {
        setTimeout(() => {
          const ring = document.createElement("div");
          const color = colors[i % colors.length];
          ring.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            border: 4px solid ${color};
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 1000;
            animation: ringExpand 1s ease-out forwards;
            box-shadow: 0 0 20px ${color}60;
          `;
          
          element.style.position = element.style.position || "relative";
          element.appendChild(ring);
          
          setTimeout(() => ring.remove(), 1000);
        }, i * 100);
      }
      
      // Extra sparkle for correct answers with PS-style burst
      if (isCorrect) {
        party();
        createConfettiBurst(element.closest('.rhythm-grid') || element, 8);
      }
    } catch(e) {
      console.log("Ring effect error:", e);
    }
  }  // Make Miku speak toast messages with speech bubbles
  function mikuSpeakToast(message) {
    try {
      // Find all stage idols
      const idols = document.querySelectorAll('.stage-idol');
      if (idols.length === 0) return;
      
      // Pick a random idol to speak (or the first one)
      const speakingIdol = idols[Math.floor(Math.random() * idols.length)];
      const parent = speakingIdol.parentElement;
      if (!parent) return;
      
      // Remove any existing speech bubble
      const existingBubble = parent.querySelector('.miku-speech-bubble');
      if (existingBubble) existingBubble.remove();
      
      // Create speech bubble
      const bubble = document.createElement('div');
      bubble.className = 'miku-speech-bubble';
      bubble.innerHTML = message;
      // Place bubble above and to the side of the idol to avoid blocking UI
      const pRect = parent.getBoundingClientRect();
      const iRect = speakingIdol.getBoundingClientRect();
      const leftPx = Math.max(12, iRect.left - pRect.left + iRect.width * 0.6);
      const bottomPx = Math.max(72, pRect.bottom - iRect.top + 10);
      bubble.style.cssText = `
        position: absolute;
        bottom: ${Math.round(bottomPx)}px;
        left: ${Math.round(leftPx)}px;
        transform: translateX(0);
        background: rgba(255, 255, 255, 0.95);
        border: 2px solid var(--accent);
        border-radius: 16px;
        padding: 8px 12px;
        font-size: 0.9rem;
        font-weight: 700;
        color: var(--ink);
        max-width: 240px;
        text-align: center;
        z-index: 6;
        animation: speechBubbleIn 0.3s ease-out forwards;
        backdrop-filter: blur(4px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      `;
      
      // Add speech bubble tail
      const tail = document.createElement('div');
      tail.style.cssText = `
        position: absolute;
        bottom: -8px;
        left: 20px;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid var(--accent);
      `;
      bubble.appendChild(tail);
      
      parent.appendChild(bubble);
      
      // Make idol bounce while speaking
      speakingIdol.style.animation = 'idolSpeaking 0.6s ease-in-out';
      
      // Remove bubble after delay
      setTimeout(() => {
        if (bubble.parentElement) {
          bubble.style.animation = 'speechBubbleOut 0.3s ease-in forwards';
          setTimeout(() => bubble.remove(), 300);
        }
        speakingIdol.style.animation = 'idolBreathe 3s ease-in-out infinite';
      }, 2000);
      
    } catch(e) {
      console.log('Speech bubble error:', e);
    }
  }

  // Show a small floating toast message
  function loveToast(text) {
    const randomIndex = Math.floor(Math.random() * LOVE_TOASTS.length);
    const toastText = LOVE_TOASTS[randomIndex];
    const toastIcons = C.love?.toastIcons || [];
    const iconName = toastIcons[randomIndex];
    const icon = iconName ? mikuIcon(iconName, "💖") : "💖";

    const msg = /*html*/ `${text} ${toastText} ${icon}`;
    const toast = document.createElement("div");
    toast.innerHTML = msg;
    toast.style.cssText = /*html*/ `
      position: fixed; left: 50%; top: 20%; transform: translateX(-50%);
      background: rgba(255,255,255,0.95); border: 2px solid var(--accent);
      border-radius: 16px; padding: 12px 18px; font-weight: 800; color: var(--ink);
      box-shadow: var(--shadow); z-index: 9999; animation: fadeToast 2.5s ease-out forwards;
      backdrop-filter: blur(8px); font-size: 1.1rem;
    `;
    document.body.appendChild(toast);
    
    // Make Miku speak the toast message
    mikuSpeakToast(msg);
    
    setTimeout(() => toast.remove(), 3500);
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
      el.style.cssText = /*html*/ `
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
    try {
      if (heartCount % 25 === 0) SFX.play("extra.clap");
      else if (Math.random() < 0.5) SFX.play("extra.yo");
      else if (Math.random() < 0.5) SFX.play("extra.wan");
      else SFX.play("hearts.add");
    } catch (_) {}
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
    heart.style.cssText = /*html*/ `
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
        sparkle.style.cssText = /*html*/ `
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
      if (moodDisplayEl) moodDisplayEl.textContent = /*html*/ `💭 ${savedMood}`;
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
        try {
          SFX.play("hearts.click");
        } catch (_) {}
        addHearts(1);
        createFloatingHeart(
          heartBtn.getBoundingClientRect().left + heartBtn.offsetWidth / 2,
          heartBtn.getBoundingClientRect().top
        );
        // Also sparkle at the button
        createSparkleEffect(heartBtn);
      });
    }

    // Random updates every 30 seconds (with memory cleanup)
    setIntervalTracked(() => {
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

    // Vibe meter animation (with memory cleanup)
    setIntervalTracked(() => {
      const vibeFill =
        document.getElementById("vibe-fill") ||
        document.querySelector(".vibe-fill");
      if (vibeFill) {
        const randomVibe = Math.floor(Math.random() * 20) + 80; // 80-100%
        vibeFill.style.width = randomVibe + "%";
        vibeFill.parentNode.nextElementSibling.textContent = /*html*/ `${randomVibe}% Kawaii Energy! ✨`;
      }
    }, 5000);
  }

  // Add sparkle animation keyframes
  const sparkleStyles = document.createElement("style");
  sparkleStyles.textContent = /*html*/ `
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

  // Initialize splash screen when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSplash);
  } else {
    initSplash();
  }

  // Expose love toasts globally for shimejis
  window.LOVE_TOASTS = LOVE_TOASTS;

  // Global functions for console interaction
  // ====== FLOATING HEARTS SYSTEM ======
  function initFloatingHearts() {
    const hearts = ["💖", "💙", "💚", "💛", "💜", "🤍", "🖤"];
    const container = document.querySelector(".floating-hearts");

    if (!container) return;
    try {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return; // respect reduced motion for performance/accessibility
      }
    } catch (_) {}

    // Clear existing hearts
    container.innerHTML = "";

    // Inject styles for heart particles and swallow
    let style = document.getElementById("hearts-style");
    if (!style) {
      style = document.createElement("style");
      style.id = "hearts-style";
      style.textContent = /*html*/ `
      @keyframes idolBreathe {
        0%, 100% { transform: translateX(-50%) scale(1); }
        50% { transform: translateX(-50%) scale(1.02); }
      }
      .heart-particle { position: fixed; bottom: -24px; font-size: 22px; pointer-events:none; z-index: 2; animation: heartRise 8s linear forwards; will-change: transform, opacity; }
      @keyframes heartRise {
        0%   { transform: translateX(0) translateY(0); opacity: .8; }
        50%  { transform: translateX(var(--drift, 0)) translateY(-50vh); opacity: .9; }
        100% { transform: translateX(calc(var(--drift, 0) * 2)) translateY(-110vh); opacity: 0; }
      }
      .heart-eaten { animation: heartEaten .4s ease-out forwards !important; }
      @keyframes heartEaten { from { transform: scale(1); opacity:1 } to { transform: scale(0); opacity:0 } }
  .swallow { position: fixed; bottom: 24px; left: -100px; width: 96px; height:auto; image-rendering: pixelated; z-index: 3; pointer-events:auto; }
  .swallow.evil { filter: hue-rotate(180deg) saturate(1.3) contrast(1.2); }
  /* Warding aura around heartZone */
  .heart-zone.warded { position: relative; }
  .heart-zone.warded::after { content: ""; position: absolute; inset: -6px; border: 2px dashed #ff69b4; border-radius: 12px; animation: wardPulse .8s ease-in-out infinite; pointer-events: none; }
  @keyframes wardPulse { 0% { opacity:.9; transform: scale(1);} 100% { opacity:0; transform: scale(1.06);} }
  /* Decoy treats */
  .decoy-treat { position: fixed; bottom: -24px; font-size: 20px; pointer-events: none; z-index: 2; animation: decoyRise 6s linear forwards; }
  @keyframes decoyRise { from { transform: translateY(0);} to { transform: translateY(-90vh);} }
    `;
      document.head.appendChild(style);
    }

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

    // Create hearts periodically with visibility and count guard
    let heartsTimer = null;
    const MAX_HEARTS = 12;
    function scheduleHearts() {
      if (heartsTimer) clearTimeout(heartsTimer);
      heartsTimer = setTimeout(() => {
        if (!document.hidden && container.childElementCount < MAX_HEARTS)
          createHeart();
        scheduleHearts();
      }, 2000);
    }
    scheduleHearts();
    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.hidden) {
          if (heartsTimer) clearTimeout(heartsTimer);
        } else {
          scheduleHearts();
        }
      },
      { passive: true }
    );

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

    const slides = document.querySelectorAll(".presentation-slide");
    const totalSlides = slides.length;

    if (totalSlides === 0) return;

    const prevBtn = document.querySelector(".prev-slide");
    const nextBtn = document.querySelector(".next-slide");
    const currentSlideIndicator = document.querySelector(".current-slide");
    const progressFill = document.querySelector(".progress-fill");
    const floatingDecorations = document.querySelector(".floating-decorations");

    // Kawaii sounds for interactions (asset-based)
    const playKawaiiSound = (type = "click") => {
      try {
        if (type === "prev") SFX.play("ui.back");
        else if (type === "next") SFX.play("ui.move");
        else if (type === "auto") SFX.play("ui.se_sy_24");
        else SFX.play("ui.move");
      } catch (_) {}
    };

    // Create floating sparkles and icons
    const createFloatingElements = () => {
      if (!floatingDecorations) return;

      const decorativeIcons = [
        "sparkle",
        "love",
        "innocent",
        "cheering",
        "starUwu",
      ];

      for (let i = 0; i < 8; i++) {
        const element = document.createElement("div");
        element.className = "floating-decoration";

        const iconName =
          decorativeIcons[Math.floor(Math.random() * decorativeIcons.length)];
        element.innerHTML = mikuIcon(iconName, "✨");

        element.style.left = /*html*/ `${Math.random() * 100}%`;
        element.style.animationDelay = /*html*/ `${Math.random() * 5}s`;
        element.style.animationDuration = /*html*/ `${3 + Math.random() * 4}s`;

        floatingDecorations.appendChild(element);
      }
    };

    // Update slide display
    const updateSlide = (newSlide, playSound = true) => {
      if (newSlide < 0 || newSlide >= totalSlides) return;

      // Hide current slide
      slides[currentSlide].classList.remove("active");

      // Show new slide
      currentSlide = newSlide;
      slides[currentSlide].classList.add("active");

      // Sync container height to active slide for zero-scroll experience
      const container = document.querySelector(".presentation-content");
      if (container) {
        // measure active after paint
        requestAnimationFrame(() => {
          const active = slides[currentSlide];
          if (active) {
            const targetH = active.offsetHeight;
            // Lock height to avoid layout jump during transition
            container.style.height = targetH + "px";
          }
        });
      }

      // Update indicators
      if (currentSlideIndicator) {
        currentSlideIndicator.textContent = currentSlide + 1;
      }

      // Update progress bar
      if (progressFill) {
        const progress = ((currentSlide + 1) / totalSlides) * 100;
        progressFill.style.width = /*html*/ `${progress}%`;
      }

      // Add sparkle effect to current slide
      const currentSlideEl = slides[currentSlide];
      currentSlideEl.classList.add("slide-sparkle");
      setTimeout(() => {
        currentSlideEl.classList.remove("slide-sparkle");
      }, 1000);

      // Play kawaii sound
      if (playSound) {
        playKawaiiSound("next");
      }

      // Update button states
      if (prevBtn) prevBtn.disabled = currentSlide === 0;
      if (nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1;
    };

    // Navigation event handlers
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (currentSlide > 0) {
          // Stop auto on manual navigation
          if (isAutoPlaying) {
            stopAutoPlay();
            isAutoPlaying = false;
          }
          updateSlide(currentSlide - 1);
          playKawaiiSound("prev");
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (currentSlide < totalSlides - 1) {
          // Stop auto on manual navigation
          if (isAutoPlaying) {
            stopAutoPlay();
            isAutoPlaying = false;
          }
          updateSlide(currentSlide + 1);
          playKawaiiSound("next");
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

    // Optimized keyboard navigation with passive listeners
    document.addEventListener(
      "keydown",
      (e) => {
        // Only process if focused on presentation
        if (
          document.querySelector(".belle-presentation:hover") ||
          document.activeElement.closest(".belle-presentation")
        ) {
          switch (e.key) {
            case "ArrowLeft":
              e.preventDefault();
              if (currentSlide > 0) {
                updateSlide(currentSlide - 1);
                playKawaiiSound("prev");
              }
              break;
            case "ArrowRight":
              e.preventDefault();
              if (currentSlide < totalSlides - 1) {
                updateSlide(currentSlide + 1);
                playKawaiiSound("next");
              }
              break;
            // Space no-op (auto UI removed)
            case "Home":
              e.preventDefault();
              updateSlide(0);
              break;
            case "End":
              e.preventDefault();
              updateSlide(totalSlides - 1);
              break;
          }
        }
      },
      { passive: false }
    ); // Need preventDefault

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    const presentationEl = document.querySelector(".belle-presentation");
    if (presentationEl) {
      presentationEl.addEventListener(
        "touchstart",
        (e) => {
          touchStartX = e.changedTouches[0].screenX;
        },
        { passive: true }
      );

      presentationEl.addEventListener(
        "touchend",
        (e) => {
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
        },
        { passive: true }
      );
    }

    // Initialize
    createFloatingElements();
    // Pre-set container height to first slide
    const firstContainer = document.querySelector(".presentation-content");
    if (firstContainer && slides[0]) {
      firstContainer.style.height = slides[0].offsetHeight + "px";
    }
    updateSlide(0, false);

    // Auto-start presentation after 1.5 seconds
    setTimeout(() => {
      if (!isAutoPlaying) {
        isAutoPlaying = true;
        startAutoPlay();
        playKawaiiSound("auto");
      }
    }, 1500);

    // Pause autoplay if tab is hidden
    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.hidden) {
          stopAutoPlay();
        } else if (isAutoPlaying && !autoPlayInterval) {
          startAutoPlay();
        }
      },
      { passive: true }
    );

    // Expose controls for navigation hide/show
    window._presentationControl = {
      onShow: () => {
        // Ensure container height syncs after being hidden
        const container = document.querySelector(".presentation-content");
        if (container && slides[currentSlide]) {
          container.style.height = slides[currentSlide].offsetHeight + "px";
        }
        if (isAutoPlaying && !autoPlayInterval) startAutoPlay();
      },
      onHide: () => {
        stopAutoPlay();
        const container = document.querySelector(".presentation-content");
        if (container) container.style.height = "auto";
      },
    };
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
        try {
          SFX.play("hearts.click");
        } catch (_) {}
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
      // Randomize initial direction and side; gif faces left by default
      let vx = Math.random() < 0.5 ? 1.2 : -1.2; // px per frame (approx)
      let x = vx > 0 ? -100 : window.innerWidth + 100;
  let y = Math.max(80, Math.min(window.innerHeight - 140, window.innerHeight * (0.18 + Math.random() * 0.42)));
      let evil = false;
      let eatenThisPass = 0;

      // Toggle evil mode occasionally
      setInterval(() => {
        evil = Math.random() < 0.2 ? !evil : evil;
        img.classList.toggle("evil", evil);
        try {
          // distinct cue on mode flip
          if (evil) {
            SFX.play("result.miss");
          } else {
            SFX.play("extra.sona");
          }
        } catch (_) {}
      }, 8000);

      // Click: reward a heart and shoo off-screen briefly
      img.addEventListener("click", () => {
        try { addHearts(1); SFX.play('hearts.add'); } catch(_) {}
        vx = Math.sign(vx) * 4;
        setTimeout(() => {
          vx = Math.sign(vx) * 1.2;
        }, 1500);
      });

      function step() {
        x += vx;
        // Reset when off either edge and randomize direction each pass
        if (x > window.innerWidth + 120 || x < -120) {
          vx = Math.random() < 0.5 ? 1.2 : -1.2;
          x = vx > 0 ? -100 : window.innerWidth + 100;
          y = Math.max(80, Math.min(window.innerHeight - 140, window.innerHeight * (0.18 + Math.random() * 0.42)));
          eatenThisPass = 0;
        }
        const face = vx > 0 ? -1 : 1; // flip when moving right so Kirby faces direction
        img.style.transform = /*html*/ `translate(${x}px, ${y}px) scaleX(${face})`;

        // Occasionally swoop higher for stars
        if (Math.random() < 0.002) {
          y = Math.max(60, y - 80 - Math.random() * 60);
          // subtle whoosh on swoop
          try {
            const pan = (x / window.innerWidth) * 2 - 1;
            SFX.play("swallow.swoop", {
              volume: 0.45,
              rate: evil ? 0.92 : 1.02,
              pan,
            });
          } catch (_) {}
        } else if (Math.random() < 0.002) {
          y = Math.min(window.innerHeight * 0.8, y + 80 + Math.random() * 60);
          try {
            const pan = (x / window.innerWidth) * 2 - 1;
            SFX.play("swallow.swoop", {
              volume: 0.42,
              rate: evil ? 0.9 : 1.0,
              pan,
            });
          } catch (_) {}
        }

        // Dynamic speed: more hearts -> speed up, fewer -> slow
        const onScreenHearts =
          document.querySelectorAll(".heart-particle").length;
        if (onScreenHearts > 10) vx = Math.sign(vx) * 1.8;
        else if (onScreenHearts < 4) vx = Math.sign(vx) * 1.1;

        // If shield active, skip consuming hearts
        const shielded =
          typeof __heartShieldUntil === "number" &&
          Date.now() < __heartShieldUntil;

        // Prefer decoy treats
        const decoys = document.querySelectorAll(".decoy-treat");
        const targets = decoys.length
          ? decoys
          : document.querySelectorAll(
              ".heart-particle, .heart-trail, .celebration-particle.star"
            );
        targets.forEach((h) => {
          const r1 = img.getBoundingClientRect();
          const r2 = h.getBoundingClientRect();
          const overlap = !(
            r2.right < r1.left + 10 ||
            r2.left > r1.right - 10 ||
            r2.bottom < r1.top + 10 ||
            r2.top > r1.bottom - 10
          );
          if (overlap) {
            if (!decoys.length && shielded) return; // shield blocks heart eats
            if (!decoys.length && eatenThisPass >= 5) return; // cap per pass
            h.classList.add("heart-eaten");
            try {
              const pan = (x / window.innerWidth) * 2 - 1;
              // chomp has slight pan; evil is lower pitch
              SFX.play("swallow.chomp", {
                volume: 0.5,
                rate: evil ? 0.9 : 1.05,
                pan,
              });
            } catch (_) {}
            setTimeout(() => h.remove(), 350);
            if (!decoys.length) eatenThisPass++;
          }
        });

        requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    // HeartZone “ward”: when user clicks heartZone, temporarily repel the swallow
    const ward = document.getElementById("heartZone");
    if (ward) {
      ward.addEventListener("click", () => {
        try {
          img.style.filter =
            "drop-shadow(0 0 6px rgba(255,0,0,0.6)) " +
            (img.classList.contains("evil") ? "hue-rotate(200deg)" : "");
        } catch (_) {}
        // push it off-screen quickly
        const rect = img.getBoundingClientRect();
        const goRight = rect.left < window.innerWidth / 2;
        const target = goRight ? window.innerWidth + 160 : -160;
        const startX = rect.left;
        const startTime = performance.now();
        function dash(tNow) {
          const t = Math.min(1, (tNow - startTime) / 400);
          const nx = startX + (target - startX) * t;
          const currFace = target > startX ? -1 : 1;
          img.style.transform = `translate(${nx}px, ${rect.top}px) scaleX(${currFace})`;
          if (t < 1) requestAnimationFrame(dash);
          else
            setTimeout(() => {
              img.style.filter = "";
            }, 300);
        }
        requestAnimationFrame(dash);
      });
    }
  }

  window.pixelBelleGarden = {
    addHearts: addHearts,
    sfx: {
      play: (key) => {
        try {
          SFX.play(key);
        } catch (_) {}
      },
      sega: () => {
        try {
          SFX.play("sega.tag");
        } catch (_) {}
      },
      setEnabled: (on) => {
        try {
          SFX.setEnabled(!!on);
        } catch (_) {}
      },
      setVolume: (v) => {
        try {
          SFX.setVolume(v);
        } catch (_) {}
      },
    },
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
    // Ultimate Project Diva controls
    mikuJukebox: window.mikuJukebox || {},
    createPerfectCelebration: createPerfectCelebration,
    createConfettiBurst: createConfettiBurst,
  };

  console.log("🌸 Welcome to PixelBelle's Ultimate Project Diva Garden! 🌸");
  console.log(
    "Try: pixelBelleGarden.addHearts(10) or pixelBelleGarden.spawnShimeji()"
  );
};
// Rhythm Lite shared state
let RHY = { mult: 1 };
function getRhythmMult() {
  return RHY.mult || 1;
}
function setRhythmMult(m) {
  RHY.mult = Math.max(1, Math.min(2, m));
}
window.getRhythmMult = getRhythmMult;

// Compatibility alias for upgraded rhythm init
function attachRhythmLiteV2(cardId) {
  try { attachRhythmLite(cardId); } catch (_) {}
}

function attachRhythmLite(cardId) {
  const card = document.getElementById(cardId);
  if (!card || card.querySelector(".rhythm-lite")) return;
  const wrap = document.createElement("div");
  wrap.className = "rhythm-lite";
  wrap.style.cssText =
    "position:relative;height:120px;margin:8px 0;border:2px dashed var(--border);border-radius:10px;background:linear-gradient(180deg,rgba(189,227,255,.25),rgba(207,246,230,.25));overflow:hidden;";
  wrap.innerHTML = `<div class="lane" style="position:absolute;left:10px;right:10px;bottom:10px;height:6px;background:#2b2b44;border-radius:6px"></div>`;
  const notesHost = document.createElement("div");
  notesHost.className = "notes";
  notesHost.style.cssText =
    "position:absolute;left:0;right:0;top:0;bottom:0;pointer-events:none;";
  wrap.appendChild(notesHost);
  const mLabel = document.createElement("div");
  mLabel.style.cssText =
    "position:absolute;right:8px;top:6px;font-weight:800;color:#596286;background:rgba(255,255,255,.9);border:2px solid var(--border);border-radius:8px;padding:2px 6px;";
  mLabel.textContent = "x1.0";
  wrap.appendChild(mLabel);
  card.insertBefore(wrap, card.children[1] || card.firstChild);
  // Tunable timing
  let bpm = parseInt(
    localStorage.getItem("rhythm.bpm") || String(window.__rhythmBpm || 100),
    10
  );
  if (!isFinite(bpm)) bpm = 100;
  bpm = Math.max(60, Math.min(220, bpm));
  let travelMs = parseInt(localStorage.getItem("rhythm.travel") || "2200", 10);
  if (!isFinite(travelMs)) travelMs = 2200;
  travelMs = Math.max(800, Math.min(4000, travelMs));
  let interval = 60000 / bpm; // ms per beat
  let spawnId = null,
    metroId = null;
  // Controls UI
  const controls = document.createElement("div");
  controls.style.cssText =
    "position:absolute;left:8px;top:6px;display:flex;gap:6px;align-items:center;background:rgba(255,255,255,.9);border:2px solid var(--border);border-radius:8px;padding:2px 6px;font-weight:800;color:#596286;";
  controls.innerHTML = `
        <label style="display:flex;align-items:center;gap:4px">BPM <input id="rl-bpm-${cardId}" type="number" min="60" max="220" step="1" value="${Math.round(
    bpm
  )}" style="width:58px;border:2px solid var(--border);border-radius:8px;padding:2px 4px;font-weight:800;color:#2b2b44" /></label>
        <label style="display:flex;align-items:center;gap:4px">Travel <input id="rl-travel-${cardId}" type="number" min="800" max="4000" step="50" value="${Math.round(
    travelMs
  )}" style="width:70px;border:2px solid var(--border);border-radius:8px;padding:2px 4px;font-weight:800;color:#2b2b44" /></label>
      `;
  wrap.appendChild(controls);
  // Hide in-game BPM controls (design: remove BPM tweaking)
  controls.style.display = 'none';
  function spawn() {
    const now = performance.now();
    const n = document.createElement("div");
    n.className = "note";
    n.style.cssText =
      "position:absolute;left:calc(50% - 8px);top:-16px;width:16px;height:16px;border-radius:50%;background:linear-gradient(180deg,#a594f9,#6bc3ff);box-shadow:0 2px 6px rgba(43,43,68,.25);";
    n.dataset.t = String(now + travelMs); // reach lane in configurable time
    notesHost.appendChild(n);
    n.animate(
      [{ transform: "translateY(0)" }, { transform: "translateY(100px)" }],
      { duration: travelMs, easing: "linear" }
    );
    setTimeout(() => {
      if (n && n.parentNode) n.parentNode.removeChild(n);
    }, travelMs + 100);
  }
  function pulse() {
    if (!window.__rhythmMet) return;
    try {
      SFX.play("quiz.tick");
    } catch (_) {}
    wrap.animate([{ opacity: 1 }, { opacity: 0.92 }, { opacity: 1 }], {
      duration: 160,
    });
  }
  function start() {
    stop();
    spawn();
    spawnId = (window.setIntervalTracked || window.setInterval)(
      spawn,
      interval
    );
    if (window.__rhythmMet) {
      metroId = (window.setIntervalTracked || window.setInterval)(
        pulse,
        interval
      );
    }
  }
  function stop() {
    if (spawnId) {
      clearInterval(spawnId);
      spawnId = null;
    }
    if (metroId) {
      clearInterval(metroId);
      metroId = null;
    }
  }
  start();
  // Controls wiring
  const bpmInput = controls.querySelector(`#rl-bpm-${cardId}`);
  const trvInput = controls.querySelector(`#rl-travel-${cardId}`);
  const updateBpm = () => {
    const v = parseInt(bpmInput.value, 10);
    if (!isFinite(v)) return;
    bpm = Math.max(60, Math.min(220, v));
    interval = 60000 / bpm;
    localStorage.setItem("rhythm.bpm", String(Math.round(bpm)));
    start();
  };
  const updateTravel = () => {
    const v = parseInt(trvInput.value, 10);
    if (!isFinite(v)) return;
    travelMs = Math.max(800, Math.min(4000, v));
    localStorage.setItem("rhythm.travel", String(Math.round(travelMs)));
  };
  bpmInput.addEventListener("change", updateBpm);
  bpmInput.addEventListener("input", () => {
    /* light live update */ updateBpm();
  });
  trvInput.addEventListener("change", updateTravel);
  function showHit(label) {
    const fx = document.createElement("div");
    fx.textContent = label + "!";
    fx.style.cssText =
      "position:absolute;left:50%;transform:translateX(-50%);bottom:24px;font-weight:900;color:#2b2b44;background:rgba(255,255,255,.9);border:2px solid var(--border);border-radius:10px;padding:2px 10px;";
    wrap.appendChild(fx);
    fx.animate(
      [
        { transform: "translate(-50%,0)", opacity: 1 },
        { transform: "translate(-50%,-20px)", opacity: 0 },
      ],
      { duration: 600 }
    );
    setTimeout(() => fx.remove(), 600);
  }
  function onKey(e) {
    if (e.code !== "Space") return;
    const t = performance.now();
    const ns = Array.from(notesHost.querySelectorAll(".note"));
    let best = null,
      bestDt = 1e9;
    ns.forEach((el) => {
      const dt = Math.abs(parseFloat(el.dataset.t) - t);
      if (dt < bestDt) {
        best = el;
        bestDt = dt;
      }
    });
    if (!best) return;
    if (bestDt <= 100) {
      setRhythmMult(getRhythmMult() + 0.15);
      flashJudge(cardId, "COOL");
      showHit("COOL");
      try {
        SFX.play("memory.match");
      } catch (_) {}
      best.remove();
    } else if (bestDt <= 180) {
      setRhythmMult(getRhythmMult() + 0.08);
      flashJudge(cardId, "GREAT");
      showHit("GREAT");
      try {
        SFX.play("ui.select");
      } catch (_) {}
      best.remove();
    } else if (bestDt <= 260) {
      setRhythmMult(getRhythmMult() + 0.02);
      flashJudge(cardId, "FINE");
      showHit("FINE");
      try {
        SFX.play("ui.move");
      } catch (_) {}
      best.remove();
    } else {
      setRhythmMult(1);
      flashJudge(cardId, "MISS");
      showHit("MISS");
      try {
        SFX.play("ui.unavailable");
      } catch (_) {}
    }
    mLabel.textContent = "x" + getRhythmMult().toFixed(2);
  }
  document.addEventListener('keydown', onKey);
}
