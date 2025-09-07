// Audio module: BGM and Radio controls
(function () {
  function ensureBgm() {
    if (!window.__bgmAudio) {
      const a = new Audio("./assets/bgm.ogg");
      a.loop = true;
      a.preload = "auto";
      a.volume = 0.35;
      window.__bgmAudio = a;
      window.__bgmKilled = false;
    }
    return window.__bgmAudio;
  }

  function initBgm() {
    const bgm = ensureBgm();
    const tryPlay = () => {
      if (!window.__bgmKilled) bgm.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", tryPlay, { once: true });
    window.addEventListener("focus", tryPlay, { once: true });
    const resume = () => {
      if (!window.__bgmKilled && bgm.paused) bgm.play().catch(() => {});
      cleanup();
    };
    function cleanup() {
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("focus", resume);
    }
    setTimeout(resume, 250);
    window.__stopBgm = (permanent = true) => {
      bgm.pause();
      bgm.currentTime = 0;
      if (permanent) window.__bgmKilled = true;
    };
    window.__pauseBgm = () => {
      bgm.pause();
    };
    window.__resumeBgm = () => {
      if (!window.__bgmKilled) bgm.play().catch(() => {});
    };
  }

  function setBgmSource(src, fallback) {
    const bgm = ensureBgm();
    const apply = (url) => {
      bgm.src = url;
    };
    const onErr = () => {
      if (fallback && bgm.src.indexOf(fallback) === -1) {
        apply(fallback);
        bgm.play().catch(() => {});
      }
    };
    bgm.removeEventListener("error", onErr);
    apply(src);
    bgm.addEventListener("error", onErr, { once: true });
    window.__bgmKilled = false;
    bgm.play().catch(() => {});
  }

  function initRadio() {
    const wrapId = "radioWidgetWrap";
    if (document.getElementById(wrapId)) return;
    const w = document.createElement("div");
    w.id = wrapId;
    w.style.cssText =
      "position:fixed;left:16px;bottom:16px;z-index:9998;display:none";
    w.innerHTML = '<audio id="radioAudio" crossorigin="anonymous"></audio>';
    document.body.appendChild(w);
    const audio = w.querySelector("#radioAudio");
    audio.volume = 0.5;
    audio.preload = "none";
    audio.addEventListener("play", () => {
      window.__stopBgm && window.__stopBgm(true);
    });
  }
  window.AudioMod = { initBgm, initRadio, setBgmSource, ensureBgm };
})();
