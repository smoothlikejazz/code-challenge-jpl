<template>
  <div>
    <section>
      <CommonList title="Scheduled Launches" :items="scheduledLaunches" />
      <CommonList title="Queued Active Launches" :items="activeLaunches" />
      <CommonList title="In Flight" :items="inFlightLaunches" />
      <CommonList title="Completed Launches" :items="completedLaunches" />

      <CommonList title="Cancelled Launches" :items="cancelledLaunches" />
    </section>
  </div>

</template>

<script setup lang="ts" >
import { useLaunchStore, LaunchStatus } from '~/store/launch';
import { computed } from 'vue';

// Launch Store
const launchStore = useLaunchStore()

const scheduledLaunches = computed(()=> {
  return launchStore.scheduledLaunches
})
const completedLaunches = computed(()=> {
  return launchStore.completedLaunches
})
const cancelledLaunches = computed(()=> {
  return launchStore.cancelledLaunches
})
const activeLaunches = computed(()=> {
  return launchStore.activeLaunches
})
const inFlightLaunches = computed(()=> {
  return launchStore.inFlightLaunches
})

</script>
