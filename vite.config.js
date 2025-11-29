import { defineConfig } from 'vite'

export default defineConfig({
    base: '/password-generator-pwa/',
    server: {
        port: 3000,
        host: true,
        hmr: {
            overlay: true
        },
        watch: {
            usePolling: true
        }
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: './index.html'
            },
            output: {
                entryFileNames: 'assets/[name].[hash].js',
                chunkFileNames: 'assets/[name].[hash].js',
                assetFileNames: 'assets/[name].[hash].[ext]'
            }
        }
    }
})