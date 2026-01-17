import React from 'react';

export function Footer() {
  return (
    <div className="bg-slate-50 px-8 py-6 border-t border-slate-100">
      <div className="flex items-start gap-4 text-sm text-slate-500">
        <div className="bg-white p-2 rounded-full shadow-sm text-sky-500">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="font-bold text-slate-700 mb-1">绑定必读</p>
          <ul className="space-y-1.5 text-xs text-slate-500 font-medium">
            <li>• 绑定令牌有效期为 10 分钟</li>
            <li>• 支持随时切换数据源</li>
            <li>• 遇到问题请联系管理员</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
