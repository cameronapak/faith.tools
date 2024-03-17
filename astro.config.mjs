import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import netlify from "@astrojs/netlify";
import keystatic from '@keystatic/astro';
import react from '@astrojs/react'
import markdoc from '@astrojs/markdoc';

const SENTRY_DSN = import.meta.env.SENTRY_DSN;
const SENTRY_AUTH_TOKEN = import.meta.env.SENTRY_AUTH_TOKEN;
const SENTRY_PROJECT = import.meta.env.SENTRY_PROJECT;

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
  adapter: netlify()
});