// Study tab restoration: builds UI, mounts games, and wires HUD controls
(function () {
  function ensureStudyGrid() {
    const grid = document.getElementById("jpGames");
    if (!grid) return null;
    if (grid.dataset.wired === "1") return grid;
    grid.dataset.wired = "1";
    const C = window.SITE_CONTENT || {};
    const wod = (C.study && C.study.wordOfDay) || window.WOD || {};
    const wodIframeSrc =
      (C.study && C.study.wordOfDay && C.study.wordOfDay.externalIframe) ||
      "https://kanjiday.com/kanji/";
    grid.innerHTML = `
    <div class="study-card" id="studyControls" style="grid-column:1 / -1;display:flex;align-items:center;gap:8px">
      <label for="studyDifficulty">Difficulty</label>
      <input type="range" id="studyDifficulty" min="1" max="5" value="1" />
      <span id="studyDifficultyLabel">1</span>
      <span class="spacer"></span>
      <span>⏱️ <strong id="songTimer">180</strong>s</span>
      <span>❤️ <strong id="studyLives">5</strong>/5</span>
      <span>⏳ <strong id="questionTimer">15</strong>s</span>
    </div>
    <div class="study-card" id="wodCard" style="grid-column: 1 / -1; display:grid; grid-template-columns: 1fr 1fr; gap:12px; align-items:stretch; position:relative;">
        <div class="word-of-day" style="padding:10px;border:2px solid var(--border);border-radius:12px;background:#fff;">
      <h3 style="margin-top:0;display:flex;align-items:center;justify-content:space-between;gap:8px">📖 Word of the Day <button id="wodNext" class="pixel-btn" title="Next word">Next</button></h3>
          <div style="font-size:22px;font-weight:900" class="japanese">${wod.japanese || ""}</div>
          <div class="romaji" style="opacity:.8">${wod.romaji || ""}</div>
          <div class="meaning">${wod.meaning || ""}</div>
        </div>
        <div class="wod-iframe" style="min-height:320px;border:2px solid var(--border);border-radius:12px;overflow:hidden;background:#fff;position:relative">
          <iframe id="wodIframe" src="${wodIframeSrc}" loading="lazy" referrerpolicy="no-referrer"></iframe>
        </div>
        <img class="hud-miku" alt="Miku" src="./assets/pixiebel.gif" />
      </div>
      <!-- Game selection tiles (landing view) -->
      <div class="study-card" id="gameTiles" style="grid-column:1 / -1;display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
        <button class="pixel-btn" data-game="vocab">🗣️ Vocab</button>
        <button class="pixel-btn" data-game="kanji">漢字 Kanji</button>
        <button class="pixel-btn" data-game="kotoba">ことば Kotoba</button>
        <button class="pixel-btn" data-game="mikuChat">💬 Miku × Chat</button>
      </div>
      <div class="game-widget" id="vocabCard" style="display:none;position:relative">
        <img class="hud-miku" alt="Miku" src="./assets/pixiebel.gif" />
        <h3>🗣️ Vocab</h3>
        <div id="vocabQuestion"></div>
        <div id="vocabChoices" class="beatpad-grid"></div>
        <div id="vocabMeta" class="mode-row">
          <button class="pixel-btn mode-option active" data-mode="jp-en">JP→EN</button>
          <button class="pixel-btn mode-option" data-mode="en-jp">EN→JP</button>
        </div>
        <div class="hud-line">
          <span>Score: <strong id="vocabScore">0</strong></span>
          <span>Streak: <strong id="vocabStreak">0</strong> • Best Streak <strong id="vocabBestStreak">0</strong></span>
          <span id="vocabTimerWrap" style="display:none">⏱️ <strong id="vocabTimer">15</strong>s</span>
          <span>PB: <strong id="vocabBestTime">-</strong></span>
        </div>
        <div id="vocabFeedback" class="diva-feedback-enhanced" style="display:none"></div>
      </div>
      <div class="game-widget" id="kanjiCard" style="display:none;position:relative">
        <img class="hud-miku" alt="Miku" src="./assets/pixiebel.gif" />
        <h3>漢字 Kanji</h3>
        <div class="mode-row" id="kanjiMeta">
          <button class="pixel-btn mode-option active" data-mode="meaning">Meaning→Kanji</button>
          <button class="pixel-btn mode-option" data-mode="reading">Kanji→Reading</button>
        </div>
        <div id="kanjiQuestion"></div>
        <div id="kanjiChoices" class="beatpad-grid"></div>
        <div class="hud-line">
          <span>Score: <strong id="kanjiScore">0</strong></span>
          <span>Streak: <strong id="kanjiStreak">0</strong> • Best Streak <strong id="kanjiBestStreak">0</strong></span>
          <span id="kanjiTimerWrap" style="display:none">⏱️ <strong id="kanjiTimer">15</strong>s</span>
          <span>PB: <strong id="kanjiBestTime">-</strong></span>
        </div>
        <div id="kanjiFeedback" class="diva-feedback-enhanced" style="display:none"></div>
      </div>
      <div class="game-widget" id="kotobaCard" style="display:none;position:relative">
        <img class="hud-miku" alt="Miku" src="./assets/pixiebel.gif" />
        <h3>ことば Kotoba</h3>
        <div id="kotobaChat" class="chat-transcript" style="display:flex;flex-direction:column;gap:6px;padding:8px;border-radius:10px;background:#fff;border:2px solid var(--border);max-height:220px;overflow:auto"></div>
        <div id="kotobaChoices" class="chat-choices" style="display:flex;flex-direction:column;gap:8px"></div>
        <div class="hud-line">
          <span>Score: <strong id="kotobaScore">0</strong></span>
          <span>Streak: <strong id="kotobaStreak">0</strong> • Best Streak <strong id="kotobaBestStreak">0</strong></span>
          <span id="kotobaTimerWrap" style="display:none">⏱️ <strong id="kotobaTimer">20</strong>s</span>
          <span>PB: <strong id="kotobaBestTime">-</strong></span>
          <button id="kotobaStart" class="pixel-btn">Start</button>
        </div>
        <div id="kotobaFeedback" class="diva-feedback-enhanced" style="display:none"></div>
      </div>
      <div class="game-widget" id="mikuChatCard" style="display:none;position:relative">
        <img class="hud-miku" alt="Miku" src="./assets/pixiebel.gif" />
        <h3>💬 Miku × Chat</h3>
        <div id="mikuChatTranscript" class="chat-transcript" style="display:flex;flex-direction:column;gap:6px;padding:8px;border-radius:10px;background:#fff;border:2px solid var(--border);max-height:240px;overflow:auto"></div>
        <div id="mikuChatChoices" class="beatpad-grid"></div>
        <div class="hud-line">
          <button id="mikuChatStart" class="pixel-btn">Start</button>
          <span class="spacer"></span>
          <span>Rhythm: falling beats enabled</span>
        </div>
      </div>
    <div id="songOverPanel" class="study-card" style="display:none;grid-column:1 / -1;text-align:center;padding:20px;position:relative;">
      <div class="result-rings"><div class="ring"></div><div class="ring"></div><div class="ring"></div></div>
      <h3>Song Over - <span class="reason"></span></h3>
      <div class="rank-line">Rank <span class="rank">C</span> • Score <span class="score">0</span></div>
      <div class="counts" style="margin:6px 0">COOL 0 • GREAT 0 • FINE 0 • MISS 0</div>
      <div class="reward" style="font-weight:800;margin-bottom:8px"></div>
      <button id="songOverClose" class="pixel-btn">Close</button>
    </div>`;
    return grid;
  }

  function wireHudControls() {
    const selGame = document.getElementById("hudGame");
    const selMode = document.getElementById("hudMode");
    if (selGame && selMode && !selGame.dataset.wired) {
      selGame.dataset.wired = "1";
      const startSelected = () => {
        const g = selGame.value;
        const m = selMode.value;
        // Show only selected game
        ["vocabCard","kanjiCard","kotobaCard","mikuChatCard"].forEach((id)=>{
          const el = document.getElementById(id);
          if (!el) return;
          el.style.display = id.startsWith(g) ? "block" : "none";
        });
        // route via dispatcher
        window.__startSong && window.__startSong(g, m, false);
        window.StudyHub && StudyHub.start(g);
      };
      selGame.addEventListener("change", startSelected);
      selMode.addEventListener("change", startSelected);
      // Landing tiles route
      const tiles = document.getElementById("gameTiles");
      if (tiles) {
        tiles.addEventListener("click", (e)=>{
          const b = e.target.closest("button[data-game]");
          if (!b) return;
          const g = b.getAttribute("data-game");
          if (selGame) selGame.value = g;
          tiles.style.display = "none"; // hide landing tiles once a game is chosen
          startSelected();
        });
      }
    }
  }

  async function refreshWod() {
    const card = document.getElementById("wodCard");
    if (!card) return;
    const jpEl = card.querySelector(".japanese");
    const romajiEl = card.querySelector(".romaji");
    const meaningEl = card.querySelector(".meaning");
    try {
      // Try to pull a fresh word similar to WOD prefetch
      const page = Math.floor(Math.random() * 50) + 1;
      const url = `https://jisho.org/api/v1/search/words?keyword=%23common&page=${page}`;
      const fetchJson = async (u) => {
        try {
          const r = await fetch(u, { cache: "no-store" });
          if (r.ok) return await r.json();
        } catch (_) {}
        try {
          const rr = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(u)}`);
          if (rr.ok) {
            const jj = await rr.json();
            if (jj && jj.contents) return JSON.parse(jj.contents);
          }
        } catch (_) {}
        try {
          const rr2 = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`);
          if (rr2.ok) return await rr2.json();
        } catch (_) {}
        return null;
      };
      const json = await fetchJson(url);
      const arr = Array.isArray(json?.data) ? json.data : [];
      if (!arr.length) throw new Error("no-data");
      const pick = arr[Math.floor(Math.random() * arr.length)];
      const word = (pick.japanese && (pick.japanese[0].word || pick.japanese[0].reading)) || "";
      const reading = (pick.japanese && pick.japanese[0].reading) || "";
      const meaning = (pick.senses && pick.senses[0]?.english_definitions?.[0]) || "";
      if (jpEl) jpEl.textContent = word || reading || "";
      if (romajiEl) romajiEl.textContent = reading || "";
      if (meaningEl) meaningEl.textContent = meaning || "";
    } catch (e) {
      if (meaningEl) meaningEl.textContent = "(offline) try again";
    }
  }

  function initChatGame() {
    const chat = document.getElementById("mikuChatTranscript");
    const grid = document.getElementById("mikuChatChoices");
    const startBtn = document.getElementById("mikuChatStart");
    if (!chat || !grid || !startBtn) return;
    async function realReply(prompt) {
      // Use a safe public API as placeholder: quotable.io random quote
      try {
        const r = await fetch("https://api.quotable.io/random?tags=happiness|inspirational", { cache: "no-store" });
        if (!r.ok) throw new Error("net");
        const j = await r.json();
        return j && (j.content || "うん！");
      } catch (_) {
        return "うん！";
      }
    }
    function say(text, from = "miku") {
      const b = document.createElement("div");
      b.style.cssText =
        "padding:8px 12px;border-radius:12px;max-width:88%;box-shadow:var(--shadow);";
      if (from === "miku") {
        b.style.background = "linear-gradient(45deg,#BDE3FF,#CFF6E6)";
        b.style.alignSelf = "flex-start";
        b.textContent = "ミク: " + text;
      } else {
        b.style.background = "linear-gradient(45deg,#FFD1EC,#E6D1FF)";
        b.style.alignSelf = "flex-end";
        b.textContent = "あなた: " + text;
      }
      chat.appendChild(b);
      chat.scrollTop = chat.scrollHeight;
    }
    function round() {
      grid.innerHTML = "";
      say("元気？次はどれにする？", "miku");
      const opts = ["歌って!", "日本語の勉強!", "ゲームしよ!", "またね!"];
      opts.forEach((opt, idx) => {
        const maker =
          window.createUltimateBeatpadButton ||
          ((label) => {
            const b = document.createElement("button");
            b.className = "pixel-btn beatpad-btn";
            b.textContent = label;
            return { btn: b, style: { isPerfect: false, color: "#a594f9" } };
          });
        const { btn } = maker(opt, idx, async (text) => {
          say(text, "you");
          // Show thinking then call realReply
          const thinking = document.createElement("div");
          thinking.style.cssText = "opacity:.8;font-style:italic;padding:4px 8px;align-self:flex-start";
          thinking.textContent = "ミク: ……";
          chat.appendChild(thinking);
          chat.scrollTop = chat.scrollHeight;
          const api = await realReply(text);
          thinking.remove();
          if (text === "歌って!") say("ららら〜♪", "miku");
          else if (text === "日本語の勉強!") say("ことばカード行こう！", "miku");
          else if (text === "ゲームしよ!") say("ボカロタイピング？", "miku");
          else if (api) say(api, "miku");
          else say("またね！", "miku");
          setTimeout(round, 800);
        });
        grid.appendChild(btn);
      });
      createFallingBeatsSystem && createFallingBeatsSystem(grid);
      setupUltimateBeatpadKeyboard &&
        setupUltimateBeatpadKeyboard(grid, (text) => {
          const target = Array.from(grid.querySelectorAll(".beatpad-btn")).find(
            (b) => b.textContent === text,
          );
          if (target) target.click();
        });
    }
    startBtn.addEventListener("click", () => {
      chat.innerHTML = "";
      round();
    });
    document.addEventListener("miku-chat-start", () => {
      chat.innerHTML = "";
      round();
    });
  }

  function mountGames() {
    // Let existing game modules wire themselves to the generated DOM
    window.Games?.vocab?.mount && window.Games.vocab.mount();
    window.Games?.kanji?.mount && window.Games.kanji.mount();
    window.Games?.kotoba?.mount && window.Games.kotoba.mount();
    initChatGame();
  }

  function init() {
    const grid = ensureStudyGrid();
    if (!grid) return;
    wireHudControls();
  const next = document.getElementById("wodNext");
  if (next) next.addEventListener("click", refreshWod);
  mountGames();
  window.StudyHub && StudyHub.init();
  // Landing view: show tiles only; games hidden until selection
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();
})();
