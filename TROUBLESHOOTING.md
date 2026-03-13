# Troubleshooting Guide

## Common Issues and Solutions

### Application Won't Load

#### "Fatal error during initialization"
**Problem**: Page loads but shows fatal error message.

**Solutions**:
1. **Refresh the page** - Press `F5` or `Ctrl+R` (Cmd+R on Mac)
2. **Clear browser cache**:
   - Chrome: Settings → Privacy → Clear browsing data
   - Firefox: Settings → Privacy → Clear Recent History
   - Safari: Develop → Empty Web Storage
3. **Check internet connection** - OpenCV.js is loaded from CDN
4. **Try different browser** - Test in Chrome, Firefox, or Safari
5. **Disable browser extensions** - Some ad blockers interfere

#### "Failed to load image processing engine"
**Problem**: Initialization error with OpenCV.

**Solutions**:
1. **Wait 30 seconds** - OpenCV.js WASM module takes time to load
2. **Check internet** - CDN might be slow or blocked
3. **Check firewall** - Ensure `docs.opencv.org` is accessible
4. **Try incognito mode** - Disables extensions
5. **Update browser** - Ensure you have the latest version

#### Blank page with no content
**Problem**: Page renders but nothing appears.

**Solutions**:
1. **Open browser console** - Right-click → Inspect → Console tab
2. **Check for errors** - Look for red error messages
3. **Wait longer** - Page might still be loading
4. **Check JavaScript enabled** - Settings → JavaScript enabled
5. **Hard refresh** - `Ctrl+Shift+R` (Cmd+Shift+R on Mac)

---

### Image Upload Issues

#### "File upload not working"
**Problem**: Can't select or drag-drop images.

**Solutions**:
1. **Check file type** - Only JPEG, PNG, WebP, GIF supported
2. **Check file size** - Ensure file isn't too large (100MB+ usually OK)
3. **Check browser permissions** - Allow file access in browser settings
4. **Try different image** - Current image might be corrupted
5. **Restart browser** - Close and reopen browser

#### "Unsupported file format"
**Problem**: Image type not recognized.

**Solutions**:
1. **Convert image** - Use online converter to JPEG/PNG
2. **Check extension** - Ensure filename ends in .jpg, .png, .webp, .gif
3. **Download fresh copy** - Original might be corrupted
4. **Use different source** - Try image from different location

#### "File too large to process"
**Problem**: Image won't load even though file is valid.

**Solutions**:
1. **Resize in another tool** - Make image smaller before importing
2. **Reduce resolution** - Use 4000x4000 px max
3. **Close other tabs** - Free up browser memory
4. **Restart browser** - Clear memory
5. **Try smaller portion** - Crop image in external tool

---

### Editing Issues

#### "Filters not applying/No visible changes"
**Problem**: Clicked filter but image didn't change.

**Solutions**:
1. **Wait for processing** - Large images take time
2. **Check slider values** - Some sliders might be at default
3. **Try different filter** - Test if issue is filter-specific
4. **Undo and retry** - Sometimes reset helps
5. **Try smaller image** - Test with smaller file

#### "Changes are very subtle/hard to see"
**Problem**: Edits applied but barely visible.

**Solutions**:
1. **Increase slider values** - Drag slider further
2. **Try different filters** - Some are more dramatic
3. **Adjust contrast** - Makes changes more visible
4. **Use comparison tool** - Split-view shows difference better
5. **Try extreme values** - Test max slider to see effect

#### "Undo/Redo not working"
**Problem**: Can't undo or redo changes.

**Solutions**:
1. **Check if buttons are active** - Grayed out = no history
2. **Make an edit first** - Undo only works after edits
3. **Reload page** - History resets on page load
4. **Check browser storage** - Sometimes full cache causes issues
5. **Use Ctrl+Z** - Try keyboard shortcut instead of button

#### "Image looks distorted after editing"
**Problem**: Processed image has artifacts or distortion.

**Solutions**:
1. **Try different parameters** - Adjust slider values
2. **Apply filters in different order** - Order matters sometimes
3. **Start fresh** - Reload and try again
4. **Try different filter** - Choose alternative approach
5. **Check original** - Might be original image issue

---

### Export/Download Issues

#### "Download button not working"
**Problem**: Export dialog appears but download doesn't start.

**Solutions**:
1. **Check downloads folder** - File might be downloaded
2. **Check browser settings** - Downloads might be blocked
3. **Allow pop-ups** - Some browsers need this
4. **Try different format** - Try PNG instead of JPEG
5. **Check file size** - Might be too large for browser
6. **Restart browser** - Close and reopen

#### "Downloaded file is 0 bytes"
**Problem**: File downloads but has no content.

**Solutions**:
1. **Delete file** - Remove corrupted download
2. **Try again immediately** - Retry download
3. **Use different format** - PNG instead of JPEG
4. **Reduce image size** - Export smaller version
5. **Free up storage** - Ensure disk has space
6. **Update browser** - Use latest version

#### "Export format not supported"
**Problem**: Can't export in certain format.

**Solutions**:
1. **Check browser compatibility** - WebP needs modern browser
2. **Try PNG** - Most compatible option
3. **Try JPEG** - Good fallback option
4. **Update browser** - Older versions lack support
5. **Use different format** - Work with what's available

#### "File quality too low"
**Problem**: Exported image looks pixelated or unclear.

