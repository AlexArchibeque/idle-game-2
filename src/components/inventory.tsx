import { type NextPage } from "next";
import { useGameStore } from "../store/store";
import React from "react";
import {
  regularItemBoxTailwind,
  deleteItemTailwind,
  rarityStyles,
} from "../reusables/tailwindTypes";
// import HoverItem from "~/components/hoverItem";
import { type Item } from "../utils/rollItemLogic";

const Inventory: NextPage = () => {
  const {
    playerBag,
    moveItemIntoBag,
    deleteItems,
    deleteAllItems,
    selectItem,
    gold,
  } = useGameStore();

  const [deleteToggle, setDeleteToggle] = React.useState(false);
  const [deletionBag, setDeletionBag] = React.useState<Set<number>>(new Set());

  const handleOnDrag = (
    e: React.DragEvent,
    item: Item | null,
    position: number
  ) => {
    if (item != null) {
      e.dataTransfer.setData("item", JSON.stringify(item));
      e.dataTransfer.setData("position", position.toString());
      selectItem(item, position, null);
    } else {
      e.dataTransfer.setData("item", "error");
    }
  };

  const handleOnDrop = (e: React.DragEvent, dropPos: number) => {
    const itemData = e.dataTransfer.getData("item");
    if (itemData != "") {
      const item = JSON.parse(itemData) as Item;
      const position = e.dataTransfer.getData("position");
      moveItemIntoBag(item, parseInt(position), dropPos);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDeletionSelection = (idx: number) => {
    if (deletionBag.has(idx)) {
      const newSet = new Set(deletionBag);
      newSet.delete(idx);
      setDeletionBag(newSet);
    } else {
      setDeletionBag(new Set(deletionBag).add(idx));
    }
  };

  const handleConfirmDeletion = (shouldDelete: boolean) => {
    if (shouldDelete) {
      deleteItems(deletionBag);
    }
    setDeleteToggle(false);
    setDeletionBag(new Set());
  };

  const handleDeleteAll = () => {
    deleteAllItems();
    setDeleteToggle(false);
    setDeletionBag(new Set());
  };

  return (
    <>
      <div className="h-full w-full select-none bg-slate-800">
        <div className=" flex w-full select-none justify-between gap-2 border-b-2 text-white">
          <div className="m-1 flex p-1">
            <div className="mr-4">INVENTORY</div>
            <div className="flex">
              Total Gold: <div className="ml-4 text-yellow-500">{gold}</div>
            </div>
          </div>

          <div>
            {deleteToggle && (
              <button
                className="m-1 rounded bg-green-700 p-1 hover:bg-green-800"
                onClick={() => handleConfirmDeletion(true)}
              >
                Confirm Deletion
              </button>
            )}
            {deleteToggle && (
              <button
                className="m-1 rounded bg-red-700 p-1 hover:bg-red-800"
                onClick={() => handleConfirmDeletion(false)}
              >
                Cancel Deletion
              </button>
            )}
            <button
              className={`m-1 rounded ${
                deleteToggle ? "bg-red-600" : "bg-red-800"
              } p-1 hover:bg-red-700`}
              onClick={
                deleteToggle
                  ? () => handleDeleteAll()
                  : () => setDeleteToggle(true)
              }
            >
              {deleteToggle ? "DELETE ALL" : "Delete Items"}
            </button>
          </div>
        </div>

        {/* Update for weapon boxes. */}
        <div className="flex select-none flex-wrap justify-center ">
          {playerBag.map((item, idx) => {
            const rarityStyle = rarityStyles[item?.rarity || "normal"];
            return (
              <div
                key={`item-${idx}`}
                onDrop={(e) => handleOnDrop(e, idx)}
                onDragOver={handleDragOver}
                className={`
                ${
                  deletionBag.has(idx)
                    ? deleteItemTailwind
                    : regularItemBoxTailwind
                }
                ${item != null && !deletionBag.has(idx) ? rarityStyle : ""}
                `}
                draggable={item !== null ? true : false}
                onDragStart={(e) => handleOnDrag(e, item, idx)}
                onClick={
                  item !== null && deleteToggle
                    ? () => handleDeletionSelection(idx)
                    : undefined
                }
              >
                {/* {item !== null ? HoverItem(selectItem, idx, item) : ""} */}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Inventory;
