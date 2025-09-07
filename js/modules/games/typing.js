// Typing × DIVA v1 • prototype typing rhythm game
(function () {
  const DEFAULT_LINES = [
    "miku",
    "hatsune",
    "kawaii",
    "arigatou",
    "kimi no oto",
    "leekspin",
    "sekai",
    "uta",
    "koi",
    "yume",
    "sakura",
    "hoshi",
    "ai",
  ];
  const STATE = {
    running: false,
    practice: false,
    romaji: true,
    bpm: 120,
    combo: 0,
    bestCombo: 0,
    score: 0,
    notes: [],
    hits: [],
    startTime: 0,
  };
  const JUDGE = { perfect: 120, great: 220, good: 350 }; // ms windows
  const SPEED_SCALE = { normal: 1, practice: 0.75 };

  function now() {
    return performance.now();
  }

  function getBpm() {
    
      const cur = window.__rhythmBpm || 120;
      return cur || 120;
   
  }

  function scheduleNotes(line) {
    const bpm = STATE.bpm;
    const msPerBeat = 60000 / bpm;
    const base = now() + 1000; // lead-in 1s
    STATE.notes = [];
    for (let i = 0; i < line.length; i++) {
      const t =
        base +
        (i * (msPerBeat / 2)) / (STATE.practice ? SPEED_SCALE.practice : 1); // 8th-notes
      STATE.notes.push({ ch: line[i], time: t, hit: false });
    }
    STATE.startTime = base;
  }

  function openOverlay() {
    let ov = document.getElementById("typingDivaOverlay");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "typingDivaOverlay";
      ov.style.cssText =
        "position:fixed;inset:0;background:rgba(255,255,255,.92);backdrop-filter:blur(2px);z-index:10020;display:flex;align-items:center;justify-content:center;";
      ov.innerHTML = `
        <div class="typing-panel" style="background:#fff;border:3px solid var(--border);border-radius:16px;box-shadow:var(--shadow);width:min(820px,95vw);padding:12px;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px">
            <div style="font-weight:900">Typing × DIVA</div>
            <div style="display:flex;gap:8px;align-items:center">
              <label style="font-size:12px"><input type="checkbox" id="typingPractice"/> Practice 0.75×</label>
              <label style="font-size:12px"><input type="checkbox" id="typingRomaji" checked/> Romaji</label>
              <button id="typingClose" class="pixel-btn">✕</button>
            </div>
          </div>
          <div id="typingHud" style="display:flex;gap:10px;align-items:center;margin-bottom:8px;font-weight:800;color:#596286">
            <span>Score: <span id="typingScore">0</span></span>
            <span>Combo: <span id="typingCombo">0</span> (Best <span id="typingBest">0</span>)</span>
            <span>BPM: <span id="typingBpm">120</span></span>
          </div>
          <div class="typing-highway" id="typingHighway" aria-label="note highway"></div>
          <div class="typing-hitbar" id="typingHitbar"><span>|</span></div>
          <div style="display:flex;gap:8px;align-items:center;margin-top:8px">
            <input id="typingInput" class="pixel-input" placeholder="type here" autofocus style="flex:1" />
            <button id="typingStart" class="pixel-btn">Start</button>
          </div>
          <div id="typingFeedback" style="margin-top:6px;font-weight:900"></div>
        </div>`;
      document.body.appendChild(ov);
      ov.addEventListener("click", (e) => {
        if (e.target === ov) close();
      });
      ov.querySelector("#typingClose").onclick = close;
      ov.querySelector("#typingStart").onclick = start;
      ov.querySelector("#typingPractice").onchange = (e) => {
        STATE.practice = !!e.target.checked;
      };
      ov.querySelector("#typingRomaji").onchange = (e) => {
        STATE.romaji = !!e.target.checked;
      };
      const input = ov.querySelector("#typingInput");
      input.addEventListener("input", onInput);
    }
    return ov;
  }

  function renderHighway() {
    const hw = document.getElementById("typingHighway");
    if (!hw) return;
    hw.innerHTML = "";
    const H = hw.clientHeight || 180;
    const nowT = now();
    const speed = STATE.practice ? SPEED_SCALE.practice : 1;
    STATE.notes.forEach((n, i) => {
      const dt = n.time - nowT;
      const y = Math.max(-20, Math.min(H - 10, H - dt / 3)); // 3px per ms -> compressed
      const span = document.createElement("span");
      span.className = "typing-note" + (n.hit ? " hit" : "");
      span.textContent = n.ch;
      span.style.transform = `translate(${8 * i}px, ${y}px)`;
      hw.appendChild(span);
    });
  }

  function loop() {
    if (!STATE.running) return;
    renderHighway();
    requestAnimationFrame(loop);
  }

  function judgeHit(delta) {
    const a = Math.abs(delta);
    if (a <= JUDGE.perfect) return "COOL";
    if (a <= JUDGE.great) return "GREAT";
    if (a <= JUDGE.good) return "FINE";
    return "MISS";
  }

  function scoreFor(j) {
    if (j === "COOL") return 120;
    if (j === "GREAT") return 80;
    if (j === "FINE") return 40;
    return 0;
  }

  function onInput(e) {
    if (!STATE.running) return;
    const val = e.target.value;
    if (!val) return;
    const ch = val.slice(-1);
    const t = now();
    // Find next unhit note matching char
    const idx = STATE.notes.findIndex(
      (n) => !n.hit && n.ch.toLowerCase() === ch.toLowerCase(),
    );
    if (idx < 0) return; // ignore
    const n = STATE.notes[idx];
    const j = judgeHit(t - n.time);
    n.hit = true;
    const fb = document.getElementById("typingFeedback");
    if (fb) {
      fb.textContent = j;
      fb.style.color = j === "MISS" ? "#c00" : "#2b2b44";
    }
    if (j === "MISS") {
      STATE.combo = 0;
      
        window.flashJudge && window.flashJudge("typingHighway", "MISS");
      
    } else {
      STATE.combo++;
      STATE.bestCombo = Math.max(STATE.bestCombo, STATE.combo);
      
        window.flashJudge && window.flashJudge("typingHighway", j);
        if (window.addCombo) window.addCombo("typingHighway");
        if (window.addVoltage)
          window.addVoltage(
            j === "COOL" ? 5 : j === "GREAT" ? 3 : 2,
            "typingHighway",
          );
      
      
        window.SFX && window.SFX.play("quiz.correct");
      
    }
    STATE.score += scoreFor(j);
    updateHud();
    // Zap swallower on correct
    if (j !== "MISS") {
      
        window.zapSwallower && window.zapSwallower();
      
    }
    // End when all hit
    if (STATE.notes.every((n) => n.hit)) finish();
  }

  function updateHud() {
    const s = document.getElementById("typingScore");
    if (s) s.textContent = String(STATE.score);
    const c = document.getElementById("typingCombo");
    if (c) c.textContent = String(STATE.combo);
    const b = document.getElementById("typingBest");
    if (b) b.textContent = String(STATE.bestCombo);
    const bb = document.getElementById("typingBpm");
    if (bb) bb.textContent = String(STATE.bpm | 0);
  }

  function rankFor(score, notes) {
    const max = notes * 120;
    const pct = max ? score / max : 0;
    if (pct >= 0.9) return "A";
    if (pct >= 0.8) return "B";
    if (pct >= 0.7) return "C";
    if (pct >= 0.6) return "D";
    return "F";
  }

  function finish() {
    STATE.running = false;
    const rank = rankFor(STATE.score, STATE.notes.length);
    const fb = document.getElementById("typingFeedback");
    if (fb) {
      fb.textContent = `Rank ${rank}`;
      fb.style.color = "#2b2b44";
    }
    // Rewards
    
      if (rank === "A") {
        window.Hearts?.add?.(3);
        window.hearts.loveToast && window.hearts.loveToast("Typing Rank A! +3💖");
      }
    
    
      if (window.logEvent) window.logEvent("typing_rank", 1);
    
  }

  function start() {
    const ov = document.getElementById("typingDivaOverlay");
    if (!ov) return;
    STATE.bpm = getBpm();
    STATE.combo = 0;
    STATE.score = 0;
    STATE.bestCombo = 0;
    updateHud();
    const line = (
      DEFAULT_LINES[Math.floor(Math.random() * DEFAULT_LINES.length)] + " "
    )
      .repeat(3)
      .trim();
    scheduleNotes(line);
    STATE.running = true;
    
      window.SFX && window.SFX.play("ui.change");
    
    requestAnimationFrame(loop);
  }

  function close() {
    const ov = document.getElementById("typingDivaOverlay");
    if (ov) ov.remove();
    STATE.running = false;
  }

  function open() {
    openOverlay();
    updateHud();
  }

  window.Games = window.Games || {};
  window.Games.typing = { open, start };
})();
