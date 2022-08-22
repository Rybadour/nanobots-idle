import './main.scss';
import createjs, { MouseEvent, Ticker, TickerEvent } from "createjs-module";
import Field from './field/field';
import Stats from './stats/stats';


const stage = new createjs.Stage("main-canvas");
stage.scaleX = 1;
stage.scaleY = 1;

(document.getElementById('main-canvas') as HTMLCanvasElement).getContext('2d').imageSmoothingEnabled = true;

const menuEle = document.getElementById('menu');
const stats = new Stats(menuEle);

const field = new Field(stage, stats);

Ticker.framerate = 30;
Ticker.addEventListener('tick', (evt: TickerEvent) => {
  const deltaSecs = evt.delta / 1000;
  field.update(deltaSecs);
  stats.update();

  stage.update();
});

