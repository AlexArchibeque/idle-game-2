import type { NextPage } from "next";
import { PlayerFightScreenStats } from "./fightScreenStats";

import React from "react";
import { useGameStore } from "../store/store";

const TownScreen: NextPage = ({ updateTick }: { updateTick: number }) => {
  return (
    <div className="flex w-full items-center justify-between">
      <PlayerFightScreenStats playerProgressBar={0} />
      <TownUpgrades />
      <TownStats />
    </div>
  );
};

const TownUpgrades = () => {
  return (
    <div className="h-full grow rounded bg-slate-800 p-2 text-white">Hi</div>
  );
};

const TownStats = () => {
  const { townStats } = useGameStore();
  const { townHealthRegen, townManaRegen } = townStats;

  return (
    <div className="h-full grow rounded bg-slate-800 p-2 text-white">
      <div className="flex justify-between">
        <div>Town Health Regen</div> <div>+{townHealthRegen}</div>
      </div>
      <div className="flex justify-between">
        <div>Town Mana Regen</div>
        <div>+{townManaRegen}</div>
      </div>
      <TownActions />
    </div>
  );
};

const TownActions = () => {
  const { townHeal, townRestore, gold } = useGameStore();

  const handleHeal = () => {
    townHeal();
  };

  const handleRestore = () => {
    townRestore();
  };
  const disabledButtons = gold < 100 ? true : false;

  return (
    <div className="flex flex-col gap-2 rounded bg-slate-800 p-2">
      <button
        className={`flex flex-col items-center rounded bg-red-500 p-2 ${
          disabledButtons ? "bg-red-900" : "hover:bg-red-600"
        }`}
        disabled={disabledButtons}
        onClick={() => handleHeal()}
      >
        <div>Heal</div>
        <div>(100G)</div>
      </button>
      <button
        className={`flex flex-col items-center rounded bg-blue-500 p-2 ${
          disabledButtons ? "bg-blue-900" : "hover:bg-blue-600"
        }`}
        disabled={disabledButtons}
        onClick={() => handleRestore()}
      >
        <div>Restore</div>
        <div>(100G)</div>
      </button>
    </div>
  );
};

export default TownScreen;
