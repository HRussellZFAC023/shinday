// Reusable Quiz Engine: consistent UI, HUD hooks, beatpad wiring
(function () {
  const DEFAULTS = { baseTime: 15, options: 4 };
  function create(containerId, opts) {
    const cfg = Object.assign(
      { cardId: containerId, title: "Quiz" },
      opts || {},
    );
    const host = document.getElementById(containerId);
    if (!host) return null;
    host.innerHTML = `
      <div class="quiz-card" id="${cfg.cardId}">
        <div class="quiz-meta" id="${cfg.cardId}Meta"></div>
        <div class="quiz-hud">
          <span>Score: <strong id="${cfg.cardId}Score">0</strong></span>
          <span>Streak: <strong id="${cfg.cardId}Streak">0</strong> • Best <strong id="${cfg.cardId}BestStreak">0</strong></span>
          <span id="${cfg.cardId}TimerWrap" style="display:none">⏱️ <strong id="${cfg.cardId}Timer">${DEFAULTS.baseTime}</strong>s</span>
          <span>PB: <strong id="${cfg.cardId}BestTime">-</strong></span>
        </div>
        <div class="quiz-question" id="${cfg.cardId}Question">Loading…</div>
        <div class="quiz-choices beatpad-grid" id="${cfg.cardId}Choices"></div>
        <div class="diva-feedback-enhanced" id="${cfg.cardId}Feedback" style="display:none"></div>
      </div>`;

    // state
    let lock = false,
      tId = null,
      countdown = DEFAULTS.baseTime,
      startAt = 0,
      beats = null;
    let score = 0,
      streak = 0,
      bestStreak = 0,
      bestTime = null;
    const els = {
      q: byId(`${cfg.cardId}Question`),
      c: byId(`${cfg.cardId}Choices`),
      fb: byId(`${cfg.cardId}Feedback`),
      s: byId(`${cfg.cardId}Score`),
      st: byId(`${cfg.cardId}Streak`),
      bst: byId(`${cfg.cardId}BestStreak`),
      btw: byId(`${cfg.cardId}TimerWrap`),
      bt: byId(`${cfg.cardId}Timer`),
      btt: byId(`${cfg.cardId}BestTime`),
    };
    function byId(id) {
      return document.getElementById(id);
    }
    function resetHud() {
      score = 0;
      streak = 0;
      updateHud();
    }
    function updateHud() {
      if (els.s) els.s.textContent = String(score);
      if (els.st) els.st.textContent = String(streak);
    }
    function showFb(msg, ok) {
      if (!els.fb) return;
      els.fb.textContent = msg;
      els.fb.className = `diva-feedback-enhanced ${ok ? "correct" : "incorrect"}`;
      els.fb.style.display = "block";
      els.fb.style.opacity = "1";
      els.fb.setAttribute("data-persistent", "true");
    }
    function clearFb() {
      if (!els.fb) return;
      if (els.fb.getAttribute("data-persistent") !== "true") return;
      els.fb.style.opacity = "0";
      setTimeout(() => {
        els.fb.textContent = "";
        els.fb.style.display = "none";
        els.fb.removeAttribute("data-persistent");
      }, 300);
    }

    attachDivaHud && attachDivaHud(cfg.cardId);
    if (window.createFallingBeatsSystem && els.c) {
      beats = createFallingBeatsSystem(els.c);
    }

    async function next() {
      lock = false;
      clearFb();
      els.c.innerHTML = "";
      els.q.textContent = "Loading…";
      HUD && HUD.notes++;
      const q = await cfg.getQuestion();
      const correct = q.correct;
      els.q.innerHTML = q.promptHtml;
      const PRESET =
        (window.Jukebox && Jukebox.getPreset && Jukebox.getPreset()) ||
        DEFAULTS;
      const maxOpts = Math.min(PRESET.options || DEFAULTS.options, 4);
      const cols = maxOpts >= 6 ? 3 : 2;
      els.c.style.gridTemplateColumns = `repeat(${cols},1fr)`;
      if (cfg.isTimed && cfg.isTimed()) {
        const baseTime =
          (window.diffParams && diffParams().baseTime) || DEFAULTS.baseTime;
        countdown = PRESET.baseTime || baseTime;
        if (els.bt) els.bt.textContent = String(countdown);
        startAt = Date.now();
        if (tId) clearInterval(tId);
        tId = setInterval(() => {
          countdown--;
          if (els.bt) els.bt.textContent = String(Math.max(0, countdown));
          if (countdown <= 0) {
            clearInterval(tId);
            tId = null;
            lock = true;
            showFb(`⏰ Time! Correct: ${correct}`, false);
            SFX && SFX.play && SFX.play("quiz.timeup");
            flashJudge && flashJudge(cfg.cardId, "MISS");
            addVoltage && addVoltage(-5, cfg.cardId);
            loseLife && loseLife(cfg.cardId);
            streak = 0;
            if (els.st) els.st.textContent = String(streak);
            setTimeout(next, 900);
          }
        }, 1000);
      }
      const use = q.options.slice(0, maxOpts);
      use.forEach((opt, idx) => {
        const maker =
          window.createUltimateBeatpadButton ||
          ((label) => {
            const b = document.createElement("button");
            b.className = "pixel-btn beatpad-btn";
            b.textContent = label;
            return { btn: b, style: { isPerfect: false, color: "#a594f9" } };
          });
        const { btn } = maker(opt, idx, (text, element, style) =>
          onSelect(text, element, style, correct),
        );
        els.c.appendChild(btn);
      });
      setupUltimateBeatpadKeyboard &&
        setupUltimateBeatpadKeyboard(els.c, (text) => {
          const target = Array.from(
            els.c.querySelectorAll(".beatpad-btn"),
          ).find((b) => b.textContent === text);
          if (target) target.click();
        });
    }

    function onSelect(text, element, style, correct) {
      if (lock) return;
      lock = true;
      if (tId) {
        clearInterval(tId);
        tId = null;
      }
      const ok = text === correct;
      createRingEffect && createRingEffect(element, ok);
      if (ok) {
        if (style && style.isPerfect) {
          createPerfectHitEffect &&
            createPerfectHitEffect(element, style.color);
          showFb("✨ PERFECT! ✨", true);
          awardHearts && awardHearts(2);
        } else {
          showFb("✅ Correct!", true);
          awardHearts && awardHearts(1);
        }
        element.classList.add("correct");
        els.fb && (els.fb.style.color = "#2b2b44");
        score++;
        streak++;
        updateHud();
        if (streak > 1) loveToast && loveToast(`コンボ x${streak}!`);
        createComboMilestoneEffect && createComboMilestoneEffect(els.c, streak);
        const mult = (window.diffParams && diffParams().mult) || 1;
        const rmult = (window.getRhythmMult && getRhythmMult()) || 1;
        const gain = (12 + Math.min(15, (streak - 1) * 2)) * mult * rmult;
        addXP &&
          addXP(Math.round(style && style.isPerfect ? gain * 1.5 : gain));
        const dt = Date.now() - startAt;
        let judge = "FINE",
          v = 2,
          sc = 60;
        if ((style && style.isPerfect) || dt <= 700) {
          judge = "COOL";
          v = 5;
          sc = 120;
          HUD && HUD.counts && HUD.counts.COOL++;
          party && party(cfg.cardId);
        } else if (dt <= 1600) {
          judge = "GREAT";
          v = 3;
          sc = 80;
          HUD && HUD.counts && HUD.counts.GREAT++;
        } else {
          HUD && HUD.counts && HUD.counts.FINE++;
        }
        flashJudge && flashJudge(cfg.cardId, judge);
        addVoltage && addVoltage(v, cfg.cardId);
        addCombo && addCombo(cfg.cardId);
        {
          const sm =
            typeof window.getSingerScoreMult === "function"
              ? getSingerScoreMult()
              : 1;
          HUD && (HUD.score += Math.round(sc * mult * rmult * sm));
        }
        window.zapSwallower && window.zapSwallower();
        if (cfg.isTimed && cfg.isTimed()) {
          const elapsed = Date.now() - startAt;
          if (!bestTime || elapsed < bestTime) {
            bestTime = elapsed;
            localStorage.setItem(`${cfg.key}.bestTime`, String(bestTime));
            if (els.btt)
              els.btt.textContent = `${(bestTime / 1000).toFixed(1)}s`;
          }
        }
      } else {
        showFb(`❌ ${correct}`, false);
        streak = 0;
        updateHud();
        HUD && HUD.counts && HUD.counts.SAD++;
        flashJudge && flashJudge(cfg.cardId, "SAD");
        addVoltage && addVoltage(-5, cfg.cardId);
        resetCombo && resetCombo();
        loseLife && loseLife(cfg.cardId);
        Array.from(els.c.querySelectorAll(".beatpad-btn,.chat-option")).forEach(
          (b) => {
            b.disabled = true;
            if (b.textContent === correct) b.classList.add("correct");
          },
        );
      }
      setTimeout(next, 900);
      return ok;
    }

    function start() {
      if (els.btw)
        els.btw.style.display =
          cfg.isTimed && cfg.isTimed() ? "inline-flex" : "none";
      next();
    }
    function stop() {
      if (tId) clearInterval(tId);
      tId = null;
      if (beats && beats.stop) {
        beats.stop();
        beats = null;
      }
    }

    // initialize bests
    try {
      const bs =
        parseInt(localStorage.getItem(`${cfg.key}.bestStreak`) || "0", 10) || 0;
      bestStreak = bs;
      const bt =
        parseInt(localStorage.getItem(`${cfg.key}.bestTime`) || "0", 10) || 0;
      bestTime = bt || null;
      if (els.bst) els.bst.textContent = String(bestStreak);
      if (els.btt)
        els.btt.textContent = bestTime
          ? `${(bestTime / 1000).toFixed(1)}s`
          : "-";
    } catch (_) {}

    return { start, stop, next, els };
  }

  window.QuizEngine = { create };
})();
