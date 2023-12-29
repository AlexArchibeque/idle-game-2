import { type PlayerSkill } from "../../data/skills/skillData";
import { individualToolTipStyles } from "../../reusables/tailwindTypes";
import { capitalize } from "../../reusables/functions";

const ActiveSkillView = ({ skill }: { skill: PlayerSkill }) => {
  const { name, description, strength, attack, length, cooldown, level } =
    skill;

  return (
    <div className={individualToolTipStyles}>
      <div>{capitalize(name || "")}</div>
      <div>Strength: {strength.toFixed(2)}</div>
      {cooldown && length && (
        <div>Length: {cooldown[level[0]] - length[level[0]]}</div>
      )}
      {length && <div>Cooldown: {length[level[0]]}</div>}
      {attack && (
        <div>
          <div>Cleave? {attack.cleave ? "YES" : "NO"}</div>
          <div>Damage: {attack.damage[level[0]]}</div>
        </div>
      )}
      <div>{description}</div>
    </div>
  );
};

export default ActiveSkillView;
