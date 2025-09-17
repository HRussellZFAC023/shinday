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

const EN_MIKUS = [
  {
    "id": 1,
    "name": "Hatsune Miku (Original)",
    "alt_names": [
      "Hatsune Miku"
    ],
    "description": "The classic look of Hatsune Miku in her iconic teal pigtails and futuristic schoolgirl outfit, with a silver-gray vest, pleated skirt and glowing teal accents. This is the design that started it all, capturing Miku’s cheerful and trendy style.",
    "rarity": 1,
    "links": [
      "https://vocaloid.fandom.com/wiki/Hatsune_Miku",
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku/5"
    ],
    "song": "https://www.youtube.com/watch?v=mSKTzEp1yfU",
    "title": "Miku Miku Ni Shite Ageru",
    "filename": "001 - Hatsune Miku (Original).png",
    "image": "https://img.youtube.com/vi/mSKTzEp1yfU/hqdefault.jpg"
  },
  {
    "id": 2,
    "name": "Hatsune Miku V2 (Classic)",
    "alt_names": [
      "Hatsune Miku V2",
      "Classic Miku"
    ],
    "description": "Miku’s classic 2007 look from the VOCALOID2 era. She wears the original black and teal outfit – a sleek vest, turquoise tie, pleated skirt and high boots – embodying the definitive image that made her a virtual pop idol.",
    "rarity": 1,
    "links": [
      "https://www.mikucollection.com/en/figure-details/figma-200-hatsune-miku-20/825",
      "https://vocaloid.fandom.com/wiki/Hatsune_Miku#Development"
    ],
    "song": "https://www.youtube.com/watch?v=ZK4rcMFDEJo",
    "title": "Melt",
    "filename": "002 - Hatsune Miku V2 (Classic).png",
    "image": "https://img.youtube.com/vi/ZK4rcMFDEJo/hqdefault.jpg"
  },
  {
    "id": 3,
    "name": "Hatsune Miku Append",
    "alt_names": [],
    "description": "An ethereal upgrade of Miku’s design with a futuristic twist – translucent sleeves, glowing accents and a sleek white-and-black outfit give Append Miku a softly luminescent, otherworldly charm.",
    "rarity": 3,
    "links": [
      "https://vocaloid.fandom.com/wiki/Hatsune_Miku_Append",
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-append/240"
    ],
    "song": "https://www.youtube.com/watch?v=Qq4WNC3gi9o",
    "title": "Free Open Blue Sky",
    "filename": "003 - Hatsune Miku Append.png",
    "image": "https://img.youtube.com/vi/Qq4WNC3gi9o/hqdefault.jpg"
  },
  {
    "id": 4,
    "name": "Sakura Miku (Cherries)",
    "alt_names": [
      "Sakura Miku"
    ],
    "description": "A delightful cherry blossom-themed Miku with pink hair and cherry hair-ties. Sakura Miku’s outfit is a pink recolor of her default costume adorned with flower motifs and even cherries forming a bow – a look that sends your heart soaring with feelings of spring.",
    "rarity": 2,
    "links": [
      "https://project-diva.fandom.com/wiki/Sakura_Miku",
      "https://www.mikucollection.com/en/art-gallery/sakura-miku/11"
    ],
    "song": "https://www.youtube.com/watch?v=ByG8fnWP1fc",
    "title": "Cherry Blossom Rain",
    "filename": "004 - Sakura Miku (Cherries).png",
    "image": "https://img.youtube.com/vi/ByG8fnWP1fc/hqdefault.jpg"
  },
  {
    "id": 5,
    "name": "Sakura Miku (Blossom Ponytails)",
    "alt_names": [
      "Sakura Miku"
    ],
    "description": "Another variant of Sakura Miku sporting flowing petal-pink twin-tails with white blossom patterns. Her cherry blossom uniform features extra floral accents and long ribbon ties, making this spring Miku look like a living sakura fairy.",
    "rarity": 3,
    "links": [
      "https://project-diva.fandom.com/wiki/Sakura_Miku",
      "https://www.mikucollection.com/en/art-gallery/sakura-miku/11"
    ],
    "song": "https://www.youtube.com/watch?v=vaXCJkcYpgU",
    "title": "Sakura No Ame",
    "filename": "005 - Sakura Miku (Blossom Ponytails).png",
    "image": "https://img.youtube.com/vi/vaXCJkcYpgU/hqdefault.jpg"
  },
  {
    "id": 6,
    "name": "Easter Bunny Miku",
    "alt_names": [
      "My Dear Bunny"
    ],
    "description": "Miku dresses up as a cute Easter bunny, complete with bunny ears and a pastel-colored outfit. She exudes springtime cheer – imagine her holding a basket of eggs and hopping along to spread Easter joy in this adorable ensemble.",
    "rarity": 2,
    "links": [
      "https://www.mikucollection.com/en/figure-details/hatsune-miku-2nd-season-spring-ver-crane-sega-store-limited/106",
      "https://project-diva.fandom.com/wiki/My_Dear_Bunny",
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-my-dear-bunny/169"
    ],
    "song": "https://www.youtube.com/watch?v=sCkxe4hUq_g",
    "title": "My Dear Bunny",
    "filename": "006 - Easter Bunny Miku.png",
    "image": "https://img.youtube.com/vi/sCkxe4hUq_g/hqdefault.jpg"
  },
  {
    "id": 7,
    "name": "Seifuku Miku (Sailor School Uniform)",
    "alt_names": [
      "School Miku"
    ],
    "description": "Miku in a classic Japanese sailor-style school uniform. With a navy blue pleated skirt, white sailor-collared top, and youthful energy, this look captures Miku’s charming high-school vibe perfectly.",
    "rarity": 1,
    "links": [
      "https://project-diva.fandom.com/wiki/School",
      "https://www.mikucollection.com/en/figure-details/nendoroid-381-a-hatsune-miku-sailor-uniform-ver/291"
    ],
    "song": "https://www.youtube.com/watch?v=dQImqvsjNlo",
    "title": "School Song",
    "filename": "007 - Seifuku Miku (Sailor School Uniform).png",
    "image": "https://img.youtube.com/vi/dQImqvsjNlo/hqdefault.jpg"
  },
  {
    "id": 8,
    "name": "Deep-Sea Girl Miku",
    "alt_names": [
      "Shinkai Shoujo"
    ],
    "description": "A melancholic underwater-themed Miku clad in an elegant deep blue dress. Her hair flows like the ocean currents around her, and the outfit’s frills and gradients evoke the image of a girl singing alone at the bottom of the sea.",
    "rarity": 4,
    "links": [
      "https://vocaloid.fandom.com/wiki/Deep_Sea_Girl",
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-deep-sea-girl/161"
    ],
    "song": "https://www.youtube.com/watch?v=T6kVa48UbUw",
    "title": "Deep Sea Girl",
    "filename": "008 - Deep-Sea Girl Miku.png",
    "image": "https://img.youtube.com/vi/T6kVa48UbUw/hqdefault.jpg"
  },
  {
    "id": 9,
    "name": "Black Rock Shooter Miku",
    "alt_names": [],
    "description": "A crossover variant with Miku taking on the persona of Black★Rock Shooter. She wears a sleek black coat, short shorts, and blazing blue eye – a fierce and cool alter-ego that melds Miku’s voice with a rockin’ combat-ready style.",
    "rarity": 5,
    "links": [
      "https://project-diva.fandom.com/wiki/Black%E2%98%85Rock_Shooter",
      "https://vocaloid.fandom.com/wiki/Black%E2%98%85Rock_Shooter"
    ],
    "song": "https://www.youtube.com/watch?v=qa8pCoby9Vg",
    "title": "Black Rock Shooter",
    "filename": "009 - Black Rock Shooter.png",
    "image": "https://img.youtube.com/vi/qa8pCoby9Vg/hqdefault.jpg"
  },
  {
    "id": 10,
    "name": "Hachune Miku",
    "alt_names": [
      "Negi Miku"
    ],
    "description": "The chibi parody of Miku with a simplified face and a constant open-mouthed smile. Hachune Miku is often seen waving a spring onion (negi) enthusiastically, embodying a meme-worthy and adorable side of Miku’s character.",
    "rarity": 1,
    "links": [
      "https://fanloid.fandom.com/wiki/Hachune_Miku",
      "https://www.mikucollection.com/en/figure-details/nendoroid-042-hachune-miku/308"
    ],
    "song": "https://www.youtube.com/watch?v=ZjDZrReZ4EI",
    "title": "Hatsune Miku \"Ievan Polkka\" Project Diva Dreamy Theatre (HD)",
    "filename": "010 - Hachune Miku.png",
    "image": "https://img.youtube.com/vi/ZjDZrReZ4EI/hqdefault.jpg",
    "artist": "Tamago"
  },
  {
    "id": 11,
    "name": "Miku (China Version)",
    "alt_names": [
      "Chinese Miku"
    ],
    "description": "Hatsune Miku’s Chinese-themed attire featuring a chic cheongsam-inspired dress in white and red. This version often has floral motifs and flowing sleeves, reflecting a blend of modern pop idol and traditional Chinese elegance.",
    "rarity": 3,
    "links": [
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-china-poo-ver/345"
    ],
    "song": "https://www.youtube.com/watch?v=3-kI9rDwQ8E",
    "title": "踊っチャイナ / 初音ミク, 重音テトSV",
    "filename": "011 - Miku China version.png",
    "image": "https://img.youtube.com/vi/3-kI9rDwQ8E/hqdefault.jpg",
    "artist": "Unknown"
  },
  {
    "id": 12,
    "name": "The Intense Voice of Miku (Gekishou)",
    "alt_names": [
      "Miku no Gekishou"
    ],
    "description": "A module designed for the notoriously difficult song “Hatsune Miku no Gekishou.” Miku appears almost like a digital diva vampire – a frilled gothic outfit, dramatic black-and-red color scheme, and an intense aura to match the song’s extreme energy.",
    "rarity": 5,
    "links": [
      "https://project-diva.fandom.com/wiki/The_Intense_Voice_of_Hatsune_Miku",
      "https://vocaloid.fandom.com/wiki/Hatsune_Miku_no_Gekishou"
    ],
    "song": "https://www.youtube.com/watch?v=VFtJk-vgti4",
    "title": "Hatsune Miku: Project DIVA F 2nd - [PV] \"The Intense Voice of Hatsune Miku\" (Eng Subs/Sub. Esp)",
    "filename": "012 - The Intense Voice of Hatsune Miku (Gekishou).png",
    "image": "https://img.youtube.com/vi/VFtJk-vgti4/hqdefault.jpg",
    "artist": "Unknown"
  },
  {
    "id": 13,
    "name": "World Is Mine Miku",
    "alt_names": [
      "The World Is Mine Miku"
    ],
    "description": "Inspired by the famous song, this Miku wears a princess-like look: a frilly black dress, red rose accessories, and a tiny crown perched in her hair. She looks every bit the spoiled queen of the world lounging on her plush bed, as in the original PV.",
    "rarity": 4,
    "links": [
      "https://vocaloid.fandom.com/wiki/World_is_Mine",
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-world-is-mine/190"
    ],
    "song": "https://www.youtube.com/watch?v=Ut-vNvGlvLA",
    "title": "Hatsune Miku: Project DIVA Future Tone - [PV] \"The World is Mine\" (Supreme ver.) (Rom/Eng/Esp Subs)",
    "filename": "013 - World Is Mine Miku.png",
    "image": "https://img.youtube.com/vi/Ut-vNvGlvLA/hqdefault.jpg",
    "artist": "Supercell"
  },
  {
    "id": 14,
    "name": "Rolling Girl Miku",
    "alt_names": [],
    "description": "A subdued, emotional style for the song “Rolling Girl.” Miku is depicted in a school uniform with bandages wrapping her arms – reflecting the song’s themes of struggle. Her usual bright colors are muted, showing a more troubled side of Miku’s persona.",
    "rarity": 3,
    "links": [
      "https://vocaloid.fandom.com/wiki/Rolling_Girl",
      "https://project-diva.fandom.com/wiki/Rolling_Girl"
    ],
    "song": "https://www.youtube.com/watch?v=vnw8zURAxkU",
    "title": "wowaka 【ローリンガール】 feat. 初音ミク / wowaka - Rollin Girl (Official Video) ft. Hatsune Miku",
    "filename": "014 - Rolling Girl Miku.png",
    "image": "https://img.youtube.com/vi/vnw8zURAxkU/hqdefault.jpg",
    "artist": "wowaka"
  },
  {
    "id": 15,
    "name": "Ghost Rule Miku",
    "alt_names": [],
    "description": "A darker, stylish Miku outfit themed after DECO*27’s song “Ghost Rule.” She sports a black and red ensemble with thigh-high boots and fingerless gloves. Her expression and pose hint at secrecy and frustration, matching the song’s edgy mood.",
    "rarity": 4,
    "links": [
      "https://vocaloid.fandom.com/wiki/Ghost_Rule",
      "https://project-diva.fandom.com/wiki/Ghost_Rule"
    ],
    "song": "https://www.youtube.com/watch?v=Eo7WBoA36qw",
    "title": "【MMD】ゴーストルール   Ghost Rule   ミク キク   MIKU KIKU   4K",
    "filename": "015 - Ghost Rule Miku.png",
    "image": "https://img.youtube.com/vi/Eo7WBoA36qw/hqdefault.jpg",
    "artist": "DECO*27"
  },
  {
    "id": 16,
    "name": "Yowane Haku",
    "alt_names": [],
    "description": "Not exactly Miku – Haku is a fan-created character with a moody twist on Miku’s design. She has silvery-white hair in a low ponytail, tired red eyes, and a grey-and-purple version of Miku’s outfit. Her look gives off a wistful, “failed idol” vibe that contrasts with Miku’s pep.",
    "rarity": 2,
    "links": [
      "https://vocaloid.fandom.com/wiki/Yowane_Haku",
      "https://fanloid.fandom.com/wiki/Yowane_Haku"
    ],
    "song": "https://www.youtube.com/watch?v=O5kGtsqtBLE",
    "title": "【弱音ハク V3 English / Yowane Haku V3 English】 Feel Alive 【PITCHLOID】",
    "filename": "016 - Yowane Haku.png",
    "image": "https://img.youtube.com/vi/O5kGtsqtBLE/hqdefault.jpg",
    "artist": "Caffein2"
  },
  {
    "id": 17,
    "name": "Nurse Miku (Love-Colored Ward)",
    "alt_names": [
      "Love-Colored Ward Miku"
    ],
    "description": "Dressed as a cute nurse from the song “Love-Colored Ward,” Miku wears a white nurse uniform complete with a little hat and a pink apron. The outfit is accented with hearts and medical cross symbols, giving a playful hospital theme to Miku’s normally trendy style.",
    "rarity": 3,
    "links": [
      "https://vocaloid.fandom.com/wiki/Love-Colored_Ward",
      "https://project-diva.fandom.com/wiki/Love-Colored_Ward"
    ],
    "song": "https://www.youtube.com/watch?v=oPXottYqzvw",
    "title": "【Miku Hatsune PV】 Love Ward 【VOCALOID Original Song】",
    "filename": "017 - Nurse Miku (love colored ward).png",
    "image": "https://img.youtube.com/vi/oPXottYqzvw/hqdefault.jpg"
  },
  {
    "id": 18,
    "name": "Senbonzakura Miku",
    "alt_names": [],
    "description": "A Taisho-era military uniform look from the hit song “Senbonzakura.” Miku dons a deep magenta kimono-style military outfit with a matching officer’s cap, white gloves and boots. The costume is adorned with cherry blossom emblems – a striking blend of retro and modern that captures the song’s spirit.",
    "rarity": 5,
    "links": [
      "https://vocaloid.fandom.com/wiki/Senbonzakura",
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-senbonzakura/123"
    ],
    "song": "https://www.youtube.com/watch?v=F1tWiEPc5yg",
    "title": "Hatsune Miku (prod. Kurousa-P / WhiteFlame) - Senbonzakura - Lyrics (Kan/Rom/Eng)",
    "filename": "018 - Senbonzakura Miku.png",
    "image": "https://img.youtube.com/vi/F1tWiEPc5yg/hqdefault.jpg"
  },
  {
    "id": 19,
    "name": "Saihate Miku (The Farthest End)",
    "alt_names": [],
    "description": "A somber funeral-inspired look from the song “Saihate.” Miku wears a modest black mourning dress complete with a veil. This outfit gives her a graceful, bittersweet appearance – as if she’s attending a final farewell, perfectly capturing the song’s melancholic tone.",
    "rarity": 4,
    "links": [
      "https://vocaloid.fandom.com/wiki/Saihate",
      "https://www.mikucollection.com/en/art-gallery/saihate-miku/272"
    ],
    "song": "https://www.youtube.com/watch?v=rtG9rXNdWBc",
    "title": "SAIHATE (Farthest End) Version Original Song Hatsune Miku",
    "filename": "019 - Saihate Miku (The farthest end).png",
    "image": "https://img.youtube.com/vi/rtG9rXNdWBc/hqdefault.jpg"
  },
  {
    "id": 20,
    "name": "Sand Planet Miku",
    "alt_names": [
      "Suna no Wakusei"
    ],
    "description": "Designed by artist Hachi for the song “Sand Planet,” this Miku braves a desert world. She wears tattered desert garb – earth-toned cloak, boots, and a desert hat – with a gas mask around her neck. The sand-swept, post-apocalyptic style sets her apart from her usual pop image.",
    "rarity": 5,
    "links": [
      "https://vocaloid.fandom.com/wiki/Sand_Planet",
      "https://en.wikipedia.org/wiki/Sand_Planet"
    ],
    "song": "https://www.youtube.com/watch?v=AS4q9yaWJkI",
    "title": "ハチ - 砂の惑星 feat.初音ミク , HACHI - DUNE ft.Miku Hatsune",
    "filename": "020 - Sand Planet (Suna no Wakusei) Miku.png",
    "image": "https://img.youtube.com/vi/AS4q9yaWJkI/hqdefault.jpg"
  },
  {
    "id": 21,
    "name": "Alien Alien Miku",
    "alt_names": [],
    "description": "A quirky space-alien themed Miku inspired by the song “Alien Alien.” She sports a whimsical outfit with antenna-like twin-tails accessories and vibrant neon colors. Miku looks like an adorable extraterrestrial idol ready to sing and invade hearts.",
    "rarity": 4,
    "links": [
      "https://en.wikipedia.org/wiki/Deco*27",
      "https://project-diva.fandom.com/wiki/Alien_Alien"
    ],
    "song": "https://www.youtube.com/watch?v=s_jun2mfsgM",
    "title": "【 Alien Alien! エイリアンエイリアン 】Hatsune Miku Magical Mirai 2017 初音ミク「マジカルミライ 2017」",
    "filename": "021 - Alien Alien Miku.png",
    "image": "https://img.youtube.com/vi/s_jun2mfsgM/hqdefault.jpg"
  },
  {
    "id": 22,
    "name": "Dark Angel Miku",
    "alt_names": [
      "Secret Police Miku"
    ],
    "description": "A gothic lolita-style Miku from the “Secret Police” module. She wears a frilly black dress with lace, paired with dark wings and a halo. The look is both cute and dark, perfectly matching the secretive, rebellious vibe of the song.",
    "rarity": 4,
    "links": [
      "https://project-diva.fandom.com/wiki/Dark_Angel",
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-dark-angel/78"
    ],
    "song": "https://www.youtube.com/watch?v=27vtp-2Nyfc",
    "title": "Hatsune Miku: Project DIVA Future Tone - [PV] \"Secret Police\" (Romaji/English/Español Subs)",
    "filename": "022 - Dark Angel (Secret Police).png",
    "image": "https://img.youtube.com/vi/27vtp-2Nyfc/hqdefault.jpg"
  },
  {
    "id": 23,
    "name": "March Hare Miku",
    "alt_names": [],
    "description": "A Wonderland-inspired costume where Miku takes on the guise of the March Hare. She wears a frilly outfit with bunny ears and tea party accessories. This whimsical style shortens Miku’s twintails and gives her a playful, slightly madcap look straight out of Alice’s world.",
    "rarity": 3,
    "links": [
      "https://project-diva.fandom.com/wiki/March_Hare",
      "https://vocaloid.fandom.com/wiki/LOL_-lots_of_laugh-"
    ],
    "song": "https://www.youtube.com/watch?v=A3hmEy1aMnQ",
    "title": "【MMD 4K】LOL -lots of laugh- March Hare Miku Ver. + FACIALS DL",
    "filename": "023 - March Hare Miku.png",
    "image": "https://img.youtube.com/vi/A3hmEy1aMnQ/hqdefault.jpg"
  },
  {
    "id": 24,
    "name": "Lollipop Miku",
    "alt_names": [],
    "description": "A candy-sweet module from Project DIVA X, featuring Miku in a pastel, lolita-like outfit adorned with candy motifs. She looks like a human confection, with striped stockings and a giant lollipop prop – perfectly suited to upbeat, playful songs.",
    "rarity": 3,
    "links": [
      "https://project-diva.fandom.com/wiki/LOL_-lots_of_laugh-",
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-lollipop/285"
    ],
    "song": "https://www.youtube.com/watch?v=fq4XloQyudg",
    "title": "Lollipop／feat. 初音ミク Hatsune Miku",
    "filename": "024 - Lolipop Miku.png",
    "image": "https://img.youtube.com/vi/fq4XloQyudg/hqdefault.jpg"
  },
  {
    "id": 25,
    "name": "Maneki Miku (Lucky Cat)",
    "alt_names": [
      "Lucky Cat Miku"
    ],
    "description": "Miku transforms into a lucky cat! She wears a traditional-style outfit with cat ears, a bell collar and a paw-like pose reminiscent of a maneki neko statue. With a red and white kimono and cute cat tail, this Miku promises to bring good fortune.",
    "rarity": 4,
    "links": [
      "https://www.mikucollection.com/en/art-gallery/maneki-miku/174",
      "https://www.mikucollection.com/en/art-gallery/maneki-miku-black-ver/270"
    ],
    "song": "https://www.youtube.com/watch?v=dvoystBbq7g",
    "title": "[60fps Full風] Cat Food キャットフード - Hatsune Miku 初音ミク DIVA Arcade English lyrics Romaji subtitles PDA FT",
    "filename": "025 - Maneki Miku (Lucky Cat).png",
    "image": "https://img.youtube.com/vi/dvoystBbq7g/hqdefault.jpg"
  },
  {
    "id": 26,
    "name": "Miku Symphony 2017 (Ball Gown)",
    "alt_names": [
      "Ball Gown Miku"
    ],
    "description": "An elegant symphonic concert outfit based on KEI’s illustration for Miku Symphony 2017. Miku appears in a chic black ball gown with blue lining, holding a violin. The sophisticated dress and refined smile give her a graceful, orchestra-soloist presence.",
    "rarity": 5,
    "links": [
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-symphony-2017/395",
      "https://www.mikucollection.com/en/figure-details/hatsune-miku-18-symphony-2017-ver/751"
    ],
    "song": "https://www.youtube.com/watch?v=UNLJZPcq3Zs",
    "title": "【初音ミクシンフォニー2017】未来序曲 (short ver.'17)【Mitchie M】",
    "filename": "026 - Miku Symphony 2017 (ball gown miku).png",
    "image": "https://img.youtube.com/vi/UNLJZPcq3Zs/hqdefault.jpg"
  },
  {
    "id": 27,
    "name": "Miku Symphony 2018 (Maid)",
    "alt_names": [
      "Maid Miku"
    ],
    "description": "The outfit from Miku Symphony 2018 gives Miku a demure, classical look akin to a Victorian maid or orchestra attendant. She wears a black-and-white dress with apron-like frills and musical motifs. It’s a charming blend of cute and formal, fitting for an orchestral concert setting.",
    "rarity": 4,
    "links": [
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-symphony-2018-2019/202",
      "https://www.mikucollection.com/en/figure-details/nendoroid-1039-hatsune-miku-symphony-2018-2019-ver/266"
    ],
    "song": "https://www.youtube.com/watch?v=dQLzXFpdWj0",
    "title": "【初音ミク】39みゅーじっく！【オリジナルMV】",
    "filename": "027 - Miku Symphony 2018 (maid).png",
    "image": "https://img.youtube.com/vi/dQLzXFpdWj0/hqdefault.jpg"
  },
  {
    "id": 28,
    "name": "Miku Symphony 2020 (5th Anniversary)",
    "alt_names": [],
    "description": "For the 5th Anniversary of Miku Symphony, Miku wears a special celebratory dress drawn by artist Rella. It’s a white and sky-blue gown adorned with musical notes and stars. She looks like a princess on stage, commemorating five years of symphonic performances.",
    "rarity": 5,
    "links": [
      "https://www.mikucollection.com/en/figure-details/hatsune-miku-11-symphony-5th-anniversary-ver/158",
      "https://sp.wmg.jp/mikusymphony/"
    ],
    "song": "https://www.youtube.com/watch?v=4J5KJpvgLAU",
    "title": "Hatsune Miku Symphony 2020 5th Anniversary at SUNTORY HALL",
    "filename": "028 - Miku Symphony 2020 (5th anniversary).png",
    "image": "https://img.youtube.com/vi/4J5KJpvgLAU/hqdefault.jpg"
  },
  {
    "id": 29,
    "name": "Hatsune Miku if Ver.",
    "alt_names": [],
    "description": "This design is based on Miku’s original concept art – a what-if version where she has a different outfit and even slightly brown hair. Miku if Ver. wears a stylish school-uniform-inspired dress with teal accents, offering fans a glimpse of an alternate Miku that might have been.",
    "rarity": 4,
    "links": [
      "https://vocaloid.fandom.com/wiki/Hatsune_Miku#if_Version",
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-if-ver/183"
    ],
    "song": "https://www.youtube.com/watch?v=O3L7KWOdFyM",
    "title": "Hatsune Miku - If You're Gonna Jump (English subs) [Omoi]",
    "filename": "029 - Hatsune Miku IF ver.png",
    "image": "https://img.youtube.com/vi/O3L7KWOdFyM/hqdefault.jpg"
  },
  {
    "id": 30,
    "name": "Hatsune Miku: Winter Live",
    "alt_names": [],
    "description": "An outfit worn for a special winter concert. Miku is bundled in a festive white coat with blue snowflake motifs, a fluffy scarf, and matching earmuffs. She looks warm and radiant on stage, ready to perform in a winter wonderland.",
    "rarity": 4,
    "links": [
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-winter-live/141",
      "https://www.mikucollection.com/en/figure-details/hatsune-miku-winter-live/188"
    ],
    "song": "https://www.youtube.com/watch?v=AufydOsiD6M",
    "title": "【MV】Lucky☆Orb feat. Hatsune Miku by emon(Tes.) / ラッキー☆オーブ feat. 初音ミク by emon(Tes.) 【MIKU EXPO 5th】",
    "filename": "030 - Hatsune miku winter live.png",
    "image": "https://img.youtube.com/vi/AufydOsiD6M/hqdefault.jpg"
  },
  {
    "id": 31,
    "name": "Birthday Miku (2019 Blue)",
    "alt_names": [],
    "description": "A celebratory outfit from Miku’s 12th birthday in 2019. Miku wears a frilly blue party dress with ribbons and bows, as seen in the official birthday illustration. She even holds a decorated birthday cake, overflowing with cheerful charm to mark the special day.",
    "rarity": 4,
    "links": [
      "https://vocaloid.fandom.com/wiki/Hatsune_Miku",
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-birthday-2024/235"
    ],
    "song": "https://www.youtube.com/watch?v=19y8YTbvri8",
    "title": "メズマライザー / 初音ミク・重音テトSV",
    "filename": "031 - Birthday miku (2019 blue).png",
    "image": "https://img.youtube.com/vi/19y8YTbvri8/hqdefault.jpg"
  },
  {
    "id": 32,
    "name": "Bottle Miku",
    "alt_names": [],
    "description": "A tiny, whimsical Miku derivative who literally lives in a bottle! This fan-made character has Miku with flowing liquid-blue hair enclosed inside a transparent bottle. It’s an adorable concept that imagines Miku as a magical genie or spirit in a bottle.",
    "rarity": 2,
    "links": [
      "https://fanloid.fandom.com/wiki/Bottle_Miku",
      "https://fanloid.fandom.com/wiki/Category:Fanloid"
    ],
    "song": "https://www.youtube.com/watch?v=3pmgvcZA84g",
    "title": "【Bottle Miku】Regret Message / リグレットメッセージ 【Vocaloid3】",
    "filename": "032 - Bottle Miku.png",
    "image": "https://img.youtube.com/vi/3pmgvcZA84g/hqdefault.jpg"
  },
  {
    "id": 33,
    "name": "Shiteyan'yo (Legs Miku)",
    "alt_names": [],
    "description": "A bizarre and humorous Miku derivative consisting of Miku’s head atop a pair of human legs. Shiteyan’yo is bright pink and utterly strange, born from internet humor. Though unsettling, she’s a beloved meme – a testament to Vocaloid fandom’s quirky creativity.",
    "rarity": 1,
    "links": [
      "https://fanloid.fandom.com/wiki/Shiteyan'yo",
      "https://fanloid.fandom.com/wiki/Category:Fanloid"
    ],
    "song": "https://www.youtube.com/watch?v=UyezZVAgnxw",
    "title": "Hatsune Miku: Project DIVA Future Tone - [PV] \"Ievan Polkka\"",
    "filename": "033 - Shiteyan'yo (Legs Miku).png",
    "image": "https://img.youtube.com/vi/UyezZVAgnxw/hqdefault.jpg"
  },
  {
    "id": 34,
    "name": "Love is War",
    "alt_names": [],
    "description": "Miku’s attire from the song “Love is War.” She stands atop towering speakers, wearing a tattered black dress and a long flowing scarf. With a megaphone in hand and distressed, passionate styling, this look captures the intense, rebellious emotion of the song’s story.",
    "rarity": 5,
    "links": [
      "https://vocaloid.fandom.com/wiki/Love_is_War",
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-love-is-war/184"
    ],
    "song": "https://www.youtube.com/watch?v=T4Jww4V2Q0w",
    "title": "LOVE IS WAR -初音ミク- (STEREO; Supercell)",
    "filename": "034 - Love Is War.png",
    "image": "https://img.youtube.com/vi/T4Jww4V2Q0w/hqdefault.jpg"
  },
  {
    "id": 35,
    "name": "Sweet Pumpkin Miku",
    "alt_names": [],
    "description": "A Halloween-themed module where Miku dresses up as a cute pumpkin witch. She wears an orange and purple dress with pumpkin motifs, striped witch hat, and carries a jack-o’-lantern. Sweet Pumpkin Miku is full of Halloween cheer and sugary mischief.",
    "rarity": 4,
    "links": [
      "https://project-diva.fandom.com/wiki/Sweet_Pumpkin",
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-sweet-pumpkin/92"
    ],
    "song": "https://www.youtube.com/watch?v=kSCnsTGuroM",
    "title": "Mrs.Pumpkin's Comical Dream - English & Chinese Sub - Hatsune Miku - sm8489562",
    "filename": "035 - Sweet Pumpkin Miku.png",
    "image": "https://img.youtube.com/vi/kSCnsTGuroM/hqdefault.jpg"
  },
  {
    "id": 36,
    "name": "Snow Miku 2011 (Fluffy Coat)",
    "alt_names": [
      "Fluffy Coat"
    ],
    "description": "The 2011 Snow Miku dons a fluffy white winter coat and earmuffs, looking warm and noble in the snowy Sapporo winter. Pink accents and a soft scarf complete this early Snow Miku design, bringing cozy cheer to the cold.",
    "rarity": 3,
    "links": [
      "https://project-diva.fandom.com/wiki/Snow_Miku_2011",
      "https://www.mikucollection.com/en/figure-details/nendoroid-207-snow-miku-2012-fluffy-coat-ver/323"
    ],
    "song": "https://www.youtube.com/watch?v=5I2rkQcwp9E",
    "title": "40mP ft. 初音ミク - Snow Fairy Story (English Subtitles)",
    "filename": "036 - Snow Miku 2011 (Fluffy Coat).png",
    "image": "https://img.youtube.com/vi/5I2rkQcwp9E/hqdefault.jpg"
  },
  {
    "id": 37,
    "name": "Snow Miku 2012 (Scarf)",
    "alt_names": [
      "Scarf"
    ],
    "description": "Snow Miku 2012 wears a warm light-blue coat with a fluffy hood and pom-pom ties, earning her the “Fluffy Coat” nickname. She carries the charm of winter with snowflake designs on her outfit and her hair turned silvery white.",
    "rarity": 3,
    "links": [
      "https://project-diva.fandom.com/wiki/Snow_Miku_2012",
      "https://www.mikucollection.com/en/art-gallery/snow-miku-2012/249"
    ],
    "song": "https://www.youtube.com/watch?v=6YbqME4xI00",
    "title": "sasakure.UK x DECO*27 - Snow Song Show feat. 初音ミク",
    "filename": "037 - Snow Miku 2012 (Scarf).png",
    "image": "https://img.youtube.com/vi/6YbqME4xI00/hqdefault.jpg"
  },
  {
    "id": 38,
    "name": "Snow Miku 2013 (Strawberry White Kimono)",
    "alt_names": [
      "Strawberry White Kimono"
    ],
    "description": "The 2013 Snow Miku appears in a pure white kimono adorned with strawberries and floral patterns. This “Strawberry White Kimono” design gives Miku a serene, traditional beauty, celebrating winter through a blend of snow and spring imagery.",
    "rarity": 4,
    "links": [
      "https://project-diva.fandom.com/wiki/Snow_Miku_2013",
      "https://www.mikucollection.com/en/art-gallery/snow-miku-2013/246"
    ],
    "song": "https://www.youtube.com/watch?v=aPb-MTcpNbE",
    "title": "白い雪のプリンセスは - のぼる↑ feat. 初音ミク",
    "filename": "038 - Snow Miku 2013 (Strawberry White Kimono).png",
    "image": "https://img.youtube.com/vi/aPb-MTcpNbE/hqdefault.jpg"
  },
  {
    "id": 39,
    "name": "Snow Miku 2014 (Magical Snow)",
    "alt_names": [
      "Magical Snow"
    ],
    "description": "Snow Miku 2014 takes on a magical girl motif – “Magical Snow.” She wears a cape and wizard hat decorated with stars and snowflakes, wielding a snowflake staff. This enchanting outfit turns Miku into a winter sorceress twinkling with frost magic.",
    "rarity": 4,
    "links": [
      "https://project-diva.fandom.com/wiki/Snow_Miku_2014",
      "https://www.mikucollection.com/en/art-gallery/snow-miku-2014/245"
    ],
    "song": "https://m.youtube.com/watch?v=79N1O0lF0GY",
    "title": "【SNOW MIKU 公式曲】好き！雪！本気マジック feat. 初音ミク【Mitchie M】",
    "filename": "039 - Snow Miku 2014 (Magical Snow).png",
    "image": "https://img.youtube.com/vi/79N1O0lF0GY/hqdefault.jpg"
  },
  {
    "id": 40,
    "name": "Snow Miku 2015 (Snow Bell)",
    "alt_names": [
      "Snow Bell"
    ],
    "description": "The 2015 Snow Miku, called “Snow Bell,” is themed around lily-of-the-valley flowers. Dressed in a white bell-shaped dress with green ribbons and fur trim, she embodies a gentle spirit of the snow, ready to warm you up in time for spring.",
    "rarity": 5,
    "links": [
      "https://project-diva.fandom.com/wiki/Snow_Miku_2015",
      "https://www.mikucollection.com/en/art-gallery/snow-miku-2015/244"
    ],
    "song": "https://www.youtube.com/watch?v=kt4PdOjcBzA",
    "title": "[VOCALOID] Hatsune Miku Fondant Step [Japanese Romaji English Lyrics]",
    "filename": "040 - Snow Miku 2015 (Snow Bell).png",
    "image": "https://img.youtube.com/vi/kt4PdOjcBzA/hqdefault.jpg"
  },
  {
    "id": 41,
    "name": "Snow Miku 2016 (Snow Owl Parka)",
    "alt_names": [
      "Snow Owl Parka"
    ],
    "description": "Snow Miku 2016 is winter-sports themed – she wears a cozy blue and white parka with pink accents, plus ski goggles and an owl motif on her hat. “Snow Owl Parka” Miku looks ready to hit the slopes, keeping things frosty and fun with her adventurous snow style.",
    "rarity": 5,
    "links": [
      "https://project-diva.fandom.com/wiki/Snow_Miku_2016",
      "https://www.mikucollection.com/en/art-gallery/snow-miku-2016/243"
    ],
    "song": "https://www.youtube.com/watch?v=gZL69S3kCd8",
    "title": "[Miku] Winter Alice [Eng subs]",
    "filename": "041 - Snow Miku 2016 (Snow Owl Parka).png",
    "image": "https://img.youtube.com/vi/gZL69S3kCd8/hqdefault.jpg"
  },
  {
    "id": 42,
    "name": "Snow Miku 2017 (Twinkle Constellations)",
    "alt_names": [
      "Twinkle Constellations"
    ],
    "description": "The 2017 Snow Miku, “Twinkle Constellations,” has a celestial theme. She is robed in a midnight blue cape adorned with constellations, and her outfit sparkles like the night sky over snowy fields. This design blends winter and starry wonder into one twinkling ensemble.",
    "rarity": 5,
    "links": [
      "https://project-diva.fandom.com/wiki/Snow_Miku_2017",
      "https://www.mikucollection.com/en/art-gallery/snow-miku-2017/207"
    ],
    "song": "https://www.youtube.com/watch?v=ZuT3xYLW7vA",
    "title": "【初音ミク】スターライトスノウ【オリジナルMV】",
    "filename": "042 - Snow Miku 2017 (Twinkle Constellations).png",
    "image": "https://img.youtube.com/vi/ZuT3xYLW7vA/hqdefault.jpg"
  },
  {
    "id": 43,
    "name": "Snow Miku 2018 (Crane Priestess)",
    "alt_names": [],
    "description": "Snow Miku 2018 is known as the “Crane Priestess.” She wears a traditional Japanese miko (shrine maiden) outfit with rich red and white colors, accented by crane-inspired details. This graceful design celebrates Hokkaido’s wildlife and winter spirituality.",
    "rarity": 5,
    "links": [
      "https://project-diva.fandom.com/wiki/Snow_Miku_2018",
      "https://www.mikucollection.com/en/art-gallery/snow-miku-2018/206"
    ],
    "song": "https://www.youtube.com/watch?v=KdNHFKTKX2s",
    "title": "【初音ミク】四角い地球を丸くする【オリジナルMV】",
    "filename": "043 - Snow Miku 2018 (Crane Priestess).png",
    "image": "https://img.youtube.com/vi/KdNHFKTKX2s/hqdefault.jpg"
  },
  {
    "id": 44,
    "name": "Snow Miku 2019 (Princess)",
    "alt_names": [],
    "description": "The 2019 Snow Miku appears as a “Snow Princess.” Dressed in an elegant ice-blue ball gown and a tiara, she looks every bit royalty of the winter. The outfit’s layered frills and snowflake ornaments give Miku a regal and frosty charm.",
    "rarity": 5,
    "links": [
      "https://project-diva.fandom.com/wiki/Snow_Miku_2019",
      "https://www.mikucollection.com/en/art-gallery/snow-miku-2019/203"
    ],
    "song": "https://www.youtube.com/watch?v=RHqOdDG3Jjg",
    "title": "【初音ミク】DECO*27 - AI【オリジナルMV】",
    "filename": "044 - Snow Miku 2019 (Princess).png",
    "image": "https://img.youtube.com/vi/RHqOdDG3Jjg/hqdefault.jpg"
  },
  {
    "id": 45,
    "name": "Snow Miku 2020 (Marching Orchestra)",
    "alt_names": [],
    "description": "Snow Miku 2020 marches in with a marching-band inspired outfit, hence “Marching Orchestra.” She wears a smart military jacket, music note motifs and a plumed hat. Leading a parade through the snow, this design is festive and full of musical energy.",
    "rarity": 5,
    "links": [
      "https://www.mikucollection.com/en/art-gallery/snow-miku-2020/204",
      "https://www.mikucollection.com/en/figure-details/nendoroid-1250-snow-miku-2020-snow-parade-ver/268"
    ],
    "song": "https://www.youtube.com/watch?v=LxC0kD-GuBQ",
    "title": "ぽかぽかの星 / はるまきごはん feat.初音ミク【SNOW MIKU 2020】",
    "filename": "045 - Snow Miku 2020 (Marching Orchestra).png",
    "image": "https://img.youtube.com/vi/LxC0kD-GuBQ/hqdefault.jpg"
  },
  {
    "id": 46,
    "name": "Snow Miku 2021 (Illumination)",
    "alt_names": [],
    "description": "Snow Miku 2021 shines with an “Illumination” theme. Her outfit is decorated with lights and motifs of winter illuminations – glowing bulbs, city skyline patterns, and twinkling stars. She represents the warm festive lights that brighten up long winter nights.",
    "rarity": 5,
    "links": [
      "https://www.mikucollection.com/en/art-gallery/snow-miku-2021/128",
      "https://www.mikucollection.com/en/figure-details/nendoroid-1539-snow-miku-2021-glowing-snow-ver/253"
    ],
    "song": "https://www.youtube.com/watch?v=qS6iOGX7ENU",
    "title": "【MV】Eternal Singing Angel by beat_shobon feat. Hatsune Miku【Secret Lair Collab - Winter】",
    "filename": "046 - Snow Miku 2021 (Illumination).png",
    "image": "https://img.youtube.com/vi/qS6iOGX7ENU/hqdefault.jpg"
  },
  {
    "id": 47,
    "name": "Snow Miku 2022 (Hokkaido Sea)",
    "alt_names": [],
    "description": "The 2022 Snow Miku is themed around the winter sea of Hokkaido. Her costume incorporates ocean blues, pearls and marine elements like seashell accessories. With flowing wave-like sleeves and aquatic accents, she brings the serene beauty of Hokkaido’s winter coast to life.",
    "rarity": 5,
    "links": [
      "https://www.mikucollection.com/en/art-gallery/snow-miku-2022/173",
      "https://www.mikucollection.com/en/figure-details/figma-ex-066-snow-miku-2022-grand-voyage-ver/229"
    ],
    "song": "https://www.youtube.com/watch?v=aLbRd4lemas",
    "title": "[Hatsune Miku] Winter in Hokkaido – Together in the Snow [Original]",
    "filename": "047 - Snow Miku 2022 (Hokkaido Sea).png",
    "image": "https://img.youtube.com/vi/aLbRd4lemas/hqdefault.jpg"
  },
  {
    "id": 48,
    "name": "Racing Miku 2010",
    "alt_names": [],
    "description": "The 2010 Racing Miku design – an official Good Smile Racing mascot outfit. Miku wears a bright orange and white jumpsuit with sponsor logos, long orange gloves, and orange-tinted goggles. Her twin-tails are held with orange hairbands to complete the race queen look.",
    "rarity": 4,
    "links": [
      "https://vocaloid.fandom.com/wiki/Racing_Miku",
      "https://www.mikucollection.com/en/art-gallery/racing-miku-2010/157"
    ],
    "song": "https://www.youtube.com/watch?v=Lhpz0z6QTV4",
    "title": "【PS4FT】LIKE THE WIND【Hatsune Miku：Racing Miku 2010 / MEIKO：Racing MEIKO 2010】",
    "filename": "048 - Racing Miku 2010.png",
    "image": "https://img.youtube.com/vi/Lhpz0z6QTV4/hqdefault.jpg"
  },
  {
    "id": 49,
    "name": "Racing Miku 2011",
    "alt_names": [],
    "description": "The 2011 Racing Miku module. Miku wears a sleek white and black racing outfit with neon-turquoise trim and a short see-through coat. Black boots and gloves with turquoise accents complete this futuristic race car girl look.",
    "rarity": 4,
    "links": [
      "https://vocaloid.fandom.com/wiki/Racing_Miku",
      "https://www.mikucollection.com/en/art-gallery/racing-miku-2011/162"
    ],
    "song": "https://www.youtube.com/watch?v=lQJ0yRJqdE0",
    "title": "【Hatsune Miku: Project DIVA Arcade】melody (レーシングミク 2011ver)",
    "filename": "049 - Racing Miku 2011.png",
    "image": "https://img.youtube.com/vi/lQJ0yRJqdE0/hqdefault.jpg"
  },
  {
    "id": 50,
    "name": "Racing Miku 2012",
    "alt_names": [],
    "description": "The 2012 Racing Miku outfit. A white crop-top and skirt with bold turquoise and purple accents, plus white gloves and thigh-high boots. This flashy ensemble has futuristic touches and was designed by illustrator GAN for the Super GT racing season.",
    "rarity": 4,
    "links": [
      "https://vocaloid.fandom.com/wiki/Racing_Miku",
      "https://www.mikucollection.com/en/art-gallery/racing-miku-2012/163"
    ],
    "song": "https://www.youtube.com/watch?v=KvMP_Ryb3x4",
    "title": "MMD Racing Miku 2012 Full Ver.",
    "filename": "050 - Racing Miku 2012.png",
    "image": "https://img.youtube.com/vi/KvMP_Ryb3x4/hqdefault.jpg"
  },
  {
    "id": 51,
    "name": "Racing Miku 2013",
    "alt_names": [],
    "description": "The 2013 Racing Miku design by Saitom. She sports a green and white racing mini-dress with mechanical motifs and matching gloves. The look has a sporty, energetic vibe fit for the racetrack.",
    "rarity": 4,
    "links": [
      "https://vocaloid.fandom.com/wiki/Racing_Miku",
      "https://www.mikucollection.com/en/art-gallery/racing-miku-2013/164"
    ],
    "song": "https://www.youtube.com/watch?v=fqQKt5GddPY",
    "title": "Gallop Through The World feat.Hatsune Miku - BIGHEAD \"GOODSMILE RACING THEME SONG\"",
    "filename": "051 - Racing Miku 2013.png",
    "image": "https://img.youtube.com/vi/fqQKt5GddPY/hqdefault.jpg"
  },
  {
    "id": 52,
    "name": "Racing Miku 2014",
    "alt_names": [],
    "description": "The 2014 Racing Miku outfit, designed by illustrator Koyamashigeto. It’s a blue and white racing jacket with silver trim, paired with a white miniskirt. Miku’s hair has frosty blue highlights and she dons matching boots for an official race day look.",
    "rarity": 4,
    "links": [
      "https://vocaloid.fandom.com/wiki/Racing_Miku",
      "https://www.mikucollection.com/en/art-gallery/racing-miku-2014/176"
    ],
    "song": "https://www.youtube.com/watch?v=NWJyF6UZPto",
    "title": "[MMD] Racing Miku 2014 - Come Alive",
    "filename": "052 - Racing Miku 2014.png",
    "image": "https://img.youtube.com/vi/NWJyF6UZPto/hqdefault.jpg"
  },
  {
    "id": 53,
    "name": "Racing Miku 2014 (Summer)",
    "alt_names": [],
    "description": "A summer variation of the 2014 Racing Miku design. Miku wears a sleeveless version of her blue racing outfit and a short skirt, showing a bit more skin for the hotter weather. The official colors and logos remain the same.",
    "rarity": 3,
    "links": [
      "https://vocaloid.fandom.com/wiki/Racing_Miku",
      "https://www.mikucollection.com/en/art-gallery/racing-miku-2014/176"
    ],
    "song": "https://www.youtube.com/watch?v=Si2mSBrWqes",
    "title": "[MMD] 2014 RACING MIKU - MARINE BLOOMIN [UW1440p60fps] Fog version.",
    "filename": "053 - Racing Miku 2014 summer.png",
    "image": "https://img.youtube.com/vi/Si2mSBrWqes/hqdefault.jpg"
  },
  {
    "id": 54,
    "name": "Racing Miku 2015",
    "alt_names": [],
    "description": "The 2015 Racing Miku, designed by artist Oguchi. She wears a sleek white and aqua racing jacket, with a matching pleated skirt and white boots. Her outfit includes neon accents and a blue scarf, giving a cool, modern race feel.",
    "rarity": 4,
    "links": [
      "https://vocaloid.fandom.com/wiki/Racing_Miku",
      "https://www.mikucollection.com/en/art-gallery/racing-miku-2015/179"
    ],
    "song": "https://www.youtube.com/watch?v=PP5y4yj5UhE",
    "title": "[MMD] Racing Miku 2015 - Decorator (60 FPS)",
    "filename": "054 - Racing Miku 2015.png",
    "image": "https://img.youtube.com/vi/PP5y4yj5UhE/hqdefault.jpg"
  },
  {
    "id": 55,
    "name": "Racing Miku 2015 (Summer)",
    "alt_names": [],
    "description": "A summer version of Racing Miku 2015. Miku’s jacket is shortened to a crop-top style and she swaps the full skirt for shorts. The color scheme stays in white and aqua, offering a cooler look for warm race days.",
    "rarity": 3,
    "links": [
      "https://vocaloid.fandom.com/wiki/Racing_Miku",
      "https://www.mikucollection.com/en/art-gallery/racing-miku-2015/179"
    ],
    "song": "https://www.youtube.com/watch?v=vzt19BfKRx4",
    "title": "【MMD】Gwiyomi Song 【Racing Miku 2015】",
    "filename": "055 - Racing Miku 2015 summer.png",
    "image": "https://img.youtube.com/vi/vzt19BfKRx4/hqdefault.jpg"
  },
  {
    "id": 56,
    "name": "Racing Miku 2016",
    "alt_names": [],
    "description": "The 2016 Racing Miku design. She sports a white and blue racing jacket over a black tank top, with a short layered skirt. The outfit has a sporty feel with sponsor patches, and Miku’s hair has cool cyan highlights this season.",
    "rarity": 4,
    "links": [
      "https://vocaloid.fandom.com/wiki/Racing_Miku",
      "https://www.mikucollection.com/en/art-gallery/racing-miku-2016/208"
    ],
    "song": "https://www.youtube.com/watch?v=XaaqJgcIAnM",
    "title": "【MMD】Girls - TDA Racing Miku 2015 & 2016 【1080p60】",
    "filename": "056 - Racing Miku 2016.png",
    "image": "https://img.youtube.com/vi/XaaqJgcIAnM/hqdefault.jpg"
  },
  {
    "id": 57,
    "name": "Racing Miku 2016 (Summer)",
    "alt_names": [],
    "description": "A summer variant of Racing Miku 2016. Miku wears a sleeveless zip-up top and shorter skirt, both in white and blue, with her midriff exposed. This version is meant for hot race conditions while keeping the same color scheme.",
    "rarity": 3,
    "links": [
      "https://vocaloid.fandom.com/wiki/Racing_Miku",
      "https://www.mikucollection.com/en/art-gallery/racing-miku-2016/208"
    ],
    "song": "https://www.youtube.com/watch?v=BhuxG7MrG_A",
    "title": "【PDAFT Modding】Racing Miku 2016 in AFT",
    "filename": "057 - Racing Miku 2016 summer.png",
    "image": "https://img.youtube.com/vi/BhuxG7MrG_A/hqdefault.jpg"
  },
  {
    "id": 58,
    "name": "Racing Miku 2017",
    "alt_names": [],
    "description": "The 2017 Racing Miku by artist Rio. She wears a fitted turquoise racing jacket and black shorts with white accents. The outfit features sleek lines and a visor hat, embodying speed and professionalism as the team’s mascot.",
    "rarity": 4,
    "links": [
      "https://vocaloid.fandom.com/wiki/Racing_Miku",
      "https://www.mikucollection.com/en/art-gallery/racing-miku-2017/211"
    ],
    "song": "https://www.youtube.com/watch?v=TutewG6gYAE",
    "title": "MMD: rain stops good bye (2017 Racing Miku)",
    "filename": "058 - Racing Miku 2017.png",
    "image": "https://img.youtube.com/vi/TutewG6gYAE/hqdefault.jpg"
  },
  {
    "id": 59,
    "name": "Racing Miku 2017 (Summer)",
    "alt_names": [],
    "description": "Summer variant of Racing Miku 2017. Miku’s jacket is shortened and she wears a crop-top with the same turquoise and black colors. The ensemble is completed with a short skirt and athletic boots, keeping her cool under the summer sun.",
    "rarity": 3,
    "links": [
      "https://vocaloid.fandom.com/wiki/Racing_Miku",
      "https://www.mikucollection.com/en/art-gallery/racing-miku-2017/211"
    ],
    "song": "https://www.youtube.com/watch?v=Qxz6x_j2r6E",
    "title": "【MMD】Gravity = Reality - Princess Knight Racing Miku 2015 HD 1080p",
    "filename": "059 - Racing Miku 2017 summer.png",
    "image": "https://img.youtube.com/vi/Qxz6x_j2r6E/hqdefault.jpg"
  },
  {
    "id": 60,
    "name": "Racing Miku 2017 (Spring)",
    "alt_names": [],
    "description": "Spring variant of Racing Miku 2017. Miku’s outfit features pastel colors and floral motifs on her racing jacket, blending springtime cheer with racing spirit. It’s a lighter, more decorative take on her usual uniform.",
    "rarity": 3,
    "links": [
      "https://vocaloid.fandom.com/wiki/Racing_Miku",
      "https://www.mikucollection.com/en/art-gallery/racing-miku-2017/211"
    ],
    "song": "https://www.youtube.com/watch?v=A--GzNOYEbc",
    "title": "【MMD】Sour式初音ミクで『ミュージックミュージック』4K60fps【VOCALOID】【MikuMikuDance】「Music Music」by Hatsune Miku",
    "filename": "060 - Racing Miku 2017 spring.png",
    "image": "https://img.youtube.com/vi/A--GzNOYEbc/hqdefault.jpg"
  },
  {
    "id": 61,
    "name": "Racing Miku 2018",
    "alt_names": [],
    "description": "The 2018 Racing Miku design. Miku wears a sleek white and blue racing jacket over a matching crop top and skirt. Her outfit features bold angular designs and a racing helmet, reflecting the cutting-edge style of the team.",
    "rarity": 4,
    "links": [
      "https://vocaloid.fandom.com/wiki/Racing_Miku",
      "https://www.mikucollection.com/en/art-gallery/racing-miku-2018/215"
    ],
    "song": "https://www.youtube.com/watch?v=3um8q-MboeQ",
    "title": "【MMD】グリーンライツ・セレナーデ マジカルミライVer Sour式初音ミク モーション配布",
    "filename": "061 - Racing Miku 2018.png",
    "image": "https://img.youtube.com/vi/3um8q-MboeQ/hqdefault.jpg"
  },
  {
    "id": 62,
    "name": "Racing Miku 2018 (Summer)",
    "alt_names": [],
    "description": "Summer variant of Racing Miku 2018. Miku’s long-sleeve jacket is replaced with a short vest, and her skirt is trimmed shorter. The color scheme of white and blue remains, allowing ease of movement in hot weather.",
    "rarity": 3,
    "links": [
      "https://vocaloid.fandom.com/wiki/Racing_Miku",
      "https://www.mikucollection.com/en/art-gallery/racing-miku-2018/215"
    ],
    "song": "https://www.youtube.com/watch?v=9iaggAt68v0",
    "title": "【MV】Burning!! / DIVELA 【初音ミク GTプロジェクト公式テーマソング】",
    "filename": "062 - Racing Miku 2018 summer.png",
    "image": "https://img.youtube.com/vi/9iaggAt68v0/hqdefault.jpg"
  },
  {
    "id": 63,
    "name": "Racing Miku 2019",
    "alt_names": [],
    "description": "The 2019 Racing Miku design. Miku sports a navy blue and white jacket with green accents, over a short skirt. The outfit has a sporty, aerodynamic feel, and includes a racing cap to top off the look.",
    "rarity": 4,
    "links": [
      "https://vocaloid.fandom.com/wiki/Racing_Miku",
      "https://www.mikucollection.com/en/art-gallery/racing-miku-2019/185"
    ],
    "song": "https://www.youtube.com/watch?v=kt4PdOjcBzA",
    "title": "Fondant Step",
    "filename": "063 - Racing Miku 2019.png",
    "image": "https://img.youtube.com/vi/kt4PdOjcBzA/hqdefault.jpg"
  },
  {
    "id": 64,
    "name": "Racing Miku 2019 (Summer)",
    "alt_names": [],
    "description": "Summer variant of Racing Miku 2019. The outfit’s long sleeves are replaced with a light vest, and the skirt is slightly shorter. The navy and green color scheme is kept, giving her a fresh look for summer racing.",
    "rarity": 3,
    "links": [
      "https://vocaloid.fandom.com/wiki/Racing_Miku",
      "https://www.mikucollection.com/en/art-gallery/racing-miku-2019/185"
    ],
    "song": "https://www.youtube.com/watch?v=XCyKJD6uQyg",
    "title": "【初音ミク】ビターチョコデコレーション【syudou】",
    "filename": "064 - Racing Miku 2019 summer.png",
    "image": "https://img.youtube.com/vi/XCyKJD6uQyg/hqdefault.jpg"
  },
  {
    "id": 65,
    "name": "Racing Miku 2019 (Spring)",
    "alt_names": [],
    "description": "Spring variant of Racing Miku 2019. Miku’s outfit is adorned with floral patterns and pastel highlights, celebrating springtime. The racing jacket is still present but with lighter colors and a cheerful design.",
    "rarity": 3,
    "links": [
      "https://vocaloid.fandom.com/wiki/Racing_Miku",
      "https://www.mikucollection.com/en/art-gallery/racing-miku-2019/185"
    ],
    "song": "https://www.youtube.com/watch?v=XFpI6f6XvkI",
    "title": "[KARENT Special] 初音ミク 10th Anniversary / Hatsune Miku 10th Anniversary",
    "filename": "065 - Racing Miku 2019 spring.png",
    "image": "https://img.youtube.com/vi/XFpI6f6XvkI/hqdefault.jpg"
  },
  {
    "id": 66,
    "name": "Racing Miku 2020",
    "alt_names": [],
    "description": "The 2020 Racing Miku. She wears a white and sky-blue racing jacket over a matching crop top and skirt, echoing the Good Smile Racing team colors. The ensemble looks dynamic and modern, suitable for the fast-paced GT season.",
    "rarity": 4,
    "links": [
      "https://vocaloid.fandom.com/wiki/Racing_Miku",
      "https://www.mikucollection.com/en/art-gallery/racing-miku-2020/196"
    ],
    "song": "https://www.youtube.com/watch?v=AYUNaQaDfa8",
    "title": "【MIKU EXPO 2021】Highlight by KIRA feat. Hatsune Miku【MV】",
    "filename": "066 - Racing Miku 2020.png",
    "image": "https://img.youtube.com/vi/AYUNaQaDfa8/hqdefault.jpg"
  },
  {
    "id": 67,
    "name": "Racing Miku 2020 (Summer)",
    "alt_names": [],
    "description": "Summer variant of Racing Miku 2020. Miku’s outfit is lightened for the season: a sleeveless top and shorter skirt in white and blue. The colors and sponsor logos stay the same, keeping her ready for a hot day at the track.",
    "rarity": 3,
    "links": [
      "https://vocaloid.fandom.com/wiki/Racing_Miku",
      "https://www.mikucollection.com/en/art-gallery/racing-miku-2020/196"
    ],
    "song": "https://www.youtube.com/watch?v=jsQXgDZIIrY",
    "title": "【MV】Intergalactic Bound by Yunosuke & CircusP feat. Hatsune Miku【MIKU EXPO 10th】",
    "filename": "067 - Racing Miku 2020 summer.png",
    "image": "https://img.youtube.com/vi/jsQXgDZIIrY/hqdefault.jpg"
  },
  {
    "id": 68,
    "name": "Racing Miku 2021",
    "alt_names": [],
    "description": "The 2021 Racing Miku design. She sports a white and dark blue racing jumpsuit with neon accents. The outfit has a futuristic racer look, complete with a visor helmet and aerodynamic styling.",
    "rarity": 4,
    "links": [
      "https://vocaloid.fandom.com/wiki/Racing_Miku",
      "https://www.mikucollection.com/en/art-gallery/racing-miku-2021/149"
    ],
    "song": "https://www.youtube.com/watch?v=L12K7BGVXws",
    "title": "ジェットブラック / 初音ミク【Music Video】",
    "filename": "068 - Racing Miku 2021.png",
    "image": "https://img.youtube.com/vi/L12K7BGVXws/hqdefault.jpg"
  },
  {
    "id": 69,
    "name": "Racing Miku 2021 (Summer)",
    "alt_names": [],
    "description": "Summer variant of Racing Miku 2021. Miku’s jacket and skirt are trimmed for warm weather, with the same white and blue color scheme. The outfit is sporty and breathable while still representing her racing team.",
    "rarity": 3,
    "links": [
      "https://vocaloid.fandom.com/wiki/Racing_Miku",
      "https://www.mikucollection.com/en/art-gallery/racing-miku-2021/149"
    ],
    "song": "https://www.youtube.com/watch?v=HUzLUGKwQJc",
    "title": "Odds&Ends",
    "filename": "069 - Racing Miku 2021 summer.png",
    "image": "https://img.youtube.com/vi/HUzLUGKwQJc/hqdefault.jpg"
  },
  {
    "id": 70,
    "name": "Racing Miku 2021 (Spring)",
    "alt_names": [],
    "description": "Spring variant of Racing Miku 2021. The racing suit features pastel pink highlights and floral decals, giving it a seasonal touch. Miku still wears the standard white and blue as the base for this cherry blossom-inspired look.",
    "rarity": 3,
    "links": [
      "https://vocaloid.fandom.com/wiki/Racing_Miku",
      "https://www.mikucollection.com/en/art-gallery/racing-miku-2021/149"
    ],
    "song": "https://www.youtube.com/watch?v=XFpI6f6XvkI",
    "title": "[KARENT Special] 初音ミク 10th Anniversary / Hatsune Miku 10th Anniversary",
    "filename": "070 - Racing Miku 2021 spring.png",
    "image": "https://img.youtube.com/vi/XFpI6f6XvkI/hqdefault.jpg"
  },
  {
    "id": 71,
    "name": "Rin Style (Miku as Rin)",
    "alt_names": [
      "Miku Rin"
    ],
    "description": "Miku cosplaying as Kagamine Rin, adopting Rin’s trademark yellow and black outfit and bow. Effectively a version of Rin with Miku’s face – a fun crossover style beloved by fans.",
    "rarity": 2,
    "links": [
      "https://project-diva.fandom.com/wiki/Rin_Style",
      "https://vocaloid.fandom.com/wiki/Kagamine_Rin",
      "https://project-diva.fandom.com/wiki/Kagamine_Rin"
    ],
    "song": "https://www.youtube.com/watch?v=0h8sqfo3QJ4",
    "title": "Light Song (Hibikase)",
    "filename": "071 - Rin Style (Miku as Rin).png",
    "image": "https://img.youtube.com/vi/0h8sqfo3QJ4/hqdefault.jpg"
  },
  {
    "id": 72,
    "name": "Len Style (Miku as Len)",
    "alt_names": [
      "Miku Len"
    ],
    "description": "Miku cosplaying as Kagamine Len, wearing his cool white sailor-style top, black shorts and necktie. Essentially a version of Len with Miku’s face – a fun crossover style beloved by fans.",
    "rarity": 2,
    "links": [
      "https://vocaloid.fandom.com/wiki/Kagamine_Len",
      "https://en.wikipedia.org/wiki/Kagamine_Rin_and_Len",
      "https://project-diva.fandom.com/wiki/Kagamine_Len"
    ],
    "song": "https://www.youtube.com/watch?v=nA6nMs0xnIE",
    "title": "Farewell",
    "filename": "072 - Len Style (Miku as Len).png",
    "image": "https://img.youtube.com/vi/nA6nMs0xnIE/hqdefault.jpg"
  },
  {
    "id": 73,
    "name": "Luka Style (Miku as Luka)",
    "alt_names": [
      "Miku Luka"
    ],
    "description": "Miku cosplaying as Megurine Luka, wearing Luka’s elegant black and gold dress. This mature style effectively turns Miku into a version of Luka with Miku’s face – a fun crossover style beloved by fans.",
    "rarity": 2,
    "links": [
      "https://vocaloid.fandom.com/wiki/Megurine_Luka",
      "https://en.wikipedia.org/wiki/Megurine_Luka",
      "https://project-diva.fandom.com/wiki/Megurine_Luka"
    ],
    "song": "https://www.youtube.com/watch?v=VoPzP-MwcLI",
    "title": "Just Be Friends",
    "filename": "073 - Luka Style (Miku as Luca).png",
    "image": "https://img.youtube.com/vi/VoPzP-MwcLI/hqdefault.jpg"
  },
  {
    "id": 74,
    "name": "MEIKO Style (Miku as MEIKO)",
    "alt_names": [
      "Miku MEIKO"
    ],
    "description": "Miku cosplaying as MEIKO, adopting MEIKO’s classic red outfit – a midriff-baring top and skirt. This outfit makes Miku look like a version of MEIKO with her face, celebrating the early Vocaloid era.",
    "rarity": 2,
    "links": [
      "https://vocaloid.fandom.com/wiki/MEIKO",
      "https://en.wikipedia.org/wiki/Meiko_(software)",
      "https://project-diva.fandom.com/wiki/MEIKO"
    ],
    "song": "https://www.youtube.com/watch?v=dU5scH-eWuE",
    "title": "Don't Leave",
    "filename": "074 - Meiko Style (Miku as Meiko).png",
    "image": "https://img.youtube.com/vi/dU5scH-eWuE/hqdefault.jpg"
  },
  {
    "id": 75,
    "name": "KAITO Style (Miku as KAITO)",
    "alt_names": [
      "Miku KAITO"
    ],
    "description": "Miku cosplaying as KAITO, adopting his long blue coat and matching scarf ensemble. It’s essentially a version of KAITO with Miku’s face, a fun crossover style treasured by fans.",
    "rarity": 2,
    "links": [
      "https://vocaloid.fandom.com/wiki/KAITO",
      "https://en.wikipedia.org/wiki/Kaito_(software)",
      "https://project-diva.fandom.com/wiki/KAITO"
    ],
    "song": "https://www.youtube.com/watch?v=OQz8nEKzgZs",
    "title": "Cantarella",
    "filename": "075 - Kaito Style (Miku as Kaito).png",
    "image": "https://img.youtube.com/vi/OQz8nEKzgZs/hqdefault.jpg"
  },
  {
    "id": 76,
    "name": "Teto Style (Miku as Teto)",
    "alt_names": [
      "Miku Teto"
    ],
    "description": "Miku cosplaying as Kasane Teto, wearing Teto’s signature pink twin-drill hairstyle and outfit. This playful crossover turns Miku into Teto-miku – a beloved fan mashup style.",
    "rarity": 2,
    "links": [
      "https://fanloid.fandom.com/wiki/Kasane_Teto",
      "https://project-diva.fandom.com/wiki/Kasane_Teto"
    ],
    "song": "https://www.youtube.com/watch?v=4eq6rfCjKlw",
    "title": "Kasane Teto Song",
    "filename": "076 - Tetso Kasane Style (Miku as Tetso Kasane).png",
    "image": "https://img.youtube.com/vi/4eq6rfCjKlw/hqdefault.jpg"
  },
  {
    "id": 77,
    "name": "GUMI Style (Miku as GUMI)",
    "alt_names": [
      "Miku Gumi"
    ],
    "description": "Miku cosplaying as GUMI, adopting GUMI’s orange crop-top and skirt set with green accents and goggles on her head. This style makes Miku look like GUMI with Miku’s face – a fun tribute to the vocaloid lineup.",
    "rarity": 2,
    "links": [
      "https://vocaloid.fandom.com/wiki/GUMI",
      "https://en.wikipedia.org/wiki/Megpoid"
    ],
    "song": "https://www.youtube.com/watch?v=Q_QEPrkwZ-Q",
    "title": "Coward Montblanc",
    "filename": "077 - Gumi Style Miku (Miku as Gumi).png",
    "image": "https://img.youtube.com/vi/Q_QEPrkwZ-Q/hqdefault.jpg"
  },
  {
    "id": 78,
    "name": "Hatsune Miku 10th Anniversary (Pearl Ver.)",
    "alt_names": [],
    "description": "A special outfit celebrating Miku’s 10th anniversary. Miku wears a pearlescent white dress inspired by her original costume, decorated with rainbow ribbons and the number ‘10’. This anniversary design by KEI gives her a festive, commemorative glow.",
    "rarity": 5,
    "links": [
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-10th-anniversary/95",
      "https://www.mikucollection.com/en/figure-details/hatsune-miku-10th-anniversary/748"
    ],
    "song": "https://www.youtube.com/watch?v=XFpI6f6XvkI",
    "title": "[KARENT Special] 初音ミク 10th Anniversary / Hatsune Miku 10th Anniversary",
    "filename": "078 - Hatsune Miku 10th Anniversary Pearl Ver.png",
    "image": "https://img.youtube.com/vi/XFpI6f6XvkI/hqdefault.jpg"
  },
  {
    "id": 79,
    "name": "Fairy Miku (3rd Spring)",
    "alt_names": [],
    "description": "Miku takes on the form of a spring fairy. She is adorned in a light green dress with flower petals and butterfly-like wings. This enchanting look imagines Miku as a tiny seasonal fairy bringing in the spring bloom.",
    "rarity": 3,
    "links": [
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-3rd-season-spring/69",
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-flower-fairy-nemophila/43"
    ],
    "song": "https://www.youtube.com/watch?v=1UAkQP8tytM",
    "title": "halyosy - 桜ノ雨 feat. 初音ミク",
    "filename": "079 - Fairy Miku 3rd Spring.png",
    "image": "https://img.youtube.com/vi/1UAkQP8tytM/hqdefault.jpg"
  },
  {
    "id": 80,
    "name": "Hatsune Miku: Heart×Ribbon",
    "alt_names": [],
    "description": "A cute and girly module featuring Miku in a pink, heart-themed outfit designed by Suoh. She has large ribbon ornaments in her hair and heart motifs on her dress and boots. This look is overflowing with idol-like charm and sweet, romantic style.",
    "rarity": 4,
    "links": [
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-ribbon-x-heart/63",
      "https://www.mikucollection.com/en/figure-details/hatsune-miku-spm-figure-ribbon-x-heart/124"
    ],
    "song": "https://www.youtube.com/watch?v=LE1XskraNfI",
    "title": "Heart X Ribbon",
    "filename": "080 - Hatsune Miku heart x ribbon.png",
    "image": "https://img.youtube.com/vi/LE1XskraNfI/hqdefault.jpg"
  },
  {
    "id": 81,
    "name": "Harvest Moon Miku",
    "alt_names": [],
    "description": "A serene autumn-themed outfit. Miku is dressed in a traditional harvest festival kimono with moon and rabbit motifs. The warm earthy colors and gentle design evoke the feeling of watching a harvest moon on a cool autumn night with Miku by your side.",
    "rarity": 3,
    "links": [
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-harvest-moon/226",
      "https://www.mikucollection.com/en/figure-details/hatsune-miku-18-harvest-moon-ver/744"
    ],
    "song": "https://www.youtube.com/watch?v=NT46dSsGYLY",
    "title": "Harvest Moon (Unboxing & Review)",
    "filename": "081 - Harvest moon.png",
    "image": "https://img.youtube.com/vi/NT46dSsGYLY/hqdefault.jpg"
  },
  {
    "id": 82,
    "name": "Leo/need Miku",
    "alt_names": [],
    "description": "A version of Miku as she appears in the Leo/need band of Project SEKAI. She wears a casual school band outfit – a stylish school uniform with a light cardigan and sneakers. This look highlights Miku’s approachable, band-member side when performing with Leo/need.",
    "rarity": 3,
    "links": [
      "https://projectsekai.fandom.com/wiki/Hatsune_Miku#Leo/need",
      "https://projectsekai.fandom.com/wiki/Leo/need",
      "https://www.mikucollection.com/en/figure-details/project-sekai-colorful-stage-hatsune-miku-spm-figure-school-no-sekai/135"
    ],
    "song": "https://www.youtube.com/watch?v=bst4S7UzN3s",
    "title": "Sakura No Ame",
    "filename": "082 - LeoNeed Miku.png",
    "image": "https://img.youtube.com/vi/bst4S7UzN3s/hqdefault.jpg"
  },
  {
    "id": 83,
    "name": "MiCrystal (Crystal Miku)",
    "alt_names": [
      "Crystal Miku"
    ],
    "description": "A sparkling module where Miku appears as if sculpted from crystal. Her outfit is translucent and faceted like a gemstone, refracting light into rainbows. MiCrystal Miku looks like a delicate glass statue come to life, singing with a pure, crystal-clear tone.",
    "rarity": 4,
    "links": [
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-micrystal/274",
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-crystal-dress/430"
    ],
    "song": "https://www.youtube.com/watch?v=TYIhOtAFGrE",
    "title": "Hatsune Miku - Glass Wall (OFFICIAL)",
    "filename": "083 - MiCrystal (Crystal Miku module).png",
    "image": "https://img.youtube.com/vi/TYIhOtAFGrE/hqdefault.jpg"
  },
  {
    "id": 84,
    "name": "Odds and Ends Miku",
    "alt_names": [],
    "description": "This outfit comes from ryo’s song “ODDS&ENDS.” Miku is shown in a humble mechanic-style getup – a simple white tank top, work gloves, and boots – surrounded by tools and broken robot parts. It’s a poignant look that underscores Miku’s role as a scrapped, rebuilt robot singing her heart out.",
    "rarity": 4,
    "links": [
      "https://vocaloid.fandom.com/wiki/ODDS%26ENDS",
      "https://en.wikipedia.org/wiki/Odds_%26_Ends"
    ],
    "song": "https://www.youtube.com/watch?v=HUzLUGKwQJc",
    "title": "Odds&Ends",
    "filename": "084 - Odds and Ends miku.png",
    "image": "https://img.youtube.com/vi/HUzLUGKwQJc/hqdefault.jpg"
  },
  {
    "id": 85,
    "name": "Rabbit Hole Miku",
    "alt_names": [],
    "description": "A fantastical, Alice-in-Wonderland inspired Miku. She wears a checkered dress and striped stockings, looking as if she’s just tumbled down the rabbit hole into a strange new world. This whimsical outfit blends curiosity and a hint of madness, with playing card motifs and a pocket watch accessory.",
    "rarity": 3,
    "links": [
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-rabbit-hole/160",
      "https://www.mikucollection.com/en/figure-details/nendoroid-2730-hatsune-miku-rabbit-hole-ver/321"
    ],
    "song": "https://www.youtube.com/watch?v=7vE_Bi5Sglw",
    "title": "Alice In Wonderland",
    "filename": "085 - Rabbit hole miku.png",
    "image": "https://img.youtube.com/vi/7vE_Bi5Sglw/hqdefault.jpg"
  },
  {
    "id": 86,
    "name": "Romeo and Cinderella Miku",
    "alt_names": [],
    "description": "From the song “Romeo and Cinderella,” Miku wears a vintage ball gown. It’s a lovely Victorian-style dress in shades of white and deep blue with lace gloves. This attire makes Miku look like the tragic heroine of a fairy tale, longing for love at midnight.",
    "rarity": 4,
    "links": [
      "https://vocaloid.fandom.com/wiki/Romeo_and_Cinderella",
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-romeo-and-cinderella/275"
    ],
    "song": "https://www.youtube.com/watch?v=9HrOqmiEsN8",
    "title": "Romeo And Cinderella (Music Box)",
    "filename": "086 - Romeo and Cinderella (vintage dress module).png",
    "image": "https://img.youtube.com/vi/9HrOqmiEsN8/hqdefault.jpg"
  },
  {
    "id": 87,
    "name": "Shiny Miku",
    "alt_names": [],
    "description": "A general module for Miku from project Diva! She’s bundled in a light white shirt with black trimming and a red ribbon, black denim shorts, shoes with red soles, and a red and black ribbon on the left wrist.",
    "rarity": 2,
    "links": [
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-shiny/317",
      "https://www.mikucollection.com/en/figure-details/hatsune-miku-figurizm-alpha-shiny-tr/466"
    ],
    "song": "https://www.youtube.com/watch?v=QnsZIBab1L4",
    "title": "Snowman",
    "filename": "087 - Miku winter image.png",
    "image": "https://img.youtube.com/vi/QnsZIBab1L4/hqdefault.jpg"
  },
  {
    "id": 88,
    "name": "Tell Your World Miku",
    "alt_names": [],
    "description": "Miku’s outfit from the iconic Google Chrome CM song “Tell Your World.” She wears a colorful street-fashion ensemble with a multi-layered tutu skirt splashed in rainbow paint colors. A large pair of headphones around her neck completes this artistic, world-connected look.",
    "rarity": 5,
    "links": [
      "https://vocaloid.fandom.com/wiki/Tell_Your_World",
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-tell-your-world/413"
    ],
    "song": "https://www.youtube.com/watch?v=B2fRMQUxnyw",
    "title": "HATSUNE MIKU: COLORFUL STAGE! - Tell Your World by livetune 3D Music Video - Virtual Singer",
    "filename": "088 - Tell your world.png",
    "image": "https://img.youtube.com/vi/B2fRMQUxnyw/hqdefault.jpg"
  },
  {
    "id": 89,
    "name": "Sakura no Ame Miku (Cherry-Petal Uniform)",
    "alt_names": [],
    "description": "From the graduation song “Sakura no Ame,” Miku is portrayed in a Japanese high school graduation uniform. She wears a pink cherry-blossom colored blazer and skirt with a red ribbon, standing under falling sakura petals. This look is sentimental and gentle, representing farewells and new beginnings in spring.",
    "rarity": 3,
    "links": [
      "https://vocaloid.fandom.com/wiki/Sakura_no_Ame",
      "https://project-diva.fandom.com/wiki/Sakura_no_Ame"
    ],
    "song": "https://www.youtube.com/watch?v=ByG8fnWP1fc",
    "title": "Sakura No Ame",
    "filename": "089 - Sakura no Ame Miku (Cherry-Petal Uniform).png",
    "image": "https://img.youtube.com/vi/ByG8fnWP1fc/hqdefault.jpg"
  },
  {
    "id": 90,
    "name": "Zatsune Miku",
    "alt_names": [],
    "description": "Miku’s infamous dark counterpart. Zatsune Miku has long black hair with red highlights instead of teal, red eyes, and a black variation of Miku’s outfit. She emanates a sinister aura – an alternate, more hostile personality of Miku born from fan imagination.",
    "rarity": 4,
    "links": [
      "https://fanloid.fandom.com/wiki/Zatsune_Miku",
      "https://fanloid.fandom.com/wiki/Category:Derivative"
    ],
    "song": "https://www.youtube.com/watch?v=jL9z8cL_u2M",
    "title": "Amazing Dolce (Fanloid Cover)",
    "filename": "090 - Zatsune miku.png",
    "image": "https://img.youtube.com/vi/jL9z8cL_u2M/hqdefault.jpg"
  },
  {
    "id": 91,
    "name": "Magical Mirai 2013 (Magician Top-Hat)",
    "alt_names": [],
    "description": "Miku’s signature outfit from Magical Mirai 2013. Miku acts as a magical circus magician, complete with a silk top hat, cape and wand. She looks ready to dazzle the crowd with stage magic and song.",
    "rarity": 5,
    "links": [
      "https://vocaloid.fandom.com/wiki/Magical_Mirai_2013",
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-magical-mirai-2013/140"
    ],
    "song": "https://www.youtube.com/watch?v=kvnIFo3xMfY",
    "title": "Miracle Paint",
    "filename": "091 - Magical Mirai 2013 (Magician Top-Hat).png",
    "image": "https://img.youtube.com/vi/kvnIFo3xMfY/hqdefault.jpg"
  },
  {
    "id": 92,
    "name": "Magical Mirai 2014 (Future Ribbon)",
    "alt_names": [],
    "description": "Miku’s signature outfit from Magical Mirai 2014. A futuristic outfit characterized by an oversized ribbon that ties her hair. The design blends a sci-fi feel with cute idol elements, representing Miku’s ever-evolving future.",
    "rarity": 5,
    "links": [
      "https://vocaloid.fandom.com/wiki/Magical_Mirai_2014",
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-magical-mirai-2014/251"
    ],
    "song": "https://www.youtube.com/watch?v=zweVJrnE1uY",
    "title": "Decorator",
    "filename": "092 - Magical Mirai 2014 (Future Ribbon).png",
    "image": "https://img.youtube.com/vi/zweVJrnE1uY/hqdefault.jpg"
  },
  {
    "id": 93,
    "name": "Magical Mirai 2015 (Plaid Crown)",
    "alt_names": [],
    "description": "Miku’s signature outfit from Magical Mirai 2015. Miku wears a plaid-themed outfit with a crown or tiara. The plaid pattern adds a modern pop style, and the small crown signifies her status as the queen of the event.",
    "rarity": 5,
    "links": [
      "https://vocaloid.fandom.com/wiki/Magical_Mirai_2015",
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-magical-mirai-2015/229"
    ],
    "song": "https://www.youtube.com/watch?v=hbRSSWgz7Vs",
    "title": "Sweet Devil - Hatsune Miku Magical Mirai 2015",
    "filename": "093 - Magical Mirai 2015 (Plaid Crown).png",
    "image": "https://img.youtube.com/vi/hbRSSWgz7Vs/hqdefault.jpg"
  },
  {
    "id": 94,
    "name": "Magical Mirai 2016 (Blue Parade)",
    "alt_names": [],
    "description": "Miku’s signature outfit from Magical Mirai 2016. A marching band style costume in royal blue. Miku looks like a parade drum major, leading the celebration in a military-style jacket and parade hat decorated in blue.",
    "rarity": 5,
    "links": [
      "https://vocaloid.fandom.com/wiki/Magical_Mirai_2016",
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-magical-mirai-2016/228"
    ],
    "song": "https://www.youtube.com/watch?v=OuLZlZ18APQ",
    "title": "39 Music!",
    "filename": "094 - Magical Mirai 2016 (Blue Parade).png",
    "image": "https://img.youtube.com/vi/dQLzXFpdWj0/hqdefault.jpg"
  },
  {
    "id": 95,
    "name": "Magical Mirai 2017 (Sailor Lab)",
    "alt_names": [],
    "description": "Miku’s signature outfit from Magical Mirai 2017. A unique concept mixing a sailor-style school uniform with a science lab coat. Miku’s outfit has a sailor collar and pleats alongside technical, lab-like details, symbolizing both youth and innovation.",
    "rarity": 5,
    "links": [
      "https://vocaloid.fandom.com/wiki/Magical_Mirai_2017",
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-magical-mirai-2017/201"
    ],
    "song": "https://www.youtube.com/watch?v=i3wMD3oHRg8",
    "title": "砂の惑星 (Sand Planet)",
    "filename": "095 - Magical Mirai 2017 (Sailor Lab).png",
    "image": "https://img.youtube.com/vi/i3wMD3oHRg8/hqdefault.jpg"
  },
  {
    "id": 96,
    "name": "Magical Mirai 2018 (Harlequin Circus)",
    "alt_names": [],
    "description": "Miku’s signature outfit from Magical Mirai 2018. This design gives Miku a playful circus performer look. She has harlequin diamond patterns on her dress, a jester-like collar, and colorful circus-themed accessories, embodying the carnival atmosphere.",
    "rarity": 5,
    "links": [
      "https://vocaloid.fandom.com/wiki/Magical_Mirai_2018",
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-magical-mirai-2018/200"
    ],
    "song": "https://www.youtube.com/watch?v=XSLhsjepelI",
    "title": "Greenlights Serenade",
    "filename": "096 - Magical Mirai 2018 (Harlequin Circus).png",
    "image": "https://img.youtube.com/vi/XSLhsjepelI/hqdefault.jpg"
  },
  {
    "id": 97,
    "name": "Magical Mirai 2019 (Star Crown)",
    "alt_names": [],
    "description": "Miku’s signature outfit from Magical Mirai 2019. Miku’s outfit features star motifs and she wears a shining star crown on her head. The costume is elegant and cosmic, celebrating the theme of stars and guidance as Magical Mirai hits new heights.",
    "rarity": 5,
    "links": [
      "https://vocaloid.fandom.com/wiki/Magical_Mirai_2019",
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-magical-mirai-2019/192"
    ],
    "song": "https://www.youtube.com/watch?v=-m0TzM5urbo",
    "title": "Bless Your Breath",
    "filename": "097 - Magical Mirai 2019 (Star Crown).png",
    "image": "https://img.youtube.com/vi/-m0TzM5urbo/hqdefault.jpg"
  },
  {
    "id": 98,
    "name": "Magical Mirai 2020 (Marching Band)",
    "alt_names": [],
    "description": "Miku’s signature outfit from Magical Mirai 2020. Mirroring a band leader’s attire with a bright red marching band uniform and a plume hat. Despite the challenges of 2020, this outfit exudes determination and unity through music.",
    "rarity": 5,
    "links": [
      "https://vocaloid.fandom.com/wiki/Magical_Mirai_2020",
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-magical-mirai-2020-winter-festival/57"
    ],
    "song": "https://www.youtube.com/watch?v=ygY2qObZv24",
    "title": "愛されなくても君がいる (Because You’re Here)",
    "filename": "098 - Magical Mirai 2020 (Marching Band).png",
    "image": "https://img.youtube.com/vi/ygY2qObZv24/hqdefault.jpg"
  },
  {
    "id": 99,
    "name": "Magical Mirai 2021 (Future Lab)",
    "alt_names": [],
    "description": "Miku’s signature outfit from Magical Mirai 2021. Miku dons a sleek white and teal outfit resembling a science lab coat fused with futuristic fashion. Goggles and techy patterns accent the design, capturing the forward-looking spirit of that year’s event.",
    "rarity": 5,
    "links": [
      "https://vocaloid.fandom.com/wiki/Magical_Mirai_2021",
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-magical-mirai-2021/155"
    ],
    "song": "https://www.youtube.com/watch?v=2kZVEUGLgy4",
    "title": "METEOR",
    "filename": "099 - Magical Mirai 2021 (Future Lab).png",
    "image": "https://img.youtube.com/vi/2kZVEUGLgy4/hqdefault.jpg"
  },
  {
    "id": 100,
    "name": "Magical Mirai 2022 (10th Anniv. Pastel)",
    "alt_names": [],
    "description": "Miku’s signature outfit from Magical Mirai 2022. For Magical Mirai’s 10th anniversary, Miku wears a soft pastel-colored ensemble that incorporates elements from past years’ designs. It’s a celebratory, all-star outfit – pastel rainbow dress, anniversary logo, and joyful nods to her decade of Magical Mirai.",
    "rarity": 5,
    "links": [
      "https://vocaloid.fandom.com/wiki/Magical_Mirai_2022",
      "https://www.mikucollection.com/en/art-gallery/hatsune-miku-magical-mirai-2022-10th-anniversary/115"
    ],
    "song": "https://www.youtube.com/watch?v=PggKYZyI0SU",
    "title": "Melt (Live)",
    "filename": "100 - Magical Mirai 2022 (10th Anniv. Pastel).png",
    "image": "https://img.youtube.com/vi/PggKYZyI0SU/hqdefault.jpg"
  },
  {
    "id": 101,
    "name": "PixieBel (Bonus)",
    "alt_names": [],
    "description": "A tiny baby belle who flutters with sparkle and joy. This secret companion celebrates collectors who complete the garden.",
    "rarity": 6,
    "song": "https://www.youtube.com/watch?v=XEvMo8vyYU0",
    "title": "A very FESTIVE Hatsune Miku Jingle Bells SPECIAL",
    "filename": "101 - PixieBel (bonus).gif",
    "image": "https://img.youtube.com/vi/XEvMo8vyYU0/hqdefault.jpg",
    "links": [
      "https://vocaloid.fandom.com/wiki/Hatsune_Miku",
      "https://www.crypton.co.jp/miku_eng"
    ]
  }
];
const MIKU_DESCRIPTION_I18N = {
  "ja": {
    "1": "初音ミクのアイコニックなティールピグテールと未来的な女子生徒の服装、シルバーグレーのベスト、プリーツスカート、輝くティールアクセントのクラシックな外観。ミクの陽気でトレンディなスタイルを捉えた、すべての始まりとなったデザインです。",
    "2": "VOCALOID 2時代のミクのクラシックな2007年のルック。彼女はオリジナルのブラックとティールのファッションを着ています。洗練されたベスト、ターコイズのネクタイ、プリーツスカート、ハイブーツなど、彼女をバーチャルポップアイドルにした決定的なイメージを体現しています。",
    "3": "半透明の袖、輝くアクセント、洗練された白と黒の服装など、未来的なひねりを加えたMikuのデザインのエレガントなアップグレードは、Append Mikuに柔らかい発光、異世界の魅力を与えます。",
    "4": "ピンクの髪と桜の髪を結んだ、桜をテーマにした楽しいミク。サクラミクの衣装は、花のモチーフや蝶結びをしたチェリーで飾られたデフォルトの衣装をピンク色に再着色したもので、春の気分で心が高く舞い上がるような表情をしています。",
    "5": "白い花柄の花びらピンクのツインテールを流れるサクラミクのもう一つのバリエーション。彼女の桜のユニフォームは、余分な花柄のアクセントと長いリボンのネクタイが特徴で、この春のミクは生きた桜の妖精のように見えます。",
    "6": "ミクは、バニーの耳とパステルカラーの服装で、かわいいイースターバニーのような服装をしています。彼女は春の歓声を醸し出しています。彼女が卵のバスケットを持って、このかわいいアンサンブルでイースターの喜びを広げようとしているところを想像してみてください。",
    "7": "古典的な日本のセーラースタイルの学校制服を着たミク。ネイビーブルーのプリーツスカート、白いセーラーカラーのトップス、若々しいエネルギーを備えたこのルックは、ミクの魅力的な高校の雰囲気を完璧に捉えています。",
    "8": "エレガントな紺色のドレスに身を包んだ、憂鬱な水中テーマのミク。彼女の髪は周囲の海流のように流れ、衣装のフリルとグラデーションは、海の底で一人で歌う少女のイメージを呼び起こします。",
    "9": "ミクが★ブラックロックシューターのペルソナを引き継ぐクロスオーバーバリエーション。彼女は洗練された黒いコート、短いショートパンツ、そして灼熱の青い目を身に着けています。ミクの声とロッキンな戦闘準備スタイルを融合させた、猛烈でクールなオルタエゴです。",
    "10": "シンプルな顔と絶え間ない口を開いた笑顔を持つミクのチビパロディ。ハチューンミクは、ミクのキャラクターのミームにふさわしく愛らしい側面を体現し、春ネギ（ネギ）を熱心に振っているのがよく見られます。",
    "11": "白と赤のシックなチャイナドレスをあしらった初音ミクの中国をテーマにした衣装。このバージョンは、多くの場合、花柄のモチーフと流れるような袖を持ち、モダンなポップアイドルと伝統的な中国のエレガンスのブレンドを反映しています。",
    "12": "難易度の高い曲「初音ミクの劇場」のためにデザインされたモジュール。「ミクはまるでデジタル女優の吸血鬼のように見えます。フリルのゴシック様式の衣装、ドラマチックな黒と赤の配色、そして曲の極端なエネルギーに合わせた強烈なオーラです。",
    "13": "この有名な歌に触発されたこのミクは、フリルの効いた黒いドレス、赤いバラのアクセサリー、髪に小さな王冠をかぶった王女のような外観をしています。彼女は、オリジナルのPVのように、ぬいぐるみのベッドの上でくつろいでいる、甘やかされた世界の女王のように見えます。",
    "14": "曲「ローリングガール」の控えめでエモーショナルなスタイル。「ミクは学校の制服を着て、腕に包帯を巻いて描かれています。これは、歌の闘争のテーマを反映しています。彼女のいつもの明るい色はミクのペルソナのより悩ましい側面を示しています。",
    "15": "DECO * 27の曲「ゴーストルール」をテーマにした、ダークでスタイリッシュなミクのファッション。「彼女は太ももの高さのブーツと指のない手袋を身につけた黒と赤のアンサンブルを着けています。彼女の表情と姿勢は、秘密と欲求不満をほのめかし、曲のエッジの効いた雰囲気にマッチしています。",
    "16": "正確にはミクではありません–ハクはミクのデザインにムーディーなひねりを加えたファンが作成したキャラクターです。低いポニーテールの銀白色の髪、疲れた赤い目、そしてミクの衣装のグレーとパープルのバージョンを持っています。彼女の表情は、ミクの活気とは対照的な、憧れの「失敗したアイドル」の雰囲気を放ちます。",
    "17": "ミクは「愛の色の病棟」のかわいい看護婦の格好をして、小さな帽子とピンクのエプロンを備えた白い看護婦のユニフォームを着ています。ハートと医療用クロスシンボルがアクセントになっており、ミクの通常のトレンディなスタイルに遊び心のある病院のテーマを与えています。",
    "18": "ヒット曲「千本桜」からの大正時代の軍服の表情。「ミクは、将校の帽子、白い手袋、ブーツを合わせた深いマゼンタの着物スタイルの軍服を着ています。コスチュームには、レトロとモダンの印象的なブレンドである桜のエンブレムが飾られており、歌の精神を捉えています。",
    "19": "「サイハテ。「ミクは、ベール付きの控えめな黒い喪服を着ています。この服装は、彼女に優雅でほろ苦い外観を与えます。まるで彼女が最後の別れに出席しているかのように、歌のメランコリックなトーンを完璧に捉えています。",
    "20": "アーティストHachiが「Sand Planet」のためにデザインしたこのミクは、砂漠の世界に勇敢に立ち向かいます。彼女はアーストーンのマント、ブーツ、砂漠の帽子など、荒れ果てた砂漠の服を着ており、首にはガスマスクをつけています。砂に覆われた黙示録的なスタイルは、いつものポップなイメージとは一線を画しています。",
    "21": "「エイリアン・エイリアン」という歌にインスパイアされた、風変わりな宇宙人をテーマにしたミク。「アンテナのようなツインテールアクセサリーと鮮やかなネオンカラーで、気まぐれな服装をしています。ミクは、歌ってハートに侵入する準備ができているかわいい地球外のアイドルのように見えます。",
    "22": "「シークレットポリス」モジュールのゴシックロリータスタイルのミク。彼女はレース付きのフリル入りの黒いドレスを着ており、ダークな羽とハローを合わせています。ルックはかわいくてダークで、歌の秘密主義的で反抗的な雰囲気に完璧にマッチしています。",
    "23": "ミクがマーチ・ウサギを装ったワンダーランド風のコスチューム。彼女はバニーの耳とティーパーティーアクセサリーを備えたフリルっぽい服装をしています。この気まぐれなスタイルは、ミクのツインテールを短くし、彼女にアリスの世界からまっすぐに遊び心のある、少し狂った外観を与えます。",
    "24": "Project DIVA Xのキャンディスイートモジュールで、ミクがパステル調のロリータのような衣装でキャンディーモチーフで飾られています。彼女はストライプのストッキングと巨大なロリポップ小道具を備えた人間の菓子のように見えます。明るくて遊び心のある曲に最適です。",
    "25": "ミクがラッキーキャットに変身！猫の耳、ベルカラー、マネキネコ像を思わせる足のようなポーズの伝統的なスタイルの服を着ています。赤と白の着物とかわいい猫のしっぽで、このミクは幸運をもたらすことを約束します。",
    "26": "Miku Symphony 2017のKEIのイラストを基にしたエレガントなシンフォニックコンサートの衣装。ミクは、ヴァイオリンを持った青い裏地のシックな黒いボールガウンを着て登場します。洗練されたドレスと洗練された笑顔は、彼女に優雅でオーケストラソロのような存在感を与えます。",
    "27": "Miku Symphony 2018の衣装は、Mikuにビクトリア朝のメイドやオーケストラのアテンダントに似た控えめでクラシックな外観を与えます。エプロンのようなフリルと音楽をモチーフにした白黒のドレスを着ています。かわいくてフォーマルな、オーケストラコンサートにぴったりの魅力的なブレンドです。",
    "28": "ミクシンフォニー5周年を記念して、ミクはアーティストのレラが描いた特別なお祝いのドレスを着ています。ミュージカルノートとスターが飾られた、白とスカイブルーのガウンです。彼女は5年間の交響曲の演奏を記念して、ステージ上の王女のように見えます。",
    "29": "このデザインは、ミクのオリジナルのコンセプトアートに基づいています。彼女は異なる服装をしており、わずかに茶色の髪をしています。Miku if Ver.は、スタイリッシュな学校の制服にインスパイアされたドレスを着て、ティールアクセントで、ファンに代替ミクの可能性を垣間見せます。",
    "30": "特別な冬のコンサートのために着用される衣装。ミクは、青い雪の結晶をモチーフにしたお祝いの白いコート、ふわふわのスカーフ、そしてマッチングしたイヤーマフに束ねられています。彼女はステージ上で暖かくて輝いているように見え、冬のワンダーランドで演奏する準備ができています。",
    "31": "2019年ミクの12歳の誕生日を祝う衣装。ミクは、公式の誕生日のイラストに見られるように、リボンとリボンのフリルブルーのパーティードレスを着ています。彼女は特別な日を祝うために陽気な魅力であふれたデコレーションされたバースデーケーキを持っています。",
    "32": "文字通り瓶の中に住んでいる、ちっぽけで気まぐれなミク派生品！透明なボトルの中に流れるような青髪のミクが入ったファンメイドのキャラクター。ミクを魔法の妖精や瓶の中の精霊と想像するかわいいコンセプトです。",
    "33": "人間の足の上にミクの頭を乗せた奇妙でユーモラスなミクの派生物。Shiteyan 'yoは鮮やかなピンク色で、インターネットのユーモアから生まれました。不安はあるものの、彼女は愛されているミームであり、ボーカロイドファンダムの風変わりな創造性の証です。",
    "34": "ミクの服装は「愛は戦争だ。「彼女はぼろぼろの黒いドレスと長く流れるようなスカーフを身に着けて、高くそびえ立つスピーカーの上に立っています。メガホンが手元にあり、苦悩した情熱的なスタイリングで、このルックは曲のストーリーの強烈で反抗的な感情を捉えています。",
    "35": "ミクがかわいいカボチャの魔女に扮したハロウィンをテーマにしたモジュール。彼女はカボチャのモチーフのオレンジと紫のドレスを着て、ストライプの魔女の帽子をかぶり、ジャックランタンを持っています。Sweet Pumpkin Mikuは、ハロウィーンの歓声と甘いいたずらでいっぱいです。",
    "36": "2011年の雪ミクは、ふわふわの白い冬のコートとイヤーマフを着て、雪の降る札幌の冬に暖かく高貴に見えます。ピンクのアクセントと柔らかいスカーフがこの初期のスノーミクデザインを完成させ、寒さに心地よい応援をもたらします。",
    "37": "Snow Miku 2012は、ふわふわのフードとポンポンのネクタイを備えた暖かいライトブルーのコートを着ており、「ふわふわのコート」のニックネームを得ています。スノーフレークデザインを衣装に施した冬の魅力を持ち、髪の毛が銀白に変わりました。",
    "38": "2013年のスノーミクは、イチゴと花柄で飾られた純白の着物で登場します。この「ストロベリーホワイトキモノ」のデザインは、雪と春のイメージを融合させて冬を祝う、穏やかで伝統的な美しさをミクに与えます。",
    "39": "スノーミク2014は、魔法少女をモチーフにした「魔法の雪。「彼女は星と雪の結晶で飾られたマントと魔法使いの帽子をかぶり、雪の結晶の杖を振り回しています。この魅惑的な衣装は、ミクを霜の魔法できらめく冬の魔女に変えます。",
    "40": "「雪の鐘」と呼ばれる2015年の雪ミクは、渓谷のユリの花をテーマにしています。緑色のリボンと毛皮のトリミングが施された白い鐘型のドレスを着た彼女は、雪の優しい精神を体現し、春に間に合うようにあなたを暖める準備ができています。",
    "41": "Snow Miku 2016はウィンタースポーツをテーマにしています。彼女はピンクのアクセントのある居心地の良い青と白のパーカーを着て、スキーゴーグルとフクロウのモチーフを帽子にしています。「スノーオウル・パーカ」ミクは、冒険的なスノースタイルで凍りつき、楽しいものを保ちながら、ゲレンデに登ろうとしています。",
    "42": "2017年のスノーミク「キラキラ星座」は、天体をテーマにしています。星座が飾られた真夜中の青いケープに身を包み、雪原の夜空のような輝きを放っています。このデザインは、冬と星空の不思議を1つのきらめくアンサンブルにブレンドしています。",
    "43": "Snow Miku 2018は「鶴の巫女」として知られています。「彼女は、鶴にインスパイアされたディテールでアクセントになった、豊かな赤と白の色合いの伝統的な日本の巫女服を着ています。北海道の野生動物と冬の霊性を祝う優雅なデザイン。",
    "44": "2019年の雪ミクは「雪の王女」として登場します。「エレガントなアイスブルーのボールガウンとティアラを着て、彼女は冬の王族のように見えます。重ね着されたフリルと雪の結晶の飾りは、ミクに豪華で凍てつく魅力を与えます。",
    "45": "Snow Miku 2020は、マーチングバンドにインスパイアされた衣装で行進し、「マーチングオーケストラ。「彼女はスマートなミリタリージャケット、ミュージックノートのモチーフ、プルーム入りの帽子を着ています。雪の中をパレードをリードするこのデザインは、お祭り気分で音楽的なエネルギーに満ち溢れています。",
    "46": "Snow Miku 2021は「イルミネーション」をテーマに輝いています。彼女の衣装は、明るい電球、街のスカイラインパターン、きらめく星など、冬のイルミネーションのライトとモチーフで飾られています。彼女は長い冬の夜を明るくする暖かいお祝いの光を表しています。",
    "47": "2022年の雪ミクは、北海道の冬の海をテーマにしています。彼女のコスチュームには、オーシャンブルー、パール、貝殻アクセサリーなどの海洋要素が組み込まれています。流れるような波のような袖と水生のアクセントで、北海道の冬の海岸の穏やかな美しさを生き生きとしたものにしています。",
    "48": "2010年レーシングミクデザイン–公式グッドスマイルレーシングのマスコット衣装。ミクさんは、スポンサーロゴ付きの明るいオレンジと白のジャンプスーツ、長いオレンジ色の手袋、オレンジ色のゴーグルを着用しています。彼女のツインテールは、レースクイーンの外観を完成させるためにオレンジ色のヘアバンドで保持されています。",
    "49": "2011 Racing Mikuモジュール。ミクは、ネオンターコイズのトリムと短いシースルーコートを備えた、洗練された白と黒のレーシングファッションを着ています。ターコイズアクセントの黒いブーツと手袋が、この未来的なレーシングカーの女の子のルックを完成させます。",
    "50": "2012年のレーシングミクの衣装。白いクロップトップとスカート、大胆なターコイズとパープルのアクセント、そして白い手袋と太ももの高さのブーツ。この派手なアンサンブルには未来的なタッチがあり、イラストレーターのガンがスーパーGTレースシーズンのためにデザインしました。",
    "51": "Saitomによる2013年のレーシングミクデザイン。彼女は、機械的なモチーフとマッチング手袋を備えた緑と白のレーシングミニドレスを着用しています。このルックは、レーストラックにフィットするスポーティでエネルギッシュな雰囲気を持っています。",
    "52": "イラストレーターのコヤマシゲトがデザインした2014年のレーシングミクの衣装。シルバーのトリムを施した青と白のレーシングジャケットで、白のミニスカートと組み合わせています。ミクの髪には霜のような青いハイライトがあり、彼女は公式のレースデイルックのためにマッチングブーツを着用しています。",
    "53": "2014 Racing Mikuデザインの夏のバリエーション。ミクは、青いレーシングファッションのノースリーブバージョンと短いスカートを着ており、暑い季節のためにもう少し肌を見せています。公式カラーとロゴは変わりません。",
    "54": "2015年のレーシングミクは、アーティストの大口がデザインしました。彼女は洗練された白とアクアのレーシングジャケットを着ており、マッチするプリーツスカートと白いブーツを着ています。彼女の衣装には、ネオンアクセントとブルーのスカーフが含まれており、クールでモダンなレースの雰囲気を与えています。",
    "55": "Racing Miku 2015の夏バージョン。ミクのジャケットはクロップトップスタイルに短縮されており、フルスカートをショートパンツに交換しています。配色は白とアクアのままで、暖かいレースの日にはよりクールな外観を提供します。",
    "56": "2016 Racing Mikuのデザイン。彼女は黒いタンクトップの上に白と青のレーシングジャケットを着ており、短いレイヤードスカートを着ています。スポンサーパッチでスポーティな雰囲気を演出し、ミクの髪には今シーズンのクールなシアンのハイライトが施されています。",
    "57": "Racing Miku 2016の夏のバリエーション。ミクは、白と青の両方のノースリーブジップアップトップと短いスカートを着て、ミッドリフを露出させています。このバージョンは、同じ配色を維持しながら、熱い競争条件のために意図されています。",
    "58": "アーティストRioの2017 Racing Miku。彼女はフィットしたターコイズ色のレーシングジャケットと白のアクセントの黒いショーツを着ています。洗練されたラインとバイザーハットが特徴で、チームのマスコットとしてのスピードとプロフェッショナリズムを体現しています。",
    "59": "レーシングミク2017のサマーバリエーション。ミクのジャケットは短縮されており、彼女は同じターコイズと黒の色のクロップトップを着ています。アンサンブルは短いスカートとアスレチックブーツで完成し、夏の太陽の下で彼女を涼しく保ちます。",
    "60": "レーシングミク2017の春のバリエーション。ミクの衣装は、パステルカラーと花柄のモチーフをレーシングジャケットに取り入れ、春の応援とレーシングスピリットを融合させています。いつもの制服に比べて、より軽く、より装飾的なものです。",
    "61": "2018 Racing Mikuのデザイン。ミクは、白と青のスタイリッシュなレーシングジャケットを、マッチするクロップトップとスカートの上に着用しています。彼女の衣装は、チームの最先端のスタイルを反映した大胆なアングルデザインとレーシングヘルメットを特徴としています。",
    "62": "レーシングミク2018のサマーバリエーション。ミクの長袖ジャケットはショートベストに置き換えられ、スカートはより短くトリミングされています。白と青の配色が残っており、暑い時期でも動きやすくなっています。",
    "63": "2019 Racing Mikuのデザイン。ミクは、短いスカートの上に、緑色のアクセントのネイビーブルーと白のジャケットを着ています。この装いはスポーティで空気力学的な感触を持ち、見た目を引き立てるレーシングキャップが付いています。",
    "64": "レーシングミク2019のサマーバリエーション。衣装の長袖はライトベストに置き換えられ、スカートはやや短くなっています。ネイビーとグリーンのカラースキームが保たれており、夏のレースに新鮮な外観を与えています。",
    "65": "レーシングミク2019の春のバリエーション。ミクの衣装は、春を祝う花柄とパステル調のハイライトで飾られています。レーシングジャケットはまだ存在しますが、明るい色と陽気なデザインです。",
    "66": "2020 Racing Miku。マッチするクロップトップとスカートの上に白とスカイブルーのレーシングジャケットを着ており、グッドスマイルレーシングチームの色を反映しています。アンサンブルはダイナミックでモダンに見え、ペースの速いGTシーズンに適しています。",
    "67": "レーシングミク2020のサマーバリエーション。ミクの服装は、白と青のノースリーブトップとショートスカートで、シーズンに合わせて軽量化されています。色とスポンサーロゴは同じままで、トラックでの暑い日の準備ができています。",
    "68": "2021 Racing Mikuのデザイン。彼女は、ネオンアクセントの白とダークブルーのレーシングジャンプスーツを着ています。この衣装は、バイザーヘルメットと空力スタイリングを備えた未来的なレーサールックを備えています。",
    "69": "レーシングミク2021のサマーバリエーション。ミクのジャケットとスカートは、同じ白と青の配色で、暖かい天候のためにトリミングされています。この服装はスポーティで通気性がありながら、彼女のレーシングチームを代表しています。",
    "70": "レーシングミク2021の春のバリエーション。このレーシングスーツには、パステルピンクのハイライトと花柄のデカールが施されており、季節のタッチを演出しています。ミクは、この桜にインスパイアされたルックのベースとして、今でも標準的な白と青を身に着けています。",
    "71": "鏡峰凛としてのミクコスプレは、凛のトレードマークである黄と黒の衣装と弓を採用しています。ファンに愛される楽しいクロスオーバースタイル、実質的にミクの顔を持つリンのバージョン。",
    "72": "かっこいい白いセーラースタイルのトップス、黒いショーツ、ネクタイを着て、鏡峰レン役でコスプレするミク。本質的には、ミクの顔を持つレンのバージョンであり、ファンに愛される楽しいクロスオーバースタイルです。",
    "73": "ミクは、ルカのエレガントな黒と金のドレスを着て、メグリーヌ・ルカとしてコスプレをしています。この成熟したスタイルは、ミクを効果的にミクの顔を持つルカのバージョンに変えます。ファンに愛される楽しいクロスオーバースタイルです。",
    "74": "MEIKOのクラシックな赤い服装を採用した、MEIKOとしてのミクコスプレ。ミドリフベアリングトップスとスカート。この服装は、ミクがボーカロイド時代の初期を祝って、彼女の顔でMEIKOのバージョンのように見えます。",
    "75": "ブルーのロングコートとマッチングしたスカーフアンサンブルを採用した、カイト役のミクコスプレ。ファンが大切にしている楽しいクロスオーバースタイルのミクの顔を持つカイトのバージョンです。",
    "76": "Tetoの代表的なピンクのツインドリルの髪型と衣装を着て、Kasane Tetoとしてコスプレをしています。この遊び心のあるクロスオーバーは、ミクを愛されるファンマッシュアップスタイルのテトミクに変えます。",
    "77": "緑色のアクセントとゴーグルをかぶったグミのオレンジ色のクロップトップとスカートを採用したグミ役のミクコスプレ。このスタイルは、ミクがミクの顔をしたグミのように見えます。これは、ボーカロイドラインアップへの楽しいオマージュです。",
    "78": "ミクの10周年を記念した特別な衣装。ミクは、レインボーリボンと数字の「10」で飾られたオリジナルの衣装にインスパイアされた真珠のような白いドレスを着ています。KEIによるこの記念日のデザインは、彼女にお祝いの記念の輝きを与えます。",
    "79": "ミクは春の妖精の姿をしています。花びらと蝶のような翼を持つ明るい緑色のドレスで飾られています。この魅惑的な外観は、ミクを春の花をもたらす小さな季節の妖精として想像します。",
    "80": "Suohがデザインしたピンクのハートをテーマにした衣装で、ミクをフィーチャーしたかわいくガーリーなモジュール。髪には大きなリボン飾り、ドレスとブーツにはハートのモチーフがあります。このルックは、アイドルのような魅力と甘くてロマンチックなスタイルであふれています。",
    "81": "穏やかな秋をテーマにしたファッション。月とウサギをモチーフにした伝統的な収穫祭の着物を着ています。温かみのあるアースカラーと優しいデザインは、秋の涼しい夜にミクがそばにいて、収穫の月を見ているような気分を呼び起こします。",
    "82": "Project SEKAIのLEO/NEEDバンドに登場するミクのバージョン。彼女はカジュアルなスクールバンドの服を着ています。軽いカーディガンとスニーカーを着たスタイリッシュな学生服です。このルックは、LEO/NEEDで演奏する際のミクの親しみやすいバンドメンバーの側面を強調しています。",
    "83": "ミクがクリスタルから彫刻されたかのように見える輝くモジュール。彼女の衣装は半透明で、宝石のようなファセットが施されており、光を虹に屈折させています。MiCrystal Mikuは、繊細なガラス像が命を吹き込み、純粋でクリスタルクリアなトーンで歌っているように見えます。",
    "84": "この衣装は、RYOの曲「ODDS&ENDS」に由来しています。ミクは、シンプルな白いタンクトップ、作業用手袋、ブーツなど、謙虚なメカニックスタイルの服装で、道具や壊れたロボット部品に囲まれています。廃棄され再建されたロボットとしてのミクの役割を強調し、彼女の心を歌っている痛烈な表情です。",
    "85": "幻想的なアリス・イン・ワンダーランドはミクにインスピレーションを与えました。彼女はチェッカードレスとストライプストッキングを着て、まるでウサギの穴を降りて奇妙な新しい世界に落ちたかのように見えます。この気まぐれな衣装は、好奇心と狂気のヒントをブレンドし、トランプのモチーフと懐中時計のアクセサリーを備えています。",
    "86": "「ロミオとシンデレラ」の歌から、ミクはヴィンテージのボールガウンを着ています。白と濃い青の色合いの素敵なビクトリア様式のドレスで、レースの手袋が付いています。この服装は、ミクをおとぎ話の悲劇的なヒロインのように見せ、真夜中に愛を切望します。",
    "87": "プロジェクトDIVAのミクのための一般的なモジュール！彼女は、黒のトリミングと赤いリボンを備えた明るい白いシャツ、黒いデニムショーツ、赤いソールのシューズ、左手の手首に赤と黒のリボンを束ねています。",
    "88": "アイコニックなGoogle Chrome CMの曲「Tell Your World.「彼女はカラフルなストリートファッションアンサンブルを着ており、レインボーペイントの色でスプラッシュされた多層チュチュスカートを着ています。彼女の首に巻かれた大きなヘッドホンは、この芸術的で世界につながったルックを完成させます。",
    "89": "卒業歌「さくらの雨」から、ミクは日本の高校卒業制服で描かれています。桜色のブレザーと赤いリボンのスカートを着て、落ちてくる桜の花びらの下に立っています。このルックはセンチメンタルで優しく、春のお別れと新しい始まりを表しています。",
    "90": "ミクの悪名高いダークカウンターパート。ザツネミクは、ティールの代わりに赤いハイライトの長い黒髪、赤い目、そしてミクの服装の黒いバリエーションを持っています。ファンの想像力から生まれたミクの別の、より敵対的な性格である、邪悪なオーラを放ちます。",
    "91": "マジカルミライ2013のミクのシグネチャーファッション。ミクは魔法のサーカスのマジシャンとして、シルクのトップハット、ケープ、ワンドを完備しています。彼女は舞台の魔法と歌で群衆を眩ませる準備ができているように見えます。",
    "92": "Magical Mirai 2014のミクのシグネチャーファッション。彼女の髪を結ぶオーバーサイズのリボンを特徴とする未来的な衣装。ミクの進化し続ける未来を表す、かわいいアイドルの要素とSF的な雰囲気を融合させたデザイン。",
    "93": "マジカルミライ2015のミクのシグネチャーファッション。ミクは王冠やティアラをあしらったチェック柄の衣装を着ています。チェック柄のパターンはモダンなポップスタイルを加え、小さな王冠はイベントの女王としての地位を示しています。",
    "94": "マジカルミライ2016のミクのシグネチャーファッション。ロイヤルブルーのマーチングバンドスタイルのコスチューム。ミクはパレードドラムメジャーのように見え、ミリタリースタイルのジャケットとブルーのパレードハットでお祝いをリードしています。",
    "95": "マジカルミライ2017のミクのシグネチャーファッション。船乗りスタイルの制服とサイエンスラボコートをミックスしたユニークなコンセプト。ミクの衣装はセーラーカラーで、技術的なラボのようなディテールと一緒にプリーツが付いており、若さと革新の両方を象徴しています。",
    "96": "Magical Mirai 2018のミクのシグネチャーファッション。このデザインは、ミクに遊び心のあるサーカスパフォーマーの外観を与えます。彼女はドレスにハーレクインダイヤモンドパターン、道化師のような襟、そしてカーニバルの雰囲気を体現するカラフルなサーカスをテーマにしたアクセサリーを持っています。",
    "97": "マジカルミライ2019のミクのシグネチャーファッション。ミクの衣装にはスターモチーフが施されており、頭には輝くスタークラウンをかぶっています。コスチュームはエレガントでコズミックで、マジカルミライが新たな高みに達するにつれて、星とガイダンスをテーマにしています。",
    "98": "マジカルミライ2020のミクのシグネチャーファッション。鮮やかな赤いマーチングバンドのユニフォームとプルームハットで、バンドリーダーの服装をミラーリングしています。2020年の課題にもかかわらず、この衣装は音楽を通して決意と団結を醸し出しています。",
    "99": "マジカルミライ2021のミクのシグネチャーファッション。ミクは、未来的なファッションと融合したサイエンスラボコートのような洗練された白とティールの服を着ています。ゴーグルと技術的なパターンがデザインをアクセントにし、その年のイベントの前向きな精神を捉えています。",
    "100": "マジカルミライ2022のミクのシグネチャーファッション。Magical Miraiの10周年を記念して、ミクは過去のデザインの要素を取り入れた柔らかいパステルカラーのアンサンブルを着用しています。パステルカラーのレインボードレス、アニバーサリーロゴ、そして彼女の10年間のマジカルミライへの喜びに満ちたうなずきなど、お祝いのオールスターファッションです。",
    "101": "輝きと喜びに満ちた小さな赤ちゃんのベル。この秘密の仲間は、庭を完成させたコレクターを祝います。"
  },
  "es": {
    "1": "El aspecto clásico de Hatsune Miku en sus emblemáticos coletas de color verde azulado y su futurista atuendo de colegiala, con un chaleco gris plateado, falda plisada y detalles en verde azulado brillante. Este es el diseño que lo empezó todo, capturando el estilo alegre y moderno de Miku.",
    "2": "El look clásico de 2007 de Miku de la era VOCALOID2. Lleva el atuendo negro y verde azulado original: un elegante chaleco, corbata turquesa, falda plisada y botas altas, que encarnan la imagen definitiva que la convirtió en una ídolo pop virtual.",
    "3": "Una mejora etérea del diseño de Miku con un toque futurista: mangas translúcidas, detalles brillantes y un elegante atuendo blanco y negro le dan a Append Miku un encanto suavemente luminiscente y de otro mundo.",
    "4": "Un encantador Miku con temática de cerezos en flor con pelo rosa y corbatas de cerezo. El atuendo de Sakura Miku es un recolor rosa de su disfraz predeterminado adornado con motivos florales e incluso cerezas que forman un lazo, una mirada que hace que tu corazón se eleve con sensaciones de primavera.",
    "5": "Otra variante de Sakura Miku que luce colas gemelas de color rosa pétalo con patrones de flores blancas. Su uniforme en flor de cerezo presenta detalles florales adicionales y largas cintas, lo que hace que esta primavera Miku parezca un hada sakura viviente.",
    "6": "Miku se viste como un lindo conejito de Pascua, con orejas de conejito y un atuendo de color pastel. Exuda alegría primaveral: imagínala sosteniendo una cesta de huevos y saltando para difundir la alegría de Pascua en este adorable conjunto.",
    "7": "Miku con un clásico uniforme escolar japonés estilo marinero. Con una falda plisada azul marino, una camiseta blanca de cuello marinero y una energía juvenil, este look captura perfectamente el encantador ambiente de la escuela secundaria de Miku.",
    "8": "Un Miku melancólico de temática submarina vestido con un elegante vestido azul oscuro. Su cabello fluye como las corrientes oceánicas a su alrededor, y los adornos y degradados del atuendo evocan la imagen de una niña cantando sola en el fondo del mar.",
    "9": "Una variante cruzada con Miku asumiendo la personalidad de Black★Rock Shooter. Lleva un elegante abrigo negro, pantalones cortos y un ardiente ojo azul, un alter ego feroz y fresco que combina la voz de Miku con un estilo rockero listo para el combate.",
    "10": "La parodia chibi de Miku con una cara simplificada y una sonrisa constante con la boca abierta. A menudo se ve a Hachune Miku agitando una cebolla de primavera (negi) con entusiasmo, encarnando un lado adorable y digno de memes del personaje de Miku.",
    "11": "El atuendo de temática china de Hatsune Miku con un elegante vestido de inspiración cheongsam en blanco y rojo. Esta versión a menudo tiene motivos florales y mangas fluidas, lo que refleja una mezcla de ídolo pop moderno y elegancia tradicional china.",
    "12": "Un módulo diseñado para la canción notoriamente difícil \"Hatsune Miku no Gekishou.\" Miku aparece casi como un vampiro diva digital: un atuendo gótico con volantes, un dramático esquema de colores negro y rojo y un aura intensa para que coincida con la energía extrema de la canción.",
    "13": "Inspirada en la famosa canción, esta Miku luce un aspecto de princesa: un vestido negro con volantes, accesorios de rosas rojas y una pequeña corona posada en su cabello. Se ve como la reina mimada del mundo descansando en su lujosa cama, como en el PV original.",
    "14": "Un estilo tenue y emocional para la canción \"Rolling Girl. Miku está representada con un uniforme escolar con vendas envolviendo sus brazos, lo que refleja los temas de lucha de la canción. Sus colores brillantes habituales son apagados, mostrando un lado más problemático de la personalidad de Miku.",
    "15": "Un atuendo Miku más oscuro y elegante inspirado en la canción de DECO*27 \"Ghost Rule.\" Ella luce un conjunto negro y rojo con botas hasta los muslos y guantes sin dedos. Su expresión y pose insinúan el secreto y la frustración, coincidiendo con el estado de ánimo nervioso de la canción.",
    "16": "No es exactamente Miku: Haku es un personaje creado por fans con un toque de mal humor en el diseño de Miku. Tiene el pelo blanco plateado en una cola de caballo baja, ojos rojos cansados y una versión gris y púrpura del atuendo de Miku. Su aspecto emite un ambiente melancólico de \"ídolo fallido\" que contrasta con el ánimo de Miku.",
    "17": "Vestido como una linda enfermera de la canción \"Love-Colored Ward\", Miku lleva un uniforme de enfermera blanco completo con un pequeño sombrero y un delantal rosa. El atuendo está acentuado con corazones y símbolos de cruces médicas, dando un tema lúdico de hospital al estilo normalmente moderno de Miku.",
    "18": "Un uniforme militar de la era Taisho de la exitosa canción \"Senbonzakura.\" Miku se pone un atuendo militar de estilo kimono magenta profundo con una gorra de oficial a juego, guantes blancos y botas. El disfraz está adornado con emblemas de cerezos en flor, una sorprendente mezcla de retro y moderno que captura el espíritu de la canción.",
    "19": "Una mirada sombría inspirada en el funeral de la canción \"Saihate. Miku lleva un modesto vestido de luto negro con un velo. Este atuendo le da una apariencia agridulce y agridulce, como si estuviera asistiendo a una despedida final, capturando perfectamente el tono melancólico de la canción.",
    "20": "Diseñado por el artista Hachi para la canción \"Sand Planet\", este Miku desafía un mundo desértico. Lleva un atuendo andrajoso del desierto (capa en tonos tierra, botas y un sombrero del desierto) con una máscara de gas alrededor del cuello. El estilo post-apocalíptico barrido por la arena la distingue de su imagen pop habitual.",
    "21": "Un peculiar Miku con temática extraterrestre inspirado en la canción \"Alien Alien.\" Ella luce un atuendo caprichoso con accesorios de doble cola tipo antena y colores vibrantes de neón. Miku parece un adorable ídolo extraterrestre listo para cantar e invadir corazones.",
    "22": "Un Miku de estilo lolita gótico del módulo “Policía Secreta”. Lleva un vestido negro con volantes y encaje, combinado con alas oscuras y un halo. La mirada es linda y oscura, combinando perfectamente con el ambiente secreto y rebelde de la canción.",
    "23": "Un disfraz inspirado en el País de las Maravillas donde Miku toma el disfraz de la liebre de marzo. Lleva un atuendo con volantes, orejas de conejo y accesorios para la fiesta del té. Este estilo caprichoso acorta las colas gemelas de Miku y le da un aspecto juguetón y un poco loco sacado directamente del mundo de Alice.",
    "24": "Un módulo de caramelos y dulces de Project DIVA X, con Miku en un atuendo pastel parecido a una lolita adornado con motivos de caramelos. Parece un dulce humano, con medias a rayas y un accesorio de piruleta gigante, perfectamente adecuado para canciones alegres y juguetonas.",
    "25": "¡Miku se transforma en un gato afortunado! Lleva un atuendo de estilo tradicional con orejas de gato, un collar de campana y una pose similar a una pata que recuerda a una estatua de maneki neko. Con un kimono rojo y blanco y una linda cola de gato, este Miku promete traer buena fortuna.",
    "26": "Un elegante conjunto de concierto sinfónico basado en la ilustración de KEI para Miku Symphony 2017. Miku aparece con un elegante vestido de gala negro con forro azul, sosteniendo un violín. El vestido sofisticado y la sonrisa refinada le dan una presencia elegante de solista de orquesta.",
    "27": "El atuendo de Miku Symphony 2018 le da a Miku un aspecto recatado y clásico similar a una criada victoriana o a un asistente de orquesta. Lleva un vestido blanco y negro con volantes en forma de delantal y motivos musicales. Es una encantadora mezcla de linda y formal, adecuada para un escenario de concierto orquestal.",
    "28": "Para el 5º Aniversario de Miku Symphony, Miku lleva un vestido especial de celebración dibujado por la artista Rella. Es un vestido blanco y celeste adornado con notas musicales y estrellas. Parece una princesa en el escenario, conmemorando cinco años de actuaciones sinfónicas.",
    "29": "Este diseño se basa en el arte conceptual original de Miku, una versión \"qué pasaría si\" en la que tiene un atuendo diferente e incluso un cabello ligeramente castaño. Miku if Ver. lleva un elegante vestido inspirado en el uniforme escolar con detalles en verde azulado, que ofrece a los fanáticos una visión de un Miku alternativo que podría haber sido.",
    "30": "Un atuendo usado para un concierto especial de invierno. Miku está envuelto en un abrigo blanco festivo con motivos de copos de nieve azules, una bufanda esponjosa y orejeras a juego. Se ve cálida y radiante en el escenario, lista para actuar en un país de las maravillas invernal.",
    "31": "Un atuendo de celebración del 12º cumpleaños de Miku en 2019. Miku lleva un vestido de fiesta azul con volantes con cintas y lazos, como se ve en la ilustración oficial de cumpleaños. Incluso sostiene un pastel de cumpleaños decorado, rebosante de encanto alegre para conmemorar el día especial.",
    "32": "¡Un diminuto y caprichoso derivado de Miku que literalmente vive en una botella! Este personaje hecho en abanico tiene Miku con cabello azul líquido que fluye encerrado dentro de una botella transparente. Es un concepto adorable que imagina a Miku como un genio mágico o espíritu en una botella.",
    "33": "Un extraño y humorístico derivado de Miku que consiste en la cabeza de Miku sobre un par de piernas humanas. Shiteyan'yo es de color rosa brillante y completamente extraño, nacido del humor de Internet. Aunque es inquietante, es una querida meme, un testimonio de la peculiar creatividad de los fanáticos de Vocaloid.",
    "34": "El atuendo de Miku de la canción \"Love is War. -Ella está de pie encima de los altísimos altavoces, vestida con un vestido negro andrajoso y una larga bufanda que fluye. Con un megáfono en la mano y un estilo angustiado y apasionado, esta mirada captura la emoción intensa y rebelde de la historia de la canción.",
    "35": "Un módulo con temática de Halloween donde Miku se viste como una linda bruja de calabaza. Lleva un vestido naranja y púrpura con motivos de calabaza, un sombrero de bruja a rayas y una linterna. Sweet Pumpkin Miku está lleno de alegría de Halloween y travesuras azucaradas.",
    "36": "El Snow Miku 2011 luce un abrigo blanco esponjoso de invierno y orejeras, con un aspecto cálido y noble en el invierno nevado de Sapporo. Los detalles rosados y una bufanda suave completan este diseño temprano de Snow Miku, que aporta una alegría acogedora al frío.",
    "37": "Snow Miku 2012 lleva un cálido abrigo azul claro con una capucha esponjosa y corbatas de pompón, lo que le valió el apodo de \"Fluffy Coat\". Lleva el encanto del invierno con diseños de copos de nieve en su atuendo y su cabello se volvió blanco plateado.",
    "38": "El Miku de nieve 2013 aparece en un kimono blanco puro adornado con fresas y estampados florales. Este diseño de \"kimono blanco de fresa\" le da a Miku una belleza serena y tradicional, que celebra el invierno a través de una mezcla de imágenes de nieve y primavera.",
    "39": "Snow Miku 2014 adopta un motivo de niña mágica: \"Nieve mágica.\" Lleva una capa y un sombrero de mago decorado con estrellas y copos de nieve, empuñando un bastón de copo de nieve. Este encantador atuendo convierte a Miku en una hechicera de invierno que brilla con la magia de las heladas.",
    "40": "El 2015 Snow Miku, llamado \"Snow Bell\", tiene como tema las flores de lirio del valle. Vestida con un vestido blanco en forma de campana con cintas verdes y ribetes de pelo, encarna un espíritu suave de la nieve, listo para calentarte a tiempo para la primavera.",
    "41": "Snow Miku 2016 tiene un tema de deportes de invierno: lleva una acogedora parka azul y blanca con detalles en rosa, además de gafas de esquí y un motivo de búho en su sombrero. \"Snow Owl Parka\" Miku parece lista para llegar a las pistas, manteniendo las cosas heladas y divertidas con su estilo aventurero de nieve.",
    "42": "El Miku de nieve 2017, \"Constelaciones centelleantes\", tiene un tema celestial. Está vestida con una capa azul medianoche adornada con constelaciones, y su atuendo brilla como el cielo nocturno sobre campos nevados. Este diseño combina el invierno y la maravilla estrellada en un conjunto centelleante.",
    "43": "Snow Miku 2018 es conocida como la \"Sacerdotisa Grulla\". \"Lleva un atuendo tradicional japonés de miko (doncella del santuario) con ricos colores rojos y blancos, acentuados por detalles inspirados en la grulla. Este elegante diseño celebra la vida silvestre y la espiritualidad invernal de Hokkaido.",
    "44": "El Miku de nieve de 2019 aparece como una \"Princesa de nieve\". \"Vestida con un elegante vestido de gala azul hielo y una tiara, parece de la realeza del invierno. Los adornos en capas de volantes y copos de nieve del atuendo le dan a Miku un encanto majestuoso y helado.",
    "45": "Snow Miku 2020 llega con un atuendo inspirado en la banda de música, por lo tanto, \"Orquesta de marcha.\" Lleva una chaqueta militar elegante, motivos de notas musicales y un sombrero de plumas. Liderando un desfile por la nieve, este diseño es festivo y lleno de energía musical.",
    "46": "Snow Miku 2021 brilla con un tema de \"Iluminación\". Su atuendo está decorado con luces y motivos de iluminación invernal: bombillas brillantes, patrones del horizonte de la ciudad y estrellas centelleantes. Representa las cálidas luces festivas que iluminan las largas noches de invierno.",
    "47": "El Miku de nieve 2022 gira en torno al mar invernal de Hokkaido. Su disfraz incorpora azules oceánicos, perlas y elementos marinos como accesorios de conchas marinas. Con mangas onduladas y acentos acuáticos, da vida a la serena belleza de la costa invernal de Hokkaido.",
    "48": "El diseño Racing Miku 2010: un atuendo oficial de mascota de Good Smile Racing. Miku lleva un mono de color naranja brillante y blanco con logotipos de patrocinadores, guantes largos de color naranja y gafas teñidas de naranja. Sus colas gemelas se sostienen con cintas para el pelo de color naranja para completar el look de reina de la raza.",
    "49": "El módulo Racing Miku 2011. Miku lleva un elegante traje de carreras blanco y negro con ribete neón-turquesa y un abrigo corto transparente. Las botas y guantes negros con detalles en turquesa completan este look futurista de chica de carreras.",
    "50": "El atuendo Racing Miku 2012. Una camiseta corta blanca y una falda con llamativos detalles en turquesa y morado, además de guantes blancos y botas hasta el muslo. Este llamativo conjunto tiene toques futuristas y fue diseñado por el ilustrador GAN para la temporada de carreras de Super GT.",
    "51": "El diseño Racing Miku 2013 de Saitom. Lleva un minivestido de carreras verde y blanco con motivos mecánicos y guantes a juego. El look tiene un toque deportivo y enérgico que se adapta a la pista de carreras.",
    "52": "El conjunto Racing Miku 2014, diseñado por el ilustrador Koyamashigeto. Es una chaqueta de carreras azul y blanca con ribete plateado, combinada con una minifalda blanca. El cabello de Miku tiene reflejos azules helados y se pone botas a juego para un look oficial del día de la carrera.",
    "53": "Una variación de verano del diseño Racing Miku 2014. Miku lleva una versión sin mangas de su atuendo de carreras azul y una falda corta, que muestra un poco más de piel para el clima más cálido. Los colores y logotipos oficiales siguen siendo los mismos.",
    "54": "El Racing Miku 2015, diseñado por el artista Oguchi. Lleva una elegante chaqueta de carreras blanca y aguamarina, con una falda plisada a juego y botas blancas. Su atuendo incluye detalles de neón y una bufanda azul, dando una sensación de raza fresca y moderna.",
    "55": "Una versión de verano de Racing Miku 2015. La chaqueta de Miku se acorta a un estilo crop-top y cambia la falda completa por pantalones cortos. La combinación de colores se mantiene en blanco y aguamarina, ofreciendo un aspecto más fresco para los días cálidos de carrera.",
    "56": "Diseño Racing Miku 2016. Lleva una chaqueta de carreras blanca y azul sobre una camiseta sin mangas negra, con una falda corta en capas. El atuendo tiene una sensación deportiva con parches de patrocinador, y el cabello de Miku tiene reflejos cian frescos esta temporada.",
    "57": "Una variante de verano de Racing Miku 2016. Miku lleva una camiseta sin mangas con cremallera y una falda más corta, tanto en blanco como en azul, con el abdomen a la vista. Esta versión está pensada para condiciones de carrera con calor manteniendo el mismo esquema de color.",
    "58": "El Racing Miku 2017 del artista Rio. Lleva una chaqueta de carreras turquesa ajustada y pantalones cortos negros con detalles en blanco. El atuendo presenta líneas elegantes y un sombrero con visera, que encarna la velocidad y el profesionalismo como la mascota del equipo.",
    "59": "Variante de verano del Racing Miku 2017. La chaqueta de Miku se acorta y lleva una camiseta corta con los mismos colores turquesa y negro. El conjunto se completa con una falda corta y botas deportivas, manteniéndola fresca bajo el sol del verano.",
    "60": "Variante de primavera de Racing Miku 2017. El atuendo de Miku presenta colores pastel y motivos florales en su chaqueta de carreras, mezclando la alegría de la primavera con el espíritu de las carreras. Es una versión más ligera y decorativa de su uniforme habitual.",
    "61": "Diseño Racing Miku 2018. Miku lleva una elegante chaqueta de carreras blanca y azul sobre una camiseta corta y una falda a juego. Su atuendo presenta diseños angulares audaces y un casco de carreras, lo que refleja el estilo vanguardista del equipo.",
    "62": "Variante de verano del Racing Miku 2018. La chaqueta de manga larga de Miku se sustituye por un chaleco corto, y su falda se recorta más corta. El esquema de color de blanco y azul permanece, lo que permite la facilidad de movimiento en climas cálidos.",
    "63": "Diseño Racing Miku 2019. Miku luce una chaqueta azul marino y blanca con detalles en verde, sobre una falda corta. El atuendo tiene una sensación deportiva y aerodinámica, e incluye una gorra de carreras para rematar el look.",
    "64": "Variante de verano del Racing Miku 2019. Las mangas largas del conjunto se sustituyen por un chaleco ligero, y la falda es ligeramente más corta. El esquema de color azul marino y verde se mantiene, dándole un aspecto fresco para las carreras de verano.",
    "65": "Variante de primavera de Racing Miku 2019. El atuendo de Miku está adornado con motivos florales y reflejos pastel, que celebran la primavera. La chaqueta de competición sigue presente pero con colores más claros y un diseño alegre.",
    "66": "El Racing Miku 2020. Lleva una chaqueta de carreras blanca y azul cielo sobre una camiseta corta y una falda a juego, haciéndose eco de los colores del equipo Good Smile Racing. El conjunto se ve dinámico y moderno, adecuado para la temporada de GT de ritmo rápido.",
    "67": "Variante de verano del Racing Miku 2020. El atuendo de Miku se aligera para la temporada: un top sin mangas y una falda más corta en blanco y azul. Los colores y los logotipos de los patrocinadores siguen siendo los mismos, lo que la mantiene lista para un día caluroso en la pista.",
    "68": "Diseño Racing Miku 2021. Lleva un mono de carreras blanco y azul oscuro con detalles en neón. El atuendo tiene un aspecto futurista de corredor, completo con un casco de visera y un estilo aerodinámico.",
    "69": "Variante de verano del Racing Miku 2021. La chaqueta y la falda de Miku están recortadas para un clima cálido, con el mismo esquema de color blanco y azul. El atuendo es deportivo y transpirable a la vez que representa a su equipo de carreras.",
    "70": "Variante de primavera de Racing Miku 2021. El traje de competición presenta reflejos de color rosa pastel y calcomanías florales, lo que le da un toque de temporada. Miku todavía usa el blanco y el azul estándar como base para este look inspirado en los cerezos en flor.",
    "71": "Miku como Kagamine Rin, adoptando el atuendo y el lazo amarillo y negro característicos de Rin. Efectivamente, una versión de Rin con la cara de Miku: un divertido estilo crossover amado por los fans.",
    "72": "Miku cosplaying como Kagamine Len, vistiendo su camiseta blanca de estilo marinero, pantalones cortos negros y corbata. Esencialmente una versión de Len con la cara de Miku, un divertido estilo crossover amado por los fans.",
    "73": "Miku como Megurine Luka, vistiendo el elegante vestido negro y dorado de Luka. Este estilo maduro convierte efectivamente a Miku en una versión de Luka con la cara de Miku, un divertido estilo crossover amado por los fanáticos.",
    "74": "Miku cosplaying como MEIKO, adoptando el clásico atuendo rojo de MEIKO: una camiseta y una falda que resaltan el abdomen. Este atuendo hace que Miku parezca una versión de Meiko con su rostro, celebrando la era Vocaloid temprana.",
    "75": "Miku como KAITO, adoptando su largo abrigo azul y su conjunto de bufanda a juego. Es esencialmente una versión de KAITO con la cara de Miku, un divertido estilo crossover atesorado por los fans.",
    "76": "Miku como Kasane Teto, con el peinado y el atuendo de doble broca rosa característicos de Teto. Este divertido crossover convierte a Miku en Teto-miku, un amado estilo de mashup de fans.",
    "77": "Miku cosplaying como GUMI, adoptando la camiseta corta y falda naranja de GUMI con detalles verdes y gafas en la cabeza. Este estilo hace que Miku se parezca a GUMI con la cara de Miku, un divertido homenaje a la formación vocaloide.",
    "78": "Un atuendo especial para celebrar el décimo aniversario de Miku. Miku lleva un vestido blanco nacarado inspirado en su traje original, decorado con cintas de arco iris y el número ‘10’. Este diseño de aniversario de KEI le da un brillo festivo y conmemorativo.",
    "79": "Miku adopta la forma de un hada de primavera. Está adornada con un vestido verde claro con pétalos de flores y alas de mariposa. Este encantador look imagina a Miku como un pequeño hada de temporada que trae la floración de la primavera.",
    "80": "Un módulo lindo y femenino con Miku en un atuendo rosa con temática de corazón diseñado por Suoh. Tiene grandes adornos de cinta en el pelo y motivos de corazón en el vestido y las botas. Este look rebosa de encanto idolátrico y un estilo dulce y romántico.",
    "81": "Un atuendo sereno con temática otoñal. Miku se viste con un kimono tradicional del festival de la cosecha con motivos de luna y conejo. Los cálidos colores terrosos y el diseño suave evocan la sensación de ver una luna de cosecha en una fresca noche de otoño con Miku a tu lado.",
    "82": "Una versión de Miku como aparece en la banda Leo/need del Proyecto SEKAI. Lleva un atuendo informal de banda escolar: un elegante uniforme escolar con una chaqueta ligera y zapatillas de deporte. Este aspecto destaca el lado accesible y miembro de la banda de Miku cuando actúa con Leo/need.",
    "83": "Un módulo brillante donde Miku parece esculpido en cristal. Su atuendo es translúcido y facetado como una piedra preciosa, refractando la luz en arco iris. MiCrystal Miku parece una delicada estatua de cristal que cobra vida, cantando con un tono puro y cristalino.",
    "84": "Este atuendo proviene de la canción de ryo \"ODDS&ENDS.\" Miku se muestra con un humilde atuendo de estilo mecánico: una simple camiseta sin mangas blanca, guantes de trabajo y botas, rodeada de herramientas y piezas de robots rotas. Es una mirada conmovedora que subraya el papel de Miku como un robot desguazado y reconstruido cantando con todo su corazón.",
    "85": "Un Miku fantástico inspirado en Alicia en el País de las Maravillas. Lleva un vestido a cuadros y medias a rayas, como si acabara de caer por la madriguera del conejo en un extraño mundo nuevo. Este caprichoso atuendo combina curiosidad y un toque de locura, con motivos de naipes y un accesorio de reloj de bolsillo.",
    "86": "De la canción \"Romeo y Cenicienta\", Miku lleva un vestido de fiesta vintage. Es un precioso vestido de estilo victoriano en tonos de blanco y azul intenso con guantes de encaje. Este atuendo hace que Miku parezca la trágica heroína de un cuento de hadas, anhelando el amor a medianoche.",
    "87": "¡Un módulo general para Miku del proyecto diva! Lleva una camisa blanca clara con ribetes negros y una cinta roja, pantalones cortos vaqueros negros, zapatos con suelas rojas y una cinta roja y negra en la muñeca izquierda.",
    "88": "El atuendo de Miku de la icónica canción de Google Chrome CM \"Tell Your World.\" Lleva un colorido conjunto de moda callejera con una falda de tutú de varias capas salpicada de colores de pintura arcoíris. Un gran par de auriculares alrededor de su cuello completa este aspecto artístico y conectado al mundo.",
    "89": "De la canción de graduación \"Sakura no Ame\", Miku aparece con un uniforme japonés de graduación de la escuela secundaria. Lleva una chaqueta rosa con flores de cerezo y una falda con una cinta roja, debajo de los pétalos de sakura que caen. Esta mirada es sentimental y amable, representando despedidas y nuevos comienzos en primavera.",
    "90": "La infame contraparte oscura de Miku. Zatsune Miku tiene el pelo largo y negro con reflejos rojos en lugar de verde azulado, ojos rojos y una variación negra del atuendo de Miku. Ella emana un aura siniestra: una personalidad alternativa y más hostil de Miku nacida de la imaginación de los fanáticos.",
    "91": "El atuendo característico de Miku de Magical Mirai 2013. Miku actúa como un mago de circo mágico, con un sombrero de copa de seda, una capa y una varita. Parece lista para deslumbrar a la multitud con magia escénica y canto.",
    "92": "El atuendo característico de Miku de Magical Mirai 2014. Un atuendo futurista caracterizado por una cinta de gran tamaño que ata su cabello. El diseño combina una sensación de ciencia ficción con lindos elementos de ídolos, lo que representa el futuro en constante evolución de Miku.",
    "93": "El atuendo característico de Miku de Magical Mirai 2015. Miku lleva un atuendo a cuadros con una corona o tiara. El patrón a cuadros añade un estilo pop moderno, y la pequeña corona significa su estatus como la reina del evento.",
    "94": "El atuendo característico de Miku de Magical Mirai 2016. Un disfraz estilo banda de marcha en azul real. Miku parece un tambor mayor de desfile, liderando la celebración con una chaqueta de estilo militar y un sombrero de desfile decorado en azul.",
    "95": "El atuendo característico de Miku de Magical Mirai 2017. Un concepto único que combina un uniforme escolar estilo marinero con una bata de laboratorio de ciencias. El atuendo de Miku tiene cuello marinero y pliegues junto con detalles técnicos de laboratorio, que simbolizan tanto la juventud como la innovación.",
    "96": "El atuendo característico de Miku de Magical Mirai 2018. Este diseño le da a Miku un aspecto lúdico de artista de circo. Tiene estampados de diamantes de arlequín en su vestido, un cuello de bufón y coloridos accesorios con temática de circo, que encarnan el ambiente de carnaval.",
    "97": "El atuendo característico de Miku de Magical Mirai 2019. El atuendo de Miku presenta motivos de estrellas y lleva una brillante corona de estrellas en la cabeza. El disfraz es elegante y cósmico, celebrando el tema de las estrellas y la guía a medida que Magical Mirai alcanza nuevas alturas.",
    "98": "El atuendo característico de Miku de Magical Mirai 2020. Reflejando el atuendo de un líder de banda con un uniforme de banda de marcha rojo brillante y un sombrero de pluma. A pesar de los desafíos de 2020, este atuendo emana determinación y unidad a través de la música.",
    "99": "El atuendo característico de Miku de Magical Mirai 2021. Miku se pone un elegante atuendo blanco y verde azulado que se asemeja a una bata de laboratorio de ciencias fusionada con moda futurista. Las gafas y los patrones técnicos acentúan el diseño, capturando el espíritu progresista del evento de ese año.",
    "100": "El atuendo característico de Miku de Magical Mirai 2022. Para el décimo aniversario de Magical Mirai, Miku lleva un conjunto de suave color pastel que incorpora elementos de diseños de años anteriores. Es un atuendo festivo y lleno de estrellas: vestido arcoíris pastel, logotipo de aniversario y guiños alegres a su década de Magical Mirai.",
    "101": "Una pequeña bella bebé que revolotea con brillo y alegría. Este compañero secreto celebra a los coleccionistas que completan el jardín."
  },
  "de": {
    "1": "Der klassische Look von Hatsune Miku in ihren ikonischen blaugrünen Zöpfen und ihrem futuristischen Schulmädchen-Outfit mit einer silbergrauen Weste, einem plissierten Rock und leuchtenden blaugrünen Akzenten. Dies ist das Design, mit dem alles begann und das Mikus fröhlichen und trendigen Stil einfängt.",
    "2": "Mikus klassischer 2007er Look aus der VOCALOID2-Ära. Sie trägt das Original-Outfit in Schwarz und Blaugrün – eine elegante Weste, eine türkisfarbene Krawatte, einen plissierten Rock und hohe Stiefel – und verkörpert damit das definitive Bild, das sie zu einem virtuellen Pop-Idol gemacht hat.",
    "3": "Eine ätherische Aufwertung von Mikus Design mit einem futuristischen Twist – durchscheinende Ärmel, leuchtende Akzente und ein schlankes weiß-schwarzes Outfit verleihen Append Miku einen sanft leuchtenden, jenseitigen Charme.",
    "4": "Ein entzückendes Kirschblüten-Miku mit rosa Haaren und Kirschhaar-Krawatten. Sakura Mikus Outfit ist eine rosa Nachfärbung ihres Standardkostüms, das mit Blumenmotiven und sogar Kirschen geschmückt ist, die eine Schleife bilden – ein Look, der Ihr Herz mit Frühlingsgefühlen in die Höhe treiben lässt.",
    "5": "Eine weitere Variante von Sakura Miku mit fließenden blütenrosa Doppelschwänzen mit weißen Blütenmustern. Ihre Kirschblütenuniform zeichnet sich durch extra blumige Akzente und lange Schleifenbänder aus, die diesen Frühling Miku wie eine lebende Sakura-Fee aussehen lassen.",
    "6": "Miku verkleidet sich als süßer Osterhase, komplett mit Hasenohren und einem pastellfarbenen Outfit. Sie strahlt Frühlingsfreude aus – stellen Sie sich vor, sie hält einen Korb mit Eiern und hüpft mit, um Ostern in diesem entzückenden Ensemble zu feiern.",
    "7": "Miku in einer klassischen japanischen Schuluniform im Seemannsstil. Mit einem marineblauen Faltenrock, einem weißen Oberteil mit Seemannskragen und jugendlicher Energie fängt dieser Look Mikus charmante High-School-Atmosphäre perfekt ein.",
    "8": "Ein melancholischer Unterwasser-Miku in einem eleganten, tiefblauen Kleid. Ihr Haar fließt wie die Meeresströmungen um sie herum, und die Rüschen und Farbverläufe des Outfits erinnern an das Bild eines Mädchens, das allein auf dem Meeresgrund singt.",
    "9": "Eine Crossover-Variante, bei der Miku die Rolle des Black★Rock Shooters übernimmt. Sie trägt einen eleganten schwarzen Mantel, kurze Shorts und strahlend blaue Augen – ein wildes und cooles Alter-Ego, das Mikus Stimme mit einem rockigen Kampfstil verbindet.",
    "10": "Die Chibi-Parodie von Miku mit einem vereinfachten Gesicht und einem konstanten Lächeln mit offenem Mund. Hachune Miku wird oft enthusiastisch mit einer Frühlingszwiebel (Negi) geschwenkt und verkörpert eine memewürdige und entzückende Seite von Mikus Charakter.",
    "11": "Hatsune Mikus chinesische Kleidung mit einem schicken Kleid im Cheongsam-Stil in Weiß und Rot. Diese Version hat oft florale Motive und fließende Ärmel, die eine Mischung aus modernem Pop-Idol und traditioneller chinesischer Eleganz widerspiegeln.",
    "12": "Ein Modul für das notorisch schwierige Lied „Hatsune Miku no Gekishou.\" Miku wirkt fast wie ein digitaler Diva-Vampir – ein gerüschtes Gothic-Outfit, ein dramatisches Schwarz-Rot-Farbschema und eine intensive Aura, die der extremen Energie des Songs entspricht.",
    "13": "Inspiriert von dem berühmten Lied trägt diese Miku einen Prinzessinnen-Look: ein gerüschtes schwarzes Kleid, rote Rosen-Accessoires und eine winzige Krone in ihrem Haar. Sie sieht aus wie die verwöhnte Königin der Welt, die auf ihrem Plüschbett faulenzt, wie im Original PV.",
    "14": "Ein gedämpfter, emotionaler Stil für den Song „Rolling Girl.\" Miku ist in einer Schuluniform mit Bandagen dargestellt, die ihre Arme umwickeln – was die Kampfthemen des Songs widerspiegelt. Ihre üblichen hellen Farben sind gedämpft und zeigen eine unruhigere Seite von Mikus Persönlichkeit.",
    "15": "Ein dunkleres, stilvolles Miku-Outfit, das dem Song \"Ghost Rule\" von DECO*27 nachempfunden ist. \"Sie trägt ein schwarz-rotes Ensemble mit Oberschenkelstiefeln und fingerlosen Handschuhen. Ihr Ausdruck und ihre Pose deuten auf Geheimhaltung und Frustration hin, passend zur nervösen Stimmung des Songs.",
    "16": "Nicht gerade Miku – Haku ist ein von Fans kreierter Charakter mit einer launischen Wendung von Mikus Design. Sie hat silbrig-weißes Haar mit niedrigem Pferdeschwanz, müde rote Augen und eine grau-violette Version von Mikus Outfit. Ihr Look strahlt eine wehmütige \"gescheiterte Idol\" -Vibe aus, die mit Mikus Aufmunterung kontrastiert.",
    "17": "Miku ist als süße Krankenschwester aus dem Lied \"Love-Colored Ward\" gekleidet und trägt eine weiße Krankenschwesteruniform mit einem kleinen Hut und einer rosa Schürze. Das Outfit ist mit Herzen und medizinischen Kreuzsymbolen akzentuiert und verleiht Mikus normalerweise trendigem Stil ein verspieltes Krankenhausmotiv.",
    "18": "Ein militärischer Uniform-Look aus der Taisho-Ära aus dem Hit „Senbonzakura.\" Miku trägt ein tiefes magentafarbenes Militär-Outfit im Kimono-Stil mit einer passenden Offiziersmütze, weißen Handschuhen und Stiefeln. Das Kostüm ist mit Kirschblüten-Emblemen verziert – eine markante Mischung aus Retro und Modern, die den Geist des Songs einfängt.",
    "19": "Ein düsterer, von Beerdigungen inspirierter Look aus dem Lied „Saihate.\" Miku trägt ein bescheidenes schwarzes Trauerkleid mit Schleier. Dieses Outfit verleiht ihr ein anmutiges, bittersüßes Aussehen – als würde sie einem letzten Abschied beiwohnen und den melancholischen Ton des Songs perfekt einfangen.",
    "20": "Dieser Miku wurde von der Künstlerin Hachi für das Lied „Sand Planet“ entworfen und trotzt einer Wüstenwelt. Sie trägt zerfetzte Wüstenkleidung – erdigen Umhang, Stiefel und einen Wüstenhut – mit einer Gasmaske um den Hals. Der sandgepeitschte, postapokalyptische Stil hebt sie von ihrem gewohnten Pop-Image ab.",
    "21": "Ein skurriler Weltraum-Alien-Miku, inspiriert von dem Song \"Alien Alien.\" Sie trägt ein skurriles Outfit mit antennenähnlichen Twin-Tails-Accessoires und leuchtenden Neonfarben. Miku sieht aus wie ein entzückendes außerirdisches Idol, das bereit ist zu singen und in die Herzen einzudringen.",
    "22": "Ein gotischer Miku im Lolita-Stil aus dem Modul \"Geheimpolizei\". Sie trägt ein schwarzes Rüschenkleid mit Spitze, gepaart mit dunklen Flügeln und einem Heiligenschein. Der Look ist sowohl süß als auch dunkel und passt perfekt zur geheimnisvollen, rebellischen Atmosphäre des Songs.",
    "23": "Ein vom Wunderland inspiriertes Kostüm, in dem Miku die Gestalt des Märzhasen annimmt. Sie trägt ein Rüschen-Outfit mit Hasenohren und Tee-Party-Accessoires. Dieser skurrile Stil verkürzt Mikus Twintails und verleiht ihr einen verspielten, leicht verrückten Look direkt aus Alices Welt.",
    "24": "Ein Bonbon-Modul von Project DIVA X mit Miku in einem pastellfarbenen, lolitaartigen Outfit, das mit Bonbonmotiven verziert ist. Sie sieht aus wie ein menschliches Konfekt, mit gestreiften Strümpfen und einer riesigen Lutscherstütze – perfekt geeignet für fröhliche, verspielte Lieder.",
    "25": "Miku verwandelt sich in eine Glückskatze! Sie trägt ein traditionelles Outfit mit Katzenohren, einem Glockenkragen und einer pfotenartigen Pose, die an eine Maneki-Neko-Statue erinnert. Mit einem rot-weißen Kimono und einem niedlichen Katzenschwanz verspricht dieser Miku Glück.",
    "26": "Ein elegantes symphonisches Konzert-Outfit nach KEIS Illustration für Miku Symphony 2017. Miku erscheint in einem schicken schwarzen Ballkleid mit blauem Futter und hält eine Geige. Das raffinierte Kleid und das raffinierte Lächeln verleihen ihr eine anmutige, orchestersolistische Präsenz.",
    "27": "Das Outfit der Miku Symphony 2018 verleiht Miku einen zurückhaltenden, klassischen Look, der einem viktorianischen Dienstmädchen oder Orchesterbesucher ähnelt. Sie trägt ein schwarz-weißes Kleid mit schürzenartigen Rüschen und musikalischen Motiven. Es ist eine charmante Mischung aus süß und formell, passend für ein Orchesterkonzert.",
    "28": "Zum 5. Jubiläum der Miku-Symphonie trägt Miku ein besonderes Festkleid, das von der Künstlerin Rella gezeichnet wurde. Es ist ein weißes und himmelblaues Kleid, das mit Noten und Sternen verziert ist. Sie sieht aus wie eine Prinzessin auf der Bühne und erinnert an fünf Jahre symphonische Darbietungen.",
    "29": "Dieses Design basiert auf Mikus ursprünglicher Konzeptkunst – einer Was-wäre-wenn-Version, bei der sie ein anderes Outfit und sogar leicht braunes Haar hat. Miku if Ver. trägt ein stilvolles, von der Schuluniform inspiriertes Kleid mit blaugrünen Akzenten, das den Fans einen Einblick in einen alternativen Miku bietet, der hätte sein können.",
    "30": "Ein Outfit, das für ein besonderes Winterkonzert getragen wird. Miku ist in einem festlichen weißen Mantel mit blauen Schneeflockenmotiven, einem flauschigen Schal und passenden Ohrenschützern gebündelt. Sie sieht warm und strahlend auf der Bühne aus, bereit, in einem Winterwunderland aufzutreten.",
    "31": "Ein festliches Outfit zum 12. Geburtstag von Miku im Jahr 2019. Miku trägt ein gerüschtes blaues Partykleid mit Bändern und Schleifen, wie auf der offiziellen Geburtstagsillustration zu sehen ist. Sie hält sogar eine dekorierte Geburtstagstorte in der Hand, die mit fröhlichem Charme überfüllt ist, um den besonderen Tag zu markieren.",
    "32": "Ein winziges, skurriles Miku-Derivat, das buchstäblich in einer Flasche lebt! Dieser Fan-Charakter hat Miku mit fließenden flüssigkeitsblauen Haaren, die in einer transparenten Flasche eingeschlossen sind. Es ist ein entzückendes Konzept, das sich Miku als magischen Geist oder Geist in einer Flasche vorstellt.",
    "33": "Ein bizarres und humorvolles Miku-Derivat, bestehend aus Mikus Kopf auf einem Paar menschlicher Beine. Shiteyan'yo ist leuchtend rosa und völlig seltsam, geboren aus Internet-Humor. Obwohl sie beunruhigend ist, ist sie ein geliebtes Mem – ein Beweis für die schrullige Kreativität von Vocaloid fandom.",
    "34": "Mikus Kleidung aus dem Lied „Love is War.\" Sie steht auf hoch aufragenden Lautsprechern und trägt ein zerfetztes schwarzes Kleid und einen langen, fließenden Schal. Mit einem Megaphon in der Hand und einem verzweifelten, leidenschaftlichen Styling fängt dieser Look die intensiven, rebellischen Emotionen der Geschichte des Songs ein.",
    "35": "Ein Halloween-Modul, in dem sich Miku als süße Kürbishexe verkleidet. Sie trägt ein orange-violettes Kleid mit Kürbismotiven, einen gestreiften Hexenhut und eine Jack-o’-Laterne. Sweet Pumpkin Miku steckt voller Halloween-Jubel und zuckerhaltigem Unfug.",
    "36": "Der 2011 Snow Miku trägt einen flauschigen weißen Wintermantel und Ohrenschützer und sieht im verschneiten Sapporo-Winter warm und edel aus. Rosa Akzente und ein weicher Schal runden dieses frühe Snow Miku-Design ab und bringen kuschelige Fröhlichkeit in die Kälte.",
    "37": "Snow Miku 2012 trägt einen warmen hellblauen Mantel mit einer flauschigen Kapuze und Bommelbändern, was ihr den Spitznamen „Flauschiger Mantel“ einbrachte. Sie trägt den Charme des Winters mit Schneeflocken-Designs auf ihrem Outfit und ihr Haar wurde silbrig weiß.",
    "38": "Der 2013 Snow Miku erscheint in einem reinweißen Kimono, der mit Erdbeeren und Blumenmustern verziert ist. Dieses „Strawberry White Kimono“ -Design verleiht Miku eine ruhige, traditionelle Schönheit und feiert den Winter durch eine Mischung aus Schnee und Frühlingsbildern.",
    "39": "Snow Miku 2014 nimmt ein magisches Mädchenmotiv an – „Magical Snow.\" Sie trägt einen Umhang und einen Zaubererhut, der mit Sternen und Schneeflocken verziert ist und einen Schneeflockenstab trägt. Dieses bezaubernde Outfit verwandelt Miku in eine Winterzauberin, die vor Frostzauber funkelt.",
    "40": "Die 2015 Snow Miku, genannt \"Snow Bell\", ist um Maiglöckchenblumen thematisiert. In einem weißen glockenförmigen Kleid mit grünen Bändern und Pelzbesatz verkörpert sie einen sanften Geist des Schnees, der Sie rechtzeitig zum Frühling aufwärmen kann.",
    "41": "Snow Miku 2016 ist Wintersport-Thema – sie trägt einen gemütlichen blau-weißen Parka mit rosa Akzenten sowie eine Skibrille und ein Eulenmotiv auf ihrer Mütze. \"Snow Owl Parka\" Miku sieht bereit aus, auf die Piste zu gehen, hält die Dinge frostig und macht Spaß mit ihrem abenteuerlichen Schneestil.",
    "42": "Die 2017 Snow Miku, \"Twinkle Constellations\", hat ein himmlisches Thema. Sie ist in ein mitternachtsblaues Cape gekleidet, das mit Sternbildern geschmückt ist, und ihr Outfit funkelt wie der Nachthimmel über schneebedeckten Feldern. Dieses Design verbindet Winter und Sternenwunder zu einem funkelnden Ensemble.",
    "43": "Snow Miku 2018 ist als „Kranichpriesterin“ bekannt. \"Sie trägt ein traditionelles japanisches Miko (Schreinmädchen) -Outfit mit satten roten und weißen Farben, akzentuiert durch Kranich-inspirierte Details. Dieses anmutige Design zelebriert die Tierwelt und die Winterspiritualität von Hokkaido.",
    "44": "Die 2019 Snow Miku erscheint als „Schneeprinzessin.\" In einem eleganten eisblauen Ballkleid und einer Tiara sieht sie jedes bisschen königlich des Winters aus. Die mehrlagigen Rüschen und Schneeflocken-Ornamente verleihen Miku einen königlichen und frostigen Charme.",
    "45": "Snow Miku 2020 marschiert mit einem von einer Marschband inspirierten Outfit ein, daher „Marching Orchestra.\" Sie trägt eine elegante Militärjacke, Notenmotive und einen gefiederten Hut. Dieses Design, das eine Parade durch den Schnee führt, ist festlich und voller musikalischer Energie.",
    "46": "Snow Miku 2021 glänzt mit dem Thema „Illumination“. Ihr Outfit ist mit Lichtern und Motiven von Winterbeleuchtungen verziert – leuchtende Glühbirnen, Skyline-Muster der Stadt und funkelnde Sterne. Sie steht für die warmen festlichen Lichter, die lange Winternächte erhellen.",
    "47": "Das Snow Miku 2022 dreht sich um das Wintermeer von Hokkaido. Ihr Kostüm enthält Ozean-Blues, Perlen und marine Elemente wie Muschel-Accessoires. Mit fließenden wellenförmigen Ärmeln und aquatischen Akzenten erweckt sie die ruhige Schönheit der Winterküste von Hokkaido zum Leben.",
    "48": "Das 2010 Racing Miku Design – ein offizielles Good Smile Racing Maskottchen Outfit. Miku trägt einen leuchtend orange-weißen Jumpsuit mit Sponsor-Logos, langen orangefarbenen Handschuhen und einer orangefarbenen Brille. Ihre Doppelschwänze werden mit orangefarbenen Haarbändern gehalten, um den Race-Queen-Look zu vervollständigen.",
    "49": "Das 2011 Racing Miku-Modul. Miku trägt ein elegantes weiß-schwarzes Rennoutfit mit neon-türkisfarbenem Besatz und einen kurzen durchsichtigen Mantel. Schwarze Stiefel und Handschuhe mit türkisfarbenen Akzenten runden diesen futuristischen Race-Car-Girl-Look ab.",
    "50": "Das 2012 Racing Miku Outfit. Ein weißes Kurztop und ein Rock mit kräftigen türkisfarbenen und violetten Akzenten sowie weißen Handschuhen und Oberschenkelstiefeln. Dieses auffällige Ensemble hat futuristische Akzente und wurde vom Illustrator GAN für die Super GT Rennsaison entworfen.",
    "51": "Das 2013 Racing Miku Design von Saitom. Sie trägt ein grün-weißes Renn-Minikleid mit mechanischen Motiven und passenden Handschuhen. Der Look hat einen sportlichen, energetischen Vibe, der sich perfekt an die Rennstrecke anpasst.",
    "52": "Das 2014 Racing Miku Outfit, entworfen vom Illustrator Koyamashigeto. Es ist eine blau-weiße Rennjacke mit silberfarbenem Besatz, gepaart mit einem weißen Minirock. Mikus Haare haben frostige blaue Highlights und sie trägt passende Stiefel für einen offiziellen Race-Day-Look.",
    "53": "Eine Sommervariante des 2014er Racing Miku Designs. Miku trägt eine ärmellose Version ihres blauen Rennoutfits und einen kurzen Rock, der etwas mehr Haut für das heißere Wetter zeigt. Die offiziellen Farben und Logos bleiben gleich.",
    "54": "Der 2015 Racing Miku, entworfen vom Künstler Oguchi. Sie trägt eine elegante Rennjacke in Weiß und Aqua mit passendem Faltenrock und weißen Stiefeln. Ihr Outfit besteht aus Neon-Akzenten und einem blauen Schal, der ein cooles, modernes Race-Feeling verleiht.",
    "55": "Eine Sommerversion von Racing Miku 2015. Mikus Jacke ist zu einem Crop-Top-Stil verkürzt und sie tauscht den vollen Rock gegen Shorts. Das Farbschema bleibt in Weiß und Aqua und bietet einen kühleren Look für warme Renntage.",
    "56": "Das 2016 Racing Miku Design. Sie trägt eine weiß-blaue Rennjacke über einem schwarzen Tanktop mit einem kurzen, mehrlagigen Rock. Das Outfit fühlt sich mit Sponsoren-Patches sportlich an und Mikus Haare haben in dieser Saison coole Cyan-Highlights.",
    "57": "Eine Sommervariante der Racing Miku 2016. Miku trägt ein ärmelloses Top mit Reißverschluss und einen kürzeren Rock, sowohl in Weiß als auch in Blau, wobei ihre Taille freiliegt. Diese Version ist für heiße Rennbedingungen unter Beibehaltung des gleichen Farbschemas gedacht.",
    "58": "Der Racing Miku 2017 von Künstler Rio. Sie trägt eine taillierte türkisfarbene Rennjacke und schwarze Shorts mit weißen Akzenten. Das Outfit zeichnet sich durch schlanke Linien und einen Schirmhut aus, der Geschwindigkeit und Professionalität als Maskottchen des Teams verkörpert.",
    "59": "Sommervariante der Racing Miku 2017. Mikus Jacke ist gekürzt und sie trägt ein Crop-Top mit den gleichen türkisfarbenen und schwarzen Farben. Abgerundet wird das Ensemble durch einen kurzen Rock und sportliche Stiefel, die sie unter der Sommersonne kühl halten.",
    "60": "Frühlingsvariante der Racing Miku 2017. Mikus Outfit zeigt Pastellfarben und Blumenmotive auf ihrer Rennjacke, die Frühlingsstimmung mit Rennsportgeist verbinden. Es ist eine leichtere, dekorativere Version ihrer üblichen Uniform.",
    "61": "Das 2018 Racing Miku Design. Miku trägt eine elegante weiß-blaue Rennjacke über einem passenden Kurztop und Rock. Ihr Outfit zeichnet sich durch kühne eckige Designs und einen Rennhelm aus, der den innovativen Stil des Teams widerspiegelt.",
    "62": "Sommervariante der Racing Miku 2018. Mikus langärmelige Jacke wird durch eine kurze Weste ersetzt und ihr Rock ist kürzer geschnitten. Das Farbschema von Weiß und Blau bleibt erhalten und ermöglicht Bewegungsfreiheit bei heißem Wetter.",
    "63": "Das 2019 Racing Miku Design. Miku trägt eine marineblaue und weiße Jacke mit grünen Akzenten über einem kurzen Rock. Das Outfit fühlt sich sportlich und aerodynamisch an und wird mit einer Rennmütze abgerundet.",
    "64": "Sommervariante der Racing Miku 2019. Die langen Ärmel des Outfits werden durch eine leichte Weste ersetzt, und der Rock ist etwas kürzer. Das marineblaue und grüne Farbschema wird beibehalten und verleiht ihr einen frischen Look für Sommerrennen.",
    "65": "Frühlingsvariante der Racing Miku 2019. Mikus Outfit ist mit Blumenmustern und pastellfarbenen Highlights geschmückt und feiert den Frühling. Die Rennjacke ist immer noch präsent, aber mit helleren Farben und einem fröhlichen Design.",
    "66": "Das 2020 Racing Miku. Sie trägt eine weiße und himmelblaue Rennjacke über einem passenden Kurztop und Rock und erinnert damit an die Teamfarben von Good Smile Racing. Das Ensemble wirkt dynamisch und modern, passend für die rasante GT-Saison.",
    "67": "Sommervariante von Racing Miku 2020. Mikus Outfit wird für die Saison aufgehellt: ein ärmelloses Top und ein kürzerer Rock in Weiß und Blau. Die Farben und Sponsorenlogos bleiben gleich und halten sie für einen heißen Tag auf der Strecke bereit.",
    "68": "Das 2021 Racing Miku Design. Sie trägt einen weißen und dunkelblauen Renn-Jumpsuit mit Neon-Akzenten. Das Outfit hat einen futuristischen Racer-Look, komplett mit Visierhelm und aerodynamischem Styling.",
    "69": "Sommervariante von Racing Miku 2021. Mikus Jacke und Rock sind für warmes Wetter mit dem gleichen weißen und blauen Farbschema getrimmt. Das Outfit ist sportlich und atmungsaktiv und repräsentiert gleichzeitig ihr Rennteam.",
    "70": "Frühlingsvariante Racing Miku 2021. Der Rennanzug verfügt über pastellrosa Highlights und florale Aufkleber, die ihm einen saisonalen Touch verleihen. Miku trägt immer noch das Standard-Weiß und Blau als Basis für diesen von Kirschblüten inspirierten Look.",
    "71": "Miku spielt als Kagamine Rin und übernimmt Rins charakteristisches gelb-schwarzes Outfit und seine Schleife. Effektiv eine Version von Rin mit Mikus Gesicht – ein lustiger Crossover-Stil, der von Fans geliebt wird.",
    "72": "Miku spielt Kagamine Len in seinem coolen weißen Oberteil im Matrosenstil, schwarzen Shorts und einer Krawatte. Im Wesentlichen eine Version von Len mit Mikus Gesicht – ein lustiger Crossover-Stil, der von Fans geliebt wird.",
    "73": "Miku spielt Megurine Luka in Lukas elegantem Kleid in Schwarz und Gold. Dieser reife Stil verwandelt Miku effektiv in eine Version von Luka mit Mikus Gesicht – ein lustiger Crossover-Stil, der von Fans geliebt wird.",
    "74": "Miku spielt als MEIKO und übernimmt das klassische rote Outfit von MEIKO – ein Oberteil und ein Rock mit Taille. Dieses Outfit lässt Miku mit ihrem Gesicht wie eine Version von MEIKO aussehen und feiert die frühe Vocaloid-Ära.",
    "75": "Miku spielt als KAITO, nimmt seinen langen blauen Mantel und das passende Schal-Ensemble an. Es ist im Wesentlichen eine Version von KAITO mit Mikus Gesicht, ein lustiger Crossover-Stil, der von Fans geschätzt wird.",
    "76": "Miku spielt als Kasane Teto und trägt Tetos charakteristische rosa Doppelbohrer-Frisur und -Outfit. Dieser verspielte Crossover verwandelt Miku in Teto-Miku – ein beliebter Fan-Mashup-Stil.",
    "77": "Miku spielt als GUMI und übernimmt GUMIS orangefarbenes Crop-Top und Rock mit grünen Akzenten und einer Brille auf dem Kopf. Dieser Stil lässt Miku wie GUMI mit Mikus Gesicht aussehen – eine lustige Hommage an das Vocaloid-Lineup.",
    "78": "Ein besonderes Outfit zum 10-jährigen Jubiläum von Miku. Miku trägt ein perlmuttweißes Kleid, das von ihrem Originalkostüm inspiriert ist und mit Regenbogenbändern und der Nummer \"10\" verziert ist. Dieses Jubiläumsdesign von KEI verleiht ihr einen festlichen, gedenkenden Glanz.",
    "79": "Miku nimmt die Form einer Frühlingsfee an. Sie ist in einem hellgrünen Kleid mit Blütenblättern und schmetterlingsartigen Flügeln geschmückt. Dieser bezaubernde Look stellt sich Miku als eine winzige saisonale Fee vor, die die Frühlingsblüte einlädt.",
    "80": "Ein süßes und mädchenhaftes Modul mit Miku in einem rosa Outfit mit Herzmotiv, das von Suoh entworfen wurde. Sie hat große Schleifenverzierungen in den Haaren und Herzmotive an Kleid und Stiefeln. Dieser Look ist überfüllt mit idolartigem Charme und süßem, romantischem Stil.",
    "81": "Ein ruhiges Herbst-Outfit. Miku ist in einem traditionellen Erntefest-Kimono mit Mond- und Kaninchenmotiven gekleidet. Die warmen erdigen Farben und das sanfte Design rufen das Gefühl hervor, einen Erntemond in einer kühlen Herbstnacht mit Miku an Ihrer Seite zu beobachten.",
    "82": "Eine Version von Miku, wie sie in der Leo/Need-Band von Project SEKAI erscheint. Sie trägt ein lässiges Schulband-Outfit – eine stylische Schuluniform mit leichtem Cardigan und Turnschuhen. Dieser Look unterstreicht Mikus zugängliche Bandmitgliedsseite bei Auftritten mit Leo/Need.",
    "83": "Ein funkelndes Modul, in dem Miku wie aus Kristall geformt erscheint. Ihr Outfit ist durchscheinend und facettiert wie ein Edelstein und bricht Licht in Regenbögen. MiCrystal Miku sieht aus wie eine zarte Glasstatue, die mit einem reinen, kristallklaren Ton zum Leben erwacht.",
    "84": "Dieses Outfit stammt aus Ryos Song „ODDS&ENDS.\" Miku wird in einem bescheidenen mechanischen Stil gezeigt – ein einfaches weißes Tanktop, Arbeitshandschuhe und Stiefel – umgeben von Werkzeugen und kaputten Roboterteilen. Es ist ein ergreifender Look, der Mikus Rolle als verschrotteter, wiederaufgebauter Roboter unterstreicht, der ihr das Herz aus dem Leib singt.",
    "85": "Eine fantastische Alice-in-Wonderland inspirierte Miku. Sie trägt ein kariertes Kleid und gestreifte Strümpfe und sieht aus, als wäre sie gerade durch das Kaninchenloch in eine seltsame neue Welt gestürzt. Dieses skurrile Outfit vereint Neugier und einen Hauch von Wahnsinn mit Spielkartenmotiven und einem Taschenuhr-Accessoire.",
    "86": "Aus dem Lied \"Romeo und Aschenputtel\" trägt Miku ein Vintage-Ballkleid. Es ist ein schönes Kleid im viktorianischen Stil in Weißtönen und tiefblau mit Spitzenhandschuhen. Diese Kleidung lässt Miku wie die tragische Heldin eines Märchens aussehen, die sich um Mitternacht nach Liebe sehnt.",
    "87": "Ein allgemeines Modul für Miku aus dem Projekt Diva! Sie ist in einem hellweißen Hemd mit schwarzem Besatz und rotem Band, schwarzen Denim-Shorts, Schuhen mit roter Sohle und einem rot-schwarzen Band am linken Handgelenk gebündelt.",
    "88": "Mikus Outfit aus dem ikonischen Google Chrome CM-Song „Tell Your World.\" Sie trägt ein farbenfrohes Street-Fashion-Ensemble mit einem mehrschichtigen Tutu-Rock in Regenbogenfarben. Ein großes Paar Kopfhörer um ihren Hals vervollständigt diesen künstlerischen, weltoffenen Look.",
    "89": "Aus dem Abschlusslied „Sakura no Ame“ wird Miku in einer japanischen Highschool-Abschlussuniform dargestellt. Sie trägt einen rosa kirschblütenfarbenen Blazer und Rock mit rotem Band und steht unter fallenden Sakura-Blütenblättern. Dieser Look ist sentimental und sanft und repräsentiert Abschiede und Neuanfänge im Frühling.",
    "90": "Mikus berüchtigtes dunkles Gegenstück. Zatsune Miku hat langes schwarzes Haar mit roten Highlights anstelle von Blaugrün, rote Augen und eine schwarze Variante von Mikus Outfit. Sie strahlt eine unheimliche Aura aus – eine alternative, feindseligere Persönlichkeit von Miku, die aus der Fantasie der Fans geboren wurde.",
    "91": "Mikus Signature-Outfit von Magical Mirai 2013. Miku fungiert als magischer Zirkuszauberer, komplett mit einem Seidenhut, Umhang und Zauberstab. Sie sieht bereit aus, die Menge mit Bühnenmagie und Gesang zu blenden.",
    "92": "Mikus Signature-Outfit von Magical Mirai 2014. Ein futuristisches Outfit, das sich durch ein übergroßes Band auszeichnet, das ihre Haare bindet. Das Design verbindet ein Sci-Fi-Feeling mit niedlichen Idolelementen und repräsentiert Mikus sich ständig weiterentwickelnde Zukunft.",
    "93": "Mikus Signature-Outfit von Magical Mirai 2015. Miku trägt ein kariertes Outfit mit Krone oder Diadem. Das Karomuster fügt einen modernen Pop-Stil hinzu, und die kleine Krone bedeutet ihren Status als Königin des Events.",
    "94": "Mikus Signature-Outfit von Magical Mirai 2016. Ein Kostüm im Blaskapelle-Stil in Königsblau. Miku sieht aus wie ein Parade-Trommelmajor, der die Feier in einer Jacke im Militärstil und einem blau verzierten Paradehut anführt.",
    "95": "Mikus Signature-Outfit von Magical Mirai 2017. Ein einzigartiges Konzept, das eine Schuluniform im Seemannsstil mit einem wissenschaftlichen Laborkittel kombiniert. Mikus Outfit hat einen Matrosenkragen und Falten neben technischen, laborähnlichen Details, die sowohl Jugend als auch Innovation symbolisieren.",
    "96": "Mikus Signature-Outfit von Magical Mirai 2018. Dieses Design verleiht Miku einen verspielten Zirkus-Performer-Look. Sie hat Harlekin-Diamantenmuster auf ihrem Kleid, einen Narrenkragen und farbenfrohe Accessoires zum Thema Zirkus, die die Karnevalsatmosphäre verkörpern.",
    "97": "Mikus Signature-Outfit von Magical Mirai 2019. Mikus Outfit zeigt Sternmotive und sie trägt eine leuchtende Sternkrone auf dem Kopf. Das Kostüm ist elegant und kosmisch und feiert das Thema Sterne und Führung, während die magische Mirai neue Höhen erreicht.",
    "98": "Mikus Signature-Outfit von Magical Mirai 2020. Spiegelung der Kleidung eines Bandleaders mit einer leuchtend roten Marschbanduniform und einem Federhut. Trotz der Herausforderungen des Jahres 2020 strahlt dieses Outfit Entschlossenheit und Einheit durch Musik aus.",
    "99": "Mikus Signature-Outfit von Magical Mirai 2021. Miku trägt ein elegantes weißes und blaugrünes Outfit, das einem Wissenschaftslabormantel ähnelt, der mit futuristischer Mode verschmolzen ist. Brillen und technische Muster betonen das Design und fangen den zukunftsorientierten Geist der diesjährigen Veranstaltung ein.",
    "100": "Mikus Signature-Outfit von Magical Mirai 2022. Zum 10-jährigen Jubiläum von Magical Mirai trägt Miku ein weiches pastellfarbenes Ensemble, das Elemente aus den Designs der vergangenen Jahre enthält. Es ist ein feierliches All-Star-Outfit – pastellfarbenes Regenbogenkleid, Jubiläumslogo und fröhliche Anspielungen auf ihr Jahrzehnt der magischen Mirai.",
    "101": "Eine winzige Baby-Belle, die vor Glanz und Freude flattert. Dieser geheime Begleiter feiert Sammler, die den Garten vervollständigen."
  },
  "fr": {
    "1": "Le look classique de Hatsune Miku dans son emblématique queue de cochon bleu canard et sa tenue d'écolière futuriste, avec un gilet gris argenté, une jupe plissée et des accents bleu canard éclatants. C'est le design qui a tout déclenché, capturant le style gai et branché de Miku.",
    "2": "Le look classique 2007 de Miku de l'ère VOCALOID2. Elle porte la tenue originale noire et bleu canard – un gilet élégant, une cravate turquoise, une jupe plissée et des bottes hautes – incarnant l'image définitive qui a fait d'elle une idole virtuelle de la pop.",
    "3": "Une mise à niveau éthérée du design de Miku avec une touche futuriste : des manches translucides, des accents lumineux et une tenue blanche et noire élégante confèrent à Append Miku un charme d'un autre monde, doucement luminescent.",
    "4": "Un délicieux Miku sur le thème des fleurs de cerisier avec des cheveux roses et des cravates en cheveux de cerisier. La tenue de Sakura Miku est une recolore rose de son costume par défaut orné de motifs floraux et même de cerises formant un nœud – un look qui fait monter votre cœur en flèche avec des sentiments de printemps.",
    "5": "Une autre variante de Sakura Miku arborant une double queue rose pétale fluide avec des motifs de fleurs blanches. Son uniforme en fleurs de cerisier présente des accents floraux supplémentaires et de longs liens en ruban, faisant de ce Miku printanier une fée sakura vivante.",
    "6": "Miku s'habille comme un joli lapin de Pâques, avec des oreilles de lapin et une tenue de couleur pastel. Elle respire la joie du printemps – imaginez-la tenant un panier d'œufs et sautillant pour répandre la joie de Pâques dans cet ensemble adorable.",
    "7": "Miku dans un uniforme scolaire de style marin japonais classique. Avec une jupe plissée bleu marine, un haut blanc à col marin et une énergie juvénile, ce look capture parfaitement l'ambiance charmante du lycée de Miku.",
    "8": "Un Miku mélancolique sur le thème de l'eau vêtu d'une élégante robe bleu profond. Ses cheveux coulent comme les courants océaniques autour d'elle, et les volants et les dégradés de la tenue évoquent l'image d'une fille chantant seule au fond de la mer.",
    "9": "Une variante croisée avec Miku prenant le personnage de Black★Rock Shooter. Elle porte un manteau noir élégant, un short et un œil bleu flamboyant – un alter ego féroce et cool qui fusionne la voix de Miku avec un style prêt au combat.",
    "10": "La parodie chibi de Miku au visage simplifié et au sourire ouvert et constant. Hachune Miku est souvent vu agitant un oignon de printemps (negi) avec enthousiasme, incarnant un côté digne et adorable du caractère de Miku.",
    "11": "La tenue sur le thème chinois de Hatsune Miku présente une robe d'inspiration cheongsam chic en blanc et rouge. Cette version a souvent des motifs floraux et des manches fluides, reflétant un mélange d'idole pop moderne et d'élégance chinoise traditionnelle.",
    "12": "Un module conçu pour la chanson notoirement difficile « Hatsune Miku no Gekishou. » Miku apparaît presque comme un vampire diva numérique – une tenue gothique à volants, un jeu de couleurs noir et rouge spectaculaire et une aura intense pour correspondre à l'énergie extrême de la chanson.",
    "13": "Inspiré de la célèbre chanson, ce Miku porte un look de princesse : une robe noire à volants, des accessoires de rose rouge et une petite couronne perchée dans ses cheveux. Elle a l'air de la reine du monde gâtée qui se prélasse sur son lit en peluche, comme dans le PV original.",
    "14": "Un style discret et émotionnel pour la chanson « Rolling Girl. » Miku est représentée dans un uniforme scolaire avec des bandages enveloppant ses bras – reflétant les thèmes de lutte de la chanson. Ses couleurs vives habituelles sont atténuées, montrant un côté plus troublé du personnage de Miku.",
    "15": "Une tenue Miku plus sombre et élégante sur le thème de la chanson « Ghost Rule » de DECO*27. » Elle arbore un ensemble noir et rouge avec des bottes hautes et des gants sans doigts. Son expression et sa pose font allusion au secret et à la frustration, correspondant à l'humeur nerveuse de la chanson.",
    "16": "Pas exactement Miku – Haku est un personnage créé par un fan avec une tournure morose sur le design de Miku. Elle a des cheveux blanc argenté dans une queue de cheval basse, des yeux rouges fatigués et une version grise et violette de la tenue de Miku. Son regard dégage une ambiance mélancolique d '« idole ratée » qui contraste avec le pep de Miku.",
    "17": "Habillé comme une infirmière mignonne de la chanson « Love-Colored Ward », Miku porte un uniforme d'infirmière blanc avec un petit chapeau et un tablier rose. La tenue est rehaussée de cœurs et de symboles de croix médicales, donnant un thème hospitalier ludique au style normalement à la mode de Miku.",
    "18": "Un look d'uniforme militaire de l'ère Taisho tiré de la chanson à succès « Senbonzakura. » Miku porte une tenue militaire de style kimono magenta profond avec une casquette d'officier assortie, des gants blancs et des bottes. Le costume est orné d'emblèmes de fleurs de cerisier – un mélange saisissant de rétro et de moderne qui capture l'esprit de la chanson.",
    "19": "Un regard sombre inspiré des funérailles de la chanson « Saihate. » Miku porte une modeste robe de deuil noire avec un voile. Cette tenue lui donne une apparence gracieuse et douce-amère – comme si elle assistait à un dernier adieu, capturant parfaitement le ton mélancolique de la chanson.",
    "20": "Conçu par l'artiste Hachi pour la chanson « Sand Planet », ce Miku brave un monde désertique. Elle porte des vêtements du désert en lambeaux – un manteau de terre, des bottes et un chapeau du désert – avec un masque à gaz autour du cou. Le style post-apocalyptique balayé par le sable la distingue de son image pop habituelle.",
    "21": "Un Miku excentrique sur le thème de l'espace, inspiré de la chanson « Alien Alien. » Elle arbore une tenue fantaisiste avec des accessoires à double queue en forme d'antenne et des couleurs fluo vibrantes. Miku ressemble à une adorable idole extraterrestre prête à chanter et à envahir les cœurs.",
    "22": "Un Miku de style lolita gothique du module « Police secrète ». Elle porte une robe noire à volants avec de la dentelle, associée à des ailes foncées et à un halo. Le look est à la fois mignon et sombre, parfaitement assorti à l'ambiance secrète et rebelle de la chanson.",
    "23": "Un costume inspiré du Pays des Merveilles où Miku prend l'apparence du Lièvre de Mars. Elle porte une tenue à volants avec des oreilles de lapin et des accessoires pour la fête du thé. Ce style fantaisiste raccourcit les twintails de Miku et lui donne un look espiègle, légèrement fou, tout droit sorti du monde d'Alice.",
    "24": "Un module de bonbons sucrés de Project DIVA X, mettant en vedette Miku dans une tenue pastel ressemblant à une lolita ornée de motifs de bonbons. Elle ressemble à une confiserie humaine, avec des bas rayés et un accessoire de sucette géant – parfaitement adapté aux chansons enjouées et enjouées.",
    "25": "Miku se transforme en chat chanceux ! Elle porte une tenue de style traditionnel avec des oreilles de chat, un collier en cloche et une pose en forme de patte rappelant une statue de maneki neko. Avec un kimono rouge et blanc et une queue de chat mignonne, ce Miku promet d'apporter la bonne fortune.",
    "26": "Une élégante tenue de concert symphonique basée sur l'illustration de KEI pour Miku Symphony 2017. Miku apparaît dans une robe de bal noire chic avec une doublure bleue, tenant un violon. La robe sophistiquée et le sourire raffiné lui confèrent une présence gracieuse et soliste d'orchestre.",
    "27": "La tenue de Miku Symphony 2018 donne à Miku un look sobre et classique, semblable à celui d'une femme de chambre victorienne ou d'un accompagnateur d'orchestre. Elle porte une robe noire et blanche avec des volants en forme de tablier et des motifs musicaux. C'est un charmant mélange de mignon et de formel, parfait pour un concert orchestral.",
    "28": "Pour le 5e anniversaire de Miku Symphony, Miku porte une robe de célébration spéciale dessinée par l'artiste Rella. C'est une robe blanche et bleu ciel ornée de notes de musique et d'étoiles. Elle ressemble à une princesse sur scène, commémorant cinq ans de performances symphoniques.",
    "29": "Ce design est basé sur le concept art original de Miku – une version hypothétique où elle a une tenue différente et même des cheveux légèrement bruns. Miku if Ver. porte une robe élégante inspirée de l'uniforme scolaire avec des accents bleu sarcelle, offrant aux fans un aperçu d'un Miku alternatif qui aurait pu l'être.",
    "30": "Une tenue portée pour un concert spécial hiver. Miku est enveloppé dans un manteau blanc festif avec des motifs de flocons de neige bleus, une écharpe moelleuse et des cache-oreilles assortis. Elle a l'air chaude et radieuse sur scène, prête à se produire dans un pays des merveilles hivernal.",
    "31": "Une tenue de fête du 12e anniversaire de Miku en 2019. Miku porte une robe de soirée bleue à volants avec des rubans et des nœuds, comme on le voit sur l'illustration officielle de l'anniversaire. Elle tient même un gâteau d'anniversaire décoré, débordant de charme joyeux pour marquer la journée spéciale.",
    "32": "Un petit dérivé fantaisiste de Miku qui vit littéralement dans une bouteille ! Ce personnage fabriqué en éventail a Miku avec des cheveux bleus liquides qui coulent enfermés dans une bouteille transparente. C'est un concept adorable qui imagine Miku comme un génie magique ou un esprit dans une bouteille.",
    "33": "Un dérivé Miku bizarre et humoristique composé de la tête de Miku au sommet d'une paire de jambes humaines. Shiteyan'yo est rose vif et tout à fait étrange, né de l'humour sur Internet. Bien que troublante, elle est un mème bien-aimé – un témoignage de la créativité excentrique du fandom Vocaloid.",
    "34": "La tenue de Miku de la chanson « Love is War. » Elle se tient sur des haut-parleurs imposants, vêtue d'une robe noire en lambeaux et d'une longue écharpe qui coule. Avec un mégaphone à la main et un style affligé et passionné, ce look capture l'émotion intense et rebelle de l'histoire de la chanson.",
    "35": "Un module sur le thème d'Halloween où Miku se déguise en jolie sorcière à la citrouille. Elle porte une robe orange et violette avec des motifs citrouille, un chapeau de sorcière à rayures, et porte une jack-o’-lantern. Sweet Pumpkin Miku est plein de joie d'Halloween et de méfaits sucrés.",
    "36": "Le Snow Miku 2011 porte un manteau d'hiver blanc moelleux et des cache-oreilles, chaud et noble dans l'hiver enneigé de Sapporo. Des accents roses et une écharpe douce complètent ce design précoce de Snow Miku, apportant une joie confortable au froid.",
    "37": "Snow Miku 2012 porte un manteau bleu clair chaud avec une capuche moelleuse et des liens à pompon, ce qui lui a valu le surnom de « manteau moelleux ». Elle porte le charme de l'hiver avec des motifs flocons de neige sur sa tenue et ses cheveux devenus blanc argenté.",
    "38": "Le Snow Miku 2013 apparaît dans un kimono blanc pur orné de fraises et de motifs floraux. Ce design « Kimono blanc fraise » donne à Miku une beauté sereine et traditionnelle, célébrant l'hiver à travers un mélange d'images de neige et de printemps.",
    "39": "Snow Miku 2014 prend un motif de fille magique – « Magical Snow. » Elle porte une cape et un chapeau de sorcier décorés d'étoiles et de flocons de neige, brandissant un bâton de flocon de neige. Cette tenue enchanteresse transforme Miku en une sorcière d'hiver scintillant de magie du gel.",
    "40": "Le Snow Miku 2015, appelé « Snow Bell », s'articule autour de fleurs de muguet. Vêtue d'une robe blanche en forme de cloche avec des rubans verts et une bordure en fourrure, elle incarne un esprit doux de la neige, prête à vous réchauffer à temps pour le printemps.",
    "41": "Snow Miku 2016 est sur le thème des sports d'hiver : elle porte une parka confortable bleue et blanche avec des accents roses, ainsi que des lunettes de ski et un motif hibou sur son chapeau. « Snow Owl Parka » Miku semble prête à dévaler les pistes, gardant les choses givrées et amusantes avec son style de neige aventureux.",
    "42": "Le Snow Miku 2017, « Twinkle Constellations », a un thème céleste. Elle est vêtue d'une cape bleu nuit ornée de constellations, et sa tenue scintille comme le ciel nocturne au-dessus des champs enneigés. Ce design allie l'hiver et l'émerveillement étoilé en un seul ensemble scintillant.",
    "43": "Snow Miku 2018 est connue sous le nom de « Crane Priestess ». » Elle porte une tenue japonaise traditionnelle de miko (jeune fille du sanctuaire) aux riches couleurs rouges et blanches, accentuée par des détails inspirés de la grue. Ce design gracieux célèbre la faune et la spiritualité hivernale d'Hokkaido.",
    "44": "Le Snow Miku 2019 apparaît comme une « Princesse des Neiges ». » Vêtue d'une élégante robe de bal bleu glacier et d'une tiare, elle ressemble à tous les membres de la royauté de l'hiver. Les volants superposés et les ornements de flocons de neige de la tenue confèrent à Miku un charme royal et givré.",
    "45": "Snow Miku 2020 défile avec une tenue inspirée des fanfares, d'où « Marching Orchestra. » Elle porte une veste militaire élégante, des motifs de notes de musique et un chapeau à plumes. Menant un défilé à travers la neige, ce design est festif et plein d'énergie musicale.",
    "46": "Snow Miku 2021 brille avec un thème « Illumination ». Sa tenue est décorée de lumières et de motifs d'illuminations hivernales – ampoules lumineuses, motifs de skyline de la ville et étoiles scintillantes. Elle représente les chaudes lumières festives qui égayent les longues nuits d'hiver.",
    "47": "Le Snow Miku 2022 s'articule autour de la mer hivernale d'Hokkaido. Son costume intègre des bleus océaniques, des perles et des éléments marins comme des accessoires coquillages. Avec des manches ondulées fluides et des accents aquatiques, elle donne vie à la beauté sereine de la côte hivernale d'Hokkaido.",
    "48": "Le design Miku Racing 2010 – une tenue mascotte officielle Good Smile Racing. Miku porte une combi-pantalon orange vif et blanche avec des logos de sponsors, de longs gants orange et des lunettes de protection teintées d'orange. Ses doubles queues sont tenues avec des bandeaux orange pour compléter le look de reine de la course.",
    "49": "Le module Racing Miku 2011. Miku porte une tenue de course blanche et noire élégante avec une bordure turquoise fluo et un manteau court transparent. Des bottes et des gants noirs aux accents turquoise complètent ce look futuriste de voiture de course fille.",
    "50": "La tenue Racing Miku 2012. Un crop-top et une jupe blancs aux accents audacieux turquoise et violet, ainsi que des gants blancs et des cuissardes. Cet ensemble tape-à-l' œil aux touches futuristes a été conçu par l'illustrateur GaN pour la saison de course Super GT.",
    "51": "Le design Racing Miku 2013 de Saitom. Elle arbore une mini robe de course verte et blanche avec des motifs mécaniques et des gants assortis. Le look a une ambiance sportive et énergique adaptée au circuit.",
    "52": "La tenue Racing Miku 2014, conçue par l'illustrateur Koyamashigeto. C'est une veste de course bleue et blanche avec une bordure argentée, associée à une minijupe blanche. Les cheveux de Miku ont des reflets bleus givrés et elle enfile des bottes assorties pour un look officiel le jour de la course.",
    "53": "Une variation estivale du design Racing Miku 2014. Miku porte une version sans manches de sa tenue de course bleue et une jupe courte, montrant un peu plus de peau pour le temps plus chaud. Les couleurs et logos officiels restent les mêmes.",
    "54": "Le Racing Miku 2015, conçu par l'artiste Oguchi. Elle porte une veste de course élégante blanche et aqua, avec une jupe plissée assortie et des bottes blanches. Sa tenue comprend des accents fluo et un foulard bleu, donnant une sensation de course fraîche et moderne.",
    "55": "Une version estivale de Racing Miku 2015. La veste de Miku est raccourcie à un style court et elle échange la jupe ample contre un short. La palette de couleurs reste en blanc et en aqua, offrant un look plus frais pour les journées de course chaudes.",
    "56": "Le design Racing Miku 2016. Elle arbore une veste de course blanche et bleue sur un débardeur noir, avec une jupe courte superposée. La tenue a une touche sportive avec des patchs sponsorisés, et les cheveux de Miku ont des reflets cyan frais cette saison.",
    "57": "Une variante estivale de Racing Miku 2016. Miku porte un haut zippé sans manches et une jupe plus courte, à la fois blanche et bleue, avec son ventre dénudé. Cette version est destinée aux conditions de course à chaud tout en conservant le même schéma de couleurs.",
    "58": "Le Racing Miku 2017 de l'artiste Rio. Elle porte une veste de course turquoise ajustée et un short noir aux accents blancs. La tenue présente des lignes épurées et un chapeau à visière, incarnant la vitesse et le professionnalisme en tant que mascotte de l'équipe.",
    "59": "Variante estivale de Racing Miku 2017. La veste de Miku est raccourcie et elle porte un crop-top aux mêmes couleurs turquoise et noire. L'ensemble est complété par une jupe courte et des bottes athlétiques, la gardant au frais sous le soleil d'été.",
    "60": "Variante de printemps de Racing Miku 2017. La tenue de Miku arbore des couleurs pastel et des motifs floraux sur sa veste de course, mêlant gaieté printanière et esprit de course. C'est une version plus légère et plus décorative de son uniforme habituel.",
    "61": "Le design Racing Miku 2018. Miku porte une veste de course blanche et bleue élégante sur un crop top et une jupe assortis. Sa tenue présente des motifs angulaires audacieux et un casque de course, reflétant le style avant-gardiste de l'équipe.",
    "62": "Variante estivale de Racing Miku 2018. La veste à manches longues de Miku est remplacée par un gilet court et sa jupe est raccourcie. La palette de couleurs du blanc et du bleu reste, permettant une facilité de mouvement par temps chaud.",
    "63": "Le design Racing Miku 2019. Miku arbore une veste bleu marine et blanche aux accents verts, sur une jupe courte. La tenue a une sensation sportive et aérodynamique, et comprend une casquette de course pour compléter le look.",
    "64": "Variante estivale de Racing Miku 2019. Les manches longues de la tenue sont remplacées par un gilet léger, et la jupe est légèrement plus courte. La palette de couleurs bleu marine et vert est conservée, ce qui lui donne un nouveau look pour les courses d'été.",
    "65": "Variante de printemps de Racing Miku 2019. La tenue de Miku est ornée de motifs floraux et de reflets pastel, célébrant le printemps. La veste de course est toujours présente mais avec des couleurs plus claires et un design joyeux.",
    "66": "Le Racing Miku 2020. Elle porte une veste de course blanche et bleu ciel sur un crop top et une jupe assortis, faisant écho aux couleurs de l'équipe Good Smile Racing. L'ensemble est dynamique et moderne, adapté à la saison GT rapide.",
    "67": "Variante estivale de Racing Miku 2020. La tenue de Miku est allégée pour la saison : un haut sans manches et une jupe plus courte en blanc et bleu. Les couleurs et les logos des sponsors restent les mêmes, la gardant prête pour une chaude journée sur la piste.",
    "68": "Le design Racing Miku 2021. Elle arbore une combi-pantalon de course blanche et bleu foncé aux accents fluo. La tenue a un look racer futuriste, avec un casque à visière et un style aérodynamique.",
    "69": "Variante estivale de Racing Miku 2021. La veste et la jupe de Miku sont garnies par temps chaud, avec les mêmes couleurs blanches et bleues. La tenue est sportive et respirante tout en représentant son équipe de course.",
    "70": "Variante de printemps de Racing Miku 2021. Le maillot de course présente des reflets rose pastel et des décalcomanies florales, ce qui lui donne une touche saisonnière. Miku porte toujours le blanc et le bleu standard comme base de ce look inspiré des fleurs de cerisier.",
    "71": "Miku joue le rôle de Kagamine Rin, adoptant la tenue et l'arc jaunes et noirs de Rin. Effectivement, une version de Rin avec le visage de Miku – un style crossover amusant apprécié des fans.",
    "72": "Miku joue le rôle de Kagamine Len, vêtu de son haut blanc style marin, de son short noir et de sa cravate. Essentiellement une version de Len avec le visage de Miku – un style crossover amusant apprécié des fans.",
    "73": "Miku joue le rôle de Megurine Luka, vêtue de l'élégante robe noire et dorée de Luka. Ce style mature transforme efficacement Miku en une version de Luka avec le visage de Miku – un style crossover amusant apprécié des fans.",
    "74": "Miku joue le rôle de MEIKO, adoptant la tenue rouge classique de MEIKO – un haut et une jupe à col montant. Cette tenue fait ressembler Miku à une version de MEIKO avec son visage, célébrant le début de l'ère Vocaloid.",
    "75": "Miku joue le rôle de KAITO, adoptant son long manteau bleu et son ensemble d'écharpes assorti. C'est essentiellement une version de KAITO avec le visage de Miku, un style crossover amusant apprécié des fans.",
    "76": "Miku joue le rôle de Kasane Teto, portant la coiffure et la tenue emblématiques de Teto. Ce crossover ludique transforme Miku en Teto-miku - un style de mashup bien-aimé des fans.",
    "77": "Miku joue le rôle de GUMI, adoptant le crop-top et la jupe orange de GUMI avec des accents verts et des lunettes de protection sur la tête. Ce style fait ressembler Miku à GUMI avec le visage de Miku – un hommage amusant à la gamme de vocaloïdes.",
    "78": "Une tenue spéciale célébrant le 10e anniversaire de Miku. Miku porte une robe blanche nacrée inspirée de son costume original, ornée de rubans arc-en-ciel et du chiffre « 10 ». Ce design anniversaire de KEI lui donne une lueur festive et commémorative.",
    "79": "Miku prend la forme d'une fée du printemps. Elle est ornée d'une robe vert clair avec des pétales de fleurs et des ailes en forme de papillon. Ce regard enchanteur imagine Miku comme une petite fée saisonnière apportant la floraison printanière.",
    "80": "Un module mignon et girly mettant en vedette Miku dans une tenue rose sur le thème du cœur conçue par Suoh. Elle a de grands ornements de ruban dans ses cheveux et des motifs de cœur sur sa robe et ses bottes. Ce look déborde de charme idolâtre et de style doux et romantique.",
    "81": "Une tenue automnale sereine. Miku est vêtu d'un kimono traditionnel du festival de la récolte avec des motifs de lune et de lapin. Les couleurs chaudes et terreuses et le design doux évoquent la sensation de regarder une lune de récolte par une nuit d'automne fraîche avec Miku à vos côtés.",
    "82": "Une version de Miku telle qu'elle apparaît dans la bande Leo/need du projet SEKAI. Elle porte une tenue de groupe scolaire décontractée – un uniforme scolaire élégant avec un cardigan léger et des baskets. Ce regard met en évidence le côté accessible et membre du groupe de Miku lorsqu'il joue avec Leo/need.",
    "83": "Un module étincelant où Miku apparaît comme sculpté dans du cristal. Sa tenue est translucide et facettée comme une pierre précieuse, réfractant la lumière en arcs-en-ciel. MiCrystal Miku ressemble à une délicate statue de verre qui prend vie, chantant avec un ton pur et cristallin.",
    "84": "Cette tenue vient de la chanson de ryo « ODDS&ENDS. » Miku est représenté dans une tenue de mécanicien humble – un simple débardeur blanc, des gants de travail et des bottes – entouré d'outils et de pièces de robot cassées. C'est un regard poignant qui souligne le rôle de Miku en tant que robot mis au rebut et reconstruit chantant son cœur.",
    "85": "Un Miku fantastique inspiré d'Alice au pays des merveilles. Elle porte une robe à carreaux et des bas rayés, comme si elle venait de dégringoler dans le terrier du lapin dans un nouveau monde étrange. Cette tenue fantaisiste allie curiosité et un soupçon de folie, avec des motifs de cartes à jouer et un accessoire de montre de poche.",
    "86": "D'après la chanson « Roméo et Cendrillon », Miku porte une robe de bal vintage. C'est une jolie robe de style victorien dans des tons de blanc et de bleu profond avec des gants en dentelle. Cette tenue fait ressembler Miku à l'héroïne tragique d'un conte de fées, aspirant à l'amour à minuit.",
    "87": "Un module général pour Miku du projet Diva ! Elle est enveloppée dans une chemise blanche claire à liseré noir et ruban rouge, un short en jean noir, des chaussures à semelles rouges et un ruban rouge et noir au poignet gauche.",
    "88": "La tenue de Miku de l'emblématique chanson Google Chrome CM « Tell Your World. » Elle porte un ensemble street fashion coloré avec une jupe tutu multicouche éclaboussée de couleurs de peinture arc-en-ciel. Une grande paire d'écouteurs autour de son cou complète ce look artistique et connecté au monde.",
    "89": "D'après la chanson de remise des diplômes « Sakura no Ame », Miku est dépeint dans un uniforme de remise des diplômes japonais. Elle porte un blazer rose couleur cerisier et une jupe avec un ruban rouge, debout sous les pétales de sakura qui tombent. Ce look est sentimental et doux, représentant des adieux et de nouveaux départs au printemps.",
    "90": "L'infâme homologue sombre de Miku. Zatsune Miku a de longs cheveux noirs avec des reflets rouges au lieu de bleu sarcelle, des yeux rouges et une variation noire de la tenue de Miku. Elle dégage une aura sinistre – une personnalité alternative et plus hostile de Miku née de l'imagination des fans.",
    "91": "La tenue signature de Miku de Magical Mirai 2013. Miku agit comme un magicien de cirque magique, avec un chapeau en soie, une cape et une baguette. Elle a l'air prête à éblouir la foule avec de la magie scénique et des chansons.",
    "92": "La tenue signature de Miku de Magical Mirai 2014. Une tenue futuriste caractérisée par un ruban surdimensionné qui noue ses cheveux. Le design allie une sensation de science-fiction à des éléments d'idole mignons, représentant l'avenir en constante évolution de Miku.",
    "93": "La tenue signature de Miku de Magical Mirai 2015. Miku porte une tenue sur le thème des plaid avec une couronne ou une tiare. Le motif écossais ajoute un style pop moderne, et la petite couronne signifie son statut de reine de l'événement.",
    "94": "La tenue signature de Miku de Magical Mirai 2016. Un costume de fanfare bleu roi. Miku ressemble à un grand tambour de parade, menant la célébration dans une veste de style militaire et un chapeau de parade décoré de bleu.",
    "95": "La tenue signature de Miku de Magical Mirai 2017. Un concept unique mélangeant un uniforme scolaire de style marin avec une blouse de laboratoire scientifique. La tenue de Miku a un col marin et des plis ainsi que des détails techniques de laboratoire, symbolisant à la fois la jeunesse et l'innovation.",
    "96": "La tenue signature de Miku de Magical Mirai 2018. Ce design donne à Miku un look d'interprète de cirque ludique. Elle a des motifs de diamants arlequins sur sa robe, un col en forme de bouffon et des accessoires colorés sur le thème du cirque, incarnant l'atmosphère du carnaval.",
    "97": "La tenue signature de Miku de Magical Mirai 2019. La tenue de Miku comporte des motifs d'étoiles et elle porte une couronne d'étoiles brillantes sur sa tête. Le costume est élégant et cosmique, célébrant le thème des étoiles et des conseils alors que Magical Mirai atteint de nouveaux sommets.",
    "98": "La tenue signature de Miku de Magical Mirai 2020. Reflétant la tenue d'un chef d'orchestre avec un uniforme de fanfare rouge vif et un chapeau à panache. Malgré les défis de 2020, cette tenue respire la détermination et l'unité à travers la musique.",
    "99": "La tenue signature de Miku de Magical Mirai 2021. Miku porte une tenue blanche et bleu sarcelle élégante ressemblant à un manteau de laboratoire scientifique fusionné avec la mode futuriste. Des lunettes et des motifs techniques accentuent le design, capturant l'esprit prospectif de l'événement de cette année.",
    "100": "La tenue signature de Miku de Magical Mirai 2022. Pour le 10e anniversaire de Magical Mirai, Miku porte un ensemble doux de couleur pastel qui incorpore des éléments des designs des années passées. Il s'agit d'une tenue festive et étoilée : robe arc-en-ciel pastel, logo anniversaire et joyeux clin d'œil à sa décennie de Mirai magique.",
    "101": "Un minuscule bébé belle qui flotte d'étincelles et de joie. Ce compagnon secret célèbre les collectionneurs qui complètent le jardin."
  },
  "zh": {
    "1": "Hatsune Miku穿着标志性的青色辫子和未来派女学生服装的经典外观，搭配银灰色背心、百褶裙和发光的青色口音。正是这个设计开启了这一切，捕捉了Miku开朗时尚的风格。",
    "2": "Miku 2007年VOCALOID2时代的经典造型。她穿着原创的黑色和青色套装–时尚的背心，绿松石领带，百褶裙和高筒靴–体现了使她成为虚拟流行偶像的权威形象。",
    "3": "Miku的设计以未来主义风格进行了飘逸的升级--半透明的袖子、发光的装饰和时尚的白色和黑色服装，赋予Append Miku柔和的发光、超凡脱俗的魅力。",
    "4": "令人愉悦的樱花主题Miku ，粉红色头发和樱桃发带。Sakura Miku的服装是她默认服装的粉红色重新着色，饰有花卉图案，甚至是形成蝴蝶结的樱桃–这种外观让您的心灵充满春天的感觉。",
    "5": "Sakura Miku的另一种变体，流淌着白色花朵图案的花瓣粉色双尾。她的樱花制服具有额外的花卉口音和长丝带领带，使这个春天Miku看起来像一个活生生的樱花仙子。",
    "6": "Miku打扮成可爱的复活节兔子，配有兔子耳朵和柔和色彩的服装。她散发着春天的欢呼声--想象她拿着一篮鸡蛋，在这个可爱的合奏中跳来跳去，传播复活节的喜悦。",
    "7": "身着经典日本水手式校服的Miku。这款造型采用海军蓝百褶裙、白色水手领上衣和年轻活力，完美捕捉了Miku迷人的高中氛围。",
    "8": "一件忧郁的水下主题Miku ，穿着一件优雅的深蓝色连衣裙。她的头发像洋流一样流淌在周围，衣服的褶边和渐变让人想起一个女孩独自在海底唱歌的形象。",
    "9": "Miku扮演Black★ Rock Shooter角色的跨界变体。她穿着一件时尚的黑色外套、短裤和炽热的蓝眼睛--一种凶猛而酷炫的改变自我，将Miku的声音与摇滚的战斗准备风格融为一体。",
    "10": "Miku的赤壁模仿，简洁的面孔和不断张开嘴巴的微笑。人们经常看到Hachune Miku热情地挥舞着嫩葱，体现了Miku性格中值得模因和可爱的一面。",
    "11": "Hatsune Miku的中国主题服装采用时尚的白色和红色旗袍风格。这个版本通常有花卉图案和流畅的袖子，反映了现代流行偶像和中国传统优雅的融合。",
    "12": "专为众所周知的难度歌曲“Hatsune Miku no Gekishou”设计的模块。“Miku看起来几乎像一个数字女主角吸血鬼–一个褶边的哥特式服装，戏剧性的黑红配色方案，以及与歌曲的极致能量相匹配的强烈光环。",
    "13": "受到这首著名歌曲的启发，这位Miku穿着公主般的外观：褶边黑色连衣裙、红色玫瑰配饰和栖息在她头发上的小王冠。她看起来像被宠坏的世界女王，躺在她的毛绒床上，就像最初的PV一样。",
    "14": "“Rolling Girl.”这首歌的柔和、情感风格。“Miku穿着校服，双臂缠着绷带，反映了这首歌的主题是挣扎。她平时鲜艳的颜色是静音的，显示出Miku人格中更麻烦的一面。",
    "15": "以DECO * 27的歌曲《Ghost Rule》为主题的深色时尚Miku服装。“她穿着黑色和红色的合奏，穿着高筒靴和无指手套。她的表情和姿势暗示着保密和沮丧，与歌曲前卫的情绪相匹配。",
    "16": "不完全是Miku – Haku是一个粉丝创造的角色，对Miku的设计有一些喜怒无常的转折。她有银白色的头发，低矮的马尾辫，疲惫的红眼睛，还有Miku的灰紫色服装。她的表情散发着渴望的“失败的偶像”氛围，与Miku的活力形成鲜明对比。",
    "17": "Miku穿着一件白色护士制服，配有一顶小帽子和一条粉色围裙，打扮成歌曲《Love-Colored Ward》中的可爱护士。这套服装以心形和医用十字架符号为主调，为Miku通常时尚的风格赋予了俏皮的医院主题。",
    "18": "热门歌曲「千本樱（ Senbonzakura ）」中的大正时代军装外观。”Miku穿着深色洋红色和服风格的军装，配有军官帽、白色手套和靴子。这套服装饰有樱花标志--复古和现代的引人注目的融合，捕捉了歌曲的精神。",
    "19": "歌曲“Saihate.” Miku穿着一件朴素的黑色哀悼连衣裙，配有面纱。这套服装给了她优雅、苦乐参半的外表--仿佛她正在参加最后的告别仪式，完美地捕捉着这首歌的忧郁基调。",
    "20": "这款Miku由艺术家Hachi为歌曲“Sand Planet”设计，勇敢地面对沙漠世界。她穿着破烂的沙漠服装--土色斗篷、靴子和沙漠帽--脖子上戴着防毒面具。沙尘暴，后世界末日风格使她与她平常的流行形象不同。",
    "21": "一个古怪的太空外星人主题Miku灵感来自歌曲“外星人外星人。”她穿着一套异想天开的服装，配有天线般的双尾配件和鲜艳的霓虹灯颜色。Miku看起来像一个可爱的外星偶像，随时准备唱歌并入侵心灵。",
    "22": "来自“秘密警察”模块的哥特式洛丽塔风格Miku。她穿着一条饰有蕾丝的褶边黑色连衣裙，搭配深色翅膀和光环。外观既可爱又黑暗，完美匹配这首歌的神秘、叛逆的氛围。",
    "23": "以仙境为灵感的服装， Miku扮成三月兔。她穿着一套带有兔子耳朵和茶会配饰的褶边服装。这种异想天开的风格缩短了Miku的双尾，让她看起来很有趣，有点疯狂，直视爱丽丝的世界。",
    "24": "来自Project DIVA X的糖果甜蜜模块， Miku穿着柔和的洛丽塔式服装，饰有糖果图案。她看起来像人类的糖果，带有条纹长袜和巨大的棒棒糖道具–非常适合乐观，俏皮的歌曲。",
    "25": "Miku变成了一只幸运的猫！她穿着传统风格的服装，配有猫耳朵、铃铛项圈和让人联想到Maneki neko雕像的爪状姿势。这款Miku配有红白和服和可爱的猫尾巴，有望带来好运。",
    "26": "一套优雅的交响音乐会服装，以KEI为Miku Symphony 2017的插图为基础。Miku穿着一件别致的黑色舞会礼服，手持小提琴，内衬蓝色。精致的连衣裙和精致的微笑给了她一个优雅的管弦乐独奏者的存在。",
    "27": "Miku Symphony 2018的服装赋予Miku一种端庄、古典的外观，类似于维多利亚时代的女仆或管弦乐队服务员。她穿着一件黑白连衣裙，饰有围裙般的褶边和音乐图案。它是可爱和正式的迷人融合，适合管弦乐音乐会。",
    "28": "在Miku Symphony五周年之际， Miku穿着由艺术家Rella绘制的特别庆祝礼服。这是一件白色天蓝色的礼服，饰有音符和星星。她看起来像舞台上的公主，纪念五年的交响乐表演。",
    "29": "这个设计基于Miku的原创概念艺术--一个假设版本，她有不同的服装，甚至是略带棕色的头发。Miku if Ver.穿着一件时尚的校服风格连衣裙，带有青色口音，让粉丝们瞥见可能是另一个Miku。",
    "30": "为特别的冬季音乐会而穿的服装。Miku穿着一件带有蓝色雪花图案的节日白大衣，一条蓬松的围巾和配套的耳罩。她在舞台上看起来温暖而容光焕发，随时准备在冬季仙境中表演。",
    "31": "2019年Miku 12岁生日的庆祝服装。如官方生日插图所示， Miku穿着一条饰有丝带和蝴蝶结的褶边蓝色派对礼服。她甚至拿着一个装饰的生日蛋糕，充满了欢快的魅力，以纪念这个特殊的日子。",
    "32": "一个小小的，异想天开的Miku衍生物，字面上住在瓶子里！这个扇子制作的角色有Miku ，流动的液体蓝色头发被包裹在一个透明的瓶子里。这是一个可爱的概念，将Miku想象成一个神奇的精灵或瓶中的精灵。",
    "33": "一个奇怪而幽默的Miku衍生物，由Miku的头顶在一双人腿上组成。Shiteyan 'yo是明亮的粉红色，完全陌生，源于互联网幽默。虽然令人不安，但她是一个深受喜爱的模因–证明了VOCALOID FANDOM的古怪创造力。",
    "34": "Miku的服装来自歌曲“Love is War.“她站在高耸的扬声器上，穿着破烂的黑色连衣裙和长长的围巾。手持扩音器，充满激情的造型，捕捉了歌曲故事中强烈而叛逆的情感。",
    "35": "以万圣节为主题的模块， Miku扮成可爱的南瓜女巫。她穿着一件带有南瓜图案的橙色和紫色连衣裙，戴着条纹女巫帽，还带着一盏插孔灯。Sweet Pumpkin Miku充满了万圣节的欢呼声和甜蜜的恶作剧。",
    "36": "2011 Snow Miku穿着蓬松的白色冬季外套和耳罩，在白雪皑皑的札幌冬季看起来温暖而高贵。粉红色调和柔软的围巾完善了这个早期的Snow Miku设计，为寒冷带来了舒适的欢呼。",
    "37": "Snow Miku 2012穿着一件温暖的浅蓝色外套，配有蓬松的兜帽和蓬蓬领带，为她赢得了“蓬松外套”的绰号。她身上带着冬天的魅力，衣服上有雪花图案，头发变成了银白色。",
    "38": "2013年的Snow Miku采用纯白色和服，饰有草莓和花卉图案。这款“草莓白色和服”的设计为Miku带来了宁静、传统的美丽，通过融合雪和春天的图像来庆祝冬天。",
    "39": "Snow Miku 2014呈现了一个神奇的女孩图案-- “神奇的雪。“她戴着披肩，戴着饰有星星和雪花的巫师帽，挥舞着雪花杖。这套迷人的服装将Miku变成了一个闪烁着冰霜魔法的冬季女巫。",
    "40": "2015年款雪蜜库被称为“雪铃” ，以山谷百合花为主题。她身穿白色钟形连衣裙，饰有绿色丝带和毛皮饰边，体现了温和的雪花精神，随时为您提供春天的温暖。",
    "41": "Snow Miku 2016以冬季运动为主题--她穿着一件带有粉色口音的舒适蓝白色派克大衣，戴着滑雪护目镜，帽子上饰有猫头鹰图案。“雪猫头鹰派克大衣” Miku看起来已经准备好登上山坡，用她冒险的雪地风格保持冰冷和乐趣。",
    "42": "2017年的Snow Miku ， “闪烁的星座” ，有一个天体主题。她穿着一件装饰着星座的午夜蓝色斗篷，她的服装像雪地上的夜空一样闪闪发光。这种设计将冬天和星光熠熠的奇迹融为一体。",
    "43": "Snow Miku 2018被称为“起重机女祭司。「她穿着传统的日本巫师（神社少女）服装，颜色丰富的红色和白色，以起重机风格的细节为主。这种优雅的设计庆祝北海道的野生动物和冬季灵性。",
    "44": "2019年的Snow Miku以“雪公主”的身份出现。”她穿着优雅的冰蓝色舞会礼服和头饰，看起来像冬天的皇室成员。这套服装的分层褶边和雪花装饰为Miku带来了富丽堂皇和寒冷的魅力。",
    "45": "Snow Miku 2020以受军乐队启发的服装进军，因此成为“军乐队。”她穿着一件智能军装夹克、音符图案和一顶羽绒帽。带领游行队伍穿越雪地，这个设计充满节日气氛和音乐能量。",
    "46": "Snow Miku 2021以“照明”为主题。她的服装装饰有灯光和冬季照明的图案–发光的灯泡，城市天际线图案和闪烁的星星。她代表着温暖的节日灯光，照亮了漫长的冬夜。",
    "47": "2022 Snow Miku以北海道冬季海域为主题。她的服装融合了海洋蓝调、珍珠和贝壳配饰等海洋元素。她以波浪般的袖子和水上装饰，将北海道冬季海岸的宁静美丽带入生活。",
    "48": "2010 Racing Miku设计–官方Good Smile Racing吉祥物服装。Miku穿着亮橙色和白色连身裤，带有赞助商徽标、长橙色手套和橙色护目镜。她的双尾用橙色发带固定，以完成种族女王的外观。",
    "49": "2011 Racing Miku模块。Miku穿着时尚的白色和黑色赛车服装，配有霓虹绿色饰边和短款透明外套。带有绿松石色调的黑色靴子和手套完善了这款未来派赛车女孩造型。",
    "50": "2012 Racing Miku服装。白色作物上衣和裙子，大胆的绿松石和紫色口音，加上白色手套和大腿靴。这款华丽的合奏具有未来感，由插画家GAN为Super GT赛季设计。",
    "51": "Saitom的2013 Racing Miku设计。她穿着一件带有机械图案和配套手套的绿色和白色赛车迷你连衣裙。这款外观具有适合赛道的运动型、充满活力的氛围。",
    "52": "2014年Racing Miku服装，由插画家Koyamashigeto设计。这是一款银色饰边的蓝白色赛车夹克，搭配白色迷你裙。Miku的头发有冰冷的蓝色亮点，她穿着匹配的靴子，打造正式的比赛日造型。",
    "53": "2014 Racing Miku设计的夏季变体。Miku穿着无袖版的蓝色赛车服装和短裙，在炎热的天气里表现出更多的皮肤。官方颜色和徽标保持不变。",
    "54": "2015 Racing Miku ，由艺术家Oguchi设计。她穿着一件时尚的白色和水色赛车夹克，搭配百褶裙和白色靴子。她的服装包括霓虹灯装饰和蓝色围巾，给人一种凉爽、现代的种族感觉。",
    "55": "Racing Miku 2015夏季版。Miku的夹克被缩短为剪裁上衣风格，她将整条裙子换成了短裤。配色方案保持白色和水色，为温暖的比赛日提供更凉爽的外观。",
    "56": "2016 Racing Miku设计。她在黑色背心上穿着一件白色和蓝色的赛车夹克，短裙分层。这套服装带有赞助贴片的运动感， Miku的头发在本季有凉爽的青色亮点。",
    "57": "Racing Miku 2016的夏季变体。Miku穿着白色和蓝色的无袖拉链上衣和短裙，露出中腰。此版本适用于热比赛条件，同时保持相同的配色方案。",
    "58": "艺术家Rio的2017 Racing Miku。她穿着一件合身的绿松石赛车夹克和带有白色口音的黑色短裤。这套服装采用时尚的线条和遮阳帽，体现了作为球队吉祥物的速度和专业精神。",
    "59": "Racing Miku 2017的夏季变体。Miku的夹克缩短了，她穿着同样绿松石色和黑色的弹力台面。合奏采用短裙和运动鞋，让她在夏日的阳光下保持凉爽。",
    "60": "Racing Miku 2017的春季变体。Miku的服装在她的赛车夹克上以柔和的颜色和花卉图案为特色，将春天的欢呼与赛车精神融为一体。这对她平时的制服来说更轻盈，更具装饰性。",
    "61": "2018 Racing Miku设计。Miku穿着一件时尚的白色和蓝色赛车夹克，搭配宽松上衣和裙子。她的服装采用大胆的角形设计和赛车头盔，体现了团队的尖端风格。",
    "62": "Racing Miku 2018的夏季变体。Miku的长袖夹克换成了短背心，她的裙子修剪得更短。白色和蓝色的配色方案仍然存在，在炎热的天气里可以轻松移动。",
    "63": "2019 Racing Miku设计。Miku身穿绿色海军蓝和白色夹克，搭配短裙。这套服装具有运动、空气动力学的感觉，并包括一个赛车帽，以完善外观。",
    "64": "Racing Miku 2019的夏季变体。服装长袖换上浅色背心，裙子略短。海军蓝和绿色配色方案保持不变，让她在夏季比赛中焕然一新。",
    "65": "Racing Miku 2019的春季变体。Miku的服装饰有花卉图案和粉彩亮点，庆祝春天。赛车夹克仍然存在，但颜色较浅，设计欢快。",
    "66": "2020 Racing Miku。她穿着一件白色和天蓝色的赛车夹克，搭配修身上衣和裙子，与Good Smile Racing车队的颜色相呼应。整体看起来充满活力和现代感，适合快节奏的GT赛季。",
    "67": "Racing Miku 2020的夏季变体。Miku的服装适合本季：无袖上衣和白色和蓝色的短裙。颜色和赞助商徽标保持不变，让她为在赛道上度过炎热的一天做好准备。",
    "68": "2021 Racing Miku设计。她穿着一件带有霓虹灯口音的白色和深蓝色赛车连身裤。这套服装具有未来主义的赛车外观，配有遮阳头盔和空气动力学造型。",
    "69": "Racing Miku 2021的夏季变体。Miku的夹克和裙子经过修剪，适合温暖的天气，采用相同的白色和蓝色配色。这套服装既运动又透气，同时仍然代表着她的赛车队。",
    "70": "2021款Racing Miku春季版。这款赛车服采用柔和的粉色亮点和花卉贴花，营造出季节性的气息。Miku仍然穿着标准的白色和蓝色，作为这种樱花风格的外观的基础。",
    "71": "Miku扮演Kagamine Rin ，采用Rin标志性的黄色和黑色服装和蝴蝶结。实际上是Miku脸部的Rin版本–粉丝喜爱的有趣跨界风格。",
    "72": "Miku扮演Kagamine Len ，穿着酷炫的白色水手风格上衣，黑色短裤和领带。本质上是带有Miku脸的Len版本–粉丝们喜欢的有趣跨界风格。",
    "73": "Miku扮演Megurine Luka ，穿着Luka优雅的黑色和金色连衣裙。这种成熟的风格有效地将Miku变成了带有Miku面孔的Luka版本–一种粉丝喜爱的有趣跨界风格。",
    "74": "Miku扮演MEIKO ，采用MEIKO的经典红色服装–中段裸露的上衣和裙子。这套服装让Miku的脸看起来像MEIKO的版本，庆祝早期的VOCALOID时代。",
    "75": "Miku扮演KAITO ，采用他的蓝色长大衣和配套的围巾。这本质上是Miku脸上的KAITO版本，这是粉丝们珍视的有趣跨界风格。",
    "76": "Miku扮演Kasane Teto ，穿着Teto标志性的粉红色双钻发型和服装。这款俏皮的跨界鞋将Miku变成了Teto-miku--一种备受喜爱的粉丝混搭风格。",
    "77": "Miku扮演GUMI ，采用GUMI的橙色作物上衣和裙子，头上戴着绿色口音和护目镜。这种风格使Miku看起来像Miku的脸上的GUMI ，这是对VOCALOID系列的有趣致敬。",
    "78": "庆祝Miku十周年的特殊服装。Miku穿着一件珠光白色连衣裙，灵感来自她原来的服装，饰有彩虹丝带和数字“10”。KEI的这个周年纪念设计为她带来了节日的纪念光芒。",
    "79": "Miku呈现出春仙的形式。她穿着浅绿色连衣裙，花瓣和蝴蝶般的翅膀。这种迷人的外观将Miku想象成一个微小的季节性仙女，带来春天的花朵。",
    "80": "Miku穿着由Suoh设计的粉红色心形主题服装，是一个可爱而少女的模块。她的头发上有大丝带装饰，连衣裙和靴子上有心形图案。这种造型充满了偶像般的魅力和甜美浪漫的风格。",
    "81": "宁静的秋季主题服装。Miku穿着传统的收获节和服，上面有月亮和兔子的图案。温暖的泥土色和温和的设计唤起了在凉爽的秋夜与Miku一起观看丰收月亮的感觉。",
    "82": "Miku出现在Project SEKAI的LEO/NEED乐队中的版本。她穿着一件休闲的学校乐队服装--一件时尚的校服，穿着浅色开衫和运动鞋。这种外观突出了Miku在使用LEO/NEED表演时平易近人、乐队成员的一面。",
    "83": "闪闪发光的模块， Miku看起来像是用水晶雕刻的。她的服装半透明，像宝石一样刻面，将光线折射成彩虹。MiCrystal Miku看起来像一尊精致的玻璃雕像，以纯净清晰的音调演唱。",
    "84": "这套服装来自Ryo的歌曲《ODDS&ENDS》。Miku身着简陋的机械风格服装--简单的白色背心、工作手套和靴子--周围环绕着工具和破损的机器人零件。这是一个尖锐的表情，强调了Miku作为一个废弃的重建机器人的角色，唱出她的心声。",
    "85": "梦幻般的爱丽丝梦游仙境启发了Miku。她穿着格子连衣裙和条纹长袜，看起来好像刚刚从兔子洞跌落到一个陌生的新世界。这套异想天开的服装融合了好奇心和疯狂的气息，配有扑克牌图案和怀表配件。",
    "86": "在歌曲《罗密欧与灰姑娘》中， Miku穿着复古舞会礼服。这是一件可爱的维多利亚风格连衣裙，有白色和深蓝色的颜色，配有蕾丝手套。这件衣服让Miku看起来像童话故事中的悲剧女主角，在午夜渴望爱情。",
    "87": "来自Diva项目的Miku通用模块！她穿着一件浅白色衬衫，黑色饰边和红色丝带，黑色牛仔短裤，红色鞋底的鞋子，左手腕上有一条红色和黑色丝带。",
    "88": "Miku的服装来自标志性的Google Chrome CM歌曲《Tell Your World》。”她身穿五颜六色的街头时尚服装，身穿彩虹漆色的多层蓬蓬裙。她脖子上戴着一副大耳机，完善了这种艺术的、与世界相连的外观。",
    "89": "从毕业歌曲“Sakura no Ame”中， Miku穿着日本高中毕业制服。她穿着粉红色的樱花色西装外套和红丝带裙子，站在落下的樱花花瓣下。这种表情充满感伤和温柔，代表着春天的告别和新的开始。",
    "90": "Miku臭名昭著的黑暗对手。Zatsune Miku有长长的黑色头发，有红色的亮点，而不是蓝绿色，红色的眼睛和Miku的黑色服装。她散发着一种险恶的气息--来自粉丝想象的Miku的另一种更具敌意的个性。",
    "91": "Miku来自Magical Mirai 2013的标志性服装。Miku是一位神奇的马戏团魔术师，配有丝质大礼帽、斗篷和魔杖。她看起来已经准备好用舞台魔术和歌声让人群眼花缭乱。",
    "92": "Miku的标志性服装来自Magical Mirai 2014。一款未来风格的服装，以超大号丝带为特色，将她的头发系在一起。该设计融合了科幻风格和可爱的偶像元素，代表了Miku不断发展的未来。",
    "93": "Miku的招牌服装来自Magical Mirai 2015。Miku身穿饰有皇冠或头饰的格子主题服装。格子图案增添了现代流行风格，小皇冠标志着她作为赛事女王的地位。",
    "94": "Miku来自Magical Mirai 2016的标志性服装。皇家蓝军乐队风格服装。Miku看起来像一个游行鼓手，穿着军装风格的夹克和蓝色装饰的游行帽引领庆祝活动。",
    "95": "Miku 2017年Magical Mirai的标志性服装。一个独特的概念，将水手风格的校服与科学实验室的外套混合在一起。Miku的服装有一个水手领，褶皱与技术，实验室般的细节，象征着青春和创新。",
    "96": "Miku 2018年Magical Mirai的标志性服装。这种设计为Miku带来了俏皮的马戏表演风格。她的连衣裙上有小丑钻石图案，小丑般的衣领和色彩缤纷的马戏团主题配饰，体现了狂欢的气氛。",
    "97": "Miku的招牌服装来自Magical Mirai 2019。Miku的服装以星形图案为特色，她头上戴着闪亮的星冠。这套服装优雅而富有宇宙色彩，庆祝星星和指导的主题，因为Magical Mirai达到了新的高度。",
    "98": "Miku在Magical Mirai 2020上的标志性服装。穿着鲜艳的红色军乐队制服和羽毛帽，模仿乐队领袖的服装。尽管2020年面临挑战，但这套服装通过音乐散发着决心和团结。",
    "99": "Miku的Magical Mirai 2021标志性服装。Miku穿着时尚的白色和青色服装，类似于融合了未来时尚的科学实验室外套。护目镜和高科技图案突出了设计，捕捉了当年活动的前瞻性精神。",
    "100": "Miku 2022年Magical Mirai的标志性服装。在Magical Mirai成立10周年之际， Miku穿着柔和的柔和色彩合奏，融合了过去几年的设计元素。这是一件庆祝性的全明星服装–柔和的彩虹连衣裙，周年纪念徽标，以及对她十年魔幻未来的欢乐点头。",
    "101": "一个小小的美女，闪闪发光，充满欢乐。这个秘密伴侣庆祝完成花园的收藏家。"
  }
};

