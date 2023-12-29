const FIGHT_LOG_STYLES = "w-full rounded bg-slate-800 p-1";

export const FightLogScreen = ({ fightLog }: { fightLog: string[] }) => {
  return (
    <div className="flex flex-col items-center gap-1 text-white">
      FightLog
      {fightLog.length > 8
        ? fightLog.slice(fightLog.length - 8).map((message, idx) => {
            return (
              <div
                key={`${idx}FightLog`}
                className={`${FIGHT_LOG_STYLES} ${
                  idx % 2 === 0 ? "bg-slate-700" : "bg-slate-900"
                }`}
              >
                {message}
              </div>
            );
          })
        : fightLog.map((message, idx) => {
            return (
              <div
                key={`${idx}FightLog`}
                className={`${FIGHT_LOG_STYLES} ${
                  idx % 2 === 0 ? "bg-slate-700" : "bg-slate-900"
                } `}
              >
                {message}
              </div>
            );
          })}
    </div>
  );
};
