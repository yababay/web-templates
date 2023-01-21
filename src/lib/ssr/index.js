import express from 'express'
import { createServer } from 'vite'
import render from './renders/index.js'

(async function () {

  const app = express()
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })
  app.use(vite.middlewares)
  render(app, vite)
  app.listen(5173)

})()
