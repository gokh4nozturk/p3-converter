'use client';

import ExportCssButton from '@/components/ExportCssButton';
import GradientBuilder from '@/components/GradientBuilder';
import { FlaskIcon } from '@/components/icons/flask';
import { toDisplayP3 } from '@/components/utils/colorUtils';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('#FF5733');
  const [filename, setFilename] = useState('styles.css');
  const [output, setOutput] = useState('');

  const handleConvert = () => {
    const result = toDisplayP3(input);
    if (result) setOutput(result);
    else setOutput('Geçersiz renk formatı');
  };

  return (
    <main className="min-h-screen bg-neutral-100 p-10 text-gray-900">
      <h1 className="mb-6 font-bold text-3xl">🎨 P3 Color Converter</h1>

      <div className="flex justify-between">
        <div className="flex max-w-md flex-col gap-4">
          <div className="relative">
            <input
              value={input}
              className="w-full rounded border border-gray-300 p-2 pe-9"
              placeholder="HEX, RGB veya HSL girin"
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="absolute top-0 right-0 bottom-0 rounded-r hover:bg-black hover:text-white"
              type="button"
              onClick={handleConvert}
            >
              <FlaskIcon className="size-full p-2" />
            </button>
          </div>

          {output && (
            <div className="mt-4 rounded border bg-white p-4 shadow">
              <p className="font-mono text-sm">{output}</p>
            </div>
          )}
        </div>
        <div className="flex max-w-md flex-col gap-4">
          <input
            value={filename}
            className="h-min rounded border border-gray-300 p-2"
            onChange={(e) => setFilename(e.target.value)}
          />
          <ExportCssButton selectors={[{ name: 'gradient', value: output }]} filename={filename} />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-2">
        <h2 className="font-semibold text-xl">Preview</h2>
        <div className="flex gap-4">
          <div className="flex-1 rounded border p-4 text-center" style={{ backgroundColor: input }}>
            <p className="text-sm">sRGB</p>
          </div>
          <div
            className="flex-1 rounded border p-4 text-center"
            style={{ backgroundColor: output.includes('color(display-p3') ? output : undefined }}
          >
            <p className="text-sm">display-p3</p>
          </div>
        </div>
      </div>

      <GradientBuilder />
    </main>
  );
}
