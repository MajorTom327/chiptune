import * as R from 'ramda'

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

// Add here all the env vars you want to be available in the bundle
const envVarsKeys = [
  'NODE_ENV',
  'PORT',
  'AUTH_TOKEN_SECRET'
]

// Add here all the external dependencies you want to be available in the bundle
const external = [
  'path', 'express','body-parser', 'compression', 'buffer'
]

export const baseSettings = {
  entryPoints: [
    'server/index.ts'
  ],

  bundle: true,
  sourcemap: false,
  // target: 'es2015',
  format: 'cjs',
  outdir: 'dist',
  platform: 'node',

  external,
  define: R.reduce((add, key) => R.assoc(`process.env.${key}`, `"${process.env[key]}"`, add), {}, envVarsKeys),
  plugins: [
  ]
}

export const devSettings = {
  jsxDev: true,
  jsx: 'automatic'
}

export const prodSettings = {
  minify: true,
  drop: ['debugger', 'console'],
  treeShaking: true
}

export const settings = R.compose(
  R.when(R.always(isDev), R.mergeDeepRight(devSettings)),
  R.when(R.always(isProd), R.mergeDeepRight(prodSettings))
)(baseSettings)
