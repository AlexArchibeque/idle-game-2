import { type PlayerSkill } from "./skillData";

export const BarbHealth: PlayerSkill = {
  name: "Health",
  description: "Increase your regen",
  cooldown: [40, 55, 65, 75, 85, 95, 105, 115, 125, 135, 150],
  length: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
  level: [0, 10],
  levelUpPercentage: 0.5,
  strength: 1.5,
};

export const BarbAttack: PlayerSkill = {
  name: "Slam",
  description: "Attack the enemy, or Enemies",
  cooldown: [45, 55, 65, 75, 85, 95, 105, 115, 125, 135],
  level: [0, 10],
  levelUpPercentage: 0.2,
  strength: 1.5,
  attack: {
    cleave: true,
    damage: [45, 55, 65, 75, 85, 95, 105, 115, 125, 135],
  },
};

export const BarbRage: PlayerSkill = {
  name: "Rage",
  description: "Shout an attack buff on yourself",
  cooldown: [40, 55, 65, 75, 85, 95, 105, 115, 125, 135],
  length: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
  level: [0, 10],
  levelUpPercentage: 0.15,
  strength: 1.5,
};

export const BarbPassiveEcho: PlayerSkill = {
  name: "Echo",
  description: "Increase Dexterity by listening to the sounds around you.",
  level: [0, 10],
  levelUpPercentage: 0,
  strength: 1,
  addStrength: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
};

export const BarbPassiveAttack: PlayerSkill = {
  name: "Attack Training",
  description: "Increase min and max attack by a base amount",
  level: [0, 10],
  levelUpPercentage: 0,
  strength: 1,
  addStrength: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
};

export const BarbPassiveHealth: PlayerSkill = {
  name: "Armor Training",
  description:
    "Multiply max health by being able to see hearts through your visor",
  level: [0, 10],
  levelUpPercentage: 0.15,
  strength: 1,
};

export const BarbPassiveStrength: PlayerSkill = {
  name: "Muscle Training",
  description: "Increase strength by, you guessed it, training the muscles",
  level: [0, 10],
  levelUpPercentage: 0,
  strength: 1,
  addStrength: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
};

export const BarbPassiveCrit: PlayerSkill = {
  name: "Precise Attack",
  description:
    "Increase critical chance and damage by being able to maneuver around your opponents",
  level: [0, 10],
  levelUpPercentage: 0.01,
  strength: 0,
  addStrength: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
};

export const BarbPassiveAttackSpeed: PlayerSkill = {
  name: "Quickness",
  description:
    "Sense the enemies movements and make your attack speed just that much quicker.",
  level: [0, 5],
  levelUpPercentage: 0,
  strength: 1,
  addStrength: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
};
