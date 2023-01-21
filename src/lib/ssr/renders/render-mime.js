import Render from './render.js'

export default class RenderPug extends Render {
  constructor(path, pageContext){
    super(path, pageContext, 'mime')
  }
}
