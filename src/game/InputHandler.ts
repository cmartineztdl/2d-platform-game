export type Action = 'jump' | 'right' | 'down' | 'left' | 'special'

export const ACTION: { [key: string]: Action } = {
  UP: 'jump',
  RIGHT: 'right',
  DOWN: 'down',
  LEFT: 'left',
  SPECIAL: 'special',
}

const keyToActionMappings: { [key: string]: Action } = {
  w: ACTION.UP,
  a: ACTION.LEFT,
  s: ACTION.DOWN,
  d: ACTION.RIGHT,
  ArrowUp: ACTION.UP,
  ArrowLeft: ACTION.LEFT,
  ArrowDown: ACTION.DOWN,
  ArrowRight: ACTION.RIGHT,
  ' ': ACTION.SPECIAL,
}

export class InputHandler {
  private activeActions: string[] = []

  constructor() {
    window.addEventListener('keydown', (event) => {
      const mappedKey = keyToActionMappings[event.key]

      if (mappedKey && !this.activeActions.includes(mappedKey)) {
        this.activeActions.push(mappedKey)
      }
    })

    window.addEventListener('keyup', (event) => {
      const mappedKey = keyToActionMappings[event.key]
      const mappedKeyIndex = this.activeActions.indexOf(mappedKey)

      if (mappedKey && mappedKeyIndex >= 0) {
        this.activeActions.splice(mappedKeyIndex, 1)
      }
    })
  }

  public getIsActionActive(action: Action): boolean {
    return this.activeActions.includes(action)
  }
}
