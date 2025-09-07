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
      <div class="study-card" id="wodCard" style="grid-column: 1 / -1; display:grid; grid-template-columns: 1fr 1fr; gap:12px; align-items:stretch;">
        <div class="word-of-day" style="padding:10px;border:2px solid var(--border);border-radius:12px;background:#fff;">
          <h3 style="margin-top:0">📖 Word of the Day</h3>
          <div style="font-size:22px;font-weight:900" class="japanese">${wod.japanese || ""}</div>
          <div class="romaji" style="opacity:.8">${wod.romaji || ""}</div>
          <div class="meaning">${wod.meaning || ""}</div>
        </div>
        <div class="wod-iframe" style="min-height:220px;border:2px solid var(--border);border-radius:12px;overflow:hidden;background:#fff">
          <iframe id="wodIframe" src="${wodIframeSrc}"
            style="border:0;width:100%;height:100%" loading="lazy" referrerpolicy="no-referrer"></iframe>
        </div>
      </div>
      <div class="game-widget" id="vocabCard">
        <h3>🗣️ Vocab</h3>
        <div id="vocabQuestion"></div>
        <div id="vocabChoices" class="beatpad-grid"></div>
        <div id="vocabMeta" class="mode-row">
          <button class="pixel-btn mode-option active" data-mode="jp-en">JP→EN</button>
          <button class="pixel-btn mode-option" data-mode="en-jp">EN→JP</button>
        </div>
        <div class="hud-line">
          <span>Score: <strong id="vocabScore">0</strong></span>
          <span>Streak: <strong id="vocabStreak">0</strong> • Best <strong id="vocabBestStreak">0</strong></span>
          <span id="vocabTimerWrap" style="display:none">⏱️ <strong id="vocabTimer">15</strong>s</span>
          <span>PB: <strong id="vocabBestTime">-</strong></span>
        </div>
        <div id="vocabFeedback" class="diva-feedback-enhanced" style="display:none"></div>
      </div>
      <div class="game-widget" id="kanjiCard">
        <h3>漢字 Kanji</h3>
        <div class="mode-row" id="kanjiMeta">
          <button class="pixel-btn mode-option active" data-mode="meaning">Meaning→Kanji</button>
          <button class="pixel-btn mode-option" data-mode="reading">Kanji→Reading</button>
        </div>
        <div id="kanjiQuestion"></div>
        <div id="kanjiChoices" class="beatpad-grid"></div>
        <div class="hud-line">
          <span>Score: <strong id="kanjiScore">0</strong></span>
          <span>Streak: <strong id="kanjiStreak">0</strong> • Best <strong id="kanjiBestStreak">0</strong></span>
          <span id="kanjiTimerWrap" style="display:none">⏱️ <strong id="kanjiTimer">15</strong>s</span>
          <span>PB: <strong id="kanjiBestTime">-</strong></span>
        </div>
        <div id="kanjiFeedback" class="diva-feedback-enhanced" style="display:none"></div>
      </div>
      <div class="game-widget" id="kotobaCard">
        <h3>ことば Kotoba</h3>
        <div id="kotobaChat" class="chat-transcript" style="display:flex;flex-direction:column;gap:6px;padding:8px;border-radius:10px;background:#fff;border:2px solid var(--border);max-height:220px;overflow:auto"></div>
        <div id="kotobaChoices" class="chat-choices" style="display:flex;flex-direction:column;gap:8px"></div>
        <div class="hud-line">
          <span>Score: <strong id="kotobaScore">0</strong></span>
          <span>Streak: <strong id="kotobaStreak">0</strong> • Best <strong id="kotobaBestStreak">0</strong></span>
          <span id="kotobaTimerWrap" style="display:none">⏱️ <strong id="kotobaTimer">20</strong>s</span>
          <span>PB: <strong id="kotobaBestTime">-</strong></span>
          <button id="kotobaStart" class="pixel-btn">Start</button>
        </div>
        <div id="kotobaFeedback" class="diva-feedback-enhanced" style="display:none"></div>
      </div>
      <div class="game-widget" id="mikuChatCard">
        <h3>💬 Miku × Chat</h3>
        <div id="mikuChatTranscript" class="chat-transcript" style="display:flex;flex-direction:column;gap:6px;padding:8px;border-radius:10px;background:#fff;border:2px solid var(--border);max-height:240px;overflow:auto"></div>
        <div id="mikuChatChoices" class="beatpad-grid"></div>
        <div class="hud-line">
          <button id="mikuChatStart" class="pixel-btn">Start</button>
          <span class="spacer"></span>
          <span>Rhythm: falling beats enabled</span>
        </div>
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
        // route via dispatcher
        window.__startSong && window.__startSong(g, m, false);
      };
      selGame.addEventListener("change", startSelected);
      selMode.addEventListener("change", startSelected);
    }
  }

  function initChatGame() {
    const chat = document.getElementById("mikuChatTranscript");
    const grid = document.getElementById("mikuChatChoices");
    const startBtn = document.getElementById("mikuChatStart");
    if (!chat || !grid || !startBtn) return;
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
        const { btn } = maker(opt, idx, (text) => {
          say(text, "you");
          if (text === "歌って!") say("ららら〜♪", "miku");
          else if (text === "日本語の勉強!")
            say("ことばカード行こう！", "miku");
          else if (text === "ゲームしよ!") say("ボカロタイピング？", "miku");
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
    mountGames();
    // Auto-start default selection
    const selGame = document.getElementById("hudGame");
    const selMode = document.getElementById("hudMode");
    const g = (selGame && selGame.value) || "vocab";
    const m = (selMode && selMode.value) || "jp-en";
    window.__startSong && window.__startSong(g, m, false);
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();
})();
