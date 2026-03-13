'use client';

import { useState, useCallback } from 'react';

export interface ImageData {
  src: string;
  width: number;
  height: number;
  canvas?: HTMLCanvasElement;
}

export interface ProcessingParams {
  brightness?: number;
  contrast?: number;
  saturation?: number;
  blur?: number;
  sharpen?: number;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
}

export function useImageProcessor() {
  const [currentImage, setCurrentImage] = useState<ImageData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const loadImage = useCallback(async (file: File) => {
    try {
      setIsProcessing(true);
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;

          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
          }

          setCurrentImage({
            src: canvas.toDataURL(),
            width: img.width,
            height: img.height,
            canvas,
          });
          setIsProcessing(false);
        };

        img.src = e.target?.result as string;
      };

      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Error loading image:', err);
      setIsProcessing(false);
    }
  }, []);

  const processWithCanvas = useCallback(
    (params: ProcessingParams, imageData: ImageData) => {
      const canvas = document.createElement('canvas');
      const img = new Image();
      img.crossOrigin = 'anonymous';

      return new Promise<string>((resolve) => {
        img.onload = () => {
          canvas.width = imageData.width;
          canvas.height = imageData.height;

          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          // Handle rotation
          if (params.rotation && params.rotation !== 0) {
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((params.rotation * Math.PI) / 180);
            ctx.translate(-canvas.width / 2, -canvas.height / 2);
          }

          // Handle flip
          if (params.scaleX && params.scaleX !== 1) {
            ctx.scale(params.scaleX, 1);
            if (params.scaleX === -1) {
              ctx.translate(-canvas.width, 0);
            }
          }

          if (params.scaleY && params.scaleY !== 1) {
            ctx.scale(1, params.scaleY);
            if (params.scaleY === -1) {
              ctx.translate(0, -canvas.height);
            }
          }

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Apply brightness and contrast
          const imageDataObj = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageDataObj.data;

          for (let i = 0; i < data.length; i += 4) {
            // Apply brightness
            if (params.brightness) {
              data[i] += params.brightness;
              data[i + 1] += params.brightness;
              data[i + 2] += params.brightness;
            }

            // Apply contrast
            if (params.contrast) {
              const factor = (259 * (params.contrast + 255)) / (255 * (259 - params.contrast));
              data[i] = Math.min(255, Math.max(0, factor * (data[i] - 128) + 128));
              data[i + 1] = Math.min(255, Math.max(0, factor * (data[i + 1] - 128) + 128));
              data[i + 2] = Math.min(255, Math.max(0, factor * (data[i + 2] - 128) + 128));
            }

            // Apply saturation
            if (params.saturation) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];

              const gray = r * 0.299 + g * 0.587 + b * 0.114;
              const alpha = 1 + params.saturation;

              data[i] = Math.min(255, Math.max(0, gray + (r - gray) * alpha));
              data[i + 1] = Math.min(255, Math.max(0, gray + (g - gray) * alpha));
              data[i + 2] = Math.min(255, Math.max(0, gray + (b - gray) * alpha));
            }
          }

          ctx.putImageData(imageDataObj, 0, 0);
          resolve(canvas.toDataURL());
        };

        img.src = imageData.src;
      });
    },
    []
  );

  return {
    currentImage,
    setCurrentImage,
    loadImage,
    processWithCanvas,
    isProcessing,
  };
}
