// Study tab restoration: builds UI, mounts games, and wires HUD controls
(function () {
  function ensureStudyGrid() {
    const grid = document.getElementById("jpGames");
    if (!grid) return null;
    if (grid.dataset.wired === "1") return grid;
    grid.dataset.wired = "1";
    const C = window.SITE_CONTENT || {};
    const DJ = (C.study && C.study.dojo) || {};
    const UI = DJ.ui || {};
    const wod = (C.study && C.study.wordOfDay) || window.WOD || {};
    function t(x, fb){ return x || fb; }
    const tDiff = t(UI.controls?.difficulty, 'Difficulty');
    const tWodTitle = t(DJ.wod?.title, 'Word of the Day');
    const tWodNext = t(DJ.wod?.next, 'Next');
    const tTiles = UI.tiles || {};
    const tVocab = t(tTiles.vocab, 'Vocab');
    const tKanji = t(tTiles.kanji, 'Kanji');
    const tKotoba = t(tTiles.kotoba, 'Kotoba');
    const tChat = t(tTiles.chat, 'Miku × Chat');
    const tScore = t(UI.score, 'Score');
    const tStreak = t(UI.streak, 'Streak');
    const tBestStreak = t(UI.bestStreak, 'Best Streak');
    const tPB = t(UI.pb, 'PB');
    const tSec = t(UI.secondsSuffix, 's');
    const tStart = t(UI.start, 'Start');
    const tSend = t(UI.send, 'Send');
    const tType = t(UI.typeMessage, 'Type a message');
    const so = UI.songOver || {};
    const tSO = { title: t(so.title,'Song Over'), rank: t(so.rank, 'Rank'), score: t(so.score,'Score'), close: t(so.close,'Close') };

    grid.innerHTML = `
    <div class="study-card" id="studyControls" style="grid-column:1 / -1;display:flex;align-items:center;gap:8px">
      <label for="studyDifficulty">${tDiff}</label>
      <input type="range" id="studyDifficulty" min="1" max="9" value="1" />
      <span id="studyDifficultyLabel">1</span>
      <span class="spacer"></span>
      <span>⏱️ <strong id="songTimer">180</strong>${tSec}</span>
      <span>❤️ <strong id="studyLives">5</strong>/5</span>
      <span>⏳ <strong id="questionTimer">15</strong>${tSec}</span>
    </div>
    <div class="study-card" id="wodCard" style="grid-column: 1 / -1; display:grid; grid-template-columns: 1fr; gap:12px; align-items:stretch; position:relative;">
        <div class="word-of-day" style="padding:10px;border:2px solid var(--border);border-radius:12px;background:#fff;">
      <h3 style="margin-top:0;display:flex;align-items:center;justify-content:space-between;gap:8px">📖 ${tWodTitle} <button id="wodNext" class="pixel-btn" title="${tWodNext}">${tWodNext}</button></h3>
          <div style="font-size:22px;font-weight:900" class="japanese">${wod.japanese || ""}</div>
          <div class="romaji" style="opacity:.8">${wod.romaji || ""}</div>
          <div class="meaning">${wod.meaning || ""}</div>
        </div>
      </div>
      <div class="study-card widget" id="questsWidget" style="grid-column:1 / -1;"></div>
      <!-- Game selection tiles (landing view) -->
      <div class="study-card" id="gameTiles" style="grid-column:1 / -1;display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
        <button class="pixel-btn" data-game="vocab">🗣️ ${tVocab}</button>
        <button class="pixel-btn" data-game="kanji">漢字 ${tKanji}</button>
        <button class="pixel-btn" data-game="kotoba">ことば ${tKotoba}</button>
        <button class="pixel-btn" data-game="mikuChat">💬 ${tChat}</button>
      </div>
      <div class="game-widget" id="vocabCard" style="display:none;position:relative">
        <h3>🗣️ ${tVocab}</h3>
        <div id="vocabQuestion"></div>
        <div id="vocabChoices" class="beatpad-grid"></div>
        <div id="vocabMeta" class="mode-row">
          <button class="pixel-btn mode-option active" data-mode="jp-en">JP→EN</button>
          <button class="pixel-btn mode-option" data-mode="en-jp">EN→JP</button>
        </div>
        <div class="hud-line">
          <span>${tScore}: <strong id="vocabScore">0</strong></span>
          <span>${tStreak}: <strong id="vocabStreak">0</strong> • ${tBestStreak} <strong id="vocabBestStreak">0</strong></span>
          <span id="vocabTimerWrap" style="display:none">⏱️ <strong id="vocabTimer">15</strong>${tSec}</span>
          <span>${tPB}: <strong id="vocabBestTime">-</strong></span>
        </div>
        <div id="vocabFeedback" class="diva-feedback-enhanced" style="display:none"></div>
      </div>
      <div class="game-widget" id="kanjiCard" style="display:none;position:relative">
        <h3>漢字 ${tKanji}</h3>
        <div class="mode-row" id="kanjiMeta">
          <button class="pixel-btn mode-option active" data-mode="meaning">Meaning→Kanji</button>
          <button class="pixel-btn mode-option" data-mode="reading">Kanji→Reading</button>
        </div>
        <div id="kanjiQuestion"></div>
        <div id="kanjiChoices" class="beatpad-grid"></div>
        <div class="hud-line">
          <span>${tScore}: <strong id="kanjiScore">0</strong></span>
          <span>${tStreak}: <strong id="kanjiStreak">0</strong> • ${tBestStreak} <strong id="kanjiBestStreak">0</strong></span>
          <span id="kanjiTimerWrap" style="display:none">⏱️ <strong id="kanjiTimer">15</strong>${tSec}</span>
          <span>${tPB}: <strong id="kanjiBestTime">-</strong></span>
        </div>
        <div id="kanjiFeedback" class="diva-feedback-enhanced" style="display:none"></div>
      </div>
      <div class="game-widget" id="kotobaCard" style="display:none;position:relative">
        <h3>ことば ${tKotoba}</h3>
        <div id="kotobaChat" class="chat-transcript" style="display:flex;flex-direction:column;gap:6px;padding:8px;border-radius:10px;background:#fff;border:2px solid var(--border);max-height:220px;overflow:auto"></div>
        <div id="kotobaChoices" class="chat-choices" style="display:flex;flex-direction:column;gap:8px"></div>
        <div class="hud-line">
          <span>${tScore}: <strong id="kotobaScore">0</strong></span>
          <span>${tStreak}: <strong id="kotobaStreak">0</strong> • ${tBestStreak} <strong id="kotobaBestStreak">0</strong></span>
          <span id="kotobaTimerWrap" style="display:none">⏱️ <strong id="kotobaTimer">20</strong>${tSec}</span>
          <span>${tPB}: <strong id="kotobaBestTime">-</strong></span>
          <button id="kotobaStart" class="pixel-btn">${tStart}</button>
        </div>
        <div id="kotobaFeedback" class="diva-feedback-enhanced" style="display:none"></div>
      </div>
        <div class="game-widget" id="mikuChatCard" style="display:none;position:relative">
          <h3>💬 ${tChat}</h3>
          <div id="mikuChatTranscript" class="chat-transcript" style="display:flex;flex-direction:column;gap:6px;padding:8px;border-radius:10px;background:#fff;border:2px solid var(--border);max-height:240px;overflow:auto"></div>
          <div id="mikuChatInputRow" style="display:none;margin-top:4px;gap:6px;align-items:center">
            <input id="mikuChatInput" class="pixel-input" placeholder="${tType}" style="flex:1" />
            <button id="mikuChatSend" class="pixel-btn">${tSend}</button>
          </div>
          <div class="hud-line">
            <button id="mikuChatStart" class="pixel-btn">${tStart}</button>
          </div>
        </div>
    <div id="songOverPanel" class="song-over-panel" style="display:none;">
      <div class="result-rings"><div class="ring"></div><div class="ring"></div><div class="ring"></div></div>
      <h3>${tSO.title} - <span class="reason"></span></h3>
      <div class="rank-line">${tSO.rank} <span class="rank">C</span> • ${tSO.score} <span class="score">0</span></div>
      <div class="counts">COOL 0 • GREAT 0 • FINE 0 • MISS 0</div>
      <div class="reward"></div>
      <button id="songOverClose" class="pixel-btn">${tSO.close}</button>
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
    await (window.JLPT_READY || Promise.resolve());
    const pack = window.JLPT.vocab && window.JLPT.vocab[window.State?.difficulty || 1];
    const arr = Array.isArray(pack) ? pack : [];
    if (!arr.length) {
      if (meaningEl) meaningEl.textContent = "(offline)";
      return;
    }
    const pick = arr[Math.floor(Math.random() * arr.length)];
    if (jpEl) jpEl.textContent = pick.word || pick.reading || "";
    if (romajiEl) romajiEl.textContent = pick.romaji || "";
    if (meaningEl) meaningEl.textContent = pick.meaning || "";
  }

  function initChatGame() {
    const chat = document.getElementById("mikuChatTranscript");
    const row = document.getElementById("mikuChatInputRow");
    const input = document.getElementById("mikuChatInput");
    const sendBtn = document.getElementById("mikuChatSend");
    const startBtn = document.getElementById("mikuChatStart");
    if (!chat || !row || !input || !sendBtn || !startBtn) return;

    async function realReply(prompt) {
      try {
        const r = await fetch(
          "https://api.quotable.io/random?tags=happiness|inspirational",
          { cache: "no-store" },
        );
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

    async function handleSend() {
      const text = input.value.trim();
      if (!text) return;
      say(text, "you");
      input.value = "";
      const thinking = document.createElement("div");
      thinking.style.cssText =
        "opacity:.8;font-style:italic;padding:4px 8px;align-self:flex-start";
      thinking.textContent = "ミク: ……";
      chat.appendChild(thinking);
      chat.scrollTop = chat.scrollHeight;
      const api = await realReply(text);
      thinking.remove();
      say(api || "うん！", "miku");
    }

    startBtn.addEventListener("click", () => {
      chat.innerHTML = "";
      say("元気？お話ししよ！", "miku");
      row.style.display = "flex";
      input.focus();
    });

    sendBtn.addEventListener("click", handleSend);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleSend();
    });

    document.addEventListener("miku-chat-start", () => {
      chat.innerHTML = "";
      say("元気？お話ししよ！", "miku");
      row.style.display = "flex";
      input.focus();
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
    refreshWod();
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
