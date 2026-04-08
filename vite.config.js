import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { aiConfig } from './src/config/ai.config.js'

// 模拟调用大模型 API (预留接口)
const callAiApi = async (spot) => {
  const config = aiConfig.type === 'online' ? aiConfig.online : aiConfig.local;
  const prompt = aiConfig.promptTemplate(spot.title, spot.description);
  
  console.log(`[AI Syncing] Calling ${aiConfig.type} model (${config.model}) for ${spot.title}...`);
  
  try {
    const response = await fetch(`${config.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey || 'not-needed'}`
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          { role: 'system', content: '你是一个专业的旅行规划师，擅长编写精美的旅游攻略，并输出结构化的 YAML 和 Markdown。' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`AI API responded with status ${response.status}`);
    }

    const data = await response.json();
    let content = data.choices[0].message.content;
    
    // 1. 清理代码块包裹
    content = content.replace(/```(markdown|yaml|md)?\n/g, '').replace(/```/g, '').trim();

    // 2. 自动补全缺失的 Frontmatter 分隔符
    if (!content.startsWith('---')) {
      content = '---\n' + content;
    }
    
    // 检查是否只有一个 ---（即 AI 漏掉了结尾的 ---）
    const parts = content.split('---');
    if (parts.length === 2) {
      // 只有一个分隔符，尝试在 Markdown 标题前插入第二个分隔符
      content = content.replace(/\n# /, '\n---\n\n# ');
    }

    return content;
  } catch (error) {
    console.error(`[AI Error] Failed to call ${aiConfig.type} model:`, error.message);
    return null; // 返回 null 触发 fallback 逻辑
  }
}

// 自定义 Vite 插件：处理本地文件读写
const travelDataPlugin = () => {
  return {
    name: 'vite-plugin-travel-data',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.method === 'POST' && req.url === '/api/save-spot') {
          let body = ''
          req.on('data', chunk => {
            body += chunk.toString()
          })
          req.on('end', async () => {
            try {
              const spot = JSON.parse(body)
              const projectsPath = path.resolve(__dirname, 'src/data/projects.json')
              const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'))
              
              // 1. 更新 projects.json
              projects.push(spot)
              fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2))
              
              // 2. 尝试调用 AI 或使用预设模板
              let mdContent = '';
              
              if (aiConfig.enabled) {
                const aiResult = await callAiApi(spot);
                if (aiResult) {
                  mdContent = aiResult;
                }
              }

              // 如果 AI 未启用或调用失败，回退到现有的专业模版逻辑
              if (!mdContent) {
                mdContent = `---
routeSchemes:
  - id: 1
    title: '经典打卡路线'
    summary: '涵盖 ${spot.title} 最具代表性的核心景观。'
    recommendation: '⭐⭐⭐⭐⭐ 初次到访必选，不留遗憾。'
    timeline:
      - { time: '09:00', task: '抵达 ${spot.title} 正门' }
      - { time: '10:30', task: '核心地标摄影' }
      - { time: '12:00', task: '当地特色午餐' }
      - { time: '14:30', task: '全景视角俯瞰' }
    cost: '人均 100-200 元'
    dining: '推荐尝试老字号餐厅'
    notes: '建议提前预约，避开周末高峰。'
  - id: 2
    title: '深度人文路线'
    summary: '避开人群，深入探索 ${spot.title} 背后的故事。'
    recommendation: '⭐⭐⭐⭐ 适合喜欢安静、深度游的朋友。'
    timeline:
      - { time: '10:00', task: '小众入口进入' }
      - { time: '11:30', task: '历史建筑参观' }
      - { time: '15:00', task: '特色下午茶' }
    cost: '人均 50-100 元'
    dining: '巷弄里的隐秘小吃'
    notes: '部分路段较偏，请结伴而行。'
  - id: 3
    title: '落日浪漫路线'
    summary: '在 ${spot.title} 守候最美夕阳时刻。'
    recommendation: '⭐⭐⭐⭐⭐ 极致浪漫，氛围感拉满。'
    timeline:
      - { time: '16:00', task: '观景点就位' }
      - { time: '17:30', task: '落日晚霞摄影' }
      - { time: '19:00', task: '城市灯光夜景' }
    cost: '免费'
    dining: '周边景观餐厅'
    notes: '带好相机，手机电量充满。'
---

# ${spot.title}

这是为您自动生成的 ${spot.title} 深度旅游攻略。

## 📍 景点简介
${spot.description}

## 🌟 推荐理由
- **自然风光**：这里的每一帧都是大片。
- **人文历史**：感受岁月留下的痕迹。
- **交通便捷**：公共交通直达，说走就走。

## 💡 游玩贴心建议
- **最佳时间**：建议在春秋两季到访。
- **穿搭建议**：建议穿着浅色系服装，更易出片。
- **必备物品**：充电宝、防晒霜、一双舒适的鞋子。`;
              }

              const guidePath = path.resolve(__dirname, `src/data/guides/${spot.guideId}.md`)
              fs.writeFileSync(guidePath, mdContent)
              
              res.statusCode = 200
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true, message: 'Spot saved successfully!' }))
            } catch (error) {
              res.statusCode = 500
              res.end(JSON.stringify({ success: false, message: error.message }))
            }
          })
        } else {
          next()
        }
      })
    }
  }
}

export default defineConfig({
  base: '/travel_health_road/',
  plugins: [
    vue(),
    react(),
    travelDataPlugin()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
