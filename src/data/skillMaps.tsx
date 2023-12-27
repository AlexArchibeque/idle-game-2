import {
  type PlayerSkill,
  PrestigeSkillExperience,
  PrestigeSkillGold,
  PrestigeEquipSlots,
  PrestigeMaxLevel,
  PrestigePassiveExperience,
  PrestigePassiveGold,
  PrestigePassiveSkill,
  PrestigePassiveStats,
} from "./skills/skillData";

import {
  ClericFeast,
  ClericPotion,
  ClericShield,
} from "./skills/clericSkillData";
import { MageFire, MageIce, MageLightning } from "./skills/mageSkillData";
import {
  BarbRage,
  BarbAttack,
  BarbHealth,
  BarbPassiveAttack,
  BarbPassiveEcho,
  BarbPassiveHealth,
  BarbPassiveStrength,
  BarbPassiveCrit,
  BarbPassiveAttackSpeed,
} from "./skills/barbSkillData";

export interface BarbMap {
  rage: PlayerSkill;
  attack: PlayerSkill;
  health: PlayerSkill;
  passive_attack: PlayerSkill;
  passive_echo: PlayerSkill;
  passive_health: PlayerSkill;
  passive_strength: PlayerSkill;
  passive_crit: PlayerSkill;
  passive_attack_speed: PlayerSkill;
}

export type barbKeys = keyof BarbMap;

export const barbMap: BarbMap = {
  rage: BarbRage,
  attack: BarbAttack,
  health: BarbHealth,
  passive_attack: BarbPassiveAttack,
  passive_echo: BarbPassiveEcho,
  passive_health: BarbPassiveHealth,
  passive_strength: BarbPassiveStrength,
  passive_crit: BarbPassiveCrit,
  passive_attack_speed: BarbPassiveAttackSpeed,
};

export interface MageMap {
  fire: PlayerSkill;
  ice: PlayerSkill;
  lightning: PlayerSkill;
}

export type mageKeys = keyof MageMap;

export const mageMap: MageMap = {
  fire: MageFire,
  ice: MageIce,
  lightning: MageLightning,
};

export interface ClericMap {
  feast: PlayerSkill;
  potion: PlayerSkill;
  shield: PlayerSkill;
}

export type clericKeys = keyof ClericMap;

export const clericMap: ClericMap = {
  feast: ClericFeast,
  potion: ClericPotion,
  shield: ClericShield,
};

export interface PrestigeMap {
  active_gold: PlayerSkill;
  active_exp: PlayerSkill;
  passive_gold: PlayerSkill;
  passive_exp: PlayerSkill;
  max_level: PlayerSkill;
  equip_slots: PlayerSkill;
  stats: PlayerSkill;
  skills: PlayerSkill;
}

export type prestigeKeys = keyof PrestigeMap;

export const prestigeMap = {
  active_gold: PrestigeSkillGold,
  active_exp: PrestigeSkillExperience,
  passive_gold: PrestigePassiveGold,
  passive_exp: PrestigePassiveExperience,
  max_level: PrestigeMaxLevel,
  equip_slots: PrestigeEquipSlots,
  stats: PrestigePassiveStats,
  skills: PrestigePassiveSkill,
};
