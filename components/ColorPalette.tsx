'use client';

import { useState } from 'react';

const DEFAULT_COLORS = [
  'red', // Red
  'green', // Green
  'blue', // Blue
  'yellow', // Yellow
  'black', // Black
  'white', // White
];

interface ColorPaletteProps {
  onColorSelect: (color: string) => void;
  colors?: string[];
}

export default function ColorPalette({
  onColorSelect,
  colors = DEFAULT_COLORS,
}: ColorPaletteProps) {
  const [customColor, setCustomColor] = useState('#000000');

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCustomColor(newColor);
    onColorSelect(newColor);
  };

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

      <div className="mt-4 flex items-center gap-2">
        <label htmlFor="custom-color" className="text-sm">
          Custom Color:
        </label>
        <input
          type="color"
          id="custom-color"
          value={customColor}
          onChange={handleCustomColorChange}
          className="h-8 w-8 cursor-pointer border-0"
          aria-label="Select custom color"
        />
        <span className="text-sm">{customColor}</span>
      </div>
    </div>
  );
}
