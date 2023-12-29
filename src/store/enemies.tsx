import { StateCreator } from "zustand";
import { CharacterSlice } from "./character";
import { type EnemyStats } from "../utils/rollMonsterLogic";
import { SkillSlice } from "./skills";
import { handleEnemyRewards } from "../utils/monsterDeathLogic";

export interface EnemySlice {
  gameIsRunning: boolean;
  setGameIsRunning: (turnOff?: boolean) => void;
  handleEnemyDeath: (kills: number, enemy: EnemyStats) => void;
  attackPlayer: (playerHealth: number, enemyDamage: number) => void;
}

export const createEnemySlice: StateCreator<
  EnemySlice & CharacterSlice & SkillSlice,
  [["zustand/devtools", never], ["zustand/immer", never]],
  [],
  EnemySlice
> = (set, get) => ({
  gameIsRunning: false,
  attackPlayer: (playerHealth: number, enemyDamage: number) => {
    set((state) => {
      if (playerHealth <= 0) {
        state.playerStats.health[0] = 0;
      } else {
        state.playerStats.health[0] -= enemyDamage;
      }
    });
  },
  setGameIsRunning: (turnOff?: boolean) => {
    set((state) => {
      if (turnOff) {
        state.gameIsRunning = false;
      } else {
        state.gameIsRunning = !state.gameIsRunning;
      }
    });
  },
  handleEnemyDeath: (kills: number, enemy: EnemyStats) => {
    const currentPrestigeSkills = get().prestigeSkillMap;
    const startedSkills = get().skillsAreStarted;
    const currentPlayerStats = get().playerStats;

    const { newMinExp, newMaxExp, newGold, newLevel, newStats, newSkills } =
      handleEnemyRewards(
        enemy,
        currentPrestigeSkills,
        startedSkills,
        currentPlayerStats
      );

    set((state) => {
      state.playerStats.kills += kills;
      state.playerStats.experience[0] = newMinExp;
      state.playerStats.experience[1] = newMaxExp;
      state.skillPoints += newSkills;
      state.playerStats.statPoints += newStats;
      state.playerStats.level[0] += newLevel;
      state.gold += newGold;
    });
  },
});
