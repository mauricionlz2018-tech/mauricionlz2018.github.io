// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://mauricionlz2018-tech.github.io/',
  base: '/mauricionlz2018.github.io/',
  vite: {
    plugins: [tailwindcss()]
  }
  
});
// 


