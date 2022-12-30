import path, { join } from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default ({ mode }) => {
  return defineConfig({
    envPrefix: 'ENV_',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
        '@styles': path.resolve(__dirname, './src/assets/styles/'),
        '@page': path.resolve(__dirname, './src/page/'),
      },
    },
    optimizeDeps: {
      exclude: [],
    },
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
        scopeBehaviour: 'local',
        hashPrefix: 'freebe',
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            hack: `
              true; 
              @import "${join(__dirname, "./src/assets/styles/variables.less")}"; 
              @import "${join(__dirname, "./src/assets/styles/mixin.less")}";
            `,
          },
        },

      },
      postcss: {
        plugins: [
          tailwindcss(),
          autoprefixer()
        ]
      },
      devSourcemap: true,
    },
    build: {
      assetsInlineLimit: 4096000,
      // outDir: 'dist',
      outDir: 'html',
      assetsDir: 'static',
    },
    server: {
      proxy: {
        "/api": {
          target: "http://free-be.xyz/",
          changeOrigin: true,
        },
      },
    },
    // server: {
    //   // open: true,
    //   // cors: true,
    //   proxy: {
    //     '/api': {
    //       target: 'http://free-be.xyz',
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/api/, ''),
    //     },
    //     // [`${loadEnv(mode, process.cwd()).APP_BASE_API}`]: {
    //     //   target: loadEnv(mode, process.cwd()).BASE_URL,
    //     //   changeOrigin: true,
    //     //   rewrite: (path) => path.replace(/^\/api/, ''),
    //     //   // secure: false,
    //     //   // ws: true
    //     // },
    //     // secure: false,
    //     // ws: true
    //   },
    // },
    // define: {
    //   'process.env': {}
    // },
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), './src/assets/icons')],
        // symbolId: '[name]'
        symbolId: 'icon-[dir]-[name]',
      }),
      Components({
        // 指定组件位置，默认是 src/components
        dirs: ['src/components', 'src/views'],
        // 搜索子目录
        deep: true,
        // 组件的有效文件扩展名
        extensions: ['vue'],
        // 配置文件生成位置
        dts: 'components.d.ts',
      }),
      AutoImport({
        // 注册要自动引入的库
        imports: ['vue', 'vue-router', 'pinia', '@vueuse/core', "vee-validate"],
        // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
        dts: 'auto-import.d.ts',
      }),
    ],
  });
}
