'use client';

import { useEffect, useState } from 'react';

interface OpenCVType {
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
  CV_8U: number;
  CV_8S: number;
  COLOR_RGBA2GRAY: number;
  COLOR_GRAY2RGBA: number;
  COLOR_BGR2GRAY: number;
  COLOR_GRAY2BGR: number;
  ROTATE_90_CLOCKWISE: number;
  ROTATE_180: number;
  ROTATE_90_COUNTERCLOCKWISE: number;
  FLIP_HORIZONTAL: number;
  FLIP_VERTICAL: number;
  getStructuringElement?: any;
  morphologyEx?: any;
  MORPH_OPEN?: number;
  MORPH_CLOSE?: number;
  MORPH_GRADIENT?: number;
  bilateralFilter?: any;
}

export function useOpenCV() {
  const [cv, setCv] = useState<OpenCVType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    let checkInterval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    const checkOpenCV = () => {
      // @ts-ignore
      if (window.cv && window.cv.Mat && window.cv.imread) {
        if (isMounted) {
          // @ts-ignore
          setCv(window.cv);
          setIsLoading(false);
          clearInterval(checkInterval);
          clearTimeout(timeout);
        }
        return true;
      }
      return false;
    };

    // Start checking immediately (script is loaded in layout)
    if (!checkOpenCV()) {
      checkInterval = setInterval(checkOpenCV, 100);

      // Timeout after 20 seconds
      timeout = setTimeout(() => {
        if (isMounted) {
          clearInterval(checkInterval);
          setError('Failed to load image processing engine. Please refresh the page.');
          setIsLoading(false);
        }
      }, 20000);
    }

    return () => {
      isMounted = false;
      clearInterval(checkInterval);
      clearTimeout(timeout);
    };
  }, []);

  return { cv, isLoading, error };
}
