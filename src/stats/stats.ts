import { formatNumber } from "../shared/utils";

class Stats {
  matterEle: HTMLElement;
  matter: number = 100;

  constructor(menu: HTMLElement) {
    this.matterEle = menu.querySelector('.bits-count');
  }

  gainMatter(newMatter: number) {
    this.matter += newMatter;
  }

  update() {
    this.matterEle.innerText = formatNumber(this.matter, 0, 0);
  }
}

export default Stats;