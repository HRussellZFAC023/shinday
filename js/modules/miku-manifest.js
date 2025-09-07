// Minimal manifest loader: builds MIKU_IMAGES and exposes a ready promise + simple preloader.
(function () {
  if (window.MIKU_IMAGES) return;
  const C = window.SITE_CONTENT || {};
  const MIKU_IMAGES = [];
  const MIKU_META = Object.create(null);
  window.MIKU_META = MIKU_META;

  let resolveReady;
  window.MIKU_IMAGES_READY = new Promise((r) => (resolveReady = r));

  function preloadImages(list, limit = (C.preloadLimit || 30)) {
    if (!Array.isArray(list) || !list.length) return Promise.resolve([]);
    const slice = list.slice(0, limit);
    const promises = slice.map((u) =>
      new Promise((res) => {
        try {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => res({ url: u, ok: true });
          img.onerror = () => res({ url: u, ok: false });
          img.src = u;
        } catch (e) {
          res({ url: u, ok: false });
        }
      }),
    );
    return Promise.all(promises);
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
        // Start preloading the entire list of images so UI displays are ready.
        // Expose a promise modules can await: window.MIKU_IMAGES_PRELOADED
        // Note: preloading all images may be heavy on network; use with care.
        window.MIKU_IMAGES_PRELOADED = preloadImages(MIKU_IMAGES, MIKU_IMAGES.length)
          .then((results) => {
            // dispatch an event modules can listen to
            try {
              document.dispatchEvent(
                new CustomEvent("miku-images-preloaded", { detail: { results } }),
              );
            } catch (e) {}
            return results;
          });
        // convenience helper to await preload completion
        window.waitForMikuPreload = () => window.MIKU_IMAGES_PRELOADED || Promise.resolve([]);
      });
  }

  window.getMikuMeta = function (url) {
    return MIKU_META[url] || null;
  };

  window.MIKU_IMAGES = MIKU_IMAGES;
  load();
})();
