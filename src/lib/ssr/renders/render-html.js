import Render from './render.js'

export default class RenderHtml extends Render {
  constructor(path, pageContext){
    super(path, pageContext, 'html')
  }
}
