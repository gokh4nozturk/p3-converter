import ClientPage from '@/components/ClientPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'P3 Color Converter | Convert Colors to Display P3 Format',
  description:
    'Convert your colors to Display P3 format for wider color gamut. Build P3 gradients and convert Shadcn colors.',
  keywords: ['P3 color', 'display P3', 'color converter', 'P3 gradient', 'Shadcn colors'],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-100 p-10 text-gray-900">
      <ClientPage />
    </main>
  );
}
