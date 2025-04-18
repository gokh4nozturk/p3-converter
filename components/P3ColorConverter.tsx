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

        <div className="flex flex-col gap-3">
          <div className="mt-2 flex flex-col gap-2">
            <h2 className="text-center font-semibold text-xl">Preview</h2>

            <div className="flex flex-wrap justify-center gap-2">
              {/* Split View Comparison with Slider */}
              <div className="relative mb-4 w-md max-w-md">
                <h3 className="mb-1 font-medium text-sm">Interactive Comparison</h3>
                <div
                  className="group relative h-32 w-full cursor-ew-resize overflow-hidden rounded border"
                  onMouseDown={(e) => {
                    const container = e.currentTarget;
                    const updateSlider = (clientX: number) => {
                      const { left, width } = container.getBoundingClientRect();
                      const position = Math.min(Math.max(0, clientX - left), width);
                      const percentage = (position / width) * 100;

                      // Update the before image clip path
                      const overlay = container.querySelector('.comparison-overlay') as HTMLElement;
                      if (overlay) {
                        overlay.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
                      }

                      // Update slider position
                      const slider = container.querySelector('.comparison-slider') as HTMLElement;
                      if (slider) {
                        slider.style.left = `${percentage}%`;
                      }
                    };

                    const handleMouseMove = (e: MouseEvent) => {
                      updateSlider(e.clientX);
                    };

                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove);
                      document.removeEventListener('mouseup', handleMouseUp);
                    };

                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);

                    // Initial update
                    updateSlider(e.clientX);
                  }}
                >
                  {/* Display P3 Color (Bottom layer) */}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      backgroundColor: output.includes('color(display-p3') ? output : undefined,
                    }}
                  >
                    <span className="rounded bg-white/70 px-2 py-1 text-xs">display-p3</span>
                  </div>

                  {/* SRGB Color (Top layer with clip-path) */}
                  <div
                    className="comparison-overlay absolute inset-0 flex items-center justify-center"
                    style={{
                      backgroundColor: input,
                      clipPath: 'inset(0 50% 0 0)', // Initial 50% split
                    }}
                  >
                    <span className="rounded bg-white/70 px-2 py-1 text-xs">sRGB</span>
                  </div>

                  {/* Slider Handle */}
                  <div className="comparison-slider absolute top-0 bottom-0 left-1/2 w-0.5 bg-white shadow-lg transition-all group-hover:w-1">
                    <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-lg">
                      <div className="h-4 w-4 rounded-full bg-blue-500 transition-all group-hover:scale-110" />
                    </div>
                  </div>
                </div>
                <div className="mt-1 text-center text-gray-500 text-xs">
                  Drag the slider to compare sRGB and display-p3 colors
                </div>
              </div>

              {/* Split View Comparison (static) */}
              <div className="mb-4 w-md max-w-md">
                <h3 className="mb-1 font-medium text-sm">Split Comparison</h3>
                <div className="flex h-24 w-full overflow-hidden rounded border">
                  <div
                    className="flex h-full w-1/2 items-center justify-center"
                    style={{ backgroundColor: input }}
                  >
                    <span className="rounded bg-white/70 px-2 py-1 text-xs">sRGB</span>
                  </div>
                  <div
                    className="flex h-full w-1/2 items-center justify-center"
                    style={{
                      backgroundColor: output.includes('color(display-p3') ? output : undefined,
                    }}
                  >
                    <span className="rounded bg-white/70 px-2 py-1 text-xs">display-p3</span>
                  </div>
                </div>
              </div>

              {/* Gamut Difference */}
              <div className="mb-4 w-md max-w-md">
                <h3 className="mb-1 font-medium text-sm">Gamut Comparison</h3>
                <div className="rounded border bg-white p-3">
                  <div className="mb-2 flex justify-between">
                    <span className="text-xs">sRGB</span>
                    <span className="text-xs">display-p3</span>
                  </div>
                  {output.includes('color(display-p3') && (
                    <div className="mb-2 rounded bg-gray-100 py-1 text-center text-xs">
                      display-p3 can represent approximately 50% more colors than sRGB
                    </div>
                  )}
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <div
                        className="mb-1 h-16 rounded border"
                        style={{ backgroundColor: input }}
                      />
                      <code className="block truncate text-xs">{toRgb(input)}</code>
                    </div>
                    <div className="flex-1">
                      <div
                        className="mb-1 h-16 rounded border"
                        style={{
                          backgroundColor: output.includes('color(display-p3') ? output : undefined,
                        }}
                      />
                      <code className="block truncate text-xs">{output}</code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Context */}
              <div className="mb-4 w-md max-w-md">
                <h3 className="mb-1 font-medium text-sm">Background Context</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded border bg-white p-2">
                    <div className="mb-1 text-center text-xs">Light Background</div>
                    <div
                      className="h-12 rounded"
                      style={{
                        backgroundColor: output.includes('color(display-p3') ? output : input,
                      }}
                    />
                  </div>
                  <div className="rounded border bg-gray-800 p-2">
                    <div className="mb-1 text-center text-white text-xs">Dark Background</div>
                    <div
                      className="h-12 rounded"
                      style={{
                        backgroundColor: output.includes('color(display-p3') ? output : input,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Device Support */}
              <div className="mb-4 w-md max-w-md">
                <h3 className="mb-1 font-medium text-sm">Device Support Preview</h3>
                <div className="rounded border bg-white p-3">
                  <div className="mb-2 flex gap-2">
                    <div className="flex-1 rounded border bg-gray-50 p-2">
                      <div className="mb-1 text-center text-xs">Supporting Device</div>
                      <div
                        className="h-12 rounded shadow-sm"
                        style={{
                          backgroundColor: output.includes('color(display-p3') ? output : input,
                        }}
                      />
                    </div>
                    <div className="flex-1 rounded border bg-gray-50 p-2">
                      <div className="mb-1 text-center text-xs">Non-supporting Device</div>
                      <div
                        className="h-12 rounded opacity-90 shadow-sm"
                        style={{ backgroundColor: input }}
                      />
                    </div>
                  </div>
                  <div className="rounded bg-gray-100 p-1 text-center text-xs">
                    Non-supporting devices will fall back to closest sRGB approximation
                  </div>
                </div>
              </div>

              {/* Original side-by-side view */}
              <div className="flex w-md max-w-md gap-2">
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
          </div>
        </div>
      </div>
    </div>
  );
}
