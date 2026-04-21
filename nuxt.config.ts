// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",
  devtools: { enabled: false },

  // Produce a long-running Node HTTP server (not a serverless/edge bundle).
  // `node-server` is Nitro's preset for `node .output/server/index.mjs`, and it
  // reads PORT from the environment — which is what Embr injects at runtime.
  nitro: {
    preset: "node-server",
  },

  ssr: true,

  app: {
    head: {
      title: "Embr × Nuxt 3",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
});
