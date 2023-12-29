import { useGameStore } from "../store/store";
import { type EnemyStats } from "../utils/rollMonsterLogic";
import {
  AnimationData,
  type InnerSection,
  type AnimationStrings,
} from "../animations/animations";
import React from "react";

const statScreenContainer =
  "flex h-full w-48 flex-col bg-slate-800 p-4 text-white rounded ";

const enemyStatsScreenContainer =
  "flex h-full w-44 flex-col bg-slate-800 p-2 text-white rounded ";

export const getProgressBarPercentage = (
  minHealth: number,
  maxHealth: number
): number => {
  return Math.floor(((minHealth || 0) / (maxHealth || 0)) * 100);
};

export const ProgressBar = ({
  percentage,
  color,
  currentNumber,
  maxNumber,
  rounded = true,
  playerLevel,
}: {
  percentage: number;
  color: string;
  currentNumber?: number;
  maxNumber?: number;
  rounded?: boolean;
  playerLevel?: [number, number];
}) => {
  return (
    <div
      className={`${currentNumber != null ? "h-6" : "h-2"} relative w-full ${
        rounded ? "rounded-full" : ""
      } bg-gray-200 dark:bg-gray-700`}
    >
      <div
        className={` z-1 ${rounded ? "rounded-full" : ""} ${color}  w-full ${
          currentNumber != null ? "h-6" : "h-2"
        }`}
        style={{ width: `${percentage}%` }}
      />
      {currentNumber != null && playerLevel != null && (
        <div className="z-2 absolute left-[44%] top-0 flex gap-4 font-bold text-white">
          <div>
            LVL: {playerLevel[0]}/{playerLevel[1]}
          </div>{" "}
          <div>
            EXP: {currentNumber}/{maxNumber}
          </div>
        </div>
      )}
    </div>
  );
};

const PlayerFightScreenStats = ({
  playerProgressBar,
}: {
  playerProgressBar: number;
}) => {
  const { playerStats, currentRegion, townStats } = useGameStore();
  const [currentHealth, maxHealth] = playerStats.health;
  const [currentMana, maxMana] = playerStats.mana;

  const healthRegen = playerStats.healthRegen[0];
  const manaRegen = playerStats.manaRegen[0];
  const { townHealthRegen, townManaRegen } = townStats;

  const healthPercentage = getProgressBarPercentage(
    currentHealth || 0,
    maxHealth || 0
  );

  const manaPercentage = getProgressBarPercentage(
    currentMana || 0,
    maxMana || 0
  );

  const inTown = currentRegion.type === "town";
  const totalHealthRegen = inTown ? healthRegen + townHealthRegen : healthRegen;
  const totalManaRegen = inTown ? manaRegen + townManaRegen : manaRegen;
  return (
    <main className={`${statScreenContainer} border-r-2`}>
      <div className="flex w-full justify-between pt-2">
        <div>Damage: </div>
        <div>
          {Math.trunc(playerStats.damage[0] || 0)} -{" "}
          {Math.trunc(playerStats.damage[1] || 0)}
        </div>
      </div>
      <ProgressBar percentage={playerProgressBar} color="bg-yellow-700" />
      <div className="flex w-full justify-between pt-2">
        <div>Speed:</div>
        <div>{playerStats.attackSpeed} /s</div>
      </div>
      <div className="flex w-full flex-col items-center pt-2">
        <div className="flex items-center">
          {Math.trunc(currentHealth)}/{maxHealth}
        </div>
        <ProgressBar percentage={healthPercentage} color="bg-red-700" />
        <div>Regen/s {totalHealthRegen.toFixed(2)}</div>
      </div>
      <div className="flex w-full flex-col items-center pt-2">
        <div className="flex items-center">
          {Math.trunc(currentMana)}/{maxMana}
        </div>
        <ProgressBar percentage={manaPercentage} color="bg-blue-700" />
        <div>Regen/s {totalManaRegen.toFixed(2)}</div>
      </div>

      <div>Crit: {(playerStats.critPercentage * 100).toFixed(2)}%</div>
      <div>Crit Dmg: {Math.trunc(playerStats.critDamage * 100)}%</div>
    </main>
  );
};

const EnemyStatsScreen = ({
  enemyStats,
  enemyProgressBar,
  enemyNumber,
  // currentAnimation,
  isAttacking,
}: {
  enemyStats: EnemyStats | null;
  enemyProgressBar: number;
  enemyNumber: string;
  // currentAnimation: AnimationStrings;
  isAttacking: boolean;
}) => {
  if (enemyStats === null) return <div></div>;
  const [currentHealth, maxHealth] = enemyStats.health;

  const healthPercentage = getProgressBarPercentage(
    currentHealth || 0,
    maxHealth || 0
  );

  const enemy = "slime";

  // const currentAnimations = AnimationData[enemy][currentAnimation];

  return (
    <main
      className={`${enemyStatsScreenContainer} ${
        isAttacking ? "border-red-700" : ""
      } border-l-2 hover:cursor-crosshair hover:bg-green-800 active:bg-green-700`}
    >
      <div className="absolute">{enemyStats.name}</div>

      {/* <TestAnimate
        canvasId={`test-${enemyNumber}`}
        flip={true}
        data={currentAnimations}
        imageSrc={currentAnimations.imgSource}
      /> */}

      <div className="flex w-full justify-between">
        <div>SPD: {enemyStats.attackSpeed.toFixed(2)} </div>
        <div>
          DMG: {enemyStats.damage[0]} - {enemyStats.damage[1]}
        </div>
      </div>
      <ProgressBar percentage={enemyProgressBar} color="bg-yellow-700" />
      <div className="flex w-full flex-col items-center">
        <div className="flex items-center">
          HP: {currentHealth}/{maxHealth}{" "}
        </div>
        <ProgressBar percentage={healthPercentage} color="bg-red-700" />
      </div>
    </main>
  );
};

const TestAnimate = ({
  canvasId,
  flip,
  imageSrc,
  data,
}: {
  canvasId: string;
  flip: boolean;
  imageSrc: string;
  data: InnerSection;
}) => {
  const playerImage = new Image();
  playerImage.src = imageSrc;

  const spriteWidth = 64;
  const spriteHeight = 64;
  let frameX = 0;
  const frameY = 0;

  const { frames } = data;

  let gameFrame = 0;
  const staggerFrames = 8;

  const animate = () => {
    const canvasWidth = 200;
    const canvasHeight = 200;
    const curCanvas =
      (document.getElementById(canvasId) as HTMLCanvasElement) || null;
    if (curCanvas) {
      const ctx = curCanvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        const position = Math.floor(gameFrame / staggerFrames) % frames;
        frameX = spriteWidth * position;
        ctx.drawImage(
          playerImage,
          frameX,
          frameY * spriteHeight,
          spriteWidth,
          spriteHeight,
          0,
          0,
          canvasWidth,
          canvasHeight
        );
      }
    }
    gameFrame++;
    requestAnimationFrame(animate);
  };

  React.useEffect(() => {
    const currentRequest = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(currentRequest);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <canvas id={canvasId} className={` ${flip ? "flipCanvas" : ""}`} />;
};

export { PlayerFightScreenStats, EnemyStatsScreen };
