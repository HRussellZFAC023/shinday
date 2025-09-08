/* Enhanced Webmeji/Shimeji with new features */
// Configuration for different character types
const MIKU_CONFIG = {
  basePath: "./assets/webmeji/miku",
  maxFrames: 101,
  speed: 3,
  climbSpeed: 2,
  fallSpeed: 10,
  jumpForce: 15,
  gravity: 0.5,
  walk: {
    frames: [
      "./assets/webmeji/miku/shime1.png",
      "./assets/webmeji/miku/shime2.png",
      "./assets/webmeji/miku/shime3.png",
      "./assets/webmeji/miku/shime2.png",
    ],
    interval: 200,
    loops: 6,
  },
  climb: {
    frames: [
      "./assets/webmeji/miku/shime7.png",
      "./assets/webmeji/miku/shime8.png",
    ],
    interval: 300,
    loops: 8,
  },
  ceiling: {
    frames: [
      "./assets/webmeji/miku/shime9.png",
      "./assets/webmeji/miku/shime10.png",
    ],
    interval: 280,
    loops: 8,
  },
  fall: {
    frames: [
      "./assets/webmeji/miku/shime18.png",
      "./assets/webmeji/miku/shime19.png",
    ],
    interval: 150,
    loops: 1,
  },
  fallen: {
    frames: [
      "./assets/webmeji/miku/shime22.png",
      "./assets/webmeji/miku/shime23.png",
    ],
    interval: 600,
    loops: 1,
  },
  jump: {
    frames: ["./assets/webmeji/miku/shime4.png"],
    interval: 100,
    loops: 1,
  },
  sit: {
    frames: ["./assets/webmeji/miku/shime11.png"],
    interval: 1000,
    loops: 1,
    randomizeDuration: true,
    min: 3000,
    max: 8000,
  },
  spin: {
    frames: ["./assets/webmeji/miku/shime1.png"],
    interval: 150,
    loops: 3,
  },
  dance: {
    frames: [
      "./assets/webmeji/miku/shime5.png",
      "./assets/webmeji/miku/shime6.png",
      "./assets/webmeji/miku/shime1.png",
    ],
    interval: 250,
    loops: 4,
  },
  fun: {
    frames: [
      "./assets/webmeji/miku/shime12.png",
      "./assets/webmeji/miku/shime13.png",
      "./assets/webmeji/miku/shime14.png",
      "./assets/webmeji/miku/shime13.png",
    ],
    interval: 180,
    loops: 3,
  },
  scared: {
    frames: ["./assets/webmeji/miku/shime20.png"],
    interval: 500,
    loops: 2,
  },
  happy: {
    frames: [
      "./assets/webmeji/miku/shime5.png",
      "./assets/webmeji/miku/shime6.png",
    ],
    interval: 200,
    loops: 3,
  },
  multiply: {
    frames: [
      "./assets/webmeji/miku/shime30.png",
      "./assets/webmeji/miku/shime31.png",
    ],
    interval: 300,
    loops: 2,
  },
  forcewalk: 4,
  // Action frequencies
  ORIGINAL_ACTIONS: [
    "walk",
    "walk",
    "sit",
    "sit",
    "dance",
    "spin",
    "climb",
    "fun",
    "jump",
    "multiply",
  ],
  // Interaction settings
  mouseReactionDistance: 100,
  multiplyChance: 0.05, // much lower chance to multiply
  maxCreatures: 99,
};

// Alternate Miku: uses alternative art set
const MIKU_ALT_CONFIG = {
  basePath: "./assets/webmeji/Miku_alternitive",
  maxFrames: 101,
  speed: 3,
  climbSpeed: 2,
  fallSpeed: 10,
  jumpForce: 15,
  gravity: 0.5,
  walk: {
    frames: [
      "./assets/webmeji/Miku_alternitive/shime1.png",
      "./assets/webmeji/Miku_alternitive/shime2.png",
      "./assets/webmeji/Miku_alternitive/shime3.png",
      "./assets/webmeji/Miku_alternitive/shime2.png",
    ],
    interval: 200,
    loops: 6,
  },
  climb: {
    frames: [
      "./assets/webmeji/Miku_alternitive/shime7.png",
      "./assets/webmeji/Miku_alternitive/shime8.png",
    ],
    interval: 300,
    loops: 8,
  },
  ceiling: {
    frames: [
      "./assets/webmeji/Miku_alternitive/shime9.png",
      "./assets/webmeji/Miku_alternitive/shime10.png",
    ],
    interval: 280,
    loops: 8,
  },
  fall: {
    frames: [
      "./assets/webmeji/Miku_alternitive/shime18.png",
      "./assets/webmeji/Miku_alternitive/shime19.png",
    ],
    interval: 150,
    loops: 1,
  },
  fallen: {
    frames: [
      "./assets/webmeji/Miku_alternitive/shime22.png",
      "./assets/webmeji/Miku_alternitive/shime23.png",
    ],
    interval: 600,
    loops: 1,
  },
  jump: {
    frames: ["./assets/webmeji/Miku_alternitive/shime4.png"],
    interval: 100,
    loops: 1,
  },
  sit: {
    frames: ["./assets/webmeji/Miku_alternitive/shime11.png"],
    interval: 1000,
    loops: 1,
    randomizeDuration: true,
    min: 3000,
    max: 8000,
  },
  spin: {
    frames: ["./assets/webmeji/Miku_alternitive/shime1.png"],
    interval: 150,
    loops: 3,
  },
  dance: {
    frames: [
      "./assets/webmeji/Miku_alternitive/shime5.png",
      "./assets/webmeji/Miku_alternitive/shime6.png",
      "./assets/webmeji/Miku_alternitive/shime1.png",
    ],
    interval: 250,
    loops: 4,
  },
  fun: {
    frames: [
      "./assets/webmeji/Miku_alternitive/shime12.png",
      "./assets/webmeji/Miku_alternitive/shime13.png",
      "./assets/webmeji/Miku_alternitive/shime14.png",
      "./assets/webmeji/Miku_alternitive/shime13.png",
    ],
    interval: 180,
    loops: 3,
  },
  scared: {
    frames: ["./assets/webmeji/Miku_alternitive/shime20.png"],
    interval: 500,
    loops: 2,
  },
  happy: {
    frames: [
      "./assets/webmeji/Miku_alternitive/shime5.png",
      "./assets/webmeji/Miku_alternitive/shime6.png",
    ],
    interval: 200,
    loops: 3,
  },
  multiply: {
    frames: [
      "./assets/webmeji/Miku_alternitive/shime30.png",
      "./assets/webmeji/Miku_alternitive/shime31.png",
    ],
    interval: 300,
    loops: 2,
  },
  forcewalk: 4,
  ORIGINAL_ACTIONS: [
    "walk",
    "walk",
    "sit",
    "sit",
    "dance",
    "spin",
    "climb",
  "fun",
    "jump",
    "multiply",
  ],
  mouseReactionDistance: 100,
  multiplyChance: 0.05,
  maxCreatures: 99,
};

