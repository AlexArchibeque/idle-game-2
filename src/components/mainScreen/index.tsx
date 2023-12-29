import React from "react";
import { FightScreen } from "../fightScreen";
import EquipmentScreen from "../equipmentScreen";
import Inventory from "../inventory";
import TownScreen from "../townScreen";

import MapScreen from "../mapAndSkillScreens/map";
import BarbSkillScreen from "../mapAndSkillScreens/barbSkill";
import MageSkillScreen from "../mapAndSkillScreens/mageSkill";
import ClericSkillScreen from "../mapAndSkillScreens/clericSkill";
import PrestigeScreen from "../mapAndSkillScreens/prestige";
import PlayerSkillsScreen from "../mapAndSkillScreens/playerSkillsScreen";
import ItemInfoScreen from "../itemInfoScreen";
import ItemTrash from "../itemTrash";

import { PlayerGeneralStats } from "../playerGeneralStats";
import { AdvancedStatsView } from "../advancedStatsView";
import { useGameStore } from "@/src/store/store";
import { DEFAULT_CLASS_STATS } from "@/src/data/defaultStats";
import { getProgressBarPercentage, ProgressBar } from "../fightScreenStats";

type SkillScreens = "map" | "skill" | "prestige";

var current_req_id = 0;
var game_loop_started = false;

interface Options {
  time_step: number;
  lag: number;
  delta: number;
  total: number;
  last: null | number;
}

const START_OPTIONS: Options = {
  time_step: 1000 / 60,
  lag: 0,
  delta: 0,
  total: 0,
  last: null,
};

