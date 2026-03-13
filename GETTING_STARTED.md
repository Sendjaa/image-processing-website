# Getting Started with ImageProcessor

## Quick Start (5 minutes)

### Step 1: Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 2: Upload Your First Image

1. Click on the large upload area in the center of the screen
2. Select an image from your computer (JPEG, PNG, WebP supported)
3. Or drag and drop an image directly onto the upload area

### Step 3: Apply a Filter

Once your image is loaded:

1. Look at the **Filters** panel on the right side
2. Click on a filter button like "Grayscale" or "Blur"
3. If the filter has adjustable parameters, a slider will appear
4. The changes are applied in real-time!

### Step 4: Export Your Image

1. Click the **Export** button at the top
2. Choose your format: PNG, JPEG, or WebP
3. Adjust quality if needed
4. Click **Download**
5. Your edited image is now saved to your Downloads folder

## Detailed Features Guide

### Uploading Images

- **Single Image Upload**: Click the upload zone or drag & drop
- **Supported Formats**: JPEG (.jpg), PNG (.png), WebP (.webp), GIF (.gif)
- **Max File Size**: Browser dependent (usually 100MB+)
- **Batch Import**: Available in Batch Processing dialog

### Using Filters

#### Grayscale
Converts your image to black and white.
- **No parameters** - Click to apply instantly
- **Best for**: Creating vintage looks, artistic effects

#### Gaussian Blur
Creates a soft, blurred effect. Perfect for backgrounds or artistic photos.
- **Kernel Size**: 1-10 (higher = more blur)
- **Best for**: Softening images, creating depth of field

#### Bilateral Filter
Smart blur that preserves edges while blurring flat areas.
- **Kernel Size**: 1-10
- **Best for**: Smoothing skin tones, maintaining edge sharpness

#### Sharpen
Enhances edges and details in your image.
- **No parameters** - One-click sharpening
- **Best for**: Making blurry images crisper

### Using Transformations

#### Rotate
Quick rotation by fixed angles.
- **90° Clockwise**: Rotate image 90° to the right
- **180°**: Flip image upside down
- **270° (90° Counter-clockwise)**: Rotate image 90° to the left

#### Flip
Mirror your image.
- **Horizontal**: Left becomes right
- **Vertical**: Top becomes bottom

#### Resize
Change image dimensions.
- **Enter new width/height** in the input fields
- **Maintain Aspect Ratio**: Checkbox keeps proportions
- **Click Apply**: Scale is applied instantly

### Adjusting Colors

#### Brightness
Make image lighter or darker.
- **Slider Range**: -100 to +100
- **-100**: Completely black
- **0**: Original brightness
- **+100**: Maximum brightness

#### Contrast
Increase or decrease the difference between light and dark areas.
- **Slider Range**: -100 to +100
- **Lower values**: Less contrast (flatter image)
- **Higher values**: More contrast (more dramatic)

#### Saturation
Control color intensity.
- **Slider Range**: -100 to +100
- **-100**: Complete grayscale
- **0**: Original colors
- **+100**: Highly saturated colors

### Edge Detection

#### Canny Edge Detection
Professional-grade edge detection algorithm.
- **Threshold 1**: Lower edge detection threshold (50-200)
- **Threshold 2**: Upper edge detection threshold (100-500)
- **Best for**: Finding object boundaries, creating artistic sketches

#### Sobel Edge Detection
Gradient-based edge detection.
- **Kernel Size**: 1-7 (higher = thicker edges)
- **Best for**: 3D effect, edge enhancement

## Advanced Features

### Undo/Redo

Located in the top toolbar:
- **Undo Button** (↶): Revert to previous state
- **Redo Button** (↷): Reapply undone changes
- **History Limit**: Last 50 operations saved

**Keyboard Shortcuts**:
- `Ctrl+Z` / `Cmd+Z`: Undo
- `Ctrl+Y` / `Cmd+Y`: Redo (or `Ctrl+Shift+Z`)

### Before/After Comparison

Compare original and edited versions:
1. Click the **Compare** button
2. A split-view slider appears
3. Drag the slider left/right to see both versions
4. Perfect for checking if edits improved your image

### Batch Processing

Process multiple images with the same settings:
1. Click **Batch Processing** button
2. Upload multiple images
3. Configure your filters and transformations
4. Click **Process All**
5. Download all edited images at once

