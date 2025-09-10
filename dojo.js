// Language Dojo × Project DIVA — Simplified OOP Refactor with improvements
// This file contains the full logic for the Language Dojo mini‑games.  It
// centralises all configuration, exposes an easy API for starting games and
// manages state, UI updates, effects and scoring.  It has been updated to
// make high ranks easier to obtain, improve the typing game scoring rules,
// provide better hints and fix a number of small bugs.  If you need to
// integrate this with a website just load this script after your DOM has
// loaded.

(function () {
  // ===== Constants / Config =====
  // All tweakable values live in this CONFIG object.  Adjust these values
  // instead of scattering magic numbers throughout the code.  See the
  // README.md for guidance on how to tune them.
  const CONFIG = Object.freeze({
    timers: {
      SONG_S: 60,        // seconds per game
      QUESTION_S: 10,    // seconds per question
    },
    notes: {
      BASE_FALL_MS: 2800,
      PER_DIFF_MS: 180,
      MIN_FALL_MS: 1100,
      MAX_FALL_MS: 3000,
      SPAWN_BASE_MS: 900,
      SPAWN_DIFF_STEP_MS: 60,
      SPAWN_MIN_MS: 400,
    },
    // The distance in pixels from the target at which a hit is still
    // considered COOL or GREAT.  Larger values make it easier to hit these
    // judgements.  GREAT also counts if the note actually intersects the
    // target element.
    judge: {
      COOL_PX: 20,
      GREAT_PX: 120,
    },
    // Per‑hit scores and voltage gains.  Adjust these to scale up or down
    // scoring and voltage accumulation.  COOL gets the highest, FINE the
    // lowest.
    scoringPerHit: { COOL: 1000, GREAT: 600, FINE: 250 },
    voltagePerHit: { COOL: 15, GREAT: 10, FINE: 5 },
    // Reward calculation for the end of a session.  Total reward =
    // BASE + final score + LEVEL_MULT × playerLevel.
    rewards: { BASE: 100, LEVEL_MULT: 10 },
    // Score thresholds for letter ranks at the end of a song.  These
    // thresholds are deliberately generous so players can earn high ranks
    // during the short one‑minute songs.  Adjust if you find ranks are too
    // easy or too hard to obtain.  Thresholds are inclusive: if you score
    // exactly the threshold you get that rank.  Ranks are checked from
    // highest to lowest.
    rankThresholds: [
      { score: 9000, rank: 'SSS' },
      { score: 7000, rank: 'SS' },
      { score: 5000, rank: 'S' },
      { score: 3000, rank: 'A' },
      { score: 2000, rank: 'B' },
      { score: 1000, rank: 'C' },
    ],
  });

  const PS_SYMBOLS = ['△', '○', '×', '□'];
  const LANE_TYPES = ['triangle', 'circle', 'cross', 'square'];

  // Small utility to clamp numbers to a range
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  // ===== State =====
  // Encapsulate all mutable game state here.  Use reset() to reset the
  // entire state between games.
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
      this.vocabDirection = 'jp-en';
      this.kanjiDirection = 'meaning-kanji';
      this.noteQueues = [[], [], [], []];
      this.typingMaxTier = 'COOL';
      // Track whether the player has made a mistake yet in typing mode.
      this.typingMistakeMade = false;
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
      this.typingMaxTier = 'COOL';
      this.typingMistakeMade = false;
    }
  }
  const State = new GameState();

  // ===== API Services =====
  class ApiService {
    // Fetches a word of the day from the JLPT dataset with difficulty pooling.
    // Returns { word, reading, meaning } or null if none is available.
    static async fetchWordOfDay(diff = 1) {
      const vocabPool = this.getVocabPool(diff);
      if (!vocabPool.length) return null;
      const pick = vocabPool[Math.floor(Math.random() * vocabPool.length)];
      return {
        word: pick.word || pick.reading,
        reading: pick.reading || '',
        meaning: pick.meaning || '',
      };
    }

    // Gets vocabulary pool including all words from current and lower difficulty levels
    static getVocabPool(difficulty) {
      let pool = [];
      if (difficulty === 10) {
        // Pool all possible words for difficulty 10
        for (let i = 1; i <= 9; i++) {
          const levelPool = window.JLPT?.vocab?.[i] || [];
          pool = pool.concat(levelPool);
        }
      } else {
        // Include all words from current difficulty and below
        for (let i = 1; i <= difficulty; i++) {
          const levelPool = window.JLPT?.vocab?.[i] || [];
          pool = pool.concat(levelPool);
        }
      }
      return pool;
    }

    // Gets kanji pool including all kanji from current and lower difficulty levels
    static getKanjiPool(difficulty) {
      let pool = [];
      if (difficulty === 10) {
        // Pool all possible kanji for difficulty 10
        for (let i = 1; i <= 9; i++) {
          const levelPool = window.JLPT?.kanji?.[i] || [];
          pool = pool.concat(levelPool);
        }
      } else {
        // Include all kanji from current difficulty and below
        for (let i = 1; i <= difficulty; i++) {
          const levelPool = window.JLPT?.kanji?.[i] || [];
          pool = pool.concat(levelPool);
        }
      }
      return pool;
    }
  }

  // ===== Kana utilities =====
  // Simple conversions between kana and romaji.  For IME hints we expose
  // readingToKeys() which returns the romanised typing sequence for a
  // hiragana string.  A missing mapping simply returns the original kana.
  class KanaUtils {
    constructor() {
      this.hiraToRomaMap = new Map([
        ['あ', 'a'],
        ['い', 'i'],
        ['う', 'u'],
        ['え', 'e'],
        ['お', 'o'],
        ['か', 'ka'],
        ['き', 'ki'],
        ['く', 'ku'],
        ['け', 'ke'],
        ['こ', 'ko'],
        ['さ', 'sa'],
        ['し', 'shi'],
        ['す', 'su'],
        ['せ', 'se'],
        ['そ', 'so'],
        ['た', 'ta'],
        ['ち', 'chi'],
        ['つ', 'tsu'],
        ['て', 'te'],
        ['と', 'to'],
        ['な', 'na'],
        ['に', 'ni'],
        ['ぬ', 'nu'],
        ['ね', 'ne'],
        ['の', 'no'],
        ['は', 'ha'],
        ['ひ', 'hi'],
        ['ふ', 'fu'],
        ['へ', 'he'],
        ['ほ', 'ho'],
        ['ま', 'ma'],
        ['み', 'mi'],
        ['む', 'mu'],
        ['め', 'me'],
        ['も', 'mo'],
        ['や', 'ya'],
        ['ゆ', 'yu'],
        ['よ', 'yo'],
        ['ら', 'ra'],
        ['り', 'ri'],
        ['る', 'ru'],
        ['れ', 're'],
        ['ろ', 'ro'],
        ['わ', 'wa'],
        ['を', 'o'],
        ['ん', 'n'],
        ['が', 'ga'],
        ['ぎ', 'gi'],
        ['ぐ', 'gu'],
        ['げ', 'ge'],
        ['ご', 'go'],
        ['ざ', 'za'],
        ['じ', 'ji'],
        ['ず', 'zu'],
        ['ぜ', 'ze'],
        ['ぞ', 'zo'],
        ['だ', 'da'],
        ['ぢ', 'ji'],
        ['づ', 'zu'],
        ['で', 'de'],
        ['ど', 'do'],
        ['ば', 'ba'],
        ['び', 'bi'],
        ['ぶ', 'bu'],
        ['べ', 'be'],
        ['ぼ', 'bo'],
        ['ぱ', 'pa'],
        ['ぴ', 'pi'],
        ['ぷ', 'pu'],
        ['ぺ', 'pe'],
        ['ぽ', 'po'],
        ['きゃ', 'kya'],
        ['きゅ', 'kyu'],
        ['きょ', 'kyo'],
        ['しゃ', 'sha'],
        ['しゅ', 'shu'],
        ['しょ', 'sho'],
        ['ちゃ', 'cha'],
        ['ちゅ', 'chu'],
        ['ちょ', 'cho'],
        ['にゃ', 'nya'],
        ['にゅ', 'nyu'],
        ['にょ', 'nyo'],
        ['ひゃ', 'hya'],
        ['ひゅ', 'hyu'],
        ['ひょ', 'hyo'],
        ['みゃ', 'mya'],
        ['みゅ', 'myu'],
        ['みょ', 'myo'],
        ['りゃ', 'rya'],
        ['りゅ', 'ryu'],
        ['りょ', 'ryo'],
        ['ぎゃ', 'gya'],
        ['ぎゅ', 'gyu'],
        ['ぎょ', 'gyo'],
        ['じゃ', 'ja'],
        ['じゅ', 'ju'],
        ['じょ', 'jo'],
        ['びゃ', 'bya'],
        ['びゅ', 'byu'],
        ['びょ', 'byo'],
        ['ぴゃ', 'pya'],
        ['ぴゅ', 'pyu'],
        ['ぴょ', 'pyo'],
        ['っ', '*tsu*'],
        // Additional mappings to improve IME labels: long vowel dash and voiced hiragana
        ['ー', '-'],
        ['ゔ', 'vu'],
        ['づ', 'du'],
        ['ぢ', 'di'],
      ]);
    }
    kataToHira(str) {
      return (str || '').replace(/[ァ-ン]/g, (ch) =>
        String.fromCharCode(ch.charCodeAt(0) - 0x60)
      );
    }
    readingToKeys(kana) {
      // Convert a kana string to the IME romaji key sequence.  Handles
      // double consonants via the small tsu.  Unknown characters are passed
      // through unchanged.
      if (!kana) return '';
      kana = this.kataToHira(kana);
      let out = '';
      for (let i = 0; i < kana.length; ) {
        const two = kana.slice(i, i + 2);
        const one = kana[i];
        if (this.hiraToRomaMap.has(two)) {
          out += this.hiraToRomaMap.get(two);
          i += 2;
          continue;
        }
        if (one === 'っ') {
          const nextRoma =
            this.hiraToRomaMap.get(kana.slice(i + 1, i + 3)) ||
            this.hiraToRomaMap.get(kana[i + 1]) ||
            '';
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
      return (input || '').toLowerCase().replace(/\s+/g, '');
    }
  }
  const Kana = new KanaUtils();

  // ===== Question generation =====
  class QuestionGenerator {
    static async vocab() {
      await (window.JLPT_READY || Promise.resolve());
      const pool = ApiService.getVocabPool(State.difficulty);
      if (!pool.length) return null;
      const entry = pool[Math.floor(Math.random() * pool.length)];
      const jp = entry.word || entry.reading;
      const reading = entry.reading || '';
      const en = entry.meaning || '';
      if (State.vocabDirection === 'jp-en') {
          const opts = new Set([en]);
          while (opts.size < 4 && pool.length > 3) {
            const d = pool[Math.floor(Math.random() * pool.length)]?.meaning;
            if (d && d !== en) opts.add(d);
          }
          const options = [...opts].sort(() => Math.random() - 0.5);
          return {
            type: 'vocab',
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
          return { type: 'vocab', prompt: { en }, correct: jp, options, reading };
      }
    }
    static async kanji() {
      await (window.JLPT_READY || Promise.resolve());
      const pool = ApiService.getKanjiPool(State.difficulty);
      if (!pool.length) return null;
      const entry = pool[Math.floor(Math.random() * pool.length)];
      const kanji = entry.kanji;
      const meaning = entry.meaning;
      if (State.kanjiDirection === 'meaning-kanji') {
          const opts = new Set([kanji]);
          while (opts.size < 4 && pool.length > 3) {
            const d = pool[Math.floor(Math.random() * pool.length)]?.kanji;
            if (d && d !== kanji) opts.add(d);
          }
          const options = [...opts].sort(() => Math.random() - 0.5);
          return { type: 'kanji', prompt: meaning, correct: kanji, options };
      } else {
          const opts = new Set([meaning]);
          while (opts.size < 4 && pool.length > 3) {
            const d = pool[Math.floor(Math.random() * pool.length)]?.meaning;
            if (d && d !== meaning) opts.add(d);
          }
          const options = [...opts].sort(() => Math.random() - 0.5);
          return { type: 'kanji', prompt: kanji, correct: meaning, options };
      }
    }
    static async typing() {
      await (window.JLPT_READY || Promise.resolve());
      const pool = ApiService.getVocabPool(State.difficulty);
      const entry = pool.length
        ? pool[Math.floor(Math.random() * pool.length)]
        : { word: 'fallback', reading: 'fallback', meaning: 'fallback' };
      const jp = entry.word || entry.reading;
      const reading = entry.reading || '';
      const meaning = entry.meaning || '';
      const keys = Kana.readingToKeys(reading);
      return {
        type: 'typing',
        jp,
        reading,
        meaning,
        keys,
        typed: '',
        startTime: null,
      };
    }
  }

  // ===== UI manager =====
  class UIManager {
    constructor() {
      this.elements = {};
    }
    init() {
      // Grab all the elements we need once up front
      this.elements = {
        menuPanel: byId('menuPanel'),
        gameArea: byId('gameArea'),
        userLevel: byId('userLevel'),
        voltageBar: byId('voltageBar'),
        comboCount: byId('comboCount'),
        scoreValue: byId('scoreValue'),
        songTimer: byId('songTimer'),
        livesContainer: byId('livesContainer'),
        judgmentDisplay: byId('judgmentDisplay'),
        questionContent: byId('questionContent'),
        answerGrid: byId('answerGrid'),
        typingArea: byId('typingArea'),
        typingTarget: byId('typingTarget'),
        typingInput: byId('typingInput'),
        typingFeedback: byId('typingFeedback'),
        questionTimerBar: byId('questionTimerBar'),
        questionTimerText: byId('questionTimerText'),
        rhythmLanes: byId('rhythmLanes'),
        songOverModal: byId('songOverModal'),
        effectsLayer: byId('effectsLayer'),
        difficultySlider: byId('difficultySlider'),
        diffValue: byId('diffValue'),
        diffLabel: byId('diffLabel'),
        wodContent: byId('wodContent'),
        wodNext: byId('wodNext'),
        rankDisplay: byId('rankDisplay'),
        coolCount: byId('coolCount'),
        greatCount: byId('greatCount'),
        fineCount: byId('fineCount'),
        missCount: byId('missCount'),
        rewardAmount: byId('rewardAmount'),
        rewardBonus: byId('rewardBonus'),
        stageSinger: byId('stageSinger'),
      };
      this.setupEvents();
      // Load difficulty from localStorage if available
      const savedDiff = parseInt(localStorage.getItem('dojoDifficulty') || '', 10);
      if (!Number.isNaN(savedDiff) && savedDiff >= 1 && savedDiff <= 9) {
        State.difficulty = savedDiff;
      }
      if (this.elements.difficultySlider) {
        this.elements.difficultySlider.value = String(State.difficulty);
      }
      this.updateDifficultyDisplay();
      this.updateHUD();
      this.loadWordOfDay();
      // Apply menu covers if available
      this.applyMenuCovers?.();
      // Update mode descriptions initially
      this.updateModeDescriptions?.();
    }
    setupEvents() {
      // Difficulty slider
      this.elements.difficultySlider?.addEventListener('input', (e) => {
        State.difficulty = parseInt(e.target.value, 10);
        State.questionQueue = [];
        localStorage.setItem('dojoDifficulty', String(State.difficulty));
        this.updateDifficultyDisplay();
        this.loadWordOfDay();
        window.SFX?.play?.('ui.move');
      });
      // Typing input handler
      this.elements.typingInput?.addEventListener('input', (e) => {
        if (State.currentGame === 'typing' && State.currentQuestion) {
          Game.checkTypingInput(e.target.value);
        }
      });
      // Direction selectors
      const vocabSel = byId('vocabDirection');
      const kanjiSel = byId('kanjiDirection');
      vocabSel?.addEventListener('change', (e) => {
        State.vocabDirection = e.target.value;
        // Update description text to reflect new vocab direction
        this.updateModeDescriptions();
      });
      kanjiSel?.addEventListener('change', (e) => {
        State.kanjiDirection = e.target.value;
        // Update description text to reflect new kanji direction
        this.updateModeDescriptions();
      });
      // Answer button keyboard shortcuts (QWER)
      document.addEventListener('keydown', (e) => {
        if (!State.isPlaying || State.currentGame === 'typing') return;
        const key = e.key.toLowerCase();
        const idx = ['q', 'w', 'e', 'r'].indexOf(key);
        if (idx !== -1) {
          const btn = this.elements.answerGrid?.querySelectorAll('.answer-btn')[idx];
          btn?.click();
        }
      });
    }
    updateDifficultyDisplay() {
      const labels = [
        'Beginner',
        'Easy',
        'Standard',
        'Hard',
        'Expert',
        'Master',
        'Extreme',
        'Chaos',
        'Impossible',
      ];
      this.elements.diffValue.textContent = State.difficulty;
      this.elements.diffLabel.textContent = labels[State.difficulty - 1] || 'Unknown';
    }

    /**
     * Update the descriptions on the mode buttons to reflect the current
     * direction settings chosen by the user.  This makes the interface
     * clearer by showing exactly what each mode will test.  For example
     * "JP → EN Multiple Choice" or "EN → JP Multiple Choice" for the
     * vocabulary game, and "Meaning → Kanji by Grade" or "Kanji → Meaning
     * by Grade" for the kanji game.  This method should be called on init
     * and whenever the direction selectors change.
     */
    updateModeDescriptions() {
      // Vocab mode description
      const vocabDesc = document.querySelector('.mode-btn.vocab-mode .mode-desc');
      if (vocabDesc) {
        const dir = State.vocabDirection === 'jp-en' ? 'JP → EN' : 'EN → JP';
        vocabDesc.textContent = `${dir} Multiple Choice`;
      }
      // Kanji mode description
      const kanjiDesc = document.querySelector('.mode-btn.kanji-mode .mode-desc');
      if (kanjiDesc) {
        const dir = State.kanjiDirection === 'meaning-kanji' ? 'Meaning → Kanji' : 'Kanji → Meaning';
        kanjiDesc.textContent = `${dir} by Grade`;
      }
      // Typing mode description
      const typingDesc = document.querySelector('.mode-btn.typing-mode .mode-desc');
      if (typingDesc) {
        typingDesc.textContent = `Hiragana & Katakana Typing`;
      }
    }
    updateHUD() {
      // Level
      const lvl = window.Progression?.getProgress?.().level ?? State.userLevel;
      this.elements.userLevel.textContent = lvl;
      // Voltage
      this.elements.voltageBar.style.width = `${clamp(State.voltage, 0, 100)}%`;
      // Combo & score
      this.elements.comboCount.textContent = State.combo;
      this.elements.scoreValue.textContent = (State.score || 0).toLocaleString();
      // Lives
      this.elements.livesContainer?.querySelectorAll('.life').forEach((life, i) => {
        life.classList.toggle('active', i < State.lives);
      });
      // Timer display (never show negative numbers)
      const st = Math.max(0, State.songTimer);
      const m = Math.floor(st / 60);
      const s = String(st % 60).padStart(2, '0');
      this.elements.songTimer.textContent = `${m}:${s}`;
    }
    showJudgment(type) {
      const el = this.elements.judgmentDisplay;
      el.textContent = type;
      el.className = `judgment-display show ${type.toLowerCase()}`;
      setTimeout(() => el.classList.remove('show'), 500);
    }
    async loadWordOfDay() {
      const content = this.elements.wodContent;
      content.innerHTML = '<div class="loading"></div>';
      const wod = await ApiService.fetchWordOfDay(State.difficulty);
      content.innerHTML = wod
        ? `<div class="wod-word">${wod.word || ''}</div><div class="wod-reading">${wod.reading || ''}</div><div class="wod-meaning">${wod.meaning || ''}</div>`
        : '<div class="wod-error">Could not load word</div>';
    }
    nextWordOfDay() {
      return this.loadWordOfDay();
    }
    showQuestion(q) {
      const content = this.elements.questionContent;
      const grid = this.elements.answerGrid;
      if (!content || !grid) return;
      content.style.display = 'block';
      grid.style.display = 'grid';
      if (q.type === 'vocab') {
        if (State.vocabDirection === 'jp-en') {
          content.innerHTML = `<div class="question-jp">${q.prompt.jp}</div><div class="question-sub">${q.reading || ''}</div>`;
        } else {
          content.innerHTML = `<div class="question-sub">English:</div><div class="question-jp">${q.prompt.en || ''}</div>`;
        }
        grid.innerHTML = '';
        q.options.forEach((opt, i) => grid.appendChild(this.makeAnswerBtn(opt, i)));
      } else if (q.type === 'kanji') {
        if (State.kanjiDirection === 'meaning-kanji') {
          content.innerHTML = `<div class="question-sub">Meaning:</div><div class="question-jp">${q.prompt}</div>`;
        } else {
          content.innerHTML = `<div class="question-sub">Kanji:</div><div class="question-jp" style="font-size:60px;">${q.prompt}</div>`;
        }
        grid.innerHTML = '';
        q.options.forEach((opt, i) => grid.appendChild(this.makeAnswerBtn(opt, i)));
      }

      // Update the stage singer without showing the answer initially
      this.updateStageSinger?.(State.currentGame, q, false);
    }
    makeAnswerBtn(option, index) {
      const btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.setAttribute('data-ps', LANE_TYPES[index]);
      btn.innerHTML = `<span class="ps-symbol">${PS_SYMBOLS[index]}</span>${option}`;
      btn.addEventListener('click', () => {
        window.SFX?.play?.('ui.select');
        Game.checkAnswer(option, index);
      });
      return btn;
    }
    startTypingQuestion(q) {
      // Hide multiple choice elements
      this.elements.questionContent.style.display = 'none';
      this.elements.answerGrid.style.display = 'none';
      this.elements.typingArea.style.display = 'block';
      // Compose target line: kanji/surface + hiragana + english
      const surface = q.jp;
      const hira = q.reading;
      const en = q.meaning || '';
      this.elements.typingTarget.textContent = `${surface} 【${hira}】 — ${en}`;
      // Prepare input
      const inp = this.elements.typingInput;
      inp.value = '';
      // Clear any previous hint text and remove the placeholder.  We create
      // a separate hint element that will display the exact key sequence
      // needed once the user makes a mistake.  Until then it remains empty.
      inp.dataset.hint = '';
      if (!this.elements.typingHint) {
        const hintEl = document.createElement('div');
        hintEl.className = 'typing-hint';
        hintEl.id = 'typingHint';
        // Insert the hint just before the feedback element so it sits
        // directly beneath the input field.
        this.elements.typingArea.insertBefore(hintEl, this.elements.typingFeedback);
        this.elements.typingHint = hintEl;
      }
      // Reset hint content at the start of each typing question
      this.elements.typingHint.textContent = '';
      this.elements.typingFeedback.textContent = '';
      inp.focus();
      // Update the stage singer without showing the answer initially
      this.updateStageSinger?.('typing', q, false);

      // Reset mistake flag at the start of each typing question
      State.typingMistakeMade = false;
    }
    showSongOverModal(rank, rewardsDisplay) {
      // Update counts
      this.elements.rankDisplay && (this.elements.rankDisplay.textContent = rank);
      this.elements.coolCount && (this.elements.coolCount.textContent = State.judgmentCounts.COOL);
      this.elements.greatCount && (this.elements.greatCount.textContent = State.judgmentCounts.GREAT);
      this.elements.fineCount && (this.elements.fineCount.textContent = State.judgmentCounts.FINE);
      this.elements.missCount && (this.elements.missCount.textContent = State.judgmentCounts.MISS);
      // Reward display
      if (this.elements.rewardAmount) this.elements.rewardAmount.textContent = rewardsDisplay.total.toLocaleString();
      if (this.elements.rewardBonus) {
        this.elements.rewardBonus.textContent = `Base (${CONFIG.rewards.BASE}) + Score (${rewardsDisplay.score}) + Level (${rewardsDisplay.level}×${CONFIG.rewards.LEVEL_MULT})`;
      }
      this.elements.songOverModal?.classList.add('show');
    }
    applyMenuCovers() {
      const covers = (window.SITE_CONTENT || window.SRC || {})?.images?.menuCovers;
      if (!covers) return;
      const setBg = (el, url) => {
        if (!el || !url) return;
        el.style.background = `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('${url}') center/cover no-repeat`;
      };
      setBg(document.querySelector('.mode-btn.vocab-mode'), covers.vocab);
      setBg(document.querySelector('.mode-btn.kanji-mode'), covers.kanji);
      setBg(document.querySelector('.mode-btn.typing-mode'), covers.kotoba);
    }

    /**
     * Update the on-stage singer image and optional speech bubble based on
     * the current game type and question.  In typing mode the speech bubble
     * will only show when the user makes a mistake. In other modes it only shows
     * when the user selects an incorrect answer.
     * @param {string|null} gameType
     * @param {object|null} q
     * @param {boolean} showAnswer - Whether to show the answer in speech bubble
     */
    updateStageSinger(gameType, q, showAnswer = false) {
      const el = this.elements.stageSinger;
      if (!el) return;
      if (!gameType) {
        el.innerHTML = '';
        return;
      }
      const mikuUrl = window.MikuSystem?.getCurrentMikuUrl?.();
      if (!mikuUrl) {
        el.innerHTML = '';
        return;
      }
      let bubbleText = '';
      // Only show speech bubble when showAnswer is true (on errors)
      if (showAnswer && gameType === 'typing' && q) {
        bubbleText = q.keys || '';
      } else if (showAnswer && q) {
        bubbleText = q.correct || '';
      }
      const imgTag = `<img src="${mikuUrl}" alt="Miku">`;
      const bubbleTag = bubbleText ? `<div class="speech-bubble">${bubbleText}</div>` : '';
      el.innerHTML = imgTag + bubbleTag;
    }
  }
  const byId = (id) => document.getElementById(id);
  const UI = new UIManager();

  // ===== Effects =====
  class EffectsManager {
    static ring(x, y, color) {
      const el = document.createElement('div');
      el.className = 'ring-effect';
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      el.style.borderColor = color;
      UI.elements.effectsLayer.appendChild(el);
      setTimeout(() => el.remove(), 500);
    }
    static burst(x, y, color) {
      for (let i = 0; i < 8; i++) {
        const p = document.createElement('div');
        p.className = 'burst-particle';
        p.style.left = x + 'px';
        p.style.top = y + 'px';
        p.style.background = color;
        p.style.setProperty('--tx', (Math.random() - 0.5) * 100 + 'px');
        p.style.setProperty('--ty', (Math.random() - 0.5) * 100 + 'px');
        UI.elements.effectsLayer.appendChild(p);
        setTimeout(() => p.remove(), 800);
      }
    }
    static spawnNote(laneIndex, durationMs) {
      const lanes = UI.elements.rhythmLanes?.querySelectorAll('.lane');
      const lane = lanes?.[laneIndex];
      if (!lane) return;
      const note = document.createElement('div');
      note.className = `falling-note ${LANE_TYPES[laneIndex]}`;
      note.textContent = PS_SYMBOLS[laneIndex];
      note.style.left = '10px';
      note.style.animationDuration = `${durationMs}ms`;
      // Ensure the note does not jump back to the top after finishing its
      // animation.  Setting animationFillMode to forwards preserves the
      // element's final state until it is removed.
      note.style.animationFillMode = 'forwards';
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
        const idx = State.noteQueues[laneIndex].findIndex((n) => n.element === note);
        if (idx !== -1) State.noteQueues[laneIndex].splice(idx, 1);
      }, durationMs + 200);
      return note;
    }
  }
  const Effects = EffectsManager;

  // ===== HUD / session =====
  class HUDManager {
    constructor() {
      this._maxLives = 5;
      this._notes = 0;
      this.HUD = window.HUD = window.HUD || {};
      this.initializeHUD();
      this.initializeSession();
    }
    initializeHUD() {
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
        'lives',
        () => State.lives,
        (v) => {
          State.lives = v | 0;
          UI.updateHUD();
        }
      );
      def(
        'maxLives',
        () => this._maxLives,
        (v) => {
          this._maxLives = v | 0;
        }
      );
      def(
        'score',
        () => State.score,
        (v) => {
          State.score = v | 0;
          UI.updateHUD();
        }
      );
      def(
        'voltage',
        () => State.voltage,
        (v) => {
          State.voltage = clamp(v | 0, 0, 100);
          UI.updateHUD();
        }
      );
      def(
        'combo',
        () => State.combo,
        (v) => {
          State.combo = v | 0;
          UI.updateHUD();
        }
      );
      def(
        'counts',
        () => State.judgmentCounts,
        (v) => {
          if (v && typeof v === 'object') State.judgmentCounts = v;
        }
      );
      def(
        'notes',
        () => this._notes,
        (v) => {
          this._notes = v | 0;
        }
      );
    }
    flashJudge(cardId, label) {
      const card = document.getElementById(cardId || 'languageDojoCard');
      const el = card?.querySelector('.judge-echo');
      if (el) {
        el.textContent = label;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0) scale(1)';
        setTimeout(() => {
          el.style.opacity = '0';
          el.style.transform = 'translateY(-6px) scale(.96)';
        }, 350);
      }
      this.pulseCard(cardId);
      // Play the appropriate result sound
      const map = {
        COOL: 'result.perfect',
        GREAT: 'result.great',
        FINE: 'result.standard',
        MISS: 'result.miss',
      };
      const id = map[label];
      id && window.SFX?.play?.(id);
    }
    pulseCard(id) {
      const c = document.getElementById(id);
      if (!c) return;
      c.style.transition = 'box-shadow .15s ease, transform .15s ease';
      const pre = c.style.boxShadow;
      c.style.boxShadow = '0 0 0 3px rgba(165,148,249,.65) inset';
      c.style.transform = 'translateY(-1px)';
      setTimeout(() => {
        c.style.boxShadow = pre || '';
        c.style.transform = '';
      }, 160);
    }
    addVoltage(delta, cardId) {
      State.voltage = clamp(State.voltage + (delta || 0), 0, 100);
      UI.updateHUD();
      const card = document.getElementById(cardId);
      if (card) {
        card.style.outline = `2px solid rgba(165,148,249,${Math.min(0.5, 0.1 + State.voltage / 80)})`;
        setTimeout(() => (card.style.outline = ''), 240);
      }
    }
    addCombo(cardId) {
      State.combo++;
      UI.updateHUD();
      const el = document.getElementById(cardId)?.querySelector('.judge-echo');
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
      this.flashJudge(cardId, 'MISS');
      if (State.lives <= 0) {
        this.Session?.finish?.({ reason: 'lives' });
      }
    }
    awardHearts(n) {
      window.Hearts?.add?.(n) || window.hearts?.addHearts?.(n);
    }
    addXP(n) {
      window.Progression?.addXp?.(n) || window.Progression?.addXP?.(n);
    }
    // Determine the rank based on final score.  Uses CONFIG.rankThresholds.
    calcRank() {
      const score = State.score;
      for (const { score: threshold, rank } of CONFIG.rankThresholds) {
        if (score >= threshold) return rank;
      }
      return 'D';
    }
    // Calculate rewards (hearts & XP).  Both hearts and XP are equal to
    // BASE + final score + LEVEL_MULT × level.  A single number is returned.
    rewards() {
      const level = window.Progression?.getProgress?.().level || State.userLevel || 1;
      const total = CONFIG.rewards.BASE + (State.score | 0) + level * CONFIG.rewards.LEVEL_MULT;
      return { total, level, score: State.score | 0 };
    }
    initializeSession() {
      this.Session = window.Session = window.Session || (() => {
        let tId = null;
        let endsAt = 0;
        const renderTimer = () => {
          const remain = Math.max(0, Math.floor((endsAt - Date.now()) / 1000));
          const el = byId('hudLevelText');
          if (el) {
            const m = Math.floor(remain / 60);
            const s = String(remain % 60).padStart(2, '0');
            el.textContent = `Session ${m}:${s}`;
          }
          if (remain <= 0) finish({ reason: 'time' });
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
          // Award hearts and XP at the end of the session
          hudManager.awardHearts(rewards.total);
          hudManager.addXP(rewards.total);
          // Pop a toast if available
          const msg = `Session complete — Rank ${rank}. +${rewards.total.toLocaleString()} hearts & XP!`;
          window.hearts?.lovetoast?.(msg) || (function () {
            const t = document.createElement('div');
            t.style.cssText = 'position:fixed;left:50%;top:20px;transform:translateX(-50%);background:#fff;border:2px solid var(--border);border-radius:10px;padding:10px 14px;box-shadow:var(--shadow);z-index:99999;color:#2b2b44;font-weight:700';
            t.textContent = msg;
            document.body.appendChild(t);
            setTimeout(() => t.remove(), 2200);
          })();
        };
        return { start, finish };
      })();
      // Tie session start to global events if the site has a global session manager
      document.addEventListener('vocab-start', () => this.Session.start());
      document.addEventListener('kanji-start', () => this.Session.start());
      document.addEventListener('kotoba-start', () => this.Session.start());
      document.addEventListener('miku-chat-start', () => this.Session.start());
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
      window.SFX?.play?.('start');
      UI.elements.menuPanel.style.display = 'none';
      UI.elements.gameArea.style.display = 'block';
      // Toggle the typing-active class on the body so CSS can adjust layout
      if (typeof document !== 'undefined' && document.body) {
        document.body.classList.toggle('typing-active', gameType === 'typing');
      }
      // If a global HUD exists attach it
      window.attachDivaHud?.('languageDojoCard');
      if (window.DivaSessionOptIn) {
        const evtName =
          gameType === 'vocab'
            ? 'vocab-start'
            : gameType === 'kanji'
            ? 'kanji-start'
            : 'kotoba-start';
        document.dispatchEvent(new Event(evtName));
      }
      Object.assign(window.HUD || {}, {
        lives: 5,
        score: 0,
        voltage: 0,
        combo: 0,
      });
      // Setup UI for typing vs multiple choice
      if (gameType === 'typing') {
        UI.elements.answerGrid.style.display = 'none';
        UI.elements.typingArea.style.display = 'block';
        UI.elements.rhythmLanes.style.display = 'none';
      } else {
        UI.elements.answerGrid.style.display = 'grid';
        UI.elements.typingArea.style.display = 'none';
        UI.elements.rhythmLanes.style.display = 'flex';
        this.noteInterval = setInterval(() => {
          Effects.spawnNote(
            Math.floor(Math.random() * 4),
            getNoteDurationMs()
          );
        }, Math.max(
          CONFIG.notes.SPAWN_MIN_MS,
          CONFIG.notes.SPAWN_BASE_MS - State.difficulty * CONFIG.notes.SPAWN_DIFF_STEP_MS
        ));
      }

      // Initialise the stage singer when a game starts (no question yet) so the
      // image appears even before the first question loads.
      UI.updateStageSinger?.(gameType, null);
      this.songInterval = setInterval(() => this.updateSongTimer(), 1000);
      this.nextQuestion();
    }
    updateSongTimer() {
      State.songTimer--;
      if (State.songTimer <= 0) {
        this.endSong();
      }
      UI.updateHUD();
    }
    updateQuestionTimer() {
      State.questionTimer--;
      if (State.questionTimer <= 0) {
        this.timeUp();
        return;
      }
      const pct = (State.questionTimer / CONFIG.timers.QUESTION_S) * 100;
      UI.elements.questionTimerBar.style.width = pct + '%';
      UI.elements.questionTimerText.textContent = State.questionTimer;
    }
    async nextQuestion() {
      // Ensure we have at least one question ready
      if (!State.questionQueue.length) {
        const gen =
          State.currentGame === 'vocab'
            ? QuestionGenerator.vocab
            : State.currentGame === 'kanji'
            ? QuestionGenerator.kanji
            : QuestionGenerator.typing;
        const q = await gen();
        if (q) State.questionQueue.push(q);
      }
      const q = State.questionQueue.shift();
      if (!q) return console.error('No questions available');
      State.currentQuestion = q;
      State.questionTimer = CONFIG.timers.QUESTION_S;
      clearInterval(this.questionInterval);
      this.questionInterval = setInterval(() => this.updateQuestionTimer(), 1000);
      if (State.currentGame === 'typing') {
        // Record start time for timing calculations
        q.startTime = Date.now();
        State.typingMaxTier = 'COOL';
        UI.startTypingQuestion(q);
        window.SFX?.play?.('ui.teleport');
      } else {
        UI.showQuestion(q);
        window.SFX?.play?.('ui.change');
      }
    }
    checkAnswer(answer, buttonIndex) {
      if (!State.currentQuestion) return;
      // correct if answer matches
      const correct = answer === State.currentQuestion.correct;
      if (!correct) {
        // Wrong answers: show speech bubble with correct answer and treat as MISS
        UI.updateStageSinger?.(State.currentGame, State.currentQuestion, true);
        this.processJudgment('MISS', false);
        return;
      }
      // On correct answer determine judgment by note proximity
      let label = 'FINE';
      if (buttonIndex != null) {
        label = judgeFrontAndMaybeConsume(buttonIndex);
      }
      this.processJudgment(label, true);
      // Disable buttons to prevent double clicks and schedule next question
      UI.elements.answerGrid?.querySelectorAll('.answer-btn').forEach((btn) => (btn.disabled = true));
      setTimeout(() => {
        if (State.isPlaying) this.nextQuestion();
      }, 700);
    }
    checkTypingInput(input) {
      if (!State.currentQuestion) return;
      const q = State.currentQuestion;
      // Normalised kana reading and canonical key sequence
      const kanaTarget = Kana.normalize(Kana.kataToHira(q.reading));
      const keysTarget = Kana.normalize(q.keys || '');
      // Normalise the user's typed input (accept romaji or kana)
      let typedRaw = Kana.normalize(Kana.kataToHira(input));
      // Unify romaji synonyms to canonical forms for comparison.  This allows
      // different IME spellings (e.g. "si" for し or "ti" for ち) to be
      // accepted.  The keysTarget is assumed to be canonical; we perform the
      // same normalisation on it for completeness.
      const unifySynonyms = (str, targetKeys) => {
        let s = str;
        // Long vowel dash: unify Japanese long dash and hyphen
        s = s.replace(/ー/g, '-');
        // Common IME variations
        s = s.replace(/si/g, 'shi');
        s = s.replace(/ti/g, 'chi');
        s = s.replace(/tu/g, 'tsu');
        s = s.replace(/hu/g, 'fu');
        s = s.replace(/zi/g, 'ji');
        // If the expected keys are 'du' (づ) accept 'dzu' or 'zu'
        if (targetKeys === 'du') {
          s = s.replace(/dzu/g, 'du');
          s = s.replace(/zu/g, 'du');
        }
        // If the expected keys are 'di' (ぢ) accept 'ji'
        if (targetKeys === 'di') {
          s = s.replace(/ji/g, 'di');
        }
        return s;
      };
      const unifiedTyped = unifySynonyms(typedRaw, keysTarget);
      const unifiedKeys = unifySynonyms(keysTarget, keysTarget);
      // If the player has completed the answer (either the kana reading or
      // the romanised key sequence) judge based on remaining time.  Do not
      // penalise mid-typing mistakes; judgment depends solely on how much
      // time is left when the answer is complete.
      if (unifiedTyped === kanaTarget || unifiedTyped === unifiedKeys) {
        clearInterval(this.questionInterval);
        const remaining = State.questionTimer;
        let judgment;
        // Determine grade based on remaining seconds: ≤3→FINE, ≤6→GREAT, else→COOL
        if (remaining <= 3) {
          judgment = 'FINE';
        } else if (remaining <= 6) {
          judgment = 'GREAT';
        } else {
          judgment = 'COOL';
        }
        this.processJudgment(judgment, true);
        UI.elements.typingFeedback.textContent = 'Correct!';
        UI.elements.typingFeedback.className = 'typing-feedback correct';
        // Clear hint after correct answer
        if (UI.elements.typingHint) {
          UI.elements.typingHint.style.display = 'none';
        }
        setTimeout(() => {
          if (State.isPlaying) this.nextQuestion();
        }, 600);
        return;
      }
      // If current input is a prefix of the expected reading or keys (after
      // normalisation) do nothing.  This prevents premature hints while the
      // user is still typing correctly.
      if (kanaTarget.startsWith(typedRaw) || unifiedKeys.startsWith(unifiedTyped)) {
        UI.elements.typingFeedback.textContent = '';
        return;
      }
      // A wrong keystroke: show the hint if not already shown.
      if (!State.typingMistakeMade) {
        State.typingMistakeMade = true;
        // Show speech bubble with answer
        UI.updateStageSinger?.('typing', q, true);
        const inpEl = UI.elements.typingInput;
        if (inpEl) {
          inpEl.dataset.hint = q.keys;
        }
      }
      // Keep feedback empty to avoid flicker on mistakes
      UI.elements.typingFeedback.textContent = '';
    }
    processJudgment(judgment, correct) {
      State.judgmentCounts[judgment] = (State.judgmentCounts[judgment] || 0) + 1;
      if (correct) {
        // Add score and update combo/voltage
        const base = CONFIG.scoringPerHit[judgment] || 0;
        const comboBonus = Math.floor(State.combo * 0.1);
        const difficultyBonus = State.difficulty * 50;
        State.score += Math.round(base + comboBonus + difficultyBonus);
        State.combo++;
        State.maxCombo = Math.max(State.maxCombo, State.combo);
        const vDelta = CONFIG.voltagePerHit[judgment] || 0;
        State.voltage = clamp(State.voltage + vDelta, 0, 100);
        // Quest progress updates
        State.questProgress.score = Math.max(State.questProgress.score, State.score);
        if (judgment === 'COOL') State.questProgress.coolHits++;
        State.questProgress.maxCombo = Math.max(State.questProgress.maxCombo, State.combo);
        // Effects and HUD updates
        const cx = innerWidth / 2;
        const cy = innerHeight / 2;
        const colors = { COOL: '#35a7ff', GREAT: '#00c853', FINE: '#ffb300' };
        Effects.ring(cx, cy, colors[judgment] || '#aaa');
        Effects.burst(cx, cy, colors[judgment] || '#aaa');
        // Update global HUD counts
        if (window.HUD) {
          window.HUD.counts = window.HUD.counts || { COOL: 0, GREAT: 0, FINE: 0, SAD: 0 };
          window.HUD.counts[judgment] = (window.HUD.counts[judgment] || 0) + 1;
        }
        hudManager.flashJudge('languageDojoCard', judgment);
        hudManager.addVoltage(CONFIG.voltagePerHit[judgment] || 0, 'languageDojoCard');
        hudManager.addCombo('languageDojoCard');
      } else {
        // Wrong answer: reset combo and lose life
        State.combo = 0;
        hudManager.resetCombo();
        hudManager.loseLife('languageDojoCard');
        window.SFX?.play?.('result.miss');
        if (State.lives <= 0) {
          this.endSong();
          return;
        }
      }
      UI.showJudgment(judgment);
      UI.updateHUD();
    }
    timeUp() {
      window.SFX?.play?.('quiz.timeup');
      // On timeout treat as MISS and highlight correct answer
      this.processJudgment('MISS', false);
      // If this was a multiple choice question, highlight the correct answer visually
      if (State.currentGame !== 'typing' && State.currentQuestion) {
        const correct = State.currentQuestion.correct;
        UI.elements.answerGrid?.querySelectorAll('.answer-btn').forEach((btn) => {
          if (btn.textContent.includes(correct)) {
            btn.classList.add('correct');
          }
          btn.disabled = true;
        });
      }
      setTimeout(() => {
        if (State.isPlaying) this.nextQuestion();
      }, 700);
    }
    endSong() {
      State.isPlaying = false;
      clearInterval(this.songInterval);
      clearInterval(this.questionInterval);
      clearInterval(this.noteInterval);
      // Remove remaining notes
      State.noteQueues.forEach((q, i) => {
        q.forEach((n) => n.element?.remove());
        State.noteQueues[i] = [];
      });
      // Finish session (awards hearts & XP)
      hudManager.Session?.finish?.({ reason: 'time' });
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
      UI.elements.songOverModal?.classList.remove('show');
      UI.elements.gameArea.style.display = 'none';
      UI.elements.menuPanel.style.display = 'block';
      State.lives = 5;
      // Remove the typing-active class and clear the singer when returning
      if (typeof document !== 'undefined' && document.body) {
        document.body.classList.remove('typing-active');
      }
      UI.updateStageSinger?.(null, null);
      UI.updateHUD();
    }
  }
  const Game = new GameEngine();

  // ===== Note judging helpers =====
  function getNoteDurationMs() {
    const dur = CONFIG.notes.BASE_FALL_MS - State.difficulty * CONFIG.notes.PER_DIFF_MS;
    return clamp(dur, CONFIG.notes.MIN_FALL_MS, CONFIG.notes.MAX_FALL_MS);
  }
  function getLaneTarget(laneIndex) {
    const lane = UI.elements.rhythmLanes?.querySelectorAll('.lane')?.[laneIndex];
    if (!lane) return null;
    return (
      lane.querySelector('.target') ||
      lane.querySelector('.rhythm-target') ||
      lane.querySelector('.hit-zone') ||
      lane
    );
  }
  function rectsIntersect(a, b) {
    return !(
      a.right < b.left ||
      a.left > b.right ||
      a.bottom < b.top ||
      a.top > b.bottom
    );
  }
  function distanceToTargetTop(noteEl, targetEl) {
    const n = noteEl.getBoundingClientRect();
    const t = targetEl.getBoundingClientRect();
    return Math.abs(n.top - t.top);
  }
  function getClosestIndex(laneIndex) {
    const target = getLaneTarget(laneIndex);
    const queue = State.noteQueues[laneIndex];
    if (!target || !queue.length) return -1;
    let bestIdx = 0;
    let bestDist = Infinity;
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
    if (!target || !queue.length) return 'FINE';
    const idx = getClosestIndex(laneIndex);
    if (idx === -1) return 'FINE';
    const note = queue[idx];
    const dist = distanceToTargetTop(note.element, target);
    let label;
    if (dist <= CONFIG.judge.COOL_PX) {
      label = 'COOL';
    } else {
      const nRect = note.element.getBoundingClientRect();
      const tRect = target.getBoundingClientRect();
      if (rectsIntersect(nRect, tRect) || dist <= CONFIG.judge.GREAT_PX) {
        label = 'GREAT';
      } else {
        label = 'FINE';
      }
    }
    if (label !== 'FINE') {
      queue.splice(idx, 1);
      note.element.remove();
    }
    return label;
  }

  // ===== Global functions =====
  window.startGame = function (gameType) {
    window.SFX?.play?.('ui.select');
    Game.start(gameType);
  };
  window.nextWordOfDay = function () {
    window.SFX?.play?.('ui.change');
    UI.nextWordOfDay();
  };
  window.backToMenu = function () {
    window.SFX?.play?.('ui.back');
    Game.backToMenu();
  };

  // ===== Initialize on DOM ready =====
  document.addEventListener('DOMContentLoaded', () => {
    UI.init();
    UI.applyMenuCovers?.();
    console.log('Language Dojo × Project DIVA initialised!');
  });
  console.log('Language Dojo initialised!');
})();