import { skillTailwind, toolTipStyles } from "../../reusables/tailwindTypes";
import Image from "next/image";
import React from "react";
import { useGameStore } from "../../store/store";
import Tippy from "@tippyjs/react";
import ActiveSkillView from "../tippyViews/activeSkillView";
import { type PlayerSkill } from "../../data/skills/skillData";

const ActiveSkill = ({
  skillPosition,
  skillCooldown,
  imageSrc,
  skill,
  handleSkillStart,
}: {
  skillPosition: string;
  skillCooldown: number;
  imageSrc: string;
  skill: PlayerSkill;
  handleSkillStart: (skill: string) => void;
}) => {
  const { setAttackSkill, gameIsRunning } = useGameStore();

  const skillEnabledTailwind = "absolute inset-0 z-20 bg-green-500 opacity-50";
  const skillDisabledTailwind = "absolute inset-0 z-10 bg-red-600 opacity-50";
  const numberTailwind =
    "absolute inset-0 z-20 flex items-center justify-center text-white";

  // Active skills
  const handleAttack = () => {
    if (skill.attack != null) {
      setAttackSkill(skill);
    }
  };

  const skillLength = (skill.length && skill.length[skill.level[0]]) || 0;

  const isSkillDisabled =
    skillCooldown > 0 || (skill.attack != null && !gameIsRunning);

  return (
    <Tippy
      className={toolTipStyles}
      duration={10}
      content={<ActiveSkillView skill={skill} />}
    >
      <button
        onClick={() => {
          if (!isSkillDisabled) {
            handleSkillStart(skillPosition);
            handleAttack();
          }
        }}
        className={`${skillTailwind} ${skillCooldown > 0 ? "relative" : ""} ${
          isSkillDisabled ? "cursor-default" : ""
        }`}
      >
        {skillCooldown > skillLength && skillLength !== 0 && (
          <div className={skillEnabledTailwind} />
        )}
        {skillCooldown > 0 && <div className={skillDisabledTailwind} />}
        {skillCooldown > 0 && (
          <div className={numberTailwind}>{skillCooldown}</div>
        )}

        <Image
          width={48}
          height={48}
          alt="N/A"
          src={imageSrc}
          className="z-1 relative"
        />
      </button>
    </Tippy>
  );
};

