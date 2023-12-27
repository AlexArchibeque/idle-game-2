export interface PlayerSkill {
  name: string;
  description: string;
  cooldown?: number[];
  length?: number[];
  addStrength?: number[];
  level: [number, number];
  levelUpPercentage: number;
  strength: number;
  attack?: { cleave: boolean; damage: number[] };
}

export const PrestigePassiveExperience: PlayerSkill = {
  name: "More Experience",
  description: "Increases experience gain while fighting by 5% per level",
  level: [0, 20],
  levelUpPercentage: 0.05,
  strength: 1,
};
export const PrestigePassiveGold: PlayerSkill = {
  name: "More Gold",
  description: "Increases experience gain while fighting by 5% per level",
  level: [0, 20],
  levelUpPercentage: 0.05,
  strength: 1,
};
export const PrestigePassiveStats: PlayerSkill = {
  name: "More stats",
  description: "Increases stat points by 5 per level (stays on prestige)",
  level: [0, 10],
  levelUpPercentage: 5,
  strength: 0,
};
export const PrestigePassiveSkill: PlayerSkill = {
  name: "More Skills",
  description: "Increases skill points by 1 per level (stays on prestige)",
  level: [0, 10],
  levelUpPercentage: 1,
  strength: 0,
};

export const PrestigeEquipSlots: PlayerSkill = {
  name: "Equipment Slots",
  description: "Increases maximum of equipment slots 1 per level (Permanent)",
  level: [0, 2],
  levelUpPercentage: 1,
  strength: 1,
};

export const PrestigeMaxLevel: PlayerSkill = {
  name: "Max Level",
  description: "Increases max level by 5 per level (Permanent)",
  level: [0, 8],
  levelUpPercentage: 5,
  strength: 0,
};

export const PrestigeSkillExperience: PlayerSkill = {
  name: "Active Experience",
  description: "Increases experience gain while fighting",
  cooldown: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
  length: [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
  level: [0, 10],
  levelUpPercentage: 0.15,
  strength: 1,
};

export const PrestigeSkillGold: PlayerSkill = {
  name: "Active Gold",
  description: "Increses gold gain while fighting",
  cooldown: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
  length: [7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
  level: [0, 10],
  levelUpPercentage: 0.15,
  strength: 1,
};