**Solutions**:
1. **Increase quality slider** - Drag to 90-100
2. **Use PNG instead** - Lossless compression
3. **Don't over-sharpen** - Creates artifacts
4. **Check original** - Source image might be low-res
5. **Resize before export** - Upscaling reduces quality

---

### Performance Issues

#### "App is very slow"
**Problem**: Buttons are sluggish, processing takes forever.

**Solutions**:
1. **Close other applications** - Free up system memory
2. **Close other browser tabs** - Each tab uses memory
3. **Restart browser** - Clear memory cache
4. **Use smaller image** - Resize first if possible
5. **Disable extensions** - Some slow down browser
6. **Update browser** - Latest version is fastest
7. **Try different browser** - Chrome usually fastest for this

#### "Processing freezes my browser"
**Problem**: App locks up when applying filters.

**Solutions**:
1. **Use smaller image** - Resize first
2. **Apply fewer filters** - Limit number of edits
3. **Close other programs** - Free RAM
4. **Increase browser memory** - Restart to reset
5. **Try simpler effect** - Avoid heavy filters
6. **Update browser** - Get performance improvements
7. **Check computer** - Ensure CPU/RAM isn't full

#### "Canvas rendering glitches"
**Problem**: Image display has visual artifacts.

**Solutions**:
1. **Reload page** - Sometimes fixes rendering
2. **Try full-screen** - F11 might help
3. **Zoom out** - Ctrl+Minus might improve display
4. **Use different browser** - Graphics handling varies
5. **Update graphics drivers** - Might help rendering
6. **Disable hardware acceleration** - Chrome settings

---

### Browser-Specific Issues

#### Chrome Issues

**WebAssembly not supported**:
- Update Chrome to latest version
- Check Settings → About → Update Chrome
- Restart browser after update

**Downloads blocked**:
- Settings → Privacy → Site settings → Downloads
- Allow downloads from this site

#### Firefox Issues

**Privacy mode restrictions**:
- App might not work in private/incognito mode
- Use normal browsing mode instead

**IndexedDB disabled**:
- Preferences → Privacy → Allow Firefox to store data
- Ensure check boxes are enabled

#### Safari Issues

**Older version incompatible**:
- Update macOS to get Safari update
- Use Chrome on older Macs

**WebGL issues**:
- Safari → Preferences → Advanced
- Enable "Show Develop menu"
- Develop → WebGL disabled (toggle to enable)

#### Edge Issues

**Similar to Chrome**:
- Update Edge to latest version
- Check Settings → Update available
- Restart after update

---

### Hardware/System Issues

#### "Out of memory errors"
**Problem**: Browser shows memory warning.

**Solutions**:
1. **Close other applications** - Free up system RAM
2. **Close browser tabs** - Each tab uses memory
3. **Restart computer** - Clear all memory
4. **Use smaller images** - Reduces memory usage
5. **Add more RAM** - Physical upgrade if frequent issue

#### "CPU usage very high"
**Problem**: Computer fan loud, everything slow.

**Solutions**:
1. **Close this tab** - Stop heavy processing
2. **Close other apps** - Free up CPU
3. **Stop background tasks** - Turn off unnecessary services
4. **Use smaller image** - Reduce processing load
5. **Update drivers** - Ensure hardware is optimized
6. **Check for malware** - Might be other cause

#### "Disk space full"
**Problem**: Can't download or save files.

**Solutions**:
1. **Free up disk space** - Delete old files
2. **Empty trash/recycle bin** - Recover space
3. **Check Downloads folder** - Delete old downloads
4. **Move files** - Transfer to external drive
5. **Clear browser cache** - Frees up space
   - Chrome: Settings → Privacy → Clear data
   - Firefox: Preferences → Privacy → Clear Data

---

## Data & Privacy

### "Will my images be stored on a server?"
**Answer**: No! All processing happens locally in your browser. Images never leave your computer.

### "Is my data secure?"
**Answer**: Yes. No data is sent to any server. Work with confidence.

### "Can I use this offline?"
**Answer**: Not fully. You need internet for initial OpenCV.js load, but once loaded, basic operations work. Full offline requires local setup.

---

## Getting Help

### Before reporting issues:
1. **Check troubleshooting above** - Might have solution
2. **Clear browser cache** - Fixes many issues
3. **Try different browser** - Isolates browser-specific issues
4. **Try different image** - Isolates file issues
5. **Test on different computer** - Isolates system issues

### When reporting issues:
Provide:
1. **Browser name and version** - `Chrome 120.0`
2. **Operating system** - `Windows 11` or `macOS Sonoma`
3. **Image details** - Format, size, dimensions
4. **Steps to reproduce** - What you did to trigger issue
5. **Error message** - Exact text shown
6. **Console errors** - From Developer Tools

### Resources:
- **Documentation**: Check README.md and GETTING_STARTED.md
- **GitHub Issues**: Report bugs with details
- **Browser DevTools**: Right-click → Inspect for error messages

---

## Still Having Problems?

1. **Check browser console** for error messages
2. **Try incognito/private mode** to disable extensions
3. **Update everything** - Browser, OS, drivers
4. **Restart computer** - Often clears issues
5. **Use different device** - Isolates device-specific problems
6. **Report on GitHub** with detailed information

Remember: Most issues are resolved by clearing cache and restarting the browser!

---

Last updated: 2026
