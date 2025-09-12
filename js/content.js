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

// Base English content
const EN_CONTENT = {
  seo: {
    title: "Baby Belle - Pixel Miku Garden ✨",
    ogTitle: "Baby Belle - Pastel Miku Garden",
    description:
      "A cozy pastel web home for Baby Belle (BabbyBelle / bb / beebee / belle / shin / shinnun) - links, music, games, study corner, and interactive Miku companions!",
    keywords: [
      "Baby Belle",
      "BabbyBelle",
      "Hatsune Miku",
      "Vocaloid",
      "kawaii",
      "pastel",
      "retro web",
      "games",
      "Japanese study",
      "language dojo",
    ],
    siteName: "Baby Belle's Pixel Garden",
  },
  images: {
    favicon: "./assets/icon.jpg",
    ogImage: "./assets/miku_hatsune_5_by_makiilu_d4uklnz-fullview.png",
    splashMiku: "./assets/miku_hatsune_5_by_makiilu_d4uklnz-fullview.png",
    heroMiku: "./assets/hatsune_miku_render_by_jimmyisaac_d68ibgy-pre.png",
    shrineMiku: "./assets/11293373_65ee2.gif",
    headerBg: "./assets/pt_top.png",
    // Hero wrapper background image (configurable Cinnamoroll/kawaii background)
    heroBackground: "./assets/pt_top.png",
    // Optional: add extra Miku image URLs (singing/idle sprites) to show in floating Mikus
    extraMikus: [],
    // Miku emoji/icon replacements
    mikuIcons: {
      admiring: "./assets/icons/Admiring.png",
      ahaha: "./assets/icons/ahaha.png",
      cheering: "./assets/icons/cheering.png",
      chuuu: "./assets/icons/chuuu.png",
      friendsIcon: "./assets/friendsIcon.png",
      innocent: "./assets/icons/innocent.png",
      jumpingMusic: "./assets/icons/jumping with music notes.png",
      jumpingStars: "./assets/icons/jumping with stars.png",
      loveLetter: "./assets/icons/love letter.png",
      love: "./assets/icons/LOVE.png",
      okHands: "./assets/icons/ok hands.png",
      okSign: "./assets/icons/ok sign.png",
      pow: "./assets/icons/pow!.png",
      sad: "./assets/pixel-miku/014 - Rolling Girl Miku.png",
      sparkle: "./assets/pixel-miku/101 - PixieBel (bonus).gif",
      stage: "./assets/icons/stage.png",
      starUwu: "./assets/icons/star uwu.png",
      thumbsUp: "./assets/icons/Thumbs Up!.png",
      vibing: "./assets/icons/vibing.png",
      wallHide: "./assets/icons/wall hide.png",
      // Unique alias for guestbook header (reuses a cute pixel Miku)
      guestbookSeal: "./assets/pixel-miku/025 - Maneki Miku (Lucky Cat).png",
    },
    // Optional swallow gif path for the swallow mascot
    swallowGif: "./assets/swallow.gif",
    // Game selector tile covers
    menuCovers: {
      vocab: "./assets/Song-Over.full.2116602.gif",
      kanji: "./assets/t3kSvA.gif",
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
        src: "./assets/buttons/nyaabanner.gif",
        alt: "nyaa",
        link: "https://nyaa.neocities.org/",
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
    { id: "home", label: "garden", mikuIcon: "innocent" },
    { id: "socials", label: "links", mikuIcon: "cheering" },
    { id: "study", label: "🎌 日本語", mikuIcon: "thumbsUp" },
    { id: "games", label: "games", mikuIcon: "vibing" },
    { id: "shrine", label: "shrine", mikuIcon: "stage" },
    { id: "Wish", label: "wish", mikuIcon: "pow" },
  ],

  status: {
    onlineLabel: "Now Playing",
    radioOffLabel: "Ready",
    radioOnLabel: "Now Playing",
    nowPlayingPlaceholder: "Enter current mood/song...",
    heartsLabel: "hearts blesssed",
    heartIcon: "love",
    visitorIcon: "cheering",
    // Label used in the Site Stats widget for the visitor counter
    visitorsLabel: "friends:",
    // Optional: image-based visitor badge template for strict CSP hosts
    // {site} will be replaced with your Neocities site name
    visitorBadgeTemplate:
      "https://visitor-badge.laobi.icu/badge?page_id={site}.neocities.org&left_text=friends:",
    statusIcon: "starUwu",
  },

  radio: {
    title: "miku radio",
    titleIcon: "vibing",
    defaultStatus: "Online",
    playingStatus: "Now Playing",
    stoppedStatus: "Radio Stopped",
    playButton: "▶️",
    stopButton: "⏸️",
    streamError: "⚠️ Stream error",
    // Optional: if your radio host exposes JSON metadata for now playing, set it here
    // Example (Radio.co public status): "https://public.radio.co/stations/{station_id}/status"
    // Example (Shoutcast/Icecast): a proxy that returns { title: "Artist - Track" }
    metaUrl: "https://vocaloid.radioca.st/status-json.xsl",
    metaProxy: "https://api.allorigins.win/raw?url={url}",
  },

  // External CSP proxy configuration (for Neocities free accounts)
  // This page is hosted on GitHub Pages (see .gitlab-ci.yml) and used via a hidden iframe
  // to fetch cross-origin data, then postMessage back.
  proxy: {
    // If you fork/rename, update this to your GH Pages URL
    pageUrl: "https://HRussellZFAC023.github.io/shinday/proxy/proxy.html",
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

    // Guestbook header localization
    guestbookTitle: "BBG ! babybelle's guestbook ˚ʚ♡ɞ˚",
    guestbookIcon: "Admiring",

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
        label: "O Kaimono O Kaimono",
        url: "https://shinun-merch.creator-spring.com/",
        icon: "🛍️",
        color: "#ff6b35",
        mikuIcon: "okHands",
      },
    ],
  },

  music: {
    title: "Music Corner",
    titleIcon: "jumpingMusic",
    radioName: "",
    radioIcon: "vibing",
    ui: {
      jukeboxReady: "Ready",
      songSelect: "Song Select",
      clickToPlay: "Click a song to play",
      sendLove: "send love",
    },
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
    // Dojo i18n strings
    dojo: {
      titleEn: "Language Dojo",
      titleDiva: "PROJECT DIVA",
      hud: { lv: "LV", voltage: "VOLTAGE", combo: "COMBO", score: "SCORE", ready: "READY" },
      difficulties: [
        "Casual","Easy","Normal","Hard","Extreme","Master","Ultra","Chaos","Impossible"
      ],
      modes: {
        vocab: { name: "Vocab Pop", desc: "JP → EN Multiple Choice" },
        kanji: { name: "Kanji Master", desc: "Meaning ↔ Kanji by Grade" },
        typing: { name: "Miku × Chat Typing", desc: "Keyboard Romaji Typing" },
      },
      dirJPEN: "JP → EN",
      dirENJP: "EN → JP",
      dirMeaningKanji: "Meaning → Kanji",
      dirKanjiMeaning: "Kanji → Meaning",
      multipleChoice: "Multiple Choice",
      byGrade: "by Grade",
      typingLabel: "Hiragana & Katakana Typing",
      wod: { title: "今日の言葉 Word of the Day", loading: "Loading...", next: "Next Word", error: "Could not load word" },
      ui: {
        controls: { difficulty: "Difficulty" },
        tiles: { vocab: "Vocab", kanji: "Kanji", kotoba: "Kotoba", chat: "Miku × Chat" },
        score: "Score",
        streak: "Streak",
        bestStreak: "Best Streak",
        pb: "PB",
        secondsSuffix: "s",
        start: "Start",
        send: "Send",
        typeMessage: "Type a message",
        songOver: { title: "Song Over", rank: "Rank", score: "Score", close: "Close" },
      },
    },
    reward: { label: "REWARD", bonus: "Base + Level Bonus", continue: "Continue" },
    hudRight: { levelLabel: "Level:", livesLabel: "Lives:", difficultyLabel: "Difficulty:" },
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
    WishTitle: "close your eyes and make a wish~",
    WishIcon: "starUwu",
    WishOpenDex: "📱 Open MikuDex",
    WishTokensLabel: "Tickets:",
    WishPull1: "Pull ×1",
    WishPull10: "Pull ×10",
    WishDaily: "Daily Ticket",
    WishConvert: "100💖 → +1",
    externalRpg: "🕹️ Miku RPG (opens in new window)",
    externalJetpack: "🕹️ Miku Jetpack (opens in new window)",
  },

  // Shop UI copy, titles, and item configs
  shop: {
    headerWelcome: "いらっしゃいませ〜！",
    headerSubtitle: "Welcome to my shop! ✨",
    items: {
      shield: {
        title: "Heart Shield",
        description: "Protect your precious Mikus and  hearts for 25 minutes!",
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
    messages: {
      decoyAdded: "Sweet decoy added! 🍪✨",
      notEnoughHearts: "Not enough hearts! 💔",
      waitCurrentItem: "Wait for current item to finish! 🥤",
      shieldOn: "Heart Shield activated! ⛨✨",
      potionActive: "Potion already active!",
      xpPotionOn: "XP Potion activated! ✨",
      needMoreForEgg: "Need more hearts for the egg!",
      hatching: "Oh, it's hatching!?",
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

  mediaCredits: {
    title: "ⓘ Media Credits",
    description: "Our shrine uses fan-made assets and borrowed media. All rights remain with the original creators:",
    credits: [
      {
        category: "Hatsune Miku",
        attribution: "© Crypton Future Media"
      },
      {
        category: "Pixel Art",
        attribution: "illufinch",
        link: "https://illufinch.tumblr.com/post/667463046903545856/100-mikus-patreon-twitter",
        linkText: "100 Mikus"
      },
      {
        category: "Webmeji Sprites",
        attribution: "",
        link: "https://neocities.org/site/webmeji",
        linkText: "webmeji on Neocities"
      },
      {
        category: "Sound Effects",
        attribution: "onlinesaipa"
      },
      {
        category: "Additional Images",
        attribution: "Maki_Ilu and JimmyIsaac"
      }
    ],
    disclaimer: "These assets are used here for tribute purposes only."
  },

  mikuSearch: {
    title: "🔍 Miku Search",
    description: "Explore Miku art and collections",
    iframeSrc: "https://www.mikucollection.com/en/art-gallery",
    iframeTitle: "Miku Collection Art Gallery"
  },

  vocaloidDb: {
    title: "🎼 VocaloidDB",
    iframeSrc: "https://vocadb.net/",
    iframeTitle: "Vocaloid Database"
  },

  friends: {
    title: "my friends",
    titleIcon: "friendsIcon",
    items: [
      {
        name: "hachi",
        url: "https://x.com/hachimyun",
        emoji: "🌊",
        mikuIcon: "innocent",
        theme: "ocean",
        image: "hachi.jpg",
      },
      {
        name: "pia",
        url: "https://linktr.ee/vae1eri",
        emoji: "💻",
        mikuIcon: "vibing",
        theme: "lain",
        image: "pia.webp",
      },
      {
        name: "hero",
        url: "https://linktr.ee/heroslayer",
        emoji: "🎭",
        mikuIcon: "stage",
        theme: "persona",
        image: "hero.jpg",
      },
    ],
  },
  quickLinks: {
    title: "🌟 quick links",
    items: [
      {
        label: "💫 link to us",
        url: "/badge.html",
        cls: "link-badge",
      },
      {
        label: "💬 discord",
        url: "https://discord.gg/jB7mbHwK",
        cls: "link-discord",
      },
      {
        label: "🎮 twitch",
        url: "https://www.twitch.tv/babybellebb",
        cls: "link-twitch",
      },
      {
        label: "📺 youtube",
        url: "https://www.youtube.com/@babyelle-e",
        cls: "link-youtube",
      },
      {
        label: "🎶 spotify",
        url: "https://open.spotify.com/playlist/2iZTdm4HQoGhzKNEsKeOGz",
        cls: "link-spotify",
      },
      {
        label: "🛍️ shop",
        url: "https://shinun-merch.creator-spring.com/",
        cls: "link-shop",
      },
    ],
  },

  footer: {
    // Three-part footer lines; rendered as responsive spans
    lines: [
      "I picked these pixels just for you! ✨",
      "If you were a pixel, I'd download you every day!",
      "✨  Dont step on the WIFI! a Miku is growing there...",
    ],
    // Fallback single text (kept for backward compatibility)
    text:
      "I picked these pixels just for you! ✨ • If you were a pixel, I'd download you every day! • ✨  Dont step on the WIFI! a Miku is growing there... ",
  },
  madeBy: {
    text: "Made with ♥ by Hero & Shin",
  },
  badge: {
    title: "🔖 Link to us <span class=\"kawaii-decoration\">✨</span>",
    back: "Back to Garden",
    copy: "Copy Code",
    copied: "Copied! ✨",
    pageTitle: "Link to us • Baby Belle's Pixel Garden ✨",
    description: "Grab a kawaii badge to link to Baby Belle's garden! Copy-paste HTML, Markdown, or BBCode snippets.",
  },
  ui: {
    labels: {
      miku: "Miku:",
    },
  },
  tooltips: {
    guestbook: "Guestbook",
    puzzle: "Miku puzzle",
    shrineGallery: "Miku Collection Art Gallery",
    shopShield: "Ward hearts briefly",
    shopDecoy: "Distract the swallower",
    wodNext: "Next word",
  },

  alerts: {
    welcome: "Welcome to Baby Belle's Pixel Garden! ✨",
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
      friendsIcon: "friendsIcon",
      stats: "site stats",
      statsIcon: "okSign",
    },
    right: {
      quickLinks: "quick links",
      quickLinksIcon: "cheering",
      quests: "daily quests",
      questsIcon: "jumpingStars",
      shop: "shop",
      shopIcon: "okHands",
      badges: "pin badges",
      badgesIcon: "starUwu",
      vibeIcon: "vibing",
    },
  },

  // Daily quests content (used by js/modules/quests.js)
  quests: {
    items: [
      { id: "play-song", text: "Play any song in the Jukebox", amount: 1, reward: { xp: 20, hearts: 10 } },
      { id: "cool-judges", text: "Hit 10 COOL judgments", amount: 10, reward: { xp: 30, hearts: 15 } },
      { id: "answers-right", text: "Answer 15 study prompts", amount: 15, reward: { xp: 50, hearts: 20 } },
    ],
    strings: {
      completed: "✓ Completed",
    },
  },

  embeds: {
    petIframeSrc:
      "https://gifypet.neocities.org/pet/pet.html?name=PixieBel&dob=1756939149&gender=f&element=Air&pet=https%3A%2F%2Fi.imgur.com%2FYV9mzxS.gif&map=https://i.imgur.com/cUgWk1C.png&background=https%3A%2F%2Fi.imgur.com%2FDHjfhbo.png&tablecolor=black&textcolor=black",
  },
  
  // MikuDex UI strings
  dex: {
    header: "MikuDex • Owned: {owned} / {total}",
    scopeLabel: "Scope",
    scopes: { all: "All", owned: "Owned", missing: "Missing" },
    rarityLabel: "Rarity",
    rarityAll: "All",
    searchLabel: "Search",
    searchPlaceholder: "name...",
    loading: "Loading...",
    navPrev: "Previous",
    navNext: "Next",
    rarityText: "Rarity:",
    ownedTextOwned: "Owned: x{n}",
    ownedTextLocked: "Owned: •",
    unlocksLabel: "Unlocks:",
    unlocksMusic: "Music track in Jukebox",
    btnSetSinger: "Set as Singer",
    btnWinInWish: "Win in Wish",
    btnClose: "Close",
    hiddenToast: "This legendary companion remains hidden... 🔒✨",
    videoUnavailable: "Video unavailable",
    watchOnYouTube: "Watch on YouTube",
  },
};

// Lightweight translations. Missing keys fall back to English.
const LOCALES = {
  en: EN_CONTENT,
  ja: {
    seo: {
      title: "ベイビーベル - ピクセルみくガーデン ✨",
      ogTitle: "ベイビーベル - ピクセルみくガーデン",
      description:
        "ベイビーベル（BabbyBelle / bb / beebee / belle / shin / shinnun）のための、やさしいパステルのウェブホーム。リンク、音楽、ゲーム、日本語学習コーナー、インタラクティブなミクの仲間たち！",
      keywords: [
        "ベイビーベル",
        "初音ミク",
        "ボーカロイド",
        "かわいい",
        "パステル",
        "レトロ",
        "ゲーム",
        "日本語 勉強",
        "言語道場",
      ],
      siteName: "ベイビーベルのピクセルガーデン",
    },
    site: {
      title: "ベイビーベルのピクセルガーデン",
      subtitle: "やさしい夢が咲くところ ♡",
      htmlTitle: "ベイビーベル - ピクセルみくガーデン ✨",
    },
    splash: {
      title: "ベイビーベルのピクセルガーデン",
      subtitle: "かわいいプロトコル初期化中…",
      button: "お庭に入る °❀⋆.ೃ࿔*:･",
    },
    nav: [
      { id: "home", label: "ガーデン" },
      { id: "socials", label: "リンク" },
      { id: "study", label: "🎌 日本語" },
      { id: "games", label: "ゲーム" },
      { id: "shrine", label: "神社" },
      { id: "Wish", label: "ガチャ" },
    ],
    status: {
      onlineLabel: "再生中",
      radioOffLabel: "準備OK",
      radioOnLabel: "再生中",
      nowPlayingPlaceholder: "今の気分 / 曲…",
      heartsLabel: "祝福ハート",
      visitorsLabel: "おともだち:",
    },
    radio: {
      title: "みくラジオ",
      defaultStatus: "オンライン",
      playingStatus: "再生中",
      stoppedStatus: "停止中",
      playButton: "▶️",
      stopButton: "⏸️",
      streamError: "⚠️ ストリームエラー",
    },
    home: {
      heroTitle: "わたしのガーデンへようこそ！🌸",
      heroParagraphs: [
        "こんにちは！ベイビーベルです。BBって呼んでね。",
        "ここはレトロとかわいいが出会う、わたしの小さなインターネット。",
        "ゆっくり見ていってね。おうちみたいにくつろいで！",
        "なかよくしてくれたらうれしいな！",
      ],
      heartButton: "ラブを送る",
      // Presentation (JP parity with EN)
      presentationTitle: "ベイビーベルのこと",
      presentationIcon: "sparkle",
      presentationSlides: [
        {
          title: "プロフィール",
          titleIcon: "innocent",
          theme: "bio",
          content: [
            "🇫🇮 フィンランド 🇸🇪 スウェーデン → 🇯🇵 日本",
            "インターネット天使 • プロNEET • とてもかわいい！💖",
            "かつてe-girlとして活動し、猫メイドのペルソナ『シン』でYouTubeコンテンツも作っていました。",
            "フィンランドとスウェーデンにルーツがあり、今は日本に住んでいます。",
            "現実では友だちがいないので、ほとんどの時間をオンラインで過ごしています。",
          ],
          decorativeIcons: ["sparkle", "innocent", "love"],
        },
        {
          title: "ステータス",
          titleIcon: "starUwu",
          theme: "stats",
          content: [
            `年齢: 前頭葉の成長は${yearsAgo}年前に停止`,
            "身長: 169cm 📏",
            "誕生日: 9月22日 🎂",
            "お仕事: なし 💸",
            "場所: ピクセルガーデン（日本） 🏡",
            "エナジーレベル: モンスターエナジーで稼働中 ⚡",
          ],
          decorativeIcons: ["starUwu", "cheering", "vibing"],
        },
        {
          title: "ベルのこころ",
          titleIcon: "love",
          theme: "feelings",
          content: [
            "初音ミクのフィギュア集め、かわいくいること、そしてゲームが大好きです。",
            "ときどきさみしくなるから…よかったら応援してね？",
            "いじめや無視はイヤだよ。優しくしてね。",
            "",
            "見に来てくれてありがとう！💙",
          ],
          decorativeIcons: ["love", "innocent", "sparkle"],
        },
        {
          title: "好きなもの",
          titleIcon: "love",
          theme: "likes",
          content: [
            "初音ミク 💙（もちろん！）",
            "モンスターエナジー（提供ではありません）",
            "コーヒー☕＆スイーツ🍰",
            "ネコ🐱＆サンリオ（シナモロール！）",
            "日本のファッション 👘",
            "トマトケチャップ 🍝（引かないでね！）",
          ],
          decorativeIcons: ["love", "cheering", "vibing"],
        },
        {
          title: "苦手なもの",
          titleIcon: "wallHide",
          theme: "dislikes",
          content: [
            "大きなびっくり 🙀（ナイーブなの…）",
            "激辛レベル 🔥🔥🔥（舌が死んじゃう）",
            "虫を食べること 🐛🚫（ムリムリムリ）",
            "失礼な態度 ❌（ベルにはやさしくしてね！）",
            "無視されること 😔（ちゃんと見てほしいの）",
          ],
          decorativeIcons: ["wallHide", "sad", "innocent"],
        },
        {
          title: "かわいい夢",
          titleIcon: "jumpingStars",
          theme: "dreams",
          content: [
            "辛い物を食べられるようになる！🌶️（修行中！）",
            "怖いゲームを泣かずに遊ぶ！👻",
            "Twitchで配信する！📺（インフルエンサーになる！）",
            "ゲーミングPCを手に入れる！🖥️（Macはちょっとつらい）",
            "日本の食べ物・飲み物をたくさん試す！🍜（夢を生きる）",
            "コスプレ！👗（ミクのコスプレはいつ？）",
          ],
          decorativeIcons: ["jumpingStars", "vibing", "stage"],
        },
        {
          title: "ありがとう！♡",
          titleIcon: "sparkle",
          theme: "finale",
          content: [
            "ベルのお話はこれでおしまい！",
            "",
            "✨ 楽しんでもらえたらうれしいな！ ✨",
            "🌸 ハートを送って、やさしくしてね！ 🌸",
            "💙 ずっとずっと、なかよしでいようね！ 💙",
            "",
            "またいつでも、わたしのピクセルガーデンに遊びに来てね！ 💙",
          ],
          decorativeIcons: ["sparkle", "love", "cheering", "innocent"],
        },
      ],
    },
    music: {
      ui: { jukeboxReady: "準備完了", songSelect: "曲をえらぶ", clickToPlay: "曲をクリックして再生", sendLove: "ラブを送る" },
    },
    socials: { title: "オンラインのわたし" },
    games: {
      title: "ミニゲーム",
      memoryTitle: "メモリー",
      memoryReset: "リセット",
      heartsTitle: "ハートガーデン",
      heartsReset: "リセット",
      WishTitle: "ウィッシュ",
      WishOpenDex: "ミク図鑑を開く",
      WishCloseDex: "ミク図鑑を閉じる",
      WishTokensLabel: "チケット:",
      WishPull1: "引く ×1",
      WishPull10: "引く ×10",
      WishDaily: "デイリーチケット",
      WishConvert: "100💖 → +1",
      externalRpg: "🕹️ ミクRPG（新しいウィンドウ）",
      externalJetpack: "🕹️ ミク・ジェットパック（新しいウィンドウ）",
    },
    shrine: {
      title: "ミク神社",
      aboutTitle: "初音ミクについて",
      aboutText:
        "ミクは創造性、音楽、そしてデジタルアートにおいて私のインスピレーションです。この神社はボーカロイド音楽の魔法と、それを支える素晴らしいコミュニティを称えています！",
      favoriteSongsTitle: "お気に入りの曲",
      galleryTitle: "ミクギャラリー",
    },
    mediaCredits: {
      title: "ⓘ メディアクレジット",
      description: "この神社ではファンメイドのアセットやお借りしたメディアを使用しています。権利はすべて原作者に帰属します。",
      credits: [
        { category: "初音ミク", attribution: "© Crypton Future Media" },
        { category: "ピクセルアート", attribution: "illufinch", link: "https://illufinch.tumblr.com/post/667463046903545856/100-mikus-patreon-twitter", linkText: "100 Mikus" },
        { category: "Webmeji スプライト", attribution: "", link: "https://neocities.org/site/webmeji", linkText: "webmeji on Neocities" },
        { category: "効果音", attribution: "onlinesaipa" },
        { category: "追加画像", attribution: "Maki_Ilu / JimmyIsaac" }
      ],
      disclaimer: "これらのアセットはトリビュート目的のみで使用しています。"
    },
    footer: {
      lines: [
        "このピクセルはあなたのために摘みました ✨",
        "もしあなたがピクセルなら毎日ダウンロードするよ！",
        "✨ Wi‑Fiの上は歩かないでね！ミクが育ってるよ…",
      ],
      text: "このピクセルはあなたのために摘みました ✨ • もしあなたがピクセルなら毎日ダウンロードするよ！ • ✨ Wi‑Fiの上は歩かないでね！ミクが育ってるよ…",
    },
    shop: {
      messages: {
        decoyAdded: "おとりお菓子を置いたよ！🍪✨",
        notEnoughHearts: "ハートが足りないよ！💔",
        waitCurrentItem: "今のアイテムが終わるまで待ってね！🥤",
        shieldOn: "ハートシールド発動！⛨✨",
        potionActive: "ポーションはもう有効だよ！",
        xpPotionOn: "XPポーション発動！✨",
        needMoreForEgg: "タマゴにはもっとハートが必要！",
      },
    },
    quests: {
      items: [
        { id: "play-song", text: "ジュークボックスで曲を1回再生", amount: 1, reward: { xp: 20, hearts: 10 } },
        { id: "cool-judges", text: "COOL判定を10回出す", amount: 10, reward: { xp: 30, hearts: 15 } },
        { id: "answers-right", text: "学習の問題に15回正解", amount: 15, reward: { xp: 50, hearts: 20 } },
      ],
      strings: { completed: "✓ 完了" },
    },
    sidebarTitles: {
      left: { diva: "🎤 ディーバHUD", pet: "あなたの新しい親友~!", friends: "ともだち", stats: "サイト統計" },
      right: { quickLinks: "クイックリンク", quests: "デイリークエスト", shop: "ショップ", badges: "バッジ" },
    },
    study: {
      dojo: {
        titleEn: "ランゲージ道場",
        titleDiva: "プロジェクト・ディーヴァ",
        hud: { lv: "LV", voltage: "VOLTAGE", combo: "COMBO", score: "SCORE", ready: "READY" },
        difficulties: [
          "カジュアル","イージー","ノーマル","ハード","エクストリーム","マスター","ウルトラ","カオス","インポッシブル"
        ],
        modes: {
          vocab: { name: "語彙ポップ", desc: "日 → 英 多肢選択" },
          kanji: { name: "漢字マスター", desc: "意味 ↔ 学年別の漢字" },
          typing: { name: "ミク×チャット タイピング", desc: "ローマ字キーボード入力" },
        },
        dirJPEN: "日 → 英",
        dirENJP: "英 → 日",
        dirMeaningKanji: "意味 → 漢字",
        dirKanjiMeaning: "漢字 → 意味",
        multipleChoice: "多肢選択",
        byGrade: "学年別",
        typingLabel: "ひらがな・カタカナ タイピング",
        wod: { title: "今日の言葉", loading: "読み込み中…", next: "次の言葉", error: "読み込みに失敗しました" },
      },
      hudRight: { levelLabel: "レベル:", livesLabel: "ライフ:", difficultyLabel: "難易度:" },
    },
    alerts: { welcome: "ベイビーベルのピクセルガーデンへようこそ！✨" },
    madeBy: { text: "ヒーローとシンの愛で作りました" },
    ui: { labels: { miku: "ミク:" } },
    badge: {
      title: "🔖 リンクしてね <span class=\"kawaii-decoration\">✨</span>",
      back: "お庭へ戻る",
      copy: "コードをコピー",
      copied: "コピーしたよ！✨",
    },
    badgePage: { title: "リンクしてね • ベイビーベルのピクセルガーデン ✨", description: "BBのお庭にリンクするための可愛いバッジ。HTML/Markdown/BBCodeコードをコピーして使ってね！" },
    reward: { label: "報酬", bonus: "基本 + レベルボーナス", continue: "つづける" },
    study: {
      dojo: {
        ui: {
          controls: { difficulty: "難易度" },
          tiles: { vocab: "語彙", kanji: "漢字", kotoba: "ことば", chat: "ミク×チャット" },
          score: "スコア",
          streak: "コンボ",
          bestStreak: "ベストコンボ",
          pb: "ベスト",
          secondsSuffix: "秒",
          start: "スタート",
          send: "送信",
          typeMessage: "メッセージを入力",
          songOver: { title: "結果", rank: "ランク", score: "スコア", close: "閉じる" },
        },
      },
    },
    tooltips: {
      guestbook: "ゲストブック",
      puzzle: "ミクのパズル",
      shrineGallery: "ミク コレクション・アートギャラリー",
      shopShield: "ハートをしばらく守る",
      shopDecoy: "ツバメをお菓子で引き付ける",
      wodNext: "次のことば",
    },
    dex: { header: "ミク図鑑 • 所持: {owned} / {total}", scopeLabel: "範囲", scopes: { all: "すべて", owned: "所持", missing: "未所持" }, rarityLabel: "レア度", rarityAll: "すべて", searchLabel: "検索", searchPlaceholder: "名前...", loading: "読み込み中...", navPrev: "前へ", navNext: "次へ", rarityText: "レア度:", ownedTextOwned: "所持: x{n}", ownedTextLocked: "所持: •", unlocksLabel: "解放:", unlocksMusic: "ジュークボックスの楽曲", btnSetSinger: "シンガーに設定", btnWinInWish: "ウィッシュで入手", btnClose: "閉じる", hiddenToast: "この伝説の仲間はまだ秘密... 🔒✨", videoUnavailable: "動画を再生できません", watchOnYouTube: "YouTubeで見る" },
  },
  es: {
    seo: {
      title: "Baby Belle - Jardín Miku Pastel ✨",
      ogTitle: "Baby Belle - Jardín Miku Pastel",
      description:
        "Un acogedor hogar web pastel para Baby Belle (BabbyBelle / bb / beebee / belle / shin / shinnun) — enlaces, música, juegos, rincón de estudio y compañeras interactivas de Miku.",
      keywords: [
        "Baby Belle",
        "Hatsune Miku",
        "Vocaloid",
        "kawaii",
        "pastel",
        "retro",
        "juegos",
        "aprender japonés",
        "dojo de idioma",
      ],
      siteName: "Jardín Pixel de Belle",
    },
    site: { title: "Jardín Pixel de Belle", subtitle: "donde nacen dulces sueños ♡" },
    splash: { title: "Jardín Pixel de Belle", subtitle: "Inicializando kawaii…", button: "entrar al jardín" },
    status: { onlineLabel: "Reproduciendo", radioOffLabel: "Listo", radioOnLabel: "Reproduciendo", heartsLabel: "corazones bendecidos", visitorsLabel: "amigos:" },
    radio: { title: "radio miku", defaultStatus: "En línea", playingStatus: "Reproduciendo", stoppedStatus: "Radio detenida", playButton: "▶️", stopButton: "⏸️", streamError: "⚠️ Error de stream" },
    music: { ui: { jukeboxReady: "Listo", songSelect: "Seleccionar canción", clickToPlay: "Haz clic en una canción para reproducir", sendLove: "enviar amor" } },
    nav: [
      { id: "home", label: "jardín" },
      { id: "socials", label: "enlaces" },
      { id: "study", label: "🎌 日本語" },
      { id: "games", label: "juegos" },
      { id: "shrine", label: "santuario" },
      { id: "Wish", label: "deseo" },
    ],
    home: { 
      heroTitle: "¡Bienvenido a mi jardín! 🌸",
      heroParagraphs: [
        "¡Hola! Soy Baby Belle, pero puedes decirme BB.",
        "Bienvenido a mi rincón acogedor de internet donde lo kawaii se junta con lo retro.",
        "Explora, ponte cómodo y siéntete en casa.",
        "¡Seamos buenos amigos!",
      ],
      heartButton: "Enviar amor",
      presentationTitle: "Conociendo a Baby Belle",
      presentationSlides: [
        { title: "Historia", theme: "bio", content: [
          "🇫🇮 Finlandia 🇸🇪 Suecia → Japón 🇯🇵",
          "Ángel de internet • NEET profesional • ¡Súper kawaii! 💖",
          "Ahora viviendo en Japón y siempre online.",
        ]},
        { title: "Estadísticas", theme: "stats", content: [
          `Edad: los lóbulos frontales dejaron de crecer hace ${yearsAgo} años`,
          "Altura: 169 cm 📏",
          "Cumpleaños: 22 de septiembre 🎂",
          "Lugar: Jardín Pixel 🏡",
        ]},
        { title: "Me gusta", theme: "likes", content: [
          "Hatsune Miku 💙",
          "Monster Energy",
          "Café y dulces ☕🍰",
          "Gatos y Sanrio 🐱",
        ]},
        { title: "El corazón de Belle", theme: "feelings", content: [
          "Me encanta coleccionar figuras de Miku, ser kawaii y jugar.",
          "A veces me pongo triste… ¿me animas un poquito?",
          "No quiero sentirme sola ni ser molestada.",
          "Gracias por visitar mi jardín 💙",
        ]},
        { title: "Cosas que me hacen esconderme", theme: "dislikes", content: [
          "Sustos fuertes 🙀",
          "Nivel de picante 🔥🔥🔥",
          "Comer bichos 🐛🚫",
          "La mala educación ❌",
          "Que me ignoren 😔",
        ]},
        { title: "Sueños", theme: "dreams", content: [
          "¡Aguantar el picante! 🌶️",
          "Jugar juegos de miedo sin llorar 👻",
          "Transmitir en Twitch 📺",
        ]},
        { title: "¡Gracias por tu visita! ♡", theme: "finale", content: [
          "¡Llegaste al final de mi historia!",
          "✨ ¡Espero que te haya gustado! ✨",
          "🌸 ¡Manda corazones y sé amable! 🌸",
          "💙 ¡Vuelve pronto al jardín! 💙",
        ]},
      ],
    },
    socials: { title: "Mis redes" },
    shrine: {
      title: "Santuario de Miku",
      aboutTitle: "Sobre Hatsune Miku",
      aboutText:
        "Miku ha sido mi inspiración para la creatividad, la música y el arte digital. ¡Este santuario celebra la magia de la música vocaloid y la increíble comunidad que la rodea!",
      favoriteSongsTitle: "Canciones favoritas",
      galleryTitle: "Galería de Miku",
    },
    mediaCredits: {
      title: "ⓘ Créditos de medios",
      description: "En este santuario usamos recursos de fans y medios prestados. Todos los derechos pertenecen a sus creadores originales:",
      credits: [
        { category: "Hatsune Miku", attribution: "© Crypton Future Media" },
        { category: "Pixel art", attribution: "illufinch", link: "https://illufinch.tumblr.com/post/667463046903545856/100-mikus-patreon-twitter", linkText: "100 Mikus" },
        { category: "Sprites Webmeji", attribution: "", link: "https://neocities.org/site/webmeji", linkText: "webmeji en Neocities" },
        { category: "Efectos de sonido", attribution: "onlinesaipa" },
        { category: "Imágenes adicionales", attribution: "Maki_Ilu y JimmyIsaac" }
      ],
      disclaimer: "Estos recursos se usan aquí solo con fines de tributo."
    },
    sidebarTitles: {
      left: { diva: "🎤 HUD Diva", pet: "tu nuevo mejor amigo~!", friends: "mis amigos", stats: "estadísticas del sitio" },
      right: { quickLinks: "enlaces rápidos", quests: "misiones diarias", shop: "tienda", badges: "insignias web" },
    },
    games: {
      title: "mini‑juegos kawaii",
      memoryTitle: "Memoria de Miku",
      memoryReset: "Nuevo juego",
      heartsTitle: "Jardín de Corazones",
      heartsReset: "Reiniciar",
      heartsZone: "¡Toca para hacer crecer más corazones!",
      WishTitle: "cierra los ojos y pide un deseo~",
      WishOpenDex: "Abrir MikuDex",
      WishCloseDex: "Cerrar MikuDex",
      WishTokensLabel: "Boletos:",
      WishPull1: "Tirar ×1",
      WishPull10: "Tirar ×10",
      WishDaily: "Boleto diario",
      WishConvert: "100💖 → +1",
      externalRpg: "🕹️ Miku RPG (abre en ventana nueva)",
      externalJetpack: "🕹️ Miku Jetpack (abre en ventana nueva)",
    },
    study: {
      dojo: {
        titleEn: "Dojo de Idiomas",
        titleDiva: "PROJECT DIVA",
        hud: { lv: "LV", voltage: "VOLTAJE", combo: "COMBO", score: "PUNTOS", ready: "PREPARADO" },
        difficulties: [
          "Casual","Fácil","Normal","Difícil","Extremo","Maestro","Ultra","Caos","Imposible"
        ],
        modes: {
          vocab: { name: "Vocabulario Pop", desc: "JP → ES Opción múltiple" },
          kanji: { name: "Maestro de Kanji", desc: "Significado ↔ Kanji por grado" },
          typing: { name: "Miku × Chat Mecanografía", desc: "Teclado Romaji" },
        },
        dirJPEN: "JP → ES",
        dirENJP: "ES → JP",
        dirMeaningKanji: "Significado → Kanji",
        dirKanjiMeaning: "Kanji → Significado",
        multipleChoice: "Opción múltiple",
        byGrade: "por grado",
        typingLabel: "Escritura Hiragana & Katakana",
        wod: { title: "Palabra del día", loading: "Cargando...", next: "Siguiente palabra", error: "No se pudo cargar" },
      },
      hudRight: { levelLabel: "Nivel:", livesLabel: "Vidas:", difficultyLabel: "Dificultad:" },
    },
    footer: {
      lines: [
        "¡Corté estos píxeles solo para ti! ✨",
        "Si fueras un píxel, te descargaría cada día",
        "✨ ¡No pises el Wi‑Fi! Una Miku está creciendo…",
      ],
      text: "¡Corté estos píxeles solo para ti! ✨ • Si fueras un píxel, te descargaría cada día • ✨ ¡No pises el Wi‑Fi! Una Miku está creciendo…",
    },
    shop: { messages: { decoyAdded: "¡Cebo dulce añadido! 🍪✨", notEnoughHearts: "¡No hay suficientes corazones! 💔", waitCurrentItem: "¡Espera a que termine! 🥤", shieldOn: "¡Escudo de corazón activado! ⛨✨", potionActive: "¡Poción ya activa!", xpPotionOn: "¡Poción XP activada! ✨", needMoreForEgg: "¡Necesitas más corazones para el huevo!" } },
    alerts: { welcome: "¡Bienvenido al Jardín Pixel de Belle! ✨" },
    quests: {
      items: [
        { id: "play-song", text: "Reproduce una canción en el Jukebox", amount: 1, reward: { xp: 20, hearts: 10 } },
        { id: "cool-judges", text: "Consigue 10 juicios COOL", amount: 10, reward: { xp: 30, hearts: 15 } },
        { id: "answers-right", text: "Responde 15 retos de estudio", amount: 15, reward: { xp: 50, hearts: 20 } },
      ],
      strings: { completed: "✓ Completado" },
    },
    madeBy: { text: "Hecho con ♥ por Hero y Shin" },
    ui: { labels: { miku: "Miku:" } },
    badge: {
      title: "🔖 Enlázanos <span class=\"kawaii-decoration\">✨</span>",
      back: "Volver al jardín",
      copy: "Copiar código",
      copied: "¡Copiado! ✨",
    },
    tooltips: {
      guestbook: "Libro de visitas",
      puzzle: "Rompecabezas de Miku",
      shrineGallery: "Galería de arte de Miku Collection",
      shopShield: "Protege los corazones por un rato",
      shopDecoy: "Distrae a la golondrina",
      wodNext: "Siguiente palabra",
    },
    dex: { header: "MikuDex • Poseídas: {owned} / {total}", scopeLabel: "Ámbito", scopes: { all: "Todas", owned: "Poseídas", missing: "Faltan" }, rarityLabel: "Rareza", rarityAll: "Todas", searchLabel: "Buscar", searchPlaceholder: "nombre...", loading: "Cargando...", navPrev: "Anterior", navNext: "Siguiente", rarityText: "Rareza:", ownedTextOwned: "Poseídas: x{n}", ownedTextLocked: "Poseídas: •", unlocksLabel: "Desbloquea:", unlocksMusic: "Pista musical en Jukebox", btnSetSinger: "Usar como cantante", btnWinInWish: "Gánala en Wish", btnClose: "Cerrar", hiddenToast: "Este compañero legendario sigue oculto... 🔒✨", videoUnavailable: "Video no disponible", watchOnYouTube: "Ver en YouTube" },
  },
  de: {
    seo: {
      title: "Baby Belle – Pastell‑Miku‑Garten ✨",
      ogTitle: "Baby Belle – Pastell‑Miku‑Garten",
      description:
        "Ein gemütliches pastellfarbenes Web‑Zuhause für Baby Belle (BabbyBelle / bb / beebee / belle / shin / shinnun) – Links, Musik, Spiele, Lernecke und interaktive Miku‑Begleiterinnen!",
      keywords: [
        "Baby Belle",
        "Hatsune Miku",
        "Vocaloid",
        "kawaii",
        "pastell",
        "retro",
        "Spiele",
        "Japanisch lernen",
        "Sprachdojo",
      ],
      siteName: "Belles Pixelgarten",
    },
    site: { title: "Belles Pixelgarten", subtitle: "wo süße Träume leben ♡" },
    splash: { title: "Belles Pixelgarten", subtitle: "Kawaii-Protokolle initialisieren…", button: "Garten betreten" },
    status: { onlineLabel: "Wiedergabe", radioOffLabel: "Bereit", radioOnLabel: "Wiedergabe", heartsLabel: "gesegnete Herzen", visitorsLabel: "Freunde:" },
    radio: { title: "Miku Radio", defaultStatus: "Online", playingStatus: "Wiedergabe", stoppedStatus: "Radio gestoppt", playButton: "▶️", stopButton: "⏸️", streamError: "⚠️ Stream-Fehler" },
    music: { ui: { jukeboxReady: "Bereit", songSelect: "Song wählen", clickToPlay: "Klicke einen Song zum Abspielen", sendLove: "Liebe senden" } },
    nav: [
      { id: "home", label: "garten" },
      { id: "socials", label: "links" },
      { id: "study", label: "🎌 日本語" },
      { id: "games", label: "spiele" },
      { id: "shrine", label: "schrein" },
      { id: "Wish", label: "wunsch" },
    ],
    home: { 
      heroTitle: "Willkommen in meinem Garten! 🌸",
      heroParagraphs: [
        "Hi! Ich bin Baby Belle, aber nenn mich gern BB.",
        "Willkommen in meiner gemütlichen Ecke des Internets, wo Kawaii auf Retro trifft.",
        "Schau dich um und fühl dich wie zu Hause!",
        "Lass uns gute Freunde sein!",
      ],
      heartButton: "Liebe senden",
      presentationTitle: "Lerne Baby Belle kennen",
      presentationSlides: [
        { title: "Lore", theme: "bio", content: [
          "🇫🇮 Finnland 🇸🇪 Schweden → Japan 🇯🇵",
          "Internet‑Engel • Profi‑NEET • Sehr kawaii! 💖",
          "Lebt derzeit in Japan und ist immer online.",
        ]},
        { title: "Stats", theme: "stats", content: [
          `Alter: Stirnlappen wuchsen vor ${yearsAgo} Jahren aus`,
          "Größe: 169 cm 📏",
          "Geburtstag: 22. September 🎂",
          "Ort: Pixelgarten 🏡",
        ]},
        { title: "Mag ich", theme: "likes", content: [
          "Hatsune Miku 💙",
          "Monster Energy",
          "Kaffee & Süßes ☕🍰",
          "Katzen & Sanrio 🐱",
        ]},
        { title: "Belles Herz", theme: "feelings", content: [
          "Ich liebe Miku‑Figuren, Kawaii‑Vibes und Gaming.",
          "Manchmal bin ich traurig… magst du mich aufmuntern?",
          "Ich möchte nicht einsam sein oder geärgert werden.",
          "Danke fürs Vorbeischauen! 💙",
        ]},
        { title: "Wovor ich mich verstecke", theme: "dislikes", content: [
          "Laute Jumpscares 🙀",
          "Sehr scharf 🔥🔥🔥",
          "Insekten essen 🐛🚫",
          "Unhöflichkeit ❌",
          "Ignoriert werden 😔",
        ]},
        { title: "Träume", theme: "dreams", content: [
          "Scharfes Essen trainieren! 🌶️",
          "Horrorspiele ohne Tränen 👻",
          "Auf Twitch streamen 📺",
        ]},
        { title: "Danke fürs Besuchen! ♡", theme: "finale", content: [
          "Du hast das Ende erreicht!",
          "✨ Schön, dass du da warst! ✨",
          "🌸 Schick Liebe und bleib freundlich! 🌸",
          "💙 Komm bald wieder in den Garten! 💙",
        ]},
      ],
    },
    socials: { title: "Online finden" },
    shrine: {
      title: "Miku‑Schrein",
      aboutTitle: "Über Hatsune Miku",
      aboutText:
        "Miku ist meine Inspiration für Kreativität, Musik und digitale Kunst. Dieser Schrein feiert die Magie der Vocaloid‑Musik und die wunderbare Community darum herum!",
      favoriteSongsTitle: "Lieblingslieder",
      galleryTitle: "Miku‑Galerie",
    },
    mediaCredits: {
      title: "ⓘ Mediennachweise",
      description: "Im Schrein verwenden wir Fan‑Assets und geliehene Medien. Alle Rechte verbleiben bei den ursprünglichen Urhebern:",
      credits: [
        { category: "Hatsune Miku", attribution: "© Crypton Future Media" },
        { category: "Pixelkunst", attribution: "illufinch", link: "https://illufinch.tumblr.com/post/667463046903545856/100-mikus-patreon-twitter", linkText: "100 Mikus" },
        { category: "Webmeji‑Sprites", attribution: "", link: "https://neocities.org/site/webmeji", linkText: "webmeji auf Neocities" },
        { category: "Soundeffekte", attribution: "onlinesaipa" },
        { category: "Zusätzliche Bilder", attribution: "Maki_Ilu und JimmyIsaac" }
      ],
      disclaimer: "Diese Assets werden ausschließlich zu Tribut‑Zwecken verwendet."
    },
    sidebarTitles: {
      left: { diva: "🎤 Diva‑HUD", pet: "dein neuer bester Freund~!", friends: "meine Freunde", stats: "Seitenstatistik" },
      right: { quickLinks: "Schnellzugriffe", quests: "Tägliche Quests", shop: "Shop", badges: "Web‑Abzeichen" },
    },
    games: {
      title: "Kawaii‑Minispiele",
      memoryTitle: "Miku‑Memory",
      memoryReset: "Neues Spiel",
      heartsTitle: "Herzgarten",
      heartsReset: "Zurücksetzen",
      heartsZone: "Tippe, um mehr Herzen wachsen zu lassen!",
      WishTitle: "schließe die Augen und wünsch dir was~",
      WishOpenDex: "MikuDex öffnen",
      WishCloseDex: "MikuDex schließen",
      WishTokensLabel: "Tickets:",
      WishPull1: "Ziehen ×1",
      WishPull10: "Ziehen ×10",
      WishDaily: "Tages‑Ticket",
      WishConvert: "100💖 → +1",
      externalRpg: "🕹️ Miku RPG (neues Fenster)",
      externalJetpack: "🕹️ Miku Jetpack (neues Fenster)",
    },
    study: {
      dojo: {
        titleEn: "Sprach‑Dojo",
        titleDiva: "PROJECT DIVA",
        hud: { lv: "LV", voltage: "VOLTAGE", combo: "COMBO", score: "PUNKTE", ready: "BEREIT" },
        difficulties: [
          "Locker","Leicht","Normal","Schwer","Extrem","Meister","Ultra","Chaos","Unmöglich"
        ],
        modes: {
          vocab: { name: "Vokabel‑Pop", desc: "JP → DE Mehrfachwahl" },
          kanji: { name: "Kanji‑Meister", desc: "Bedeutung ↔ Kanji nach Stufe" },
          typing: { name: "Miku × Chat Tippen", desc: "Tastatur‑Romaji" },
        },
        dirJPEN: "JP → DE",
        dirENJP: "DE → JP",
        dirMeaningKanji: "Bedeutung → Kanji",
        dirKanjiMeaning: "Kanji → Bedeutung",
        multipleChoice: "Mehrfachwahl",
        byGrade: "nach Stufe",
        typingLabel: "Hiragana & Katakana Tippen",
        wod: { title: "Wort des Tages", loading: "Lädt…", next: "Nächstes Wort", error: "Wort konnte nicht geladen werden" },
      },
      hudRight: { levelLabel: "Stufe:", livesLabel: "Leben:", difficultyLabel: "Schwierigkeit:" },
    },
    footer: {
      lines: [
        "Diese Pixel sind nur für dich! ✨",
        "Wärst du ein Pixel, ich würde dich täglich laden",
        "✨ Nicht aufs WLAN treten! Dort wächst eine Miku…",
      ],
      text: "Diese Pixel sind nur für dich! ✨ • Wärst du ein Pixel, ich würde dich täglich laden • ✨ Nicht aufs WLAN treten! Dort wächst eine Miku…",
    },
    shop: { messages: { decoyAdded: "Süßer Köder platziert! 🍪✨", notEnoughHearts: "Nicht genug Herzen! 💔", waitCurrentItem: "Bitte aktuellen Gegenstand abwarten! 🥤", shieldOn: "Herzschild aktiviert! ⛨✨", potionActive: "Trank bereits aktiv!", xpPotionOn: "XP‑Trank aktiviert! ✨", needMoreForEgg: "Mehr Herzen fürs Ei nötig!" } },
    alerts: { welcome: "Willkommen in Belles Pixelgarten! ✨" },
    quests: {
      items: [
        { id: "play-song", text: "Spiele ein Lied im Jukebox", amount: 1, reward: { xp: 20, hearts: 10 } },
        { id: "cool-judges", text: "Erziele 10× COOL", amount: 10, reward: { xp: 30, hearts: 15 } },
        { id: "answers-right", text: "Beantworte 15 Lernaufgaben", amount: 15, reward: { xp: 50, hearts: 20 } },
      ],
      strings: { completed: "✓ Abgeschlossen" },
    },
    madeBy: { text: "Mit ♥ gemacht von Hero & Shin" },
    ui: { labels: { miku: "Miku:" } },
    badge: {
      title: "🔖 Verlinke uns <span class=\"kawaii-decoration\">✨</span>",
      back: "Zurück zum Garten",
      copy: "Code kopieren",
      copied: "Kopiert! ✨",
    },
    tooltips: {
      guestbook: "Gästebuch",
      puzzle: "Miku‑Puzzle",
      shrineGallery: "Miku Collection – Kunstgalerie",
      shopShield: "Herzen kurzzeitig abschirmen",
      shopDecoy: "Die Schwalbe ablenken",
      wodNext: "Nächstes Wort",
    },
    dex: { header: "MikuDex • Besessen: {owned} / {total}", scopeLabel: "Bereich", scopes: { all: "Alle", owned: "Besessen", missing: "Fehlend" }, rarityLabel: "Seltenheit", rarityAll: "Alle", searchLabel: "Suche", searchPlaceholder: "Name...", loading: "Lädt...", navPrev: "Zurück", navNext: "Weiter", rarityText: "Seltenheit:", ownedTextOwned: "Besessen: x{n}", ownedTextLocked: "Besessen: •", unlocksLabel: "Schaltet frei:", unlocksMusic: "Song im Jukebox‑Player", btnSetSinger: "Als Sänger setzen", btnWinInWish: "Im Wish gewinnen", btnClose: "Schließen", hiddenToast: "Dieser legendäre Begleiter bleibt verborgen... 🔒✨", videoUnavailable: "Video nicht verfügbar", watchOnYouTube: "Auf YouTube ansehen" },
  },
  fr: {
    seo: {
      title: "Baby Belle – Jardin Miku Pastel ✨",
      ogTitle: "Baby Belle – Jardin Miku Pastel",
      description:
        "Un cocon web pastel pour Baby Belle (BabbyBelle / bb / beebee / belle / shin / shinnun) — liens, musique, jeux, coin d’étude et compagnes Miku interactives !",
      keywords: [
        "Baby Belle",
        "Hatsune Miku",
        "Vocaloid",
        "kawaii",
        "pastel",
        "rétro",
        "jeux",
        "apprentissage du japonais",
        "dojo de langue",
      ],
      siteName: "Jardin Pixel de Belle",
    },
    site: { title: "Jardin Pixel de Belle", subtitle: "là où naissent les doux rêves ♡" },
    splash: { title: "Jardin Pixel de Belle", subtitle: "Initialisation kawaii…", button: "entrer dans le jardin" },
    status: { onlineLabel: "Lecture", radioOffLabel: "Prêt", radioOnLabel: "Lecture", heartsLabel: "coeurs bénis", visitorsLabel: "amis:" },
    radio: { title: "radio miku", defaultStatus: "En ligne", playingStatus: "Lecture", stoppedStatus: "Radio arrêtée", playButton: "▶️", stopButton: "⏸️", streamError: "⚠️ Erreur de flux" },
    music: { ui: { jukeboxReady: "Prêt", songSelect: "Choisir un morceau", clickToPlay: "Clique pour lire une chanson", sendLove: "envoyer de l'amour" } },
    nav: [
      { id: "home", label: "jardin" },
      { id: "socials", label: "liens" },
      { id: "study", label: "🎌 日本語" },
      { id: "games", label: "jeux" },
      { id: "shrine", label: "sanctuaire" },
      { id: "Wish", label: "souhait" },
    ],
    home: { 
      heroTitle: "Bienvenue dans mon jardin ! 🌸",
      heroParagraphs: [
        "Coucou ! Je suis Baby Belle, mais dis BB.",
        "Bienvenue dans mon coin douillet d’internet où le kawaii rencontre le rétro.",
        "Explore, mets-toi à l’aise comme chez toi !",
        "Devenons de bons amis !",
      ],
      heartButton: "Envoyer de l'amour",
      presentationTitle: "Apprendre à connaître Baby Belle",
      presentationSlides: [
        { title: "Histoire", theme: "bio", content: [
          "🇫🇮 Finlande 🇸🇪 Suède → Japon 🇯🇵",
          "Ange d’internet • NEET • Super kawaii ! 💖",
          "Vit au Japon et reste en ligne.",
        ]},
        { title: "Stats", theme: "stats", content: [
          `Âge : lobes frontaux stoppés il y a ${yearsAgo} ans`,
          "Taille : 169 cm 📏",
          "Anniversaire : 22 septembre 🎂",
          "Lieu : Jardin Pixel 🏡",
        ]},
        { title: "Choses que j’aime", theme: "likes", content: [
          "Hatsune Miku 💙",
          "Monster Energy",
          "Café & gâteaux ☕🍰",
          "Chats & Sanrio 🐱",
        ]},
        { title: "Le coeur de Belle", theme: "feelings", content: [
          "J’adore collectionner des figurines Miku, être cute et jouer.",
          "Parfois je suis triste… tu peux me remonter le moral ?",
          "Je ne veux pas être seule ni harcelée.",
          "Merci d’avoir visité mon jardin ! 💙",
        ]},
        { title: "Ce qui me fait me cacher", theme: "dislikes", content: [
          "Gros jumpscares 🙀",
          "Très épicé 🔥🔥🔥",
          "Manger des insectes 🐛🚫",
          "La grossièreté ❌",
          "Être ignorée 😔",
        ]},
        { title: "Rêves kawaii", theme: "dreams", content: [
          "Supporter le piment ! 🌶️",
          "Jouer à un jeu qui fait peur sans pleurer 👻",
          "Streamer sur Twitch 📺",
        ]},
        { title: "Merci de la visite ! ♡", theme: "finale", content: [
          "Tu as atteint la fin de l’histoire !",
          "✨ J’espère que ça t’a plu ! ✨",
          "🌸 Envoie des coeurs et sois gentil ! 🌸",
          "💙 Reviens quand tu veux au jardin ! 💙",
        ]},
      ],
    },
    socials: { title: "Me trouver en ligne" },
    shrine: {
      title: "Sanctuaire Miku",
      aboutTitle: "À propos d’Hatsune Miku",
      aboutText:
        "Miku est ma source d’inspiration pour la créativité, la musique et l’art numérique. Ce sanctuaire célèbre la magie de la musique vocaloid et l’incroyable communauté qui l’entoure !",
      favoriteSongsTitle: "Chansons favorites",
      galleryTitle: "Galerie Miku",
    },
    mediaCredits: {
      title: "ⓘ Crédits médias",
      description: "Dans ce sanctuaire, nous utilisons des ressources de fans et des médias empruntés. Tous les droits appartiennent à leurs auteurs originaux :",
      credits: [
        { category: "Hatsune Miku", attribution: "© Crypton Future Media" },
        { category: "Pixel art", attribution: "illufinch", link: "https://illufinch.tumblr.com/post/667463046903545856/100-mikus-patreon-twitter", linkText: "100 Mikus" },
        { category: "Sprites Webmeji", attribution: "", link: "https://neocities.org/site/webmeji", linkText: "webmeji sur Neocities" },
        { category: "Effets sonores", attribution: "onlinesaipa" },
        { category: "Images additionnelles", attribution: "Maki_Ilu et JimmyIsaac" }
      ],
      disclaimer: "Ces éléments sont utilisés ici uniquement à des fins d’hommage."
    },
    sidebarTitles: {
      left: { diva: "🎤 HUD Diva", pet: "ton nouveau meilleur ami~!", friends: "mes amis", stats: "statistiques du site" },
      right: { quickLinks: "liens rapides", quests: "quêtes quotidiennes", shop: "boutique", badges: "badges web" },
    },
    games: {
      title: "mini‑jeux kawaii",
      memoryTitle: "Mémoire Miku",
      memoryReset: "Nouvelle partie",
      heartsTitle: "Jardin des coeurs",
      heartsReset: "Réinitialiser",
      heartsZone: "Appuie pour faire pousser des coeurs !",
      WishTitle: "ferme les yeux et fais un voeu~",
      WishOpenDex: "Ouvrir MikuDex",
      WishCloseDex: "Fermer MikuDex",
      WishTokensLabel: "Tickets :",
      WishPull1: "Tirage ×1",
      WishPull10: "Tirage ×10",
      WishDaily: "Ticket quotidien",
      WishConvert: "100💖 → +1",
      externalRpg: "🕹️ Miku RPG (nouvelle fenêtre)",
      externalJetpack: "🕹️ Miku Jetpack (nouvelle fenêtre)",
    },
    study: {
      dojo: {
        titleEn: "Dojo des Langues",
        titleDiva: "PROJECT DIVA",
        hud: { lv: "LV", voltage: "VOLTAGE", combo: "COMBO", score: "POINTS", ready: "PRÊT" },
        difficulties: [
          "Détente","Facile","Normal","Difficile","Extrême","Maître","Ultra","Chaos","Impossible"
        ],
        modes: {
          vocab: { name: "Vocabulaire Pop", desc: "JP → FR Choix multiple" },
          kanji: { name: "Maître des Kanji", desc: "Sens ↔ Kanji par niveau" },
          typing: { name: "Saisie Miku × Chat", desc: "Clavier Romaji" },
        },
        dirJPEN: "JP → FR",
        dirENJP: "FR → JP",
        dirMeaningKanji: "Sens → Kanji",
        dirKanjiMeaning: "Kanji → Sens",
        multipleChoice: "Choix multiple",
        byGrade: "par niveau",
        typingLabel: "Saisie Hiragana & Katakana",
        wod: { title: "Mot du jour", loading: "Chargement…", next: "Mot suivant", error: "Impossible de charger" },
      },
      hudRight: { levelLabel: "Niveau:", livesLabel: "Vies:", difficultyLabel: "Difficulté:" },
    },
    footer: {
      lines: [
        "J’ai cueilli ces pixels pour toi ! ✨",
        "Si tu étais un pixel, je te téléchargerais chaque jour",
        "✨ Ne marche pas sur le Wi‑Fi ! Une Miku y pousse…",
      ],
      text: "J’ai cueilli ces pixels pour toi ! ✨ • Si tu étais un pixel, je te téléchargerais chaque jour • ✨ Ne marche pas sur le Wi‑Fi ! Une Miku y pousse…",
    },
    shop: { messages: { decoyAdded: "Leurre sucré ajouté ! 🍪✨", notEnoughHearts: "Pas assez de coeurs ! 💔", waitCurrentItem: "Attends la fin de l'objet actuel ! 🥤", shieldOn: "Bouclier activé ! ⛨✨", potionActive: "Potion déjà active !", xpPotionOn: "Potion XP activée ! ✨", needMoreForEgg: "Plus de coeurs pour l'oeuf !" } },
    alerts: { welcome: "Bienvenue dans le Jardin Pixel de Belle ! ✨" },
    quests: {
      items: [
        { id: "play-song", text: "Lance une chanson dans le Jukebox", amount: 1, reward: { xp: 20, hearts: 10 } },
        { id: "cool-judges", text: "Fais 10 jugements COOL", amount: 10, reward: { xp: 30, hearts: 15 } },
        { id: "answers-right", text: "Réponds à 15 questions d'étude", amount: 15, reward: { xp: 50, hearts: 20 } },
      ],
      strings: { completed: "✓ Terminé" },
    },
    madeBy: { text: "Fait avec ♥ par Hero & Shin" },
    ui: { labels: { miku: "Miku :" } },
    badge: {
      title: "🔖 Fais un lien <span class=\"kawaii-decoration\">✨</span>",
      back: "Retour au jardin",
      copy: "Copier le code",
      copied: "Copié ! ✨",
    },
    tooltips: {
      guestbook: "Livre d’or",
      puzzle: "Puzzle Miku",
      shrineGallery: "Galerie d’art Miku Collection",
      shopShield: "Protéger les coeurs un moment",
      shopDecoy: "Distraire l’hirondelle",
      wodNext: "Mot suivant",
    },
    dex: { header: "MikuDex • Obtenues : {owned} / {total}", scopeLabel: "Portée", scopes: { all: "Toutes", owned: "Obtenues", missing: "Manquantes" }, rarityLabel: "Rareté", rarityAll: "Toutes", searchLabel: "Recherche", searchPlaceholder: "nom...", loading: "Chargement...", navPrev: "Précédent", navNext: "Suivant", rarityText: "Rareté :", ownedTextOwned: "Obtenues : x{n}", ownedTextLocked: "Obtenues : •", unlocksLabel: "Débloque :", unlocksMusic: "Piste dans le Jukebox", btnSetSinger: "Choisir comme chanteuse", btnWinInWish: "Gagner dans Wish", btnClose: "Fermer", hiddenToast: "Ce compagnon légendaire reste caché... 🔒✨", videoUnavailable: "Vidéo indisponible", watchOnYouTube: "Voir sur YouTube" },
  },
  zh: {
    seo: {
      title: "Baby Belle - 粉彩 Miku 花园 ✨",
      ogTitle: "Baby Belle - 粉彩 Miku 花园",
      description:
        "为 Baby Belle（BabbyBelle / bb / beebee / belle / shin / shinnun）打造的温柔粉彩小站——链接、音乐、游戏、学习角和可互动的初音伙伴！",
      keywords: [
        "Baby Belle",
        "初音未来",
        "Vocaloid",
        "可爱",
        "粉彩",
        "复古",
        "游戏",
        "日语 学习",
        "语言 道场",
      ],
      siteName: "Belle 的像素花园",
    },
    site: { title: "贝儿的像素花园", subtitle: "甜梦绽放之地 ♡" },
    splash: { title: "贝儿的像素花园", subtitle: "初始化可爱协议…", button: "进入花园" },
    status: { onlineLabel: "正在播放", radioOffLabel: "就绪", radioOnLabel: "正在播放", heartsLabel: "被祝福的心", visitorsLabel: "朋友:" },
    radio: { title: "miku 电台", defaultStatus: "在线", playingStatus: "正在播放", stoppedStatus: "电台已停止", playButton: "▶️", stopButton: "⏸️", streamError: "⚠️ 流媒体错误" },
    music: { ui: { jukeboxReady: "就绪", songSelect: "选择歌曲", clickToPlay: "点击歌曲播放", sendLove: "送爱心" } },
    nav: [
      { id: "home", label: "花园" },
      { id: "socials", label: "链接" },
      { id: "study", label: "🎌 日本語" },
      { id: "games", label: "游戏" },
      { id: "shrine", label: "神社" },
      { id: "Wish", label: "许愿" },
    ],
    home: { 
      heroTitle: "欢迎来到我的花园！🌸",
      heroParagraphs: [
        "你好！我是 Baby Belle，也可以叫我 BB。",
        "欢迎来到我在互联网上温馨的一角，这里可爱与复古相遇。",
        "来探索吧，把这里当成自己的家！",
        "做我的好朋友吧！",
      ],
      heartButton: "发送爱心",
      presentationTitle: "了解 Baby Belle",
      presentationSlides: [
        { title: "故事", theme: "bio", content: [
          "🇫🇮 芬兰 🇸🇪 瑞典 → 日本 🇯🇵",
          "网络天使 • NEET • 超可爱！💖",
          "目前住在日本，经常在线。",
        ]},
        { title: "数据", theme: "stats", content: [
          `年龄：额叶在 ${yearsAgo} 年前停止发育`,
          "身高：169 cm 📏",
          "生日：9月22日 🎂",
          "地点：像素花园 🏡",
        ]},
        { title: "我喜欢的东西", theme: "likes", content: [
          "初音未来 💙",
          "魔爪能量饮料",
          "咖啡和甜点 ☕🍰",
          "小猫和三丽鸥 🐱",
        ]},
        { title: "Belle 的心", theme: "feelings", content: [
          "我喜欢收藏 Miku 手办、可爱打扮和打游戏。",
          "有时会难过…可以也给我一点鼓励吗？",
          "不想被孤立或被欺负。",
          "谢谢你来我的花园！💙",
        ]},
        { title: "让我想躲起来的事", theme: "dislikes", content: [
          "突然的惊吓 🙀",
          "超辣 🔥🔥🔥",
          "吃虫子 🐛🚫",
          "无礼的行为 ❌",
          "被忽视 😔",
        ]},
        { title: "可爱的梦想", theme: "dreams", content: [
          "能吃得了辣！🌶️",
          "玩恐怖游戏也不哭 👻",
          "在 Twitch 直播 📺",
        ]},
        { title: "谢谢光临！♡", theme: "finale", content: [
          "你看到了结尾！",
          "✨ 希望你喜欢认识我！ ✨",
          "🌸 记得送爱心与善待他人！ 🌸",
          "💙 欢迎常来我的像素花园！ 💙",
        ]},
      ],
    },
    socials: { title: "找到我" },
    shrine: {
      title: "Miku 神社",
      aboutTitle: "关于初音未来",
      aboutText:
        "初音未来启发了我的创造力、音乐与数字艺术。这个神社致敬 Vocaloid 音乐的魔力，并致敬围绕它的精彩社群！",
      favoriteSongsTitle: "最爱歌曲",
      galleryTitle: "Miku 画廊",
    },
    mediaCredits: {
      title: "ⓘ 媒体致谢",
      description: "在本神社中使用了粉丝自制素材与借用的媒体。所有权利归原作者所有：",
      credits: [
        { category: "初音未来", attribution: "© Crypton Future Media" },
        { category: "像素美术", attribution: "illufinch", link: "https://illufinch.tumblr.com/post/667463046903545856/100-mikus-patreon-twitter", linkText: "100 Mikus" },
        { category: "Webmeji 精灵", attribution: "", link: "https://neocities.org/site/webmeji", linkText: "webmeji 在 Neocities" },
        { category: "音效", attribution: "onlinesaipa" },
        { category: "其他图片", attribution: "Maki_Ilu / JimmyIsaac" }
      ],
      disclaimer: "这些素材仅用于致敬目的。"
    },
    sidebarTitles: {
      left: { diva: "🎤 歌姬 HUD", pet: "你的新好朋友~!", friends: "我的朋友", stats: "站点统计" },
      right: { quickLinks: "快捷链接", quests: "每日任务", shop: "商店", badges: "网络徽章" },
    },
    games: {
      title: "可爱小游戏",
      memoryTitle: "Miku 记忆配对",
      memoryReset: "新游戏",
      heartsTitle: "爱心花园",
      heartsReset: "重置",
      heartsZone: "点击来种更多爱心！",
      WishTitle: "闭上眼睛许个愿~",
      WishOpenDex: "打开 MikuDex",
      WishCloseDex: "关闭 MikuDex",
      WishTokensLabel: "票券:",
      WishPull1: "抽取 ×1",
      WishPull10: "抽取 ×10",
      WishDaily: "每日票",
      WishConvert: "100💖 → +1",
      externalRpg: "🕹️ Miku RPG（新窗口）",
      externalJetpack: "🕹️ Miku 喷射背包（新窗口）",
    },
    study: {
      dojo: {
        titleEn: "语言道场",
        titleDiva: "PROJECT DIVA",
        hud: { lv: "LV", voltage: "电压", combo: "连击", score: "得分", ready: "准备" },
        difficulties: [
          "休闲","简单","普通","困难","极限","大师","究极","混沌","不可能"
        ],
        modes: {
          vocab: { name: "词汇问答", desc: "日 → 中 多项选择" },
          kanji: { name: "汉字大师", desc: "含义 ↔ 按年级的汉字" },
          typing: { name: "Miku × 聊天 打字", desc: "罗马音键盘输入" },
        },
        dirJPEN: "日 → 中",
        dirENJP: "中 → 日",
        dirMeaningKanji: "含义 → 汉字",
        dirKanjiMeaning: "汉字 → 含义",
        multipleChoice: "多项选择",
        byGrade: "按年级",
        typingLabel: "平假名/片假名 打字",
        wod: { title: "今日之词", loading: "加载中…", next: "下一词", error: "无法加载" },
      },
      hudRight: { levelLabel: "等级:", livesLabel: "生命:", difficultyLabel: "难度:" },
    },
    footer: {
      lines: [
        "这些像素是为你摘的！✨",
        "如果你是像素，我会每天下载你",
        "✨ 别踩到 Wi‑Fi！这里正在长出一只 Miku…",
      ],
      text: "这些像素是为你摘的！✨ • 如果你是像素，我会每天下载你 • ✨ 别踩到 Wi‑Fi！这里正在长出一只 Miku…",
    },
    shop: { messages: { decoyAdded: "已放置诱饵！🍪✨", notEnoughHearts: "爱心不足！💔", waitCurrentItem: "请等待当前物品结束！🥤", shieldOn: "心之护盾已启用！⛨✨", potionActive: "药水已生效！", xpPotionOn: "XP 药水已启用！✨", needMoreForEgg: "孵蛋需要更多爱心！" } },
    alerts: { welcome: "欢迎来到贝儿的像素花园！✨" },
    quests: {
      items: [
        { id: "play-song", text: "在点唱机播放任意歌曲", amount: 1, reward: { xp: 20, hearts: 10 } },
        { id: "cool-judges", text: "达成 10 次 COOL 判定", amount: 10, reward: { xp: 30, hearts: 15 } },
        { id: "answers-right", text: "答对 15 道学习题目", amount: 15, reward: { xp: 50, hearts: 20 } },
      ],
      strings: { completed: "✓ 已完成" },
    },
    madeBy: { text: "由 Hero 与 Shin 倾情制作" },
    ui: { labels: { miku: "初音未来:" } },
    badge: {
      title: "🔖 链接我们 <span class=\"kawaii-decoration\">✨</span>",
      back: "返回花园",
      copy: "复制代码",
      copied: "已复制！✨",
    },
    tooltips: {
      guestbook: "留言簿",
      puzzle: "Miku 拼图",
      shrineGallery: "Miku Collection 艺术画廊",
      shopShield: "短暂保护爱心",
      shopDecoy: "用点心分散燕子的注意",
      wodNext: "下一词",
    },
    dex: { header: "MikuDex • 拥有：{owned} / {total}", scopeLabel: "范围", scopes: { all: "全部", owned: "已拥有", missing: "未拥有" }, rarityLabel: "稀有度", rarityAll: "全部", searchLabel: "搜索", searchPlaceholder: "名称...", loading: "加载中...", navPrev: "上一页", navNext: "下一页", rarityText: "稀有度：", ownedTextOwned: "拥有：x{n}", ownedTextLocked: "拥有：•", unlocksLabel: "解锁：", unlocksMusic: "点唱机曲目", btnSetSinger: "设为主唱", btnWinInWish: "在 Wish 中获取", btnClose: "关闭", hiddenToast: "这位传说中的同伴仍然隐藏着… 🔒✨", videoUnavailable: "视频不可用", watchOnYouTube: "在 YouTube 上观看" },
  },
};

function deepMerge(base, patch) {
  if (!patch) return JSON.parse(JSON.stringify(base));
  const out = Array.isArray(base) ? [...base] : { ...base };
  for (const k of Object.keys(patch)) {
    const bv = base?.[k];
    const pv = patch[k];
    if (pv && typeof pv === 'object' && !Array.isArray(pv)) {
      out[k] = deepMerge(bv || {}, pv);
    } else {
      out[k] = pv;
    }
  }
  return out;
}

window.I18N = {
  locales: LOCALES,
  current: 'en',
  apply(lang) {
    const l = (lang || 'en').toLowerCase();
    const key = ['ja','es','de','fr','zh'].includes(l) ? l : (l.startsWith('ja')? 'ja' : l.startsWith('es')? 'es' : l.startsWith('de')? 'de' : l.startsWith('fr')? 'fr' : l.startsWith('zh')? 'zh' : 'en');
    const merged = deepMerge(EN_CONTENT, LOCALES[key] || {});
    this.current = key;
    window.SITE_CONTENT = merged;
    return key;
  },
};

// ========== SEO / META APPLICATOR ==========
function applySeo(lang) {
  try {
    const L = (lang || (window.I18N && window.I18N.current) || 'en').toLowerCase();
    const C = window.SITE_CONTENT || EN_CONTENT;
    // html lang
    try { document.documentElement.setAttribute('lang', L); } catch(_) {}

    // Canonical + alternates
    const origin = (location && location.origin) ? location.origin : '';
    const path = (location && location.pathname) ? location.pathname : '/';
    const mkUrl = (code) => `${origin}${path}?lang=${code}`;
    const canonicalHref = mkUrl(L);

    let canonical = document.getElementById('canonicalLink');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.id = 'canonicalLink';
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalHref);

    // Remove old alternates we manage
    document.querySelectorAll('link.i18n-alt[rel="alternate"]').forEach((n)=>n.remove());
    const langs = ['en','ja','es','de','fr','zh'];
    langs.forEach((code)=>{
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.className = 'i18n-alt';
      link.setAttribute('hreflang', code);
      link.setAttribute('href', mkUrl(code));
      document.head.appendChild(link);
    });
    const xdef = document.createElement('link');
    xdef.rel = 'alternate';
    xdef.className = 'i18n-alt';
    xdef.setAttribute('hreflang', 'x-default');
    xdef.setAttribute('href', `${origin}${path}`);
    document.head.appendChild(xdef);

    // Helpers
    const ensureMeta = (selectorOrId, attrs) => {
      let el = typeof selectorOrId === 'string' && selectorOrId.startsWith('#')
        ? document.querySelector(selectorOrId)
        : document.querySelector(selectorOrId);
      if (!el) {
        el = document.createElement('meta');
        Object.keys(attrs || {}).forEach((k)=>el.setAttribute(k, attrs[k]));
        document.head.appendChild(el);
      }
      return el;
    };

    const setMeta = (el, key, value) => { if (el) el.setAttribute(key, value); };

    const ogLocaleMap = {
      en: 'en_US', ja: 'ja_JP', es: 'es_ES', de: 'de_DE', fr: 'fr_FR', zh: 'zh_CN'
    };

    const title = (C.seo?.title) || C.site?.htmlTitle || C.site?.title || document.title || '';
    try { document.title = title; } catch(_) {}
    const desc = (C.seo?.description) || '';
    const ogTitle = (C.seo?.ogTitle) || title;
    const ogDesc = (C.seo?.description) || desc;
    let ogImg = (C.images?.ogImage) || '';
    const siteName = C.seo?.siteName || C.site?.title || 'Pixel Garden';

    // description
    let metaDesc = document.getElementById('metaDescription') || document.querySelector('meta[name="description"]');
    if (!metaDesc) { metaDesc = document.createElement('meta'); metaDesc.setAttribute('name','description'); metaDesc.id = 'metaDescription'; document.head.appendChild(metaDesc); }
    metaDesc.setAttribute('content', desc);

    // robots (ensure indexable)
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) { robots = document.createElement('meta'); robots.setAttribute('name','robots'); document.head.appendChild(robots); }
    robots.setAttribute('content', 'index, follow');

    // OG
    let ogt = document.getElementById('metaOgTitle') || document.querySelector('meta[property="og:title"]');
    if (!ogt) { ogt = document.createElement('meta'); ogt.id = 'metaOgTitle'; ogt.setAttribute('property','og:title'); document.head.appendChild(ogt); }
    ogt.setAttribute('content', ogTitle);
    let ogd = document.getElementById('metaOgDescription') || document.querySelector('meta[property="og:description"]');
    if (!ogd) { ogd = document.createElement('meta'); ogd.id = 'metaOgDescription'; ogd.setAttribute('property','og:description'); document.head.appendChild(ogd); }
    ogd.setAttribute('content', ogDesc);
    let ogu = document.getElementById('metaOgUrl') || document.querySelector('meta[property="og:url"]');
    if (!ogu) { ogu = document.createElement('meta'); ogu.id = 'metaOgUrl'; ogu.setAttribute('property','og:url'); document.head.appendChild(ogu); }
    ogu.setAttribute('content', canonicalHref);
    let ogl = document.getElementById('metaOgLocale') || document.querySelector('meta[property="og:locale"]');
    if (!ogl) { ogl = document.createElement('meta'); ogl.id = 'metaOgLocale'; ogl.setAttribute('property','og:locale'); document.head.appendChild(ogl); }
    ogl.setAttribute('content', ogLocaleMap[L] || 'en_US');
    // Clear and add og:locale:alternate for other languages
    document.querySelectorAll('meta.i18n-alt[property="og:locale:alternate"]').forEach((n)=>n.remove());
    Object.keys(ogLocaleMap).forEach((code)=>{
      if (code === L) return;
      const m = document.createElement('meta');
      m.className = 'i18n-alt';
      m.setAttribute('property', 'og:locale:alternate');
      m.setAttribute('content', ogLocaleMap[code]);
      document.head.appendChild(m);
    });
    let ogs = document.getElementById('metaOgSiteName') || document.querySelector('meta[property="og:site_name"]');
    if (!ogs) { ogs = document.createElement('meta'); ogs.id = 'metaOgSiteName'; ogs.setAttribute('property','og:site_name'); document.head.appendChild(ogs); }
    ogs.setAttribute('content', siteName);
    // image
    if (ogImg) {
      // Ensure absolute URL for social cards
      try {
        if (!/^https?:\/\//i.test(ogImg)) {
          const abs = origin + (ogImg.startsWith('/') ? ogImg : (path.replace(/[^/]*$/, '') + ogImg));
          ogImg = abs;
        }
      } catch(_) {}
      let ogi = document.getElementById('metaOgImage') || document.querySelector('meta[property="og:image"]');
      if (!ogi) { ogi = document.createElement('meta'); ogi.id = 'metaOgImage'; ogi.setAttribute('property','og:image'); document.head.appendChild(ogi); }
      ogi.setAttribute('content', ogImg);
    }

    // Twitter
    let twc = document.querySelector('meta[name="twitter:card"]');
    if (!twc) { twc = document.createElement('meta'); twc.setAttribute('name','twitter:card'); document.head.appendChild(twc); }
    twc.setAttribute('content', 'summary_large_image');
    let twt = document.getElementById('metaTwitterTitle') || document.querySelector('meta[name="twitter:title"]');
    if (!twt) { twt = document.createElement('meta'); twt.id = 'metaTwitterTitle'; twt.setAttribute('name','twitter:title'); document.head.appendChild(twt); }
    twt.setAttribute('content', ogTitle);
    let twd = document.getElementById('metaTwitterDescription') || document.querySelector('meta[name="twitter:description"]');
    if (!twd) { twd = document.createElement('meta'); twd.id = 'metaTwitterDescription'; twd.setAttribute('name','twitter:description'); document.head.appendChild(twd); }
    twd.setAttribute('content', ogDesc);
    if (ogImg) {
      let twi = document.getElementById('metaTwitterImage') || document.querySelector('meta[name="twitter:image"]');
      if (!twi) { twi = document.createElement('meta'); twi.id = 'metaTwitterImage'; twi.setAttribute('name','twitter:image'); document.head.appendChild(twi); }
      twi.setAttribute('content', ogImg);
    }

    // JSON-LD (replace if exists)
    try {
      const prev = document.getElementById('seoJsonLd');
      if (prev) prev.remove();
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'seoJsonLd';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteName,
        url: canonicalHref,
        inLanguage: L,
        availableLanguage: ['en','ja','es','de','fr','zh'],
      });
      document.head.appendChild(script);
    } catch(_){}
  } catch (e) {
    // no-op
  }
}

