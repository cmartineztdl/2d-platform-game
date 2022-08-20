import { Game } from './Game'
import layer1ImagePath from '../assets/background/layer-1.png'
import layer2ImagePath from '../assets/background/layer-2.png'
import layer3ImagePath from '../assets/background/layer-3.png'
import layer4ImagePath from '../assets/background/layer-4.png'
import layer5ImagePath from '../assets/background/layer-5.png'

export class Background {
  private width: number = 1667
  private height: number = 500

  private layers: Layer[]

  constructor(private game: Game) {
    this.layers = [
      new Layer(this.game, this.width, this.height, 0.2, layer1ImagePath),
      new Layer(this.game, this.width, this.height, 0.4, layer2ImagePath),
      new Layer(this.game, this.width, this.height, 0.6, layer3ImagePath),
      new Layer(this.game, this.width, this.height, 0.8, layer4ImagePath),
      new Layer(this.game, this.width, this.height, 1, layer5ImagePath),
    ]
  }

  update(deltaTime: number) {
    this.layers.forEach((layer) => layer.update(deltaTime))
  }

  draw() {
    this.layers.forEach((layer) => layer.draw())
  }

  public loadAssets(): Promise<void> {
    return Promise.all(this.layers.map((layer) => layer.loadAssets())).then()
  }
}

class Layer {
  private x: number = 0
  private y: number = 0
  private image: HTMLImageElement = new Image()

  constructor(
    private game: Game,
    private width: number,
    private height: number,
    private speedModifier: number,
    private imagePath: string
  ) {}

  update(deltaTime: number) {
    this.x -= this.speedModifier * deltaTime * 0.2

    if (this.x < -this.width) {
      this.x += this.width
    }
  }

  draw() {
    this.game.context.drawImage(
      this.image,
      this.x,
      this.y,
      this.width,
      this.height
    )
    this.game.context.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    )
  }

  public loadAssets(): Promise<void> {
    return new Promise((resolve) => {
      this.image.src = this.imagePath
      this.image.onload = () => resolve()
    })
  }
}
