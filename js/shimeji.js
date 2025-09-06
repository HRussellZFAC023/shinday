/* Enhanced Webmeji/Shimeji with new features */
window.addEventListener("DOMContentLoaded", () => {
  // Configuration for different character types
  const MIKU_CONFIG = {
    speed: 3,
    climbSpeed: 2,
    fallSpeed: 8,
    jumpForce: 15,
    gravity: 0.5,
    walk: {
      frames: [
        "./webmeji-main/miku/shime1.png",
        "./webmeji-main/miku/shime2.png",
        "./webmeji-main/miku/shime3.png",
        "./webmeji-main/miku/shime2.png",
      ],
      interval: 200,
      loops: 6,
    },
    climb: {
      frames: [
        "./webmeji-main/miku/shime7.png",
        "./webmeji-main/miku/shime8.png",
      ],
      interval: 300,
      loops: 8,
    },
    fall: {
      frames: [
        "./webmeji-main/miku/shime18.png",
        "./webmeji-main/miku/shime19.png",
      ],
      interval: 150,
      loops: 1,
    },
    jump: {
      frames: ["./webmeji-main/miku/shime4.png"],
      interval: 100,
      loops: 1,
    },
    sit: {
      frames: ["./webmeji-main/miku/shime11.png"],
      interval: 1000,
      loops: 1,
      randomizeDuration: true,
      min: 3000,
      max: 8000,
    },
    spin: {
      frames: ["./webmeji-main/miku/shime1.png"],
      interval: 150,
      loops: 3,
    },
    dance: {
      frames: [
        "./webmeji-main/miku/shime5.png",
        "./webmeji-main/miku/shime6.png",
        "./webmeji-main/miku/shime1.png",
      ],
      interval: 250,
      loops: 4,
    },
    scared: {
      frames: ["./webmeji-main/miku/shime20.png"],
      interval: 500,
      loops: 2,
    },
    happy: {
      frames: [
        "./webmeji-main/miku/shime5.png",
        "./webmeji-main/miku/shime6.png",
      ],
      interval: 200,
      loops: 3,
    },
    multiply: {
      frames: [
        "./webmeji-main/miku/shime30.png",
        "./webmeji-main/miku/shime31.png",
      ],
      interval: 300,
      loops: 2,
    },
    forcewalk: 4,
    // Action frequencies
    ORIGINAL_ACTIONS: [
      "walk",
      "walk",
      "walk",
      "walk",
      "walk",
      "walk",
      "walk",
      "walk",
      "sit",
      "sit",
      "dance",
      "dance",
      "spin",
      "spin",
      "climb",
      "jump",
      "multiply",
    ],
    // Interaction settings
    mouseReactionDistance: 100,
    multiplyChance: 0.03, // 3% chance to multiply on certain actions
    maxCreatures: 8,
  };

  // Alternate Miku: uses alternative art set
  const MIKU_ALT_CONFIG = {
    speed: 3,
    climbSpeed: 2,
    fallSpeed: 8,
    jumpForce: 15,
    gravity: 0.5,
    walk: {
      frames: [
        "./webmeji-main/Miku_alternitive/shime1.png",
        "./webmeji-main/Miku_alternitive/shime2.png",
        "./webmeji-main/Miku_alternitive/shime3.png",
        "./webmeji-main/Miku_alternitive/shime2.png",
      ],
      interval: 200,
      loops: 6,
    },
    climb: {
      frames: [
        "./webmeji-main/Miku_alternitive/shime7.png",
        "./webmeji-main/Miku_alternitive/shime8.png",
      ],
      interval: 300,
      loops: 8,
    },
    fall: {
      frames: [
        "./webmeji-main/Miku_alternitive/shime18.png",
        "./webmeji-main/Miku_alternitive/shime19.png",
      ],
      interval: 150,
      loops: 1,
    },
    jump: {
      frames: ["./webmeji-main/Miku_alternitive/shime4.png"],
      interval: 100,
      loops: 1,
    },
    sit: {
      frames: ["./webmeji-main/Miku_alternitive/shime11.png"],
      interval: 1000,
      loops: 1,
      randomizeDuration: true,
      min: 3000,
      max: 8000,
    },
    spin: {
      frames: ["./webmeji-main/Miku_alternitive/shime1.png"],
      interval: 150,
      loops: 3,
    },
    dance: {
      frames: [
        "./webmeji-main/Miku_alternitive/shime5.png",
        "./webmeji-main/Miku_alternitive/shime6.png",
        "./webmeji-main/Miku_alternitive/shime1.png",
      ],
      interval: 250,
      loops: 4,
    },
    scared: {
      frames: ["./webmeji-main/Miku_alternitive/shime20.png"],
      interval: 500,
      loops: 2,
    },
    happy: {
      frames: [
        "./webmeji-main/Miku_alternitive/shime5.png",
        "./webmeji-main/Miku_alternitive/shime6.png",
      ],
      interval: 200,
      loops: 3,
    },
    multiply: {
      frames: [
        "./webmeji-main/Miku_alternitive/shime30.png",
        "./webmeji-main/Miku_alternitive/shime31.png",
      ],
      interval: 300,
      loops: 2,
    },
    forcewalk: 4,
    ORIGINAL_ACTIONS: [
      "walk",
      "walk",
      "walk",
      "walk",
      "sit",
      "sit",
      "dance",
      "dance",
      "spin",
      "spin",
      "climb",
      "jump",
      "multiply",
    ],
    mouseReactionDistance: 100,
    multiplyChance: 0.03,
    maxCreatures: 8,
  };

  // Sketch Miku: uses sketch art set
  const MIKU_SKETCH_CONFIG = {
    speed: 3,
    climbSpeed: 2,
    fallSpeed: 8,
    jumpForce: 15,
    gravity: 0.5,
    walk: {
      frames: [
        "./webmeji-main/Miku_sketch/shime1.png",
        "./webmeji-main/Miku_sketch/shime2.png",
        "./webmeji-main/Miku_sketch/shime3.png",
        "./webmeji-main/Miku_sketch/shime2.png",
      ],
      interval: 200,
      loops: 6,
    },
    climb: {
      frames: [
        "./webmeji-main/Miku_sketch/shime7.png",
        "./webmeji-main/Miku_sketch/shime8.png",
      ],
      interval: 300,
      loops: 8,
    },
    fall: {
      frames: [
        "./webmeji-main/Miku_sketch/shime18.png",
        "./webmeji-main/Miku_sketch/shime19.png",
      ],
      interval: 150,
      loops: 1,
    },
    jump: {
      frames: ["./webmeji-main/Miku_sketch/shime4.png"],
      interval: 100,
      loops: 1,
    },
    sit: {
      frames: ["./webmeji-main/Miku_sketch/shime11.png"],
      interval: 1000,
      loops: 1,
      randomizeDuration: true,
      min: 3000,
      max: 8000,
    },
    spin: {
      frames: ["./webmeji-main/Miku_sketch/shime1.png"],
      interval: 150,
      loops: 3,
    },
    dance: {
      frames: [
        "./webmeji-main/Miku_sketch/shime5.png",
        "./webmeji-main/Miku_sketch/shime6.png",
        "./webmeji-main/Miku_sketch/shime1.png",
      ],
      interval: 250,
      loops: 4,
    },
    scared: {
      frames: ["./webmeji-main/Miku_sketch/shime20.png"],
      interval: 500,
      loops: 2,
    },
    happy: {
      frames: [
        "./webmeji-main/Miku_sketch/shime5.png",
        "./webmeji-main/Miku_sketch/shime6.png",
      ],
      interval: 200,
      loops: 3,
    },
    multiply: {
      frames: [
        "./webmeji-main/Miku_sketch/shime30.png",
        "./webmeji-main/Miku_sketch/shime31.png",
      ],
      interval: 300,
      loops: 2,
    },
    forcewalk: 4,
    ORIGINAL_ACTIONS: [
      "walk",
      "walk",
      "walk",
      "walk",
      "sit",
      "sit",
      "dance",
      "dance",
      "spin",
      "spin",
      "climb",
      "jump",
      "multiply",
    ],
    mouseReactionDistance: 100,
    multiplyChance: 0.03,
    maxCreatures: 8,
  };

  const CLASSIC_CONFIG = {
    speed: 2,
    climbSpeed: 1.5,
    fallSpeed: 6,
    jumpForce: 12,
    gravity: 0.4,
    walk: {
      frames: [
        "./webmeji-main/shimeji/shime1.png",
        "./webmeji-main/shimeji/shime2.png",
        "./webmeji-main/shimeji/shime3.png",
        "./webmeji-main/shimeji/shime2.png",
      ],
      interval: 250,
      loops: 6,
    },
    climb: {
      frames: [
        "./webmeji-main/shimeji/shime7.png",
        "./webmeji-main/shimeji/shime8.png",
      ],
      interval: 400,
      loops: 6,
    },
    fall: {
      frames: [
        "./webmeji-main/shimeji/shime20.png",
        "./webmeji-main/shimeji/shime21.png",
      ],
      interval: 200,
      loops: 1,
    },
    jump: {
      frames: ["./webmeji-main/shimeji/shime4.png"],
      interval: 120,
      loops: 1,
    },
    sit: {
      frames: ["./webmeji-main/shimeji/shime11.png"],
      interval: 1000,
      loops: 1,
      randomizeDuration: true,
      min: 2000,
      max: 6000,
    },
    spin: {
      frames: ["./webmeji-main/shimeji/shime1.png"],
      interval: 180,
      loops: 3,
    },
    dance: {
      frames: [
        "./webmeji-main/shimeji/shime5.png",
        "./webmeji-main/shimeji/shime6.png",
        "./webmeji-main/shimeji/shime1.png",
      ],
      interval: 300,
      loops: 3,
    },
    scared: {
      frames: ["./webmeji-main/shimeji/shime20.png"],
      interval: 600,
      loops: 2,
    },
    happy: {
      frames: [
        "./webmeji-main/shimeji/shime5.png",
        "./webmeji-main/shimeji/shime6.png",
      ],
      interval: 250,
      loops: 2,
    },
    multiply: {
      frames: [
        "./webmeji-main/shimeji/shime30.png",
        "./webmeji-main/shimeji/shime31.png",
      ],
      interval: 400,
      loops: 2,
    },
    forcewalk: 3,
    ORIGINAL_ACTIONS: [
      "walk",
      "walk",
      "walk",
      "walk",
      "walk",
      "walk",
      "sit",
      "sit",
      "dance",
      "spin",
      "climb",
      "jump",
      "multiply",
    ],
    mouseReactionDistance: 80,
    multiplyChance: 0.03,
    maxCreatures: 6,
  };

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
      this.actionSequence = this.shuffle([
        ...this.spriteConfig.ORIGINAL_ACTIONS,
      ]);
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
      this.img.style.transform = scaleX;
    }

    resetAnimation() {
      clearInterval(this.frameTimer);
      clearTimeout(this.actionCompletionTimer);
      this.currentFrame = 0;
      this.frameTimer = null;
      this.actionCompletionTimer = null;

      // Remove animation classes
      this.container.classList.remove(
        "walking",
        "climbing",
        "falling",
        "jumping",
        "scared",
        "happy",
        "multiplying"
      );
    }

    setNextAction() {
      this.resetAnimation();

      if (this.forceWalkAfter) {
        this.forceWalkAfter = false;
        this.startForcedWalk();
        return;
      }

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
      } else if (action === "jump") {
        this.container.classList.add("jumping");
        this.triggerJump();
      } else if (action === "multiply") {
        this.container.classList.add("multiplying");
        this.triggerMultiply();
      }

      // Handle special actions
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
        try {
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
          }
          // Jump: initial takeoff is handled in triggerJump; landing handled in updatePhysics
        } catch (_) {}
      }, interval);
    }

    _tryFootstep(kind) {
      const now = Date.now();
      const cd =
        kind === "climb" ? this._stepCooldownClimb : this._stepCooldownWalk;
      if (now - this._lastStepAt < cd) return;
      // Avoid churn when many creatures or tab hidden
      try {
        if (typeof document !== "undefined" && document.hidden) return;
      } catch (_) {}
      this._lastStepAt = now;
      try {
        if (window.SFX) window.SFX.play("foot.step");
      } catch (_) {}
    }

    // NEW FEATURE: Climbing sides
    startClimbing() {
      const side = Math.random() > 0.5 ? "left" : "right";
      this.climbTarget = {
        side: side,
        targetY: Math.random() * (window.innerHeight * 0.6),
        startY: this.position.y,
      };

      // Move to edge
      if (side === "left") {
        this.position.x = 0;
        this.direction = 1;
      } else {
        this.position.x = this.maxPosX;
        this.direction = -1;
      }

      this.updatePosition();
      this.updateImageDirection();

      const config = this.spriteConfig.climb;
      this.playAnimation(config.frames, config.interval, config.loops, () => {
        this.isClimbing = false;
        this.forceWalkAfter = true;
        this.setNextAction();
      });
    }

    // NEW FEATURE: Jumping
    triggerJump() {
      if (this.jumpCooldown > 0) return;

      this.velocity.y = -this.spriteConfig.jumpForce;
      this.isGrounded = false;
      this.jumpCooldown = 120; // 2 second cooldown at 60fps
      // Takeoff footstep
      try {
        if (window.SFX) window.SFX.play("foot.step");
      } catch (_) {}

      const config = this.spriteConfig.jump;
      this.playAnimation(config.frames, config.interval, config.loops, () => {
        // Jump animation complete, but physics continues
      });
    }

    // NEW FEATURE: Falling from sky
    triggerFall() {
      this.position.y = -this.containerHeight;
      this.velocity.y = 0;
      this.isGrounded = false;
      this.updatePosition();

      const config = this.spriteConfig.fall;
      this.playAnimation(config.frames, config.interval, 1, () => {
        // Fall animation plays while physics handles the movement
      });
    }

    // NEW FEATURE: Multiplication
    triggerMultiply() {
      if (creatures.length >= this.spriteConfig.maxCreatures) {
        // Too many creatures, just dance instead
        this.startAction("dance");
        return;
      }

      if (Math.random() < this.spriteConfig.multiplyChance) {
        setTimeout(() => {
          this.createOffspring();
        }, 500);
      }

      const config = this.spriteConfig.multiply;
      this.playAnimation(config.frames, config.interval, config.loops, () => {
        this.forceWalkAfter = true;
        this.setNextAction();
      });
    }

    createOffspring() {
      const newId = /*html*/ `${
        this.type
      }-offspring-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const offspring = new EnhancedCreature(
        newId,
        this.spriteConfig,
        this.type
      );

      // Position near parent
      offspring.position.x = Math.max(
        0,
        Math.min(this.maxPosX, this.position.x + (Math.random() - 0.5) * 100)
      );
      offspring.position.y = this.position.y;
      offspring.direction = -this.direction;
      offspring.updatePosition();
      offspring.updateImageDirection();

      creatures.push(offspring);
      console.log(`New ${this.type} offspring created:`, newId);
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
      }

      // Update climbing physics
      if (this.isClimbing && this.climbTarget) {
        const climbDirection =
          this.climbTarget.targetY > this.position.y ? 1 : -1;
        this.velocity.y = climbDirection * this.spriteConfig.climbSpeed;

        if (Math.abs(this.position.y - this.climbTarget.targetY) < 5) {
          this.isClimbing = false;
          this.velocity.y = 0;
          this.climbTarget = null;
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
            try {
              if (window.SFX) window.SFX.play("foot.step");
            } catch (_) {}
          }
        }

        if (this.state === "fall") {
          // Land from fall
          this.container.classList.remove("falling");
          this.forceWalkAfter = true;
          this.setNextAction();
        }
      } else if (this.position.y < this.maxPosY) {
        this.isGrounded = false;
      }

      // Handle wall collisions
      if (this.position.x <= 0) {
        this.position.x = 0;
        if (!this.isClimbing && this.state === "walk") {
          this.direction = 1;
          this.updateImageDirection();
        }
      } else if (this.position.x >= this.maxPosX) {
        this.position.x = this.maxPosX;
        if (!this.isClimbing && this.state === "walk") {
          this.direction = -1;
          this.updateImageDirection();
        }
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
        this.velocity.x = this.direction * this.spriteConfig.speed;
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
    const w = window.shimejiFunctions || {};

    const miku = w.spawnMiku
      ? w.spawnMiku()
      : (() => {
          const c = new EnhancedCreature("miku-0", MIKU_CONFIG, "miku");
          creatures.push(c);
          return c;
        })();

    const mikuAlt = w.spawnMikuAlt
      ? w.spawnMikuAlt()
      : (() => {
          const c = new EnhancedCreature(
            "miku-alt-0",
            MIKU_ALT_CONFIG,
            "miku-alt"
          );
          creatures.push(c);
          return c;
        })();

    const mikuSketch = w.spawnMikuSketch
      ? w.spawnMikuSketch()
      : (() => {
          const c = new EnhancedCreature(
            "miku-sketch-0",
            MIKU_SKETCH_CONFIG,
            "miku-sketch"
          );
          creatures.push(c);
          return c;
        })();

    const classic = w.spawnClassic
      ? w.spawnClassic()
      : (() => {
          const c = new EnhancedCreature(
            "classic-0",
            CLASSIC_CONFIG,
            "classic"
          );
          creatures.push(c);
          return c;
        })();

    console.log(`Spawned ${creatures.length} enhanced companions`, {
      miku,
      mikuAlt,
      mikuSketch,
      classic,
    });
  }

  // Global functions for interaction
  window.shimejiFunctions = {
    spawnMiku: () => {
      if (creatures.length < MIKU_CONFIG.maxCreatures) {
        const miku = new EnhancedCreature(
          `miku-${Date.now()}`,
          MIKU_CONFIG,
          "miku"
        );
        creatures.push(miku);

        // Reward hearts for new companion!
        try {
          if (window.pixelBelleGarden && window.pixelBelleGarden.addHearts) {
            window.pixelBelleGarden.addHearts(3);
            if (window.loveToast) window.loveToast("New companion! +3💖");
          }
        } catch (_) {}

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
        return classic;
      }
      return null;
    },

    removeAll: () => {
      creatures.forEach((creature) => creature.destroy());
      creatures.length = 0;
    },

    getCreatureCount: () => creatures.length,

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
  };

  // Initialize companions
  spawnCreatures();

  // Economy tie-in: earn small hearts over time when companions are active
  (function shimejiEconomy() {
    let grantAt = Date.now() + 180000; // 3 minutes
    setInterval(() => {
      try {
        if (creatures.length > 0 && Date.now() >= grantAt) {
          if (
            window.pixelBelleGarden &&
            typeof window.pixelBelleGarden.addHearts === "function"
          ) {
            window.pixelBelleGarden.addHearts(1);
          }
          grantAt = Date.now() + 180000;
        }
      } catch (_) {}
    }, 15000);
  })();

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

  console.log("Enhanced Shimeji system initialized!");
});
