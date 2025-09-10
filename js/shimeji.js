/* Enhanced Webmeji/Shimeji with new features */
// Builder: create a canonical 46-frame config for a given basePath
function makeShimejiConfig(basePath) {
  const f = (n) => `${basePath}/shime${n}.png`;
  return {
    basePath,
    maxFrames: 46,
    speed: 3,
    climbSpeed: 2,
    fallSpeed: 10,
    jumpForce: 15,
    gravity: 0.5,
    stand: { frames: [f(1)], interval: 900, loops: 1 },
    walk: { frames: [f(1), f(2), f(1), f(3)], interval: 250, loops: 6 },
    run: { frames: [f(1), f(2), f(1), f(3)], interval: 150, loops: 6 },
    dash: { frames: [f(1), f(2), f(1), f(3)], interval: 120, loops: 6 },
    grabwall: { frames: [f(13)], interval: 500, loops: 1 },
    climb: { frames: [f(14), f(12), f(13)], interval: 300, loops: 99999 },
    grabceiling: { frames: [f(23)], interval: 400, loops: 1 },
    ceiling: { frames: [f(25), f(23), f(24)], interval: 300, loops: 99999 },
    fall: { frames: [f(4)], interval: 200, loops: 1 },
    bouncing: { frames: [f(18), f(19)], interval: 220, loops: 1 },
    tripping: { frames: [f(19), f(18), f(20)], interval: 220, loops: 1 },
    fallen: { frames: [f(21)], interval: 800, loops: 1 },
    jump: { frames: [f(22)], interval: 120, loops: 1 },
    sit: {
      frames: [f(11)],
      interval: 1000,
      loops: 1,
      randomizeDuration: true,
      min: 3000,
      max: 8000,
    },
    sit_lookup: { frames: [f(26)], interval: 800, loops: 1 },
    sit_spin: {
      frames: [f(26), f(15), f(27), f(16), f(28), f(17), f(29), f(11)],
      interval: 220,
      loops: 1,
    },
    sit_legs_up: { frames: [f(30)], interval: 800, loops: 1 },
    sit_legs_down: { frames: [f(31)], interval: 800, loops: 1 },
    sit_dangle: {
      frames: [f(31), f(32), f(31), f(33)],
      interval: 260,
      loops: 4,
    },
    sprawl: { frames: [f(21)], interval: 800, loops: 1 },
    creep: { frames: [f(20), f(21)], interval: 300, loops: 8 },
    fun: { frames: [f(12), f(13), f(14), f(13)], interval: 200, loops: 3 },
    scared: { frames: [f(20)], interval: 600, loops: 2 },
    happy: { frames: [f(5), f(6)], interval: 250, loops: 2 },
    pullup: { frames: [f(38), f(39), f(40), f(41)], interval: 280, loops: 1 },
    divide: {
      frames: [f(42), f(43), f(44), f(45), f(46)],
      interval: 280,
      loops: 1,
    },
    multiply: {
      frames: [f(42), f(43), f(44), f(45), f(46)],
      interval: 280,
      loops: 1,
    },
    // Avoid IE frames (34–36): reuse normal walk/run/fall frames instead
    walkwithie: { frames: [f(1), f(2), f(1), f(3)], interval: 260, loops: 6 },
    runwithie: { frames: [f(1), f(2), f(1), f(3)], interval: 180, loops: 6 },
    throwie: { frames: [f(37)], interval: 300, loops: 1 },
    fallwithie: { frames: [f(4)], interval: 200, loops: 1 },
    pinched: { frames: [f(9), f(7), f(1)], interval: 140, loops: 99999 },
    forcewalk: 3,
    ORIGINAL_ACTIONS: [
      "stand",
      "walk",
      "walk",
      "run",
      "dash",
      "sit",
      "sit",
      "sit_lookup",
      "sit_spin",
      "sit_legs_up",
      "sit_legs_down",
      "sit_dangle",
      "sprawl",
      "creep",
      "grabwall",
      "ceiling",
      "ceiling",
      "jump",
      "fall",
      "bouncing",
      "tripping",
      "walkwithie",
      "runwithie",
      "throwie",
      "pullup",
      "divide",
      "happy",
      "scared",
    ],
    mouseReactionDistance: 100,
    multiplyChance: 0.3,
    maxCreatures: 99,
  };
}

// Shared canonical configs differing only by path
const MIKU_CONFIG = makeShimejiConfig("./assets/webmeji/miku");
const MIKU_ALT_CONFIG = makeShimejiConfig("./assets/webmeji/Miku_alternitive");
const MIKU_SKETCH_CONFIG = makeShimejiConfig("./assets/webmeji/Miku_sketch");
const CLASSIC_CONFIG = makeShimejiConfig("./assets/webmeji/shimeji");

