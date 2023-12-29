import { useGameStore } from "../../store/store";
import { skillTailwind } from "../../reusables/tailwindTypes";
import Image from "next/image";

const MageSkillScreen = () => {
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
            src="/Skills/Mage/fire_1.png"
            className="z-1 relative "
          />
        </button>
        <button className={skillTailwind}>
          {" "}
          <Image
            width={48}
            height={48}
            alt="N/A"
            src="/Skills/Mage/lightning_1.png"
            className="z-1 relative "
          />
        </button>
        <button className={skillTailwind}>
          {" "}
          <Image
            width={48}
            height={48}
            alt="N/A"
            src="/Skills/Mage/ice_1.png"
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
            src="/Skills/Mage/fire.png"
            className="z-1 relative "
          />
        </button>
        <button className={skillTailwind}>
          {" "}
          <Image
            width={48}
            height={48}
            alt="N/A"
            src="/Skills/Mage/lightning.png"
            className="z-1 relative "
          />
        </button>
        <button className={skillTailwind}>
          {" "}
          <Image
            width={48}
            height={48}
            alt="N/A"
            src="/Skills/Mage/ice.png"
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
            src="/Skills/Mage/skill.png"
            className="z-1 relative "
          />
        </button>
        <button className={skillTailwind}>
          {" "}
          <Image
            width={48}
            height={48}
            alt="N/A"
            src="/Skills/Mage/staff_1.png"
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
            src="/Skills/Mage/avatar.png"
            className="z-1 relative "
          />
        </button>
      </div>
    </div>
  );
};

export default MageSkillScreen;
