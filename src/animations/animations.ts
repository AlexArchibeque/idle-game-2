import { SlimeAnimations } from "./slime/smileAnimationData";

export const AnimationData: AnimationData = {
  slime: SlimeAnimations,
};

interface AnimationData {
  slime: Animations;
}

export type AnimationStrings = "idle" | "attack" | "death";

export interface Animations {
  idle: InnerSection;
  attack: InnerSection;
  death: InnerSection;
}

export interface InnerSection {
  imgSource: string;
  frames: number;
}
