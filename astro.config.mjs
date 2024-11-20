import { defineConfig } from "astro/config";
import storyblok from "@storyblok/astro";
import { loadEnv } from "vite";
import tailwind from "@astrojs/tailwind";
import basicSsl from "@vitejs/plugin-basic-ssl";
import vercel from "@astrojs/vercel/serverless";
const env = loadEnv("", process.cwd(), "STORYBLOK");

console.log(env);

// https://astro.build/config
export default defineConfig({
  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      bridge: env.STORYBLOK_IS_PREVIEW === "yes",
      components: {
        page: "storyblok/Page",
        grid: "storyblok/Grid",
      },
    }),
    tailwind(),
  ],
  output: env.STORYBLOK_IS_PREVIEW === "yes" ? "server" : "hybrid",
  ...(env.STORYBLOK_ENV === "development" && {
    vite: {
      plugins: [basicSsl()],
      server: {
        https: true,
      },
    },
  }),
  adapter: vercel(),
});
