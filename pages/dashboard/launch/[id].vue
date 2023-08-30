<template>
  <header>
    <h1 class="text-center text-2xl">You are viewing launch console: {{ launchItem.name }}</h1>
  </header>
  <div ref="launchDetailsContainer">
    <section class="flex items-center w-full justify-between p-6">
      <NuxtLink class="btn" to="/dashboard">&lt; Back</NuxtLink>
      <button v-if="isScheduledLaunch" class="btn bg-red-600 text-white" @click="cancelLaunch">Cancel Launch</button>
      <button class="btn" @click="toggleFullScreen">Fullscreen</button>
    </section>

    <section class="flex" v-if="isScheduledLaunch">
      <FullScreenBlock title="Time Until Launch" class="w-full">
        <BlockCountDown :launch="launchItem" />
      </FullScreenBlock>
    </section>

    <section class="flex">
      <FullScreenBlock title="Weather" class="w-1/3">
        <BlockWeather :launchPad="launchItem.launchPad" :launch-time="launchItem.launchTime" />
      </FullScreenBlock>
      <FullScreenBlock title="User Information" class="w-1/3">
        <BlockUser :launchPad="launchItem.launchPad" />
      </FullScreenBlock>
      <FullScreenBlock title="Launch Information" class="w-1/3">
        <BlockLaunchMeta :launch="launchItem" />
      </FullScreenBlock>
    </section>

    <section class="flex">
      <FullScreenBlock title="Launch Information" class="w-full">
        <template v-if="isInFlight || completedLaunch" >
          <BlockLaunchMetrics :launch="launchItem" />
        </template>
        <div v-if="pendingLaunch">
          Launch is not in flight. Metrics will show here when the launch sequence has been initiated.
        </div>
      </FullScreenBlock>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { useLaunchStore, LaunchStatus } from '~/store/launch';
import { computed, ref } from "vue";
import FullScreenBlock from "~/components/Common/FullScreenBlock.vue";

const route = useRoute();
// setup ref for the full screen element reference
const launchDetailsContainer = ref(null);
const launchStore = useLaunchStore();
const launchItem = ref(launchStore.getLaunchById(route.params.id));

// computed
const isScheduledLaunch = computed(()=> {
  return launchItem.value.status === LaunchStatus.Scheduled || launchItem.value.status === LaunchStatus.Active
});
const isInFlight = computed(()=> {
  return launchItem.value.status === LaunchStatus.InFlight
});
const completedLaunch = computed(()=> {
  return launchItem.value.status === LaunchStatus.Completed
});
const pendingLaunch = computed(()=> {
  return launchItem.value.status === LaunchStatus.Scheduled || launchItem.value.status === LaunchStatus.Active
});


const toggleFullScreen = () => {
  launchDetailsContainer.value.requestFullscreen()
}

const cancelLaunch = () => {
  launchStore.abortLaunch(route.params.id)
  navigateTo('/dashboard');
}
</script>
