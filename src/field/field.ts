import { MouseEvent, Shape, Stage } from "createjs-module";
import Stats from "../stats/stats";
import Factory from "./factory";
import NanoBot from "./nanobot";

const WIDTH = 1000;
const HEIGHT = 1000;

const FACTORY_COST = 1000;

class Field {
  stage: Stage;
  stats: Stats;
  factories: Factory[];
  nanobots: NanoBot[];
  bits: boolean[];

  fieldDisplay: Shape;

  constructor(stage: Stage, stats: Stats) {
    this.stage = stage;
    this.stats = stats;
    this.factories = [];
    this.nanobots = [];
    this.bits = [];

    stage.addEventListener('click', (evt: MouseEvent) => {
      if (!this.stats.canAfford(FACTORY_COST)) {
        return;
      }

      this.stats.useMatter(FACTORY_COST);

      const newFactory = new Factory(Math.round(evt.stageX), Math.round(evt.stageY), this.spawnBot.bind(this));
      this.factories.push(newFactory);

      stage.addChild(newFactory.getDisplay());
    });

    const avgColor = [150, 0, 0, 255];
    const fieldImage = new ImageData(WIDTH, HEIGHT);
    for (let p = 0; p < fieldImage.width*fieldImage.height; ++p) {
      const c = p * 4;
      const newBrightness = 1 + (Math.random() * 0.3) - 0.15;
      fieldImage.data[c]   = Math.floor(avgColor[0] * newBrightness); 
      fieldImage.data[c+1] = avgColor[1] * newBrightness; 
      fieldImage.data[c+2] = avgColor[2] * newBrightness; 
      fieldImage.data[c+3] = avgColor[3];

      this.bits.push(true);
    }
    const fieldCanvas = document.createElement('canvas');
    fieldCanvas.getContext('2d').putImageData(fieldImage, 0, 0);

    this.fieldDisplay = new Shape();
    this.fieldDisplay.graphics
      .beginBitmapFill(fieldCanvas)
      .drawRect(0, 0, WIDTH, HEIGHT);
    this.fieldDisplay.cache(0, 0, WIDTH, HEIGHT);
    stage.addChild(this.fieldDisplay);
  }

  update(delta: number) {
    this.factories.forEach(f => f.update(delta));
    this.nanobots = this.nanobots.filter(n => {
      n.update(delta);
      
      if (!n.isEating) {
        const bi = this.getBitIndex(n.display.x, n.display.y);
        if (this.bits[bi]) {
          n.stopAndEat();
        }
      }

      if (n.lifeTimeLeft <= 0) {
        this.stage.removeChild(n.display);
        return false;
      }
      return true;
    });
  }

  claimMatter(x: number, y: number) {
    this.fieldDisplay.graphics.beginFill('black').drawRect(x, y, 1, 1);
    this.fieldDisplay.cache(0, 0, WIDTH, HEIGHT);
    this.stats.gainMatter(1);
    this.bits[this.getBitIndex(x, y)] = false;
  }

  onEatMatter(bot: NanoBot) {
    this.claimMatter(bot.display.x, bot.display.y);
  }

  spawnBot(x: number, y: number) {
    const bot = new NanoBot(x, y, this.onEatMatter.bind(this));
    this.nanobots.push(bot);
    this.stage.addChild(bot.display);
  }

  getBitIndex(x: number, y: number) {
    return Math.floor(x) + Math.floor(y) * WIDTH;
  }
}

export default Field;