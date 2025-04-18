'use client';

import ExportCssButton from '@/components/ExportCssButton';
import { isValidColor, toDisplayP3 } from '@/components/utils/colorUtils';
import { useEffect, useState } from 'react';

export default function GradientBuilder() {
  const [color1, setColor1] = useState('#ff5733');
  const [color2, setColor2] = useState('#33c1ff');
  const [filename, setFilename] = useState('gradient.css');
  const [gradientName, setGradientName] = useState('p3-gradient');

  const p3Color1 = toDisplayP3(color1);
  const p3Color2 = toDisplayP3(color2);

  const gradientCSS =
    p3Color1 && p3Color2 ? `linear-gradient(to right, ${p3Color1}, ${p3Color2})` : '';

  // Update gradient name when colors change
  const updateGradientName = () => {
    if (isValidColor(color1) && isValidColor(color2)) {
      const c1 = color1.replace('#', '').substring(0, 3);
      const c2 = color2.replace('#', '').substring(0, 3);
      setGradientName(`gradient-${c1}-${c2}`);
    }
  };

  // Update gradient name when colors change
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    updateGradientName();
  }, [color1, color2]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="mt-16">
      <h2 className="mb-4 font-semibold text-2xl">🧬 P3 Gradient Builder</h2>

      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
        <div className="flex max-w-md flex-col gap-3">
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

          {gradientCSS && (
            <div className="mt-2 rounded border bg-white p-3 shadow">
              <div className="flex items-center justify-between">
                <p className="font-mono text-sm">{gradientCSS}</p>
                <button
                  type="button"
                  onClick={() => copyToClipboard(gradientCSS)}
                  className="ml-2 rounded bg-gray-200 px-2 py-1 text-xs hover:bg-gray-300"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex w-full max-w-md flex-col gap-3">
          <div className="mt-2 flex flex-col gap-2">
            <h2 className="font-semibold text-xl">Preview</h2>
            <div className="h-24 rounded border" style={{ backgroundImage: gradientCSS }} />
          </div>

          {gradientCSS && (
            <div className="mt-2">
              <h2 className="mb-1 font-semibold text-xl">Export</h2>
              <div className="mb-2 grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="gradient-name" className="mb-1 block text-sm">
                    CSS Class Name:
                  </label>
                  <input
                    id="gradient-name"
                    type="text"
                    value={gradientName}
                    onChange={(e) => setGradientName(e.target.value)}
                    className="w-full rounded border p-2"
                  />
                </div>
                <div>
                  <label htmlFor="gradient-filename" className="mb-1 block text-sm">
                    File Name:
                  </label>
                  <input
                    id="gradient-filename"
                    type="text"
                    value={filename}
                    onChange={(e) => setFilename(e.target.value)}
                    className="w-full rounded border p-2"
                  />
                </div>
              </div>

              <ExportCssButton
                selectors={[
                  {
                    name: gradientName,
                    property: 'background-image',
                    value: gradientCSS,
                  },
                ]}
                filename={filename}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
