// Lightweight dispatcher bridging Games.start to module-specific events
(function () {
  function dispatch(name, detail) {
    document.dispatchEvent(new CustomEvent(name, { detail }));
  }

  function __startSong(game, mode, timed) {
    try {
      if (game === "vocab") {
        dispatch("vocab-start", {
          direction: mode || window.Games?.vocab?.direction?.() || "jp-en",
          timed: !!timed,
        });
      } else if (game === "kanji") {
        dispatch("kanji-start", {
          mode: mode || window.Games?.kanji?.mode?.() || "meaning",
          timed: !!timed,
        });
      } else if (game === "kotoba") {
        dispatch("kotoba-start", { timed: !!timed });
      } else if (game === "chat") {
        dispatch("miku-chat-start", { timed: !!timed });
      }
    } catch (e) {
      console.error("__startSong error", e);
    }
  }

  window.__startSong = __startSong;
})();
