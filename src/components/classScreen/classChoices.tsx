import React from "react";

export type Classes = "Barbarian" | "Mage" | "Cleric";

export interface PickedClassStats {
  str: number;
  dex: number;
  con: number;
  skl: number;
  luk: number;
}
const Classes: { [key: string]: Classes } = Object.freeze({
  1: "Barbarian",
  2: "Mage",
  3: "Cleric",
});

const clericStats: PickedClassStats = {
  str: 0,
  dex: 0,
  con: 10,
  luk: 15,
  skl: 0,
};

const barbStats: PickedClassStats = {
  str: 15,
  dex: 10,
  con: 0,
  skl: 0,
  luk: 0,
};

const mageStats: PickedClassStats = {
  str: 0,
  dex: 0,
  con: 0,
  skl: 20,
  luk: 0,
};

export const ClassChoiceScreen = ({ classId }: { classId: string }) => {
  //   const { setClass } = useGameStore();
  const currentClass: Classes = Classes[classId] || "Barbarian";
  const classStats =
    currentClass === "Barbarian"
      ? barbStats
      : currentClass === "Mage"
      ? mageStats
      : clericStats;
  return (
    <div className="m-2 flex w-80 flex-col items-center rounded bg-slate-700 p-2 text-white">
      <div className="h-20">{currentClass}</div>
      <div className="flex h-full w-full flex-col items-center">
        {classId === "1" && <BarbStats />}
        {classId === "2" && <MageStats />}
        {classId === "3" && <ClericStats />}
      </div>

      <button
        onClick={
          () => {}
          // setClass(currentClass, classStats)
        }
        className="h-10 w-20 rounded bg-slate-800 p-2 hover:bg-slate-600"
      >
        Start
      </button>
    </div>
  );
};

const ClericStats = () => {
  return (
    <>
      <div className="flex w-1/2 justify-between">
        <div>Con:</div> <div>10</div>
      </div>
      <div className="flex w-1/2 justify-between">
        <div>Luk:</div> <div>15</div>
      </div>
      <div className="mt-8 flex w-8/12 justify-between">
        A little bit lucky, a little bit tough. Idle and Active
      </div>
    </>
  );
};

const BarbStats = () => {
  return (
    <>
      <div className="flex w-1/2 justify-between">
        <div>Str:</div> <div>15</div>
      </div>
      <div className="flex w-1/2 justify-between">
        <div>Dex:</div> <div>10</div>
      </div>
      <div className="mt-8 flex w-8/12 justify-between">Strong Idle style</div>
    </>
  );
};

const MageStats = () => {
  return (
    <>
      <div className="flex w-1/2 justify-between">
        <div>Skl:</div> <div>20</div>
      </div>
      <div className="mt-8 flex w-8/12 justify-between">Active playstyle</div>
    </>
  );
};
