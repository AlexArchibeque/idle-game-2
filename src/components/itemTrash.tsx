import { useGameStore } from "../store/store";
import type { Item } from "../utils/rollItemLogic";
import React from "react";

const ItemTrash = () => {
  const { deleteItem, selectedItem } = useGameStore();
  const [itemIsDraggedOver, setItemDraggedOver] = React.useState(false);

  const handleOnDrop = (e: React.DragEvent) => {
    const itemData = e.dataTransfer.getData("item");
    if (itemData != "") {
      const item = JSON.parse(itemData) as Item;
      const bagPosition = e.dataTransfer.getData("position");
      const otherRingPosition = e.dataTransfer.getData("ringPosition");
      deleteItem(item, parseInt(bagPosition), parseInt(otherRingPosition));
    }
    setItemDraggedOver(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    setItemDraggedOver(true);
    e.preventDefault();
  };

  return (
    <div
      className={`mb-4 flex h-full w-full items-center justify-center bg-yellow-200 ${
        itemIsDraggedOver ? "bg-yellow-400" : ""
      }`}
      onDrop={(e) => handleOnDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragLeave={() => setItemDraggedOver(false)}
    >
      {itemIsDraggedOver && selectedItem != null
        ? `(${selectedItem.goldWorth})`
        : "Sell Zone"}
    </div>
  );
};

export default ItemTrash;
