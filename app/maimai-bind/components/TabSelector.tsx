import React from 'react';

interface TabSelectorProps {
  activeTab: 'diving-fish' | 'lxns';
  onTabChange: (tab: 'diving-fish' | 'lxns') => void;
}

export function TabSelector({ activeTab, onTabChange }: TabSelectorProps) {
  return (
    <div className="flex border-b border-gray-200">
      <button
        onClick={() => onTabChange('diving-fish')}
        className={`flex-1 py-4 text-center font-semibold transition-all ${
          activeTab === 'diving-fish'
            ? 'bg-white text-purple-600 border-b-2 border-purple-600'
            : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
        }`}
      >
        🐟 水鱼查分器
      </button>
      <button
        onClick={() => onTabChange('lxns')}
        className={`flex-1 py-4 text-center font-semibold transition-all ${
          activeTab === 'lxns'
            ? 'bg-white text-pink-600 border-b-2 border-pink-600'
            : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
        }`}
      >
        ❄️ 落雪查分器
      </button>
    </div>
  );
}
