"use client";
import { GameScreen } from "@/src/components/mainScreen";
import { ClassScreen } from "@/src/components/classScreen";
import { useGameStore } from "@/src/store/store";

const Home = () => {
  const { currentClass } = useGameStore();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      {currentClass ? <GameScreen /> : <ClassScreen />}
    </main>
  );
};

export default Home;
