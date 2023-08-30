// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      launchTimeHrConstraint: process.env.LAUNCH_TIME_HR_CONSTRAINT || 8,
      countdownStart: process.env.LAUNCH_COUNTDOWN_START || 5,
      launchDuration: process.env.LAUNCH_DURATION || 2,
    }
  },
  // basic config options
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
  pinia: {
    autoImports: [
      'defineStore',
      ['defineStore', 'definePiniaStore'],
    ],
  },
  app: {
    head: {
      script: [
        { src: "https://cdn.jsdelivr.net/npm/tw-elements/dist/js/tw-elements.umd.min.js" }
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&display=swap",
        },
      ],
    },
  },
})
