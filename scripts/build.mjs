
import dotenv from 'dotenv'
import esbuild from 'esbuild'
import { settings } from './config/config.mjs';

(async () => {
  dotenv.config()
  const isDev = process.env.NODE_ENV === 'development'
  const isProd = process.env.NODE_ENV === 'production'

  if (isDev) {
    const context = await esbuild.context(settings)

    context.watch().then(() => {
      console.log('Watching for changes...')

      context.serve()
    })
  } else {
    await esbuild.build(settings)
  }
})()
