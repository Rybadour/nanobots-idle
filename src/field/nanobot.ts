import { Shape } from "createjs-module";
import { FieldPosition } from "./field-position";

const SPEED = 2;

class NanoBot {
  position: FieldPosition;
  display: Shape;

  constructor(x: number, y: number) {
    this.position = { x, y };
    this.display = new Shape();
    this.display.graphics.beginFill('grey').drawRect(0, 0, 1, 1);
    this.display.cache(0, 0, 1, 1);
  }

  getDisplay() {
    return this.display;
  }

  update(delta: number) {
    this.position.y += SPEED * delta;
    this.display.setTransform(this.position.x, this.position.y);
  }
}

export default NanoBot;