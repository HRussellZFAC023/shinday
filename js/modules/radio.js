// Radio module: stream player with metadata fetching
(function () {
  const C = window.SITE_CONTENT || {};

  function init() {
    const playBtn = document.getElementById("playRadio");
    const pauseBtn = document.getElementById("pauseRadio");
    const radioDisplayStatus = document.getElementById("radioDisplayStatus");
    const onlineStatus = document.getElementById("onlineStatus");
    const statusDot = document.getElementById("statusDot");

    const STREAM_URL = "https://vocaloid.radioca.st/stream";
    let audio = null;

    if (window.AudioMod && typeof AudioMod.initRadio === "function") {
      AudioMod.initRadio();
      const a = document.getElementById("radioAudio");
      if (a) {
        audio = a;
        a.src = STREAM_URL;
        a.crossOrigin = "anonymous";
        a.preload = "none";
        a.volume = 0.85;
      }
    }

    if (!audio) {
      audio = new Audio();
      audio.src = STREAM_URL;
      audio.preload = "none";
      audio.crossOrigin = "anonymous";
      audio.volume = 0.85;
    }

    window.__radioAudio = audio;
    window.__pauseRadio = () => {
      audio.pause();
      const status = C.radio?.stoppedStatus || "Radio Stopped";
      if (radioDisplayStatus) radioDisplayStatus.textContent = status;
      if (onlineStatus)
        onlineStatus.textContent = C.status?.radioOffLabel || "Radio Off";
      stopEqualizer();
      if (statusDot) statusDot.style.color = "#ff4d4d";
    };

    if (onlineStatus)
      onlineStatus.textContent = C.status?.radioOffLabel || "Radio Off";
    const station =
      C.radio && (C.radio.radioName || C.radio.radioName === 0)
        ? C.radio.radioName
        : C.radio?.radioName || C.radio?.title || "Kawaii FM";
    if (radioDisplayStatus) radioDisplayStatus.textContent = station + " 📻";
    if (statusDot) statusDot.style.color = "#ffbf00";

    if (playBtn)
      playBtn.addEventListener("click", () => {
        const status = C.radio?.playingStatus || "Now Playing";
        if (radioDisplayStatus) radioDisplayStatus.textContent = status;
        if (onlineStatus)
          onlineStatus.textContent = C.status?.radioOnLabel || "Playing";
        if (window.__stopBgm) window.__stopBgm(true);
        audio.play().catch(() => {});
        startEqualizer();
        if (statusDot) statusDot.style.color = "#00ff00";
        startMetadataPolling();
      });

    if (pauseBtn)
      pauseBtn.addEventListener("click", () => {
        if (typeof window.__pauseRadio === "function") window.__pauseRadio();
      });

    audio.addEventListener("error", () => {
      if (radioDisplayStatus)
        radioDisplayStatus.textContent = "⚠️ Stream error";
      if (statusDot) statusDot.style.color = "#ff4d4d";
    });

    audio.addEventListener("playing", () => {
      const status = C.radio?.playingStatus || "Now Playing";
      if (radioDisplayStatus) radioDisplayStatus.textContent = status;
      startMetadataPolling();
    });

    function startEqualizer() {
      const bars = document.querySelectorAll(".eq-bars .bar");
      bars.forEach((bar) => {
        bar.style.animationPlayState = "running";
      });
    }

    function stopEqualizer() {
      const bars = document.querySelectorAll(".eq-bars .bar");
      bars.forEach((bar) => {
        bar.style.animationPlayState = "paused";
      });
    }

    let metaTimer = null;

    function setNowPlaying(text) {
      const titleOnly = (text || "").split(/\s*-\s*/).pop().trim();
      if (
        window.MikuSystem &&
        typeof window.MikuSystem.updateNowPlaying === "function"
      ) {
        window.MikuSystem.updateNowPlaying({ title: titleOnly });
      } else {
        if (radioDisplayStatus) radioDisplayStatus.textContent = titleOnly;
        localStorage.setItem("pixelbelle-now-playing", titleOnly);
      }
    }

    function hostBaseFrom(url) {
      if (!url || typeof url !== "string") return null;
      const m = url.match(/^(https?:\/\/[^\/]+)/i);
      return m ? m[1] : null;
    }

    function buildMetaCandidates(streamUrl) {
      const base = hostBaseFrom(streamUrl);
      if (!base) return [];
      return [
        `${base}/status-json.xsl`,
        `${base}/stats?json=1`,
        `${base}/status.xsl`,
        `${base}/playing?sid=1`,
        `${base}/7.html`,
      ];
    }

    function titleFromJson(data) {
      if (!data || typeof data !== "object") return null;
      if (data.icestats && data.icestats.source) {
        const src = Array.isArray(data.icestats.source)
          ? data.icestats.source[0]
          : data.icestats.source;
        if (!src) return null;
        const t =
          src.title ||
          src.song ||
          src.songtitle ||
          src.stream_title ||
          src.streamTitle ||
          null;
        if (t) return t;
        if (src.title) return src.title;
      }
      if (data.songtitle) return data.songtitle;
      if (data.title) return data.title;
      if (data.now) return data.now;
      if (data.song) return data.song;
      return null;
    }

    function titleFromStatusHtml(html) {
      const m =
        html.match(/Current\s*Song.*?<td[^>]*>([^<]*)/i) ||
        html.match(/Stream\s*Title.*?<td[^>]*>([^<]*)/i);
      if (m && m[1]) return m[1].trim();
      return null;
    }

    function titleFromSevenHtml(text) {
      const parts = (text || "").trim().split(",");
      const last = parts[parts.length - 1];
      return last && last.length > 0 ? last.trim() : null;
    }

    async function autoDetectMetaUrl() {
      const configured = (C.radio && C.radio.metaUrl) || "";
      if (configured) return configured;
      const cached = localStorage.getItem("radio.meta.auto");
      if (cached) return cached;
      const candidates = buildMetaCandidates(STREAM_URL);
      for (const url of candidates) {
        const res = await fetch(url, { cache: "no-store" }).then(
          null,
          () => null,
        );
        if (!res || !res.ok) continue;
        const ct = (res.headers.get("content-type") || "").toLowerCase();
        let title = null;
        if (ct.includes("application/json")) {
          const data = await res.json().then(null, () => null);
          title = titleFromJson(data);
        } else {
          const text = await res.text().then(null, () => "");
          if (url.endsWith("/7.html")) title = titleFromSevenHtml(text);
          else title = titleFromStatusHtml(text);
        }
        if (title) {
          localStorage.setItem("radio.meta.auto", url);
          return url;
        }
      }
      return "";
    }

    async function fetchIcyTitle() {
      const metaUrl =
        (C.radio && C.radio.metaUrl) ||
        localStorage.getItem("radio.meta.auto") ||
        (await autoDetectMetaUrl());
      if (!metaUrl) return null;
      const res = await fetch(metaUrl, { cache: "no-store" }).then(
        null,
        () => null,
      );
      if (!res || !res.ok) return null;
      const ct = (res.headers.get("content-type") || "").toLowerCase();
      if (ct.includes("application/json")) {
        const data = await res.json().then(null, () => null);
        return titleFromJson(data);
      } else {
        const text = await res.text().then(null, () => "");
        if (metaUrl.endsWith("/7.html")) return titleFromSevenHtml(text);
        return titleFromStatusHtml(text);
      }
    }

    function startMetadataPolling() {
      if (metaTimer) return;
      metaTimer = setInterval(async () => {
        if (!audio || audio.paused || audio.ended) {
          clearInterval(metaTimer);
          metaTimer = null;
          return;
        }
        const title = await fetchIcyTitle();
        if (title) setNowPlaying(title);
      }, 15000);
    }

    audio.addEventListener("pause", () => {
      if (metaTimer) {
        clearInterval(metaTimer);
        metaTimer = null;
      }
    });
  }

  window.Radio = { init };
})();
