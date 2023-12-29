"use client";
import { useState, useEffect } from "react";
import { GameScreen } from "@/src/components/mainScreen";
import { ClassScreen } from "@/src/components/classScreen";
import { useGameStore } from "@/src/store/store";

const Home = () => {
  const { currentClass } = useGameStore();
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      {domLoaded ? currentClass ? <GameScreen /> : <ClassScreen /> : null}
    </main>
  );
};

export default Home;
