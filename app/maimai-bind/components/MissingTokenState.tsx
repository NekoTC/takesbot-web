import React from 'react';

export function MissingTokenState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F6FC] p-4 font-sans">
      <div className="bg-white rounded-[28px] p-8 max-w-sm w-full text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-[20px] bg-[#E1E1E1] mb-6 text-[#444746]">
           <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
           </svg>
        </div>
        <h1 className="text-2xl font-normal text-[#1F1F1F] mb-2">链接无效</h1>
        <p className="text-[#444746] mb-8 text-sm">请重新请求绑定链接</p>
        
        <div className="bg-[#F2F6FC] rounded-[16px] px-4 py-3 inline-block">
          <code className="text-[#00639B] font-mono text-base font-medium">/bind</code>
        </div>
      </div>
    </div>
  );
}
