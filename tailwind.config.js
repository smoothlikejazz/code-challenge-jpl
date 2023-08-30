module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  plugins: [require('daisyui'), require("tw-elements/dist/plugin.cjs")],
  daisyui: {
    themes: [
      {
        system: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
        },
      },
    ],
  },
};
