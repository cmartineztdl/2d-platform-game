import { Background } from './Background'
import { InputHandler } from './InputHandler'
import { Player } from './Player'

export class Game {
  private lastTimestamp: number = 0
  private background: Background
  private player: Player
  public inputHandler: InputHandler
  public groundMargin: number = 80
  public speed: number = 0

  constructor(
    public width: number,
    public height: number,
    public context: CanvasRenderingContext2D
  ) {
    this.background = new Background(this)
    this.player = new Player(this)
    this.inputHandler = new InputHandler()

    this.animate = this.animate.bind(this)
  }

  private update(deltaTime: number) {
    this.background.update(deltaTime)
    this.player.update(deltaTime)
  }

  private draw() {
    this.background.draw()
    this.player.draw()
  }

  private animate(timestamp: number = 0) {
    const deltaTime = this.calculateDeltaTime(timestamp)

    this.clearContext()

    this.update(deltaTime)
    this.draw()

    requestAnimationFrame(this.animate)
  }

  private clearContext() {
    this.context.clearRect(0, 0, this.width, this.height)
  }

  private calculateDeltaTime(timestamp: number): number {
    const deltaTime = timestamp - this.lastTimestamp
    this.lastTimestamp = timestamp
    return deltaTime
  }

  public async start() {
    await this.background.loadAssets()
    await this.player.loadAssets()

    this.animate()
  }
}
