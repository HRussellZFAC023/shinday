// Vocab game module: mounts onto existing DOM and runs rounds (Jisho API based)
(function () {
  const KEY_DIR = "vocab.direction";
  const KEY_TIMED = "vocab.timed";
  function direction() {
    return localStorage.getItem(KEY_DIR) || "jp-en";
  }
  function setDirection(dir) {
    localStorage.setItem(KEY_DIR, dir);
  }
  function isTimed() {
    return localStorage.getItem(KEY_TIMED) === "1";
  }
  function setTimed(on) {
    localStorage.setItem(KEY_TIMED, on ? "1" : "0");
  }

  // DOM refs
  let qEl,
    cEl,
    fbEl,
    scoreEl,
    timerWrap,
    timerEl,
    streakEl,
    bestStreakEl,
    bestTimeEl;
  let optionBtns;

  // State
  let score = 0,
    streak = 0,
    bestStreak = 0,
    bestTime = null,
    lock = false,
    tId = null,
    startAt = 0,
    countdown = 15,
    beats = null;
  let curDir = direction();

  // Caches
  const vocabCache = { pages: [], enDefs: new Set(), jpSurfaces: new Set() };

  function rnd(n) {
    return Math.floor(Math.random() * n);
  }
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  async function fetchJsonWithProxy(url) {
    // Try direct
    try {
      const r = await fetch(url, { cache: "no-store" });
      if (r.ok) return await r.json();
    } catch (_) {}
    // Try allorigins JSON
    try {
      const rr = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
        { cache: "no-store" },
      );
      if (rr.ok) {
        const j = await rr.json();
        if (j && j.contents) return JSON.parse(j.contents);
      }
    } catch (_) {}
    // Try allorigins raw
    try {
      const rr2 = await fetch(
        `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
        { cache: "no-store" },
      );
      if (rr2.ok) return await rr2.json();
    } catch (_) {}
    throw new Error("network");
  }
  async function primeVocabPage(page) {
    const url = `https://jisho.org/api/v1/search/words?keyword=%23common&page=${page}`;
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
    return arr;
  }
  // Preload a couple of pages up front to reduce question stalls
  (async () => {
    try {
      await primeVocabPage(rnd(50) + 1);
      await primeVocabPage(rnd(50) + 1);
    } catch (_) {}
  })();

  function pickN(setLike, n, avoid = new Set()) {
    const arr = Array.isArray(setLike) ? setLike.slice() : Array.from(setLike);
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
  const recentVocab = [];
  const RECENT_LIMIT = 10;
  function pushRecent(v) {
    recentVocab.push(v);
    while (recentVocab.length > RECENT_LIMIT) recentVocab.shift();
  }

  async function getVocabQuestion(direction) {
    const preset = (window.Jukebox &&
      Jukebox.getPreset &&
      Jukebox.getPreset()) || { options: 4 };
    const optCount = Math.min(preset.options || 4, 4);
    const decoyCount = Math.max(1, optCount - 1);
    if (vocabCache.pages.length === 0) await primeVocabPages(3);
    if (vocabCache.enDefs.size < 20 || vocabCache.jpSurfaces.size < 20)
      await primeVocabPages(2);
    const page = vocabCache.pages[rnd(vocabCache.pages.length)];
    for (let guard = 0; guard < 14; guard++) {
      const pick = page[rnd(page.length)];
      const jp =
        (pick.japanese &&
          (pick.japanese[0].word || pick.japanese[0].reading)) ||
        "";
      const reading = (pick.japanese && pick.japanese[0].reading) || "";
      const enList = (pick.senses && pick.senses[0]?.english_definitions) || [];
      const en = enList[0];
      if (!jp || !en) continue;
      if (recentVocab.includes(jp)) continue;
      if (direction === "jp-en") {
        const correct = en.trim();
        const Treats = Array.from(
          new Set(pickN(vocabCache.enDefs, decoyCount * 2, new Set([correct]))),
        )
          .filter((x) => x !== correct)
          .slice(0, decoyCount);
        if (Treats.length < decoyCount) {
          await primeVocabPages(2);
          continue;
        }
        pushRecent(jp);
        return {
          promptHtml: `<div style=\"font-size:22px;font-weight:900\">${jp}</div><div style=\"opacity:.8\">${reading || ""}</div>`,
          correct,
          options: shuffle([correct, ...Treats]),
        };
      } else {
        const correct = (jp || reading).trim();
        const Treats = Array.from(
          new Set(
            pickN(vocabCache.jpSurfaces, decoyCount * 2, new Set([correct])),
          ),
        )
          .filter((x) => x !== correct)
          .slice(0, decoyCount);
        if (Treats.length < decoyCount) {
          await primeVocabPages(2);
          continue;
        }
        pushRecent(jp);
        return {
          promptHtml: `<div style=\"font-size:16px;opacity:.8\">Meaning:</div><div style=\"font-size:22px;font-weight:900\">${en}</div>`,
          correct,
          options: shuffle([correct, ...Treats]),
        };
      }
    }
    throw new Error("no-question");
  }

  function mount() {
    qEl = document.getElementById("vocabQuestion");
    cEl = document.getElementById("vocabChoices");
    fbEl = document.getElementById("vocabFeedback");
    scoreEl = document.getElementById("vocabScore");
    timerWrap = document.getElementById("vocabTimerWrap");
    timerEl = document.getElementById("vocabTimer");
    streakEl = document.getElementById("vocabStreak");
    bestStreakEl = document.getElementById("vocabBestStreak");
    bestTimeEl = document.getElementById("vocabBestTime");
    optionBtns = document.querySelectorAll("#vocabMeta .mode-option");
    if (!qEl || !cEl) return;

    if (typeof window.attachDivaHud === "function") attachDivaHud("vocabCard");

    // restore stats

    bestStreak =
      parseInt(localStorage.getItem("vocab.bestStreak") || "0", 10) || 0;

    const bt = parseInt(localStorage.getItem("vocab.bestTime") || "0", 10) || 0;
    bestTime = bt || null;

    if (bestStreakEl) bestStreakEl.textContent = String(bestStreak);
    if (bestTimeEl)
      bestTimeEl.textContent = bestTime
        ? `${(bestTime / 1000).toFixed(1)}s`
        : "-";
    if (timerWrap) timerWrap.style.display = isTimed() ? "inline-flex" : "none";
    optionBtns.forEach((b) => {
      b.addEventListener("click", () => {
        curDir = b.getAttribute("data-mode") || "jp-en";
        optionBtns.forEach((x) => x.classList.remove("active"));
        b.classList.add("active");

        SFX.play("ui.select");

        start({ direction: curDir, timed: isTimed() });
      });
    });
  }

  async function loadRound() {
    if (!qEl || !cEl) return;
    lock = false;
    // Clear previous persistent feedback if enhanced UI is present

    if (window.clearDivaFeedback) clearDivaFeedback("vocabFeedback");

    if (fbEl) fbEl.textContent = "";
    cEl.innerHTML = "";
    qEl.textContent = "Loading…";
    // advance notes count if HUD exists

    if (window.HUD) HUD.notes++;

    let q;
    try {
      q = await getVocabQuestion(curDir);
    } catch (e) {
      if (qEl) qEl.innerHTML = "";
      if (cEl)
        cEl.innerHTML = `<div style="grid-column:1/-1">⚠️ Couldn't load vocab. <button id=\"vocabRetry\" class=\"pixel-btn\">Retry</button></div>`;
      const btn = document.getElementById("vocabRetry");
      if (btn) btn.onclick = () => loadRound();
      return;
    }
    const correct = q.correct;
    qEl.innerHTML = q.promptHtml;
    const PRESET = (window.Jukebox &&
      Jukebox.getPreset &&
      Jukebox.getPreset()) || { baseTime: 15, options: 4 };
    const maxOpts = Math.min(PRESET.options || 4, 4);

    const cols = maxOpts >= 6 ? 3 : 2;
    cEl.style.gridTemplateColumns = `repeat(${cols},1fr)`;
    cEl.style.gridTemplateRows = `repeat(${Math.ceil(maxOpts / cols)},1fr)`;

    if (isTimed()) {
      const baseTime = (function () {
        return (window.diffParams && diffParams().baseTime) || 15;
      })();
      countdown = PRESET.baseTime || baseTime;
      if (timerEl) timerEl.textContent = String(countdown);
      startAt = Date.now();
      if (tId) clearInterval(tId);
      tId = setInterval(() => {
        countdown--;
        if (timerEl) timerEl.textContent = String(Math.max(0, countdown));
        if (countdown <= 0) {
          clearInterval(tId);
          tId = null;
          lock = true;
          if (fbEl) {
            fbEl.textContent = `⏰ Time! Correct: ${correct}`;
            fbEl.style.color = "#c00";
          }

          SFX.play("quiz.timeup");

          flashJudge && flashJudge("vocabCard", "MISS");
          addVoltage && addVoltage(-5, "vocabCard");
          loseLife && loseLife("vocabCard");
          window.StudyHub && StudyHub.registerAnswer(false, 'MISS');

          streak = 0;
          if (streakEl) streakEl.textContent = String(streak);
          setTimeout(loadRound, 900);
        }
      }, 1000);
    }
    const use = q.options.slice(0, maxOpts);
    use.forEach((opt, idx) => {
      const maker =
        window.createUltimateBeatpadButton ||
        ((label) => {
          const btn = document.createElement("button");
          btn.className = "pixel-btn beatpad-btn";
          btn.textContent = label;
          return { btn, style: { isPerfect: false, color: "#a594f9" } };
        });
      const { btn } = maker(opt, idx, (text, element, style) =>
        onSelect(text, element, style, correct),
      );
      cEl.appendChild(btn);
    });

    setupUltimateBeatpadKeyboard &&
      setupUltimateBeatpadKeyboard(cEl, (text) => {
        const target = Array.from(cEl.querySelectorAll(".beatpad-btn")).find(
          (b) => b.textContent === text,
        );
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
    const isCorrect = text === correct;
    let judge;
    if (isCorrect) {
      createRingEffect && createRingEffect(element, true);

      if (style && style.isPerfect) {
        createPerfectHitEffect && createPerfectHitEffect(element, style.color);

        if (window.showDivaFeedback)
          showDivaFeedback("vocabFeedback", "✨ PERFECT! ✨", true);
        else if (fbEl) fbEl.textContent = "✨ PERFECT! ✨";

        awardHearts && awardHearts(2);
      } else {
        if (window.showDivaFeedback)
          showDivaFeedback("vocabFeedback", "✅ Correct!", true);
        else if (fbEl) {
          fbEl.textContent = "✅ Correct!";
        }

        awardHearts && awardHearts(1);
      }
      if (fbEl) fbEl.style.color = "#2b2b44";
      score++;
      if (scoreEl) scoreEl.textContent = String(score);
      streak++;
      if (streakEl) streakEl.textContent = String(streak);

      if (streak > 1) loveToast && loveToast(`コンボ x${streak}!`);
      createComboMilestoneEffect && createComboMilestoneEffect(cEl, streak);

      const mult = (function () {
        return diffParams().mult;
      })();
      const rmult = (function () {
        return getRhythmMult();
      })();
      const gain = (12 + Math.min(15, (streak - 1) * 2)) * mult * rmult;

      addXP && addXP(Math.round(style && style.isPerfect ? gain * 1.5 : gain));

      const dt = Date.now() - startAt;
      judge = "FINE";
      let v = 2,
        sc = 50;
      if ((style && style.isPerfect) || dt <= 600) {
        judge = "COOL";
        v = 4;
        sc = 100;

        HUD && HUD.counts && HUD.counts.COOL++;
        party && party("vocabCard");
      } else if (dt <= 1400) {
        judge = "GREAT";
        v = 3;
        sc = 70;

        HUD && HUD.counts && HUD.counts.GREAT++;
      } else {
        HUD && HUD.counts && HUD.counts.FINE++;
      }

      flashJudge && flashJudge("vocabCard", judge);
      addVoltage && addVoltage(v, "vocabCard");
      addCombo && addCombo("vocabCard");
      {
        const sm =
          typeof window.getSingerScoreMult === "function"
            ? getSingerScoreMult()
            : 1;
        HUD && (HUD.score += Math.round(sc * mult * rmult * sm));
      }

      // Zap any active swallower on correct

      window.zapSwallower && window.zapSwallower();

      if (isTimed()) {
        const elapsed = Date.now() - startAt;
        if (!bestTime || elapsed < bestTime) {
          bestTime = elapsed;

          localStorage.setItem("vocab.bestTime", String(bestTime));

          if (bestTimeEl)
            bestTimeEl.textContent = `${(bestTime / 1000).toFixed(1)}s`;
        }
      }
    } else {
      createRingEffect && createRingEffect(element, false);

      if (window.showDivaFeedback)
        showDivaFeedback("vocabFeedback", `❌ ${correct}`, false);
      else if (fbEl) {
        fbEl.textContent = `❌ ${correct}`;
        fbEl.style.color = "#c00";
      }
      streak = 0;
      if (streakEl) streakEl.textContent = String(streak);

      HUD && HUD.counts && HUD.counts.SAD++;
      flashJudge && flashJudge("vocabCard", "SAD");
      addVoltage && addVoltage(-5, "vocabCard");
      resetCombo && resetCombo();
      loseLife && loseLife("vocabCard");
    }
    window.StudyHub && StudyHub.registerAnswer(isCorrect, isCorrect ? judge : 'MISS');
    setTimeout(loadRound, 900);
    return isCorrect;
  }

  function start({ direction: dir, timed }) {
    if (dir) {
      curDir = dir;
      setDirection(dir);
    }
    if (typeof timed === "boolean") setTimed(timed);
    if (timerWrap) timerWrap.style.display = isTimed() ? "inline-flex" : "none";
    if (window.createFallingBeatsSystem && cEl) {
      if (beats) beats.stop();
      beats = createFallingBeatsSystem(cEl);
    }
    loadRound();
  }
  function stop() {
    if (tId) clearInterval(tId);
    tId = null;
    if (beats && beats.stop) {
      beats.stop();
      beats = null;
    }
  }

  // Wire event start from main __startSong dispatcher
  document.addEventListener("vocab-start", (ev) => {
    const d = ev.detail || {};
    start({ direction: d.direction || direction(), timed: !!d.timed });
  });

  window.Games = window.Games || {};
  window.Games.vocab = {
    direction,
    setDirection,
    isTimed,
    setTimed,
    mount,
    start,
    stop,
  };
})();
