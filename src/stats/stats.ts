import { formatNumber } from "../shared/utils";

class Stats {
  bitsEle: HTMLElement;
  bits: number = 100;

  constructor(menu: HTMLElement) {
    this.bitsEle = menu.querySelector('.bits-count');
  }

  gainBits(newBits: number) {
    this.bits += newBits;
  }

  update() {
    this.bitsEle.innerText = formatNumber(this.bits, 0, 0);
  }
}

export default Stats;