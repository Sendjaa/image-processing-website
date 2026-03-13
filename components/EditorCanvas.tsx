'use client';

import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

interface EditorCanvasProps {
  imageSrc: string | null;
  onCanvasRef?: (canvas: HTMLCanvasElement | null) => void;
  showOriginal?: boolean;
}

export function EditorCanvas({ imageSrc, onCanvasRef, showOriginal = false }: EditorCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onCanvasRef?.(canvasRef.current);
  }, [onCanvasRef]);

  useEffect(() => {
    if (!imageSrc || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };

    img.src = imageSrc;
  }, [imageSrc]);

  // Auto-size container to fit image
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;

    const maxWidth = containerRef.current.clientWidth;
    const maxHeight = window.innerHeight - 300;

    let width = canvas.width;
    let height = canvas.height;

    const scale = Math.min(maxWidth / width, maxHeight / height, 1);

    containerRef.current.style.width = `${width * scale}px`;
    containerRef.current.style.height = `${height * scale}px`;
  }, [imageSrc]);

  if (!imageSrc) {
    return (
      <Card className="w-full h-full min-h-[400px] flex items-center justify-center bg-muted/50 border-dashed">
        <div className="text-center">
          <p className="text-muted-foreground">Upload an image to get started</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-auto bg-muted/50">
      <div ref={containerRef} className="inline-block">
        <canvas
          ref={canvasRef}
          className="max-w-full max-h-full block"
          style={{ border: '1px solid var(--border)' }}
        />
      </div>
    </Card>
  );
}