export const GameScreen = () => {
  const {
    currentRegion,
    playerStats,
    currentClass,
    prestige,
    prestigeSkillMap,
    setCurrentEquipSlot,
    setClass,
    regenPlayerHealth,
    regenPlayerMana,
  } = useGameStore();

  const [updateTick, setUpdateTick] = React.useState(0);

  React.useEffect(() => {
    if (!game_loop_started) {
      game_loop_started = true;
      requestAnimationFrame((time) => GameLoop(time, START_OPTIONS));
    }

    return () => {
      if (game_loop_started) {
        cancelAnimationFrame(current_req_id);
      }
    };
  }, []);

  const GameLoop = (current_time: number, options: Options = START_OPTIONS) => {
    let { lag, delta, total, last, time_step } = options;

    if (last === null) last = current_time;
    delta = current_time - last;
    total += delta;
    lag += delta;
    last = current_time;
    let number_of_updates = 0;

    while (lag >= time_step) {
      lag -= time_step;
      Update(time_step, total);
      /* panic code */
      number_of_updates++;
      if (number_of_updates >= 300) {
        // Reset lag
        lag = 0;
        Panic();
        break;
      }
    }

    const interpolation = lag / time_step;
    const newOptions = { time_step, lag, delta, total, last };
    Render(interpolation);
    if (game_loop_started) {
      current_req_id = requestAnimationFrame((time) =>
        GameLoop(time, newOptions)
      );
    }
  };

  const Update = (time_step: number, total: number) => {
    regenPlayerHealth();
    regenPlayerMana();
    setUpdateTick((prev) => prev + 1);
  };

  const Render = (interpolation: number) => {
    // Render section for Renders?
  };

  const Panic = () => {
    // Update game state, maybe apply offline gains here :)
    console.log("PANIC");
  };

  const lerp = (v1: number, v2: number, p: number) => {
    return v1 * (1 - p) + v2 * p;
  };

  const { equip_slots } = prestigeSkillMap;
  const { type } = currentRegion;

  const [equipmentSlot, setEquipmentSlot] = React.useState(-1);
  const [onEquipScreen, setOnEquipScreen] = React.useState(true);
  const [whatSkillScreen, setWhatSkillScreen] =
    React.useState<SkillScreens>("map");

  const [currentExp, maxExp] = playerStats.experience;
  const expPercentage = getProgressBarPercentage(currentExp || 0, maxExp || 0);

  const handleSetEquipmentSlot = (slot: number) => {
    setEquipmentSlot(slot);
    setCurrentEquipSlot(slot);
  };

  return (
    <>
      {/* Top Section */}
      <div className="flex max-h-[60vh] min-h-[60vh] w-full">
        {/* Left */}
        <div className="flex min-h-full w-2/12 flex-col bg-slate-700">
          <div className="flex w-full border-b-2 bg-slate-800">
            <button
              onClick={() => setOnEquipScreen(true)}
              className={` grow p-2 text-white ${
                onEquipScreen ? "bg-slate-700" : ""
              }`}
            >
              Equipment
            </button>
            <button
              onClick={() => setOnEquipScreen(false)}
              className={` grow border-l-2 p-2 text-white ${
                !onEquipScreen ? "bg-slate-700" : ""
              }`}
            >
              Adv.Stats
            </button>
          </div>
          {onEquipScreen ? (
            <div className="flex h-full flex-col justify-between">
              <PlayerGeneralStats />

              <div className="flex w-full border-b-2 bg-slate-800">
                {equip_slots.level[0] > 0 && (
                  <button
                    onClick={() => handleSetEquipmentSlot(-1)}
                    className={` grow p-2 text-white ${
                      equipmentSlot === -1 ? "bg-slate-700" : ""
                    }`}
                  >
                    Equip 1
                  </button>
                )}
                {equip_slots.level[0] > 0 && (
                  <button
                    onClick={() => handleSetEquipmentSlot(-2)}
                    className={` grow border-l-2 p-2 text-white ${
                      equipmentSlot === -2 ? "bg-slate-700" : ""
                    }`}
                  >
                    Equip 2
                  </button>
                )}
                {equip_slots.level[0] === 2 && (
                  <button
                    onClick={() => handleSetEquipmentSlot(-3)}
                    className={` grow border-l-2 p-2 text-white ${
                      equipmentSlot === -3 ? "bg-slate-700" : ""
                    }`}
                  >
                    Equip 3
                  </button>
                )}
              </div>
              {equipmentSlot === -1 && <EquipmentScreen slot={-1} />}
              {equipmentSlot === -2 && <EquipmentScreen slot={-2} />}
              {equipmentSlot === -3 && <EquipmentScreen slot={-3} />}
            </div>
          ) : (
            <AdvancedStatsView />
          )}
        </div>

        {/* Mid */}
        <div className="flex w-7/12 border-l-2 border-r-2 bg-slate-800">
          <PlayerSkillsScreen />
          {type === "town" ? (
            <TownScreen />
          ) : (
            <FightScreen updateTick={updateTick} />
          )}
        </div>

        {/* Right */}
        <div className="flex min-h-full w-3/12 flex-col bg-slate-700">
          <div className="flex border-b-2 bg-slate-800">
            <button
              onClick={() => setWhatSkillScreen("map")}
              className={`grow p-2 text-white ${
                whatSkillScreen === "map" ? "bg-slate-700" : ""
              }`}
            >
              Map
            </button>
            <button
              onClick={() => setWhatSkillScreen("skill")}
              className={`grow border-l-2 p-2 text-white ${
                whatSkillScreen === "skill" ? "bg-slate-700" : ""
              }`}
            >
              Skill
            </button>
            <button
              onClick={() => setWhatSkillScreen("prestige")}
              className={`grow border-l-2 p-2 text-white ${
                whatSkillScreen === "prestige" ? "bg-slate-700" : ""
              }`}
            >
              Prestige
            </button>
          </div>
          {whatSkillScreen === "map" && <MapScreen />}
          {whatSkillScreen === "skill" ? (
            currentClass === "Barbarian" ? (
              <BarbSkillScreen />
            ) : currentClass === "Mage" ? (
              <MageSkillScreen />
            ) : (
              <ClericSkillScreen />
            )
          ) : (
            ""
          )}
          {whatSkillScreen === "prestige" && <PrestigeScreen />}
        </div>
      </div>
      {/* End Top Section */}

      {/* Middle Section*/}
      <div className="min-h-[2vh] border-t-2 border-b-2">
        <div className="flex w-full flex-col items-center">
          <ProgressBar
            percentage={expPercentage}
            color="bg-green-700"
            currentNumber={currentExp}
            maxNumber={maxExp}
            rounded={false}
            playerLevel={playerStats.level}
          />
        </div>
      </div>
      {/* End Middle Section */}

      {/* Bottom Section*/}
      <div className="flex w-full grow">
        {/* Left */}
        <div className="flex w-2/12 grow bg-slate-700">
          <ItemInfoScreen />
        </div>
        {/* Mid */}
        <div className="flex w-8/12 grow border-l-2 border-r-2">
          <Inventory />
        </div>
        {/* Bottom */}
        <div className="flex w-2/12 grow">
          <ItemTrash />
          <button onClick={() => prestige()}>Choose Class</button>
        </div>
      </div>
      {/* End Bottom Section */}
    </>
  );
};
