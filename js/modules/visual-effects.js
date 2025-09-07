// Ring, perfect-hit, and combo milestone effects (extracted from legacy)
(function () {
  if (window.createRingEffect && window.createPerfectHitEffect) return;

  function createRingEffect(element, isCorrect = true) {
    try {
      if (!element || window.__rhythmRings === false) return;
      const rings = isCorrect ? 4 : 2;
      const colors = isCorrect
        ? ["#00ff88", "#ff0080", "#0088ff", "#ffaa00"]
        : ["#ff6666", "#ff9999"];
      element.style.position = element.style.position || "relative";
      for (let i = 0; i < rings; i++) {
        setTimeout(() => {
          const ring = document.createElement("div");
          const color = colors[i % colors.length];
          ring.style.cssText = `position:absolute;top:50%;left:50%;width:20px;height:20px;border:4px solid ${color};border-radius:50%;transform:translate(-50%,-50%);pointer-events:none;z-index:1000;animation:ringExpand 1s ease-out forwards;box-shadow:0 0 20px ${color}60;`;
          element.appendChild(ring);
          setTimeout(() => ring.remove(), 1000);
        }, i * 100);
      }
    } catch (_) {}
  }

  function createPerfectHitEffect(element, color = "#a594f9") {
    try {
      if (!element) return;
      const glowBurst = document.createElement("div");
      glowBurst.style.cssText = `position:absolute;top:50%;left:50%;width:100px;height:100px;background:radial-gradient(circle, ${color}40, transparent);border-radius:50%;transform:translate(-50%,-50%) scale(0);pointer-events:none;z-index:1010;`;
      element.style.position = element.style.position || "relative";
      element.appendChild(glowBurst);
      glowBurst.animate(
        [
          { transform: "translate(-50%,-50%) scale(0)", opacity: 1 },
          { transform: "translate(-50%,-50%) scale(2)", opacity: 0 },
        ],
        { duration: 500, easing: "ease-out" },
      );
      setTimeout(() => glowBurst.remove(), 520);
    } catch (_) {}
  }

  function createComboMilestoneEffect(container, combo) {
    try {
      if (!container) return;
      const milestones = [5, 10, 25, 50, 100];
      if (!milestones.includes(combo)) return;
      // simple confetti burst
      const burst = document.createElement("div");
      burst.className = "party";
      container.appendChild(burst);
      setTimeout(() => burst.remove(), 800);
    } catch (_) {}
  }

  window.createRingEffect = window.createRingEffect || createRingEffect;
  window.createPerfectHitEffect =
    window.createPerfectHitEffect || createPerfectHitEffect;
  window.createComboMilestoneEffect =
    window.createComboMilestoneEffect || createComboMilestoneEffect;
})();
