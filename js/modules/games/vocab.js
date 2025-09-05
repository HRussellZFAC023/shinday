// Vocab game module: mounts onto existing DOM and runs rounds (Jisho API based)
(function(){
  const KEY_DIR = 'vocab.direction';
  const KEY_TIMED = 'vocab.timed';
  function direction(){ try { return localStorage.getItem(KEY_DIR) || 'jp-en'; } catch(_) { return 'jp-en'; } }
  function setDirection(dir){ try { localStorage.setItem(KEY_DIR, dir); } catch(_){} }
  function isTimed(){ try { return localStorage.getItem(KEY_TIMED) === '1'; } catch(_) { return false; } }
  function setTimed(on){ try { localStorage.setItem(KEY_TIMED, on?'1':'0'); } catch(_){} }

  // DOM refs
  let qEl, cEl, fbEl, scoreEl, timerWrap, timerEl, streakEl, bestStreakEl, bestTimeEl;
  let optionBtns;

  // State
  let score = 0, streak = 0, bestStreak = 0, bestTime = null, lock = false, tId = null, startAt = 0, countdown = 15;
  let curDir = direction();

  // Caches
  const vocabCache = { pages: [], enDefs: new Set(), jpSurfaces: new Set() };

  function rnd(n){ return Math.floor(Math.random()*n); }
  function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; }
  async function fetchJsonWithProxy(url){
    try{ const r = await fetch(url, { cache:'no-store' }); if (r.ok) return await r.json(); }catch(_){ }
    try{ const rr = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`, { cache:'no-store' }); if (rr.ok) return await rr.json(); }catch(_){ }
    throw new Error('network');
  }
  async function primeVocabPage(page){
    const url = `https://jisho.org/api/v1/search/words?keyword=%23common&page=${page}`;
    const j = await fetchJsonWithProxy(url);
    const arr = Array.isArray(j?.data) ? j.data : [];
    if (!arr.length) return [];
    vocabCache.pages.push(arr);
    for (const e of arr){
      const jp = (e.japanese && (e.japanese[0].word || e.japanese[0].reading)) || '';
      const reading = (e.japanese && e.japanese[0].reading) || '';
      const en = (e.senses && e.senses[0]?.english_definitions?.[0]) || '';
      if (en) vocabCache.enDefs.add(en.trim());
      if (jp) vocabCache.jpSurfaces.add(jp.trim()); else if (reading) vocabCache.jpSurfaces.add(reading.trim());
    }
    if (vocabCache.pages.length > 6) vocabCache.pages.shift();
    return arr;
  }
  function pickN(setLike, n, avoid = new Set()){
    const arr = Array.isArray(setLike) ? setLike.slice() : Array.from(setLike);
    const out=[]; const used=new Set(avoid);
    while(out.length<n && arr.length){ const i=rnd(arr.length); const v=arr.splice(i,1)[0]; if(!used.has(v)){ used.add(v); out.push(v);} }
    return out;
  }
  const recentVocab = []; const RECENT_LIMIT = 10; function pushRecent(v){ recentVocab.push(v); while(recentVocab.length>RECENT_LIMIT) recentVocab.shift(); }

  async function getVocabQuestion(direction){
    const preset = (window.Jukebox && Jukebox.getPreset && Jukebox.getPreset()) || { options:4 };
    const decoyCount = Math.max(1, (preset.options||4)-1);
    if (vocabCache.pages.length === 0) await primeVocabPage(rnd(50)+1);
    if (vocabCache.enDefs.size < 12 || vocabCache.jpSurfaces.size < 12) await primeVocabPage(rnd(50)+1);
    const page = vocabCache.pages[rnd(vocabCache.pages.length)];
    for (let guard=0; guard<14; guard++){
      const pick = page[rnd(page.length)];
      const jp = (pick.japanese && (pick.japanese[0].word || pick.japanese[0].reading)) || '';
      const reading = (pick.japanese && pick.japanese[0].reading) || '';
      const enList = (pick.senses && pick.senses[0]?.english_definitions) || [];
      const en = enList[0]; if (!jp || !en) continue; if (recentVocab.includes(jp)) continue;
      if (direction === 'jp-en'){
        const correct = en.trim();
        const decoys = Array.from(new Set(pickN(vocabCache.enDefs, decoyCount*2, new Set([correct])))).filter(x=>x!==correct).slice(0,decoyCount);
        if (decoys.length < decoyCount) { await primeVocabPage(rnd(50)+1); continue; }
        pushRecent(jp);
        return { promptHtml:`<div style=\"font-size:22px;font-weight:900\">${jp}</div><div style=\"opacity:.8\">${reading||''}</div>`, correct, options: shuffle([correct, ...decoys]) };
      } else {
        const correct = (jp || reading).trim();
        const decoys = Array.from(new Set(pickN(vocabCache.jpSurfaces, decoyCount*2, new Set([correct])))).filter(x=>x!==correct).slice(0,decoyCount);
        if (decoys.length < decoyCount) { await primeVocabPage(rnd(50)+1); continue; }
        pushRecent(jp);
        return { promptHtml:`<div style=\"font-size:16px;opacity:.8\">Meaning:</div><div style=\"font-size:22px;font-weight:900\">${en}</div>`, correct, options: shuffle([correct, ...decoys]) };
      }
    }
    throw new Error('no-question');
  }

  function mount(){
    qEl = document.getElementById('vocabQuestion');
    cEl = document.getElementById('vocabChoices');
    fbEl = document.getElementById('vocabFeedback');
    scoreEl = document.getElementById('vocabScore');
    timerWrap = document.getElementById('vocabTimerWrap');
    timerEl = document.getElementById('vocabTimer');
    streakEl = document.getElementById('vocabStreak');
    bestStreakEl = document.getElementById('vocabBestStreak');
    bestTimeEl = document.getElementById('vocabBestTime');
    optionBtns = document.querySelectorAll('#vocabMeta .mode-option');
    if (!qEl || !cEl) return;
    try { if (typeof window.attachDivaHud === 'function') attachDivaHud('vocabCard'); } catch(_){}
    // restore stats
    try { bestStreak = parseInt(localStorage.getItem('vocab.bestStreak')||'0',10)||0; } catch(_){}
    try { const bt = parseInt(localStorage.getItem('vocab.bestTime')||'0',10)||0; bestTime = bt||null; } catch(_){}
    if (bestStreakEl) bestStreakEl.textContent = String(bestStreak);
    if (bestTimeEl) bestTimeEl.textContent = bestTime ? `${(bestTime/1000).toFixed(1)}s` : '-';
    if (timerWrap) timerWrap.style.display = isTimed() ? 'inline-flex' : 'none';
    optionBtns.forEach((b)=>{
      b.addEventListener('click', ()=>{
        curDir = b.getAttribute('data-mode') || 'jp-en';
        optionBtns.forEach(x=>x.classList.remove('active')); b.classList.add('active');
        try { SFX.play('ui.select'); } catch(_){ }
        start({ direction: curDir, timed: isTimed() });
      });
    });
  }

  async function loadRound(){
    if (!qEl || !cEl) return;
    lock = false; if (fbEl) fbEl.textContent = ''; cEl.innerHTML = ''; qEl.textContent = 'Loading…';
    // advance notes count if HUD exists
    try { if (window.HUD) HUD.notes++; } catch(_){ }
    try{
      const q = await getVocabQuestion(curDir);
      const correct = q.correct; qEl.innerHTML = q.promptHtml;
      const PRESET = (window.Jukebox && Jukebox.getPreset && Jukebox.getPreset()) || { baseTime:15, options:4 };
      try{ const cols = PRESET.options>=6?3:2; cEl.style.gridTemplateColumns = `repeat(${cols},1fr)`; cEl.style.gridTemplateRows = `repeat(${Math.ceil(PRESET.options/cols)},1fr)`; }catch(_){ }
      if (isTimed()){
        const baseTime = (function(){ try{ return (window.diffParams && diffParams().baseTime) || 15; } catch(_){ return 15; } })();
        countdown = PRESET.baseTime || baseTime; if (timerEl) timerEl.textContent = String(countdown);
        startAt = Date.now(); if (tId) clearInterval(tId);
        tId = setInterval(()=>{
          countdown--; if (timerEl) timerEl.textContent = String(Math.max(0,countdown));
          if (countdown<=0){ clearInterval(tId); tId=null; lock=true; if (fbEl){ fbEl.textContent = `⏰ Time! Correct: ${correct}`; fbEl.style.color = '#c00'; }
            try{ SFX.play('quiz.timeup'); }catch(_){ } try{ flashJudge && flashJudge('vocabCard','MISS'); addVoltage && addVoltage(-5,'vocabCard'); loseLife && loseLife('vocabCard'); }catch(_){ }
            streak=0; if (streakEl) streakEl.textContent=String(streak); setTimeout(loadRound, 900);
          }
        }, 1000);
      }
      const use = q.options.slice(0, PRESET.options||4);
      use.forEach((opt, idx)=>{
        const maker = window.createUltimateBeatpadButton || ((label)=>{ const btn=document.createElement('button'); btn.className='pixel-btn beatpad-btn'; btn.textContent=label; return { btn, style:{ isPerfect:false, color:'#a594f9' } }; });
        const { btn } = maker(opt, idx, (text, element, style)=> onSelect(text, element, style, correct));
        cEl.appendChild(btn);
      });
      try { createFallingBeatsSystem && createFallingBeatsSystem(cEl); } catch(_){ }
      try { setupUltimateBeatpadKeyboard && setupUltimateBeatpadKeyboard(cEl, (text)=>{ const target = Array.from(cEl.querySelectorAll('.beatpad-btn')).find(b=>b.textContent===text); if (target) target.click(); }); } catch(_){ }
    } catch(e){
      if (cEl){ cEl.textContent = 'Offline. Try again.'; }
    }
  }

  function onSelect(text, element, style, correct){
    if (lock) return; lock = true; if (tId) { clearInterval(tId); tId=null; }
    const isCorrect = text === correct;
    if (isCorrect){
      try{ createRingEffect && createRingEffect(element,true); }catch(_){ }
      if (style && style.isPerfect){ try{ createPerfectHitEffect && createPerfectHitEffect(element, style.color); }catch(_){ } if (fbEl) fbEl.textContent='✨ PERFECT! ✨'; try{ awardHearts && awardHearts(2); }catch(_){ } } else { if (fbEl){ fbEl.textContent='✅ Correct!'; } try{ awardHearts && awardHearts(1); }catch(_){ } }
      if (fbEl) fbEl.style.color = '#2b2b44';
      score++; if (scoreEl) scoreEl.textContent = String(score);
      try{ SFX.play('quiz.ok'); }catch(_){ }
      streak++; if (streakEl) streakEl.textContent = String(streak);
      try{ if (streak>1) loveToast && loveToast(`コンボ x${streak}!`); createComboMilestoneEffect && createComboMilestoneEffect(cEl, streak); }catch(_){ }
      const mult = (function(){ try{ return diffParams().mult; }catch(_){ return 1; } })();
      const rmult = (function(){ try{ return getRhythmMult(); }catch(_){ return 1; } })();
      const gain = (12 + Math.min(15, (streak-1)*2)) * mult * rmult;
      try{ addXP && addXP(Math.round(style && style.isPerfect ? gain*1.5 : gain)); }catch(_){ }
      const dt = Date.now()-startAt; let judge='FINE', v=2, sc=50;
      if ((style && style.isPerfect) || dt<=600){ judge='COOL'; v=4; sc=100; try{ HUD && HUD.counts && (HUD.counts.COOL++); party && party('vocabCard'); }catch(_){ } }
      else if (dt<=1400){ judge='GREAT'; v=3; sc=70; try{ HUD && HUD.counts && (HUD.counts.GREAT++); }catch(_){ } }
      else { try{ HUD && HUD.counts && (HUD.counts.FINE++); }catch(_){ } }
      try{ flashJudge && flashJudge('vocabCard', judge); addVoltage && addVoltage(v,'vocabCard'); addCombo && addCombo('vocabCard'); HUD && (HUD.score += Math.round(sc*mult*rmult)); }catch(_){ }
      if (isTimed()){
        const elapsed = Date.now()-startAt; if (!bestTime || elapsed < bestTime){ bestTime = elapsed; try{ localStorage.setItem('vocab.bestTime', String(bestTime)); }catch(_){ } if (bestTimeEl) bestTimeEl.textContent = `${(bestTime/1000).toFixed(1)}s`; }
      }
    } else {
      try{ createRingEffect && createRingEffect(element,false); }catch(_){ }
      if (fbEl){ fbEl.textContent = `❌ ${correct}`; fbEl.style.color = '#c00'; }
      try{ SFX.play('quiz.bad'); }catch(_){ }
      streak=0; if (streakEl) streakEl.textContent = String(streak);
      try{ HUD && HUD.counts && (HUD.counts.SAD++); flashJudge && flashJudge('vocabCard','SAD'); addVoltage && addVoltage(-5,'vocabCard'); resetCombo && resetCombo(); loseLife && loseLife('vocabCard'); }catch(_){ }
    }
    setTimeout(loadRound, 900);
  }

  function start({ direction: dir, timed }){
    if (dir) { curDir = dir; setDirection(dir); }
    if (typeof timed === 'boolean') setTimed(timed);
    if (timerWrap) timerWrap.style.display = isTimed() ? 'inline-flex' : 'none';
    loadRound();
  }
  function stop(){ try{ if (tId) clearInterval(tId); }catch(_){} tId=null; }

  // Wire event start from main __startSong dispatcher
  document.addEventListener('vocab-start', (ev)=>{
    const d = ev.detail || {}; start({ direction: d.direction || direction(), timed: !!d.timed });
  });

  window.Games = window.Games || {}; window.Games.vocab = { direction, setDirection, isTimed, setTimed, mount, start, stop };
})();

