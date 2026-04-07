# 🌸 踏春徒步：厦门山海健康步道攻略展示平台

这是一个基于 **Vue 3** 和 **React** 混合架构的旅行攻略展示项目，旨在通过现代化的网页设计展示春季徒步路线方案。

## 🚀 快速开始

### 运行项目
在项目根目录下执行以下命令：
```bash
npm run dev
```
运行成功后，访问终端输出的本地地址（通常为 [http://localhost:5173/](http://localhost:5173/)）。

### 其他命令
- `npm run build`: 构建生产环境版本。
- `npm run preview`: 预览生产环境构建结果。

## 🛠️ 技术栈
- **核心框架**: Vue 3 (主架构) + React (部分动态组件)
- **构建工具**: Vite
- **样式方案**: Tailwind CSS v4 + PostCSS
- **图标/图片**: Unsplash 高清图源

## 📂 项目结构
- `src/views/`: 包含大主页 (Home.vue) 和 详情页 (RouteDetail.vue)。
- `src/components/`: 包含 Vue 组件及 [ReactWrapper.vue](src/components/ReactWrapper.vue)（用于加载 React 组件）。
- `src/components/TravelStatus.jsx`: 使用 React 编写的动态状态组件。

## 📝 路线方案
详情页提供了三种精心设计的路线：
1. **经典全景路线**：涵盖所有地标。
2. **亲子休闲路线**：难度低，适合全家出游。
3. **落日摄影路线**：捕捉最美夕阳时刻。

## 📂 Git 忽略项
项目已配置 [.gitignore](.gitignore)，会自动忽略 `node_modules/`、`dist/`、日志文件以及本地编辑器缓存等，确保仓库整洁。

---
© 2026 春季徒步旅行指南 · 厦门站
