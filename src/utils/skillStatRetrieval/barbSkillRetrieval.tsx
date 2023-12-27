import type { BarbMap } from "../../data/skillMaps";
export const BarbSkillStatRetrieval = (
  BarbSkills: BarbMap,
  startedSkills: boolean[]
) => {
  const ActiveRageSkill = BarbSkills["rage"];
  const rageAttack = (startedSkills[0] && ActiveRageSkill.strength) || 1;

  const ActiveHealthRegenSkill = BarbSkills["health"];
  const healthRegen =
    (startedSkills[2] && ActiveHealthRegenSkill.strength) || 1;

  const PassiveEcho = BarbSkills["passive_echo"];
  const currentEchoLevel = PassiveEcho.level[0];
  const passiveBaseEcho = PassiveEcho.addStrength?.[currentEchoLevel] || 0;

  const PassiveAttack = BarbSkills["passive_attack"];
  const currentAttackLevel = PassiveAttack.level[0];
  const passiveBaseAttack =
    PassiveAttack.addStrength?.[currentAttackLevel] || 0;

  const PassiveHealth = BarbSkills["passive_health"];
  const barbMultHealthAdd = PassiveHealth.strength;

  const PassiveStrength = BarbSkills["passive_strength"];
  const currentStrengthLevel = PassiveStrength.level[0];
  const passiveBaseStrength =
    PassiveStrength.addStrength?.[currentStrengthLevel] || 0;

  const PassiveCrit = BarbSkills["passive_crit"];
  const currentCritLevel = PassiveCrit.level[0];
  const passiveMultiCrit = PassiveCrit.strength;
  const passiveBaseCrit = PassiveCrit.addStrength?.[currentCritLevel] || 0;

  const PassiveAttackSpeed = BarbSkills["passive_attack_speed"];
  const currentAttackSpeedLevel = PassiveAttackSpeed.level[0];
  const passiveBaseAttackSpeed =
    PassiveAttackSpeed.addStrength?.[currentAttackSpeedLevel] || 0;

  const barbBaseAttack = passiveBaseAttack;
  const barbMultiAttack = 1 * rageAttack;
  const barbRegen = 1 * healthRegen;
  const barbBaseDex = 0 + passiveBaseEcho;
  const barbMultHealth = 1 * barbMultHealthAdd;
  const barbBaseStrength = passiveBaseStrength;
  const barbMultiCrit = passiveMultiCrit;
  const barbBaseCritDamage = passiveBaseCrit;
  const barbBaseAttackSpeed = passiveBaseAttackSpeed;
  return {
    barbMultiAttack,
    barbBaseAttack,
    barbRegen,
    barbBaseDex,
    barbMultHealth,
    barbBaseStrength,
    barbMultiCrit,
    barbBaseCritDamage,
    barbBaseAttackSpeed,
  };
};
