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
}

export function useOpenCV() {
  const [cv, setCv] = useState<OpenCVType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOpenCV = async () => {
      try {
        // Create a script element to load OpenCV dynamically
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://docs.opencv.org/4.7.0/opencv.js';

        script.onload = () => {
          // @ts-ignore
          if (window.cv) {
            // @ts-ignore
            setCv(window.cv);
            setIsLoading(false);
          } else {
            setError('Failed to load OpenCV');
            setIsLoading(false);
          }
        };

        script.onerror = () => {
          setError('Failed to load OpenCV script');
          setIsLoading(false);
        };

        document.head.appendChild(script);

        return () => {
          // Cleanup
          if (document.head.contains(script)) {
            document.head.removeChild(script);
          }
        };
      } catch (err) {
        setError('Error loading OpenCV: ' + String(err));
        setIsLoading(false);
      }
    };

    loadOpenCV();
  }, []);

  return { cv, isLoading, error };
}
