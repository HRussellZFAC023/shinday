// Kotoba game module: phrase -> meaning (simple deck + jisho fallback)
(function () {
  const KEY_TIMED = "kotoba.timed";
  function isTimed() {
    return localStorage.getItem(KEY_TIMED) === "1";
  }
  function setTimed(on) {
    localStorage.setItem(KEY_TIMED, on ? "1" : "0");
  }

  // DOM
  let chatEl,
    cEl,
    fbEl,
    scoreEl,
    timerWrap,
    timerEl,
    streakEl,
    bestStreakEl,
    bestTimeEl,
    startBtn;
  // State
  let lock = false,
    tId = null,
    startAt = 0,
    countdown = 20;
  let score = 0,
    streak = 0,
    bestStreak = 0,
    bestTime = null;
  const recent = [];
  const RECENT_LIMIT = 12;
  function pushRecent(x) {
    recent.push(x);
    while (recent.length > RECENT_LIMIT) recent.shift();
  }

  const deck = [
    { jp: "おはよう", en: "Good morning" },
    { jp: "こんばんは", en: "Good evening" },
    { jp: "お元気ですか？", en: "How are you?" },
    { jp: "大丈夫？", en: "Are you okay?" },
    { jp: "頑張って！", en: "Do your best!" },
    { jp: "お疲れ様", en: "Good work" },
    { jp: "行きましょう", en: "Let's go" },
    { jp: "すごい！", en: "Amazing!" },
    { jp: "本当に？", en: "Really?" },
    { jp: "大好きだよ", en: "I love you" },
    { jp: "またね", en: "See you" },
  ];
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
  async function fetchJson(url, prox = true) {
    const r = await fetch(url, { cache: "no-store" });
    if (r.ok) return await r.json();

    if (!prox) throw new Error("network");
    return fetchJson(
      `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
      false,
    );
  }

  async function getQuestion() {
    const preset = (window.Jukebox &&
      Jukebox.getPreset &&
      Jukebox.getPreset()) || { options: 4 };
    const optCount = Math.min(preset.options || 4, 4);
    const decoyCount = Math.max(1, optCount - 1);
    // 70% from deck, 30% from jisho word search
    if (Math.random() < 0.7) {
      for (let guard = 0; guard < 20; guard++) {
        const it = deck[rnd(deck.length)];
        const key = it.jp + it.en;
        if (recent.includes(key)) continue;
        pushRecent(key);
        const correct = it.en;
        const pool = deck.filter((x) => x !== it).map((x) => x.en);
        const Treats = shuffle(pool).slice(0, decoyCount);
        if (Treats.length < decoyCount) continue;
        return {
          promptHtml: `<div style=\"font-size:26px;font-weight:900\">${it.jp}</div>`,
          correct,
          options: shuffle([correct, ...Treats]),
        };
      }
    } else {
      const q = ["miku", "song", "love", "friend", "summer", "happy"][rnd(6)];
      const data = await fetchJson(
        `https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(q)}`,
      );
      const items = (data && data.data) || [];
      for (let i = 0; i < items.length; i++) {
        const jp =
          items[i].japanese?.[0]?.word || items[i].japanese?.[0]?.reading;
        const senses = items[i].senses?.[0]?.english_definitions || [];
        if (!jp || senses.length < 2) continue;
        const correct = senses[0];
        const key = jp + correct;
        if (recent.includes(key)) continue;
        pushRecent(key);
        const Treats = shuffle(senses.slice(1)).slice(0, decoyCount);
        if (Treats.length < decoyCount) continue;
        return {
          promptHtml: `<div style=\"font-size:26px;font-weight:900\">${jp}</div>`,
          correct,
          options: shuffle([correct, ...Treats]),
        };
      }
    }
    // fallback single option prevents dead-end
    return {
      promptHtml: "<div>ことば</div>",
      correct: "Word",
      options: ["Word", "Phrase", "Name", "Sound"],
    };
  }

  function mount() {
    chatEl = document.getElementById("kotobaChat");
    cEl = document.getElementById("kotobaChoices");
    fbEl = document.getElementById("kotobaFeedback");
    scoreEl = document.getElementById("kotobaScore");
    timerWrap = document.getElementById("kotobaTimerWrap");
    timerEl = document.getElementById("kotobaTimer");
    streakEl = document.getElementById("kotobaStreak");
    bestStreakEl = document.getElementById("kotobaBestStreak");
    bestTimeEl = document.getElementById("kotobaBestTime");
    startBtn = document.getElementById("kotobaStart");
    if (!cEl) return;

    attachDivaHud && attachDivaHud("kotobaCard");

    bestStreak =
      parseInt(localStorage.getItem("kotoba.bestStreak") || "0", 10) || 0;

    const bt =
      parseInt(localStorage.getItem("kotoba.bestTime") || "0", 10) || 0;
    bestTime = bt || null;

    if (bestStreakEl) bestStreakEl.textContent = String(bestStreak);
    if (bestTimeEl)
      bestTimeEl.textContent = bestTime
        ? `${(bestTime / 1000).toFixed(1)}s`
        : "-";
    if (timerWrap) timerWrap.style.display = isTimed() ? "inline-flex" : "none";
    if (startBtn)
      startBtn.addEventListener("click", () => start({ timed: isTimed() }));
  }

  function say(text, from = "miku") {
    if (!chatEl) return;
    const b = document.createElement("div");
    b.style.cssText =
      "padding:8px 12px; border-radius:12px; max-width:88%; box-shadow: var(--shadow);";
    if (from === "miku") {
      b.style.background = "linear-gradient(45deg,#BDE3FF,#CFF6E6)";
      b.style.alignSelf = "flex-start";
      b.textContent = "ミク: " + text;
    } else {
      b.style.background = "linear-gradient(45deg,#FFD1EC,#E6D1FF)";
      b.style.alignSelf = "flex-end";
      b.textContent = "あなた: " + text;
    }
    chatEl.appendChild(b);
    chatEl.scrollTop = chatEl.scrollHeight;
  }

  async function loadRound() {
    if (!cEl) return;
    lock = false;

    if (window.clearDivaFeedback) clearDivaFeedback("kotobaFeedback");

    if (fbEl) fbEl.textContent = "";
    cEl.innerHTML = "";
    if (chatEl) chatEl.innerHTML = "";

    HUD && HUD.notes++;

    let q;
    try {
      q = await getQuestion();
    } catch (e) {
      const grid = document.getElementById("kotobaChoices");
      if (grid)
        grid.innerHTML = `<div>⚠️ Couldn't load. <button id=\"kotobaRetry\" class=\"pixel-btn\">Retry</button></div>`;
      const btn = document.getElementById("kotobaRetry");
      if (btn) btn.onclick = () => loadRound();
      return;
    }
    const correct = q.correct;
    if (chatEl)
      say(
        `「${q.promptHtml.replace(/<[^>]+>/g, "")}」って、どういう意味？`,
        "miku",
      );
    const PRESET = (window.Jukebox &&
      Jukebox.getPreset &&
      Jukebox.getPreset()) || { baseTime: 20, options: 4 };
    const maxOpts = Math.min(PRESET.options || 4, 4);
    cEl.style.display = "flex";
    cEl.style.flexDirection = "column";
    if (isTimed()) {
      const baseTime = (function () {
        return (window.diffParams && diffParams().baseTime) || 20;
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
            fbEl.textContent = `⏰ Time!`;
            fbEl.style.color = "#c00";
          }

          SFX.play("quiz.timeup");

          flashJudge && flashJudge("kotobaCard", "MISS");
          addVoltage && addVoltage(-5, "kotobaCard");
          loseLife && loseLife("kotobaCard");

          streak = 0;
          if (streakEl) streakEl.textContent = String(streak);
          setTimeout(loadRound, 900);
        }
      }, 1000);
    }
    const use = q.options.slice(0, maxOpts);
    use.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "pixel-btn chat-option";
      btn.textContent = opt;
      btn.addEventListener("click", () =>
        onSelect(opt, btn, { isPerfect: false, color: "#a594f9" }, correct),
      );
      cEl.appendChild(btn);
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
    if (isCorrect) {
      createRingEffect && createRingEffect(element, true);

      element.classList.add("correct");
      if (style && style.isPerfect) {
        createPerfectHitEffect && createPerfectHitEffect(element, style.color);

        if (window.showDivaFeedback)
          showDivaFeedback("kotobaFeedback", "✨ PERFECT! ✨", true);
        else if (fbEl) fbEl.textContent = "✨ PERFECT! ✨";

        awardHearts && awardHearts(2);
      } else {
        if (window.showDivaFeedback)
          showDivaFeedback("kotobaFeedback", "✅ Correct!", true);
        else if (fbEl) fbEl.textContent = "✅ Correct!";

        awardHearts && awardHearts(1);
      }
      if (fbEl) fbEl.style.color = "#2b2b44";
      score++;
      if (scoreEl) scoreEl.textContent = String(score);
      if (chatEl) {
        say(text, "you");
        setTimeout(() => say("やった！正解だよ！", "miku"), 200);
      }
      streak++;
      if (streakEl) streakEl.textContent = String(streak);

      if (streak > 1) loveToast && loveToast(`Combo x${streak}!`);
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
      let judge = "FINE",
        v = 2,
        sc = 60;
      if ((style && style.isPerfect) || dt <= 700) {
        judge = "COOL";
        v = 5;
        sc = 120;

        HUD && HUD.counts && HUD.counts.COOL++;
        party && party("kotobaCard");
      } else if (dt <= 1600) {
        judge = "GREAT";
        v = 3;
        sc = 80;

        HUD && HUD.counts && HUD.counts.GREAT++;
      } else {
        HUD && HUD.counts && HUD.counts.FINE++;
      }

      flashJudge && flashJudge("kotobaCard", judge);
      addVoltage && addVoltage(v, "kotobaCard");
      addCombo && addCombo("kotobaCard");
      {
        const sm =
          typeof window.getSingerScoreMult === "function"
            ? getSingerScoreMult()
            : 1;
        HUD && (HUD.score += Math.round(sc * mult * rmult * sm));
      }

      window.zapSwallower && window.zapSwallower();

      if (isTimed()) {
        const elapsed = Date.now() - startAt;
        if (!bestTime || elapsed < bestTime) {
          bestTime = elapsed;

          localStorage.setItem("kotoba.bestTime", String(bestTime));

          if (bestTimeEl)
            bestTimeEl.textContent = `${(bestTime / 1000).toFixed(1)}s`;
        }
      }
    } else {
      createRingEffect && createRingEffect(element, false);

      element.classList.add("wrong");
      if (window.showDivaFeedback)
        showDivaFeedback("kotobaFeedback", `❌ ${correct}`, false);
      else if (fbEl) {
        fbEl.textContent = `❌ ${correct}`;
        fbEl.style.color = "#c00";
      }
      if (chatEl) {
        say(text, "you");
        setTimeout(() => say(`残念… 正解は「${correct}」だよ。`, "miku"), 200);
      }
      streak = 0;
      if (streakEl) streakEl.textContent = String(streak);

      HUD && HUD.counts && HUD.counts.SAD++;
      flashJudge && flashJudge("kotobaCard", "SAD");
      addVoltage && addVoltage(-5, "kotobaCard");
      resetCombo && resetCombo();
      loseLife && loseLife("kotobaCard");

      // Highlight correct answer

      Array.from(cEl.querySelectorAll(".chat-option")).forEach((b) => {
        b.disabled = true;
        if (b.textContent === correct) b.classList.add("correct");
      });
    }

    Array.from(cEl.querySelectorAll(".chat-option")).forEach(
      (b) => (b.disabled = true),
    );

    setTimeout(loadRound, 900);
    return isCorrect;
  }

  function start({ timed }) {
    if (typeof timed === "boolean") setTimed(timed);
    if (timerWrap) timerWrap.style.display = isTimed() ? "inline-flex" : "none";
    loadRound();
  }
  function stop() {
    if (tId) clearInterval(tId);

    tId = null;
  }

  document.addEventListener("kotoba-start", (ev) => {
    const d = ev.detail || {};
    start({ timed: !!d.timed });
  });
  window.Games = window.Games || {};
  window.Games.kotoba = { isTimed, setTimed, mount, start, stop };
})();
