// Reusable MikuDex renderer with filters, search, and popover details
(function () {
  if (window.MikuDex) return;

  const LS_FILTER = "Wish.dexFilter";
  const PIXIE_URL = "./assets/pixel-miku/101 - PixieBel (bonus).gif";

  // Check if PixieBel is unlocked
  function pixieUnlocked() {
    return localStorage.getItem("pixiebelUnlocked") === "1";
  }

  if (!window.handleVideoError) {
    window.handleVideoError = function (iframe, videoUrl) {
      if (iframe && iframe.parentElement) {
        iframe.parentElement.innerHTML = `<div class="video-error">Video unavailable<br><a href="${videoUrl}" target="_blank" rel="noopener">Watch on YouTube</a></div>`;
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
    // Prefer meta rarity; fallback hash
    const meta =
      typeof window.getMikuMeta === "function" ? window.getMikuMeta(url) : null;
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
      if (
        u.hostname.includes("youtube.com") ||
        u.hostname.includes("youtu.be")
      ) {
        if (u.hostname.includes("youtu.be"))
          return u.pathname.replace(/^\//, "");
        const v = u.searchParams.get("v");
        if (v) return v;
      }
    } catch {}
    return null;
  }

  function buildControlsHtml(filter) {
    return /*Html*/ `
      <div class="dex-controls">
        <label for="dexScope">Scope</label>
        <select id="dexScope">
          <option value="all" ${
            filter.scope === "all" ? "selected" : ""
          }>All</option>
          <option value="owned" ${
            filter.scope === "owned" ? "selected" : ""
          }>Owned</option>
          <option value="missing" ${
            filter.scope === "missing" ? "selected" : ""
          }>Missing</option>
        </select>
        <label for="dexRarity">Rarity</label>
        <select id="dexRarity">
          <option value="0" ${!filter.rarity ? "selected" : ""}>All</option>
          <option value="1" ${filter.rarity === 1 ? "selected" : ""}>★1</option>
          <option value="2" ${filter.rarity === 2 ? "selected" : ""}>★2</option>
          <option value="3" ${filter.rarity === 3 ? "selected" : ""}>★3</option>
          <option value="4" ${filter.rarity === 4 ? "selected" : ""}>★4</option>
          <option value="5" ${filter.rarity === 5 ? "selected" : ""}>★5</option>
          <option value="6" ${filter.rarity === 6 ? "selected" : ""}>★6</option>
        </select>
        <label for="dexSearch">Search</label>
        <input id="dexSearch" type="search" placeholder="name..." value="${(
          filter.search || ""
        ).replace(/"/g, "&quot;")}"/>
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

  function renderInto(container) {
    if (!container || !poolReady()) return;
    const coll = getColl();
    const base = (window.MIKU_IMAGES || []).slice();
    const includePixie = true;
    const urls =
      includePixie && base.indexOf(PIXIE_URL) === -1
        ? base.concat([PIXIE_URL])
        : base;
    const filter = currentFilter();

    const ownedCount = Object.keys(coll).length;
    const totalCount = base.length; // exclude Pixie for header progress

    const tiles = urls
      .map((url) => {
        const meta =
          typeof window.getMikuMeta === "function"
            ? window.getMikuMeta(url)
            : null;
        const name =
          meta?.name ||
          meta?.title ||
          (url.split("/").pop() || "Miku").replace(/\.[a-z0-9]+$/i, "");
        const r =
          meta?.rarity ||
          (/(PixieBel \(bonus\)\.gif)$/i.test(url) ? 6 : rarityFor(url));
        const entry = coll[url];
        const owned = !!entry;
        const passesScope =
          filter.scope === "all"
            ? true
            : filter.scope === "owned"
            ? owned
            : !owned;
        const passesRarity = !filter.rarity || filter.rarity === r;
        const passesSearch =
          !filter.search ||
          name.toLowerCase().includes(filter.search.toLowerCase());
        if (!(passesScope && passesRarity && passesSearch)) return "";
        const ownClass = owned ? `owned rarity-${r}` : "locked";

        // Check for NEW status from localStorage or entry.new
        const getNewSet = () => {
          try {
            return new Set(
              JSON.parse(localStorage.getItem("Wish.newIds") || "[]")
            );
          } catch {
            return new Set();
          }
        };
        const isNewFromSet = getNewSet().has(url);
        const isNewFromEntry = entry?.new;
        const isNew = isNewFromSet || isNewFromEntry;
        const newBadge = isNew ? '<div class="Wish-new">NEW!</div>' : "";

        // PixieBel mystery mask for locked state
        const isPixieBel = /(PixieBel \(bonus\)\.gif)$/i.test(url);
        const pixieUnlockedState = pixieUnlocked();
        const mysteryOverlay =
          !owned && isPixieBel
            ? '<div class="mystery-cover"><div class="mystery-text">?</div></div>'
            : "";

        // Add disabled class for locked PixieBel
        const disabledClass =
          isPixieBel && !pixieUnlockedState ? " dex-disabled" : "";

        return `
          <div class="dex-card ${ownClass}${disabledClass}" data-url="${url}" tabindex="0">
          <div class="rarity-ring"></div>
            <div class="dex-stars">${stars(r)}</div>
            <img src="${url}" alt="${name}" loading="lazy" decoding="async" />
            ${mysteryOverlay}
            ${
              owned
                ? `<span class="dex-count">x${entry.count || 1}</span>`
                : `<span class="dex-locked">?</span>`
            }
            <div class="dex-name">${name}</div>
            ${newBadge}
          </div>`;
      })
      .join("");

    container.innerHTML = `
      <div class="dex-pokedex">
        <div class="dex-header">MikuDex • Owned: ${ownedCount} / ${totalCount}</div>
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
        const newFilter = { ...filter, search: searchInp.value.trim() };
        saveFilter(newFilter);
        // Use proper debouncing to prevent input deselection
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => renderInto(container), 300);
      };
      // Prevent search from losing focus during typing
      searchInp.addEventListener("blur", (e) => {
        // Re-focus if blur was caused by our re-rendering
        if (e.relatedTarget === null) {
          setTimeout(() => {
            if (document.activeElement !== searchInp) {
              searchInp.focus();
            }
          }, 0);
        }
      });
    }

    // Tile popovers
    container.querySelectorAll(".dex-card").forEach((card) => {
      const url = card.getAttribute("data-url");
      const isPixieBel = /(PixieBel \(bonus\)\.gif)$/i.test(url);
      const pixieUnlockedState = pixieUnlocked();
      const isDisabled = isPixieBel && !pixieUnlockedState;

      card.addEventListener("click", () => {
        // Block clicks on PixieBel if not unlocked
        if (isDisabled) {
          // Show a subtle hint instead of opening details
          if (window.Hearts?.loveToast) {
            window.Hearts.loveToast(
              "This legendary companion remains hidden... 🔒✨"
            );
          }
          return;
        }

        openDetails(url);
      });

      // Also block keyboard access (Enter key) for disabled cards
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && isDisabled) {
          e.preventDefault();
          if (window.Hearts?.loveToast) {
            window.Hearts.loveToast(
              "This legendary companion remains hidden... 🔒✨"
            );
          }
        }
      });
    });

    // Clear new flags when Dex renders (but preserve the localStorage NEW set)
    let collChanged = false;
    Object.keys(coll).forEach((k) => {
      if (coll[k].new) {
        delete coll[k].new;
        collChanged = true;
      }
    });
    if (collChanged) setColl(coll);
  }

  function openDetails(url) {
    const meta =
      typeof window.getMikuMeta === "function" ? window.getMikuMeta(url) : null;
    const name =
      meta?.name ||
      meta?.title ||
      (url.split("/").pop() || "Miku").replace(/\.[a-z0-9]+$/i, "");
    const rarity =
      meta?.rarity ||
      (/(PixieBel \(bonus\)\.gif)$/i.test(url) ? 6 : rarityFor(url));
    const videoUrl = meta?.song || meta?.video || "";
    const vid = ytIdFrom(videoUrl);
    const escapedVideoUrl = (videoUrl || "").replace(/'/g, "\\'");
    const links = Array.isArray(meta?.links) ? meta.links : [];
    const coll = getColl();
    const entry = coll[url];
    const owned = !!entry;

    // Singer effects (fixed bonuses when set)
    const sm =
      (typeof window.getSingerScoreMult === "function"
        ? getSingerScoreMult()
        : 1) - 1;
    const sh =
      (typeof window.getSingerShieldMult === "function"
        ? getSingerShieldMult()
        : 1) - 1;
    const rb =
      typeof window.getSingerRareDropBonus === "function"
        ? getSingerRareDropBonus()
        : 0;
    const effectsText = ""; //Effects: +${Math.round(Math.max(0, sm) * 100)}% score, +${Math.round(Math.max(0, sh) * 100)}% shield time, +${Math.round(Math.max(0, rb) * 100)}% rare drop`;

    const ov = document.createElement("div");
    ov.className = "image-modal";
    ov.innerHTML = /*html*/ `
      <div class="image-panel">
        <div class="top">
          <img src="${url}" alt="${name}" style="width:200px;height:auto;image-rendering:pixelated;border-radius:10px;border:2px solid var(--border);"/>
          <div class="meta">
            <h3>${name}</h3>
            <div class="rarity-info">
              <div>Rarity: ${stars(rarity)}</div>
              <div style="font-size:12px;color:#596286;margin-top:4px">${effectsText}</div>
            </div>
            <div class="owned-info" style="margin-top:8px">
              ${owned ? `Owned: x${entry.count || 1}` : "Owned: •"}
            </div>
            ${
              meta?.description
                ? `<div class="description" style="font-size:14px;color:var(--ink-soft);margin-top:8px;">${meta.description}</div>`
                : ""
            }
            ${
              meta?.song
                ? `<div class="song-info" style="margin-top:8px;font-size:14px"><strong>Unlocks:</strong> ${
                    meta.song.includes("youtube.com") ||
                    meta.song.includes("youtu.be")
                      ? "Music track in Jukebox"
                      : meta.song
                  }</div>`
                : ""
            }
            ${
              vid
                ? `
      <div class="video-container" style="margin-top:10px">
        <iframe
          style="width:100%;aspect-ratio:16/9;border:0;border-radius:8px"
          src="https://www.youtube.com/embed/${vid}?rel=0&modestbranding=1"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          referrerpolicy="strict-origin-when-cross-origin"
          loading="lazy"
          onload="this.style.opacity=1"
          onerror="window.handleVideoError && window.handleVideoError(this, '${escapedVideoUrl}')"
        ></iframe>
      </div>`
                : ""
            }

   
    
  </div>
</div>
<div class="actions" style="margin-top:12px;display:flex;gap:8px;justify-content:flex-end">
  ${
    owned
      ? `<button class="pixel-btn" id="setSingerBtn">Set as Singer</button>`
      : `<button class="pixel-btn" disabled>Win in Wish</button>`
  }
  <button class="pixel-btn" id="dexCloseBtn">Close</button>
        </div>
      </div>`;

    document.body.appendChild(ov);

    // Add event handlers
    const close = () => {
      try {
        window.SFX?.play?.("ui.back");
      } catch {}
      ov.remove();
      // Clear NEW flag when viewing details
      if (entry?.new) {
        delete entry.new;
        setColl(coll);
      }
      // Also clear from NEW set
      try {
        const newSet = new Set(
          JSON.parse(localStorage.getItem("Wish.newIds") || "[]")
        );
        if (newSet.has(url)) {
          newSet.delete(url);
          localStorage.setItem(
            "Wish.newIds",
            JSON.stringify(Array.from(newSet))
          );
        }
      } catch {}
    };

    ov.addEventListener("click", (e) => {
      if (e.target === ov) close();
    });

    document.addEventListener("keydown", function escHandler(e) {
      if (e.key === "Escape") {
        close();
        document.removeEventListener("keydown", escHandler);
      }
    });

    const closeBtn = ov.querySelector("#dexCloseBtn");
    if (closeBtn) closeBtn.addEventListener("click", close);

    const singerBtn = ov.querySelector("#setSingerBtn");
    if (singerBtn) {
      singerBtn.addEventListener("click", () => {
        try {
          if (typeof window.singerSet === "function") {
            window.singerSet(url);
          } else {
            // Fallback: set current singer URL
            window.__currentSingerUrl = url;
            localStorage.setItem("currentSinger", url);
          }
          window.SFX?.play?.("ui.select");
        } catch {}
        close();
      });
    }

    // Play modal open sound
    try {
      window.SFX?.play?.("extra.camera");
    } catch {}

    // Add open class for CSS animation
    setTimeout(() => ov.classList.add("open"), 10);
  }

  function renderById(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    renderInto(el);
  }

  window.MikuDex = { renderInto: renderInto, renderById };
})();
