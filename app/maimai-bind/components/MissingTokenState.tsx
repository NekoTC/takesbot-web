import React from 'react';

export function MissingTokenState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-sm w-full text-center border border-slate-100">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
             <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">链接已失效</h1>
        <p className="text-slate-500 mb-8 font-medium">请重新生成绑定链接</p>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">QQ Command</p>
          <code className="text-sky-600 font-mono text-lg font-bold">/bind</code>
        </div>
      </div>
    </div>
  );
}
