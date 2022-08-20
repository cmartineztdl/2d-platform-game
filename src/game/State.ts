import { ACTION, InputHandler } from './InputHandler'

export type StateName = 'sitting' | 'running' | 'jumping' | 'falling'

export interface Player {
  setSpritesheetFrames: (
    spriteSheetFrameX: number,
    spriteSheetFrameY: number
  ) => void
  setState: (stateName: StateName) => void
  isOnGround: boolean
  isFalling: boolean
}

export abstract class State {
  constructor(public stateName: StateName, protected player: Player) {}

  abstract enter(): void
  abstract handleInput(inputHandler: InputHandler): void
}

export class SittingState extends State {
  constructor(player: Player) {
    super('sitting', player)
  }

  enter() {
    this.player.setSpritesheetFrames(0, 5)
  }

  handleInput(inputHandler: InputHandler) {
    if (this.player.isOnGround && inputHandler.getIsActionActive(ACTION.LEFT)) {
      this.player.setState('running')
    } else if (
      this.player.isOnGround &&
      inputHandler.getIsActionActive(ACTION.RIGHT)
    ) {
      this.player.setState('running')
    }

    if (this.player.isOnGround && inputHandler.getIsActionActive(ACTION.UP)) {
      this.player.setState('jumping')
    }
  }
}

export class RunningState extends State {
  constructor(player: Player) {
    super('running', player)
  }

  enter() {
    this.player.setSpritesheetFrames(0, 3)
  }

  handleInput(inputHandler: InputHandler) {
    if (
      !inputHandler.getIsActionActive(ACTION.LEFT) &&
      !inputHandler.getIsActionActive(ACTION.RIGHT)
    ) {
      this.player.setState('sitting')
    }

    if (this.player.isOnGround && inputHandler.getIsActionActive(ACTION.UP)) {
      this.player.setState('jumping')
    }
  }
}

export class JumpingState extends State {
  constructor(player: Player) {
    super('jumping', player)
  }

  enter() {
    this.player.setSpritesheetFrames(0, 1)
  }

  handleInput(inputHandler: InputHandler) {
    if (
      this.player.isOnGround &&
      (inputHandler.getIsActionActive(ACTION.LEFT) ||
        inputHandler.getIsActionActive(ACTION.RIGHT))
    ) {
      this.player.setState('sitting')
    } else if (this.player.isOnGround) {
      this.player.setState('sitting')
    } else if (this.player.isFalling) {
      this.player.setState('falling')
    }
  }
}

export class FallingState extends State {
  constructor(player: Player) {
    super('falling', player)
  }

  enter() {
    this.player.setSpritesheetFrames(0, 2)
  }

  handleInput(inputHandler: InputHandler) {
    if (this.player.isOnGround) {
      this.player.setState('running')
    }
  }
}
