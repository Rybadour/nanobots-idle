import './main.scss';
import createjs from "createjs-module";
import Field from './field/field';
import Stats from './stats/stats';
import Assets from './assets';

const assets = new Assets(() => {
  field.assetsLoaded(assets);
});

const stage = new createjs.Stage("main-canvas");
stage.scaleX = 1;
stage.scaleY = 1;

(document.getElementById('main-canvas') as HTMLCanvasElement).getContext('2d').imageSmoothingEnabled = true;

const menuEle = document.getElementById('menu');
const stats = new Stats(menuEle);

const field = new Field(stage, stats, assets);

createjs.Ticker.framerate = 30;
createjs.Ticker.addEventListener('tick', (evt: createjs.TickerEvent) => {
  if (!assets.isLoaded) {
    return;
  }

  const deltaSecs = evt.delta / 1000;
  field.update(deltaSecs);
  stats.update();

  stage.update();
});

