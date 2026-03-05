// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  build: {
    transpile: ["pinia"],
  },
  modules: ["@pinia/nuxt", "@vueuse/nuxt"],
  css: ["./app/styles/main.scss"],
  ssr: true,

  app: {
    head: {
      title: "Car Rental",
      meta: [
        {
          name: "description",
          content:
            "Browse and book rental cars easily. Compare vehicle options, find the best deals, and plan your journey with a modern car rental platform.",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
});
