'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

// 落雪 OAuth 配置（从环境变量读取）
const LXNS_CLIENT_ID = process.env.NEXT_PUBLIC_LXNS_CLIENT_ID || "xxxxxx";
const LXNS_AUTHORIZE_URL = process.env.NEXT_PUBLIC_LXNS_AUTHORIZE_URL || "https://maimai.lxns.net/oauth/authorize";
const OAUTH_CALLBACK_URL = process.env.NEXT_PUBLIC_OAUTH_CALLBACK_URL || "https://lxns.nekotc.cn/oauth/callback";

// 后端 API 地址
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

function BindPageContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [activeTab, setActiveTab] = useState<'diving-fish' | 'lxns' | 'official'>('diving-fish');
  const [divingFishToken, setDivingFishToken] = useState('');
  const [officialUserID, setOfficialUserID] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // 水鱼绑定处理
  const handleDivingFishBind = async () => {
    if (!token) {
      setMessage({ type: 'error', text: '缺少绑定令牌，请重新从机器人获取链接' });
      return;
    }
    if (!divingFishToken.trim()) {
      setMessage({ type: 'error', text: '请输入水鱼查分器令牌' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      // 先验证水鱼令牌
      const verifyRes = await fetch('https://www.diving-fish.com/api/maimaidxprober/player/records', {
        headers: { 'Import-Token': divingFishToken.trim() }
      });
      
      if (!verifyRes.ok) {
        throw new Error('水鱼查分器令牌无效');
      }

      const userData = await verifyRes.json();
      const syname = userData.username;

      // 调用后端接口完成绑定
      const bindRes = await fetch(`${API_BASE_URL}/maimai/bind/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          source: 'diving_fish',
          syname,
          friend_code: null
        })
      });

      const result = await bindRes.json();
      
      if (bindRes.ok && result.success) {
        setMessage({ type: 'success', text: `绑定成功！玩家名：${syname}` });
        setDivingFishToken('');
      } else {
        throw new Error(result.message || '绑定失败');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '绑定过程出错，请重试';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 落雪绑定跳转
  const handleLxnsBind = () => {
    if (!token) {
      setMessage({ type: 'error', text: '缺少绑定令牌，请重新从机器人获取链接' });
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

  // 官方绑定处理
  const handleOfficialBind = async () => {
    if (!token) {
      setMessage({ type: 'error', text: '缺少绑定令牌，请重新从机器人获取链接' });
      return;
    }
    if (!officialUserID.trim()) {
      setMessage({ type: 'error', text: '请输入官方二维码内容' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      // 调用后端接口完成绑定（后端会解析二维码）
      const bindRes = await fetch(`${API_BASE_URL}/maimai/bind/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: token,
          qrCode: officialUserID.trim(),  // 发送二维码内容而不是 userID
          source: 'official'
        })
      });

      if (!bindRes.ok) {
        const errorData = await bindRes.json();
        throw new Error(errorData.detail || '绑定失败，请重试');
      }

      const result = await bindRes.json();
      setMessage({ type: 'success', text: result.message || '官方账号绑定成功！' });
      setOfficialUserID('');
      
      // 2秒后重定向到成功页面
      setTimeout(() => {
        window.location.href = `/maimai-bind/success?status=success&auto_bind=1`;
      }, 2000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '绑定过程出错，请重试';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token) {
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden max-w-2xl w-full">
        {/* 头部 */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 text-center">
          <div className="text-5xl mb-3">🎮</div>
          <h1 className="text-3xl font-bold mb-2">舞萌DX 账号绑定</h1>
          <p className="text-purple-100">选择绑定方式完成账号关联</p>
        </div>

        {/* Tab 切换 */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('diving-fish')}
            className={`flex-1 py-4 text-center font-semibold transition-all ${
              activeTab === 'diving-fish'
                ? 'bg-white text-purple-600 border-b-2 border-purple-600'
                : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}
          >
            🐟 水鱼查分器
          </button>
          <button
            onClick={() => setActiveTab('lxns')}
            className={`flex-1 py-4 text-center font-semibold transition-all ${
              activeTab === 'lxns'
                ? 'bg-white text-pink-600 border-b-2 border-pink-600'
                : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}
          >
            ❄️ 落雪查分器
          </button>
          <button
            onClick={() => setActiveTab('official')}
            className={`flex-1 py-4 text-center font-semibold transition-all ${
              activeTab === 'official'
                ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}
          >
            🎯 官方查分器
          </button>
        </div>

        {/* 内容区 */}
        <div className="p-8">
          {/* 消息提示 */}
          {message && (
            <div className={`mb-6 p-4 rounded-xl ${
              message.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              <div className="flex items-center gap-2">
                <span className="text-xl">{message.type === 'success' ? '✅' : '❌'}</span>
                <span className="font-medium">{message.text}</span>
              </div>
            </div>
          )}

          {/* 水鱼绑定 */}
          {activeTab === 'diving-fish' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                  <span className="text-xl">💡</span>
                  如何获取水鱼查分器Token？
                </h3>
                <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                  <li>访问 <a href="https://www.diving-fish.com/maimaidx/prober/" target="_blank" rel="noopener noreferrer" className="underline font-medium">水鱼查分器</a></li>
                  <li>点击右上角「编辑个人资料」→「成绩导入Token」</li>
                  <li>复制令牌并粘贴到下方输入框</li>
                </ol>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  水鱼查分器Token *
                </label>
                <input
                  type="text"
                  value={divingFishToken}
                  onChange={(e) => setDivingFishToken(e.target.value)}
                  placeholder="粘贴您的水鱼查分器令牌"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              <button
                onClick={handleDivingFishBind}
                disabled={isSubmitting || !divingFishToken.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '绑定中...' : '确认绑定'}
              </button>
            </div>
          )}

          {/* 落雪绑定 */}
          {activeTab === 'lxns' && (
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
          )}

          {/* 官方绑定 */}
          {activeTab === 'official' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                  <span className="text-xl">💡</span>
                  如何获取官方二维码？
                </h3>
                <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                  <li>在 舞萌|中二 中获取登入二维码</li>
                  <li>长按识别</li>
                  <li>复制完整的二维码内容（以 SGWCMAID 开头）并粘贴到下方</li>
                </ol>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  官方二维码内容 *
                </label>
                <input
                  type="text"
                  value={officialUserID}
                  onChange={(e) => setOfficialUserID(e.target.value)}
                  placeholder="粘贴以 SGWCMAID 开头的二维码内容"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono text-sm"
                />
              </div>

              <button
                onClick={handleOfficialBind}
                disabled={isSubmitting || !officialUserID.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '解析并绑定中...' : '确认绑定'}
              </button>
            </div>
          )}
        </div>

        {/* 底部提示 */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
          <div className="flex items-start gap-3 text-sm text-gray-600">
            <span className="text-lg">ℹ️</span>
            <div>
              <p className="font-medium mb-1">绑定说明</p>
              <ul className="space-y-1 text-xs">
                <li>• 绑定令牌有效期为 10 分钟</li>
                <li>• 支持切换查分器数据源</li>
                <li>• 遇到问题请联系机器人管理员</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MaimaiBindPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900">
        <div className="text-white text-xl">加载中...</div>
      </div>
    }>
      <BindPageContent />
    </Suspense>
  );
}
