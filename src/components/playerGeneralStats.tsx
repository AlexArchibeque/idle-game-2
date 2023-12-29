import React from "react";
import { useGameStore } from "../store/store";
import type { MouseEvent } from "react";
import { type PlayerStat } from "../data/defaultStats";
import Tippy from "@tippyjs/react";
import { toolTipStyles } from "../reusables/tailwindTypes";
import StatView from "./tippyViews/statView";

const StatAddAndRemove = ({
  type,
  stat,
  bgColor,
}: {
  type: PlayerStat;
  stat: string;
  bgColor: number;
}) => {
  const { playerStats, addStatToPlayer, removeStatFromPlayer } = useGameStore();

  const addStat = (e: MouseEvent, stat: PlayerStat) => {
    if (e.shiftKey && playerStats.statPoints >= 5) {
      addStatToPlayer(stat, 5);
    } else {
      addStatToPlayer(stat, 1);
    }
  };

  const removeStat = (e: MouseEvent, stat: PlayerStat) => {
    if (e.shiftKey && playerStats[stat][0] >= 5) {
      removeStatFromPlayer(stat, 5);
    } else {
      removeStatFromPlayer(stat, 1);
    }
  };

  return (
    <Tippy
      className={toolTipStyles}
      content={<StatView currentStat={type} />}
      duration={10}
    >
      <div
        className={`${
          bgColor === 1 ? "bg-slate-600" : "bg-slate-800"
        } flex w-full justify-between p-1 text-white`}
      >
        <div>{stat}</div>
        <div className="flex gap-2">
          <div>
            ({playerStats[type][0]}) {playerStats[type][1]}
          </div>
          <button
            className={`h-6 w-6 rounded bg-red-500 hover:bg-red-600 ${
              playerStats[type][0] <= 0 ? "opacity-25" : ""
            }`}
            disabled={playerStats[type][0] <= 0 ? true : false}
            onClick={(e) => removeStat(e, type)}
          >
            -
          </button>
          <button
            className={`h-6 w-6 rounded bg-green-500 hover:bg-green-600 ${
              playerStats.statPoints <= 0 ? "opacity-25" : ""
            }`}
            disabled={playerStats.statPoints <= 0 ? true : false}
            onClick={(e) => addStat(e, type)}
          >
            +
          </button>
        </div>
      </div>
    </Tippy>
  );
};

export const PlayerGeneralStats = () => {
  const { resetPlayerStats, playerStats } = useGameStore();

  return (
    <div className="flex flex-col">
      <StatAddAndRemove type={"str"} stat={"STR"} bgColor={1} />
      <StatAddAndRemove type={"dex"} stat={"DEX"} bgColor={2} />
      <StatAddAndRemove type={"con"} stat={"CON"} bgColor={1} />
      <StatAddAndRemove type={"skl"} stat={"SKL"} bgColor={2} />
      <StatAddAndRemove type={"luk"} stat={"LUK"} bgColor={1} />
      <div className="flex w-full justify-center text-white">
        Stat Points: {playerStats.statPoints}
      </div>
      <button
        onClick={() => resetPlayerStats()}
        className=" bg-red-800 p-1 text-lg text-white hover:bg-red-900"
      >
        Reset Stats
      </button>
    </div>
  );
};
