import { build as bundle } from 'esbuild';
import { build } from 'vite';
import { cp, mkdir } from 'node:fs/promises';

export async function electronBuild() {
  await bundle({ entryPoints: ['electron/main.ts'], outfile: 'dist-electron/main.js', bundle: true, platform: 'node', format: 'esm', external: ['electron'], sourcemap: true });
  await bundle({ entryPoints: ['electron/preload.ts'], outfile: 'dist-electron/preload.cjs', bundle: true, platform: 'node', format: 'cjs', external: ['electron'], sourcemap: true });
}
export async function assets() {
  await mkdir('public/fonts', { recursive: true });
  await cp('node_modules/@excalidraw/excalidraw/dist/prod/fonts', 'public/fonts', { recursive: true });
}
if (process.argv[1]?.endsWith('/build.mjs')) {
  await assets();
  await build();
  await electronBuild();
}
