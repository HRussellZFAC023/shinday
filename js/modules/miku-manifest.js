// Manifest loader: builds MIKU_IMAGES/MIKU_META from site content and keeps them in sync.
(function () {
  if (window.MIKU_IMAGES) return;

  const MIKU_IMAGES = [];
  const MIKU_META = Object.create(null);
  window.MIKU_META = MIKU_META;

  let resolveReady;
  let readyResolved = false;
  const READY = new Promise((res) => (resolveReady = res));
  window.MIKU_IMAGES_READY = READY;

  function dispatchReady() {
    try {
      document.dispatchEvent(
        new CustomEvent("miku-images-ready", {
          detail: { images: MIKU_IMAGES.slice() },
        }),
      );
    } catch {}
  }

  function preloadAll(urls) {
    const saveData = navigator.connection && navigator.connection.saveData;
    const maxAtOnce = saveData ? 0 : 8; // parallel batches
    if (maxAtOnce <= 0) return; // respect Save-Data
    let i = 0;
    function loadNextBatch() {
      const batch = urls.slice(i, i + maxAtOnce);
      i += maxAtOnce;
      batch.forEach((src) => {
        const img = new Image();
        img.decoding = "async";
        img.loading = "lazy";
        img.src = src;
      });
      if (i < urls.length) setTimeout(loadNextBatch, 50);
    }
    loadNextBatch();
  }

  function currentExtras() {
    const C = window.SITE_CONTENT || {};
    const extras = Array.isArray(C.images?.extraMikus) ? C.images.extraMikus : [];
    return extras.filter((u) => typeof u === "string" && u);
  }

  function applyList(list) {
    const extras = currentExtras();
    const dedup = new Set();
    MIKU_IMAGES.length = 0;
    Object.keys(MIKU_META).forEach((key) => delete MIKU_META[key]);

    extras.forEach((src) => {
      if (dedup.has(src)) return;
      dedup.add(src);
      MIKU_IMAGES.push(src);
    });

    list.forEach((m) => {
      if (!m || !m.filename) return;
      const isAbsolute = /^(?:https?:)?\//i.test(m.filename);
      const url = isAbsolute
        ? m.filename
        : `./assets/pixel-miku/${m.filename}`;
      if (!dedup.has(url)) {
        dedup.add(url);
        MIKU_IMAGES.push(url);
      }
      MIKU_META[url] = { ...m };
    });

    if (!readyResolved) {
      readyResolved = true;
      resolveReady && resolveReady(MIKU_IMAGES.slice());
    }
    dispatchReady();
    if (MIKU_IMAGES.length) {
      // Preload after a short idle to avoid blocking first paint
      setTimeout(() => preloadAll(MIKU_IMAGES.slice()), 200);
    }
  }

  function ensureData() {
    const content = window.SITE_CONTENT;
    const list = Array.isArray(content?.mikus) ? content.mikus : null;
    if (!list || !list.length) return false;
    applyList(list);
    return true;
  }

  function handleContentReady() {
    ensureData();
  }

  // Resolve with an empty array if data never arrives within a reasonable time.
  setTimeout(() => {
    if (!readyResolved) {
      readyResolved = true;
      resolveReady && resolveReady([]);
    }
  }, 7000);

  document.addEventListener("site-content-ready", handleContentReady);
  ensureData();

  window.getMikuMeta = function (url) {
    return MIKU_META[url] || null;
  };

  window.MIKU_IMAGES = MIKU_IMAGES;
})();
