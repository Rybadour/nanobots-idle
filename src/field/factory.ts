import { Shape } from "createjs-module";
import { Bonuses } from "shared/types";
import Field from "./field";
import { FieldPosition } from "./field-position";
import NanoBot from "./nanobot";

const SPAWN_RATE = 2;

class Factory {
  display: Shape;

  nextSpawn: number = 0;
  spawnBot: (x: number, y: number) => void;

  constructor(x: number, y: number, spawnBot: (x: number, y: number) => void) {
    this.display = new Shape();
    this.display.graphics.beginFill('blue').drawRect(0, 0, 2, 2);
    this.display.cache(0, 0, 2, 2);
    this.display.setTransform(x, y);

    this.spawnBot = spawnBot;
  }

  getDisplay() {
    return this.display;
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