// Sketch Miku: uses sketch art set
const MIKU_SKETCH_CONFIG = {
  basePath: "./assets/webmeji/Miku_sketch",
  maxFrames: 101,
  speed: 3,
  climbSpeed: 2,
  fallSpeed: 10,
  jumpForce: 15,
  gravity: 0.5,
  walk: {
    frames: [
      "./assets/webmeji/Miku_sketch/shime1.png",
      "./assets/webmeji/Miku_sketch/shime2.png",
      "./assets/webmeji/Miku_sketch/shime3.png",
      "./assets/webmeji/Miku_sketch/shime2.png",
    ],
    interval: 200,
    loops: 6,
  },
  climb: {
    frames: [
      "./assets/webmeji/Miku_sketch/shime7.png",
      "./assets/webmeji/Miku_sketch/shime8.png",
    ],
    interval: 300,
    loops: 8,
  },
  ceiling: {
    frames: [
      "./assets/webmeji/Miku_sketch/shime9.png",
      "./assets/webmeji/Miku_sketch/shime10.png",
    ],
    interval: 280,
    loops: 8,
  },
  fall: {
    frames: [
      "./assets/webmeji/Miku_sketch/shime18.png",
      "./assets/webmeji/Miku_sketch/shime19.png",
    ],
    interval: 150,
    loops: 1,
  },
  fallen: {
    frames: [
      "./assets/webmeji/Miku_sketch/shime22.png",
      "./assets/webmeji/Miku_sketch/shime23.png",
    ],
    interval: 600,
    loops: 1,
  },
  jump: {
    frames: ["./assets/webmeji/Miku_sketch/shime4.png"],
    interval: 100,
    loops: 1,
  },
  sit: {
    frames: ["./assets/webmeji/Miku_sketch/shime11.png"],
    interval: 1000,
    loops: 1,
    randomizeDuration: true,
    min: 3000,
    max: 8000,
  },
  spin: {
    frames: ["./assets/webmeji/Miku_sketch/shime1.png"],
    interval: 150,
    loops: 3,
  },
  dance: {
    frames: [
      "./assets/webmeji/Miku_sketch/shime5.png",
      "./assets/webmeji/Miku_sketch/shime6.png",
      "./assets/webmeji/Miku_sketch/shime1.png",
    ],
    interval: 250,
    loops: 4,
  },
  fun: {
    frames: [
      "./assets/webmeji/Miku_sketch/shime12.png",
      "./assets/webmeji/Miku_sketch/shime13.png",
      "./assets/webmeji/Miku_sketch/shime14.png",
      "./assets/webmeji/Miku_sketch/shime13.png",
    ],
    interval: 180,
    loops: 3,
  },
  scared: {
    frames: ["./assets/webmeji/Miku_sketch/shime20.png"],
    interval: 500,
    loops: 2,
  },
  happy: {
    frames: [
      "./assets/webmeji/Miku_sketch/shime5.png",
      "./assets/webmeji/Miku_sketch/shime6.png",
    ],
    interval: 200,
    loops: 3,
  },
  multiply: {
    frames: [
      "./assets/webmeji/Miku_sketch/shime30.png",
      "./assets/webmeji/Miku_sketch/shime31.png",
    ],
    interval: 300,
    loops: 2,
  },
  forcewalk: 4,
  ORIGINAL_ACTIONS: [
    "walk",
    "walk",
    "sit",
    "sit",
    "dance",
    "spin",
    "climb",
  "fun",
    "jump",
    "multiply",
  ],
  mouseReactionDistance: 100,
  multiplyChance: 0.05,
  maxCreatures: 99,
};

const CLASSIC_CONFIG = {
  basePath: "./assets/webmeji/Shimeji",
  maxFrames: 101,
  speed: 2,
  climbSpeed: 1.5,
  fallSpeed: 10,
  jumpForce: 12,
  gravity: 0.4,
  walk: {
    frames: [
      "./assets/webmeji/Shimeji/shime1.png",
      "./assets/webmeji/Shimeji/shime2.png",
      "./assets/webmeji/Shimeji/shime3.png",
      "./assets/webmeji/Shimeji/shime2.png",
    ],
    interval: 250,
    loops: 6,
  },
  climb: {
    frames: [
      "./assets/webmeji/Shimeji/shime7.png",
      "./assets/webmeji/Shimeji/shime8.png",
    ],
    interval: 400,
    loops: 6,
  },
  ceiling: {
    frames: [
      "./assets/webmeji/Shimeji/shime9.png",
      "./assets/webmeji/Shimeji/shime10.png",
    ],
    interval: 320,
    loops: 6,
  },
  fall: {
    frames: [
      "./assets/webmeji/Shimeji/shime20.png",
      "./assets/webmeji/Shimeji/shime21.png",
    ],
    interval: 200,
    loops: 1,
  },
  fallen: {
    frames: [
      "./assets/webmeji/Shimeji/shime22.png",
      "./assets/webmeji/Shimeji/shime23.png",
    ],
    interval: 800,
    loops: 1,
  },
  jump: {
    frames: ["./assets/webmeji/Shimeji/shime4.png"],
    interval: 120,
    loops: 1,
  },
  sit: {
    frames: ["./assets/webmeji/Shimeji/shime11.png"],
    interval: 1000,
    loops: 1,
    randomizeDuration: true,
    min: 2000,
    max: 6000,
  },
  spin: {
    frames: ["./assets/webmeji/Shimeji/shime1.png"],
    interval: 180,
    loops: 3,
  },
  dance: {
    frames: [
      "./assets/webmeji/Shimeji/shime5.png",
      "./assets/webmeji/Shimeji/shime6.png",
      "./assets/webmeji/Shimeji/shime1.png",
    ],
    interval: 300,
    loops: 3,
  },
  fun: {
    frames: [
      "./assets/webmeji/Shimeji/shime12.png",
      "./assets/webmeji/Shimeji/shime13.png",
      "./assets/webmeji/Shimeji/shime14.png",
      "./assets/webmeji/Shimeji/shime13.png",
    ],
    interval: 200,
    loops: 3,
  },
  scared: {
    frames: ["./assets/webmeji/Shimeji/shime20.png"],
    interval: 600,
    loops: 2,
  },
  happy: {
    frames: [
      "./assets/webmeji/Shimeji/shime5.png",
      "./assets/webmeji/Shimeji/shime6.png",
    ],
    interval: 250,
    loops: 2,
  },
  multiply: {
    frames: [
      "./assets/webmeji/Shimeji/shime30.png",
      "./assets/webmeji/Shimeji/shime31.png",
    ],
    interval: 400,
    loops: 2,
  },
  forcewalk: 3,
  ORIGINAL_ACTIONS: [
    "walk",
    "walk",
    "sit",
    "sit",
    "dance",
    "spin",
    "climb",
  "fun",
    "jump",
    "multiply",
  ],
  mouseReactionDistance: 80,
  multiplyChance: 0.05,
  maxCreatures: 99,
};

// Global creatures array
const creatures = [];
let mousePos = { x: 0, y: 0 };

