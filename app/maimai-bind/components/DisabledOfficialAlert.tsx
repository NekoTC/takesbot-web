import React from 'react';

export function DisabledOfficialAlert() {
  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="bg-white p-2 rounded-full shadow-sm text-amber-500 shrink-0">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
             </svg>
          </div>
          <div>
            <h3 className="font-bold text-amber-900 text-lg mb-2">
              官方绑定暂不支持
            </h3>
            <p className="text-amber-800/80 mb-4 text-sm leading-relaxed">
              官方绑定功能已停用。为了获得最佳体验，建议使用以下绑定方式之一：
            </p>
            <ul className="space-y-2 text-sm text-amber-900/90 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span><strong>水鱼查分器</strong> - 需要导入令牌</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span><strong>落雪查分器</strong> - OAuth 授权绑定（推荐）</span>
              </li>
            </ul>
            <p className="text-amber-700/70 text-xs mt-4 font-medium flex items-center gap-1.5">
               <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               如有疑问，请联系机器人管理员
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
