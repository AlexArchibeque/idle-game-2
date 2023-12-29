import { type ItemTypes, type Item } from "../utils/rollItemLogic";
import React from "react";
import { useGameStore } from "../store/store";
import {
  rarityStyles,
  regularItemBoxTailwind,
} from "../reusables/tailwindTypes";
import HoverItem from "./hoverItem";
import Image from "next/image";

const DEFAULT_IMAGES: { [type in ItemTypes]: string } = {
  helm: "/Armours/Helm/Silver_Helmet9.png",
  chest: "/Armours/Chest/Silver_Chestplate7.png",
  wrist: "/Armours/Wrist/Sleeve47.png",
  pants: "/Armours/Pants/Silver_Leggings10.png",
  boots: "/Armours/Boots/Silver_Boots14.png",
  gloves: "/Armours/Gloves/Silver_Gloves24.png",
  cape: "/Armours/Cape/Brown_White_625.png",
  necklace: "/Jewelry/Necklaces/Silver_Necklace_840.png",
  rings: "/Jewelry/Rings/Silver_Ring_1038.png",
  weaponLeft: "/Weapons/1Handed/Silver_Weapon17.png",
  weaponRight: "/Weapons/Shields/Silver_Shield4.png",
};

const EquipmentItem = ({
  itemType,
  slot,
  ringSlot,
  handleOnDrop,
}: {
  itemType: ItemTypes;
  slot: number;
  ringSlot: number;
  handleOnDrop: (e: React.DragEvent, ringPos: number) => void;
}) => {
  const {
    playerEquipment,
    playerEquipment2,
    playerEquipment3,
    selectItem,
    currentEquipmentSlot,
  } = useGameStore();

  const currentEquipment =
    slot === -1
      ? playerEquipment
      : slot === -2
      ? playerEquipment2
      : playerEquipment3;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleOnDrag = (
    e: React.DragEvent,
    item: Item | null,
    ringPos: number
  ) => {
    if (item != null) {
      e.dataTransfer.setData("item", JSON.stringify(item));
      e.dataTransfer.setData("position", currentEquipmentSlot.toString());
      e.dataTransfer.setData("ringPosition", ringPos.toString());
      selectItem(item, currentEquipmentSlot, ringPos);
    } else {
      e.dataTransfer.setData("item", "error");
    }
  };

  const currentEquip = currentEquipment[itemType];
  const finalEquip = Array.isArray(currentEquip)
    ? currentEquip[ringSlot] || null
    : currentEquip;

  let hoverItemRingSlot = undefined;

  const rarityStyle = rarityStyles[finalEquip?.rarity || "normal"];

  if (itemType === "rings") {
    hoverItemRingSlot = ringSlot;
  }

  return (
    <div
      className={`${regularItemBoxTailwind} ${
        finalEquip != null ? rarityStyle : ""
      }`}
      draggable={finalEquip != null ? true : false}
      onDragStart={(e) => handleOnDrag(e, finalEquip, ringSlot)}
      onDrop={
        itemType === "rings" ? (e) => handleOnDrop(e, ringSlot) : undefined
      }
      onDragOver={itemType === "rings" ? handleDragOver : undefined}
    >
      {finalEquip === null && <DefaultImage image={DEFAULT_IMAGES[itemType]} />}
      {finalEquip != null &&
        HoverItem(
          selectItem,
          currentEquipmentSlot,
          finalEquip,
          hoverItemRingSlot
        )}
    </div>
  );
};

const DefaultImage = ({ image }: { image: string }) => {
  return (
    <Image
      width={40}
      height={40}
      className="opacity-25"
      alt="N/A"
      src={image}
      draggable={false}
    />
  );
};

const EquipmentScreen = ({ slot }: { slot: number }) => {
  const { equipItem } = useGameStore();

  const handleOnDrop = (e: React.DragEvent, ringPos: number) => {
    const itemData = e.dataTransfer.getData("item");
    if (itemData != "") {
      const item = JSON.parse(itemData) as Item;
      const bagPosition = e.dataTransfer.getData("position");
      const otherRingPosition = e.dataTransfer.getData("ringPosition");

      // Fix for dropping equipment on equipment
      if (parseInt(bagPosition) > -1) {
        equipItem(item, parseInt(bagPosition), ringPos, false);
      } else if (
        item.type === "rings" &&
        ringPos.toString() !== otherRingPosition &&
        ringPos !== 2
      ) {
        equipItem(item, ringPos === 1 ? 0 : 1, ringPos, true);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className="mt-4 mb-2 flex grow flex-col items-center justify-center rounded"
      onDrop={(e) => handleOnDrop(e, 2)}
      onDragOver={handleDragOver}
    >
      {/* Top */}

      <div className="flex w-full justify-evenly">
        <EquipmentItem
          itemType={"cape"}
          slot={slot}
          ringSlot={2}
          handleOnDrop={handleOnDrop}
        />
        <EquipmentItem
          itemType={"helm"}
          slot={slot}
          ringSlot={2}
          handleOnDrop={handleOnDrop}
        />
        <EquipmentItem
          itemType={"necklace"}
          slot={slot}
          ringSlot={2}
          handleOnDrop={handleOnDrop}
        />
      </div>
      <div className="flex w-full justify-evenly">
        <EquipmentItem
          itemType={"gloves"}
          slot={slot}
          ringSlot={2}
          handleOnDrop={handleOnDrop}
        />
        <EquipmentItem
          itemType={"chest"}
          slot={slot}
          ringSlot={2}
          handleOnDrop={handleOnDrop}
        />
        <EquipmentItem
          itemType={"wrist"}
          slot={slot}
          ringSlot={2}
          handleOnDrop={handleOnDrop}
        />
      </div>
      <div className="flex w-full justify-evenly">
        <EquipmentItem
          itemType={"rings"}
          slot={slot}
          ringSlot={0}
          handleOnDrop={handleOnDrop}
        />
        <EquipmentItem
          itemType={"pants"}
          slot={slot}
          ringSlot={2}
          handleOnDrop={handleOnDrop}
        />
        <EquipmentItem
          itemType={"rings"}
          slot={slot}
          ringSlot={1}
          handleOnDrop={handleOnDrop}
        />
      </div>

      <div className="flex w-full justify-evenly">
        <EquipmentItem
          itemType={"weaponLeft"}
          slot={slot}
          ringSlot={2}
          handleOnDrop={handleOnDrop}
        />
        <EquipmentItem
          itemType={"boots"}
          slot={slot}
          ringSlot={2}
          handleOnDrop={handleOnDrop}
        />
        <EquipmentItem
          itemType={"weaponRight"}
          slot={slot}
          ringSlot={2}
          handleOnDrop={handleOnDrop}
        />
      </div>
    </div>
  );
};

export default EquipmentScreen;
