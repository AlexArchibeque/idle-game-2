import { useGameStore } from "@/src/store/store";
import { LeftSide } from "./leftSide";
import { Middle } from "./middle";
import { RightSide } from "./rightSide";

export const GameScreen = () => {
  const { setClass } = useGameStore();
  return (
    <div>
      <button
        onClick={() => setClass(null, null)}
        className="h-10 w-20 rounded bg-slate-800 p-2 hover:bg-slate-600"
      >
        reset
      </button>
      <LeftSide />
      <Middle />
      <RightSide />
    </div>
  );
};