// Action name aliases (normalize external names to internal canonical actions)
const ACTION_ALIASES = Object.freeze({
  walk: "walk",
  walking: "walk",
  run: "run",
  dash: "dash",
  stand: "stand",
  climb: "climb",
  climbing: "climb",
  grabwall: "grabwall",
  climbwall: "climb",
  ceiling: "ceiling",
  ceilingwalk: "ceiling",
  grabceiling: "grabceiling",
  climbceiling: "ceiling",
  flip: "spin",
  fall: "fall",
  fallwithie: "fallwithie",
  falling: "fall",
  fallen: "fallen",
  bouncing: "bouncing",
  tripping: "tripping",
  sprawl: "sprawl",
  pinched: "pinched",
  sit: "sit",
  sitting: "sit",
  sitandlookup: "sit_lookup",
  sitandlookatmouse: "sit_lookup",
  sitandspinheadaction: "sit_spin",
  sitwithlegsdown: "sit_legs_down",
  sitwithlegsup: "sit_legs_up",
  sitanddanglelegs: "sit_dangle",
  jump: "jump",
  jumping: "jump",
  spin: "spin",
  dance: "dance",
  happy: "happy",
  scared: "scared",
  multiply: "multiply",
  walkwithie: "walkwithie",
  runwithie: "runwithie",
  throwie: "throwie",
  pullupshimeji: "pullup",
  divide1: "divide",
  standup: "stand",
  sitdown: "sit",
  liedown: "sprawl",
});

function resolveActionName(name) {
  if (!name) return "walk";
  const key = String(name).toLowerCase();
  return ACTION_ALIASES[key] || key;
}

