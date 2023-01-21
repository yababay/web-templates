import { existsSync } from 'fs'
import { publicDir, pagesDir, settings, getRenderByPath, urlToPath, getRenderByUrl } from './index.js'

test('Render exists by url', () => {
    let url = `/`
    let render = getRenderByUrl(url)
    expect(render.extension).toBe('pug')
    url = `/error`
    render = getRenderByUrl(url)
    expect(render.extension).toBe('pug')
    url = `/intro`
    render = getRenderByUrl(url)
    expect(render.extension).toBe('pug')
    url = `/intro/`
    render = getRenderByUrl(url)
    url = `/intro/do-not-remove-this`
    render = getRenderByUrl(url)
    expect(render.extension).toBe('pug')
    url = `/intro/does-not-exist`
    expect(() => getRenderByUrl(url)).toThrow(/^The resourse .* is not found.$/);
})

test('Pages render exists by path', () => {
    let path = `${pagesDir}/index`
    let render = getRenderByPath(path)
    expect(render.extension).toBe('pug')
    path = `${pagesDir}/error`
    render = getRenderByPath(path)
    expect(render.extension).toBe('pug')
    path = `${pagesDir}/intro/index`
    render = getRenderByPath(path)
    expect(render.extension).toBe('pug')
    path = `${pagesDir}/does-not-exists`
    render = getRenderByPath(path)
    expect(render).toBeNull()
})

test('Public render exists by path', () => {
    let path = `${publicDir}/exists.html`
    let render = getRenderByPath(path)
    expect(render.extension).toBe('html')
    path = `${publicDir}/img/logo.svg`
    render = getRenderByPath(path)
    expect(render.extension).toBe('mime')
    path = `${publicDir}/does-not-exists.html`
    render = getRenderByPath(path)
    expect(render).toBeNull()
})

test('URL to path', () => {
    let url = '/intro/do-not-remove-this.svg'
    let path = `${pagesDir}${url}`
    expect(urlToPath(url)).toBe(path)
    url = '/img/logo.svg'
    path = `${publicDir}${url}`
    expect(urlToPath(url)).toBe(path)
    url = '/'
    path = `${pagesDir}/index`
    expect(urlToPath(url)).toBe(path)
    url = '/intro'
    path = `${pagesDir}/intro/index`
    expect(urlToPath(url)).toBe(path)
    url = '/intro/'
    path = `${pagesDir}/intro/index`
    expect(urlToPath(url)).toBe(path)
    url = '/intro/about'
    path = `${pagesDir}${url}`
    expect(urlToPath(url)).toBe(path)
})

test('SSR directories', () => {
    expect(existsSync(publicDir)).toBeTruthy()
    expect(existsSync(pagesDir)).toBeTruthy()
})

test('SSR settings', () => {
    const keys = [
        "keywords",
        "robots",
        "description",
        "title",
        "motto",
        "author",
        "og:type",
        "og:title",
        "og:description",
        "og:image",
        "og:url",
        "og:site_name",
        "year"
    ];
    expect(keys.filter(key => settings[key]).length).toBe(keys.length)
})
