// Manifest loader: builds MIKU_IMAGES/MIKU_META, exposes ready promise + preloader.
(function () {
  if (window.MIKU_IMAGES) return;
  const C = window.SITE_CONTENT || {};
  const MIKU_IMAGES = [];
  const MIKU_META = Object.create(null);
  window.MIKU_META = MIKU_META;

  let resolveReady;
  const READY = new Promise((res) => (resolveReady = res));
  window.MIKU_IMAGES_READY = READY;

  function dispatchReady() {
    try {
      document.dispatchEvent(
        new CustomEvent("miku-images-ready", { detail: { images: MIKU_IMAGES.slice() } })
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

  function load() {
    const manifest = "./assets/pixel-miku/mikus.json";
    if (Array.isArray(C.images?.extraMikus))
      MIKU_IMAGES.push(
        ...C.images.extraMikus.filter((u) => typeof u === "string" && u),
      );
    fetch(manifest)
      .then((r) => r.json())
      .then((list) => {
        list.forEach((m) => {
          const url = `./assets/pixel-miku/${m.filename}`;
          MIKU_IMAGES.push(url);
          MIKU_META[url] = { ...m };
        });
        // Signal ready, then preload gently
        resolveReady && resolveReady(MIKU_IMAGES.slice());
        dispatchReady();
        // Preload after a short idle to avoid blocking first paint
        setTimeout(() => preloadAll(MIKU_IMAGES.slice()), 200);
      })
      .catch(() => {
        resolveReady && resolveReady([]);
        dispatchReady();
      });
  }

  window.getMikuMeta = function (url) {
    return MIKU_META[url] || null;
  };

  window.MIKU_IMAGES = MIKU_IMAGES;
  load();
})();
