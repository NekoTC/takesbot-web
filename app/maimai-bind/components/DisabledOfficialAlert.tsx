import React from 'react';

export function DisabledOfficialAlert() {
  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <span className="text-4xl">⚠️</span>
          <div>
            <h3 className="font-bold text-yellow-900 text-lg mb-2">
              官方绑定暂不支持
            </h3>
            <p className="text-yellow-800 mb-4">
              官方绑定功能已停用。为了获得最佳体验，建议使用以下绑定方式之一：
            </p>
            <ul className="space-y-2 text-sm text-yellow-800">
              <li className="flex items-center gap-2">
                <span className="text-lg">🐟</span>
                <span><strong>水鱼查分器</strong> - 需要导入令牌</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg">❄️</span>
                <span><strong>落雪查分器</strong> - OAuth 授权绑定（推荐）</span>
              </li>
            </ul>
            <p className="text-yellow-700 text-xs mt-4 font-medium">
              📌 如有疑问，请联系机器人管理员
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
