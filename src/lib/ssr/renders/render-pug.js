import { existsSync, readFileSync } from 'fs'
import Render from './render.js'
import showdown from 'showdown'

const { Converter } = showdown
const converter = new Converter()

export default class RenderPug extends Render {
  constructor(path, pageContext){
    super(path, pageContext, 'pug')
  }

  get html() {render = (filepath, locals = {}) => compileFile(filepath, options)(locals)}


  get options(){
    const {path} = this
    return {
      filters: {
        markdown: (text, opts = {}) => {
          if(opts && opts.from){
            const fn = `${path}/${opts.from}`
            if(!existsSync(fn)) throw Error(`The file ${fn} does not exist.`, {status: 550})
            text = readFileSync(fn, 'utf8')
          }
          return converter.makeHtml(text)
        }
      }
    }
  }
}

/*
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { compileFile } from "pug"
import showdown from 'showdown'

const { Converter } = showdown
const converter = new Converter()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pagesDir = `${__dirname}/../../pages`
const publicDir = `${__dirname}/../../../public`
const pageReg = /(\/)([\w\d]+[\w\d\-\.]+[\w\d])?\/?(.*)?$/
const options = {
  filters: {
    markdown: (text, opts = {}, prefix = pages) => {
      if(opts && opts.from){
        text = readFileSync(`${prefix}/${opts.from}`, 'utf8')
      }
      return converter.makeHtml(text)
    }
  }
}

const reply = (res, html, status = 200, type = 'text/html') => res.status(status).set({ 'Content-Type': `${type}` }).end(html)
export const render = (filepath, locals = {}) => compileFile(filepath, options)(locals)

export default (app, vite) => {
    app.use('*', async (req, res, next) => {
        const url = req.originalUrl
        try {
          let [_, root, prefix, postfix] = pageReg.exec(url)
          console.log(root, prefix, postfix)
          if(root && !(prefix && postfix)){
            const html = render(`${pagesDir}/index.pug`)
            reply(res, html)
            return 
          }

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
          // 6. Send the rendered HTML back.
          const html = '<h1>Hello</h1>'
          res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (e) {
          // If an error is caught, let Vite fix the stack trace so it maps back to
          // your actual source code.
          vite.ssrFixStacktrace(e)
          next(e)
        }
      })
}
*/
