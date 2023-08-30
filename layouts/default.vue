<template>
  <div>
    <SimpleNav />
    <slot />
  </div>
</template>
<script setup lang="ts">
import SimpleNav from "~/components/SimpleNav.vue";
import { useMainStore } from '~/store/index'
import { onMounted } from "vue";

onMounted(() => {
  const mainStore = useMainStore()
  console.log('mainStore.startPollTimer')
  mainStore.startPollTimer()
  window.addEventListener('beforeunload', function(event) {
    mainStore.clearTimer()
    console.log('mainStore.clearTimer')
  })
})
</script>
