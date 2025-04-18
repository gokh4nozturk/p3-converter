'use client';

import P3ColorConverter from '@/components/P3ColorConverter';
import P3GradientBuilderTab from '@/components/P3GradientBuilderTab';
import TabLayout from '@/components/TabLayout';

export default function Home() {
  const tabs = [
    {
      id: 'converter',
      label: 'P3 Color Converter',
      content: <P3ColorConverter />,
    },
    {
      id: 'gradient',
      label: 'P3 Gradient Builder',
      content: <P3GradientBuilderTab />,
    },
  ];

  return (
    <main className="min-h-screen bg-neutral-100 p-10 text-gray-900">
      <TabLayout tabs={tabs} defaultTab="converter" />
    </main>
  );
}
