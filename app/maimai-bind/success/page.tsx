'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

export default function BindSuccessPage() {
  const searchParams = useSearchParams();
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // 从 URL 参数直接计算状态，避免在 effect 中设置状态
  const { status, playerName, authCode, errorMessage, autoBindSuccess } = useMemo(() => {
    const statusParam = searchParams.get('status');
    const playerParam = searchParams.get('player');
    const codeParam = searchParams.get('code');
    const errorParam = searchParams.get('error');
    const autoBindParam = searchParams.get('auto_bind');

    if (statusParam === 'success') {
      return {
        status: 'success' as const,
        playerName: playerParam || '未知玩家',
        authCode: codeParam || '',
        errorMessage: '',
        autoBindSuccess: autoBindParam === '1',
      };
    } else if (statusParam === 'error') {
      return {
        status: 'error' as const,
        playerName: '',
        authCode: '',
        errorMessage: errorParam || '未知错误',
        autoBindSuccess: false,
      };
    }

    return {
      status: 'loading' as const,
      playerName: '',
      authCode: '',
      errorMessage: '',
      autoBindSuccess: false,
    };
  }, [searchParams]);

  const copyCode = async () => {
    if (!authCode) return;
    
    try {
      await navigator.clipboard.writeText(authCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      // 降级方案
      const textArea = document.createElement('textarea');
      textArea.value = authCode;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (e) {
        console.error('复制失败', e);
      }
      document.body.removeChild(textArea);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900">
        <div className="text-white text-xl">加载中...</div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 p-4">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-md w-full text-center animate-[slideUp_0.5s_ease-out]">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">❌</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">绑定失败</h1>
          <p className="text-gray-600 mb-6">{errorMessage}</p>
          <a
            href="/maimai-bind"
            className="inline-block bg-purple-600 text-white px-8 py-3 rounded-xl hover:bg-purple-700 transition-colors"
          >
            返回重试
          </a>
        </div>
      </div>
    );
  }

  // 成功页面
  if (autoBindSuccess) {
    // 自动绑定成功
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 p-4">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-md w-full text-center animate-[slideUp_0.6s_cubic-bezier(0.175,0.885,0.32,1.275)]">
          {/* 成功图标 */}
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12" viewBox="0 0 52 52">
              <circle
                className="stroke-green-500 fill-none"
                strokeWidth="3"
                cx="26"
                cy="26"
                r="25"
              />
              <path
                className="stroke-green-500 fill-none animate-[checkmark_0.3s_0.8s_forwards]"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="48"
                strokeDashoffset="48"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">绑定成功</h1>

          <div className="inline-block bg-purple-100 text-purple-700 px-6 py-2 rounded-full text-lg font-semibold mb-6">
            {playerName}
          </div>

          <div className="text-gray-600 mb-6 leading-relaxed">
            您的账号已成功关联至<strong className="text-purple-600">落雪系统</strong>
            <br />
            现在可以返回 QQ 使用了
          </div>

          {authCode && (
            <div className="bg-gray-50 px-4 py-3 rounded-lg mb-4 border border-gray-200">
              <span className="text-gray-400 text-xs block mb-1">授权码（备用）</span>
              <span className="font-mono text-sm text-gray-600 break-all">{authCode}</span>
            </div>
          )}

          <button
            onClick={() => window.close()}
            className="w-full bg-purple-600 text-white px-8 py-3 rounded-xl hover:bg-purple-700 transition-all active:scale-95 mt-6 font-medium"
          >
            我知道了
          </button>
        </div>

        <style jsx>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes checkmark {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}</style>
      </div>
    );
  } else {
    // 需要手动绑定
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 p-4">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full animate-[slideUp_0.5s_ease-out]">
          {/* 授权图标 */}
          <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
            🔐
          </div>

          <h1 className="text-2xl font-bold text-gray-800 text-center mb-3">授权成功</h1>
          <div className="text-center text-gray-600 mb-6">
            当前玩家：<strong className="text-purple-600">{playerName}</strong>
          </div>

          {/* 授权码区域 */}
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-5 mb-5">
            <div 
              className="font-mono text-xl font-bold text-gray-800 break-all tracking-wide mb-4 select-all"
              id="authCode"
            >
              {authCode}
            </div>
            <button
              onClick={copyCode}
              className={`w-full px-6 py-3 rounded-lg font-semibold transition-all active:scale-95 shadow-lg ${
                copySuccess
                  ? 'bg-green-500 text-white shadow-green-500/30'
                  : 'bg-purple-600 text-white shadow-purple-600/30 hover:bg-purple-700'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                {copySuccess ? (
                  <>
                    <span>✅</span>
                    <span>已成功复制</span>
                  </>
                ) : (
                  <>
                    <span>📋</span>
                    <span>复制授权码</span>
                  </>
                )}
              </span>
            </button>
          </div>

          {/* 引导区 */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="text-sm font-bold text-gray-600 mb-2 flex items-center gap-2">
              💡 下一步：返回聊天框 @塔可Bot 发送
            </div>
            <div className="bg-white px-3 py-2 rounded-lg font-mono text-sm text-pink-600 border border-gray-200 break-all">
              /bindlx {authCode}
            </div>
          </div>

          <div className="text-center text-xs text-gray-400 mt-5">
            授权码有效期为 10 分钟，请尽快绑定
          </div>
        </div>

        <style jsx>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    );
  }
}
