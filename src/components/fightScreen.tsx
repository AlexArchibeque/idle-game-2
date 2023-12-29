import React from "react";
import { EnemyStatsScreen, PlayerFightScreenStats } from "./fightScreenStats";
import { type EnemyStats, RollMonsterLogic } from "../utils/rollMonsterLogic";
import { randomInteger } from "../reusables/functions";
import { useGameStore } from "../store/store";
import { FightLogScreen } from "./fightLog";

type EnemyStatsArray = [
  EnemyStats | null,
  EnemyStats | null,
  EnemyStats | null,
  EnemyStats | null,
  EnemyStats | null
];

export const FightScreen = ({ updateTick }: { updateTick: number }) => {
  const { playerStats, currentRegion } = useGameStore();

  const [enemyBeingSet, setEnemyBeingSet] = React.useState(false);
  const [toggleAutoFight, setToggleAutoFight] = React.useState(false);
  const [startFight, setStartFight] = React.useState(false);
  const [fightLog, setFightLog] = React.useState<string[]>([]);

  const [enemyStats, setEnemyStats] = React.useState<EnemyStatsArray>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [playerProgressBar, setPlayerProgressBar] = React.useState(0);

  const [enemy1ProgressBar, setEnemy1ProgressBar] = React.useState(0);
  const [enemy2ProgressBar, setEnemy2ProgressBar] = React.useState(0);
  const [enemy3ProgressBar, setEnemy3ProgressBar] = React.useState(0);
  const [enemy4ProgressBar, setEnemy4ProgressBar] = React.useState(0);
  const [enemy5ProgressBar, setEnemy5ProgressBar] = React.useState(0);

  const [whoIsPlayerAttacking, setWhoIsPlayerAttacking] = React.useState(0);

  const setEnemies = () => {
    const { maxEnemies } = currentRegion;
    const numberOfEnemies = randomInteger(1, maxEnemies);

    const finalEnemyStats: EnemyStatsArray = new Array(5).fill(
      null
    ) as EnemyStatsArray;

    for (let i = 0; i < numberOfEnemies; i++) {
      finalEnemyStats[i] = RollMonsterLogic(currentRegion);
    }
    resetProgressBars();
    setEnemyStats([...finalEnemyStats]);
  };

  const findNewEnemy = () => {
    let newEnemy = null;
    for (let i = 0; i < enemyStats.length; i++) {
      const potentialEnemy = enemyStats[i];
      if (potentialEnemy !== null && i !== whoIsPlayerAttacking) {
        setWhoIsPlayerAttacking(i);
        newEnemy = potentialEnemy;
        break;
      }
    }

    if (newEnemy === null) {
      setStartFight((prev) => !prev);
      setWhoIsPlayerAttacking(0);
      setEnemyBeingSet(true);
      setEnemies();

      setTimeout(() => {
        setEnemyBeingSet(false);
        setStartFight((prev) => !prev);
      }, 1000);
    }
  };

  React.useEffect(() => {
    if (startFight && !enemyBeingSet) {
      const { attackSpeed } = playerStats;
      const MS_UPDATE_SPEED = 15;
      const UPDATES_PER_SECOND = 1000 / MS_UPDATE_SPEED;
      const PERCENT_UPDATE = 100 / (attackSpeed * UPDATES_PER_SECOND);

      const [enemy1, enemy2, enemy3, enemy4, enemy5] = enemyStats;

      const enemy1AttackSpeed = enemy1
        ? 100 / (enemy1.attackSpeed * UPDATES_PER_SECOND)
        : 0;
      const enemy2AttackSpeed = enemy2
        ? 100 / (enemy2.attackSpeed * UPDATES_PER_SECOND)
        : 0;
      const enemy3AttackSpeed = enemy3
        ? 100 / (enemy3.attackSpeed * UPDATES_PER_SECOND)
        : 0;
      const enemy4AttackSpeed = enemy4
        ? 100 / (enemy4.attackSpeed * UPDATES_PER_SECOND)
        : 0;
      const enemy5AttackSpeed = enemy5
        ? 100 / (enemy5.attackSpeed * UPDATES_PER_SECOND)
        : 0;

      setPlayerProgressBar((prevState) => prevState + PERCENT_UPDATE);
      setEnemy1ProgressBar((prevState) => prevState + enemy1AttackSpeed);
      setEnemy2ProgressBar((prevState) => prevState + enemy2AttackSpeed);
      setEnemy3ProgressBar((prevState) => prevState + enemy3AttackSpeed);
      setEnemy4ProgressBar((prevState) => prevState + enemy4AttackSpeed);
      setEnemy5ProgressBar((prevState) => prevState + enemy5AttackSpeed);
    }
  }, [updateTick]);

  React.useEffect(() => {
    setPlayerProgressBar(0);
  }, [playerProgressBar >= 100]);

  React.useEffect(() => {
    setEnemy1ProgressBar(0);
  }, [enemy1ProgressBar >= 100]);
  React.useEffect(() => {
    setEnemy2ProgressBar(0);
  }, [enemy2ProgressBar >= 100]);
  React.useEffect(() => {
    setEnemy3ProgressBar(0);
  }, [enemy3ProgressBar >= 100]);
  React.useEffect(() => {
    setEnemy4ProgressBar(0);
  }, [enemy4ProgressBar >= 100]);
  React.useEffect(() => {
    setEnemy5ProgressBar(0);
  }, [enemy5ProgressBar >= 100]);

  const resetProgressBars = () => {
    setPlayerProgressBar(0);
    setEnemy1ProgressBar(0);
    setEnemy2ProgressBar(0);
    setEnemy3ProgressBar(0);
    setEnemy4ProgressBar(0);
    setEnemy5ProgressBar(0);
  };

  const setFightStatus = () => {
    if (startFight) {
      resetProgressBars();
    }
    if (enemyStats[whoIsPlayerAttacking] === null) findNewEnemy();
    setStartFight((prev) => !prev);
  };

  const waitButtonClass =
    "h-10 w-40 rounded bg-yellow-800 text-white hover:bg-yellow-700";
  const startButtonClass =
    "h-10 w-40 rounded bg-green-800 text-white hover:bg-green-700";
  const stopButtonClass =
    "h-10 w-40 rounded bg-red-800 text-white hover:bg-red-700";

  return (
    <React.Fragment>
      <div className="flex h-full w-full items-center justify-between">
        <PlayerFightScreenStats playerProgressBar={playerProgressBar} />
        <div className="flex h-full grow flex-col justify-between">
          <FightLogScreen fightLog={fightLog} />
          <div className="flex justify-evenly gap-2 pb-2">
            <div className="flex ">
              <input
                type="checkbox"
                onClick={() => setToggleAutoFight(!toggleAutoFight)}
              />
              <div className="ml-2 flex items-center rounded text-white">
                Autofight
              </div>
            </div>
            <button
              onClick={() => setFightStatus()}
              disabled={enemyBeingSet}
              className={
                enemyBeingSet
                  ? waitButtonClass
                  : startFight
                  ? stopButtonClass
                  : startButtonClass
              }
            >
              {enemyBeingSet ? "WAIT" : startFight ? "STOP" : "FIGHT"}
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          {enemyStats[0] && (
            <button onClick={() => setWhoIsPlayerAttacking(0)}>
              <EnemyStatsScreen
                enemyStats={enemyStats[0]}
                enemyProgressBar={enemy1ProgressBar}
                isAttacking={whoIsPlayerAttacking === 0}
                enemyNumber="1"
              />
            </button>
          )}

          {enemyStats[1] && (
            <button onClick={() => setWhoIsPlayerAttacking(1)}>
              <EnemyStatsScreen
                enemyStats={enemyStats[1]}
                enemyProgressBar={enemy2ProgressBar}
                isAttacking={whoIsPlayerAttacking === 1}
                enemyNumber="2"
              />
            </button>
          )}
        </div>
        <div className="flex flex-col">
          {enemyStats[2] && (
            <button onClick={() => setWhoIsPlayerAttacking(2)}>
              <EnemyStatsScreen
                enemyStats={enemyStats[2]}
                enemyProgressBar={enemy3ProgressBar}
                isAttacking={whoIsPlayerAttacking === 2}
                enemyNumber="3"
              />
            </button>
          )}
          {enemyStats[3] && (
            <button onClick={() => setWhoIsPlayerAttacking(3)}>
              <EnemyStatsScreen
                enemyStats={enemyStats[3]}
                isAttacking={whoIsPlayerAttacking === 3}
                enemyProgressBar={enemy4ProgressBar}
                enemyNumber="4"
              />
            </button>
          )}
          {enemyStats[4] && (
            <button onClick={() => setWhoIsPlayerAttacking(4)}>
              <EnemyStatsScreen
                enemyStats={enemyStats[4]}
                enemyProgressBar={enemy5ProgressBar}
                isAttacking={whoIsPlayerAttacking === 4}
                enemyNumber="5"
              />
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
