import React from 'react';

interface MethodSelectorProps {
  onSelect: (method: 'diving-fish' | 'lxns') => void;
}

export function MethodSelector({ onSelect }: MethodSelectorProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-slate-800">选择您的查分器</h2>
        <p className="text-slate-500 text-sm mt-1">请选择您目前使用的 Maimai DX 数据平台</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* 水鱼查分器 Card */}
        <button
          onClick={() => onSelect('diving-fish')}
          className="group relative flex items-center p-6 bg-white border border-slate-200 rounded-2xl hover:border-sky-300 hover:shadow-lg hover:shadow-sky-100 transition-all duration-300 text-left w-full"
        >
          <div className="bg-sky-50 p-4 rounded-xl mr-5 group-hover:bg-sky-100 transition-colors">
            <svg className="w-8 h-8 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 group-hover:text-sky-600 transition-colors">水鱼查分器</h3>
            <p className="text-sm text-slate-400 mt-1">使用 Token 令牌进行数据绑定</p>
          </div>
          <div className="absolute right-6 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
            <svg className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        {/* 落雪查分器 Card */}
        <button
          onClick={() => onSelect('lxns')}
          className="group relative flex items-center p-6 bg-white border border-slate-200 rounded-2xl hover:border-pink-300 hover:shadow-lg hover:shadow-pink-100 transition-all duration-300 text-left w-full"
        >
          <div className="bg-pink-50 p-4 rounded-xl mr-5 group-hover:bg-pink-100 transition-colors">
            <svg className="w-8 h-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 018 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.2-2.848.578-4.156" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 group-hover:text-pink-600 transition-colors">落雪查分器</h3>
            <p className="text-sm text-slate-400 mt-1">支持 OAuth 快速授权登录</p>
          </div>
          <div className="absolute right-6 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
            <svg className="w-6 h-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>
      
      <div className="pt-4 text-center">
        <p className="text-xs text-slate-300">官方绑定功能暂停维护，请使用第三方查分器</p>
      </div>
    </div>
  );
}
