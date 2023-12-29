import React from "react";
import { type Item } from "../utils/rollItemLogic";
import Image from "next/image";
import Tippy from "@tippyjs/react";
import ItemView from "./tippyViews/itemView";
import { toolTipStyles } from "../reusables/tailwindTypes";

const HoverItem = (
  setSelectedItem: (
    item: Item,
    position: number,
    ringPosition: number | null
  ) => void,
  position: number,
  item: Item,
  ringPosition?: number
) => {
  return (
    <>
      <Image
        className="z-1 absolute select-none overflow-hidden"
        src={item.picture}
        width={40}
        height={40}
        alt="N/A"
        draggable
      />
      <Tippy
        className={toolTipStyles}
        content={<ItemView item={item} />}
        duration={10}
      >
        <div
          onClick={() => setSelectedItem(item, position, ringPosition || null)}
          className="z-9 absolute h-[40px] w-[40px] select-none"
        />
      </Tippy>
    </>
  );
};

export default HoverItem;
