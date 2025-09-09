// JLPT dataset loader
// Loads vocab and kanji packs by difficulty and exposes window.JLPT
(function(){
  if(window.JLPT_READY) return;
  let resolve;
  const READY = new Promise(res => resolve = res);
  window.JLPT_READY = READY;
  const vocab = {};
  const kanji = {};
  const total = 18;
  let loaded = 0;
  function done(){ if(++loaded === total) resolve({vocab, kanji}); }
  for(let i=1;i<=9;i++){
    fetch(`data/vocab_${i}.json`).then(r=>r.ok?r.json():[]).then(j=>{vocab[i]=Array.isArray(j)?j:[]; done();}).catch(()=>{vocab[i]=[]; done();});
    fetch(`data/kanji_${i}.json`).then(r=>r.ok?r.json():[]).then(j=>{kanji[i]=Array.isArray(j)?j:[]; done();}).catch(()=>{kanji[i]=[]; done();});
  }
  window.JLPT = {vocab, kanji};
})();
