'use client';

import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface BeforeAfterComparisonProps {
  beforeImage: string;
  afterImage: string;
  title?: string;
}

export function BeforeAfterComparison({
  beforeImage,
  afterImage,
  title = 'Before / After',
}: BeforeAfterComparisonProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 300 });

  useEffect(() => {
    const updateDimensions = () => {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        const maxWidth = containerRef.current?.clientWidth || 400;
        const maxHeight = window.innerHeight - 300;

        const scale = Math.min(maxWidth / img.width, maxHeight / img.height, 1);

        setDimensions({
          width: Math.round(img.width * scale),
          height: Math.round(img.height * scale),
        });
      };

      img.src = beforeImage;
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [beforeImage]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const position = ((e.clientX - rect.left) / rect.width) * 100;

    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const position = ((e.touches[0].clientX - rect.left) / rect.width) * 100;

    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  return (
    <Card className="w-full bg-muted/50 overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-sm font-medium">{title}</h3>
      </div>

      <div className="p-4">
        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-lg cursor-col-resize select-none"
          style={{ width: dimensions.width, height: dimensions.height }}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* Before Image (Background) */}
          <div className="absolute inset-0">
            <img
              src={beforeImage}
              alt="Before"
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
          </div>

          {/* After Image (Overlay) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={afterImage}
              alt="After"
              className="w-full h-full object-cover"
              style={{ width: `${(100 / sliderPosition) * 100}%` }}
              crossOrigin="anonymous"
            />
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-primary cursor-col-resize transition-colors hover:w-1.5 hover:bg-primary/80"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="flex gap-1 bg-primary rounded-full px-3 py-2 shadow-lg">
                <svg
                  className="w-4 h-4 text-primary-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <svg
                  className="w-4 h-4 text-primary-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium pointer-events-none">
            Before
          </div>
          <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium pointer-events-none">
            After
          </div>
        </div>
      </div>
    </Card>
  );
}
