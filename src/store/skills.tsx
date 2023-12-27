import { StateCreator } from "zustand";

export interface SkillSlice {
  skills: null | string;
}

export const createSkillSlice: StateCreator<SkillSlice, [], [], SkillSlice> = (
  set
) => ({ skills: "This is a skill" });