### Export Options

#### PNG Format
- **Lossless** compression
- **Best for**: Preserving exact colors, graphics, transparent areas
- **File size**: Larger than JPEG

#### JPEG Format
- **Lossy** compression
- **Quality slider**: 50-100 (higher = better quality)
- **Best for**: Photographs, smaller file sizes
- **Default quality**: 90

#### WebP Format
- **Modern format** with excellent compression
- **Quality slider**: 50-100
- **Best for**: Web usage, modern browsers
- **Benefit**: Smaller files than JPEG at same quality

## Common Workflows

### Create a Social Media Image

1. **Upload** your photo
2. **Adjust Saturation** (+30 to +50) for vibrant colors
3. **Adjust Contrast** (+20) for more impact
4. **Sharpen** to make details pop
5. **Resize** to platform dimensions (1200x630 for most platforms)
6. **Export as JPEG** at 90% quality
7. **Download** and post!

### Black & White Artistic Photo

1. **Upload** your photo
2. **Increase Contrast** (+30 to +50)
3. **Apply Grayscale**
4. **Adjust Brightness** if too dark/light
5. **Compare** before/after to check results
6. **Export as PNG** for best quality
7. **Download** your artwork

### Edge Art Creation

1. **Upload** your image
2. **Apply Canny Edge Detection** (Threshold 1: 100, Threshold 2: 200)
3. **Compare** results with original
4. **Adjust Thresholds** if needed
5. **Export** and download
6. Use as a template or artistic effect

### Quick Photo Enhancement

1. **Upload** blurry photo
2. **Apply Sharpen** filter
3. **Increase Contrast** slightly (+15)
4. **Adjust Brightness** if needed
5. **Compare** before/after
6. **Export** and download

## Tips & Tricks

### Performance
- **Large images**: Resize to ~2000px width first for faster processing
- **Multiple edits**: Undo unused edits to speed up operations
- **Browser**: Use Chrome/Firefox for best performance

### Quality
- **Preserve quality**: Export PNG for lossless compression
- **Web use**: Export WebP for best compression
- **Photography**: Use JPEG at 85-95% quality

### Creative Effects
- **Vintage look**: Grayscale + reduce brightness slightly
- **Pop effect**: Increase saturation + increase contrast
- **Soft focus**: Use Bilateral Filter with high kernel size
- **Sketch effect**: Use edge detection, invert colors

## Troubleshooting

### Image Won't Upload
- **Check file type**: Only JPEG, PNG, WebP, GIF supported
- **Check file size**: Ensure file isn't corrupted
- **Try another image**: Test if issue is browser-specific
- **Refresh browser**: Clear cache and reload page

### Changes Not Appearing
- **Wait a moment**: Large images take time to process
- **Check console**: Right-click → Inspect → Console for errors
- **Undo and retry**: Sometimes a redo helps

### Export Not Working
- **Check browser**: Ensure cookies/downloads enabled
- **Check browser storage**: Free up disk space
- **Try different format**: PNG, JPEG, or WebP
- **Download folder permissions**: Ensure download folder is writable

### Slow Performance
- **Close other tabs**: Free up memory
- **Reduce image size**: Resize before heavy editing
- **Use simpler effects**: Avoid multiple heavy filters
- **Restart browser**: Clear memory and cache

## Keyboard Shortcuts

| Action | Windows/Linux | Mac |
|--------|--------------|-----|
| Undo | `Ctrl+Z` | `Cmd+Z` |
| Redo | `Ctrl+Y` | `Cmd+Shift+Z` |
| Save/Download | `Ctrl+S` | `Cmd+S` |
| Full Screen | `F11` | `Cmd+Ctrl+F` |

## Next Steps

- **Explore all filters**: Try different combinations
- **Experiment with parameters**: Learn how each slider affects images
- **Compare results**: Use before/after to see improvements
- **Batch process**: Speed up workflows with batch processing
- **Share feedback**: Help improve the app with suggestions

## Questions or Issues?

- Check the [README.md](README.md) for more technical details
- Review the [TROUBLESHOOTING.md](TROUBLESHOOTING.md) guide
- Open an issue on GitHub for bugs or feature requests

---

Happy image editing! 🎨📸
