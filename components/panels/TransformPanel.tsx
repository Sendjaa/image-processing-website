'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import { RotateCw, FlipHorizontal, FlipVertical } from 'lucide-react';

interface TransformPanelProps {
  onRotate: (angle: number) => Promise<void>;
  onFlip: (direction: 'horizontal' | 'vertical') => Promise<void>;
  onResize: (width: number, height: number) => Promise<void>;
  imageWidth?: number;
  imageHeight?: number;
  isLoading?: boolean;
}

export function TransformPanel({
  onRotate,
  onFlip,
  onResize,
  imageWidth = 800,
  imageHeight = 600,
  isLoading = false,
}: TransformPanelProps) {
  const [rotation, setRotation] = useState(0);
  const [resizeWidth, setResizeWidth] = useState(imageWidth.toString());
  const [resizeHeight, setResizeHeight] = useState(imageHeight.toString());
  const [maintainAspect, setMaintainAspect] = useState(true);

  const handleRotate = async (angle: number) => {
    setRotation((prev) => (prev + angle) % 360);
    await onRotate(angle);
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value) || imageWidth;
    setResizeWidth(newWidth.toString());

    if (maintainAspect && imageWidth && imageHeight) {
      const newHeight = Math.round((newWidth * imageHeight) / imageWidth);
      setResizeHeight(newHeight.toString());
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseInt(e.target.value) || imageHeight;
    setResizeHeight(newHeight.toString());

    if (maintainAspect && imageWidth && imageHeight) {
      const newWidth = Math.round((newHeight * imageWidth) / imageHeight);
      setResizeWidth(newWidth.toString());
    }
  };

  const handleResize = async () => {
    const width = parseInt(resizeWidth);
    const height = parseInt(resizeHeight);
    if (width > 0 && height > 0) {
      await onResize(width, height);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Transform</CardTitle>
        <CardDescription>Rotate, flip, or resize your image</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Rotation */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Rotation</h4>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRotate(90)}
              disabled={isLoading}
              className="flex-1"
            >
              <RotateCw className="w-4 h-4 mr-2" />
              90°
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRotate(180)}
              disabled={isLoading}
              className="flex-1"
            >
              <RotateCw className="w-4 h-4 mr-2" />
              180°
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRotate(270)}
              disabled={isLoading}
              className="flex-1"
            >
              <RotateCw className="w-4 h-4 mr-2" />
              270°
            </Button>
          </div>
          <div className="text-xs text-muted-foreground">
            Current rotation: {rotation}°
          </div>
        </div>

        {/* Flip */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Flip</h4>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onFlip('horizontal')}
              disabled={isLoading}
              className="flex-1"
            >
              <FlipHorizontal className="w-4 h-4 mr-2" />
              Horizontal
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onFlip('vertical')}
              disabled={isLoading}
              className="flex-1"
            >
              <FlipVertical className="w-4 h-4 mr-2" />
              Vertical
            </Button>
          </div>
        </div>

        {/* Resize */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Resize</h4>
          <FieldGroup>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel className="text-xs">Width (px)</FieldLabel>
                <Input
                  type="number"
                  value={resizeWidth}
                  onChange={handleWidthChange}
                  disabled={isLoading}
                  min="1"
                  max="4000"
                />
              </div>
              <div>
                <FieldLabel className="text-xs">Height (px)</FieldLabel>
                <Input
                  type="number"
                  value={resizeHeight}
                  onChange={handleHeightChange}
                  disabled={isLoading}
                  min="1"
                  max="4000"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="aspect-ratio"
                checked={maintainAspect}
                onChange={(e) => setMaintainAspect(e.target.checked)}
                className="w-4 h-4 rounded border-border cursor-pointer"
              />
              <label htmlFor="aspect-ratio" className="text-xs cursor-pointer">
                Maintain aspect ratio
              </label>
            </div>
          </FieldGroup>

          <Button
            onClick={handleResize}
            disabled={isLoading}
            className="w-full"
            variant="outline"
          >
            Apply Resize
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
