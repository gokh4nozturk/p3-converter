'use client';

import ColorInput from '@/components/ColorInput';
import ColorPalette from '@/components/ColorPalette';
import ExportCssButton from '@/components/ExportCssButton';
import GradientBuilder from '@/components/GradientBuilder';
import { isValidColor, toDisplayP3, toHex, toHsl, toRgb } from '@/components/utils/colorUtils';
import { useEffect, useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('#FF5733');
  const [filename, setFilename] = useState('styles.css');
  const [output, setOutput] = useState('');
  const [outputFormat, setOutputFormat] = useState<'p3' | 'hex' | 'rgb' | 'hsl'>('p3');

  // Update output whenever input or outputFormat changes
  useEffect(() => {
    if (!isValidColor(input)) {
      setOutput('Invalid color format');
      return;
    }

    let result: string | null = null;

    switch (outputFormat) {
      case 'p3':
        result = toDisplayP3(input);
        break;
      case 'hex':
        result = toHex(input);
        break;
      case 'rgb':
        result = toRgb(input);
        break;
      case 'hsl':
        result = toHsl(input);
        break;
    }

    if (result) setOutput(result);
    else setOutput('Invalid color format');
  }, [input, outputFormat]);

  return (
    <main className="min-h-screen bg-neutral-100 p-10 text-gray-900">
      <h1 className="mb-6 font-bold text-3xl">🎨 P3 Color Converter</h1>

      <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
        <div className="flex max-w-md flex-col gap-4">
          <ColorInput value={input} onChange={setInput} />

          <ColorPalette onColorSelect={setInput} />

          <div className="flex gap-2">
            <h3 className="font-medium">Output Format:</h3>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setOutputFormat('p3')}
                className={`rounded px-3 py-1 ${
                  outputFormat === 'p3' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
              >
                P3
              </button>
              <button
                type="button"
                onClick={() => setOutputFormat('hex')}
                className={`rounded px-3 py-1 ${
                  outputFormat === 'hex' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
              >
                HEX
              </button>
              <button
                type="button"
                onClick={() => setOutputFormat('rgb')}
                className={`rounded px-3 py-1 ${
                  outputFormat === 'rgb' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
              >
                RGB
              </button>
              <button
                type="button"
                onClick={() => setOutputFormat('hsl')}
                className={`rounded px-3 py-1 ${
                  outputFormat === 'hsl' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
              >
                HSL
              </button>
            </div>
          </div>

          {output && (
            <div className="mt-4 rounded border bg-white p-4 shadow">
              <p className="font-mono text-sm">{output}</p>
            </div>
          )}
        </div>

        <div className="flex max-w-md flex-col gap-4">
          <div className="mt-8 flex flex-col gap-2">
            <h2 className="font-semibold text-xl">Preview</h2>
            <div className="flex gap-4">
              <div
                className="flex-1 rounded border p-4 text-center"
                style={{ backgroundColor: input }}
              >
                <p className="text-sm">sRGB</p>
              </div>
              <div
                className="flex-1 rounded border p-4 text-center"
                style={{
                  backgroundColor: output.includes('color(display-p3') ? output : undefined,
                }}
              >
                <p className="text-sm">{outputFormat === 'p3' ? 'display-p3' : outputFormat}</p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="mb-2 font-semibold text-xl">Export</h2>
            <input
              value={filename}
              className="mb-2 w-full rounded border border-gray-300 p-2"
              onChange={(e) => setFilename(e.target.value)}
              placeholder="filename.css"
            />
            <ExportCssButton selectors={[{ name: 'color', value: output }]} filename={filename} />
          </div>
        </div>
      </div>

      <div className="mt-12 border-t pt-8">
        <GradientBuilder />
      </div>
    </main>
  );
}