// Optional: Load official Shimeji-ee actions.xml to override frames/interval/loops
(function initShimejiEEOverrides() {
  const ACTION_NAME_MAP = {
    walk: "walk",
    walking: "walk",
    climb: "climb",
    climbing: "climb",
    ceiling: "ceiling",
    ceilingwalk: "ceiling",
    fall: "fall",
    falling: "fall",
    fallen: "fallen",
    sit: "sit",
    sitting: "sit",
    jump: "jump",
    spin: "spin",
    dance: "dance",
    happy: "happy",
    scared: "scared",
    multiply: "multiply",
  };

  function buildPathFromSample(sampleFrame) {
    if (!sampleFrame) return null;
    const idx = sampleFrame.lastIndexOf("/");
    if (idx === -1) return null;
    return sampleFrame.slice(0, idx); // folder
  }

  function applyToConfig(cfg) {
    return function overrideAction(key, data) {
      if (!data) return;
      const targ = cfg[key];
      if (!targ) return;
      const sample = Array.isArray(targ.frames) && targ.frames[0];
      const base = buildPathFromSample(sample);
      if (!base) return;
      // Override frames if provided and look like numbers
      if (data.frames && data.frames.length) {
        const arr = [];
        for (const n of data.frames) {
          const num = parseInt(n, 10);
          if (!isNaN(num)) arr.push(`${base}/shime${num}.png`);
        }
        if (arr.length) targ.frames = arr;
      }
      if (typeof data.interval === "number" && data.interval > 0) {
        targ.interval = Math.max(40, Math.round(data.interval));
      }
      if (typeof data.loops === "number" && data.loops > 0) {
        targ.loops = data.loops;
      }
    };
  }

  function parseActionsXML(xml) {
    const out = {};
    try {
      const dom = new DOMParser().parseFromString(xml, "application/xml");
      const acts = dom.querySelectorAll("Action, action");
      acts.forEach((el) => {
        const rawName = el.getAttribute("name") || el.getAttribute("Name") || "";
        const norm = (rawName || "").toLowerCase().replace(/\s+/g, "");
        const key = ACTION_NAME_MAP[norm];
        if (!key) return;
        const frames = [];
        const durs = [];
        const frameEls = el.querySelectorAll("Image, image, Frame, frame");
        frameEls.forEach((f) => {
          const src = f.getAttribute("src") || f.getAttribute("Src") || f.getAttribute("image") || f.getAttribute("Image") || "";
          const idx = f.getAttribute("index") || f.getAttribute("Index") || "";
          let n = "";
          const m = src.match(/shime(\d+)\.png/i);
          if (m) n = m[1];
          else if (/^\d+$/.test(idx)) n = idx;
          if (n) frames.push(n);
          const dur = f.getAttribute("duration") || f.getAttribute("Duration") || f.getAttribute("delay") || f.getAttribute("Delay");
          if (dur && !isNaN(+dur)) durs.push(+dur);
        });
        let interval = undefined;
        if (durs.length) interval = Math.max(40, Math.round(durs.reduce((a, b) => a + b, 0) / durs.length));
        let loops = undefined;
        const l = el.getAttribute("loops") || el.getAttribute("Loops") || el.getAttribute("loop") || el.getAttribute("Loop") || el.getAttribute("repeat") || el.getAttribute("Repeat");
        if (l && !isNaN(+l)) loops = +l;
        out[key] = { frames, interval, loops };
      });
    } catch (e) {
      console.warn("Shimeji-ee actions.xml parse failed:", e);
    }
    return out;
  }

  async function loadAndApply() {
    try {
      const urls = [
        "./assets/shimejiee/conf/actions.xml",
        "/assets/shimejiee/conf/actions.xml",
        "./shimejiee/conf/actions.xml",
        "/shimejiee/conf/actions.xml",
      ];
      let xml = null;
      for (const u of urls) {
        try {
          const r = await fetch(u, { cache: "no-store" });
          if (r && r.ok) { xml = await r.text(); break; }
        } catch {}
      }
      if (!xml) return;
      const map = parseActionsXML(xml);
      if (!map || !Object.keys(map).length) return;
      const applyClassic = applyToConfig(CLASSIC_CONFIG);
      const applyMiku = applyToConfig(MIKU_CONFIG);
      const applyAlt = applyToConfig(MIKU_ALT_CONFIG);
      const applySketch = applyToConfig(MIKU_SKETCH_CONFIG);
      for (const k of Object.keys(map)) {
        applyClassic(k, map[k]);
        applyMiku(k, map[k]);
        applyAlt(k, map[k]);
        applySketch(k, map[k]);
      }
      console.info("Applied Shimeji-ee actions.xml overrides to sprite configs");
    } catch (e) {
      // Ignore fetch errors (e.g., file not present or served as file://)
    }
  }

  if (typeof window !== "undefined" && typeof fetch === "function" && typeof DOMParser !== "undefined") {
    // Defer to allow assets to mount
    setTimeout(loadAndApply, 0);
  }
})();

// Optional: Load official Shimeji-ee behaviors.xml to influence action selection weights
(function initShimejiEEBehaviors() {
  // Global weights bucket by environment
  const DEFAULT_WEIGHTS = {
    floor: { walk: 300, sit: 200, climb: 60, jump: 40, multiply: 10, fall: 0, fun: 20 },
    wall: { climb: 200, fall: 50, sit: 0, walk: 0, jump: 10, multiply: 5, fun: 0 },
    ceiling: { climb: 120, fall: 50, sit: 20, walk: 0, jump: 10, multiply: 5, fun: 10 },
  };
  function cloneWeights(w) { return JSON.parse(JSON.stringify(w)); }
  const weights = cloneWeights(DEFAULT_WEIGHTS);

  const NAME_TO_ACTION = (name) => {
    const n = (name || "").toLowerCase();
    if (n.startsWith("walk")) return "walk";
    if (n.startsWith("run")) return "walk";
    if (n.includes("crawl")) return "fun";
    if (n.startsWith("sit") || n.includes("liedown") || n.includes("lie")) return "sit";
    if (n.startsWith("grab") || n.startsWith("climb") || n.includes("holdonto")) return "climb";
    if (n.startsWith("fall")) return "fall";
    if (n.startsWith("jump")) return "jump";
    if (n.includes("split") || n.includes("pullupshimeji") || n.includes("divided")) return "multiply";
    if (n.includes("throw")) return "fun";
    return null;
  };

  function detectEnv(condText) {
    const t = (condText || "").toLowerCase();
    if (t.includes("floor.ison")) return "floor";
    if (t.includes("ceiling.ison") || t.includes("bottomborder.ison")) return "ceiling";
    if (t.includes("workarea.rightborder.ison") || t.includes("workarea.leftborder.ison") || t.includes("iewall")) return "wall";
    // Fallbacks based on hints
    if (t.includes("topborder.ison")) return "ceiling";
    return null;
  }

  function parseBehaviorsXML(xml) {
    try {
      const dom = new DOMParser().parseFromString(xml, "application/xml");
      // Walk all Condition blocks to get context, then Behaviors within
      const conditions = dom.querySelectorAll("Condition, condition");
      conditions.forEach((c) => {
        const env = detectEnv(c.getAttribute("Condition") || c.getAttribute("condition") || c.textContent || "");
        const bucket = env && weights[env] ? weights[env] : null;
        const behaviors = c.querySelectorAll("Behavior, behavior");
        behaviors.forEach((b) => {
          const name = b.getAttribute("Name") || b.getAttribute("name") || "";
          const freqStr = b.getAttribute("Frequency") || b.getAttribute("frequency") || "0";
          const freq = Math.max(0, parseInt(freqStr, 10) || 0);
          const action = NAME_TO_ACTION(name);
          if (bucket && action && freq > 0) {
            bucket[action] = (bucket[action] || 0) + freq;
          }
        });
      });
    } catch (e) {
      console.warn("Shimeji-ee behaviors.xml parse failed:", e);
    }
  }

  async function loadAndApplyBehaviors() {
    try {
      const urls = [
        "./assets/shimejiee/conf/behaviors.xml",
        "/assets/shimejiee/conf/behaviors.xml",
        "./shimejiee/conf/behaviors.xml",
        "/shimejiee/conf/behaviors.xml",
      ];
      let xml = null;
      for (const u of urls) {
        try {
          const r = await fetch(u, { cache: "no-store" });
          if (r && r.ok) { xml = await r.text(); break; }
        } catch {}
      }
      if (xml) parseBehaviorsXML(xml);
    } catch {}
    // Expose weights globally
    window.__shimejiBehaviorWeights = weights;
    console.info("Behavior weights ready", weights);
  }

  if (typeof window !== "undefined" && typeof fetch === "function" && typeof DOMParser !== "undefined") {
    setTimeout(loadAndApplyBehaviors, 0);
  } else {
    // Non-browser: expose defaults
    if (typeof window !== "undefined") window.__shimejiBehaviorWeights = weights;
  }
})();

