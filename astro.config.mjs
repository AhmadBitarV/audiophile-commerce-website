import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import solidJs from "@astrojs/solid-js";
import storyblok from "@storyblok/astro";
import { loadEnv } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";

const env = loadEnv("", process.cwd(), "STORYBLOK");

export default defineConfig({
  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      components: {
        page: "storyblok/Page",
        grid: "storyblok/Grid",
      },
    }),
    tailwind(),
    solidJs(),
  ],
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true,
    },
  },
});
