import { randomInteger } from "../reusables/functions";
// import { v4 } from "uuid";
import { retrievePicture } from "../data/pictureData";
import { type Region } from "../data/defaultStats";
import { Regions } from "../data/regionData";
import { capitalize } from "../reusables/functions";

export type Item = RollableItemStats & ItemDetails;

interface ItemDetails {
  name: string;
  picture: string;
  type: ItemTypes;
  rarity: ItemRarities;
  id: string;
  goldWorth: number;
  weaponDamage: [number, number] | null;
}

interface RollableItemStats {
  armor: number | null;
  str: number | null;
  dex: number | null;
  con: number | null;
  skl: number | null;
  luk: number | null;
  critChance: number | null;
  critDamage: number | null;
  maxHealth: number | null;
  maxMana: number | null;
  healthRegen: number | null;
  manaRegen: number | null;
  experiencePercentage: number | null;
  goldPercentage: number | null;
  attackSpeed: number | null;
  magicFind: number | null;
}
export type rollableItemStatsKeys = keyof RollableItemStats;

const ALL_STATS: rollableItemStatsKeys[] = [
  "str",
  "dex",
  "con",
  "skl",
  "luk",
  "armor",
  "critChance",
  "critDamage",
  "maxHealth",
  "maxMana",
  "manaRegen",
  "healthRegen",
  "experiencePercentage",
  "goldPercentage",
  "attackSpeed",
  "magicFind",
];

export type arrayOfKeys = keyof Item;

export type ItemTypes =
  | "helm"
  | "chest"
  | "pants"
  | "boots"
  | "gloves"
  | "cape"
  | "necklace"
  | "rings"
  | "weaponLeft"
  | "weaponRight"
  | "wrist";

export type ItemRarities = "normal" | "magic" | "rare" | "epic" | "unique";

const NUMBER_OF_STATS_TO_ROLL: { [k in ItemRarities]: number } = {
  normal: 1,
  magic: 2,
  rare: 3,
  epic: 4,
  unique: 5,
};

const genDefaultItem = (): Item => {
  const defaultItem: Item = {
    name: "",
    picture: "",
    type: "chest",
    rarity: "normal",
    id: "",
    weaponDamage: null,
    armor: null,
    str: null,
    dex: null,
    con: null,
    skl: null,
    luk: null,
    critChance: null,
    critDamage: null,
    maxHealth: null,
    maxMana: null,
    healthRegen: null,
    manaRegen: null,
    experiencePercentage: null,
    goldPercentage: null,
    attackSpeed: null,
    magicFind: null,
    goldWorth: 0,
  };
  return defaultItem;
};

const itemTypes: { [key: number]: ItemTypes } = {
  1: "helm",
  2: "chest",
  3: "wrist",
  4: "pants",
  5: "boots",
  6: "gloves",
  7: "cape",
  8: "necklace",
  9: "rings",
  10: "weaponLeft",
  11: "weaponRight",
};

const determineItemRarity = (): ItemRarities => {
  const items: ItemRarities[] = ["normal", "magic", "rare", "epic", "unique"];
  const defaultWeights = [1, 0.2, 0.1, 0.03, 0.01];

  const randomNumber = Number.parseFloat(Math.random().toFixed(2));
  for (let i = 4; i >= 0; i--) {
    if ((defaultWeights[i] || 0) >= randomNumber) {
      return items[i] || "normal";
    } else if (i === 0) {
      return "unique";
    }
  }
  return "normal";
};

const rollAndSetItemStats = (item: Item) => {
  const { rarity } = item;

  const numberOfStats = NUMBER_OF_STATS_TO_ROLL[rarity];

  for (let i = 0; i < numberOfStats; i++) {
    const randStat = ALL_STATS[randomInteger(0, ALL_STATS.length)] || "str";
    const additionToStat = randomInteger(1, 20);
    const finalStat = (item[randStat] || 0) + additionToStat;
    item[randStat] = finalStat;
  }

  if (item.type === "weaponLeft") {
    item.weaponDamage = [randomInteger(1, 5), randomInteger(10, 40)];
  }
};

export const RollAnItem = (region: Region): Item => {
  const newItem = genDefaultItem();

  // Rarity

  const itemRarity = determineItemRarity();
  newItem.rarity = itemRarity;
  // id
  const id: string = `${itemRarity}+item+123123`;
  newItem.id = id;
  // Determine item type
  const itemType = itemTypes[randomInteger(1, 11)] || "chest";
  newItem.type = itemType != null ? itemType : "chest";

  // Grab picture data
  newItem.picture = retrievePicture(itemType, region);

  rollAndSetItemStats(newItem);

  newItem.goldWorth = Math.floor(
    Math.random() * 100 * NUMBER_OF_STATS_TO_ROLL[itemRarity]
  );

  const regionName = Regions[region.fightArea || "1"];

  newItem.name = `${capitalize(itemRarity)} ${regionName.name} ${capitalize(
    itemType
  )}`;

  return newItem;
};
