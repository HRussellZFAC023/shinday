/* Hearts and love system extracted from main.js */
window.hearts = (function () {
  const C = window.SITE_CONTENT || {};
  const LOVE_TOASTS = C.love?.toasts || ["ありがとう！💖"];
  const LOVE_MILESTONES = C.love?.milestones || [];
  const SFX = window.SFX;
  let heartCount = parseInt(
    localStorage.getItem("pixelbelle-hearts") || "0",
    10
  );
  let lastMilestone = parseInt(
    localStorage.getItem("pixelbelle-last-milestone") || "0",
    10
  );

  function updateCounters() {
    const el = document.getElementById("heartCount");
    if (el) el.textContent = heartCount;
  }

  function loveToast(text) {
    const msg = `${text} ${
      LOVE_TOASTS[Math.floor(Math.random() * LOVE_TOASTS.length)]
    }`;
    const toast = document.createElement("div");
    toast.textContent = msg;
    toast.style.cssText =
      "position:fixed;left:50%;top:20%;transform:translateX(-50%);background:rgba(255,255,255,0.95);border:2px solid var(--accent);border-radius:16px;padding:12px 18px;font-weight:800;color:var(--ink);box-shadow:var(--shadow);z-index:9999;animation:fadeToast 2.5s ease-out forwards;";
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 4000);
  }

  function burstHeartsAndStars(n = 8) {
    const vw = window.innerWidth,
      vh = window.innerHeight;
    for (let i = 0; i < n; i++) {
      const el = document.createElement("div");
      const x = Math.random() * vw,
        y = Math.random() * vh * 0.6 + vh * 0.2;
      el.textContent =
        Math.random() < 0.6 ? "💖" : Math.random() < 0.5 ? "✨" : "⭐";
      el.style.cssText = `position:fixed;left:${x}px;top:${y}px;font-size:20px;pointer-events:none;z-index:9998;animation:heartFloat 2.2s ease-out forwards;`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2300);
    }
  }

  function shimejiCelebrate(amount) {
    const s = window.ShimejiFunctions;
    if (!s) return;
    if (heartCount % 5 === 0) {
      s.triggerMassJump();
      shimejiBroadcastLove();
    } else s.triggerMassHappy();
    if (heartCount % 25 === 0 && s.triggerMassDance) s.triggerMassDance();
    if (heartCount % 25 === 0) SFX.play("extra.clap");
    else if (Math.random() < 0.5) SFX.play("extra.yo");
    else if (Math.random() < 0.5) SFX.play("extra.wan");
    else SFX.play("hearts.add");
  }

  function shimejiBroadcastLove() {
    const s = window.ShimejiFunctions;
    if (!s || !s.makeAllSpeak) return;

    const loveMessage =
      LOVE_TOASTS[Math.floor(Math.random() * LOVE_TOASTS.length)];
    s.makeAllSpeak(loveMessage, 3000);
  }

  function createFloatingHeart(x, y) {
    const heart = document.createElement("div");
    heart.textContent = "💖";
    heart.style.cssText = `position:fixed;left:${x}px;top:${y}px;font-size:1.5rem;pointer-events:none;z-index:9999;animation:heartFloat 2s ease-out forwards;`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
  }

  function createSparkleEffect(el) {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const sp = document.createElement("div");
        sp.textContent = "✨";
        sp.style.cssText = `position:absolute;font-size:1rem;pointer-events:none;left:${
          Math.random() * 50 - 25
        }px;top:${
          Math.random() * 50 - 25
        }px;animation:sparkle 1s ease-out forwards;`;
        el.style.position = "relative";
        el.appendChild(sp);
        setTimeout(() => sp.remove(), 1000);
      }, i * 100);
    }
  }

  function getHeartCount() {
    return heartCount;
  }

  function addHearts(amount) {
    const pot = parseInt(localStorage.getItem("diva.potion.until") || "0", 10);
    if (Date.now() < pot) amount *= 2;
    heartCount = Math.max(0, heartCount + amount);
    localStorage.setItem("pixelbelle-hearts", heartCount);
    updateCounters();

    const el = document.getElementById("gameHeartCount");
    if (el) el.textContent = String(heartCount);

    SFX.play("hearts.add");
    if (amount >= 5) SFX.play("extra.coin");

    if (Array.isArray(LOVE_MILESTONES)) {
      const reached = LOVE_MILESTONES.filter((m) => heartCount >= m.step);
      if (reached.length) {
        const top = reached.reduce((a, b) => (b.step > a.step ? b : a));
        if (top.step > lastMilestone) {
          lastMilestone = top.step;
          localStorage.setItem("pixelbelle-last-milestone", lastMilestone);
          loveToast(top.msg);

          SFX.play("hearts.milestone");

          shimejiBroadcastLove();
        }
      }
    }
    const counterEl = document.getElementById("heartCount");
    if (counterEl) createSparkleEffect(counterEl);
    burstHeartsAndStars(Math.min(8, 2 + amount * 2));
  }

  function loadSavedData() {
    const savedMood = localStorage.getItem("pixelbelle-mood");
    if (savedMood) {
      const moodDisplayEl = document.getElementById("moodDisplay");
      if (moodDisplayEl) moodDisplayEl.textContent = `💭 ${savedMood}`;
    }
    const savedNowPlaying = localStorage.getItem("pixelbelle-now-playing");
    if (savedNowPlaying) {
      const nowPlayingEl = document.getElementById("nowPlaying");
      if (nowPlayingEl) nowPlayingEl.textContent = savedNowPlaying;
    }
  }

  function initPeriodicUpdates() {
    const heartBtn = document.getElementById("heartBtn");
    if (heartBtn) {
      heartBtn.addEventListener("click", () => {
        SFX.play("hearts.click");
        addHearts(1);
        const rect = heartBtn.getBoundingClientRect();
        createFloatingHeart(rect.left + heartBtn.offsetWidth / 2, rect.top);
        createSparkleEffect(heartBtn);
        shimejiCelebrate();
      });
    }
  }

  // Background floating hearts follow radio state
  function initFloatingHearts() {
    const container = document.querySelector(".floating-hearts");
    if (!container) return;
    let radioOn = false;

    function isRadioPlaying() {
      const a = window.__radioAudio;
      return a && !a.paused;
    }
    function createHeart() {
      if (!radioOn) return;
      const heart = document.createElement("div");
      heart.className = "heart-particle";
      heart.textContent = "💖";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.setProperty("--drift", Math.random() * 40 - 20 + "px");
      container.appendChild(heart);
      setTimeout(() => heart.remove(), 8000);
    }
    function tick() {
      radioOn = isRadioPlaying();
      if (!document.hidden) createHeart();
    }
    const id = setInterval(tick, 2000);
    // Watch radio play/pause to fade out existing hearts after completion

    const a = window.__radioAudio;
    if (a) {
      a.addEventListener("play", () => {
        radioOn = true;
      });
      a.addEventListener("pause", () => {
        radioOn = false;
      });
    }
  }

  function initPassiveHearts() {
    // Only grant passive hearts if shimejis are active
    setInterval(() => {
      const count =
        window.ShimejiFunctions && window.ShimejiFunctions.getCreatureCount
          ? window.ShimejiFunctions.getCreatureCount()
          : 0;
      if (count > 0) {
        addHearts(count);
      }
    }, 15000);
  }

  function initHearts() {
    updateCounters();
    loadSavedData();
    initPeriodicUpdates();
    initFloatingHearts();
    initPassiveHearts();
    initSwallower();
  }

  // Swallower enemy (Kirby-like)
  function initSwallower() {
    function scheduleNext() {
      // Debug fast mode
      let delay;
      const minMs = 10 * 1000; // 10 seconds in milliseconds
      const maxMs = 5 * 60 * 1000; // 5 minutes in milliseconds
      delay = Math.random() * (maxMs - minMs) + minMs;

      setTimeout(spawnOne, delay);
    }

    function spawnOne() {
      try {
        const img = document.createElement("img");
        const src =
          (window.SITE_CONTENT &&
            window.SITE_CONTENT.images &&
            window.SITE_CONTENT.images.swallowGif) ||
          "./assets/swallow.gif";
        img.src = src;
        img.alt = "Swallower";
        // randomize direction (true = L->R, false = R->L)
        const leftToRight = Math.random() < 0.5;
        const startX = leftToRight ? -80 : window.innerWidth + 80;
  // Base asset chomps left; when moving left->right we flip horizontally so mouth faces travel
  const face = leftToRight ? -1 : 1;
        img.style.cssText = `
          position: fixed;
          bottom: 0;
          left: ${startX}px;
          width: 72px; height: 48px; image-rendering: pixelated;
          z-index: 9997;
          opacity: 0;
          transform: scaleX(${face});
          filter: hue-rotate(90deg) saturate(1.6) contrast(1.05);
          transition: opacity .4s ease;
        `;
        document.body.appendChild(img);


        // fade in
        requestAnimationFrame(() => (img.style.opacity = "1"));

        // movement across screen (slower, more random)
        const vw = window.innerWidth;
        const life = 3000 + Math.random() * 7000; // 3–10s visible lifetime
        const duration = life; // use life as traversal duration
        const start = performance.now();

        const sfx = window.SFX;
        if (sfx && sfx.play) sfx.play("swallow.swoop");

        // loop SFX while visible
        let cancelled = false;
        function loopSound(name, min = 1200, max = 2200) {
          let id;
          const tick = () => {
            if (cancelled) return;
            sfx && sfx.play && sfx.play(name);
            const delay = min + Math.random() * (max - min);
            id = setTimeout(tick, delay);
          };
          id = setTimeout(tick, min);
          return () => clearTimeout(id);
        }
        const stopSwoop = loopSound("swallow.swoop", 1600, 2600);
        const stopChomp = loopSound("swallow.chomp", 1300, 2000);

        let eaten = false;
        let raf;
        function step(t) {
          const p = Math.min(1, (t - start) / duration);
          const travel = leftToRight ? p : 1 - p;
          const x = -80 + travel * (vw + 160);
          // gentle bob and combine with facing
          const bob = Math.sin(t / 300) * 3;
          img.style.left = x + "px";
          img.style.transform = `scaleX(${face}) translateY(${bob}px)`;

          // react to shimeji intersections frequently
          const collided = tryIntersectReactions(img);
          // If collision and a Sweet Decoy is available, consume and neutralize immediately
          try {
            const shop = window.shop;
            if (
              collided &&
              shop &&
              typeof shop.getBaitCount === "function" &&
              typeof shop.consumeBait === "function" &&
              shop.getBaitCount() > 0
            ) {
              shop.consumeBait();
              if (sfx && sfx.play) sfx.play("enemy.nom");
              fadeOut();
              return; // stop the animation loop; cleanup will run
            }
          } catch (_) {}
          if (p < 1) {
            raf = requestAnimationFrame(step);
          } else {
            cleanup();
          }
        }
        raf = requestAnimationFrame(step);

        // click does nothing per spec
        img.addEventListener("click", (e) => {
          e.stopPropagation();
          if (sfx && sfx.play) sfx.play("ui.unavailable");
        });

        // Auto-eat failsafe after 3s if nothing blocked it
        let autoEatTimer = setTimeout(() => tryEat(), 3000);
        // Also attempt around midpoint as a backup
        let eatTimer = setTimeout(
          () => tryEat(),
          Math.max(500, duration * (0.45 + Math.random() * 0.1))
        );

        function tryEat() {
          if (eaten) return;
          eaten = true;
          const now = Date.now();
          const shieldUntil =
            parseInt(localStorage.getItem("diva.shield.until") || "0", 10) || 0;
          const shieldActive = now < shieldUntil;

          if (shieldActive) {
            // harmless pass
            if (sfx && sfx.play) sfx.play("enemy.blocked");
            fadeOut();
            return;
          }

          // Bait check (single-use)
          let baitHandled = false;
          const shopApi = window.shop;
          if (
            shopApi &&
            typeof shopApi.getBaitCount === "function" &&
            typeof shopApi.consumeBait === "function"
          ) {
            if (shopApi.getBaitCount() > 0) {
              shopApi.consumeBait();
              baitHandled = true;
              if (sfx && sfx.play) sfx.play("enemy.nom");
            }
          }

          if (baitHandled) {
            // harmless pass
            if (sfx && sfx.play) sfx.play("enemy.blocked");
            fadeOut();
            return;
          }

          // Always eat a shimeji (never hearts)
          const sh = window.ShimejiFunctions;
          if (sh && typeof sh.removeRandom === "function") {
            const removed = sh.removeRandom();
            if (removed) {
              const eggs = Math.max(
                0,
                parseInt(localStorage.getItem("diva.eggs") || "0", 10) - 1
              );
              localStorage.setItem("diva.eggs", String(eggs));
              if (sfx && sfx.play) {
                sfx.play("swallow.chomp");
                sfx.play("extra.kya");
              }
              window.hearts &&
                window.hearts.loveToast &&
                window.hearts.loveToast("A Miku was swallowed! 😭");
              fadeOut();
              return;
            }
          }

          // nothing to eat
          fadeOut();
        }

  

        function fadeOut() {
          if (sfx && sfx.play) sfx.play("enemy.leave");
          img.style.transition = "opacity .35s ease";
          img.style.opacity = "0";
          setTimeout(cleanup, 400);
        }

        function cleanup() {
          cancelAnimationFrame(raf);
          clearTimeout(eatTimer);
          clearTimeout(autoEatTimer);
          cancelled = true;
          stopSwoop && stopSwoop();
          stopChomp && stopChomp();
          if (img && img.parentNode) img.parentNode.removeChild(img);
          scheduleNext();
        }
      } catch (e) {
        scheduleNext();
      }
    }

    function tryIntersectReactions(enemyImg) {
      try {
        const rect = enemyImg.getBoundingClientRect();
        const nodes = document.querySelectorAll(".webmeji-container");
        let hit = false;
        nodes.forEach((n) => {
          const r = n.getBoundingClientRect();
          const overlap = !(
            r.right < rect.left ||
            r.left > rect.right ||
            r.bottom < rect.top ||
            r.top > rect.bottom
          );
          if (overlap) {
            hit = true;
            if (Math.random() < 0.4 && window.SFX && window.SFX.play) {
              const picks = ["missXtake", "sona", "extra.wan"];
              const k = picks[Math.floor(Math.random() * picks.length)];
              window.SFX.play(k);
            }
          }
        });
        // occasionally knock everyone back by forcing a fall
        if (
          hit &&
          Math.random() < 0.25 &&
          window.ShimejiFunctions &&
          window.ShimejiFunctions.triggerMassFall
        ) {
          window.ShimejiFunctions.triggerMassFall();
        }
        return hit;
      } catch (_) {
        return false;
      }
    }

    // initial schedule
    scheduleNext();

    // Expose a manual trigger for testing
    if (!window.spawnSwallowerNow) {
      window.spawnSwallowerNow = () => {
        try {
          spawnOne();
        } catch (_) {}
      };
    }
  }

  return {
    addHearts,
    initHearts,
    updateCounters,
    loveToast,
    createFloatingHeart,
    createSparkleEffect,
    burstHeartsAndStars,
    shimejiCelebrate,
    shimejiBroadcastLove,
    getHeartCount,
  };
})();
