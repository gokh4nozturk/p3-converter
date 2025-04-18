'use client';

import { useState } from 'react';

interface ExportCssButtonProps {
  selectors: { name: string; property?: string; value: string }[];
  filename?: string;
}

export default function ExportCssButton({
  selectors,
  filename = 'styles.css',
}: ExportCssButtonProps) {
  const [status, setStatus] = useState('');

  const handleExport = ({ selectors, filename = 'styles.css' }: ExportCssButtonProps) => {
    // Generate CSS content with selectors and properties
    const lines = selectors.map(({ name, property = 'color', value }) => {
      // Add a comment with original color/value for reference
      return `/* ${property}: ${value} */\n.${name} {\n  ${property}: ${value};\n}`;
    });

    // Add a header comment to the CSS file
    const header = `/* 
 * P3 Color Converter - Generated CSS
 * Created: ${new Date().toLocaleString()}
 */\n\n`;

    const cssContent = header + lines.join('\n\n');

    // Create a downloadable blob and trigger download
    const blob = new Blob([cssContent], { type: 'text/css' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);

    setStatus('Downloaded!');
    setTimeout(() => setStatus(''), 2000);
  };

  return (
    <div className="">
      <button
        onClick={() => handleExport({ selectors, filename })}
        className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        type="button"
      >
        Export as CSS
      </button>
      {status && <p className="mt-2 text-green-700 text-sm">{status}</p>}
    </div>
  );
}
