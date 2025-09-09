// Language Dojo × Project DIVA - Complete Game Logic
// State management, API integration, game mechanics, and effects

(function () {
  "use strict";

  // ===== Core State Management =====
  const State = {
    currentGame: null,
    isPlaying: false,
    songTimer: 180, // 3 minutes in seconds
    questionTimer: 15,
    score: 0,
    combo: 0,
    maxCombo: 0,
    lives: 5,
    voltage: 0,
    userLevel: 1,
    difficulty: 3,
    judgmentCounts: {
      COOL: 0,
      GREAT: 0,
      FINE: 0,
      MISS: 0,
    },
    questProgress: {
      score: 0,
      coolHits: 0,
      maxCombo: 0,
    },
    questionQueue: [],
    currentQuestion: null,
    // UI options and timing
    vocabDirection: "jp-en", // or 'en-jp'
    kanjiDirection: "meaning-kanji", // or 'kanji-meaning'
    noteDurationMs: 2000,
    hitTime: null,
  };

  // ===== Audio System =====
  const SFX = {
    start: null,
    perfect: null,
    great: null,
    miss: null,
    timeup: null,
    click: null,

    init() {
      this.start = document.getElementById("sfxStart");
      this.perfect = document.getElementById("sfxPerfect");
      this.great = document.getElementById("sfxGreat");
      this.miss = document.getElementById("sfxMiss");
      this.timeup = document.getElementById("sfxTimeup");
      this.click = document.getElementById("sfxClick");
    },

    play(type) {
      try {
        const sound = this[type];
        if (sound) {
          sound.currentTime = 0;
          sound.play().catch(() => {});
        }
      } catch (e) {}
    },
  };

  // ===== API Integration =====
  const API = {
    async fetchWordOfDay(diff = 1) {
      await (window.JLPT_READY || Promise.resolve());
      const pack = window.JLPT && window.JLPT.vocab && window.JLPT.vocab[diff];
      const arr = Array.isArray(pack) ? pack : [];
      if (!arr.length) return null;
      const pick = arr[Math.floor(Math.random() * arr.length)];
      return { word: pick.word || pick.reading, reading: pick.reading || "", meaning: pick.meaning || "" };
    },
  };

  // ===== Kana/Romaji Utils =====
  const Kana = (() => {
    const hiraToRomaMap = new Map([
      ["あ", "a"],
      ["い", "i"],
      ["う", "u"],
      ["え", "e"],
      ["お", "o"],
      ["か", "ka"],
      ["き", "ki"],
      ["く", "ku"],
      ["け", "ke"],
      ["こ", "ko"],
      ["さ", "sa"],
      ["し", "shi"],
      ["す", "su"],
      ["せ", "se"],
      ["そ", "so"],
      ["た", "ta"],
      ["ち", "chi"],
      ["つ", "tsu"],
      ["て", "te"],
      ["と", "to"],
      ["な", "na"],
      ["に", "ni"],
      ["ぬ", "nu"],
      ["ね", "ne"],
      ["の", "no"],
      ["は", "ha"],
      ["ひ", "hi"],
      ["ふ", "fu"],
      ["へ", "he"],
      ["ほ", "ho"],
      ["ま", "ma"],
      ["み", "mi"],
      ["む", "mu"],
      ["め", "me"],
      ["も", "mo"],
      ["や", "ya"],
      ["ゆ", "yu"],
      ["よ", "yo"],
      ["ら", "ra"],
      ["り", "ri"],
      ["る", "ru"],
      ["れ", "re"],
      ["ろ", "ro"],
      ["わ", "wa"],
      ["を", "o"],
      ["ん", "n"],
      ["が", "ga"],
      ["ぎ", "gi"],
      ["ぐ", "gu"],
      ["げ", "ge"],
      ["ご", "go"],
      ["ざ", "za"],
      ["じ", "ji"],
      ["ず", "zu"],
      ["ぜ", "ze"],
      ["ぞ", "zo"],
      ["だ", "da"],
      ["ぢ", "ji"],
      ["づ", "zu"],
      ["で", "de"],
      ["ど", "do"],
      ["ば", "ba"],
      ["び", "bi"],
      ["ぶ", "bu"],
      ["べ", "be"],
      ["ぼ", "bo"],
      ["ぱ", "pa"],
      ["ぴ", "pi"],
      ["ぷ", "pu"],
      ["ぺ", "pe"],
      ["ぽ", "po"],
      ["きゃ", "kya"],
      ["きゅ", "kyu"],
      ["きょ", "kyo"],
      ["しゃ", "sha"],
      ["しゅ", "shu"],
      ["しょ", "sho"],
      ["ちゃ", "cha"],
      ["ちゅ", "chu"],
      ["ちょ", "cho"],
      ["にゃ", "nya"],
      ["にゅ", "nyu"],
      ["にょ", "nyo"],
      ["ひゃ", "hya"],
      ["ひゅ", "hyu"],
      ["ひょ", "hyo"],
      ["みゃ", "mya"],
      ["みゅ", "myu"],
      ["みょ", "myo"],
      ["りゃ", "rya"],
      ["りゅ", "ryu"],
      ["りょ", "ryo"],
      ["ぎゃ", "gya"],
      ["ぎゅ", "gyu"],
      ["ぎょ", "gyo"],
      ["じゃ", "ja"],
      ["じゅ", "ju"],
      ["じょ", "jo"],
      ["びゃ", "bya"],
      ["びゅ", "byu"],
      ["びょ", "byo"],
      ["ぴゃ", "pya"],
      ["ぴゅ", "pyu"],
      ["ぴょ", "pyo"],
      ["っ", "*tsu*"],
    ]);
    function kataToHira(str) {
      return (str || "").replace(/[ァ-ン]/g, (ch) =>
        String.fromCharCode(ch.charCodeAt(0) - 0x60)
      );
    }
    function toRomaji(kana) {
      if (!kana) return "";
      kana = kataToHira(kana);
      let out = "";
      for (let i = 0; i < kana.length; ) {
        const two = kana.slice(i, i + 2);
        const one = kana[i];
        if (hiraToRomaMap.has(two)) {
          out += hiraToRomaMap.get(two);
          i += 2;
          continue;
        }
        if (one === "っ") {
          const nextRoma =
            hiraToRomaMap.get(kana.slice(i + 1, i + 3)) ||
            hiraToRomaMap.get(kana[i + 1]) ||
            "";
          if (nextRoma) out += nextRoma[0];
          i += 1;
          continue;
        }
        out += hiraToRomaMap.get(one) || one;
        i += 1;
      }
      return out;
    }
    function normalize(input) {
      return (input || "").toLowerCase().replace(/\s+/g, "");
    }
    return { toRomaji, normalize, kataToHira };
  })();

  // ===== Question Generation =====
  const QuestionGenerator = {
    async generateVocabQuestion() {
      await (window.JLPT_READY || Promise.resolve());
      const pack = window.JLPT.vocab && window.JLPT.vocab[State.difficulty];
      const pool = Array.isArray(pack) ? pack : [];
      if (!pool.length) return null;
      const entry = pool[Math.floor(Math.random() * pool.length)];
      const jp = entry.word || entry.reading;
      const reading = entry.reading || "";
      const en = entry.meaning || "";
      const dir = State.vocabDirection;
      if (dir === "jp-en") {
        const distractors = new Set();
        while (distractors.size < 3 && pool.length > 3) {
          const d = pool[Math.floor(Math.random() * pool.length)].meaning;
          if (d !== en) distractors.add(d);
        }
        const options = [en, ...distractors].sort(() => Math.random() - 0.5);
        return { type: "vocab", prompt: { jp, reading }, correct: en, options, reading };
      } else {
        const distractors = new Set();
        while (distractors.size < 3 && pool.length > 3) {
          const d = pool[Math.floor(Math.random() * pool.length)];
          const surface = d.word || d.reading;
          if (surface !== jp) distractors.add(surface);
        }
        const options = [jp, ...distractors].sort(() => Math.random() - 0.5);
        return { type: "vocab", prompt: { en }, correct: jp, options, reading };
      }
    },

    async generateKanjiQuestion() {
      await (window.JLPT_READY || Promise.resolve());
      const pack = window.JLPT && window.JLPT.kanji && window.JLPT.kanji[State.difficulty];
      const pool = Array.isArray(pack) ? pack : [];
      if (!pool.length) return null;
      const entry = pool[Math.floor(Math.random() * pool.length)];
      const kanji = entry.kanji;
      const meaning = entry.meaning;
      const dir = State.kanjiDirection;
      if (dir === "meaning-kanji") {
        const distractors = new Set();
        while (distractors.size < 3 && pool.length > 3) {
          const d = pool[Math.floor(Math.random() * pool.length)].kanji;
          if (d !== kanji) distractors.add(d);
        }
        const options = [kanji, ...distractors].sort(() => Math.random() - 0.5);
        return { type: "kanji", prompt: meaning, correct: kanji, options };
      } else {
        const distractors = new Set();
        while (distractors.size < 3 && pool.length > 3) {
          const d = pool[Math.floor(Math.random() * pool.length)].meaning;
          if (d !== meaning) distractors.add(d);
        }
        const options = [meaning, ...distractors].sort(() => Math.random() - 0.5);
        return { type: "kanji", prompt: kanji, correct: meaning, options };
      }
    },
    async generateTypingQuestion() {
      await (window.JLPT_READY || Promise.resolve());
      const pack = window.JLPT.vocab && window.JLPT.vocab[State.difficulty];
      const pool = Array.isArray(pack) ? pack : [];
      if (pool.length) {
        const entry = pool[Math.floor(Math.random() * pool.length)];
        const jp = entry.word || entry.reading;
        const reading = entry.reading || "";
        const romaji = entry.romaji || Kana.toRomaji(reading);
        return { type: "typing", jp, reading, romaji, typed: "", startTime: null };
      }     
      return {
        type: "typing",
        jp: fallback,
        reading: fallback,
        romaji: fallback,
        typed: "",
        startTime: null,
      };
    },
  };

  // ===== Prefetch System =====
  const Prefetch = {
    async ensureQuestions(gameType, count = 10) {
      const needed = Math.min(4, count - State.questionQueue.length);
      if (needed <= 0) return;

      for (let i = 0; i < needed; i++) {
        let q = null;
        if (gameType === "vocab") q = await QuestionGenerator.generateVocabQuestion();
        else if (gameType === "kanji") q = await QuestionGenerator.generateKanjiQuestion();
        else if (gameType === "typing") q = await QuestionGenerator.generateTypingQuestion();
        if (q) State.questionQueue.push(q);
      }
    },
  };

  // ===== UI Management =====
  const UI = {
    elements: {},

    init() {
      // Cache DOM elements
      this.elements = {
        menuPanel: document.getElementById("menuPanel"),
        gameArea: document.getElementById("gameArea"),
        userLevel: document.getElementById("userLevel"),
        voltageBar: document.getElementById("voltageBar"),
        comboCount: document.getElementById("comboCount"),
        scoreValue: document.getElementById("scoreValue"),
        songTimer: document.getElementById("songTimer"),
        livesContainer: document.getElementById("livesContainer"),
        judgmentDisplay: document.getElementById("judgmentDisplay"),
        questionContent: document.getElementById("questionContent"),
        answerGrid: document.getElementById("answerGrid"),
        typingArea: document.getElementById("typingArea"),
        typingTarget: document.getElementById("typingTarget"),
        typingInput: document.getElementById("typingInput"),
        typingFeedback: document.getElementById("typingFeedback"),
        questionTimerBar: document.getElementById("questionTimerBar"),
        questionTimerText: document.getElementById("questionTimerText"),
        rhythmLanes: document.getElementById("rhythmLanes"),
        songOverModal: document.getElementById("songOverModal"),
        effectsLayer: document.getElementById("effectsLayer"),
        difficultySlider: document.getElementById("difficultySlider"),
        diffValue: document.getElementById("diffValue"),
        diffLabel: document.getElementById("diffLabel"),
        wodContent: document.getElementById("wodContent"),
        wodNext: document.getElementById("wodNext"),
        questScore: document.getElementById("questScore"),
        questCool: document.getElementById("questCool"),
        questCombo: document.getElementById("questCombo"),
      };

      // Setup event listeners
      this.setupEventListeners();

      // Update initial values
  this.updateHUD();
      this.loadWordOfDay();

      // Apply menu covers once SITE_CONTENT is loaded
      this.applyMenuCovers && this.applyMenuCovers();

      // Warm up caches and queues
      (async () => {
        await Prefetch.ensureQuestions("vocab", 6);
        await Prefetch.ensureQuestions("kanji", 6);
      })();
    },

    setupEventListeners() {
      // Difficulty slider
      this.elements.difficultySlider.addEventListener("input", (e) => {
        State.difficulty = parseInt(e.target.value);
        State.wodCache = null;
        State.questionQueue = [];
        this.updateDifficultyDisplay();
        this.loadWordOfDay();
        try {
          window.SFX && window.SFX.play("ui.move");
        } catch {}
      });

      // Typing input
      if (this.elements.typingInput) {
        this.elements.typingInput.addEventListener("input", (e) => {
          if (State.currentGame === "typing" && State.currentQuestion) {
            Game.checkTypingInput(e.target.value);
          }
        });
      }

      // Direction selects
      const vocabSel = document.getElementById("vocabDirection");
      const kanjiSel = document.getElementById("kanjiDirection");
      if (vocabSel)
        vocabSel.addEventListener("change", (e) => {
          State.vocabDirection = e.target.value;
        });
      if (kanjiSel)
        kanjiSel.addEventListener("change", (e) => {
          State.kanjiDirection = e.target.value;
        });

      // Keyboard shortcuts for answer buttons
      document.addEventListener("keydown", (e) => {
        if (State.isPlaying && State.currentGame !== "typing") {
          const key = e.key.toLowerCase();
          if (["q", "w", "e", "r"].includes(key)) {
            const buttons =
              this.elements.answerGrid.querySelectorAll(".answer-btn");
            const index = ["q", "w", "e", "r"].indexOf(key);
            if (buttons[index] && !buttons[index].disabled) {
              try {
                window.SFX && window.SFX.play("ui.move");
              } catch {}
              buttons[index].click();
            }
          }
        }
      });
    },

    updateDifficultyDisplay() {
      const labels = [
        "Beginner",
        "Easy",
        "Standard",
        "Hard",
        "Expert",
        "Master",
        "Extreme",
        "Chaos",
        "Impossible",
      ];
      this.elements.diffValue.textContent = State.difficulty;
      this.elements.diffLabel.textContent =
        labels[State.difficulty - 1] || "Unknown";
    },

    updateHUD() {
      // Prefer global Progression/HUD when available
      try {
        const lvl = window.Progression?.getProgress
          ? window.Progression.getProgress().level
          : State.userLevel;
        this.elements.userLevel.textContent = lvl;
      } catch (_) {
        this.elements.userLevel.textContent = State.userLevel;
      }

      const gHUD = (typeof window !== "undefined" && window.HUD) || null;
      const voltage = gHUD ? gHUD.voltage : State.voltage;
      const combo = gHUD ? gHUD.combo : State.combo;
      const score = gHUD ? gHUD.score : State.score;
      const livesCount = gHUD ? gHUD.lives : State.lives;

      this.elements.voltageBar.style.width = Math.min(100, voltage) + "%";
      this.elements.comboCount.textContent = combo;
      this.elements.scoreValue.textContent = (score || 0).toLocaleString();

      // Update lives
      const lives = this.elements.livesContainer.querySelectorAll(".life");
      lives.forEach((life, index) => {
        if (index < livesCount) life.classList.add("active");
        else life.classList.remove("active");
      });

      // Update timer
      const minutes = Math.floor(State.songTimer / 60);
      const seconds = State.songTimer % 60;
      this.elements.songTimer.textContent = `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;

      // Update quest progress (local tracking) if labels exist in DOM
      if (this.elements.questScore)
        this.elements.questScore.textContent = `${Math.min(
          State.questProgress.score,
          10000
        )}/10000`;
      if (this.elements.questCool)
        this.elements.questCool.textContent = `${Math.min(
          State.questProgress.coolHits,
          20
        )}/20`;
      if (this.elements.questCombo)
        this.elements.questCombo.textContent = `${Math.min(
          State.questProgress.maxCombo,
          15
        )}/15`;
    },

    showJudgment(type) {
      const display = this.elements.judgmentDisplay;
      display.textContent = type;
      display.className = `judgment-display show ${type.toLowerCase()}`;

      setTimeout(() => {
        display.classList.remove("show");
      }, 500);
    },

    async loadWordOfDay() {
      const content = this.elements.wodContent;
      content.innerHTML = '<div class="loading"></div>';

      if (!State.wodCache) {
        State.wodCache = await API.fetchWordOfDay(State.difficulty);
      }
      window.WOD = State.wodCache;

      if (State.wodCache) {
        content.innerHTML = `
          <div class="wod-word">${State.wodCache.word || ""}</div>
          <div class="wod-reading">${State.wodCache.reading || ""}</div>
          <div class="wod-meaning">${State.wodCache.meaning || ""}</div>
        `;
      } else {
        content.innerHTML = '<div class="wod-error">Could not load word</div>';
      }
    },

    async nextWordOfDay() {
      State.wodCache = null;
      await this.loadWordOfDay();
    },

    showQuestion(question) {
      const content = this.elements.questionContent;
      const grid = this.elements.answerGrid;

      if (question.type === "vocab") {
        if (State.vocabDirection === "jp-en") {
          content.innerHTML = `
            <div class="question-jp">${question.prompt.jp}</div>
            <div class="question-sub">${question.reading || ""}</div>
          `;
        } else {
          content.innerHTML = `
            <div class="question-sub">English:</div>
            <div class="question-jp">${question.prompt.en || ""}</div>
          `;
        }

        grid.innerHTML = "";
        question.options.forEach((option, index) => {
          const btn = document.createElement("button");
          btn.className = "answer-btn";
          btn.setAttribute(
            "data-ps",
            ["triangle", "circle", "cross", "square"][index]
          );
          btn.innerHTML = `
            <span class="ps-symbol">${["△", "○", "×", "□"][index]}</span>
            ${option}
          `;
          btn.addEventListener("click", () => {
            try {
              window.SFX && window.SFX.play("ui.select");
            } catch {}
            try {
              window.SFX && window.SFX.play("quiz.ok");
            } catch {}
            Game.checkAnswer(option);
          });
          grid.appendChild(btn);
        });
      } else if (question.type === "kanji") {
        if (State.kanjiDirection === "meaning-kanji") {
          content.innerHTML = `
            <div class="question-sub">Meaning:</div>
            <div class="question-jp">${question.prompt}</div>
          `;
        } else {
          content.innerHTML = `
            <div class="question-sub">Kanji:</div>
            <div class="question-jp" style="font-size:60px;">${question.prompt}</div>
          `;
        }

        grid.innerHTML = "";
        question.options.forEach((option, index) => {
          const btn = document.createElement("button");
          btn.className = "answer-btn";
          btn.setAttribute(
            "data-ps",
            ["triangle", "circle", "cross", "square"][index]
          );
          btn.innerHTML = `
            <span class="ps-symbol">${["△", "○", "×", "□"][index]}</span>
            ${option}
          `;
          btn.addEventListener("click", () => Game.checkAnswer(option));
          grid.appendChild(btn);
        });
      }

      // Spawn a timing note aligned to the correct option
      const correctIdx = question.options.indexOf(question.correct);
      const duration = getNoteDuration();
      State.noteDurationMs = duration;
      State.hitTime = Date.now() + duration;
      if (correctIdx >= 0) Effects.spawnFallingNote(correctIdx, duration);
    },

    startTypingQuestion(question) {
      // Show JP surface; provide romaji hint
      this.elements.typingTarget.textContent = question.jp || question.word;
      this.elements.typingInput.value = "";
      if (question.romaji) {
        this.elements.typingFeedback.textContent = `Hint: ${question.romaji}`;
      } else {
        this.elements.typingFeedback.textContent = "";
      }
      this.elements.typingInput.focus();
    },

    showSongOverModal() {
      const modal = this.elements.songOverModal;

      // Calculate rank
      const total =
        State.judgmentCounts.COOL +
        State.judgmentCounts.GREAT +
        State.judgmentCounts.FINE +
        State.judgmentCounts.MISS;
      const accuracy =
        total > 0
          ? (State.judgmentCounts.COOL + State.judgmentCounts.GREAT) / total
          : 0;

      let rank = "D";
      if (accuracy >= 0.97) rank = "S";
      else if (accuracy >= 0.9) rank = "A";
      else if (accuracy >= 0.8) rank = "B";
      else if (accuracy >= 0.7) rank = "C";

      // Calculate rewards
      const baseReward = 1000;
      const scoreBonus = Math.floor(State.score / 1000);
      const levelBonus = State.userLevel * 100;
      const totalReward = baseReward + scoreBonus + levelBonus;

      // Update modal content
      document.getElementById("rankDisplay").textContent = rank;
      document.getElementById("coolCount").textContent =
        State.judgmentCounts.COOL;
      document.getElementById("greatCount").textContent =
        State.judgmentCounts.GREAT;
      document.getElementById("fineCount").textContent =
        State.judgmentCounts.FINE;
      document.getElementById("missCount").textContent =
        State.judgmentCounts.MISS;
      document.getElementById("rewardAmount").textContent =
        totalReward.toLocaleString();
      document.getElementById(
        "rewardBonus"
      ).textContent = `Base (${baseReward}) + Score (${scoreBonus}) + Level (${levelBonus})`;

      modal.classList.add("show");
    },
  };

  // Attach helper to UI to apply menu covers from content.js
  UI.applyMenuCovers = function () {
    try {
      const SRC =
        typeof SITE_CONTENT !== "undefined"
          ? SITE_CONTENT
          : window.SITE_CONTENT || null;
      const covers = SRC?.images?.menuCovers;
      if (!covers) return;
      const vocab = document.querySelector(".mode-btn.vocab-mode");
      const kanji = document.querySelector(".mode-btn.kanji-mode");
      const typing = document.querySelector(".mode-btn.typing-mode");
      const bg = (url) =>
        `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('${url}') center/cover no-repeat`;

      if (vocab && covers.vocab) vocab.style.background = bg(covers.vocab);
      if (kanji && covers.kanji) kanji.style.background = bg(covers.kanji);
      if (typing && covers.kotoba) typing.style.background = bg(covers.kotoba);
    } catch {}
  };

  // ===== Effects System =====
  const Effects = {
    createRingEffect(x, y, color) {
      const ring = document.createElement("div");
      ring.className = "ring-effect";
      ring.style.left = x + "px";
      ring.style.top = y + "px";
      ring.style.borderColor = color;

      UI.elements.effectsLayer.appendChild(ring);

      setTimeout(() => ring.remove(), 500);
    },

    createBurstParticles(x, y, color) {
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement("div");
        particle.className = "burst-particle";
        particle.style.left = x + "px";
        particle.style.top = y + "px";
        particle.style.background = color;
        particle.style.setProperty("--tx", (Math.random() - 0.5) * 100 + "px");
        particle.style.setProperty("--ty", (Math.random() - 0.5) * 100 + "px");

        UI.elements.effectsLayer.appendChild(particle);

        setTimeout(() => particle.remove(), 800);
      }
    },

    spawnFallingNote(laneIndex, durationMs = 2000) {
      const lanes = UI.elements.rhythmLanes.querySelectorAll(".lane");
      if (!lanes[laneIndex]) return;

      const lane = lanes[laneIndex];
      const note = document.createElement("div");
      const types = ["triangle", "circle", "cross", "square"];
      const symbols = ["△", "○", "×", "□"];

      note.className = `falling-note ${types[laneIndex]}`;
      note.textContent = symbols[laneIndex];
      note.style.left = "10px";
      note.style.animationDuration = `${durationMs}ms`;

      lane.appendChild(note);

      setTimeout(() => note.remove(), durationMs + 100);
    },
  };

  // ===== Game Logic =====
  const Game = {
    songInterval: null,
    questionInterval: null,
    noteInterval: null,

    async start(gameType) {
      // Reset state
      State.currentGame = gameType;
      State.isPlaying = true;
      State.songTimer = 180;
      State.questionTimer = getQuestionTime();
      State.score = 0;
      State.combo = 0;
      State.maxCombo = 0;
      State.lives = 5;
      State.voltage = 0;
      State.judgmentCounts = { COOL: 0, GREAT: 0, FINE: 0, MISS: 0 };
      State.questionQueue = [];

      // Play start sound
      SFX.play("start");

      // Show game area
      UI.elements.menuPanel.style.display = "none";
      UI.elements.gameArea.style.display = "block";

      // Integrate with global HUD (Session opt-in only)
      try {
        if (window.attachDivaHud) window.attachDivaHud("languageDojoCard");
        // If site opts in, dispatch a global event so Session starts in hud.js
        if (window.DivaSessionOptIn) {
          const evtName =
            gameType === "vocab"
              ? "vocab-start"
              : gameType === "kanji"
              ? "kanji-start"
              : "kotoba-start"; // typing → kotoba-start
          document.dispatchEvent(new Event(evtName));
        }
        if (window.HUD) {
          window.HUD.lives = 5;
          window.HUD.score = 0;
          window.HUD.voltage = 0;
          window.HUD.combo = 0;
        }
      } catch {}

      // Setup game-specific UI
      if (gameType === "typing") {
        UI.elements.answerGrid.style.display = "none";
        UI.elements.typingArea.style.display = "block";
        UI.elements.rhythmLanes.style.display = "none";
      } else {
        UI.elements.answerGrid.style.display = "grid";
        UI.elements.typingArea.style.display = "none";
        UI.elements.rhythmLanes.style.display = "flex";

        // Start note spawning
        this.noteInterval = setInterval(() => {
          Effects.spawnFallingNote(
            Math.floor(Math.random() * 4),
            getNoteDuration()
          );
        }, Math.max(400, 900 - State.difficulty * 60));
      }

      // Prefetch questions
      await Prefetch.ensureQuestions(gameType, 15);

      // Start timers
      this.songInterval = setInterval(() => this.updateSongTimer(), 1000);

      // Load first question
      this.nextQuestion();
    },

    updateSongTimer() {
      State.songTimer--;
      UI.updateHUD();

      if (State.songTimer <= 0) {
        this.endSong();
      }
    },

    updateQuestionTimer() {
      State.questionTimer--;

      const percent = (State.questionTimer / getQuestionTime()) * 100;
      UI.elements.questionTimerBar.style.width = percent + "%";
      UI.elements.questionTimerText.textContent = State.questionTimer;

      if (State.questionTimer <= 0) {
        this.timeUp();
      }
    },

    async nextQuestion() {
      // Ensure we have questions
      await Prefetch.ensureQuestions(State.currentGame, 5);

      if (State.questionQueue.length === 0) {
        console.error("No questions available");
        return;
      }

      State.currentQuestion = State.questionQueue.shift();
      State.questionTimer = getQuestionTime();

      // Clear previous timer
      if (this.questionInterval) {
        clearInterval(this.questionInterval);
      }

      // Start new timer
      this.questionInterval = setInterval(
        () => this.updateQuestionTimer(),
        1000
      );

      // Show question
      if (State.currentGame === "typing") {
        State.currentQuestion.startTime = Date.now();
        UI.startTypingQuestion(State.currentQuestion);
        try {
          window.SFX && window.SFX.play("ui.teleport");
        } catch {}
      } else {
        UI.showQuestion(State.currentQuestion);
        try {
          window.SFX && window.SFX.play("ui.change");
        } catch {}
      }
    },

    checkAnswer(answer) {
      if (!State.currentQuestion) return;

      clearInterval(this.questionInterval);

      const correct = answer === State.currentQuestion.correct;
      // Calculate judgment based on timing windows relative to hitTime
      let judgment = "MISS";
      if (correct) {
        const windows = getTimingWindows();
        const delta = Math.abs(Date.now() - (State.hitTime || Date.now()));
        if (delta <= windows.cool) judgment = "COOL";
        else if (delta <= windows.great) judgment = "GREAT";
        else judgment = "FINE";
      }

  this.processJudgment(judgment, correct);

      // Disable buttons and show feedback
      const buttons = UI.elements.answerGrid.querySelectorAll(".answer-btn");
      buttons.forEach((btn) => {
        if (btn.disabled) {
          try {
            window.SFX && window.SFX.play("ui.unavailable");
          } catch {}
        }
        btn.disabled = true;
        if (btn.textContent.includes(answer)) {
          btn.classList.add(correct ? "correct" : "incorrect");
        }
      });

      // Next question after delay
      setTimeout(() => {
        if (State.isPlaying) {
          this.nextQuestion();
        }
      }, 1500);
    },

    checkTypingInput(input) {
      if (!State.currentQuestion) return;

      const targetKana = Kana.normalize(
        Kana.kataToHira(State.currentQuestion.reading)
      );
      const targetRoma = Kana.normalize(State.currentQuestion.romaji || "");
      const typed = Kana.normalize(Kana.kataToHira(input));

      if (typed === targetKana || typed === targetRoma) {
        clearInterval(this.questionInterval);
        const windows = getTimingWindows();
        const delta = Math.abs(Date.now() - (State.hitTime || Date.now()));
        let judgment = "FINE";
        if (delta <= windows.cool) judgment = "COOL";
        else if (delta <= windows.great) judgment = "GREAT";

        try {
          window.SFX && window.SFX.play("result.perfect");
        } catch {}
        this.processJudgment(judgment, true);
        UI.elements.typingFeedback.textContent = "Correct!";
        UI.elements.typingFeedback.className = "typing-feedback correct";

        setTimeout(() => {
          if (State.isPlaying) {
            this.nextQuestion();
          }
        }, 1000);
      } else if (targetKana.startsWith(typed) || targetRoma.startsWith(typed)) {
        try {
          window.SFX && window.SFX.play("ui.move");
        } catch {}
        UI.elements.typingFeedback.textContent = "";
      } else {
        try {
          window.SFX && window.SFX.play("quiz.bad");
        } catch {}
        UI.elements.typingFeedback.textContent = "Keep trying...";
        UI.elements.typingFeedback.className = "typing-feedback";
      }
    },

    processJudgment(judgment, correct) {
      State.judgmentCounts[judgment]++;

      // Update score and combo
      if (correct) {
        const baseScore = { COOL: 1000, GREAT: 500, FINE: 200 }[judgment] || 0;
        const comboBonus = Math.floor(State.combo * 0.1);
        const difficultyBonus = State.difficulty * 50;
        let totalScore = baseScore + comboBonus + difficultyBonus;
        // Apply global multipliers if present
        try {
          const m1 = window.diffParams ? window.diffParams().mult : 1;
          const m2 = window.getSingerScoreMult ? window.getSingerScoreMult() : 1;
          const m3 = window.getRhythmMult ? window.getRhythmMult() : 1;
          totalScore = Math.round(totalScore * m1 * m2 * m3);
        } catch {}

        State.score += totalScore;
        State.combo++;
        State.maxCombo = Math.max(State.maxCombo, State.combo);

        // Update voltage
        const vDelta = { COOL: 15, GREAT: 10, FINE: 5 }[judgment] || 0;
        State.voltage = Math.min(100, State.voltage + vDelta);

        // Update quest progress
        State.questProgress.score = Math.max(
          State.questProgress.score,
          State.score
        );
        if (judgment === "COOL") State.questProgress.coolHits++;
        State.questProgress.maxCombo = Math.max(
          State.questProgress.maxCombo,
          State.combo
        );

        // Quests: count answers-right
        try {
          window.Quests && window.Quests.inc && window.Quests.inc("answers-right", 1);
        } catch {}

        // Play sound
        SFX.play(judgment === "COOL" ? "perfect" : "great");
        try {
          if (judgment === "COOL")
            window.SFX && window.SFX.play("result.perfect");
          else if (judgment === "GREAT")
            window.SFX && window.SFX.play("result.great");
          else window.SFX && window.SFX.play("result.standard");
        } catch {}

        // Create effects
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const colors = { COOL: "#35a7ff", GREAT: "#00c853", FINE: "#ffb300" };
        Effects.createRingEffect(centerX, centerY, colors[judgment]);
        Effects.createBurstParticles(centerX, centerY, colors[judgment]);

        // Global HUD sync
        try {
          if (window.HUD) {
            window.HUD.score = (window.HUD.score || 0) + totalScore;
            window.HUD.counts = window.HUD.counts || {
              COOL: 0,
              GREAT: 0,
              FINE: 0,
              SAD: 0,
            };
            if (judgment === "COOL") window.HUD.counts.COOL++;
            else if (judgment === "GREAT") window.HUD.counts.GREAT++;
            else if (judgment === "FINE") window.HUD.counts.FINE++;
          }
          if (window.flashJudge) window.flashJudge("languageDojoCard", judgment);
          if (window.addVoltage) window.addVoltage(vDelta, "languageDojoCard");
          if (window.addCombo) window.addCombo("languageDojoCard");
          if (judgment === "COOL" && window.party) window.party("languageDojoCard");
        } catch {}
      } else {
        State.combo = 0;
        // Global miss → lose life
        try {
          if (window.resetCombo) window.resetCombo();
          if (window.loseLife) window.loseLife("languageDojoCard");
          const livesNow = window.HUD?.lives;
          if (typeof livesNow === "number") State.lives = livesNow;
          else State.lives--;
        } catch {
          State.lives--;
        }
        SFX.play("miss");
        try {
          window.SFX && window.SFX.play("result.miss");
        } catch {}

        // Check game over
        if (State.lives <= 0) {
          this.endSong();
          return;
        }
      }

      UI.showJudgment(judgment);
      UI.updateHUD();
    },

    timeUp() {
      SFX.play("timeup");
      try {
        window.SFX && window.SFX.play("quiz.timeup");
      } catch {}
      this.processJudgment("MISS", false);

      setTimeout(() => {
        if (State.isPlaying) {
          this.nextQuestion();
        }
      }, 1000);
    },

    endSong() {
      State.isPlaying = false;

      // Clear intervals
      if (this.songInterval) clearInterval(this.songInterval);
      if (this.questionInterval) clearInterval(this.questionInterval);
      if (this.noteInterval) clearInterval(this.noteInterval);

      // Compute rewards similar to modal
      const totalHits =
        State.judgmentCounts.COOL +
        State.judgmentCounts.GREAT +
        State.judgmentCounts.FINE +
        State.judgmentCounts.MISS;
      const acc = totalHits
        ? (State.judgmentCounts.COOL + State.judgmentCounts.GREAT) / totalHits
        : 0;
      let rank = "D";
      if (acc >= 0.97) rank = "S";
      else if (acc >= 0.9) rank = "A";
      else if (acc >= 0.8) rank = "B";
      else if (acc >= 0.7) rank = "C";

      const baseReward = 1000;
      const scoreBonus = Math.floor(State.score / 1000);
      const levelBonus = (window.Progression?.getProgress?.().level || 1) * 100;
      const totalReward = baseReward + scoreBonus + levelBonus;

      // Award hearts + XP via global systems (avoid double if already out of lives)
      try {
        const livesLeft = window.HUD?.lives;
        if (!(typeof livesLeft === "number" && livesLeft <= 0)) {
          if (window.awardHearts) window.awardHearts(totalReward);
        }
      } catch {}
      try {
        const scoreXp = Math.max(0, Math.floor(State.score / 120));
        if (window.addXP) window.addXP(50 + scoreXp);
      } catch {}

      // Show results
      UI.showSongOverModal();
    },

    backToMenu() {
      State.isPlaying = false;

      // Clear intervals
      if (this.songInterval) clearInterval(this.songInterval);
      if (this.questionInterval) clearInterval(this.questionInterval);
      if (this.noteInterval) clearInterval(this.noteInterval);

      // Hide modal and game area
      UI.elements.songOverModal.classList.remove("show");
      UI.elements.gameArea.style.display = "none";
      UI.elements.menuPanel.style.display = "block";

      // Reset lives
      State.lives = 5;
      UI.updateHUD();
    },
  };

  // ===== Difficulty & Timing Helpers =====
  function getQuestionTime() {
    // 20s at diff1 down to ~11s at diff9
    return Math.max(7, Math.min(20, 20 - State.difficulty));
  }
  function getNoteDuration() {
    // ms: slower on easy, faster on hard
    const dur = 2800 - State.difficulty * 180;
    return Math.max(1100, Math.min(3000, dur));
  }
  function getTimingWindows() {
    // Base windows around hit time; shrink with difficulty
    const diff = State.difficulty;
    const scale = 1 - (diff - 3) * 0.08; // ~8% per step away from 3
    const clamp = (v) => Math.max(60, v);
    return {
      cool: clamp(Math.round(120 * scale)),
      great: clamp(Math.round(250 * scale)),
      fine: clamp(Math.round(500 * scale)),
    };
  }

  // ===== Global Functions =====
  window.startGame = function (gameType) {
    SFX.play("click");
    try {
      window.SFX && window.SFX.play("ui.select");
    } catch {}
    Game.start(gameType);
  };

  window.nextWordOfDay = function () {
    SFX.play("click");
    try {
      window.SFX && window.SFX.play("ui.change");
    } catch {}
    UI.nextWordOfDay();
  };

  window.backToMenu = function () {
    SFX.play("click");
    try {
      window.SFX && window.SFX.play("ui.back");
    } catch {}
    Game.backToMenu();
  };

  // ===== Initialization =====
  document.addEventListener("DOMContentLoaded", () => {
    UI.init();
    if (UI.applyMenuCovers) UI.applyMenuCovers();
    console.log("Language Dojo × Project DIVA initialized!");
  });
})();
