/* Hearts and love system extracted from main.js */
(function(){
  const C = window.SITE_CONTENT || {};
  const LOVE_TOASTS = C.love?.toasts || ['ありがとう！💖'];
  const LOVE_MILESTONES = C.love?.milestones || [];
  let heartCount = parseInt(localStorage.getItem('pixelbelle-hearts') || '0', 10);
  let lastMilestone = parseInt(localStorage.getItem('pixelbelle-last-milestone') || '0', 10);

  function updateCounters(){
    const el = document.getElementById('heartCount');
    if (el) el.textContent = heartCount;
  }

  function loveToast(text){
    const msg = `${text} ${LOVE_TOASTS[Math.floor(Math.random()*LOVE_TOASTS.length)]}`;
    const toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.cssText = 'position:fixed;left:50%;top:20%;transform:translateX(-50%);background:rgba(255,255,255,0.95);border:2px solid var(--accent);border-radius:16px;padding:12px 18px;font-weight:800;color:var(--ink);box-shadow:var(--shadow);z-index:9999;animation:fadeToast 2.5s ease-out forwards;';
    document.body.appendChild(toast);
    try{ mikuSpeakToast && mikuSpeakToast(msg); }catch(_){ }
    setTimeout(()=>toast.remove(),3500);
  }

  function burstHeartsAndStars(n=8){
    const vw = window.innerWidth, vh = window.innerHeight;
    for(let i=0;i<n;i++){
      const el = document.createElement('div');
      const x = Math.random()*vw, y=Math.random()*vh*0.6+vh*0.2;
      el.textContent = Math.random()<0.6?'💖':Math.random()<0.5?'✨':'⭐';
      el.style.cssText = `position:fixed;left:${x}px;top:${y}px;font-size:20px;pointer-events:none;z-index:9998;animation:heartFloat 2.2s ease-out forwards;`;
      document.body.appendChild(el);
      setTimeout(()=>el.remove(),2300);
    }
  }

  function shimejiCelebrate(amount){
    const s = window.shimejiFunctions;
    if (!s) return;
    if (heartCount % 5 === 0) s.triggerMassJump();
    else s.triggerMassHappy();
    if (heartCount % 25 === 0 && s.triggerMassDance) s.triggerMassDance();
    if (heartCount % 25 === 0) SFX.play("extra.clap");
    else if (Math.random() < 0.5) SFX.play("extra.yo");
    else if (Math.random() < 0.5) SFX.play("extra.wan");
    else SFX.play("hearts.add");
  }

  function shimejiBroadcastLove(){
    const s = window.shimejiFunctions;
    if (!s || !s.makeAllSpeak) return;
    try{
      const loveMessage = LOVE_TOASTS[Math.floor(Math.random()*LOVE_TOASTS.length)];
      s.makeAllSpeak(loveMessage,3000);
    }catch(_){ }
  }

  function createFloatingHeart(x,y){
    const heart=document.createElement('div');
    heart.textContent='💖';
    heart.style.cssText=`position:fixed;left:${x}px;top:${y}px;font-size:1.5rem;pointer-events:none;z-index:9999;animation:heartFloat 2s ease-out forwards;`;
    document.body.appendChild(heart);
    setTimeout(()=>heart.remove(),2000);
  }

  function createSparkleEffect(el){
    for(let i=0;i<5;i++){
      setTimeout(()=>{
        const sp=document.createElement('div');
        sp.textContent='✨';
        sp.style.cssText=`position:absolute;font-size:1rem;pointer-events:none;left:${Math.random()*50-25}px;top:${Math.random()*50-25}px;animation:sparkle 1s ease-out forwards;`;
        el.style.position='relative';
        el.appendChild(sp);
        setTimeout(()=>sp.remove(),1000);
      },i*100);
    }
  }

  function addHearts(amount){
    heartCount = Math.max(0, heartCount + amount);
    localStorage.setItem('pixelbelle-hearts', heartCount);
    updateCounters();
  try{ const el=document.getElementById('gameHeartCount'); if (el) el.textContent=String(heartCount);}catch(_){}
    try{ SFX.play('hearts.add'); if(amount>=5) SFX.play('extra.coin'); }catch(_){}
    if (Array.isArray(LOVE_MILESTONES)){
      const reached = LOVE_MILESTONES.filter(m=>heartCount>=m.step);
      if (reached.length){
        const top = reached.reduce((a,b)=>b.step>a.step?b:a);
        if (top.step>lastMilestone){
          lastMilestone=top.step;
          localStorage.setItem('pixelbelle-last-milestone', lastMilestone);
          loveToast(top.msg);
          try{ SFX.play('hearts.milestone'); }catch(_){}
          shimejiBroadcastLove();
        }
      }
    }
    const counterEl=document.getElementById('heartCount');
    if(counterEl) createSparkleEffect(counterEl);
    burstHeartsAndStars(Math.min(8,2+amount*2));
    shimejiCelebrate(amount);
  }

  function loadSavedData(){
    const savedMood = localStorage.getItem('pixelbelle-mood');
    if(savedMood){
      const moodDisplayEl=document.getElementById('moodDisplay');
      if(moodDisplayEl) moodDisplayEl.textContent=`💭 ${savedMood}`;
    }
    const savedNowPlaying = localStorage.getItem('pixelbelle-now-playing');
    if(savedNowPlaying){
      const nowPlayingEl=document.getElementById('nowPlaying');
      if(nowPlayingEl) nowPlayingEl.textContent=savedNowPlaying;
    }
  }

  function initPeriodicUpdates(){
    const heartBtn=document.getElementById('heartBtn');
    if(heartBtn){
      heartBtn.addEventListener('click',()=>{
        try{ SFX.play('hearts.click'); }catch(_){}
        addHearts(1);
        const rect = heartBtn.getBoundingClientRect();
        createFloatingHeart(rect.left+heartBtn.offsetWidth/2, rect.top);
        createSparkleEffect(heartBtn);
      });
    }
  }

  // Background floating hearts follow radio state
  function initFloatingHearts(){
    const container=document.querySelector('.floating-hearts');
    if(!container) return;
    let radioOn = false;
    function isRadioPlaying(){
      try{ const a = window.__radioAudio; return a && !a.paused; }catch(_){ return false; }
    }
    function createHeart(){
      if (!radioOn) return;
      const heart=document.createElement('div');
      heart.className='heart-particle';
      heart.textContent='💖';
      heart.style.left=Math.random()*100+'vw';
      heart.style.setProperty('--drift', (Math.random()*40-20)+'px');
      container.appendChild(heart);
      setTimeout(()=>heart.remove(),8000);
    }
    function tick(){ radioOn = isRadioPlaying(); if(!document.hidden) createHeart(); }
    const id = setInterval(tick, 2000);
    // Watch radio play/pause to fade out existing hearts after completion
    try{
      const a = window.__radioAudio;
      if (a){
        a.addEventListener('play', ()=>{ radioOn = true; });
        a.addEventListener('pause', ()=>{ radioOn = false; });
      }
    }catch(_){ }
  }

  function initPassiveHearts(){
    // Only grant passive hearts if shimejis are active and marked as passive
    let grantAt = Date.now() + 180000; // 3 minutes
    setInterval(()=>{
      try{
        const active = (window.shimejiFunctions && window.shimejiFunctions.getCreatureCount && window.shimejiFunctions.getCreatureCount()>0);
        if (active && Date.now()>=grantAt){ addHearts(1); grantAt = Date.now()+180000; }
      }catch(_){ }
    }, 15000);
  }

  function initHearts(){
    updateCounters();
    loadSavedData();
    initPeriodicUpdates();
    initFloatingHearts();
    initPassiveHearts();
  }

  window.addHearts = addHearts;
  window.initPeriodicUpdates = initPeriodicUpdates;
  window.initFloatingHearts = initFloatingHearts;
  window.initPassiveHearts = initPassiveHearts;
  window.createFloatingHeart = createFloatingHeart;
  window.createSparkleEffect = createSparkleEffect;
  window.loveToast = loveToast;
  window.updateCounters = updateCounters;
  // Export heartCount getter for garden sync
  window.getHeartCount = ()=>heartCount;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initHearts); else initHearts();
  window.Hearts = { add:addHearts, init:initHearts };
})();
