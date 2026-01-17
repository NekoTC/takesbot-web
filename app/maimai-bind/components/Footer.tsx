import React from 'react';

export function Footer() {
  return (
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
  );
}
