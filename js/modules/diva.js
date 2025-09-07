/* Project Diva-style mini game */
(function(){
  const ASSETS = {
    bg: './assets/root.png',
    kirby: './assets/swallow.gif'
  };

  const LS = {
    shieldUntil: 'diva.shield.until'
  };

  const JUDGES = [
    { key: 'cool', window: 80, color: '#7dd3fc' },
    { key: 'good', window: 140, color: '#86efac' },
    { key: 'fine', window: 200, color: '#fde68a' },
    { key: 'sad', window: 260, color: '#fca5a5' },
  ];

  let lives = 5;
  let maxLives = 5;
  let running = false;
  let shieldTimer = null;
  let kirbyTimer = null;
  let spawnTimer = null;
  let difficulty = 'normal';

  function now(){ return performance.now(); }
  function byId(id){ return document.getElementById(id); }

  function getSinger(){
    // Attempt to use current singer; fall back to heroMiku
    try { if (window.__currentSingerUrl) return window.__currentSingerUrl; } catch(_){ }
    try { const img = document.getElementById('heroMiku'); if (img && img.src) return img.src; } catch(_){ }
    return './assets/pixel-miku/001 - Hatsune Miku (Original).png';
  }

  function setLives(n){
    lives = Math.max(0, Math.min(maxLives, n));
    try {
      const el = byId('hudLives');
      const maxEl = byId('hudMaxLives');
      if (el) el.textContent = String(lives);
      if (maxEl) maxEl.textContent = String(maxLives);
    } catch(_){ }
    if (lives <= 0) songOver();
  }

  function updateUnlockProgress(){
    try{
      const coll = JSON.parse(localStorage.getItem('Wish.collection')||'{}');
      const owned = Object.keys(coll).length;
      const total = Array.isArray(window.MIKU_IMAGES) ? window.MIKU_IMAGES.length : 100;
      const pct = Math.min(100, Math.round((owned/Math.max(1,total))*100));
      const wrap = byId('hudUnlockBar');
      const fill = byId('hudUnlockProgress');
      const text = byId('hudUnlockText');
      if (fill) fill.style.width = pct+'%';
      if (text) text.textContent = `Unlocks: ${owned}/${total}`;
      if (wrap) wrap.title = text ? text.textContent : '';
    }catch(_){ }
  }

  function playSfx(key){ try{ window.SFX && SFX.play(key); }catch(_){ } }

  function judgeHit(delta){
    const ad = Math.abs(delta);
    for (const j of JUDGES){ if (ad <= j.window) return j; }
    return null;
  }

  function showJudge(stage, key, color){
    const banner = stage.querySelector('.diva-judge');
    if (!banner) return;
    banner.textContent = key.toUpperCase();
    banner.style.color = color || '#333';
    banner.classList.add('show');
    setTimeout(()=> banner.classList.remove('show'), 600);
  }

  function spawnDot(stage, laneEl, speed){
    const dot = document.createElement('div');
    dot.className = 'diva-dot';
    dot.style.animationDuration = `${speed}ms`;
    laneEl.appendChild(dot);
    const hitTime = now() + speed;
    let hit = false;
    const onHit = (e)=>{
      if (hit) return;
      hit = true;
      const delta = hitTime - now();
      const j = judgeHit(delta);
      if (j){
        // Correct-ish answers: play GOOD only for truly correct; others map accordingly
        if (j.key === 'good') playSfx('Wish.mid');
        else if (j.key === 'cool') playSfx('extra.fx1');
        else if (j.key === 'fine') playSfx('ui.move');
        else if (j.key === 'sad') playSfx('ui.unavailable');
        showJudge(stage, j.key, j.color);
        // hearts bonus on good/cool
        if (j.key === 'good' || j.key === 'cool') { try{ window.Hearts?.add?.(1); }catch(_){ } }
      } else {
        // Miss
        playSfx('Wish.fail');
        showJudge(stage, 'miss', '#ef4444');
        setLives(lives-1);
      }
      dot.remove();
    };
    dot.addEventListener('click', onHit, { once: true });
    setTimeout(()=>{ if (!hit){ playSfx('Wish.fail'); showJudge(stage,'miss','#ef4444'); setLives(lives-1); dot.remove(); } }, speed+60);
  }

  function startSong(stage){
    running = true;
    setLives(5);
    const lanes = Array.from(stage.querySelectorAll('.diva-lane'));
    const baseSpeed = difficulty==='easy'? 2200 : difficulty==='hard'? 1400 : 1800;
    let t = 0;
    spawnTimer = setInterval(()=>{
      if (!running) return;
      const lane = lanes[Math.floor(Math.random()*lanes.length)];
      spawnDot(stage, lane, baseSpeed + Math.floor(Math.random()*400-200));
      t++;
      if (t>64) completeSong(stage);
    }, 500);

    // Kirby spawns occasionally
    kirbyTimer = setInterval(()=> spawnKirby(stage), 4500);
  }

  function stopSong(){
    running = false;
    clearInterval(spawnTimer); spawnTimer=null;
    clearInterval(kirbyTimer); kirbyTimer=null;
  }

  function completeSong(stage){
    stopSong();
    // Reset lives for next song
    setLives(5);
    try{ playSfx('extra.thanks'); }catch(_){ }
    const banner = stage.querySelector('.diva-judge');
    if (banner){ banner.textContent = 'SONG CLEAR!'; banner.style.color = '#22c55e'; banner.classList.add('show'); setTimeout(()=>banner.classList.remove('show'), 1200); }
  }

  function songOver(){
    stopSong();
    const stage = document.querySelector('.diva-stage');
    const banner = stage && stage.querySelector('.diva-judge');
    if (banner){ banner.textContent = 'SONG OVER'; banner.style.color = '#ef4444'; banner.classList.add('show'); }
  }

  function isShieldActive(){
    const until = parseInt(localStorage.getItem(LS.shieldUntil)||'0',10);
    return Date.now() < until;
  }



  function spawnKirby(stage){
    const k = document.createElement('img');
    k.src = ASSETS.kirby;
    k.alt = 'swallow';
    k.className = 'diva-kirby';
    k.style.left = Math.random()<0.5? '-80px' : 'calc(100% + 80px)';
    k.style.top = (Math.random()*60+20)+'%';
    stage.appendChild(k);
    const singer = stage.querySelector('.diva-singer');
    const speed = 5000;
    const dir = k.style.left.startsWith('-') ? 1 : -1;
    const start = performance.now();
    function step(ts){
      const p = Math.min(1, (ts-start)/speed);
      const x = (dir>0? -80 : stage.clientWidth+80) + dir * (stage.clientWidth+160) * p;
      k.style.transform = `translateX(${x}px)`;
      // collision
      if (singer && !isShieldActive()){
        const kr = k.getBoundingClientRect();
        const sr = singer.getBoundingClientRect();
        if (kr.left < sr.right && kr.right > sr.left && kr.top < sr.bottom && kr.bottom > sr.top){
          // hit!
          playSfx('ui.unavailable');
          singer.classList.add('stunned');
          setTimeout(()=> singer.classList.remove('stunned'), 1000);
          setLives(lives-1);
        }
      }
      if (p<1 && k.isConnected) requestAnimationFrame(step); else k.remove();
    }
    requestAnimationFrame(step);
  }



  window.Diva = { updateUnlockProgress };
})();
