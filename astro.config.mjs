import { defineConfig } from "astro/config";
import storyblok from "@storyblok/astro";
import { loadEnv } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";

import solidJs from "@astrojs/solid-js";

const env = loadEnv("", process.cwd(), "STORYBLOK");

export default defineConfig({
  integrations: [storyblok({
    accessToken: env.STORYBLOK_TOKEN,
    components: {
      page: "storyblok/Page",
    },
    apiOptions: {
      region: "eu",
    },
  }), solidJs()],
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true,
    },
  },
});