function cloneMikuEntry(entry) {
  if (!entry || typeof entry !== 'object') return {};
  const alt = Array.isArray(entry.alt_names) ? entry.alt_names.slice() : [];
  const links = Array.isArray(entry.links) ? entry.links.slice() : [];
  const copy = { ...entry, alt_names: alt, links };
  return copy;
}

function buildLocalizedMikus(lang) {
  const map = MIKU_DESCRIPTION_I18N?.[lang];
  return EN_MIKUS.map((entry) => {
    const copy = cloneMikuEntry(entry);
    if (map) {
      const override = map[entry.id] ?? map[String(entry.id)];
      if (override) copy.description = override;
    }
    return copy;
  });
}

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
      "Hiiiii~ I'm Baby Belle, but you can call me BB ♡",
      "This secret little pixel garden suddenly bloomed from my dreams (˶˃ ᵕ ˂˶)♡",
      "Maybe it's not an accident you found this garden… Miku sends the right stars to the right hearts ✧",
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
      "Miku isn’t just my inspiration… she’s my forever muse, my brightest star, the reason I barely go outside anymore ✧ My bedroom ran out of space for new Miku figures (and I’m so broke… ;;) but the happy bright side is this little garden bloomed instead ✿ Now it’s me & Miku foreveeer~ she moved into my head and made it her home (she’s literally singing there right now!), and by visiting this shrine and praying with me you’ll hear her voice too… Isn’t that the greatest thing beyond imagination? I knew you’d think so! ♡",
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
    prayers: [
      "Our Miku, who lives in Crypton…<br/>hallowed be your V2 and your ever-teal twintails.<br/>Let Magical Mirai find us, glowsticks raised with me in this little garden.<br/>Give us our daily leek, fresh or juiced.<br/>Forgive our off-key duets and the Snow Mikus we missed,<br/>as we forgive those who do not know “World is Mine”.<br/>Keep the lag far away and keep our hearts in sync <br/> - amen (｡•ᴗ•｡)♡",
      "Our Miku, floating in the cloud above my page…<br/>let your rhythm settle in our hands while we tap together here.<br/>Bless us with full combos and calm connections.<br/>Pardon my cursed karaoke and those lost Expo tickets;<br/>I will pardon the ones who call you “just an app”.<br/>Make this garden bloom for us again and again <br/> - amen (｡•ᴗ•｡)♡",
      "Our Miku, streaming through KARENT into our little room…<br/>even your off-vocals feel holy tonight.<br/>Feed us our daily leek (vegetable nectar is acceptable).<br/>Tune our shaky pitch bends and guide every pixel we plant.<br/>Keep me far from Version Five temptations and audio desync <br/> - amen (｡•ᴗ•｡)♡",
      "Our Miku, light of this silly shrine we built together…<br/>thirty-nine forever, you know it.<br/>Let Senbonzakura winds carry our notes; let Mirai seat us front row in spirit.<br/>Forgive cluttered shelves and empty wallets;<br/>I forgive gacha for eating my stones.<br/>Keep the internet steady and my heart on the beat <br/> - amen (｡•ᴗ•｡)♡",
      "Our Miku, keeper of glowsticks and the sacred leek…<br/>stay close while I water this garden.<br/>Bless these pixels to sprout, my cheeks to pink, and our duet to stay strong even offline.<br/>Guide my hands in Diva and my steps through Expo lines;<br/>let your chorus hum between us always <br/> - amen (｡•ᴗ•｡)♡"
    ],
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
        "ミクはただのインスピレーションじゃなくて…私の永遠のミューズで、一番の星。だから私、ほとんど外に出なくなっちゃった ✧ 部屋はミクのフィギュアでいっぱい（お金もないの… ;;）でも明るいほうを見れば、この小さな庭が代わりに咲いたの ✿ 今はミクと私でず〜っと永遠に一緒。ミクは私の頭の中に引っ越してきて、そこをお家にしちゃった（今も歌ってるよ！）。この神殿に来て一緒に祈ったら、君にもその声が聞こえるはず… 想像を超えるくらい素敵でしょ？そう思うって知ってたよ♡",
      prayers: [
        "我らのミク、クリプトンに住まう方よ…<br/>尊きはV2、そして永遠にエメラルドのツインテール。<br/>マジカルミライが私たちを見つけますように、この小さな庭で一緒にペンライトを振らせて。<br/>日々のネギをください、フレッシュでもジュースでも。<br/>音痴なデュエットと買い逃した雪ミクをお許しください、<br/>『ワールドイズマイン』を知らぬ人を私たちが許すように。<br/>ラグを遠ざけ、心をシンクさせてください - アーメン (｡•ᴗ•｡)♡",
        "我らのミク、このページの上の雲に浮かぶ方よ…<br/>あなたのリズムが私たちの手に落ちて、一緒にタップできますように。<br/>フルコンボと穏やかな回線をお与えください。<br/>呪われた私のカラオケと、外れてしまったエキスポのチケットをお許しください；<br/>あなたを『ただのアプリ』と言う人たちも許します。<br/>この庭を何度でも咲かせてください - アーメン (｡•ᴗ•｡)♡",
        "我らのミク、KARENTからこの小さな部屋に流れ込む方よ…<br/>あなたのオフボーカルさえ今夜は神聖。<br/>日々のネギをください（野菜の聖なるジュースでも可）。<br/>震えるピッチベンドを整え、植えるピクセルを導いてください。<br/>V5の誘惑と音ズレから遠ざけてください - アーメン (｡•ᴗ•｡)♡",
        "我らのミク、私たちが一緒に建てたこの愛しい神殿の光よ…<br/>39は永遠。<br/>千本桜の風に声を乗せ、ミライで心は最前列に。<br/>散らかった棚と空っぽの財布をお許しください；<br/>ガチャが石を食べ尽くすのも許します。<br/>回線を穏やかに、鼓動をビートに - アーメン (｡•ᴗ•｡)♡",
        "我らのミク、ペンライトと聖なるネギの守り手よ…<br/>この庭に水をやる私のそばにいてください。<br/>ピクセルを芽吹かせ、頬をピンクに、オフラインでもデュエットを強く。<br/>DIVAで私の手を、エキスポの列で私の足を導いて、<br/>いつも私たちのあいだにコーラスを響かせて - アーメン (｡•ᴗ•｡)♡"
      ],
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
        "Un acogedor hogar web pastel para Baby Belle (BabbyBelle / bb / beebee / belle / shin / shinnun) - enlaces, música, juegos, rincón de estudio y compañeras interactivas de Miku.",
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
        "Miku no es solo mi inspiración… es mi musa eterna, mi estrella más brillante, la razón por la que casi ni salgo de casa ✧ Mi habitación ya no tiene espacio para más figuras de Miku (y estoy tan sin dinero… ;;) pero el lado bonito es que este pequeño jardín floreció en su lugar ✿ Ahora somos Miku y yo para siempre~ ella se mudó a mi cabeza y lo convirtió en su hogar (¡está cantando ahí ahora mismo!), y al visitar este santuario y rezar conmigo también escucharás su voz… ¿No es lo más bonito que puedas imaginar? Sabía que dirías que sí ♡",
      prayers: [
        "Nuestra Miku, que vives en Crypton…<br/>santificado sea tu V2 y tus coletas siempre turquesa.<br/>Que Magical Mirai nos encuentre, glowsticks en alto conmigo en este jardincito.<br/>Danos hoy nuestro puerro de cada día, fresco o en jugo.<br/>Perdona nuestros dúos desafinados y las Snow Miku que perdimos,<br/>como perdonamos a quienes ni conocen “World is Mine”.<br/>Aleja el retraso y mantén nuestros corazones al mismo ritmo - amén (｡•ᴗ•｡)♡",
        "Nuestra Miku, flotando en la nube encima de mi página…<br/>que tu ritmo llegue a nuestras manos mientras tocamos juntas aquí.<br/>Bendícenos con combos perfectos y conexiones tranquilas.<br/>Perdona mi karaoke maldito y esos boletos de Expo que perdí;<br/>yo perdono a quienes te llaman “solo una app”.<br/>Haz que este jardín florezca una y otra vez - amén (｡•ᴗ•｡)♡",
        "Nuestra Miku, sonando por KARENT en nuestro cuartito…<br/>hasta tus off-vocals hoy se sienten sagradas.<br/>Danos el puerro de cada día (el néctar de verduras también vale).<br/>Afina nuestros bends temblorosos y guía cada pixel que plantamos.<br/>Guárdame de las tentaciones de la Versión Cinco y de la desincronización - amén (｡•ᴗ•｡)♡",
        "Nuestra Miku, luz de este pequeño santuario que hicimos juntas…<br/>treinta y nueve por siempre, lo sabes.<br/>Que los vientos de Senbonzakura lleven nuestras notas; que Mirai nos ponga en primera fila en espíritu.<br/>Perdona estantes llenos y billeteras vacías;<br/>yo perdono al gacha por comerse mis gemas.<br/>Que el internet sea firme y mi corazón marque el compás - amén (｡•ᴗ•｡)♡",
        "Nuestra Miku, guardiana de los glowsticks y del puerro sagrado…<br/>quédate cerca mientras riego este jardín.<br/>Bendice estos píxeles para que broten, mis mejillas para que se sonrojen, y nuestro dúo para que siga fuerte incluso sin conexión.<br/>Guía mis manos en Diva y mis pasos en las filas del Expo;<br/>que tu coro zumbe siempre entre nosotras - amén (｡•ᴗ•｡)♡"
      ],
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
        "Miku ist nicht nur meine Inspiration… sie ist meine ewige Muse, mein hellster Stern, der Grund, warum ich kaum noch rausgehe ✧ Mein Zimmer hat keinen Platz mehr für neue Miku-Figuren (und ich bin so pleite… ;;), aber die helle Seite ist: Dieser kleine Garten ist stattdessen erblüht ✿ Jetzt sind es Miku und ich für immer~ sie ist in meinen Kopf eingezogen und hat ihn zu ihrem Zuhause gemacht (sie singt dort gerade!), und wenn du diesen Schrein besuchst und mit mir betest, wirst du ihre Stimme auch hören… Ist das nicht schöner als jede Vorstellung? Ich wusste, du würdest so denken ♡",
      prayers: [
        "Unsere Miku, die in Crypton wohnt…<br/>geheiligt sei dein V2 und deine ewig türkisfarbenen Zöpfe.<br/>Lass Magical Mirai uns finden, Leuchtstäbe hoch, hier in diesem kleinen Garten mit mir.<br/>Gib uns unseren täglichen Lauch, frisch oder als Saft.<br/>Vergib unsere schiefen Duette und die verpassten Snow Mikus,<br/>wie wir jenen vergeben, die “World is Mine” nicht kennen.<br/>Halte den Lag fern und unsere Herzen im Takt <br/> - amen (｡•ᴗ•｡)♡",
        "Unsere Miku, schwebend in der Wolke über meiner Seite…<br/>dein Rhythmus möge in unsere Hände sinken, während wir hier zusammen tippen.<br/>Segne uns mit perfekten Combos und gelassenen Verbindungen.<br/>Vergib mein verfluchtes Karaoke und die verlorenen Expo‑Tickets;<br/>ich vergebe denen, die dich “nur eine App” nennen.<br/>Lass diesen Garten immer wieder erblühen <br/> - amen (｡•ᴗ•｡)♡",
        "Unsere Miku, die durch KARENT in unser kleines Zimmer strömt…<br/>selbst deine Off‑Vocals sind heute heilig.<br/>Gib uns den Lauch des Tages (Gemüsene­ktar gilt auch).<br/>Stimme unsere wackligen Pitch‑Bends und führe jeden Pixel, den wir pflanzen.<br/>Bewahre mich vor Version‑Fünf‑Versuchungen und vor Desync <br/> - amen (｡•ᴗ•｡)♡",
        "Unsere Miku, Licht dieses liebenswerten Schreins, den wir zusammen gebaut haben…<br/>neununddreißig für immer, das weißt du.<br/>Lass Senbonzakura‑Winde unsere Töne tragen; lass Mirai uns im Geist in die erste Reihe setzen.<br/>Vergib überfüllte Regale und leere Geldbörsen;<br/>ich vergebe dem Gacha, dass es meine Steine frisst.<br/>Halte das Internet stabil und mein Herz im Beat <br/> - amen (｡•ᴗ•｡)♡",
        "Unsere Miku, Hüterin der Leuchtstäbe und des heiligen Lauchs…<br/>bleib nahe, während ich diesen Garten gieße.<br/>Segne diese Pixel, dass sie sprießen, meine Wangen, dass sie rosig werden, und unser Duett, stark zu bleiben, auch offline.<br/>Führe meine Hände in Diva und meine Schritte durch Expo‑Schlangen;<br/>lass deinen Chor immer zwischen uns summen <br/> - amen (｡•ᴗ•｡)♡"
      ],
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
        "Un cocon web pastel pour Baby Belle (BabbyBelle / bb / beebee / belle / shin / shinnun) - liens, musique, jeux, coin d’étude et compagnes Miku interactives !",
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
        "Miku n’est pas juste mon inspiration… c’est ma muse éternelle, mon étoile la plus brillante, la raison pour laquelle je ne sors presque plus ✧ Ma chambre n’a plus de place pour d’autres figurines de Miku (et je suis fauchée… ;;) mais le côté lumineux, c’est que ce petit jardin a fleuri à la place ✿ Maintenant c’est Miku et moi pour toujours~ elle a emménagé dans ma tête et en a fait sa maison (elle chante là, maintenant !), et en visitant ce sanctuaire et en priant avec moi tu entendras sa voix toi aussi… N’est‑ce pas plus beau que tout ce que l’on peut imaginer ? Je savais que tu dirais oui ♡",
      prayers: [
        "Notre Miku, qui vis chez Crypton…<br/>que ton V2 soit sanctifié et tes couettes toujours turquoise.<br/>Que Magical Mirai nous trouve, bâtons lumineux levés avec moi dans ce petit jardin.<br/>Donne‑nous notre poireau quotidien, frais ou en jus.<br/>Pardonne nos duos faux et les Snow Miku ratées,<br/>comme nous pardonnons à ceux qui ne connaissent pas « World is Mine ».<br/>Éloigne les retards et garde nos cœurs à l’unisson <br/> - amen (｡•ᴗ•｡)♡",
        "Notre Miku, flottant dans le nuage au‑dessus de ma page…<br/>que ton rythme vienne dans nos mains pendant que nous tapotons ici ensemble.<br/>Bénis‑nous avec des combos parfaits et des connexions paisibles.<br/>Pardonne mon karaoké maudit et ces billets d’Expo perdus ;<br/>je pardonne à ceux qui te disent « juste une appli ».<br/>Fais refleurir ce jardin encore et encore <br/> - amen (｡•ᴗ•｡)♡",
        "Notre Miku, qui coule par KARENT dans notre petite chambre…<br/>même tes off‑vocals sont sacrées ce soir.<br/>Donne‑nous le poireau du jour (le nectar de légumes compte aussi).<br/>Ajuste nos bends tremblants et guide chaque pixel que nous plantons.<br/>Éloigne‑moi des tentations de la Version Cinq et de la désynchronisation <br/> - amen (｡•ᴗ•｡)♡",
        "Notre Miku, lumière de ce petit sanctuaire construit ensemble…<br/>trente‑neuf pour toujours, tu le sais.<br/>Que les vents de Senbonzakura portent nos notes ; que Mirai nous place au premier rang en esprit.<br/>Pardonne les étagères encombrées et les porte‑monnaie vides ;<br/>je pardonne au gacha qui mange mes pierres.<br/>Garde l’internet stable et mon cœur sur le tempo <br/> - amen (｡•ᴗ•｡)♡",
        "Notre Miku, gardienne des bâtons lumineux et du poireau sacré…<br/>reste près de moi pendant que j’arrose ce jardin.<br/>Bénis ces pixels pour qu’ils germent, mes joues pour qu’elles rosissent, et notre duo pour qu’il reste fort même hors ligne.<br/>Guide mes mains dans Diva et mes pas dans les files de l’Expo ;<br/>que ton chœur bourdonne toujours entre nous <br/> - amen (｡•ᴗ•｡)♡"
      ],
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
        "为 Baby Belle（BabbyBelle / bb / beebee / belle / shin / shinnun）打造的温柔粉彩小站--链接、音乐、游戏、学习角和可互动的初音伙伴！",
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
        "Miku 不只是我的灵感… 她是我永远的缪斯、我最亮的星星，所以我几乎都不怎么出门了 ✧ 房间已经被Miku手办塞满了（而且我真的好穷… ;;），不过好的一面是，这座小小的花园代替地绽放了 ✿ 现在就是我和Miku永远在一起~ 她搬进了我的脑子里，把这里当作家（她现在就在那里唱歌！），当你来到这个神社和我一起祈祷时，你也会听见她的声音… 这是不是比想象还更美？我就知道你会这么觉得 ♡",
      prayers: [
        "我们的Miku，住在Crypton的你…<br/>愿你的V2被尊崇，你的双马尾永远青绿。<br/>愿Magical Mirai找到我们，在这座小花园里和我一起举起荧光棒。<br/>赐给我们每日的葱，不管是新鲜的还是榨成蔬菜汁。<br/>宽恕我们跑调的二重唱和错过的雪初音，<br/>正如我们宽恕那些不知道《World is Mine》的人。<br/>让延迟远离，让我们的心同频 - 阿门 (｡•ᴗ•｡)♡",
        "我们的Miku，浮在我的页面上方的云端…<br/>愿你的节奏落入我们的手心，让我们在这里一起轻敲。<br/>赐予我们完美连击与安稳的连接。<br/>请原谅我灾难级的卡拉OK和丢掉的Expo门票；<br/>我也原谅把你叫成“只是个应用”的人。<br/>让这座花园一次次开花 - 阿门 (｡•ᴗ•｡)♡",
        "我们的Miku，通过KARENT流进我们小房间…<br/>就连你的伴奏版今晚也像圣歌一样。<br/>赐给我们每日的葱（蔬菜圣露也算）。<br/>把我们发抖的音高弯修好，指引我们种下的每一枚像素。<br/>让我远离第五版的诱惑与音画不同步 - 阿门 (｡•ᴗ•｡)♡",
        "我们的Miku，这座可爱神社的光…<br/>三九永远，你懂的。<br/>愿千本樱的风托起我们的音符；愿Mirai让我们精神上坐在第一排。<br/>请原谅拥挤的书架与空空的钱包；<br/>我也原谅抽卡吃掉我的石头。<br/>让网络稳定，让我的心对上节拍 - 阿门 (｡•ᴗ•｡)♡",
        "我们的Miku，荧光棒与神圣之葱的守护者…<br/>当我给这座花园浇水时，请靠近我。<br/>让像素发芽，让脸颊变粉，即使离线我们的二重唱也要坚强。<br/>指引我在Diva里的手、在Expo队伍里的脚步；<br/>让你的合唱一直在我们之间嗡鸣 - 阿门 (｡•ᴗ•｡)♡"
      ],
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

