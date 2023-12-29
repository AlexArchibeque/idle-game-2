import { StateCreator } from "zustand";
import {
  type BarbMap,
  type ClericMap,
  type MageMap,
  type PrestigeMap,
  type barbKeys,
  type mageKeys,
  type clericKeys,
  type prestigeKeys,
  barbMap,
  mageMap,
  clericMap,
  prestigeMap,
} from "../data/skillMaps";
import { type PlayerSkill } from "../data/skills/skillData";
import { CharacterSlice } from "./character";
import { addPlayerSkill, removePlayerSkill } from "../utils/updateSkills";

export interface SkillSlice {
  barbarianSkillMap: BarbMap;
  clericSkillMap: ClericMap;
  mageSkillMap: MageMap;
  prestigeSkillMap: PrestigeMap;
  skillsAreStarted: boolean[];
  attackSkill: null | PlayerSkill;
  skillPoints: number;
  prestigePoints: [number, number];
  addPrestigeSkill: (skillName: prestigeKeys) => void;
  removePrestigeSkill: (skillName: prestigeKeys) => void;
  startSkill: (skill: number) => void;
  finishSkill: (skill: number) => void;
  removeSkillPoint: (skillName: barbKeys | mageKeys | clericKeys) => void;
  addSkill: (skillName: barbKeys | mageKeys | clericKeys) => void;
  setAttackSkill: (skill: PlayerSkill | null) => void;
}

export const createSkillSlice: StateCreator<
  SkillSlice & CharacterSlice,
  [["zustand/devtools", never], ["zustand/immer", never]],
  [],
  SkillSlice
> = (set, get) => ({
  skillsAreStarted: [false, false, false, false, false],
  barbarianSkillMap: barbMap,
  clericSkillMap: clericMap,
  mageSkillMap: mageMap,
  prestigeSkillMap: prestigeMap,
  attackSkill: null,
  skillPoints: 100,
  prestigePoints: [100, 100],
  addPrestigeSkill: (skillName: prestigeKeys) => {
    const skillMap = get().prestigeSkillMap;
    const skills = get().prestigePoints;
    const skill = skillMap[skillName];

    const statPoints = skillName === "stats" ? 5 : 0;
    const skillPoints = skillName === "skills" ? 1 : 0;

    if (skills[0] > 0 && skill.level[1] > skill.level[0]) {
      set((state) => {
        state.playerStats.statPoints += statPoints;
        state.skillPoints += skillPoints;
        state.prestigePoints[0] -= 1;
        state.prestigeSkillMap[skillName].level[0] += 1;
        state.prestigeSkillMap[skillName].strength +=
          state.prestigeSkillMap[skillName].levelUpPercentage;
      });
    }

    get().updatePlayerStats();
  },
  removePrestigeSkill: (skillName: prestigeKeys) => {
    const skillMap = get().prestigeSkillMap;
    const skill = skillMap[skillName];

    const { statPoints } = get().playerStats;
    const skillPoints = get().skillPoints;
    if (skillName === "stats" && statPoints < 5) {
      return;
    }
    if (skillName === "skills" && skillPoints < 1) {
      return;
    }
    const stats = skillName === "stats" ? 5 : 0;
    const skills = skillName === "skills" ? 1 : 0;

    if (skill.level[0] > 0) {
      set((state) => {
        state.playerStats.statPoints -= stats;
        state.skillPoints -= skills;

        state.prestigePoints[0] += 1;
        state.prestigeSkillMap[skillName].level[0] -= 1;
        state.prestigeSkillMap[skillName].strength -=
          state.prestigeSkillMap[skillName].levelUpPercentage;
      });
    }

    get().updatePlayerStats();
  },
  startSkill: (skill: number) => {
    set((state) => {
      state.skillsAreStarted[skill] = true;
    });
    get().updatePlayerStats();
  },
  finishSkill: (skill: number) => {
    set((state) => {
      state.skillsAreStarted[skill] = false;
    });
    get().updatePlayerStats();
  },
  setAttackSkill: (skill: PlayerSkill | null) => {
    set((state) => {
      state.attackSkill = skill;
    });
  },
  removeSkillPoint: (skillName: barbKeys | clericKeys | mageKeys) => {
    const currentClass = get().currentClass;
    if (currentClass === "Barbarian") {
      const skills = get().barbarianSkillMap;
      const skill = skills[skillName as barbKeys];
      if (skill && skill.level[0] > 0) {
        const newSkill = removePlayerSkill(skill);
        set((state) => {
          state.barbarianSkillMap[skillName as barbKeys] = newSkill;
          state.skillPoints += 1;
        });
      }
    } else if (currentClass === "Mage") {
      const skills = get().mageSkillMap;
      const skill = skills[skillName as mageKeys];
      if (skill && skill.level[0] > 0) {
        const newSkill = removePlayerSkill(skill);
        set((state) => {
          state.mageSkillMap[skillName as mageKeys] = newSkill;
          state.skillPoints += 1;
        });
      }
    } else if (currentClass === "Cleric") {
      const skills = get().clericSkillMap;
      const skill = skills[skillName as clericKeys];
      if (skill && skill.level[0] > 0) {
        const newSkill = removePlayerSkill(skill);
        newSkill.level[0] -= 1;
        set((state) => {
          state.clericSkillMap[skillName as clericKeys] = newSkill;
          state.skillPoints += 1;
        });
      }
    }
    get().updatePlayerStats();
  },
  addSkill: (skillName: barbKeys | clericKeys | mageKeys) => {
    const currentClass = get().currentClass;
    const skillPoints = get().skillPoints;

    if (currentClass === "Barbarian") {
      const skills = get().barbarianSkillMap;
      const skill = skills[skillName as barbKeys];
      if (skill && skillPoints > 0 && skill.level[0] < skill.level[1]) {
        const newSkill = addPlayerSkill(skill);
        set((state) => {
          state.barbarianSkillMap[skillName as barbKeys] = newSkill;
          state.skillPoints -= 1;
        });
      }
    } else if (currentClass === "Mage") {
      const skills = get().mageSkillMap;
      const skill = skills[skillName as mageKeys];
      if (skill && skillPoints > 0 && skill.level[0] < skill.level[1]) {
        const newSkill = addPlayerSkill(skill);
        set((state) => {
          state.mageSkillMap[skillName as mageKeys] = newSkill;
          state.skillPoints -= 1;
        });
      }
    } else if (currentClass === "Cleric") {
      const skills = get().clericSkillMap;
      const skill = skills[skillName as clericKeys];
      if (skill && skillPoints > 0 && skill.level[0] < skill.level[1]) {
        const newSkill = addPlayerSkill(skill);
        set((state) => {
          state.clericSkillMap[skillName as clericKeys] = newSkill;
          state.skillPoints -= 1;
        });
      }
    }
    get().updatePlayerStats();
  },
});
