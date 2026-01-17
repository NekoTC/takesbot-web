import React from 'react';

export function MissingTokenState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-4">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">缺少绑定令牌</h1>
        <p className="text-gray-600 mb-6">请从机器人获取正确的绑定链接</p>
        <div className="text-sm text-gray-500">
          <p>在 QQ 中发送命令：</p>
          <code className="bg-gray-100 px-3 py-1 rounded mt-2 inline-block">/bind</code>
        </div>
      </div>
    </div>
  );
}
