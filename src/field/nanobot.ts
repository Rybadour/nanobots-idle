import { Point, Shape } from "createjs-module";
import Victor from "victor";

const SPEED = 3;
const LIFE_TIME = 10;
const EAT_TIME = 0.5;

class NanoBot {
  onDoneEating: (bot: NanoBot) => void;

  display: Shape;
  velocity: Victor;
  lifeTimeLeft: number;
  isEating: boolean;
  eatTimeLeft: number;

  constructor(x: number, y: number, onDoneEating: (bot: NanoBot) => void) {
    this.display = new Shape();
    this.display.graphics.beginFill('grey').drawRect(0, 0, 1, 1);
    this.display.cache(0, 0, 1, 1);
    this.display.x = x;
    this.display.y = y;

    this.velocity = new Victor(SPEED, 0);
    this.velocity.rotateBy(Math.PI*2*Math.random());

    this.lifeTimeLeft = LIFE_TIME;

    this.onDoneEating = onDoneEating;
  }

  stopAndEat() {
    this.isEating = true;
    this.eatTimeLeft = EAT_TIME;
  }

  stopEating() {
    this.isEating = false;
    this.onDoneEating(this);
  }

  update(delta: number) {
    this.lifeTimeLeft -= delta;

    if (this.isEating) {
      if (this.eatTimeLeft > 0) {
        this.eatTimeLeft -= delta;
      } else {
        this.stopEating();
      }
      return;
    }

    this.display.x += this.velocity.x * delta;
    this.display.y += this.velocity.y * delta;
  }
}

export default NanoBot;