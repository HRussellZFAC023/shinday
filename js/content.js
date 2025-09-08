/**
 * SITE CONTENT - Edit-friendly copy and links
 *
 * How to update:
 * - Open this file on GitHub (web UI) and click the pencil icon.
 * - Change text, links, or lists below. Keep the same structure (keys) but feel free to add/remove items in arrays.
 * - Click “Commit changes”. Your site will update on the next deploy.
 */

// Calculate dynamic age based on birthday
const birthYear = 1999;
const birthdayMonth = 9; // September
const birthdayDay = 22;
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1; // getMonth() is 0-based
const currentDay = today.getDate();
let age = currentYear - birthYear;
if (
  currentMonth < birthdayMonth ||
  (currentMonth === birthdayMonth && currentDay < birthdayDay)
) {
  age--;
}
const yearsAgo = age - 25;

const SITE_CONTENT = {
  images: {
    favicon: "./assets/icon.jpg",
    ogImage: "./assets/miku_hatsune_5_by_makiilu_d4uklnz-fullview.png",
    splashMiku: "./assets/miku_hatsune_5_by_makiilu_d4uklnz-fullview.png",
    heroMiku: "./assets/hatsune_miku_render_by_jimmyisaac_d68ibgy-pre.png",
    shrineMiku: "./assets/hatsune-miku-happy-birthday-xa3kasez005ghjih.webp",
    headerBg: "./assets/pt_top.png",
    // Optional: add extra Miku image URLs (singing/idle sprites) to show in floating Mikus
    extraMikus: [],
    // Miku emoji/icon replacements
    mikuIcons: {
      admiring: "./assets/icons/Admiring.png",
      ahaha: "./assets/icons/ahaha.png",
      cheering: "./assets/icons/cheering.png",
      chuuu: "./assets/icons/chuuu.png",
      innocent: "./assets/icons/innocent.png",
      jumpingMusic: "./assets/icons/jumping with music notes.png",
      jumpingStars: "./assets/icons/jumping with stars.png",
      loveLetter: "./assets/icons/love letter.png",
      love: "./assets/icons/LOVE.png",
      okHands: "./assets/icons/ok hands.png",
      okSign: "./assets/icons/ok sign.png",
      pow: "./assets/icons/pow!.png",
      sad: "./assets/pixel-miku/014 - Rolling Girl Miku.png",
      sparkle: "./assets/pixel-miku/088 - Tell your world.png",
      stage: "./assets/icons/stage.png",
      starUwu: "./assets/icons/star uwu.png",
      thumbsUp: "./assets/icons/Thumbs Up!.png",
      vibing: "./assets/icons/vibing.png",
      wallHide: "./assets/icons/wall hide.png",
    },
    // Optional swallow gif path for the swallow mascot
    swallowGif: "./assets/swallow.gif",
    // Game selector tile covers
    menuCovers: {
      vocab: "./assets/Song-Over.full.2116602.gif",
      kanji: "./assets/win.jpg",
      kotoba: "./assets/miku beam.gif",
    },
    // All badges appear only in the Web Badges sidebar
    statsBadges: [],
    webBadges: [
      // Our own badge first (cropped banner in 88×31)
      {
        src: "./assets/discordServerBanner.png",
        alt: "Baby Belle's Pixel Garden",
        link: "https://babybelle.neocities.org/",
        isOurBadge: true,
        style:
          "width: 88px; height: 31px; object-fit: cover; object-position: center; border-radius: 6px; box-shadow: 0 2px 6px rgba(43,43,68,0.15);",
      },
      // Hosted on Neocities (cute pink variant)
      {
        src: "https://cyber.dabamos.de/88x31/neocities-pink.gif",
        alt: "Hosted on Neocities",
        link: "https://neocities.org/",
      },
      // Cute Neocities creators/sites (on-theme pastels/kawaii)
      {
        src: "https://cementgarden.neocities.org/images/button/cementgarden7.gif",
        alt: "Cement Garden",
        link: "https://cementgarden.neocities.org/",
      },
      {
        src: "https://melokaji.neocities.org/images/melobutton.gif",
        alt: "melokaji",
        link: "https://melokaji.neocities.org/",
      },
      {
        src: "https://cloverbell.neocities.org/buttons/2cherrishbutton.gif",
        alt: "2Cherrish",
        link: "https://2cherrish.neocities.org/",
      },
      {
        src: "https://cloverbell.neocities.org/buttons/cherrylotusbutton.png",
        alt: "CherryLotus",
        link: "https://cherrylotus.neocities.org/",
      },
      {
        src: "https://cabbagesorter.neocities.org/buttons/cabbagesorter.gif",
        alt: "cabbagesorter",
        link: "https://cabbagesorter.neocities.org/",
      },
      {
        src: "https://cloverbell.neocities.org/buttons/vivarism_01.gif",
        alt: "Vivarism",
        link: "https://vivarism.neocities.org/",
      },
      {
        src: "https://cloverbell.neocities.org/buttons/tomboyish.gif",
        alt: "tomboyish",
        link: "https://tomboyish.neocities.org/",
      },
      {
        src: "https://cloverbell.neocities.org/buttons/mn1ca.gif",
        alt: "mn1ca",
        link: "https://mn1ca.neocities.org/",
      },
      {
        src: "https://cloverbell.neocities.org/buttons/amivicky-5.gif",
        alt: "amivicky",
        link: "https://amivicky.neocities.org/",
      },
    ],
  },
  site: {
    title: "Baby Belle's Pixel Garden",
    subtitle: "where sweet dreams come to life ♡ • べべベルのデジタル庭",
    htmlTitle: "Baby Belle - Pixel Miku Garden ✨",
    birthYear: birthYear,
    birthdayMonth: birthdayMonth,
    birthdayDay: birthdayDay,
  },

  splash: {
    title: "Baby Belle's Pixel Garden",
    subtitle: "Initializing kawaii protocols...",
    button: "enter the garden °❀⋆.ೃ࿔*:･",
  },

  nav: [
    { id: "home", label: "Garden", mikuIcon: "innocent" },
    { id: "socials", label: "Links", mikuIcon: "cheering" },
    { id: "study", label: "🎌 日本語", mikuIcon: "thumbsUp" },
    { id: "games", label: "Games", mikuIcon: "vibing" },
    { id: "shrine", label: "Shrine", mikuIcon: "stage" },
    { id: "Wish", label: "Wish", mikuIcon: "pow" },
  ],

  status: {
    onlineLabel: "Online",
    radioOffLabel: "Radio Off",
    radioOnLabel: "Playing",
    nowPlayingPlaceholder: "Enter current mood/song...",
    heartsLabel: "Hearts collected:",
    heartIcon: "love",
    visitorIcon: "cheering",
    // Label used in the Site Stats widget for the visitor counter
    visitorsLabel: "Visitors:",
    statusIcon: "starUwu",
  },

  radio: {
    title: "miku radio",
    titleIcon: "vibing",
    defaultStatus: "Kawaii FM 📻",
    playingStatus: "Now Playing",
    stoppedStatus: "Radio Stopped",
    playButton: "▶️",
    stopButton: "⏸️",
    // Optional: if your radio host exposes JSON metadata for now playing, set it here
    // Example (Radio.co public status): "https://public.radio.co/stations/{station_id}/status"
    // Example (Shoutcast/Icecast): a proxy that returns { title: "Artist - Track" }
    metaUrl: "https://vocaloid.radioca.st/status-json.xsl",
  },

  home: {
    heroTitle: "Welcome to my garden! 🌸",
    heroParagraphs: [
      "Hi there! I'm Baby Belle, but you can call me BB.",
      "Welcome to my cozy corner of the internet where kawaii meets retro vibes.",
      "Come, explore and make yourself at home!",
      "Let's be good friends!",
    ],
    heartButton: "Send Love",
    heartButtonIcon: "love",

    // Unified presentation slides
    presentationTitle: "Getting to Know Baby Belle",
    presentationIcon: "sparkle",
    presentationSlides: [
      {
        title: "Lore",
        titleIcon: "innocent",
        theme: "bio",
        content: [
          "🇫🇮 Finland 🇸🇪 Sweden → Japan 🇯🇵",
          "꒰ঌ Internet angel ໒꒱ • Professional NEET • Super cute! 💖",
          "Baby Belle used to be an e-girl and YouTube content creator with their cat maid persona called Shin.",
          "Baby Belle is of Finnish and Swedish descent but is currently living in Japan.",
          "Baby Belle spends most of her days online as she has no friends irl.",
        ],
        decorativeIcons: ["sparkle", "innocent", "love"],
      },
      {
        title: "Belle's Stats",
        titleIcon: "starUwu",
        theme: "stats",
        content: [
          "Age: Her frontal lobes have stopped growing " +
            yearsAgo +
            " years ago",
          "Height: 169 cm 📏",
          "Birthday: September 22nd 🎂",
          "Jobby: No 💸",
          "Location: Pixel Garden, Japan 🏡",
          "Energy Level: Powered by Monster Energy ⚡",
        ],
        decorativeIcons: ["starUwu", "cheering", "vibing"],
      },
      {
        title: "Belle's Heart",
        titleIcon: "love",
        theme: "feelings",
        content: [
          "I love collecting Hatsune Miku figures, being cute and gaming.",
          "Sometimes I get sad... so if it's all right with you, can you cheer me up too?",
          "I dont want to feel lonely or be bullied.",
          "",
          "Thank you for visiting my garden! 💙",
        ],
        decorativeIcons: ["love", "innocent", "sparkle"],
      },
      {
        title: "Things I Love",
        titleIcon: "love",
        theme: "likes",
        content: [
          "Hatsune Miku 💙 (Obviously!)",
          "Monster energy drink (not sponsored)",
          "Coffee ☕ & Sweets 🍰",
          "Cats 🐱 & Sanrio (Cinnamoroll!)",
          "Japanese fashion 👘",
          "Tomato ketchup 🍝 (Don't judge!)",
        ],
        decorativeIcons: ["love", "cheering", "vibing"],
      },
      {
        title: "Things That Make Me Hide",
        titleIcon: "wallHide",
        theme: "dislikes",
        content: [
          "Loud jump scares 🙀 (I'm fragile!)",
          "Spicy level 🔥🔥🔥 (My tongue dies)",
          "Eating bugs 🐛🚫 (NOPE NOPE NOPE)",
          "Rude behavior ❌ (Be nice to Belle!)",
          "Being ignored 😔 (Notice me!)",
        ],
        decorativeIcons: ["wallHide", "sad", "innocent"],
      },
      {
        title: "My Kawaii Dreams",
        titleIcon: "jumpingStars",
        theme: "dreams",
        content: [
          "Be able to eat spicy food! 🌶️ (Training arc!)",
          "Play a scary game! 👻 (Without crying)",
          "Stream on Twitch! 📺 (Be internet famous!)",
          "Get a gaming PC 🖥️ (Mac struggles)",
          "Try Japanese food/drinks! 🍜 (Living the dream)",
          "Cosplay! 👗 (Miku cosplay when?)",
        ],
        decorativeIcons: ["jumpingStars", "vibing", "stage"],
      },
      {
        title: "Thank You for Visiting! ♡",
        titleIcon: "sparkle",
        theme: "finale",
        content: [
          "You've reached the end of Belle's story!",
          "",
          "✨ Hope you enjoyed getting to know me! ✨",
          "🌸 Remember to send hearts and be kind! 🌸",
          "💙 Let's be the best of friends forever! 💙",
          "",
          "Come back anytime to my pixel garden! 💙",
        ],
        decorativeIcons: ["sparkle", "love", "cheering", "innocent"],
      },
    ],
  },

  socials: {
    title: "Find Me Online",
    titleIcon: "cheering",
    items: [
      {
        label: "Discord",
        url: "https://discord.gg/jB7mbHwK",
        icon: "💬",
        color: "#5865F2",
        mikuIcon: "ahaha",
      },
      {
        label: "YouTube",
        url: "https://www.youtube.com/watch?v=YTinkSv10Qs",
        icon: "📺",
        color: "#ff0000",
        mikuIcon: "stage",
      },
      {
        label: "Twitch",
        url: "https://www.twitch.tv/babybellebb",
        icon: "🎮",
        color: "#9146FF",
        mikuIcon: "vibing",
      },
      {
        label: "Mood",
        url: "https://open.spotify.com/playlist/2iZTdm4HQoGhzKNEsKeOGz",
        icon: "🎶",
        color: "#1db954",
        mikuIcon: "jumpingMusic",
      },
      {
        label: "Spring Shop",
        url: "https://shinun-merch.creator-spring.com/",
        icon: "🛍️",
        color: "#ff6b35",
      },
    ],
  },

  music: {
    title: "Music Corner",
    titleIcon: "jumpingMusic",
    radioName: "Kawaii FM",
    radioIcon: "vibing",
    playlistTitle: "Current Favorites",
    playlistIcon: "love",
    songs: [
      { title: "World is Mine", artist: "Hatsune Miku (ryo)", mood: "✨" },
      { title: "Senbonzakura", artist: "Hatsune Miku (Kurousa-P)", mood: "🌸" },
      { title: "Tell Your World", artist: "Hatsune Miku (kz)", mood: "🌍" },
      { title: "Love is War", artist: "Hatsune Miku (ryo)", mikuMood: "love" },
      { title: "Rolling Girl", artist: "Hatsune Miku (wowaka)", mood: "🌀" },
      { title: "Magical Mirai", artist: "Hatsune Miku", mikuMood: "starUwu" },
    ],
  },

  study: {
    title: "🎤 Miku's Language Dojo ",
    titleIcon: "thumbsUp",
    levelTitle: "Current Level",
    levelIcon: "starUwu",
    levelText: "Beginner - Working on Hiragana & basic vocab!",
    progressPercent: 35,
    wordOfDay: {
      japanese: "",
      romaji: "",
      meaning: "",
      externalIframe: "https://kanjiday.com/kanji/",
    },
    goalsTitle: "Goals",
    goalsIcon: "thumbsUp",
    goals: [
      "Master Hiragana ✅",
      "Learn basic Katakana 📚",
      "100 vocabulary words",
      "Read simple manga 🌟",
    ],
    goalItemIcons: {
      2: "pow", // 100 vocabulary words
    },
    gameData: {
      vocab: [
        { jp: "猫", en: "cat" },
        { jp: "犬", en: "dog" },
        { jp: "水", en: "water" },
        { jp: "火", en: "fire" },
      ],
      kanji: [
        { kanji: "日", meaning: "sun" },
        { kanji: "月", meaning: "moon" },
        { kanji: "山", meaning: "mountain" },
        { kanji: "田", meaning: "rice field" },
      ],
      typing: [
        { jp: "ありがとう", romaji: "arigatou", en: "thank you" },
        { jp: "こんにちは", romaji: "konnichiwa", en: "hello" },
        { jp: "さようなら", romaji: "sayounara", en: "goodbye" },
        { jp: "すし", romaji: "sushi", en: "sushi" },
      ],
    },
  },

  games: {
    title: "✨ Kawaii Mini-Games ✨",
    titleIcon: "vibing",
    memoryTitle: "🧠 Miku Memory Match",
    memoryIcon: "innocent",
    memoryReset: "New Game ♪",
    heartsTitle: "💖 Heart Garden",
    heartsIcon: "love",
    heartsZone: "Tap to grow more hearts! (੭ˊ꒳ˋ)੭",
    heartsZoneIcon: "chuuu",
    heartsReset: "Reset",
    WishTitle: "Miku Collection Wish",
    WishIcon: "starUwu",
    WishOpenDex: "📱 Open MikuDex",
  },

  // Shop UI copy, titles, and item configs
  shop: {
    headerWelcome: "いらっしゃいませ〜！",
    headerSubtitle: "Welcome to my shop! ✨",
    items: {
      shield: {
        title: "Heart Shield",
  description: "Protect your precious Mikus and precious hearts for 25 minutes!",
        cost: 50,
        icon: "⛨",
      },
      decoy: {
        title: "Sweet Treats",
        description: "Distract threats with delicious decoys!",
        cost: 5,
        icon: "🍪",
      },
    },
  },

  shrine: {
    title: "Miku Shrine",
    titleIcon: "stage",
    aboutTitle: "About Hatsune Miku",
    aboutIcon: "admiring",
    aboutText:
      "Miku has been my inspiration for creativity, music, and digital art. This shrine celebrates the magic of vocaloid music and the amazing community around it!",
    favoriteSongsTitle: "Favorite Songs",
    favoriteSongsIcon: "jumpingMusic",
    // Maximum number of favorites to show (configurable)
    favoriteSongsMax: 8,
    // Optional rich data for favorites. If provided, click-to-play uses
    // these entries; otherwise it falls back to the plain strings below.
    // youtubeId is preferred when known; otherwise search is used.
    favoriteSongsData: [
      {
        title: "World is Mine",
        artist: "ryo (supercell)",
        youtubeId: "Ut-vNvGlvLA",
      },
      {
        title: "Senbonzakura",
        artist: "Kurousa-P (WhiteFlame)",
        youtubeId: "shs0rAiwsGQ",
      },
      {
        title: "Tell Your World",
        artist: "kz (livetune)",
        youtubeId: "iu4PL7iRFQM",
      },
      {
        title: "Love is War",
        artist: "ryo (supercell)",
        youtubeId: "SmX5cnQ1YAg",
      },
    ],
    favoriteSongs: [
      "World is Mine - ryo",
      "Senbonzakura - Kurousa-P",
      "Tell Your World - kz(livetune)",
      "Love is War - ryo",
    ],
    galleryTitle: "Miku Gallery",
    galleryIcon: "okHands",
  },

  friends: {
    title: "my friends",
    titleIcon: "ahaha",
    items: [
      { name: "Cinnamoroll Club", url: "#", emoji: "🐶", mikuIcon: "innocent" },
      { name: "Cozy Gaming Pals", url: "#", emoji: "🎮", mikuIcon: "vibing" },
      { name: "Kawaii Creators", url: "#", emoji: "🌸", mikuIcon: "starUwu" },
      { name: "Vocaloid Fans", url: "#", emoji: "🎤", mikuIcon: "stage" },
      { name: "Study Buddies", url: "#", emoji: "📚", mikuIcon: "thumbsUp" },
      { name: "Art Friends", url: "#", emoji: "🎨", mikuIcon: "cheering" },
    ],
  },
  quickLinks: {
    title: "🌟 Quick Links",
    items: [
      {
        label: "💫 Link to us",
        url: "/badge.html",
        cls: "link-badge",
      },
      {
        label: "💬 Discord",
        url: "https://discord.gg/jB7mbHwK",
        cls: "link-discord",
      },
      {
        label: "🎮 Twitch",
        url: "https://www.twitch.tv/babybellebb",
        cls: "link-twitch",
      },
      {
        label: "📺 YouTube",
        url: "https://www.youtube.com/@babyelle-e",
        cls: "link-youtube",
      },
      {
        label: "🎶 Spotify",
        url: "https://open.spotify.com/playlist/2iZTdm4HQoGhzKNEsKeOGz",
        cls: "link-spotify",
      },
      {
        label: "🛍️ Shop",
        url: "https://shinun-merch.creator-spring.com/",
        cls: "link-shop",
      },
    ],
  },

  footer: {
    text: "hand-crafted for you • ✨ this site is always under construction! ✨ • cinnamoroll approved",
  },

  love: {
    toasts: [
      "ありがとう！",
      "大好き〜！(だいすき) 💙",
      "うれしい！✨",
      "かわいいね〜 🎀",
      "キラキラ！🌟",
      "心がぽかぽか〜",
      "ラブ注入！",
      "ぎゅっ！(Hug)",
      "最高！",
      "えらい！",
      "今日もがんばったね！💪",
      "幸せいっぱい〜 🍓",
      "にこにこ☺️",
      "とても素敵！💎",
    ],
    toastIcons: [
      "love", // ありがとう！
      null,
      null,
      null,
      null,
      "chuuu", // 心がぽかぽか〜
      "loveLetter", // ラブ注入！
      "ahaha", // ぎゅっ！(Hug)
      "cheering", // 最高！
      "thumbsUp", // えらい！
      null,
      null,
      null,
      "starUwu", // とても素敵！
    ],
    milestones: [
      { step: 5, msg: "５ハート達成！すごい〜！🌸", icon: "innocent" },
      { step: 10, msg: "１０ハート！ありがと〜！", icon: "cheering" },
      { step: 20, msg: "２０ハート！最強の推し！⭐", icon: "pow" },
      { step: 30, msg: "３０ハート！心から感謝！", icon: "love" },
      { step: 50, msg: "５０ハート！愛が溢れてる〜！", icon: "jumpingStars" },
    ],
    periodicUpdates: [
      "New kawaii energy detected! ✨",
      "Miku companions are vibing! 🎵",
      "Hearts are flowing! 💖",
      "Pastel dreams activated! 🌸",
      "Cozy mode: ON! 🥰",
    ],
  },

  sidebarTitles: {
    left: {
      diva: "🎤 Diva HUD",
      pet: "your new best friend~!",
      petIcon: "innocent",
      friends: "my friends",
      friendsIcon: "ahaha",
      stats: "site stats",
      statsIcon: "okSign",
    },
    right: {
      quickLinks: "quick links",
      quickLinksIcon: "cheering",
      shop: "Shop",
      shopIcon: "okHands",
      badges: "pin badges",
      badgesIcon: "starUwu",
      vibe: "today's vibe",
      vibeIcon: "vibing",
    },
  },

  embeds: {
    petIframeSrc:
      "https://gifypet.neocities.org/pet/pet.html?name=PixieBel&dob=1756939149&gender=f&element=Air&pet=https%3A%2F%2Fi.imgur.com%2FYV9mzxS.gif&map=https://i.imgur.com/cUgWk1C.png&background=https%3A%2F%2Fi.imgur.com%2FDHjfhbo.png&tablecolor=black&textcolor=black",
  },
};

