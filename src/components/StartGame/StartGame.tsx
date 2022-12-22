import { addMilliseconds, endOfSecond, startOfSecond } from "date-fns";
import { useBirdStreakStore } from "../../hooks/useBirdStreakStore";
import { Content } from "../Content";

export const StartGame = () => {
  const handleClick = () => {
    const d = new Date();
    const gameStartDate = startOfSecond(d);
    const streakSpan = useBirdStreakStore.getState().streakSpan;
    useBirdStreakStore.setState({
      gameStartDate,
      deadline: addMilliseconds(endOfSecond(d), streakSpan),
      lastPeriodEnded: gameStartDate,
    });
  };
  return (
    <Content>
      <h2>Start game</h2>
      <button onClick={handleClick}>Start a new streak</button>
    </Content>
  );
};
