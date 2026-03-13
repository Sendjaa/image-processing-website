# ImageProcessor - Professional Digital Image Editor

A powerful, web-based digital image processing application built with Next.js 16, React 19, and OpenCV.js. Process and edit images directly in your browser with advanced filters, transformations, color adjustments, and edge detection.

## Features

### Image Filters
- **Grayscale** - Convert images to black and white
- **Gaussian Blur** - Apply soft blur effects with adjustable intensity
- **Bilateral Filter** - Smart blur that preserves edges
- **Sharpen** - Enhance image details and edges

### Geometric Transformations
- **Rotation** - Rotate images by 90°, 180°, or 270°
- **Flip** - Horizontal and vertical flipping
- **Resize** - Scale images with aspect ratio preservation

### Color Adjustments
- **Brightness** - Adjust brightness from -100 to +100
- **Contrast** - Enhance or reduce contrast
- **Saturation** - Control color intensity
- **Real-time Preview** - See changes instantly as you adjust sliders

### Edge Detection
- **Canny Edge Detection** - Advanced edge detection with adjustable thresholds
- **Sobel Edge Detection** - Gradient-based edge detection

### Advanced Features
- **Undo/Redo** - Full undo/redo functionality with 50-state history
- **Before/After Comparison** - Interactive split-view slider to compare original and edited images
- **Batch Processing** - Process multiple images at once
- **Export Options** - Save as PNG, JPEG, or WebP with quality control
- **History Management** - Track all edits with visual history

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **UI Framework**: React 19 with Hooks
- **Image Processing**: OpenCV.js (4.7.0)
- **Component Library**: shadcn/ui
- **Styling**: TailwindCSS v4
- **Icons**: Lucide React
- **State Management**: React Hooks with custom hooks

## Getting Started

### Prerequisites

- Node.js 18+ or higher
- npm, yarn, or pnpm package manager

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd image-processor
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` in your web browser

### First Use

1. **Upload an Image**
   - Click the upload area or drag & drop an image
   - Supported formats: JPEG, PNG, WebP, GIF

2. **Apply Filters and Effects**
   - Use the filter panel to apply various effects
   - Adjustments are applied in real-time

3. **Transform Your Image**
   - Rotate, flip, or resize using the transform panel
   - Maintain aspect ratio for proportional scaling

4. **Adjust Colors**
   - Fine-tune brightness, contrast, and saturation
   - Use sliders for precise control

5. **Detect Edges**
   - Choose between Canny or Sobel edge detection
   - Adjust detection parameters as needed

6. **Compare Results**
   - Use the before/after comparison slider
   - Toggle between original and edited versions

7. **Export Your Work**
   - Choose your export format (PNG, JPEG, WebP)
   - Adjust quality settings
   - Download the processed image

## Project Structure

```
image-processor/
├── app/
│   ├── layout.tsx              # Root layout with OpenCV CDN
│   ├── page.tsx                # Main editor page
│   ├── globals.css             # Global styles & design tokens
│   └── page.tsx                # App entry point
├── components/
│   ├── ImageUpload.tsx         # Image upload handler
│   ├── EditorCanvas.tsx        # Canvas for image display
│   ├── HistoryControls.tsx     # Undo/redo controls
│   ├── BeforeAfterComparison.tsx  # Split-view comparator
│   ├── ExportDialog.tsx        # Export settings dialog
│   ├── BatchProcessing.tsx     # Batch processing dialog
│   ├── panels/
│   │   ├── FilterPanel.tsx     # Filter controls
│   │   ├── TransformPanel.tsx  # Transformation controls
│   │   ├── ColorPanel.tsx      # Color adjustment controls
│   │   └── EdgeDetectionPanel.tsx  # Edge detection controls
│   └── ui/                     # shadcn/ui components
├── hooks/
│   ├── useOpenCV.ts            # OpenCV.js initialization
│   ├── useImageProcessor.ts    # Image processing logic
│   ├── useHistory.ts           # Undo/redo state management
│   └── use-*.ts                # Other utility hooks
├── lib/
│   ├── opencv-utils.ts         # OpenCV wrapper functions
│   └── utils.ts                # Utility functions
└── public/                     # Static assets
```

## Key Hooks

### `useOpenCV()`
Manages OpenCV.js loading and initialization from CDN.

```typescript
const { cv, isLoading, error } = useOpenCV();
```

### `useImageProcessor(cv)`
Handles image processing operations and state management.

```typescript
const { processImage, currentImage, isProcessing } = useImageProcessor(cv);
```

### `useHistory(initialState)`
Provides undo/redo functionality with history tracking.

```typescript
const { push, undo, redo, canUndo, canRedo } = useHistory(initialImage);
```

## Image Processing Functions

All image processing functions are in `lib/opencv-utils.ts`:

- `canvasToGrayscale(cv, canvas)` - Convert to grayscale
- `applyGaussianBlur(cv, canvas, kernelSize)` - Apply Gaussian blur
- `applySharpen(cv, canvas)` - Sharpen image
- `applyCannyEdgeDetection(cv, canvas, threshold1, threshold2)` - Canny edge detection
- `applySobelEdgeDetection(cv, canvas, ksize)` - Sobel edge detection
- `rotateImage(cv, canvas, angle)` - Rotate image
- `flipImage(cv, canvas, direction)` - Flip image horizontally or vertically
- `resizeImage(cv, canvas, width, height)` - Resize image
- `adjustBrightness(cv, canvas, value)` - Adjust brightness
- `adjustContrast(cv, canvas, value)` - Adjust contrast
- `adjustSaturation(cv, canvas, value)` - Adjust saturation

## Styling

The application uses TailwindCSS v4 with custom design tokens defined in `app/globals.css`:

```css
--primary: oklch(0.55 0.25 263)  /* Blue accent color */
--background: oklch(0.12 0 0)    /* Dark background */
--foreground: oklch(0.95 0 0)    /* Light text */
```

Dark theme is enabled by default. All components automatically adapt to the color scheme.

## Performance Optimization

- Real-time preview uses debounced slider updates (300ms)
- Canvas rendering optimized with `requestAnimationFrame`
- Image history limited to 50 states to manage memory
- Lazy loading of heavy components
- Optimized bundle with code splitting

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

OpenCV.js requires WebAssembly (WASM) support.

## Troubleshooting

### "Failed to load image processing engine"
- Check your internet connection (OpenCV.js is loaded from CDN)
- Try refreshing the page
- Clear browser cache and cookies

### Images not showing after processing
- Ensure canvas 2D context is available
- Try with a different image format
- Check browser console for errors

### Slow performance with large images
- Consider resizing the image first
- Reduce the number of filters applied
- Close other browser tabs to free memory

## API & Integration

All image processing is done client-side in the browser. No server uploads required. Your images never leave your computer.

## Future Enhancements

- [ ] Custom filter creation
- [ ] Image annotations and drawing tools
- [ ] More advanced transformations (perspective, distortion)
- [ ] AI-powered image enhancement
- [ ] Real-time video processing
- [ ] Plugin system for custom filters

## Development

### Building for Production

```bash
npm run build
npm start
```

### Environment Variables

No environment variables are required. The application uses the public OpenCV.js CDN.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Support

For issues, questions, or suggestions, please open an issue on the project repository.

---

**Happy Image Processing!** 🎨
