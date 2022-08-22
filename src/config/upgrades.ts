import {Upgrade} from '../shared/types';

const upgrades: Record<string, Upgrade> = {
  spawnRate: {
    id: '',
    name: 'Factory Spawn Rate',
    description: 'Increases the speed that factories spawn nanobots by {{bonusPercent}}.',
    baseCost: 10,
    growth: 1.1,
    bonus: 0.05,
  },
  poop: {
    id: '',
    name: 'Factory Poop Rate',
    description: 'Increases the speed that factories poop.',
    baseCost: 10,
    growth: 1.1,
    bonus: 0.05,
  },
};

Object.entries(upgrades).forEach(([id, upgrade]) => {
  upgrade.id = id;
})

export default upgrades;