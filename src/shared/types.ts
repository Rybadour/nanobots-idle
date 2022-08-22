export interface Upgrades {
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
  bonus: number, 
}