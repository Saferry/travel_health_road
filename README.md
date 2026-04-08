# 🌸 travel_health_road_2.0：厦门山海健康步道攻略展示平台

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
- **内容管理**: Markdown (gray-matter + markdown-it)
- **样式方案**: Tailwind CSS v4 + PostCSS
- **图片/数据**: Unsplash 高清图源 + 本地 JSON/MD 驱动

## 🌟 核心功能
1. **数据驱动**: 主页列表由 [projects.json](src/data/projects.json) 驱动，详情页文案与结构化数据由 [guides/](src/data/guides/) 目录下的 Markdown 文件驱动。
2. **景点发现系统**: 主页右上角内置搜索框，支持从“模拟网络数据库”发现热门景点。
3. **一键同步本地**: 发现新景点后，点击“一键添加”即可通过自定义 Vite 插件将数据实时写入本地磁盘，自动生成卡片与攻略模版。
4. **Markdown 渲染**: 详情页支持 Frontmatter 解析（读取路线方案）和 Markdown 正文渲染（展示景点介绍）。

## 📂 项目结构
- `src/config/ai.config.js`: AI 生成功能配置文件。
- `src/data/projects.json`: 存储项目列表元数据。
- `src/data/guides/`: 存储每个景点的 Markdown 攻略文件（包含 YAML 路线数据）。
- `src/views/`: 包含大主页 (Home.vue) 和 详情页 (RouteDetail.vue)。
- `src/components/`: 包含 Vue 组件及 [ReactWrapper.vue](src/components/ReactWrapper.vue)。
- `vite.config.js`: 包含了自定义的本地文件读写 API 逻辑及 AI 预留接口。

## 🤖 AI 功能配置 (实验室)
项目已预留 AI 自动生成攻略的接口，支持在线模型（如 OpenAI）和本地模型（如 Ollama）。
- **配置路径**: [src/config/ai.config.js](src/config/ai.config.js)
- **启用方法**: 将 `enabled` 字段设为 `true`。
- **工作原理**: 启用后，系统在添加景点时会优先尝试调用 AI 生成定制化文案，若调用失败或未启用，则自动回退到内置的专业攻略模版。

## 📝 路线方案
详情页提供了三种精心设计的路线：
1. **经典全景路线**：涵盖所有地标。
2. **亲子休闲路线**：难度低，适合全家出游。
3. **落日摄影路线**：捕捉最美夕阳时刻。

## 📂 Git 忽略项
项目已配置 [.gitignore](.gitignore)，会自动忽略 `node_modules/`、`dist/`、日志文件以及本地编辑器缓存等，确保仓库整洁。

---
© 2026 春季徒步旅行指南 · 厦门站
