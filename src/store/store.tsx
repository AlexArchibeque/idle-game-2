import { create, StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, devtools } from "zustand/middleware";
import { CharacterSlice, createCharacterSlice } from "./character";
import { EnemySlice, createEnemySlice } from "./enemies";
import { SkillSlice, createSkillSlice } from "./skills";
import { RegionSlice, createRegionSlice } from "./region";
import { TownSlice, createTownSlice } from "./town";

interface SharedSlice {}

const createSharedSlice: StateCreator<
  EnemySlice & CharacterSlice & SkillSlice,
  [],
  [],
  SharedSlice
> = (set, get) => ({});

type GameState = CharacterSlice &
  EnemySlice &
  SharedSlice &
  SkillSlice &
  RegionSlice &
  TownSlice;

export const useGameStore = create<GameState>()(
  devtools(
    persist(
      immer<GameState>((...a) => ({
        ...createCharacterSlice(...a),
        ...createEnemySlice(...a),
        ...createSkillSlice(...a),
        ...createSharedSlice(...a),
        ...createRegionSlice(...a),
        ...createTownSlice(...a),
      })),
      { name: "game-settings" }
    ),
    { name: "devTools Zustand" }
  )
);
