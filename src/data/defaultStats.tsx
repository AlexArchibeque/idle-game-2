import type { Item } from "../utils/rollItemLogic";

export const DEFAULT_TOWN_HEALTH_REGEN = 1;
export const DEFAULT_TOWN_MANA_REGEN = 1;

export const DEFAULT_HEALTH_REGEN = 0.5;
export const DEFAULT_MANA_REGEN = 0.5;
export const MIN_PLAYER_DAMAGE = 1;
export const MAX_PLAYER_DAMAGE = 5;
export const MIN_CRIT_CHANCE = 0.05;
export const MIN_CRIT_DAMAGE = 1.2;
export const MIN_MAX_HEALTH = 100;
export const MIN_MAX_MANA = 100;
export const DEFAULT_MAX_LEVEL = 60;
export const DEFAULT_ATTACK_SPEED = 2.0;

export const DEFAULT_GOLD_PERCENTAGE = 0;
export const DEFAULT_EXP_PERCENTAGE = 0;

export interface TownStats {
  townHealthRegen: number;
  townManaRegen: number;
}

export const DEFAULT_TOWN: TownStats = {
  townHealthRegen: DEFAULT_TOWN_HEALTH_REGEN,
  townManaRegen: DEFAULT_TOWN_MANA_REGEN,
};

export const DEFAULT_BAG: (Item | null)[] = new Array(100).fill(
  null
) as (Item | null)[];

export interface PlayerEquipment {
  helm: null | Item;
  chest: null | Item;
  pants: null | Item;
  boots: null | Item;
  gloves: null | Item;
  wrist: null | Item;
  cape: null | Item;
  necklace: null | Item;
  rings: [null | Item, null | Item];
  weaponLeft: null | Item;
  weaponRight: null | Item;
}

export const DEFAULT_PLAYER_EQUIPMENT: PlayerEquipment = {
  helm: null,
  chest: null,
  pants: null,
  boots: null,
  wrist: null,
  cape: null,
  gloves: null,
  necklace: null,
  rings: [null, null],
  weaponLeft: null,
  weaponRight: null,
};

export interface PlayerStats {
  health: [number, number];
  healthRegen: [number, number];
  mana: [number, number];
  manaRegen: [number, number];
  experience: [number, number];
  level: [number, number];
  statPoints: number;
  str: [number, number];
  dex: [number, number];
  con: [number, number];
  skl: [number, number];
  luk: [number, number];
  critPercentage: number;
  critDamage: number;
  goldPercentage: number;
  experiencePercentage: number;
  magicFindPercentage: number;
  kills: number;
  damage: number[];
  attackSpeed: number;
  armor: number;
}

export const DEFAULT_PLAYER_STATS: PlayerStats = {
  armor: 0,
  health: [100, MIN_MAX_HEALTH],
  healthRegen: [DEFAULT_HEALTH_REGEN, DEFAULT_TOWN_HEALTH_REGEN],
  mana: [100, MIN_MAX_MANA],
  manaRegen: [DEFAULT_MANA_REGEN, DEFAULT_TOWN_MANA_REGEN],
  damage: [MIN_PLAYER_DAMAGE, MAX_PLAYER_DAMAGE],
  experience: [0, 100],
  level: [1, DEFAULT_MAX_LEVEL],
  statPoints: 100,
  attackSpeed: DEFAULT_ATTACK_SPEED,
  critPercentage: MIN_CRIT_CHANCE,
  critDamage: MIN_CRIT_DAMAGE,
  goldPercentage: DEFAULT_GOLD_PERCENTAGE,
  experiencePercentage: DEFAULT_EXP_PERCENTAGE,
  magicFindPercentage: 0,
  kills: 0,
  str: [0, 0],
  dex: [0, 0],
  con: [0, 0],
  skl: [0, 0],
  luk: [0, 0],
};

export type PlayerStat = "str" | "dex" | "con" | "skl" | "luk";
export type RegionTypes = "town" | "fightArea";
// Top level, ex: Forest, Abandoned city
export type FightArea = "1" | "2" | "3" | "4" | "5";
// Inner level, ex: Entrance, Pathway, Treeline
export type RegionArea = "1" | "2" | "3" | "4" | "5";

export interface Region {
  type: RegionTypes;
  fightArea: FightArea | null;
  regionArea: RegionArea | null;
  maxEnemies: number;
}

export const DEFAULT_REGION: Region = {
  type: "town",
  fightArea: null,
  regionArea: null,
  maxEnemies: 1,
};

export const DEFAULT_CLASS_STATS = {
  str: 0,
  con: 0,
  skl: 0,
  dex: 0,
  luk: 0,
};
