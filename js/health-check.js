// Simple runtime health checks for key systems
(function(){
  function check(name, fn){
    try{ const ok = !!fn(); console.log(`[HEALTH] ${name}: ${ok? 'PASS':'FAIL'}`); return ok; }catch(e){ console.warn(`[HEALTH] ${name}: EXC`, e); return false; }
  }
  function run(){
    const results = [];
    results.push(check('MikuCore', ()=> typeof window.MikuCore === 'object'));
    results.push(check('MikuSystem', ()=> typeof window.MikuSystem === 'object'));
    results.push(check('MikuUI', ()=> typeof window.MikuUI === 'object'));
    results.push(check('mikuIcon', ()=> typeof window.mikuIcon === 'function'));
    results.push(check('initSite', ()=> typeof window.initSite === 'function'));
    results.push(check('Wish', ()=> typeof window.Wish === 'object' || document.getElementById('Wish') ));
    const pass = results.every(Boolean);
    window.HEALTH = { pass };
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
