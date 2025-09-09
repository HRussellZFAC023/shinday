(function () {
  function initHeartGarden() {
    const zone = document.getElementById("heartZone");
    if (!zone) return;
    zone.textContent = "";
    zone.style.position = "relative";

    function spawn() {
      const target = document.createElement("div");
      target.className = "heart-target";
      const ring = document.createElement("div");
      ring.className = "approach";
      target.appendChild(ring);
      const size = 40;
      const x = Math.random() * (zone.clientWidth - size);
      const y = Math.random() * (zone.clientHeight - size);
      target.style.left = x + "px";
      target.style.top = y + "px";
      zone.appendChild(target);
      const born = performance.now();
      let collected = false;
      function collect() {
        if (collected) return;
        collected = true;
        const diff = performance.now() - born;
        let reward = 5;
        if (diff > 1200 && diff < 1800) reward = 15;
        else if (diff > 800 && diff < 2200) reward = 10;
        if (window.hearts && window.hearts.addHearts)
          window.hearts.addHearts(reward);
        const rect = zone.getBoundingClientRect();
        if (window.hearts && window.hearts.createFloatingHeart)
          window.hearts.createFloatingHeart(
            rect.left + x + size / 2,
            rect.top + y + size / 2,
          );
        target.remove();
      }
      target.addEventListener("click", collect);
      setTimeout(() => {
        if (!collected) target.remove();
      }, 2400);
      setTimeout(spawn, 800);
    }
    spawn();
  }
  initHeartGarden();
})();
