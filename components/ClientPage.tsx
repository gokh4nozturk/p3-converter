'use client';

import GradientBuilder from '@/components/GradientBuilder';
import P3ColorConverter from '@/components/P3ColorConverter';
import ShadcnColorConverter from '@/components/ShadcnColorConverter';
import TabLayout from '@/components/TabLayout';

export default function ClientPage() {
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

  return <TabLayout tabs={tabs} defaultTab="converter" />;
}
