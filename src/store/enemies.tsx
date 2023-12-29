import { create, StateCreator } from "zustand";
import { CharacterSlice } from "./character";

export interface EnemySlice {
  gameIsRunning: boolean;
  setGameIsRunning: (turnOff?: boolean) => void;
}

export const createEnemySlice: StateCreator<
  EnemySlice & CharacterSlice,
  [["zustand/devtools", never], ["zustand/immer", never]],
  [],
  EnemySlice
> = (set, get) => ({
  gameIsRunning: false,
  setGameIsRunning: (turnOff?: boolean) => {
    set((state) => {
      if (turnOff) {
        state.gameIsRunning = false;
      } else {
        state.gameIsRunning = !state.gameIsRunning;
      }
    });
  },
});