// Preload up to 100 frames per sprite base to avoid late image swaps and ensure configuration
function __preloadFrames(basePath, count = 100) {
  if (!basePath) return;
  const seen = (__preloadFrames._seen = __preloadFrames._seen || new Set());
  if (seen.has(basePath)) return; // do once per base
  seen.add(basePath);
  const doLoad = () => {
    for (let i = 1; i <= count; i++) {
      const img = new Image();
      img.src = `${basePath}/shime${i}.png`;
    }
  };
  if (typeof window !== "undefined" && window.requestIdleCallback) {
    window.requestIdleCallback(doLoad, { timeout: 2000 });
  } else {
    setTimeout(doLoad, 0);
  }
}

// Track mouse position
document.addEventListener("mousemove", (e) => {
  mousePos.x = e.clientX;
  mousePos.y = e.clientY;
});

class EnhancedCreature {
  constructor(containerId, spriteConfig, type = "miku") {
    this.id = containerId;
    this.type = type;
    this.spriteConfig = spriteConfig;

    // Create container
    this.container = document.createElement("div");
  this.container.className = "webmeji-container shimeji";
    this.container.id = containerId;
    this.container.style.overflow = "visible"; // Allow speech bubbles to show outside
    document.body.appendChild(this.container);

    // Create image
    this.img = document.createElement("img");
    this.img.src = spriteConfig.walk.frames[0];
    this.img.alt = /*html*/ `${type} companion`;
    this.container.appendChild(this.img);

    // After image loads, refresh container dimensions and constraints
    this.img.onload = () => {
      const containerStyle2 = window.getComputedStyle(this.container);
      this.containerWidth = parseFloat(containerStyle2.width) || this.img.naturalWidth || this.containerWidth;
      this.containerHeight = parseFloat(containerStyle2.height) || this.img.naturalHeight || this.containerHeight;
      this.maxPosX = window.innerWidth - this.containerWidth;
      this.maxPosY = window.innerHeight - this.containerHeight;
      // Clamp position to new bounds and update
      this.position.x = Math.min(Math.max(0, this.position.x), this.maxPosX);
      this.position.y = Math.min(Math.max(0, this.position.y), this.maxPosY);
      this.updatePosition();
    };

  // Preload sprite frames up to declared max to avoid 404 spam
  if (spriteConfig.basePath) __preloadFrames(spriteConfig.basePath, spriteConfig.maxFrames || 101);

    // Physics properties
    this.position = {
      x: Math.random() * (window.innerWidth - 64),
      y: window.innerHeight - 64,
    };
    this.velocity = { x: 0, y: 0 };
    this.direction = Math.random() > 0.5 ? 1 : -1;
    this.isGrounded = true;
    this.isClimbing = false;
  this.hangingOnCeiling = false;
    this.state = "walk";

    // Animation properties
    this.actionSequence = this.shuffle([...this.spriteConfig.ORIGINAL_ACTIONS]);
    this.currentActionIndex = 0;
    this.currentFrame = 0;
    this.frameTimer = null;
    this.actionCompletionTimer = null;
    this.forceWalkAfter = false;
    this.lastTime = 0;

    // Enhanced properties
    this.multiplyCounter = 0;
    this.interactionCooldown = 0;
    this.climbTarget = null;
    this.jumpCooldown = 0;
    this.speechBubble = null;
  this.nextForcedAction = null;
  this._nextFunAt = Date.now() + 8000 + Math.random() * 10000;
  this.approachWallSide = null; // 'left' | 'right' while moving to wall before climbing

    // Footstep SFX rate limiting
    this._lastStepAt = 0; // ms
    this._stepCooldownWalk = 200; // ms between steps while walking (back off to be calmer)
    this._stepCooldownClimb = 220; // ms between steps while climbing
    this._lastLandAt = 0; // ms
    this._landCooldown = 200; // minimal gap for landing thump

    // Get container dimensions
    const containerStyle = window.getComputedStyle(this.container);
    this.containerWidth = parseFloat(containerStyle.width);
    this.containerHeight = parseFloat(containerStyle.height);
    this.maxPosX = window.innerWidth - this.containerWidth;
    this.maxPosY = window.innerHeight - this.containerHeight;

    this.updatePosition();
    this.updateImageDirection();

    // Start initial action
  this.currentAction = this.actionSequence[this.currentActionIndex];
  this.startAction(this.currentAction);

    // Bind animation loop
    this.animate = this.animate.bind(this);
    this.animationFrameId = requestAnimationFrame(this.animate);

    // Window resize handler
    this.resizeHandler = () => {
      this.maxPosX = window.innerWidth - this.containerWidth;
      this.maxPosY = window.innerHeight - this.containerHeight;
      this.position.x = Math.min(this.position.x, this.maxPosX);
      this.position.y = Math.min(this.position.y, this.maxPosY);
      this.updatePosition();
    };
    window.addEventListener("resize", this.resizeHandler);

    console.log(`Enhanced ${type} companion spawned:`, this.id);
  }

  shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  updatePosition() {
    this.container.style.left = this.position.x + "px";
    this.container.style.bottom =
      window.innerHeight - this.position.y - this.containerHeight + "px";

    // Update speech bubble position if it exists
    this.updateSpeechBubblePosition();
  }

  updateImageDirection() {
  const scaleX = this.direction === -1 ? "scaleX(-1)" : "scaleX(1)";
  const scaleY = this.hangingOnCeiling ? " scaleY(-1)" : "";
  this.img.style.transform = scaleX + scaleY;
  }

  resetAnimation() {
    clearInterval(this.frameTimer);
    clearTimeout(this.actionCompletionTimer);
    this.frameTimer = null;
    this.actionCompletionTimer = null;

    this.container.classList.remove(
      "walking",
      "climbing",
      "falling",
      "jumping",
      "multiplying"
    );
  }

