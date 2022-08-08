import { Game } from './Game'

export class Player {
  private x: number = 0
  private size: number = 50

  constructor(private game: Game) {}

  update(deltaTime: number) {
    this.x += deltaTime * 0.5
    if (this.x > this.game.width) {
      this.x = 0
    }
  }

  draw() {
    this.game.context.fillRect(
      this.x,
      (this.game.height - this.size) / 2,
      this.size,
      this.size
    )
  }
}
