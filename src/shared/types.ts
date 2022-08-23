export interface Bonuses {
  botLifeTime: number,
  botSpeed: number,
  botEatSpeed: number,
  factorySpawnRate: number,
}

export interface Upgrade {
  id: string,
  name: string,
  description: string,
  baseCost: number,
  growth: number,
  bonusKey: keyof Bonuses,
  bonus: number, 
}