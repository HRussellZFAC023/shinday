// Load mikus.json + simple color heuristic classifier; exposes MIKU_IMAGES and getMikuMeta
(function () {
  if (window.MIKU_IMAGES && window.MIKU_META) return;
  const C = window.SITE_CONTENT || {};
  const MIKU_IMAGES = [];
  const MIKU_META = Object.create(null);
  window.MIKU_META = MIKU_META;
  let resolveReady;
  window.MIKU_IMAGES_READY = new Promise((r) => (resolveReady = r));

  function rgbToHsv(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h,
      s,
      v = max;
    const d = max - min;
    s = max === 0 ? 0 : d / max;
    if (max === min) h = 0;
    else {
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return { h: h * 360, s, v };
  }

  function decideType(r) {
    let type = "Hatsune Miku",
      rarity = null;
    if (r.black > 0.5 && r.blue > r.red && r.blue > 0.15) {
      type = "Black Rock Shooter Miku";
      rarity = 5;
    } else if (r.white > 0.4 && r.blue + r.cyan > r.red + r.green) {
      type = "Snow Miku";
      rarity = r.white > 0.55 ? 5 : 4;
    } else if (r.pink > 0.25) {
      type = r.pink > 0.4 ? "Sakura Miku (Blossom)" : "Sakura Miku";
      rarity = r.pink > 0.4 ? 5 : 4;
    } else {
      const hairTeal = r.cyan + r.green * 0.5;
      rarity = hairTeal > 0.25 ? 3 : 2;
    }
    return { type, rarity };
  }

  function analyze(url) {
    return new Promise((res) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        try {
          const size = 24;
          const c = document.createElement("canvas");
          c.width = size;
          c.height = size;
          const ctx = c.getContext("2d", { willReadFrequently: true });
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(img, 0, 0, size, size);
          const data = ctx.getImageData(0, 0, size, size).data;
          let total = 0,
            black = 0,
            white = 0,
            red = 0,
            orange = 0,
            yellow = 0,
            green = 0,
            cyan = 0,
            blue = 0,
            purple = 0,
            magenta = 0,
            bright = 0,
            pink = 0;
          for (let i = 0; i < data.length; i += 4) {
            const a = data[i + 3];
            if (a < 10) continue;
            const r = data[i],
              g = data[i + 1],
              b = data[i + 2];
            const { h, s, v } = rgbToHsv(r, g, b);
            total++;
            bright += v;
            if (v < 0.18) {
              black++;
              continue;
            }
            if (s < 0.12 && v > 0.85) {
              white++;
              continue;
            }
            if (h < 12 || h >= 348) red++;
            else if (h < 45) orange++;
            else if (h < 75) yellow++;
            else if (h < 165) green++;
            else if (h < 195) cyan++;
            else if (h < 255) blue++;
            else if (h < 285) purple++;
            else if (h < 348) magenta++;
            if (v > 0.6 && s > 0.25 && (h < 20 || (h > 300 && h < 350))) pink++;
          }
          const inv = Math.max(1, total);
          const ratios = {
            black: black / inv,
            white: white / inv,
            red: red / inv,
            orange: orange / inv,
            yellow: yellow / inv,
            green: green / inv,
            cyan: cyan / inv,
            blue: blue / inv,
            purple: purple / inv,
            magenta: magenta / inv,
            pink: pink / inv,
            brightness: bright / inv,
          };
          res(ratios);
        } catch (e) {
          res(null);
        }
      };
      img.onerror = () => res(null);
      img.src = url;
    });
  }

  let queue = [];
  let inflight = 0;
  const MAX = 2;
  function pump() {
    while (inflight < MAX && queue.length) {
      const { url, resolve } = queue.shift();
      inflight++;
      if (/pixiebel\.gif$/i.test(url)) {
        const base = MIKU_META[url] || {};
        const meta = { ...base, final: true };
        MIKU_META[url] = meta;
        inflight--;
        resolve(meta);
        continue;
      }
      analyze(url)
        .then((r) => {
          const base = MIKU_META[url] || {};
          const hint = r
            ? { ...decideType(r), ratios: r }
            : { type: "Hatsune Miku" };
          const merged = {
            ...hint,
            ...base,
            type: base.type || hint.type,
            ratios: hint.ratios || base.ratios,
            final: true,
          };
          MIKU_META[url] = merged;
          resolve(merged);
        })
        .catch(() => {
          const base = MIKU_META[url] || {};
          const merged = {
            type: base.type || "Hatsune Miku",
            rarity: base.rarity ?? null,
            description: base.description || "",
            ...base,
            final: true,
          };
          MIKU_META[url] = merged;
          resolve(merged);
        })
        .finally(() => {
          inflight--;
          pump();
        });
    }
  }

  function classifyUrl(url) {
    if (MIKU_META[url] && MIKU_META[url].final)
      return Promise.resolve(MIKU_META[url]);
    return new Promise((resolve) => {
      queue.push({ url, resolve });
      pump();
    });
  }

  function load() {
    const manifest = "./assets/pixel-miku/mikus.json";
    if (Array.isArray(C.images?.extraMikus))
      MIKU_IMAGES.push(
        ...C.images.extraMikus.filter((u) => typeof u === "string" && u),
      );
    fetch(manifest)
      .then((r) => r.json())
      .then((list) => {
        list.forEach((m) => {
          const url = `./assets/pixel-miku/${m.filename}`;
          MIKU_IMAGES.push(url);
          MIKU_META[url] = { ...m };
        });
      })
      .catch(() => {})
      .finally(() => {
        if (typeof resolveReady === "function")
          resolveReady(MIKU_IMAGES.slice());
        document.dispatchEvent(
          new CustomEvent("miku-images-ready", {
            detail: { images: MIKU_IMAGES.slice() },
          }),
        );
        // background classify
        MIKU_IMAGES.slice(0, 60).forEach((u) => classifyUrl(u));
      });
  }

  window.getMikuMeta = function (url, allowLazy = true) {
    const meta = MIKU_META[url];
    if (meta) return meta;
    if (allowLazy) classifyUrl(url);
    return MIKU_META[url] || null;
  };
  load();
})();
