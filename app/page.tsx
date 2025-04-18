'use client';

import GradientBuilder from '@/components/GradientBuilder';
import P3ColorConverter from '@/components/P3ColorConverter';
import ShadcnColorConverter from '@/components/ShadcnColorConverter';

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
      content: <GradientBuilder />,
    },
    {
      id: 'shadcn',
      label: 'Shadcn Color Converter',
      content: <ShadcnColorConverter />,
    },
  ];

  return (
    <main className="min-h-screen bg-neutral-100 p-10 text-gray-900">
      <TabLayout tabs={tabs} defaultTab="converter" />
    </main>
  );
}
