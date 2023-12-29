import { useGameStore } from "../../store/store";
import Image from "next/image";
import React from "react";
import { type BarbMap, type barbKeys } from "../../data/skillMaps";
import {
  skillCornerStyles,
  skillCornerBefore,
  skillCornerAfter,
  skillTailwind,
  toolTipStyles,
} from "../../reusables/tailwindTypes";
import Tippy from "@tippyjs/react";
import SkillView from "../tippyViews/skillView";

const BarbSkill = ({
  skillName,
  imageName,
  barbarianSkillMap,
  addToSkill,
  removeFromSkill,
}: {
  skillName: barbKeys;
  imageName: string;
  barbarianSkillMap: BarbMap;
  addToSkill: (skillName: barbKeys) => void;
  removeFromSkill: (e: React.SyntheticEvent, skillName: barbKeys) => void;
}) => {
  const currentSkill = barbarianSkillMap[`${skillName}`];
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
            barbarianSkillMap[`${skillName}`].level[0] > 0
              ? skillCornerBefore
              : skillCornerAfter
          }`}
        >
          {barbarianSkillMap[`${skillName}`].level[0]}
        </div>
        <Image
          width={48}
          height={48}
          alt="N/A"
          src={`/Skills/Barbarian/${imageName}.png`}
          className="z-1 relative"
        />
      </button>
    </Tippy>
  );
};

const BarbSkillScreen = () => {
  const {
    skillPoints,
    addSkill,
    removeSkillPoint,
    currentClass,
    barbarianSkillMap,
  } = useGameStore();

  const removeFromSkill = (e: React.SyntheticEvent, skillName: barbKeys) => {
    e.preventDefault();
    removeSkillPoint(skillName);
  };

  return (
    <div className="flex h-full w-full flex-col items-center ">
      <div>Class: {currentClass}</div>
      <div>skillPoints: {skillPoints}</div>

      {/* Row 1 */}
      <div className="flex w-full justify-evenly bg-slate-800 p-2">
        <BarbSkill
          addToSkill={addSkill}
          removeFromSkill={removeFromSkill}
          skillName="rage"
          imageName="rage"
          barbarianSkillMap={barbarianSkillMap}
        />
        <BarbSkill
          addToSkill={addSkill}
          removeFromSkill={removeFromSkill}
          skillName="attack"
          imageName="attack_sword"
          barbarianSkillMap={barbarianSkillMap}
        />
        <BarbSkill
          addToSkill={addSkill}
          removeFromSkill={removeFromSkill}
          skillName="health"
          imageName="health_1"
          barbarianSkillMap={barbarianSkillMap}
        />
      </div>

      {/* Row 2 */}
      <div className="flex w-full justify-evenly bg-slate-900 p-2">
        <BarbSkill
          addToSkill={addSkill}
          removeFromSkill={removeFromSkill}
          skillName="passive_echo"
          imageName="ear_1"
          barbarianSkillMap={barbarianSkillMap}
        />
        <BarbSkill
          addToSkill={addSkill}
          removeFromSkill={removeFromSkill}
          skillName="passive_attack"
          imageName="sword_1"
          barbarianSkillMap={barbarianSkillMap}
        />
        <BarbSkill
          addToSkill={addSkill}
          removeFromSkill={removeFromSkill}
          skillName="passive_health"
          imageName="armor_1"
          barbarianSkillMap={barbarianSkillMap}
        />
      </div>

      {/* Row 3 */}
      <div className="flex w-full justify-evenly bg-slate-800  p-2">
        <BarbSkill
          addToSkill={addSkill}
          removeFromSkill={removeFromSkill}
          skillName="passive_strength"
          imageName="strength_1"
          barbarianSkillMap={barbarianSkillMap}
        />
        <BarbSkill
          addToSkill={addSkill}
          removeFromSkill={removeFromSkill}
          skillName="passive_crit"
          imageName="dexterity"
          barbarianSkillMap={barbarianSkillMap}
        />
      </div>

      {/* Row 4 */}
      <div className="flex w-full justify-evenly bg-slate-900  p-2">
        <BarbSkill
          addToSkill={addSkill}
          removeFromSkill={removeFromSkill}
          skillName="passive_attack_speed"
          imageName="perception_1"
          barbarianSkillMap={barbarianSkillMap}
        />
      </div>
    </div>
  );
};

export default BarbSkillScreen;
