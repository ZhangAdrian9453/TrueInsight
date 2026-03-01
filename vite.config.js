import { defineConfig } from 'vite';
import obfuscator from 'rollup-plugin-obfuscator';

export default defineConfig(({ command }) => ({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: command === 'build' ? false : 'esbuild'  // 交给混淆器处理，避免二次破坏
  },
  plugins: command === 'build' ? [
    obfuscator({
      global: true,  // 在最终 bundle 上运行，而非单文件
      options: {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.5,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayThreshold: 0.75,
        deadCodeInjection: false,
        renameGlobals: false,
        selfDefending: true,
        disableConsoleOutput: false
      }
    })
  ] : [],
  server: {
    port: 6600,
    strictPort: true,
    proxy: {
      '/api': 'http://localhost:6601'
    },
    headers: {
      'Cache-Control': 'no-store'
    }
  },
  preview: {
    port: 6600,
    strictPort: true
  }
}));
