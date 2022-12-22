import { addMilliseconds } from "date-fns";
import { useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";
import { GAME } from "../../config/game";
import { useBirdStreakStore } from "../../hooks/useBirdStreakStore";
import { checkDisabled } from "../../logic/checkDisabled";
import { getLastItem } from "../../logic/getLastItem";
import { validateInput } from "../../logic/validateInput";
import { ListItem } from "../../types";
export const LogForm = () => {
  const [name, setName] = useState("");
  const { streakSpan, disabledIntervall } = useBirdStreakStore.getState();

  const lastPeriodEnded = useBirdStreakStore((state) => state.lastPeriodEnded);
  const deadline = useBirdStreakStore((state) => state.deadline);
  const gameStartDate = useBirdStreakStore((state) => state.gameStartDate);
  const disabled = useBirdStreakStore((state) => state.disabled);
  const list = useBirdStreakStore((state) => state.list);

  // Persist store whenever list is updated
  useEffect(() => {
    localStorage.setItem(
      GAME.persistKey,
      JSON.stringify(useBirdStreakStore.getState())
    );
  }, [list]);

  // recheck disabled state whenever relevant params change, for immediate effect on updates
  useEffect(() => {
    useBirdStreakStore.setState({
      disabled: checkDisabled(new Date(), {
        lastPeriodEnded,
        gameStartDate,
        deadline,
      }),
    });
  }, [lastPeriodEnded, gameStartDate, deadline]);

  // recheck disabled state on regular intervals, since it depends on time
  useInterval(() => {
    useBirdStreakStore.setState({
      disabled: checkDisabled(new Date(), {
        lastPeriodEnded,
        gameStartDate,
        deadline,
      }),
    });
  }, disabledIntervall);

  if (!gameStartDate) return null; // typechecking to keep ts happy

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const valid = validateInput(name, list);
    if (!valid) {
      alert("bird name is already logged");
      return;
    }

    const lastItem = getLastItem(list);

    const periodStart = lastItem ? lastItem.periodEnd : gameStartDate;

    const periodEnd = lastItem
      ? addMilliseconds(lastItem.periodEnd, streakSpan)
      : addMilliseconds(gameStartDate, streakSpan);

    const listItem: ListItem = {
      name,
      date: new Date(),
      periodStart,
      periodEnd,
    };

    useBirdStreakStore.setState({
      list: [...list, listItem],
      lastPeriodEnded: periodEnd,
      deadline: addMilliseconds(periodEnd, streakSpan),
    });
    setName("");
  };

  return (
    <form className="log-bird-form" onSubmit={handleSubmit}>
      <label htmlFor="name">What bird do you want to log</label>
      <input
        disabled={disabled}
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name of the bird"
      />
      <input type="submit" value="Submit" disabled={disabled}></input>
    </form>
  );
};
