import upgrades from "../config/upgrades";
import { Upgrades } from "../shared/types";
import { formatNumber } from "../shared/utils";

const template = document.getElementById('upgrade-template') as HTMLTemplateElement;

class Stats {
  matterEle: HTMLElement;
  matter: number = 1000;
  matterChanged: boolean;

  upgrades: Record<string, {
    ele: HTMLElement,
    cost: number,
    count: number,
  }>;

  upgradeBonus: Upgrades;

  constructor(menu: HTMLElement) {
    this.matterEle = menu.querySelector('.matter-count');
    this.matterChanged = true;

    this.upgrades = {};

    const upgradeList = menu.querySelector('.upgrade-list');
    Object.values(upgrades).forEach(up => {
      const ele = template.content.cloneNode(true) as HTMLElement;
      ele.querySelector('.upgrade-name').innerHTML = up.name;
      ele.querySelector('.upgrade-description').innerHTML = 
        up.description.replace('{{bonusPercent}}', formatNumber(up.bonus * 100, 0, 0) + '%');
      ele.querySelector('.upgrade-purchase-button').innerHTML = `${up.baseCost} Matter`;
      upgradeList.appendChild(ele);

      this.upgrades[up.id] = {
        ele: ele,
        cost: up.baseCost,
        count: 0,
      };
    });
  }

  gainMatter(newMatter: number) {
    this.matter += newMatter;
    this.matterChanged = true;
  }

  canAfford(matter: number) {
    return this.matter >= matter;
  }

  useMatter(matter: number) {
    this.matter -= matter;
    this.matterChanged = true;
  }

  update() {
    if (this.matterChanged) {
      this.matterEle.innerText = formatNumber(this.matter, 0, 0);
      this.matterChanged = false;
    }
  }
}

export default Stats;