import React from 'react';

interface TabSelectorProps {
  activeTab: 'diving-fish' | 'lxns';
  onTabChange: (tab: 'diving-fish' | 'lxns') => void;
}

export function TabSelector({ activeTab, onTabChange }: TabSelectorProps) {
  return (
    <div className="flex border-b border-slate-100 p-2 gap-2 bg-slate-50/50">
      <button
        onClick={() => onTabChange('diving-fish')}
        className={`flex-1 py-3 px-4 text-center rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
          activeTab === 'diving-fish'
            ? 'bg-white text-sky-600 shadow-sm ring-1 ring-black/5'
            : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'
        }`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        水鱼查分器
      </button>
      <button
        onClick={() => onTabChange('lxns')}
        className={`flex-1 py-3 px-4 text-center rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
          activeTab === 'lxns'
            ? 'bg-white text-pink-500 shadow-sm ring-1 ring-black/5'
            : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'
        }`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
        落雪查分器
      </button>
    </div>
  );
}
