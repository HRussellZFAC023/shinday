// 🎀 MIKU ORCHESTRATOR - TINY MAIN FOR SCREAM DRIVEN DEVELOPMENT! 🎀
// All functionality has been distributed to themed modules. This is pure orchestration.

// ========== SITE INITIALIZATION ORCHESTRATOR ==========
console.log("🎌 Miku Orchestrator starting...");
(function(){
  // Back-compat lightweight boot log; visitor counter handled in initSite
  console.log('🌸 Main orchestrator boot');
})();

// Site initialization pipeline
async function initSite() {
  if (window.__siteInitialized) return;
  window.__siteInitialized = true;
  
  console.log("🎵 Initializing Miku systems...");

  // Visitor counter (restored)
  const k = 'pixelbelle-visitors';
  const c = (parseInt(localStorage.getItem(k) || '0', 10) || 0) + 1;
  localStorage.setItem(k, String(c));
  const el = document.getElementById('visitorCount');
  if (el) el.textContent = String(c);
  
  // Initialize core systems
  if (window.MikuCore?.initialize) window.MikuCore.initialize();
  if (window.MikuSystem?.initialize) window.MikuSystem.initialize();
  if (window.MikuUI?.initialize) window.MikuUI.initialize();
  
  // Auto-enhance the page
  if (window.MikuUI?.enhance) {
    window.MikuUI.enhance.icons();
    window.MikuUI.enhance.widgets();
  }

  // Populate site content from SITE_CONTENT (restored)
  const C = window.SITE_CONTENT || {};
  const t = document.getElementById('siteTitle');
  if (t && C.title) t.textContent = C.title;
  const sub = document.getElementById('siteSub');
  if (sub && C.subtitle) sub.textContent = C.subtitle;
  const hero = document.getElementById('heroMiku');
  if (hero && C.images?.heroMiku) hero.src = C.images.heroMiku;
  const shrine = document.getElementById('shrineMiku');
  if (shrine && C.images?.shrineMiku) shrine.src = C.images.shrineMiku;
  
  // Initialize BGM if available  
  if (window.initBGM) window.initBGM();
  
  // Start shimejis if available
  if (window.ShimejiFunctions?.init) window.ShimejiFunctions.init();
  
  // Initialize games if available
  if (window.Games?.initialize) window.Games.initialize();
  
  // Initialize jukebox if available
  if (window.Jukebox?.initialize) window.Jukebox.initialize();
  // Restore hooks
  if (window.Jukebox?.attachHudSelect) window.Jukebox.attachHudSelect();
  if (window.Diva?.updateUnlockProgress) window.Diva.updateUnlockProgress();
  
  console.log("✨ Miku systems online!");
  
  // Show welcome notification
  if (window.MikuUI?.effects?.toast) {
    window.MikuUI.effects.toast("Welcome to Baby Belle's Pixel Garden! ✨", 'miku');
  }
}

// Make initSite globally accessible
window.initSite = initSite;

// Auto-start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure all modules are loaded
    setTimeout(initSite, 100);
  });
} else {
  setTimeout(initSite, 100);
}

// Legacy compatibility - immediate execution fallback
if (!window.__entered) {
  setTimeout(() => {
    if (!window.__siteInitialized && !window.__entered) {
      console.log("🎵 Fallback initialization...");
      initSite();
    }
  }, 2000);
}

console.log("🎀 Miku Orchestrator loaded!");

// Provide a soft stub for Wish cleanup to avoid errors during early boot
window.__resetWish = window.__resetWish || function(){};