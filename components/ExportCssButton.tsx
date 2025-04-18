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

  const handleExport = ({
    selectors,
    filename = 'styles.css',
  }: ExportCssButtonProps) => {
    const lines = selectors.map(({ name, property = 'color', value }) =>
      `.${name} {\n  ${property}: ${value};\n}`
    );
    const cssContent = lines.join('\n\n');

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
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        type="button"
      >
        Export as CSS
      </button>
      {status && <p className="text-sm mt-2 text-green-700">{status}</p>}
    </div>
  );
}