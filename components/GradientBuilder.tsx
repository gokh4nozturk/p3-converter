'use client';

import { toDisplayP3 } from '@/components/utils/colorUtils';
import { useState } from 'react';

export default function GradientBuilder() {
  const [color1, setColor1] = useState('#ff5733');
  const [color2, setColor2] = useState('#33c1ff');

  const p3Color1 = toDisplayP3(color1);
  const p3Color2 = toDisplayP3(color2);

  const gradientCSS =
    p3Color1 && p3Color2 ? `linear-gradient(to right, ${p3Color1}, ${p3Color2})` : '';

  return (
    <div className="mt-16 max-w-xl">
      <h2 className="mb-4 font-semibold text-2xl">🧬 P3 Gradient Builder</h2>

      <div className="mb-4 flex gap-4">
        <input
          type="text"
          value={color1}
          onChange={(e) => setColor1(e.target.value)}
          className="flex-1 rounded border p-2"
          placeholder="Color 1 (HEX, RGB, HSL)"
        />
        <input
          type="text"
          value={color2}
          onChange={(e) => setColor2(e.target.value)}
          className="flex-1 rounded border p-2"
          placeholder="Color 2 (HEX, RGB, HSL)"
        />
      </div>

      <div className="h-24 rounded border" style={{ backgroundImage: gradientCSS }} />

      {gradientCSS && (
        <div className="mt-4 rounded border bg-white p-4 shadow">
          <p className="whitespace-pre-wrap font-mono text-sm">{gradientCSS}</p>
        </div>
      )}
    </div>
  );
}