  setNextAction() {
    this.resetAnimation();

    // If we're approaching a wall for a pending climb, hold actions
    if (this.approachWallSide) {
      // Keep walking until we reach the wall; actions resume after climb
      return;
    }

    if (this.forceWalkAfter) {
      this.forceWalkAfter = false;
      this.startForcedWalk();
      return;
    }

    if (this.nextForcedAction) {
      const nxt = this.nextForcedAction;
      this.nextForcedAction = null;
      this.startAction(nxt);
      return;
    }

    // Weighted pick based on environment bucket from behaviors.xml
    const weights = window.__shimejiBehaviorWeights;
    let env = "floor";
    if (this.isClimbing || this.approachWallSide) env = "wall";
    else if (!this.isGrounded && this.hangingOnCeiling) env = "ceiling";

    const bucket = (weights && weights[env]) || null;
    if (!bucket) {
      // Fallback original rotation
      this.currentActionIndex++;
      if (this.currentActionIndex >= this.actionSequence.length) {
        this.currentActionIndex = 0;
        this.actionSequence = this.shuffle([
          ...this.spriteConfig.ORIGINAL_ACTIONS,
        ]);
      }
      this.currentAction = this.actionSequence[this.currentActionIndex];
      this.startAction(this.currentAction);
      return;
    }

    const entries = Object.entries(bucket).filter(([, w]) => w > 0);
    const total = entries.reduce((a, [, w]) => a + w, 0) || 0;
    let pick = Math.random() * total;
    let chosen = "walk";
    for (const [name, w] of entries) {
      if ((pick -= w) <= 0) { chosen = name; break; }
    }
    // Map to implemented actions
    const map = { walk: "walk", sit: "sit", climb: "climb", jump: "jump", multiply: "multiply", fall: "fall", fun: "fun" };
    const action = map[chosen] || "walk";
    this.startAction(action);
  }

  startForcedWalk() {
    const { frames, interval } = this.spriteConfig.walk;
    const walkCycles = this.spriteConfig.forcewalk;
    this.currentAction = "forced-walk";
    this.state = "walk";
    this.container.classList.add("walking");
    this.playAnimation(frames, interval, walkCycles, () =>
      this.setNextAction()
    );
  }

  startAction(action) {
    this.resetAnimation();
    const config = this.spriteConfig[action];
    if (!config) {
      console.warn(`Action ${action} not found, defaulting to walk`);
      this.startAction("walk");
      return;
    }

    this.state = action;
    const { frames, interval, loops = 1 } = config;

    // Add appropriate CSS class
    if (action === "walk" || action === "forced-walk") {
      this.container.classList.add("walking");
    } else if (action === "climb") {
      this.container.classList.add("climbing");
      this.isClimbing = true;
    } else if (action === "fall") {
      this.container.classList.add("falling");
      this.triggerFall();
      // Important: don't also run the generic playAnimation branch for 'fall'
      // to avoid double timers and premature setNextAction mid-air.
      return;
    } else if (action === "jump") {
      this.container.classList.add("jumping");
      this.triggerJump();
    } else if (action === "multiply") {
      this.container.classList.add("multiplying");
      this.triggerMultiply();
    }

    // Handle special actions
  if (action === "walk") {
      // Walk for a random duration instead of fixed loops to ensure visible movement
      const ms = 4000 + Math.random() * 6000; // 4s..10s
      this.playAnimation(frames, interval, 99999, null);
      clearTimeout(this.actionCompletionTimer);
      this.actionCompletionTimer = setTimeout(() => {
        this.forceWalkAfter = false;
        this.setNextAction();
      }, ms);
      return;
    }
    if (action === "sit") {
      const duration = config.randomizeDuration
        ? Math.random() * (config.max - config.min) + config.min
        : interval * loops;
      this.img.src = frames[0];
      this.actionCompletionTimer = setTimeout(() => {
        this.forceWalkAfter = true;
        this.setNextAction();
      }, duration);
      return;
    }

  if (action === "climb") {
      this.startClimbing();
      return;
    }

    // Play normal animation
    this.playAnimation(frames, interval, loops, () => {
      if (action === "spin") {
        this.direction *= -1;
        this.updateImageDirection();
      }

      if (["dance", "spin", "jump", "multiply"].includes(action)) {
        this.forceWalkAfter = true;
      }

      this.setNextAction();
    });
  }

  playAnimation(frames, interval, loops, onComplete) {
    let playCount = 0;
    this.currentFrame = 0;
    this.img.src = frames[0];

    if (this.frameTimer) clearInterval(this.frameTimer);

    this.frameTimer = setInterval(() => {
      this.currentFrame++;
      if (this.currentFrame >= frames.length) {
        this.currentFrame = 0;
        playCount++;
        if (playCount >= loops) {
          clearInterval(this.frameTimer);
          this.frameTimer = null;
          if (onComplete) onComplete();
          return;
        }
      }
      this.img.src = frames[this.currentFrame];

      // Footstep hooks on frame advance

      // Walk/forced-walk: step on alternating frames
      if (
        (this.state === "walk" || this.state === "forced-walk") &&
        this.isGrounded
      ) {
        if (this.currentFrame % 2 === 0) this._tryFootstep("walk");
      }
      // Climb: step a bit slower, on first frame
      else if (this.state === "climb") {
        if (this.currentFrame === 0) this._tryFootstep("climb");
        if (this.hangingOnCeiling && Math.random() < 0.04 && window.SFX) {
          window.SFX.play("ui.move");
        }
      }
      // Jump: initial takeoff is handled in triggerJump; landing handled in updatePhysics
    }, interval);
  }

  _tryFootstep(kind) {
    const now = Date.now();
    const cd =
      kind === "climb" ? this._stepCooldownClimb : this._stepCooldownWalk;
    if (now - this._lastStepAt < cd) return;
    // Avoid churn when many creatures or tab hidden

    if (typeof document !== "undefined" && document.hidden) return;

    this._lastStepAt = now;

    if (window.SFX) window.SFX.play("foot.step");
  }

  // NEW FEATURE: Climbing sides
  startClimbing() {
    // Determine nearest wall; only climb when actually at the wall, otherwise approach first
    const distLeft = Math.abs(this.position.x - 0);
    const distRight = Math.abs(this.position.x - this.maxPosX);
    const side = distLeft <= distRight ? "left" : "right";

    // If not near a wall, approach it first
    const nearThresh = 2;
    if (!((side === "left" && this.position.x <= nearThresh) || (side === "right" && this.position.x >= this.maxPosX - nearThresh))) {
      // Begin approach to wall
      this.approachWallSide = side;
      this.hangingOnCeiling = false;
      this.isClimbing = false;
      // Face the wall and start walking visually
      this.direction = side === "left" ? -1 : 1;
      this.updateImageDirection();
      this.resetAnimation();
      this.container.classList.add("walking");
      // Simple looping walk while approaching
      const w = this.spriteConfig.walk;
      this.playAnimation(w.frames, w.interval, 99999, null);
      return;
    }

    // Already at wall: start climbing immediately
    this.beginClimbOnSide(side);
  }

  beginClimbOnSide(side) {
    this.approachWallSide = null;
    this.climbTarget = { side, targetY: 0, startY: this.position.y };
    // Snap to chosen wall precisely
    if (side === "left") {
      this.position.x = 0;
      this.direction = 1;
    } else {
      this.position.x = this.maxPosX;
      this.direction = -1;
    }
    this.isGrounded = false;
    this.velocity.x = 0;
    this.updatePosition();
    this.updateImageDirection();
    const config = this.spriteConfig.climb;
    this.isClimbing = true;
    // Keep climb animation looping; physics decides end/transition
    this.playAnimation(config.frames, config.interval, 99999, null);
  }

