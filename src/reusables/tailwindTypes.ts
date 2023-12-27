import { type ItemRarities } from "../utils/rollItemLogic";

export const rarityStyles: { [Key in ItemRarities]: string } = {
  normal: "bg-zinc-400",
  magic: "bg-lime-600",
  rare: "bg-sky-700",
  epic: "bg-purple-900",
  unique: "bg-amber-600",
};

export const regularItemBoxTailwind =
  "border-2 m-0.5 w-[44px] h-[44px] select-none";
export const deleteItemTailwind =
  "border-2 bg-red-800 m-0.5 w-[44px] h-[44px] select-none";
export const skillTailwind =
  "border-slate-400 border-2 h-16 w-16 bg-slate-500 p-2 hover:border-white";

// Before and after skill points
export const skillCornerBefore = "bg-gray-700 text-white opacity-100";
export const skillCornerAfter = "text-slate-800 opacity-50";

// General style
export const skillCornerStyles =
  "absolute bottom-0 right-0 z-10 rounded bg-gray-600 p-1";

// ToolTip style
export const toolTipStyles = "bg-black border-2 border-zinc-700";
export const individualToolTipStyles =
  "flex w-full select-none flex-col px-2 py-2 text-sm text-white";
