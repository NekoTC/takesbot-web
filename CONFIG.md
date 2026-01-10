# TakesBot 绑定系统配置指南

## 后端配置（NoneBot）

在 NoneBot 的配置文件（通常是 `.env` 或 `.env.prod`）中添加：

```env
# 前端绑定页面地址（不包含 /maimai-bind 路径）
maimai_bind_frontend_url=https://bind.nekotc.cn
```

**说明：**
- 这个 URL 会在用户使用 `/bind` 命令时返回
- OAuth 回调完成后也会重定向到这个域名下的 `/maimai-bind/success` 页面
- 不要在 URL 末尾加斜杠或 `/maimai-bind` 路径

## 前端配置（Next.js）

### 1. 复制环境变量文件

```bash
cd takesbot-web
cp .env.local.example .env.local
```

### 2. 编辑 `.env.local`

```env
# 后端 API 地址（NoneBot FastAPI 服务器）
NEXT_PUBLIC_API_URL=https://lxns.nekotc.cn

# 落雪查分器 OAuth 配置
NEXT_PUBLIC_LXNS_CLIENT_ID=7ca0d305-93cb-48bd-aadd-36c9a98ffefd
NEXT_PUBLIC_LXNS_AUTHORIZE_URL=https://maimai.lxns.net/oauth/authorize
NEXT_PUBLIC_OAUTH_CALLBACK_URL=https://lxns.nekotc.cn/oauth/callback
```

**配置说明：**

- `NEXT_PUBLIC_API_URL`：后端 API 地址，必须与 NoneBot 服务器可访问
  - 开发环境：`http://localhost:8080`（假设 NoneBot 在 8080 端口）
  - 生产环境：你的后端域名（通常与 OAuth 回调同域名）

- `NEXT_PUBLIC_LXNS_CLIENT_ID`：落雪查分器 OAuth 客户端 ID（已配置好）

- `NEXT_PUBLIC_LXNS_AUTHORIZE_URL`：落雪 OAuth 授权地址（无需修改）

- `NEXT_PUBLIC_OAUTH_CALLBACK_URL`：OAuth 回调地址
  - 必须与后端 `oauth_callback.py` 中的 `LXNS_REDIRECT_URI` 一致
  - 必须在落雪查分器开发者后台配置为允许的回调地址

## 部署流程

### 开发环境

```bash
# 后端（NoneBot）
nb run

# 前端（Next.js）
cd takesbot-web
npm install
npm run dev
```

访问 `http://localhost:3000/maimai-bind` 测试绑定功能。

### 生产环境

#### 前端部署

```bash
cd takesbot-web
npm install
npm run build
npm start  # 或使用 PM2: pm2 start npm --name "takesbot-web" -- start
```

#### Nginx 配置示例

```nginx
# 前端（Next.js）
server {
    listen 443 ssl;
    server_name bind.nekotc.cn;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# 后端（NoneBot）
server {
    listen 443 ssl;
    server_name lxns.nekotc.cn;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 工作流程

1. 用户在 QQ 发送 `/bind`
2. 机器人返回：`https://bind.nekotc.cn/maimai-bind?token=xxx`
3. 用户打开链接，选择绑定方式：
   - **水鱼查分器**：输入 token → 前端调用 `/maimai/bind/complete` → 完成绑定
   - **落雪查分器**：点击授权 → 跳转落雪 → 授权后回调到 `/oauth/callback` → 后端处理绑定 → 重定向到 `/maimai-bind/success`
4. 绑定成功后，机器人自动发送通知（通过 `lxns_db.add_bind_notification`）

## 注意事项

1. **域名配置**：确保 `maimai_bind_frontend_url` 和 `NEXT_PUBLIC_API_URL` 配置正确
2. **CORS**：如果前后端不在同一域名，需要在 NoneBot FastAPI 中配置 CORS
3. **OAuth 回调**：`LXNS_REDIRECT_URI` 必须在落雪开发者后台注册
4. **自动绑定**：落雪绑定会自动应用，无需用户手动复制授权码（除非找不到对应 QQ ID）

## 故障排查

### 问题：404 找不到页面

- 检查 `maimai_bind_frontend_url` 配置是否正确
- 确认前端服务已启动且可访问

### 问题：OAuth 回调失败

- 检查 `LXNS_REDIRECT_URI` 与 `.env.local` 中的 `NEXT_PUBLIC_OAUTH_CALLBACK_URL` 是否一致
- 确认回调地址已在落雪开发者后台配置

### 问题：CORS 错误

在 NoneBot 的 FastAPI 应用中添加 CORS 中间件：

```python
from fastapi.middleware.cors import CORSMiddleware

app = get_app()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://bind.nekotc.cn"],  # 前端域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```
