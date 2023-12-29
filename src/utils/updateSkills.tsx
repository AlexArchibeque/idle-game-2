import { type PlayerSkill } from "../data/skills/skillData";

export const addPlayerSkill = (playerSkill: PlayerSkill): PlayerSkill => {
  const skill = { ...playerSkill };
  if (playerSkill.attack) {
    skill.attack = { ...playerSkill.attack };
  }
  skill.level = [...playerSkill.level];
  const { level } = skill;

  const newStrength = skill.strength + skill.levelUpPercentage;

  if (level[0] < level[1]) {
    skill.strength = newStrength;
    skill.level[0] += 1;
  }
  return skill;
};

export const removePlayerSkill = (playerSkill: PlayerSkill): PlayerSkill => {
  const skill = { ...playerSkill };
  if (playerSkill.attack) {
    skill.attack = { ...playerSkill.attack };
  }
  skill.level = [...playerSkill.level];

  const newStrength = skill.strength - skill.levelUpPercentage;

  if (skill.level[0] > 0) {
    skill.level[0] -= 1;
    skill.strength = newStrength;
  }

  return skill;
};
