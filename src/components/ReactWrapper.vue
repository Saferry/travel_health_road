<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import React from 'react'
import { createRoot } from 'react-dom/client'
import TravelStatus from './TravelStatus.jsx'

const props = defineProps(['status', 'date'])
const rootRef = ref(null)
let reactRoot = null

onMounted(() => {
  if (rootRef.value) {
    reactRoot = createRoot(rootRef.value)
    reactRoot.render(
      React.createElement(TravelStatus, { status: props.status, date: props.date })
    )
  }
})

onUnmounted(() => {
  if (reactRoot) {
    reactRoot.unmount()
  }
})
</script>

<template>
  <div ref="rootRef"></div>
</template>
