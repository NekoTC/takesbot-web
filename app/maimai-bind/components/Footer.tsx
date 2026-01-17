import React from 'react';

export function Footer() {
  return (
    <div className="px-8 py-6 mb-2">
      <div className="flex items-center justify-center gap-2 text-sm text-[#747775] dark:text-[#8E918F]">
        <svg className="w-4 h-4 text-slate-400 dark:text-[#8E918F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-xs font-medium">绑定令牌有效期为 10 分钟</span>
      </div>
    </div>
  );
}
