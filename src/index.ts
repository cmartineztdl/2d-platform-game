import './index.css'
import { addCanvas } from './utils/dom/addCanvas'
import { Game } from './game'

window.addEventListener('load', () => {
  const rootElement = document.getElementById('root')
  const canvas = addCanvas(rootElement)
  const context = canvas.getContext('2d')

  const game = new Game(canvas.width, canvas.height, context)
  game.start()
})
