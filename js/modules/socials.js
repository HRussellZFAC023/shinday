/* Socials module - renders the Find Me Online section */
window.socials = (function () {
  const C = window.SITE_CONTENT || {};
  const SOCIALS = (C.socials && C.socials.items) || [];

  function initSocials() {
    const socialsGrid = document.getElementById("socialsGrid");
    if (!socialsGrid) return;

    function ytVideoIdFromUrl(u) {
      // Support youtu.be short URLs and v= query param without using URL constructor
      if (!u || typeof u !== "string") return null;
      const short = u.match(/youtu\.be\/([^\?&\/]+)/i);
      if (short) return short[1];
      const vparam = u.match(/[?&]v=([^&]+)/i);
      if (vparam) return vparam[1];
      return null;
    }

    function ytHandleFromUrl(u) {
      if (!u || typeof u !== "string") return null;
      const m = u.match(/@([A-Za-z0-9_\-\.]+)/);
      return m ? m[1] : null;
    }

    const SPOTIFY_PROFILE =
      "https://open.spotify.com/user/31hkk7assbfbsaqjfybnyfmuakqq";

    function renderEmbed(s) {
      const { label, url, icon, color, mikuIcon: mikuIconName } = s;
      const displayIcon = mikuIconName
        ? window.MikuCore.mikuIcon(mikuIconName, icon)
        : icon;
      let domain =
        (url &&
          (url.match(/^https?:\/\/([^\/]+)/i) || ["", ""])[1].replace(
            /^www\./,
            "",
          )) ||
        "";

      // Blocklist some sites that should not be embedded (e.g., jigsawplanet)
      if (domain.includes("jigsawplanet.com")) {
        return `
          <div class="social-item" style="--accent:${color}">
            <div class="social-title"><span class="icon">${displayIcon}</span> ${label}</div>
            <div class="social-embed">
              <a class="pixel-btn" href="${url}" target="_blank" rel="noopener">Open Puzzle in new tab</a>
            </div>
          </div>
        `;
      }

      // YouTube video/channel fallback

      if (domain.includes("youtube.com") || domain === "youtu.be") {
        // Force a specific default video if not explicitly given
        const forced = "YTinkSv10Qs"; // requested video ID
        const vid = ytVideoIdFromUrl(url) || forced;
        if (vid) {
          return `
            <div class="social-item" style="--accent:${color}">
              <div class="social-title"><span class="icon">${displayIcon}</span> ${label}</div>
              <div class="social-embed" style="aspect-ratio:16/9">
                <iframe style="width:100%;height:100%;border:0;border-radius:12px" src="https://www.youtube.com/embed/${vid}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
              </div>
            </div>
          `;
        }
        const handle = ytHandleFromUrl(url);
        if (handle) {
          return `
            <div class="social-item" style="--accent:${color}">
              <div class="social-title"><span class="icon">${displayIcon}</span> ${label}</div>
              <div class="social-embed" style="aspect-ratio:16/9">
                <iframe style="width:100%;height:100%;border:0;border-radius:12px" src="https://www.youtube.com/embed?listType=user_uploads&list=${handle}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
              </div>
            </div>
          `;
        }
        return `
          <div class="social-item" style="--accent:${color}">
            <div class="social-title"><span class="icon">${displayIcon}</span> ${label}</div>
            <div class="social-embed"><a class="pixel-btn" href="${url}" target="_blank" rel="noopener">Open YouTube</a></div>
          </div>
        `;
      }

      // Spotify playlist
      if (domain.includes("open.spotify.com") && /\/playlist\//.test(url)) {
        const id = url.split("/playlist/")[1]?.split("?")[0];
        if (id) {
          return `
            <div class="social-item" style="--accent:${color}">
              <div class="social-title"><span class="icon">${displayIcon}</span> ${label}</div>
              <div class="social-embed">
                <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/${id}" width="100%" height="352" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
              </div>
            </div>
          `;
        }
      }

      // Discord invite (render a faux invite card using local assets)
      if (domain.includes("discord.gg") || domain.includes("discord.com")) {
        const banner = "./assets/discordServerBanner.png";
        const logo = "./assets/discordServerLogo.png";
        return `
          <div class="social-item" style="--accent:${color}">
            <div class="social-title"><span class="icon">${displayIcon}</span> ${label}</div>
            <div class="social-embed" style="border-radius:12px; overflow:hidden;">
              <div style="background:#2b2d31;color:#fff;border-radius:12px;display:flex;flex-direction:column;gap:0;overflow:hidden;border:2px solid var(--border)">
                <div style="position:relative;height:140px;background:#202225">
                  <img src="${banner}" alt="Discord banner" style="width:100%;height:100%;object-fit:cover;display:block;filter:saturate(1.05)" />
                  <img src="${logo}" alt="Server logo" style="position:absolute;left:16px;bottom:-28px;width:64px;height:64px;border-radius:12px;border:4px solid #2b2d31;background:#2b2d31" />
                </div>
                <div style="padding:40px 16px 16px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px">
                  <div>
                    <div style="font-weight:900;font-size:1.05rem;line-height:1.2">Join Baby Belle's Server</div>
                    <div style="color:#b5bac1;font-size:.9rem;margin-top:2px">Community • 69 Members</div>
                  </div>
                  <a href="${url}" target="_blank" rel="noopener" class="pixel-btn" style="background:#5865F2;color:#fff;font-weight:900;border:2px solid #4752C4;border-radius:10px;padding:10px 14px;white-space:nowrap">Join</a>
                </div>
              </div>
            </div>
          </div>
        `;
      }

      // Twitch (if provided in SOCIALS)
      if (domain.includes("twitch.tv")) {
        const ch = (() => {
          if (!url || typeof url !== "string") return "";
          const m = url.match(/twitch\.tv\/([^\/?#]+)/i);
          return m ? m[1] : "";
        })();
        const parent = location.hostname || "localhost";
        return `
          <div class="social-item" style="--accent:${color}">
            <div class="social-title"><span class="icon">${displayIcon}</span> ${label}</div>
            <div class="social-embed" style="aspect-ratio:16/9">
              <iframe src="https://player.twitch.tv/?channel=${ch}&parent=${parent}&muted=true" allowfullscreen style="border:0;width:100%;height:100%;border-radius:12px"></iframe>
            </div>
          </div>
        `;
      }

      // Spring/Teespring store (simple iframe embed)
      if (
        domain.includes("creator-spring.com") ||
        domain.includes("teespring.com")
      ) {
        return `
          <div class="social-item" style="--accent:${color}">
            <div class="social-title"><span class="icon">${displayIcon}</span> ${label}</div>
            <div class="social-embed" style="height:420px">
              <iframe src="${url}" style="border:0;width:100%;height:100%;border-radius:12px" loading="lazy" referrerpolicy="no-referrer"></iframe>
            </div>
          </div>
        `;
      }

      // Fallback: iframe
      return `
        <div class="social-item" style="--accent:${color}">
          <div class="social-title"><span class="icon">${displayIcon}</span> ${label}</div>
          <div class="social-embed">
            <iframe src="${url}" style="border:0;width:100%;height:400px;border-radius:12px" loading="lazy" referrerpolicy="no-referrer"></iframe>
          </div>
        </div>
      `;
    }

    socialsGrid.innerHTML = SOCIALS.map(renderEmbed).join("");
  }

  return { initSocials };
})();
