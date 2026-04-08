<script setup>
import { ref, computed } from 'vue'
import ReactWrapper from '../components/ReactWrapper.vue'
import initialProjects from '../data/projects.json'

const emit = defineEmits(['selectProject'])

// 响应式项目列表，初始从 JSON 加载
const projects = ref([...initialProjects])

// 搜索功能
const searchQuery = ref('')
const showDropdown = ref(false)

// 模拟网络热门景点数据库
const mockOnlineSpots = [
  {
    title: '杭州西湖·断桥残雪',
    description: '欲把西湖比西子，淡妆浓抹总相宜。春日西湖，柳浪闻莺。',
    cover: 'https://images.unsplash.com/photo-1599639668324-42795c029230?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ['杭州', '古风', '浪漫'],
    status: '正在直播',
    guideId: 'hangzhou-xihu'
  },
  {
    title: '武夷山·九曲溪漂流',
    description: '碧水丹山，人间仙境。春游武夷，感受大自然的鬼斧神工。',
    cover: 'https://images.unsplash.com/photo-1523733593134-a14507e9ba9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ['福建', '山水', '康养'],
    status: '推荐路线',
    guideId: 'wuyishan'
  },
  {
    title: '黄山·云海日出',
    description: '五岳归来不看山，黄山归来不看岳。登高望远，春意盎然。',
    cover: 'https://images.unsplash.com/photo-1541848756149-e3843fcbbde0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ['安徽', '登山', '壮丽'],
    status: '即将截止',
    guideId: 'huangshan'
  },
  {
    title: '张家界·天门山索道',
    description: '穿行云雾，如入仙境。玻璃栈道挑战胆量。',
    cover: 'https://images.unsplash.com/photo-1541848756149-e3843fcbbde0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ['湖南', '奇观', '冒险'],
    status: '热门推荐',
    guideId: 'zhangjiajie'
  },
  {
    title: '桂林·漓江竹筏',
    description: '桂林山水甲天下，漓江倒影美如画。',
    cover: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ['广西', '山水', '休闲'],
    status: '火热报名',
    guideId: 'guilin'
  }
]

const filteredSpots = computed(() => {
  if (!searchQuery.value) return []
  return mockOnlineSpots.filter(spot => 
    spot.title.includes(searchQuery.value) && 
    !projects.value.some(p => p.title === spot.title)
  )
})

const isSaving = ref(false)
const savingSpotId = ref(null)

const addSpotToLocal = async (spot) => {
  isSaving.value = true
  savingSpotId.value = spot.guideId
  try {
    const newSpot = {
      ...spot,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    }
    
    // 1. 调用本地 Vite API 写入文件 (此过程包含 AI 调用)
    const response = await fetch('/api/save-spot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSpot)
    })
    
    if (response.ok) {
      // 2. 更新本地状态（立即反馈）
      projects.value.push(newSpot)
      searchQuery.value = ''
      showDropdown.value = false
      alert(`✨【${spot.title}】攻略已由 AI 生成并成功同步至本地！`)
    }
  } catch (error) {
    console.error('Save failed:', error)
    alert('同步失败，请检查 AI 模型服务（如 LM Studio）是否已启动并在监听 1234 端口。')
  } finally {
    isSaving.value = false
    savingSpotId.value = null
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8 relative" @click="showDropdown = false">
    <!-- Header with Search -->
    <header class="mb-12 text-center relative">
      <div class="absolute top-0 right-0 w-64 hidden md:block" @click.stop>
        <div class="relative group">
          <input 
            v-model="searchQuery"
            @focus="showDropdown = true"
            type="text" 
            placeholder="搜寻热门景点..." 
            class="w-full px-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
          />
          <div v-if="showDropdown && filteredSpots.length > 0" class="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-300">
            <div 
              v-for="spot in filteredSpots" 
              :key="spot.title"
              class="p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
            >
              <div class="flex items-center gap-3 mb-2">
                <img :src="spot.cover" class="w-12 h-12 rounded-lg object-cover shadow-sm" />
                <div class="text-left">
                  <div class="text-xs font-bold text-gray-900 line-clamp-1">{{ spot.title }}</div>
                  <div class="text-[10px] text-gray-400">发现自网络热门</div>
                </div>
              </div>
              <button 
                @click="addSpotToLocal(spot)"
                :disabled="isSaving"
                class="w-full py-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <template v-if="isSaving && savingSpotId === spot.guideId">
                  <svg class="animate-spin h-3 w-3 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  AI 正在生成中...
                </template>
                <template v-else>
                  + 一键添加到本地
                </template>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="inline-block px-4 py-1.5 bg-primary/5 rounded-full text-primary text-xs font-bold mb-6 tracking-widest uppercase">
        Spring 2026 Travel
      </div>
      <h1 class="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
        ✨ 春季徒步 <span class="text-primary italic">旅行指南</span>
      </h1>
      <p class="text-gray-400 text-lg font-medium">发现身边的美好，让每一步都充满阳光</p>
    </header>

    <!-- Project List -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div 
        v-for="project in projects" 
        :key="project.id"
        class="travel-card cursor-pointer group flex flex-col h-full bg-white border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-3xl"
        @click="$emit('selectProject', project)"
      >
        <div class="relative h-72 overflow-hidden rounded-t-3xl">
          <img 
            :src="project.cover" 
            :alt="project.title"
            class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div class="absolute top-6 left-6 flex flex-wrap gap-2">
            <span 
              v-for="tag in project.tags" 
              class="px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-[10px] font-bold uppercase tracking-wider rounded-full text-white shadow-lg"
            >
              {{ tag }}
            </span>
          </div>
          <div class="absolute bottom-6 left-6 right-6 flex items-center justify-between">
            <ReactWrapper :status="project.status" :date="project.date" />
          </div>
        </div>
        <div class="p-8 flex-grow">
          <h2 class="text-2xl font-black mb-4 group-hover:text-primary transition-colors leading-tight">{{ project.title }}</h2>
          <p class="text-gray-500 text-sm line-clamp-2 leading-relaxed font-medium">
            {{ project.description }}
          </p>
          <div class="mt-8 flex items-center justify-between border-t border-gray-50 pt-6">
            <div class="flex items-center space-x-2 text-primary font-black text-sm uppercase tracking-widest">
              <span>EXPLORE NOW</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="flex -space-x-3">
              <img v-for="i in 3" :key="i" :src="`https://i.pravatar.cc/150?u=${project.id}${i}`" class="w-8 h-8 rounded-full border-2 border-white object-cover" />
              <div class="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-400">
                +12
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
