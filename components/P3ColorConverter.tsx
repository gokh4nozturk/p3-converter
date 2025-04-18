'use client';

import ColorInput from '@/components/ColorInput';
import ColorPalette from '@/components/ColorPalette';
import ExportCssButton from '@/components/ExportCssButton';
import { isValidColor, toDisplayP3, toHex, toHsl, toRgb } from '@/components/utils/colorUtils';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function P3ColorConverter() {
  const [input, setInput] = useState('#FF5733');
  const [filename, setFilename] = useState('styles.css');
  const [output, setOutput] = useState('');
  const [selectorName, setSelectorName] = useState('color');
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

  // Generate CSS class name from input color
  useEffect(() => {
    if (isValidColor(input)) {
      // Convert input to a simple name without # and lowercase
      const colorName = input.replace('#', '').toLowerCase();
      setSelectorName(`color-${colorName}`);
    }
  }, [input]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success('Copied to clipboard!');
      })
      .catch((err) => {
        toast.error('Failed to copy to clipboard');
        console.error('Copy failed: ', err);
      });
  };

  return (
    <div>
      <h1 className="mb-3 font-bold text-3xl">🎨 P3 Color Converter</h1>
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
        <div className="flex max-w-md flex-col gap-3">
          <ColorInput value={input} onChange={setInput} />

          <ColorPalette onColorSelect={setInput} />

          <div className="flex gap-2">
            <h3 className="font-medium">Output Format:</h3>
            <div className="flex gap-1">
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
            <div className="mt-2 rounded border bg-white p-3 shadow">
              <div className="flex items-center justify-between">
                <p className="font-mono text-sm">{output}</p>
                <button
                  type="button"
                  onClick={() => copyToClipboard(output)}
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
            <div className="flex gap-2">
              <div
                className="flex-1 rounded border py-10 text-center"
                style={{ backgroundColor: input }}
              >
                <p className="font-medium text-sm">sRGB</p>
              </div>
              <div
                className="flex-1 rounded border py-10 text-center"
                style={{
                  backgroundColor: output.includes('color(display-p3') ? output : undefined,
                }}
              >
                <p className="font-medium text-sm">
                  {outputFormat === 'p3' ? 'display-p3' : outputFormat}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-2">
            <h2 className="mb-1 font-semibold text-xl">Export</h2>
            <div className="mb-2 flex flex-col gap-1">
              <label htmlFor="selector-name" className="text-sm">
                CSS Class Name:
              </label>
              <input
                id="selector-name"
                value={selectorName}
                className="w-full rounded border border-gray-300 p-2"
                onChange={(e) => setSelectorName(e.target.value)}
                placeholder="Enter CSS class name"
              />
              <label htmlFor="filename-input" className="text-sm">
                File Name:
              </label>
              <input
                id="filename-input"
                value={filename}
                className="w-full rounded border border-gray-300 p-2"
                onChange={(e) => setFilename(e.target.value)}
                placeholder="filename.css"
              />
            </div>
            <ExportCssButton
              selectors={[{ name: selectorName, value: output }]}
              filename={filename}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
