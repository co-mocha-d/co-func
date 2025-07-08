import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        outDir: 'dist', // 输出目录
        target: 'es2020',
        lib: {
            entry: 'src/main.ts', // 入口文件
            formats: ['es', 'cjs']
        }
    },
})