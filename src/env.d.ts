/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import * as htmx from 'htmx.org';

declare global {
  interface Window {
    Alpine: import('alpinejs').Alpine;
    htmx: typeof htmx;
  }
}

// https://docs.astro.build/en/guides/environment-variables/#intellisense-for-typescript
interface ImportMetaEnv {
  /** Pocketbase API username */
  readonly PB_USERNAME: string;
  /** Pocketbase API password */
  readonly PB_PASSWORD: string;
  /** Pocketbase API URL */
  readonly PB_URL: string;
  /** API Key for Baserow.io */
  readonly BASEROW_API_KEY: string;
  readonly KEYSTATIC_GITHUB_CLIENT_ID: string;
  readonly KEYSTATIC_GITHUB_CLIENT_SECRET: string;
  readonly KEYSTATIC_SECRET: string;
  readonly PUBLIC_KEYSTATIC_GITHUB_APP_SLUG: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
