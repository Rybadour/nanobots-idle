import {Upgrade} from '../shared/types';

const upgrades: Record<string, Upgrade> = {
  spawnRate: {
    id: '',
    name: 'Factory Spawn Rate',
    description: 'Increases the speed that factories spawn nanobots by {{bonusPercent}}.',
    baseCost: 50,
    growth: 1.1,
    bonusKey: 'factorySpawnRate',
    bonus: 0.25,
  },
  nanoLifetime: {
    id: '',
    name: 'Nanobot Lifetime',
    description: 'Increases nanobot lifetime by {{bonusPercent}}.',
    baseCost: 8,
    growth: 1.1,
    bonusKey: 'botLifeTime',
    bonus: 0.05,
  },
  nanoSpeed: {
    id: '',
    name: 'Nanobot Speed',
    description: 'Increases the movement speed of nanobots by {{bonusPercent}}.',
    baseCost: 20,
    growth: 1.1,
    bonusKey: 'botSpeed',
    bonus: 0.1,
  },
  nanoEatSpeed: {
    id: '',
    name: 'Nanobot Eat Speed',
    description: 'Increases the speed at which nanobots consume matter by {{bonusPercent}}.',
    baseCost: 100,
    growth: 1.1,
    bonusKey: 'botEatSpeed',
    bonus: 1,
  },
};

Object.entries(upgrades).forEach(([id, upgrade]) => {
  upgrade.id = id;
})

export default upgrades;