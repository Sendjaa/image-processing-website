'use client';

import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  onImageLoad: (file: File) => void;
  currentImage: { width: number; height: number } | null;
}

export function ImageUpload({ onImageLoad, currentImage }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onImageLoad(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onImageLoad(file);
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
          isDragging
            ? 'border-primary bg-primary/10'
            : 'border-muted-foreground/30 bg-card/50 hover:bg-card/80'
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className={`p-4 rounded-full ${isDragging ? 'bg-primary/20' : 'bg-muted'}`}>
            <Upload
              className={`w-8 h-8 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`}
            />
          </div>

          <div>
            <p className="text-sm font-medium text-foreground">
              {currentImage ? 'Change Image' : 'Upload Image'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Drag and drop or click to select
            </p>
            {currentImage && (
              <p className="text-xs text-muted-foreground mt-2">
                Current: {currentImage.width}x{currentImage.height}px
              </p>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleClick}
            className="mt-2"
          >
            Select Image
          </Button>
        </div>
      </div>
    </div>
  );
}
