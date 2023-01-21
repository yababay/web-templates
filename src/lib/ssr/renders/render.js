export default class Render {
    constructor(path, pageContext, ext){
        this._path = path
        this._ext = ext
        this._context = pageContext
    }

    get context(){
        return this._context
    }

    get locals(){
        return this._context
    }

    get extension(){
        return this._ext
    }

    get path(){
        return this._path
    }
}
