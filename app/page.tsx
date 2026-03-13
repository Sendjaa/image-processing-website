'use client';

import { useState, useRef, useCallback } from 'react';
import { ImageUpload } from '@/components/ImageUpload';
import { EditorCanvas } from '@/components/EditorCanvas';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, RotateCw, Undo2, Redo2 } from 'lucide-react';

interface ImageState {
  original: string;
  current: string;
  width: number;
  height: number;
}

export default function ImageEditorPage() {
  const [imageState, setImageState] = useState<ImageState | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageLoad = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const dataUrl = e.target?.result as string;
        setImageState({
          original: dataUrl,
          current: dataUrl,
          width: img.width,
          height: img.height,
        });
        setHistory([dataUrl]);
        setHistoryIndex(0);
        setBrightness(0);
        setContrast(0);
        setSaturation(0);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const applyCanvasFilter = useCallback(
    (filterType: string, params?: any) => {
      if (!canvasRef.current || !imageState) return;

      setIsProcessing(true);
      try {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;

          // Draw original image
          ctx.drawImage(img, 0, 0);

          // Apply filters
          switch (filterType) {
            case 'grayscale': {
              const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              const data = imageData.data;
              for (let i = 0; i < data.length; i += 4) {
                const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
                data[i] = data[i + 1] = data[i + 2] = gray;
              }
              ctx.putImageData(imageData, 0, 0);
              break;
            }
            case 'blur': {
              ctx.filter = 'blur(5px)';
              ctx.drawImage(img, 0, 0);
              break;
            }
            case 'sharpen': {
              ctx.filter = 'contrast(1.5)';
              ctx.drawImage(img, 0, 0);
              break;
            }
            case 'sepia': {
              const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              const data = imageData.data;
              for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
                data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
                data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
              }
              ctx.putImageData(imageData, 0, 0);
              break;
            }
            case 'invert': {
              const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              const data = imageData.data;
              for (let i = 0; i < data.length; i += 4) {
                data[i] = 255 - data[i];
                data[i + 1] = 255 - data[i + 1];
                data[i + 2] = 255 - data[i + 2];
              }
              ctx.putImageData(imageData, 0, 0);
              break;
            }
            case 'brightness-contrast': {
              ctx.filter = `brightness(${1 + brightness / 100}) contrast(${1 + contrast / 100})`;
              ctx.drawImage(img, 0, 0);
              break;
            }
            case 'saturation': {
              ctx.filter = `saturate(${1 + saturation / 100})`;
              ctx.drawImage(img, 0, 0);
              break;
            }
            case 'rotate': {
              const rotation = params?.degrees || 90;
              const radians = (rotation * Math.PI) / 180;
              canvas.width = img.height;
              canvas.height = img.width;
              ctx.translate(canvas.width / 2, canvas.height / 2);
              ctx.rotate(radians);
              ctx.drawImage(img, -img.width / 2, -img.height / 2);
              break;
            }
            case 'flip-h': {
              ctx.scale(-1, 1);
              ctx.drawImage(img, -canvas.width, 0);
              break;
            }
            case 'flip-v': {
              ctx.scale(1, -1);
              ctx.drawImage(img, 0, -canvas.height);
              break;
            }
          }

          const newData = canvas.toDataURL();
          setImageState((prev) =>
            prev ? { ...prev, current: newData } : null
          );

          // Add to history
          setHistory((prev) => {
            const newHistory = prev.slice(0, historyIndex + 1);
            newHistory.push(newData);
            return newHistory;
          });
          setHistoryIndex((prev) => prev + 1);
        };

        img.src = imageState.current;
      } finally {
        setIsProcessing(false);
      }
    },
    [imageState, brightness, contrast, saturation, historyIndex]
  );

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setImageState((prev) =>
        prev ? { ...prev, current: history[newIndex] } : null
      );
    }
  }, [historyIndex, history]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setImageState((prev) =>
        prev ? { ...prev, current: history[newIndex] } : null
      );
    }
  }, [historyIndex, history]);

  const handleExport = useCallback(() => {
    if (!canvasRef.current || !imageState) return;

    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'edited-image.png';
    link.click();
  }, [imageState]);

  const handleReset = useCallback(() => {
    if (!imageState || !canvasRef.current) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      setImageState((prev) =>
        prev ? { ...prev, current: imageState.original } : null
      );
      setBrightness(0);
      setContrast(0);
      setSaturation(0);
      setHistory([imageState.original]);
      setHistoryIndex(0);
    };
    img.src = imageState.original;
  }, [imageState]);

  if (!imageState) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-2xl w-full mx-auto px-4">
          <ImageUpload onImageLoad={handleImageLoad} currentImage={null} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-foreground">ImageProcessor</h1>
          <p className="text-sm text-muted-foreground">
            Professional image editing tool
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Canvas Area */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-card rounded-lg border border-border p-4">
              <EditorCanvas 
                imageSrc={imageState?.current || null} 
                onCanvasRef={(canvas) => {
                  if (canvas) canvasRef.current = canvas;
                }}
              />
            </div>

            {/* Controls */}
            <div className="bg-card rounded-lg border border-border p-4 space-y-4">
              <div className="flex gap-2 flex-wrap">
                <Button
                  onClick={handleUndo}
                  variant="outline"
                  size="sm"
                  disabled={historyIndex <= 0 || isProcessing}
                >
                  <Undo2 className="w-4 h-4 mr-2" />
                  Undo
                </Button>
                <Button
                  onClick={handleRedo}
                  variant="outline"
                  size="sm"
                  disabled={historyIndex >= history.length - 1 || isProcessing}
                >
                  <Redo2 className="w-4 h-4 mr-2" />
                  Redo
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="sm"
                  disabled={isProcessing}
                >
                  <RotateCw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button
                  onClick={handleExport}
                  className="ml-auto"
                  disabled={isProcessing}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>

          {/* Tools Sidebar */}
          <div className="space-y-4">
            <Tabs defaultValue="filters" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="filters">Filters</TabsTrigger>
                <TabsTrigger value="adjust">Adjust</TabsTrigger>
              </TabsList>

              <TabsContent value="filters" className="space-y-3">
                <div className="space-y-2">
                  <Button
                    onClick={() => applyCanvasFilter('grayscale')}
                    variant="outline"
                    className="w-full"
                    disabled={isProcessing}
                  >
                    Grayscale
                  </Button>
                  <Button
                    onClick={() => applyCanvasFilter('blur')}
                    variant="outline"
                    className="w-full"
                    disabled={isProcessing}
                  >
                    Blur
                  </Button>
                  <Button
                    onClick={() => applyCanvasFilter('sharpen')}
                    variant="outline"
                    className="w-full"
                    disabled={isProcessing}
                  >
                    Sharpen
                  </Button>
                  <Button
                    onClick={() => applyCanvasFilter('sepia')}
                    variant="outline"
                    className="w-full"
                    disabled={isProcessing}
                  >
                    Sepia
                  </Button>
                  <Button
                    onClick={() => applyCanvasFilter('invert')}
                    variant="outline"
                    className="w-full"
                    disabled={isProcessing}
                  >
                    Invert
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="adjust" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Brightness</label>
                  <Slider
                    value={[brightness]}
                    onValueChange={(val) => {
                      setBrightness(val[0]);
                      applyCanvasFilter('brightness-contrast');
                    }}
                    min={-100}
                    max={100}
                    step={1}
                  />
                  <span className="text-xs text-muted-foreground">{brightness}</span>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Contrast</label>
                  <Slider
                    value={[contrast]}
                    onValueChange={(val) => {
                      setContrast(val[0]);
                      applyCanvasFilter('brightness-contrast');
                    }}
                    min={-100}
                    max={100}
                    step={1}
                  />
                  <span className="text-xs text-muted-foreground">{contrast}</span>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Saturation</label>
                  <Slider
                    value={[saturation]}
                    onValueChange={(val) => {
                      setSaturation(val[0]);
                      applyCanvasFilter('saturation');
                    }}
                    min={-100}
                    max={100}
                    step={1}
                  />
                  <span className="text-xs text-muted-foreground">{saturation}</span>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Transform</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={() =>
                        applyCanvasFilter('rotate', { degrees: 90 })
                      }
                      variant="outline"
                      size="sm"
                      disabled={isProcessing}
                    >
                      Rotate 90°
                    </Button>
                    <Button
                      onClick={() => applyCanvasFilter('flip-h')}
                      variant="outline"
                      size="sm"
                      disabled={isProcessing}
                    >
                      Flip H
                    </Button>
                    <Button
                      onClick={() => applyCanvasFilter('flip-v')}
                      variant="outline"
                      size="sm"
                      disabled={isProcessing}
                    >
                      Flip V
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
