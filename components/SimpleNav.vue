<template>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl">Mission Control</a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li>
          <button @click="logout">Logout ({{mainStore.activeUser.name}})</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useMainStore } from '~/store/index'
const mainStore = useMainStore()
const logout = () => {
  mainStore.logout()
  navigateTo('/')
}
</script>
