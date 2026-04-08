/**
 * AI 攻略生成配置文件
 */
export const aiConfig = {
  // 是否启用 AI 生成功能 (true: 尝试调用 AI, false: 使用预设模板)
  enabled: true,

  // 模型类型: 'online' (在线 API, 如 OpenAI/Gemini), 'local' (本地模型, 如 Ollama/LM Studio)
  type: 'local',

  // 在线模型配置
  online: {
    provider: 'openai', // openai, google, anthropic, etc.
    apiKey: 'YOUR_API_KEY_HERE',
    model: 'gpt-4o-mini',
    baseUrl: 'https://api.openai.com/v1',
  },

  // 本地模型配置 (例如 Ollama)
  local: {
    provider: 'lmstudio',
    baseUrl: 'http://127.0.0.1:1234/v1',
    model: 'qwen2.5-14b-instruct-1m',
  },

  // 提示词模版 (Prompt)
  promptTemplate: (spotName, description) => `
    你是一个专业的旅行规划师。请为景点【${spotName}】生成一份详细的旅游攻略。
    描述信息：${description}
    
    ### 重要格式要求 ###
    必须严格按照以下顺序输出内容，不要包含任何多余的解释文字：
    
    1. 必须以三个短横线 "---" 开头。
    2. 输出 YAML 格式的路线数据 (routeSchemes)，包含 3 个方案。
    3. 每个方案必须包含字段：id (1, 2, 3), title, summary, recommendation, timeline (由 time 和 task 对象组成的数组), cost, dining, notes。
    4. 必须以三个短横线 "---" 结束 YAML 部分。
    5. 随后输出 Markdown 格式的景点攻略正文（包含 ## 景点介绍、## 推荐理由、## 游玩贴心建议）。
    
    示例结构：
    ---
    routeSchemes:
      - id: 1
        title: ...
        ...
    ---
    # 景点名称
    ...
  `
};
