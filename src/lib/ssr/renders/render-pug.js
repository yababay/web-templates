import { existsSync, readFileSync } from 'fs'
import { compileFile } from "pug"
import Render from './render.js'
import showdown from 'showdown'

const { Converter } = showdown
const converter = new Converter()

export default class RenderPug extends Render {
  constructor(path, pageContext){
    super(path, pageContext, 'pug')
  }

  get html() {
    const {path, options, locals} = this
    return compileFile(path, options)(locals)
  }

  get options(){
    let {path} = this
    path = /(.*)\/[^\/]+$/.exec(path)[1]
    return {
      filters: {
        markdown: (text, opts = {}) => {
          if(!(opts && opts.from)) return converter.makeHtml(text)
          const fn = `${path}/${opts.from}`
          if(!existsSync(fn)) throw Error(`The file ${fn} does not exist.`, {status: 550})
          return RenderPug.parseMarkdown(fn)
        }
      }
    }
  }

  static parseMarkdown(path){
    const text = readFileSync(path, 'utf8')
    return converter.makeHtml(text)
  }
}
