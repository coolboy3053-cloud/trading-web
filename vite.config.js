var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default defineConfig(function (_a) {
    var mode = _a.mode;
    var env = loadEnv(mode, process.cwd(), '');
    var localAllowedHosts = (env.VITE_EXTRA_ALLOWED_HOSTS || '')
        .split(',')
        .map(function (host) { return host.trim(); })
        .filter(Boolean);
    return {
        plugins: [react()],
        base: './',
        publicDir: 'public', // public目录中的文件会自动复制到dist目录
        server: {
            allowedHosts: __spreadArray(['www.baishengtrading.com'], localAllowedHosts, true),
        },
    };
});
