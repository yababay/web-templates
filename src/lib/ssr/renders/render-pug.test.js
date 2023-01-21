import RenderPug from './render-pug.js'
import { pagesDir } from './index.js'

test('Check html', () => {
    const render = new RenderPug(`${pagesDir}/intro/do-not-remove-this.pug`)
    expect(render.html.trim()).toBe('<h1>For tests only</h1>')
})

test('Check markdown', () => {
    const path = `${pagesDir}/intro/do-not-remove-this.md`
    const html = RenderPug.parseMarkdown(path)
    expect(/<\/h1>/.test(html)).toBeTruthy()
    expect(/<\/ul>/.test(html)).toBeTruthy()
    expect(/<\/li>/.test(html)).toBeTruthy()
    expect(/<a href="https:\/\/ya.ru">/.test(html)).toBeTruthy()
    expect(/<\/strong>/.test(html)).toBeTruthy()
    expect(/<\/p>/.test(html)).toBeTruthy()
})
