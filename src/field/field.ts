import { MouseEvent, Shape, Stage } from "createjs-module";
import Stats from "../stats/stats";
import Factory from "./factory";
import NanoBot from "./nanobot";

class Field {
  stage: Stage;
  stats: Stats;
  factories: Factory[];
  nanobots: NanoBot[];

  fieldDisplay: Shape;

  constructor(stage: Stage, stats: Stats) {
    this.stage = stage;
    this.stats = stats;
    this.factories = [];
    this.nanobots = [];

    stage.addEventListener('click', (evt: MouseEvent) => {
      const newFactory = new Factory(Math.round(evt.stageX), Math.round(evt.stageY), this.spawnBot.bind(this));
      this.factories.push(newFactory);

      stage.addChild(newFactory.getDisplay());
    });

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

    this.fieldDisplay = new Shape();
    this.fieldDisplay.graphics
      .beginBitmapFill(fieldCanvas)
      .drawRect(0, 0, fieldImage.width, fieldImage.height);
    this.fieldDisplay.cache(0, 0, 1000, 1000);
    stage.addChild(this.fieldDisplay);
  }

  update(delta: number) {
    this.factories.forEach(f => f.update(delta));
    this.nanobots.forEach(n => n.update(delta));
  }

  claimBits(x: number, y: number, width: number, height: number) {
    this.fieldDisplay.graphics.beginFill('black').drawRect(x, y, width, height);
    this.stats.gainBits(width * height);
  }

  spawnBot(bot: NanoBot) {
    this.nanobots.push(bot);
    this.stage.addChild(bot.getDisplay());
  }
}

export default Field;