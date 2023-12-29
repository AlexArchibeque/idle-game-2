import { StateCreator } from "zustand";
import type {
  Classes,
  PickedClassStats,
} from "../components/classScreen/classChoices";
import { type Item } from "../utils/rollItemLogic";
import {
  DEFAULT_CLASS_STATS,
  DEFAULT_PLAYER_EQUIPMENT,
  DEFAULT_PLAYER_STATS,
  PlayerEquipment,
  type PlayerStats,
  type PlayerStat,
  DEFAULT_BAG,
} from "../data/defaultStats";
import { updateStats } from "../utils/updateStats";
import {
  type BarbMap,
  type ClericMap,
  type MageMap,
  type PrestigeMap,
  barbMap,
  mageMap,
  clericMap,
  prestigeMap,
} from "../data/skillMaps";
import type { TownSlice } from "./town";
import type { RegionSlice } from "./region";

export interface CharacterSlice {
  currentClass: Classes | null;
  currentClassStats: PickedClassStats;
  playerStats: PlayerStats;
  playerEquipment: [PlayerEquipment, PlayerEquipment, PlayerEquipment];
  barbarianSkillMap: BarbMap;
  clericSkillMap: ClericMap;
  mageSkillMap: MageMap;
  prestigeSkillMap: PrestigeMap;
  skillsAreStarted: boolean[];
  currentEquipmentSlot: number;
  selectedItem: Item | null;
  selectedItemPosition: number | null;
  selectedItemRingPosition: number | null;
  playerBag: (Item | null)[];
  gold: number;
  setClass: (classToSet: Classes | null, classStats: PickedClassStats) => void;
  regenPlayerHealth: () => void;
  regenPlayerMana: () => void;
  prestige: () => void;
  addStatToPlayer: (stat: PlayerStat, amount: number) => void;
  removeStatFromPlayer: (stat: PlayerStat, amount: number) => void;
  updatePlayerStats: () => void;
  setCurrentEquipSlot: (slot: number) => void;
  resetPlayerStats: () => void;
  selectItem: (
    item: Item,
    position: number,
    ringPosition: number | null
  ) => void;
  deselectItem: () => void;
  equipItemFromSelectedArea: (item: Item, position: number) => void;
  equipItem: (
    item: Item,
    bagPosition: number,
    ringPosition: number,
    swapRings: boolean
  ) => void;
  deleteItem: (
    item: Item,
    bagPosition: number,
    otherRingPosition: number
  ) => void;
  deleteAllItems: () => void;
  deleteItems: (items: Set<number>) => void;
  moveItemIntoBag: (
    item: Item,
    itemPosition: number,
    bagPosition: number,
    fromSelected?: boolean
  ) => void;
}

export const createCharacterSlice: StateCreator<
  CharacterSlice & TownSlice & RegionSlice,
  [["zustand/devtools", never], ["zustand/immer", never]],
  [],
  CharacterSlice