  // NEW FEATURE: Jumping
  triggerJump() {
  if (this.jumpCooldown > 0) return;

  this.velocity.y = -this.spriteConfig.jumpForce;
  this.isGrounded = false;
  this.jumpCooldown = 120; // ~2s cooldown at 60fps
  // Takeoff footstep
  if (window.SFX) window.SFX.play("foot.step");
  if (window.SFX && Math.random() < 0.3) window.SFX.play("extra.yo");

    const config = this.spriteConfig.jump;
    this.playAnimation(config.frames, config.interval, config.loops, () => {
      // Jump animation complete, but physics continues
    });
  }

  // NEW FEATURE: Falling from sky
  triggerFall(fromSky = false) {
    // Only trigger a fall if not grounded, unless explicitly forced from the sky
    if (!fromSky && this.isGrounded) return;

    // Reset any active animations/timers to avoid stuck states
    this.resetAnimation();
  // mark as falling state so landing logic can recover to sit
    this.state = "fall";
  // Cancel any pending climb/approach intents and clear climb state
  this.approachWallSide = null;
    this.isClimbing = false;
    this.climbTarget = null;
    this.hangingOnCeiling = false;
    // If asked to fall from the sky, start above the viewport
    if (fromSky) this.position.y = -this.containerHeight;
    this.velocity.y = 0;
    this.isGrounded = false;
  this.container.classList.add("falling");
  this._fallingSince = Date.now();
    this.updatePosition();

    if (window.SFX && Math.random() < 0.25) window.SFX.play("extra.wan");

  const config = this.spriteConfig.fall;
  this.playAnimation(config.frames, config.interval, 1, () => {
      // Fall animation plays while physics handles the movement; landing logic will set nextForcedAction to sit
      this.nextForcedAction = "sit";
    });
  }

  // NEW FEATURE: Multiplication
  triggerMultiply() {
    // Convert multiplication into laying an egg (deferred hatching) with low chance
    if (Math.random() < this.spriteConfig.multiplyChance) {
      const eggs = parseInt(localStorage.getItem("diva.eggs") || "0", 10) || 0;
      localStorage.setItem("diva.eggs", String(eggs + 1));
      // Very small chance to hatch immediately
      if (Math.random() < 0.1 && window.ShimejiFunctions) {
        const spawns = [
          window.ShimejiFunctions.spawnMiku,
          window.ShimejiFunctions.spawnMikuAlt,
          window.ShimejiFunctions.spawnMikuSketch,
          window.ShimejiFunctions.spawnClassic,
        ].filter(Boolean);
        const f = spawns[Math.floor(Math.random() * spawns.length)];
        if (typeof f === "function") f();
      }
    }

    const config = this.spriteConfig.multiply;
    this.playAnimation(config.frames, config.interval, config.loops, () => {
      this.forceWalkAfter = true;
      this.setNextAction();
    });

    if (window.SFX && Math.random() < 0.3) window.SFX.play("extra.kya");
  }

  createOffspring() {
  // Deprecated: replaced by egg-based system
  console.log("createOffspring is deprecated; using egg-based multiply.");
  }

  // NEW FEATURE: Mouse interaction
  checkMouseInteraction() {
    if (this.interactionCooldown > 0) {
      this.interactionCooldown--;
      return;
    }

    const distance = Math.sqrt(
      Math.pow(mousePos.x - (this.position.x + this.containerWidth / 2), 2) +
        Math.pow(mousePos.y - (this.position.y + this.containerHeight / 2), 2)
    );

    if (distance < this.spriteConfig.mouseReactionDistance) {
      this.interactionCooldown = 180; // 3 second cooldown

      if (Math.random() > 0.5) {
        // Happy reaction
        this.reactToMouse("happy");
      } else {
        // Scared reaction - run away
        this.reactToMouse("scared");
        this.direction = mousePos.x > this.position.x ? -1 : 1;
        this.updateImageDirection();
      }

      // 20% chance to follow with a fun flourish
      if (Math.random() < 0.2) {
        setTimeout(() => this.startAction("fun"), 200);
      }
    }
  }

  reactToMouse(reaction) {
    const currentAction = this.currentAction;
    this.resetAnimation();

    this.container.classList.add(reaction);

    const config = this.spriteConfig[reaction];
    this.playAnimation(config.frames, config.interval, config.loops, () => {
      this.container.classList.remove(reaction);
      // Resume previous action or start new one
      if (currentAction === "walk" || currentAction === "forced-walk") {
        this.startAction("walk");
      } else {
        this.setNextAction();
      }
    });

    // Sometimes say something when reacting to mouse
    if (Math.random() < 0.3 && window.LOVE_TOASTS) {
      const message =
        window.LOVE_TOASTS[
          Math.floor(Math.random() * window.LOVE_TOASTS.length)
        ];
      this.speak(message, 2000);
    }
  }

  // NEW FEATURE: Speech bubbles
  speak(message, duration = 3000) {
    // Remove existing speech bubble
    this.removeSpeechBubble();

    // Create speech bubble
    this.speechBubble = document.createElement("div");
    this.speechBubble.className = "shimeji-speech";
    this.speechBubble.textContent = message;
    this.speechBubble.style.cssText = /*html*/ `
        position: fixed;
        bottom: ${window.innerHeight - this.position.y + 10}px;
        left: ${this.position.x + this.containerWidth / 2}px;
        transform: translateX(-50%);
        background: rgba(255, 255, 255, 0.95);
        border: 2px solid #b7d7ff;
        border-radius: 12px;
        padding: 6px 10px;
        font-size: 12px;
        font-weight: 600;
        color: #2b2b44;
        white-space: nowrap;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        z-index: 10000;
        pointer-events: none;
        animation: speechBubbleIn 0.3s ease-out;
        max-width: 200px;
        word-wrap: break-word;
        white-space: normal;
        text-align: center;
      `;

    // Add speech bubble tail
    const tail = document.createElement("div");
    tail.style.cssText = /*html*/ `
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid #b7d7ff;
      `;
    this.speechBubble.appendChild(tail);

    // Add directly to body so it's not clipped
    document.body.appendChild(this.speechBubble);

    // Update position when shimeji moves
    this.updateSpeechBubblePosition();

    // Auto-remove after duration
    setTimeout(() => {
      this.removeSpeechBubble();
    }, duration);
  }

  updateSpeechBubblePosition() {
    if (this.speechBubble) {
      this.speechBubble.style.bottom = /*html*/ `${
        window.innerHeight - this.position.y + 10
      }px`;
      this.speechBubble.style.left = /*html*/ `${
        this.position.x + this.containerWidth / 2
      }px`;
    }
  }

  removeSpeechBubble() {
    if (this.speechBubble && this.speechBubble.parentNode) {
      this.speechBubble.style.animation =
        "speechBubbleOut 0.2s ease-in forwards";
      setTimeout(() => {
        if (this.speechBubble && this.speechBubble.parentNode) {
          this.speechBubble.parentNode.removeChild(this.speechBubble);
        }
        this.speechBubble = null;
      }, 200);
    }
  }

