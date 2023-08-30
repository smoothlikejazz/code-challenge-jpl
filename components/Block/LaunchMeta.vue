<template>
  <div class="mb-3">
    <div><h3 class="text-lg">Status: {{ launch.status }}</h3></div>
    <div><h3 class="text-lg">Rocket</h3></div>
    <ul class="list-disc ml-6">
      <li>Name: {{ launch.rocket.name }}</li>
      <li>Country: {{ launch.rocket.country }}</li>
      <li>Description: {{ launch.rocket.description }}</li>
    </ul>
  </div>
  <div>
    <div><h3 class="text-lg">Launch Pad</h3></div>
    <ul class="list-disc ml-6">
      <li>Name: {{ launch.launchPad.full_name }}</li>
      <li>Status: {{ launch.launchPad.status }}</li>
      <li>Details: {{ launch.launchPad.details }}</li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  launch: Object,
})
</script>
