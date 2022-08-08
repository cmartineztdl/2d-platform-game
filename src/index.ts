import './index.css'
import { addCanvas } from './utils/dom/addCanvas'

window.addEventListener('load', () => {
  const rootElement = document.getElementById('root')
  const canvas = addCanvas(rootElement)
  const context = canvas.getContext('2d')

  class Game {
    private lastTimestamp: number = 0
    private x: number = 0
    private size: number = 50

    constructor(
      private width: number,
      private height: number,
      private context: CanvasRenderingContext2D
    ) {
      this.animate = this.animate.bind(this)
    }

    private update(deltaTime: number) {
      this.x += deltaTime * 0.5
      if (this.x > this.width) {
        this.x = 0
      }
    }

    private draw() {
      this.context.fillRect(
        this.x,
        (this.height - this.size) / 2,
        this.size,
        this.size
      )
    }

    private animate(timestamp: number = 0) {
      const deltaTime = timestamp - this.lastTimestamp
      this.lastTimestamp = timestamp

      this.context.clearRect(0, 0, this.width, this.height)

      this.context.clearRect

      this.update(deltaTime)
      this.draw()

      requestAnimationFrame(this.animate)
    }

    public start() {
      this.animate()
    }
  }

  const game = new Game(canvas.width, canvas.height, context)
  game.start()
})
