import React from "react";
import { useGameStore } from "../../store/store";
import { type RegionArea, type FightArea } from "../../data/defaultStats";
import { Regions } from "../../data/regionData";

const MapScreen = () => {
  const { setCurrentRegion } = useGameStore();

  return (
    <React.Fragment>
      <button
        onClick={() => setCurrentRegion("town", null, null, 0)}
        className="h-10 w-full border-b-2 bg-slate-800 text-white hover:bg-slate-700"
      >
        Back to Town
      </button>
      <RegionSelector />
    </React.Fragment>
  );
};

const buttonTailwindStyles =
  "w-full text-sm select-none pt-6 pb-6 p-2 text-white hover:bg-slate-500";
const selectedButtonTailwindStyles =
  "text-md text-green-400 w-full pt-4 pb-4 p-2 bg-slate-500 hover:bg-slate-800";
const regionTailwind =
  "w-full border-b bg-green-700 p-2 text-white hover:bg-green-900";

const Region = ({ region }: { region: FightArea }) => {
  const { setCurrentRegion, currentRegion } = useGameStore();
  const [showRegions, setShowRegions] = React.useState(false);
  const { name, areas } = Regions[region];

  const handleRegionChange = (enemys: number, regionArea: RegionArea) => {
    setCurrentRegion("fightArea", region, regionArea, enemys);
  };

  const { fightArea, maxEnemies } = currentRegion;

  return (
    <React.Fragment>
      <button
        className={regionTailwind}
        onClick={() => setShowRegions(!showRegions)}
      >
        {name}
      </button>

      {showRegions && (
        <div className=" flex w-full justify-evenly border-b bg-slate-600">
          <button
            onClick={() => handleRegionChange(1, "1")}
            className={
              fightArea === region && maxEnemies === 1
                ? selectedButtonTailwindStyles
                : buttonTailwindStyles
            }
          >
            {areas[0]}
          </button>
          <button
            onClick={() => handleRegionChange(2, "2")}
            className={
              fightArea === region && maxEnemies === 2
                ? selectedButtonTailwindStyles
                : buttonTailwindStyles
            }
          >
            {areas[1]}
          </button>
          <button
            onClick={() => handleRegionChange(3, "3")}
            className={
              fightArea === region && maxEnemies === 3
                ? selectedButtonTailwindStyles
                : buttonTailwindStyles
            }
          >
            {areas[2]}
          </button>
          <button
            onClick={() => handleRegionChange(4, "4")}
            className={
              fightArea === region && maxEnemies === 4
                ? selectedButtonTailwindStyles
                : buttonTailwindStyles
            }
          >
            {areas[3]}
          </button>
          <button
            onClick={() => handleRegionChange(5, "5")}
            className={
              fightArea === region && maxEnemies === 5
                ? selectedButtonTailwindStyles
                : buttonTailwindStyles
            }
          >
            {areas[4]}
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

const RegionSelector = () => {
  return (
    <div className="flex w-full flex-col items-center overflow-auto scrollbar-none">
      <Region region="1" />
      <Region region="2" />
      <Region region="3" />
      <Region region="4" />
      <Region region="5" />
    </div>
  );
};

export default MapScreen;
