// Minimal manifest loader: builds MIKU_IMAGES and exposes a ready promise + simple preloader.
(function () {
  if (window.MIKU_IMAGES) return;
  const C = window.SITE_CONTENT || {};
  const MIKU_IMAGES = [];
  const MIKU_META = Object.create(null);
  window.MIKU_META = MIKU_META;

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
      })
  }

  window.getMikuMeta = function (url) {
    return MIKU_META[url] || null;
  };

  window.MIKU_IMAGES = MIKU_IMAGES;
  load();
})();
