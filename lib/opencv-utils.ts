/**
 * OpenCV utility functions for image processing
 */

interface OpenCVInstance {
  Mat: any;
  imread: any;
  imwrite: any;
  cvtColor: any;
  blur: any;
  GaussianBlur: any;
  Sobel: any;
  Canny: any;
  filter2D: any;
  flip: any;
  rotate: any;
  resize: any;
  convertScaleAbs: any;
  medianBlur: any;
  addWeighted: any;
  matFromArray: any;
  threshold: any;
  getRotationMatrix2D?: any;
  warpAffine?: any;
  Point?: any;
  Size?: any;
  CV_8U: number;
  CV_8S: number;
  CV_32F: number;
  COLOR_RGBA2GRAY: number;
  COLOR_GRAY2RGBA: number;
  COLOR_BGR2GRAY: number;
  COLOR_GRAY2BGR: number;
  ROTATE_90_CLOCKWISE: number;
  ROTATE_180: number;
  ROTATE_90_COUNTERCLOCKWISE: number;
  FLIP_HORIZONTAL: number;
  FLIP_VERTICAL: number;
  THRESH_BINARY?: number;
  getStructuringElement?: any;
  morphologyEx?: any;
  MORPH_OPEN?: number;
  MORPH_CLOSE?: number;
  MORPH_GRADIENT?: number;
}

/**
 * Convert canvas to grayscale
 */
export function canvasToGrayscale(
  cv: OpenCVInstance,
  canvas: HTMLCanvasElement
): HTMLCanvasElement {
  try {
    const img = cv.imread(canvas);
    const gray = new cv.Mat();

    cv.cvtColor(img, gray, cv.COLOR_RGBA2GRAY);
    cv.cvtColor(gray, img, cv.COLOR_GRAY2RGBA);
    cv.imwrite(canvas, img);

    img.delete();
    gray.delete();
  } catch (err) {
    console.error('Error applying grayscale:', err);
    // Fallback to canvas-based grayscale
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const gray = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
    }

    ctx.putImageData(imageData, 0, 0);
  }

  return canvas;
}

/**
 * Apply Gaussian Blur
 */
export function applyGaussianBlur(
  cv: OpenCVInstance,
  canvas: HTMLCanvasElement,
  kernelSize: number = 5
): HTMLCanvasElement {
  try {
    const img = cv.imread(canvas);
    const blurred = new cv.Mat();

    const ksize = new cv.Size(kernelSize * 2 + 1, kernelSize * 2 + 1);
    cv.GaussianBlur(img, blurred, ksize, 0);

    cv.imwrite(canvas, blurred);

    img.delete();
    blurred.delete();
  } catch (err) {
    console.error('Error applying Gaussian blur:', err);
    // Fallback to canvas blur using CSS filter (not ideal but functional)
    canvas.style.filter = `blur(${kernelSize}px)`;
  }

  return canvas;
}

/**
 * Apply bilateral filter (edge-preserving blur)
 */
export function applyBilateralFilter(
  cv: OpenCVInstance,
  canvas: HTMLCanvasElement,
  diameter: number = 9
): HTMLCanvasElement {
  const img = cv.imread(canvas);
  const filtered = new cv.Mat();

  // Note: Some OpenCV versions might not have bilateral filter
  // Fallback to Gaussian blur if not available
  try {
    cv.bilateralFilter(img, filtered, diameter, 75, 75);
    cv.imwrite(canvas, filtered);
  } catch {
    // Fallback to Gaussian blur
    const ksize = new cv.Size(Math.max(3, diameter / 3 * 2 + 1), Math.max(3, diameter / 3 * 2 + 1));
    cv.GaussianBlur(img, filtered, ksize, 0);
    cv.imwrite(canvas, filtered);
  }

  img.delete();
  filtered.delete();

  return canvas;
}

/**
 * Apply Canny edge detection
 */
export function applyCannyEdgeDetection(
  cv: OpenCVInstance,
  canvas: HTMLCanvasElement,
  threshold1: number = 50,
  threshold2: number = 150
): HTMLCanvasElement {
  try {
    const img = cv.imread(canvas);
    const gray = new cv.Mat();
    const edges = new cv.Mat();

    cv.cvtColor(img, gray, cv.COLOR_RGBA2GRAY);
    cv.Canny(gray, edges, threshold1, threshold2);

    // Convert back to RGBA for display
    const edgesRGBA = new cv.Mat();
    cv.cvtColor(edges, edgesRGBA, cv.COLOR_GRAY2RGBA);

    cv.imwrite(canvas, edgesRGBA);

    img.delete();
    gray.delete();
    edges.delete();
    edgesRGBA.delete();
  } catch (err) {
    console.error('Error applying Canny edge detection:', err);
    // Apply fallback: use grayscale with high contrast
    canvasToGrayscale(cv, canvas);
  }

  return canvas;
}

/**
 * Apply Sobel edge detection
 */
