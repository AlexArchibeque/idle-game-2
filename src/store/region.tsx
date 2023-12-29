import { StateCreator } from "zustand";
import { DEFAULT_REGION, type Region } from "../data/defaultStats";

export interface RegionSlice {
  currentRegion: Region;
}

export const createRegionSlice: StateCreator<
  RegionSlice,
  [["zustand/devtools", never], ["zustand/immer", never]],
  [],
  RegionSlice
> = (set, get) => ({ currentRegion: DEFAULT_REGION });
