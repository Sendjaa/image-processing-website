# Quick Reference Card

Print this page or keep it nearby while using ImageProcessor!

## Installation (Copy & Paste)

```bash
npm install          # Install once
npm run dev          # Start development
# Open http://localhost:3000
```

## Basic Workflow

1. **Upload** → Click upload area, select image
2. **Edit** → Use panels on right for filters/effects
3. **Adjust** → Use sliders to fine-tune
4. **Compare** → Click Compare for before/after
5. **Export** → Click Export, choose format, Download

## Filter Quick Guide

| Filter | What It Does | Best For |
|--------|-------------|----------|
| **Grayscale** | Black & white | Vintage, artistic |
| **Blur** | Soft, blurry | Backgrounds, portraits |
| **Bilateral** | Smart blur | Smoothing skin |
| **Sharpen** | Make crisp | Blurry photos |
| **Canny Edge** | Outlines | Sketches, art |
| **Sobel Edge** | Gradients | 3D effect, lines |

## Transform Quick Guide

| Transform | What It Does | Use |
|-----------|-------------|-----|
| **Rotate** | Turn image | Fix orientation |
| **Flip H** | Mirror left/right | Mirror effect |
| **Flip V** | Mirror up/down | Flip effect |
| **Resize** | Change size | Fit aspect ratio |

## Color Adjustment Quick Guide

| Adjustment | Range | Example |
|-----------|-------|---------|
| **Brightness** | -100 to +100 | -50 for darker |
| **Contrast** | -100 to +100 | +30 for more punch |
| **Saturation** | -100 to +100 | +50 for vivid colors |

## Keyboard Shortcuts

```
Ctrl+Z / Cmd+Z       Undo last change
Ctrl+Y / Cmd+Shift+Z Redo
Ctrl+S / Cmd+S       Save/download
F11 / Cmd+Ctrl+F     Full screen
```

## Export Formats

| Format | Best For | Quality |
|--------|----------|---------|
| **PNG** | Maximum quality | Lossless |
| **JPEG** | Photos, web | Adjustable 50-100 |
| **WebP** | Modern web | Balanced |

## Slider Tips

- **Drag slider left** → Decrease effect (-100)
- **Drag slider right** → Increase effect (+100)
- **Click value** → Type number directly
- **Double-click** → Reset to default

## Common Problems Quick Fixes

| Problem | Fix |
|---------|-----|
| **Nothing loads** | Refresh page (Ctrl+R) |
| **Changes don't show** | Wait a moment, app might be slow |
| **Undo not working** | Make an edit first, then undo |
| **Download not working** | Try PNG format instead |
| **App very slow** | Close other tabs/programs |
| **OpenCV won't load** | Check internet connection |

## File Size Guide

| Size | Processing Speed | Recommendation |
|------|------------------|-----------------|
| **< 2MB** | Fast | Ideal |
| **2-10MB** | Normal | Good |
| **10-50MB** | Slow | Resize first |
| **> 50MB** | Very slow | Use external tool |

## Quality Settings by Format

### JPEG
- **90-100**: Best quality, larger file
- **80-90**: High quality, good size
- **70-80**: Good quality, smaller file
- **< 70**: Lower quality, very small

### PNG
- Always lossless (best quality)
- File size varies by content
- Best for graphics with transparency

### WebP
- **90-100**: Best quality
- **75-90**: Good quality
- **< 75**: Smaller file, visible loss

## Batch Processing Steps

1. Click **Batch Processing**
2. Upload multiple images
3. Select filters/adjustments
4. Click **Process All**
5. Download ZIP with all images

## Before/After Comparison

1. Click **Compare** button
2. Slider appears on image
3. Drag left to see original
4. Drag right to see edited
5. Click **Done** to return to editing

## Color Adjustment Recipes

### Vibrant Photo
1. Saturation: +40
2. Contrast: +20
3. Brightness: +10

### Vintage Look
1. Grayscale
2. Brightness: -15
3. Contrast: -10

