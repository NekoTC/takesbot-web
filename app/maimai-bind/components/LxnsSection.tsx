import React from 'react';
import { LXNS_CLIENT_ID, LXNS_AUTHORIZE_URL, OAUTH_CALLBACK_URL } from '../lib/config';

interface LxnsSectionProps {
  token: string;
  onError: (message: string) => void;
}

export function LxnsSection({ token, onError }: LxnsSectionProps) {
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
      <div className="bg-pink-50 border border-pink-100 rounded-2xl p-6">
        <h3 className="font-bold text-pink-900 mb-4 flex items-center gap-2.5">
          <div className="bg-white p-1.5 rounded-lg shadow-sm text-pink-500">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 018 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.2-2.848.578-4.156" />
            </svg>
          </div>
          OAuth 快速绑定
        </h3>
        <p className="text-sm text-pink-800/80 mb-4 font-medium leading-relaxed">
          我们将跳转到落雪查分器进行安全授权，完成后自动返回。
        </p>
        <div className="bg-white/60 rounded-xl p-4 text-xs text-pink-700 border border-pink-100/50">
          <p className="font-bold mb-2 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
            准备工作
          </p>
          <ul className="list-none space-y-1.5 ml-1">
            <li className="flex gap-2">
              <span className="text-pink-300">•</span>
              拥有落雪查分器账号
            </li>
            <li className="flex gap-2">
              <span className="text-pink-300">•</span>
              已在查分器上传过数据
            </li>
          </ul>
        </div>
      </div>

      <button
        onClick={handleLxnsBind}
        className="w-full bg-pink-500 hover:bg-pink-600 active:scale-[0.98] text-white font-bold py-4 rounded-xl shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 transition-all flex items-center justify-center gap-2.5"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        前往授权绑定
      </button>

      <p className="text-center text-xs text-slate-400 font-medium">
        授权过程由落雪查分器提供安全保障
      </p>
    </div>
  );
}
