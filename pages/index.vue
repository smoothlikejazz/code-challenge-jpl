<template>
  <div class="container my-24 mx-auto md:px-6">
    <section class="mb-32 text-center">
      <div class="flex justify-center">
        <div class="max-w-[800px]">
          <h2 class="mb-12 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
            Mission Control Login
          </h2>
          <p class="text-lg text-neutral-500 dark:text-neutral-300">
            Manage flight console
          </p>
        </div>
      </div>
      <ClientOnly>
        <CommonLogin v-model="userName" placeholder="User Name"/>
      </ClientOnly>
      <button class="btn" @click="login">Login</button>
    </section>
  </div>
</template>

<script setup lang="ts" >
import { useMainStore } from '~/store/index'
import {ref} from "vue";

definePageMeta({
  layout: "login",
  middleware: function() {
    const { activeUser } = useMainStore()
    if (activeUser.name) {
      return navigateTo('/dashboard');
    }
  },
});

const mainStore = useMainStore()
const userName = ref("");
function login() {
  mainStore.login({name: userName.value})
  navigateTo('/dashboard')
}

</script>
