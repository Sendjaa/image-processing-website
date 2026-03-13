'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Download, Loader2 } from 'lucide-react';
import { FieldGroup } from '@/components/ui/field';

interface ExportDialogProps {
  canvas: HTMLCanvasElement | null;
  disabled?: boolean;
}

type ExportFormat = 'png' | 'jpeg' | 'webp';

export function ExportDialog({ canvas, disabled = false }: ExportDialogProps) {
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState('image');
  const [format, setFormat] = useState<ExportFormat>('png');
  const [quality, setQuality] = useState(0.95);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!canvas) return;

    try {
      setIsExporting(true);

      let dataUrl: string;
      if (format === 'jpeg') {
        dataUrl = canvas.toDataURL('image/jpeg', quality);
      } else if (format === 'webp') {
        dataUrl = canvas.toDataURL('image/webp', quality);
      } else {
        dataUrl = canvas.toDataURL('image/png');
      }

      // Create download link
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${fileName}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setOpen(false);
      setIsExporting(false);
    } catch (error) {
      console.error('Export error:', error);
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={disabled} variant="default">
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Download Image</DialogTitle>
          <DialogDescription>
            Choose format and quality settings for your edited image
          </DialogDescription>
        </DialogHeader>

        <FieldGroup className="space-y-4">
          {/* File Name */}
          <div className="space-y-2">
            <Label htmlFor="filename" className="text-sm">
              File Name
            </Label>
            <Input
              id="filename"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="image"
              disabled={isExporting}
            />
          </div>

          {/* Format Selection */}
          <div className="space-y-2">
            <Label htmlFor="format" className="text-sm">
              Format
            </Label>
            <Select value={format} onValueChange={(value) => setFormat(value as ExportFormat)}>
              <SelectTrigger id="format" disabled={isExporting}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="png">PNG (Lossless)</SelectItem>
                <SelectItem value="jpeg">JPEG (Lossy)</SelectItem>
                <SelectItem value="webp">WebP (Modern)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quality Slider */}
          {(format === 'jpeg' || format === 'webp') && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Quality</Label>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  {Math.round(quality * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                disabled={isExporting}
                className="w-full h-2 bg-muted rounded cursor-pointer"
              />
              <p className="text-xs text-muted-foreground">
                Higher quality = larger file size
              </p>
            </div>
          )}

          {/* Info */}
          {canvas && (
            <div className="p-3 bg-muted rounded-md text-xs text-muted-foreground">
              <p>
                Image Size: {canvas.width} × {canvas.height} px
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isExporting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              disabled={isExporting || !canvas}
              className="flex-1"
            >
              {isExporting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isExporting ? 'Exporting...' : 'Download'}
            </Button>
          </div>
        </FieldGroup>
      </DialogContent>
    </Dialog>
  );
}
