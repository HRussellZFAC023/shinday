// Kanji game module: Meaning->Kanji or Kanji->Reading, using kanjiapi.dev
(function(){
  const KEY_MODE = 'kanji.mode';
  const KEY_TIMED = 'kanji.timed';
  function mode(){ try { return localStorage.getItem(KEY_MODE) || 'meaning'; } catch(_) { return 'meaning'; } }
  function setMode(m){ try { localStorage.setItem(KEY_MODE, m); } catch(_){} }
  function isTimed(){ try { return localStorage.getItem(KEY_TIMED) === '1'; } catch(_) { return false; } }
  function setTimed(on){ try { localStorage.setItem(KEY_TIMED, on?'1':'0'); } catch(_){} }

  // DOM
  let qEl, cEl, fbEl, scoreEl, timerWrap, timerEl, streakEl, bestStreakEl, bestTimeEl;
  let optionBtns;
  // State
  let curMode = mode(); let lock=false, tId=null, startAt=0, countdown=15;
  let score=0, streak=0, bestStreak=0, bestTime=null;
  // Cache
  const kanjiCache = { gradeLists: new Map(), details: new Map() };
  const recent = []; const RECENT_LIMIT=10; function pushRecent(k){ recent.push(k); while(recent.length>RECENT_LIMIT) recent.shift(); }
  function rnd(n){ return Math.floor(Math.random()*n); }
  function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; }

  async function fetchJson(url, prox=true){ try{ const r=await fetch(url,{cache:'no-store'}); if(r.ok) return await r.json(); }catch(_){ } if (!prox) throw new Error('network'); return fetchJson(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`, false); }
  async function getGradeList(grade){ if (kanjiCache.gradeLists.has(grade)) return kanjiCache.gradeLists.get(grade); const list = await fetchJson(`https://kanjiapi.dev/v1/kanji/grade-${grade}`); if (!Array.isArray(list)||!list.length) throw new Error('no-list'); kanjiCache.gradeLists.set(grade, list); if (kanjiCache.gradeLists.size>4) kanjiCache.gradeLists.delete(kanjiCache.gradeLists.keys().next().value); return list; }
  async function getKanjiDetail(ch){ if (kanjiCache.details.has(ch)) return kanjiCache.details.get(ch); const d = await fetchJson(`https://kanjiapi.dev/v1/kanji/${encodeURIComponent(ch)}`); kanjiCache.details.set(ch,d); if (kanjiCache.details.size>60) kanjiCache.details.delete(kanjiCache.details.keys().next().value); return d; }
  function gradeFromDiff(){ try{ const d=(window.getJpDifficulty && getJpDifficulty())||3; const map={1:1,2:1,3:2,4:3,5:4,6:5,7:6,8:6,9:6}; return map[String(d)]||3; }catch(_){ return 3; } }

  async function getQuestion(mode){
    const preset = (window.Jukebox && Jukebox.getPreset && Jukebox.getPreset()) || { options:4 };
    const optCount = Math.min(preset.options || 4, 4);
    const decoyCount = Math.max(1, optCount - 1);
    const grade = gradeFromDiff();
    const list = await getGradeList(grade);
    for (let guard=0; guard<20; guard++){
      const k = list[rnd(list.length)]; if (recent.includes(k)) continue; const d = await getKanjiDetail(k); const meaning = d?.meanings?.[0]; if (!meaning) continue;
      if (mode==='meaning'){
        const correct = k; const pool = list.filter(x=>x!==k); const decoys = pool.sort(()=>Math.random()-0.5).slice(0, decoyCount*2).filter(x=>x!==correct).slice(0,decoyCount);
        if (decoys.length<decoyCount) continue; pushRecent(k);
        return { promptHtml:`<div style=\"opacity:.8\">Meaning:</div><div style=\"font-size:22px;font-weight:900\">${meaning}</div>`, correct, options: shuffle([correct, ...decoys]) };
      } else {
        const readings=[...(d.kun_readings||[]), ...(d.on_readings||[])].map(String).filter(Boolean); if (!readings.length) continue; const correct = readings[rnd(readings.length)];
        const decoyReadings = new Set(); let tries=0; while(decoyReadings.size<decoyCount && tries++<40){ const dk=list[rnd(list.length)]; if (dk===k) continue; const dd=await getKanjiDetail(dk); const rs=[...(dd.kun_readings||[]), ...(dd.on_readings||[])]; if (rs.length){ const rpick = rs[rnd(rs.length)]; if (rpick && rpick!==correct) decoyReadings.add(rpick); } }
        if (decoyReadings.size<decoyCount) continue; pushRecent(k);
        return { promptHtml:`<div style=\"font-size:22px;font-weight:900\">${k}</div>`, correct, options: shuffle([correct, ...Array.from(decoyReadings).slice(0,decoyCount)]) };
      }
    }
    throw new Error('no-question');
  }

  function mount(){
    qEl=document.getElementById('kanjiQuestion'); cEl=document.getElementById('kanjiChoices'); fbEl=document.getElementById('kanjiFeedback'); scoreEl=document.getElementById('kanjiScore'); timerWrap=document.getElementById('kanjiTimerWrap'); timerEl=document.getElementById('kanjiTimer'); streakEl=document.getElementById('kanjiStreak'); bestStreakEl=document.getElementById('kanjiBestStreak'); bestTimeEl=document.getElementById('kanjiBestTime'); optionBtns=document.querySelectorAll('#kanjiMeta .mode-option');
    if (!qEl || !cEl) return; try{ attachDivaHud && attachDivaHud('kanjiCard'); }catch(_){ }
    try{ bestStreak = parseInt(localStorage.getItem('kanji.bestStreak')||'0',10)||0; }catch(_){ }
    try{ const bt=parseInt(localStorage.getItem('kanji.bestTime')||'0',10)||0; bestTime = bt||null; }catch(_){ }
    if (bestStreakEl) bestStreakEl.textContent = String(bestStreak);
    if (bestTimeEl) bestTimeEl.textContent = bestTime ? `${(bestTime/1000).toFixed(1)}s` : '-';
    if (timerWrap) timerWrap.style.display = isTimed() ? 'inline-flex' : 'none';
    optionBtns.forEach((b)=>{
      b.addEventListener('click', ()=>{ curMode=b.getAttribute('data-mode')||'meaning'; optionBtns.forEach(x=>x.classList.remove('active')); b.classList.add('active'); try{ SFX.play('ui.select'); }catch(_){ } start({ mode:curMode, timed:isTimed() }); });
    });
  }

  async function loadRound(){
    if (!qEl || !cEl) return; lock=false; if (fbEl) fbEl.textContent=''; cEl.innerHTML=''; qEl.textContent='Loading…'; try{ HUD && HUD.notes++; }catch(_){ }
    try{
      const q = await getQuestion(curMode); const correct = q.correct; qEl.innerHTML = q.promptHtml;
      const PRESET = (window.Jukebox && Jukebox.getPreset && Jukebox.getPreset()) || { baseTime:15, options:4 };
      const maxOpts = Math.min(PRESET.options || 4, 4);
      try{ const cols = maxOpts>=6?3:2; cEl.style.gridTemplateColumns = `repeat(${cols},1fr)`; cEl.style.gridTemplateRows = `repeat(${Math.ceil(maxOpts/cols)},1fr)`; }catch(_){ }
      if (isTimed()){
        const baseTime = (function(){ try{ return (window.diffParams && diffParams().baseTime) || 15; } catch(_){ return 15; } })();
        countdown = PRESET.baseTime || baseTime; if (timerEl) timerEl.textContent = String(countdown);
        startAt = Date.now(); if (tId) clearInterval(tId);
        tId = setInterval(()=>{
          countdown--; if (timerEl) timerEl.textContent = String(Math.max(0,countdown));
          if (countdown<=0){ clearInterval(tId); tId=null; lock=true; if (fbEl){ fbEl.textContent = `⏰ Time! Correct: ${correct}`; fbEl.style.color = '#c00'; }
            try{ SFX.play('quiz.timeup'); }catch(_){ } try{ flashJudge && flashJudge('kanjiCard','MISS'); addVoltage && addVoltage(-5,'kanjiCard'); loseLife && loseLife('kanjiCard'); }catch(_){ }
            streak=0; if (streakEl) streakEl.textContent=String(streak); setTimeout(loadRound, 900);
          }
        }, 1000);
      }
      const use = q.options.slice(0, maxOpts);
      use.forEach((opt, idx)=>{
        const maker = window.createUltimateBeatpadButton || ((label)=>{ const btn=document.createElement('button'); btn.className='pixel-btn beatpad-btn'; btn.textContent=label; return { btn, style:{ isPerfect:false, color:'#a594f9' } }; });
        const { btn } = maker(opt, idx, (text, element, style)=> onSelect(text, element, style, correct));
        cEl.appendChild(btn);
      });
      try{ createFallingBeatsSystem && createFallingBeatsSystem(cEl); }catch(_){ }
      try{ setupUltimateBeatpadKeyboard && setupUltimateBeatpadKeyboard(cEl, (text)=>{ const target = Array.from(cEl.querySelectorAll('.beatpad-btn')).find(b=>b.textContent===text); if (target) target.click(); }); }catch(_){ }
    }catch(e){ if (cEl){ cEl.textContent = 'Offline. Try again.'; } }
  }

  function onSelect(text, element, style, correct){
    if (lock) return; lock=true; if (tId){ clearInterval(tId); tId=null; }
    const isCorrect = text === correct;
    if (isCorrect){
      try{ createRingEffect && createRingEffect(element,true); }catch(_){ }
      if (style && style.isPerfect){ try{ createPerfectHitEffect && createPerfectHitEffect(element, style.color); }catch(_){ } if (fbEl) fbEl.textContent='✨ PERFECT! 正解! ✨'; try{ awardHearts && awardHearts(2); }catch(_){ } }
      else { if (fbEl) fbEl.textContent='✅ 正解!'; try{ awardHearts && awardHearts(1); }catch(_){ } }
      if (fbEl) fbEl.style.color='#2b2b44';
      score++; if (scoreEl) scoreEl.textContent = String(score);
      streak++; if (streakEl) streakEl.textContent = String(streak); try{ if (streak>1) loveToast && loveToast(`コンボ x${streak}!`); createComboMilestoneEffect && createComboMilestoneEffect(cEl, streak); }catch(_){ }
      const mult = (function(){ try{ return diffParams().mult; }catch(_){ return 1; } })();
      const rmult = (function(){ try{ return getRhythmMult(); }catch(_){ return 1; } })();
      const base = (curMode==='reading'?16:12); const gain=(base + Math.min(15,(streak-1)*2))*mult*rmult; try{ addXP && addXP(Math.round(style && style.isPerfect ? gain*1.5 : gain)); }catch(_){ }
      const dt = Date.now()-startAt; let judge='FINE', v=2, sc=60; if ((style && style.isPerfect) || dt<=700){ judge='COOL'; v=5; sc=120; try{ HUD&&HUD.counts&&(HUD.counts.COOL++); party && party('kanjiCard'); }catch(_){ } } else if (dt<=1600){ judge='GREAT'; v=3; sc=80; try{ HUD&&HUD.counts&&(HUD.counts.GREAT++); }catch(_){ } } else { try{ HUD&&HUD.counts&&(HUD.counts.FINE++); }catch(_){ } }
      try{ flashJudge && flashJudge('kanjiCard',judge); addVoltage && addVoltage(v,'kanjiCard'); addCombo && addCombo('kanjiCard'); HUD && (HUD.score += Math.round(sc*mult*rmult)); }catch(_){ }
      if (isTimed()){ const elapsed=Date.now()-startAt; if (!bestTime || elapsed<bestTime){ bestTime = elapsed; try{ localStorage.setItem('kanji.bestTime', String(bestTime)); }catch(_){ } if (bestTimeEl) bestTimeEl.textContent = `${(bestTime/1000).toFixed(1)}s`; } }
    } else {
      try{ createRingEffect && createRingEffect(element,false); }catch(_){ }
      if (fbEl){ fbEl.textContent = `❌ ${correct}`; fbEl.style.color='#c00'; }
      streak=0; if (streakEl) streakEl.textContent=String(streak);
      try{ HUD&&HUD.counts&&(HUD.counts.SAD++); flashJudge && flashJudge('kanjiCard','SAD'); addVoltage && addVoltage(-5,'kanjiCard'); resetCombo && resetCombo(); loseLife && loseLife('kanjiCard'); }catch(_){ }
    }
    setTimeout(loadRound, 900);
    return isCorrect;
  }

  function start({ mode:m, timed }){ if (m){ curMode=m; setMode(m); } if (typeof timed==='boolean') setTimed(timed); if (timerWrap) timerWrap.style.display = isTimed() ? 'inline-flex' : 'none'; loadRound(); }
  function stop(){ try{ if (tId) clearInterval(tId); }catch(_){ } tId=null; }

  document.addEventListener('kanji-start', (ev)=>{ const d = ev.detail || {}; start({ mode: d.mode || mode(), timed: !!d.timed }); });
  window.Games = window.Games || {}; window.Games.kanji = { mode, setMode, isTimed, setTimed, mount, start, stop };
})();

