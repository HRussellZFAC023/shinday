/* Shop module for shield and decoy items */
window.shop = (function () {
  const SFX = window.SFX;

  function getHearts() {
    return parseInt(localStorage.getItem("pixelbelle-hearts") || "0", 10);
  }

  function spendHearts(cost) {
    if (window.hearts && typeof window.hearts.addHearts === "function") {
      window.hearts.addHearts(-cost);
    } else {
      const h = Math.max(0, getHearts() - cost);
      localStorage.setItem("pixelbelle-hearts", String(h));
      const el = document.getElementById("heartCount");
      if (el) el.textContent = h;
    }
  }

  function spawnDecoyTreats(n = 2) {
    const body = document.body;
    const vw = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    for (let i = 0; i < n; i++) {
      const d = document.createElement("div");
      d.className = "decoy-treat";
      d.textContent = Math.random() < 0.5 ? "🍪" : "🍭";
      d.style.left = Math.random() * (vw - 50) + "px";
      d.style.animation = `decoyFloat ${6000 + Math.random() * 2000}ms linear forwards`;
      body.appendChild(d);
      setTimeout(() => d.remove(), 8000);
    }
    if (SFX && SFX.play) SFX.play("extra.yo");
  }

  let shieldUntil =
    parseInt(localStorage.getItem("diva.shield.until") || "0", 10) || 0;
  function activateHeartShield(ms = 3000) {
    shieldUntil = Date.now() + ms;
    localStorage.setItem("diva.shield.until", String(shieldUntil));

    const zone = document.getElementById("heartZone");
    if (zone) {
      zone.classList.add("warded");
      setTimeout(() => zone.classList.remove("warded"), ms);
    }

    let overlay = document.getElementById("shieldGlowOverlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "shieldGlowOverlay";
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: radial-gradient(circle, rgba(255,255,0,0.15) 0%, rgba(255,255,0,0.05) 70%, transparent 100%);
        border: 3px solid rgba(255,255,0,0.6);
        box-shadow: inset 0 0 30px rgba(255,255,0,0.4), 0 0 20px rgba(255,255,0,0.3);
        pointer-events: none;
        z-index: 9999;
        animation: shieldPulse 2s ease-in-out infinite alternate;
      `;
      document.body.appendChild(overlay);
      if (!document.getElementById("shieldGlowStyles")) {
        const style = document.createElement("style");
        style.id = "shieldGlowStyles";
        style.textContent = `@keyframes shieldPulse {0%{opacity:0.8;}100%{opacity:1;}}`;
        document.head.appendChild(style);
      }
    }
    overlay.style.display = "block";
    setTimeout(() => {
      overlay.style.display = "none";
    }, ms);
    if (SFX && SFX.play) SFX.play("extra.fx1");
  }

  function initShop() {
    const decoyBtn = document.getElementById("shopDecoy");
    const shieldBtn = document.getElementById("shopShield");

    if (decoyBtn) {
      decoyBtn.addEventListener("click", () => {
        if (getHearts() >= 5) {
          spendHearts(5);
          spawnDecoyTreats(1 + Math.floor(Math.random() * 3));
          window.hearts &&
            window.hearts.loveToast &&
            window.hearts.loveToast("Decoy deployed! 🍪");
        } else {
          window.hearts &&
            window.hearts.loveToast &&
            window.hearts.loveToast("Not enough hearts!");
        }
      });
    }

    if (shieldBtn) {
      shieldBtn.addEventListener("click", () => {
        if (getHearts() >= 50) {
          spendHearts(50);
          activateHeartShield(3000);
          window.hearts &&
            window.hearts.loveToast &&
            window.hearts.loveToast("Shield activated! ⛨");
        } else {
          window.hearts &&
            window.hearts.loveToast &&
            window.hearts.loveToast("Not enough hearts!");
        }
      });
    }
  }

  return { initShop, activateHeartShield, spawnDecoyTreats };
})();
