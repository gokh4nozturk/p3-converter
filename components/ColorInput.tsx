'use client';

import {
  getColorComponents,
  isValidColor,
  toHex,
  toHsl,
  toRgb,
} from '@/components/utils/colorUtils';
import { useEffect, useState } from 'react';

interface ColorComponents {
  hex: string;
  rgb: { r: number; g: number; b: number } | null;
  hsl: { h: number; s: number; l: number } | null;
  p3: { r: number; g: number; b: number } | null;
}

interface ColorInputProps {
  value: string;
  onChange: (colorValue: string) => void;
}

export default function ColorInput({ value, onChange }: ColorInputProps) {
  const [colorValue, setColorValue] = useState(value);
  const [mode, setMode] = useState<'hex' | 'rgb' | 'hsl'>('hex');
  const [components, setComponents] = useState<ColorComponents | null>(null);

  useEffect(() => {
    setColorValue(value);
    if (isValidColor(value)) {
      setComponents(getColorComponents(value));
    }
  }, [value]);

  useEffect(() => {
    if (isValidColor(colorValue)) {
      onChange(colorValue);
      setComponents(getColorComponents(colorValue));
    }
  }, [colorValue, onChange]);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorValue(e.target.value);
  };

  const handleRgbChange = (channel: 'r' | 'g' | 'b', value: number) => {
    if (!components?.rgb) return;

    const newRgb = { ...components.rgb, [channel]: value };
    const newColor = `rgb(${newRgb.r}, ${newRgb.g}, ${newRgb.b})`;
    setColorValue(newColor);
  };

  const handleHslChange = (channel: 'h' | 's' | 'l', value: number) => {
    if (!components?.hsl) return;

    const newHsl = { ...components.hsl, [channel]: value };
    const newColor = `hsl(${newHsl.h}, ${newHsl.s}%, ${newHsl.l}%)`;
    setColorValue(newColor);
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode('hex')}
          className={`rounded px-3 py-1 ${
            mode === 'hex' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          HEX
        </button>
        <button
          type="button"
          onClick={() => setMode('rgb')}
          className={`rounded px-3 py-1 ${
            mode === 'rgb' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          RGB
        </button>
        <button
          type="button"
          onClick={() => setMode('hsl')}
          className={`rounded px-3 py-1 ${
            mode === 'hsl' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          HSL
        </button>
      </div>

      {mode === 'hex' && (
        <div className="flex items-center">
          <input
            type="text"
            value={colorValue}
            onChange={handleHexChange}
            className="w-full rounded border border-gray-300 p-2"
            placeholder="#RRGGBB"
          />
          <div
            className="ml-2 h-10 w-10 rounded border"
            style={{ backgroundColor: isValidColor(colorValue) ? colorValue : undefined }}
          />
        </div>
      )}

      {mode === 'rgb' && components?.rgb && (
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label htmlFor="r-input" className="block text-sm">
              R
            </label>
            <input
              id="r-input"
              type="number"
              min="0"
              max="255"
              value={components.rgb.r}
              onChange={(e) => handleRgbChange('r', Number.parseInt(e.target.value))}
              className="w-full rounded border border-gray-300 p-2"
            />
          </div>
          <div>
            <label htmlFor="g-input" className="block text-sm">
              G
            </label>
            <input
              id="g-input"
              type="number"
              min="0"
              max="255"
              value={components.rgb.g}
              onChange={(e) => handleRgbChange('g', Number.parseInt(e.target.value))}
              className="w-full rounded border border-gray-300 p-2"
            />
          </div>
          <div>
            <label htmlFor="b-input" className="block text-sm">
              B
            </label>
            <input
              id="b-input"
              type="number"
              min="0"
              max="255"
              value={components.rgb.b}
              onChange={(e) => handleRgbChange('b', Number.parseInt(e.target.value))}
              className="w-full rounded border border-gray-300 p-2"
            />
          </div>
        </div>
      )}

      {mode === 'hsl' && components?.hsl && (
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label htmlFor="h-input" className="block text-sm">
              H
            </label>
            <input
              id="h-input"
              type="number"
              min="0"
              max="360"
              value={components.hsl.h}
              onChange={(e) => handleHslChange('h', Number.parseInt(e.target.value))}
              className="w-full rounded border border-gray-300 p-2"
            />
          </div>
          <div>
            <label htmlFor="s-input" className="block text-sm">
              S
            </label>
            <input
              id="s-input"
              type="number"
              min="0"
              max="100"
              value={components.hsl.s}
              onChange={(e) => handleHslChange('s', Number.parseInt(e.target.value))}
              className="w-full rounded border border-gray-300 p-2"
            />
          </div>
          <div>
            <label htmlFor="l-input" className="block text-sm">
              L
            </label>
            <input
              id="l-input"
              type="number"
              min="0"
              max="100"
              value={components.hsl.l}
              onChange={(e) => handleHslChange('l', Number.parseInt(e.target.value))}
              className="w-full rounded border border-gray-300 p-2"
            />
          </div>
        </div>
      )}
    </div>
  );
}
