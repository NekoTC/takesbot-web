import React, { useState } from 'react';
import { API_BASE_URL } from '../lib/config';

interface DivingFishFormProps {
  token: string;
  onSuccess: (syname: string) => void;
  onError: (message: string) => void;
  onStartSubmit: () => void;
  onBack: () => void;
}

export function DivingFishForm({ token, onSuccess, onError, onStartSubmit, onBack }: DivingFishFormProps) {
  const [divingFishToken, setDivingFishToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDivingFishBind = async () => {
    if (!token) {
      onError('缺少绑定令牌，请重新从机器人获取链接');
      return;
    }
    if (!divingFishToken.trim()) {
      onError('请输入水鱼查分器令牌');
      return;
    }

    onStartSubmit();
    setIsSubmitting(true);

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
      const sytoken = divingFishToken.trim()
      
      // 调用后端接口完成绑定
      const bindRes = await fetch(`${API_BASE_URL}/maimai/bind/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          source: 'diving_fish',
          syname,
          sytoken,
          friend_code: null
        })
      });

      const result = await bindRes.json();
      
      if (bindRes.ok && result.success) {
        setDivingFishToken('');
        onSuccess(syname);
      } else {
        throw new Error(result.message || '绑定失败');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '绑定过程出错，请重试';
      onError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
      <div className="flex items-center mb-4">
        <button 
          onClick={onBack}
          className="mr-3 p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-lg font-bold text-slate-700">水鱼查分器绑定</h2>
      </div>

      <div className="bg-sky-50 border border-sky-100 rounded-2xl p-6">
        <h3 className="font-bold text-sky-900 mb-4 flex items-center gap-2.5">
          <div className="bg-white p-1.5 rounded-lg shadow-sm text-sky-500">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          如何获取 Token？
        </h3>
        <ol className="text-sm text-sky-800 space-y-3 list-decimal list-inside font-medium marker:text-sky-400">
          <li>访问 <a href="https://www.diving-fish.com/maimaidx/prober/" target="_blank" rel="noopener noreferrer" className="text-sky-600 underline decoration-sky-300 underline-offset-2 hover:text-sky-700">水鱼查分器</a></li>
          <li>点击右上角「编辑个人资料」</li>
          <li>找到「成绩导入Token」并复制</li>
        </ol>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
          查分器 Token
        </label>
        <input
          type="text"
          value={divingFishToken}
          onChange={(e) => setDivingFishToken(e.target.value)}
          placeholder="在此粘贴您的 Token"
          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-sky-100 focus:border-sky-400 focus:bg-white text-slate-800 placeholder:text-slate-400 transition-all outline-none font-medium"
        />
      </div>

      <button
        onClick={handleDivingFishBind}
        disabled={isSubmitting || !divingFishToken.trim()}
        className="w-full bg-sky-500 hover:bg-sky-600 active:scale-[0.98] text-white font-bold py-4 rounded-xl shadow-lg shadow-sky-200 hover:shadow-xl hover:shadow-sky-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
      >
        {isSubmitting ? '正在绑定...' : '确认绑定'}
      </button>
    </div>
  );
}
