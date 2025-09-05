// Achievements module: simple milestones with toast popups
(function(){
  const LS_KEY = 'achievements.unlocked';
  function get(){ try{ return JSON.parse(localStorage.getItem(LS_KEY)||'[]'); }catch(_){ return []; } }
  function has(id){ return get().includes(id); }
  function add(id){ const s=new Set(get()); s.add(id); localStorage.setItem(LS_KEY, JSON.stringify([...s])); }
  function toast(html){
    const d=document.createElement('div');
    d.innerHTML = `🏆 ${html}`;
    d.style.cssText = 'position:fixed;left:50%;top:12%;transform:translateX(-50%);background:rgba(255,255,255,.96);border:2px solid var(--accent);border-radius:12px;padding:10px 14px;font-weight:900;box-shadow:var(--shadow);z-index:10000;animation:fadeToast 2.5s ease-out forwards';
    document.body.appendChild(d);
    setTimeout(()=>d.remove(), 2700);
  }

  const defs = [
    { id:'lvl2',  cond:()=>lvl()>=2,  text:'Level 2 Unlocked! New songs available.' },
    { id:'lvl5',  cond:()=>lvl()>=5,  text:'Level 5! Diva on the rise ✨' },
    { id:'lvl10', cond:()=>lvl()>=10, text:'Level 10! True Idol Energy 💫' },
    { id:'hearts100', cond:()=>hearts()>=100, text:'100 Hearts — so much love!' },
  ];

  function lvl(){ try{return Progression.getLevel();}catch(_){ return parseInt(localStorage.getItem('study.level')||'1',10)||1; } }
  function hearts(){ return parseInt(localStorage.getItem('pixelbelle-hearts')||'0',10)||0; }

  function check(){
    defs.forEach(d=>{
      try{
        if (!has(d.id) && d.cond()) { add(d.id); toast(d.text); }
      }catch(_){/*ignore*/}
    });
  }

  window.Achievements = { check };
})();

