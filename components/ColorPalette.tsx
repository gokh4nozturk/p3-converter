'use client';

import { useState } from 'react';

const DEFAULT_COLORS = [
  '#FF5733', // Red-Orange
  '#33FF57', // Green
  '#3357FF', // Blue
  '#F3FF33', // Yellow
  '#FF33F3', // Magenta
  '#33FFF3', // Cyan
  '#FF3333', // Red
  '#33FF33', // Lime
  '#3333FF', // Blue
  '#FFFF33', // Yellow
  '#FF33FF', // Fuchsia
  '#33FFFF', // Aqua
];

interface ColorPaletteProps {
  onColorSelect: (color: string) => void;
  colors?: string[];
}

export default function ColorPalette({
  onColorSelect,
  colors = DEFAULT_COLORS,
}: ColorPaletteProps) {
  return (
    <div className="my-4">
      <h3 className="mb-2 font-medium">Color Palette</h3>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color}
            className="h-8 w-8 rounded border border-gray-300 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ backgroundColor: color }}
            onClick={() => onColorSelect(color)}
            title={color}
            type="button"
            aria-label={`Select color ${color}`}
          />
        ))}
      </div>
    </div>
  );
}
