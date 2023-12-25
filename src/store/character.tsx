import { StateCreator } from "zustand";
import type {
  Classes,
  PickedClassStats,
} from "../components/classScreen/classChoices";
import type { GameState } from "./store";
import { BearSlice } from "./enemies";

export interface CharacterSlice {
  currentClass: Classes | null;
  currentClassStats: PickedClassStats | null;
  setClass: (
    classToSet: Classes | null,
    classStats: PickedClassStats | null
  ) => void;
}

export const createCharacterSlice: StateCreator<
  CharacterSlice & BearSlice,
  [],
  [],
  CharacterSlice
> = (set) => ({
  currentClassStats: null,
  currentClass: null,
  setClass: (classToSet, classStats) => {
    set({
      currentClass: classToSet,
      currentClassStats: classStats,
    });
  },
});
