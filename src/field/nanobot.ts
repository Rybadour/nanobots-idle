import createjs from "createjs-module";
import { Bonuses } from "shared/types";
import Victor from "victor";

const SPEED = 4;
const LIFE_TIME = 5;
const EAT_TIME = 1;

class NanoBot {
  onDoneEating: (bot: NanoBot) => void;

  display: createjs.Shape;
  velocity: Victor;
  lifeTimeLeft: number;
  isEating: boolean;
  eatTimeLeft: number;

  constructor(x: number, y: number, onDoneEating: (bot: NanoBot) => void) {
    this.display = new createjs.Shape();
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

  update(delta: number, bonuses: Bonuses) {
    this.lifeTimeLeft -= delta / bonuses.botLifeTime;

    if (this.isEating) {
      if (this.eatTimeLeft > 0) {
        this.eatTimeLeft -= delta * bonuses.botEatSpeed;
      } else {
        this.stopEating();
      }
      return;
    }

    const speedFactor = delta * bonuses.botSpeed;
    this.display.x += this.velocity.x * speedFactor;
    this.display.y += this.velocity.y * speedFactor;
  }
}

export default NanoBot;