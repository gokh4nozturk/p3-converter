'use client';

import ShadcnIcon from '@/components/icons/shadcnui';
import { isValidColor, toDisplayP3 } from '@/components/utils/colorUtils';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

// LocalStorage keys
const STORAGE_KEYS = {
  input: 'shadcn-converter-input',
  output: 'shadcn-converter-output',
};

export default function ShadcnColorConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  // Load values from localStorage on component mount
  useEffect(() => {
    const savedInput = localStorage.getItem(STORAGE_KEYS.input);
    const savedOutput = localStorage.getItem(STORAGE_KEYS.output);

    if (savedInput) setInput(savedInput);
    if (savedOutput) setOutput(savedOutput);
  }, []);

  // Save input to localStorage when it changes
  useEffect(() => {
    if (input) {
      localStorage.setItem(STORAGE_KEYS.input, input);
    }
  }, [input]);

  // Save output to localStorage when it changes
  useEffect(() => {
    if (output) {
      localStorage.setItem(STORAGE_KEYS.output, output);
    }
  }, [output]);

  // Convert Shadcn UI theme colors to P3 format with fallbacks
  const convertTheme = (themeInput: string) => {
    if (!themeInput.trim()) {
      toast.error('Please enter a Shadcn UI theme');
      return;
    }

    try {
      // Process the input line by line
      const lines = themeInput.split('\n');
      const processedLines = lines.map((line) => {
        // Match CSS variable declarations with OKLCH format
        const oklchMatch = line.match(/^\s*(--[\w-]+):\s*oklch\((.+)\);\s*$/);

        if (oklchMatch) {
          const [, varName, varValue] = oklchMatch;

          // Skip radius
          if (varName === '--radius') {
            return line;
          }

          // Build the OKLCH color string
          const oklchColor = `oklch(${varValue})`;

          if (isValidColor(oklchColor)) {
            const p3Color = toDisplayP3(oklchColor);
            if (p3Color) {
              // Return the line with P3 color and fallback
              return `  ${varName}: ${p3Color}, oklch(${varValue});`;
            }
          }
        }

        // Match CSS variable declarations with HSL format (from tailwind format)
        const hslMatch = line.match(
          /^\s*(--[\w-]+):\s*(\d+(\.\d+)?)\s+(\d+(\.\d+)?)%\s+(\d+(\.\d+)?)%;\s*$/
        );

        if (hslMatch) {
          const [, varName, h, , s, , l] = hslMatch;

          // Skip radius and other non-color values
          if (varName === '--radius') {
            return line;
          }

          // Build the HSL color string
          const hslColor = `hsl(${h} ${s}% ${l}%)`;

          if (isValidColor(hslColor)) {
            const p3Color = toDisplayP3(hslColor);
            if (p3Color) {
              // Return the line with P3 color and fallback
              return `  ${varName}: ${p3Color}, ${h} ${s}% ${l}%;`;
            }
          }
        }

        // Return the original line if not a color or couldn't be converted
        return line;
      });

      setOutput(processedLines.join('\n'));
      toast.success('Theme converted successfully');
    } catch (error) {
      console.error('Error converting theme:', error);
      toast.error('Error converting theme');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(output)
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
      <h1 className="mb-3 flex items-center gap-2 font-bold text-3xl">
        <ShadcnIcon className="h-8 w-8" />
        Shadcn Color Converter
      </h1>
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
        <div className="flex w-full flex-col gap-3">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div>
              <div className="mb-2 flex w-full items-center justify-between">
                <h2 className="mb-2 font-semibold">Input Shadcn UI Theme</h2>
                <button
                  type="button"
                  onClick={() => convertTheme(input)}
                  className="mt-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Convert to P3
                </button>
              </div>
              <textarea
                className="h-[400px] w-full rounded border p-3 font-mono text-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your Shadcn UI theme here (e.g. :root { ... } or @layer base { :root { ... } })"
              />
            </div>
            <div>
              <div className="mb-2 flex w-full items-center justify-between">
                <h2 className="mb-2 font-semibold">Output with P3 Colors</h2>
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="mt-2 rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
                  disabled={!output}
                >
                  Copy to Clipboard
                </button>
              </div>
              <textarea
                className="h-[400px] w-full rounded border p-3 font-mono text-sm"
                value={output}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
