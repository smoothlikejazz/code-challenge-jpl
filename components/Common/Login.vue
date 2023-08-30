<template>
  <div class="relative mb-3 mt-3">
    <input
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        type="text"
        class="input input-bordered input-accent w-full max-w-xs"
        :placeholder="placeholder" />
  </div>
</template>
<script setup lang="ts">
import {onMounted } from "vue";
const emit = defineEmits(["update:modelValue"]);

onMounted(async () => {
  // dynamic import to try and avoid hydration mismatch but still doesn't work with this library
  const {Input, initTE} = async () => { await import("tw-elements")}
  initTE({ Input });
});

const props = defineProps({
  modelValue: String,
  placeholder: String,
});
</script>
