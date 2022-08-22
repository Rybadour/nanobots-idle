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
  nanoLifetime: {
    id: '',
    name: 'Nanobot Lifetime',
    description: 'Increases nanobot lifetime by {{bonusPercent}}.',
    baseCost: 10,
    growth: 1.1,
    bonus: 0.05,
  },
  nanoSpeed: {
    id: '',
    name: 'Nanobot Speed',
    description: 'Increases the movement speed of nanobots by {{bonusPercent}}.',
    baseCost: 10,
    growth: 1.1,
    bonus: 0.05,
  },
  nanoEatSpeed: {
    id: '',
    name: 'Nanobot Eat Speed',
    description: 'Increases the speed at which nanobots consume matter by {{bonusPercent}}.',
    baseCost: 10,
    growth: 1.1,
    bonus: 0.05,
  },
};

Object.entries(upgrades).forEach(([id, upgrade]) => {
  upgrade.id = id;
})

export default upgrades;