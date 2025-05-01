const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["src/index.ts"],
  format: "cjs",
  outfile: "dist/index.js", 
  bundle: true, 
  platform: "node",
  target: 'node18',
  external: [
    './dist',
    './package.json',
    'playwright',
  ]
}).catch(() => process.exit(1));