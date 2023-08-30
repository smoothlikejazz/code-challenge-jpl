<template>
  Launch Details stub {{ route.params.id }}
</template>
<script setup lang="ts">
const route = useRoute();
console.log("route id", route.params.id)
</script>
