<template>
  <div class="border-r-4 p-4 border-solid border-sky-500 hover:border-dotted">
    <h1>{{ title }}</h1>
    <div v-if="items.length">
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full text-left text-sm font-light">
                <thead class="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" class="px-6 py-4">#Id</th>
                  <th scope="col" class="px-6 py-4">Name</th>
                  <th scope="col" class="px-6 py-4">Rocket</th>
                  <th scope="col" class="px-6 py-4">Launch Pad</th>
                  <th scope="col" class="px-6 py-4">Launch Time</th>
                  <th scope="col" class="px-6 py-4">Status</th>
                  <th scope="col" class="px-6 py-4">Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in items" class="border-b dark:border-neutral-500">
                  <td class="whitespace-nowrap px-6 py-4 font-medium text-blue"><NuxtLink class="truncate text-blue" :to="`/dashboard/launch/${item.id}`">{{  item.id }}</NuxtLink></td>
                  <td class="whitespace-nowrap px-6 py-4">{{  item.name }}</td>
                  <td class="whitespace-nowrap px-6 py-4">{{  item.rocket.name }}</td>
                  <td class="whitespace-nowrap px-6 py-4">{{  item.launchPad.name }}</td>
                  <td class="whitespace-nowrap px-6 py-4">{{  item.launchTime }}</td>
                  <td class="whitespace-nowrap px-6 py-4"> {{  item.status }}</td>
                  <td class="whitespace-nowrap px-6 py-4"> <button v-if="item.status !== LaunchStatus.Cancelled && item.status !== LaunchStatus.Completed" class="btn bg-danger text-white" @click="abortLaunch(item.id)">Abort</button></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      No data.
    </div>
  </div>
</template>
<script setup>
import { useLaunchStore, LaunchStatus } from '~/store/launch';
const props = defineProps({
  items: Array,
  title: String
})
const { items } = toRefs(props)

const launchStore = useLaunchStore()
function abortLaunch(id) {
  launchStore.abortLaunch(id)
}
</script>
