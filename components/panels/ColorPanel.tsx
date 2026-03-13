'use client';

import { useState, useCallback, useRef } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface ColorPanelProps {
  onApplyColors: (params: {
    brightness: number;
    contrast: number;
    saturation: number;
  }) => Promise<void>;
  isLoading?: boolean;
}

export function ColorPanel({ onApplyColors, isLoading = false }: ColorPanelProps) {
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [isLive, setIsLive] = useState(true);

  const debounceRef = useRef<NodeJS.Timeout>();

  const applyChanges = useCallback(
    async (b: number, c: number, s: number) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(async () => {
        await onApplyColors({
          brightness: b,
          contrast: c,
          saturation: s,
        });
      }, 300);
    },
    [onApplyColors]
  );

  const handleBrightnessChange = (value: number[]) => {
    setBrightness(value[0]);
    if (isLive) {
      applyChanges(value[0], contrast, saturation);
    }
  };

  const handleContrastChange = (value: number[]) => {
    setContrast(value[0]);
    if (isLive) {
      applyChanges(brightness, value[0], saturation);
    }
  };

  const handleSaturationChange = (value: number[]) => {
    setSaturation(value[0]);
    if (isLive) {
      applyChanges(brightness, contrast, value[0]);
    }
  };

  const handleReset = () => {
    setBrightness(0);
    setContrast(0);
    setSaturation(0);
    applyChanges(0, 0, 0);
  };

  const handleApplyAll = async () => {
    await onApplyColors({
      brightness,
      contrast,
      saturation,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Color Adjustment</CardTitle>
        <CardDescription>Adjust brightness, contrast, and saturation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Live Preview Toggle */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="live-preview"
            checked={isLive}
            onChange={(e) => setIsLive(e.target.checked)}
            className="w-4 h-4 rounded border-border cursor-pointer"
          />
          <label htmlFor="live-preview" className="text-xs cursor-pointer">
            Live preview
          </label>
        </div>

        {/* Brightness */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Brightness</Label>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
              {brightness > 0 ? '+' : ''}{brightness}
            </span>
          </div>
          <Slider
            value={[brightness]}
            onValueChange={handleBrightnessChange}
            min={-100}
            max={100}
            step={1}
            disabled={isLoading}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">Range: -100 to +100</p>
        </div>

        {/* Contrast */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Contrast</Label>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
              {contrast > 0 ? '+' : ''}{contrast}
            </span>
          </div>
          <Slider
            value={[contrast]}
            onValueChange={handleContrastChange}
            min={-100}
            max={100}
            step={1}
            disabled={isLoading}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">Range: -100 to +100</p>
        </div>

        {/* Saturation */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Saturation</Label>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
              {saturation > 0 ? '+' : ''}{saturation}
            </span>
          </div>
          <Slider
            value={[saturation]}
            onValueChange={handleSaturationChange}
            min={-100}
            max={100}
            step={1}
            disabled={isLoading}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">Range: -100 to +100</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            disabled={isLoading || (brightness === 0 && contrast === 0 && saturation === 0)}
            className="flex-1"
          >
            Reset
          </Button>
          {!isLive && (
            <Button
              size="sm"
              onClick={handleApplyAll}
              disabled={isLoading || (brightness === 0 && contrast === 0 && saturation === 0)}
              className="flex-1"
            >
              Apply
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
