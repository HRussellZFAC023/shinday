// Audio module: BGM and Radio controls
(function () {
  // Map audio/video asset paths to raw.githubusercontent.com to avoid host restrictions
  const RAW_BASE = "https://raw.githubusercontent.com/HRussellZFAC023/shinday/main/";
  const toRaw = (p) => {
    if (!p) return p;
    if (/^https?:\/\//.test(p)) return p;
    if (/\.(ogg|avi|wav|mp3)$/i.test(p)) return RAW_BASE + p.replace(/^\.\//, "");
    return p;
  };
  function ensureBgm() {
    if (!window.__bgmAudio) {
      const a = new Audio(toRaw("./assets/bgm.ogg"));
      a.loop = true;
      a.preload = "auto";
      a.volume = 0.35;
      try { a.crossOrigin = "anonymous"; } catch (_) {}
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
      bgm.src = toRaw(url);
    };
    const onErr = () => {
      if (fallback && bgm.src.indexOf(toRaw(fallback)) === -1) {
        apply(toRaw(fallback));
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
