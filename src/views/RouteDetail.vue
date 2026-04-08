<script setup>
import { ref, onMounted, watch } from 'vue'
import MarkdownIt from 'markdown-it'
import matter from 'gray-matter'
import { Buffer } from 'buffer'

// 解决 gray-matter 在浏览器环境下的兼容性问题
if (typeof window !== 'undefined' && !window.Buffer) {
  window.Buffer = Buffer
}

const props = defineProps(['project'])
const emit = defineEmits(['back'])

const md = new MarkdownIt()
const guideContent = ref('')
const routeSchemes = ref([])
const isLoading = ref(false)

const loadContent = async () => {
  if (!props.project?.guideId) return
  
  isLoading.value = true
  try {
    const response = await fetch(`/src/data/guides/${props.project.guideId}.md`)
    if (response.ok) {
      const rawText = await response.text()
      // 使用 gray-matter 解析 Frontmatter
      const { data, content } = matter(rawText)
      
      routeSchemes.value = data.routeSchemes || []
      guideContent.value = md.render(content)
    } else {
      guideContent.value = '<p class="text-gray-400 italic">暂无详细攻略内容...</p>'
      routeSchemes.value = []
    }
  } catch (error) {
    console.error('Failed to load content:', error)
    guideContent.value = '<p class="text-red-400">内容加载失败，请检查数据文件。</p>'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadContent)
watch(() => props.project, loadContent)

</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Navbar -->
    <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <button 
          class="flex items-center text-gray-600 hover:text-primary transition-colors font-bold text-sm"
          @click="$emit('back')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
          BACK
        </button>
        <div class="font-black text-gray-900 tracking-tighter">{{ project?.title }}</div>
        <div class="w-10"></div>
      </div>
    </nav>

    <!-- Top Section: Introduction & Images -->
    <header class="max-w-6xl mx-auto px-4 py-12 border-b border-gray-50">
      <div class="flex flex-col lg:flex-row gap-12 items-start">
        <div class="flex-1">
          <div class="flex items-center space-x-2 text-primary font-bold text-xs mb-4 uppercase tracking-widest">
            <span class="w-8 h-[1px] bg-primary"></span>
            <span>Recommended for you</span>
          </div>
          <h1 class="text-4xl lg:text-5xl font-black text-gray-900 mb-8 leading-[1.1]">
            {{ project?.title }}
          </h1>
          
          <!-- Markdown Content Rendered Here -->
          <div class="prose prose-green max-w-none mb-8 guide-content" v-html="guideContent"></div>

          <div class="flex items-center space-x-8 pt-8 border-t border-gray-50">
            <div class="flex flex-col">
              <span class="text-[10px] font-bold text-gray-400 uppercase mb-1">Duration</span>
              <span class="text-lg font-black text-gray-900">1 Full Day</span>
            </div>
            <div class="w-[1px] h-10 bg-gray-100"></div>
            <div class="flex flex-col">
              <span class="text-[10px] font-bold text-gray-400 uppercase mb-1">Difficulty</span>
              <span class="text-lg font-black text-gray-900">Moderate</span>
            </div>
            <div class="w-[1px] h-10 bg-gray-100"></div>
            <div class="flex flex-col">
              <span class="text-[10px] font-bold text-gray-400 uppercase mb-1">Rating</span>
              <span class="text-lg font-black text-primary">4.9/5.0</span>
            </div>
          </div>
        </div>
        
        <div class="flex-1 w-full lg:w-auto sticky top-24">
          <div class="relative group">
            <div class="absolute -inset-4 bg-primary/10 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div class="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
              <img :src="project?.cover" :alt="project?.title" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div class="absolute bottom-8 left-8 right-8">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                      <img src="https://i.pravatar.cc/150?u=author" alt="Author" />
                    </div>
                    <div>
                      <div class="text-white font-bold text-xs">Travel Expert</div>
                      <div class="text-white/70 text-[10px]">Verified Guide</div>
                    </div>
                  </div>
                  <button class="bg-white/20 backdrop-blur-md border border-white/30 text-white p-2 rounded-full hover:bg-white hover:text-primary transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Bottom Section: 3-Column Route Cards -->
    <section class="bg-gray-50/50 py-20 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-black mb-4 tracking-tight">🗺️ 路线方案推荐</h2>
          <p class="text-gray-400 text-sm font-medium">根据您的需求，我们为您规划了三种不同风格的徒步路线</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="scheme in routeSchemes" :key="scheme.id" class="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
            <div class="mb-8">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-black text-gray-900 tracking-tight">{{ scheme.title }}</h3>
                <span class="text-primary bg-primary/5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Plan {{ scheme.id }}</span>
              </div>
              <p class="text-xs text-gray-400 leading-relaxed font-medium">{{ scheme.summary }}</p>
            </div>

            <div class="mb-8">
              <div class="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4">Highlights</div>
              <p class="text-sm text-gray-700 bg-gray-50 p-4 rounded-2xl italic leading-relaxed border-l-4 border-primary/20">
                {{ scheme.recommendation }}
              </p>
            </div>

            <div class="mb-8 flex-grow">
              <div class="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-6">Timeline</div>
              <ul class="space-y-6">
                <li v-for="(item, index) in scheme.timeline" :key="index" class="flex items-start group">
                  <span class="text-[10px] font-black text-primary mr-4 w-12 shrink-0 pt-0.5 group-hover:scale-110 transition-transform">{{ item.time }}</span>
                  <div class="relative pl-6 border-l-2 border-gray-100 group-last:border-transparent">
                    <div class="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-primary ring-4 ring-primary/5"></div>
                    <span class="text-sm text-gray-600 font-medium group-hover:text-gray-900 transition-colors">{{ item.task }}</span>
                  </div>
                </li>
              </ul>
            </div>

            <div class="space-y-5 pt-8 border-t border-gray-50 mt-auto">
              <div class="grid grid-cols-2 gap-6">
                <div>
                  <div class="text-[9px] font-black text-gray-300 uppercase mb-2 tracking-widest">Est. Cost</div>
                  <div class="text-sm font-black text-gray-900">{{ scheme.cost }}</div>
                </div>
                <div>
                  <div class="text-[9px] font-black text-gray-300 uppercase mb-2 tracking-widest">Dining</div>
                  <div class="text-sm font-black text-gray-900">{{ scheme.dining }}</div>
                </div>
              </div>
              <div>
                <div class="text-[9px] font-black text-gray-300 uppercase mb-2 tracking-widest">Pro Tips</div>
                <div class="text-sm text-gray-500 leading-relaxed font-medium">
                  {{ scheme.notes }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-16 text-center border-t border-gray-50 bg-gray-50/20">
      <div class="text-2xl font-black text-gray-200 mb-4 tracking-tighter">TRAVEL GUIDE 2026</div>
      <p class="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em]">© 2026 春季徒步旅行指南 · 厦门站</p>
    </footer>
  </div>
</template>

<style scoped>
@reference "../style.css";

.guide-content :deep(h2) {
  @apply text-xl font-black text-gray-900 mt-8 mb-4 tracking-tight;
}
.guide-content :deep(p) {
  @apply text-gray-500 leading-loose mb-4 font-medium;
}
.guide-content :deep(ul) {
  @apply list-disc list-inside space-y-2 mb-6 text-gray-500 font-medium;
}
.guide-content :deep(li) {
  @apply pl-2;
}
.guide-content :deep(strong) {
  @apply text-gray-900 font-black;
}
</style>
