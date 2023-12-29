import type { PlayerStats } from "../data/defaultStats";
import type { PrestigeMap } from "../data/skillMaps";
import type { EnemyStats } from "./rollMonsterLogic";

const LEVEL_UP_EXP_MULTIPLIER = 2.5;

export const handleEnemyRewards = (
  enemy: EnemyStats,
  PrestigeSkillMap: PrestigeMap,
  startedSkills: boolean[],
  playerStats: PlayerStats
) => {
  let newMinExp = 0,
    newMaxExp = 0,
    newGold = 0,
    newLevel = 0,
    newStats = 0,
    newSkills = 0;

  const {
    goldPercentage: playerGoldPercentage,
    experiencePercentage: playerExperiencePercentage,
  } = playerStats;

  const { active_gold, active_exp, passive_exp, passive_gold } =
    PrestigeSkillMap;

  const isPrestigeExpActive = startedSkills[3];
  const isPrestigeGoldActive = startedSkills[4];

  // EXP
  let monsterExp = enemy.experience;
  if (active_exp.level[0] > 0 && isPrestigeExpActive) {
    monsterExp *= active_exp.strength;
  }
  if (passive_exp.level[0] > 0) {
    monsterExp *= passive_exp.strength;
  }
  const playerExperienceMultiplyier = playerExperiencePercentage / 100 + 1;
  const nextExp = Math.ceil(
    (playerStats.experience[0] + Math.ceil(monsterExp)) *
      playerExperienceMultiplyier
  );
  const maxExp = playerStats.experience[1] || 0;

  // GOLD
  newGold = enemy.goldOnKill || 0;
  if (active_gold.level[0] > 0 && isPrestigeGoldActive) {
    newGold *= active_gold.strength;
  }
  if (passive_gold.level[0] > 0) {
    newGold *= passive_gold.strength;
  }
  const playerGoldMultiplier = playerGoldPercentage / 100 + 1;
  newGold = Math.ceil(newGold * playerGoldMultiplier);

  // Level up assignment
  const didPlayerLevelUp = nextExp >= maxExp;
  if (didPlayerLevelUp) {
    newMinExp = nextExp - maxExp;
    newMaxExp = playerStats.experience[1] * LEVEL_UP_EXP_MULTIPLIER;
    newLevel += 1;
    newSkills += 1;
    newStats += 5;
  } else {
    newMinExp = nextExp;
    newMaxExp = maxExp;
  }

  return {
    newMinExp,
    newMaxExp,
    newGold,
    newLevel,
    newStats,
    newSkills,
  };
};
