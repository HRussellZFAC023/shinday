// Minimal manifest loader: builds MIKU_IMAGES and exposes a ready promise + simple preloader.
(function () {
  if (window.MIKU_IMAGES) return;
  const C = window.SITE_CONTENT || {};
  const MIKU_IMAGES = [];
  const MIKU_META = Object.create(null);
  window.MIKU_META = MIKU_META;
  let resolveReady;
  window.MIKU_IMAGES_READY = new Promise((r) => (resolveReady = r));

  function preloadImages(list) {
    if (!Array.isArray(list) || !list.length) return;
    list.slice(0, list.length).forEach((u) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = u;
    });
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
          // preserve manifest metadata for compatibility with code that expects MIKU_META
          MIKU_META[url] = { ...m };
        });
      })
      .catch(() => {})
      .finally(() => {
        if (typeof resolveReady === "function") resolveReady(MIKU_IMAGES.slice());
        document.dispatchEvent(
          new CustomEvent("miku-images-ready", { detail: { images: MIKU_IMAGES.slice() } }),
        );
        // Start preloading a small batch of images so UI displays feel snappier.
        preloadImages(MIKU_IMAGES);
      });
  }

  window.getMikuMeta = function (url) {
    return MIKU_META[url] || null;
  };

  window.MIKU_IMAGES = MIKU_IMAGES;
  load();
})();
