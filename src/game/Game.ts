import { Player } from './Player'

export class Game {
  private lastTimestamp: number = 0
  private player: Player

  constructor(
    public width: number,
    public height: number,
    public context: CanvasRenderingContext2D
  ) {
    this.player = new Player(this)

    this.animate = this.animate.bind(this)
  }

  private update(deltaTime: number) {
    this.player.update(deltaTime)
  }

  private draw() {
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
    await this.player.loadAssets()

    this.animate()
  }
}