// ========== SPLASH SCREEN SYSTEM ==========
function initializeSplash() {
  const splash = document.getElementById("splash");
  const enterButton = document.getElementById("enterSite");
  const mainSite = document.getElementById("mainSite");

  // Language selector (top-right)
  const existingSel = document.getElementById('langSelector');
  if (!existingSel) {
  const selWrap = document.createElement('div');
  // Use fixed positioning and a very high z-index so the selector stays visible
  // even when the splash overlay is scaled beyond the viewport (120%+).
  selWrap.style.position = 'fixed';
  selWrap.style.top = '12px';
  // Nudge left slightly so the expanded dropdown menu doesn't get clipped
  selWrap.style.right = '20px';
  selWrap.style.zIndex = '11001';
    selWrap.style.backdropFilter = 'blur(6px)';
    selWrap.style.background = 'rgba(255,255,255,0.35)';
    selWrap.style.border = '1px solid rgba(255,255,255,0.6)';
    selWrap.style.borderRadius = '10px';
    selWrap.style.padding = '6px 8px';
    selWrap.style.boxShadow = '0 4px 14px rgba(43,43,68,0.15)';
  selWrap.style.pointerEvents = 'auto';
    const sel = document.createElement('select');
    sel.id = 'langSelector';
    sel.setAttribute('aria-label', 'Language');
  sel.style.fontFamily = 'Nunito, system-ui, -apple-system, sans-serif';
  sel.style.fontSize = '14px';
  sel.style.color = '#2b2b44';
  sel.style.background = 'transparent';
  sel.style.border = 'none';
  sel.style.outline = 'none';
  // Use pointer cursor (hand) for interactive dropdowns; the cursor module
  // may replace it with animated cursors later but default to pointer now.
  sel.style.cursor = 'pointer';
    const opts = [
      ['en','English'],
      ['ja','日本語'],
      ['es','Español'],
      ['de','Deutsch'],
      ['fr','Français'],
      ['zh','中文'],
    ];
    const cur = (window.I18N && window.I18N.current) || 'en';
    opts.forEach(([v,l])=>{
      const o = document.createElement('option');
      o.value = v; o.textContent = l; if (v===cur) o.selected = true; sel.appendChild(o);
    });
    sel.addEventListener('change', (e)=>{
      const lang = e.target.value;
      try { localStorage.setItem('site.lang', lang); } catch(_){}
      if (window.I18N) {
        window.I18N.apply(lang);
        try { applySeo(lang); } catch(_) {}
        // Refresh splash texts immediately
        const t = document.querySelector('#splash .glitch');
        const sub = document.querySelector('#splash .typing-text');
        const btn = document.getElementById('enterSite');
        if (t) { t.textContent = window.SITE_CONTENT.splash.title; t.setAttribute('data-text', window.SITE_CONTENT.splash.title); }
        if (sub) sub.textContent = window.SITE_CONTENT.splash.subtitle;
        if (btn) btn.textContent = window.SITE_CONTENT.splash.button;
      }
    });
    selWrap.appendChild(sel);
    if (splash) splash.appendChild(selWrap);
  }

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

  // Preload a few critical assets so first interaction feels snappy
  function preloadImage(src) {
    return new Promise((res) => {
      const img = new Image();
      img.onload = img.onerror = () => res();
      img.src = src;
    });
  }

  async function preloadCriticalAssets() {
    const tasks = [];
    // Shimeji: warm first frames for each set + avoid case-sensitivity 404s
    const sh = [
      "./assets/webmeji/miku/shime1.png",
      "./assets/webmeji/miku/shime2.png",
      "./assets/webmeji/miku/shime3.png",
      "./assets/webmeji/Shimeji/shime1.png",
      "./assets/webmeji/Shimeji/shime2.png",
      "./assets/webmeji/Shimeji/shime3.png",
    ];
    sh.forEach((s) => tasks.push(preloadImage(s)));
    // Hero/splash art
    if (window.SITE_CONTENT?.images?.splashMiku)
      tasks.push(preloadImage(window.SITE_CONTENT.images.splashMiku));
    if (window.SITE_CONTENT?.images?.heroMiku)
      tasks.push(preloadImage(window.SITE_CONTENT.images.heroMiku));
    // Hint BGM element to browser cache (play still waits for user gesture)
    try {
      if (window.AudioMod && typeof AudioMod.ensureBgm === "function") {
        const a = AudioMod.ensureBgm();
        a.load?.();
      }
    } catch (_) {}
    // Let cursor module fetch same-origin ani-embeds if present
    try {
      fetch("./assets/ani-embed/index.json", { cache: "no-store" }).then(() => {});
    } catch (_) {}
    await Promise.race([Promise.all(tasks), new Promise((r) => setTimeout(r, 2000))]);
  }

  async function gateReady() {
    // Wait for critical data: MIKU images + WOD + minimal asset preload
    try {
      const waits = [];
      if (
        window.MIKU_IMAGES_READY &&
        typeof window.MIKU_IMAGES_READY.then === "function"
      )
        waits.push(window.MIKU_IMAGES_READY);
      if (window.WOD_READY && typeof window.WOD_READY.then === "function")
        waits.push(window.WOD_READY);
      waits.push(preloadCriticalAssets());
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
    // enterButton.textContent = "Loading…";

    // Play teleport sound
    if (window.SFX) {
      window.SFX.play("ui.teleport");
    }

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

    // Add fancy fade-out transition
    splash.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
    splash.style.opacity = "0";
    splash.style.transform = "scale(0.95)";

    // Wait for fade-out to complete
    await new Promise((resolve) => setTimeout(resolve, 800));

    splash.style.display = "none";
    mainSite.classList.remove("hidden");

    // Fade in the main site
    mainSite.style.opacity = "0";
    mainSite.style.transform = "scale(1.05)";
    mainSite.style.transition =
      "opacity 0.6s ease-out, transform 0.6s ease-out";

    // Trigger fade-in
    requestAnimationFrame(() => {
      mainSite.style.opacity = "1";
      mainSite.style.transform = "scale(1)";
    });

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
    { capture: true }
  );
}

// Apply language (from main.js or navigator), then expose content and init splash
(function bootstrapContent(){
  try {
    const pref = (window.PREFERRED_LANG || localStorage.getItem('site.lang') || (navigator.language||'en')).toLowerCase();
    const applied = window.I18N.apply(pref);
    window.I18N.current = applied;
    try { applySeo(applied); } catch(_) {}
  } catch (_) {
    window.SITE_CONTENT = EN_CONTENT;
  }
  initializeSplash();
})();
