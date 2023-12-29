import { useGameStore } from "../../store/store";
import Image from "next/image";
import {
  skillCornerStyles,
  skillCornerBefore,
  skillCornerAfter,
  skillTailwind,
  toolTipStyles,
} from "../../reusables/tailwindTypes";
import { type PrestigeMap, type prestigeKeys } from "../../data/skillMaps";
import SkillView from "../tippyViews/skillView";
import Tippy from "@tippyjs/react";

const PrestigeSkill = ({
  skillName,
  imageName,
  prestigeSkillMap,
  addToSkill,
  removeFromSkill,
}: {
  skillName: prestigeKeys;
  imageName: string;
  prestigeSkillMap: PrestigeMap;
  addToSkill: (skillName: prestigeKeys) => void;
  removeFromSkill: (e: React.SyntheticEvent, skillName: prestigeKeys) => void;
}) => {
  const currentSkill = prestigeSkillMap[skillName];
  return (
    <Tippy
      className={toolTipStyles}
      content={<SkillView skill={currentSkill} />}
      duration={10}
    >
      <button
        onClick={() => addToSkill(skillName)}
        onContextMenu={(e) => {
          removeFromSkill(e, skillName);
        }}
        className={`${skillTailwind} relative `}
      >
        <div
          className={`${skillCornerStyles} ${
            prestigeSkillMap[skillName].level[0] > 0
              ? skillCornerBefore
              : skillCornerAfter
          }`}
        >
          {prestigeSkillMap[skillName].level[0]}
        </div>
        <Image
          width={48}
          height={48}
          alt="N/A"
          src={`/Skills/${imageName}.png`}
          className="z-1 relative "
        />
      </button>
    </Tippy>
  );
};

const PrestigeScreen = () => {
  const {
    prestigePoints,
    prestigeSkillMap,
    addPrestigeSkill,
    removePrestigeSkill,
  } = useGameStore();

  const addToSkill = (skillName: prestigeKeys) => {
    addPrestigeSkill(skillName);
  };

  const removeFromSkill = (
    e: React.SyntheticEvent,
    skillName: prestigeKeys
  ) => {
    e.preventDefault();
    removePrestigeSkill(skillName);
  };
  return (
    <div className="flex h-full w-full flex-col items-center ">
      <div>Prestige Points: {prestigePoints[0]}</div>

      {/* Row 1 */}
      <div className="flex w-full justify-evenly bg-slate-800 p-2">
        <PrestigeSkill
          skillName="active_gold"
          imageName="gold_prestige"
          addToSkill={addToSkill}
          removeFromSkill={removeFromSkill}
          prestigeSkillMap={prestigeSkillMap}
        />
        <button className={`${skillTailwind} opacity-0`}></button>
        <PrestigeSkill
          skillName="active_exp"
          imageName="experience_prestige"
          addToSkill={addToSkill}
          removeFromSkill={removeFromSkill}
          prestigeSkillMap={prestigeSkillMap}
        />
      </div>

      {/* Row 2 */}
      <div className="flex w-full justify-evenly bg-slate-900 p-2 text-white">
        <PrestigeSkill
          skillName="passive_gold"
          imageName="gold_passive"
          addToSkill={addToSkill}
          removeFromSkill={removeFromSkill}
          prestigeSkillMap={prestigeSkillMap}
        />
        <PrestigeSkill
          skillName="passive_exp"
          imageName="experience_passive"
          addToSkill={addToSkill}
          removeFromSkill={removeFromSkill}
          prestigeSkillMap={prestigeSkillMap}
        />
      </div>

      {/* Row 3 */}

      <div className="flex w-full justify-evenly bg-slate-800 p-2 text-white">
        <PrestigeSkill
          skillName="stats"
          imageName="stats_skills"
          addToSkill={addToSkill}
          removeFromSkill={removeFromSkill}
          prestigeSkillMap={prestigeSkillMap}
        />
        <PrestigeSkill
          skillName="skills"
          imageName="stats_skills"
          addToSkill={addToSkill}
          removeFromSkill={removeFromSkill}
          prestigeSkillMap={prestigeSkillMap}
        />
      </div>

      {/* Row 4 */}

      <div className="flex w-full justify-evenly bg-slate-900 p-2 text-white">
        <PrestigeSkill
          skillName="max_level"
          imageName="max_level"
          addToSkill={addToSkill}
          removeFromSkill={removeFromSkill}
          prestigeSkillMap={prestigeSkillMap}
        />
        <PrestigeSkill
          skillName="equip_slots"
          imageName="equipment_prestige"
          addToSkill={addToSkill}
          removeFromSkill={removeFromSkill}
          prestigeSkillMap={prestigeSkillMap}
        />
      </div>

      <div>Overall Stats:</div>
    </div>
  );
};

export default PrestigeScreen;