// Global creatures array
const creatures = [];
let mousePos = { x: 0, y: 0 };

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
    this.container.className = "webmeji-container";
    this.container.id = containerId;
    this.container.style.overflow = "visible"; // Allow speech bubbles to show outside
    document.body.appendChild(this.container);

    // Create image
    this.img = document.createElement("img");
    this.img.src = spriteConfig.walk.frames[0];
    this.img.alt = /*html*/ `${type} companion`;
    this.container.appendChild(this.img);

    // Physics properties
    this.position = {
      x: Math.random() * (window.innerWidth - 64),
      y: window.innerHeight - 64,
    };
    this.velocity = { x: 0, y: 0 };
    this.direction = Math.random() > 0.5 ? 1 : -1;
    this.isGrounded = true;
    this.isClimbing = false;
    this.state = "walk";

    // Animation properties
    this.actionSequence = this.shuffle([...this.spriteConfig.ORIGINAL_ACTIONS]);
    this.currentActionIndex = 0;
    this.currentFrame = 0;
    this.frameTimer = null;
    this.actionCompletionTimer = null;
    this.forceWalkAfter = false;
    this.lastTime = 0;

    // Chaining: queued actions to play next (e.g., ["flip","sit","fall"])
    this._actionQueue = [];

    // Enhanced properties
    this.multiplyCounter = 0;
    this.interactionCooldown = 0;
    this.climbTarget = null;
    this.jumpCooldown = 0;
    this.speechBubble = null;
    this._creepFramesResolved = false;
    this._approachWall = null; // pending approach-to-wall state before climbing
    // Ceiling interaction: drop on user interaction
    this._handleCeilingInteract = (e) => {
      if (this.state === "ceiling") {
        this.container.classList.remove("ceiling");
        this._detachCeilingInteraction();
        // Fall from current position (no wall nudge)
        this.triggerFall({ fromSky: false, allowFromCeiling: true });
      }
    };
    this._ceilingListenersAttached = false;

    // Footstep SFX rate limiting
    this._lastStepAt = 0; // ms
    this._stepCooldownWalk = 200; // ms between steps while walking (back off to be calmer)
    this._stepCooldownClimb = 220; // ms between steps while climbing
    this._lastLandAt = 0; // ms
    this._landCooldown = 200; // minimal gap for landing thump

    // Edge-crawl/anti-stall helpers
    this._stallFrames = 0;
    this._lastPosX = null;
    this._lastPosY = null;
    this._fallIntroUntil = 0; // ms timestamp to keep initial fall slow

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

    // Click to interrupt climb/ceiling and trigger a fall
    this._onClickInterrupt = (e) => {
      if (this.state === "climb") {
        this.triggerFall({ fromSky: false });
      } else if (this.state === "ceiling") {
        // Fall from current position (no wall nudge)
        this.triggerFall({ fromSky: false, allowFromCeiling: true });
      }
    };
    this.container.addEventListener("click", this._onClickInterrupt);

    // Mouseover interrupt: if climbing or on ceiling, knock them off with a bigger push
    this._onHoverInterrupt = (e) => {
      if (this.state === "climb") {
        const pushX = this.climbTarget?.side === "left" ? 10 : -10;
        this.triggerFall({ fromSky: false, pushX, pushY: -10 });
      } else if (this.state === "ceiling") {
        const pushX = this.direction >= 0 ? 10 : -10;
        this.triggerFall({
          fromSky: false,
          allowFromCeiling: true,
          pushX,
          pushY: -12,
        });
      }
    };
    this.container.addEventListener("mouseenter", this._onHoverInterrupt);

    // Drag interactions (Pinched / Thrown)
    this._dragging = false;
    this._dragTrail = [];
    this._onDragStart = (e) => {
      const pt = this._getPointer(e);
      if (!pt) return;
      this._dragging = true;
      this.isClimbing = false;
      this._detachCeilingInteraction();
      this.container.classList.remove("climbing", "ceiling");
      this.state = "drag";
      this.container.classList.add("dragging");
      // Start pinched animation if available
      const cfg =
        this.spriteConfig.pinched ||
        this.spriteConfig.happy ||
        this.spriteConfig.stand;
      if (cfg) this.playAnimation(cfg.frames, cfg.interval, 99999, null);
      //sfx
      window.SFX && window.SFX.play("extra.miku.uu");
      // Initialize trail
      this._dragTrail.length = 0;
      this._recordDragPoint(pt.x, pt.y);
      document.addEventListener("mousemove", this._onDragMove);
      document.addEventListener("mouseup", this._onDragEnd);
      document.addEventListener("touchmove", this._onDragMove, {
        passive: false,
      });
      document.addEventListener("touchend", this._onDragEnd);
      e.preventDefault();
    };
    this._onDragMove = (e) => {
      if (!this._dragging) return;
      const pt = this._getPointer(e);
      if (!pt) return;
      // Center creature on pointer
      const targetX = pt.x - this.containerWidth / 2;
      const targetY = pt.y - this.containerHeight / 2;
      this.position.x = Math.max(0, Math.min(this.maxPosX, targetX));
      this.position.y = Math.max(0, Math.min(this.maxPosY, targetY));
      this.velocity.x = 0;
      this.velocity.y = 0;
      this.isGrounded = false;
      this.updatePosition();
      this._recordDragPoint(pt.x, pt.y);
      e.preventDefault();
    };
    this._onDragEnd = (e) => {
      if (!this._dragging) return;
      this._dragging = false;
      this.container.classList.remove("dragging");
      // Compute throw velocity from last trail points
      const v = this._estimateThrowVelocity();
      document.removeEventListener("mousemove", this._onDragMove);
      document.removeEventListener("mouseup", this._onDragEnd);
      document.removeEventListener("touchmove", this._onDragMove);
      document.removeEventListener("touchend", this._onDragEnd);
      // Trigger a local fall with knockback
      this.triggerFall({ fromSky: false, pushX: v.vx, pushY: v.vy });
    };
    this.container.addEventListener("mousedown", this._onDragStart);
    this.container.addEventListener("touchstart", this._onDragStart, {
      passive: false,
    });

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

  // Allow external callers to queue a chain of actions
  enqueueActions(sequence) {
    if (Array.isArray(sequence) && sequence.length) {
      this._actionQueue.push(...sequence.map(resolveActionName));
    }
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
    const flipY = this.state === "ceiling" ? " scaleY(-1)" : "";
    this.img.style.transform = scaleX + flipY;
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
      "multiplying",
      "ceiling"
    );
    // On any reset, ensure we aren't leaving interaction listeners dangling
    this._detachCeilingInteraction();
    // Normalize image transform to current state/direction
    this.updateImageDirection();
  }

  // Robust image setter with fallback if a specific frame is missing
  _setSprite(url) {
    if (!this._missingFrames) this._missingFrames = new Set();
    // Hard block IE frames: never render 34–36 due to white square artifacts
    if (url && /shime(34|35|36)\.png$/.test(url)) {
      // Map to safe equivalents: use walk/fall frames instead
      if (/shime36\.png$/.test(url)) url = this._frameUrl(4);
      else url = this._frameUrl(1);
    }
    if (this._missingFrames.has(url)) {
      const fb = this._fallbackFor(url);
      this.img.src = fb || url;
      return;
    }
    this.img.onerror = () => {
      this._missingFrames.add(url);
      const fb = this._fallbackFor(url);
      this.img.onerror = null;
      if (fb && fb !== url) this._setSprite(fb);
    };
    this.img.src = url;
  }

  _frameUrl(n) {
    return `${this.spriteConfig.basePath}/shime${n}.png`;
  }

  _fallbackFor(url) {
    // Try to recover by swapping crawl frames, else fallback to stand
    const m = url && url.match(/shime(\d+)\.png$/);
    const stand = this._frameUrl(1);
    if (!m) return stand;
    const n = parseInt(m[1], 10) || 1;
    // Creep special-case: swap 20 <-> 21 if one is missing
    if (n === 20) {
      const alt = this._frameUrl(21);
      if (!this._missingFrames.has(alt)) return alt;
    }
    if (n === 21) {
      const alt = this._frameUrl(20);
      if (!this._missingFrames.has(alt)) return alt;
    }
    // Generally try nearest lower existing frame
    for (let k = n - 1; k >= 1; k--) {
      const alt = this._frameUrl(k);
      if (!this._missingFrames.has(alt)) return alt;
    }
    return stand;
  }

  _getPointer(e) {
    if (!e) return null;
    if (e.touches && e.touches.length) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  }

  _recordDragPoint(x, y) {
    const now = Date.now();
    this._dragTrail.push({ x, y, t: now });
    // Keep last ~6 points
    if (this._dragTrail.length > 6) this._dragTrail.shift();
  }

  _estimateThrowVelocity() {
    if (this._dragTrail.length < 2) return { vx: 0, vy: 0 };
    const a = this._dragTrail[0];
    const b = this._dragTrail[this._dragTrail.length - 1];
    const dtMs = Math.max(16, b.t - a.t);
    const frames = dtMs / 16.67; // convert ms to 60fps frames
    const vx = (b.x - a.x) / frames / (this.containerWidth ? 1 : 1);
    const vy = (b.y - a.y) / frames / (this.containerHeight ? 1 : 1);
    // Limit extremes
    const clamp = (v, max) => Math.max(-max, Math.min(max, v));
    return { vx: clamp(vx, 18), vy: clamp(vy, 18) };
  }

  _attachCeilingInteraction() {
    if (this._ceilingListenersAttached) return;
    const h = this._handleCeilingInteract;
    this.container.addEventListener("mouseenter", h);
    this.container.addEventListener("mousedown", h);
    this.container.addEventListener("touchstart", h, { passive: true });
    this._ceilingListenersAttached = true;
  }

  _detachCeilingInteraction() {
    if (!this._ceilingListenersAttached) return;
    const h = this._handleCeilingInteract;
    this.container.removeEventListener("mouseenter", h);
    this.container.removeEventListener("mousedown", h);
    this.container.removeEventListener("touchstart", h);
    this._ceilingListenersAttached = false;
  }

  setNextAction() {
    this.resetAnimation();

    // If there is a queued chain, honor it first
    if (this._actionQueue && this._actionQueue.length) {
      const next = this._actionQueue.shift();
      this.startAction(next || "walk");
      return;
    }

    if (this.forceWalkAfter) {
      this.forceWalkAfter = false;
      this.startForcedWalk();
      return;
    }

    // Behavior-weighted selection if available; fallback to original action rotation
    try {
      const W = (window && window.__shimejiBehaviorWeights) || null;
      let env = "floor";
      if (this.state === "ceiling" || this.isClimbing) env = "wall";
      else if (!this.isGrounded) env = "floor";
      const bucket = W && W[env];
      if (bucket) {
        const entries = Object.entries(bucket).filter(([, w]) => w > 0);
        const total = entries.reduce((a, [, w]) => a + w, 0) || 0;
        let r = Math.random() * total;
        let chosen = "walk";
        for (const [name, w] of entries) {
          if ((r -= w) <= 0) {
            chosen = name;
            break;
          }
        }
        this.startAction(chosen);
        return;
      }
    } catch {}

    // Occasionally inject a simple pattern (flip -> sit -> fall -> walk)
    if (Math.random() < 0.05) {
      this.enqueueActions(["spin", "sit", "fall", "walk"]);
      const next = this._actionQueue.shift();
      this.startAction(next);
      return;
    }

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
    // Normalize aliases to canonical action names
    const canonical = resolveActionName(action);
    action = canonical;
    this.resetAnimation();
    // Do not clear intent flags here; they are used to manage transitions
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
    } else if (action === "run" || action === "dash") {
      this.container.classList.add("walking");
      // temporary speed boost handled in animate via state
    } else if (action === "creep") {
      this.container.classList.add("walking"); // reuse subtle bounce
    } else if (action === "climb") {
      this.container.classList.add("climbing");
      this.isClimbing = true;
    } else if (action === "fall") {
      this.container.classList.add("falling");
      this.triggerFall();
    } else if (action === "jump") {
      this.container.classList.add("jumping");
      this.triggerJump();
    } else if (action === "multiply") {
      this.container.classList.add("multiplying");
      this.triggerMultiply();
    } else if (action === "ceiling") {
      // Do not teleport. First ensure we are at a wall, then climb to top and transition.
      // Mark intention so that when climb reaches top it becomes ceiling crawl.
      this._pendingCeilingAfterClimb = true;
      this.startClimbing();
      return;
    }

    // Handle special actions
    if (action === "stand") {
      // simple idle; then continue
      this._setSprite(frames[0]);
      this.actionCompletionTimer = setTimeout(
        () => this.setNextAction(),
        interval
      );
      return;
    }

    if (
      action === "sit" ||
      action === "sit_lookup" ||
      action === "sit_spin" ||
      action === "sit_legs_up" ||
      action === "sit_legs_down" ||
      action === "sit_dangle"
    ) {
      const duration = config.randomizeDuration
        ? Math.random() * (config.max - config.min) + config.min
        : interval * loops;
      this._setSprite(frames[0]);
      this.actionCompletionTimer = setTimeout(() => {
        this.forceWalkAfter = true;
        this.setNextAction();
      }, duration);
      return;
    }

    if (action === "sprawl") {
      this._setSprite(frames[0]);
      this.actionCompletionTimer = setTimeout(
        () => this.setNextAction(),
        interval
      );
      return;
    }

    if (action === "creep") {
      // Crawl for a short random duration
      const ms = 2500 + Math.random() * 3000;
      const creepFrames = this._getCreepFrames(frames);
      this.playAnimation(creepFrames, interval, 99999, null);
      clearTimeout(this.actionCompletionTimer);
      this.actionCompletionTimer = setTimeout(() => {
        this.forceWalkAfter = false;
        this.setNextAction();
      }, ms);
      return;
    }

    if (action === "grabwall") {
      // brief hold then transition to climb
      this._setSprite(frames[0]);
      setTimeout(() => this.startClimbing(), Math.max(200, interval));
      return;
    }

    if (action === "climb") {
      this.startClimbing();
      return;
    }

    if (action === "grabceiling") {
      // route to ceiling crawl via wall first; this behaves similar to selecting ceiling
      this._pendingCeilingAfterClimb = true;
      this.startClimbing();
      return;
    }

    if (action === "bouncing" || action === "tripping") {
      this.playAnimation(frames, interval, loops, () => {
        this.forceWalkAfter = true;
        this.setNextAction();
      });
      return;
    }

    if (
      action === "walkwithie" ||
      action === "runwithie" ||
      action === "throwie" ||
      action === "fallwithie"
    ) {
      this.playAnimation(frames, interval, loops, () => this.setNextAction());
      return;
    }

    if (action === "pullup" || action === "divide") {
      this.playAnimation(frames, interval, loops, () => this.setNextAction());
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

  _getCreepFrames(defaultFrames) {
    // Keep creep strictly to frames 20/21; missing frames are handled by _setSprite fallback logic.
    return defaultFrames;
  }

  playAnimation(frames, interval, loops, onComplete) {
    let playCount = 0;
    this.currentFrame = 0;
    this._setSprite(frames[0]);

    if (this.frameTimer) clearInterval(this.frameTimer);

    const effInterval = this._intervalFor(this.state, interval);
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
      this._setSprite(frames[this.currentFrame]);

      // Footstep hooks on frame advance

      // Walk/forced-walk: step on alternating frames
      if (
        (this.state === "walk" || this.state === "forced-walk") &&
        this.isGrounded
      ) {
        if (this.currentFrame % 2 === 0) this._tryFootstep("walk");
      }
      // Creep: slower cadence
      else if (this.state === "creep" && this.isGrounded) {
        if (this.currentFrame % 3 === 0) this._tryFootstep("walk");
      }
      // Climb: step a bit slower, on first frame
      else if (this.state === "climb") {
        if (this.currentFrame === 0) this._tryFootstep("climb");
      }
      // Jump: initial takeoff is handled in triggerJump; landing handled in updatePhysics
    }, effInterval);
  }

  // Compute effective animation interval with optional runtime overrides
  _intervalFor(action, base) {
    try {
      const S = (window && window.__shimejiSpeed) || {};
      const anim = S.anim || {};
      const global = typeof anim.global === "number" ? anim.global : 1;
      const per = typeof anim[action] === "number" ? anim[action] : 1;
      // Higher multiplier = faster (shorter interval)
      const mult = Math.max(0.1, global * per);
      return base / mult;
    } catch {
      return base;
    }
  }

  // Compute effective movement speed (px per frame) with optional overrides
  _moveSpeedFor(action, base) {
    try {
      const S = (window && window.__shimejiSpeed) || {};
      const move = S.move || {};
      const global = typeof move.global === "number" ? move.global : 1;
      const per = typeof move[action] === "number" ? move[action] : 1;
      const mult = Math.max(0.1, global * per);
      return base * mult;
    } catch {
      return base;
    }
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
    // Aligns with actions.xml: GrabWall -> ClimbWall to top
    // Ensure we are actually touching a wall first; otherwise walk to it.
    const atLeft = this.position.x <= 1;
    const atRight = this.position.x >= this.maxPosX - 1;

    let side;
    if (atLeft) side = "left";
    else if (atRight) side = "right";
    else {
      // Choose nearest wall by proximity
      side = this.position.x < this.maxPosX / 2 ? "left" : "right";
    }

    // If not yet at the chosen wall, approach it by walking until contact
    if (!atLeft && !atRight) {
      this._approachWall = { side };
      // Enter a persistent walking animation towards the wall
      this.state = "walk";
      this.container.classList.add("walking");
      this.direction = side === "left" ? -1 : 1; // walk toward the target wall
      this.updateImageDirection();
      this.velocity.y = 0;
      const walkCfg = this.spriteConfig.walk;
      // Loop indefinitely until we hit the wall; no onComplete
      this.playAnimation(walkCfg.frames, walkCfg.interval, 99999, null);
      return;
    }

    // We are at a wall: begin climbing up to the ceiling
    this.climbTarget = {
      side,
      targetY: 8,
      startY: this.position.y,
    };

    // Ensure climb starts without horizontal drift and snap to exact wall edge
    if (side === "left") {
      this.position.x = 0;
      this.direction = 1;
    } else {
      this.position.x = this.maxPosX;
      this.direction = -1;
    }
    this.isGrounded = false;
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.isClimbing = true;

    this.updatePosition();
    this.updateImageDirection();

    const config = this.spriteConfig.climb;
    // Keep climbing animation looping; physics will transition to ceiling on reach
    this.playAnimation(config.frames, config.interval, 99999, null);
  }

  // NEW FEATURE: Crawl along top (ceiling)
  startCeilingCrawl() {
    // Aligns with actions.xml: GrabCeiling -> ClimbCeiling (horizontal move)
    // Being on the ceiling is a kind of climbing state for logic purposes
    this.isClimbing = true;
    this.state = "ceiling";
    this.container.classList.add("ceiling");
    // Snap to ceiling
    this.position.y = 0;
    this.velocity.y = 0;
    // Random horizontal direction along the edge
    if (this.direction === 0) this.direction = Math.random() > 0.5 ? 1 : -1;
    this.velocity.x = this.direction * (this.spriteConfig.speed * 0.9);
    this.updatePosition();
    this.updateImageDirection();

    // Allow user interaction to drop them immediately
    this._attachCeilingInteraction();

    // Safety: After some time crawling, drop back down or switch action
    clearTimeout(this.actionCompletionTimer);
    this.actionCompletionTimer = setTimeout(() => {
      this.container.classList.remove("ceiling");
      this._detachCeilingInteraction();
      // 50% drop, 50% return to normal action
      if (Math.random() < 0.5) {
        // Drop from current position
        this.triggerFall({ fromSky: false, allowFromCeiling: true });
      } else {
        this.forceWalkAfter = true;
        this.setNextAction();
      }
    }, 2000 + Math.random() * 1500);
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

  // Enhanced falling: supports from-sky (spawns/eggs) and local knockback (collisions/random)
  // Usage:
  //  - triggerFall(true)            -> from sky
  //  - triggerFall({ fromSky: true })
  //  - triggerFall() or triggerFall({ pushX, pushY }) -> local knockback
  triggerFall(arg) {
    // Do not fall while on ceiling crawl
    const opts = typeof arg === "object" && arg !== null ? arg : {};
    const wasCeiling = this.state === "ceiling";
    if (wasCeiling && !opts.allowFromCeiling) return;

    const fromSky = arg === true || opts.fromSky === true;
    const pushX =
      typeof opts.pushX === "number"
        ? opts.pushX
        : Math.random() < 0.5
        ? -6
        : 6;
    const pushY = typeof opts.pushY === "number" ? opts.pushY : -8; // slight pop up before falling

    // Reset any active animations/timers to avoid stuck states
    this.resetAnimation();
    this.forceWalkAfter = true;
    // mark as falling state so landing logic can recover to walk
    this.state = "fall";
    this.isClimbing = false;
    this.climbTarget = null;
    this._approachWall = null;
    this.container.classList.add("falling");
    // Ensure ceiling listeners are detached once we start falling
    this._detachCeilingInteraction();
    if (this._climbInterruptAttached) {
      this.container.removeEventListener("click", this._onClickInterrupt);
      this._climbInterruptAttached = false;
    }

    if (opts.allowFromCeiling && wasCeiling) {
      // No wall nudge when falling from ceiling; keep current X
    }

    if (fromSky) {
      // Start just above top of screen
      this.position.y = -this.containerHeight;
      this.velocity.y = 0;
      this.velocity.x = 0;
      this.isGrounded = false;
      // Slow intro fall to play full animation (~2s)
      this._fallIntroUntil = Date.now() + 2000;
    } else {
      // Local knockback fall: keep current Y, impart push and let gravity do the rest
      this.isGrounded = false;
      this.velocity.x = pushX;
      this.velocity.y = pushY;
      // No slow intro for local falls
      this._fallIntroUntil = 0;
    }

    this.updatePosition();

    if (window.SFX && Math.random() < 0.2) window.SFX.play("extra.wan");

    const config = this.spriteConfig.fall;
    this.playAnimation(config.frames, config.interval, 1, () => {
      // Fall animation plays while physics handles the movement; landing will switch state
    });
    if (window.SFX && Math.random() < 0.3) window.SFX.play("extra.wan");
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
      // Apply fall speed override
      let maxFall = this._moveSpeedFor("fall", this.spriteConfig.fallSpeed);
      // During initial fall, keep it slow so the full CSS animation is visible
      if (this.state === "fall" && Date.now() < this._fallIntroUntil) {
        maxFall = Math.min(maxFall, 6);
      }
      if (this.velocity.y > maxFall) this.velocity.y = maxFall;
    }

    // Update climbing physics
    if (this.isClimbing && this.climbTarget) {
      const climbDirection =
        this.climbTarget.targetY > this.position.y ? 1 : -1;
      // Apply climb speed override (in px/frame)
      const baseClimb = this.spriteConfig.climbSpeed;
      const climbV = this._moveSpeedFor("climb", baseClimb);
      this.velocity.y = climbDirection * climbV;
      // Prevent any horizontal movement while climbing and snap to wall edge
      this.velocity.x = 0;
      if (this.climbTarget.side === "left") this.position.x = 0;
      else if (this.climbTarget.side === "right")
        this.position.x = this.maxPosX;

      // Reached the top: transition into ceiling crawl if requested, else stop climbing
      if (
        Math.abs(this.position.y - this.climbTarget.targetY) < 5 ||
        this.position.y <= 8
      ) {
        if (this._climbInterruptAttached) {
          this.container.removeEventListener("click", this._onClickInterrupt);
          this._climbInterruptAttached = false;
        }
        if (this._pendingCeilingAfterClimb) {
          this._pendingCeilingAfterClimb = false;
          this.startCeilingCrawl();
        } else {
          // If no ceiling requested, drop from the wall
          const pushX = this.climbTarget.side === "left" ? -2 : 2;
          this.isClimbing = false;
          this.triggerFall({ fromSky: false, pushX, pushY: -2 });
        }
        return;
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
        this.isClimbing = false; // landed
        // keep forceWalkAfter so setNextAction triggers a short walk
        this.setNextAction();
      }
    } else if (this.position.y < this.maxPosY) {
      this.isGrounded = false;
    }

    // Handle ceiling collision (only when not in ceiling-crawl state)
    if (this.position.y <= 0 && this.state !== "ceiling") {
      this.position.y = 0;
      // If moving upward, bounce downward
      if (this.velocity.y < 0)
        this.velocity.y = Math.abs(this.velocity.y) * 0.4;
      // Ensure we're considered airborne but not in climbing
      this.isGrounded = false;
      if (this.state !== "fall") this.state = "fall";
    }

    // Handle wall collisions
    const hitLeft = this.position.x <= 0;
    const hitRight = this.position.x >= this.maxPosX;
    if (hitLeft || hitRight) {
      const atWallX = hitLeft ? 0 : this.maxPosX;
      // If falling or otherwise airborne (not climbing/ceiling), bounce instead of hard clamp
      if (
        (this.state === "fall" || (!this.isGrounded && !this.isClimbing)) &&
        this.state !== "ceiling"
      ) {
        this.position.x = hitLeft ? 1 : this.maxPosX - 1;
        this.velocity.x = -(this.velocity.x || 0) * 0.6;
      } else {
        // Grounded locomotion: flip direction
        this.position.x = atWallX;
        if (
          !this.isClimbing &&
          (this.state === "walk" || this.state === "ceiling")
        ) {
          this.direction = hitLeft ? 1 : -1;
          this.updateImageDirection();
        }
      }
    }

    // Handle ceiling snapping while in ceiling crawl
    if (this.state === "ceiling") {
      this.position.y = 0;
      this.velocity.y = 0;
    }

    // Update jump cooldown
    if (this.jumpCooldown > 0) {
      this.jumpCooldown--;
    }

    this.updatePosition();
  }

  animate(time) {
    if (!this.lastTime) this.lastTime = time;
    const deltaTime = (time - this.lastTime) / 16.67; // Normalize to 60fps
    this.lastTime = time;

    // Update physics
    this.updatePhysics(deltaTime);

    // Check mouse interaction
    this.checkMouseInteraction();

    // Handle walking movement
    if (
      (this.state === "walk" || this.state === "forced-walk") &&
      this.isGrounded
    ) {
      this.velocity.x =
        this.direction * this._moveSpeedFor("walk", this.spriteConfig.speed);
    } else if (
      (this.state === "run" || this.state === "dash") &&
      this.isGrounded
    ) {
      const base =
        this.state === "dash"
          ? this.spriteConfig.speed * 2.2
          : this.spriteConfig.speed * 1.6;
      this.velocity.x = this.direction * this._moveSpeedFor(this.state, base);
    } else if (this.state === "creep" && this.isGrounded) {
      this.velocity.x =
        this.direction *
        this._moveSpeedFor("creep", this.spriteConfig.speed * 0.6);
    } else if (this.state === "ceiling") {
      // Crawl along top edge horizontally
      this.velocity.x =
        this.direction *
        this._moveSpeedFor("ceiling", this.spriteConfig.speed * 0.9);
    } else if (this.state === "walkwithie" || this.state === "runwithie") {
      const mult = this.state === "runwithie" ? 1.2 : 1.0;
      this.velocity.x =
        this.direction *
        this._moveSpeedFor(this.state, this.spriteConfig.speed * mult);
    } else if (this.state !== "climb" && this.state !== "fall") {
      this.velocity.x *= 0.9; // Friction when not walking
    } else {
      // While in climb state, lock horizontal velocity
      this.velocity.x = 0;
    }

    // If we are approaching a wall to start climbing, check for contact and transition
    if (this._approachWall) {
      const side = this._approachWall.side;
      const hitLeft = this.position.x <= 0;
      const hitRight = this.position.x >= this.maxPosX;
      if ((side === "left" && hitLeft) || (side === "right" && hitRight)) {
        // Stop walking forward and start climbing
        this._approachWall = null;
        this.isClimbing = true;
        this.state = "climb";
        this.container.classList.remove("walking");
        this.container.classList.add("climbing");
        this.velocity.x = 0;
        this.position.x = side === "left" ? 0 : this.maxPosX;
        // Face inward toward the wall when climbing
        this.direction = side === "left" ? 1 : -1;
        this.updateImageDirection();

        // Initialize climb target
        this.climbTarget = { side, targetY: 8, startY: this.position.y };
        const cfg = this.spriteConfig.climb;
        this.playAnimation(cfg.frames, cfg.interval, 99999, null);
      }
    }

    // Anti-stall: if in walk/ceiling and barely moving for too long, flip direction
    const eps = 0.5;
    if (this._lastPosX == null) {
      this._lastPosX = this.position.x;
      this._lastPosY = this.position.y;
    } else {
      const dx = Math.abs(this.position.x - this._lastPosX);
      const dy = Math.abs(this.position.y - this._lastPosY);
      const movingHoriz = dx > eps;
      const relevantState =
        this.state === "walk" ||
        this.state === "forced-walk" ||
        this.state === "ceiling";
      if (relevantState && !movingHoriz) {
        this._stallFrames++;
        if (this._stallFrames > 45) {
          // ~0.75s at 60fps
          this.direction *= -1;
          this.updateImageDirection();
          this.velocity.x =
            this.direction *
            this._moveSpeedFor("walk", this.spriteConfig.speed);
          this._stallFrames = 0;
        }
      } else {
        this._stallFrames = 0;
      }
      this._lastPosX = this.position.x;
      this._lastPosY = this.position.y;
    }

    this.animationFrameId = requestAnimationFrame(this.animate);
  }

  destroy() {
    this.resetAnimation();
    this.removeSpeechBubble();
    if (this._onClickInterrupt) {
      this.container.removeEventListener("click", this._onClickInterrupt);
    }
    if (this._onHoverInterrupt) {
      this.container.removeEventListener("mouseenter", this._onHoverInterrupt);
    }
    if (this._onClickInterrupt) {
      this.container.removeEventListener("click", this._onClickInterrupt);
    }
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
  const random = Math.floor(Math.random() * configs.length);
  const pick = configs[random];
  const c = new EnhancedCreature("init-0", pick.cfg, pick.type);
  creatures.push(c);
  setTimeout(() => c.triggerFall && c.triggerFall(true), 0);
  // }

  const eggs = parseInt(localStorage.getItem("diva.eggs") || "0", 10);
  const extras = parseInt(
    localStorage.getItem("diva.extraShimejis") || "0",
    10
  );
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
        if (window.Hearts.loveToast)
          window.Hearts.loveToast("New companion! +3💖");
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
      creature.triggerFall({ fromSky: false });
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
      randomCreature.triggerFall({ fromSky: false });
    }
  }
}, 10000);
