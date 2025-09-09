// Quests module: daily missions with rewards
(function () {
  const LS_Q = "quests.daily";
  const DAY = 24 * 60 * 60 * 1000;

  const QUESTS = [
    {
      id: "play-song",
      text: "Play any song in the Jukebox",
      amount: 1,
      reward: { xp: 20 },
    },
    {
      id: "cool-judges",
      text: "Hit 10 COOL judgments",
      amount: 10,
      reward: { xp: 30 },
    },
    {
      id: "answers-right",
      text: "Answer 15 study prompts",
      amount: 15,
      reward: { xp: 50 },
    },
  ];

  function todayKey() {
    return new Date().toDateString();
  }
  function load() {
    const raw = JSON.parse(localStorage.getItem(LS_Q) || "{}");
    return raw;
  }
  function save(state) {
    localStorage.setItem(LS_Q, JSON.stringify(state));
  }
  function ensureState() {
    const s = load();
    if (s.date !== todayKey()) {
      s.date = todayKey();
      s.items = QUESTS.map((q) => ({ id: q.id, progress: 0, done: false }));
      save(s);
    }
    return s;
  }
  function inc(id, delta) {
    const s = ensureState();
    const it = s.items.find((x) => x.id === id);
    if (!it || it.done) return;
    it.progress = Math.min(
      QUESTS.find((q) => q.id === id).amount,
      (it.progress || 0) + (delta || 1),
    );
    if (it.progress >= QUESTS.find((q) => q.id === id).amount) {
      it.done = true;
      const reward = QUESTS.find((q) => q.id === id).reward || {};
      if (reward.xp && window.Progression) Progression.addXp(reward.xp);

      if (window.SFX) SFX.play("ui.select");
    }
    save(s);
    render();
  }
  function get() {
    return ensureState();
  }

  function render() {
    let widget = document.getElementById("questsWidget");
    if (!widget) {
      const host = document.getElementById("jpGames");
      if (!host) return;
      widget = document.createElement("div");
      widget.className = "study-card widget";
      widget.id = "questsWidget";
      host.appendChild(widget);
    }
    if (!widget.querySelector(".quests-list"))
      widget.innerHTML =
        '<h3>🗒️ Daily Quests</h3><div class="quests-list"></div>';
    const list = widget.querySelector(".quests-list");
    const s = ensureState();
    list.innerHTML = QUESTS.map((q) => {
      const it = s.items.find((i) => i.id === q.id) || {
        progress: 0,
        done: false,
      };
      const pct = Math.floor((it.progress / q.amount) * 100);
      return `<div class="quest" style="margin:6px 0;padding:6px;border:2px solid var(--border);border-radius:10px;background:rgba(255,255,255,.9)">
        <div style="display:flex;justify-content:space-between;align-items:center;font-weight:800;color:#2b2b44">
          <span>${q.text}</span>
          <span>${it.progress}/${q.amount}</span>
        </div>
        <div class="progress-bar"><div class="progress" style="width:${pct}%"></div></div>
        ${it.done ? '<div style="color:#2ECC71;font-weight:900;margin-top:4px">✓ Completed</div>' : ""}
      </div>`;
    }).join("");
  }

  function wireHooks() {
    // Hook flashJudge to count COOLs

    const orig = window.flashJudge;
    if (typeof orig === "function") {
      window.flashJudge = function (cardId, label) {
        if (label === "COOL") inc("cool-judges", 1);
        return orig.apply(this, arguments);
      };
    }

    // Hook study correct answer increments

    const el = document.getElementById("jpGames");
    if (el) {
      el.addEventListener("click", (e) => {
        const b = e.target.closest("button");
        if (b && /option|answer|choice/i.test(b.className))
          inc("answers-right", 1);
      });
    }

  }

  function init() {
    ensureState();
    render();
    wireHooks();
  }
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  )
    init();
  else document.addEventListener("DOMContentLoaded", init);

  window.Quests = { get, inc, render };
})();
