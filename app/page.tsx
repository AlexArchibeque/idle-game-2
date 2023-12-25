import { GameScreen } from "@/src/components/mainScreen";
import { ClassScreen } from "@/src/components/classScreen";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <ClassScreen />
      <GameScreen />
    </main>
  );
};

export default Home;
