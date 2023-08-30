<template>
  <div class="flex">
    <div class="mr-4" v-if="!isLaunchActive">
     <span class="countdown font-mono text-6xl">
      H:<span :style="`--value:${timeToLaunch.hours};`"></span>
    </span>
    </div>
    <div class="mr-4" :class="`${isLaunchActive && 'text-red-700'}`">
     <span class="countdown font-mono text-6xl">
      M:<span :style="`--value:${timeToLaunch.minutes};`"></span>
    </span>
    </div>
    <div class="mr-4" :class="`${isLaunchActive && 'text-red-700'}`">
     <span class="countdown font-mono text-6xl">
      S:<span :style="`--value:${timeToLaunch.seconds};`"></span>
    </span>
    </div>
  </div>
  <div>
    Launch Scheduled For: {{ launch.launchTime }}
  </div>
</template>
<script lang="ts" setup>
import { useMainStore } from '~/store/index'
import {computed, watch, ref} from "vue";
import {LaunchStatus} from "~/store/launch";

const props = defineProps({
  launch: Object,
})
const { launch } = toRefs(props)

const mainStore = useMainStore()
const nowTime = computed(()=> {
  const { now } = mainStore
  return now.value
});

const isLaunchActive = computed(()=> {
  return launch.value.status === LaunchStatus.Active
});

const countDownDate = new Date(launch.value.launchTime).getTime();
const timeToLaunch = ref({
  hours: 0,
  minutes: 0,
  seconds: 0
})
const { now } = toRefs(mainStore)
watch(now, () => {
  const distance = countDownDate - mainStore.now.getTime();
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  timeToLaunch.value = {
    hours, minutes, seconds
  }
})
</script>
