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
      const coll = JSON.parse(localStorage.getItem('gacha.collection')||'{}');
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
        if (j.key === 'good') playSfx('gacha.mid');
        else if (j.key === 'cool') playSfx('extra.fx1');
        else if (j.key === 'fine') playSfx('ui.move');
        else if (j.key === 'sad') playSfx('ui.unavailable');
        showJudge(stage, j.key, j.color);
        // hearts bonus on good/cool
        if (j.key === 'good' || j.key === 'cool') { try{ window.Hearts?.add?.(1); }catch(_){ } }
      } else {
        // Miss
        playSfx('gacha.fail');
        showJudge(stage, 'miss', '#ef4444');
        setLives(lives-1);
      }
      dot.remove();
    };
    dot.addEventListener('click', onHit, { once: true });
    setTimeout(()=>{ if (!hit){ playSfx('gacha.fail'); showJudge(stage,'miss','#ef4444'); setLives(lives-1); dot.remove(); } }, speed+60);
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

  function setShieldMs(ms){
    const until = Date.now()+ms;
    localStorage.setItem(LS.shieldUntil, String(until));
    updateItemsUI();
  }

  function updateItemsUI(){
  // Items moved to sidebar shop; no-op UI updater
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

  function buyShield(){
    const cost = 100;
    if (isShieldActive()) return;
    const hearts = parseInt(localStorage.getItem('pixelbelle-hearts')||'0',10);
    if (hearts < cost){ try{ playSfx('ui.unavailable'); }catch(_){ } window.loveToast?.(`💖が足りないよ！(${cost}必要)`); return; }
    try{ window.Hearts?.add?.(-cost); }catch(_){ localStorage.setItem('pixelbelle-hearts', String(hearts-cost)); window.updateCounters?.(); }
    setShieldMs(1000*60*5); // 5 minutes
    try{ playSfx('ui.select'); }catch(_){ }
  }

  function buyBait(){
    const cost = 10;
    const hearts = parseInt(localStorage.getItem('pixelbelle-hearts')||'0',10);
    if (hearts < cost){ try{ playSfx('ui.unavailable'); }catch(_){ } window.loveToast?.(`💖が足りないよ！(${cost}必要)`); return; }
    try{ window.Hearts?.add?.(-cost); }catch(_){ localStorage.setItem('pixelbelle-hearts', String(hearts-cost)); window.updateCounters?.(); }
    try{ playSfx('extra.fx1'); }catch(_){ }
    // Spawn decoy star that distracts Kirby to it
    const stage = document.querySelector('.diva-stage');
    if (!stage) return;
    const bait = document.createElement('div');
    bait.className = 'diva-bait';
    bait.textContent = '⭐';
    bait.style.left = (Math.random()*70+15)+'%';
    bait.style.top = (Math.random()*50+25)+'%';
    stage.appendChild(bait);
    setTimeout(()=> bait.remove(), 6000);
  }

  function buildUI(container){
    container.innerHTML = `
      <div class="diva-wrap">
        <div class="diva-stage" style="background-image:url('${ASSETS.bg}')">
          <div class="diva-judge" aria-live="polite"></div>
          <img class="diva-singer" src="${getSinger()}" alt="Singer" />
          <div class="diva-lanes">
            <div class="diva-lane"></div>
            <div class="diva-lane"></div>
            <div class="diva-lane"></div>
            <div class="diva-lane"></div>
          </div>
        </div>
        <div class="diva-ui">
          <div class="diva-left">
            <div class="diva-options" id="divaOptions"></div>
            <div class="diva-controls">
              <select id="divaDifficulty">
                <option value="easy">Easy</option>
                <option value="normal" selected>Normal</option>
                <option value="hard">Hard</option>
              </select>
              <button id="divaStart" class="pixel-btn">Start Song</button>
            </div>
            <!-- Items moved to sidebar shop; in-game UI hidden -->
          </div>
          <div class="diva-chat" id="divaChat">
            <div class="chat-log" id="divaChatLog"></div>
            <form id="divaChatForm">
              <input id="divaChatInput" type="text" placeholder="Look up a word (Jisho)" />
              <button class="pixel-btn" type="submit">Search</button>
            </form>
          </div>
        </div>
      </div>`;
  }

  async function handleChatLookup(q){
    if (!q) return;
    const log = byId('divaChatLog');
    const entry = document.createElement('div');
    entry.className = 'chat-entry user';
    entry.textContent = `You: ${q}`;
    log.appendChild(entry);
    try{
      const res = await fetch(`https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(q)}`);
      const data = await res.json();
      const first = data?.data?.[0];
      const def = first?.senses?.[0]?.english_definitions?.join(', ');
      const jp = first?.japanese?.[0];
      const reply = document.createElement('div');
      reply.className = 'chat-entry miku';
      reply.textContent = def ? `Miku: ${jp?.word||jp?.reading||''} → ${def}` : 'Miku: (no result)';
      log.appendChild(reply);
      log.scrollTop = log.scrollHeight;
      // Occasional shimeji speech
      if (Math.random()<0.3) try{ window.shimejiFunctions?.makeAllSpeak?.('勉強しよう！',2500);}catch(_){ }
    } catch(e){
      const reply = document.createElement('div');
      reply.className = 'chat-entry miku';
      reply.textContent = 'Miku: Lookup failed.';
      log.appendChild(reply);
    }
  }

  function populateOptions(){
    // Show up to 4 choices in a grid; demo placeholders
    const wrap = byId('divaOptions');
    if (!wrap) return;
    const choices = ['あ','い','う','え','お','か'].sort(()=>Math.random()-0.5).slice(0,4);
    wrap.innerHTML = choices.map(c=>`<button class="gamepad-opt pixel-btn">${c}</button>`).join('');
    wrap.querySelectorAll('.gamepad-opt').forEach(btn=>{
      btn.addEventListener('click',()=>{
        // Treat a specific letter as correct to drive SFX alignment demo
        const correct = choices[0];
        if (btn.textContent === correct){ playSfx('gacha.mid'); showJudge(document.querySelector('.diva-stage'),'good','#86efac'); try{ window.Hearts?.add?.(1); }catch(_){ } }
        else { playSfx('gacha.fail'); showJudge(document.querySelector('.diva-stage'),'miss','#ef4444'); setLives(lives-1); }
      });
    });
  }

  function wire(container){
    const startBtn = byId('divaStart');
    const diffSel = byId('divaDifficulty');
    const shieldBtn = byId('divaShieldBtn');
    const baitBtn = byId('divaBaitBtn');
    startBtn?.addEventListener('click',()=>{
      difficulty = diffSel?.value || 'normal';
      if (!running) startSong(container.querySelector('.diva-stage'));
    });
    diffSel?.addEventListener('change',()=>{ difficulty = diffSel.value; });
    shieldBtn?.addEventListener('click',buyShield);
    baitBtn?.addEventListener('click',buyBait);
    const form = byId('divaChatForm');
    form?.addEventListener('submit',(e)=>{ e.preventDefault(); const q = byId('divaChatInput').value.trim(); byId('divaChatInput').value=''; handleChatLookup(q); });
    updateItemsUI();
    populateOptions();
  }

  function ensureHudUnlock(){
    // Create unlock bar if not present
    if (!byId('hudUnlockBar')){
      try{
        const hud = document.querySelector('.jp-hud-widget');
        if (hud){
          const line = document.createElement('div');
          line.className = 'hud-line';
          line.innerHTML = `<strong>Unlocks:</strong>
            <span id="hudUnlockText">Unlocks: 0/0</span>
            <div class="progress-bar" id="hudUnlockBar"><div class="progress" id="hudUnlockProgress" style="width:0%"></div></div>`;
          hud.appendChild(line);
        }
      }catch(_){ }
    }
    updateUnlockProgress();
  }

  function init(){
    const jpGames = document.getElementById('jpGames');
    if (!jpGames) return;
    const container = document.createElement('div');
    container.className = 'diva-container';
    jpGames.innerHTML = '';
    jpGames.appendChild(container);
    buildUI(container);
    wire(container);
    ensureHudUnlock();
  }

  window.Diva = { init, updateUnlockProgress };
})();
