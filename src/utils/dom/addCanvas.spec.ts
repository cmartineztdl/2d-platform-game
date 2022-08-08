import { addCanvas } from './addCanvas'

describe('addCanvas', () => {
  it('adds a canvas to the DOM element', () => {
    const domElement = document.createElement('div')

    addCanvas(domElement)

    const createdCanvas = domElement.getElementsByTagName('canvas')
    expect(createdCanvas).not.toBeUndefined()
  })

  it('returns the created canvas', () => {
    const canvas = addCanvas(document.body)

    expect(canvas).toBeInstanceOf(HTMLCanvasElement)
  })
})
