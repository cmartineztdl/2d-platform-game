import { Game } from './Game'
import playerSpritesheet from '../assets/spritesheets/player.png'
import { ACTION } from './InputHandler'

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
  private speedX: number = 0
  private maxSpeedX: number = 0.3
  private speedY: number = 0
  private maxSpeedY: number = 2.5
  private weight: number = 0.01

  constructor(private game: Game) {
    this.width = this.spriteSheetFrameWidth * this.scale
    this.height = this.spriteSheetFrameHeight * this.scale
    this.x = 0
    this.y = this.game.height - this.height
  }

  public update(deltaTime: number) {
    if (this.game.inputHandler.getIsActionActive(ACTION.LEFT)) {
      this.speedX = -this.maxSpeedX
    } else if (this.game.inputHandler.getIsActionActive(ACTION.RIGHT)) {
      this.speedX = this.maxSpeedX
    } else {
      this.speedX = 0
    }
    this.x += deltaTime * this.speedX
    this.x = Math.max(0, this.x)
    this.x = Math.min(this.game.width - this.width, this.x)

    if (
      this.isOnGround &&
      this.game.inputHandler.getIsActionActive(ACTION.UP)
    ) {
      this.speedY = -this.maxSpeedY
    }

    this.y += deltaTime * this.speedY
    this.y = Math.max(0, this.y)
    this.y = Math.min(this.game.height - this.height, this.y)

    if (!this.isOnGround) {
      this.speedY = this.speedY + this.weight * deltaTime
    }
  }

  public draw() {
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

  public loadAssets(): Promise<void> {
    return new Promise((resolve) => {
      this.spriteSheetImage.src = playerSpritesheet
      this.spriteSheetImage.onload = () => resolve()
    })
  }

  private get isOnGround() {
    return this.y >= this.game.height - this.height
  }
}
