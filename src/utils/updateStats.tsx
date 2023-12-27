import { type PickedClassStats } from "../components/classScreen/classChoices";
import type {
  BarbMap,
  ClericMap,
  MageMap,
  PrestigeMap,
} from "../data/skillMaps";
import type { PlayerStats, PlayerEquipment } from "../data/defaultStats";
import { extractItemStat } from "./itemStatRetrieval";
import {
  DEFAULT_HEALTH_REGEN,
  DEFAULT_MANA_REGEN,
  MIN_PLAYER_DAMAGE,
  MAX_PLAYER_DAMAGE,
  MIN_CRIT_CHANCE,
  MIN_CRIT_DAMAGE,
  MIN_MAX_HEALTH,
  MIN_MAX_MANA,
  DEFAULT_MAX_LEVEL,
  DEFAULT_ATTACK_SPEED,
} from "../data/defaultStats";
import { BarbSkillStatRetrieval } from "./skillStatRetrieval/barbSkillRetrieval";

export const updateStats = (
  playerStats: PlayerStats,
  currentEquipment: PlayerEquipment,
  currentClassStats: PickedClassStats,
  PrestigeSkills: PrestigeMap,
  BarbSkills: BarbMap,
  MageSkills: MageMap,
  ClericSkills: ClericMap,
  StartedSkills: boolean[]
) => {
  const { str, dex, con, skl, luk, health, mana } = playerStats;
  const {
    helm,
    chest,
    pants,
    boots,
    wrist,
    cape,
    gloves,
    necklace,
    rings,
    weaponLeft,
    weaponRight,
  } = currentEquipment;

  const arrayOfItems = [
    helm,
    chest,
    pants,
    boots,
    wrist,
    cape,
    gloves,
    necklace,
    rings[0],
    rings[1],
    weaponLeft,
    weaponRight,
  ];

  const {
    str: classStr,
    dex: classDex,
    con: classCon,
    luk: classLuk,
    skl: classSkl,
  } = currentClassStats;

  const { max_level } = PrestigeSkills;
  const {
    barbMultiAttack,
    barbBaseAttack,
    barbRegen,
    barbBaseDex,
    barbMultHealth,
    barbBaseStrength,
    barbMultiCrit,
    barbBaseCritDamage,
    barbBaseAttackSpeed,
  } = BarbSkillStatRetrieval(BarbSkills, StartedSkills);
  // Attack speed
  const attackSpeed = DEFAULT_ATTACK_SPEED - barbBaseAttackSpeed;

  // Armor
  const armor = extractItemStat(arrayOfItems, "armor");

  // Level
  const maxLevel = DEFAULT_MAX_LEVEL + max_level.strength;
  // STR
  const itemStr = extractItemStat(arrayOfItems, "str");
  const finalStr = str[0] + itemStr + classStr + barbBaseStrength;

  // DAMAGE Min, Max
  const damage = weaponLeft?.weaponDamage || [];
  const weaponMinDamage = damage[0] || 0;
  const weaponMaxDamage = damage[1] || 0;
  const minDamage =
    Math.floor((finalStr * 0.1 + MIN_PLAYER_DAMAGE) * barbMultiAttack) +
    barbBaseAttack +
    weaponMinDamage;
  const maxDamage =
    Math.ceil((finalStr * 1.01 + MAX_PLAYER_DAMAGE) * barbMultiAttack) +
    barbBaseAttack +
    weaponMaxDamage;

  // DEX
  const itemDex = extractItemStat(arrayOfItems, "dex");
  const finalDex = dex[0] + itemDex + classDex + barbBaseDex;
  // CRITICAL CHANCE
  const itemCritChance = extractItemStat(arrayOfItems, "critChance") * 0.001;
  const dexCritChance = finalDex * 0.001;
  const critChance =
    dexCritChance + MIN_CRIT_CHANCE + barbMultiCrit + itemCritChance;

  // CRITICAL DAMAGE
  const itemCritDamage = extractItemStat(arrayOfItems, "critDamage") * 0.01;
  const dexCritDamage = finalDex * 0.01;
  const critDamage =
    dexCritDamage + MIN_CRIT_DAMAGE + barbBaseCritDamage + itemCritDamage;

  // CON
  const itemCon = extractItemStat(arrayOfItems, "con");
  const finalCon = con[0] + itemCon + classCon;
  // HP Regen
  const itemHPRegen = extractItemStat(arrayOfItems, "healthRegen") * 0.1;
  const conHPRegen = finalCon * 0.15;
  const healthRegen =
    conHPRegen + DEFAULT_HEALTH_REGEN * barbRegen + itemHPRegen;
  // HP Max
  const itemMaxHp = extractItemStat(arrayOfItems, "maxHealth");
  const maxHealth =
    Math.ceil((finalCon * 1.5 + MIN_MAX_HEALTH) * barbMultHealth) + itemMaxHp;
  const minHealth = health[0] && health[0] > maxHealth ? maxHealth : health[0];

  // SKL
  const itemSkl = extractItemStat(arrayOfItems, "skl");
  const finalSkl = skl[0] + itemSkl + classSkl;
  // MP Regen
  const itemMPRegen = extractItemStat(arrayOfItems, "manaRegen") * 0.1;
  const sklManaRegen = finalSkl * 0.15;
  const manaRegen = sklManaRegen + DEFAULT_MANA_REGEN + itemMPRegen;
  // MP Max
  const itemMaxMP = extractItemStat(arrayOfItems, "maxMana");
  const maxMana = Math.ceil(finalSkl * 1.5 + MIN_MAX_MANA) + itemMaxMP;
  const minMana = mana[0] && mana[0] > maxMana ? maxMana : mana[0];

  // LUK
  const itemLuk = extractItemStat(arrayOfItems, "luk");
  const finalLuk = luk[0] + itemLuk + classLuk;

  // GOLD %
  const goldPercentage = extractItemStat(arrayOfItems, "goldPercentage");
  // EXP %
  const expPercentage = extractItemStat(arrayOfItems, "experiencePercentage");
  // MAGIC FIND %
  const magicFindPercentage = extractItemStat(arrayOfItems, "magicFind");

  return {
    maxLevel,
    attackSpeed,
    armor,
    finalStr,
    minDamage,
    maxDamage,
    finalDex,
    critChance,
    critDamage,
    finalCon,
    minHealth,
    maxHealth,
    healthRegen,
    finalSkl,
    minMana,
    maxMana,
    manaRegen,
    finalLuk,
    goldPercentage,
    expPercentage,
    magicFindPercentage,
  };
};
