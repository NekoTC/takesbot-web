# TakesBot 绑定页面 - Next.js Frontend

舞萌DX 账号绑定前端页面，支持水鱼查分器和落雪查分器两种绑定方式。
（AIGC and 0 human's code）

## 功能特性

- 🐟 **水鱼查分器绑定**：输入令牌完成绑定
- ❄️ **落雪查分器绑定**：OAuth 授权流程
- 🎨 **响应式设计**：支持移动端和桌面端
- ⚡ **实时反馈**：绑定状态即时显示

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.local.example` 为 `.env.local` 并修改：

```bash
cp .env.local.example .env.local
```

编辑 `.env.local`：

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

将 `http://localhost:8080` 替换为你的后端 API 地址。

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000?token=YOUR_TOKEN

### 4. 构建生产版本

```bash
npm run build
npm start
```

## 使用流程

### 水鱼查分器绑定

1. 用户在 QQ 中发送 `/bind` 命令
2. 机器人返回绑定链接（带 token 参数）
3. 用户点击链接，选择「水鱼查分器」标签
4. 输入从水鱼查分器获取的令牌
5. 点击「确认绑定」完成

**获取水鱼令牌步骤：**
- 访问 https://www.diving-fish.com/maimaidx/prober/
- 微信登录并导入数据
- 右上角「设置」→「导入令牌」
- 复制令牌

### 落雪查分器绑定

1. 用户在 QQ 中发送 `/bind` 命令
2. 机器人返回绑定链接（带 token 参数）
3. 用户点击链接，选择「落雪查分器」标签
4. 点击「跳转到落雪查分器授权」
5. 完成 OAuth 授权后自动跳转回 `/oauth/callback`
6. 显示绑定成功页面

## 技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS 4
- **状态管理**: React Hooks

## 目录结构

```
takesbot-web/
├── app/
│   ├── page.tsx          # 主绑定页面
│   ├── layout.tsx        # 布局组件
│   └── globals.css       # 全局样式
├── public/               # 静态资源
├── .env.local            # 环境变量（本地）
└── package.json          # 依赖配置
```

## 后端 API 接口

### 完成绑定

**POST** `/maimai/bind/complete`

```json
{
  "token": "一次性令牌",
  "source": "offical | luoxue",
  "friend_code": "好友码（可选）",
  "syname": "玩家名（可选）"
}
```

**响应：**

```json
{
  "success": true,
  "message": "绑定完成"
}
```

### OAuth 回调

**GET** `/oauth/callback?code=xxx&state=token`

处理落雪查分器的 OAuth 授权回调。

## 部署

### Vercel 部署（推荐）

1. 将项目推送到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量 `NEXT_PUBLIC_API_URL`
4. 部署

### 自托管

```bash
npm run build
npm start
```

使用 Nginx 反向代理：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 配置说明

### 机器人配置

在 NoneBot 配置中设置前端绑定页 URL：

```env
maimai_bind_frontend_url=https://your-domain.com
```

### CORS 配置

如果前后端分离部署在不同域名，需要在后端配置 CORS：

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 故障排查

### 问题：绑定失败，显示"缺少绑定令牌"

**解决方案：**
- 确认 URL 中包含 `?token=xxx` 参数
- 重新从机器人获取绑定链接

### 问题：水鱼绑定失败，提示"令牌无效"

**解决方案：**
- 检查令牌是否完整复制
- 确认令牌未过期
- 在水鱼查分器重新生成令牌

### 问题：落雪绑定跳转后无响应

**解决方案：**
- 检查 OAuth 回调 URL 是否正确配置
- 确认后端 `/oauth/callback` 接口正常运行
- 查看浏览器控制台错误信息

## License

MIT
