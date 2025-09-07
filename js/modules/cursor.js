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

  async function initAniCursors(){
    try {
      const smallScreen = Math.min(window.innerWidth, window.innerHeight) < 500;
      const prefersReduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const saveData = navigator.connection && navigator.connection.saveData;
      if (smallScreen || prefersReduce || saveData) return;
      const roleToFile = {
        normal: "Normal.ani",
        link: "Link.ani",
        text: "Text.ani",
        help: "Help.ani",
        busy: "Busy.ani",
        working: "Working.ani",
        precision: "Precision.ani",
        move: "Move.ani",
        person: "Person.ani",
        unavailable: "Unavailable.ani",
        vertical: "Vertical.ani",
        horizontal: "Horizontal.ani",
        diagonal1: "Diagonal1.ani",
        diagonal2: "Diagonal2.ani",
        handwriting: "Handwriting.ani",
        pin: "Pin.ani",
        alternate: "Alternate.ani",
      };
      const boot = async () => {
        const mod = await import("https://cdn.skypack.dev/ani-cursor");
        const style = document.createElement("style");
        style.id = "ani-cursor-styles";
        document.head.appendChild(style);
        const base = encodeURI("./assets/ani file-animation WxS/");
        const aniCssCache = new Map();
        const aniApplied = new Set();
        async function getAniCss(selector, fileName){
          const key = `${selector}::${fileName}`;
          if (aniCssCache.has(key)) return aniCssCache.get(key);
          try {
            const res = await fetch(`${base}${encodeURIComponent(fileName)}`);
            const buf = await res.arrayBuffer();
            const convert = mod.convertAniBinaryToCSS || (mod.default && mod.default.convertAniBinaryToCSS);
            if (!convert) throw new Error("ani-cursor convert not available");
            const css = convert(selector, new Uint8Array(buf));
            aniCssCache.set(key, css);
            return css;
          } catch(_) { return ""; }
        }
        async function applyAni(selector, fileName){
          const appliedKey = `${selector}::${fileName}`;
          if (aniApplied.has(appliedKey)) return;
          try {
            const css = await getAniCss(selector, fileName);
            if (css){
              style.appendChild(document.createTextNode(css));
              aniApplied.add(appliedKey);
            }
          } catch(_){}
        }
        await Promise.all([
          applyAni("html, body", roleToFile.normal),
          applyAni("a, button, .pixel-btn, .heart-btn, .radio-btn, .enter-btn, .quick-links a", roleToFile.link),
          applyAni('input, textarea, [contenteditable="true"], .editable', roleToFile.text),
          applyAni('.memory-card, .Wish-card, .dex-card, .memory-grid, canvas, svg', roleToFile.precision),
        ]);
        const applyLater = () => Promise.all([
          applyAni('.hero-miku, .splash-miku, .float-miku, .shrine-image, #shrineMiku, #heroMiku, #splashMiku, .avatar, .friend-avatar', roleToFile.person),
          applyAni('.help, [title], .widget h3, .status-item, .hud-line', roleToFile.help),
          applyAni('[draggable="true"], .draggable, .movable, .Wish-card.matched', roleToFile.move),
          applyAni('button:disabled, .pixel-btn:disabled, [aria-disabled="true"], .disabled, .unavailable', roleToFile.unavailable),
          applyAni('.badge, .pin, .pinned, .candle, .blink, #statusDot', roleToFile.pin),
        ]).catch(()=>{});
        if (window.requestIdleCallback) requestIdleCallback(() => applyLater());
        else setTimeout(applyLater, 1500);
        // Ensure mode CSS is generated once and toggled via classes
        let _busyCssReady = false;
        let _workingCssReady = false;
        const BUSY_SEL = '.is-busy, .is-busy *';
        const WORK_SEL = '.is-working, .is-working *';

        window.setBusyCursor = async (on) => {
          try {
            if (!_busyCssReady) {
              await applyAni(BUSY_SEL, roleToFile.busy);
              _busyCssReady = true;
            }
            const root = document.documentElement;
            if (on) {
              root.classList.add('is-busy');
              // Safety auto-clear after 6s
              clearTimeout(window.__busyClearT);
              window.__busyClearT = setTimeout(() => {
                try { document.documentElement.classList.remove('is-busy'); } catch(_) {}
              }, 6000);
            } else {
              root.classList.remove('is-busy');
              clearTimeout(window.__busyClearT);
            }
          } catch(_) {}
        };

        window.setWorkingCursor = async (on) => {
          try {
            if (!_workingCssReady) {
              await applyAni(WORK_SEL, roleToFile.working);
              _workingCssReady = true;
            }
            const root = document.documentElement;
            if (on) root.classList.add('is-working');
            else root.classList.remove('is-working');
          } catch(_) {}
        };
        window.setGameCursor = (mode) => {
          const id = "ani-game-cursor";
          let gameStyle = document.getElementById(id);
          if (mode && roleToFile[mode]){
            if (!gameStyle){
              gameStyle = document.createElement('style');
              gameStyle.id = id;
              document.head.appendChild(gameStyle);
            }
            gameStyle.textContent = `.memory-card, .Wish-card, .heart-zone { cursor: auto !important; }`;
            applyAni('.memory-card, .Wish-card, .heart-zone', roleToFile[mode]);
          } else if (gameStyle){
            gameStyle.remove();
          }
        };
      };
      if (window.requestIdleCallback) requestIdleCallback(() => boot());
      else setTimeout(() => boot(), 1500);
    } catch(_) { }
  }

  function init(){
    initCursorEffects();
    initAniCursors();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.initCursorEffects = initCursorEffects;
  window.initAniCursors = initAniCursors;
})();
