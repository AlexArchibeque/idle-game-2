import React from "react";
import { type Item } from "../../utils/rollItemLogic";
import { individualToolTipStyles } from "../../reusables/tailwindTypes";

const ItemStatStyle = ({
  name,
  stat,
}: {
  name: string;
  stat: string | number;
}) => {
  return (
    <div className="flex justify-between">
      <div className="mr-8 font-semibold">{name}</div>
      <div>{stat}</div>
    </div>
  );
};

const WeaponDamageStyle = ({
  weaponDamage,
}: {
  weaponDamage: [number, number];
}) => {
  return (
    <div className="flex justify-between">
      <div className="mr-8 font-semibold">Weapon Damage:</div>
      <div>
        {weaponDamage[0]} - {weaponDamage[1]}
      </div>
    </div>
  );
};

const ItemView = ({ item }: { item: Item | null }) => {
  if (item === null) return <div>No item?</div>;

  const {
    weaponDamage,
    armor,
    name,
    picture,
    str,
    dex,
    con,
    skl,
    luk,
    critChance,
    critDamage,
    maxHealth,
    maxMana,
    healthRegen,
    experiencePercentage,
    goldPercentage,
    attackSpeed,
    magicFind,
    manaRegen,
  } = item;

  return (
    <div className={individualToolTipStyles}>
      {picture && <div></div>}
      {name && <div>{name}</div>}
      {weaponDamage && <WeaponDamageStyle weaponDamage={weaponDamage} />}

      {armor && <ItemStatStyle name="Armor" stat={armor} />}
      {str && <ItemStatStyle name="Str" stat={str} />}
      {dex && <ItemStatStyle name="Dex" stat={dex} />}
      {con && <ItemStatStyle name="Con" stat={con} />}
      {skl && <ItemStatStyle name="Skl" stat={skl} />}
      {luk && <ItemStatStyle name="Luk" stat={luk} />}
      {critChance && (
        <ItemStatStyle name="Crit %" stat={(critChance * 0.1).toFixed(2)} />
      )}
      {critDamage && <ItemStatStyle name="Crit Damage" stat={critDamage} />}
      {maxHealth && <ItemStatStyle name="Max HP" stat={maxHealth} />}
      {healthRegen && (
        <ItemStatStyle name="HP Regen" stat={(healthRegen * 0.1).toFixed(2)} />
      )}
      {maxMana && <ItemStatStyle name="Max MP" stat={maxMana} />}
      {manaRegen && (
        <ItemStatStyle name="MP Regen" stat={(manaRegen * 0.1).toFixed(2)} />
      )}
      {experiencePercentage && (
        <ItemStatStyle name="Exp %" stat={experiencePercentage} />
      )}
      {goldPercentage && <ItemStatStyle name="Gold %" stat={goldPercentage} />}
      {attackSpeed && <ItemStatStyle name="ATK Speed" stat={attackSpeed} />}
      {magicFind && <ItemStatStyle name="Magic Find" stat={magicFind} />}
    </div>
  );
};

export default ItemView;
