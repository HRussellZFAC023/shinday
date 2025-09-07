/* Main orchestrator — lean and modular */
(function(){
  console.log('🌸 Main orchestrator boot');
  const C = window.SITE_CONTENT || {};

  // visitor counter
  try{
    const k='pixelbelle-visitors';
    const c=(parseInt(localStorage.getItem(k)||'0',10)||0)+1;
    localStorage.setItem(k, String(c));
    const el=document.getElementById('visitorCount'); if (el) el.textContent=String(c);
  }catch(_){ }

  function initSite(){
    try { const t=document.getElementById('siteTitle'); if (t && C.title) t.textContent=C.title; }catch(_){ }
    try { const sub=document.getElementById('siteSub'); if (sub && C.subtitle) sub.textContent=C.subtitle; }catch(_){ }
    try { const hero=document.getElementById('heroMiku'); if (hero && C.images?.heroMiku) hero.src=C.images.heroMiku; }catch(_){ }
    try { const shrine=document.getElementById('shrineMiku'); if (shrine && C.images?.shrineMiku) shrine.src=C.images.shrineMiku; }catch(_){ }
    try { window.Jukebox?.attachHudSelect?.(); }catch(_){ }
    try { window.Diva?.updateUnlockProgress?.(); }catch(_){ }
  }
  window.initSite = window.initSite || initSite;
})();
