import { type PlayerSkill } from "../../data/skills/skillData";
import { capitalize } from "../../reusables/functions";
import { individualToolTipStyles } from "../../reusables/tailwindTypes";

const SkillView = ({ skill }: { skill: PlayerSkill }) => {
  const {
    description,
    name,
    cooldown,
    length,
    level,
    strength,
    attack,
    addStrength,
    levelUpPercentage,
  } = skill;
  const [skillLevel, maxLevel] = level;
  return (
    <div className={individualToolTipStyles}>
      <div>{capitalize(name || "")}</div>
      {attack && (
        <div>
          <div>Cleave: {attack.cleave ? "Yes" : "No"}</div>
          <div>Damage: {attack.damage[skillLevel]}</div>
        </div>
      )}
      {cooldown && <div>Cooldown: {cooldown[skillLevel] || 0}</div>}
      {length && <div>Duration: {length[skillLevel] || 0}</div>}
      {addStrength && (
        <div className="flex">
          Base Strength: {addStrength[skillLevel] || 0}{" "}
          <div className="ml-2 text-green-700">
            {skillLevel < maxLevel
              ? `+${Math.abs(
                  (addStrength[skillLevel] || 0) -
                    (addStrength[skillLevel + 1] || 0)
                ).toFixed(2)}`
              : "MAX"}
          </div>
        </div>
      )}
      <div>
        Level: {skillLevel} / {maxLevel}
      </div>
      <div className="flex">
        Strength: {Math.abs(strength).toFixed(2)}{" "}
        <div className="ml-2 text-green-700">
          {skillLevel < maxLevel ? `+${levelUpPercentage}` : "MAX"}
        </div>
      </div>
      <div>{description}</div>
    </div>
  );
};

export default SkillView;
