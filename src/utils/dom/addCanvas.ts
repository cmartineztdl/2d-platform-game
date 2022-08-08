export function addCanvas(rootElement: HTMLElement) {
  const canvas = document.createElement('canvas');
  canvas.style['border'] = '3px double black';
  canvas.style['position'] = 'absolute';
  canvas.style['top'] = '50%';
  canvas.style['left'] = '50%';
  canvas.style['transform'] = 'translate(-50%, -50%)';
  canvas.style['maxWidth'] = '100%'
  canvas.style['maxHeight'] = '100%'
  canvas.width = 500;
  canvas.height = 500;
  rootElement.append(canvas);
  return canvas;
}
