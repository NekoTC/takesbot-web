import React from 'react';
import { LXNS_CLIENT_ID, LXNS_AUTHORIZE_URL, OAUTH_CALLBACK_URL } from '../lib/config';

interface LxnsSectionProps {
  token: string;
  onError: (message: string) => void;
  onBack: () => void;
}

export function LxnsSection({ token, onError, onBack }: LxnsSectionProps) {
  const handleLxnsBind = () => {
    if (!token) {
      onError('缺少绑定令牌，请重新从机器人获取链接');
      return;
    }

    // 生成 OAuth 授权链接（state 使用 token）
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: LXNS_CLIENT_ID,
      redirect_uri: OAUTH_CALLBACK_URL,
      scope: 'read_user_profile write_player read_player read_user_token',
      state: token
    });

    window.location.href = `${LXNS_AUTHORIZE_URL}?${params.toString()}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6 animate-fade-in-right stagger-1 opacity-0 fill-mode-forwards">
        <button 
          onClick={onBack}
          className="mr-3 w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 active:bg-black/10 transition-colors text-[#444746]"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-[22px] font-normal text-[#1F1F1F]">落雪查分器</h2>
      </div>

      <div className="bg-[#FFF0F4] rounded-[24px] p-8 text-center animate-scale-in stagger-2 opacity-0 fill-mode-forwards origin-bottom">
        <div className="w-16 h-16 mx-auto bg-[#FFD8E4] rounded-full flex items-center justify-center text-[#31111D] mb-4">
           <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 018 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.2-2.848.578-4.156" />
            </svg>
        </div>
        <h3 className="text-[#31111D] font-medium text-lg mb-2">OAuth 快速绑定</h3>
        <p className="text-[#492532] text-sm mb-8 leading-relaxed max-w-[80%] mx-auto">
          将跳转到落雪查分器进行安全授权，<br/>需确保已拥有账号并上传过数据。
        </p>

        <button
          onClick={handleLxnsBind}
          className="bg-[#31111D] text-white text-sm font-medium py-3.5 px-8 rounded-full hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all w-full max-w-[200px]"
        >
          去授权
        </button>
      </div>

      <p className="text-center text-[10px] text-[#747775] animate-fade-in-up stagger-3 opacity-0 fill-mode-forwards">
        授权过程由落雪查分器提供安全保障
      </p>
    </div>
  );
}
