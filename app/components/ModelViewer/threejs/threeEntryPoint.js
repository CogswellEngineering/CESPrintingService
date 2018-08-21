import SceneManager from './SceneManager';
export default (containerElement, modelPath) => {
  //It mayhave to to with this, maybe have been looking in wrong spot.
  //I think this was the problem, it's going straight to document, instead of 
  //the app .
  console.log("Document",document);
  const canvas = createCanvas(document, containerElement);
  const sceneManager = new SceneManager(canvas, modelPath);

  bindEventListeners();
  render();
  function createCanvas(document, containerElement) {
    const canvas = document.createElement('canvas');
    containerElement.appendChild(canvas);
    return canvas;
  }
  function bindEventListeners() {
    window.onresize = resizeCanvas;
    //Need to bind controls here.
    //Do later after see if atleast shows model first.

    resizeCanvas();
  }
  function resizeCanvas() {
    canvas.style.width = '100%';
    canvas.style.height= '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    sceneManager.onWindowResize();
  }
  function render(time) {
    requestAnimationFrame(render);
    sceneManager.update();
  }
}