import React from "react";
import { EnemyStatsScreen, PlayerFightScreenStats } from "./fightScreenStats";
import { type EnemyStats, RollMonsterLogic } from "../utils/rollMonsterLogic";
import type { AnimationStrings } from "../animations/animations";
import { randomInteger } from "../reusables/functions";
import { useGameStore } from "../store/store";
import { FightLogScreen } from "./fightLog";
import { Fight } from "../utils/handleFight";

type EnemyStatsArray = [
  EnemyStats | null,
  EnemyStats | null,
  EnemyStats | null,
  EnemyStats | null,
  EnemyStats | null
];

export const FightScreen = ({ updateTick }: { updateTick: number }) => {
  const {
    playerStats,
    currentRegion,
    gameIsRunning,
    attackSkill,
    setAttackSkill,
    attackPlayer,
    setGameIsRunning,
    rollAndSetItems,
    handleEnemyDeath,
  } = useGameStore();

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

  const [enemy1Animation, setEnemy1Animation] =
    React.useState<AnimationStrings>("idle");
  const [enemy2Animation, setEnemy2Animation] =
    React.useState<AnimationStrings>("idle");
  const [enemy3Animation, setEnemy3Animation] =
    React.useState<AnimationStrings>("idle");
  const [enemy4Animation, setEnemy4Animation] =
    React.useState<AnimationStrings>("idle");
  const [enemy5Animation, setEnemy5Animation] =
    React.useState<AnimationStrings>("idle");

  const [whoIsPlayerAttacking, setWhoIsPlayerAttacking] = React.useState(0);

  React.useEffect(() => {
    // Load enemies when choosing a region
    setEnemies();
  }, [currentRegion]);

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

  const updateAfterFight = (isPlayerAttacking: boolean, newHealth: number) => {
    if (isPlayerAttacking) {
      if (newHealth <= 0) {
        setEnemyStats((prev) => {
          const copy = [...prev] as EnemyStatsArray;
          copy[whoIsPlayerAttacking] = null;
          return copy;
        });
      } else {
        setEnemyStats((prev) => {
          const copy = [...prev] as EnemyStatsArray;
          const enemy = copy[whoIsPlayerAttacking];
          if (enemy) enemy.health[0] = newHealth;
          return copy;
        });
      }
    }
  };

  React.useEffect(() => {
    if (startFight && !enemyBeingSet && gameIsRunning) {
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
    if (attackSkill != null && attackSkill.attack) {
      const { attack, level } = attackSkill;
      const { cleave, damage } = attack;
      if (cleave) {
        const copy = [...enemyStats] as EnemyStatsArray;
        for (let i = 0; i < copy.length; i++) {
          const enemy = copy[i];
          if (enemy) {
            enemy.health[0] -= damage[level[0]] || 0;
            if (enemy.health[0] <= 0) {
              handleEnemyDeath(1, enemy);
              rollAndSetItems(enemy);
              copy[i] = null;
            }
          }
        }
        setEnemyStats(copy);
      } else {
        setEnemyStats((prev) => {
          const copy = [...prev] as EnemyStatsArray;
          const enemy = copy[whoIsPlayerAttacking];
          if (enemy && enemy.health[0] - (damage[level[0]] || 0) <= 0) {
            handleEnemyDeath(1, enemy);
            rollAndSetItems(enemy);
            copy[whoIsPlayerAttacking] = null;
          } else if (enemy) {
            enemy.health[0] -= damage[level[0]] || 0;
          }
          return copy;
        });
      }
      setAttackSkill(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attackSkill]);

  React.useEffect(() => {
    if (playerProgressBar >= 100) {
      const attackedEnemy = enemyStats[whoIsPlayerAttacking] || findNewEnemy();
      if (attackedEnemy != null) {
        const {
          newHealth: newEnemyHealth,
          damage: playerDamage,
          isCrit,
        } = Fight(playerStats, attackedEnemy, true);
        updateAfterFight(true, newEnemyHealth);

        const fightMessages: string[] = [];
        fightMessages.push(
          `Player hits Enemy ${whoIsPlayerAttacking + 1} for ${
            isCrit ? "CRIT! " : ""
          }${playerDamage.toString()}`
        );

        if (newEnemyHealth <= 0) {
          fightMessages.push(
            `Player kills Enemy ${
              whoIsPlayerAttacking + 1
            }, handing out rewards...`
          );
          rollAndSetItems(attackedEnemy);
          handleEnemyDeath(1, attackedEnemy);

          findNewEnemy();
        }
        setPlayerProgressBar(0);
        setFightLog((log: string[]) => [...log, ...fightMessages]);
      }
    }
  }, [playerProgressBar >= 100]);

  React.useEffect(() => {
    let totalHealth = playerStats.health[0];
    let totalDamage = 0;
    const currentEnemy = enemyStats[0];
    if (currentEnemy && enemy1ProgressBar >= 100 && totalHealth >= 0) {
      const { damage: enemyDamage } = Fight(playerStats, currentEnemy, false);

      totalDamage += enemyDamage;
      totalHealth -= enemyDamage;

      const fightMessage =
        totalHealth <= 0
          ? "Enemy 1 Kills Player"
          : `Enemy 1 hits Player for ${enemyDamage.toString()}`;
      setFightLog((log: string[]) => [...log, fightMessage]);
      setEnemy1ProgressBar(0);
      setEnemy1Animation("attack");
    }

    if (totalHealth <= 0) {
      setGameIsRunning(true);
      setStartFight(false);
      resetProgressBars();
    }
    attackPlayer(totalHealth, totalDamage);
  }, [enemy1ProgressBar >= 100]);

  React.useEffect(() => {
    let totalHealth = playerStats.health[0];
    let totalDamage = 0;
    const currentEnemy = enemyStats[1];
    if (currentEnemy && enemy2ProgressBar >= 100 && totalHealth >= 0) {
      const { damage: enemyDamage } = Fight(playerStats, currentEnemy, false);

      totalDamage += enemyDamage;
      totalHealth -= enemyDamage;

      const fightMessage =
        totalHealth <= 0
          ? "Enemy 2 Kills Player"
          : `Enemy 2 hits Player for ${enemyDamage.toString()}`;
      setFightLog((log: string[]) => [...log, fightMessage]);
      setEnemy2Animation("attack");
      setEnemy2ProgressBar(0);
    }

    if (totalHealth <= 0) {
      setGameIsRunning(true);
      setStartFight(false);
      resetProgressBars();
    }
    attackPlayer(totalHealth, totalDamage);
  }, [enemy2ProgressBar >= 100]);

  React.useEffect(() => {
    let totalHealth = playerStats.health[0];
    let totalDamage = 0;
    const currentEnemy = enemyStats[2];
    if (currentEnemy && enemy3ProgressBar >= 100 && totalHealth >= 0) {
      const { damage: enemyDamage } = Fight(playerStats, currentEnemy, false);

      totalDamage += enemyDamage;
      totalHealth -= enemyDamage;

      const fightMessage =
        totalHealth <= 0
          ? "Enemy 3 Kills Player"
          : `Enemy 3 hits Player for ${enemyDamage.toString()}`;
      setFightLog((log: string[]) => [...log, fightMessage]);
      setEnemy3Animation("attack");
      setEnemy3ProgressBar(0);
    }

    if (totalHealth <= 0) {
      setGameIsRunning(true);
      setStartFight(false);
      resetProgressBars();
    }
    attackPlayer(totalHealth, totalDamage);
  }, [enemy3ProgressBar >= 100]);
  React.useEffect(() => {
    let totalHealth = playerStats.health[0];
    let totalDamage = 0;
    const currentEnemy = enemyStats[3];
    if (currentEnemy && enemy4ProgressBar >= 100 && totalHealth >= 0) {
      const { damage: enemyDamage } = Fight(playerStats, currentEnemy, false);

      totalDamage += enemyDamage;
      totalHealth -= enemyDamage;

      const fightMessage =
        totalHealth <= 0
          ? "Enemy 4 Kills Player"
          : `Enemy 4 hits Player for ${enemyDamage.toString()}`;
      setFightLog((log: string[]) => [...log, fightMessage]);
      setEnemy4Animation("attack");
      setEnemy4ProgressBar(0);
    }

    if (totalHealth <= 0) {
      setGameIsRunning(true);
      setStartFight(false);
      resetProgressBars();
    }
    attackPlayer(totalHealth, totalDamage);
  }, [enemy4ProgressBar >= 100]);
  React.useEffect(() => {
    let totalHealth = playerStats.health[0];
    let totalDamage = 0;
    const currentEnemy = enemyStats[4];
    if (currentEnemy && enemy5ProgressBar >= 100 && totalHealth >= 0) {
      const { damage: enemyDamage } = Fight(playerStats, currentEnemy, false);

      totalDamage += enemyDamage;
      totalHealth -= enemyDamage;

      const fightMessage =
        totalHealth <= 0
          ? "Enemy 5 Kills Player"
          : `Enemy 5 hits Player for ${enemyDamage.toString()}`;
      setFightLog((log: string[]) => [...log, fightMessage]);
      setEnemy5Animation("attack");
      setEnemy5ProgressBar(0);
    }

    if (totalHealth <= 0) {
      setGameIsRunning(true);
      setStartFight(false);
      resetProgressBars();
    }
    attackPlayer(totalHealth, totalDamage);
  }, [enemy5ProgressBar >= 100]);

  React.useEffect(() => {
    if (enemy1ProgressBar >= 15 && enemy1Animation !== "idle") {
      setEnemy1Animation("idle");
    }
    if (enemy2ProgressBar >= 15 && enemy2Animation !== "idle") {
      setEnemy2Animation("idle");
    }
    if (enemy3ProgressBar >= 15 && enemy3Animation !== "idle") {
      setEnemy3Animation("idle");
    }
    if (enemy4ProgressBar >= 15 && enemy4Animation !== "idle") {
      setEnemy4Animation("idle");
    }
    if (enemy5ProgressBar >= 15 && enemy5Animation !== "idle") {
      setEnemy5Animation("idle");
    }
  }, [
    enemy1Animation,
    enemy1ProgressBar,
    enemy2Animation,
    enemy2ProgressBar,
    enemy3Animation,
    enemy3ProgressBar,
    enemy4Animation,
    enemy4ProgressBar,
    enemy5Animation,
    enemy5ProgressBar,
  ]);

  const resetProgressBars = () => {
    setPlayerProgressBar(0);
    setEnemy1ProgressBar(0);
    setEnemy2ProgressBar(0);
    setEnemy3ProgressBar(0);
    setEnemy4ProgressBar(0);
    setEnemy5ProgressBar(0);
    setEnemy1Animation("idle");
    setEnemy2Animation("idle");
    setEnemy3Animation("idle");
    setEnemy4Animation("idle");
    setEnemy5Animation("idle");
  };

  const setFightStatus = () => {
    if (startFight) {
      resetProgressBars();
    }
    if (enemyStats[whoIsPlayerAttacking] === null) findNewEnemy();
    setGameIsRunning();
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
                currentAnimation={enemy1Animation}
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
                currentAnimation={enemy2Animation}
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
                currentAnimation={enemy3Animation}
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
                currentAnimation={enemy4Animation}
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
                currentAnimation={enemy5Animation}
              />
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
