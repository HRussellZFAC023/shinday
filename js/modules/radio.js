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
    const STREAM_BASE_URL = STREAM_URL;
    let audio = null;
    let shouldBePlaying = false;
    let reconnectTimer = null;
    let reconnectAttempts = 0;

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
    const streamErrorStatus =
      (C.radio && (C.radio.streamError || C.radio.defaultStatus)) ||
      "⚠️ Stream error";
    const reconnectingStatus =
      (C.radio && C.radio.reconnectingStatus) || "Reconnecting...";

    function cancelReconnect() {
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }
      reconnectAttempts = 0;
    }

    function nextStreamUrl() {
      const sep = STREAM_BASE_URL.includes("?") ? "&" : "?";
      return `${STREAM_BASE_URL}${sep}_=${Date.now()}`;
    }

    function reloadStream() {
      const wasPlaying = shouldBePlaying;
      try {
        audio.pause();
      } catch (_) {}
      audio.src = nextStreamUrl();
      audio.load();
      if (wasPlaying) {
        const playPromise = audio.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => {
            scheduleReconnect();
          });
        }
      }
    }

    function scheduleReconnect() {
      if (!shouldBePlaying) return;
      if (reconnectTimer) return;
      const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 15000);
      reconnectAttempts += 1;
      if (radioDisplayStatus) radioDisplayStatus.textContent = reconnectingStatus;
      if (statusDot) statusDot.style.color = "#ffbf00";
      reconnectTimer = setTimeout(() => {
        reconnectTimer = null;
        reloadStream();
      }, delay);
    }
    window.__pauseRadio = () => {
      shouldBePlaying = false;
      cancelReconnect();
      audio.pause();
      const status = C.radio?.stoppedStatus || "Radio Stopped";
      if (radioDisplayStatus) radioDisplayStatus.textContent = status;
      if (onlineStatus)
        onlineStatus.textContent = C.status?.radioOffLabel || "";
      stopEqualizer();
      if (statusDot) statusDot.style.color = "#ff4d4d";
      // Clear last known title so next play shows placeholder until metadata arrives
      lastTitle = null;
    };

    if (onlineStatus)
      onlineStatus.textContent = C.status?.radioOffLabel || "";
    const station =
      C.radio && (C.radio.radioName || C.radio.radioName === 0)
        ? C.radio.radioName
        : C.radio?.radioName || C.radio?.title || "Online";
    if (radioDisplayStatus) radioDisplayStatus.textContent = station;
    if (statusDot) statusDot.style.color = "#ffbf00";

    if (playBtn)
      playBtn.addEventListener("click", () => {
        // Only show placeholder if we don't yet have a track title
        shouldBePlaying = true;
        cancelReconnect();
        if (!lastTitle) {
          const status = C.radio?.playingStatus || "Now Playing";
          if (radioDisplayStatus) radioDisplayStatus.textContent = status;
        }
        if (onlineStatus)
          onlineStatus.textContent = C.status?.radioOnLabel || "";
        if (window.__stopBgm) window.__stopBgm(true);
        const playPromise = audio.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => {
            stopEqualizer();
            scheduleReconnect();
          });
        }
        startEqualizer();
        if (statusDot) statusDot.style.color = "#00ff00";
        startMetadataPolling();
      });

    if (pauseBtn)
      pauseBtn.addEventListener("click", () => {
        // If no radio stream is active, pause background music instead
        const ra = window.__radioAudio;
        const radioActive = !!(ra && !ra.paused && !ra.ended);
        if (!radioActive && typeof window.__pauseBgm === "function") {
          try {
            window.__pauseBgm();
          } catch (_) {}
        }
        if (typeof window.__pauseRadio === "function") window.__pauseRadio();
      });

    function handleStreamFailure() {
      if (radioDisplayStatus) radioDisplayStatus.textContent = streamErrorStatus;
      if (onlineStatus) onlineStatus.textContent = C.status?.radioOffLabel || "";
      if (statusDot) statusDot.style.color = "#ff4d4d";
      stopEqualizer();
      scheduleReconnect();
    }

    audio.addEventListener("error", () => {
      handleStreamFailure();
    });
    audio.addEventListener("stalled", () => {
      handleStreamFailure();
    });
    audio.addEventListener("ended", () => {
      handleStreamFailure();
    });

    audio.addEventListener("playing", () => {
      cancelReconnect();
      shouldBePlaying = true;
      if (onlineStatus)
        onlineStatus.textContent = C.status?.radioOnLabel || "";
      if (statusDot) statusDot.style.color = "#00ff00";
      startEqualizer();
      // Avoid overwriting the fetched title if we already have one
      if (!lastTitle) {
        const status = C.radio?.playingStatus || "Now Playing";
        if (radioDisplayStatus) radioDisplayStatus.textContent = status;
      }
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
    let lastTitle = null;

    function setNowPlaying(text) {
      const titleOnly = (text || "").split(/\s*-\s*/).pop().trim();
      lastTitle = titleOnly || lastTitle;
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

      async function tryDirect(url) {
        const res = await fetch(url, { cache: "no-store" }).then(
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
          if (url.endsWith("/7.html")) return titleFromSevenHtml(text);
          return titleFromStatusHtml(text);
        }
      }

      // 1) Try direct (works outside strict CSP like local/dev)
      let title = await tryDirect(metaUrl);
      if (title) return title;

      // 2) Try proxy fallback if configured (useful when CORS is ok but CSP blocks direct host)
      try {
        const tpl = C.radio && C.radio.metaProxy;
        if (tpl && tpl.includes("{url}")) {
          const proxied = tpl.replace("{url}", encodeURIComponent(metaUrl));
          title = await tryDirect(proxied);
          if (title) return title;
        }
      } catch (_) {}

      // 3) Try iframe CSP proxy (hosted on GitHub Pages)
      try {
        if (window.CspProxy && window.SITE_CONTENT?.proxy?.pageUrl) {
          await window.CspProxy.ensure(window.SITE_CONTENT.proxy.pageUrl);
          const res = await window.CspProxy.request("fetchRadioMeta", { url: metaUrl }, 9000);
          if (res && res.title) return res.title;
        }
      } catch (_) {}

      return null;
    }
    

    function startMetadataPolling() {
      if (metaTimer) return;

      const poll = async () => {
        if (!audio || audio.paused || audio.ended) {
          clearInterval(metaTimer);
          metaTimer = null;
          return;
        }
        const title = await fetchIcyTitle();
        if (title) setNowPlaying(title);
      };

      poll();
      metaTimer = setInterval(poll, 15000);
    }

    audio.addEventListener("pause", () => {
      stopEqualizer();
      if (metaTimer) {
        clearInterval(metaTimer);
        metaTimer = null;
      }
      if (shouldBePlaying) {
        scheduleReconnect();
      }
    });
  }

  window.Radio = { init };
})();
