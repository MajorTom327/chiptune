const esbuild = require('esbuild');

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = !isDevelopment;

const buildJobs = [
  // Build the server application


  esbuild.build({
    entryPoints: ['server/index.ts'],
    bundle: true,
    outfile: 'dist/server.js',
    minify: isProduction,
    sourcemap: true,
    platform: 'node',
    external: ['bull']
  })
];

Promise.all(buildJobs).catch(() => process.exit(1));
