# ⚙️ Configuration Guide

Quick reference for customizing PixelBelle's Garden.

## 🎨 Basic Personalization

### 1. Site Title & Info
**File**: `index.html`
```html
<!-- Update these lines -->
<title>YourName — Pastel Miku Garden ✨</title>
<h1 id="siteTitle">YourName's Pastel Garden</h1>
<p id="siteSub">your custom subtitle here ♡</p>
```

### 2. Social Links
**File**: `js/main.js` (lines 8-15)
```javascript
const SOCIALS = [
  { label: 'Your Platform', url: 'https://yourlink.com', icon: '📺', color: '#ff0000' },
  // Add more social links here
];
```

### 3. Friend List
**File**: `js/main.js` (lines 17-24)
```javascript
const FRIENDS = [
  { name: 'Friend Name', url: 'https://friendsite.com', emoji: '🌸' },
  // Add your friends here
];
```

## 🎵 Music & Content

### 4. Playlist Songs
**File**: `js/main.js` (lines 26-33)
```javascript
const PLAYLIST_SONGS = [
  { title: 'Song Name', artist: 'Artist Name', mood: '✨' },
  // Add your favorite songs
];
```

### 5. Personal Images
**File**: `js/main.js` (lines 35-46)
```javascript
const MIKU_IMAGES = [
  './assets/your-folder/image1.png',
  './assets/your-folder/image2.png',
  // Update with your image paths
];
```

## 🎮 Shimeji Configuration

### 6. Companion Behavior
**File**: `js/shimeji.js` (lines 25-45)
```javascript
const MIKU_CONFIG = {
  speed: 3,              // Walking speed
  multiplyChance: 0.03,  // 3% chance to multiply
  maxCreatures: 8,       // Maximum companions
  // ... more settings
};
```

### 7. Sprite Paths
**File**: `js/shimeji.js` (lines 15-35)
```javascript
walk: { 
  frames: ["./path/to/walk1.png", "./path/to/walk2.png"], 
  interval: 200, 
  loops: 6 
},
```

## 🎨 Visual Customization

### 8. Color Theme
**File**: `css/styles.css` (lines 2-12)
```css
:root {
  --pastel-blue: #BDE3FF;    /* Change to your blue */
  --pastel-pink: #FFD1EC;    /* Change to your pink */
  --pastel-mint: #CFF6E6;    /* Change to your green */
  /* ... more colors */
}
```

### 9. Background Images
**File**: `css/styles.css` (line 94)
```css
#header {
  background: linear-gradient(...), url('../assets/your-bg.png');
}
```

## 📚 Learning Section

### 10. Study Progress
**File**: `index.html` (lines 190-210)
```html
<div class="progress" style="width: 35%"></div>
<p>Your current level description</p>

<span class="japanese">日本語</span>
<span class="romaji">nihongo</span>
<span class="meaning">Japanese language</span>
```

## 🔧 Advanced Settings

### 11. Animation Speeds
**File**: `css/styles.css` (keyframes section)
```css
@keyframes float {
  /* Change animation duration */
  animation: float 4s ease-in-out infinite;
}
```

### 12. Game Difficulty
**File**: `js/main.js` (memory game section)
```javascript
const cardSymbols = ['🎵', '🌸', '💖', '⭐']; // Add more for harder game
```

### 13. Heart System
**File**: `js/main.js` (heart functions)
```javascript
// Line ~320: Change heart rewards
if (gameHeartCount % 10 === 0) {  // Every 10 clicks
  addHearts(1);                   // Gives 1 heart
}
```

## 🖼️ Image Requirements

### Recommended Sizes:
- **Hero Images**: 400x300px or larger
- **Pixel Art**: 64x64px to 128x128px  
- **Shimeji Sprites**: 32x32px to 64x64px
- **Background**: 1200x800px or larger

### Supported Formats:
- PNG (recommended for pixel art)
- WEBP (for photos, smaller file size)
- GIF (for animations)

## 🚀 Quick Setup Checklist

- [ ] Update site title and subtitle
- [ ] Add your social media links
- [ ] Replace hero images with your photos
- [ ] Add your friends to the friends list
- [ ] Update music playlist with your favorites
- [ ] Replace Miku images with your preferred art
- [ ] Customize colors to match your style
- [ ] Test on mobile devices
- [ ] Deploy to GitHub Pages

## 🎯 Pro Tips

1. **Start Small**: Change one section at a time
2. **Test Locally**: Use `python -m http.server 8000`
3. **Backup**: Commit changes to git frequently
4. **Mobile First**: Test on phone after changes
5. **Performance**: Optimize images before adding them

---

Need help? Check the main README.md for detailed documentation! 💖
