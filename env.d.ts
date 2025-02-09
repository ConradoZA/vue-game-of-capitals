/// <reference types="vite/client" />

interface ImportMetaEnv {
  // see https://vitejs.dev/guide/env-and-mode.html#env-files
  // add .env variables.
  // readonly VITE_APP_TITLE: string;
  // readonly VITE_APP_WEBSTORAGE_NAMESPACE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
