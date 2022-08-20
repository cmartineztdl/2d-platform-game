import { Game } from './Game'
import playerSpritesheet from '../assets/spritesheets/player.png'
import { ACTION } from './InputHandler'
import {
  Player as PlayerState,
  StateName,
  State,
  SittingState,
  RunningState,
  JumpingState,
  FallingState,
} from './State'

export class Player implements PlayerState {
  private x: number
  private y: number
  private scale: number = 1
  private width: number
  private height: number
  private spriteSheetFrameWidth: number = 1200 / 12
  private spriteSheetFrameHeight: number = 913 / 10
  private spriteSheetImage: HTMLImageElement = new Image()
  private spriteSheetFrameX: number = 0
  private spriteSheetFrameY: number = 0
  private numberOfSpriteSheets: number[] = [7, 7, 7, 9, 11, 5, 7, 7, 14, 4]
  private spriteSheetAnimationInterval: number = 100
  private timeSinceLastSpriteSheetAnimation: number = 0
  private speedX: number = 0
  private maxSpeedX: number = 0.3
  private speedY: number = 0
  private maxSpeedY: number = 2.5
  private weight: number = 0.01
  private states: { [key in StateName]: State }
  private currentState: State

  constructor(private game: Game) {
    this.width = this.spriteSheetFrameWidth * this.scale
    this.height = this.spriteSheetFrameHeight * this.scale
    this.x = 0
    this.y = this.game.height - this.height - this.game.groundMargin

    this.states = {
      sitting: new SittingState(this),
      running: new RunningState(this),
      jumping: new JumpingState(this),
      falling: new FallingState(this),
    }
    this.setState('sitting')
  }

  public update(deltaTime: number) {
    this.currentState.handleInput(this.game.inputHandler)

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
    this.y = Math.min(
      this.game.height - this.height - this.game.groundMargin,
      this.y
    )

    this.speedY = this.isOnGround ? 0 : this.speedY + this.weight * deltaTime

    this.timeSinceLastSpriteSheetAnimation += deltaTime
    if (
      this.timeSinceLastSpriteSheetAnimation >=
      this.spriteSheetAnimationInterval
    ) {
      this.spriteSheetFrameX =
        (this.spriteSheetFrameX + 1) %
        this.numberOfSpriteSheets[this.spriteSheetFrameY]
      this.timeSinceLastSpriteSheetAnimation -=
        this.spriteSheetAnimationInterval
    }
  }

  public draw() {
    this.game.context.drawImage(
      this.spriteSheetImage,
      this.spriteSheetFrameX * this.spriteSheetFrameWidth,
      this.spriteSheetFrameY * this.spriteSheetFrameHeight,
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

  public get isOnGround() {
    return this.y >= this.game.height - this.height - this.game.groundMargin
  }

  public setSpritesheetFrames(
    spriteSheetFrameX: number,
    spriteSheetFrameY: number
  ) {
    this.spriteSheetFrameX = spriteSheetFrameX
    this.spriteSheetFrameY = spriteSheetFrameY
  }

  public setState(stateName: StateName) {
    this.currentState = this.states[stateName]
    this.currentState.enter()
  }

  public setGameSpeed(speed: number) {
    this.game.speed = speed
  }

  public get isFalling(): boolean {
    return this.speedY > 0
  }
}
