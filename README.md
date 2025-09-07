# PixelBelle's Pastel Miku Garden ✨

A beautiful, retro-inspired personal website with interactive Hatsune Miku companions and kawaii aesthetics.

## 🌸 Features

### ✨ Interactive Elements

- **Enhanced Shimeji Companions**: Pixel Miku friends that walk, jump, climb walls, fall from the sky, multiply, and react to mouse interactions
- **Memory Game**: Match kawaii symbols to collect hearts
- **Heart Collector**: Click-based mini-game with floating animations
- **Virtual Pet**: Interactive PixelBelle pet with happiness system
- **Random Miku Gallery**: Cycle through beautiful pixel art

### 🎵 Media & Social

- **Retro Radio Player**: Styled like a vintage radio with EQ bars
- **Social Media Hub**: Beautiful cards linking to all platforms
- **Music Playlist**: Curated Vocaloid favorites
- **Miku Shrine**: Gallery and tribute section

### 📚 Personal Features

- **Japanese Learning Tracker**: Progress bars and daily vocabulary
- **Mood System**: Save and display current mood
- **Friends List**: Connect with the community
- **Status Bar**: Real-time updates and counters

### 🎨 Visual Design

- **Pastel Theme**: Soft blues, pinks, and mint greens
- **Retro Aesthetics**: 90s web vibes with modern functionality
- **Smooth Animations**: CSS transitions and keyframes
- **Responsive Design**: Works on desktop and mobile
- **Custom Cursor**: Star cursor with heart trail effects

## 🚀 Enhanced Shimeji Features

The interactive Miku companions can:

- ✅ Walk around the screen edges
- ✅ Sit and rest randomly
- ✅ Dance and spin
- ✅ **NEW**: Climb up the sides of the screen
- ✅ **NEW**: Jump with physics
- ✅ **NEW**: Fall from the sky
- ✅ **NEW**: Multiply (spawn offspring)
- ✅ **NEW**: React to mouse interactions (happy/scared)
- ✅ **NEW**: Enhanced physics system with gravity

## 📁 Project Structure

```
shinday/
├── index.html              # Main website file
├── css/
│   ├── styles.css          # Main styles and animations
│   └── shimeji.css         # Shimeji companion styles
├── js/
│   ├── main.js             # Site functionality and games
│   └── shimeji.js          # Enhanced Shimeji system
├── assets/
│   ├── pixel-miku/         # Pixel art collection
│   ├── *.png               # Hero images and backgrounds
│   └── *.gif               # Animated decorations
└── assets/webmeji/           # Shimeji sprite assets
    ├── miku/               # Miku sprites
    └── shimeji/            # Classic shimeji sprites
```

## 🎮 Interactive Commands

Open browser console and try:

```javascript
// Add hearts to counter
pixelBelleGarden.addHearts(10);

// Spawn more Miku companions
pixelBelleGarden.spawnShimeji();

// Navigate to sections
pixelBelleGarden.showSection("shrine");

// Get site statistics
pixelBelleGarden.getStats();

// Shimeji controls
ShimejiFunctions.triggerMassJump();
ShimejiFunctions.triggerMassFall();
ShimejiFunctions.removeAll();
```

## 🌐 GitHub Pages Deployment

This site is optimized for GitHub Pages hosting:

1. **Fork or clone** this repository
2. **Enable GitHub Pages** in repository settings
3. **Choose source**: Deploy from main branch
4. **Custom domain** (optional): Add your domain in settings

### Local Development

```bash
# Serve locally (Python)
python -m http.server 8000

# Or with Node.js
npx http-server

# Then visit: http://localhost:8000
```

## 🎨 Customization

### Adding New Miku Images

1. Add images to `assets/pixel-miku/`
2. Update `MIKU_IMAGES` array in `js/main.js`

### Customizing Shimeji Behavior

Edit configurations in `js/shimeji.js`:

- `MIKU_CONFIG` - Miku companion settings
- `CLASSIC_CONFIG` - Classic shimeji settings
- Adjust speeds, action frequencies, and physics

### Styling Changes

- Main theme colors in `css/styles.css` `:root` variables
- Animation timings and effects throughout CSS files
- Add new animations in keyframes section

## 🎵 Credits

- **Hatsune Miku**: Crypton Future Media
- **Pixel Art**: Cutebunni (@illufinch)
- **Webmeji System**: Based on lars-rooij/webmeji
- **Design Inspiration**: Neocities community, Sadgrl layout tutorials
- **Fonts**: Google Fonts (Nunito)

## 💖 Features for GitHub Pages

- ✅ **No server required**: Pure client-side functionality
- ✅ **Local storage**: Saves progress and preferences
- ✅ **Responsive design**: Mobile and desktop friendly
- ✅ **Fast loading**: Optimized assets and code
- ✅ **Cross-browser**: Works in modern browsers
- ✅ **Interactive**: Games, animations, and companions

## 🔧 Technical Notes

- **Shimeji Physics**: Custom gravity and collision system
- **Memory Management**: Automatic cleanup of animations and elements
- **Performance**: Throttled mouse events and optimized rendering
- **Accessibility**: Alt text, keyboard navigation, reduced motion support
- **Progressive Enhancement**: Core functionality works without JavaScript

---

Made with 💖 for the retro web community and Miku fans everywhere! ✨

_This site is always under construction!_ 🚧

## 🔖 Link to us

Grab a badge and copy‑paste code at:

https://babybelle.neocities.org/badge.html

Quick HTML (responsive banner):

<a href="https://babybelle.neocities.org/" target="_blank" rel="noopener">
    <img src="https://babybelle.neocities.org/assets/discordServerBanner.png" alt="Visit BabyBelle" style="max-width:600px; width:100%; height:auto; border-radius:8px" />
</a>
