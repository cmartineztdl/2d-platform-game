import { Game } from './Game'
import playerSpritesheet from '../assets/spritesheets/player.png'

export class Player {
  private x: number
  private y: number
  private scale: number = 1
  private width: number
  private height: number
  private spriteSheetFrameWidth: number = 1200 / 12
  private spriteSheetFrameHeight: number = 913 / 10
  private spriteSheetImage: HTMLImageElement = new Image()
  private spriteSheetFrameX: number = 0
  private spriteSheetFramey: number = 0
  private speedX: number = 0.3

  constructor(private game: Game) {
    this.width = this.spriteSheetFrameWidth * this.scale
    this.height = this.spriteSheetFrameHeight * this.scale
    this.x = 0
    this.y = this.game.height - this.height
  }

  update(deltaTime: number) {
    this.x += deltaTime * this.speedX
    if (this.x > this.game.width) {
      this.x = 0 - this.width
    }
  }

  draw() {
    this.game.context.drawImage(
      this.spriteSheetImage,
      this.spriteSheetFrameX * this.spriteSheetFrameWidth,
      this.spriteSheetFramey * this.spriteSheetFrameHeight,
      this.spriteSheetFrameWidth,
      this.spriteSheetFrameHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }

  loadAssets(): Promise<void> {
    return new Promise((resolve) => {
      this.spriteSheetImage.src = playerSpritesheet
      this.spriteSheetImage.onload = () => resolve()
    })
  }
}
