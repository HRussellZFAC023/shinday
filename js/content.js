/**
 * SITE CONTENT — Edit-friendly copy and links
 *
 * How to update:
 * - Open this file on GitHub (web UI) and click the pencil icon.
 * - Change text, links, or lists below. Keep the same structure (keys) but feel free to add/remove items in arrays.
 * - Click “Commit changes”. Your site will update on the next deploy.
 */

/**
 * SITE CONTENT — Edit-friendly copy and links
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

window.SITE_CONTENT = {
    images: {
    favicon: "./assets/icon.jpg",
    ogImage: "./assets/miku_hatsune_5_by_makiilu_d4uklnz-fullview.png",
    splashMiku: "./assets/miku_hatsune_5_by_makiilu_d4uklnz-fullview.png",
    heroMiku: "./assets/hatsune_miku_render_by_jimmyisaac_d68ibgy-pre.png",
    shrineMiku: "./assets/miku_hatsune_5_by_makiilu_d4uklnz-fullview.png",
    headerBg: "./assets/pt_top.png",
    // Optional: add extra Miku image URLs (singing/idle sprites) to show in floating Mikus
    extraMikus: [
        // "https://example.com/miku1.png",
        // "https://example.com/miku2.png"
    ],
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
      sad: "./assets/pixel-miku/Hatsune Miku @illufinch 42.png", // Sad Miku for dislikes
      sparkle: "./assets/pixel-miku/Hatsune Miku @illufinch 100.png", // Special sparkly Miku for magical moments
      stage: "./assets/icons/stage.png",
      starUwu: "./assets/icons/star uwu.png",
      thumbsUp: "./assets/icons/Thumbs Up!.png",
      vibing: "./assets/icons/vibing.png",
      wallHide: "./assets/icons/wall hide.png"
    },
    // Optional swallow gif path for the swallow mascot
    swallowGif: "./assets/swallow.gif",
    statsBadges: [
      "https://stuff.charm.lu/88x31/compu.gif",
      "https://anlucas.neocities.org/88x31Buttons/notepad.gif",
    ],
    webBadges: [
      // Our own badge comes first!
      {
        src: "./assets/discordServerBanner.png",
        alt: "Baby Belle's Pixel Garden",
        link: "https://babybelle.neocities.org/",
        isOurBadge: true,
        style: "width: 88px; height: 31px; object-fit: cover; object-position: center; border-radius: 6px; box-shadow: 0 2px 6px rgba(43,43,68,0.15);"
      },
      "https://cyber.dabamos.de/88x31/best_viewed_with_eyes.gif",
      "https://cyber.dabamos.de/88x31/get_firefox.gif",
      "https://cyber.dabamos.de/88x31/made_with_windows_notepad.gif",
      "https://cyber.dabamos.de/88x31/gay_rights.gif",
      "https://cyber.dabamos.de/88x31/kawaii.gif",
      "https://cyber.dabamos.de/88x31/transnow2.gif",
    ],
  },
  site: {
    title: "Baby Belle's Pixel Garden",
    subtitle: "where sweet dreams come to life ♡ • べべベルのデジタル庭",
    htmlTitle: "Baby Belle — Pixel Miku Garden ✨",
    birthYear: birthYear,
    birthdayMonth: birthdayMonth,
    birthdayDay: birthdayDay,
  },

  splash: {
    title: "Baby Belle's Pixel Garden",
    subtitle: "Initializing kawaii protocols...",
    button: "Enter the Garden 🌳",
  },

  nav: [
    { id: "home", label: "Home", mikuIcon: "innocent" },
    { id: "socials", label: "Socials", mikuIcon: "cheering" },
    { id: "study", label: "日本語", mikuIcon: "thumbsUp" },
    { id: "games", label: "Games", mikuIcon: "vibing" },
    { id: "shrine", label: "Miku Shrine", mikuIcon: "stage" },
  ],

  status: {
    onlineLabel: "Online",
    radioOffLabel: "Radio Off", 
    radioOnLabel: "Playing",
    nowPlayingPlaceholder: "Enter current mood/song...",
    heartsLabel: "Hearts collected:",
    heartIcon: "love",
    visitorIcon: "cheering",
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
        title: "About Me & Lore",
        titleIcon: "innocent",
        theme: "bio",
        content: [
          "🇫🇮 Finland 🇸🇪 Sweden → Japan 🇯🇵",
          "꒰ঌ Internet angel ໒꒱ • Professional NEET • Super cute! 💖",
          "",
          "Baby Belle used to be an e-girl and YouTube content creator with their cat maid persona called Shin.",
          "Baby Belle is of Finnish and Swedish descent but is currently living in Japan.",
          "Baby Belle spends most of her days online as she has no friends irl."
        ],
        decorativeIcons: ["sparkle", "innocent", "love"]
      },
      {
        title: "Belle's Stats",
        titleIcon: "starUwu",
        theme: "stats",
        content: [
          "Age: Her frontal lobes have stopped growing " + yearsAgo + " years ago",
          "Height: 169 cm 📏",
          "Birthday: September 22nd 🎂",
          "Jobby: No 💸",
          "Location: Pixel Garden, Japan 🏡",
          "Energy Level: Powered by Monster Energy ⚡"
        ],
        decorativeIcons: ["starUwu", "cheering", "vibing"]
      },
      {
        title: "Belle's Heart",
        titleIcon: "love",
        theme: "feelings",
        content: [
          "I love collecting Hatsune Miku figures, kawaii aesthetics and gaming.",
          "Sometimes I get sad... so if it's all right with you, can you cheer me up too?",
          "I dont want to feel lonely or be bullied.",
          "",
          "Thank you for visiting my garden! 💙"
        ],
        decorativeIcons: ["love", "innocent", "sparkle"]
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
          "Tomato ketchup 🍝 (Don't judge!)"
        ],
        decorativeIcons: ["love", "cheering", "vibing"]
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
        decorativeIcons: ["wallHide", "sad", "innocent"]
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
          "Cosplay! 👗 (Miku cosplay when?)"
        ],
        decorativeIcons: ["jumpingStars", "vibing", "stage"]
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
          "Come back anytime to my pixel garden! 💙"
        ],
        decorativeIcons: ["sparkle", "love", "cheering", "innocent"]
      }
    ],
    
    // Legacy support for old structure
    aboutTitle: "About Me & Lore",
    aboutIcon: "innocent",
    aboutPages: [
      [
        "�🇫🇮 Finland 🇸🇪 Sweden → Japan 🇯🇵",
        "꒰ঌ Internet angel ໒꒱ • Professional NEET • Super cute! 💖",
        "",
        "Baby Belle used to be an e-girl and YouTube content creator with their cat maid persona called Shin.",
        "Baby Belle is of Finnish and Swedish descent but is currently living in Japan.",
      ],
      [
        "Baby Belle spends most of her days online as she has no friends irl.",
        "",
        "Age: Her frontal lobes have stopped growing " + yearsAgo + " years ago",
        "Height: 169 cm",
        "Birthday: September 22nd",
        "Jobby: No",
      ],
      [
        "I love collecting Hatsune Miku figures, kawaii aesthetics and gaming.",
        "Sometimes I get sad... so if it's all right with you, can you cheer me up too?",
        "I dont want to feel lonely or be bullied.",
        "",
        "Thank you for visiting my garden! 💙",
      ],
    ],
    likesTitle: "Likes",
    likesIcon: "love",
    likes: [
      "Hatsune Miku 💙",
      "Monster energy drink (not sponsored)",
      "Coffee ☕",
      "Sweets 🍰",
      "Cats 🐱",
      "Sanrio (Cinnamoroll!)",
      "Japanese fashion 👘",
      "Tomato ketchup 🍝",
    ],
    dislikesTitle: "Dislikes",
    dislikesIcon: "wallHide",
    dislikesPages: [
      [
        "Loud jump scares 🙀",
        "Spicy level 🔥🔥🔥",
        "Eating bugs 🐛🚫",
      ],
      [
        "Rude behavior ❌",
        "Being ignored 😔",
        "Broken technology 💻💔",
      ],
      [
        "Messy spaces 🗂️",
        "Long loading times ⏳",
        "Empty fridges 🥺",
      ],
    ],
    dislikes: [
      "Loud jump scares 🙀",
      "Spicy level 🔥🔥🔥",
      "Eating bugs 🐛🚫",
      "Rude behavior ❌",
    ],
    dreamsTitle: "Dreams",
    dreamsIcon: "jumpingStars",
    dreamsPages: [
      [
        "Be able to eat spicy food! 🌶️",
        "Play a scary game!",
        "Stream on Twitch! 📺",
      ],
      [
        "Get a gaming PC 🖥️",
        "Stream Content 🎥",
        "Trying Japanese food/drinks! 🍜",
      ],
      [
        "Drinking games! 🍻",
        "Play games on my Mac! 🖥️",
        "Cosplay! 👗",
      ],
    ],
    dreams: [
      "Be able to eat spicy food! 🌶️",
      "Play a scary game!",
      "Stream on Twitch! 📺", 
      "Get a gaming PC 🖥️",
      "Stream Content 🎥",
      "Trying Japanese food/drinks! 🍜",
      "Drinking games! 🍻",
      "Play games on my Mac! 🖥️",
      "Cosplay! 👗",
    ],
    dreamItemIcons: {
      1: "vibing", // Play a scary game
    },
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
    title: "Japanese Games",
    titleIcon: "thumbsUp",
    levelTitle: "Current Level",
    levelIcon: "starUwu",
    levelText: "Beginner - Working on Hiragana & basic vocab!",
    progressPercent: 35,
    wordOfDay: {
      japanese: "かわいい",
      romaji: "kawaii",
      meaning: "cute, adorable",
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
  },

  games: {
    title: "Interactive Toys",
    titleIcon: "vibing",
    memoryTitle: "Miku Memory Game",
    memoryIcon: "innocent",
    memoryReset: "Reset Game",
    heartsTitle: "Heart Collector",
    heartsIcon: "love",
    heartsZone: "Click to collect hearts!",
    heartsZoneIcon: "chuuu",
    heartsReset: "Reset",
    gachaTitle: "Miku Gacha",
    gachaIcon: "starUwu", 
    gachaOpenDex: "Open MikuDex",
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

  // Optional API endpoints for JP games (Mistval/Kotoba)
  // If you self-host the Kotoba API, set these to valid endpoints
  // Expected response shapes are flexible and adapted in code.
  jpGames: {
    api: {
      // randomVocab: "https://your-kotoba.example.com/vocab/random",
      // randomKanji: "https://your-kotoba.example.com/kanji/random",
    },
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
    text: "Hand-crafted for Baby Belle • ✨ This site is always under construction! ✨ • Cinnamoroll Approved",
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
