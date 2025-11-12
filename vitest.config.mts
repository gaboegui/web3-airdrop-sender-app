import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        globals: true,
        environment: 'node',
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        exclude: ['**/node_modules/**', '**/dist/**', '**/.next/**'],
        alias: {
            '@': './src',
            'wagmi/core': '@wagmi/core',
        },
        pool: 'vmThreads',
        testTimeout: 10000,
        hookTimeout: 10000
    },
})