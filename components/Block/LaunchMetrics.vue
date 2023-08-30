<template>
  <div class="flex justify-around">
    <div>
      <h1 class="text-lg">Flight Elapsed Duration</h1>
      <div class="flex" v-if="launch.status === LaunchStatus.InFlight">
        <div class="mr-4">
     <span class="countdown font-mono text-xl">
      M:<span :style="`--value:${launchDuration.minutes};`"></span>
    </span>
        </div>
        <div class="mr-4">
     <span class="countdown font-mono text-xl">
      S:<span :style="`--value:${launchDuration.seconds};`"></span>
    </span>
        </div>
      </div>
      <div v-else>
        Total Flight Duration: {{ config.public.launchDuration }} minutes
      </div>
    </div>
    <div class="flex flex-col items-center">
      <div class="text-lg">Velocity</div>
      <div>{{ launch.metrics?.velocity || 0}}</div>
    </div>
    <div class="flex flex-col items-center">
      <div class="text-lg">Altitude</div>
      <div>{{ launch.metrics?.altitude || 0 }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useMainStore } from '~/store/index'
import { useLaunchStore, LaunchStatus} from '~/store/launch';
import {intervalToDuration} from 'date-fns';
import {watch, ref} from "vue";

const props = defineProps({
  launch: Object,
})
const config = useRuntimeConfig()
const { launch } = toRefs(props)
const mainStore = useMainStore()
const launchStore = useLaunchStore()
const { now } = toRefs(mainStore)


const launchDuration = ref({
  minutes: 0,
  seconds: 0
})

const offsetMultiplier = launch.value.rocket.engines?.thrust_to_weight || 1

// TODO: Move this to store, if this component is not visitied, metrics will not be stored
watch(now, () => {
  if(launch.value.status === LaunchStatus.InFlight) {
    const currentTime = mainStore.now.getTime();
    const duration = intervalToDuration({
      start: new Date(launch.value.launchTime),
      end: currentTime
    })
    const { minutes, seconds} = duration
    launchDuration.value = { minutes, seconds }
    const elapsedSeconds = minutes * 60 + seconds
    // Random velocity and altitude to show metric simulation
    launchStore.updateLaunchMetrics(launch.value.id, {
      velocity: Math.log(elapsedSeconds) * offsetMultiplier,
      altitude: Math.exp(elapsedSeconds) + (offsetMultiplier * elapsedSeconds)
    })
  }
})
</script>
