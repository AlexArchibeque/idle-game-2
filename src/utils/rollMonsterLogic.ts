import { randomInteger, randomIntegerNoFloor } from "../reusables/functions";
import { type Region } from "../data/defaultStats";
import {
  MonsterNames,
  DIFFICULTY_MODIFIERS,
  MONSTER_AREA_MAXIMUMS,
  MONSTER_AREA_MINIMUMS,
} from "../data/monsterData";

export interface EnemyStats {
  name: string;
  health: [number, number];
  damage: [number, number];
  attackSpeed: number;
  experience: number;
  luck: number;
  goldOnKill: number;
}

export const returnDefaultEnemy = (): EnemyStats => {
  return {
    name: "Default Enemy",
    health: [20, 20],
    damage: [1, 5],
    attackSpeed: 1.0,
    experience: 52,
    luck: 20,
    goldOnKill: 5,
  };
};

export const RollMonsterLogic = (currentRegion: Region) => {
  let { fightArea } = currentRegion;
  fightArea = fightArea || "1";

  const newEnemy = returnDefaultEnemy();

  const NameNumber = randomInteger(0, 9);
  const name = MonsterNames[fightArea][NameNumber];
  newEnemy.name = name || "Default Enemy";

  newEnemy.attackSpeed = randomIntegerNoFloor(0.5, 2);

  const difficultyModifier = DIFFICULTY_MODIFIERS[fightArea];

  // Health
  const minimumHealth = MONSTER_AREA_MINIMUMS[fightArea].health;
  const maximumHealth = MONSTER_AREA_MAXIMUMS[fightArea].health;
  const monsterHealth = Math.floor(
    randomInteger(minimumHealth, maximumHealth) * difficultyModifier
  );

  newEnemy.health = [monsterHealth, monsterHealth];

  // Damage
  const minMinDamage = MONSTER_AREA_MINIMUMS[fightArea].minDamage;
  const maxMinDamage = MONSTER_AREA_MAXIMUMS[fightArea].minDamage;

  const minMaxDamage = MONSTER_AREA_MINIMUMS[fightArea].maxDamage;
  const maxMaxDamage = MONSTER_AREA_MAXIMUMS[fightArea].maxDamage;

  const monsterMinDamage = Math.floor(
    randomInteger(minMinDamage, maxMinDamage) * difficultyModifier
  );
  const monsterMaxDamage = Math.floor(
    randomInteger(minMaxDamage, maxMaxDamage) * difficultyModifier
  );

  newEnemy.damage = [monsterMinDamage, monsterMaxDamage];

  // Experience
  const minExperience = MONSTER_AREA_MINIMUMS[fightArea].experience;
  const maxExperience = MONSTER_AREA_MAXIMUMS[fightArea].experience;

  const monsterExp = Math.floor(
    randomInteger(minExperience, maxExperience) * difficultyModifier
  );

  newEnemy.experience = monsterExp;

  // Luck
  const minLuck = MONSTER_AREA_MINIMUMS[fightArea].luck;
  const maxLuck = MONSTER_AREA_MAXIMUMS[fightArea].luck;

  const monsterLuck =
    randomIntegerNoFloor(minLuck, maxLuck) * difficultyModifier;
  newEnemy.luck = monsterLuck;

  newEnemy.goldOnKill = randomInteger(5, 20);

  return newEnemy;
};
