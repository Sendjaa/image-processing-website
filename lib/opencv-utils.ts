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
  getStructuringElement: any;
  morphologyEx: any;
  MORPH_OPEN: number;
  MORPH_CLOSE: number;
  MORPH_GRADIENT: number;
}

/**
 * Convert canvas to grayscale
 */
export function canvasToGrayscale(
  cv: OpenCVInstance,
  canvas: HTMLCanvasElement
): HTMLCanvasElement {
  const img = cv.imread(canvas);
  const gray = new cv.Mat();

  cv.cvtColor(img, gray, cv.COLOR_RGBA2GRAY);

  cv.imwrite(canvas, gray);

  img.delete();
  gray.delete();

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
  const img = cv.imread(canvas);
  const blurred = new cv.Mat();

  const ksize = new cv.Size(kernelSize * 2 + 1, kernelSize * 2 + 1);
  cv.GaussianBlur(img, blurred, ksize, 0);

  cv.imwrite(canvas, blurred);

  img.delete();
  blurred.delete();

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
  const img = cv.imread(canvas);
  const gray = new cv.Mat();
  const sobelX = new cv.Mat();
  const sobelY = new cv.Mat();
  const edges = new cv.Mat();

  cv.cvtColor(img, gray, cv.COLOR_RGBA2GRAY);
  cv.Sobel(gray, sobelX, cv.CV_32F, 1, 0, ksize);
  cv.Sobel(gray, sobelY, cv.CV_32F, 0, 1, ksize);

  // Combine X and Y gradients
  const magnitude = new cv.Mat();
  cv.magnitude(sobelX, sobelY, magnitude);
  cv.convertScaleAbs(magnitude, edges);

  // Convert to RGBA
  const edgesRGBA = new cv.Mat();
  cv.cvtColor(edges, edgesRGBA, cv.COLOR_GRAY2RGBA);

  cv.imwrite(canvas, edgesRGBA);

  img.delete();
  gray.delete();
  sobelX.delete();
  sobelY.delete();
  magnitude.delete();
  edges.delete();
  edgesRGBA.delete();

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
    // For other angles, use affine transformation
    const center = new cv.Point(img.cols / 2, img.rows / 2);
    const rotationMatrix = cv.getRotationMatrix2D(center, normalizedAngle, 1);
    cv.warpAffine(img, rotated, rotationMatrix, new cv.Size(img.cols, img.rows));
    rotationMatrix.delete();
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
  const img = cv.imread(canvas);
  const sharpened = new cv.Mat();

  // Sharpen kernel
  const kernel = cv.matFromArray(3, 3, cv.CV_32F, [0, -1, 0, -1, 5, -1, 0, -1, 0]);

  cv.filter2D(img, sharpened, -1, kernel);

  cv.imwrite(canvas, sharpened);

  img.delete();
  sharpened.delete();
  kernel.delete();

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
