<template>
  <div class="mb-3" ref="nameRef">
    <label for="launch-name" class="pointer-events-none pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Launch Name</label>
    <input
        v-model="formData.name"
        type="text"
        class="input peer block min-h-[auto] w-full rounded px-3 py-[0.32rem] leading-[1.6] focus:placeholder:opacity-100 peer-focus:text-primary"
        id="launch-name"
        placeholder="Launch Name" />

  </div>
  <div ref="pickerMaxTimeRef" class="mb-3" data-te-toggle-button="false">
    <label for="launch-time" class="pointer-events-none pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Select a time (mm-dd-yyyy, hh:m a, 8-30-2023, 2:00 AM )</label>
    <input
        type="text"
        class="input peer block min-h-[auto] w-full rounded px-3 py-[0.32rem] leading-[1.6] focus:placeholder:opacity-100 peer-focus:text-primary"
        id="launch-time"
        placeholder="8-30-2023, 12:00 PM"
        v-model="formData.launchTime"
    />
  </div>
  <div class="mb-3">
    <label class="pointer-events-none pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Rockets</label>
    <select
        v-model="formData.rocket"
        data-te-select-init
        data-te-select-filter="true"
        data-te-container="#launch-modal"
        data-te-class-form-outline="relative bg-neutral-800 dark:bg-neutral-800 rounded px-3 py-[0.32rem]"
     class="block pt-[0.37rem] py-[0.32rem] rounded w-full input peer-focus:text-primary"
    >
      <option disabled selected value>Select</option>
      <option v-for="rocket in rockets" :value="{ id: rocket.id, ...rocket }" :data-te-select-secondary-text="rocket.company">{{ rocket.name }}</option>
    </select>
  </div>
  <div class="mb-3">
    <label class="pointer-events-none pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">Launch Pad</label>
    <select
        v-model="formData.launchPad"
        data-te-select-init
        data-te-select-filter="true"
        data-te-container="#launch-modal"
        data-te-class-form-outline="relative bg-neutral-800 dark:bg-neutral-800 rounded px-3 py-[0.32rem]"
        class="block pt-[0.37rem] py-[0.32rem] rounded w-full input peer-focus:text-primary"
    >
      <option disabled selected value>Select</option>
      <option v-for="launchPad in launchPads" :value="{id: launchPad.id, ...launchPad }" :data-te-select-secondary-text="launchPad.full_name">{{ launchPad.name }}</option>
    </select>
  </div>
</template>
<script setup lang="ts">
import { Datetimepicker, initTE, Input, Select, Timepicker } from "tw-elements";
import {onMounted, ref, watch} from "vue";

const props = defineProps({
  formData: Object,
})
const pickerMaxTimeRef = ref(null);
onMounted( () => {
  initTE({Datetimepicker, Input, Select, Timepicker})
})

// Grab Data for Rockets
const { data: rockets } = useFetch('https://api.spacexdata.com/v4/rockets', {
  lazy: true
})

// Grab Data for Pads
const { data: launchPads } = useFetch('https://api.spacexdata.com/v4/launchpads', {
  lazy: true
})

</script>
