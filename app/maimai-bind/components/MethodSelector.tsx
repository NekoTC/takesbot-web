import React from 'react';

interface MethodSelectorProps {
  onSelect: (method: 'diving-fish' | 'lxns') => void;
}

export function MethodSelector({ onSelect }: MethodSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
        {/* 水鱼查分器 Card - Tonal Button Style */}
        <button
          onClick={() => onSelect('diving-fish')}
          className="group relative flex items-center p-4 bg-[#F0F4FC] rounded-[20px] transition-all duration-300 active:scale-[0.98] hover:bg-[#DDE3EA] hover:shadow-md hover:-translate-y-0.5 animate-fade-in-up stagger-1 opacity-0 fill-mode-forwards"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-[16px] bg-[#C2E7FF] text-[#001D35] mr-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div className="text-left">
            <h3 className="text-base font-medium text-[#1F1F1F]">水鱼查分器</h3>
            <p className="text-xs text-[#444746] mt-0.5">使用 Token 进行绑定</p>
          </div>
          <div className="absolute right-4 text-[#444746] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        {/* 落雪查分器 Card - Tonal Button Style */}
        <button
          onClick={() => onSelect('lxns')}
          className="group relative flex items-center p-4 bg-[#FFF0F4] rounded-[20px] transition-all duration-300 active:scale-[0.98] hover:bg-[#FFD8E4] hover:shadow-md hover:-translate-y-0.5 text-left w-full animate-fade-in-up stagger-2 opacity-0 fill-mode-forwards"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-[16px] bg-[#FFD8E4] text-[#31111D] mr-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 018 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.2-2.848.578-4.156" />
            </svg>
          </div>
          <div className="text-left">
            <h3 className="text-base font-medium text-[#1F1F1F]">落雪查分器</h3>
            <p className="text-xs text-[#444746] mt-0.5">支持 OAuth 快速授权</p>
          </div>
          <div className="absolute right-4 text-[#444746] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>
      
      <div className="pt-8 text-center px-8 animate-fade-in-up stagger-3 opacity-0 fill-mode-forwards">
        <p className="text-[11px] text-[#747775] leading-relaxed">
          官方绑定功能暂停维护，请选择上方的第三方服务进行数据关联
        </p>
      </div>
    </div>
  );
}
