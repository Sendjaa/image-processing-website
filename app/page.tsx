'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useHistory } from '@/hooks/useHistory';
import { useOpenCV } from '@/hooks/useOpenCV';
import { ImageUpload } from '@/components/ImageUpload';
import { EditorCanvas } from '@/components/EditorCanvas';
import { HistoryControls } from '@/components/HistoryControls';
import { FilterPanel } from '@/components/panels/FilterPanel';
import { TransformPanel } from '@/components/panels/TransformPanel';
import { ColorPanel } from '@/components/panels/ColorPanel';
import { EdgeDetectionPanel } from '@/components/panels/EdgeDetectionPanel';
import { BeforeAfterComparison } from '@/components/BeforeAfterComparison';
import { ExportDialog } from '@/components/ExportDialog';
import { BatchProcessing } from '@/components/BatchProcessing';
import {
  canvasToGrayscale,
  applyGaussianBlur,
  applySharpen,
  applyCannyEdgeDetection,
  applySobelEdgeDetection,
  rotateImage,
  flipImage,
  resizeImage,
} from '@/lib/opencv-utils';
import { Loader2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ImageState {
  original: string;
  current: string;
  width: number;
  height: number;
}

export default function ImageEditorPage() {
  const { cv, isLoading: cvLoading, error: cvError } = useOpenCV();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageState, setImageState] = useState<ImageState | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const history = useHistory<string>('');

  // Load image
  const handleImageLoad = useCallback(
    (file: File) => {
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

          history.reset(dataUrl);
        };

        img.src = e.target?.result as string;
      };

      reader.readAsDataURL(file);
    },
    [history]
  );

  // Apply filter
  const handleApplyFilter = useCallback(
    async (filterType: string) => {
      if (!canvasRef.current || !cv || !imageState) return;

      try {
        setIsProcessing(true);

        const canvas = canvasRef.current;

        switch (filterType) {
          case 'grayscale':
            canvasToGrayscale(cv, canvas);
            break;
          case 'gaussian-blur':
            applyGaussianBlur(cv, canvas, 5);
            break;
          case 'bilateral-filter':
            applyGaussianBlur(cv, canvas, 3);
            break;
          case 'sharpen':
            applySharpen(cv, canvas);
            break;
          case 'black-and-white':
            canvasToGrayscale(cv, canvas);
            break;
        }

        const newData = canvas.toDataURL();
        setImageState((prev) => prev ? { ...prev, current: newData } : null);
        history.push(newData);
      } finally {
        setIsProcessing(false);
      }
    },
    [cv, imageState, history]
  );

  // Apply color adjustments
  const handleApplyColors = useCallback(
    async (params: { brightness: number; contrast: number; saturation: number }) => {
      if (!canvasRef.current || !imageState) return;

      try {
        setIsProcessing(true);

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Reset to original
        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          for (let i = 0; i < data.length; i += 4) {
            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];

            // Apply brightness
            if (params.brightness !== 0) {
              r = Math.max(0, Math.min(255, r + params.brightness));
              g = Math.max(0, Math.min(255, g + params.brightness));
              b = Math.max(0, Math.min(255, b + params.brightness));
            }

            // Apply contrast
            if (params.contrast !== 0) {
              const factor = (259 * (params.contrast + 255)) / (255 * (259 - params.contrast));
              r = Math.max(0, Math.min(255, factor * (r - 128) + 128));
              g = Math.max(0, Math.min(255, factor * (g - 128) + 128));
              b = Math.max(0, Math.min(255, factor * (b - 128) + 128));
            }

            // Apply saturation
            if (params.saturation !== 0) {
              const gray = r * 0.299 + g * 0.587 + b * 0.114;
              const alpha = 1 + params.saturation / 100;

              r = Math.max(0, Math.min(255, gray + (r - gray) * alpha));
              g = Math.max(0, Math.min(255, gray + (g - gray) * alpha));
              b = Math.max(0, Math.min(255, gray + (b - gray) * alpha));
            }

            data[i] = r;
            data[i + 1] = g;
            data[i + 2] = b;
          }

          ctx.putImageData(imageData, 0, 0);

          const newData = canvas.toDataURL();
          setImageState((prev) => (prev ? { ...prev, current: newData } : null));
          history.push(newData);
          setIsProcessing(false);
        };

        img.src = imageState.original;
      } catch (error) {
        console.error('Error applying colors:', error);
        setIsProcessing(false);
      }
    },
    [imageState, history]
  );

  // Apply edge detection
  const handleApplyEdgeDetection = useCallback(
    async (type: string, params: any) => {
      if (!canvasRef.current || !cv || !imageState) return;

      try {
        setIsProcessing(true);

        const canvas = canvasRef.current;

        // Reset to original first
        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          if (type === 'canny') {
            applyCannyEdgeDetection(cv, canvas, params.threshold1, params.threshold2);
          } else if (type === 'sobel') {
            applySobelEdgeDetection(cv, canvas, params.ksize);
          }

          const newData = canvas.toDataURL();
          setImageState((prev) => (prev ? { ...prev, current: newData } : null));
          history.push(newData);
          setIsProcessing(false);
        };

        img.src = imageState.original;
      } catch (error) {
        console.error('Error applying edge detection:', error);
        setIsProcessing(false);
      }
    },
    [cv, imageState, history]
  );

  // Apply rotation
  const handleRotate = useCallback(
    async (angle: number) => {
      if (!canvasRef.current || !cv || !imageState) return;

      try {
        setIsProcessing(true);

        const canvas = canvasRef.current;
        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          rotateImage(cv, canvas, angle);

          const newData = canvas.toDataURL();
          setImageState((prev) =>
            prev
              ? {
                  ...prev,
                  current: newData,
                  width: canvas.width,
                  height: canvas.height,
                }
              : null
          );
          history.push(newData);
          setIsProcessing(false);
        };

        img.src = imageState.original;
      } catch (error) {
        console.error('Error rotating:', error);
        setIsProcessing(false);
      }
    },
    [cv, imageState, history]
  );

  // Apply flip
  const handleFlip = useCallback(
    async (direction: 'horizontal' | 'vertical') => {
      if (!canvasRef.current || !cv || !imageState) return;

      try {
        setIsProcessing(true);

        const canvas = canvasRef.current;
        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          flipImage(cv, canvas, direction);

          const newData = canvas.toDataURL();
          setImageState((prev) => (prev ? { ...prev, current: newData } : null));
          history.push(newData);
          setIsProcessing(false);
        };

        img.src = imageState.original;
      } catch (error) {
        console.error('Error flipping:', error);
        setIsProcessing(false);
      }
    },
    [cv, imageState, history]
  );

  // Apply resize
  const handleResize = useCallback(
    async (width: number, height: number) => {
      if (!canvasRef.current || !cv || !imageState) return;

      try {
        setIsProcessing(true);

        const canvas = canvasRef.current;
        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          resizeImage(cv, canvas, width, height);

          const newData = canvas.toDataURL();
          setImageState((prev) =>
            prev
              ? {
                  ...prev,
                  current: newData,
                  width: canvas.width,
                  height: canvas.height,
                }
              : null
          );
          history.push(newData);
          setIsProcessing(false);
        };

        img.src = imageState.original;
      } catch (error) {
        console.error('Error resizing:', error);
        setIsProcessing(false);
      }
    },
    [cv, imageState, history]
  );

  // Handle undo/redo
  const handleUndo = useCallback(() => {
    history.undo();
  }, [history]);

  const handleRedo = useCallback(() => {
    history.redo();
  }, [history]);

  const handleReset = useCallback(() => {
    if (imageState) {
      setImageState((prev) =>
        prev ? { ...prev, current: prev.original } : null
      );
      history.reset(imageState.original);
    }
  }, [imageState, history]);

  // Update display when history changes
  useEffect(() => {
    if (imageState && history.current) {
      setImageState((prev) =>
        prev ? { ...prev, current: history.current } : null
      );
    }
  }, [history.current]);

  if (cvError || (cvLoading && !cv)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background gap-4">
        {cvError ? (
          <>
            <p className="text-destructive font-medium text-lg">Error loading Image Editor</p>
            <p className="text-muted-foreground text-sm max-w-md text-center">{cvError}</p>
            <p className="text-muted-foreground text-xs text-center mt-4">
              Please refresh the page to try again. If the problem persists, check your internet connection.
            </p>
          </>
        ) : (
          <>
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Initializing image processing engine...</p>
            <p className="text-xs text-muted-foreground">This may take a few moments</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-full mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">ImageProcessor</h1>
              <p className="text-sm text-muted-foreground">
                Professional digital image editing tool
              </p>
            </div>
            <div className="flex items-center gap-2">
              {!cv && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-xs">Loading OpenCV...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-full mx-auto px-4 py-6">
        {!imageState ? (
          // Upload Zone
          <div className="max-w-2xl mx-auto">
            <ImageUpload onImageLoad={handleImageLoad} currentImage={null} />
          </div>
        ) : (
          // Editor Layout
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Canvas Area */}
            <div className="lg:col-span-3 space-y-4">
              {/* Canvas */}
              <EditorCanvas imageSrc={imageState.current} onCanvasRef={(c) => { if (c) Object.assign(canvasRef, { current: c }); }} />

              {/* History Controls */}
              <div className="flex items-center gap-4">
                <HistoryControls
                  onUndo={handleUndo}
                  onRedo={handleRedo}
                  onReset={handleReset}
                  canUndo={history.canUndo}
                  canRedo={history.canRedo}
                  historyLength={history.history.length}
                  currentIndex={history.currentIndex}
                />

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowComparison(!showComparison)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {showComparison ? 'Hide' : 'Show'} Before/After
                </Button>
              </div>

              {/* Before/After Comparison */}
              {showComparison && imageState && (
                <BeforeAfterComparison
                  beforeImage={imageState.original}
                  afterImage={imageState.current}
                />
              )}
            </div>

            {/* Panels Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              {/* Upload New / Export */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) handleImageLoad(file);
                    };
                    input.click();
                  }}
                  className="flex-1"
                >
                  New Image
                </Button>
                <ExportDialog canvas={canvasRef.current} disabled={!imageState} />
                <BatchProcessing disabled={!imageState} onProcessBatch={async () => {}} />
              </div>

              {/* Tabs */}
              <Tabs defaultValue="filters" className="w-full">
                <TabsList className="grid w-full grid-cols-4 text-xs">
                  <TabsTrigger value="filters">Filters</TabsTrigger>
                  <TabsTrigger value="transform">Transform</TabsTrigger>
                  <TabsTrigger value="color">Color</TabsTrigger>
                  <TabsTrigger value="edge">Edge</TabsTrigger>
                </TabsList>

                <TabsContent value="filters">
                  <FilterPanel
                    onApplyFilter={handleApplyFilter}
                    isLoading={isProcessing || cvLoading}
                  />
                </TabsContent>

                <TabsContent value="transform">
                  <TransformPanel
                    onRotate={handleRotate}
                    onFlip={handleFlip}
                    onResize={handleResize}
                    imageWidth={imageState.width}
                    imageHeight={imageState.height}
                    isLoading={isProcessing || cvLoading}
                  />
                </TabsContent>

                <TabsContent value="color">
                  <ColorPanel
                    onApplyColors={handleApplyColors}
                    isLoading={isProcessing || cvLoading}
                  />
                </TabsContent>

                <TabsContent value="edge">
                  <EdgeDetectionPanel
                    onApplyEdgeDetection={handleApplyEdgeDetection}
                    isLoading={isProcessing || cvLoading}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
