import React from "react";
import { useGameStore } from "../store/store";

const oddClasses = "bg-slate-600";

export const AdvancedStatsView = () => {
  const { playerStats, currentClass } = useGameStore();

  const {
    health,
    healthRegen,
    mana,
    manaRegen,
    level,
    str,
    dex,
    con,
    skl,
    luk,
    critPercentage,
    critDamage,
    kills,
    damage,
    goldPercentage,
    experiencePercentage,
    magicFindPercentage,
    attackSpeed,
    armor,
  } = playerStats;

  return (
    <div className="text-white">
      <div className="flex justify-center p-2">{currentClass}</div>
      <div className={oddClasses}>Level: {level}</div>
      <div>
        Damage: {damage[0]} - {damage[1]}
      </div>
      <div className={oddClasses}>Attack Speed: {attackSpeed}</div>
      <div>Armor: {armor}</div>
      <div className={oddClasses}>Str: {str[1]}</div>
      <div>Dex: {dex[1]}</div>
      <div className={oddClasses}>Con: {con[1]}</div>
      <div>Skl: {skl[1]}</div>
      <div className={oddClasses}>Luk: {luk[1]}</div>
      <div>Max Health: {health[1]}</div>
      <div className={oddClasses}>
        Health Regen: {healthRegen[0].toFixed(2)}
      </div>
      <div>Max Mana: {mana[1]}</div>
      <div className={oddClasses}>Mana Regen: {manaRegen[0]}</div>
      <div>Crit Chance: {critPercentage * 100}%</div>
      <div className={oddClasses}>Crit Damage: {critDamage * 100}%</div>
      <div>Kills: {kills}</div>
      <div className={oddClasses}>Gold Percentage: {goldPercentage}%</div>
      <div>Experience Percentage {experiencePercentage}%</div>
      <div className={oddClasses}>
        Magic Find Perecentage {magicFindPercentage}%
      </div>
    </div>
  );
};
