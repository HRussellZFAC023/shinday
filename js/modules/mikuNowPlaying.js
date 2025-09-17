(function () {
  // Resolve localized Miku entry from current singer image path
  function cloneList(list) {
    if (!Array.isArray(list)) return [];
    return list.map((item) => ({
      ...item,
      alt_names: Array.isArray(item?.alt_names) ? item.alt_names.slice() : [],
      links: Array.isArray(item?.links) ? item.links.slice() : [],
    }));
  }

  async function loadMikus() {
    if (Array.isArray(window.SITE_CONTENT?.mikus) && window.SITE_CONTENT.mikus.length)
      return cloneList(window.SITE_CONTENT.mikus);
    if (window.MIKU_META && typeof window.MIKU_META === "object")
      return cloneList(Object.values(window.MIKU_META));
    return [];
  }

  function selectedMikuUrl() {
    return localStorage.getItem("singer.current") || "";
  }

  function normalize(p) {
    return (p || "").toLowerCase().replace(/\\/g, "/");
  }

  function findByImage(list, url) {
    const u = normalize(url);
    // match by filename containment
    return (
      list.find((m) => {
        const fn = m.filename ? normalize(m.filename) : null;
        const img = m.image ? normalize(m.image) : null;
        return (fn && u.includes(fn)) || (img && u.includes(img));
      }) || null
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
        '<strong>Miku:</strong> <span id="divaInfoMiku">•</span>';
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
      '<div><strong>Miku:</strong> <span id="divaInfoMiku">•</span></div>';
    if (study) study.insertAdjacentElement("afterbegin", host);
    return host;
  }

  function setInfo(m) {
    const host = ensureDivaInfo();
    const mikuEl = host.querySelector("#divaInfoMiku");
    const mikuName = m ? m.displayName || m.name || m.title || "•" : "•";
    if (mikuEl) mikuEl.textContent = mikuName;
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
  document.addEventListener("site-content-ready", () => {
    refresh();
  });
})();
