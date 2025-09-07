// Word of Day prefetcher (Jisho API with simple cache + timeout)
// Exposes window.WOD_READY (Promise) and window.WOD (last payload)
(function () {
  if (window.WOD_READY) return;
  const LS = "wod.v3"; // { ts, payload: { word, reading, meaning } }
  const TTL = 24 * 60 * 60 * 1000;
  let resolveReady;
  const READY = new Promise((res) => (resolveReady = res));
  window.WOD_READY = READY;
  window.WOD = null;

  async function fetchWithTimeout(url, { timeout = 7000 } = {}) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), timeout);
    try {
      const r = await fetch(url, { signal: ctrl.signal, cache: "no-store" });
      return r.ok ? r.json() : null;
    } catch (_) {
      return null;
    } finally {
      clearTimeout(t);
    }
  }

  (async function prefetch() {
    try {
      // Use cache if fresh
      const prev = JSON.parse(localStorage.getItem(LS) || "null");
      if (prev && Date.now() - (prev.ts || 0) < TTL && prev.payload) {
        window.WOD = prev.payload;
        resolveReady(prev.payload);
        return;
      }
      // Try Jisho
      const page = Math.floor(Math.random() * 50) + 1;
      const url = `https://jisho.org/api/v1/search/words?keyword=%23common&page=${page}`;
      const json = await fetchWithTimeout(url, { timeout: 6500 });
      const arr = Array.isArray(json?.data) ? json.data : [];
      if (arr.length) {
        const pick = arr[Math.floor(Math.random() * arr.length)];
        const word =
          (pick.japanese &&
            (pick.japanese[0].word || pick.japanese[0].reading)) ||
          "";
        const reading = (pick.japanese && pick.japanese[0].reading) || "";
        const meaning =
          (pick.senses && pick.senses[0]?.english_definitions?.[0]) || "";
        if (word || reading || meaning) {
          const payload = { word, reading, meaning };
          window.WOD = payload;
          localStorage.setItem(LS, JSON.stringify({ ts: Date.now(), payload }));
          resolveReady(payload);
          return;
        }
      }
      // Fallback: keep previous stale cache if any
      if (prev && prev.payload) {
        window.WOD = prev.payload;
        resolveReady(prev.payload);
        return;
      }
      resolveReady(null);
    } catch (e) {
      resolveReady(null);
    }
  })();
})();