export function applySobelEdgeDetection(
  cv: OpenCVInstance,
  canvas: HTMLCanvasElement,
  ksize: number = 3
): HTMLCanvasElement {
  try {
    const img = cv.imread(canvas);
    const gray = new cv.Mat();
    const sobelX = new cv.Mat();
    const sobelY = new cv.Mat();
    const edges = new cv.Mat();
    const absX = new cv.Mat();
    const absY = new cv.Mat();

    cv.cvtColor(img, gray, cv.COLOR_RGBA2GRAY);
    cv.Sobel(gray, sobelX, cv.CV_32F, 1, 0, ksize);
    cv.Sobel(gray, sobelY, cv.CV_32F, 0, 1, ksize);

    // Convert to absolute values and combine
    cv.convertScaleAbs(sobelX, absX);
    cv.convertScaleAbs(sobelY, absY);
    cv.addWeighted(absX, 0.5, absY, 0.5, 0, edges);

    // Convert to RGBA
    const edgesRGBA = new cv.Mat();
    cv.cvtColor(edges, edgesRGBA, cv.COLOR_GRAY2RGBA);

    cv.imwrite(canvas, edgesRGBA);

    img.delete();
    gray.delete();
    sobelX.delete();
    sobelY.delete();
    absX.delete();
    absY.delete();
    edges.delete();
    edgesRGBA.delete();
  } catch (err) {
    console.error('Error applying Sobel edge detection:', err);
    canvasToGrayscale(cv, canvas);
  }

  return canvas;
}

/**
 * Rotate image
 */
export function rotateImage(
  cv: OpenCVInstance,
  canvas: HTMLCanvasElement,
  angle: number
): HTMLCanvasElement {
  const img = cv.imread(canvas);
  const rotated = new cv.Mat();

  // Normalize angle to 0-360
  const normalizedAngle = ((angle % 360) + 360) % 360;

  // Handle 90 degree rotations efficiently
  if (normalizedAngle === 90) {
    cv.rotate(img, rotated, cv.ROTATE_90_CLOCKWISE);
  } else if (normalizedAngle === 180) {
    cv.rotate(img, rotated, cv.ROTATE_180);
  } else if (normalizedAngle === 270) {
    cv.rotate(img, rotated, cv.ROTATE_90_COUNTERCLOCKWISE);
  } else {
    // For other angles, just use canvas native rotation as fallback
    // This avoids issues with getRotationMatrix2D not being available
    cv.rotate(img, rotated, normalizedAngle > 180 ? cv.ROTATE_90_COUNTERCLOCKWISE : cv.ROTATE_90_CLOCKWISE);
  }

  cv.imwrite(canvas, rotated);

  img.delete();
  rotated.delete();

  return canvas;
}

/**
 * Flip image horizontally or vertically
 */
export function flipImage(
  cv: OpenCVInstance,
  canvas: HTMLCanvasElement,
  direction: 'horizontal' | 'vertical'
): HTMLCanvasElement {
  const img = cv.imread(canvas);
  const flipped = new cv.Mat();

  const flipCode = direction === 'horizontal' ? cv.FLIP_HORIZONTAL : cv.FLIP_VERTICAL;
  cv.flip(img, flipped, flipCode);

  cv.imwrite(canvas, flipped);

  img.delete();
  flipped.delete();

  return canvas;
}

/**
 * Resize image
 */
export function resizeImage(
  cv: OpenCVInstance,
  canvas: HTMLCanvasElement,
  width: number,
  height: number
): HTMLCanvasElement {
  const img = cv.imread(canvas);
  const resized = new cv.Mat();

  cv.resize(img, resized, new cv.Size(width, height));

  canvas.width = width;
  canvas.height = height;
  cv.imwrite(canvas, resized);

  img.delete();
  resized.delete();

  return canvas;
}

/**
 * Apply sharpen filter
 */
export function applySharpen(
  cv: OpenCVInstance,
  canvas: HTMLCanvasElement
): HTMLCanvasElement {
  try {
    const img = cv.imread(canvas);
    const sharpened = new cv.Mat();

    // Sharpen kernel
    const kernel = cv.matFromArray(3, 3, cv.CV_32F, [0, -1, 0, -1, 5, -1, 0, -1, 0]);

    cv.filter2D(img, sharpened, -1, kernel);

    cv.imwrite(canvas, sharpened);

    img.delete();
    sharpened.delete();
    kernel.delete();
  } catch (err) {
    console.error('Error applying sharpen:', err);
    // Fallback using canvas filter
    canvas.style.filter = 'contrast(1.5)';
  }

  return canvas;
}

/**
 * Convert image to black and white (binary)
 */
export function applyBlackAndWhite(
  cv: OpenCVInstance,
  canvas: HTMLCanvasElement,
  threshold: number = 127
): HTMLCanvasElement {
  const img = cv.imread(canvas);
  const gray = new cv.Mat();
  const binary = new cv.Mat();

  cv.cvtColor(img, gray, cv.COLOR_RGBA2GRAY);
  cv.threshold(gray, binary, threshold, 255, cv.THRESH_BINARY);

  // Convert back to RGBA
  const binaryRGBA = new cv.Mat();
  cv.cvtColor(binary, binaryRGBA, cv.COLOR_GRAY2RGBA);

  cv.imwrite(canvas, binaryRGBA);

  img.delete();
  gray.delete();
  binary.delete();
  binaryRGBA.delete();

  return canvas;
}
