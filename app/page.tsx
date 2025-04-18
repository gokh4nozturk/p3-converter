'use client';

import { useState } from "react";
import { toDisplayP3 } from "@/components/utils/colorUtils";

export default function Home() {
  const [input, setInput] = useState("#FF5733");
  const [output, setOutput] = useState("");

  const handleConvert = () => {
    const result = toDisplayP3(input);
    if (result) setOutput(result);
    else setOutput("Geçersiz renk formatı");
  };

  return (
    <main className="min-h-screen p-10 bg-neutral-100 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">🎨 P3 Color Converter</h1>

      <div className="flex flex-col gap-4 max-w-md">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="p-2 rounded border border-gray-300"
          placeholder="HEX, RGB veya HSL girin"
        />

        <button
          onClick={handleConvert}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          type="button"
        >
          Convert to display-p3
        </button>

        {output && (
          <div className="mt-4 p-4 bg-white border rounded shadow">
            <p className="font-mono text-sm">{output}</p>
          </div>
        )}
      </div>
      
      <div className="mt-8 flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Preview</h2>
        <div className="flex gap-4">
          <div className="flex-1 p-4 rounded border text-center" style={{ backgroundColor: input }}>
            <p className="text-sm">sRGB</p>
          </div>
          <div className="flex-1 p-4 rounded border text-center" style={{ backgroundColor: output.includes("color(display-p3") ? output : undefined }}>
            <p className="text-sm">display-p3</p>
          </div>
        </div>
      </div>
    </main>
  );
}