const PlayerSkillsScreen = () => {
  const {
    startSkill,
    finishSkill,
    skillsAreStarted,
    currentClass,
    prestigeSkillMap,
    barbarianSkillMap,
    mageSkillMap,
    clericSkillMap,
  } = useGameStore();

  const skillOne =
    currentClass === "Barbarian"
      ? barbarianSkillMap.rage
      : currentClass === "Mage"
      ? mageSkillMap.fire
      : clericSkillMap.feast;
  const skillTwo =
    currentClass === "Barbarian"
      ? barbarianSkillMap.attack
      : currentClass === "Mage"
      ? mageSkillMap.ice
      : clericSkillMap.potion;
  const skillThree =
    currentClass === "Barbarian"
      ? barbarianSkillMap.health
      : currentClass === "Mage"
      ? mageSkillMap.lightning
      : clericSkillMap.shield;

  const { active_gold: skillFour, active_exp: skillFive } = prestigeSkillMap;

  const [skillOneCooldown, setSkillOneCooldown] = React.useState(0);
  const [intervalOne, setIntervalOne] = React.useState<ReturnType<
    typeof setInterval
  > | null>(null);
  const [skillTwoCooldown, setSkillTwoCooldown] = React.useState(0);
  const [intervalTwo, setIntervalTwo] = React.useState<ReturnType<
    typeof setInterval
  > | null>(null);
  const [skillThreeCooldown, setSkillThreeCooldown] = React.useState(0);
  const [intervalThree, setIntervalThree] = React.useState<ReturnType<
    typeof setInterval
  > | null>(null);
  const [skillFourCooldown, setSkillFourCooldown] = React.useState(0);
  const [intervalFour, setIntervalFour] = React.useState<ReturnType<
    typeof setInterval
  > | null>(null);
  const [skillFiveCooldown, setSkillFiveCooldown] = React.useState(0);
  const [intervalFive, setIntervalFive] = React.useState<ReturnType<
    typeof setInterval
  > | null>(null);

  React.useEffect(() => {
    const { length, level } = skillOne;
    if (
      skillOne &&
      skillOneCooldown <= ((length && length[level[0]]) || 0) &&
      skillsAreStarted[0]
    ) {
      finishSkill(0);
    } else if (skillOneCooldown <= 0 && intervalOne) {
      clearInterval(intervalOne);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalOne, skillOneCooldown]);

  React.useEffect(() => {
    const { length, level } = skillTwo;
    if (
      skillTwo &&
      skillTwoCooldown <= ((length && length[level[0]]) || 0) &&
      skillsAreStarted[1]
    ) {
      finishSkill(1);
    } else if (skillTwoCooldown <= 0 && intervalTwo) {
      clearInterval(intervalTwo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalTwo, skillTwoCooldown]);

  React.useEffect(() => {
    const { length, level } = skillThree;
    if (
      skillThree &&
      skillThreeCooldown <= ((length && length[level[0]]) || 0) &&
      skillsAreStarted[2]
    ) {
      finishSkill(2);
    } else if (skillThreeCooldown <= 0 && intervalThree) {
      clearInterval(intervalThree);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalThree, skillThreeCooldown]);

  React.useEffect(() => {
    const { length, level } = skillFour;
    if (
      skillFour &&
      skillFourCooldown <= ((length && length[level[0]]) || 0) &&
      skillsAreStarted[3]
    ) {
      finishSkill(3);
    } else if (skillFourCooldown <= 0 && intervalFour) {
      clearInterval(intervalFour);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalFour, skillFourCooldown]);

  React.useEffect(() => {
    const { length, level } = skillFive;
    if (
      skillFive &&
      skillFiveCooldown <= ((length && length[level[0]]) || 0) &&
      skillsAreStarted[4]
    ) {
      finishSkill(4);
    } else if (skillFiveCooldown <= 0 && intervalFive) {
      clearInterval(intervalFive);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalFive, skillFiveCooldown]);

  const handleSkillStart = (skill: string) => {
    switch (skill) {
      case "first":
        skillOne.cooldown &&
          setSkillOneCooldown(skillOne.cooldown[skillOne.level[0]] || 0);
        const interval = setInterval(() => {
          setSkillOneCooldown((prevState) => {
            const nextNum = prevState - 0.1;
            return parseFloat(nextNum.toFixed(1));
          });
        }, 100);
        setIntervalOne(interval);
        startSkill(0);
        return;
      case "second":
        skillTwo.cooldown &&
          setSkillTwoCooldown(skillTwo.cooldown[skillTwo.level[0]] || 0);
        const interval2 = setInterval(() => {
          setSkillTwoCooldown((prevState) => {
            const nextNum = prevState - 0.1;
            return parseFloat(nextNum.toFixed(1));
          });
        }, 100);
        setIntervalTwo(interval2);
        startSkill(1);
        return;
      case "third":
        skillThree.cooldown &&
          setSkillThreeCooldown(skillThree.cooldown[skillThree.level[0]] || 0);
        const interval3 = setInterval(() => {
          setSkillThreeCooldown((prevState) => {
            const nextNum = prevState - 0.1;
            return parseFloat(nextNum.toFixed(1));
          });
        }, 100);
        setIntervalThree(interval3);
        startSkill(2);
        return;
      case "fourth":
        skillFour.cooldown &&
          setSkillFourCooldown(skillFour.cooldown[skillFour.level[0]] || 0);
        const interval4 = setInterval(() => {
          setSkillFourCooldown((prevState) => {
            const nextNum = prevState - 0.1;
            return parseFloat(nextNum.toFixed(1));
          });
        }, 100);
        setIntervalFour(interval4);
        startSkill(3);
        return;
      case "fifth":
        skillFive.cooldown &&
          setSkillFiveCooldown(skillFive.cooldown[skillFive.level[0]] || 0);
        const interval5 = setInterval(() => {
          setSkillFiveCooldown((prevState) => {
            const nextNum = prevState - 0.1;
            return parseFloat(nextNum.toFixed(1));
          });
        }, 100);
        setIntervalFive(interval5);
        startSkill(4);
        return;
    }
  };

  if (!skillOne && !skillTwo && !skillThree && !skillFour && !skillFive) {
    return <div></div>;
  }
  return (
    <div className="flex h-full flex-col justify-center gap-2 border-r-2 pl-2 pr-2">
      <div className="flex flex-col">
        {skillOne && (
          <ActiveSkill
            skillPosition="first"
            imageSrc={
              currentClass === "Barbarian"
                ? "/Skills/Barbarian/rage.png"
                : currentClass === "Mage"
                ? "/Skills/Mage/fire_1.png"
                : "/Skills/Cleric/feast_1.png"
            }
            skillCooldown={skillOneCooldown}
            handleSkillStart={handleSkillStart}
            skill={skillOne}
          />
        )}
        {skillTwo && (
          <ActiveSkill
            skillPosition="second"
            imageSrc={
              currentClass === "Barbarian"
                ? "/Skills/Barbarian/attack_sword.png"
                : currentClass === "Mage"
                ? "/Skills/Mage/ice_1.png"
                : "/Skills/Cleric/potion_1.png"
            }
            skillCooldown={skillTwoCooldown}
            skill={skillTwo}
            handleSkillStart={handleSkillStart}
          />
        )}
        {skillThree && (
          <ActiveSkill
            skillPosition="third"
            imageSrc={
              currentClass === "Barbarian"
                ? "/Skills/Barbarian/health_1.png"
                : currentClass === "Mage"
                ? "/Skills/Mage/lightning_1.png"
                : "/Skills/Cleric/shield_1.png"
            }
            skillCooldown={skillThreeCooldown}
            skill={skillThree}
            handleSkillStart={handleSkillStart}
          />
        )}
      </div>
      <div className="flex flex-col">
        {skillFour && (
          <ActiveSkill
            skillPosition="fourth"
            imageSrc="/Skills/experience_prestige.png"
            skillCooldown={skillFourCooldown}
            skill={skillFour}
            handleSkillStart={handleSkillStart}
          />
        )}
        {skillFive && (
          <ActiveSkill
            skillPosition="fifth"
            imageSrc="/Skills/gold_prestige.png"
            skillCooldown={skillFiveCooldown}
            skill={skillFive}
            handleSkillStart={handleSkillStart}
          />
        )}
      </div>
    </div>
  );
};

export default PlayerSkillsScreen;
