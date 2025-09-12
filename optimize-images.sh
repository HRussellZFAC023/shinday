#!/bin/bash

# Image optimization script for Google Lighthouse
# Converts large images to WebP format for better performance

echo "🎨 Starting image optimization for Lighthouse..."

# Create optimized directory if it doesn't exist
mkdir -p assets/optimized

# Convert large PNG/JPG files to WebP
for file in assets/*.{png,jpg,jpeg}; do
    if [ -f "$file" ]; then
        filename=$(basename "$file" .${file##*.})
        
        # Get file size in KB
        size=$(du -k "$file" | cut -f1)
        
        if [ $size -gt 100 ]; then
            echo "Converting $file (${size}KB) to WebP..."
            
            # Convert to WebP with quality 85
            if command -v cwebp &> /dev/null; then
                cwebp -q 85 "$file" -o "assets/optimized/${filename}.webp"
                echo "✅ Created optimized version: assets/optimized/${filename}.webp"
            else
                echo "⚠️  cwebp not found. Install with: brew install webp"
            fi
        fi
    fi
done

echo "🎯 Image optimization complete!"
echo ""
echo "Lighthouse recommendations implemented:"
echo "✅ Added service worker for caching"
echo "✅ Optimized JavaScript loading with defer"
echo "✅ Inlined critical CSS"
echo "✅ Added resource hints (preconnect, preload)"
echo "✅ Improved meta tags for SEO"
echo "✅ Added web app manifest"
echo "✅ Enhanced accessibility attributes"
echo "✅ Added performance-optimized CSS"
echo ""
echo "Manual steps to complete:"
echo "1. Run 'brew install webp && ./optimize-images.sh' to convert images"
echo "2. Update image references to use WebP with fallbacks"
echo "3. Consider code splitting for large JavaScript modules"
echo "4. Run Lighthouse audit to measure improvements"
