'use client';

import { type ReactNode, useState } from 'react';

export type Tab = {
  id: string;
  label: string;
  content: ReactNode;
};

type TabLayoutProps = {
  tabs: Tab[];
  defaultTab?: string;
};

export default function TabLayout({ tabs, defaultTab }: TabLayoutProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium ${
              activeTab === tab.id
                ? 'border-blue-600 border-b-2 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">{tabs.find((tab) => tab.id === activeTab)?.content}</div>
    </div>
  );
}
