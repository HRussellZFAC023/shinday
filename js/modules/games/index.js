// Games Index: lightweight orchestrator wrappers so main.js stays the conductor
(function(){
  function start(game, mode, timed){
    try { window.__startSong && window.__startSong(game, mode, timed); } catch(_) {}
  }
  function setVocabDirection(dir){ try{ localStorage.setItem('vocab.direction', dir); }catch(_){}}
  function setKanjiMode(mode){ try{ localStorage.setItem('kanji.mode', mode); }catch(_){}}
  function setTimed(game, on){ try{ localStorage.setItem(game+'.timed', on?'1':'0'); }catch(_){}}
  window.Games = { start, setVocabDirection, setKanjiMode, setTimed };
})();

