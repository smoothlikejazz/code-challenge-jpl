<template>
  <div>
    <div>Active User: {{ name }}</div>

    <div v-if="mainStore.hasLocation">
      <div>Your Coordinates: ({{ mainStore.activeUser.location.latitude }}, {{ mainStore.activeUser.location.longitude }})</div>
      <div>Your distance from launch site: {{ userDistanceToSite }}</div>
    </div>
    <div v-else>
      <button class="btn btn-primary mt-2" @click="getLocation">Get Location</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted } from "vue";
import distance, { kmToMiles } from "~/utils/distance";
import { useMainStore } from '~/store/index'

const props = defineProps({
  launchPad: Object,
})
const { launchPad } = toRefs(props)
const mainStore = useMainStore()
const name = computed(()=> {
  const { activeUser } = mainStore
  return activeUser.name
});

const userDistanceToSite = computed(()=> {
  const { activeUser: {location: { latitude, longitude}} } = mainStore
  const kmDist = distance(latitude, longitude, launchPad.value.latitude, launchPad.value.longitude)
  return `${kmToMiles(kmDist)} mi`
});

onMounted(() => {
  if (!navigator.geolocation) {
     console.log("Geolocation is not supported by your browser")
  } else {
    getLocation();
  }
})

function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log('user position success', position)
  mainStore.updateUserLocation({
    latitude,
    longitude
  })
}
function error() {
  console.log('unable to get coordinates')
}
const getLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser")
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}
</script>
