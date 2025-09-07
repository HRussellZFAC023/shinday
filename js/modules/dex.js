// Reusable MikuDex renderer with filters, search, and popover details
(function () {
  if (window.MikuDex) return;

  const LS_FILTER = "Wish.dexFilter";
  const PIXIE_URL = "./assets/pixel-miku/101 - PixieBel (bonus).gif";

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
      if ((u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be"))) {
        if (u.hostname.includes("youtu.be")) return u.pathname.replace(/^\//, "");
        const v = u.searchParams.get("v");
        if (v) return v;
      }
    } catch {}
    return null;
  }

  function buildControlsHtml(filter) {
    return `
      <div class="dex-controls">
        <label for="dexScope">Scope</label>
        <select id="dexScope">
          <option value="all" ${filter.scope === "all" ? "selected" : ""}>All</option>
          <option value="owned" ${filter.scope === "owned" ? "selected" : ""}>Owned</option>
          <option value="missing" ${filter.scope === "missing" ? "selected" : ""}>Missing</option>
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
        <input id="dexSearch" type="search" placeholder="name..." value="${
          (filter.search || "").replace(/"/g, "&quot;")
        }"/>
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
    const urls = includePixie && base.indexOf(PIXIE_URL) === -1 ? base.concat([PIXIE_URL]) : base;
    const filter = currentFilter();

    const ownedCount = Object.keys(coll).length;
    const totalCount = base.length; // exclude Pixie for header progress

    const tiles = urls
      .map((url) => {
        const meta = typeof window.getMikuMeta === "function" ? window.getMikuMeta(url) : null;
        const name = meta?.name || meta?.title || (url.split("/").pop() || "Miku").replace(/\.[a-z0-9]+$/i, "");
        const r = meta?.rarity || (/(PixieBel \(bonus\)\.gif)$/i.test(url) ? 6 : rarityFor(url));
        const entry = coll[url];
        const owned = !!entry;
        const passesScope =
          filter.scope === "all" ? true : filter.scope === "owned" ? owned : !owned;
        const passesRarity = !filter.rarity || filter.rarity === r;
        const passesSearch = !filter.search || name.toLowerCase().includes(filter.search.toLowerCase());
        if (!(passesScope && passesRarity && passesSearch)) return "";
        const ownClass = owned ? `owned rarity-${r}` : "locked";
        const newBadge = entry?.new ? '<div class="Wish-new">NEW!</div>' : "";
        return `
          <div class="dex-card ${ownClass}" data-url="${url}" tabindex="0">
            <div class="dex-stars">${stars(r)}</div>
            <img src="${url}" alt="${name}" loading="lazy" decoding="async" />
            ${owned ? `<span class="dex-count">x${entry.count || 1}</span>` : `<span class="dex-locked">?</span>`}
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
    if (searchInp)
      searchInp.oninput = () => {
        saveFilter({ ...filter, search: searchInp.value.trim() });
        // defer slight to keep typing feel
        setTimeout(() => renderInto(container), 0);
      };

    // Tile popovers
    container.querySelectorAll(".dex-card").forEach((card) => {
      card.addEventListener("click", () => openDetails(card.getAttribute("data-url")));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openDetails(card.getAttribute("data-url"));
        }
      });
    });

    // Clear new flags when Dex renders
    let cleared = false;
    Object.keys(coll).forEach((k) => {
      if (coll[k].new) {
        delete coll[k].new;
        cleared = true;
      }
    });
    if (cleared) setColl(coll);
  }

  function openDetails(url) {
    const meta = typeof window.getMikuMeta === "function" ? window.getMikuMeta(url) : null;
    const name = meta?.name || meta?.title || (url.split("/").pop() || "Miku").replace(/\.[a-z0-9]+$/i, "");
    const rarity = meta?.rarity || (/(PixieBel \(bonus\)\.gif)$/i.test(url) ? 6 : rarityFor(url));
    const vid = ytIdFrom(meta?.song || meta?.video);
    const links = Array.isArray(meta?.links) ? meta.links : [];

    const ov = document.createElement("div");
    ov.setAttribute(
      "style",
      "position:fixed;inset:0;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;z-index:10001;"
    );
    const panel = document.createElement("div");
    panel.setAttribute(
      "style",
      "width:min(920px,92vw);max-height:90vh;overflow:auto;background:#fff;border:3px solid var(--border);border-radius:14px;box-shadow:var(--shadow);padding:14px"
    );
    panel.innerHTML = `
      <div class="dex-details">
        <div class="dex-title">${name}</div>
        <div class="dex-rarity">${stars(rarity)}</div>
        <div style="display:grid;grid-template-columns:200px 1fr;gap:14px;align-items:start">
          <img src="${url}" alt="${name}" style="width:200px;image-rendering:pixelated;border-radius:10px;border:2px solid var(--border)"/>
          <div>
            ${meta?.description ? `<div class="dex-desc">${meta.description}</div>` : ""}
            ${vid ? `<div class="dex-video" style="margin-top:10px"><iframe src="https://www.youtube.com/embed/${vid}" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe></div>` : ""}
            ${links.length ? `<div class="dex-links" style="margin-top:10px">${links
              .map((l, i) => `<a href="${l}" target="_blank" rel="noopener" class="dex-link">Link ${i + 1}</a>`)
              .join(" ")}</div>` : ""}
          </div>
        </div>
        <div style="margin-top:12px;display:flex;gap:8px;justify-content:flex-end">
          <button class="pixel-btn" id="dexCloseBtn">Close</button>
        </div>
      </div>`;
    ov.appendChild(panel);
    document.body.appendChild(ov);
    const close = () => ov.remove();
    ov.addEventListener("click", (e) => {
      if (e.target === ov) close();
    });
    panel.querySelector("#dexCloseBtn").addEventListener("click", close);
  }

  function renderById(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    renderInto(el);
  }

  window.MikuDex = { renderInto: renderInto, renderById };
})();
