# 多阶段构建 Dockerfile

# 第一阶段：构建应用
FROM node:22-alpine AS builder

# 设置工作目录
WORKDIR /app

# 安装 pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装依赖（跳过 preinstall 和 prepare 脚本）
RUN pnpm install --frozen-lockfile --ignore-scripts

# 复制源代码
COPY . .

# 构建应用
RUN pnpm run build

# 第二阶段：生产环境
FROM nginx:alpine

# 复制自定义 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 从构建阶段复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
