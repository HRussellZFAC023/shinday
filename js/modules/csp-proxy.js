// CSP Proxy Bridge: communicate with an external proxy page via postMessage
// Usage:
//   window.CspProxy.ensure("https://USER.github.io/REPO/proxy/proxy.html");
//   const res = await window.CspProxy.request("fetchNeocitiesInfo", { sitename: "babybelle" });
//   const res2 = await window.CspProxy.request("fetchRadioMeta", { url: "https://vocaloid.radioca.st/status-json.xsl" });
(function () {
  const state = {
    frame: null,
    origin: "*",
    ready: null,
    readyResolve: null,
    pending: new Map(),
    nextId: 1,
  };

  function parseOrigin(u) {
    try {
      const url = new URL(u);
      return url.origin;
    } catch (_) {
      return "*";
    }
  }

  function ensure(url) {
    if (state.frame && state.ready) return state.ready;
    const pageUrl =
      url || (window.SITE_CONTENT && window.SITE_CONTENT.proxy && window.SITE_CONTENT.proxy.pageUrl) || "";
    if (!pageUrl) {
      // Provide a rejected promise to make error flow consistent
      return Promise.reject(new Error("CSP proxy pageUrl is not configured"));
    }
    state.origin = parseOrigin(pageUrl);

    state.ready = new Promise((resolve) => (state.readyResolve = resolve));

    const iframe = document.createElement("iframe");
    iframe.src = pageUrl;
    iframe.id = "cspProxyFrame";
    iframe.style.display = "none";
    iframe.setAttribute("aria-hidden", "true");
    iframe.setAttribute("tabindex", "-1");
    iframe.onload = () => {
      // Consider ready when loaded
      state.readyResolve();
    };
    document.body.appendChild(iframe);
    state.frame = iframe;

    if (!state.__listenerAdded) {
      window.addEventListener("message", (event) => {
        // If we know origin, optionally gate; else accept (the proxy may be on GH Pages)
        if (state.origin !== "*" && event.origin !== state.origin) return;
        const data = event.data || {};
        if (!data || typeof data !== "object" || data.__cspProxy !== true) return;
        const { id, ok, payload, error } = data;
        const pending = state.pending.get(id);
        if (!pending) return;
        state.pending.delete(id);
        if (ok) pending.resolve(payload);
        else pending.reject(new Error(error || "proxy error"));
      });
      state.__listenerAdded = true;
    }

    return state.ready;
  }

  function request(action, params = {}, timeoutMs = 8000) {
    const pageUrl =
      (window.SITE_CONTENT && window.SITE_CONTENT.proxy && window.SITE_CONTENT.proxy.pageUrl) || "";
    if (!state.frame) ensure(pageUrl).catch(() => {});
    if (!state.ready) return Promise.reject(new Error("CSP proxy not initialized"));

    const id = state.nextId++;
    const msg = { id, action, params, __cspProxy: true };

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        state.pending.delete(id);
        reject(new Error("proxy timeout"));
      }, timeoutMs);
      state.pending.set(id, {
        resolve: (x) => {
          clearTimeout(timer);
          resolve(x);
        },
        reject: (e) => {
          clearTimeout(timer);
          reject(e);
        },
      });
      state.ready.then(() => {
        try {
          const target = state.frame && state.frame.contentWindow;
          if (!target) throw new Error("no frame window");
          target.postMessage(msg, state.origin);
        } catch (e) {
          clearTimeout(timer);
          state.pending.delete(id);
          reject(e);
        }
      });
    });
  }

  window.CspProxy = { ensure, request };
})();

