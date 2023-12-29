import { useGameStore } from "../../store/store";
import { skillTailwind } from "../../reusables/tailwindTypes";
import Image from "next/image";

const ClericSkillScreen = () => {
  const { skillPoints, currentClass } = useGameStore();
  return (
    <div className="flex h-full w-full flex-col items-center ">
      <div>Class: {currentClass}</div>
      <div>skillPoints: {skillPoints}</div>

      {/* Row 1 */}
      <div className="flex w-full justify-evenly bg-slate-800 p-2">
        <button className={skillTailwind}>
          {" "}
          <Image
            width={48}
            height={48}
            alt="N/A"
            src="/Skills/Cleric/feast_1.png"
            className="z-1 relative "
          />
        </button>
        <button className={skillTailwind}>
          {" "}
          <Image
            width={48}
            height={48}
            alt="N/A"
            src="/Skills/Cleric/shield_1.png"
            className="z-1 relative "
          />
        </button>
      </div>

      {/* Row 2 */}
      <div className="flex w-full justify-evenly bg-slate-900 p-2">
        <button className={skillTailwind}>
          {" "}
          <Image
            width={48}
            height={48}
            alt="N/A"
            src="/Skills/Cleric/potion_1.png"
            className="z-1 relative "
          />
        </button>
        <button className={skillTailwind}>
          {" "}
          <Image
            width={48}
            height={48}
            alt="N/A"
            src="/Skills/Cleric/female_shield_1.png"
            className="z-1 relative "
          />
        </button>
      </div>

      {/* Row 3 */}
      <div className="flex w-full justify-evenly bg-slate-800  p-2">
        <button className={skillTailwind}>
          {" "}
          <Image
            width={48}
            height={48}
            alt="N/A"
            src="/Skills/Cleric/female_speed_1.png"
            className="z-1 relative "
          />
        </button>
        <button className={skillTailwind}>
          {" "}
          <Image
            width={48}
            height={48}
            alt="N/A"
            src="/Skills/Cleric/female_vitality_1.png"
            className="z-1 relative "
          />
        </button>
      </div>

      {/* Row 4 */}
      <div className="flex w-full justify-evenly bg-slate-900  p-2">
        <button className={skillTailwind}>
          {" "}
          <Image
            width={48}
            height={48}
            alt="N/A"
            src="/Skills/Cleric/female_perception_1.png"
            className="z-1 relative "
          />
        </button>
      </div>
    </div>
  );
};

export default ClericSkillScreen;
