import { Game } from './Game'
import playerSpritesheet from '../assets/spritesheets/player.png'

export class Player {
  private x: number = 0
  private size: number = 50
  private image: HTMLImageElement = new Image()

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

  loadAssets(): Promise<void> {
    return new Promise((resolve) => {
      this.image.src = playerSpritesheet
      this.image.onload = () => resolve()
    })
  }
}