> = (set, get) => ({
  currentClassStats: DEFAULT_CLASS_STATS,
  currentClass: null,
  playerStats: DEFAULT_PLAYER_STATS,
  playerEquipment: [
    DEFAULT_PLAYER_EQUIPMENT,
    DEFAULT_PLAYER_EQUIPMENT,
    DEFAULT_PLAYER_EQUIPMENT,
  ],
  playerBag: DEFAULT_BAG,
  currentEquipmentSlot: 0,
  gold: 0,
  barbarianSkillMap: barbMap,
  clericSkillMap: clericMap,
  mageSkillMap: mageMap,
  prestigeSkillMap: prestigeMap,
  skillsAreStarted: [false, false, false, false, false],
  selectedItem: null,
  selectedItemPosition: null,
  selectedItemRingPosition: null,

  moveItemIntoBag: (
    item: Item,
    itemPosition: number,
    bagPosition: number,
    fromSelected?: boolean
  ) => {
    const playerBag = get().playerBag;
    const otherItem = playerBag[bagPosition];
    const selectedRingPos = get().selectedItemRingPosition;
    const { type } = item;

    if (fromSelected) {
      // Find empty slot in bag
      let emptySlot: number | null = null;
      for (let i = 0; i < playerBag.length; i++) {
        if (playerBag[i] === null) {
          emptySlot = i;
          break;
        }
      }

      if (emptySlot != null) {
        if (type === "rings") {
          // Left ring
          set((state) => {
            if (itemPosition === -1) {
              state.playerEquipment[0].rings[selectedRingPos || 0] = null;
            } else if (itemPosition === -2) {
              state.playerEquipment[1].rings[selectedRingPos || 0] = null;
            } else {
              state.playerEquipment[2].rings[selectedRingPos || 0] = null;
            }
            if (emptySlot != null) state.playerBag[emptySlot] = item;
          });
        } else {
          set((state) => {
            if (itemPosition === -1) {
              state.playerEquipment[0][type] = null;
            } else if (itemPosition === -2) {
              state.playerEquipment[1][type] = null;
            } else {
              state.playerEquipment[2][type] = null;
            }
            if (emptySlot != null) state.playerBag[emptySlot] = item;
          });
        }
        get().updatePlayerStats();
      }
    } else if (itemPosition <= -1) {
      // Item is equipped
      if (otherItem === null) {
        if (type === "rings") {
          set((state) => {
            if (itemPosition === -1) {
              state.playerEquipment[0].rings[selectedRingPos || 0] = null;
            } else if (itemPosition === -2) {
              state.playerEquipment[1].rings[selectedRingPos || 0] = null;
            } else {
              state.playerEquipment[2].rings[selectedRingPos || 0] = null;
            }
            state.playerBag[bagPosition] = item;
          });
        } else {
          set((state) => {
            if (itemPosition === -1) {
              state.playerEquipment[0][type] = null;
            } else if (itemPosition === -2) {
              state.playerEquipment[1][type] = null;
            } else {
              state.playerEquipment[2][type] = null;
            }
            state.playerBag[bagPosition] = item;
          });
        }
      }
      get().updatePlayerStats();
    } else {
      set((state) => {
        state.playerBag[bagPosition] = item;
        if (otherItem !== undefined) state.playerBag[itemPosition] = otherItem;
      });
    }

    set((state) => {
      state.selectedItem = null;
      state.selectedItemPosition = null;
    });
  },
  deleteItem: (item: Item, bagPosition: number, otherRingPosition: number) => {
    const itemGold = item.goldWorth;
    const currentEquipSlot = get().currentEquipmentSlot;
    set((state) => {
      if (bagPosition <= -1) {
        if (item.type === "rings") {
          state.playerEquipment[currentEquipSlot].rings[otherRingPosition] =
            null;
        } else {
          state.playerEquipment[currentEquipSlot][item.type] = null;
        }
      } else {
        state.playerBag[bagPosition] = null;
      }
    });

    if (bagPosition === -1) {
      get().updatePlayerStats();
    }
    set((state) => {
      state.selectedItem = null;
      state.selectedItemPosition = null;
      state.gold += itemGold;
    });
  },
  deleteAllItems: () => {
    const items = get().playerBag;
    let goldToAdd = 0;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item != null) {
        goldToAdd += item.goldWorth;
      }
    }
    set((state) => {
      state.playerBag = DEFAULT_BAG;
      state.gold += goldToAdd;
    });
    set((state) => {
      state.selectedItem = null;
      state.selectedItemPosition = null;
    });
  },
  // Delete all selected items
  deleteItems: (items: Set<number>) => {
    const arrayItems = Array.from(items);

    for (const item of arrayItems) {
      set((state) => {
        state.gold += state.playerBag[item]?.goldWorth || 0;
        state.playerBag[item] = null;
      });
    }
    set((state) => {
      state.selectedItem = null;
      state.selectedItemPosition = null;
    });
  },
  setCurrentEquipSlot: (slot: number) => {
    set((state) => {
      state.currentEquipmentSlot = slot;
    });
    get().updatePlayerStats();
  },
  equipItemFromSelectedArea: (item: Item, position: number) => {
    const { type } = item;
    const [playerEquip, playerEquip2, playerEquip3] = get().playerEquipment;
    const currentEquipmentSlot = get().currentEquipmentSlot;

    const currentPlayerEquipment =
      currentEquipmentSlot === -1
        ? playerEquip
        : currentEquipmentSlot === -2
        ? playerEquip2
        : playerEquip3;

    let currentlyEquipped: Item | null = null;
    if (type === "rings") {
      currentlyEquipped = currentPlayerEquipment.rings[0] || null;
    } else {
      currentlyEquipped = currentPlayerEquipment[type];
    }

    set((state) => {
      if (currentlyEquipped != null) {
        state.playerBag[position] = currentlyEquipped;
      } else {
        state.playerBag[position] = null;
      }
      if (type === "rings") {
        if (currentEquipmentSlot === -1) {
          state.playerEquipment[0].rings[0] = item;
        } else if (currentEquipmentSlot === -2) {
          state.playerEquipment[1].rings[0] = item;
        } else {
          state.playerEquipment[2].rings[0] = item;
        }
      } else {
        if (currentEquipmentSlot === -1) {
          state.playerEquipment[0][type] = item;
        } else if (currentEquipmentSlot === -2) {
          state.playerEquipment[1][type] = item;
        } else {
          state.playerEquipment[2][type] = item;
        }
      }
    });

    set((state) => {
      state.selectedItem = null;
      state.selectedItemPosition = null;
      state.selectedItemRingPosition = null;
    });
    get().updatePlayerStats();
  },
  equipItem: (
    item: Item,
    bagPosition: number,
    ringPosition: number,
    swapRings: boolean
  ) => {
    const { type } = item;
    const playerEquip = get().playerEquipment;
    const currentEquipmentSlot = get().currentEquipmentSlot;

    // Swap items
    if (swapRings) {
      const ring1 = playerEquip[0].rings[ringPosition];
      set((state) => {
        if (currentEquipmentSlot === -1) {
          state.playerEquipment[0].rings[ringPosition] = item;
          state.playerEquipment[0].rings[bagPosition] = ring1 || null;
        } else if (currentEquipmentSlot === -2) {
          state.playerEquipment[1].rings[ringPosition] = item;
          state.playerEquipment[1].rings[bagPosition] = ring1 || null;
        } else {
          state.playerEquipment[2].rings[ringPosition] = item;
          state.playerEquipment[2].rings[bagPosition] = ring1 || null;
        }
      });
    } else if (type === "rings" && ringPosition !== 2) {
      const tempEquipped = playerEquip[0][type][ringPosition];

      set((state) => {
        if (currentEquipmentSlot === -1) {
          state.playerEquipment[0][type][ringPosition] = item;
        } else if (currentEquipmentSlot === -2) {
          state.playerEquipment[1][type][ringPosition] = item;
        } else {
          state.playerEquipment[2][type][ringPosition] = item;
        }
        state.playerBag[bagPosition] = tempEquipped || null;
      });
    } else if (type !== "rings" && ringPosition === 2) {
      const tempEquipped = playerEquip[0][type];
      set((state) => {
        if (currentEquipmentSlot === -1) {
          state.playerEquipment[0][type] = item;
        } else if (currentEquipmentSlot === -2) {
          state.playerEquipment[1][type] = item;
        } else {
          state.playerEquipment[2][type] = item;
        }
        state.playerBag[bagPosition] = tempEquipped;
      });
    }
    set((state) => {
      state.selectedItem = null;
      state.selectedItemPosition = null;
    });
    get().updatePlayerStats();
  },
  selectItem: (item: Item, position: number, ringPosition: number | null) => {
    set((state) => {
      state.selectedItem = item;
      state.selectedItemPosition = position;
      state.selectedItemRingPosition = ringPosition;
    });
  },
  deselectItem: () => {
    set((state) => {
      state.selectedItem = null;
      state.selectedItemPosition = null;
      state.selectedItemRingPosition = null;
    });
  },
  prestige: () => {
    set((state) => {
      state.currentClass = null;
    });
  },
  addStatToPlayer: (stat: PlayerStat, amount: number) => {
    set((state) => {
      if (state.playerStats.statPoints > 0) {
        state.playerStats[stat][0] += amount;
        state.playerStats.statPoints -= amount;
      }
    });
    get().updatePlayerStats();
  },
  removeStatFromPlayer: (stat: PlayerStat, amount: number) => {
    set((state) => {
      if (state.playerStats[stat][0] > 0) {
        state.playerStats[stat][0] -= amount;
        state.playerStats.statPoints += amount;
      }
    });
    get().updatePlayerStats();
  },
  resetPlayerStats: () => {
    const { str, dex, con, skl, luk, statPoints } = get().playerStats;
    const totalStats = str[0] + dex[0] + con[0] + skl[0] + luk[0] + statPoints;

    set((state) => {
      state.playerStats.statPoints = totalStats;
      state.playerStats.str[0] = 0;
      state.playerStats.dex[0] = 0;
      state.playerStats.con[0] = 0;
      state.playerStats.skl[0] = 0;
      state.playerStats.luk[0] = 0;
    });
    get().updatePlayerStats();
  },
  regenPlayerHealth: () => {
    const { health, healthRegen } = get().playerStats;
    const [currentHealth, maxHealth] = health;

    const { type } = get().currentRegion;
    const inTown = type === "town";
    const playerHealthRegen = healthRegen[0];
    const { townHealthRegen } = get().townStats;
    const totalRegen = inTown
      ? playerHealthRegen + townHealthRegen
      : playerHealthRegen;
    const TotalAddHealth = totalRegen / 100;

    if (currentHealth !== maxHealth) {
      let newHealth = currentHealth + TotalAddHealth;
      if (newHealth > maxHealth) newHealth = maxHealth;
      set((state) => {
        state.playerStats.health[0] = newHealth;
      });
    }
  },
  regenPlayerMana: () => {
    const { mana, manaRegen } = get().playerStats;
    const [currentMana, maxMana] = mana;
    const playerManaRegen = manaRegen[0];
    const { type } = get().currentRegion;
    const inTown = type === "town";
    const { townManaRegen } = get().townStats;
    const totalRegen = inTown
      ? playerManaRegen + townManaRegen
      : playerManaRegen;
    const TotalAddMana = totalRegen / 100;

    if (currentMana !== maxMana) {
      let newMana = currentMana + TotalAddMana;
      if (maxMana && newMana > maxMana) newMana = maxMana;
      set((state) => {
        state.playerStats.mana[0] = newMana;
      });
    }
  },

  setClass: (classToSet, classStats) => {
    set(
      {
        currentClass: classToSet,
        currentClassStats: classStats,
      },
      false,
      "SetClass"
    );
    get().updatePlayerStats();
  },
  updatePlayerStats: () => {
    const equipSlot = get().currentEquipmentSlot;
    const PlayerStats = get().playerStats;
    const Equipment =
      get().playerEquipment[equipSlot] || DEFAULT_PLAYER_EQUIPMENT;
    const CurrentClassStats = get().currentClassStats;
    const PrestigeSkills = get().prestigeSkillMap;
    const BarbSkills = get().barbarianSkillMap;
    const MageSkills = get().mageSkillMap;
    const ClericSkills = get().clericSkillMap;
    const StartedSkills = get().skillsAreStarted;

    const {
      maxLevel,
      attackSpeed,
      finalStr,
      minDamage,
      maxDamage,
      finalDex,
      critChance,
      critDamage,
      finalCon,
      minHealth,
      maxHealth,
      healthRegen,
      finalSkl,
      minMana,
      maxMana,
      manaRegen,
      finalLuk,
      goldPercentage,
      expPercentage,
      magicFindPercentage,
      armor,
    } = updateStats(
      PlayerStats,
      Equipment,
      CurrentClassStats,
      PrestigeSkills,
      BarbSkills,
      MageSkills,
      ClericSkills,
      StartedSkills
    );

    set(
      (state) => {
        // LEVEL
        state.playerStats.level[1] = maxLevel;

        // ATTACK SPEED
        state.playerStats.attackSpeed = attackSpeed;

        // ARMOR
        state.playerStats.armor = armor;

        // STR
        state.playerStats.str[1] = finalStr;
        state.playerStats.damage[0] = minDamage;
        state.playerStats.damage[1] = maxDamage;

        // DEX
        state.playerStats.dex[1] = finalDex;
        state.playerStats.critPercentage = critChance;
        state.playerStats.critDamage = critDamage;

        // CON
        state.playerStats.con[1] = finalCon;
        state.playerStats.health[0] = minHealth || maxHealth;
        state.playerStats.health[1] = maxHealth;
        state.playerStats.healthRegen[0] = healthRegen;

        // SKL
        state.playerStats.skl[1] = finalSkl;
        state.playerStats.mana[0] = minMana || maxMana;
        state.playerStats.mana[1] = maxMana;
        state.playerStats.manaRegen[0] = manaRegen;

        // LUK
        state.playerStats.luk[1] = finalLuk;

        // GOLD Percentage
        state.playerStats.goldPercentage = goldPercentage;
        // EXP Percentage
        state.playerStats.experiencePercentage = expPercentage;
        // MAGIC FIND Percentage
        state.playerStats.magicFindPercentage = magicFindPercentage;
      },
      false,
      "Update player Stats"
    );
  },
});
