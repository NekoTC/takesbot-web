export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center">
        <div className="text-8xl mb-6">🎮</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">舞萌DX 绑定服务</h1>
        <p className="text-lg text-gray-600 mb-8">
          欢迎使用 TakesBot 账号绑定系统
        </p>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-left">
          <h2 className="font-bold text-purple-900 mb-3 text-lg">📌 使用说明</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">1️⃣</span>
              <span>在 QQ 中向机器人发送 <code className="bg-purple-100 px-2 py-1 rounded">/bind</code> 命令</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">2️⃣</span>
              <span>点击机器人返回的绑定链接</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">3️⃣</span>
              <span>选择水鱼查分器或落雪查分器完成绑定</span>
            </li>
          </ul>
        </div>
        <div className="mt-8 text-sm text-gray-500">
          <p>需要帮助？请联系机器人管理员</p>
        </div>
      </div>
    </div>
  );
}