// ========== SPLASH SCREEN SYSTEM ==========
function initializeSplash() {
  const splash = document.getElementById("splash");
  const enterButton = document.getElementById("enterSite");
  const mainSite = document.getElementById("mainSite");

  // Splash copy
  const splashTitle = document.querySelector("#splash .glitch");
  if (splashTitle && SITE_CONTENT.splash?.title) {
    splashTitle.textContent = SITE_CONTENT.splash.title;
    splashTitle.setAttribute("data-text", SITE_CONTENT.splash.title);
  }
  const splashSub = document.querySelector("#splash .typing-text");
  if (splashSub && SITE_CONTENT.splash?.subtitle)
    splashSub.textContent = SITE_CONTENT.splash.subtitle;
  const splashBtn = document.getElementById("enterSite");
  if (splashBtn && SITE_CONTENT.splash?.button)
    splashBtn.textContent = SITE_CONTENT.splash.button;

  const splashImg = document.getElementById("splashMiku");
  if (splashImg)
    splashImg.src =
      SITE_CONTENT.images?.splashMiku ||
      "./assets/miku_hatsune_5_by_makiilu_d4uklnz-fullview.png";

  if (!splash || !enterButton || !mainSite) return;
  if (splash.dataset.wired === "1") return;

  splash.dataset.wired = "1";

  async function gateReady() {
    // Wait for critical data: MIKU images + WOD
    try {
      const waits = [];
      if (
        window.MIKU_IMAGES_READY &&
        typeof window.MIKU_IMAGES_READY.then === "function"
      )
        waits.push(window.MIKU_IMAGES_READY);
      if (window.WOD_READY && typeof window.WOD_READY.then === "function")
        waits.push(window.WOD_READY);
      if (waits.length)
        await Promise.race([
          Promise.all(waits),
          new Promise((r) => setTimeout(r, 4500)),
        ]);
    } catch (_) {}
  }

  const enterSite = async () => {
    enterButton.disabled = true;
    // Show loading state during gating
    const prev = enterButton.textContent;
    enterButton.textContent = "Loading…";
    await gateReady();
    // Apply WOD to UI if available and MikuUI loaded later
    if (window.WOD && window.SITE_CONTENT?.study?.wordOfDay) {
      window.SITE_CONTENT.study.wordOfDay.japanese =
        window.WOD.word || window.SITE_CONTENT.study.wordOfDay.japanese;
      window.SITE_CONTENT.study.wordOfDay.romaji =
        window.WOD.reading || window.SITE_CONTENT.study.wordOfDay.romaji;
      window.SITE_CONTENT.study.wordOfDay.meaning =
        window.WOD.meaning || window.SITE_CONTENT.study.wordOfDay.meaning;
    }
    splash.style.display = "none";
    mainSite.classList.remove("hidden");

    const initFunction = window.initSite || (() => {});
    initFunction();
    // Restore label
    enterButton.textContent = prev;
  };

  enterButton.addEventListener("click", enterSite, { once: true });
  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Enter") enterSite();
    },
    { capture: true },
  );
}

window.SITE_CONTENT = SITE_CONTENT;
initializeSplash();
