<script setup>
import { ref } from 'vue'
import Home from './views/Home.vue'
import RouteDetail from './views/RouteDetail.vue'

const currentView = ref('home')
const selectedProject = ref(null)

const navigateToDetail = (project) => {
  selectedProject.value = project
  currentView.value = 'detail'
}

const backToHome = () => {
  currentView.value = 'home'
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Home v-if="currentView === 'home'" @selectProject="navigateToDetail" />
    <RouteDetail v-else :project="selectedProject" @back="backToHome" />
  </div>
</template>

<style>
/* Global styles */
</style>
