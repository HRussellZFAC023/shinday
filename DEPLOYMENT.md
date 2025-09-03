# 🚀 GitHub Pages Deployment Guide

## Quick Setup for GitHub Pages

### 1. Repository Setup
```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: PixelBelle's Pastel Miku Garden"

# Add remote (replace with your repository URL)
git remote add origin https://github.com/yourusername/pixelbelle-garden.git

# Push to main branch
git push -u origin main
```

### 2. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch and **/ (root)** folder
6. Click **Save**

### 3. Access Your Site
- Your site will be available at: `https://yourusername.github.io/repository-name`
- GitHub will show you the URL in the Pages settings

### 4. Custom Domain (Optional)
1. Add a `CNAME` file to root with your domain:
   ```
   yourdomain.com
   ```
2. Configure DNS at your domain provider:
   - Add CNAME record pointing to `yourusername.github.io`
3. Enable **Enforce HTTPS** in Pages settings

## 🎨 Customization for Your Site

### Personal Information
Edit `js/main.js` and update:
```javascript
const SOCIALS = [
  { label: 'Your YouTube', url: 'https://youtube.com/yourchannel', icon: '📺' },
  // ... add your social links
];

const FRIENDS = [
  { name: 'Your Friend', url: 'https://theirsite.com', emoji: '🌸' },
  // ... add your friends
];
```

### Images
1. Replace images in `assets/` folder with your own
2. Update image paths in `js/main.js` MIKU_IMAGES array
3. Replace hero images in `index.html`

### Colors & Theme
Edit `css/styles.css` root variables:
```css
:root {
  --pastel-blue: #your-color;
  --pastel-pink: #your-color;
  /* ... customize colors */
}
```

### Shimeji Sprites
1. Add your sprite images to `webmeji-main/` folders
2. Update sprite paths in `js/shimeji.js` configurations
3. Adjust animation timings and behaviors

## 🔧 Performance Tips

- **Optimize Images**: Use tools like TinyPNG to compress images
- **Lazy Loading**: Large galleries automatically lazy load
- **Cache**: GitHub Pages has built-in caching
- **CDN**: Consider using a CDN for large assets

## 🐛 Troubleshooting

### Site Not Loading
- Check that `index.html` is in root directory
- Verify GitHub Pages is enabled in settings
- Check browser console for errors

### Images Not Showing
- Ensure image paths are relative (`./assets/...`)
- Check file names match exactly (case-sensitive)
- Verify images are committed to repository

### Shimeji Not Working
- Check browser console for JavaScript errors
- Verify sprite paths in `js/shimeji.js`
- Ensure all image files exist

### Performance Issues
- Reduce number of simultaneous shimeji companions
- Optimize large image files
- Check browser developer tools for bottlenecks

## 📱 Mobile Optimization

The site is responsive, but for better mobile experience:
- Consider reducing shimeji count on mobile
- Test touch interactions
- Verify all features work on mobile browsers

---

Happy coding! 🌸✨
