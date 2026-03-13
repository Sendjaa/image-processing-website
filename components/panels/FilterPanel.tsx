'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface FilterPanelProps {
  onApplyFilter: (filterType: string) => Promise<void>;
  isLoading?: boolean;
}

interface FilterOption {
  id: string;
  label: string;
  description: string;
}

const filters: FilterOption[] = [
  {
    id: 'grayscale',
    label: 'Grayscale',
    description: 'Convert to black and white',
  },
  {
    id: 'gaussian-blur',
    label: 'Gaussian Blur',
    description: 'Apply soft blur effect',
  },
  {
    id: 'bilateral-filter',
    label: 'Bilateral Filter',
    description: 'Blur while preserving edges',
  },
  {
    id: 'sharpen',
    label: 'Sharpen',
    description: 'Enhance edges and details',
  },
  {
    id: 'black-and-white',
    label: 'Black & White',
    description: 'High contrast binary conversion',
  },
];

export function FilterPanel({ onApplyFilter, isLoading = false }: FilterPanelProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('');

  const handleApplyFilter = async () => {
    if (selectedFilter) {
      await onApplyFilter(selectedFilter);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Filters</CardTitle>
        <CardDescription>Apply visual effects to your image</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={selectedFilter} onValueChange={setSelectedFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Select a filter..." />
          </SelectTrigger>
          <SelectContent>
            {filters.map((filter) => (
              <SelectItem key={filter.id} value={filter.id}>
                <div className="flex flex-col">
                  <span>{filter.label}</span>
                  <span className="text-xs text-muted-foreground">{filter.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={handleApplyFilter}
          disabled={!selectedFilter || isLoading}
          className="w-full"
        >
          {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Apply Filter
        </Button>

        <div className="grid grid-cols-2 gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => {
                setSelectedFilter(filter.id);
              }}
              className="text-left p-2 rounded-md border border-border hover:bg-accent/50 transition-colors text-sm"
            >
              <p className="font-medium text-xs">{filter.label}</p>
              <p className="text-xs text-muted-foreground">{filter.description}</p>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
