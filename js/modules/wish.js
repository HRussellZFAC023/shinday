// Miku Wish (gacha) system — lean version that depends on MIKU_IMAGES
(function(){
  function els(){
    return {
      tokens: document.getElementById('WishTokens'),
      pull1: document.getElementById('WishPull1'),
      pull10: document.getElementById('WishPull10'),
      daily: document.getElementById('WishDaily'),
      convert: document.getElementById('WishConvert'),
      rotation: document.getElementById('WishRotation'),
      results: document.getElementById('WishResults'),
      dexBtn: document.getElementById('WishCollectionBtn'),
      dex: document.getElementById('mikuDex'),
    };
  }

  function poolReady(){ return Array.isArray(window.MIKU_IMAGES) && window.MIKU_IMAGES.length>0; }

  const LS = { tokens:'Wish.tokens', lastDaily:'Wish.lastDaily', coll:'Wish.collection' };
  function getTokens(){ return parseInt(localStorage.getItem(LS.tokens)||'3',10); }
  function setTokens(n){ localStorage.setItem(LS.tokens, String(Math.max(0,n))); }
  function getColl(){ try{ return JSON.parse(localStorage.getItem(LS.coll)||'{}'); }catch(_){ return {}; } }
  function setColl(c){ localStorage.setItem(LS.coll, JSON.stringify(c)); }

  function updateTokens(){ const e=els().tokens; if(e) e.textContent=String(getTokens()); }

  function canDaily(){ const last = parseInt(localStorage.getItem(LS.lastDaily)||'0',10)||0; const d = Date.now()-last; return d > 1000*60*60*20; }
  function takeDaily(){ localStorage.setItem(LS.lastDaily, String(Date.now())); addTokens(1); }
  function addTokens(n){ setTokens(getTokens()+n); updateTokens(); try{ SFX.play('extra.coin'); }catch(_){ } }
  function spendTokens(n){ const cur=getTokens(); if(cur<n) return false; setTokens(cur-n); updateTokens(); return true; }

  function pickRandom(n=1){ const list = window.MIKU_IMAGES||[]; const out=[]; for(let i=0;i<n;i++){ out.push(list[Math.floor(Math.random()*list.length)]); } return out; }

  function renderDex(){ const { dex } = els(); if (!dex) return; const coll = getColl(); const urls = Object.keys(coll); dex.classList.remove('hidden'); dex.innerHTML = urls.length? urls.map(u=>`<img src="${u}" alt="miku" style="width:72px;height:72px;object-fit:cover;border-radius:8px;border:2px solid var(--border);margin:4px;">`).join(''): '<div style="opacity:.75">No Mikus yet… pull to collect!</div>'; }

  function showResults(urls){ const { results, rotation } = els(); if (!results || !rotation) return; rotation.hidden = true; results.hidden = false; results.innerHTML = urls.map(u=>`<div class="Wish-card"><img src="${u}" alt="miku"/></div>`).join(''); try{ SFX.play('Wish.reveal'); }catch(_){ } }

  function startRoll(n){ if (!poolReady()) return; if (!spendTokens(n)) { try{SFX.play('ui.unavailable');}catch(_){ } return; }
    const urls = pickRandom(n);
    const coll = getColl(); urls.forEach(u=> coll[u] = 1); setColl(coll);
    showResults(urls);
  }

  function wire(){
    const e = els(); if (!Object.values(e).every(Boolean)) return;
    updateTokens();
    e.pull1.onclick = ()=> startRoll(1);
    e.pull10.onclick = ()=> startRoll(10);
    e.convert.onclick = ()=>{ const h = parseInt(localStorage.getItem('pixelbelle-hearts')||'0',10); if (h>=100){ localStorage.setItem('pixelbelle-hearts', String(h-100)); addTokens(1); try{ window.updateCounters && window.updateCounters(); }catch(_){ } } else { try{ SFX.play('ui.unavailable'); }catch(_){ } } };
    e.daily.onclick = ()=>{ if (canDaily()){ takeDaily(); } else { try{ SFX.play('ui.unavailable'); }catch(_){ } } };
    e.dexBtn.onclick = renderDex;
    // Idle rotation preview
    const reel = e.rotation && e.rotation.querySelector('.preview-image');
    if (reel){
      const tick = ()=>{ if (!poolReady()) return; const [u]=pickRandom(1); reel.src = u; };
      setInterval(tick, 1200);
    }
  }

  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', wire); else wire();
  window.Wish = { renderDex };
})();
