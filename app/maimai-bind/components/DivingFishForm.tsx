import React, { useState } from 'react';
import { API_BASE_URL } from '../lib/config';

interface DivingFishFormProps {
  token: string;
  onSuccess: (syname: string) => void;
  onError: (message: string) => void;
  onStartSubmit: () => void;
}

export function DivingFishForm({ token, onSuccess, onError, onStartSubmit }: DivingFishFormProps) {
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
  );
}
