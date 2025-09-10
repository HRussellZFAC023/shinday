// Additive script to animate the Miku Claw Machine and spawn floating tags.
// This script relies on the existing Wish system defined in wish.js.
(function () {
  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }
  onReady(() => {
    const lever = document.getElementById("WishLever");
    const claw = document.querySelector(".cm-claw");
    const results = document.getElementById("WishResults");
    const buttons = [
      document.getElementById("WishPull1"),
      document.getElementById("WishPull10"),
      document.getElementById("WishDaily"),
      document.getElementById("WishConvert"),
    ].filter(Boolean);

    // Animate lever and claw on pulls
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // lever animation
        if (lever) {
          lever.classList.add("pulling");
          setTimeout(() => {
            lever.classList.remove("pulling");
          }, 600);
        }
        // claw animation: drop down, close, then return
        if (claw) {
          // initial drop
          claw.style.transition = "transform 0.8s ease-in-out";
          claw.style.transform = "translateY(140px)";
          // close arms halfway through
          setTimeout(() => {
            claw.classList.add("close");
          }, 400);
          // return after pull
          setTimeout(() => {
            claw.classList.remove("close");
            claw.style.transform = "translateY(0)";
          }, 1200);
        }
      });
    });

    // Mutation observer to spawn tags on new cards
    if (results) {
      const obs = new MutationObserver((mutations) => {
        mutations.forEach((m) => {
          m.addedNodes.forEach((node) => {
            if (node.nodeType === 1 && node.classList.contains("Wish-card")) {
              // Determine rarity from class (rarity-X)
              const match = node.className.match(/rarity-(\d)/);
              const rarity = match ? parseInt(match[1], 10) : 1;
              let label = "GET!";
              if (rarity >= 5) label = "RATE UP!";
              else if (rarity === 4) label = "Bonus";
              spawnTag(label);
            }
          });
        });
      });
      obs.observe(results, { childList: true });
    }

    function spawnTag(text) {
      const win = document.querySelector(".ClawMachine .cm-window");
      if (!win) return;
      const tag = document.createElement("div");
      tag.className = "wish-tag";
      tag.textContent = text;
      // Random horizontal offset within window
      const x = Math.random() * 60 + 20; // 20% - 80%
      tag.style.left = x + "%";
      win.appendChild(tag);
      setTimeout(() => {
        tag.remove();
      }, 2000);
    }
  });
})();