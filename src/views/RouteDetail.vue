<script setup>
import { ref } from 'vue'

const props = defineProps(['project'])
const emit = defineEmits(['back'])

const routeSchemes = [
  {
    id: 1,
    title: '经典全景路线',
    summary: '适合初次打卡，全长约 12km，涵盖所有地标建筑。',
    recommendation: '⭐⭐⭐⭐⭐ 必打卡！最全攻略，出片率极高。',
    timeline: [
      { time: '09:00', task: '东渡邮轮广场站出发' },
      { time: '10:30', task: '和熙楼/樱花谷（打卡樱花山）' },
      { time: '12:00', task: '流光花径（用餐建议：自带干粮）' },
      { time: '14:30', task: '盼归塔（看海绝佳位置）' },
      { time: '16:30', task: '观音山终点/打车回程' }
    ],
    cost: '免费（需提前预约）',
    dining: '建议自带简餐、能量棒及充足饮用水。',
    notes: '全程较长，建议穿着专业徒步鞋，做好防晒。'
  },
  {
    id: 2,
    title: '亲子休闲路线',
    summary: '精选平缓路段，约 5km，适合带娃出行。',
    recommendation: '⭐⭐⭐⭐ 适合全家出动，难度低，趣味多。',
    timeline: [
      { time: '10:00', task: '东渡入口进入' },
      { time: '11:00', task: '气象主题公园（科普互动）' },
      { time: '12:30', task: '和美园（草坪午餐）' },
      { time: '14:00', task: '悠然园（下午茶休息）' },
      { time: '15:30', task: '东渡出口结束' }
    ],
    cost: '人均 30-50 元（零食/水）',
    dining: '和美园附近有草坪可野餐。',
    notes: '准备驱蚊水，带好推车（部分路段有电梯）。'
  },
  {
    id: 3,
    title: '落日摄影路线',
    summary: '专为摄影爱好者设计，精选看海及看日落路段。',
    recommendation: '⭐⭐⭐⭐⭐ 氛围感拉满，夕阳绝美，浪漫至极。',
    timeline: [
      { time: '15:30', task: '万石沧海站进入' },
      { time: '16:00', task: '望湖塔（俯瞰湖景）' },
      { time: '17:30', task: '盼归塔（守候日落）' },
      { time: '18:30', task: '天泉步道广场（夜景）' }
    ],
    cost: '免费',
    dining: '下山后建议前往环岛路附近用餐。',
    notes: '建议携带充电宝，手机电量消耗快。'
  }
]
</script>