  // Enhanced physics simulation
  updatePhysics(deltaTime) {
    const wasGrounded = this.isGrounded;
    // Apply gravity if not grounded and not climbing
    if (!this.isGrounded && !this.isClimbing) {
      this.velocity.y += this.spriteConfig.gravity;
      // clamp downward speed for gentler falls
      const maxFall = this.spriteConfig.fallSpeed;
      if (this.velocity.y > maxFall) this.velocity.y = maxFall;
    }

    // Update climbing/ceiling-crawl physics
    if (this.isClimbing && this.climbTarget) {
      const side = this.climbTarget.side;
      if (side === "left" || side === "right") {
        const climbDirection =
          this.climbTarget.targetY > this.position.y ? 1 : -1;
        this.velocity.y = climbDirection * this.spriteConfig.climbSpeed;
        // Prevent any horizontal movement while climbing and snap to wall edge
        this.velocity.x = 0;
        if (side === "left") this.position.x = 0;
        else this.position.x = this.maxPosX;
        // Ceiling reached? snap
        if (this.position.y <= 0) this.position.y = 0;
        if (Math.abs(this.position.y - this.climbTarget.targetY) < 3 || this.position.y <= 1) {
          // Reached the top: start a ceiling crawl
          const randX = Math.random() * this.maxPosX;
          this.climbTarget = {
            side: "top",
            targetX: randX,
            startX: this.position.x,
          };
          this.velocity.y = 0;
          this.hangingOnCeiling = true;
          this.direction = randX >= this.position.x ? 1 : -1;
          this.updateImageDirection();
          // Swap to a horizontal crawl animation
          if (this.frameTimer) { clearInterval(this.frameTimer); this.frameTimer = null; }
          const cx = this.spriteConfig.ceiling || this.spriteConfig.walk;
          this.playAnimation(cx.frames, cx.interval, 99999, null);
        }
      } else if (side === "top" || side === "bottom") {
        const crawlDir =
          this.climbTarget.targetX > this.position.x ? 1 : -1;
        this.velocity.x = crawlDir * this.spriteConfig.climbSpeed;
        // Lock vertical position/velocity
        this.velocity.y = 0;
        if (side === "top") this.position.y = 0;
        else this.position.y = this.maxPosY;

  if (side === "top" && Math.abs(this.position.x - this.climbTarget.targetX) < 5) {
          this.isClimbing = false;
          this.velocity.x = 0;
          this.climbTarget = null;
          // Done crawling the ceiling; drop orientation back and sit
          this.nextForcedAction = "sit";
          this.hangingOnCeiling = false;
          this.updateImageDirection();
        }
      }
    }

    // Update position based on velocity
    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;

  // Handle ground collision
    if (this.position.y >= this.maxPosY) {
      this.position.y = this.maxPosY;
      this.velocity.y = 0;
      this.isGrounded = true;
      // Always clear any lingering falling class on landing
      if (this.container.classList.contains("falling")) {
        this.container.classList.remove("falling");
      }
  // Cancel any pending wall approach when we land
  this.approachWallSide = null;
      // Reset ceiling hang when on ground
      if (this.hangingOnCeiling) {
        this.hangingOnCeiling = false;
        this.updateImageDirection();
      }
      // Landing thump
      if (!wasGrounded) {
        const now = Date.now();
        if (now - this._lastLandAt > this._landCooldown) {
          this._lastLandAt = now;

          if (window.SFX) window.SFX.play("foot.step");
        }
      }

      // Recover from fall or forced-walk intent
      if (
        this.state === "fall" ||
        this.container.classList.contains("falling") ||
        this.forceWalkAfter
      ) {
        this.container.classList.remove("falling");
        // keep forceWalkAfter so setNextAction triggers a short walk
        // If we fell, play a short 'fallen' then sit
        if (this.state === "fall") {
          const fallen = this.spriteConfig.fallen;
          // Switch state immediately to avoid retriggering this block every frame
          this.state = "fallen";
          if (fallen) {
            this.playAnimation(
              fallen.frames,
              fallen.interval,
              fallen.loops || 1,
              () => {
                this.startAction("sit");
              }
            );
          } else {
            this.nextForcedAction = "sit";
            this.setNextAction();
          }
        } else {
          this.setNextAction();
        }
      }
    } else if (this.position.y < this.maxPosY) {
      this.isGrounded = false;
    }

    // Handle wall collisions
    if (this.position.x <= 0) {
      this.position.x = 0;
      // Flip direction on wall for any forward-walk state, unless we are intentionally approaching to climb
      if (
        !this.isClimbing &&
        !this.approachWallSide &&
        (this.state === "walk" || this.state === "forced-walk" || this.state === "run")
      ) {
        this.direction = 1;
        this.updateImageDirection();
      }
      // Stop horizontal velocity so next frame starts cleanly
      if (this.isGrounded) this.velocity.x = 0;
    } else if (this.position.x >= this.maxPosX) {
      this.position.x = this.maxPosX;
      if (
        !this.isClimbing &&
        !this.approachWallSide &&
        (this.state === "walk" || this.state === "forced-walk" || this.state === "run")
      ) {
        this.direction = -1;
        this.updateImageDirection();
      }
      if (this.isGrounded) this.velocity.x = 0;
    }

    // Update jump cooldown
    if (this.jumpCooldown > 0) {
      this.jumpCooldown--;
    }

    // Swallower knockback detection (throttled)
    if (!this._lastSwChkAt || Date.now() - this._lastSwChkAt > 120) {
      this._lastSwChkAt = Date.now();
      try {
        const predators = document.querySelectorAll('.diva-kirby, img[alt="Swallower"]');
        if (predators && predators.length) {
          const sr = this.container.getBoundingClientRect();
          for (const p of predators) {
            const pr = p.getBoundingClientRect();
            if (pr.left < sr.right && pr.right > sr.left && pr.top < sr.bottom && pr.bottom > sr.top) {
              // Compute knockback vector from predator to shimeji
              const cx = sr.left + sr.width / 2;
              const cy = sr.top + sr.height / 2;
              const px = pr.left + pr.width / 2;
              const py = pr.top + pr.height / 2;
              let dx = Math.max(-1, Math.min(1, cx - px));
              const mag = Math.max(0.5, Math.abs(dx));
              dx /= mag;
              const strengthX = 12; // push sideways away from predator
              const strengthY = 24;  // kick upwards strongly
              this.applyImpulse(dx * strengthX, -strengthY);
              // Reaction
              this.reactToMouse("scared");
              if (window.SFX) window.SFX.play("ui.unavailable");
              break;
            }
          }
        }
      } catch (e) {}
    }

    this.updatePosition();
  }

  // Public impulse helper to allow external forces
  applyImpulse(vx, vy) {
    // cancel climb when taking a strong hit
    if (this.isClimbing) {
      this.isClimbing = false;
      this.climbTarget = null;
      this.hangingOnCeiling = false;
      this.container.classList.remove("climbing");
      this.state = "walk";
    }
    // stop any looping animation that may conflict
    if (this.frameTimer) {
      clearInterval(this.frameTimer);
      this.frameTimer = null;
    }
    this.velocity.x += vx;
    this.velocity.y += vy;
    this.isGrounded = false;
  }

