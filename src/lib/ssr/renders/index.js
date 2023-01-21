import { existsSync, readFileSync, lstatSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import RenderPug from './render-pug.js'
import RenderHtml from './render-html.js'
import RenderMime from './render-mime.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const settingsFile = `${__dirname}/../../../settings.json`

export const pagesDir  = `${__dirname}/../../../pages`
export const publicDir = `${__dirname}/../../../../public`
export const settings = JSON.parse(readFileSync(settingsFile, 'utf8'))

const renders = new Map([
  ['pug', RenderPug],
  ['html', RenderHtml]
])

export function getRenderByPath(path, pageContext = {}){
  if(existsSync(path) && lstatSync(path).isFile()) return path.endsWith('.html') ? new RenderHtml(path, pageContext) : new RenderMime(path, pageContext)
  const ext = Array.from(renders.keys()).find(key => {
    const fn = `${path}.${key}`
    return existsSync(fn) && lstatSync(fn).isFile()
  })
  if(!ext) return null
  const Render = renders.get(ext)
  return new Render(`${path}.${ext}`, pageContext)
}

export function urlToPath(url, toParse = false){
  const pageReg = /(\/)([\w\d]+[\w\d\-\.]+[\w\d])?\/?(.*)?$/
  let [_, root, prefix, postfix] = pageReg.exec(url)
  if(!toParse){
    postfix = postfix ? `${prefix}/${postfix}` : prefix
    for(let dir of [pagesDir, publicDir]){
      const path = `${dir}/${postfix}`  
      if(existsSync(path) && lstatSync(path).isFile()) return path
    }
    return urlToPath(url, true)
  }
  if(!(prefix || postfix)) return `${pagesDir}/index`
  if(prefix && !postfix) {
    return `${pagesDir}/${prefix}${prefix === 'error' ? '' : '/index'}`
  }
  return `${pagesDir}/${prefix}/${postfix}`
}

export function getRenderByUrl(url){
  const path = urlToPath(url)
  const render = getRenderByPath(path)
  if(!render) throw Error(`The resourse ${path} is not found.`, {status: 404})
  return render
}

/*
function getErrorPage(context = {}){
  context = {...context, ...settings}
  if(existsSync(publicErrorPage)) return publicErrorPage
  const ext = Array.from(renders.keys()).find(key => existsSync(`${errorPage}.${key}`))
  return renders.get(ext)(`${errorPage}.${key}`, context)
}

export function getRender(url){
  let path = !(prefix && postfix) ? indexPage : `/${postfix}`
  const ext = Array.from(renders.keys()).find(key => existsSync(`${path}.${key}`))
  if(ext) return renders.get(ext)(`${path}.${key}`, settings)
  if(!existsSync(path)) path = `${publicDir}/${prefix}` + (postfix && `/${postfix}` || '')  
  else return mimeRender
}
*/

function reply(res, content, status = 200, type = 'text/html'){
  return res.status(status).set({ 'Content-Type': `${type}` }).end(content)
} 

export default (app, vite) => {
    app.use('*', async (req, res, next) => {
        const url = req.originalUrl
        try {
          //const renderer = getRender(url)
          //console.log(renderer)
          /*
          // 1. Read index.html

          let template = readFileSync(
            path.resolve(__dirname, 'index.html'),
            'utf-8',
          )
      
          // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
          //    also applies HTML transforms from Vite plugins, e.g. global preambles
          //    from @vitejs/plugin-react
          template = await vite.transformIndexHtml(url, template)
      
          // 3. Load the server entry. vite.ssrLoadModule automatically transforms
          //    your ESM source code to be usable in Node.js! There is no bundling
          //    required, and provides efficient invalidation similar to HMR.
          const { render } = await vite.ssrLoadModule('/src/entry-server.js')
      
          // 4. render the app HTML. This assumes entry-server.js's exported `render`
          //    function calls appropriate framework SSR APIs,
          //    e.g. ReactDOMServer.renderToString()
          const appHtml = await render(url)
      
          // 5. Inject the app-rendered HTML into the template.
          const html = template.replace(`<!--ssr-outlet-->`, appHtml)
          */  
          // 6. Send the rendered HTML back.
          reply(res, '<h1>Hello</h1>')
          //res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (e) {
          // If an error is caught, let Vite fix the stack trace so it maps back to
          // your actual source code.
          vite.ssrFixStacktrace(e)
          next(e)
        }
      })
}
