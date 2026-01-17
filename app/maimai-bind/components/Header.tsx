import React from 'react';

export function Header() {
  return (
    <div className="text-center pt-4 pb-2">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-[20px] bg-[#D3E3FD] dark:bg-[#004A77] mb-6 text-[#00639B] dark:text-[#C2E7FF]">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      </div>
      <h1 className="text-[28px] font-normal text-[#1F1F1F] dark:text-[#E2E2E6] mb-2 leading-tight">账号绑定</h1>
      <p className="text-[#444746] dark:text-[#C4C7C5] text-base">Connect Maimai DX</p>
    </div>
  );
}
