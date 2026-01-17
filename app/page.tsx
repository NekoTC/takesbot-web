'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [isHere, setIsHere] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsHere(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen flex items-center justify-center bg-[#F2F6FC] dark:bg-[#111318] text-[#1F1F1F] dark:text-[#E2E2E6] p-4 font-sans transition-colors duration-700 opacity-0 ${isHere ? 'opacity-100' : ''}`}>
      <div className="bg-white dark:bg-[#1E1F23] rounded-[32px] p-2 max-w-[600px] w-full mx-auto md:shadow-md md:shadow-black/5 dark:md:shadow-black/20 transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20">
        <div className="p-8 md:p-10">
          
          <div className="text-center pt-2 pb-8 animate-fade-in-up stagger-1 opacity-0 fill-mode-forwards">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-[28px] bg-[#EADDFF] dark:bg-[#4F378B] mb-6 text-[#21005D] dark:text-[#EADDFF] shadow-sm transform transition-transform hover:scale-105 duration-300">
               <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
               </svg>
            </div>
            <h1 className="text-[32px] font-normal text-[#1F1F1F] dark:text-[#E2E2E6] mb-3 leading-tight">TakesBot 服务</h1>
            <p className="text-[#444746] dark:text-[#C4C7C5] text-base">舞萌 DX 查分绑定引导页</p>
          </div>

          <div className="bg-[#F0F4FC] dark:bg-[#282A2F] rounded-[24px] p-8 animate-fade-in-up stagger-2 opacity-0 fill-mode-forwards">
            <h2 className="text-lg font-medium text-[#1F1F1F] dark:text-[#E2E2E6] mb-6 flex items-center">
              <svg className="w-5 h-5 mr-3 text-[#00639B] dark:text-[#A8C7FA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              使用指南
            </h2>
            <ul className="space-y-6">
              <li className="flex gap-4 items-start group">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1F1F1F] dark:bg-[#E2E2E6] text-white dark:text-[#1F1F1F] flex items-center justify-center text-sm font-bold shadow-sm group-hover:scale-110 transition-transform duration-300">1</div>
                <div className="py-1">
                  <p className="text-sm text-[#1F1F1F] dark:text-[#E2E2E6] font-medium mb-1">发送绑定命令</p>
                  <p className="text-xs text-[#444746] dark:text-[#C4C7C5] leading-relaxed">
                    在 QQ 群或私聊中向机器人发送 <code className="bg-[#D3E3FD] dark:bg-[#004A77] px-1.5 py-0.5 rounded text-[#001D35] dark:text-[#C2E7FF] font-mono mx-0.5 border border-[#C2E7FF] dark:border-[#005FA3]">/bind</code> 获取专属链接
                  </p>
                </div>
              </li>
              <li className="flex gap-4 items-start group">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1F1F1F] dark:bg-[#E2E2E6] text-white dark:text-[#1F1F1F] flex items-center justify-center text-sm font-bold shadow-sm group-hover:scale-110 transition-transform duration-300">2</div>
                <div className="py-1">
                  <p className="text-sm text-[#1F1F1F] dark:text-[#E2E2E6] font-medium mb-1">访问绑定页面</p>
                  <p className="text-xs text-[#444746] dark:text-[#C4C7C5] leading-relaxed">
                    点击机器人回复的链接进入本服务（链接有效期 10 分钟）
                  </p>
                </div>
              </li>
              <li className="flex gap-4 items-start group">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1F1F1F] dark:bg-[#E2E2E6] text-white dark:text-[#1F1F1F] flex items-center justify-center text-sm font-bold shadow-sm group-hover:scale-110 transition-transform duration-300">3</div>
                <div className="py-1">
                  <p className="text-sm text-[#1F1F1F] dark:text-[#E2E2E6] font-medium mb-1">选择平台绑定</p>
                  <p className="text-xs text-[#444746] dark:text-[#C4C7C5] leading-relaxed">
                    支持 <span className="text-[#00639B] dark:text-[#A8C7FA] font-medium">水鱼查分器</span> Token 或 <span className="text-[#00639B] dark:text-[#A8C7FA] font-medium">落雪查分器</span> OAuth 授权
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-8 text-center text-xs text-[#747775] dark:text-[#8E918F] animate-fade-in-up stagger-3 opacity-0 fill-mode-forwards">
            <p>遇到问题？请联系机器人管理员寻求帮助</p>
          </div>
        </div>
      </div>
    </div>
  );
}
