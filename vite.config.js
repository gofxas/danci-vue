import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import autoprefixer from 'autoprefixer'
import path from 'path'

export default defineConfig(({ mode, command }) => ({
  server: {
    host: '0.0.0.0',
    port: 3100
  },
  plugins: [
    vue(),
    vueJsx()
  ],
  resolve: {
    alias: [
      { find: /^@\//, replacement: `${path.resolve(__dirname, 'src')}/` },
      { find: /^~/, replacement: '' }
    ],
    extensions: ['.js', '.mjs', '.vue', '.json', '.less', '.css']
  },
  define: { 'process.env': {} },
  css: {
    postcss: {
      plugins: [
        autoprefixer
      ],
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      }
    }
  },
  dev: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html')
      }
    },
  },
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html')
      }
    },
    minify: "terser",
    terserOptions: {
      compress: {
        pure_funcs: command === "build" ? ['console.log'] : null,
        drop_debugger: command === "build"
      }
    }
  }
}))