### Sharp Details
1. Sharpen filter
2. Contrast: +25

### Soft Portrait
1. Bilateral Blur: 8
2. Saturation: +15

### High Contrast Art
1. Canny Edge Detection
2. Increase threshold values

## Performance Tips

- **Faster:** Smaller images (< 2MB)
- **Slower:** Large images (> 10MB)
- **Solution:** Resize first in external tool
- **Memory:** Close other apps
- **Browser:** Use Chrome for best speed

## Browser Check

| Browser | Supported | Notes |
|---------|-----------|-------|
| Chrome | ✓ | Best performance |
| Firefox | ✓ | Very good |
| Safari | ✓ | Needs WebGL enabled |
| Edge | ✓ | Same as Chrome |
| Opera | ✓ | Good |
| IE11 | ✗ | Not supported |

## Storage

- **Local Only** - Images never uploaded
- **No Server** - All processing in browser
- **Temporary** - Cleared on page refresh
- **Safe** - No tracking or logging

## Help Resources

| Need | Go To |
|------|-------|
| **Quick help** | QUICK_REFERENCE.md (this file) |
| **Getting started** | GETTING_STARTED.md |
| **Installation** | INSTALLATION.md |
| **Troubleshooting** | TROUBLESHOOTING.md |
| **Tech details** | README.md |
| **All docs** | DOCS_INDEX.md |

## Screen Size Recommendations

| Device | Optimal Size |
|--------|--------------|
| **Desktop** | 1920x1080+ (full editor) |
| **Laptop** | 1366x768+ (works well) |
| **Tablet** | 768px+ (limited, mobile view) |
| **Phone** | Small screen (basic editing only) |

## Memory Usage

| Operation | Memory | Time |
|-----------|--------|------|
| Load app | 50MB | 1-2s |
| Upload image | +50-200MB | Instant |
| Apply filter | +10-50MB | 1-3s |
| Full undo history | ~500MB | Instant |
| Export image | +50MB | 1-5s |

## Cleanup Steps

When app gets slow:

1. **Undo several times** to clear history
2. **Remove old edits** using Edit menu
3. **Close other tabs** to free memory
4. **Refresh page** to reset (loses work)
5. **Restart browser** if very slow

## Advanced Tips

### Pro Workflow
1. Upload image
2. Create copy (export, re-import)
3. Try multiple versions
4. Use Compare to choose best
5. Final export

### Batch Effect Application
1. Open Batch Processing
2. Upload images
3. Apply same effect to all
4. Download processed set

### History Management
1. Make edit
2. Check result
3. Undo if needed
4. Redo if changed mind
5. Export when happy

### Quality Preservation
1. Use PNG for maximum quality
2. Use WebP for web
3. Keep original file safe
4. Export at highest quality
5. Resize only when needed

## Common Settings

### Instagram Photo
- Size: 1080x1080px
- Format: JPEG 90%
- Process: Saturation +30, Contrast +15

### Thumbnail
- Size: 400x300px
- Format: WebP 85%
- Process: Sharpen, Contrast +20

### Print Quality
- Size: 3000x+ pixels
- Format: PNG (lossless)
- Process: Full resolution

### Web Gallery
- Size: 1200x800px
- Format: WebP 80%
- Process: Resize, slight sharpen

## One-Page Summary

ImageProcessor is a browser-based image editor.

**Start**: `npm run dev` then open http://localhost:3000

**Edit**: Upload → Select filter → Adjust → Compare → Export

**Features**: Filters, transforms, color adjustments, edge detection

**Advanced**: Undo/redo, batch processing, before/after slider

**Export**: PNG (lossless), JPEG (adjustable), WebP (modern)

**Help**: Check GETTING_STARTED.md for full guide

---

## Version Info

- **App Version**: 1.0.0
- **Last Updated**: March 2026
- **Status**: Production Ready

---

Keep this handy! For more details, see the full documentation files.

**Happy editing!** 🎨
