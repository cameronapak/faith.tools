import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import netlify from "@astrojs/netlify";
import keystatic from '@keystatic/astro';
import react from '@astrojs/react'
import markdoc from '@astrojs/markdoc';

const integrations = [
  tailwind(),
  // This entrypoint file is where Alpine plugins are registered.
  alpinejs({ entrypoint: '/src/entrypoint' }),
  react(),
  markdoc(),
  keystatic(),
]

// https://astro.build/config
export default defineConfig({
  integrations,
  output: "server",
  adapter: netlify(),
});