<template>
  <div class="bg-white">
    <!-- Navbar -->
    <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <button 
          class="flex items-center text-gray-600 hover:text-primary transition-colors"
          @click="$emit('back')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
          返回
        </button>
        <div class="font-bold text-lg">{{ project?.title || '路线详情' }}</div>
        <div class="w-10"></div> <!-- Spacer -->
      </div>
    </nav>

    <!-- Top Section: Introduction & Images -->
    <header class="max-w-6xl mx-auto px-4 py-12">
      <div class="flex flex-col lg:flex-row gap-12 items-center">
        <div class="flex-1">
          <div class="flex items-center space-x-2 text-primary font-bold text-xs mb-4 uppercase tracking-widest">
            <span class="w-8 h-[1px] bg-primary"></span>
            <span>Recommended for you</span>
          </div>
          <h1 class="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-[1.1]">
            {{ project?.title }}
          </h1>
          <div class="flex flex-wrap gap-3 mb-8">
            <span v-for="tag in project?.tags" :key="tag" class="px-4 py-1.5 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-full">
              #{{ tag }}
            </span>
          </div>
          <p class="text-gray-500 text-lg leading-relaxed mb-8 font-medium">
            厦门山海健康步道串联起厦门岛内的主要山体和水系，全长约 23 公里。沿途风光旖旎，有山有水有海，是厦门市民和游客春季徒步的首选之地。
          </p>
          <div class="flex items-center space-x-8">
            <div class="flex flex-col">
              <span class="text-xs font-bold text-gray-400 uppercase mb-1">Duration</span>
              <span class="text-lg font-black text-gray-900">1 Full Day</span>
            </div>
            <div class="w-[1px] h-10 bg-gray-100"></div>
            <div class="flex flex-col">
              <span class="text-xs font-bold text-gray-400 uppercase mb-1">Difficulty</span>
              <span class="text-lg font-black text-gray-900">Moderate</span>
            </div>
            <div class="w-[1px] h-10 bg-gray-100"></div>
            <div class="flex flex-col">
              <span class="text-xs font-bold text-gray-400 uppercase mb-1">Rating</span>
              <span class="text-lg font-black text-primary">4.9/5.0</span>
            </div>
          </div>
        </div>
        <div class="flex-1 w-full lg:w-auto">
          <div class="relative group cursor-pointer">
            <div class="absolute -inset-4 bg-primary/10 rounded-[2rem] blur-2xl group-hover:bg-primary/20 transition-colors"></div>
            <div class="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl">
              <img :src="project?.cover" :alt="project?.title" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div class="absolute bottom-8 left-8">
                <div class="flex items-center space-x-3">
                  <div class="w-12 h-12 rounded-full border-2 border-white overflow-hidden">
                    <img src="https://i.pravatar.cc/150?u=author" alt="Author" />
                  </div>
                  <div>
                    <div class="text-white font-bold text-sm">Travel Expert</div>
                    <div class="text-white/70 text-xs">Verified Guide</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Bottom Section: 3-Column Route Cards -->
    <section class="bg-gray-50 py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-2xl font-bold mb-2">🗺️ 路线方案推荐</h2>
          <p class="text-gray-500 text-sm">根据您的需求，我们为您规划了三种不同风格的徒步路线</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="scheme in routeSchemes" :key="scheme.id" class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col hover:shadow-lg transition-shadow duration-300">
            <div class="mb-6">
              <h3 class="text-xl font-bold text-gray-900 mb-2 flex items-center">
                <span class="w-2 h-6 bg-primary rounded-full mr-2"></span>
                {{ scheme.title }}
              </h3>
              <p class="text-xs text-gray-500 leading-relaxed">{{ scheme.summary }}</p>
            </div>

            <div class="mb-6">
              <div class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center">
                🌟 推荐理由
              </div>
              <p class="text-sm text-gray-700 bg-gray-50 p-3 rounded-xl italic">
                {{ scheme.recommendation }}
              </p>
            </div>

            <div class="mb-6 flex-grow">
              <div class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
                ⏰ 时间安排
              </div>
              <ul class="space-y-4">
                <li v-for="(item, index) in scheme.timeline" :key="index" class="flex items-start">
                  <span class="text-xs font-bold text-primary mr-3 w-10 shrink-0">{{ item.time }}</span>
                  <div class="relative pl-4 border-l-2 border-primary/20">
                    <div class="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-primary"></div>
                    <span class="text-sm text-gray-600">{{ item.task }}</span>
                  </div>
                </li>
              </ul>
            </div>

            <div class="space-y-4 pt-6 border-t border-gray-100">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <div class="text-[10px] font-bold text-gray-400 mb-1">💰 预计费用</div>
                  <div class="text-sm font-medium">{{ scheme.cost }}</div>
                </div>
                <div>
                  <div class="text-[10px] font-bold text-gray-400 mb-1">🍱 用餐建议</div>
                  <div class="text-sm font-medium">{{ scheme.dining }}</div>
                </div>
              </div>
              <div>
                <div class="text-[10px] font-bold text-gray-400 mb-1">⚠️ 注意事项</div>
                <div class="text-sm text-gray-600 leading-relaxed">
                  {{ scheme.notes }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 text-center text-gray-400 text-sm">
      © 2026 春季徒步旅行指南 · 厦门站
    </footer>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
