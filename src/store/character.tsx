import { StateCreator } from "zustand";
import type {
  Classes,
  PickedClassStats,
} from "../components/classScreen/classChoices";
import {
  DEFAULT_CLASS_STATS,
  DEFAULT_PLAYER_EQUIPMENT,
  DEFAULT_PLAYER_STATS,
  PlayerEquipment,
  PlayerStats,
} from "../data/defaultStats";
import { updateStats } from "../utils/updateStats";
import {
  type BarbMap,
  type ClericMap,
  type MageMap,
  type PrestigeMap,
  barbMap,
  mageMap,
  clericMap,
  prestigeMap,
} from "../data/skillMaps";

export interface CharacterSlice {
  currentClass: Classes | null;
  currentClassStats: PickedClassStats;
  playerStats: PlayerStats;
  playerEquipment: PlayerEquipment[];
  barbarianSkillMap: BarbMap;
  clericSkillMap: ClericMap;
  mageSkillMap: MageMap;
  prestigeSkillMap: PrestigeMap;
  skillsAreStarted: boolean[];
  currentEquipmentSlot: number;
  setClass: (classToSet: Classes | null, classStats: PickedClassStats) => void;
}

export const createCharacterSlice: StateCreator<
  CharacterSlice,
  [["zustand/devtools", never], ["zustand/immer", never]],
  [],
  CharacterSlice
> = (set, get) => ({
  currentClassStats: DEFAULT_CLASS_STATS,
  currentClass: null,
  playerStats: DEFAULT_PLAYER_STATS,
  playerEquipment: [
    DEFAULT_PLAYER_EQUIPMENT,
    DEFAULT_PLAYER_EQUIPMENT,
    DEFAULT_PLAYER_EQUIPMENT,
  ],
  currentEquipmentSlot: 0,
  barbarianSkillMap: barbMap,
  clericSkillMap: clericMap,
  mageSkillMap: mageMap,
  prestigeSkillMap: prestigeMap,
  skillsAreStarted: [false, false, false, false, false],
  setClass: (classToSet, classStats) => {
    set(
      {
        currentClass: classToSet,
        currentClassStats: classStats,
      },
      false,
      "SetClass"
    );
  },
  updatePlayerStats: () => {
    const equipSlot = get().currentEquipmentSlot;
    const PlayerStats = get().playerStats;
    const Equipment =
      get().playerEquipment[equipSlot] || DEFAULT_PLAYER_EQUIPMENT;
    const CurrentClassStats = get().currentClassStats;
    const PrestigeSkills = get().prestigeSkillMap;
    const BarbSkills = get().barbarianSkillMap;
    const MageSkills = get().mageSkillMap;
    const ClericSkills = get().clericSkillMap;
    const StartedSkills = get().skillsAreStarted;

    const {
      maxLevel,
      attackSpeed,
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
      armor,
    } = updateStats(
      PlayerStats,
      Equipment,
      CurrentClassStats,
      PrestigeSkills,
      BarbSkills,
      MageSkills,
      ClericSkills,
      StartedSkills
    );

    set((state) => {
      // LEVEL
      state.playerStats.level[1] = maxLevel;

      // ATTACK SPEED
      state.playerStats.attackSpeed = attackSpeed;

      // ARMOR
      state.playerStats.armor = armor;

      // STR
      state.playerStats.str[1] = finalStr;
      state.playerStats.damage[0] = minDamage;
      state.playerStats.damage[1] = maxDamage;

      // DEX
      state.playerStats.dex[1] = finalDex;
      state.playerStats.critPercentage = critChance;
      state.playerStats.critDamage = critDamage;

      // CON
      state.playerStats.con[1] = finalCon;
      state.playerStats.health[0] = minHealth || maxHealth;
      state.playerStats.health[1] = maxHealth;
      state.playerStats.healthRegen[0] = healthRegen;

      // SKL
      state.playerStats.skl[1] = finalSkl;
      state.playerStats.mana[0] = minMana || maxMana;
      state.playerStats.mana[1] = maxMana;
      state.playerStats.manaRegen[0] = manaRegen;

      // LUK
      state.playerStats.luk[1] = finalLuk;

      // GOLD Percentage
      state.playerStats.goldPercentage = goldPercentage;
      // EXP Percentage
      state.playerStats.experiencePercentage = expPercentage;
      // MAGIC FIND Percentage
      state.playerStats.magicFindPercentage = magicFindPercentage;
    });
  },
});
