import type { PlayerStat } from "../../data/defaultStats";
import { useGameStore } from "../../store/store";
import { individualToolTipStyles } from "../../reusables/tailwindTypes";
import { extractItemStat } from "../../utils/itemStatRetrieval";
import { capitalize } from "../../reusables/functions";

const StatView = ({ currentStat }: { currentStat: PlayerStat }) => {
  const {
    currentClassStats,
    currentEquipmentSlot,
    playerEquipment,
    playerStats,
  } = useGameStore();

  const currentEquipment = playerEquipment[currentEquipmentSlot];

  const {
    helm,
    chest,
    pants,
    boots,
    wrist,
    cape,
    gloves,
    necklace,
    rings,
    weaponLeft,
    weaponRight,
  } = currentEquipment;

  const arrayOfItems = [
    helm,
    chest,
    pants,
    boots,
    wrist,
    cape,
    gloves,
    necklace,
    rings[0],
    rings[1],
    weaponLeft,
    weaponRight,
  ];

  const classStatNumber = currentClassStats[currentStat];

  const itemStatNumber = extractItemStat(arrayOfItems, currentStat);

  const fromLevelStats =
    playerStats[currentStat][1] - classStatNumber - itemStatNumber;

  return (
    <div className={individualToolTipStyles}>
      <div className="flex justify-center font-semibold">
        {" "}
        {capitalize(currentStat)}
      </div>
      <div className="flex justify-between">
        <div className="mr-8 font-semibold">From Class:</div>
        <div>{classStatNumber}</div>
      </div>
      <div className="flex justify-between">
        <div className="mr-8 font-semibold">From Items:</div>{" "}
        <div>{itemStatNumber}</div>
      </div>
      <div className="flex justify-between">
        <div className="mr-8 font-semibold">From Levels:</div>{" "}
        <div>{fromLevelStats}</div>
      </div>
    </div>
  );
};

export default StatView;
