import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import VueTypeImports from 'vite-plugin-vue-type-imports'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader(),  VueTypeImports(), basicSsl()],
})
