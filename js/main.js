// 🎀 MIKU ORCHESTRATOR! 🎀
// All functionality has been distributed to themed modules. This is pure orchestration.

// ========== SITE INITIALIZATION ORCHESTRATOR ==========
console.log("🎵 Initializing Miku systems...");

// Visitor counter
const k = "pixelbelle-visitors";
const c = (parseInt(localStorage.getItem(k) || "0", 10) || 0) + 1;
localStorage.setItem(k, String(c));
const el = document.getElementById("visitorCount");
el.textContent = String(c);

// Initialize games if available
// window.Games.initialize();

// Initialize jukebox if available
// Restore hooks

console.log("✨ Miku systems online!");

// Show welcome notification

window.initSite = function () {
  console.log("🎀 Miku Orchestrator loaded!");
  window.MikuUI.initializeContent();
  window.AudioMod.initBgm();
  window.ShimejiFunctions.init();
  window.hearts.initHearts();
  window.Jukebox.initialize();
  console.log(window.navi)
  window.navi.initNavigation();
  // greet on first visit only
  const visited = localStorage.getItem("pixelbelle-visited");
  if (!visited) {
    localStorage.setItem("pixelbelle-visited", "1");
    window.hearts.loveToast("Welcome to Baby Belle's Pixel Garden! ✨", "miku");
  }

};
