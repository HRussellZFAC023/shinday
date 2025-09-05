/* Effects module: achievements and micro-celebrations */
(function(){
  const BADGE_KEY = 'effects.badges';
  function getBadges(){
    try { return JSON.parse(localStorage.getItem(BADGE_KEY)||'[]'); } catch(_) { return []; }
  }
  function hasBadge(id){ return getBadges().includes(id); }
  function saveBadges(list){ try{ localStorage.setItem(BADGE_KEY, JSON.stringify(list)); }catch(_){}}
  function unlockBadge(id, label){
    if (hasBadge(id)) return;
    const list = getBadges(); list.push(id); saveBadges(list);
    toast(`Badge unlocked: ${label||id}`);
    confetti();
  }
  function toast(txt){
    const el = document.createElement('div');
    el.textContent = txt;
    el.style.cssText = 'position:fixed;left:50%;top:24px;transform:translateX(-50%);background:rgba(255,255,255,.95);border:2px solid #a594f9;border-radius:10px;padding:6px 12px;font-weight:900;color:#2b2b44;z-index:99999;box-shadow:0 6px 18px rgba(0,0,0,0.12)';
    document.body.appendChild(el);
    el.animate([{opacity:0,transform:'translate(-50%,-10px)'},{opacity:1,transform:'translate(-50%,0)'},{opacity:0,transform:'translate(-50%,-10px)'}],{duration:1800,easing:'ease-out'});
    setTimeout(()=> el.remove(), 1850);
  }
  function confetti(){
    const host = document.createElement('div');
    host.style.cssText = 'position:fixed;left:0;top:0;right:0;bottom:0;pointer-events:none;z-index:99998';
    for (let i=0; i<80; i++){
      const p = document.createElement('div');
      const size = 6 + Math.random()*6;
      p.style.cssText = `position:absolute;left:${Math.random()*100}vw;top:-10px;width:${size}px;height:${size}px;background:${['#00AEEF','#E71D36','#2ECC71','#F1C40F'][i%4]};opacity:.9;border-radius:2px`;
      host.appendChild(p);
      const dx = (Math.random()*2-1)*200;
      const dy = 120 + Math.random()*260;
      p.animate([{ transform:'translate(0,0) rotate(0deg)' , opacity:1 },{ transform:`translate(${dx}px, ${dy}px) rotate(${180+Math.random()*180}deg)`, opacity:0 }], { duration: 1000 + Math.random()*600, easing:'ease-out' });
      setTimeout(()=>p.remove(), 1800);
    }
    document.body.appendChild(host);
    setTimeout(()=> host.remove(), 1200);
  }
  // Auto badges for progression milestones
  function wireProgression(){
    if (!window.Progression) return;
    const update = (s)=>{
      if (s.level>=3) unlockBadge('lvl3','Level 3 Reached');
      if (s.level>=5) unlockBadge('lvl5','Level 5 Star');
      if (s.level>=9) unlockBadge('lvl9','Diva Supreme');
    };
    update(window.Progression.getProgress());
    window.Progression.onChange(update);
  }
  window.Effects = { unlockBadge, hasBadge };
  if (document.readyState === 'complete' || document.readyState === 'interactive') wireProgression();
  else document.addEventListener('DOMContentLoaded', wireProgression);
})();
