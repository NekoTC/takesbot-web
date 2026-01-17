import React from 'react';

export function Header() {
  return (
    <div className="bg-gradient-to-br from-sky-400 to-blue-500 text-white p-10 text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-6 bg-white/20 p-4 rounded-3xl backdrop-blur-sm inline-block shadow-inner ring-1 ring-white/30">
          <svg className="w-12 h-12 text-white drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-2 tracking-wide drop-shadow-sm">舞萌DX 账号绑定</h1>
        <p className="text-sky-100 font-medium tracking-wide">Connect Your Maimai DX Account</p>
      </div>
    </div>
  );
}
