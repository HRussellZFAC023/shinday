// Language Dojo × Project DIVA - Modular Game Engine
// Clean, readable, and performant game logic

(function () {
  "use strict";

  // ===== 🎮 CORE STATE MODULE =====
  const GameState = {
    // Game state
    currentGame: null,
    isPlaying: false,
    isLoading: false,
    songTimer: 180,
    questionTimer: 15,
    
    // Score & performance
    score: 0,
    combo: 0,
    maxCombo: 0,
    lives: 5,
    voltage: 0,
    userLevel: 1,
    difficulty: 3,
    
    // Judgment tracking
    judgmentCounts: { COOL: 0, GREAT: 0, FINE: 0, MISS: 0 },
    questProgress: { score: 0, coolHits: 0, maxCombo: 0 },
    
    // Content caches
    questionQueue: [],
    currentQuestion: null,
    wodCache: null,
    vocabCache: { pages: [], enDefs: new Set(), jpSurfaces: new Set() },
    kanjiCache: { gradeLists: new Map(), details: new Map() },
    
    // Game options
    vocabDirection: "jp-en",
    kanjiDirection: "meaning-kanji",
  noteDurationMs: 2000,
    hitTime: null,
    hintTimer: null,
  sessionManaged: false,
    
    // Initialize from localStorage or defaults
    init() {
      const saved = localStorage.getItem('dojoSettings');
      if (saved) {
        const settings = JSON.parse(saved);
        this.difficulty = settings.difficulty || 3;
        this.vocabDirection = settings.vocabDirection || "jp-en";
        this.kanjiDirection = settings.kanjiDirection || "meaning-kanji";
      }
    },
    
    // Save settings
    saveSettings() {
      localStorage.setItem('dojoSettings', JSON.stringify({
        difficulty: this.difficulty,
        vocabDirection: this.vocabDirection,
        kanjiDirection: this.kanjiDirection
      }));
    },
    
    reset() {
      this.score = 0;
      this.combo = 0;
      this.maxCombo = 0;
      this.voltage = 0;
      this.judgmentCounts = { COOL: 0, GREAT: 0, FINE: 0, MISS: 0 };
      this.questionQueue = [];
      this.currentQuestion = null;
      this.hitTime = null;
    }
  };

  // Alias used throughout modules
  const State = GameState;

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

  // ===== Offline seed data (fallbacks if network is blocked) =====
  const OFFLINE = {
    vocab: [
      { jp: "猫", reading: "ねこ", en: "cat" },
      { jp: "犬", reading: "いぬ", en: "dog" },
      { jp: "水", reading: "みず", en: "water" },
      { jp: "食べる", reading: "たべる", en: "eat" },
      { jp: "見る", reading: "みる", en: "see" },
      { jp: "行く", reading: "いく", en: "go" },
      { jp: "日本", reading: "にほん", en: "Japan" },
      { jp: "学校", reading: "がっこう", en: "school" },
      { jp: "先生", reading: "せんせい", en: "teacher" },
      { jp: "友達", reading: "ともだち", en: "friend" },
    ],
    kanjiGrade: {
      1: ["日", "一", "大", "年", "本", "中", "人", "出", "見", "行"],
      2: ["学", "校", "生", "時", "上", "下", "小", "山", "川", "口"],
    },
    kanjiDetails: {
      日: { meanings: ["day", "sun"] },
      一: { meanings: ["one"] },
      大: { meanings: ["big"] },
      年: { meanings: ["year"] },
      本: { meanings: ["book", "origin"] },
      中: { meanings: ["middle"] },
      人: { meanings: ["person"] },
      出: { meanings: ["exit", "leave"] },
      見: { meanings: ["see"] },
      行: { meanings: ["go", "act"] },
      学: { meanings: ["study", "learn"] },
      校: { meanings: ["school"] },
      生: { meanings: ["life", "birth", "student"] },
      時: { meanings: ["time", "hour"] },
      上: { meanings: ["up", "above"] },
      下: { meanings: ["down", "below"] },
      小: { meanings: ["small"] },
      山: { meanings: ["mountain"] },
      川: { meanings: ["river"] },
      口: { meanings: ["mouth"] },
    },
  };

  // ===== API Integration =====
  const API = {
    _lastFail: new Map(),
    _sessionCache: new Map(), // Add session cache for frequently accessed data
    
    _markFail(key) {
      this._lastFail.set(key, Date.now());
    },
    
    _recentlyFailed(key, ms = 8000) {
      const t = this._lastFail.get(key) || 0;
      return Date.now() - t < ms;
    },
    
    _getSessionCache(key) {
      try {
        const cached = sessionStorage.getItem(`dojo-cache-${key}`);
        if (cached) {
          const data = JSON.parse(cached);
          // Cache expires after 1 hour
          if (Date.now() - data.timestamp < 3600000) {
            return data.value;
          } else {
            sessionStorage.removeItem(`dojo-cache-${key}`);
          }
        }
      } catch {}
      return null;
    },
    
    _setSessionCache(key, value) {
      try {
        sessionStorage.setItem(`dojo-cache-${key}`, JSON.stringify({
          value,
          timestamp: Date.now()
        }));
      } catch {}
    },
    
    async fetchJsonWithCors(url, timeout = 6000) {
      // Check session cache first for repeated requests
      const cacheKey = url.replace(/[^a-zA-Z0-9]/g, '').slice(0, 50);
      const cached = this._getSessionCache(cacheKey);
      if (cached) return cached;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      try {
        const res = await fetch(url, {
          signal: controller.signal,
          mode: "cors",
          cache: "no-store",
          referrerPolicy: "no-referrer",
        });
        clearTimeout(timeoutId);
        if (res.ok) return await res.json();
      } catch (_) {}
      clearTimeout(timeoutId);

      // If we just failed this host, don’t spam proxies
      try {
        const host = new URL(url).host;
        if (this._recentlyFailed(host)) return null;
      } catch {}

      // Fallback 1: isomorphic-git CORS proxy
      try {
        const res = await fetch(`https://cors.isomorphic-git.org/${url}`, {
          cache: "no-store",
        });
        if (res.ok) return await res.json();
      } catch (_) {}

      // Fallback 2: AllOrigins /get (parse contents)
      try {
        const aourl = `https://api.allorigins.win/get?url=${encodeURIComponent(
          url
        )}`;
        const res = await fetch(aourl, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.contents === "string") {
            try {
              return JSON.parse(data.contents);
            } catch {
              return null;
            }
          }
        }
      } catch (_) {}

      // Mark host as failed to rate-limit retries
      try {
        const host = new URL(url).host;
        this._markFail(host);
      } catch {}
      return null;
    },

    async fetchWordOfDay() {
      const page = Math.floor(Math.random() * 50) + 1;
      const url = `https://jisho.org/api/v1/search/words?keyword=%23common&page=${page}`;
      const data = await this.fetchJsonWithCors(url);

      if (data && data.data && data.data.length > 0) {
        const word = data.data[Math.floor(Math.random() * data.data.length)];
        return {
          word: word.japanese[0].word || word.japanese[0].reading,
          reading: word.japanese[0].reading,
          meaning: word.senses[0].english_definitions[0],
        };
      }
      // Offline fallback
      const w = OFFLINE.vocab[Math.floor(Math.random() * OFFLINE.vocab.length)];
      return { word: w.jp, reading: w.reading, meaning: w.en };
    },

    async fetchVocabPage(page) {
      const url = `https://jisho.org/api/v1/search/words?keyword=%23common&page=${page}`;
      const data = await this.fetchJsonWithCors(url);

      if (data && data.data) {
        const entries = data.data;
        State.vocabCache.pages.push(entries);

        // Cache individual items
        entries.forEach((entry) => {
          const jp = entry.japanese[0].word || entry.japanese[0].reading;
          const en = entry.senses[0]?.english_definitions?.[0];

          if (jp) State.vocabCache.jpSurfaces.add(jp);
          if (en) State.vocabCache.enDefs.add(en);
        });

        // Keep cache size manageable
        if (State.vocabCache.pages.length > 10) {
          State.vocabCache.pages.shift();
        }

        return entries;
      }
      // Seed with offline vocab once if empty
      if (State.vocabCache.pages.length === 0) {
        const offlinePage = OFFLINE.vocab.map((v) => ({
          japanese: [{ word: v.jp, reading: v.reading }],
          senses: [{ english_definitions: [v.en] }],
        }));
        State.vocabCache.pages.push(offlinePage);
        offlinePage.forEach((e) => {
          const jp = e.japanese[0].word || e.japanese[0].reading;
          const en = e.senses[0]?.english_definitions?.[0];
          if (jp) State.vocabCache.jpSurfaces.add(jp);
          if (en) State.vocabCache.enDefs.add(en);
        });
        return offlinePage;
      }
      return [];
    },

    async fetchKanjiGrade(grade) {
      if (State.kanjiCache.gradeLists.has(grade)) {
        return State.kanjiCache.gradeLists.get(grade);
      }

      const url = `https://kanjiapi.dev/v1/kanji/grade-${grade}`;
      const data = await this.fetchJsonWithCors(url);

      if (data && Array.isArray(data)) {
        State.kanjiCache.gradeLists.set(grade, data);
        return data;
      }
      // Offline fallback
      const off = OFFLINE.kanjiGrade[grade] || [];
      if (off.length) State.kanjiCache.gradeLists.set(grade, off);
      return off;
    },

    async fetchKanjiDetail(kanji) {
      if (State.kanjiCache.details.has(kanji)) {
        return State.kanjiCache.details.get(kanji);
      }

      const url = `https://kanjiapi.dev/v1/kanji/${encodeURIComponent(kanji)}`;
      const data = await this.fetchJsonWithCors(url);

      if (data) {
        State.kanjiCache.details.set(kanji, data);
        return data;
      }
      // Offline fallback
      const off = OFFLINE.kanjiDetails[kanji];
      if (off) {
        State.kanjiCache.details.set(kanji, off);
        return off;
      }
      return null;
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
      // Prefer external converter if available (e.g., wanakana)
      try {
        if (window.wanakana && typeof window.wanakana.toRomaji === "function") {
          return window.wanakana.toRomaji(kana);
        }
      } catch (_) {}
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
      // Ensure we have cached data
      if (State.vocabCache.pages.length < 2) {
        await API.fetchVocabPage(Math.floor(Math.random() * 50) + 1);
        await API.fetchVocabPage(Math.floor(Math.random() * 50) + 1);
      }

      const pages = State.vocabCache.pages;
      if (pages.length === 0) return null;

      const page = pages[Math.floor(Math.random() * pages.length)];
      const entry = page[Math.floor(Math.random() * page.length)];

      const jp = entry.japanese[0].word || entry.japanese[0].reading;
      const reading = entry.japanese[0].reading;
      const en = entry.senses[0].english_definitions[0];

      const dir = State.vocabDirection;
      if (dir === "jp-en") {
        // distractor EN
        const distractors = new Set();
        while (distractors.size < 3 && State.vocabCache.enDefs.size > 3) {
          const defsArr = Array.from(State.vocabCache.enDefs);
          const randomDef = defsArr[Math.floor(Math.random() * defsArr.length)];
          if (randomDef !== en) distractors.add(randomDef);
        }
        const options = [en, ...Array.from(distractors)].sort(
          () => Math.random() - 0.5
        );
        return {
          type: "vocab",
          prompt: { jp, reading },
          correct: en,
          options,
          reading,
        };
      } else {
        // EN→JP distractors
        const jpSet = new Set();
        State.vocabCache.pages.forEach((pg) =>
          pg.forEach((e) => {
            const surface = e.japanese[0].word || e.japanese[0].reading;
            if (surface) jpSet.add(surface);
          })
        );
        const jpArr = Array.from(jpSet);
        const distractors = new Set();
        while (distractors.size < 3 && jpArr.length > 3) {
          const randomJp = jpArr[Math.floor(Math.random() * jpArr.length)];
          if (randomJp !== jp) distractors.add(randomJp);
        }
        const options = [jp, ...Array.from(distractors)].sort(
          () => Math.random() - 0.5
        );
        return { type: "vocab", prompt: { en }, correct: jp, options, reading };
      }
    },

    async generateKanjiQuestion() {
      const grade = Math.min(Math.ceil(State.difficulty / 1.5), 6);
      const kanjiList = await API.fetchKanjiGrade(grade);

      if (!kanjiList.length) return null;

      const kanji = kanjiList[Math.floor(Math.random() * kanjiList.length)];
      const detail = await API.fetchKanjiDetail(kanji);

      if (!detail || !detail.meanings || !detail.meanings.length) return null;

      const meaning = detail.meanings[0];
      const dir = State.kanjiDirection;
      if (dir === "meaning-kanji") {
        const distractors = new Set();
        while (distractors.size < 3) {
          const randomKanji =
            kanjiList[Math.floor(Math.random() * kanjiList.length)];
          if (randomKanji !== kanji) distractors.add(randomKanji);
        }
        const options = [kanji, ...Array.from(distractors)].sort(
          () => Math.random() - 0.5
        );
        return { type: "kanji", prompt: meaning, correct: kanji, options };
      } else {
        // kanji → meaning
        const meanings = new Set([meaning]);
        while (meanings.size < 4) {
          const rk = kanjiList[Math.floor(Math.random() * kanjiList.length)];
          const rd = await API.fetchKanjiDetail(rk);
          const m = rd?.meanings?.[0];
          if (m && !meanings.has(m)) meanings.add(m);
        }
        const options = Array.from(meanings).sort(() => Math.random() - 0.5);
        return { type: "kanji", prompt: kanji, correct: meaning, options };
      }
    },

    async generateTypingQuestion() {
      if (State.vocabCache.pages.length === 0) {
        await API.fetchVocabPage(Math.floor(Math.random() * 50) + 1);
      }
      let entry = null;
      for (let tries = 0; tries < 5 && !entry; tries++) {
        const page =
          State.vocabCache.pages[
            Math.floor(Math.random() * State.vocabCache.pages.length)
          ];
        if (page && page.length)
          entry = page[Math.floor(Math.random() * page.length)];
      }
      if (entry) {
        const jp = entry.japanese[0].word || entry.japanese[0].reading;
        const reading = entry.japanese[0].reading || "";
        const romaji = Kana.toRomaji(reading);
        return {
          type: "typing",
          jp,
          reading,
          romaji,
          typed: "",
          startTime: null,
        };
      }
      const fallback =
        State.typingWords[Math.floor(Math.random() * State.typingWords.length)];
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
  stageSinger: document.getElementById("stageSinger"),
      };

      // Setup event listeners
      this.setupEventListeners();

  // Ensure controls reflect saved state
  this.syncControlsFromState();

  // Update initial values
  this.updateHUD();
      this.loadWordOfDay();

      // Apply menu covers once SITE_CONTENT is loaded
      this.applyMenuCovers && this.applyMenuCovers();

      // Warm up caches and queues
      (async () => {
        try {
          const p = Math.floor(Math.random() * 50) + 1;
          await API.fetchVocabPage(p);
        } catch {}
        await Prefetch.ensureQuestions("vocab", 6);
        await Prefetch.ensureQuestions("kanji", 6);
      })();
    },

    syncControlsFromState() {
      // Difficulty slider
      if (this.elements.difficultySlider) {
        this.elements.difficultySlider.value = String(State.difficulty || 3);
        this.updateDifficultyDisplay();
      }
      // Direction selects
      const vocabSel = document.getElementById("vocabDirection");
      const kanjiSel = document.getElementById("kanjiDirection");
      if (vocabSel) vocabSel.value = State.vocabDirection || "jp-en";
      if (kanjiSel) kanjiSel.value = State.kanjiDirection || "meaning-kanji";
    },

    setupEventListeners() {
      // Difficulty slider
      this.elements.difficultySlider.addEventListener("input", (e) => {
        State.difficulty = parseInt(e.target.value);
        this.updateDifficultyDisplay();
        State.saveSettings();
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
          State.saveSettings();
        });
      if (kanjiSel)
        kanjiSel.addEventListener("change", (e) => {
          State.kanjiDirection = e.target.value;
          State.saveSettings();
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
      // Update the judge echo in the HUD
  const judgeEcho = document.getElementById('languageDojoCardJudge');
      if (judgeEcho) {
        judgeEcho.textContent = type;
        judgeEcho.style.opacity = '1';
        judgeEcho.style.transform = 'scale(1.1)';
        setTimeout(() => {
          judgeEcho.style.opacity = '0.8';
          judgeEcho.style.transform = 'scale(1)';
          setTimeout(() => {
            judgeEcho.textContent = 'READY';
            judgeEcho.style.opacity = '1';
          }, 800);
        }, 400);
      }

  // Show the center judgment display if global HUD is not managing it
  if (!window.flashJudge) {
        const display = this.elements.judgmentDisplay;
        display.textContent = type;
        display.className = `judgment-display show ${type.toLowerCase()}`;

        setTimeout(() => {
          display.classList.remove("show");
        }, 500);
      }
    },

    async loadWordOfDay() {
      const content = this.elements.wodContent;
      content.innerHTML = '<div class="loading"></div>';

      if (!State.wodCache) {
        State.wodCache = await API.fetchWordOfDay();
      }

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

      // Spawn a timing note aligned to the correct option and compute accurate hit time
      const correctIdx = question.options.indexOf(question.correct);
      const duration = getNoteDuration();
      State.noteDurationMs = duration;
      if (correctIdx >= 0) {
        // Compute when the note will intersect the lane target based on layout
        const lanes = this.elements.rhythmLanes.querySelectorAll(".lane");
        const lane = lanes[correctIdx];
        State.hitTime = computeHitTimestamp(lane, duration);
        Effects.spawnFallingNote(correctIdx, duration);
      } else {
        State.hitTime = Date.now() + duration;
      }
    },

    startTypingQuestion(question) {
      // Clear any existing hint timer
      if (State.hintTimer) {
        clearTimeout(State.hintTimer);
        State.hintTimer = null;
      }
      
      // Show hiragana and meaning together
      const displayText = [];
      if (question.jp || question.word) {
        displayText.push(question.jp || question.word);
      }
      if (question.meaning || question.en) {
        displayText.push(`(${question.meaning || question.en})`);
      }
      
      this.elements.typingTarget.innerHTML = displayText.join('<br>');
      this.elements.typingInput.value = "";
      this.elements.typingFeedback.textContent = "";
      
      // Show romaji hint after 5 seconds
      if (question.romaji) {
        State.hintTimer = setTimeout(() => {
          if (this.elements.typingFeedback) {
            this.elements.typingFeedback.textContent = `💡 Hint: ${question.romaji}`;
            this.elements.typingFeedback.style.color = 'var(--pastel-yellow)';
          }
        }, 5000);
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
      const scoreBonus = Math.floor(State.score / 500); // More generous score bonus
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

  // Set stage singer from current selection
  UI.setStageSinger = function () {
    try {
      if (!this.elements.stageSinger) return;
      
      // Try to get current singer from MikuSystem or localStorage
      let currentSinger = null;
      if (window.MikuSystem && typeof window.MikuSystem.getCurrentMiku === "function") {
        currentSinger = window.MikuSystem.getCurrentMiku();
      } else {
        // Fallback: check localStorage for singer selection
        const storedSinger = localStorage.getItem("singer.current");
        if (storedSinger) {
          try {
            currentSinger = JSON.parse(storedSinger);
          } catch {
            currentSinger = { image: storedSinger }; // Simple string fallback
          }
        }
      }

      // Clear existing content
      this.elements.stageSinger.innerHTML = "";

      // Render singer if found
      if (currentSinger && (currentSinger.image || currentSinger.src)) {
        const img = document.createElement("img");
        img.src = currentSinger.image || currentSinger.src;
        img.alt = currentSinger.name || "Selected Singer";
        img.onerror = () => {
          // Fallback to default Miku if image fails
          img.src = "assets/pixel-miku/001 - Hatsune Miku (Original).png";
        };
        this.elements.stageSinger.appendChild(img);
      }
    } catch (error) {
      console.warn("Could not set stage singer:", error);
    }
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
  // No longer injects a separate diva-hud; judge-echo is part of main-hud
        // Treat presence of opt-in as session being centrally managed
        State.sessionManaged = !!window.DivaSessionOptIn;
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
        UI.elements.questionContent.style.display = "none"; // Hide question panel for typing
        UI.elements.gameArea.classList.add("typing-active");
        
        // Move floating Miku into game area for typing mode
        try {
          const floatingContainer = document.getElementById("floatingMikusContainer");
          const gameArea = UI.elements.gameArea;
          if (floatingContainer && gameArea) {
            gameArea.appendChild(floatingContainer);
            floatingContainer.style.position = "absolute";
            floatingContainer.style.top = "20px";
            floatingContainer.style.right = "20px";
            floatingContainer.style.zIndex = "10";
          }
        } catch {}
      } else {
        UI.elements.answerGrid.style.display = "grid";
        UI.elements.typingArea.style.display = "none";
        UI.elements.rhythmLanes.style.display = "flex";
        UI.elements.questionContent.style.display = "flex"; // Show question panel for other modes
        UI.elements.gameArea.classList.remove("typing-active");

        // Start note spawning
        this.noteInterval = setInterval(() => {
          Effects.spawnFallingNote(
            Math.floor(Math.random() * 4),
            getNoteDuration()
          );
        }, Math.max(400, 900 - State.difficulty * 60));
      }

      // Render selected singer on stage (if any)
      try {
        if (UI && typeof UI.setStageSinger === "function") UI.setStageSinger();
      } catch {}

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
          // keep quiet on already-disabled buttons to avoid double sfx
        }
        btn.disabled = true;
        if (btn.textContent.includes(answer)) {
          btn.classList.add(correct ? "correct" : "incorrect");
        }
      });

      // If wrong, reveal the correct answer briefly
      if (!correct) {
        try {
          const correctText = (State.currentQuestion && State.currentQuestion.correct) || "";
          UI.elements.answerGrid.querySelectorAll('.answer-btn').forEach((b) => {
            if (b.textContent.trim() === String(correctText).trim()) b.classList.add('correct');
          });
        } catch {}
      }

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
        this.processJudgment(judgment, true);
        UI.elements.typingFeedback.textContent = "Correct!";
        UI.elements.typingFeedback.className = "typing-feedback correct";

        setTimeout(() => {
          if (State.isPlaying) {
            this.nextQuestion();
          }
        }, 1000);
      } else if (targetKana.startsWith(typed) || targetRoma.startsWith(typed)) {
        UI.elements.typingFeedback.textContent = "";
      } else {
        UI.elements.typingFeedback.textContent = "Keep trying...";
        UI.elements.typingFeedback.className = "typing-feedback";
      }
    },

    processJudgment(judgment, correct) {
      State.judgmentCounts[judgment]++;

      // Update score and combo
      if (correct) {
        const baseScore = { COOL: 1000, GREAT: 500, FINE: 200 }[judgment] || 0;
        const comboBonus = Math.floor(State.combo * 10); // More meaningful combo bonus
        const difficultyBonus = State.difficulty * 100; // Increased difficulty reward
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

  // Play sound (single pathway)
  SFX.play(judgment === "COOL" ? "perfect" : "great");

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
          // Use global flashJudge if available, otherwise use local showJudgment
          if (window.flashJudge) {
            window.flashJudge("languageDojoModule", judgment);
          } else {
            UI.showJudgment(judgment);
          }
          if (window.addVoltage) window.addVoltage(vDelta, "languageDojoModule");
          if (window.addCombo) window.addCombo("languageDojoModule");
          if (judgment === "COOL" && window.party) window.party("languageDojoModule");
        } catch {}
      } else {
        State.combo = 0;
        // Global miss → lose life
        try {
          if (window.resetCombo) window.resetCombo();
          if (window.loseLife) window.loseLife("languageDojoModule");
          const livesNow = window.HUD?.lives;
          if (typeof livesNow === "number") State.lives = livesNow;
          else State.lives--;
        } catch {
          State.lives--;
        }
  SFX.play("miss");

        // Display miss judgment
        if (window.flashJudge) {
          window.flashJudge("languageDojoModule", "MISS");
        } else {
          UI.showJudgment("MISS");
        }

        // Check game over
        if (State.lives <= 0) {
          this.endSong();
          return;
        }
      }

      // Judgment display is handled in the correct section above
      UI.updateHUD();
    },

    timeUp() {
      SFX.play("timeup");
      this.processJudgment("MISS", false);

      // Reveal correct answer briefly on timeout
      try {
        if (State.currentGame === "typing") {
          const q = State.currentQuestion || {};
          if (UI.elements.typingFeedback) {
            const kana = q.reading || q.jp || "";
            const roma = q.romaji ? ` (${q.romaji})` : "";
            const en = q.en || q.meaning || "";
            UI.elements.typingFeedback.textContent = `Time's up! Correct: ${kana}${roma} — ${en}`;
            UI.elements.typingFeedback.className = "typing-feedback";
          }
        } else if (UI.elements && UI.elements.answerGrid) {
          const correctText = (State.currentQuestion && State.currentQuestion.correct) || "";
          UI.elements.answerGrid.querySelectorAll(".answer-btn").forEach((b) => {
            if (b.textContent.trim() === String(correctText).trim()) b.classList.add("correct");
          });
        }
      } catch {}

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

      // If centrally managed session is active, delegate finishing to HUD and avoid duplicate overlay/rewards
      if (State.sessionManaged && typeof window.Session?.finish === "function") {
        try {
          window.Session.finish();
          return;
        } catch (_) {}
      }

      // Local-only rewards (fallback)
      const baseReward = 1000;
      const scoreBonus = Math.floor(State.score / 500); // Match modal calculation
      const levelBonus = (window.Progression?.getProgress?.().level || 1) * 100;
      const totalReward = baseReward + scoreBonus + levelBonus;

      // XP only by default to prevent double heart payouts; hearts managed by HUD overlay
      try {
        const scoreXp = Math.max(0, Math.floor(State.score / 150));
        if (window.addXP) window.addXP(30 + scoreXp);
      } catch {}

      // Show results (informational) - only if not session managed
      UI.showSongOverModal();
      // Reflect calculated reward in modal
      try {
        document.getElementById("rewardAmount").textContent = totalReward.toLocaleString();
        document.getElementById("rewardBonus").textContent = `Base (${baseReward}) + Score (${scoreBonus}) + Level (${levelBonus})`;
      } catch {}
    },

    backToMenu() {
      State.isPlaying = false;

      // Clear intervals
      if (this.songInterval) clearInterval(this.songInterval);
      if (this.questionInterval) clearInterval(this.questionInterval);
      if (this.noteInterval) clearInterval(this.noteInterval);

      // Restore floating Miku to original position
      try {
        const floatingContainer = document.getElementById("floatingMikusContainer");
        const header = document.getElementById("header");
        if (floatingContainer && header) {
          header.appendChild(floatingContainer);
          floatingContainer.style.position = "";
          floatingContainer.style.top = "";
          floatingContainer.style.right = "";
          floatingContainer.style.zIndex = "";
        }
      } catch {}

      // Hide modal and game area
      UI.elements.songOverModal.classList.remove("show");
      UI.elements.gameArea.style.display = "none";
      UI.elements.menuPanel.style.display = "block";

      // Reset lives
      State.lives = 5;
      UI.updateHUD();

      // Reset judge echo to READY
      try {
        const judgeEcho = document.getElementById("languageDojoCardJudge");
        if (judgeEcho) {
          judgeEcho.textContent = "READY";
          judgeEcho.style.opacity = "1";
          judgeEcho.style.transform = "translateY(0) scale(1)";
        }
        if (window.resetCombo) window.resetCombo();
      } catch {}
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

  // Calculate when a falling note will intersect its lane target
  function computeHitTimestamp(lane, durationMs) {
    try {
      if (!lane) return Date.now() + durationMs;
      const laneRect = lane.getBoundingClientRect();
      const target = lane.querySelector('.lane-target');
      const targetRect = target ? target.getBoundingClientRect() : null;
      const laneH = laneRect.height;
      const startOffset = 40; // starts at top:-40px
      const targetCenterYFromLaneTop = targetRect
        ? targetRect.top - laneRect.top + targetRect.height / 2
        : laneH - 20 - 25; // fallback: bottom:20px, radius ~25
      const travel = laneH + startOffset;
      const ratio = Math.max(0, Math.min(1, (targetCenterYFromLaneTop + startOffset) / travel));
      return Date.now() + Math.round(durationMs * ratio);
    } catch (_) {
      return Date.now() + durationMs;
    }
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
  // Load saved settings first
  try { State.init(); } catch {}
    SFX.init();
    // Expose SFX globally for any auxiliary scripts
    try {
  if (!window.SFX) window.SFX = SFX;
    } catch {}
    UI.init();
    if (UI.applyMenuCovers) UI.applyMenuCovers();

    console.log("Language Dojo × Project DIVA initialized!");
  });
})();
