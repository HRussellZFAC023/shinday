// Reusable MikuDex renderer with filters, search, and popover details (i18n-aware)
(function () {
  if (window.MikuDex) return;

  const LS_FILTER = "Wish.dexFilter";
  const PIXIE_URL = "./assets/pixel-miku/101 - PixieBel (bonus).gif";

  function DX() {
    return (window.SITE_CONTENT && window.SITE_CONTENT.dex) || {};
  }

  function pixieUnlocked() {
    return localStorage.getItem("pixiebelUnlocked") === "1";
  }

  if (!window.handleVideoError) {
    window.handleVideoError = function (iframe, videoUrl) {
      const t = DX();
      if (iframe && iframe.parentElement) {
        const vu = t.videoUnavailable || "Video unavailable";
        const wy = t.watchOnYouTube || "Watch on YouTube";
        iframe.parentElement.innerHTML = `<div class="video-error">${vu}<br><a href="${videoUrl}" target="_blank" rel="noopener">${wy}</a></div>`;
      }
    };
  }

  function poolReady() {
    return Array.isArray(window.MIKU_IMAGES) && window.MIKU_IMAGES.length > 0;
  }

  function getColl() {
    try {
      return JSON.parse(localStorage.getItem("Wish.collection") || "{}");
    } catch {
      return {};
    }
  }

  function setColl(c) {
    localStorage.setItem("Wish.collection", JSON.stringify(c));
  }

  function stars(n) {
    return "★".repeat(Math.max(1, Math.min(6, n || 1)));
  }

  function rarityFor(url) {
    const meta = typeof window.getMikuMeta === "function" ? window.getMikuMeta(url) : null;
    if (meta && Number.isFinite(meta.rarity)) return meta.rarity;
    let h = 0;
    for (let i = 0; i < url.length; i++) h = (h << 5) - h + url.charCodeAt(i);
    const r = (h >>> 0) % 100;
    if (r < 12) return 1;
    if (r < 30) return 2;
    if (r < 60) return 3;
    if (r < 85) return 4;
    return 5;
  }

  function ytIdFrom(url) {
    if (!url) return null;
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtu.be")) return u.pathname.replace(/^\//, "");
      if (u.hostname.includes("youtube.com")) return u.searchParams.get("v");
    } catch {}
    return null;
  }

  function buildControlsHtml(filter) {
    const d = DX();
    const t = (s, fb) => (s != null ? s : fb);
    const scopeLabel = t(d.scopeLabel, "Scope");
    const scopes = d.scopes || {};
    const rarityLabel = t(d.rarityLabel, "Rarity");
    const rarityAll = t(d.rarityAll, "All");
    const searchLabel = t(d.searchLabel, "Search");
    const searchPh = t(d.searchPlaceholder, "name...");
    return /*html*/ `
      <div class="dex-controls">
        <label for="dexScope">${scopeLabel}</label>
        <select id="dexScope">
          <option value="all" ${filter.scope === "all" ? "selected" : ""}>${t(scopes.all, "All")}</option>
          <option value="owned" ${filter.scope === "owned" ? "selected" : ""}>${t(scopes.owned, "Owned")}</option>
          <option value="missing" ${filter.scope === "missing" ? "selected" : ""}>${t(scopes.missing, "Missing")}</option>
        </select>
        <label for="dexRarity">${rarityLabel}</label>
        <select id="dexRarity">
          <option value="0" ${!filter.rarity ? "selected" : ""}>${rarityAll}</option>
          <option value="1" ${filter.rarity === 1 ? "selected" : ""}>★1</option>
          <option value="2" ${filter.rarity === 2 ? "selected" : ""}>★2</option>
          <option value="3" ${filter.rarity === 3 ? "selected" : ""}>★3</option>
          <option value="4" ${filter.rarity === 4 ? "selected" : ""}>★4</option>
          <option value="5" ${filter.rarity === 5 ? "selected" : ""}>★5</option>
          <option value="6" ${filter.rarity === 6 ? "selected" : ""}>★6</option>
        </select>
        <label for="dexSearch">${searchLabel}</label>
        <input id="dexSearch" type="search" placeholder="${searchPh}" value="${(filter.search || "").replace(/"/g, "&quot;")}"/>
      </div>`;
  }

  function currentFilter() {
    try {
      const f = JSON.parse(localStorage.getItem(LS_FILTER) || "null");
      if (f) return f;
    } catch {}
    return { scope: "all", rarity: 0, search: "" };
  }

  function saveFilter(f) {
    localStorage.setItem(LS_FILTER, JSON.stringify(f));
  }

  function renderInto(container, opts) {
    const options = opts || {};
  if (!container || !poolReady()) return;
  // If the target container was left with the noscript fallback class,
  // remove it so noscript-specific CSS (which forces small fixed widths)
  // doesn't override the dynamic MikuDex styles.
  try { container.classList.remove && container.classList.remove('noscript-dex'); } catch(_) {}

    const coll = getColl();
    const base = (window.MIKU_IMAGES || []).slice();
    // Always show PixieBel tile (locked if not owned)
    const urls = base.includes(PIXIE_URL) ? base : base.concat([PIXIE_URL]);
    const filter = currentFilter();

    const ownedCount = Object.keys(coll).length;
    const totalCount = base.length; // Header excludes Pixie bonus

    const tiles = urls
      .map((url) => {
        const meta = typeof window.getMikuMeta === "function" ? window.getMikuMeta(url) : null;
        const name =
          meta?.name ||
          meta?.title ||
          (url.split("/").pop() || "Miku").replace(/\.[a-z0-9]+$/i, "");
        const r = meta?.rarity || (/(PixieBel \(bonus\)\.gif)$/i.test(url) ? 6 : rarityFor(url));
        const entry = coll[url];
        const owned = !!entry;

        const passesScope =
          filter.scope === "all" ? true : filter.scope === "owned" ? owned : !owned;
        const passesRarity = !filter.rarity || filter.rarity === r;
        // Enhanced search: allow numeric queries to match by index/id or digit substrings
        const q = (filter.search || "").toString().trim();
        let passesSearch = true;
        if (q) {
          const ql = q.toLowerCase();
          // If query is purely numeric, match by meta.id OR fallback to name/url contains
          if (/^\d+$/.test(ql)) {
            const qn = Number(ql);
            const idMatch = meta && Number.isFinite(meta.id) && Number(meta.id) === qn;
            const nameMatch = name.toLowerCase().includes(ql);
            const urlMatch = (url || "").toLowerCase().includes(ql);
            passesSearch = idMatch || nameMatch || urlMatch;
          } else {
            passesSearch = name.toLowerCase().includes(ql);
          }
        }
        if (!(passesScope && passesRarity && passesSearch)) return "";

        const ownClass = owned ? `owned rarity-${r}` : "locked";

        // NEW badge
        const getNewSet = () => {
          try { return new Set(JSON.parse(localStorage.getItem("Wish.newIds") || "[]")); } catch { return new Set(); }
        };
        const isNew = getNewSet().has(url) || !!entry?.new;
        const newBadge = isNew ? '<div class="Wish-new">NEW!</div>' : "";

        // Pixie mystery mask when locked
        const isPixieBel = /(PixieBel \(bonus\)\.gif)$/i.test(url);
        const mysteryOverlay = !owned && isPixieBel ? '<div class="mystery-cover"><div class="mystery-text">?</div></div>' : "";

        return `
          <div class="dex-card ${ownClass}" data-url="${url}" tabindex="0">
            <div class="rarity-ring"></div>
            <div class="dex-stars">${stars(r)}</div>
            <img src="${url}" alt="${name}" loading="lazy" decoding="async" />
            ${mysteryOverlay}
            ${owned ? `<span class=\"dex-count\">x${entry.count || 1}</span>` : `<span class=\"dex-locked\">?</span>`}
            <div class="dex-name">${name}</div>
            ${newBadge}
          </div>`;
      })
      .join("");

    const d = DX();
    const headerTpl = d.header || "MikuDex • Owned: {owned} / {total}";
    const header = headerTpl.replace("{owned}", ownedCount).replace("{total}", totalCount);
    container.innerHTML = `
      <div class="dex-pokedex">
        <div class="dex-header">${header}</div>
        ${buildControlsHtml(filter)}
        <div class="dex-grid">${tiles}</div>
      </div>`;

    // Wire controls
    const scopeSel = container.querySelector("#dexScope");
    const raritySel = container.querySelector("#dexRarity");
    const searchInp = container.querySelector("#dexSearch");
    if (scopeSel)
      scopeSel.onchange = () => {
        saveFilter({ ...filter, scope: scopeSel.value });
        renderInto(container);
      };
    if (raritySel)
      raritySel.onchange = () => {
        const r = parseInt(raritySel.value, 10) || 0;
        saveFilter({ ...filter, rarity: r });
        renderInto(container);
      };
    if (searchInp) {
      let searchTimeout;
      searchInp.oninput = () => {
        const caretStart = searchInp.selectionStart || 0;
        const caretEnd = searchInp.selectionEnd || caretStart;
        const newFilter = { ...filter, search: searchInp.value.trim() };
        saveFilter(newFilter);
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() =>
          renderInto(container, { keepSearchFocus: true, caretStart, caretEnd }),
        180);
      };
    }

    // Restore focus and caret position for search input if requested
    if (options.keepSearchFocus) {
      const si = container.querySelector('#dexSearch');
      if (si) {
        si.focus();
        const cs = Number.isFinite(options.caretStart) ? options.caretStart : si.value.length;
        const ce = Number.isFinite(options.caretEnd) ? options.caretEnd : cs;
        try { si.setSelectionRange(cs, ce); } catch (_) {}
      }
    }

    // Tile handlers
    container.querySelectorAll(".dex-card").forEach((card) => {
      const url = card.getAttribute("data-url");
      const isPixieBel = /(PixieBel \(bonus\)\.gif)$/i.test(url);
      const lockedPixie = isPixieBel && !pixieUnlocked();

      card.addEventListener("click", () => {
          if (lockedPixie) {
            const t = DX();
            window.Hearts?.loveToast?.(t.hiddenToast || "This legendary companion remains hidden... 🔒✨");
            return;
          }
          // Clear NEW badge if present
          const badge = card.querySelector('.Wish-new');
          if (badge) {
            badge.remove();
            // Remove from Wish.newIds in localStorage
            try {
              const raw = localStorage.getItem("Wish.newIds") || "[]";
              const arr = JSON.parse(raw);
              const idx = arr.indexOf(url);
              if (idx !== -1) {
                arr.splice(idx, 1);
                localStorage.setItem("Wish.newIds", JSON.stringify(arr));
              }
            } catch {}
          }
          openDetails(url);
      });
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter") card.click();
      });
    });

    // Clear NEW flags in collection (preserve Wish.newIds for badges)
    const collection = getColl();
    let changed = false;
    for (const k of Object.keys(collection)) {
      if (collection[k] && collection[k].new) { delete collection[k].new; changed = true; }
    }
    if (changed) setColl(collection);
  }

  function openDetails(url) {
    const existing = document.querySelector(".image-modal");
    if (existing) return updateModalContent(existing, url);
    createNewModal(url);
  }

  function updateModalContent(modal, url) {
    const panel = modal.querySelector(".image-panel");
    if (!panel) return;
    // Stop any video playback before changing content
    try {
      const iframe = panel.querySelector('iframe');
      if (iframe && iframe.src) iframe.src = 'about:blank';
    } catch (_) {}
    panel.classList.add("transitioning");
    // Play camera sound on navigation
    try { window.SFX?.play?.("extra.camera"); } catch {}
    setTimeout(() => {
      populateModalContent(modal, url);
      panel.classList.remove("transitioning");
    }, 120);
  }

  function createNewModal(url) {
    const modal = document.createElement("div");
    modal.className = "image-modal";
    const d = DX();
    modal.innerHTML = `<div class="image-panel"><div class="loading">${d.loading || 'Loading...'}</div></div>`;
    document.body.appendChild(modal);
    // Record whether BGM was playing and pause it for the modal view.
    try {
      const bgmAudio = window.__bgmAudio || (window.AudioMod && typeof window.AudioMod.ensureBgm === 'function' ? window.AudioMod.ensureBgm() : null);
      if (bgmAudio) {
        // store state on the modal so we only resume if we paused earlier
        modal.dataset.bgmWasPlaying = (!bgmAudio.paused && !bgmAudio.ended) ? '1' : '0';
        if (modal.dataset.bgmWasPlaying === '1' && typeof window.__pauseBgm === 'function') {
          try { window.__pauseBgm(); } catch (_) {}
        }
      }
    } catch (_) {}

    populateModalContent(modal, url);
    setupModalHandlers(modal);
    try { window.SFX?.play?.("extra.camera"); } catch {}
    setTimeout(() => modal.classList.add("open"), 10);
  }

  function populateModalContent(modal, url) {
    const meta = typeof window.getMikuMeta === "function" ? window.getMikuMeta(url) : null;
    const name = meta?.name || meta?.title || (url.split("/").pop() || "Miku").replace(/\.[a-z0-9]+$/i, "");
    const rarity = meta?.rarity || (/(PixieBel \(bonus\)\.gif)$/i.test(url) ? 6 : rarityFor(url));
    const videoUrl = meta?.song || meta?.video || "";
    const vid = ytIdFrom(videoUrl);
    const escapedVideoUrl = (videoUrl || "").replace(/'/g, "\\'");
    const coll = getColl();
    const entry = coll[url];
    const owned = !!entry;
    const all = window.MIKU_IMAGES || [];
    const idx = all.indexOf(url);
    const hasPrev = idx > 0;
    const hasNext = idx < all.length - 1;
    const d = DX();

    const panel = modal.querySelector(".image-panel");
    panel.innerHTML = /*html*/ `
      <div class="modal-header">
        <button class="nav-btn prev-btn ${!hasPrev ? 'disabled' : ''}" id="prevMikuBtn" ${!hasPrev ? 'disabled' : ''} data-url="${hasPrev ? all[idx - 1] : ''}">
          <span class="nav-icon">◀</span>
          <span class="nav-text">${d.navPrev || 'Previous'}</span>
        </button>
        <div class="modal-counter">${idx + 1} / ${all.length}</div>
        <button class="nav-btn next-btn ${!hasNext ? 'disabled' : ''}" id="nextMikuBtn" ${!hasNext ? 'disabled' : ''} data-url="${hasNext ? all[idx + 1] : ''}">
          <span class="nav-text">${d.navNext || 'Next'}</span>
          <span class="nav-icon">▶</span>
        </button>
      </div>
      <div class="top">
        <img src="${url}" alt="${name}" style="width:200px;height:auto;image-rendering:pixelated;border-radius:10px;border:2px solid var(--border);"/>
        <div class="meta">
          <h3>${name}</h3>
          <div class="rarity-info">
            <div>${d.rarityText || 'Rarity:'} ${stars(rarity)}</div>
            <div style="font-size:12px;color:#596286;margin-top:4px"></div>
          </div>
          <div class="owned-info" style="margin-top:8px">
            ${owned ? (d.ownedTextOwned || 'Owned: x{n}').replace('{n}', entry.count || 1) : (d.ownedTextLocked || 'Owned: •')}
          </div>
          ${ meta?.description ? `<div class="description" style="font-size:14px;color:var(--ink-soft);margin-top:8px;">${meta.description}</div>` : '' }
          ${ meta?.links && meta.links.length > 0 ? `<div class="links-info" style="margin-top:8px;font-size:12px"><strong>${d.linksLabel || 'Links:'}</strong><div style="margin-top:4px;display:flex;flex-wrap:wrap;gap:6px">${meta.links.map(link => `<a href="${link}" target="_blank" rel="noopener" style="color:#4a90e2;text-decoration:none;padding:2px 6px;border:1px solid #4a90e2;border-radius:4px;font-size:11px;display:inline-block;transition:opacity 0.2s" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">🔗 ${link.replace(/^https?:\/\//, '').split('/')[0]}</a>`).join('')}</div></div>` : '' }
          ${ meta?.song ? `<div class="song-info" style="margin-top:8px;font-size:14px"><strong>${d.unlocksLabel || 'Unlocks:'}</strong> ${
              (meta.song.includes('youtube.com') || meta.song.includes('youtu.be')) ? (d.unlocksMusic || 'Music track in Jukebox') : meta.song
            }</div>` : '' }
          ${ vid ? `
            <div class="video-container" style="margin-top:10px">
              <iframe style="width:100%;aspect-ratio:16/9;border:0;border-radius:8px" src="https://www.youtube-nocookie.com/embed/${vid}?rel=0&modestbranding=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy" onload="this.style.opacity=1" onerror="window.handleVideoError && window.handleVideoError(this, '${escapedVideoUrl}')"></iframe>
            </div>` : '' }
            
        </div>
      </div>
      <div class="actions" style="margin-top:12px;display:flex;gap:8px;justify-content:flex-end">
    ${ owned ? `<button class="pixel-btn" id="setSingerBtn" data-url="${url}">${d.btnSetSinger || 'Set as Singer'}</button>
    <button class="pixel-btn" id="setSongBtn" data-url="${url}">${d.btnSetSong || 'Set as Song'}</button>` : `<button class="pixel-btn" disabled>${d.btnWinInWish || 'Win in Wish'}</button>` }
    <button class="pixel-btn" id="dexCloseBtn">${d.btnClose || 'Close'}</button>
      </div>`;
  }

  function setupModalHandlers(modal) {
    const close = () => {
      try { window.SFX?.play?.("ui.back"); } catch {}
      // Stop any playing iframe/video
      try {
        const panel = modal.querySelector('.image-panel');
        if (panel) {
          const iframe = panel.querySelector('iframe');
          if (iframe && iframe.src) iframe.src = 'about:blank';
          const video = panel.querySelector('video');
          if (video && !video.paused) { try { video.pause(); } catch (_) {} }
        }
      } catch (_) {}
      // If we paused the BGM when opening, resume it now.
      try {
        if (modal && modal.dataset && modal.dataset.bgmWasPlaying === '1') {
          if (typeof window.__resumeBgm === 'function') {
            try { window.__resumeBgm(); } catch (_) {}
          }
        }
      } catch (_) {}
      modal.remove();
    };

    modal.addEventListener("click", (e) => { if (e.target === modal) close(); });

    const keyHandler = (e) => {
      if (e.key === "Escape") {
        close();
        // Show Jukebox mini-player after Dex closes
        try {
          if (window.Jukebox && typeof window.Jukebox.ensurePlayer === 'function') {
            const wrap = window.Jukebox.ensurePlayer();
            if (wrap) wrap.style.display = 'block';
          }
        } catch {}
        document.removeEventListener("keydown", keyHandler);
      } else if (e.key === "ArrowLeft") {
        const prevBtn = modal.querySelector('#prevMikuBtn');
        const prevUrl = prevBtn && !prevBtn.disabled ? prevBtn.getAttribute('data-url') : '';
        if (prevUrl) { e.preventDefault(); try { window.SFX?.play?.('extra.camera'); } catch {}; updateModalContent(modal, prevUrl); }
      } else if (e.key === "ArrowRight") {
        const nextBtn = modal.querySelector('#nextMikuBtn');
        const nextUrl = nextBtn && !nextBtn.disabled ? nextBtn.getAttribute('data-url') : '';
        if (nextUrl) { e.preventDefault(); try { window.SFX?.play?.('extra.camera'); } catch {}; updateModalContent(modal, nextUrl); }
      }
    };
    document.addEventListener("keydown", keyHandler);

    // Delegated clicks
    modal.addEventListener('click', (e) => {
      const t = e.target;
      if (t.id === 'dexCloseBtn') {
        close();
      } else if (t.id === 'prevMikuBtn' || t.closest('#prevMikuBtn')) {
        const btn = t.id === 'prevMikuBtn' ? t : t.closest('#prevMikuBtn');
        const prevUrl = btn && !btn.disabled ? btn.getAttribute('data-url') : '';
        if (prevUrl) { try { window.SFX?.play?.('extra.camera'); } catch {}; updateModalContent(modal, prevUrl); }
      } else if (t.id === 'nextMikuBtn' || t.closest('#nextMikuBtn')) {
        const btn = t.id === 'nextMikuBtn' ? t : t.closest('#nextMikuBtn');
        const nextUrl = btn && !btn.disabled ? btn.getAttribute('data-url') : '';
        if (nextUrl) { try { window.SFX?.play?.('extra.camera'); } catch {}; updateModalContent(modal, nextUrl); }
      } else if (t.id === 'setSingerBtn') {
        const url = t.getAttribute('data-url');
        try {
          if (typeof window.singerSet === "function") window.singerSet(url);
          else { window.__currentSingerUrl = url; localStorage.setItem("currentSinger", url); }
          window.SFX?.play?.("ui.select");
        } catch {}
        close();
        } else if (t.id === 'setSongBtn') {
          const url = t.getAttribute('data-url');
          try {
            // Find meta/song info
            const meta = typeof window.getMikuMeta === "function" ? window.getMikuMeta(url) : null;
            if (meta && meta.song) {
              // Find matching Jukebox song object
              if (window.Jukebox && typeof window.Jukebox.songs === 'object') {
                const songObj = window.Jukebox.songs.find(s => s.title === meta.name || s.jacket === url || s.id === `miku-${meta.id}`);
                if (songObj) {
                  window.Jukebox.saveSelection(songObj, window.Jukebox.getPreset());
                  window.Jukebox.play(songObj);
                  window.SFX?.play?.("ui.select");
                }
              }
            }
          } catch {}
          close();
      }
    });
  }

  function renderById(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    renderInto(el);
  }

  window.MikuDex = { renderInto, renderById };
})();
