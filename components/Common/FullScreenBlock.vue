<template>
  <div v-bind="$attrs" class="bg-gray-600 rounded-md my-8 mx-2">
    <div class="flex justify-between px-3 pb-8 pt-2">
      <div>
        <h2 class="text-lg">{{ title }}</h2>
      </div>
      <div @click="toggleFullScreen" class="align-middle justify-center p-2 cursor-pointer">
        <svg class="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
          <path d="M17 0h-5.768a1 1 0 1 0 0 2h3.354L8.4 8.182A1.003 1.003 0 1 0 9.818 9.6L16 3.414v3.354a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1Z"></path>
          <path d="m14.258 7.985-3.025 3.025A3 3 0 1 1 6.99 6.768l3.026-3.026A3.01 3.01 0 0 1 8.411 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V9.589a3.011 3.011 0 0 1-1.742-1.604Z"></path>
        </svg>
      </div>
    </div>
    <div ref="container" class="px-3 pb-3">
      <ClientOnly>
        <slot />
      </ClientOnly>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {ref} from "vue";

const props = defineProps({
  title: String,
});
const { title } = toRefs(props)
const container = ref(null);
const toggleFullScreen = () => {
  container.value.requestFullscreen()
}
</script>
