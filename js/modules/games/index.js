// Games Index: lightweight orchestrator wrappers so main.js stays the conductor
(function () {
  function start(game, mode, timed) {
    
      window.__startSong && window.__startSong(game, mode, timed);
    
  }
  function setVocabDirection(dir) {
    
      localStorage.setItem("vocab.direction", dir);
    
  }
  function setKanjiMode(mode) {
    
      localStorage.setItem("kanji.mode", mode);
    
  }
  function setTimed(game, on) {
    
      localStorage.setItem(game + ".timed", on ? "1" : "0");
    
  }
  window.Games = { start, setVocabDirection, setKanjiMode, setTimed };
})();
