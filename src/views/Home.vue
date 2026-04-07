<script setup>
import ReactWrapper from '../components/ReactWrapper.vue'
const projects = [
  {
    id: 1,
    title: '厦门山海健康步道·春季徒步攻略',
    description: '一张图看明白，最全踏春路线推荐',
    cover: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ['厦门', '徒步', '春季', '小众'],
    date: '2026-04-07',
    status: '火热报名中'
  },
  {
    id: 2,
    title: '鼓浪屿深度一日游',
    description: '避开人流，发现不一样的鼓浪屿',
    cover: 'https://images.unsplash.com/photo-1548689816-c399f954f3d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ['厦门', '文化', '慢生活'],
    date: '2026-04-10',
    status: '即将开始'
  },
  {
    id: 3,
    title: '环岛路骑行指南',
    description: '最美海岸线，吹着海风看日落',
    cover: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ['骑行', '海边', '休闲'],
    date: '2026-04-12',
    status: '已成团'
  }
]

defineEmits(['selectProject'])
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <header class="mb-12 text-center">
      <div class="inline-block px-4 py-1.5 bg-primary/5 rounded-full text-primary text-xs font-bold mb-6 tracking-widest uppercase">
        Spring 2026 Travel
      </div>
      <h1 class="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
        ✨ 春季徒步 <span class="text-primary italic">旅行指南</span>
      </h1>
      <p class="text-gray-400 text-lg font-medium">发现身边的美好，让每一步都充满阳光</p>
    </header>

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
