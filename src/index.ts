import './main.scss';
import createjs, { MouseEvent, Ticker } from "createjs-module";


const stage = new createjs.Stage("main-canvas");
stage.scaleX = 1;
stage.scaleY = 1;

const avgColor = [150, 0, 0, 255];
const fieldImage = new ImageData(1000, 1000);
for (let p = 0; p < fieldImage.width*fieldImage.height; ++p) {
  const c = p * 4;
  const newBrightness = 1 + (Math.random() * 0.3) - 0.15;
  fieldImage.data[c]   = Math.floor(avgColor[0] * newBrightness); 
  fieldImage.data[c+1] = avgColor[1] * newBrightness; 
  fieldImage.data[c+2] = avgColor[2] * newBrightness; 
  fieldImage.data[c+3] = avgColor[3];
}
const fieldCanvas = document.createElement('canvas');
fieldCanvas.getContext('2d').putImageData(fieldImage, 0, 0);

const background = new createjs.Shape();
background.graphics
  .beginBitmapFill(fieldCanvas)
  .drawRect(0, 0, fieldImage.width, fieldImage.height);
background.cache(0, 0, 1000, 1000);
stage.addChild(background);

stage.update();

Ticker.framerate = 30;
Ticker.addEventListener('tick', () => {
  stage.update();
});

stage.addEventListener('click', (evt: MouseEvent) => {
  background.graphics.beginFill('rgba(0, 0, 0, 1)').drawRect(evt.stageX, evt.stageY, 1, 1);
  background.cache(0, 0, 1000, 1000);
});