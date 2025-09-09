// Language Dojo × Project DIVA — Simplified OOP Refactor
// Queue-front judging, tighter COOL, GOOD→GREAT, cleaner flow, fewer guards
// Score+rewards fix, typing mode UX rules, constants centralized

(function () {
  // ===== Constants / Config =====
  const CONFIG = Object.freeze({
    timers: { SONG_S: 60, QUESTION_S: 10, TYPING_HINT_AFTER_BAD_S: 0 },
    notes: {
      BASE_FALL_MS: 2800,
      PER_DIFF_MS: 180,
      MIN_FALL_MS: 1100,
      MAX_FALL_MS: 3000,
      SPAWN_BASE_MS: 900,
      SPAWN_DIFF_STEP_MS: 60,
      SPAWN_MIN_MS: 400,
    },
    judge: {
      COOL_PX: 12, // harder to hit COOL
      GREAT_PX: 50, // expanded radius for GREAT
    },
    typingWindowsMs: { COOL: 100, GREAT: 200, FINE: 300 },
    scoringPerHit: { COOL: 1000, GREAT: 600, FINE: 250 },
    voltagePerHit: { COOL: 15, GREAT: 10, FINE: 5 },
    rewards: { BASE: 100, LEVEL_MULT: 10 }, // Final: 100 + SCORE + LEVEL*10
  });

  const PS_SYMBOLS = ["△", "○", "×", "□"]; // lane order
  const LANE_TYPES = ["triangle", "circle", "cross", "square"];

  // ===== Utilities =====
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  // ===== Core State =====
  class GameState {
    constructor() {
      this.resetAll();
    }
    resetAll() {
      this.currentGame = null;
      this.isPlaying = false;
      this.songTimer = CONFIG.timers.SONG_S;
      this.questionTimer = CONFIG.timers.QUESTION_S;
      this.score = 0;
      this.combo = 0;
      this.maxCombo = 0;
      this.lives = 5;
      this.voltage = 0;
      this.userLevel = 1;
      this.difficulty = 3;
      this.judgmentCounts = { COOL: 0, GREAT: 0, FINE: 0, MISS: 0 };
      this.questProgress = { score: 0, coolHits: 0, maxCombo: 0 };
      this.questionQueue = [];
      this.currentQuestion = null;
      this.vocabDirection = "jp-en";
      this.kanjiDirection = "meaning-kanji";
      this.noteQueues = [[], [], [], []];
      this.typingMaxTier = "COOL"; // caps typing judgment after errors
    }
    resetRuntime() {
      this.isPlaying = true;
      this.songTimer = CONFIG.timers.SONG_S;
      this.questionTimer = CONFIG.timers.QUESTION_S;
      this.score = 0;
      this.combo = 0;
      this.maxCombo = 0;
      this.lives = 5;
      this.voltage = 0;
      this.judgmentCounts = { COOL: 0, GREAT: 0, FINE: 0, MISS: 0 };
      this.questionQueue = [];
      this.noteQueues = [[], [], [], []];
      this.typingMaxTier = "COOL";
    }
  }
  const State = new GameState();

  // ===== Data / API =====
  class ApiService {
    static async fetchWordOfDay(diff = 1) {
      await (window.JLPT_READY || Promise.resolve());
      const pack = window.JLPT?.vocab?.[diff] || [];
      if (!Array.isArray(pack) || !pack.length) return null;
      const pick = pack[Math.floor(Math.random() * pack.length)];
      return {
        word: pick.word || pick.reading,
        reading: pick.reading || "",
        meaning: pick.meaning || "",
      };
    }
  }

  // ===== Kana/Romaji =====
  class KanaUtils {
    constructor() {
      this.hiraToRomaMap = new Map([
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
    }
    kataToHira(str) {
      return (str || "").replace(/[ァ-ン]/g, (ch) =>
        String.fromCharCode(ch.charCodeAt(0) - 0x60)
      );
    }
    toRomaji(kana) {
      if (!kana) return "";
      kana = this.kataToHira(kana);
      let out = "";
      for (let i = 0; i < kana.length; ) {
        const two = kana.slice(i, i + 2),
          one = kana[i];
        if (this.hiraToRomaMap.has(two)) {
          out += this.hiraToRomaMap.get(two);
          i += 2;
          continue;
        }
        if (one === "っ") {
          const nextRoma =
            this.hiraToRomaMap.get(kana.slice(i + 1, i + 3)) ||
            this.hiraToRomaMap.get(kana[i + 1]) ||
            "";
          if (nextRoma) out += nextRoma[0];
          i += 1;
          continue;
        }
        out += this.hiraToRomaMap.get(one) || one;
        i += 1;
      }
      return out;
    }
    normalize(input) {
      return (input || "").toLowerCase().replace(/\s+/g, "");
    }
  }
  const Kana = new KanaUtils();

  // ===== Question Factory =====
  class QuestionGenerator {
    static async vocab() {
      await (window.JLPT_READY || Promise.resolve());
      const pool = window.JLPT?.vocab?.[State.difficulty] || [];
      if (!pool.length) return null;
      const entry = pool[Math.floor(Math.random() * pool.length)];
      const jp = entry.word || entry.reading;
      const reading = entry.reading || "";
      const en = entry.meaning || "";
      if (State.vocabDirection === "jp-en") {
        const opts = new Set([en]);
        while (opts.size < 4 && pool.length > 3) {
          const d = pool[Math.floor(Math.random() * pool.length)]?.meaning;
          if (d && d !== en) opts.add(d);
        }
        const options = [...opts].sort(() => Math.random() - 0.5);
        return {
          type: "vocab",
          prompt: { jp, reading },
          correct: en,
          options,
          reading,
        };
      } else {
        const opts = new Set([jp]);
        while (opts.size < 4 && pool.length > 3) {
          const d = pool[Math.floor(Math.random() * pool.length)];
          const s = d?.word || d?.reading;
          if (s && s !== jp) opts.add(s);
        }
        const options = [...opts].sort(() => Math.random() - 0.5);
        return { type: "vocab", prompt: { en }, correct: jp, options, reading };
      }
    }
    static async kanji() {
      await (window.JLPT_READY || Promise.resolve());
      const pool = window.JLPT?.kanji?.[State.difficulty] || [];
      if (!pool.length) return null;
      const entry = pool[Math.floor(Math.random() * pool.length)];
      const kanji = entry.kanji;
      const meaning = entry.meaning;
      if (State.kanjiDirection === "meaning-kanji") {
        const opts = new Set([kanji]);
        while (opts.size < 4 && pool.length > 3) {
          const d = pool[Math.floor(Math.random() * pool.length)]?.kanji;
          if (d && d !== kanji) opts.add(d);
        }
        const options = [...opts].sort(() => Math.random() - 0.5);
        return { type: "kanji", prompt: meaning, correct: kanji, options };
      } else {
        const opts = new Set([meaning]);
        while (opts.size < 4 && pool.length > 3) {
          const d = pool[Math.floor(Math.random() * pool.length)]?.meaning;
          if (d && d !== meaning) opts.add(d);
        }
        const options = [...opts].sort(() => Math.random() - 0.5);
        return { type: "kanji", prompt: kanji, correct: meaning, options };
      }
    }
    static async typing() {
      await (window.JLPT_READY || Promise.resolve());
      const pool = window.JLPT?.vocab?.[State.difficulty] || [];
      const entry = pool.length
        ? pool[Math.floor(Math.random() * pool.length)]
        : { word: "fallback", reading: "fallback", meaning: "fallback" };
      const jp = entry.word || entry.reading;
      const reading = entry.reading || "";
      const meaning = entry.meaning || "";
      const romaji = entry.romaji || Kana.toRomaji(reading);
      return {
        type: "typing",
        jp,
        reading,
        romaji,
        meaning,
        typed: "",
        startTime: null,
      };
    }
  }

  // ===== UI =====
  class UIManager {
    constructor() {
      this.elements = {};
    }
    init() {
      this.elements = {
        menuPanel: byId("menuPanel"),
        gameArea: byId("gameArea"),
        userLevel: byId("userLevel"),
        voltageBar: byId("voltageBar"),
        comboCount: byId("comboCount"),
        scoreValue: byId("scoreValue"),
        songTimer: byId("songTimer"),
        livesContainer: byId("livesContainer"),
        judgmentDisplay: byId("judgmentDisplay"),
        questionContent: byId("questionContent"),
        answerGrid: byId("answerGrid"),
        typingArea: byId("typingArea"),
        typingTarget: byId("typingTarget"),
        typingInput: byId("typingInput"),
        typingFeedback: byId("typingFeedback"),
        questionTimerBar: byId("questionTimerBar"),
        questionTimerText: byId("questionTimerText"),
        rhythmLanes: byId("rhythmLanes"),
        songOverModal: byId("songOverModal"),
        effectsLayer: byId("effectsLayer"),
        difficultySlider: byId("difficultySlider"),
        diffValue: byId("diffValue"),
        diffLabel: byId("diffLabel"),
        wodContent: byId("wodContent"),
        wodNext: byId("wodNext"),
        questScore: byId("questScore"),
        questCool: byId("questCool"),
        questCombo: byId("questCombo"),
        rankDisplay: byId("rankDisplay"),
        coolCount: byId("coolCount"),
        greatCount: byId("greatCount"),
        fineCount: byId("fineCount"),
        missCount: byId("missCount"),
        rewardAmount: byId("rewardAmount"),
        rewardBonus: byId("rewardBonus"),
      };
      this.setupEvents();
      // Load diff from localStorage
      const savedDiff = parseInt(
        localStorage.getItem("dojoDifficulty") || "",
        10
      );
      if (!Number.isNaN(savedDiff) && savedDiff >= 1 && savedDiff <= 9)
        State.difficulty = savedDiff;
      if (this.elements.difficultySlider)
        this.elements.difficultySlider.value = String(State.difficulty);
      this.updateDifficultyDisplay();
      this.updateHUD();
      this.loadWordOfDay();
      this.applyMenuCovers?.();
    }
    setupEvents() {
      this.elements.difficultySlider?.addEventListener("input", (e) => {
        State.difficulty = parseInt(e.target.value, 10);
        State.questionQueue = [];
        localStorage.setItem("dojoDifficulty", String(State.difficulty));
        this.updateDifficultyDisplay();
        this.loadWordOfDay();
        window.SFX?.play?.("ui.move");
      });
      this.elements.typingInput?.addEventListener("input", (e) => {
        if (State.currentGame === "typing" && State.currentQuestion)
          Game.checkTypingInput(e.target.value);
      });
      const vocabSel = byId("vocabDirection");
      const kanjiSel = byId("kanjiDirection");
      vocabSel?.addEventListener("change", (e) => {
        State.vocabDirection = e.target.value;
      });
      kanjiSel?.addEventListener("change", (e) => {
        State.kanjiDirection = e.target.value;
      });
      document.addEventListener("keydown", (e) => {
        if (!(State.isPlaying && State.currentGame !== "typing")) return;
        const key = e.key.toLowerCase();
        const idx = ["q", "w", "e", "r"].indexOf(key);
        if (idx !== -1)
          this.elements.answerGrid
            ?.querySelectorAll(".answer-btn")
            [idx]?.click();
      });
    }
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
    }
    updateHUD() {
      const lvl = window.Progression?.getProgress?.().level ?? State.userLevel;
      this.elements.userLevel.textContent = lvl;
      this.elements.voltageBar.style.width = `${clamp(State.voltage, 0, 100)}%`;
      this.elements.comboCount.textContent = State.combo;
      this.elements.scoreValue.textContent = (
        State.score || 0
      ).toLocaleString();
      // Lives
      this.elements.livesContainer
        ?.querySelectorAll(".life")
        .forEach((life, i) => {
          life.classList.toggle("active", i < State.lives);
        });
      // Timer
      const m = Math.floor(State.songTimer / 60),
        s = String(State.songTimer % 60).padStart(2, "0");
      this.elements.songTimer.textContent = `${m}:${s}`;
      // Quest display (local only)
      this.elements.questScore &&
        (this.elements.questScore.textContent = `${Math.min(
          State.questProgress.score,
          10000
        )}/10000`);
      this.elements.questCool &&
        (this.elements.questCool.textContent = `${Math.min(
          State.questProgress.coolHits,
          20
        )}/20`);
      this.elements.questCombo &&
        (this.elements.questCombo.textContent = `${Math.min(
          State.questProgress.maxCombo,
          15
        )}/15`);
    }
    showJudgment(type) {
      const el = this.elements.judgmentDisplay;
      el.textContent = type;
      el.className = `judgment-display show ${type.toLowerCase()}`;
      setTimeout(() => el.classList.remove("show"), 500);
    }
    async loadWordOfDay() {
      const content = this.elements.wodContent;
      content.innerHTML = '<div class="loading"></div>';
      const wod = await ApiService.fetchWordOfDay(State.difficulty);
      content.innerHTML = wod
        ? `
        <div class="wod-word">${wod.word || ""}</div>
        <div class="wod-reading">${wod.reading || ""}</div>
        <div class="wod-meaning">${wod.meaning || ""}</div>
      `
        : '<div class="wod-error">Could not load word</div>';
    }
    nextWordOfDay() {
      return this.loadWordOfDay();
    }
    showQuestion(q) {
      const content = this.elements.questionContent;
      const grid = this.elements.answerGrid;
      if (!content || !grid) return;
      content.style.display = "block"; // except typing mode
      if (q.type === "vocab") {
        content.innerHTML =
          State.vocabDirection === "jp-en"
            ? `<div class="question-jp">${
                q.prompt.jp
              }</div><div class="question-sub">${q.reading || ""}</div>`
            : `<div class="question-sub">English:</div><div class="question-jp">${
                q.prompt.en || ""
              }</div>`;
        grid.innerHTML = "";
        q.options.forEach((opt, i) =>
          grid.appendChild(this.makeAnswerBtn(opt, i))
        );
      } else if (q.type === "kanji") {
        content.innerHTML =
          State.kanjiDirection === "meaning-kanji"
            ? `<div class="question-sub">Meaning:</div><div class="question-jp">${q.prompt}</div>`
            : `<div class="question-sub">Kanji:</div><div class="question-jp" style="font-size:60px;">${q.prompt}</div>`;
        grid.innerHTML = "";
        q.options.forEach((opt, i) =>
          grid.appendChild(this.makeAnswerBtn(opt, i))
        );
      }
    }
    makeAnswerBtn(option, index) {
      const btn = document.createElement("button");
      btn.className = "answer-btn";
      btn.setAttribute("data-ps", LANE_TYPES[index]);
      btn.innerHTML = `<span class="ps-symbol">${PS_SYMBOLS[index]}</span>${option}`;
      btn.addEventListener("click", () => {
        window.SFX?.play?.("ui.select");
        Game.checkAnswer(option, index);
      });
      return btn;
    }
    startTypingQuestion(q) {
      // Hide MC content entirely for typing mode
      this.elements.questionContent &&
        (this.elements.questionContent.style.display = "none");
      this.elements.answerGrid &&
        (this.elements.answerGrid.style.display = "none");
      // Show hiragana + translation and the surface form
      const surface = q.jp;
      const hira = q.reading;
      const en = q.meaning || "";
      this.elements.typingArea.style.display = "block";
      this.elements.typingTarget.textContent = `${surface} 【${hira}】 — ${en}`; // compact single line
      this.elements.typingInput.value = "";
      this.elements.typingFeedback.textContent = ""; // hint shown only after a wrong keystroke
      this.elements.typingInput.focus();
    }
    showSongOverModal(rank, rewardsDisplay) {
      this.elements.rankDisplay &&
        (this.elements.rankDisplay.textContent = rank);
      this.elements.coolCount &&
        (this.elements.coolCount.textContent = State.judgmentCounts.COOL);
      this.elements.greatCount &&
        (this.elements.greatCount.textContent = State.judgmentCounts.GREAT);
      this.elements.fineCount &&
        (this.elements.fineCount.textContent = State.judgmentCounts.FINE);
      this.elements.missCount &&
        (this.elements.missCount.textContent = State.judgmentCounts.MISS);
      this.elements.rewardAmount &&
        (this.elements.rewardAmount.textContent =
          rewardsDisplay.total.toLocaleString());
      this.elements.rewardBonus &&
        (this.elements.rewardBonus.textContent = `Base (${CONFIG.rewards.BASE}) + Score (${rewardsDisplay.score}) + Level (${rewardsDisplay.level}×${CONFIG.rewards.LEVEL_MULT})`);
      this.elements.songOverModal?.classList.add("show");
    }
    showMainMenu() {
      this.elements.songOverModal?.classList.remove("show");
      this.elements.gameArea.style.display = "none";
      this.elements.menuPanel.style.display = "block";
    }
    applyMenuCovers() {
      const covers = (window.SITE_CONTENT || window.SRC || {})?.images
        ?.menuCovers;
      if (!covers) return;
      const setBg = (el, url) => {
        if (!el || !url) return;
        el.style.background = `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('${url}') center/cover no-repeat`;
      };
      setBg(document.querySelector(".mode-btn.vocab-mode"), covers.vocab);
      setBg(document.querySelector(".mode-btn.kanji-mode"), covers.kanji);
      setBg(document.querySelector(".mode-btn.typing-mode"), covers.kotoba);
    }
  }
  const byId = (id) => document.getElementById(id);
  const UI = new UIManager();

  // ===== Effects =====
  class EffectsManager {
    static ring(x, y, color) {
      const el = document.createElement("div");
      el.className = "ring-effect";
      el.style.left = x + "px";
      el.style.top = y + "px";
      el.style.borderColor = color;
      UI.elements.effectsLayer.appendChild(el);
      setTimeout(() => el.remove(), 500);
    }
    static burst(x, y, color) {
      for (let i = 0; i < 8; i++) {
        const p = document.createElement("div");
        p.className = "burst-particle";
        p.style.left = x + "px";
        p.style.top = y + "px";
        p.style.background = color;
        p.style.setProperty("--tx", (Math.random() - 0.5) * 100 + "px");
        p.style.setProperty("--ty", (Math.random() - 0.5) * 100 + "px");
        UI.elements.effectsLayer.appendChild(p);
        setTimeout(() => p.remove(), 800);
      }
    }
    static spawnNote(laneIndex, durationMs) {
      const lanes = UI.elements.rhythmLanes?.querySelectorAll(".lane");
      const lane = lanes?.[laneIndex];
      if (!lane) return;
      const note = document.createElement("div");
      note.className = `falling-note ${LANE_TYPES[laneIndex]}`;
      note.textContent = PS_SYMBOLS[laneIndex];
      note.style.left = "10px";
      note.style.animationDuration = `${durationMs}ms`;
      const noteData = {
        element: note,
        spawnTime: Date.now(),
        duration: durationMs,
        laneIndex,
      };
      State.noteQueues[laneIndex].push(noteData);
      lane.appendChild(note);
      setTimeout(() => {
        note.remove();
        const idx = State.noteQueues[laneIndex].findIndex(
          (n) => n.element === note
        );
        if (idx !== -1) State.noteQueues[laneIndex].splice(idx, 1);
      }, durationMs + 150);
      return note;
    }
  }
  const Effects = EffectsManager;

  // ===== HUD / Session =====
  class HUDManager {
    constructor() {
      this._maxLives = 5;
      this._notes = 0;
      this.HUD = window.HUD = window.HUD || {};
      this.initialize();
      this.initSession();
    }
    initialize() {
      const def = (key, get, set) => {
        try {
          Object.defineProperty(this.HUD, key, {
            configurable: true,
            enumerable: true,
            get,
            set: set || (() => {}),
          });
        } catch {}
      };
      def(
        "lives",
        () => State.lives,
        (v) => {
          State.lives = v | 0;
          UI.updateHUD();
        }
      );
      def(
        "maxLives",
        () => this._maxLives,
        (v) => {
          this._maxLives = v | 0;
        }
      );
      def(
        "score",
        () => State.score,
        (v) => {
          State.score = v | 0;
          UI.updateHUD();
        }
      );
      def(
        "voltage",
        () => State.voltage,
        (v) => {
          State.voltage = clamp(v | 0, 0, 100);
          UI.updateHUD();
        }
      );
      def(
        "combo",
        () => State.combo,
        (v) => {
          State.combo = v | 0;
          UI.updateHUD();
        }
      );
      def(
        "counts",
        () => State.judgmentCounts,
        (v) => {
          if (v && typeof v === "object") State.judgmentCounts = v;
        }
      );
      def(
        "notes",
        () => this._notes,
        (v) => {
          this._notes = v | 0;
        }
      );
    }
    sfx(label) {
      const map = {
        COOL: "result.perfect",
        GREAT: "result.great",
        FINE: "result.standard",
        MISS: "result.miss",
      };
      const id = map[label];
      id && window.SFX?.play?.(id);
    }
    pulseCard(id = "languageDojoCard") {
      const c = document.getElementById(id);
      if (!c) return;
      c.style.transition = "box-shadow .15s ease, transform .15s ease";
      const pre = c.style.boxShadow;
      c.style.boxShadow = "0 0 0 3px rgba(165,148,249,.65) inset";
      c.style.transform = "translateY(-1px)";
      setTimeout(() => {
        c.style.boxShadow = pre || "";
        c.style.transform = "";
      }, 160);
    }
    flashJudge(cardId, label) {
      const card = document.getElementById(cardId || "languageDojoCard");
      const el = card?.querySelector(".judge-echo");
      if (el) {
        el.textContent = label;
        el.style.opacity = "1";
        el.style.transform = "translateY(0) scale(1)";
        setTimeout(() => {
          el.style.opacity = "0";
          el.style.transform = "translateY(-6px) scale(.96)";
        }, 350);
      }
      this.pulseCard(cardId);
      this.sfx(label);
    }
    addVoltage(delta, cardId) {
      State.voltage = clamp(State.voltage + (delta || 0), 0, 100);
      UI.updateHUD();
      const card = document.getElementById(cardId);
      if (card) {
        card.style.outline = `2px solid rgba(165,148,249,${Math.min(
          0.5,
          0.1 + State.voltage / 80
        )})`;
        setTimeout(() => (card.style.outline = ""), 240);
      }
    }
    addCombo(cardId) {
      State.combo++;
      UI.updateHUD();
      const el = document.getElementById(cardId)?.querySelector(".judge-echo");
      if (el) el.textContent = `COMBO ${State.combo}`;
    }
    resetCombo() {
      State.combo = 0;
      UI.updateHUD();
    }
    loseLife(cardId) {
      if (State.lives <= 0) return;
      State.lives--;
      UI.updateHUD();
      this.flashJudge(cardId, "MISS");
      if (State.lives <= 0) this.Session?.finish?.({ reason: "lives" });
    }
    awardHearts(n) {
      window.Hearts?.add?.(n) || window.hearts?.addHearts?.(n);
    }
    addXP(n) {
      window.Progression?.addXp?.(n) || window.Progression?.addXP?.(n);
    }
    calcRank() {
      const c = State.judgmentCounts;
      const total = c.COOL + c.GREAT + c.FINE + c.MISS;
      const good = c.COOL + c.GREAT;
      const acc = total ? good / total : 0;
      if (acc >= 0.95) return "S";
      if (acc >= 0.85) return "A";
      if (acc >= 0.7) return "B";
      if (acc >= 0.5) return "C";
      return "D";
    }
    rewards() {
      const level =
        window.Progression?.getProgress?.().level || State.userLevel || 1;
      // Fixed formula: Base (100) + Score + Level * 10
      const total =
        CONFIG.rewards.BASE +
        (State.score | 0) +
        level * CONFIG.rewards.LEVEL_MULT;
      return { total, level, score: State.score | 0 };
    }
    initSession() {
      this.Session = window.Session =
        window.Session ||
        (() => {
          let tId = null,
            endsAt = 0;
          const renderTimer = () => {
            const remain = Math.max(
              0,
              Math.floor((endsAt - Date.now()) / 1000)
            );
            const el = byId("hudLevelText");
            if (el) {
              const m = Math.floor(remain / 60),
                s = String(remain % 60).padStart(2, "0");
              el.textContent = `Session ${m}:${s}`;
            }
            if (remain <= 0) finish({ reason: "time" });
          };
          const start = ({ seconds } = {}) => {
            State.resetRuntime();
            const dur = seconds || 180;
            endsAt = Date.now() + dur * 1000;
            clearInterval(tId);
            tId = setInterval(renderTimer, 1000);
            renderTimer();
          };
          const finish = ({ reason } = {}) => {
            clearInterval(tId);
            tId = null;
            const rank = hudManager.calcRank();
            const rewards = hudManager.rewards();
            // Ensure XP & Hearts AFTER completion
            hudManager.awardHearts(rewards.total);
            hudManager.addXP(rewards.total);
            // Toast (best-effort)
            const msg = `Session complete — Rank ${rank}. +${rewards.total.toLocaleString()} hearts & XP!`;
            window.hearts?.lovetoast?.(msg) ||
              (function () {
                const t = document.createElement("div");
                t.style.cssText =
                  "position:fixed;left:50%;top:20px;transform:translateX(-50%);background:#fff;border:2px solid var(--border);border-radius:10px;padding:10px 14px;box-shadow:var(--shadow);z-index:99999;color:#2b2b44;font-weight:700";
                t.textContent = msg;
                document.body.appendChild(t);
                setTimeout(() => t.remove(), 2200);
              })();
          };
          return { start, finish };
        })();
      document.addEventListener("vocab-start", () => this.Session.start());
      document.addEventListener("kanji-start", () => this.Session.start());
      document.addEventListener("kotoba-start", () => this.Session.start());
      document.addEventListener("miku-chat-start", () => this.Session.start());
    }
  }
  const hudManager = new HUDManager();

  // ===== Game Engine =====
  class GameEngine {
    constructor() {
      this.songInterval = null;
      this.questionInterval = null;
      this.noteInterval = null;
    }
    async start(gameType) {
      State.currentGame = gameType;
      State.resetRuntime();
      window.SFX?.play?.("start");
      UI.elements.menuPanel.style.display = "none";
      UI.elements.gameArea.style.display = "block";
      // HUD init/attach
      window.attachDivaHud?.("languageDojoCard");
      if (window.DivaSessionOptIn) {
        const evtName =
          gameType === "vocab"
            ? "vocab-start"
            : gameType === "kanji"
            ? "kanji-start"
            : "kotoba-start";
        document.dispatchEvent(new Event(evtName));
      }
      Object.assign(window.HUD || {}, {
        lives: 5,
        score: 0,
        voltage: 0,
        combo: 0,
      });

      // Mode UI
      if (gameType === "typing") {
        UI.elements.answerGrid.style.display = "none";
        UI.elements.typingArea.style.display = "block";
        UI.elements.rhythmLanes.style.display = "none";
      } else {
        UI.elements.answerGrid.style.display = "grid";
        UI.elements.typingArea.style.display = "none";
        UI.elements.rhythmLanes.style.display = "flex";
        this.noteInterval = setInterval(
          () =>
            Effects.spawnNote(
              Math.floor(Math.random() * 4),
              getNoteDurationMs()
            ),
          Math.max(
            CONFIG.notes.SPAWN_MIN_MS,
            CONFIG.notes.SPAWN_BASE_MS -
              State.difficulty * CONFIG.notes.SPAWN_DIFF_STEP_MS
          )
        );
      }

      this.songInterval = setInterval(() => this.updateSongTimer(), 1000);
      this.nextQuestion();
    }
    updateSongTimer() {
      if (--State.songTimer <= 0) this.endSong();
      UI.updateHUD();
    }
    updateQuestionTimer() {
      if (--State.questionTimer <= 0) {
        this.timeUp();
        return;
      }
      const pct = (State.questionTimer / CONFIG.timers.QUESTION_S) * 100;
      UI.elements.questionTimerBar.style.width = pct + "%";
      UI.elements.questionTimerText.textContent = State.questionTimer;
    }
    async nextQuestion() {
      if (!State.questionQueue.length) {
        const gen =
          State.currentGame === "vocab"
            ? QuestionGenerator.vocab
            : State.currentGame === "kanji"
            ? QuestionGenerator.kanji
            : QuestionGenerator.typing;
        const q = await gen();
        if (q) State.questionQueue.push(q);
      }
      const q = State.questionQueue.shift();
      if (!q) return console.error("No questions available");
      State.currentQuestion = q;
      State.questionTimer = CONFIG.timers.QUESTION_S;
      clearInterval(this.questionInterval);
      this.questionInterval = setInterval(
        () => this.updateQuestionTimer(),
        1000
      );

      if (State.currentGame === "typing") {
        State.typingMaxTier = "COOL";
        q.startTime = Date.now();
        UI.startTypingQuestion(q);
        window.SFX?.play?.("ui.teleport");
      } else {
        UI.showQuestion(q);
        window.SFX?.play?.("ui.change");
      }
    }
    checkAnswer(answer, buttonIndex) {
      if (!State.currentQuestion) return;
      const isCorrect = answer === State.currentQuestion.correct;
      if (!isCorrect) {
        // Wrong answer: MISS, do NOT auto progress, keep buttons enabled
        this.processJudgment("MISS", false);
        return;
      }
      // Correct: judge against front note of lane
      const laneIndex = buttonIndex ?? 0; // default to first lane if missing
      const label = judgeFrontAndMaybeConsume(laneIndex);
      this.processJudgment(label, true);

      // Freeze interactions and go next only on correct
      UI.elements.answerGrid
        ?.querySelectorAll(".answer-btn")
        .forEach((b) => (b.disabled = true));
      setTimeout(() => {
        if (State.isPlaying) this.nextQuestion();
      }, 800);
    }
    checkTypingInput(input) {
      if (!State.currentQuestion) return;
      const q = State.currentQuestion;
      const kanaTarget = Kana.normalize(Kana.kataToHira(q.reading));
      const romajiTarget = Kana.normalize(q.romaji || "");
      const typed = Kana.normalize(Kana.kataToHira(input));

      if (typed === kanaTarget || typed === romajiTarget) {
        clearInterval(this.questionInterval);
        // Time-based windows (still applied), then cap by typingMaxTier
        const delta = Math.abs(Date.now() - (q.startTime || Date.now()));
        let j =
          delta <= CONFIG.typingWindowsMs.COOL
            ? "COOL"
            : delta <= CONFIG.typingWindowsMs.GREAT
            ? "GREAT"
            : "FINE";
        // Cap by max tier set by prior mistakes
        if (State.typingMaxTier === "GREAT" && j === "COOL") j = "GREAT";
        if (State.typingMaxTier === "FINE") j = "FINE";
        this.processJudgment(j, true);
        UI.elements.typingFeedback.textContent = "Correct!";
        UI.elements.typingFeedback.className = "typing-feedback correct";
        setTimeout(() => {
          if (State.isPlaying) this.nextQuestion();
        }, 600);
        return;
      }

      // If still a prefix, do nothing (no sfx, no hint)
      if (kanaTarget.startsWith(typed) || romajiTarget.startsWith(typed)) {
        UI.elements.typingFeedback.textContent = "";
        return;
      }

      // Wrong keystroke: show hint once and degrade rank cap
      if (State.typingMaxTier === "COOL")
        State.typingMaxTier = State.questionTimer > 5 ? "GREAT" : "FINE";
      UI.elements.typingFeedback.textContent = `Hint: ${q.romaji}`; // shown only after a mistake
      UI.elements.typingFeedback.className = "typing-feedback";
      window.SFX?.play?.("quiz.bad");
    }
    processJudgment(judgment, correct) {
      State.judgmentCounts[judgment] =
        (State.judgmentCounts[judgment] || 0) + 1;
      if (correct) {
        const base = CONFIG.scoringPerHit[judgment] || 0;
        const comboBonus = Math.floor(State.combo * 0.1);
        const difficultyBonus = State.difficulty * 50;
        let points = Math.round(base + comboBonus + difficultyBonus);
        State.score += points;
        State.combo++;
        State.maxCombo = Math.max(State.maxCombo, State.combo);
        const vDelta = CONFIG.voltagePerHit[judgment] || 0;
        State.voltage = clamp(State.voltage + vDelta, 0, 100);
        State.questProgress.score = Math.max(
          State.questProgress.score,
          State.score
        );
        if (judgment === "COOL") State.questProgress.coolHits++;
        State.questProgress.maxCombo = Math.max(
          State.questProgress.maxCombo,
          State.combo
        );
        // FX + HUD echo
        const cx = innerWidth / 2,
          cy = innerHeight / 2;
        const colors = { COOL: "#35a7ff", GREAT: "#00c853", FINE: "#ffb300" };
        Effects.ring(cx, cy, colors[judgment] || "#999");
        Effects.burst(cx, cy, colors[judgment] || "#999");
        window.HUD &&
          (window.HUD.counts = window.HUD.counts || {
            COOL: 0,
            GREAT: 0,
            FINE: 0,
            SAD: 0,
          });
        window.HUD &&
          (window.HUD.counts[judgment] =
            (window.HUD.counts[judgment] || 0) + 1);
        hudManager.flashJudge("languageDojoCard", judgment);
        hudManager.addVoltage(vDelta, "languageDojoCard");
        hudManager.addCombo("languageDojoCard");
        if (judgment === "COOL") hudManager.pulseCard("languageDojoCard");
      } else {
        State.combo = 0;
        hudManager.resetCombo();
        hudManager.loseLife("languageDojoCard");
        window.SFX?.play?.("result.miss");
        if (State.lives <= 0) {
          this.endSong();
          return;
        }
      }
      UI.showJudgment(judgment);
      UI.updateHUD();
    }
    timeUp() {
      window.SFX?.play?.("quiz.timeup");
      this.processJudgment("MISS", false);
      setTimeout(() => {
        if (State.isPlaying) this.nextQuestion();
      }, 800);
    }
    endSong() {
      State.isPlaying = false;
      clearInterval(this.songInterval);
      clearInterval(this.questionInterval);
      clearInterval(this.noteInterval);
      // Clear notes
      State.noteQueues.forEach((q, i) => {
        q.forEach((n) => n.element?.remove());
        State.noteQueues[i] = [];
      });
      // Session end (ensures hearts & XP after completion)
      hudManager.Session?.finish?.({ reason: "time" });
      // Show results
      const rank = hudManager.calcRank();
      const rewards = hudManager.rewards();
      UI.showSongOverModal(rank, rewards);
    }
    backToMenu() {
      State.isPlaying = false;
      clearInterval(this.songInterval);
      clearInterval(this.questionInterval);
      clearInterval(this.noteInterval);
      State.noteQueues.forEach((q, i) => {
        q.forEach((n) => n.element?.remove());
        State.noteQueues[i] = [];
      });
      UI.elements.songOverModal?.classList.remove("show");
      UI.elements.gameArea.style.display = "none";
      UI.elements.menuPanel.style.display = "block";
      State.lives = 5;
      UI.updateHUD();
    }
  }
  const Game = new GameEngine();

  // ===== Judging helpers (front-of-queue) =====
  function getNoteDurationMs() {
    const dur =
      CONFIG.notes.BASE_FALL_MS - State.difficulty * CONFIG.notes.PER_DIFF_MS;
    return clamp(dur, CONFIG.notes.MIN_FALL_MS, CONFIG.notes.MAX_FALL_MS);
  }
  function getLaneTarget(laneIndex) {
    const lane =
      UI.elements.rhythmLanes?.querySelectorAll(".lane")?.[laneIndex];
    if (!lane) return null;
    return (
      lane.querySelector(".target") ||
      lane.querySelector(".rhythm-target") ||
      lane.querySelector(".hit-zone") ||
      lane
    );
  }
  function distanceToTargetTop(noteEl, targetEl) {
    const n = noteEl.getBoundingClientRect(),
      t = targetEl.getBoundingClientRect();
    return Math.abs(n.top - t.top);
  }
  function getClosestIndex(laneIndex) {
    const target = getLaneTarget(laneIndex);
    const queue = State.noteQueues[laneIndex];
    if (!target || !queue.length) return -1;
    let bestIdx = 0,
      bestDist = Infinity;
    for (let i = 0; i < queue.length; i++) {
      const d = distanceToTargetTop(queue[i].element, target);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = i;
      }
    }
    return bestIdx;
  }
  function judgeFrontAndMaybeConsume(laneIndex) {
    const target = getLaneTarget(laneIndex);
    const queue = State.noteQueues[laneIndex];
    if (!target || !queue.length) return "FINE";
    const idx = getClosestIndex(laneIndex);
    if (idx === -1) return "FINE";
    const note = queue[idx];
    const dist = distanceToTargetTop(note.element, target);
    let label =
      dist <= CONFIG.judge.COOL_PX
        ? "COOL"
        : dist <= CONFIG.judge.GREAT_PX
        ? "GREAT"
        : "FINE";
    if (label !== "FINE") {
      queue.splice(idx, 1);
      note.element.remove();
    }
    return label;
  }

  // ===== Global hooks =====
  window.startGame = (gameType) => {
    window.SFX?.play?.("ui.select");
    Game.start(gameType);
  };
  window.nextWordOfDay = () => {
    window.SFX?.play?.("ui.change");
    UI.nextWordOfDay();
  };
  window.backToMenu = () => {
    window.SFX?.play?.("ui.back");
    Game.backToMenu();
  };

  // ===== Init =====
  document.addEventListener("DOMContentLoaded", () => {
    UI.init();
    UI.applyMenuCovers?.();
    console.log("Language Dojo × Project DIVA initialized!");
  });
  console.log("Language Dojo initialized!");
})();
