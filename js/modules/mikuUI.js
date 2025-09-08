//   ========== 🎌 MIKU UI SYSTEM 🎌  ==========
window.MikuUI = (function () {
  // ==========  CONTENT APPLICATION  ==========
  function applyContent() {
    const C = window.SITE_CONTENT;

    if (C.site?.htmlTitle) document.title = C.site.htmlTitle;
    if (C.site?.title) {
      const t = document.getElementById("siteTitle");
      if (t) t.textContent = C.site.title;
    }
    if (C.site?.subtitle) {
      const s = document.getElementById("siteSub");
      if (s) s.textContent = C.site.subtitle;
    }

    // Meta and icons
    if (C.images?.ogImage) {
      const og = document.getElementById("metaOgImage");
      if (og) og.setAttribute("content", C.images.ogImage);
    }
    if (C.images?.favicon) {
      const fav = document.getElementById("faviconLink");
      if (fav) fav.setAttribute("href", C.images.favicon);
    }

    // Header background image (override)
    if (C.images?.headerBg) {
      const header = document.getElementById("header");
      if (header)
        header.style.backgroundImage = /*html*/ `linear-gradient(135deg, rgba(189,227,255,.9), rgba(255,209,236,.9)), url('${C.images.headerBg}')`;
    }

    // Splash/hero/shrine images

    const heroMiku = document.getElementById("heroMiku");
    if (heroMiku)
      heroMiku.src =
        C.images?.heroMiku ||
        "./assets/hatsune_miku_render_by_jimmyisaac_d68ibgy-pre.png";
    const shrineMiku = document.getElementById("shrineMiku");
    if (shrineMiku)
      shrineMiku.src =
        C.images?.shrineMiku ||
        "./assets/miku_hatsune_5_by_makiilu_d4uklnz-fullview.png";

    // Pet iframe
    const pet = document.getElementById("petIframe");
    if (pet && C.embeds?.petIframeSrc) pet.src = C.embeds.petIframeSrc;

    // Stats badges
    if (Array.isArray(C.images?.statsBadges)) {
      const b1 = document.getElementById("statBadge1");
      const b2 = document.getElementById("statBadge2");
      if (b1 && C.images.statsBadges[0]) b1.src = C.images.statsBadges[0];
      if (b2 && C.images.statsBadges[1]) b2.src = C.images.statsBadges[1];
    }

    // Web badges (right sidebar)
    if (Array.isArray(C.images?.webBadges)) {
      const wrap = document.getElementById("webBadges");
      if (wrap) {
        wrap.innerHTML = C.images.webBadges
          .map((badge) => {
            if (typeof badge === "object" && badge.src) {
              // Special badge object (like our own badge)
              const link = badge.link || "#";
              const style = badge.style || "";
              const classes = badge.isOurBadge
                ? "badge our-own-badge"
                : "badge";
              return `<a href="${link}" target="_blank" rel="noopener"><img src="${
                badge.src
              }" class="${classes}" alt="${
                badge.alt || "badge"
              }" style="${style}"/></a>`;
            } else {
              // Simple URL string
              return `<img src="${badge}" class="badge" alt="badge"/>`;
            }
          })
          .join("");
      }
    }

    // Nav build: use C.nav to ensure order and labels (e.g., shrine then Wish)

    const ul = document.querySelector("#navbar ul");
    if (ul && Array.isArray(C.nav) && C.nav.length) {
      ul.innerHTML = C.nav
        .map((n) => {
          const icon = n.mikuIcon
            ? window.MikuCore.mikuIcon(n.mikuIcon, n.emoji || "")
            : n.emoji || "";
          return `<li><a href="#${n.id}" data-section="${n.id}">${icon} ${n.label}</a></li>`;
        })
        .join("");
    }

    // (Removed old nowPlaying placeholder: using radioDisplayStatus instead)
    // Status labels
    const onlineStatus = document.getElementById("onlineStatus");
    if (onlineStatus && C.status?.onlineLabel) {
      const statusIcon = C.status.statusIcon
        ? window.MikuCore.mikuIcon(C.status.statusIcon, "")
        : "";
      onlineStatus.innerHTML = /*html*/ `${statusIcon}${C.status.onlineLabel}`;
    }
    const heartCountSpan = document.getElementById("heartCount");
    if (heartCountSpan && C.status?.heartsLabel) {
      const heartIcon = C.status.heartIcon
        ? window.MikuCore.mikuIcon(C.status.heartIcon, "💖")
        : "💖";
      const parent = heartCountSpan.parentElement;
      if (parent) {
        const count = heartCountSpan.textContent;
        parent.innerHTML = /*html*/ `${heartIcon} ${C.status.heartsLabel}: <span id="heartCount">${count}</span>`;
      }
    }

    // Home hero + cards
    if (C.home) {
      const h2 = document.querySelector("#home .hero-text h2");
      if (h2 && C.home.heroTitle) h2.textContent = C.home.heroTitle;
      const p = document.querySelector("#home .hero-text p");
      if (p && Array.isArray(C.home.heroParagraphs)) {
        p.innerHTML = C.home.heroParagraphs
          .map((line, idx, arr) => {
            // Add love letter icon to the final line
            if (idx === arr.length - 1) {
              const ll = window.MikuCore.mikuIcon("loveLetter", "💌");
              return `${line} ${ll}`;
            }
            return line;
          })
          .join(" <br />");
      }
      const heartBtn = document.getElementById("heartBtn");
      if (heartBtn && C.home.heartButton) {
        const heartIcon = C.home.heartButtonIcon
          ? window.MikuCore.mikuIcon(C.home.heartButtonIcon, "💖")
          : "💖";
        heartBtn.innerHTML = /*html*/ `${heartIcon} ${C.home.heartButton}`;
      }

      // Rebuild the grid with unified presentation system
      const grid = document.querySelector("#home .content-grid");
      if (grid) {
        // Check if we have the new presentation slides
        if (C.home.presentationSlides && C.home.presentationSlides.length > 0) {
          const presentationIcon = C.home.presentationIcon
            ? window.MikuCore.mikuIcon(C.home.presentationIcon, "✨")
            : "✨";
          const presentationTitle =
            C.home.presentationTitle || "Getting to Know Baby Belle";

          // Build unified presentation
          const slidesHtml = C.home.presentationSlides
            .map((slide, index) => {
              const titleIcon = slide.titleIcon
                ? window.MikuCore.mikuIcon(slide.titleIcon, "")
                : "";
              const decorativeIconsHtml = slide.decorativeIcons
                ? slide.decorativeIcons
                    .map((iconName) => window.MikuCore.mikuIcon(iconName, ""))
                    .join("")
                : "";

              return `
                <div class="presentation-slide ${index === 0 ? "active" : ""}" 
                     data-slide="${index}" 
                     data-theme="${slide.theme || "default"}">
                  <div class="slide-header">
                    <h3>${titleIcon}${slide.title}</h3>
                    <div class="slide-decorations">${decorativeIconsHtml}</div>
                  </div>
                  <div class="slide-content">
                    ${slide.content
                      .map((line) => (line ? `<p>${line}</p>` : "<br>"))
                      .join("")}
                  </div>
                  <div class="slide-number">${index + 1} / ${
                    C.home.presentationSlides.length
                  }</div>
                </div>
              `;
            })
            .join("");

          grid.innerHTML = /*html*/ `
              <div class="belle-presentation">
                <div class="presentation-header">
                  <h2>${presentationIcon}${presentationTitle}</h2>
                  <div class="presentation-controls">
                    <button class="presentation-btn prev-slide" data-direction="prev">
                      ${window.MikuCore.mikuIcon("wallHide", "◀")} Previous
                    </button>
                    <div class="slide-indicator">
                      <span class="current-slide">1</span> / ${
                        C.home.presentationSlides.length
                      }
                    </div>
                    <button class="presentation-btn next-slide" data-direction="next">
                      Next ${window.MikuCore.mikuIcon("cheering", "▶")}
                    </button>
                  </div>
                  <div class="presentation-progress">
                    <div class="progress-bar">
                      <div class="progress-fill" style="width: ${
                        100 / C.home.presentationSlides.length
                      }%"></div>
                    </div>
                  </div>
                </div>
                <div class="presentation-content">
                  ${slidesHtml}
                </div>
                <div class="floating-decorations"></div>
              </div>
            `;

          // Initialize the enhanced presentation system (guard if unavailable)
          if (typeof initBellePresentation === "function") {
            initBellePresentation();
          }
        } else {
          // Fallback to old system
          const likes = (C.home.likes || [])
            .map((li) => `<li>${li}</li>`)
            .join("");
          const dislikes = (C.home.dislikes || [])
            .map((li) => `<li>${li}</li>`)
            .join("");
          const dreams = (C.home.dreams || [])
            .map((li, idx) => {
              const dreamIcon = C.home.dreamItemIcons?.[idx]
                ? window.MikuCore.mikuIcon(C.home.dreamItemIcons[idx], "")
                : "";
              return `<li>${dreamIcon}${li}</li>`;
            })
            .join("");

          // Build paginated about content
          const aboutPages = C.home.aboutPages || [
            C.home.aboutParagraphs || [],
          ];
          const aboutPageHtml = aboutPages
            .map(
              (page, index) =>
                `<div class="card-page ${
                  index === 0 ? "active" : ""
                }" data-page="${index}">
                ${page.map((txt) => `<p>${txt}</p>`).join("")}
              </div>`,
            )
            .join("");

          // Build paginated dislikes content
          const dislikesPages = C.home.dislikesPages || [C.home.dislikes || []];
          const dislikesPageHtml = dislikesPages
            .map(
              (page, index) =>
                `<div class="card-page ${
                  index === 0 ? "active" : ""
                }" data-page="${index}">
                <ul>${page.map((item) => `<li>${item}</li>`).join("")}</ul>
              </div>`,
            )
            .join("");

          // Build paginated dreams content
          const dreamsPages = C.home.dreamsPages || [C.home.dreams || []];
          const dreamsPageHtml = dreamsPages
            .map(
              (page, index) =>
                `<div class="card-page ${
                  index === 0 ? "active" : ""
                }" data-page="${index}">
                <ul>${page
                  .map((item, idx) => {
                    const dreamIcon = C.home.dreamItemIcons?.[idx]
                      ? window.MikuCore.mikuIcon(C.home.dreamItemIcons[idx], "")
                      : "";
                    return `<li>${dreamIcon}${item}</li>`;
                  })
                  .join("")}</ul>
              </div>`,
            )
            .join("");

          const pieces = [];
          const aboutTitleIcon = C.home.aboutIcon
            ? window.MikuCore.mikuIcon(C.home.aboutIcon, "")
            : "";
          const aboutTitle = /*html*/ `${aboutTitleIcon}${
            C.home.aboutTitle || "About Me"
          }`;

          // About card with pagination
          pieces.push(`
              <div class="card paginated-card" data-card="about">
                <div class="card-header">
                  <h3>${aboutTitle}</h3>
                  ${
                    aboutPages.length > 1
                      ? `
                    <div class="card-nav">
                      <button class="card-nav-btn prev-btn" data-direction="prev">${window.MikuCore.mikuIcon(
                        "wallHide",
                        "←",
                      )}</button>
                      <span class="page-indicator">1/${aboutPages.length}</span>
                      <button class="card-nav-btn next-btn" data-direction="next">${window.MikuCore.mikuIcon(
                        "cheering",
                        "→",
                      )}</button>
                    </div>
                  `
                      : ""
                  }
                </div>
                <div class="card-content">
                  ${aboutPageHtml}
                </div>
              </div>
            `);

          // Likes card with icon
          if (likes) {
            const likesIcon = C.home.likesIcon
              ? window.MikuCore.mikuIcon(C.home.likesIcon, "")
              : "";
            pieces.push(`
                <div class="card">
                  <h3>${likesIcon}${C.home.likesTitle || "Likes"}</h3>
                  <ul>${likes}</ul>
                </div>
              `);
          }

          // Dislikes card with pagination
          if (C.home.dislikesPages && C.home.dislikesPages.length > 0) {
            const dislikesIcon = C.home.dislikesIcon
              ? window.MikuCore.mikuIcon(C.home.dislikesIcon, "")
              : "";
            pieces.push(`
                <div class="card paginated-card" data-card="dislikes">
                  <div class="card-header">
                    <h3>${dislikesIcon}${
                      C.home.dislikesTitle || "Dislikes"
                    }</h3>
                    ${
                      dislikesPages.length > 1
                        ? `
                      <div class="card-nav">
                        <button class="card-nav-btn prev-btn" data-direction="prev">${window.MikuCore.mikuIcon(
                          "wallHide",
                          "←",
                        )}</button>
                        <span class="page-indicator">1/${
                          dislikesPages.length
                        }</span>
                        <button class="card-nav-btn next-btn" data-direction="next">${window.MikuCore.mikuIcon(
                          "innocent",
                          "→",
                        )}</button>
                      </div>
                    `
                        : ""
                    }
                  </div>
                  <div class="card-content">
                    ${dislikesPageHtml}
                  </div>
                </div>
              `);
          } else if (dislikes) {
            const dislikesIcon = C.home.dislikesIcon
              ? window.MikuCore.mikuIcon(C.home.dislikesIcon, "")
              : "";
            pieces.push(`
                <div class="card">
                  <h3>${dislikesIcon}${C.home.dislikesTitle || "Dislikes"}</h3>
                  <ul>${dislikes}</ul>
                </div>
              `);
          }

          // Dreams card with pagination
          if (C.home.dreamsPages && C.home.dreamsPages.length > 0) {
            const dreamsTitleIcon = C.home.dreamsIcon
              ? window.MikuCore.mikuIcon(C.home.dreamsIcon, "")
              : "";
            const dreamsTitle = /*html*/ `${dreamsTitleIcon}${
              C.home.dreamsTitle || "Dreams"
            }`;
            pieces.push(`
                <div class="card paginated-card" data-card="dreams">
                  <div class="card-header">
                    <h3>${dreamsTitle}</h3>
                    ${
                      dreamsPages.length > 1
                        ? `
                      <div class="card-nav">
                        <button class="card-nav-btn prev-btn" data-direction="prev">${window.MikuCore.mikuIcon(
                          "wallHide",
                          "←",
                        )}</button>
                        <span class="page-indicator">1/${
                          dreamsPages.length
                        }</span>
                        <button class="card-nav-btn next-btn" data-direction="next">${window.MikuCore.mikuIcon(
                          "starUwu",
                          "→",
                        )}</button>
                      </div>
                    `
                        : ""
                    }
                  </div>
                  <div class="card-content">
                    ${dreamsPageHtml}
                  </div>
                </div>
              `);
          } else if (dreams) {
            const dreamsTitleIcon = C.home.dreamsIcon
              ? window.MikuCore.mikuIcon(C.home.dreamsIcon, "")
              : "";
            const dreamsTitle = /*html*/ `${dreamsTitleIcon}${
              C.home.dreamsTitle || "Dreams"
            }`;
            pieces.push(`
                <div class="card">
                  <h3>${dreamsTitle}</h3>
                  <ul>${dreams}</ul>
                </div>
              `);
          }

          grid.innerHTML = pieces.join("");

          // Initialize card pagination
          initCardPagination();
        }
      }
    }

    // Socials section title
    if (C.socials?.title) {
      const h2 = document.querySelector("#socials h2");
      const titleIcon = C.socials.titleIcon
        ? window.MikuCore.mikuIcon(C.socials.titleIcon, "🔗")
        : "🔗";
      if (h2) h2.innerHTML = /*html*/ `${titleIcon} ${C.socials.title}`;
    }

    // Quick Links in left sidebar
    if (C.quickLinks) {
      const h3 = document.getElementById("quickLinksTitle");
      const ul = document.getElementById("quickLinksList");
      if (h3 && C.quickLinks.title) h3.textContent = C.quickLinks.title;
      if (ul && Array.isArray(C.quickLinks.items)) {
        ul.innerHTML = C.quickLinks.items
          .map(
            (i) =>
              `<li><a href="${i.url}" target="_blank" rel="noopener" ${
                i.cls ? `class="${i.cls}"` : ""
              }>${i.label}</a></li>`,
          )
          .join("");
      }
    } else {
      // Fallback if content not ready yet: render a basic set from defaults later
      setTimeout(() => {
        if (window.SITE_CONTENT && window.SITE_CONTENT.quickLinks)
          applyContent();
      }, 100);
    }

    // Study copy
    if (C.study) {
      const h2 = document.querySelector("#study h2");
      const studyIcon = C.study.titleIcon
        ? window.MikuCore.mikuIcon(C.study.titleIcon, "🎌")
        : "🎌";
      if (h2) h2.innerHTML = /*html*/ `${studyIcon} ${C.study.title}`;
      // HUD level is managed by Progression module; no content override
      const wodCard = document.getElementById("wodCard");
      const wodInline = document.querySelector(".word-of-day");
      if (C.study.wordOfDay) {
        const setWod = (root) => {
          if (!root) return;
          const jp = root.querySelector(".japanese");
          const romaji = root.querySelector(".romaji");
          const meaning = root.querySelector(".meaning");
          const src = window.WOD || C.study.wordOfDay || {};
          if (jp) jp.textContent = src.word || src.japanese || "";
          if (romaji) romaji.textContent = src.reading || src.romaji || "";
          if (meaning) meaning.textContent = src.meaning || "";
        };
        setWod(wodCard);
        setWod(wodInline);
      }
      const goalsCard = document.getElementById("goalsCard");
      if (goalsCard) {
        const h3 = goalsCard.querySelector("h3");
        const ul = goalsCard.querySelector("ul");
        if (h3 && C.study.goalsTitle) {
          const goalsIcon = C.study.goalsIcon
            ? window.MikuCore.mikuIcon(C.study.goalsIcon, "")
            : "";
          h3.innerHTML = /*html*/ `${goalsIcon}${C.study.goalsTitle}`;
        }
        if (ul && Array.isArray(C.study.goals))
          ul.innerHTML = C.study.goals
            .map((g, idx) => {
              const goalIcon = C.study.goalItemIcons?.[idx]
                ? window.MikuCore.mikuIcon(C.study.goalItemIcons[idx], "")
                : "";
              return `<li>${goalIcon}${g}</li>`;
            })
            .join("");
      }
    }

    // Games titles/buttons
    if (C.games) {
      const h2 = document.querySelector("#games h2");
      if (h2) h2.textContent = C.games.title;
      const cards = document.querySelectorAll("#games .game-widget");
      const mem = cards[0],
        heart = cards[1];
      if (mem) {
        const h3 = mem.querySelector("h3");
        if (h3 && C.games.memoryTitle) {
          const memoryIcon = C.games.memoryIcon
            ? window.MikuCore.mikuIcon(C.games.memoryIcon, "🧩")
            : "🧩";
          h3.innerHTML = /*html*/ `${memoryIcon} ${C.games.memoryTitle}`;
        }
        const reset = document.getElementById("resetMemory");
        if (reset && C.games.memoryReset)
          reset.textContent = C.games.memoryReset;
      }
      if (heart) {
        const h3 = heart.querySelector("h3");
        if (h3 && C.games.heartsTitle) {
          const heartsIcon = C.games.heartsIcon
            ? window.MikuCore.mikuIcon(C.games.heartsIcon, "💖")
            : "💖";
          h3.innerHTML = /*html*/ `${heartsIcon} ${C.games.heartsTitle}`;
        }
        const zone = document.getElementById("heartZone");
        if (zone && C.games.heartsZone) {
          const zoneIcon = C.games.heartsZoneIcon
            ? window.MikuCore.mikuIcon(C.games.heartsZoneIcon, "💖")
            : "💖";
          zone.innerHTML = /*html*/ `Click to collect hearts! ${zoneIcon}`;
        }
        const btn = document.getElementById("resetHearts");
        if (btn && C.games.heartsReset) btn.textContent = C.games.heartsReset;
      }
      const WishSection = document.getElementById("Wish");
      if (WishSection) {
        const WishHeader = WishSection.querySelector("h2");
        if (WishHeader && C.games.WishTitle) {
          const WishIcon = C.games.WishIcon
            ? window.MikuCore.mikuIcon(C.games.WishIcon, "🎰")
            : "🎰";
          WishHeader.innerHTML = /*html*/ `${WishIcon} ${C.games.WishTitle}`;
        }
        const dexBtn = document.getElementById("WishCollectionBtn");
        if (dexBtn && C.games.WishOpenDex)
          dexBtn.textContent = C.games.WishOpenDex;
      }
    }

    // Shrine copy
    if (C.shrine) {
      const h2 = document.querySelector("#shrine h2");
      if (h2) {
        const titleIcon = C.shrine.titleIcon
          ? window.MikuCore.mikuIcon(C.shrine.titleIcon, "⛩️")
          : "⛩️";
        h2.innerHTML = /*html*/ `${titleIcon} ${C.shrine.title}`;
      }
      const aboutTitle = document.querySelector("#shrine .shrine-info h3");
      if (aboutTitle && C.shrine.aboutTitle) {
        const aboutIcon = C.shrine.aboutIcon
          ? window.MikuCore.mikuIcon(C.shrine.aboutIcon, "💙")
          : "💙";
        aboutTitle.innerHTML = /*html*/ `${aboutIcon} ${C.shrine.aboutTitle}`;
      }
      const aboutP = document.querySelector("#shrine .shrine-info p");
      if (aboutP && C.shrine.aboutText) aboutP.textContent = C.shrine.aboutText;
      const listTitle = document.querySelectorAll("#shrine .shrine-info h3")[1];
      if (listTitle && C.shrine.favoriteSongsTitle)
        listTitle.textContent = C.shrine.favoriteSongsTitle;
      const ul = document.querySelector("#shrine .song-list");
      if (ul) {
        // Build a structured favorites list from config
        const maxN = Number.isFinite(C.shrine.favoriteSongsMax)
          ? C.shrine.favoriteSongsMax
          : 999;
        const rich = Array.isArray(C.shrine.favoriteSongsData)
          ? C.shrine.favoriteSongsData
          : [];
        const simple = Array.isArray(C.shrine.favoriteSongs)
          ? C.shrine.favoriteSongs
          : [];

        const items = [];
        if (rich.length) {
          for (const r of rich) {
            if (!r || !r.title) continue;
            items.push({
              title: r.title,
              artist: r.artist || "",
              videoId: r.youtubeId || "",
              search:
                r.search || `${r.title} ${r.artist || "Hatsune Miku"} official`,
            });
            if (items.length >= maxN) break;
          }
        } else if (simple.length) {
          for (const s of simple) {
            if (typeof s !== "string") continue;
            const parts = s.split(" - ");
            const title = parts[0] || s;
            const artist = parts[1] || "Hatsune Miku";
            items.push({
              title,
              artist,
              videoId: "",
              search: `${title} ${artist} official`,
            });
            if (items.length >= maxN) break;
          }
        }

        ul.innerHTML = items
          .map((it) => {
            const label = it.title;
            const data = [
              `data-title="${label.replace(/"/g, "&quot;")}"`,
              it.videoId ? `data-video-id="${it.videoId}"` : "",
              it.search
                ? `data-search="${it.search.replace(/"/g, "&quot;")}"`
                : "",
            ]
              .filter(Boolean)
              .join(" ");
            return `<li class="favorite-song" ${data} style="cursor:pointer">${label}</li>`;
          })
          .join("");
      }
      const galTitle = document.querySelector("#shrine .gallery h3");
      if (galTitle && C.shrine.galleryTitle)
        galTitle.textContent = C.shrine.galleryTitle;
    }

    // Friends section and sidebar widget
    if (C.friends) {
      const friendsIcon = C.friends.titleIcon
        ? window.MikuCore.mikuIcon(C.friends.titleIcon, "👥")
        : "👥";

      const lists = [];
      const sidebarList = document.getElementById("friendsList");
      if (sidebarList) {
        const widget = sidebarList.closest(".widget");
        const h3 = widget ? widget.querySelector("h3") : null;
        if (h3 && C.friends.title)
          h3.innerHTML = /*html*/ `${friendsIcon} ${C.friends.title}`;
        lists.push(sidebarList);
      }

      const section = document.getElementById("friends");
      if (section) {
        const h2 = section.querySelector("h2");
        if (h2 && C.friends.title)
          h2.innerHTML = /*html*/ `${friendsIcon} ${C.friends.title}`;
        const mainList = section.querySelector("#friendsSectionList");
        if (mainList) lists.push(mainList);
      }

      if (lists.length && Array.isArray(C.friends.items)) {
        const markup = C.friends.items
          .map((friend) => {
            const icon = friend.mikuIcon
              ? window.MikuCore.mikuIcon(friend.mikuIcon, friend.emoji || "")
              : friend.emoji || "";
            return `<a href="${friend.url}" class="friend-button" target="_blank" rel="noopener">${icon} ${friend.name}</a>`;
          })
          .join("");
        lists.forEach((el) => (el.innerHTML = markup));
      }
    }

    // Sidebar widget titles (programmatically by element anchors)
    if (C.sidebarTitles) {
      const left = C.sidebarTitles.left || {};
      const right = C.sidebarTitles.right || {};

      // Radio heading
      const radioWidget = document.querySelector(".radio-widget");
      if (radioWidget && C.radio?.title) {
        const w = radioWidget.closest(".widget");
        const h = w ? w.querySelector("h3") : null;
        const radioIcon = C.radio.titleIcon
          ? window.MikuCore.mikuIcon(C.radio.titleIcon, "📻")
          : "📻";
        if (h) h.innerHTML = /*html*/ `${radioIcon} ${C.radio.title}`;
      }

      // Pet heading
      const petIframe = document.getElementById("petIframe");
      if (petIframe && left.pet) {
        const w = petIframe.closest(".widget");
        const h = w ? w.querySelector("h3") : null;
        const petIcon = left.petIcon
          ? window.MikuCore.mikuIcon(left.petIcon, "🐾")
          : "🐾";
        if (h) h.innerHTML = /*html*/ `${petIcon} ${left.pet}`;
      }

      // Friends heading handled above

      // Stats heading (robust: prefer visitorCount anchor; fallback statBadge1)
      const statsAnchor =
        document.getElementById("visitorCount") ||
        document.getElementById("statBadge1");
      if (statsAnchor && left.stats) {
        const w = statsAnchor.closest(".widget");
        const h = w ? w.querySelector("h3") : null;
        const statsIcon = left.statsIcon
          ? window.MikuCore.mikuIcon(left.statsIcon, "🌸")
          : "🌸";
        if (h) h.innerHTML = /*html*/ `${statsIcon} ${left.stats}`;

        // Also update visitor counter label with icon
        const visitorLabel = w ? w.querySelector(".counter-label") : null;
        if (visitorLabel) {
          const icon = C.status?.visitorIcon
            ? window.MikuCore.mikuIcon(C.status.visitorIcon, "")
            : "";
          const label = (C.status && C.status.visitorsLabel) || "Visitors:";
          visitorLabel.innerHTML = /*html*/ `${icon}${label}`;
        }
      }

      // Quick Links title (now on right)
      const quickLinksTitle = document.getElementById("quickLinksTitle");
      if (quickLinksTitle && right.quickLinks) {
        const quickLinksIcon = right.quickLinksIcon
          ? window.MikuCore.mikuIcon(right.quickLinksIcon, "🌟")
          : "🌟";
        quickLinksTitle.innerHTML = /*html*/ `${quickLinksIcon} ${right.quickLinks}`;
      }

      // Badges title
      const webBadges = document.getElementById("webBadges");
      if (webBadges && right.badges) {
        const w = webBadges.closest(".widget");
        const h = w ? w.querySelector("h3") : null;
        const badgesIcon = right.badgesIcon
          ? window.MikuCore.mikuIcon(right.badgesIcon, "💫")
          : "💫";
        if (h) h.innerHTML = /*html*/ `${badgesIcon} ${right.badges}`;
      }

      // Shop title
      const shopPanel = document.querySelector(".shop-panel");
      if (shopPanel && right.shop) {
        const w = shopPanel.closest(".widget");
        const h = w ? w.querySelector("h3") : null;
        const shopIcon = right.shopIcon
          ? window.MikuCore.mikuIcon(right.shopIcon, "🛍️")
          : "🛍️";
        if (h) h.innerHTML = /*html*/ `${shopIcon} ${right.shop}`;
      }

      // Diva HUD title
      const divaWidget = document.getElementById("jpHudWidget");
      if (divaWidget && right.diva) {
        const h = divaWidget.querySelector("h3");
        if (h) {
          const divaIcon = right.divaIcon
            ? window.MikuCore.mikuIcon(right.divaIcon, "🎤")
            : ""; // content may already include emoji
          h.innerHTML = divaIcon
            ? /*html*/ `${divaIcon} ${right.diva}`
            : right.diva;
        }
      }

      // Vibe title
      const vibeMeter = document.querySelector("#rightSidebar .vibe-meter");
      if (vibeMeter && right.vibe) {
        const w = vibeMeter.closest(".widget");
        const h = w ? w.querySelector("h3") : null;
        const vibeIcon = right.vibeIcon
          ? window.MikuCore.mikuIcon(right.vibeIcon, "📊")
          : "📊";
        if (h) h.innerHTML = /*html*/ `${vibeIcon} ${right.vibe}`;
      }
    }

    // Footer
    if (C.footer?.text) {
      const p = document.querySelector("#footer p");
      if (p) p.textContent = C.footer.text;
    }
  }

  function createConfetti(count = 80) {
    const container = document.createElement("div");
    container.style.cssText = `
      position: fixed; left: 0; top: 0; right: 0; bottom: 0;
      pointer-events: none; z-index: 99998;
    `;

    const mikuColors = [
      "#00bcd4",
      "#ff4081",
      "#4caf50",
      "#ffeb3b",
      "#e91e63",
      "#9c27b0",
    ];

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      const size = 4 + Math.random() * 8;
      const color = mikuColors[Math.floor(Math.random() * mikuColors.length)];

      particle.style.cssText = `
        position: absolute; left: ${Math.random() * 100}vw; top: -20px;
        width: ${size}px; height: ${size}px; background: ${color};
        border-radius: ${Math.random() > 0.5 ? "50%" : "2px"};
        opacity: 0.9;
      `;

      container.appendChild(particle);

      const endX = (Math.random() - 0.5) * 400;
      const endY = 200 + Math.random() * 400;
      const rotation = Math.random() * 720;

      particle.animate(
        [
          { transform: "translate(0, 0) rotate(0deg)", opacity: 1 },
          {
            transform: `translate(${endX}px, ${endY}px) rotate(${rotation}deg)`,
            opacity: 0,
          },
        ],
        {
          duration: 1200 + Math.random() * 800,
          easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        },
      );

      setTimeout(() => particle.remove(), 2200);
    }

    document.body.appendChild(container);
    setTimeout(() => container.remove(), 2500);
  }

  // ========== BADGE SYSTEM ==========
  const BADGE_STORAGE_KEY = "miku.badges";

  function getBadges() {
    const stored = localStorage.getItem(BADGE_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  function hasBadge(badgeId) {
    return getBadges().includes(badgeId);
  }

  function unlockBadge(badgeId, badgeName) {
    if (hasBadge(badgeId)) return false;

    const badges = getBadges();
    badges.push(badgeId);
    localStorage.setItem(BADGE_STORAGE_KEY, JSON.stringify(badges));

    window.hearts.loveToast(`🏆 Badge Unlocked: ${badgeName}`, "miku");
    createConfetti(60);

    // Play achievement sound
    if (window.SFX?.play) window.SFX.play("hearts.milestone");

    return true;
  }

  // ========== ENHANCED UI MAGIC ==========
  function addMikuIconsEverywhere() {
    // Auto-add icons to headings
    const headings = document.querySelectorAll(
      "h2:not([data-miku-icon]), h3:not([data-miku-icon])",
    );
    const icons = [
      "star uwu",
      "jumping with music notes",
      "vibing",
      "cheering",
      "love letter",
    ];

    headings.forEach((heading, index) => {
      if (window.mikuIcon) {
        const iconName = icons[index % icons.length];
        heading.innerHTML = `${window.MikuCore.mikuIcon(iconName, "✨")} ${
          heading.innerHTML
        }`;
        heading.setAttribute("data-miku-icon", "true");
      }
    });

    // Auto-add icons to buttons
    const buttons = document.querySelectorAll(
      ".pixel-btn:not([data-miku-icon])",
    );
    const buttonIcons = [
      "ok hands",
      "thumbs up",
      "pow!",
      "love",
      "jumping with stars",
    ];

    buttons.forEach((button, index) => {
      if (window.mikuIcon && !button.querySelector(".miku-icon")) {
        const iconName = buttonIcons[index % buttonIcons.length];
        button.innerHTML = `${window.MikuCore.mikuIcon(iconName, "✨")} ${
          button.textContent
        }`;
        button.setAttribute("data-miku-icon", "true");
      }
    });
  }

  function enhanceWidgets() {
    const widgets = document.querySelectorAll(".widget:not([data-enhanced])");

    widgets.forEach((widget, index) => {
      widget.style.setProperty("--widget-index", index);

      if (!widget.querySelector(".widget-sparkle")) {
        const sparkle = document.createElement("div");
        sparkle.className = "widget-sparkle";
        sparkle.innerHTML = "✨";
        sparkle.style.cssText = `
          position: absolute; top: -8px; right: -8px; font-size: 14px;
          animation: sparkleFloat 3s ease-in-out infinite; z-index: 1;
          pointer-events: none;
        `;
        widget.style.position = "relative";
        widget.appendChild(sparkle);
      }

      widget.setAttribute("data-enhanced", "true");
    });
  }

  // ========== DIVA FEEDBACK SYSTEM ==========
  function showDivaFeedback(elementId, message, isCorrect = true) {
    const element = document.getElementById(elementId);
    if (!element) return;

    element.textContent = message;
    element.className = `diva-feedback-enhanced ${
      isCorrect ? "correct" : "incorrect"
    }`;
    element.style.display = "block";
    element.style.opacity = "1";
    element.setAttribute("data-persistent", "true");
  }

  function clearDivaFeedback(elementId) {
    const element = document.getElementById(elementId);
    if (element?.getAttribute("data-persistent") === "true") {
      element.style.opacity = "0";
      setTimeout(() => {
        element.textContent = "";
        element.style.display = "none";
        element.removeAttribute("data-persistent");
      }, 300);
    }
  }

  // ========== AUTO-ENHANCEMENT OBSERVER ==========
  function startAutoEnhancement() {
    const observer = new MutationObserver(() => {
      // Debounce the enhancement calls
      clearTimeout(window._enhancementTimeout);
      window._enhancementTimeout = setTimeout(() => {
        addMikuIconsEverywhere();
        enhanceWidgets();
      }, 100);
    });

    const mainContent = document.getElementById("mainContent");
    if (mainContent) {
      observer.observe(mainContent, { childList: true, subtree: true });
    }
  }

  // ========== INITIALIZATION ==========
  function initialize() {
    // Initialize splash system
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initializeSplash);
    } else {
      initializeSplash();
    }

    // Enhance existing UI
    applyContent();
    addMikuIconsEverywhere();
    enhanceWidgets();
    startAutoEnhancement();
  }

  // Public API
  return {
    initializeContent: initialize,
    splash: initializeSplash,
    effects: { confetti: createConfetti },
    badges: { get: getBadges, has: hasBadge, unlock: unlockBadge },
    feedback: { show: showDivaFeedback, clear: clearDivaFeedback },
  };
})();
