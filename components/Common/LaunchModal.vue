<template>
  <div>
    <button
        type="button"
        class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        data-te-toggle="modal"
        data-te-target="#launch-modal"
        data-te-ripple-init
        data-te-ripple-color="light">
      Create Launch
    </button>
    <div
        data-te-modal-init
        class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="launch-modal"
        ref="modalRef"
        tabindex="-1"
        aria-labelledby="launchModalLabel"
        aria-hidden="true">
      <div
          data-te-modal-dialog-ref
          class="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]">
        <div
            class="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
          <div
              class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
            <h5
                class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                id="launchModalLabel">
              Create Launch
            </h5>
            <button
                type="button"
                class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-modal-dismiss
                aria-label="Close">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-6 w-6">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="relative flex-auto p-4" data-te-modal-body-ref>
            <CommonLaunchForm :formData="formData" />
          </div>
          <div
              class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
            <button
                type="button"
                class="inline-block rounded bg-neutral px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                data-te-modal-dismiss
                data-te-ripple-init
                data-te-ripple-color="light">
              Close
            </button>
            <button
                @click="saveChanges"
                type="button"
                class="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import {  initTE, Modal } from "tw-elements";
import { addHours, isBefore, isAfter, format } from 'date-fns';
import { useLaunchStore, LaunchStatus } from '~/store/launch';

const config = useRuntimeConfig()
const modalRef = ref(null);
const defaultFormSate = {
  launchTime: format(new Date(),"MM-dd-yyyy, hh:mm a")
}
const formData = ref(defaultFormSate);
let modalEl

onMounted(() => {
  initTE({ Modal});
  modalEl = new Modal(modalRef.value);
  modalRef.value.addEventListener("hide.te.modal", () => {
    resetForm()
  });
});

const launchStore = useLaunchStore()
const saveChanges = () => {
  // validate and report if any errors
  // TODO: add more stringent validation
  const errors = []
  if(formData.value.launchTime) {
    const incomingDate = new Date(formData.value.launchTime)
    if(incomingDate.toString() === 'Invalid Date') {
      errors.push('invalid time format')
    } else {
      // verify within 8hrs constraint
      const currentDate = new Date()
      const constrainedDate = addHours(currentDate, config.public.launchTimeHrConstraint)
      const isBeforeConstraint = isBefore(new Date(formData.value.launchTime), constrainedDate)
      const isFuture = isAfter(new Date(formData.value.launchTime), new Date())
      if(!isBeforeConstraint || !isFuture) {
        errors.push(`please select a time within ${config.public.launchTimeHrConstraint} hrs`)
      }
    }
  }
  if(!formData.value?.launchTime) {
    errors.push('need to input time')
  }
  if(!formData.value?.launchPad?.id) {
    errors.push('need to select launch pad')
  }
  if(!formData.value?.rocket?.id) {
    errors.push('need to select rocket')
  }

  if(errors.length) {
    console.log('errors', errors)
    alert(`please fix form errors: ${errors.join(",")}`)
    return
  }

  launchStore.addLaunch({
    name: formData.value.name || `Launch ${new Date().getTime()}`,
    launchPad: formData.value.launchPad,
    rocket: formData.value.rocket,
    launchTime: formData.value.launchTime,
    status: LaunchStatus.Scheduled
  })
  resetForm()
  modalEl.hide();
}



const resetForm = () => { formData.value = defaultFormSate }
</script>
