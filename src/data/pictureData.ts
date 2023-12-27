import { type ItemTypes } from "../utils/rollItemLogic";
import { type Region } from "./defaultStats";
import { randomInteger } from "../reusables/functions";

const ForestPictures: { [type in ItemTypes]: string[] } = {
  helm: ["/Armours/Helm/Silver_Helmet9.png"],
  chest: ["/Armours/Chest/Silver_Chestplate7.png"],
  wrist: ["/Armours/Wrist/Sleeve47.png"],
  pants: ["/Armours/Pants/Silver_Leggings10.png"],
  boots: ["/Armours/Boots/Silver_Boots14.png"],
  gloves: ["/Armours/Gloves/Silver_Gloves24.png"],
  cape: ["/Armours/Cape/Brown_White_625.png"],
  necklace: ["/Jewelry/Necklaces/Silver_Necklace_840.png"],
  rings: [
    "/Jewelry/Rings/Silver_Ring_1038.png",
    "/Jewelry/Rings/Gold_Ring_75.png",
  ],
  weaponLeft: ["/Weapons/1Handed/Silver_Weapon17.png"],
  weaponRight: ["/Weapons/Shields/Silver_Shield4.png"],
};

export const Pictures: { [key: string]: typeof ForestPictures } = {
  "1-1": ForestPictures,
  "1-2": ForestPictures,
  "1-3": ForestPictures,
  "1-4": ForestPictures,
  "1-5": ForestPictures,
  "2-1": ForestPictures,
  "2-2": ForestPictures,
  "2-3": ForestPictures,
  "2-4": ForestPictures,
  "2-5": ForestPictures,
  "3-1": ForestPictures,
  "3-2": ForestPictures,
  "3-3": ForestPictures,
  "3-4": ForestPictures,
  "3-5": ForestPictures,
  "4-1": ForestPictures,
  "4-2": ForestPictures,
  "4-3": ForestPictures,
  "4-4": ForestPictures,
  "4-5": ForestPictures,
  "5-1": ForestPictures,
  "5-2": ForestPictures,
  "5-3": ForestPictures,
  "5-4": ForestPictures,
  "5-5": ForestPictures,
};

export const retrievePicture = (itemType: ItemTypes, region: Region) => {
  const stringRegion = `${region.fightArea || "1"}-${region.regionArea || "1"}`;
  const picturesObject = Pictures[stringRegion] || ForestPictures;

  const currentItemTypePictureArray = picturesObject[itemType];
  const pictureIndex = randomInteger(0, currentItemTypePictureArray.length - 1);
  const currentPicture =
    currentItemTypePictureArray[pictureIndex] ||
    "/Armours/Helm/Silver_Helmet9.png";

  return currentPicture;
};
