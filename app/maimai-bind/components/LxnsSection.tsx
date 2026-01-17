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
      <div className="bg-pink-50 border border-pink-200 rounded-xl p-5">
        <h3 className="font-bold text-pink-900 mb-3 flex items-center gap-2">
          <span className="text-xl">💡</span>
          落雪查分器 OAuth 授权绑定
        </h3>
        <p className="text-sm text-pink-800 mb-3">
          点击下方按钮将跳转到落雪查分器进行授权登录，授权完成后将自动完成绑定。
        </p>
        <div className="bg-white/80 rounded-lg p-3 text-xs text-pink-700">
          <p className="font-medium mb-1">📌 注意事项：</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>需要有落雪查分器账号</li>
            <li>需要传输过游戏数据</li>
          </ul>
        </div>
      </div>

      <button
        onClick={handleLxnsBind}
        className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold py-4 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
      >
        <span className="text-xl">🔐</span>
        跳转到落雪查分器授权
      </button>

      <p className="text-center text-sm text-gray-500">
        授权完成后会自动返回并显示绑定结果
      </p>
    </div>
  );
}
