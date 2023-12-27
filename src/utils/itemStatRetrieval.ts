import type { Item } from "./rollItemLogic";
import type { rollableItemStatsKeys } from "./rollItemLogic";

export const extractItemStat = (
  items: (Item | null | undefined)[],
  stat: rollableItemStatsKeys
): number => {
  let finalNum = 0;

  for (const item of items) {
    if (item != null) {
      const curNum = item[stat];
      if (curNum != null) {
        finalNum += curNum;
      }
    }
  }
  return finalNum;
};