  animate(time) {
    if (!this.lastTime) this.lastTime = time;
    const deltaTime = (time - this.lastTime) / 16.67; // Normalize to 60fps
    this.lastTime = time;

    // If approaching a wall for climb, steer and check arrival
    if (this.approachWallSide) {
      // Force facing and gentle forward motion
      this.direction = this.approachWallSide === "left" ? -1 : 1;
      this.updateImageDirection();
      // Velocity will be set by walking logic below; ensure we're grounded allows walking
    }

    // Update physics
    this.updatePhysics(deltaTime);

    // Failsafe: if we're stuck in 'falling' CSS for too long, recover
    if (this.container.classList.contains("falling")) {
      const since = this._fallingSince || (this._fallingSince = Date.now());
      if (Date.now() - since > 6000) {
        // 6s guard
        this.container.classList.remove("falling");
        this.state = "walk";
        this.isClimbing = false;
        this.hangingOnCeiling = false;
        this.velocity.y = 0;
        this.nextForcedAction = "sit";
        this.setNextAction();
      }
    }

    // Check mouse interaction
    this.checkMouseInteraction();

    // Occasional fun flourish when idle-ish
    if (
      Date.now() > this._nextFunAt &&
      !this.isClimbing &&
      this.isGrounded &&
      (this.state === "walk" || this.state === "forced-walk" || this.state === "sit")
    ) {
      this._nextFunAt = Date.now() + 10000 + Math.random() * 15000;
      this.startAction("fun");
    }

    // Convert approach to actual climb when reaching wall
    if (this.approachWallSide) {
      const nearLeft = this.position.x <= 1;
      const nearRight = this.position.x >= this.maxPosX - 1;
      if ((this.approachWallSide === "left" && nearLeft) || (this.approachWallSide === "right" && nearRight)) {
        this.beginClimbOnSide(this.approachWallSide);
      }
    }

    // Handle walking movement (physics controls movement during climb)
    if (
      ((this.state === "walk" || this.state === "forced-walk") || this.approachWallSide) &&
      this.isGrounded
    ) {
      const base = this.direction * this.spriteConfig.speed;
      this.velocity.x = base;
    } else if (this.state !== "climb") {
      this.velocity.x *= 0.9; // Friction when not walking
    }

    this.animationFrameId = requestAnimationFrame(this.animate);
  }

  destroy() {
    this.resetAnimation();
    this.removeSpeechBubble();
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener("resize", this.resizeHandler);
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }

    // Remove from creatures array
    const index = creatures.indexOf(this);
    if (index > -1) {
      creatures.splice(index, 1);
    }
  }
}

// Spawn initial creatures (use window functions to create one of each)
function spawnCreatures() {
  const w = window.ShimejiFunctions || {};


    const configs = [
      { cfg: MIKU_CONFIG, type: "miku" },
      { cfg: MIKU_ALT_CONFIG, type: "miku-alt" },
      { cfg: MIKU_SKETCH_CONFIG, type: "miku-sketch" },
      { cfg: CLASSIC_CONFIG, type: "classic" },
    ];
    //Math. random() * (max - min) + min
    const random =  Math.floor(Math.random() * configs.length);
    const pick = configs[random];
    const c = new EnhancedCreature("init-0", pick.cfg, pick.type);
    creatures.push(c);
  setTimeout(() => c.triggerFall && c.triggerFall(true), 0);
  // }


  const eggs = parseInt(localStorage.getItem("diva.eggs") || "0", 10);
  const extras = parseInt(localStorage.getItem("diva.extraShimejis") || "0", 10);
  const toSpawn = (isNaN(eggs) ? 0 : eggs) + (isNaN(extras) ? 0 : extras);
  const spawns = [
    w.spawnMiku,
    w.spawnMikuAlt,
    w.spawnMikuSketch,
    w.spawnClassic,
  ].filter(Boolean);
  for (let i = 0; i < toSpawn; i++) {
    const f = spawns[Math.floor(Math.random() * spawns.length)];
    if (typeof f === "function") f();
  }

}

// Global functions for interaction
window.ShimejiFunctions = {
  spawnMiku: () => {
    if (creatures.length < MIKU_CONFIG.maxCreatures) {
      const miku = new EnhancedCreature(
        `miku-${Date.now()}`,
        MIKU_CONFIG,
        "miku"
      );
      creatures.push(miku);

  // Newly spawned fall from the sky
  setTimeout(() => miku.triggerFall && miku.triggerFall(true), 0);

      // Reward hearts for new companion!

      // Suppress the initial boot-time reward; allow rewards for user-triggered spawns later
      const booting = !!window.__shimejiBoot;
      if (
        !booting &&
        window.pixelBelleGarden &&
        window.pixelBelleGarden.addHearts
      ) {
        window.pixelBelleGarden.addHearts(3);
        if (window.hearts.loveToast)
          window.hearts.loveToast("New companion! +3💖");
      }

      return miku;
    }
    return null;
  },
  spawnMikuAlt: () => {
    if (creatures.length < MIKU_ALT_CONFIG.maxCreatures) {
      const miku = new EnhancedCreature(
        `miku-alt-${Date.now()}`,
        MIKU_ALT_CONFIG,
        "miku-alt"
      );
      creatures.push(miku);
  setTimeout(() => miku.triggerFall && miku.triggerFall(true), 0);
      return miku;
    }
    return null;
  },
  spawnMikuSketch: () => {
    if (creatures.length < MIKU_SKETCH_CONFIG.maxCreatures) {
      const miku = new EnhancedCreature(
        `miku-sketch-${Date.now()}`,
        MIKU_SKETCH_CONFIG,
        "miku-sketch"
      );
      creatures.push(miku);
  setTimeout(() => miku.triggerFall && miku.triggerFall(true), 0);
      return miku;
    }
    return null;
  },

  spawnClassic: () => {
    if (creatures.length < CLASSIC_CONFIG.maxCreatures) {
      const classic = new EnhancedCreature(
        `classic-${Date.now()}`,
        CLASSIC_CONFIG,
        "classic"
      );
      creatures.push(classic);
  setTimeout(() => classic.triggerFall && classic.triggerFall(true), 0);
      return classic;
    }
    return null;
  },

  removeAll: () => {
    creatures.forEach((creature) => creature.destroy());
    creatures.length = 0;
  },

  getCreatureCount: () => creatures.length,
  removeRandom: () => {
    if (creatures.length === 0) return false;
    const idx = Math.floor(Math.random() * creatures.length);
    const c = creatures[idx];
    if (c && c.destroy) c.destroy();
    return true;
  },

  triggerMassJump: () => {
    creatures.forEach((creature) => {
      if (creature.isGrounded) {
        creature.triggerJump();
      }
    });
  },
  triggerMassHappy: () => {
    creatures.forEach((creature) => {
      creature.reactToMouse("happy");
    });
  },
  triggerMassDance: () => {
    creatures.forEach((creature) => {
      creature.startAction("dance");
    });
  },

  triggerMassFall: () => {
    creatures.forEach((creature) => {
      creature.triggerFall();
    });
  },

  makeAllSpeak: (message, duration = 3000) => {
    creatures.forEach((creature) => {
      // Stagger speech bubbles slightly to avoid overlap
      setTimeout(() => {
        creature.speak(message, duration);
      }, Math.random() * 500);
    });
  },

  makeRandomSpeak: (message, duration = 3000) => {
    if (creatures.length > 0) {
      const randomCreature =
        creatures[Math.floor(Math.random() * creatures.length)];
      randomCreature.speak(message, duration);
    }
  },
  init: () => {
    if (creatures.length === 0) {
      spawnCreatures();
      console.log("Enhanced Shimeji system initialized!");
    }
  },
};

// Random events
setInterval(() => {
  if (Math.random() < 0.1) {
    // 10% chance every 10 seconds
    const randomCreature =
      creatures[Math.floor(Math.random() * creatures.length)];
    if (randomCreature && Math.random() > 0.7) {
      randomCreature.triggerFall();
    }
  }
}, 10000);
