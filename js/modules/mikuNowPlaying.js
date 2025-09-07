(function () {
  // Resolve mikus.json item from current singer image path
  async function loadMikus() {
    try {
      const res = await fetch("./assets/pixel-miku/mikus.json", {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("mikus.json");
      return await res.json();
    } catch (_) {
      return [];
    }
  }

  function selectedMikuUrl() {
    try {
      return localStorage.getItem("singer.current") || "";
    } catch (_) {
      return "";
    }
  }

  function normalize(p) {
    return (p || "").toLowerCase().replace(/\\/g, "/");
  }

  function findByImage(list, url) {
    const u = normalize(url);
    // match by filename containment
    return (
      list.find(
        (m) =>
          u.includes(normalize(m.filename || "")) ||
          u.includes(normalize(m.image || "")),
      ) || null
    );
  }

  function ensureDivaInfo() {
    let host = document.getElementById("divaInfo");
    if (host) return host;
    // Prefer mounting inside Diva HUD widget
    const hud = document.querySelector("#jpHudWidget .jp-hud-widget");
    if (hud) {
      host = document.createElement("div");
      host.id = "divaInfo";
      host.className = "hud-line";
      host.innerHTML =
        '<strong>Miku:</strong> <span id="divaInfoMiku">—</span> <div class="spacer"></div> <strong>🎶 Song:</strong> <span id="divaInfoSong">—</span>';
      hud.insertAdjacentElement("afterbegin", host);
      return host;
    }
    // Fallback: inject at top of Study/Games/Home section if HUD not yet in DOM
    const study =
      document.getElementById("study") ||
      document.getElementById("games") ||
      document.getElementById("home");
    host = document.createElement("div");
    host.id = "divaInfo";
    host.style.cssText =
      "margin:10px 0;padding:8px 10px;border:2px solid var(--border);border-radius:10px;background:#fff;display:flex;gap:12px;align-items:center;font-weight:800;color:#2b2b44";
    host.innerHTML =
      '<div><strong>Miku:</strong> <span id="divaInfoMiku">—</span></div><div><strong>🎶 Song:</strong> <span id="divaInfoSong">—</span></div>';
    if (study) study.insertAdjacentElement("afterbegin", host);
    return host;
  }

  function setInfo(m) {
    const host = ensureDivaInfo();
    const mikuEl = host.querySelector("#divaInfoMiku");
    const songEl = host.querySelector("#divaInfoSong");
    const mikuName = m ? m.displayName || m.name || m.title || "—" : "—";
    const songTitle = m ? m.songTitle || m.title || "—" : "—";
    if (mikuEl) mikuEl.textContent = mikuName;
    if (songEl) songEl.textContent = songTitle;
  }

  async function refresh() {
    const url = selectedMikuUrl();
    if (!url) {
      setInfo(null);
      return;
    }
    const list = await loadMikus();
    const found = findByImage(list, url);
    setInfo(found);
  }

  // Public API for main/jukebox to call on selection changes
  window.MikuNowPlaying = { refresh };

  // Initial paint soon after load
  setTimeout(refresh, 50);
})();