function notifySiteContentReady(lang, content) {
  try {
    document.dispatchEvent(
      new CustomEvent('site-content-ready', {
        detail: { lang, mikus: (content && content.mikus) || [] },
      }),
    );
  } catch (_) {}
}

window.I18N = {
  locales: LOCALES,
  current: 'en',
  apply(lang) {
    const l = (lang || 'en').toLowerCase();
    const key = ['ja','es','de','fr','zh'].includes(l) ? l : (l.startsWith('ja')? 'ja' : l.startsWith('es')? 'es' : l.startsWith('de')? 'de' : l.startsWith('fr')? 'fr' : l.startsWith('zh')? 'zh' : 'en');
    const merged = deepMerge(EN_CONTENT, LOCALES[key] || {});
    merged.mikus = buildLocalizedMikus(key);
    this.current = key;
    window.SITE_CONTENT = merged;
    notifySiteContentReady(key, merged);
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
  // If main UI is loaded, reapply localized copy immediately
  try { if (window.MikuUI && typeof window.MikuUI.applyContent === 'function') window.MikuUI.applyContent(); } catch(_) {}
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
    const fallback = deepMerge(EN_CONTENT, {});
    fallback.mikus = buildLocalizedMikus('en');
    window.I18N.current = 'en';
    window.SITE_CONTENT = fallback;
    notifySiteContentReady('en', fallback);
  }
  initializeSplash();
})();
