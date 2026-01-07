import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: './',
    publicDir: 'public', // public目录中的文件会自动复制到dist目录
});
