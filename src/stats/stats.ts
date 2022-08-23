import upgrades from "../config/upgrades";
import { Upgrade, Bonuses } from "../shared/types";
import { formatNumber, getExponentialValue } from "../shared/utils";

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

  bonuses: Bonuses;

  constructor(menu: HTMLElement) {
    this.matterEle = menu.querySelector('.matter-count');
    this.matterChanged = true;

    this.upgrades = {};

    this.bonuses = {
      botEatSpeed: 1,
      botLifeTime: 1,
      botSpeed: 1,
      factorySpawnRate: 1,
    };

    const upgradeList = menu.querySelector('.upgrade-list');
    Object.values(upgrades).forEach(up => {
      const ele = template.content.cloneNode(true) as HTMLElement;
      ele.querySelector('.upgrade-name').innerHTML = up.name;
      ele.querySelector('.upgrade-description').innerHTML = 
        up.description.replace('{{bonusPercent}}', formatNumber(up.bonus * 100, 0, 0) + '%');
      const purchase = ele.querySelector('.upgrade-purchase-button');
      purchase.innerHTML = `${up.baseCost} Matter`;
      purchase.addEventListener('click', () => {
        this.onUpgrade(up);
      });
      upgradeList.appendChild(ele);

      const upgradeElements = upgradeList.querySelectorAll('.upgrade');
      this.upgrades[up.id] = {
        ele: upgradeElements.item(upgradeElements.length-1) as HTMLElement,
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

  onUpgrade(upgrade: Upgrade) {
    const upgradeState = this.upgrades[upgrade.id];
    if (this.canAfford(upgradeState.cost)) {
      this.useMatter(upgradeState.cost);
      upgradeState.count += 1;
      upgradeState.cost = getExponentialValue(upgrade.baseCost, upgrade.growth, upgradeState.count);

      const costStr = formatNumber(upgradeState.cost, 0, 0);
      upgradeState.ele.querySelector('.upgrade-purchase-button').innerHTML = costStr + ' Matter';

      this.bonuses[upgrade.bonusKey] += upgrade.bonus;
    }
  }

  update() {
    if (this.matterChanged) {
      this.matterEle.innerText = formatNumber(this.matter, 0, 0);
      this.matterChanged = false;
    }
  }
}

export default Stats;