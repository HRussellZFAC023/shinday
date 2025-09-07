(function () {
  function init() {
    const gal = document.getElementById("mikuGallery");
    if (!gal || !window.MikuDex) return;
    // Render Dex in place of gallery
    gal.innerHTML = '<div id="shrineDex" class="Wish-collection"></div>';
    const container = document.getElementById("shrineDex");
    window.MikuDex.renderInto(container);
  }
  const start = () => {
    if (typeof window.MIKU_IMAGES_READY?.then === "function")
      window.MIKU_IMAGES_READY.then(init);
    else init();
  };
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", start);
  else start();
})();
