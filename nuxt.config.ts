// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/ui'],
  devtools: { enabled: process.env.ENVIROMENT !== 'production' },
  compatibilityDate: '2024-04-03',
  css: ['./app/assets/css/main.css'],
  ui: {
    colorMode: false,
  },
});
