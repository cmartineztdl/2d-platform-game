import './index.css'
import { addCanvas } from './utils/dom/addCanvas'

window.addEventListener('load', () => {
  const rootElement = document.getElementById('root')
  const canvas = addCanvas(rootElement)
})
