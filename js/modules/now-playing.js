// 🎵 MIKU NOW PLAYING SYSTEM - CONSOLIDATED AND PERFECT 🎵
window.MikuSystem = (function () {
  // Core Miku data management
  async function loadMikusData() {
    const res = await fetch("./assets/pixel-miku/mikus.json", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to load Miku data");
    return res.json();
  }

  function getCurrentMikuUrl() {
    return localStorage.getItem("singer.current") || "";
  }

  function setCurrentMiku(url) {
    localStorage.setItem("singer.current", url || "");
    refresh(); // Auto-refresh display
  }

  function normalize(path) {
    return (path || "").toLowerCase().replace(/\\/g, "/");
  }

  function findMikuByImage(mikuList, imageUrl) {
    const normalizedUrl = normalize(imageUrl);
    return (
      mikuList.find(
        (miku) =>
          normalizedUrl.includes(normalize(miku.filename || "")) ||
          normalizedUrl.includes(normalize(miku.image || "")),
      ) || null
    );
  }

  // UI Management - NO MORE TRY BLOCKS!
  function updateNowPlaying(song) {
    const title =
      song?.title || song?.name
        ? `${song.title || song.name} — ${song.artist || "Miku"}`
        : "Kawaii FM 📻";

    const statusEl = document.getElementById("radioStatus");
    const displayEl = document.getElementById("radioDisplayStatus");

    if (statusEl) statusEl.textContent = title;
    if (displayEl) displayEl.textContent = title;

    localStorage.setItem("pixelbelle-now-playing", title);
  }

  function createDivaInfoWidget() {
    let widget = document.getElementById("divaInfo");
    if (widget) return widget;

    const hudContainer = document.querySelector("#jpHudWidget .jp-hud-widget");
    if (hudContainer) {
      widget = document.createElement("div");
      widget.id = "divaInfo";
      widget.className = "hud-line";
      widget.innerHTML = `
        <strong>Miku:</strong> <span id="divaInfoMiku">—</span> 
        <div class="spacer"></div> 
        <strong>🎶 Song:</strong> <span id="divaInfoSong">—</span>
      `;
      hudContainer.insertAdjacentElement("afterbegin", widget);
      return widget;
    }

    // Fallback placement
    const fallbackContainer =
      document.getElementById("study") ||
      document.getElementById("games") ||
      document.getElementById("home");

    if (fallbackContainer) {
      widget = document.createElement("div");
      widget.id = "divaInfo";
      widget.style.cssText = `
        margin:10px 0;padding:8px 10px;border:2px solid var(--border);
        border-radius:10px;background:#fff;display:flex;gap:12px;
        align-items:center;font-weight:800;color:#2b2b44
      `;
      widget.innerHTML = `
        <div><strong>Miku:</strong> <span id="divaInfoMiku">—</span></div>
        <div><strong>🎶 Song:</strong> <span id="divaInfoSong">—</span></div>
      `;
      fallbackContainer.insertAdjacentElement("afterbegin", widget);
    }

    return widget;
  }

  async function refresh() {
    const currentUrl = getCurrentMikuUrl();
    if (!currentUrl) {
      updateDivaDisplay(null);
      return;
    }

    const mikuList = await loadMikusData();
    const currentMiku = findMikuByImage(mikuList, currentUrl);
    updateDivaDisplay(currentMiku);
  }

  function updateDivaDisplay(miku) {
    const widget = createDivaInfoWidget();
    if (!widget) return;

    const mikuNameEl = widget.querySelector("#divaInfoMiku");
    const songTitleEl = widget.querySelector("#divaInfoSong");

    const mikuName = miku?.displayName || miku?.name || miku?.title || "—";
    const songTitle = miku?.songTitle || miku?.title || "—";

    if (mikuNameEl) mikuNameEl.textContent = mikuName;
    if (songTitleEl) songTitleEl.textContent = songTitle;
  }

  // Initialize on startup
  setTimeout(refresh, 50);

  // Public API
  return {
    updateNowPlaying,
    setCurrentMiku,
    getCurrentMikuUrl,
    refresh,
    loadMikusData,
  };
})();

// Legacy compatibility - NO MORE SCATTERED GLOBALS!
window.updateNowPlaying = window.MikuSystem.updateNowPlaying;
window.updateCurrentMiku = window.MikuSystem.setCurrentMiku;
window.MikuNowPlaying = { refresh: window.MikuSystem.refresh };
