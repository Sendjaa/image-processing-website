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
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Download, Loader2, Upload } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface BatchProcessingProps {
  onProcessBatch: (files: File[], operation: string) => Promise<void>;
  disabled?: boolean;
}

export function BatchProcessing({ onProcessBatch, disabled = false }: BatchProcessingProps) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedOperation, setSelectedOperation] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFilesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []).filter((file) =>
      file.type.startsWith('image/')
    );
    setFiles(selectedFiles);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith('image/')
    );
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleProcess = async () => {
    if (!selectedOperation || files.length === 0) return;

    try {
      setIsProcessing(true);
      setProgress(0);

      await onProcessBatch(files, selectedOperation);

      setProgress(100);
      setTimeout(() => {
        setOpen(false);
        setFiles([]);
        setSelectedOperation('');
        setProgress(0);
      }, 1000);
    } catch (error) {
      console.error('Batch processing error:', error);
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={disabled} variant="outline">
          <Upload className="w-4 h-4 mr-2" />
          Batch Process
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Batch Process Images</DialogTitle>
          <DialogDescription>
            Upload multiple images and apply the same operation to all
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* File Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-accent/50 transition-colors cursor-pointer"
          >
            <label className="cursor-pointer block">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFilesSelect}
                className="hidden"
                disabled={isProcessing}
              />
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-8 h-8 text-muted-foreground" />
                <p className="text-sm font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">
                  {files.length > 0 ? `${files.length} images selected` : 'No images selected'}
                </p>
              </div>
            </label>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <Card className="p-3 bg-muted/50 max-h-[200px] overflow-y-auto">
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-background rounded text-sm">
                    <span className="truncate">{file.name}</span>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-destructive hover:text-destructive/80 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Operation Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Operation</label>
            <Select
              value={selectedOperation}
              onValueChange={setSelectedOperation}
              disabled={isProcessing}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an operation..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grayscale">Convert to Grayscale</SelectItem>
                <SelectItem value="gaussian-blur">Apply Gaussian Blur</SelectItem>
                <SelectItem value="sharpen">Apply Sharpen</SelectItem>
                <SelectItem value="resize-50">Resize to 50%</SelectItem>
                <SelectItem value="resize-25">Resize to 25%</SelectItem>
                <SelectItem value="edge-detection">Edge Detection</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Progress */}
          {isProcessing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Processing...</span>
                <span className="text-xs text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isProcessing}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleProcess}
              disabled={isProcessing || files.length === 0 || !selectedOperation}
              className="flex-1"
            >
              {isProcessing && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isProcessing ? 'Processing...' : 'Process'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
