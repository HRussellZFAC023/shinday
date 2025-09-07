// Reusable Beatpad utilities (extracted from legacy), simplified and safe
// Exposes globals expected by games: createUltimateBeatpadButton, setupUltimateBeatpadKeyboard, createFallingBeatsSystem
// Contract:
// - createUltimateBeatpadButton(text, index, onAnswer) => { btn, style }
// - setupUltimateBeatpadKeyboard(container, onAnswer)
// - createFallingBeatsSystem(container)
(function () {
  if (window.createUltimateBeatpadButton) return; // idempotent

  // PlayStation-like mapping order: 0=Triangle, 1=Circle, 2=Cross, 3=Square
  const PAD = [
    { key: "w", label: "△", cls: "pad-triangle", color: "#2ec4b6" },
    { key: "d", label: "○", cls: "pad-circle", color: "#e76f51" },
    { key: "s", label: "×", cls: "pad-cross", color: "#264653" },
    { key: "a", label: "□", cls: "pad-square", color: "#e9c46a" },
  ];

  function ensureStyles() {
    if (document.getElementById("beatpad-styles")) return;
    const style = document.createElement("style");
    style.id = "beatpad-styles";
    style.textContent = `
      .beatpad-btn { position: relative; display:inline-flex; align-items:center; gap:6px; }
      .beatpad-key { font-weight:900; font-family: 'Press Start 2P', monospace; font-size: 11px; opacity:.9 }
      .pad-ind { width:16px; height:16px; border:2px solid currentColor; border-radius:4px; display:inline-grid; place-items:center; font-size:12px; line-height:1; }
      .pad-triangle .pad-ind { border-radius:2px; }
      .pad-circle .pad-ind { border-radius:50%; }
      .pad-cross .pad-ind { transform: rotate(45deg); }
      .pad-square .pad-ind { border-radius:3px; }
      .falling-beats { position:absolute; inset:0; pointer-events:none; overflow:hidden; }
      .falling-beat { position:absolute; top:-24px; left:0; color:#2b2b44; opacity:.85; font-weight:800; font-size:12px; }
    `;
    document.head.appendChild(style);
  }

  function createUltimateBeatpadButton(text, index, onAnswer) {
    ensureStyles();
    const spec = PAD[index % PAD.length];
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `pixel-btn beatpad-btn ${spec.cls}`;
    btn.setAttribute("data-beatpad-pos", String(index));
    btn.setAttribute("data-beatpad-key", spec.key);
    btn.style.setProperty("--pad-color", spec.color);
    btn.innerHTML = `
      <span class="pad-ind" style="color:${spec.color}"><span class="beatpad-key">${
        spec.label
      }</span></span>
      <span class="beatpad-text">${text}</span>
    `;
    btn.addEventListener("click", () => onAnswer && onAnswer(text, btn, spec));
    return { btn, style: spec };
  }

  function setupUltimateBeatpadKeyboard(container, onAnswer) {
    // Debounced key handler scoped to container
    const handler = (e) => {
      const key = String(e.key || "").toLowerCase();
      // Map arrow keys too for accessibility
      const alt = {
        ArrowUp: "w",
        ArrowRight: "d",
        ArrowDown: "s",
        ArrowLeft: "a",
      };
      const kk = alt[e.key] ? alt[e.key] : key;
      const btn = container.querySelector(`[data-beatpad-key="${kk}"]`);
      if (!btn) return;
      const text =
        (btn.querySelector(".beatpad-text") || btn).textContent || "";
      btn.classList.add("active");
      setTimeout(() => btn.classList.remove("active"), 120);
      onAnswer && onAnswer(text, btn, null);
    };
    container._beatpadHandler &&
      window.removeEventListener("keydown", container._beatpadHandler, true);
    container._beatpadHandler = handler;
    window.addEventListener("keydown", handler, true);
  }

  function createFallingBeatsSystem(container) {
    ensureStyles();
    const layer = document.createElement("div");
    layer.className = "falling-beats";
    container.appendChild(layer);
    let running = true;
    function spawn() {
      if (!running || !document.body.contains(layer)) return;
      const b = document.createElement("div");
      b.className = "falling-beat";
      const spec = PAD[Math.floor(Math.random() * PAD.length)];
      b.style.left = Math.floor(Math.random() * 90 + 5) + "%";
      b.style.color = spec.color;
      b.textContent = spec.label;
      const dur = 1200 + Math.random() * 1200;
      layer.appendChild(b);
      b.animate(
        [
          { transform: "translateY(0px)", opacity: 0.95 },
          { transform: "translateY(220px)", opacity: 0.0 },
        ],
        { duration: dur, easing: "cubic-bezier(.22,.61,.36,1)" },
      );
      setTimeout(() => b.remove(), dur + 50);
      const nextIn = 300 + Math.random() * 600;
      setTimeout(spawn, nextIn);
    }
    spawn();
    return {
      stop() {
        running = false;
        layer.remove();
      },
    };
  }

  window.createUltimateBeatpadButton = createUltimateBeatpadButton;
  window.setupUltimateBeatpadKeyboard = setupUltimateBeatpadKeyboard;
  window.createFallingBeatsSystem = createFallingBeatsSystem;
})();
