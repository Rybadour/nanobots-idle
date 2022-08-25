import Assets from "assets";
import createjs from "createjs-module";

import { Bonuses } from "../shared/types";
import { centerDisplayOn } from "../shared/utils";

const SPAWN_RATE = 4;

class Factory {
  display: createjs.DisplayObject;

  nextSpawn: number = 0;
  spawnBot: (x: number, y: number) => void;

  constructor(x: number, y: number, assets: Assets, spawnBot: (x: number, y: number) => void) {
    this.display = assets.getSprite('nano-core');
    centerDisplayOn(x, y, this.display);

    this.spawnBot = spawnBot;
  }

  update(delta: number, bonuses: Bonuses) {
    if (this.nextSpawn > 0) {
      this.nextSpawn -= delta * bonuses.factorySpawnRate;
      return;
    }

    this.spawnBot(this.display.x, this.display.y);
    this.nextSpawn = SPAWN_RATE;
  }

}

export default Factory;