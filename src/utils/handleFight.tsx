import { type PlayerStats } from "../data/defaultStats";
import { type EnemyStats } from "./rollMonsterLogic";
import { randomInteger } from "../reusables/functions";

const determineCritDamage = (damage: number, critDamage: number): number => {
  return Math.ceil(damage * critDamage);
};

const Fight = (
  playerStats: PlayerStats,
  enemyStats: EnemyStats,
  isPlayerAttack: boolean
) => {
  let [minPlayerDamage, maxPlayerDamage] = playerStats.damage;
  const [minEnemyDamage, maxEnemyDamage] = enemyStats.damage;
  const armor = playerStats.armor;
  minPlayerDamage = Math.trunc(minPlayerDamage || 0);
  maxPlayerDamage = Math.trunc(maxPlayerDamage || 0);
  if (isPlayerAttack) {
    let playerDamage =
      (minPlayerDamage &&
        maxPlayerDamage &&
        randomInteger(minPlayerDamage, maxPlayerDamage)) ||
      0;

    // Crit calculations
    const isCrit =
      Math.random() <= Number.parseFloat(playerStats.critPercentage.toFixed(2));
    if (isCrit)
      playerDamage = determineCritDamage(playerDamage, playerStats.critDamage);

    const newEnemyHealth = enemyStats.health[0] - playerDamage || 0;

    return {
      newHealth: newEnemyHealth,
      damage: playerDamage || 0,
      isCrit,
    };
  } else {
    // Every 4 points of armor is 1% dmg reduction.
    const armorPercentage = (100 - Math.ceil(armor / 4)) * 0.01;
    let enemyDamage =
      (minEnemyDamage &&
        maxEnemyDamage &&
        randomInteger(minEnemyDamage, maxEnemyDamage)) ||
      0;

    enemyDamage = Math.floor(enemyDamage * armorPercentage) || 1;

    const newPlayerHealth =
      (playerStats.health[0] && playerStats.health[0] - enemyDamage) || 0;

    return {
      newHealth: newPlayerHealth,
      damage: enemyDamage || 0,
      isCrit: null,
    };
  }
};

export { Fight };
