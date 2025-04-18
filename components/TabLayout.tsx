'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';

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
  const [prevTab, setPrevTab] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevContentRef = useRef<HTMLDivElement>(null);
  const newContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prevTab && activeTab !== prevTab) {
      setIsAnimating(true);

      // Animation ends
      const timeout = setTimeout(() => {
        setIsAnimating(false);
        setPrevTab(null);
      }, 650); // Increased duration from 500ms to 650ms

      return () => clearTimeout(timeout);
    }
  }, [activeTab, prevTab]);

  const handleTabChange = (tabId: string) => {
    if (activeTab !== tabId) {
      setPrevTab(activeTab);
      setActiveTab(tabId);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabChange(tab.id)}
            className={`px-4 py-2 font-medium ${
              activeTab === tab.id
                ? 'border-blue-600 border-b-2 text-blue-600'
                : 'border-transparent border-b-2 text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content relative">
        {isAnimating && prevTab && (
          <div
            ref={prevContentRef}
            className="absolute top-0 left-0 w-full"
            style={{
              clipPath: 'inset(0 0 0 0)',
              animation: 'clipToTop 650ms forwards cubic-bezier(0.33, 1, 0.68, 1)',
            }}
          >
            {tabs.find((tab) => tab.id === prevTab)?.content}
          </div>
        )}

        <div
          ref={newContentRef}
          style={{
            clipPath: isAnimating ? 'inset(100% 0 0 0)' : 'inset(0 0 0 0)',
            animation: isAnimating
              ? 'clipFromBottom 650ms forwards cubic-bezier(0.33, 1, 0.68, 1)'
              : 'none',
          }}
        >
          {tabs.find((tab) => tab.id === activeTab)?.content}
        </div>

        <style jsx>{`
          @keyframes clipToTop {
            from { clip-path: inset(0 0 0 0); }
            to { clip-path: inset(0 0 100% 0); }
          }
          
          @keyframes clipFromBottom {
            from { clip-path: inset(100% 0 0 0); }
            to { clip-path: inset(0 0 0 0); }
          }
        `}</style>
      </div>
    </div>
  );
}
