import { useGameStore } from "../store/store";
import Image from "next/image";
import { type arrayOfKeys } from "../utils/rollItemLogic";

// {
//   "name": "TEST NAME",
//   "picture": "/Weapons/1Handed/Silver_Weapon17.png",
//   "type": "weaponLeft",
//   "id": "21560aa1-d1ee-4c1b-a610-edc1f5fcd562",
//   "str": 10,
//   "dex": 10,
//   "con": 10,
//   "skl": 10,
//   "luk": 10,
//   "critChance": 0.1,
//   "critDamage": 0.25,
//   "maxHealth": 100,
//   "maxMana": 100,
//   "healthRegen": 0.5,
//   "experiencePercentage": 10,
//   "attackSpeed": 0.2,
//   "magicFind": 0.5
// }

const stats: arrayOfKeys[] = [
  "str",
  "dex",
  "con",
  "skl",
  "luk",
  "critChance",
  "critDamage",
  "maxHealth",
  "maxMana",
  "healthRegen",
  "experiencePercentage",
  "goldPercentage",
  "attackSpeed",
  "magicFind",
];

const EquipInfo = () => {
  const {
    selectedItem,
    deselectItem,
    selectedItemPosition,
    equipItemFromSelectedArea,
    moveItemIntoBag,
    deleteItem,
  } = useGameStore();
  if (selectedItem === null) return <div></div>;
  const { name, picture } = selectedItem;
  const ringPosition = selectedItemPosition === -2 ? 0 : 1;
  return (
    <div className="flex w-full flex-col justify-between">
      <div className="h-64 overflow-y-scroll scrollbar-thin scrollbar-track-blue-300 scrollbar-thumb-blue-700">
        <div className="relative flex flex-col items-center">
          <button
            className="z-11 absolute top-0 right-1 h-10 w-8 rounded bg-red-700 hover:bg-red-600"
            onClick={() => deselectItem()}
          >
            X
          </button>
          <Image src={picture} width={40} height={40} alt="N/A" />
          <div>{name}</div>
          <div>
            {selectedItemPosition && selectedItemPosition <= -1
              ? "Equipped"
              : "In Bag"}
          </div>
        </div>
        <div>
          {stats.map((stat, idx) => {
            if (selectedItem[stat] !== null) {
              return (
                <div key={`${stat}-${idx}`}>
                  {stat}: {selectedItem[stat]}
                </div>
              );
            } else {
              return <div key={`${stat}-${idx}`}></div>;
            }
          })}
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <button
          onClick={
            selectedItemPosition && selectedItemPosition <= -1
              ? () =>
                  moveItemIntoBag(selectedItem, selectedItemPosition, 0, true)
              : () =>
                  equipItemFromSelectedArea(
                    selectedItem,
                    selectedItemPosition || 0
                  )
          }
          className="bg-green-700 p-2 hover:bg-green-600"
        >
          {selectedItemPosition && selectedItemPosition <= -1
            ? "Un-Equip"
            : "Equip"}
        </button>
        <button
          onClick={() =>
            deleteItem(selectedItem, selectedItemPosition || 0, ringPosition)
          }
          className="bg-yellow-700 p-2 text-white hover:bg-yellow-800"
        >
          Sell Item ({selectedItem.goldWorth})
        </button>
      </div>
    </div>
  );
};

export default EquipInfo;
