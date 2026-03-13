'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface EdgeDetectionPanelProps {
  onApplyEdgeDetection: (type: string, params: any) => Promise<void>;
  isLoading?: boolean;
}

interface EdgeDetectionOption {
  id: string;
  label: string;
  description: string;
}

const edgeDetections: EdgeDetectionOption[] = [
  {
    id: 'canny',
    label: 'Canny Edge Detection',
    description: 'Advanced edge detection algorithm',
  },
  {
    id: 'sobel',
    label: 'Sobel Edge Detection',
    description: 'Gradient-based edge detection',
  },
];

export function EdgeDetectionPanel({
  onApplyEdgeDetection,
  isLoading = false,
}: EdgeDetectionPanelProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [cannyThreshold1, setCannyThreshold1] = useState(50);
  const [cannyThreshold2, setCannyThreshold2] = useState(150);
  const [sobelKsize, setSobelKsize] = useState(3);

  const handleApply = async () => {
    if (!selectedMethod) return;

    let params = {};
    if (selectedMethod === 'canny') {
      params = {
        threshold1: cannyThreshold1,
        threshold2: cannyThreshold2,
      };
    } else if (selectedMethod === 'sobel') {
      params = {
        ksize: sobelKsize,
      };
    }

    await onApplyEdgeDetection(selectedMethod, params);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Edge Detection</CardTitle>
        <CardDescription>Detect edges and contours in your image</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Method Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Detection Method</Label>
          <div className="grid grid-cols-1 gap-2">
            {edgeDetections.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`text-left p-3 rounded-md border transition-all ${
                  selectedMethod === method.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:bg-accent/50'
                }`}
              >
                <p className="text-sm font-medium">{method.label}</p>
                <p className="text-xs text-muted-foreground">{method.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Canny Parameters */}
        {selectedMethod === 'canny' && (
          <div className="space-y-4 pt-4 border-t">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Threshold 1 (Lower)</Label>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  {cannyThreshold1}
                </span>
              </div>
              <Slider
                value={[cannyThreshold1]}
                onValueChange={(value) => setCannyThreshold1(value[0])}
                min={0}
                max={300}
                step={1}
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">Range: 0 to 300</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Threshold 2 (Upper)</Label>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  {cannyThreshold2}
                </span>
              </div>
              <Slider
                value={[cannyThreshold2]}
                onValueChange={(value) => setCannyThreshold2(value[0])}
                min={0}
                max={500}
                step={1}
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">Range: 0 to 500</p>
            </div>
          </div>
        )}

        {/* Sobel Parameters */}
        {selectedMethod === 'sobel' && (
          <div className="space-y-4 pt-4 border-t">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Kernel Size</Label>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  {sobelKsize}x{sobelKsize}
                </span>
              </div>
              <Slider
                value={[sobelKsize]}
                onValueChange={(value) => {
                  const oddValue = value[0] % 2 === 0 ? value[0] + 1 : value[0];
                  setSobelKsize(Math.min(Math.max(oddValue, 1), 31));
                }}
                min={1}
                max={31}
                step={2}
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">Kernel size (odd number)</p>
            </div>
          </div>
        )}

        {/* Apply Button */}
        <Button
          onClick={handleApply}
          disabled={!selectedMethod || isLoading}
          className="w-full"
        >
          Apply Edge Detection
        </Button>
      </CardContent>
    </Card>
  );
}
