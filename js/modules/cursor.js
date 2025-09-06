/* Cursor effects module: floating heart trail */
(function(){
  function initCursorEffects(){
    const cursorTrail = document.getElementById('cursorTrail');
    let lastTrailTime = 0;
    let rafId = null;
    document.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - lastTrailTime > 160 && !rafId){
        rafId = requestAnimationFrame(() => {
          createCursorTrail(e.clientX, e.clientY);
          lastTrailTime = now;
          rafId = null;
        });
      }
    }, { passive: true });
    function createCursorTrail(x, y){
      if (!window._heartPool) window._heartPool = [];
      let heart = window._heartPool.pop();
      if (!heart){
        heart = document.createElement('div');
        heart.className = 'heart-trail';
        heart.textContent = '💖';
      }
      heart.style.cssText = `left: ${x}px; top: ${y}px; opacity: 1; transform: translateZ(0);`;
      cursorTrail.appendChild(heart);
      setTimeout(() => {
        if (heart.parentNode){
          heart.parentNode.removeChild(heart);
          if (window._heartPool.length < 20){
            window._heartPool.push(heart);
          }
        }
      }, 2000);
    }
  }
  window.initCursorEffects = initCursorEffects;
})();
